"use client"
import {useEffect} from 'react'
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";

import {Avatar1, Avatar2, Avatar3, Avatar4} from "@/app/static/static";
import Counter from "@/components/Counter";
import {Bolt, ChartArea, Hammer, UserPlus} from "lucide-react";

import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const SocialProof = () => {

    useEffect(() => {
        gsap.set(".social-proof-heading", {
            y: 30,
            opacity: 0,
            scale: 0.8
        });

        gsap.set(".social-proof-stats", {
            y: 50,
            x: 50,
            opacity: 0,
            scale: 0.8
        });

        gsap.to('.social-proof-heading', {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".social-proof-heading",
                start: "top 80%",
                end: "bottom 30%",
                scrub: true
            }
        })

        gsap.to('.social-proof-stats', {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 2,
            stagger: 1.8,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".social-proof-stats",
                start: "top 80%",
                end: "bottom center",
                scrub: true
            }
        })
    }, []);

    const testimonials = [
        {
            quote:
                "SkillForge AI completely transformed our development workflow. The tools are intuitive, the documentation is top-notch, and the support team actually listens. We shipped features 3x faster.",
            name: "Alex Johnson",
            title: "CTO, DevFlow Inc.",
            image: Avatar1
        },
        {
            quote:
                "We integrated SkillForge AI's APIs in a day — something that usually takes us a week. Everything just works, and the performance is incredible.",
            name: "Sofia Martinez",
            title: "Backend Engineer, FinStack",
            image: Avatar2
        },
        {
            quote:
                "The open-source ethos behind SkillForge AI is refreshing. It’s not just a tool, it’s a community. We've contributed and learned so much.",
            name: "Daniel Kim",
            title: "Full Stack Developer, CodeKind",
            image: Avatar3
        },
        {
            quote:
                "From scalable infrastructure to seamless deployment, SkillForge AI gives us peace of mind. It’s like having a DevOps team on demand.",
            name: "Priya Shah",
            title: "Tech Lead, CloudMorph",
            image: Avatar4
        },
        {
            quote:
                "SkillForge AI’s newsletter and blog are part of my weekly reading. They break down complex topics in a way that’s clear, useful, and fun.",
            name: "Michael Lee",
            title: "Developer Advocate, DevVerse",
            image: Avatar1
        },
    ];


    return (
        <section className={"social-proof-section flex flex-col items-center justify-start mx-auto"}>
            {/*Text Content*/}
            <div className={"flex-col items-center justify-center text-center"}>
                <h2 className={"social-proof-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl"}>
                    Trusted by <span className={"gradient-primary"}>Professionals</span> Worldwide.
                </h2>
            </div>

            {/*Testimonials Section*/}
            <div className="w-full my-8">
                <InfiniteMovingCards items={testimonials} direction={"right"} speed={"slow"}/>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-8">
                <div className="social-proof-stats flex flex-col items-center justify-center gap-3">

                    <Counter
                        value={50000}
                        suffix={"+"}
                        className={""}
                        icon={UserPlus}
                        iconClassName={"text-orange-500 h-10 w-10"}
                    />
                    <p className={"text-md font-medium"}>
                        Active Learners
                    </p>
                </div>

                <div className="social-proof-stats flex flex-col items-center justify-center gap-3">

                    <Counter
                        value={89}
                        suffix={"%"}
                        className={""}
                        icon={ChartArea}
                        iconClassName={"text-violet-500 h-10 w-10"}
                    />
                    <p className={"text-md font-medium"}>
                        Career Advancement Rates
                    </p>
                </div>

                <div className="social-proof-stats flex flex-col items-center justify-center gap-3">

                    <Counter
                        value={2.3}
                        suffix={"x"}
                        className={""}
                        icon={Bolt}
                        iconClassName={"text-yellow-500 h-10 w-10"}
                    />
                    <p className={"text-md font-medium"}>
                        Faster Development Rates
                    </p>
                </div>

                <div className="social-proof-stats flex flex-col items-center justify-center gap-3">

                    <Counter
                        value={95}
                        suffix={"%"}
                        className={""}
                        icon={Hammer}
                        iconClassName={"text-purple-700 h-10 w-10"}
                    />
                    <p className={"text-md font-medium"}>
                        User Satisfaction
                    </p>
                </div>
            </div>
        </section>
    )
}
export default SocialProof
