import React from 'react';
import { FaEnvelope, FaPhone, FaHandshake, FaRocket, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Introduction Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-primary flex items-center justify-center gap-2">
          <FaRocket className="text-primary" /> À propos de Facile
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Facile est une plateforme innovante conçue pour simplifier la réservation de services près de chez vous.
          Que vous soyez un client cherchant des services pratiques ou un prestataire cherchant à développer votre activité, 
          Facile est là pour vous accompagner.
        </p>
      </section>

      {/* Mission Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-primary flex items-center gap-2">
          <FaHandshake className="text-primary" /> Notre mission
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Notre mission est de rendre les services de proximité accessibles à tous en quelques clics. 
          Nous visons à créer une expérience fluide et conviviale pour les clients et les prestataires de services. 
          Facile vous permet de trouver, réserver et gérer vos rendez-vous ou services avec un minimum d'effort. 
          Pour les prestataires, nous offrons une plateforme simple pour gérer leurs activités et développer leur réseau.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-primary flex items-center gap-2">
          <FaUsers className="text-primary" /> Pourquoi choisir Facile ?
        </h2>
        <ul className="list-disc list-inside text-lg text-muted-foreground leading-relaxed space-y-2">
          <li>Plateforme simple et intuitive à utiliser pour les clients et les prestataires.</li>
          <li>Réservations rapides et sécurisées avec une interface fluide.</li>
          <li>Possibilité de gérer vos activités et vos rendez-vous en temps réel.</li>
          <li>Un large choix de services locaux, à portée de clic.</li>
          <li>Assistance client disponible pour toute question ou problème.</li>
        </ul>
      </section>

      {/* Contact Information Section */}
      <section className="space-y-6 text-center">
        <h2 className="text-3xl font-semibold text-primary flex items-center justify-center gap-2">
          <FaEnvelope className="text-primary" /> Contactez-nous
        </h2>
        <p className="text-lg text-muted-foreground">
          Vous avez des questions ? Nous serions ravis de vous aider. Contactez notre équipe de support pour toute information complémentaire.
        </p>
        <p className="text-lg text-muted-foreground">
          Email : <a href="mailto:support@facile.com" className="text-primary underline">support@facile.com</a>
        </p>
        <p className="text-lg text-muted-foreground">
          Téléphone : <a href="tel:+1234567890" className="text-primary underline">+1 234 567 890</a>
        </p>
      </section>
    </div>
  );
};

export default About;
