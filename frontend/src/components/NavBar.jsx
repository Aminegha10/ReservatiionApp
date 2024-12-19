/* eslint-disable no-unused-vars */
import { Avatar, Badge, Dropdown, Navbar } from "flowbite-react";
import logo from "@/assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "@/app/services/LoginSlice";
import { LogOutClient } from "@/app/services/ClientLoginSlice.js";
import { useGetOnePrestataireQuery } from "@/app/services/prestataireApi";
import NavBarLoading from "./NavBarLoading";
import { useGetOneClientQuery } from "@/app/services/clientApi";
import { Button } from "@/components/ui/button";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiCheck, HiClock } from "react-icons/hi";

const socket = io("http://localhost:5000"); // Replace with your server's address

export function NavBar() {
  const isLoggedIn = useSelector((state) => state.Login.isLoggedIn);
  const isClientLoggedIn = useSelector((state) => state.ClientLogin.isLoggedIn);
  const prestataireId = localStorage.getItem("prestataireId");
  const [notification, setNotification] = useState(null);
  const {
    data: prestataire,
    isLoading: isLoadingPrestataire,
    refetch,
  } = useGetOnePrestataireQuery(prestataireId, {
    skip: !isLoggedIn,
  });
  useEffect(() => {
    if (prestataireId) socket.emit("prestataire-join", prestataireId);

    const handleNewNotification = () => {
      setNotification((prevNotification) => prevNotification + 1);
    };

    socket.on("New-Notification", handleNewNotification);

    // Cleanup
    return () => {
      socket.off("New-Notification", handleNewNotification);
    };
  }, [prestataireId]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clientId = localStorage.getItem("clientId");

  const { data: client, isLoading: isLoadingClient } = useGetOneClientQuery(
    clientId,
    {
      skip: !isClientLoggedIn,
    }
  );
  // const handlerefetch = () => {
  //   refetch();
  // };
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
  console.log(prestataire);

  const renderDropdown = (user, isLoading, type) => {
    if (isLoading) {
      return <NavBarLoading />;
    }
    const profileRoute =
      type === "prestataire" ? "/prestataire/profile" : "/client/profile";
    const additionalItems =
      type === "prestataire" ? (
        <>
          <Link to="/prestataire/services">
            <Dropdown.Item>Mes Services</Dropdown.Item>
          </Link>
          <Link to="/prestataire/reservations">
            <Dropdown.Item>Mes Reservastions</Dropdown.Item>
          </Link>
        </>
      ) : (
        <>
          <Link to="/client/prestataires">
            <Dropdown.Item>Prestataires</Dropdown.Item>
          </Link>
          <Link to="/client/reservations">
            <Dropdown.Item>Reservations</Dropdown.Item>
          </Link>
          <Link to="/client/historique">
            <Dropdown.Item>Historique</Dropdown.Item>
          </Link>
        </>
      );
    var notiButton = <>d</>;
    if (type == "prestataire") {
      const isNotReadNotification = prestataire.notifications.filter(
        (noti) => noti.isRead == false
      );
      notiButton = (
        <DropdownMenu>
          {/* Notification Button as Dropdown Trigger */}
          <DropdownMenuTrigger>
            <button
              className="py-3 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
              aria-label="Notifications"
            >
              <IoIosNotificationsOutline className="text-[35px]" />
              <span className="absolute inset-0 object-right-top -mr-6">
                <div className="inline-flex items-center px-[4px] border-2 border-white rounded-full text-[10px] font-semibold leading-4 bg-red-500 text-white">
                  {notification
                    ? notification + isNotReadNotification.length
                    : isNotReadNotification.length}
                </div>
              </span>
            </button>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          <DropdownMenuContent>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isNotReadNotification.length > 0 ? (
              isNotReadNotification.map((notif, index) => (
                <DropdownMenuItem key={index} className=" p-4">
                  {notif.reservation.clientId.nom}{" "}
                  {notif.reservation.clientId.nom} a reserver{" "}
                  <Badge color="warning">
                    {notif.reservation.creneaux.length}
                  </Badge>
                  creneaux pour la service
                  <Badge> {notif.reservation.serviceId.name} </Badge>
                  <Badge color="gray" icon={HiClock} className="">
                    3 days ago
                  </Badge>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem>No new notifications</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <>
        {notiButton}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-md">{`${user?.nom} ${user?.prenom}`}</span>
            <span className="block underline truncate text-sm">
              {user?.email}
            </span>
            {type === "prestataire" && (
              <span className="block text-blue-500 text-sm font-medium">
                {user?.Service}
              </span>
            )}
          </Dropdown.Header>
          <Link to={profileRoute}>
            <Dropdown.Item>Profile</Dropdown.Item>
          </Link>
          {additionalItems}
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
        </Dropdown>
      </>
    );
  };

  const renderGuestDropdown = () => (
    <div className="space-x-2">
      <Link to={"client/login"}>
        <Button className="bg-white text-black px-10 hover:bg-gray-100">
          Client
        </Button>
      </Link>
      <Link to={"prestataire/login"}>
        <Button className="px-10">Prestataire</Button>
      </Link>
    </div>
  );
  // window.addEventListener("scroll", () => {
  //   const navbar = document.querySelector("nav");
  //   if (window.scrollY > 0) {
  //     navbar.classList.add("shadow-md");
  //   } else {
  //     navbar.classList.remove("shadow-md");
  //   }
  // });
  return (
    <>
      <nav className="sticky shadow-md top-0 p-[35px] bg-[#E2E2E2] z-10  font-HeroText flex justify-between items-center ">
        <ul className="flex items-center space-x-16">
          <li>
            <Link to={"/"}>
              <img
                src={logo}
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite React Logo"
              />
            </Link>
          </li>
          <li>About Us</li>
          <li>How it work</li>
          <li>Pricing</li>
          <li>FAQs</li>
        </ul>

        <div className="flex items-center space-x-4">
          {isLoggedIn
            ? renderDropdown(prestataire, isLoadingPrestataire, "prestataire")
            : isClientLoggedIn
            ? renderDropdown(client, isLoadingClient, "client")
            : renderGuestDropdown()}
        </div>
      </nav>
    </>
  );
}
