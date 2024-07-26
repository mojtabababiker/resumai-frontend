'use client';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import Image from 'next/image'
import { DashboardNavBar } from '@/app/ui/nav_bar';
import { useUser } from '@/app/utils/auth';
import Link from 'next/link';
import * as resumesClient from '../utils/resumes-client';
import { templateProps } from '../ui/resume-templates/interfaces';
import { AlertResumeDelete } from '../ui/alerts';
import { printableIvy } from '../ui/resume-templates/templates';
import { downloadPDF } from '../utils/download-pdf';
import { PrintableIvyTemplate } from '../ui/resume-templates/ivy-resume-template';
import { renderToString } from 'react-dom/server';
import Loading from './loading';
import { redirect } from 'next/navigation';
import { User, UserResponse } from '../utils/interfaces';

export default function DashboardPage() {
    const [user, setUser]: [user: UserResponse | null, setUser: Function] = useState({ user: null, isLoading: true, isError: null });
    const [userResumes, setUserResumes]: [{ recent: resumesClient.Resume[], all: resumesClient.Resume[] }, Function] = useState({ recent: [], all: [] });
    const [resumesNotFetched, setResumesNotFetched] = useState(true);
    const [activeTab, setActiveTab] = useState({ btn_id: 'recent-tab-btn', tab_id: 'recent-tab' });
    const [resumeBuild, setResumeBuild] = useState(false);
    const [showModal, setShowModal] = useState({ modalType: '', message: '', toDelete: '' });
    const [confirmDel, setConfirmDel] = useState(false);
    const [templateId, setTemplateId] = useState('');
    const [toDownload, setToDownload]: [{ data: templateProps, start: boolean }, Function] = useState(
        {
            data: {
                templateId: '', className: '',
                title: { jobTitle: '', name: '' },
                summary: '', skills: [], experiences: [], education: [],
                projects: [], certificates: [], achievements: [], languages: []
            },
            start: false,
        }
    );

    useUser(setUser);

    if (user.isLoading) {
        return <Loading />
    }
    if (!(user.user)) {
        console.log(user);
        // window.location.href = '/auth/login';
        redirect('/auth/login');
    }
    const user_name = `${user.user.first_name} ${user.user.last_name}`;

    const buttonCssClass = 'text-[rgba(var(--primary-light-rgba))] hover:text-[rgb(var(--primary-rgb))] focus:ring-0 focus:outline-none text-sm px-5 py-2.5 text-center inline-flex items-center';
    const templates = ['Ivy-template', 'Ivy-template copy', 'Ivy-template copy 2']


    const startResumeBuild = () => {
        setResumeBuild(true);
        document.getElementById('default-modal')?.classList.remove('hidden');
        document.getElementById('default-modal')?.classList.add('flex');
    }

    const exitResumeBuild = () => {
        setResumeBuild(false);
        setTemplateId('');
        document.getElementById('default-modal')?.classList.add('hidden');
        document.getElementById('default-modal')?.classList.remove('flex');
    }

    const handleTabDisplay = (event: BaseSyntheticEvent) => {
        setActiveTab({ btn_id: event.target.id, tab_id: event.target.getAttribute('itemID') });
    }

    const editResume = (resume: resumesClient.Resume, event: BaseSyntheticEvent) => {
        event.stopPropagation();
        // call the resume crafting page /dashboard/[resume.templateId] passing the resume.data to it
        console.log(resume.templateId);
        localStorage.removeItem('toEditResume');
        localStorage.setItem('toEditResume', JSON.stringify({ templateId: resume.templateId, resumeId: resume._id, ...resume.data }));
        window.location.href = `/dashboard/${resume.templateId}`;
        // console.log(resume.data);
    }

    const handleDelete = (event: BaseSyntheticEvent, resumeId: string) => {
        event.stopPropagation();
        setShowModal({ modalType: "confirm-del", message: 'Deleting the resuming will remove it permanently !!', toDelete: resumeId });
    }

    const deleteResume = async (resumeId: string) => {
        console.log(`\n\nDeleting... ${resumeId}\n\n`);
        // call the resume api client to delete the resume with id resumeId
        try {
            const res = await resumesClient.deleteResume(resumeId);
            await fetchUserResumes();

        } catch (error) {
            console.log(error);
            // if auth error redirect the user to login
        }
    }

    const downloadResume = (resume: resumesClient.Resume, event: BaseSyntheticEvent) => {
        event.stopPropagation();
        resume.data.className = 'hidden';
        setToDownload({ data: resume.data, start: true });
        const resumeArticle = document.createElement('article');
        resumeArticle.setAttribute('class', 'hidden');
        // create the resume template using the resume data
        const props = { ...resume.data, setEducation: () => { }, setExperiences: () => { }, setLanguages: () => { }, setSkills: () => { }, setTitle: () => { }, setSummary: () => { } }

        resumeArticle.innerHTML = `${renderToString(<PrintableIvyTemplate props={props} />)}`;
        document.body.appendChild(resumeArticle);
        // use the j2pdf and html2canvas to convert the resume template into a pdf
        downloadPDF(user_name);
        // download the pdf file name it as <user-full-name-resume>.pdf
        console.log(resume);
    }

    const fetchUserResumes = async () => {
        try {
            const resumes = await resumesClient.getUserResumes();
            setUserResumes(resumes);
            // alert(Object.entries(resumes.at(1)));
        } catch (error) {
            console.log(error);
        } finally {
            setResumesNotFetched(false);
        }
    }
    resumesNotFetched && fetchUserResumes();
    return (
        <>
            <DashboardNavBar user={user.user} />
            <main className='relative w-full max-w-screen-xl h-svh overflow-x-hidden flex flex-col items-center p-0 md:p-4 mt-16 md:mt-5 sbg-[rgb(var(--background-start-rgb))]'> {/*relative w-full max-w-screen-xl flex flex-col items-center p-0 md:p-0 mt-28 md:mt-5*/}
                <section>
                    {/* header */}
                    <div className='w-svw max-h-[320px] static flex justify-center items-center p-0 m-0 bg-no-repeat bg-cover backdrop-brightness-0 backdrop-blur-sm overflow-hidden bg-[url("/bg-4.jpg")]'>
                        <div className='w-svw bg-[#0000006f] py-4 flex justify-center'>
                            <div className='max-w-screen-xl w-full mt-20 px-4 pb-20 flex flex-col gap-y-10 justify-center items-center md:flex-row md:items-start md:justify-between'>
                                <div className='w-3/4 flex text-white'>
                                    <h1 className='text-4xl md:text-3xl md:font-light text-center md:text-start'>Welcome back <span className='font-semibold'>{user_name}</span>, let's make sure you get it this time</h1>
                                </div>
                                <div className='w-1/4 flex justify-center md:justify-end '>
                                    <button className="text-white bg-[rgb(var(--primary-rgb))] hover:bg-[rgba(var(--primary-light-rgba))]
                                                        focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                                        inline-flex items-center
                                                        sticky top-4 z-40"
                                        onClick={startResumeBuild} tabIndex={0}>
                                        Create
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" strokeWidth="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* recent and all pages nav items */}
                    <section className='min-w-full  mb-10 flex gap-y-10 justify-center border-0 border-b border-[rgba(255, 255, 255, 0.01)] border-opacity-10'>
                        <div className='max-w-screen-xl w-full flex justify-start gap-3 overflow-auto'>
                            <button className={`${buttonCssClass} ${activeTab.btn_id === 'recent-tab-btn' && 'border-b border-[rgba(var(--primary-light-rgba))] border-opacity-60'} `} id='recent-tab-btn' itemID='recent-tab' onClick={handleTabDisplay}>Recent</button>
                            <button className={`${buttonCssClass} ${activeTab.btn_id === 'all-tab-btn' && 'border-b border-[rgba(var(--primary-light-rgba))] border-opacity-60'} `} id='all-tab-btn' itemID='all-tab' onClick={handleTabDisplay}>All Resumes({userResumes.all.length})</button>
                        </div>
                    </section>
                </section>
                <section className='overflow-x-hidden'>
                    {/* contains the recent and all resumes tabs */}
                    {activeTab.tab_id === 'recent-tab' && userResumes.recent.length > 0 &&
                        <div className='flex justify-between gap-3 flex-wrap overflow-x-hidden'>
                            {userResumes.recent.map((resume, idx) => {
                                const resumeData = resume.data;
                                return (
                                    <div key={resume._id} id={resume._id} onClick={(event) => editResume(resume, event)} className="relative w-full md:w-[30%] lg:w-[] p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:scale-90 transition-transform ease-in">
                                        <a href="#">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{resumeData.title.jobTitle}</h5>
                                        </a>
                                        <p className="mb-3 font-normal text-xs text-gray-700">{resumeData.summary?.slice(0, 140)}...</p>
                                        <p className="mb-3 font-normal text-xs text-gray-700"><span className='font-semibold'>Last Modification:</span> {resume.updated_at.split('T')[0]}</p>
                                        <button onClick={(event) => { downloadResume(resume, event) }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[rgba(var(--primary-light-rgba))] rounded-lg hover:bg-[rgb(var(--primary-rgb))] focus:ring-0 focus:outline-none">
                                            Download
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </button>
                                        <button onClick={(event) => handleDelete(event, resume._id)} className="absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-[rgb(var(--primary-rgb))] hover:text-[rgb(var(--background-start-rgb))] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                        <button className="absolute top-[2rem] right-0 flex justify-center items-center w-8 h-8 bg-inherit hover:bg-[rgb(var(--primary-rgb))] hover:text-[rgb(var(--background-start-rgb))] rounded-lg" onClick={(event) => editResume(resume, event)}>
                                            <svg className="w-5 h-5 hover:text-[rgb(var(--background-start-rgb))]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>

                                )
                            })}
                        </div>
                    }

                    {activeTab.tab_id === 'all-tab' && userResumes.all.length > 0 &&
                        <div className='flex justify-between gap-3 flex-wrap overflow-x-hidden'>
                            {userResumes.all.map((resume, idx) => {
                                const resumeData = resume.data;
                                return (
                                    <div key={resume._id} id={resume._id} onClick={(event) => { editResume(resume, event) }} className="relative w-full md:w-[30%] lg:w-[] p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:scale-90 transition-transform ease-in">
                                        <a href="#">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{resumeData.title.jobTitle}</h5>
                                        </a>
                                        <p className="mb-3 font-normal text-xs text-gray-700">{resumeData.summary?.slice(0, 140)}...</p>
                                        <p className="mb-3 font-normal text-xs text-gray-700"><span className='font-semibold'>Last Modification:</span> {resume.updated_at.split('T')[0]}</p>
                                        <button onClick={(event) => { downloadResume(resume, event) }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[rgba(var(--primary-light-rgba))] rounded-lg hover:bg-[rgb(var(--primary-rgb))] focus:ring-0 focus:outline-none">
                                            Download
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </button>
                                        <button onClick={(event) => handleDelete(event, resume._id)} className="absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-[rgb(var(--primary-rgb))] hover:text-[rgb(var(--background-start-rgb))] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                        <button className="absolute top-[2rem] right-0 flex justify-center items-center w-8 h-8 bg-inherit hover:bg-[rgb(var(--primary-rgb))] hover:text-[rgb(var(--background-start-rgb))] rounded-lg" onClick={(event) => editResume(resume, event)}>
                                            <svg className="w-5 h-5 hover:text-[rgb(var(--background-start-rgb))]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>

                                )
                            })}
                        </div>
                    }
                </section>

                {/* The modal for building the resume */}
                <section id="default-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-hidden overflow-x-hidden scroll-m-10 scroll-smooth min-h-full h-h-full w-svw fixed top-0 right-0 z-50 justify-center items-center">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow max-h-[720px]">
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
                            <div className="p-4 md:p-5 space-y-4 overflow-hidden">
                                <div className='p-0 m-0 flex flex-col md:flex-row overflow-auto'>
                                    {templates.map((template, idx) => {
                                        return <Image src={`/templates_thumbnail/${template}.png`} alt={`${template} thumbnail`} width={360} height={420}
                                            className={`cursor-pointer border p-3 hover:scale-90 hover:drop-shadow-sm hover:filter transition-transform ease-in delay-75 ${templateId === template && 'scale-90'} `} key={`${template}-${idx}`}
                                            onClick={(e) => { setTemplateId(template) }}>
                                        </Image>
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center px-4 md:px-5 py-3 border-t rounded-b">
                                <Link href={`/dashboard/${templateId}`} onClick={() => localStorage.removeItem('toEditResume')} className="text-white bg-[rgba(var(--primary-light-rgba))] hover:bg-[rgb(var(--primary-rgb))] focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Build</Link>
                                <button onClick={exitResumeBuild} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[rgba(var(--primary-light-rgba))] focus:z-10 focus:ring-0">Decline</button>
                            </div>
                        </div>
                    </div>
                </section>
                {showModal.modalType === 'confirm-del' && <AlertResumeDelete closeModel={(event) => setShowModal({ modalType: '', message: '', toDelete: '' })} message={showModal.message} confirm={deleteResume} toDelete={showModal.toDelete} />}
            </main >
        </>
    );
}