import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Frames from "./components/frames";
import TechBanner from "./components/techBanner";
import AOBanner from "./components/aoBanner";
import Promo from "./components/promo";
import Footer from "./components/footer";


function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Frames />
      <TechBanner />
      <AOBanner />
      <Promo />
      <Footer />
    </div>
  );
}

export default App;
