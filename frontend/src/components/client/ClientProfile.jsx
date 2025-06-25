import { toast } from "react-toastify"; // <-- assure-toi que cet import existe
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetOneClientQuery } from "@/app/services/clientApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaLock,
  FaTrash,
  FaCamera,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaBriefcase,
  FaUserCircle,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import HomeLoading from "@/components/HomeLoading";
import { useForm } from "react-hook-form";
import { useEditClientMutation } from "@/app/services/clientApi";
import axios from "axios";
import { cn } from "@/lib/utils";

function ClientProfile() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [file, setFile] = useState("");

  // Existing authentication and data fetching logic
  const clientId = localStorage.getItem("clientId");
  const isClientLoggedIn = useSelector((state) => state.ClientLogin.isLoggedIn);
  const {
    data: client,
    isLoading,
    error,
  } = useGetOneClientQuery(clientId, {
    skip: !isClientLoggedIn,
  });
  const [editClient, { isLoading: isEditLoading }] = useEditClientMutation();
  console.log(file);
  const uploadToCloudinary = async () => {
    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append("file", file); // The actual file to upload
      formData.append("upload_preset", "Aminegha_perset"); // Preset for unsigned uploads
      formData.append("folder", "Prestataires_Documents"); // Specify the folder name
      formData.append("resource_type", "auto");

      // Make the POST request
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dkt1t22qc/auto/upload`,
        formData
      );

      // Handle success
      console.log(response.data.secure_url);
      return response.data.secure_url; // Contains the uploaded file details
    } catch (error) {
      // Handle error
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const fileUpload = await uploadToCloudinary();
      await editClient({
        clientId,
        data: { ...data, imageProfile: fileUpload },
      }).unwrap();
      setFile("");
      toast.success("Profil mis à jour avec succès !", {
        position: "bottom-right",
      });
    } catch (err) {
      toast.error(err.data.message, {
        position: "bottom-right",
      });
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur de mot de passe",
        description:
          "Le nouveau mot de passe et la confirmation ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement API call to change password
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const handleDeleteAccount = () => {
    // TODO: Implement API call to delete account
    toast({
      title: "Suppression du compte",
      description:
        "Processus de suppression du compte initié. Vérifiez votre email pour confirmation.",
      variant: "destructive",
    });
  };

  // Authentication check
  if (!isClientLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="text-center p-8">
            <FaUserCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Non connecté
            </h3>
            <p className="text-gray-600">
              Vous n'êtes pas connecté en tant que client.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return <HomeLoading />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-red-200">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Erreur de chargement
            </h3>
            <p className="text-red-600">
              Erreur lors de la récupération des informations client :{" "}
              {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fullName = `${client?.prenom || ""} ${client?.nom || ""}`.trim();

  return (
    <div className="min-h-screen w-full bg-white p-4 md:py-16">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profil Client
          </h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles et préférences
          </p>
        </div>

        <Tabs defaultValue="view" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-md border">
            <TabsTrigger value="view" className="flex items-center gap-2">
              <FaUser className="w-4 h-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <FaEdit className="w-4 h-4" />
              <span className="hidden sm:inline">Modifier</span>
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <FaLock className="w-4 h-4" />
              <span className="hidden sm:inline">Mot de passe</span>
            </TabsTrigger>
            <TabsTrigger value="delete" className="flex items-center gap-2">
              <FaTrash className="w-4 h-4" />
              <span className="hidden sm:inline">Supprimer</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile View Section */}
          <TabsContent value="view">
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center pb-6">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-lg">
                    <AvatarImage src={client.imageProfile} alt={fullName} />
                    <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                      {client?.prenom?.[0]}
                      {client?.nom?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                    <MdVerified className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {fullName}
                </CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <span>Client vérifié</span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    Actif
                  </Badge>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaUser className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-500">
                        Nom complet
                      </Label>
                      <p className="text-lg font-semibold text-gray-900">
                        {fullName}
                      </p>
                    </div>
                    <FaCheck className="w-5 h-5 text-green-500" />
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FaEnvelope className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-500">
                        Adresse email
                      </Label>
                      <p className="text-lg font-semibold text-gray-900">
                        {client?.email}
                      </p>
                    </div>
                    <FaCheck className="w-5 h-5 text-green-500" />
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaPhone className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-500">
                        Numéro de téléphone
                      </Label>
                      <p className="text-lg font-semibold text-gray-900">
                        {client?.telephone}
                      </p>
                    </div>
                    <FaCheck className="w-5 h-5 text-green-500" />
                  </div>
                </div>

                <Separator />

                {/* Navigation Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaBriefcase className="w-5 h-5" />
                    Accès rapide
                  </h3>
                  <div className="grid gap-3">
                    <Link
                      to="/client/prestataires"
                      className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 group"
                    >
                      <FaCalendarAlt className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900 group-hover:text-blue-700">
                        Prestataires
                      </span>
                    </Link>
                    <Link
                      to="/client/reservations"
                      className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 group"
                    >
                      <FaCalendarAlt className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900 group-hover:text-green-700">
                        Réservations
                      </span>
                    </Link>
                    <Link
                      to="/client/historique"
                      className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 group"
                    >
                      <FaCalendarAlt className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-900 group-hover:text-purple-700">
                        Historique
                      </span>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Edit Profile Section */}
          <TabsContent value="edit">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FaEdit className="w-5 h-5 text-blue-600" />
                  Modifier les informations
                </CardTitle>
                <CardDescription>
                  Mettez à jour vos informations personnelles
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage
                      src={client.imageProfile}
                      alt={fullName}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-xl bg-blue-100 text-blue-600">
                      {client?.prenom?.[0]}
                      {client?.nom?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="relative inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      id="file-upload"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 pointer-events-none"
                    >
                      <FaCamera className="w-4 h-4" />
                      Changer la photo
                      {file ? (
                        <span className="text-green-600">{file.name}</span>
                      ) : (
                        <span className="text-red-600">
                          Aucune photo sélectionnée
                        </span>
                      )}
                    </Button>
                  </div>
                </div>

                <Separator />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-prenom">Prénom</Label>
                        <Input
                          id="edit-prenom"
                          className="h-12"
                          defaultValue={client?.prenom}
                          {...register("prenom")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-nom">Nom</Label>
                        <Input
                          id="edit-nom"
                          className="h-12"
                          defaultValue={client?.nom}
                          {...register("nom")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Adresse email</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          className="h-12"
                          defaultValue={client?.email}
                          {...register("email")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-telephone">
                          Numéro de téléphone
                        </Label>
                        <Input
                          id="edit-telephone"
                          className="h-12"
                          defaultValue={client?.telephone}
                          {...register("telephone")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button className="flex-1 h-12 bg-blue-600 hover:bg-blue-700">
                      {isEditLoading ? (
                        <span className="animate-pulse">Loading...</span>
                      ) : (
                        "Sauvegarder les modifications"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Change Password Section */}
          <TabsContent value="password">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FaLock className="w-5 h-5 text-orange-600" />
                  Changer le mot de passe
                </CardTitle>
                <CardDescription>
                  Mettez à jour votre mot de passe pour sécuriser votre compte
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      className="h-12 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    >
                      {showCurrentPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      className="h-12 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    >
                      {showNewPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">
                    Confirmer le nouveau mot de passe
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      className="h-12 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Exigences du mot de passe :
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Au moins 8 caractères</li>
                    <li>• Contient des lettres majuscules et minuscules</li>
                    <li>• Contient au moins un chiffre</li>
                    <li>• Contient au moins un caractère spécial</li>
                  </ul>
                </div>

                <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700">
                  Mettre à jour le mot de passe
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delete Account Section */}
          <TabsContent value="delete">
            <Card className="shadow-lg border-0 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <FaTrash className="w-5 h-5" />
                  Supprimer le compte
                </CardTitle>
                <CardDescription>
                  Supprimer définitivement votre compte et toutes les données
                  associées
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-3">
                    ⚠️ Attention : Cette action est irréversible
                  </h4>
                  <p className="text-red-700 mb-4">
                    La suppression de votre compte supprimera définitivement :
                  </p>
                  <ul className="text-red-700 space-y-2 mb-4">
                    <li>• Vos informations de profil et paramètres</li>
                    <li>
                      • Tout l'historique de consultation et les enregistrements
                    </li>
                    <li>• Les préférences et données sauvegardées</li>
                    <li>• L'accès à tous les services et fonctionnalités</li>
                  </ul>
                  <p className="text-red-700 font-medium">
                    Cette action est irréversible et vos données ne peuvent pas
                    être récupérées.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="delete-confirmation">
                      Tapez "SUPPRIMER" pour confirmer la suppression du compte
                    </Label>
                    <Input
                      id="delete-confirmation"
                      placeholder="Tapez SUPPRIMER ici"
                      className="h-12 border-red-300 focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delete-password">
                      Entrez votre mot de passe pour confirmer
                    </Label>
                    <Input
                      id="delete-password"
                      type="password"
                      placeholder="Entrez votre mot de passe actuel"
                      className="h-12 border-red-300 focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="destructive"
                    // onClick={handleDeleteAccount}
                    className="flex-1 h-12 bg-red-600 hover:bg-red-700"
                  >
                    Supprimer mon compte
                  </Button>
                  <Button variant="outline" className="flex-1 h-12">
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ClientProfile;
