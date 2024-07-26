"use client";
// a set of buttons components

interface ButtonProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;

}

export function ButtonSolid({ className, children, onClick }: ButtonProps) {
    return (
        <button className={`${className} text-white bg-[rgb(var(--primary-rgb))] hover:opacity-90 focus:ring-0 outline-none focus:outline-none focus:[rgba(var(--primary-light-rgba))] font-medium rounded-lg px-4 py-2 text-center transition-all ease-in-out delay-100`} onClick={onClick}>
            {children}
        </button>
    );
}

export function ButtonOutLine({ className, children, onClick }: ButtonProps) {
    return (
        <button className={`${className} md:block text-[rgb(var(--primary-rgb))] hover:opacity-90 focus:ring-[rgba(var(--primary-light-rgba))] outline-none focus:outline-none focus:[rgba(var(--primary-light-rgba))] font-medium rounded-lg text-sm px-4 py-2 text-center transition-all ease-in-out delay-100`} onClick={onClick}>
            {children}
        </button>
    );
}