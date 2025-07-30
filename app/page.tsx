import Hero from "@/components/home/Hero";
import NavBar from "@/components/home/NavBar";
import ProblemStatement from "@/components/home/ProblemStatement";
import SolutionOverview from "@/components/home/SolutionOverview";

export default function Home() {
    return (
        <main>
            <NavBar/>
            <Hero/>
            <ProblemStatement/>
            <SolutionOverview/>
        </main>
    );
}
