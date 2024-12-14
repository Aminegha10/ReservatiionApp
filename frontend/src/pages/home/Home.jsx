import HeroPicture from "@/assets/HeroPicture.png";

const Home = () => {
  return (
    <>
      {/* -----------------Header Section-------------------------- */}

      {/* Hero Section  */}
      <section className="flex  font-HeroText items-center gap-10">
        {/* HeroText */}
        <div className="space-y-4  ">
          <div className="text-[60px] tracking-[4px] font-regular">
            Always Track & <br /> Analyze Your Business <br /> Statistics To
            Succeed.
          </div>
          <div>
            A better way to manage your sales, team, clients & marketing
            <br /> — on a single platform. Powerful, affordable & easy.
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
          <img src={HeroPicture} alt="" />
        </div>
      </section>

      {/*--------------- Header Section------------------------ */}
    </>
  );
};

export default Home;
