import Hero from "@/components/home/Hero";
import NavBar from "@/components/home/NavBar";
import ProblemStatement from "@/components/home/ProblemStatement";

export default function Home() {
    return (
        <main>
            <NavBar/>
            <Hero/>
            <ProblemStatement/>
        </main>
    );
}
