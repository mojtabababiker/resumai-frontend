'use client';
// the login page
import React, { BaseSyntheticEvent, useState } from "react";
import LoginForm from "@/app/ui/login-form";
import { getLoginToken } from "@/app/utils/auth";
import { AlertWrongCredentials } from "@/app/ui/alerts";

export default function Login() {
    const [unAuth, setUnAuth] = useState({ isError: false, message: '' });

    const handleSubmit = async (event: BaseSyntheticEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { accessToken, isError, isLoading } = await getLoginToken(formData);

        if (!isError && accessToken) {
            localStorage.setItem('auth-token', JSON.stringify(accessToken));
            // window.location.href = '/dashboard';
            console.log('token', accessToken);
            console.log('to the dashboard');
        }
        else {
            console.log('error', isError);
            setUnAuth({ isError: true, message: isError.detail });
        }

    }
    return (
        <>
            <div className="flex items-center justify-center w-svw h-svh bg-opacity-45 bg-no-repeat bg-center bg-[url('/bg-1.jpg')]">
                {unAuth.isError && <AlertWrongCredentials message={unAuth.message} />}
                <main className="flex self-center justify-self-center max-w-[640px] h-fit min-h-[470px] border-0 rounded-3xl flex-col items-stretch justify-center 
            gap-4 mx-auto p-16 md:p-16 text-[rgb(var(--primary-rgb))] bg-[rgb(var(--background-start-rgb))] drop-shadow-2xl">
                    <LoginForm onSubmit={handleSubmit} />
                </main>
            </div>
        </>
    );
}