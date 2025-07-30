"use client"
import {useEffect} from 'react'
import ScrollStack, {ScrollStackItem} from "@/components/ScrollStack";
import {ScrollTrigger} from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const SolutionOverview = () => {
    useEffect(() => {

        gsap.set('.solution-overview-heading', {
            y: -30,
            opacity: 0,
            scale: 0.7
        })

        gsap.to(".solution-overview-heading", {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".solution-overview-section",
                start: "top 70%",
                end: "top: 10%",
                scrub: true
            }
        });
    }, []);
    return (
        <section
            className={"solution-overview-section flex flex-col items-center justify-start mx-auto"}>
            {/*Text Content*/}
            <div className={"solution-overview-heading flex-col items-center justify-center text-center"}>
                <h2 className={"problem-statement-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl"}>
                    Meet Your AI-Powered Career Companion
                </h2>
                <p className={"problem-statement-subheading mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"}>
                    SkillForge AI bridges the gap between where you are and where the industry
                    is heading. Our platform combines cutting-edge AI technology with real-world
                    industry insights to create a truly personalized professional development
                    experience.
                </p>
            </div>

            {/*Card Stacks*/}
            <ScrollStack>
                <ScrollStackItem itemClassName={" scroll-stack-card-1 bg-zinc-50"}>
                    <h2 className={"text-3xl font-bold"}>Personalized Analysis</h2>
                    <p>AI analyzes your current skills and industry trends</p>
                </ScrollStackItem>
                <ScrollStackItem itemClassName={"scroll-stack-card-2 bg-zinc-50"}>
                    <h2 className={"text-3xl font-bold"}>Smart Learning Paths</h2>
                    <p>Custom roadmaps based on your career goals</p>
                </ScrollStackItem>
                <ScrollStackItem itemClassName={"scroll-stack-card-3 bg-zinc-50"}>
                    <h2 className={"text-3xl font-bold"}>AI Mentoring</h2>
                    <p>24/7 access to intelligent career guidance</p>
                </ScrollStackItem>
                <ScrollStackItem itemClassName={"scroll-stack-card-4 bg-zinc-50"}>
                    <h2 className={"text-3xl font-bold"}>Real-World Practice</h2>
                    <p>Industry-specific challenges and simulations</p>
                </ScrollStackItem>
                <ScrollStackItem itemClassName={"scroll-stack-card-5 bg-zinc-50"}>
                    <h2 className={"text-3xl font-bold"}>Future-Proof Skills</h2>
                    <p>Stay ahead of emerging technology trends</p>
                </ScrollStackItem>
            </ScrollStack>

        </section>
    )
}
export default SolutionOverview
