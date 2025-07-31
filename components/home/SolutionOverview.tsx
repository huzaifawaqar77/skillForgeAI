"use client"
import {useEffect} from 'react'
import {ScrollTrigger} from "gsap/all";
import gsap from "gsap";
import Image from "next/image";

import {AIMentor, FutureProofSkills, LearningPath, PersonalizedAnalysis, RealWorld} from "@/app/static/static";
import {Plus, PlusIcon} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SolutionOverview = () => {
    useEffect(() => {

        gsap.set('.solution-overview-heading', {
            y: -30,
            opacity: 0,
            scale: 0.7
        })

        gsap.set('.solution-card', {
            y: 20,
            opacity: 0,
            scale: 0.85
        })

        gsap.to(".solution-overview-heading", {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".solution-overview-section",
                start: "top 70%",
                end: "top 10%",
                scrub: true
            }
        });

        gsap.to('.solution-card', {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power1.inOut",
            duration: 2,
            stagger: 1.5,
            scrollTrigger: {
                trigger: ".solution-card",
                start: "top 70%",
                end: "top center",
                scrub: true
            }
        })
    }, []);
    return (
        <section
            className={"solution-overview-section flex flex-col items-center justify-start mx-auto"}>
            {/*Text Content*/}
            <div className={"solution-overview-heading flex-col items-center justify-center text-center"}>
                <h2 className={"problem-statement-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl"}>
                    Meet Your <span className={"gradient-primary"}>AI-Powered</span> Career Companion
                </h2>
                <p className={"problem-statement-subheading mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"}>
                    SkillForge AI bridges the gap between where you are and where the industry
                    is heading. Our platform combines cutting-edge AI technology with real-world
                    industry insights to create a truly personalized professional development
                    experience.
                </p>
            </div>

            {/*Solution Cards*/}
            <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
                <SolutionCard imgSrc={PersonalizedAnalysis} title={"Personalized Analysis"}
                              description={"AI analyzes your current skills and industry trends"}/>

                <SolutionCard imgSrc={LearningPath} title={"Smart Learning Paths"}
                              description={"Custom roadmaps based on your career goals"}/>

                <SolutionCard imgSrc={AIMentor} title={"AI Mentoring"}
                              description={"24/7 access to intelligent career guidance"}/>

                <SolutionCard imgSrc={RealWorld} title={"Real-World Practice"}
                              description={"Industry-specific challenges and simulations"}/>
            </div>


        </section>
    )
}
export default SolutionOverview


const SolutionCard = ({title, description, imgSrc}: { title: string, description: string, imgSrc: string }) => {
    return (
        <div
            className={"relative solution-card p-3 flex flex-col items-center justify-between border-2 border-gray-100"}>

            {/*Four Plus Icons, each positioned to each corner*/}
            <Plus className={"absolute -top-2 -left-2 h-4 w-4 text-gray-300"}/>
            <Plus className={"absolute -top-2 -right-2 h-4 w-4 text-gray-300"}/>
            <Plus className={"absolute -bottom-2 -left-2 h-4 w-4 text-gray-300"}/>
            <Plus className={"absolute -bottom-2 -right-2 h-4 w-4 text-gray-300"}/>


            <Image src={imgSrc} alt={"solution card"} className={"h-96 w-full object-contain"}/>
            <div className={"flex flex-col items-center justify-center gap-3"}>
                <h2 className={"text-2xl font-bold text-center"}>
                    {title}
                </h2>
                <p className="text-base text-center">
                    {description}
                </p>
            </div>
        </div>
    )
}