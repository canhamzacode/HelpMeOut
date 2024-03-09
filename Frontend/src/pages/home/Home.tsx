import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Features from "../../components/features/Features";
import HowItWorks from "../../components/howItWorks/HowItWorks";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;
