import Link from "next/link";
import { MouseEvent, MouseEventHandler } from "react";

// A set of alerts components used in the UI.
export const AlertWrongCredentials = ({ message }: { message: string }) => {
    return (
        <div className="fixed top-6 flex items-center z-50 p-3 text-sm text-gray-800 border border-red-900 rounded-lg bg-gray-50" role="alert">
            <svg className="flex-shrink-0 inline w-3 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Wrong Credentials</span>
            <div>
                <span className="font-medium">Alert!</span>
                {message}
            </div>
        </div>
    )
}

// Alert successful resume creation
export const AlertResumeCreated = ({ closeModel, message }: { closeModel: MouseEventHandler, message: string }) => {
    return (
        <div id="popup-modal" tabIndex={-1} className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full border-0 rounded-lg">
                <div className="relative bg-[rgb(var(--primary-rgb))] border-0 rounded-lg">
                    <button onClick={closeModel} type="button" className="absolute top-3 end-2.5 bg-transparent text-gray-200 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 w-12 h-12 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-200">{message}</h3>
                        <Link href={'/dashboard'} type="button" className="text-[rgba(var(--primary-light-rgba))] bg-[rgb(var(--background-start-rgb))] hover:bg-opacity-85 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Back Home
                        </Link>
                        <button onClick={closeModel} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-[rgba(var(--primary-light-rgba))] focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100">Stay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Alert successful resume creation
export const AlertResumeDelete = ({ closeModel, confirm, message, toDelete }: { closeModel: MouseEventHandler, confirm: Function, message: string, toDelete: any }) => {
    const confirmAndExit = (event: MouseEvent) => {
        confirm(toDelete);
        closeModel(event);
    }
    return (
        <div id="popup-modal" tabIndex={-1} className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full border-0 rounded-lg">
                <div className="relative bg-white border-0 rounded-lg">
                    <button onClick={closeModel} type="button" className="absolute top-3 end-2.5 bg-transparent text-[rgb(var(--primary-rgb))] hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal">{message}</h3>
                        <button onClick={confirmAndExit} type="button" className="text-[rgba(var(--primary-light-rgba))] bg-[rgb(var(--background-start-rgb))] hover:bg-opacity-85 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Delete Any Way
                        </button>
                        <button onClick={closeModel} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-[rgba(var(--primary-light-rgba))] focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100">Stay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}