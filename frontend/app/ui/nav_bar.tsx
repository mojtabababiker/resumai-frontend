"use client";
// the nav bar component
import React from 'react';
import { ButtonSolid, ButtonOutLine } from "@/app/ui/buttons";
import { User } from "@/app/utils/interfaces";


export default function NavBar({ user }: { user: User | null }) {

    const navItems = ['Home', 'About', 'Services', 'Contact'];
    const navLinkCSS = "block py-2 px-3 hover:text-[rgb(var(--primary-rgb))] focus:text-[rgb(var(--primary-rgb))] text-[rgb(var(--secondary-rgb))] md:p-0 transition-all ease-in";
    const navLinkActiveCSS = "block py-2 px-3 rounded bg-[rgb(var(--primary-rgb))] md:bg-transparent text-[rgb(var(--secondary-rgb))] md:text-[rgb(var(--primary-rgb))] md:p-0";
    const [openNavbar, setOpenNavbar] = React.useState(false);
    const [activeLink, setActiveLink] = React.useState('Home');

    // direct the user to the login page
    const handleLogin = () => {
        window.location.href = '/auth/login';
    };

    // log the user out, and delete its access token
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        window.location.href = '/';
    }

    // direct the un logged in user to the sign up page
    const toSignUp = () => {
        window.location.href = '/auth/signup';
    }

    // direct the logged in user to the dashboard page
    const toDashboard = () => {
        window.location.href = '/dashboard';
    }

    return (
        <nav className="bg-[rgb(var(--background-start-rgb))] fixed w-full z-20 top-0 start-0 border-b shadow-lg transition-all ease-in delay-75">
            <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex w-[20%] min-w-[130px] max-w-[180px] items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo-img.png" className=" drop-shadow-lg shadow-[rgb(var(--secondary-rgb))] hover:-skew-x-3 hover:skew-y-2 transition-transform ease-in delay-75" alt="Resumai Logo" />
                    {/* <span className="self-center text-2xl font-semibold whitespace-nowrap ">Resumai</span> */}
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ButtonOutLine className='hidden' onClick={user ? handleLogout : handleLogin}>{user ? "Logout" : "Login"}</ButtonOutLine>
                    <ButtonSolid onClick={user ? toDashboard : toSignUp}>{user ? "Dashboard" : "Get Started"}</ButtonSolid>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false" onClick={() => setOpenNavbar(!openNavbar)}>
                        <span className="sr-only">Open nav menu</span>
                        <svg className="w-5 h-5 outline-none text-[rgb(var(--primary-rgb))] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`${!openNavbar && 'hidden'} items-center justify-between w-full md:flex md:w-1/6 md:order-1 lg:w-2/3`} id="navbar-sticky">
                    <ul className="flex flex-col py-4 gap-y-5 md:p-0 mt-32 font-medium border border-gray-100 rounded-lg  md:space-x-8 md:flex-row md:mt-0 md:border-0 md:w-full md:items-center md:justify-center md:gap-3 lg:gap-6">
                        {navItems.map((item, index) => (
                            <li key={index}> {/*create a map or array that holds the true value of links */}
                                <a href={`#${item}`} key={`navLink-${index}`} className={item == activeLink ? navLinkActiveCSS : navLinkCSS} onClick={() => { setActiveLink(item) }}>{item}</a>
                            </li>
                        ))}
                        {/* <button type="button" className="text-[rgb(var(--primary-rgb))] block md:hidden align-bottom justify-self-end hover:opacity-90 focus:ring-4 focus:outline-none focus:[rgba(var(--primary-light-rgba))] font-medium rounded-lg text-lg py-2 mt-24 text-center transition-all ease-in-out delay-100">Login</button> */}
                        <ButtonOutLine className='md:hidden' onClick={user ? handleLogout : handleLogin}>{user ? "Logout" : "Login"}</ButtonOutLine>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export function DashboardNavBar({ user }: { user: User | null }) {
    const navItems: { [key: string]: string } = { 'Home': '/dashboard', 'About': '/dashboard/#about-resumai', 'Services': '/dashboard/#our-services', 'Contact': '/dashboard/#contact-us' };
    const navLinkCSS = "block py-2 px-3 hover:text-[rgb(var(--primary-rgb))] focus:text-[rgb(var(--primary-rgb))] text-[rgb(var(--secondary-rgb))] md:p-0 transition-all ease-in";
    const navLinkActiveCSS = "block py-2 px-3 rounded bg-[rgb(var(--primary-rgb))] md:bg-transparent text-[rgb(var(--secondary-rgb))] md:text-[rgb(var(--primary-rgb))] md:p-0";
    const [openNavbar, setOpenNavbar] = React.useState(false);
    const [activeLink, setActiveLink] = React.useState('Home');

    if (!user) {
        return <NavBar user={user} />;
    }

    return (
        <nav className="bg-[rgb(var(--background-start-rgb))] fixed w-full z-20 top-0 start-0 border-b shadow-lg transition-all ease-in delay-75">
            <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex w-[20%] min-w-[130px] max-w-[180px] items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo-img.png" className=" drop-shadow-lg shadow-[rgb(var(--secondary-rgb))] hover:-skew-x-3 hover:skew-y-2 transition-transform ease-in delay-75" alt="Resumai Logo" />
                    {/* <span className="self-center text-2xl font-semibold whitespace-nowrap ">Resumai</span> */}
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0">
                    <div className='flex justify-center items-center w-fit md:mr-4'><p className='w-fit font-semibold text-[rgb(var(--secondary-rgb))]'>{`${user.first_name} ${user.last_name}`}</p></div>
                    <div className='bg-[rgb(var(--primary-rgb))] text-[rgb(var(--background-start-rgb))] w-10 h-10 rounded-full flex flex-col justify-center items-center'><p> {user.first_name.charAt(0).toUpperCase()} </p></div>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false" onClick={() => setOpenNavbar(!openNavbar)}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5 outline-none text-[rgb(var(--primary-rgb))] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`${!openNavbar && 'hidden'} items-center justify-between w-full md:flex md:w-1/6 md:order-1 lg:w-2/3`} id="navbar-sticky">
                    <ul className="flex flex-col py-4 gap-y-5 md:p-0 mt-32 font-medium border rounded-lg  md:space-x-8 md:flex-row md:mt-0 md:border-0 md:w-full md:items-center md:justify-center md:gap-3 lg:gap-6">
                        {
                            /*navItems.map((item, index) => (
                                <li key={`${item}-${index}`}>
                                    <a href={`#${item}`} key={`navLink-${index}`} className={item == activeLink ? navLinkActiveCSS : navLinkCSS} onClick={() => { setActiveLink(item) }}>{item}</a>
                                </li>
                            ))*/
                            Object.keys(navItems).map((item, index) => (
                                <li key={`${item}-${index}`}>
                                    <a href={navItems[item]} key={`navLink-${index}`} className={item == activeLink ? navLinkActiveCSS : navLinkCSS} onClick={() => { setActiveLink(item) }}>{item}</a>
                                </li>
                            ))
                        }
                        {/* <button type="button" className="text-[rgb(var(--primary-rgb))] block md:hidden align-bottom justify-self-end hover:opacity-90 focus:ring-4 focus:outline-none focus:[rgba(var(--primary-light-rgba))] font-medium rounded-lg text-lg py-2 mt-24 text-center transition-all ease-in-out delay-100">Login</button> */}
                        {/* <ButtonOutLine className='md:hidden' onClick={user ? handleLogout : handleLogin}>{user ? "Logout" : "Login"}</ButtonOutLine> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
