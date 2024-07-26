"use client";
import { BaseSyntheticEvent, useState } from "react";

import { getLoginToken } from "@/app/utils/auth";

// the login form component


// TODO: Add First name and last name validation
// TODO: Add password length validation

export default function SignUpForm({ onSubmit }: { onSubmit: (event: BaseSyntheticEvent) => void }) {
    const [pass, setPass] = useState('');  // a state the saved the value of the password field
    const [passUnMatch, setPassUnMatch] = useState(false);  // a flag indicate either the password matches or not

    const validatePasswordMatch = (event: BaseSyntheticEvent) => {
        const confirmedPass = event.target.value;

        if (pass !== confirmedPass) {
            setPassUnMatch(true);
            console.log(`${pass} !== ${confirmedPass}`);
        } else {
            setPassUnMatch(false);
            console.log(`${pass} === ${confirmedPass}`);
        }
    }
    return (
        <form onSubmit={onSubmit} className="flex flex-col space-y-6 w-full text-[rgb(var(--secondary-rgb))] opacity-100 drop-shadow-2xl">
            <div className="grid md:grid-cols-2 gap-y-6 md:gap-6">
                <div className="relative z-0 w-full group">
                    <input type="text" name="first_name" id="first_name" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[rgb(var(--primary-rgb))] peer" placeholder=" " required />
                    <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[rgb(var(--primary-rgb))]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full group">
                    <input type="text" name="last_name" id="last_name" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[rgb(var(--primary-rgb))] peer" placeholder=" " required />
                    <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[rgb(var(--primary-rgb))]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                </div>
            </div>
            <div className="relative z-0 w-full group">
                <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[rgb(var(--primary-rgb))] peer" placeholder=" " required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[rgb(var(--primary-rgb))]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[rgb(var(--primary-rgb))] peer" placeholder=" " required onKeyUp={(e) => setPass(e.target.value)} />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[rgb(var(--primary-rgb))]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="confirmed_password" id="confirmed_password" className={`block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 ${passUnMatch ? "border-red-700" : "border-gray-300"} appearance-none focus:outline-none focus:ring-0 focus:border-[rgb(var(--primary-rgb))] peer`} placeholder=" " required onKeyUp={validatePasswordMatch} />
                <label htmlFor="confirmed_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[rgb(var(--primary-rgb))]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                {/* Login with google/linkedIn option */}
                <div><p className="text-xs text-slate-600">Already have an account?</p> <a href="/auth/login" className="text-xs hover:underline">Login</a></div>
            </div>
            <div>
                <input type={passUnMatch ? "button" : "submit"} value="Sign Up" className={
                    `mt-4 p-3 border rounded-md w-full self-end
                    ${passUnMatch ?
                        "cursor-not-allowed text-slate-500 font-light" :
                        "cursor-pointer hover:bg-[rgb(var(--background-end-rgb))] transition-colors ease-in delay-75"}`
                } />
            </div>
        </form>
    );
}


