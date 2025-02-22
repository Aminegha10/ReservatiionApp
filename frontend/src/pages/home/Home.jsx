import HeroPicture from "@/assets/HeroPicture.png";
import AboutUs from "@/assets/AboutUs.png";
import How from "@/assets/How.png";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaHandsHelping,
  FaSearch,
} from "react-icons/fa";
import FAQ from "@/assets/FAQ.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 260, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 2000, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  });

  return (
    <>
      {/* -----------------Header Section-------------------------- */}

      {/* Hero Section  */}
      <section
        data-aos="zoom-in"
        className="flex container mx-auto font-HeroText items-center gap-10 space-x-2"
      >
        {/* HeroText */}
        <div className="space-y-4  ">
          <div className="text-[60px] tracking-[4px] font-regular">
            Effortlessly Manage & <br />
            Optimize Your Service <br />
            Bookings with Facile
          </div>
          <div>
            Simplify your search, grow your business, and succeed — all in one
            powerful platform
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter your email"
              className="placeholder:text-black pr-[102px]"
            />
            <button className="bg-[#151515] border border-solid border-black text-white p-[8px]">
              GetStarted
            </button>
          </div>
        </div>
        {/* HeroPicture */}
        <div>
          <img src={HeroPicture} alt="" className="max-w-full h-auto" />
        </div>
      </section>

      {/*--------------- Header Section------------------------ */}
      {/* About us  */}
      <div
        className="flex justify-between items-center py-12"
        data-aos="fade-right"
      >
        <div className="w-[700px]">
          <img src={AboutUs} alt="Illustration" />
        </div>
        <div className="w-[800px]">
          <h3 className="text-sm  font-semibold text-black uppercase">
            <span className="border solid p-2 border-black"> About Us</span>
          </h3>
          <h1 className="text-[50px]  mt-2">
            Faster, friendlier feedback loops make life easier.
          </h1>
          <p className="text-gray-600 mt-4">
            Add a <span className="font-semibold">Viewer</span> to your team so
            they can see everything you share, or invite people to individual
            documents. Its up to you.
            <span className="font-semibold">Stakeholders</span> can check out
            designs in their web browser, test prototypes and leave feedback for
            free.
          </p>
          <ul className="mt-6 space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="text-gray-500 mr-2">◼</span> Shared Cloud
              Libraries, for a single source of truth
            </li>
            <li className="flex items-center">
              <span className="text-gray-500 mr-2">◼</span> Prototype previews
              for user testing and research
            </li>
            <li className="flex items-center">
              <span className="text-gray-500 mr-2">◼</span> Easy organization
              with projects
            </li>
            <li className="flex items-center">
              <span className="text-gray-500 mr-2">◼</span> Free developer
              handoff, right inside the browser
            </li>
            <li className="flex items-center">
              <span className="text-gray-500 mr-2">◼</span> Two-factor
              authentication and SSO
            </li>
          </ul>
        </div>
      </div>
      {/*  */}
      <div
        className="bg-white text-gray-900 flex justify-between items-center py-8"
        data-aos="fade-left"
      >
        <div className="w-[700px]">
          <h3 className="text-sm font-semibold text-black uppercase">
            <span className="border solid p-2 border-black"> How It Works</span>
          </h3>
          <h1 className="text-[50px]  mt-2">
            Building the best space for collaboration.
          </h1>
          <div className="mt-6 space-y-6 pl-6">
            <div className="flex items-center space-x-7">
              <div>
                <FaSearch className="text-4xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  Créez un compte prestataire
                </h2>
                <p className="text-gray-600">
                  Inscrivez-vous en tant que prestataire pour commencer à offrir
                  vos services. Remplissez les informations nécessaires et
                  mettez en avant vos services.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-7">
              <div>
                <FaHandsHelping className="text-4xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Publiez vos services</h2>
                <p className="text-gray-600">
                  Ajoutez des détails sur les services que vous proposez, y
                  compris les tarifs, les horaires, et des photos pour attirer
                  plus de clients.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-7">
              <div>
                <FaCalendarAlt className="text-4xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  Gérez vos réservations
                </h2>
                <p className="text-gray-600">
                  Gérez facilement vos rendez-vous via la plateforme. Vous
                  pouvez accepter ou refuser des réservations et ajuster votre
                  emploi du temps en fonction de vos disponibilités.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-7">
              <div>
                <FaCheckCircle className="text-4xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  Développez votre activité
                </h2>
                <p className="text-gray-600">
                  Grâce aux évaluations des clients et à la visibilité offerte
                  par Facile, vous pourrez augmenter votre clientèle et faire
                  croître votre entreprise.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[700px]">
          <img src={How} alt="Illustration" />
        </div>
      </div>
      {/* FAQ QUESTIONS */}
      <div className="bg-white min-h-screen p-10" data-aos="fade-up">
        <div className=" w-full flex justify-between  items-center">
          <div>
            <img src={FAQ} alt="FAQ Illustration" className="w-full mb-6" />
          </div>
          <div className="w-[700px]">
            <h3 className="text-sm  font-semibold text-black uppercase">
              <span className="border solid px-8 py-2 border-black"> FAQ</span>
            </h3>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-8">
              Common Questions.
            </h2>
            <p className="text-gray-600 mb-8">
              The online form also provides links to a set of frequently asked
              questions, other information materials related to the financial
              disclosure programme.
            </p>

            <div className="border-b border-gray-200 py-4">
              <h3 className="text-lg font-semibold text-gray-900 flex justify-between">
                How much does a Teams subscription cost?<span>+</span>
              </h3>
              <p className="text-gray-600 text-sm mt-2 hidden">
                Contributors are members of your team who need access to use the
                Mac app to create and edit Sketch documents. These prices don’t
                include sales tax, which may still apply. Head over to our
                pricing page to get full details.
              </p>
            </div>

            <div className="border-b border-gray-200 py-4">
              <h3 className="text-lg font-semibold text-gray-900 flex justify-between">
                Do I still need to purchase licenses for the Mac app?
                <span>-</span>
              </h3>
            </div>

            <div className="border-b border-gray-200 py-4">
              <h3 className="text-lg font-semibold text-gray-900 flex justify-between">
                What are the differences between Contributors and Viewers?
                <span>-</span>
              </h3>
            </div>

            <div className="border-b border-gray-200 py-4">
              <h3 className="text-lg font-semibold text-gray-900 flex justify-between">
                How long does the free Teams subscription trial last?
                <span>-</span>
              </h3>
            </div>

            <div className="border-b border-gray-200 py-4">
              <h3 className="text-lg font-semibold text-gray-900 flex justify-between">
                Will program for Teams replace volume licensing?<span>-</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
