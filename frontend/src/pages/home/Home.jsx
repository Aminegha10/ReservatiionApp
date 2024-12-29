import React from "react";
import { HiSearch, HiOutlineUserGroup } from "react-icons/hi";  
import HeroPicture from "@/assets/hero.jpg";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="flex flex-col md:flex-row items-center gap-12">
        {/* Hero Text */}
        <div className="space-y-6 md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-4xl font-extrabold tracking-tight leading-tight text-primary">
            Bienvenue sur Facile
          </h1>
          <p className="text-lg text-muted-foreground">
            Réservez facilement des services près de chez vous en deux étapes simples :
          </p>

          {/* Clients Section */}
          <div className="space-y-6">
            <h3 className="text-4xl md:text-5xl lg:text-2xl font-extrabold tracking-tight leading-tight text-primary flex items-center gap-2">
              <HiSearch className="text-2xl" /> Pour les clients
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Trouvez, réservez et gérez vos rendez-vous en quelques clics, que ce
              soit pour une coupe de cheveux, une réparation à domicile, ou un
              coaching personnel.
            </p>
          </div>

          {/* Providers Section */}
          <div className="space-y-6">
            <h3 className="text-4xl md:text-5xl lg:text-2xl font-extrabold tracking-tight leading-tight text-primary flex items-center gap-2">
              <HiOutlineUserGroup className="text-2xl" /> Pour les prestataires
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Mettez en avant vos services, gérez vos réservations et développez
              votre activité en toute simplicité.
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2">
          <img
            src={HeroPicture}
            alt="Hero"
            className="w-full h-auto object-cover rounded-lg shadow-2xl hover:scale-105 transition-all duration-500"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
