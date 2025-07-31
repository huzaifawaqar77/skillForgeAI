import React from "react";
import {EvervaultCard, Icon} from "@/components/ui/evervault-card";

export function EvervaultCardDemo({heading, subheading, image}: {
    heading: string,
    subheading: string,
    image: string
}) {
    return (
        <div
            className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black"/>
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black"/>
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black"/>
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black"/>

            <EvervaultCard text={heading}/>

            <h2 className="dark:text-white text-black mt-4 text-sm font-light">
                {subheading}
            </h2>
        </div>
    );
}
