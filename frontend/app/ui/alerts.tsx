// A set of alerts components used in the UI.
export const AlertWrongCredentials = () => {
    return (
        <div className="fixed top-6 flex items-center p-3 text-sm text-gray-800 border border-red-900 rounded-lg bg-gray-50" role="alert">
            <svg className="flex-shrink-0 inline w-3 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Wrong Credentials</span>
            <div>
                <span className="font-medium">Alert!</span> Wrong username or password
            </div>
        </div>
    )
}