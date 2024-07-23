// the basic or default resume template
// each field will be a separate component
// each field will be editable and has its own customizing panel

import { useState } from "react"
import * as interfaces from "@/app/ui/resume-templates/interfaces"
import * as resumeFieldsEdits from '@/app/ui/resume-templates/resume-fields-edits'
import { AlertResumeDelete } from "../alerts";

// dummy data
// const dummyData = {
//     templateId: "abcd1234",
//     title: {
//         name: "Emily Chen",
//         jobTitle: "Full Stack Developer",
//         links: [
//             {
//                 "linkType": "LinkedIn",
//                 "linkUrl": "https://www.linkedin.com/in/emilychen"
//             },
//             {
//                 "linkType": "GitHub",
//                 "linkUrl": "https://github.com/emilychen-dev"
//             },
//             {
//                 "linkType": "Portfolio",
//                 "linkUrl": "https://emilychen.dev"
//             }
//         ]
//     },
//     summary: "Dedicated Full Stack Developer with 5+ years of experience in designing, developing, and deploying scalable web applications. Proficient in JavaScript (ES6+), Python, and various frontend and backend frameworks including React, Vue.js, Node.js, and Django. Strong expertise in cloud technologies, particularly AWS and Google Cloud Platform. Passionate about writing clean, efficient code and implementing best practices in software development. Experienced in Agile methodologies and test-driven development. Committed to staying current with emerging technologies and industry trends. Proven track record of delivering high-quality projects on time and within budget, while effectively collaborating with cross-functional teams and mentoring junior developers.",
//     education: [
//         {
//             "schoolName": "University of California, Berkeley",
//             "degreeTitle": "Bachelor of Science in Computer Science",
//             "location": "Berkeley, CA",
//             "summary": "Graduated with honors (GPA: 3.8/4.0). Specialized in software engineering, machine learning, and distributed systems. Completed a senior thesis on 'Optimizing Distributed Database Systems for Real-time Analytics'. Active member of the ACM student chapter and Women in Computer Science club.",
//             "startingDate": "2014-09-01",
//             "endingDate": "2018-05-15"
//         }
//     ],
//     projects: [
//         {
//             "title": "E-commerce Platform",
//             "description": "Developed a comprehensive full-stack e-commerce platform using React for the frontend, Node.js (Express) for the backend, and MongoDB for data storage. Implemented features such as user authentication with JWT, product catalog with advanced filtering and search capabilities, shopping cart functionality, and secure payment integration using Stripe API. Utilized Redis for caching to improve performance and implemented real-time inventory updates using WebSockets. The platform also includes an admin dashboard for inventory management and sales analytics. Deployed the application on AWS using Elastic Beanstalk for easy scaling and management."
//         },
//         {
//             "title": "Weather Forecast App",
//             "description": "Created a mobile-responsive weather forecast application using Vue.js for the frontend and Express.js for the backend. Integrated with OpenWeatherMap API for accurate weather data. Implemented features such as geolocation for automatic local weather display, 5-day forecast with hourly breakdowns, and custom location saving. Utilized Vuex for state management and Vue Router for seamless navigation. Implemented service workers for offline functionality and push notifications for severe weather alerts. The app also includes an interactive map using Mapbox GL JS for visualizing weather patterns. Optimized the application for performance, achieving a Lighthouse score of 95+ across all categories."
//         }
//     ],
//     experiences: [
//         {
//             "companyName": "TechInnovate Inc.",
//             "roleTitle": "Senior Full Stack Developer",
//             "location": "San Francisco, CA",
//             "summary": "Lead developer for the company's main SaaS product, a project management tool used by over 50,000 users worldwide. Architected and implemented new features including real-time collaboration tools and automated workflow systems. Optimized database queries and implemented caching strategies, resulting in a 40% improvement in application response time. Mentored a team of 5 junior developers, conducting code reviews and pair programming sessions. Introduced and implemented a microservices architecture, improving scalability and allowing for more rapid feature development. Worked closely with the product team to define and refine product requirements, and with the UX team to ensure a seamless user experience. Implemented comprehensive unit and integration testing strategies, achieving 90%+ code coverage.",
//             "startingDate": "2020-03-01",
//             "endingDate": "Present"
//         },
//         {
//             "companyName": "WebSolutions LLC",
//             "roleTitle": "Full Stack Developer",
//             "location": "Austin, TX",
//             "summary": "Worked on various client projects, primarily using the MERN (MongoDB, Express, React, Node.js) stack. Developed a custom CMS for a major publishing company, incorporating features such as content versioning, scheduled publishing, and multi-user editing. Built a real-time analytics dashboard for a fintech startup, integrating with various APIs and implementing complex data visualizations using D3.js. Implemented responsive designs ensuring cross-browser compatibility and accessibility compliance. Collaborated with design and product teams to deliver high-quality web applications, consistently meeting or exceeding client expectations. Participated in daily stand-ups, sprint planning, and retrospectives as part of an Agile development process. Contributed to the company's internal component library, improving development efficiency across projects.",
//             "startingDate": "2018-06-01",
//             "endingDate": "2020-02-28"
//         }
//     ],
//     achievements: [
//         {
//             "title": "Best Hackathon Project - TechCrunch Disrupt",
//             "description": "Won first place at the 2019 TechCrunch Disrupt Hackathon for developing an AI-powered accessibility tool for visually impaired users. The project, named 'VisionAssist', uses computer vision and natural language processing to describe surroundings and read text in real-time. Implemented using TensorFlow.js for on-device machine learning and React Native for cross-platform mobile development. The project received interest from several assistive technology companies and is currently being developed into a full-fledged application."
//         },
//         {
//             "title": "Open Source Contributor - React.js",
//             "description": "Active contributor to React.js, with 3 merged pull requests improving performance and documentation. Notable contributions include optimizing the reconciliation algorithm for large lists, resulting in a 15% performance improvement in certain scenarios. Also authored a comprehensive guide on advanced hooks usage, which was incorporated into the official React documentation. Regularly participate in the React community, providing assistance on forums and contributing to discussions on future React features."
//         }
//     ],
//     certificates: [
//         {
//             "title": "AWS Certified Developer - Associate",
//             "description": "Demonstrates proficiency in developing, deploying, and debugging cloud-based applications using AWS. Covers topics including core AWS services, AWS security best practices, and the use of DevOps tools for continuous integration and delivery on AWS."
//         },
//         {
//             "title": "Google Cloud Professional Developer",
//             "description": "Validates expertise in building scalable and highly available applications using Google Cloud technologies. Includes proficiency in cloud-native application development, data storage solutions, and security practices in Google Cloud Platform."
//         }
//     ],
//     skills: [
//         "JavaScript (ES6+)",
//         "TypeScript",
//         "Python",
//         "React",
//         "Vue.js",
//         "Node.js",
//         "Express.js",
//         "Django",
//         "MongoDB",
//         "PostgreSQL",
//         "GraphQL",
//         "RESTful APIs",
//         "AWS (EC2, S3, Lambda, DynamoDB)",
//         "Google Cloud Platform",
//         "Docker",
//         "Kubernetes",
//         "CI/CD (Jenkins, GitLab CI)",
//         "Git",
//         "Agile Methodologies",
//         "Test-Driven Development",
//         "Microservices Architecture"
//     ],
//     languages: [
//         {
//             "name": "English",
//             "proficient": "native"
//         },
//         {
//             "name": "Mandarin Chinese",
//             "proficient": "fluent"
//         },
//         {
//             "name": "Spanish",
//             "proficient": "intermediate"
//         }
//     ]
// }


