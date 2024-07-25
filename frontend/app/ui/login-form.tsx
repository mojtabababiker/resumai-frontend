"use client";
import { BaseSyntheticEvent } from "react";

import { getLoginToken } from "@/app/utils/auth";

// the login form component


export default function LoginForm({ onSubmit }: { onSubmit: (event: BaseSyntheticEvent) => void }) {
    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col space-y-6 opacity-100 drop-shadow-2xl">
                <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium">Your Email</label>
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-[rgb(var(--primary-rgb))] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                    </div>
                    <input type="email" name="username" id="input-group-1" className="bg-gray-50 border border-gray-300 text-sm text-[rgb(var(--background-start-rgb))] rounded-lg :border-blue-500 block w-full ps-10 p-2.5 " placeholder="name@example.com" required />
                </div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm bg-slate-50 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                        <svg className="w-4 h-4 text-[rgb(var(--primary-rgb))] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                    </span>
                    <input type="password" id="password" name="password" className="rounded-none rounded-e-lg bg-gray-50 text-[rgb(var(--primary-rgb))] border  focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="Your password" required minLength={8} />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" name="remember" id="remember" className="rounded border-gray-300" />
                        <label htmlFor="remember" className="ml-2 text-xs">Remember me</label>
                    </div>
                    <a href="#" className="text-xs hover:underline">Forgot Password?</a>
                </div>
                <div>
                    <input type="submit" value="Login" className="mt-4 p-3 border rounded-md w-full self-end cursor-pointer hover:text-[rgb(var(--background-start-rgb))] hover:bg-slate-50 transition-colors ease-in delay-75" />
                </div>
            </form>
        </>
    );
}
