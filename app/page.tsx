import Hero from "@/src/components/Hero";
import Nav from "@/src/components/Nav";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-brand-pink py-4 px-16">
      <Nav />
      <Hero />
    </div>
    
   
  )
}
