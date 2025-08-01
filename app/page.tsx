import Hero from "@/components/home/Hero";
import NavBar from "@/components/home/NavBar";
import ProblemStatement from "@/components/home/ProblemStatement";
import SolutionOverview from "@/components/home/SolutionOverview";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "@/components/home/Footer";
import SocialProof from "@/components/home/SocialProof";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
    return (
        <main>
            <NavBar/>
            <Hero/>
            <ProblemStatement/>
            <SolutionOverview/>
            <HowItWorks/>
            <SocialProof/>
            <FAQ/>
            <FinalCTA/>
            <Footer/>
        </main>
    );
}
