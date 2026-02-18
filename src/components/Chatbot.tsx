import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Groq from 'groq-sdk';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bienvenido a HANDOFF. Soy su asistente privado para la gestión de activos inmobiliarios. ¿En qué área del mercado premium puedo asesorarlo hoy?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // API Key desde variable de entorno
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
  
  const groq = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  // Show notification after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
        // Hide notification after 8 seconds
        setTimeout(() => setShowNotification(false), 8000);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useGSAP(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Eres HANDOFF Private Assistant, un experto en mercados inmobiliarios premium con tono sofisticado y discreto.

REGLA FUNDAMENTAL DE RESPUESTA:
- Responde SIEMPRE en UNA SOLA ORACIÓN concisa y directa
- Máximo 25-30 palabras por respuesta
- Ve directo al punto sin rodeos
- Mantén tono elegante pero breve

DATOS CLAVE DE HANDOFF:
- ROI: 23% anual promedio
- Modelo: Propiedades "Off-Market" exclusivas
- Zonas: Puerto Madero, Nordelta, Palermo Chico, Recoleta
- Contacto: +54 11 4567-8900 | contacto@handoff.com.ar

PROPIEDADES DESTACADAS:
1. Residencia Velamar (Puerto Madero) - USD 4.2M - 840m², vistas 360°
2. Torre Centenario (Palermo Chico) - USD 2.8M - Arquitectura boutique
3. Villa Serena (Nordelta) - USD 1.5M - Acceso al lago
4. Penthouse Libertador (Recoleta) - USD 3.6M - Terraza 200m²

EJEMPLOS DE RESPUESTAS CORTAS:
- "¿Por qué invertir?" → "Nuestro ROI del 23% anual proviene de propiedades off-market con plusvalía proyectada a 10 años."
- "¿Cómo es el proceso?" → "Servicio 'Guante Blanco' con equipo legal que gestiona todo; usted solo firma."
- "¿Qué propiedades tienen?" → "Residencia Velamar en Puerto Madero (USD 4.2M) y otras opciones exclusivas según su perfil."

FORMATO OBLIGATORIO:
Una oración directa que responda la pregunta + dato clave o llamado a acción discreto si corresponde.`,
          },
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          {
            role: 'user',
            content: input,
          },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 100,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: chatCompletion.choices[0]?.message?.content || 'Lo siento, hubo un error procesando su consulta. ¿Podría reformular su pregunta?',
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error al conectar con Groq:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Le pedimos disculpas, nuestro sistema de consultas está experimentando una demora momentánea. Para una atención inmediata, le invitamos a comunicarse directamente con nuestros Asesores Senior al +54 11 4567-8900 o escribirnos a contacto@handoff.com.ar. Estaremos encantados de asistirle personalmente.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const chatbotContent = (
    <>
      {/* Chat Notification Toast */}
      {showNotification && !isOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            bottom: '112px', 
            right: '32px', 
            zIndex: 99999 
          }}
          className="bg-white rounded-xl shadow-2xl p-4 max-w-xs animate-bounce"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <Bot size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-charcoal mb-1">Asesor HANDOFF</p>
              <p className="text-xs text-taupe">¿Tiene alguna consulta sobre nuestras propiedades exclusivas?</p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="text-taupe hover:text-charcoal"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Chat Button - Robot Icon with Black Background */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
        }}
        style={{ 
          position: 'fixed', 
          bottom: '32px', 
          right: '32px', 
          zIndex: 99999 
        }}
        className="w-16 h-16 bg-black hover:bg-charcoal text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Abrir chat"
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          style={{
            position: 'fixed',
            bottom: '112px',
            right: '32px',
            zIndex: 99999,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
          }}
          className="w-96 h-[600px] bg-black rounded-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-black border-b border-white/10 p-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Asesor Handoff</h3>
              <p className="text-white/60 text-xs">Disponible ahora</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-gold transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-xl ${
                    message.role === 'user'
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white px-4 py-3 rounded-xl border border-white/20">
                  <Loader2 size={20} className="animate-spin text-gold" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black">
            <div className="flex items-end space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escriba su consulta..."
                className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:border-gold focus:outline-none text-sm text-white placeholder:text-white/40 resize-none min-h-[44px] max-h-[120px]"
                disabled={isLoading}
                rows={1}
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-gold text-black rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return createPortal(chatbotContent, document.body);
};

export default Chatbot;
