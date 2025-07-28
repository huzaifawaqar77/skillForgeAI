"use client"
import {useEffect} from 'react'
import Image from "next/image";

import gsap from "gsap";

import {BulbAmico, Cloud, Hero1, Hero2, Hero3, InnovationAmico, LearningAmico} from "@/app/static/static";
import {Button} from "@/components/ui/button";

const Hero = () => {

    useEffect(() => {
        // GSAP animations setup
        // Set initial positions and rotations
        gsap.set('.bulb', {
            x: 0,
            y: 0,
        });

        gsap.set('.hero-heading', {
            y: -40,
            opacity: 0
        })


        // Animation for the images to float
        gsap.to('.bulb', {
            y: -10,
            x: -10,
            repeat: -1,
            duration: 2,
            stagger: 0.8,
            ease: "power1.inOut", // Correct GSAP ease syntax
            yoyo: true
        });

        gsap.to('.hero-heading', {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "power1.inOut"
        })


        // Animation for the button to pulse
        gsap.to('.hero-button', {
            scale: 1.05,
            repeat: -1,
            duration: 1.5,
            ease: "power1.inOut",
            yoyo: true
        });

    }, []);


    {/*--------------------------------Rendering Logic Goes Below--------------------------------*/
    }
    return (
        <section
            className={"hero-section container mx-auto flex flex-col lg:flex-row items-start justify-center gap-16 py-12 px-4 min-h-screen"}>

            {/* Text Content Section */}
            <div className={"text-center lg:text-left max-w-2xl"}>
                <h2 className={"hero-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"}>
                    Transform Your Career <br/>
                    with <span className={"text-amber-400"}>AI-Powered</span> <br/>
                    Skill Development
                </h2>
                <p className={"mt-6 text-lg md:text-xl text-gray-600"}>
                    Get personalized learning paths, AI mentoring, and industry-relevant
                    challenges that align with your career goals and market demands.
                </p>
                <p className={"text-sm mt-4 text-gray-500 italic"}>
                    Join thousands of professionals staying ahead in the rapidly
                    evolving tech landscape.
                </p>

                {/* CTA Button */}
                <Button
                    className={"hero-button mt-8 px-12 py-6 bg-amber-400 text-white text-xl font-semibold rounded-lg shadow-lg  transition-all duration-300"}>
                    Get Started For Free
                </Button>
            </div>

            {/* Image Section */}
            {/* On mobile, images stack vertically. On desktop, they are offset. */}
            <div
                className={"relative flex items-center justify-center w-full max-w-xs md:max-w-md lg:max-w-none lg:w-1/2 h-64 lg:h-auto"}>
                <Image
                    src={InnovationAmico}
                    alt={"Woman using an AI-powered tool on a futuristic interface"}
                    className={"rounded-xl h-[250px] w-[250px] lg:h-[500px] lg:w-[500px]"}
                />


                <Image
                    src={BulbAmico}
                    alt={"A shining bulb"}
                    className={"bulb hidden xl:block absolute rounded-xl h-[100px] w-[100px] -top-[5px] -left-[5px]"}
                />

                <Image
                    src={BulbAmico}
                    alt={"A shining bulb"}
                    className={"bulb hidden xl:block rounded-xl h-[100px] w-[100px] absolute -bottom-[5px] -left-[5px]"}
                />

                <Image
                    src={BulbAmico}
                    alt={"A shining bulb"}
                    className={"bulb hidden xl:block rounded-xl h-[100px] w-[100px] absolute -top-[5px] -right-[5px]"}
                />

                <Image
                    src={BulbAmico}
                    alt={"A shining bulb"}
                    className={"hidden xl:block rounded-xl h-[100px] w-[100px] absolute -bottom-[5px] -right-[5px]"}
                />
            </div>

        </section>
    )
}
export default Hero
