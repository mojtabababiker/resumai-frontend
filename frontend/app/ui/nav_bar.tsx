"use client";
// the nav bar component
import React from 'react';
import { ButtonSolid, ButtonOutLine } from "@/app/ui/buttons";

export default function NavBar() {

    const navItems = ['Home', 'About', 'Services', 'Contact'];
    const navLinkCSS = "block py-2 px-3 hover:text-[rgb(var(--primary-rgb))] focus:text-[rgb(var(--primary-rgb))] text-[rgba(var(--primary-light-rgba))] md:p-0 transition-all ease-in";
    const navLinkActiveCSS = "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0";
    const [openNavbar, setOpenNavbar] = React.useState(false);
    const [activeLink, setActiveLink] = React.useState('Home');
    return (
        <nav className="bg-[rgb(var(--background-start-rgb))] fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-lg transition-all ease-in delay-75">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">Resumai</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ButtonOutLine className='hidden'>Login</ButtonOutLine>
                    <ButtonSolid>Get Started</ButtonSolid>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false" onClick={() => setOpenNavbar(!openNavbar)}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5 outline-none text-[rgb(var(--primary-rgb))] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`${!openNavbar && 'hidden'} items-center justify-between w-full md:flex md:w-1/3 md:order-1 lg:w-2/3`} id="navbar-sticky">
                    <ul className="flex flex-col py-4 gap-y-5 md:p-0 mt-32 font-medium border border-gray-100 rounded-lg  md:space-x-8 md:flex-row md:mt-0 md:border-0 md:w-full md:items-center md:justify-center md:gap-3 lg:gap-6">
                        {navItems.map((item, index) => (
                            <li>
                                <a href={`#${item}`} key={`navLink-${index}`} className={item == activeLink ? navLinkActiveCSS : navLinkCSS} onClick={() => { setActiveLink(item) }}>{item}</a>
                            </li>
                        ))}
                        <button type="button" className="text-[rgb(var(--primary-rgb))] block md:hidden align-bottom justify-self-end hover:opacity-90 focus:ring-4 focus:outline-none focus:[rgba(var(--primary-light-rgba))] font-medium rounded-lg text-lg py-2 mt-24 text-center transition-all ease-in-out delay-100">Login</button>
                    </ul>
                </div>
            </div>
        </nav>
    );
}