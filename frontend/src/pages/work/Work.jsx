import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaCheckCircle,
  FaHandsHelping,
  FaQuestionCircle,
} from "react-icons/fa";
import { FaBriefcase, FaUsers } from "react-icons/fa6";

const Work = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary mb-6 flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-primary" /> Comment ça marche
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Facile simplifie la réservation de services en ligne pour les
            clients et aide les prestataires à gérer leurs activités. Découvrez
            en quelques étapes comment notre plateforme fonctionne.
          </p>
        </div>
        </section>

        {/* Clients Section */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-semibold text-primary flex items-center gap-2 mb-4">
            <FaUsers className="text-primary" />Pour Le Client
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            En tant que client, voici comment réserver vos services en quelques
            étapes simples :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <Card className="flex flex-col items-center p-6 space-y-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-4xl text-primary">
                <FaSearch />
              </CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                Explorez les services disponibles
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Parcourez une large gamme de services locaux selon vos besoins.
                Qu'il s'agisse d'une coupe de cheveux, d'une réparation à
                domicile, ou d'un coaching personnel, tout est à portée de main.
              </CardDescription>
            </Card>

            {/* Card 2 */}
            <Card className="flex flex-col items-center p-6 space-y-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-4xl text-primary">
                <FaCalendarAlt />
              </CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                Réservez votre créneau
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Sélectionnez le prestataire et réservez le créneau horaire qui
                vous convient. Profitez de la simplicité de notre plateforme.
              </CardDescription>
            </Card>

            {/* Card 3 */}
            <Card className="flex flex-col items-center p-6 space-y-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-4xl text-primary">
                <FaCheckCircle />
              </CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                Confirmez votre réservation
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Une fois votre réservation confirmée, vous recevrez un e-mail de
                confirmation et un rappel pour vous assurer que vous ne
                manquerez pas votre rendez-vous.
              </CardDescription>
            </Card>

            {/* Card 4 */}
            <Card className="flex flex-col items-center p-6 space-y-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-4xl text-primary">
                <FaHandsHelping />
              </CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                Profitez de votre service
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Le service sera effectué selon les détails que vous avez
                fournis. Une fois terminé, vous pourrez donner un avis pour
                aider d'autres clients à faire leur choix.
              </CardDescription>
            </Card>
          </div>
        </div>

        {/* Providers Section */}
        <div className="space-y-6 mb-16">
          <h2 className="text-3xl font-semibold text-primary flex items-center gap-2 mb-4">
            <FaBriefcase className="text-primary" />Pour Le Prestataire
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Si vous êtes un prestataire, voici comment mettre en avant vos
            services et gérer vos rendez-vous :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <Card className="flex flex-col items-center p-6 space-y-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-4xl text-primary">
                <FaSearch />
              </CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                Créez un compte prestataire
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Inscrivez-vous en tant que prestataire pour commencer à offrir
                vos services. Remplissez les informations nécessaires et mettez
                en avant vos services.
              </CardDescription>
            </Card>

            {/* Card 2 */}
            <Card className="flex flex-col items-center p-6 space-y-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-4xl text-primary">
                <FaHandsHelping />
              </CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                Publiez vos services
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Ajoutez des détails sur les services que vous proposez, y
                compris les tarifs, les horaires, et des photos pour attirer
                plus de clients.
              </CardDescription>
            </Card>

            {/* Card 3 */}
            <Card className="flex flex-col items-center p-6 space-y-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-4xl text-primary">
                <FaCalendarAlt />
              </CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                Gérez vos réservations
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Gérez facilement vos rendez-vous via la plateforme. Vous pouvez
                accepter ou refuser des réservations et ajuster votre emploi du
                temps en fonction de vos disponibilités.
              </CardDescription>
            </Card>

            {/* Card 4 */}
            <Card className="flex flex-col items-center p-6 space-y-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-4xl text-primary">
                <FaCheckCircle />
              </CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                Développez votre activité
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Grâce aux évaluations des clients et à la visibilité offerte par
                Facile, vous pourrez augmenter votre clientèle et faire croître
                votre entreprise.
              </CardDescription>
            </Card>
          </div>
        </div>
    </div>
  );
};

export default Work;
