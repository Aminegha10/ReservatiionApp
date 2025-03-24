import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const Footer = () => {
  return (
    <footer
      className="bg-black text-white py-10 font-HeroText"
    >
      <div className="max-w-7xl px-[40px]">
        {/* Logo Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            {/* Logo Placeholder */}
            <div className=" bg-white text-center rounded-full flex items-center justify-center">
              <Link to="/">
                <img src={logo} className="h-10 py-2 mx-3 w-auto" alt="Logo" />
              </Link>{" "}
            </div>
            <h1 className="text-2xl font-semibold">FACILE</h1>
          </div>
        </div>

        <div className="md:flex justify-between">
          {/* Subscription Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">
              Want to receive our awesome stories?
            </h2>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-black rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-r-lg hover:bg-gray-200"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links Section */}
          <div className="md:flex md:w-2/3 space-y-8 md:space-y-0 md:justify-between">
            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-400">info@the18.design</p>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About us</li>
                <li>How it works</li>
                <li>Pricing</li>
                <li>FAQs</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Lead generation</li>
                <li>Customer engagement</li>
                <li>Customer support</li>
                <li>Outbound messages</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <p className="text-gray-500">© The 18 Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
