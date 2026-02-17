import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: 12, suffix: '+', label: 'Años de Experiencia' },
    { number: 500, prefix: '$', suffix: 'M+', label: 'Activos Gestionados' },
    { number: 150, suffix: '+', label: 'Clientes Premium' },
    { number: 98, suffix: '%', label: 'Satisfacción' },
  ];

  useGSAP(() => {
    stats.forEach((stat, index) => {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: stat.number,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: function () {
          const element = document.getElementById(`stat-${index}`);
          if (element) {
            element.textContent = Math.ceil(counter.val).toString();
          }
        },
      });
    });

    gsap.fromTo('.stat-card',
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={statsRef} className="py-24 bg-olive">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                {stat.prefix}
                <span id={`stat-${index}`}>0</span>
                {stat.suffix}
              </div>
              <p className="text-sm md:text-base text-parchment/80 font-light tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
