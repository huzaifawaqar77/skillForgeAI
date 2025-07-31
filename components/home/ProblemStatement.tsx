"use client";
import gsap from "gsap";
import {CardSpotlight} from "@/components/ui/card-spotlight";
import {LucidePenTool} from "lucide-react";
import {SiFuturelearn, SiTalenthouse} from "react-icons/si";
import {BiLogoTripAdvisor} from "react-icons/bi";
import {useEffect} from "react";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ProblemStatement = () => {
    useEffect(() => {
        gsap.set(".problem-statement-heading", {
            y: -20,
            opacity: 0,
            scale: 0.5,
        });

        gsap.set(".problem-statement-subheading", {
            y: -20,
            opacity: 0,
            scale: 0.5,
        });

        gsap.set(".problem-statement-card", {
            y: 50,
            opacity: 0,
            scale: 0.8,
        });

        gsap.to(".problem-statement-heading", {
            y: 0,
            opacity: 1,
            duration: 2,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".problem-statement-heading",
                start: "top 80%",
                end: "bottom 50%",
                scrub: true,
            },
        });

        gsap.to(".problem-statement-subheading", {
            y: 0,
            opacity: 1,
            duration: 2,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".problem-statement-subheading",
                start: "top 80%",
                end: "bottom 50%",
                scrub: true,
            },
        });

        gsap.to(".problem-statement-card", {
            y: 0,
            opacity: 1,
            duration: 2,
            scale: 1,
            stagger: 1.5,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".problem-statement-card",
                start: "top 80%",
                end: "bottom 50%",
                scrub: true,
            },
        });
    }, []);

    return (
        <section
            className={
                "problem-statement-section flex flex-col items-center justify-start mx-auto"
            }
        >
            {/* Text Content Section */}
            <div className={"flex-col items-center justify-center text-center"}>
                <h2
                    className={
                        "problem-statement-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl"
                    }
                >
                    The <span className={"gradient-primary"}>Skills Gap</span> Crisis is
                    Real
                </h2>
                <p
                    className={
                        "problem-statement-subheading mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
                    }
                >
                    Get personalized learning paths, AI mentoring, and industry-relevant
                    challenges that align with your career goals and market demands.
                </p>
                <p
                    className={
                        "problem-statement-subheading text-sm mt-4 text-gray-500 italic max-w-2xl"
                    }
                >
                    Join thousands of professionals staying ahead in the rapidly evolving
                    tech landscape.
                </p>
            </div>
            {/*Card Contents*/}
            {/* ✅ CORRECTION: Removed h-96 from this div */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 z-30">
                <CardSpotlight className="problem-statement-card space-y-6">
                    <div className={"flex items-center justify-center p-2"}>
                        <LucidePenTool className={"h-20 w-20 text-white"}/>
                    </div>

                    <p className="text-xl font-bold relative z-20 mt-2 text-white">
                        Outdated Skills Threaten Career Longevity
                    </p>

                    <p className="text-neutral-300 mt-4 relative z-20 text-sm">
                        87% of professionals feel their skills will become outdated within 2
                        years, making continuous learning a necessity, not a choice.
                    </p>
                </CardSpotlight>
                <CardSpotlight className="problem-statement-card space-y-6">
                    <div className={"flex items-center justify-center p-2"}>
                        <SiTalenthouse className={"h-20 w-20 text-white"}/>
                    </div>

                    <p className="text-xl font-bold relative z-20 mt-2 text-white">
                        Talent Shortage Challenges Employers
                    </p>

                    <p className="text-neutral-300 mt-4 relative z-20 text-sm">
                        Organizations are struggling to find candidates with the current,
                        relevant skills needed to keep pace with evolving technologies and
                        market demands.
                    </p>
                </CardSpotlight>
                <CardSpotlight className="problem-statement-card space-y-6">
                    <div className={"flex items-center justify-center p-2"}>
                        <SiFuturelearn className={"h-20 w-20 text-white"}/>
                    </div>

                    <p className="text-xl font-bold relative z-20 mt-2 text-white">
                        Learning Platforms Are Falling Behind
                    </p>

                    <p className="text-neutral-300 mt-4 relative z-20 text-sm">
                        Traditional education systems and online platforms often fail to
                        keep up with industry shifts, leaving learners unprepared for
                        real-world challenges.
                    </p>
                </CardSpotlight>
                <CardSpotlight className="problem-statement-card space-y-6">
                    <div className={"flex items-center justify-center p-2"}>
                        <BiLogoTripAdvisor className={"h-20 w-20 text-white"}/>
                    </div>

                    <p className="text-xl font-bold relative z-20 mt-2 text-white">
                        One-Size-Fits-All Advice Doesn’t Work{" "}
                    </p>

                    <p className="text-neutral-300 mt-4 relative z-20 text-sm">
                        Generic career advice ignores your personal journey, goals, and
                        experience—leading to misaligned opportunities and wasted potential.
                    </p>
                </CardSpotlight>
            </div>
        </section>
    );
};
export default ProblemStatement;
