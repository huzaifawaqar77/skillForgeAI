import React from 'react'
import Image from "next/image";
import {BurgerMenu} from "@/app/static/static";

const NavBar = () => {
    return (
        <nav className={"sticky top-0 left-0 flex items-center justify-between px-8 lg:px-20 z-50 bg-zinc-50"}>
            {/*Hamburger Menu Icon*/}
            <Image src={BurgerMenu} alt={"Burger menu"} className={"h-12 w-12"}/>

            {/*Navigation Items*/}
            <ul className={"hidden md:flex items-center justify-between gap-10"}>
                <li>Home</li>
                <li>About Us</li>
                <li>Our Mission</li>
                <li>Contact us</li>
            </ul>
        </nav>
    )
}
export default NavBar
