import Hero from "./sections/Hero";
import Services from "./sections/Services";
import About from "./sections/About";
import Gallery from "./sections/Gallery";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import DoorPanels from "./sections/DoorPanels";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import "./index.css";
import "./App.css";

export default function App() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <FAQ />
        <DoorPanels />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
