"use client"
import {useEffect} from 'react';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {


    useEffect(() => {
        gsap.set('.how-it-works-heading', {
            y: 20,
            opacity: 0,
            scale: 0.8
        })

        gsap.set('.how-it-works-subheading', {
            y: 20,
            opacity: 0,
            scale: 0.8
        })

        gsap.set('.how-it-works-step', {
            y: 20,
            x: 20,
            opacity: 0,
            scale: 0.8
        })

        gsap.set('.how-it-works-stepheading', {
            y: 20,
            x: 20,
            opacity: 0,
            scale: 0.8
        })

        gsap.set('.how-it-works-steptext', {
            y: 20,
            x: 20,
            opacity: 0,
            scale: 0.8
        })

        gsap.to('.how-it-works-heading', {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power1.inOut",
            duration: 2,
            scrollTrigger: {
                trigger: '.how-it-works-section',
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            }
        })

        gsap.to('.how-it-works-subheading', {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power1.inOut",
            duration: 2,
            scrollTrigger: {
                trigger: '.how-it-works-section',
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            }
        })

        gsap.to('.how-it-works-stepheading', {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            ease: "power1.inOut",
            duration: 2,
            scrollTrigger: {
                trigger: '.how-it-works-stepheading',
                start: "top 80%",
                end: "bottom 60%",
                scrub: true
            }
        })

        gsap.to('.how-it-works-steptext', {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            ease: "power1.inOut",
            duration: 2,
            scrollTrigger: {
                trigger: '.how-it-works-steptext',
                start: "top 80%",
                end: "bottom 60%",
                scrub: true
            }
        })

        gsap.to('.how-it-works-step', {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            ease: "sine.inOut",
            duration: 2,
            stagger: 1.5,
            scrollTrigger: {
                trigger: '.how-it-works-step',
                start: "top 90%",
                end: "bottom center",
                scrub: true
            }
        })
    }, []);

    const steps = [
        {
            title: "Step 1",
            description: "Complete Your Profile",
            text: "Tell us about your background, current skills, and career aspirations.",
            color: "bg-gradient-to-br from-orange-500 to-red-700 shadow-sm shadow-orange-500"
        },
        {
            title: "Step 2",
            description: "Get Your AI Analysis",
            text: "Our AI creates your personalized skill map and identifies growth opportunities.",
            color: "bg-gradient-to-br from-emerald-500 to-green-700 shadow-sm shadow-emerald-500"
        },
        {
            title: "Step 3",
            description: "Follow Your Learning Path",
            text: "Access curated content, practice challenges, and AI mentoring tailored to you.",
            color: "bg-gradient-to-br from-blue-500 to-purple-700 shadow-sm shadow-blue-500"
        },
        {
            title: "Step 4",
            description: "Track Your Progress",
            text: "Monitor your skill development and see how you're advancing toward your goals.",
            color: "bg-gradient-to-br from-gray-500 to-zinc-200 shadow-sm shadow-gray-500"
        }
    ]
    return (
        <section className={"how-it-works-section flex flex-col items-center justify-start mx-auto"} style={{
            minHeight: "fit-content",
        }}>
            {/*Text Content*/}
            <div className={"flex-col items-center justify-center text-center"}>
                <h2 className={"how-it-works-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl text-white"}>
                    How it <span className={"gradient-primary"}>Works</span>
                </h2>
                <p className={"how-it-works-subheading mt-6 text-lg md:text-xl text-white max-w-2xl"}>
                    Your Success Journey in 4 Simple Steps.
                </p>
            </div>

            {/* How It Works Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 divide-y divide-gray-300 my-8">
                {
                    steps.map((step, index) => (
                        <div
                            key={index}
                            className={`how-it-works-step h-56 w-56 xl:h-72 xl:w-72 rounded-full flex flex-col gap-2 items-center justify-center ${step.color}`}>
                            <h2 className="how-it-works-stepheading text-3xl font-bold text-white">{step.title}</h2>
                            <p className="how-it-works-steptext text-xs text-white w-3/4 text-center">
                                {step.text}
                            </p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
export default HowItWorks
