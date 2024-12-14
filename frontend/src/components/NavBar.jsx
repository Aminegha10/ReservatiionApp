/* eslint-disable no-unused-vars */
import { Avatar, Dropdown, Navbar } from "flowbite-react";
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

export function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.Login.isLoggedIn);
  const isClientLoggedIn = useSelector((state) => state.ClientLogin.isLoggedIn);

  const prestataireId = localStorage.getItem("prestataireId");
  const clientId = localStorage.getItem("clientId");
  console.log(clientId);

  const { data: prestataire, isLoading: isLoadingPrestataire } =
    useGetOnePrestataireQuery(prestataireId, {
      skip: !isLoggedIn,
    });

  const { data: client, isLoading: isLoadingClient } = useGetOneClientQuery(
    clientId,
    {
      skip: !isClientLoggedIn,
    }
  );

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
    return (
      <>
        {type == "prestataire" && (
          <button
            className="py-3 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
            aria-label="Cart"
          >
            <IoIosNotificationsOutline className="text-[35px]" />
            <span className="absolute inset-0 object-right-top -mr-6 ">
              <div className="inline-flex items-center px-[4px]  border-2 border-white rounded-full text-[10px] font-semibold leading-4 bg-red-500 text-white">
                2
              </div>
            </span>
          </button>
        )}
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
