'use client';
// the login page
import React, { BaseSyntheticEvent, useState } from "react";
import SignUpForm from "@/app/ui/signup-form";
import { registerUser } from "@/app/utils/auth";
import { AlertWrongCredentials } from "@/app/ui/alerts";

export default function SignUp() {
    const [unAuth, setUnAuth] = useState({ isError: false, message: '' });
    // const [pass, setPass] = useState('');  // a state the saved the value of the password field
    // const [passUnMatch, setPassUnMatch] = useState(false);  // a flag indicate either the password matches or not

    // const validatePasswordMatch = (event: BaseSyntheticEvent) => {
    //     const confirmedPass = event.target.value;

    //     if (pass !== confirmedPass) {
    //         setPassUnMatch(true);
    //         console.log(`${pass} !== ${confirmedPass}`);
    //     } else {
    //         setPassUnMatch(false);
    //         console.log(`${pass} === ${confirmedPass}`);
    //     }
    // }

    const handleSubmit = async (event: BaseSyntheticEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(Array.from(formData.entries()));
        // call the registerUser auth util
        const { accessToken, isError, isLoading } = await registerUser(formData);
        // check for errors
        if (!isError && accessToken) {
            // save the access token and redirect user to dashboard
            localStorage.setItem('auth-token', JSON.stringify(accessToken));
            // window.location.href = '/dashboard';
            console.log('token', accessToken);
            console.log('to the dashboard');
        } else {
            console.log('error: ', isError);
            const message = isError.response ? isError.response.data.detail : isError.message;
            setUnAuth({ isError: true, message: message });
        }
    }
    return (
        <>
            <div className="flex items-center justify-center w-svw h-svh bg-opacity-45 bg-no-repeat bg-center bg-[url('/bg-1.jpg')]">
                {unAuth.isError && <AlertWrongCredentials message={unAuth.message} />}
                <main className="flex self-center justify-self-center w-full max-w-[640px] h-fit min-h-[470px] border-0 rounded-3xl flex-col items-stretch justify-center 
            gap-4 mx-2 md:mx-auto p-8 md:p-16 text-[rgb(var(--primary-rgb))] bg-[rgb(var(--background-start-rgb))] drop-shadow-2xl">
                    {/* <SignUpForm onSubmit={handleSubmit} validatePasswordMatch={validatePasswordMatch} setPass={setPass} passUnMatch /> */}
                    <SignUpForm onSubmit={handleSubmit} />
                </main>
            </div>
        </>
    );
}