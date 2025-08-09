import React from 'react'
import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className={"flex flex-col items-center justify-start h-full w-full py-8"}>
            <h2 className={"text-2xl gradient-primary font-extrabold"}>
                SkillForge AI
            </h2>

            <ul className={"flex flex-col gap-2 mt-8"}>
                <Link href={"/dashboard"}
                      className={"px-3 py-1 font-semibold text-gray-700 hover:text-gray-950 w-full transition-all"}>
                    <li>Home</li>
                </Link>
                <Link href={"/dashboard/resume"}
                      className={"px-3 py-1 font-semibold text-gray-700 hover:text-gray-950 w-full transition-all"}>
                    <li>Resume</li>
                </Link>
                <Link href={"/dashboard/assessment"}
                      className={"px-3 py-1 font-semibold text-gray-700 hover:text-gray-950 w-full transition-all"}>
                    <li>Assessments</li>
                </Link>
                <Link href={"/dashboard/scores"}
                      className={"px-3 py-1 font-semibold text-gray-700 hover:text-gray-950 w-full transition-all"}>
                    <li>Scores</li>
                </Link>
            </ul>
        </aside>
    )
}
export default Sidebar
