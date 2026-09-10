import CardGrid from "@/src/components/CardGrid";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import Nav from "@/src/components/Nav";
import Testimonials from "@/src/components/Testimonials";


export default function Home() {
  return (
    <>
      <div className=" bg-brand-pink py-10 px-16">
        <Nav />
        <Hero />
      </div>
      <CardGrid />
      <Testimonials />
      <Footer />
    </>
    
    
   
  )
}