function Title(props: interfaces.titleProps) {
    const { name, jobTitle, links, children, className } = props;

    return (
        <>
            <div className="min-w-full flex justify-center items-center mb-3">
                <h1 className="min-w-full text-center text-zinc-900 text-3xl font-semibold">{name}</h1>
            </div>
            <div className="min-w-full flex justify-center items-center">
                <h3 className="min-w-full text-center text-zinc-900 text-xl">{jobTitle}</h3>
            </div>
            <div>
                <ul className="flex flex-row items-center justify-center links-list gap-3">
                    {links?.map((link, idx) => {
                        return (
                            <li key={`link-${idx}`} className="text-zinc-700 text-sm hover:text-sky-900">
                                <a href={link.linkUrl} className="text-slate-600 hover:text-sky-900">{link.type}</a>
                            </li>
                        )
                    }
                    )}

                </ul>
            </div>
        </>
    )

}

// experience component
function Experience(props: interfaces.experienceProps) {
    const {
        companyName, roleTitle, startingDate, endingDate, location, summary
    } = props;
    return (
        <>
            <div className="flex flex-row justify-between items-stretch p-0 m-0 mb-1">
                <div><h3 className="text-zinc-500 text-sm ">{companyName}</h3></div>
                <div><p className="text-zinc-500 text-sm ">{location}</p></div>
            </div>
            <div className="flex flex-row justify-between items-center p-0 m-0 mb-1">
                <div><h3 className="text-zinc-800 text-lg">{roleTitle}</h3></div>
                <div><p className="text-zinc-500 text-sm text-center align-middle">{startingDate} <span className="font-semibold">TO</span> {endingDate}</p></div>
            </div>
            {
                summary && <div className="flex flex-row justify-between items-stretch p-0 m-0 text-zinc-600 text-xs">
                    <div><p>{summary}</p></div>
                </div>
            }
        </>
    )
}
// education component
function Education(props: interfaces.educationProps) {
    const {
        schoolName, degreeTitle, startingDate, endingDate, location, summary
    } = props;
    return (
        <>
            <div className="flex flex-row justify-between items-stretch p-0 m-0">
                <div><h3 className="text-zinc-500 text-sm">{schoolName}</h3></div>
                <div><p className="text-zinc-500 text-sm ">{location}</p></div>
            </div>
            <div className="flex flex-row justify-between items-stretch p-0 m-0">
                <div><h3 className="text-zinc-800 text-lg">{degreeTitle}</h3></div>
                <div><p className="text-zinc-500 text-sm text-center align-middle">{startingDate} <span className="font-semibold">TO</span> {endingDate}</p></div>
            </div>
            {
                summary && <div className="flex flex-row justify-between items-stretch p-0 m-0 text-zinc-600 text-xs">
                    <div><p>{summary}</p></div>
                </div>
            }
        </>
    )
}

