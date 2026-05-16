import Hero from '@/components/sections/Hero';
import GlobalPartners from '@/components/sections/GlobalPartners';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import HeroVideo from '@/components/HeroVideo';

export default function Home() {
  return (
    <>
      {/* Fixed hero video — static while scrolling Hero+GlobalPartners,
          fades out as Services enters the viewport */}
      <HeroVideo />
      <Hero />
      <GlobalPartners />
      <Services />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
