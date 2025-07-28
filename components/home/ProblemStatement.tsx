import React from 'react'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Hero1, Hero2, Hero3} from "@/app/static/static";

const ProblemStatement = () => {
    return (
        <section
            className={"problem-statement-section container mx-auto flex flex-col lg:flex-row items-start justify-center gap-16 py-12 px-4 min-h-screen"}>

            {/* Text Content Section */}
            <div className={"text-center lg:text-left max-w-2xl"}>
                <h2 className={"text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"}>
                    The Skills Gap Crisis is Real
                </h2>
                <p className={"mt-6 text-lg md:text-xl text-gray-600"}>
                    Get personalized learning paths, AI mentoring, and industry-relevant
                    challenges that align with your career goals and market demands.
                </p>
                <p className={"text-sm mt-4 text-gray-500 italic"}>
                    Join thousands of professionals staying ahead in the rapidly
                    evolving tech landscape.
                </p>
                
            </div>
        </section>
    )
}
export default ProblemStatement
