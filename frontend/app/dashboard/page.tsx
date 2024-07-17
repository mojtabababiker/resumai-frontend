'use client';
import { DashboardNavBar } from '@/app/ui/nav_bar';
import { useUser } from '@/app/utils/auth';
import { BaseSyntheticEvent, useState } from 'react';

export default function DashboardPage() {
    const user = useUser();
    const [activeTab, setActiveTab] = useState({ btn_id: 'recent-tab-btn', tab_id: 'recent-tab' });
    const [resumeBuild, setResumeBuild] = useState(false);

    if (user.isLoading) {
        return <h1 className='text-[340px]'>Loading...</h1>;
    }
    if (!user.user) {
        console.log(user);
        window.location.href = '/auth/login';
        return;
    }

    const user_name = `${user.user.first_name} ${user.user.last_name}`;
    const buttonCssClass = 'text-[rgba(var(--primary-light-rgba))] hover:text-[rgb(var(--primary-rgb))] focus:ring-0 focus:outline-none text-sm px-5 py-2.5 text-center inline-flex items-center';

    const startResumeBuild = () => {
        setResumeBuild(true);
        document.getElementById('default-modal')?.classList.remove('hidden');
        document.getElementById('default-modal')?.classList.add('flex');
    }

    const exitResumeBuild = () => {
        setResumeBuild(false);
        document.getElementById('default-modal')?.classList.add('hidden');
        document.getElementById('default-modal')?.classList.remove('flex');
    }

    const handleTabDisplay = (event: BaseSyntheticEvent) => {
        setActiveTab({ btn_id: event.target.id, tab_id: event.target.getAttribute('itemID') });
    }

    return (
        <main className='w-full max-w-screen-xl flex flex-col items-center p-0 md:p-4 mt-28 md:mt-5'>
            <DashboardNavBar user={user.user} />
            <section className='min-w-full mt-20 pb-20 flex flex-col gap-y-10 justify-center items-center md:flex-row md:items-start md:justify-between'>
                <div className='w-3/4 flex'>
                    <h1 className='text-4xl md:text-3xl md:font-light text-center md:text-start'>Welcome back <span className='font-semibold'>{user_name}</span>, let's make sure you get it this time</h1>
                </div>
                <div className='w-1/4 flex justify-end'>
                    <button className="text-white bg-[rgb(var(--primary-rgb))] hover:bg-[rgba(var(--primary-light-rgba))]
                    focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" onClick={startResumeBuild} tabIndex={0}>
                        Create
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" strokeWidth="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                        </svg>
                    </button>
                </div>
            </section>
            <section className='min-w-full mb-20 flex flex-col gap-y-10 justify-stretch overflow-hidden border-0 border-b border-[rgba(255, 255, 255, 0.01)] border-opacity-10'>
                <div className='flex justify-start gap-3 overflow-auto'>
                    <button className={`${buttonCssClass} ${activeTab.btn_id === 'recent-tab-btn' && 'border-b border-[rgba(var(--primary-light-rgba))] border-opacity-60'}`} id='recent-tab-btn' itemID='recent-tab' onClick={handleTabDisplay}>Recent</button>
                    <button className={`${buttonCssClass} ${activeTab.btn_id === 'all-tab-btn' && 'border-b border-[rgba(var(--primary-light-rgba))] border-opacity-60'}`} id='all-tab-btn' itemID='all-tab' onClick={handleTabDisplay}>All Resumes(2)</button>
                </div>
            </section>
            <section>
                {/* contains the recent and all resumes tabs */}
            </section>

            {/* The modal for building the resume */}
            <section id="default-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden min-h-full h-h-full w-svw fixed top-0 right-0 z-50 justify-center items-center">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Choose a template
                            </h3>
                            <button onClick={exitResumeBuild} className="text-gray-400 bg-transparent hover:bg-[rgb(var(--primary-rgb))] hover:text-[rgb(var(--background-start-rgb))] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            {/* templates section */}
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t rounded-b">
                            <button className="text-white bg-[rgba(var(--primary-light-rgba))] hover:bg-[rgb(var(--primary-rgb))] focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Build</button>
                            <button onClick={exitResumeBuild} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[rgba(var(--primary-light-rgba))] focus:z-10 focus:ring-0">Decline</button>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
}