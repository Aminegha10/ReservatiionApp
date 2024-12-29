import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiCheck, HiClock } from "react-icons/hi";
import logo from "@/assets/logo.svg";
import { LogOut } from "@/app/services/LoginSlice";
import { LogOutClient } from "@/app/services/ClientLoginSlice.js";
import {
  useGetOnePrestataireQuery,
  useReadNotificationsMutation,
} from "@/app/services/prestataireApi";
import {
  useGetOneClientQuery,
  useReadNotificationsClientMutation,
} from "@/app/services/clientApi";
import NavBarLoading from "./NavBarLoading";
import avatarPicture from "@/assets/avatar.jpg";
import { FaInfoCircle, FaRegQuestionCircle } from "react-icons/fa";

const socket = io("http://localhost:5000");

export function NavBar() {
  const isLoggedIn = useSelector((state) => state.Login.isLoggedIn);
  const isClientLoggedIn = useSelector((state) => state.ClientLogin.isLoggedIn);
  const prestataireId = localStorage.getItem("prestataireId");
  const clientId = localStorage.getItem("clientId");

  const {
    data: prestataire,
    isLoading: isLoadingPrestataire,
    refetch,
  } = useGetOnePrestataireQuery(prestataireId, {
    skip: !isLoggedIn,
  });
  const {
    data: client,
    isLoading: isLoadingClient,
    refetch: clientRefetch,
  } = useGetOneClientQuery(clientId, {
    skip: !isClientLoggedIn,
  });

  const [readNotifications] = useReadNotificationsMutation();
  const [readNotificationsClient] = useReadNotificationsClientMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (prestataireId) socket.emit("prestataire-join", prestataireId);
    if (clientId) socket.emit("client-join", clientId);

    const handleNewNotification = () => {
      refetch();
    };
    const handleNewNotificationClient = () => {
      clientRefetch();
    };
    socket.on("New-Notification-Client", handleNewNotificationClient);
    socket.on("New-Notification", handleNewNotification);

    return () => {
      socket.off("New-Notification", handleNewNotification);
      socket.off("New-Notification-Client", handleNewNotificationClient);
    };
  }, [prestataireId, clientId, refetch, clientRefetch]);

  const handleLogOut = () => {
    if (isClientLoggedIn) {
      dispatch(LogOutClient());
      localStorage.removeItem("clientId");
    } else {
      dispatch(LogOut());
      localStorage.removeItem("prestataireId");
    }
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleReadingNotifications = async () => {
    try {
      if (prestataireId) await readNotifications().unwrap();
      else {
        await readNotificationsClient().unwrap();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderDropdown = (user, isLoading, type) => {
    if (isLoading) {
      return <NavBarLoading />;
    }

    const profileRoute =
      type === "prestataire" ? "/prestataire/profile" : "/client/profile";

    const additionalItems =
      type === "prestataire" ? (
        <>
          <DropdownMenuItem>
            <Link to="/prestataire/services">Mes Services</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/prestataire/reservations">Mes Reservations</Link>
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuItem>
            <Link to={{ pathname: "/client/prestataires", state: client }}>
              Prestataires
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/client/reservations">Reservations</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/client/historique">Historique</Link>
          </DropdownMenuItem>
        </>
      );

    const notifications =
      type === "prestataire" ? prestataire.notifications : client.notifications;
    const unreadNotifications = notifications.filter(
      (noti) => noti.isRead === false
    );

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative p-4"
              aria-label="Notifications"
            >
              <IoIosNotificationsOutline className="transform scale-150" />{" "}
              {unreadNotifications.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5"
                >
                  {unreadNotifications.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notif, index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex flex-col items-start"
                >
                  <span>
                    {type === "prestataire"
                      ? `${notif.reservation.clientId.nom} ${notif.reservation.clientId.prenom} a réservé`
                      : `${notif.reservation.prestataireId.nom} ${notif.reservation.prestataireId.prenom} a confirmé votre réservation pour`}
                  </span>
                  <Badge variant="secondary" className="mt-1">
                    {notif.reservation.serviceId.name}
                  </Badge>
                  {type === "prestataire" && (
                    <Badge variant="outline" className="mt-1">
                      {notif.reservation.creneaux.length} créneaux
                    </Badge>
                  )}
                  <Badge variant="outline" className="mt-1">
                    <HiClock className="mr-1" />
                    {notif.timeAgo}
                  </Badge>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem>
                Pas de nouvelles notifications
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {unreadNotifications.length > 0 && (
              <DropdownMenuItem onSelect={handleReadingNotifications}>
                <HiCheck className="mr-2" />
                Marquer comme lu
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={avatarPicture} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <span className="block text-sm font-medium">{`${user?.nom} ${user?.prenom}`}</span>
              <span className="block text-xs text-muted-foreground">
                {user?.email}
              </span>
              {type === "prestataire" && (
                <span className="block text-xs font-medium text-blue-500">
                  {user?.Service}
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={profileRoute}>Profile</Link>
            </DropdownMenuItem>
            {additionalItems}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogOut}>
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  };

  const renderGuestDropdown = () => (
    <div className="flex space-x-2">
      <Button variant="outline">
        <Link to="client/login">Client</Link>
      </Button>
      <Button>
        <Link to="prestataire/login">Prestataire</Link>
      </Button>
    </div>
  );

  return (
    <nav className="sticky top-0 z-10 bg-background shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <img src={logo} className="h-16 py-2 mx-3 w-auto" alt="Logo" />
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/work">
                <Button variant="ghost" className="flex items-center">
                  <FaRegQuestionCircle className="mr-1" />{" "}
                  Comment ça marche
                </Button>
              </Link>

              <Link to="/about">
                <Button variant="ghost" className="flex items-center">
                  <FaInfoCircle className="mr-1" />
                  À propos
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn
              ? renderDropdown(prestataire, isLoadingPrestataire, "prestataire")
              : isClientLoggedIn
              ? renderDropdown(client, isLoadingClient, "client")
              : renderGuestDropdown()}
          </div>
        </div>
      </div>
    </nav>
  );
}
