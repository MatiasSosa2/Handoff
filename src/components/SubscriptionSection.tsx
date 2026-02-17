import React from 'react';

const SubscriptionSection: React.FC = () => {
  return (
    <section className="py-20 bg-parchment px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-light text-charcoal mb-6">Suscripción</h3>
        <p className="text-charcoal/70 mb-8">Reciba tendencias de mercado y curaduría de materiales premium.</p>
        <form className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
          <input
            type="email"
            placeholder="tu@email.com"
            className="w-full sm:w-auto flex-1 px-4 py-3 border border-charcoal/20 bg-white text-charcoal placeholder-charcoal/50 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gold text-charcoal font-semibold tracking-wider uppercase hover:bg-white hover:border hover:border-gold transition-all"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubscriptionSection;
