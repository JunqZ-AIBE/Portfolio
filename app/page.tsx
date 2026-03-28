import { NavBar } from "@/components/sections/NavBar";
import { Hero } from "@/components/sections/Hero";
import { Specialties } from "@/components/sections/Specialties";
import { AIDemo } from "@/components/sections/AIDemo";
import { AIRadar } from "@/components/sections/AIRadar";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Specialties />
        <AIDemo />
        <AIRadar />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
