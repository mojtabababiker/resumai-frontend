// render the crafting page for resume based on the query parameter
'use client';

import { DashboardNavBar } from "@/app/ui/nav_bar";
import { ButtonSolid, ButtonOutLine } from "@/app/ui/buttons";
import * as templates from "@/app/ui/resume-templates/templates";
import { useUser } from "@/app/utils/auth";
import { BaseSyntheticEvent, useState } from "react";
import { addResume, updateResume } from "@/app/utils/resumes-client";
import { AlertResumeCreated } from "@/app/ui/alerts";

/////////////////////////////
//
const dummyData = {
    templateId: "abcd1234",
    title: {
        name: "Emily Chen",
        jobTitle: "Full Stack Developer",
        links: [
            {
                "type": "LinkedIn",
                "linkUrl": "https://www.linkedin.com/in/emilychen"
            },
            {
                "type": "GitHub",
                "linkUrl": "https://github.com/emilychen-dev"
            },
            {
                "type": "Portfolio",
                "linkUrl": "https://emilychen.dev"
            }
        ]
    },
    summary: "Dedicated Full Stack Developer with 5+ years of experience in designing, developing, and deploying scalable web applications. Proficient in JavaScript (ES6+), Python, and various frontend and backend frameworks including React, Vue.js, Node.js, and Django. Strong expertise in cloud technologies, particularly AWS and Google Cloud Platform. Passionate about writing clean, efficient code and implementing best practices in software development. Experienced in Agile methodologies and test-driven development. Committed to staying current with emerging technologies and industry trends. Proven track record of delivering high-quality projects on time and within budget, while effectively collaborating with cross-functional teams and mentoring junior developers.",
    education: [
        {
            "schoolName": "University of California, Berkeley",
            "degreeTitle": "Bachelor of Science in Computer Science",
            "location": "Berkeley, CA",
            "summary": "Graduated with honors (GPA: 3.8/4.0). Specialized in software engineering, machine learning, and distributed systems. Completed a senior thesis on 'Optimizing Distributed Database Systems for Real-time Analytics'. Active member of the ACM student chapter and Women in Computer Science club.",
            "startingDate": "2014-09-01",
            "endingDate": "2018-05-15"
        }
    ],
    projects: [
        {
            "title": "E-commerce Platform",
            "description": "Developed a comprehensive full-stack e-commerce platform using React for the frontend, Node.js (Express) for the backend, and MongoDB for data storage. Implemented features such as user authentication with JWT, product catalog with advanced filtering and search capabilities, shopping cart functionality, and secure payment integration using Stripe API. Utilized Redis for caching to improve performance and implemented real-time inventory updates using WebSockets. The platform also includes an admin dashboard for inventory management and sales analytics. Deployed the application on AWS using Elastic Beanstalk for easy scaling and management."
        },
        {
            "title": "Weather Forecast App",
            "description": "Created a mobile-responsive weather forecast application using Vue.js for the frontend and Express.js for the backend. Integrated with OpenWeatherMap API for accurate weather data. Implemented features such as geolocation for automatic local weather display, 5-day forecast with hourly breakdowns, and custom location saving. Utilized Vuex for state management and Vue Router for seamless navigation. Implemented service workers for offline functionality and push notifications for severe weather alerts. The app also includes an interactive map using Mapbox GL JS for visualizing weather patterns. Optimized the application for performance, achieving a Lighthouse score of 95+ across all categories."
        }
    ],
    experiences: [
        {
            "companyName": "TechInnovate Inc.",
            "roleTitle": "Senior Full Stack Developer",
            "location": "San Francisco, CA",
            "summary": "Lead developer for the company's main SaaS product, a project management tool used by over 50,000 users worldwide. Architected and implemented new features including real-time collaboration tools and automated workflow systems. Optimized database queries and implemented caching strategies, resulting in a 40% improvement in application response time. Mentored a team of 5 junior developers, conducting code reviews and pair programming sessions. Introduced and implemented a microservices architecture, improving scalability and allowing for more rapid feature development. Worked closely with the product team to define and refine product requirements, and with the UX team to ensure a seamless user experience. Implemented comprehensive unit and integration testing strategies, achieving 90%+ code coverage.",
            "startingDate": "2020-03-01",
            "endingDate": "Present"
        },
        {
            "companyName": "WebSolutions LLC",
            "roleTitle": "Full Stack Developer",
            "location": "Austin, TX",
            "summary": "Worked on various client projects, primarily using the MERN (MongoDB, Express, React, Node.js) stack. Developed a custom CMS for a major publishing company, incorporating features such as content versioning, scheduled publishing, and multi-user editing. Built a real-time analytics dashboard for a fintech startup, integrating with various APIs and implementing complex data visualizations using D3.js. Implemented responsive designs ensuring cross-browser compatibility and accessibility compliance. Collaborated with design and product teams to deliver high-quality web applications, consistently meeting or exceeding client expectations. Participated in daily stand-ups, sprint planning, and retrospectives as part of an Agile development process. Contributed to the company's internal component library, improving development efficiency across projects.",
            "startingDate": "2018-06-01",
            "endingDate": "2020-02-28"
        }
    ],
    achievements: [
        {
            "title": "Best Hackathon Project - TechCrunch Disrupt",
            "description": "Won first place at the 2019 TechCrunch Disrupt Hackathon for developing an AI-powered accessibility tool for visually impaired users. The project, named 'VisionAssist', uses computer vision and natural language processing to describe surroundings and read text in real-time. Implemented using TensorFlow.js for on-device machine learning and React Native for cross-platform mobile development. The project received interest from several assistive technology companies and is currently being developed into a full-fledged application."
        },
        {
            "title": "Open Source Contributor - React.js",
            "description": "Active contributor to React.js, with 3 merged pull requests improving performance and documentation. Notable contributions include optimizing the reconciliation algorithm for large lists, resulting in a 15% performance improvement in certain scenarios. Also authored a comprehensive guide on advanced hooks usage, which was incorporated into the official React documentation. Regularly participate in the React community, providing assistance on forums and contributing to discussions on future React features."
        }
    ],
    certificates: [
        {
            "title": "AWS Certified Developer - Associate",
            "description": "Demonstrates proficiency in developing, deploying, and debugging cloud-based applications using AWS. Covers topics including core AWS services, AWS security best practices, and the use of DevOps tools for continuous integration and delivery on AWS."
        },
        {
            "title": "Google Cloud Professional Developer",
            "description": "Validates expertise in building scalable and highly available applications using Google Cloud technologies. Includes proficiency in cloud-native application development, data storage solutions, and security practices in Google Cloud Platform."
        }
    ],
    skills: [
        "JavaScript (ES6+)",
        "TypeScript",
        "Python",
        "React",
        "Vue.js",
        "Node.js",
        "Express.js",
        "Django",
        "MongoDB",
        "PostgreSQL",
        "GraphQL",
        "RESTful APIs",
        "AWS (EC2, S3, Lambda, DynamoDB)",
        "Google Cloud Platform",
        "Docker",
        "Kubernetes",
        "CI/CD (Jenkins, GitLab CI)",
        "Git",
        "Agile Methodologies",
        "Test-Driven Development",
        "Microservices Architecture"
    ],
    languages: [
        {
            "name": "English",
            "proficient": "native"
        },
        {
            "name": "Mandarin Chinese",
            "proficient": "fluent"
        },
        {
            "name": "Spanish",
            "proficient": "intermediate"
        }
    ]
}
/////////////////////////////