function Project(props: interfaces.projectsProps) {
    const { title, description } = props

    return (
        <>
            <h1 className="min-w-full text-zinc-800 text-lg ">{title}</h1>
            <p className="w-full p-0 m-0 text-zinc-600 text-xs">{description}</p>
        </>
    )
}

// certificate component
function Certificate(props: interfaces.certificateProps) {
    const { title, description } = props

    return (
        <>
            <h1 className="min-w-full text-zinc-800 text-lg ">{title}</h1>
            <p className="w-full p-0 m-0 text-zinc-600 text-xs">{description}</p>
        </>
    )
}

// language component
function Language(props: interfaces.language) {
    const { name, proficient } = props;

    return (
        <div className="p-0 m-0 min-w-full flex flex-row gap-4 justify-start items-center">
            <div className="w-1/3"><h3 className="text-zinc-800 text-sm">{name}</h3></div>
            <div><p className="text-zinc-600 text-xs">{proficient}</p></div>
        </div>
    )
}


// option pop up
function OptionPopUp(props: {
    setToEdit: Function, toEdit: { field: string, index: number },
    add: Function,
    setToDelete: Function, toDelete: { fieldItems: object[], item_idx: number, fieldType: string, setFieldItems: Function },
}) {

    const { setToEdit, toEdit, add, setToDelete, toDelete } = props;
    return (
        <div className="absolute top-0 left-0 -translate-y-1/2 w-full h-8bg-opacity-50 border-none rounded-lg flex justify-center items-center gap-4">
            {/* delete the current section */}
            <button className="relative flex justify-center items-center bg-[rgba(var(--primary-light-rgba))] border rounded-full p-1" onClick={() => { setToDelete({ ...toDelete }) }}>
                <svg className="w-4 h-4 text-slate-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.757-1a1 1 0 1 0 0 2h8.486a1 1 0 1 0 0-2H7.757Z" clipRule="evenodd" />
                </svg>
                <div id="tooltip-default" role="tooltip" className="absolute z-10 -top-[100%] inline-block w-fit px-2 py-1 text-xs font-extralight text-white bg-[rgba(var(--primary-light-rgba))] transition-opacity duration-300 rounded-lg opacity-0">
                    Delete
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </button>
            {/* edit the section */}
            <button className="relative flex justify-center items-center bg-slate-600 border rounded-full p-1" onClick={() => setToEdit(toEdit)}>
                <svg className="w-4 h-4 text-slate-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                </svg>
                <div id="tooltip-default" role="tooltip" className="absolute z-10 -top-[100%] inline-block w-fit px-2 py-1 text-xs font-extralight text-white bg-slate-600 transition-opacity duration-300 rounded-lg opacity-0">
                    Edit
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </button>
            {/* add section */}
            <button className="relative flex justify-center items-center bg-slate-600 border rounded-full p-1" onClick={() => add()}>
                <svg className="w-4 h-4 text-slate-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd" />
                </svg>
                <div id="tooltip-default" role="tooltip" className="absolute z-10 -top-[100%] inline-block w-fit px-2 py-1 text-xs font-extralight text-white bg-slate-600 transition-opacity duration-300 rounded-lg opacity-0">
                    Add
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </button>
        </div>
    );
}

