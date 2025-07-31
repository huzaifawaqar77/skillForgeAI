import Hero from "@/components/home/Hero";
import NavBar from "@/components/home/NavBar";
import ProblemStatement from "@/components/home/ProblemStatement";
import SolutionOverview from "@/components/home/SolutionOverview";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "@/components/home/Footer";

export default function Home() {
    return (
        <main>
            <NavBar/>
            <Hero/>
            <ProblemStatement/>
            <SolutionOverview/>
            <HowItWorks/>
            <Footer/>
        </main>
    );
}