export default function ResumeDraftPage({ params }: { params: { id: string } }) {
    let ResumeData = dummyData;
    const resume = localStorage.getItem('toEditResume');
    const templateId = params.id;
    const buttonCssClass = 'text-[rgb(var(--background-start-rgb))] hover:scale-110 focus:ring-0 focus:outline-none text-xs px-5 py-2.5 text-center inline-flex items-center';

    const [activeTab, setActiveTab] = useState({ btn_id: 'desc-section-btn', tab_id: 'desc-section' });
    const [insertJobDesc, setInsertJobDesc] = useState(false);
    const [showModal, setShowModal] = useState({ modalType: '', message: '' });

    if (resume) {
        ResumeData = JSON.parse(resume);
        // console.log(`Resume Data ===> ${ResumeData}`);
    }
    // template fields states
    const [title, setTitle] = useState(ResumeData.title);
    const [summary, setSummary] = useState(ResumeData.summary);
    const [skills, setSkills] = useState(ResumeData.skills);
    const [experiences, setExperiences] = useState(ResumeData.experiences);
    const [education, setEducation] = useState(ResumeData.education);
    const [projects, setProjects] = useState(ResumeData.projects);
    const [certificates, setCertificates] = useState(ResumeData.certificates);
    const [languages, setLanguages] = useState(ResumeData.languages);


    const handleTabDisplay = (event: BaseSyntheticEvent) => {
        setActiveTab({ btn_id: event.target.id, tab_id: event.target.getAttribute('itemID') });
    }

    const closeModal = () => {
        setShowModal({ modalType: '', message: '' });
    }

    const user = useUser();
    if (user.isLoading) {
        return <h1 className='text-[340px]'>Loading...</h1>;
    }
    if (!user.user) {
        console.log(user);
        window.location.href = '/auth/login';
        return;
    }

    const saveResume = async () => {
        const resumeObj = {
            templateId,
            title,
            summary,
            skills,
            experiences,
            education,
            projects,
            certificates,
            languages,
        }

        // call the api util to save the
        console.log(`Saving...\n\n${JSON.stringify(resumeObj)}\n\n`);
        try {
            if (ResumeData.resumeId) {
                const res = await updateResume({ _id: ResumeData.resumeId, ...resumeObj });
                console.log(res);
                setShowModal({ modalType: 'success-modal', message: 'Resume Updated successfully...' });
            } else {
                const res = await addResume(resumeObj);
                console.log(res);
                setShowModal({ modalType: 'success-modal', message: 'Resume Created successfully...' });
            }

        } catch (error) {
            console.log(`Error====>${error}`);
            setShowModal({ modalType: 'success-modal', message: 'Nothing to updated...' });
        }
    }

    if (templateId.toLowerCase() === 'ivy-template') {
        return (
            <>
                <div className='w-svw fixed top-0 left-0 bottom-0 bg-cover bg-no-repeat bg-[url("/bg-1.jpg")] overflow-x-hidden'>
                </div>
                <main className='relative w-full max-w-screen-xl overflow-x-hidden flex flex-col items-center p-0 md:p-4 mt-20 md:mt-5'>

                    <section className="w-full sticky top-0 z-30 max-w-screen-xl pb-32 bg-[rgba(var(--primary-light-rgba))] rounded-b-lg">
                        <DashboardNavBar user={user.user} ></DashboardNavBar>

                    </section>
                    <section className="mt-10 md:mt-0 w-full">
                        <div className="sticky top-20 z-30 w-full flex items-center justify-center md:justify-end gap-4 mb-4 bg-[rgba(var(--primary-light-rgba))] rounded-b-lg">
                            <ButtonOutLine className="border-b border-[rgb(var(--background-start-rgb))] rounded-none text-gray-200">Download</ButtonOutLine>
                            <ButtonOutLine className="border-b border-[rgb(var(--background-start-rgb))] rounded-none text-gray-200">Clear</ButtonOutLine>
                            <ButtonSolid onClick={saveResume} className="w-32">Save</ButtonSolid>
                        </div>
                        <div className="relative w-full flex items-stretch justify-between gap-4 mb-4">
                            <div className="w-full md:w-1/2 ">
                                <templates.Ivy
                                    {
                                    ...{
                                        title, setTitle, summary, setSummary, skills, setSkills, experiences, setExperiences,
                                        education, setEducation, projects, setProjects, certificates, setCertificates, languages, setLanguages,
                                    }
                                    }>
                                </templates.Ivy>
                            </div>
                            <ButtonSolid className="w-8 flex flex-col items-start justify-start md:hidden pl-0 pr-0 py-0">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </ButtonSolid>
                            <aside id="default-sidebar" className="sticky hidden md:block top-36 right-0 z-10 w-80 md:w-1/2 lg:w-1/3 h-screen border-0 rounded-xl transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                                <div className="h-full px-3 py-4 border-0 rounded-xl bg-[rgba(var(--primary-light-rgba))]">
                                    {/* navigation section */}
                                    <section className='min-w-full mb-20 flex flex-col gap-y-10 justify-stretch overflow-hidden border-0 border-b border-[rgba(255, 255, 255, 0.01)] border-opacity-10'>
                                        <div className='flex justify-start gap-3 overflow-hidden'>
                                            <button className={`${buttonCssClass} ${activeTab.btn_id === 'recent-tab-btn' && 'border-b border-[rgb(var(--background-start-rgb))] border-opacity-60'}`} id='desc-section-btn' itemID='desc-section' onClick={handleTabDisplay}>Add job Description</button>
                                            <button className={`${buttonCssClass} ${activeTab.btn_id === 'all-tab-btn' && 'border-b border-[rgb(var( --background-start-rgb)] border-opacity-60'}`} id='insg-section-btn' itemID='insg-section' onClick={handleTabDisplay}>insights & Scores</button>
                                        </div>
                                    </section>

                                    {/* adding job description section */}
                                    {activeTab.tab_id == 'desc-section' && <section className="w-full flex flex-col items-center justify-center gap-5">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-[rgb(var(--background-start-rgb))]">Getting the job description by the link</label>
                                        <input type="text" id="name" className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0" placeholder="https://www.linkedin.com/jobs/view/231314127" />

                                        <label onClick={(e) => { setInsertJobDesc(!insertJobDesc) }} htmlFor="name" className="block mb-2 text-sm font-medium text-[rgb(var(--background-start-rgb))] cursor-pointer hover:border-b">Or Copy and Past the job description directly</label>
                                        <textarea rows={7} id="name" className={`w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0 ${insertJobDesc ? 'block' : 'hidden'}`} placeholder="Past the job description here..." />

                                        <ButtonSolid className="w-1/2">Generate</ButtonSolid>
                                    </section>}

                                    {/* insights and scores section */}
                                    {activeTab.tab_id == 'insg-section' && <section className="w-full flex flex-col items-center justify-center gap-5">
                                    </section>}
                                </div>
                            </aside>
                        </div>
                    </section>
                    {showModal.modalType === 'success-modal' && <AlertResumeCreated closeModel={closeModal} message={showModal.message} />}
                </main>
            </>
        );
    }
}
