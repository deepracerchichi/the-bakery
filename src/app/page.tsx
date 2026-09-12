import CardGrid from "@/components/CardGrid";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  return (
    <>
      <div className="bg-brand-pink py-10 px-16">
        <Nav />
        <Hero />
      </div>
      <CardGrid />
      <Testimonials />
      <Footer />
    </>
    
    
   
  )
}
