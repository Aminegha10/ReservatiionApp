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

export function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.Login.isLoggedIn);
  const isClientLoggedIn = useSelector((state) => state.ClientLogin.isLoggedIn);

  const prestataireId = localStorage.getItem("prestataireId");
  const clientId = localStorage.getItem("clientId");

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
      ) : null;

    return (
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
    );
  };

  const renderGuestDropdown = () => (
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
      <Link to="/prestataire/login">
        <Dropdown.Item>Prestataire</Dropdown.Item>
      </Link>
      <Link to="/client/login">
        <Dropdown.Item>Utilisateur</Dropdown.Item>
      </Link>
    </Dropdown>
  );

  return (
    <Navbar fluid rounded className="shadow-md">
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isLoggedIn
          ? renderDropdown(prestataire, isLoadingPrestataire, "prestataire")
          : isClientLoggedIn
          ? renderDropdown(client, isLoadingClient, "client")
          : renderGuestDropdown()}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/">
          <Navbar.Link active>Home</Navbar.Link>
        </Link>
        <Navbar.Link>About</Navbar.Link>
        <Navbar.Link>Services</Navbar.Link>
        <Navbar.Link>Contact</Navbar.Link>
        <Navbar.Link>Pricing</Navbar.Link>
        <Navbar.Link>Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