// main resume template
export default function IvyTemplate(props: interfaces.templateFields) {

    // move to the edit page

    // const {
    //     title, setTitle,
    //     summary, setSummary,
    //     skills, setSkills,
    //     experiences, setExperiences,
    //     education, setEducation,
    //     projects, setProjects,
    //     certificates, setCertificates,
    //     languages, setLanguages
    // } = props

    const [toEdit, setToEdit] = useState({ field: '', index: -1 });

    /////////////////////////////

    const [hovered, setHovered] = useState({ field: '' });


    return PrintableIvyTemplate({ props, interActionsHooks: { edit: { setToEdit, toEdit }, hovered: { setHovered, hovered } } });
}


/**
 * Function act as an abstract that can work for both printable and editable template
 * @param props 
 * @returns 
 */

export function PrintableIvyTemplate(props: { props: interfaces.templateFields, interActionsHooks?: { edit: { setToEdit: Function, toEdit: { field: any, index: number } }, hovered: { setHovered: Function, hovered: { field: any } } } }) {

    const {
        title, setTitle,
        summary, setSummary,
        skills, setSkills,
        experiences, setExperiences,
        education, setEducation,
        projects, setProjects,
        certificates, setCertificates,
        languages, setLanguages
    } = props.props;

    const { setToEdit, toEdit } = props.interActionsHooks ? props.interActionsHooks.edit : { setToEdit: (field: any) => { }, toEdit: { field: '' } };
    const { setHovered, hovered } = props.interActionsHooks ? props.interActionsHooks.hovered : { setHovered: (field: any) => { }, hovered: { field: '' } };

    const [deleteField, setDeleteField] = useState({ fieldItems: [], item_idx: 0, fieldType: '', setFieldItems: (fieldItems: any) => { } });

    return (
        <>
            {/* Confirm field deletion modal */}
            {deleteField.fieldType !== '' && <AlertResumeDelete
                closeModel={() => setDeleteField({ fieldItems: [], item_idx: -1, fieldType: '', setFieldItems: () => { } })}
                message={'Confirm field deletion...'}
                confirm={resumeFieldsEdits.removeField}
                toDelete={deleteField} />
            }
            {/* Resume template article */}
            <article id="resume-template" className={`flex flex-col w-full max-w-[640px] min-h-[720px] bg-white border p-8 m-auto gap-4 items-stretch justify-stretch ${props.className || ''}`}>
                <div onMouseEnter={(e) => setHovered({ field: 'title' })} onMouseLeave={(e) => setHovered({ field: '' })} id="title-container" className="relative border-0 mb-4 cursor-default transition-transform ease-in hover:scale-110 hover:bg-slate-200 hover:p-4 hover:border hover:drop-shadow-sm">
                    <Title {...title}></Title>
                    {hovered.field === 'title' && <OptionPopUp setToEdit={setToEdit} toEdit={{ field: 'title', index: -1 }} add={() => { }} toAdd={{ field: '', index: -1 }}
                        setToDelete={setDeleteField}
                        toDelete={{ fieldItems: experiences, item_idx: -1, fieldType: 'title', setFieldItems: setExperiences }} />
                    }
                </div>
                {/* summary section */}
                <div onMouseEnter={(e) => setHovered({ field: 'summary' })} onMouseLeave={(e) => setHovered({ field: '' })} id="summary-container" className="relative mb-4 cursor-default transition-transform ease-in hover:scale-110 hover:bg-slate-200 hover:p-4 hover:border hover:drop-shadow-sm">
                    <h1 className="min-w-full font-semibold text-center text-zinc-900 border-b border-slate-400">Summary</h1>
                    <p className="w-full p-0 m-0 text-xs text-zinc-800 text-pretty">{summary}</p>

                    {hovered.field === 'summary' && <OptionPopUp setToEdit={setToEdit} toEdit={{ field: "summary", index: -1 }} add={() => { }} toAdd={{ field: 'summary', index: 0 }}
                        setToDelete={setDeleteField}
                        toDelete={{ fieldItems: experiences, item_idx: -1, fieldType: 'title', setFieldItems: setExperiences }} />
                    }
                </div>

                {/* skills section */}
                <div onMouseEnter={(e) => setHovered({ field: 'skills' })} onMouseLeave={(e) => setHovered({ field: '' })} id="skills-container" className="relative border-0 mb-4 cursor-default transition-transform ease-in hover:scale-110 hover:bg-slate-200 hover:p-4 hover:border hover:drop-shadow-sm">
                    <h1 className="min-w-full font-semibold text-center text-zinc-900 border-b border-slate-400">Skills</h1>
                    <p className="w-full p-0 m-0 text-xs text-zinc-800 text-pretty">{skills.join(', ')}</p>

                    {hovered.field === 'skills' && <OptionPopUp setToEdit={setToEdit} toEdit={{ field: "skills", index: -1 }} add={() => { }} toAdd={{ field: 'skills', index: -1 }} delete={() => { }} toDelete={{ field: 'skills', index: -1 }} />}
                </div>

                {/* experience section */}
                <div id="experience-container" className="relative border-0 mb-4 cursor-default">
                    <h1 className="min-w-full font-semibold text-center text-zinc-900 border-b border-slate-400">Experience</h1>
                    <ul className="p-0 m-0 flex flex-col items-stretch justify-between gap-y-4 list-none">
                        {experiences.map((expr, idx) => {
                            return (
                                <li onMouseEnter={(e) => setHovered({ field: `experiences-${idx}` })} onMouseLeave={(e) => setHovered({ field: '' })} key={idx} id={`${idx}`} className="relative p-0 m-0 transition-transform ease-in hover:scale-110 hover:bg-slate-200 hover:p-4 hover:mt-4 hover:border hover:drop-shadow-sm">
                                    <Experience {...expr} />
                                    {hovered.field === `experiences-${idx}` && <OptionPopUp setToEdit={setToEdit} toEdit={{ field: "experience", index: idx }}
                                        add={() => {
                                            console.log('add experience');
                                            resumeFieldsEdits.addField({ fieldItems: experiences, item_idx: idx, fieldType: 'experience', setToEdit });
                                        }}
                                        setToDelete={setDeleteField}
                                        toDelete={{ fieldItems: experiences, item_idx: idx, fieldType: 'experience', setFieldItems: setExperiences }} />
                                    }
                                </li>
                            );
                        })}
                    </ul>
                    {/* {hovered.field === 'experiences' && <OptionPopUp />} */}
                </div>

                {/* project section */}
                {projects && <div className="relative border-0 mb-4 cursor-default">
                    <h1 className="min-w-full font-semibold text-center text-zinc-900 border-b border-slate-400">Projects</h1>
                    <ul className="p-0 m-0 flex flex-col items-stretch justify-between gap-y-3 list-none">
                        {projects.map((project, idx) => {
                            return (
                                <li onMouseEnter={(e) => setHovered({ field: `project-${idx}` })} onMouseLeave={(e) => setHovered({ field: '' })} key={idx} className="relative p-0 m-0 transition-transform ease-in hover:scale-110 hover:bg-slate-200 hover:p-4 hover:mt-4 hover:border hover:drop-shadow-sm">
                                    <Project {...project} />
                                    {hovered.field === `project-${idx}` && <OptionPopUp setToEdit={setToEdit} toEdit={{ field: 'project', index: idx }}
                                        add={() => {
                                            console.log('add project');
                                            resumeFieldsEdits.addField({ fieldItems: projects, item_idx: idx, fieldType: 'project', setToEdit });
                                        }}
                                        setToDelete={setDeleteField}
                                        toDelete={{ fieldItems: projects, item_idx: idx, fieldType: 'project', setFieldItems: setProjects }}
                                    />}
                                </li>
                            );
                        })}
                    </ul>
                    {/* {hovered.field === 'projects' && <OptionPopUp />} */}
                </div>
                }

                {/* education section */}
                {education && <div className="relative border-0 mb-4 cursor-default">
                    <h1 className="min-w-full font-semibold text-center text-zinc-900 border-b border-slate-400">Education</h1>
                    <ul className="p-0 m-0 flex flex-col items-stretch justify-between gap-y-3 list-none">
                        {education.map((edu, idx) => {
                            return (
                                <li onMouseEnter={(e) => setHovered({ field: `education-${idx}` })} onMouseLeave={(e) => setHovered({ field: '' })} key={idx} className="relative p-0 m-0 transition-transform ease-in hover:scale-110 hover:bg-slate-200 hover:p-4 hover:mt-4 hover:border hover:drop-shadow-sm">
                                    <Education {...edu} />
                                    {hovered.field === `education-${idx}` && <OptionPopUp setToEdit={setToEdit} toEdit={{ field: "education", index: idx }}
                                        add={() => {
                                            console.log('add project');
                                            resumeFieldsEdits.addField({ fieldItems: education, item_idx: idx, fieldType: 'education', setToEdit });
                                        }}
                                        setToDelete={setDeleteField}
                                        toDelete={{ fieldItems: education, item_idx: idx, fieldType: 'education', setFieldItems: setEducation }}
                                    />}
                                </li>
                            );
                        })}
                    </ul>
                    {/* {hovered.field === 'education' && <OptionPopUp />} */}
                </div>}


                {/* certificate section */}
                {certificates && <div className="relative border-0 mb-4 cursor-default">
                    <h1 className="min-w-full font-semibold text-center text-zinc-900 border-b border-slate-400">Certificate</h1>
                    <ul className="flex flex-col list-none p-0 m-0 gap-4">
                        {certificates.map((certificate, idx) => {
                            return (
                                <li key={idx} onMouseEnter={(e) => setHovered({ field: `certificate-${idx}` })} onMouseLeave={(e) => setHovered({ field: '' })} className="relative p-0 m-0 transition-transform ease-in hover:scale-110 hover:bg-slate-200 hover:p-4 hover:mt-4 hover:border hover:drop-shadow-sm">
                                    <Certificate {...certificate} />
                                    {hovered.field === `certificate-${idx}` && <OptionPopUp setToEdit={setToEdit} toEdit={{ field: 'certificate', index: idx }}
                                        add={() => {
                                            console.log('add project');
                                            resumeFieldsEdits.addField({ fieldItems: certificates, item_idx: idx, fieldType: 'certificate', setToEdit });
                                        }}
                                        setToDelete={setDeleteField}
                                        toDelete={{ fieldItems: certificates, item_idx: idx, fieldType: 'certificate', setFieldItems: setCertificates }}
                                    />}
                                </li>
                            );
                        })}
                    </ul>
                    {/* {hovered.field === 'certificate' && <OptionPopUp />} */}
                </div>
                }

                {/* language section */}
                <div className="relative border-0 mb-4 cursor-default">
                    <h1 className="min-w-full font-semibold text-center text-zinc-900 border-b border-slate-400">Languages</h1>
                    <ul className="p-0 m-0 flex flex-col items-stretch justify-between gap-y-3 list-none">
                        {languages.map((lang, idx) => {
                            return (
                                <li key={idx} onMouseEnter={(e) => setHovered({ field: `language-${idx}` })} onMouseLeave={(e) => setHovered({ field: '' })} className="relative p-0 m-0 transition-transform ease-in hover:scale-110 hover:bg-slate-200 hover:p-4 hover:mt-1 hover:border hover:drop-shadow-sm">
                                    <Language {...lang} />
                                    {hovered.field === `language-${idx}` && <OptionPopUp setToEdit={setToEdit} toEdit={{ field: 'language', index: idx }}
                                        add={() => {
                                            console.log('add language');
                                            resumeFieldsEdits.addField({ fieldItems: languages, item_idx: idx, fieldType: 'language', setToEdit: setToEdit });
                                        }}
                                        setToDelete={setDeleteField}
                                        toDelete={{ fieldItems: languages, item_idx: idx, fieldType: 'language', setFieldItems: setLanguages }}
                                    />}
                                </li>
                            );
                        })}
                    </ul>

                    {/* {hovered.field === 'languages' && <OptionPopUp />} */}
                </div>


                {toEdit.field === 'title' && <resumeFieldsEdits.EditTitle title={title} setTitle={setTitle} setToEdit={setToEdit} />}
                {toEdit.field === 'summary' && <resumeFieldsEdits.EditSummary summary={summary} setSummary={setSummary} setToEdit={setToEdit}></resumeFieldsEdits.EditSummary>}
                {toEdit.field === 'skills' && <resumeFieldsEdits.EditSkills skills={skills} setSkills={setSkills} setToEdit={setToEdit}></resumeFieldsEdits.EditSkills>}
                {toEdit.field === 'experience' && <resumeFieldsEdits.EditExperience experiences={experiences} experience_idx={toEdit.index || 0} setExperiences={setExperiences} setToEdit={setToEdit}></resumeFieldsEdits.EditExperience>}
                {toEdit.field === 'project' && projects && setProjects && <resumeFieldsEdits.EditProject projects={projects} project_idx={toEdit.index || 0} setProjects={setProjects} setToEdit={setToEdit}></resumeFieldsEdits.EditProject>}
                {toEdit.field === 'education' && <resumeFieldsEdits.EditEducation educations={education} education_idx={toEdit.index || 0} setEducations={setEducation} setToEdit={setToEdit}></resumeFieldsEdits.EditEducation>}
                {toEdit.field === 'certificate' && certificates && setCertificates && < resumeFieldsEdits.EditCertificate certificates={certificates} certificate_idx={toEdit.index || 0} setCertificates={setCertificates} setToEdit={setToEdit}></resumeFieldsEdits.EditCertificate>}
                {toEdit.field === 'language' && <resumeFieldsEdits.EditLanguage languages={languages} language_idx={toEdit.index || 0} setLanguages={setLanguages} setToEdit={setToEdit} />}
            </article >
        </>
    );
}