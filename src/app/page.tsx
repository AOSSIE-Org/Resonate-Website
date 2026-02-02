'use client';

import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/NavBar/Navbar';
import Hero from '../components/Hero/Hero';
import AboutSection from '../components/AboutSection/AboutSection';
import MiddleSection from '../components/MiddleSection/MiddleSection';
import BottomSection from '../components/BottomSection/BottomSection';
import NewFooter from '../components/NewFooter/NewFooter';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <Hero />
        <AboutSection />
        <MiddleSection />
        <BottomSection />
        <NewFooter />
      </div>
    </ThemeProvider>
  );
}