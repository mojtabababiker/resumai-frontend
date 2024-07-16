"use client";
import React from "react";
import NavBar from "@/app/ui/nav_bar";
import { ButtonSolid } from "./ui/buttons";
import HeroSlider from "@/app/ui/hero-images-slider";

import { useUser } from "@/app/utils/auth";

export default function Home() {
  const { user, isLoading, isError } = useUser();

  if (isLoading) <div>Loading...</div>;
  if (isError) console.log(isError);

  // direct the un logged in user to the sign up page
  const toSignUp = () => {
    window.location.href = '/auth/signup';
  }

  // direct the logged in user to the dashboard page
  const toDashboard = () => {
    window.location.href = '/dashboard';
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 mt-28 md:mt-20 mx-auto md:p-16z xl:m-24">
      {<NavBar user={user}></NavBar>}
      {/* Hero */}
      <section className="h-[100svh - 60px] md:h-[100svh - 120px] flex flex-col md:flex-row gap-4 py-4 px-5 mt-24 md:mt-32 lg:mt-24">
        {/* slogan */}
        <div className="relative w-full md:w-1/2 flex flex-col justify-around items-center gap-4">
          <h1 className="text-6xl text-center md:text-left md:text-6xl lg:text-8xl font-bold">Your Resume, Automated</h1>
          <p className="w-full text-xl text-center md:text-left leading-10">Get your resume written by AI</p>
          <ButtonSolid className="lg:self-start opacity-75 px-5 py-4 text-lg" onClick={user ? toDashboard : toSignUp}>Build Your Resume</ButtonSolid>
        </div>
        {/* hero image */}
        <div className="relative w-full md:w-auto flex justify-center items-center flex-col">
          <HeroSlider />
        </div>
      </section>
      {/* About */}
      {/* Footer */}
    </main >
  );
}
