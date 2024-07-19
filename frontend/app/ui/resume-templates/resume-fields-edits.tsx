// resume fields customization panel, [add field, remove field]

import { certificateProps, educationProps, experienceProps, Link, projectsProps, titleProps } from "./interfaces";

export function EditTitle(
    {
        title,
        setTitle,
        setToEdit,
    }: { title: titleProps, setTitle: Function, setToEdit: Function }) {

    const oldTitle = { name: title.name, jobTitle: title.jobTitle, links: title.links }
    return (
        <div className="w-svw h-svh fixed top-0 left-0 bottom-0 bg-transparent flex justify-center items-center  z-50" aria-hidden={true}>
            <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3 backdrop-blur-lg w-full max-w-screen-md max-h-[720px] p-6 overflow-auto">
                <div className="md:col-span-3">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-[rgb(var(--primary-rgb))]">Name</label>
                    <input type="text" id="name" className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0" value={title.name} required onChange={(e) => setTitle({ ...title, name: e.target.value })} />
                </div>
                <div className="md:col-span-3">
                    <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-[rgb(var(--primary-rgb))]">Job Title</label>
                    <input type="text" id="jobTitle" className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0" value={title.jobTitle} required onChange={(e) => setTitle({ ...title, jobTitle: e.target.value })} />
                </div>
                {
                    title.links?.map((link, index) => (
                        <div key={`link-${index}`} className="md:col-span-3 flex flex-col md:flex-row justify-between gap-y-3">
                            <label htmlFor="linkUrl" className="block mb-2 text-sm font-medium text-[rgb(var(--primary-rgb))]">Link URL</label>
                            <input type="text" id="linkUrl" className="p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0" value={link.linkUrl} required />
                            <label htmlFor="linkType" className="block mb-2 text-sm font-medium text-[rgb(var(--primary-rgb))]">Link Type</label>
                            <input type="text" id="linkType" className="p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0" value={link.type} required />
                            <button className="flex justify-center items-center  bg-red-500 border rounded-full p-1" onClick={() => {
                                title.links?.splice(index, 1)
                                setTitle({ ...title })
                            }}>
                                <svg className="w-4 h-4 text-slate-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.757-1a1 1 0 1 0 0 2h8.486a1 1 0 1 0 0-2H7.757Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))
                }
                <div className="md:col-span-3">
                    <button className="w-full bg-[rgb(var(--primary-rgb))] text-[rgb(var(--background-start-rgb))] rounded-lg p-4" onClick={() => setToEdit({ field: '', index: -1 })}>Save</button>
                    <button className="w-full text-[rgb(var(--primary-rgb))] bg-[rgb(var(--background-start-rgb))] rounded-lg p-4" onClick={() => {
                        setTitle({ ...title, ...oldTitle });
                        console.log(title);
                        console.log(oldTitle);
                        setToEdit({ field: '', index: -1 });
                    }}>Discard Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export function EditSummary({
    summary,
    setSummary,
    setToEdit,
}: { summary: string, setSummary: Function, setToEdit: Function }) {
    const oldSummary = summary;

    return (
        <div className="w-svw h-svh fixed top-0 left-0 bottom-0 bg-transparent flex justify-center items-center  z-50" aria-hidden={true}>
            <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3 backdrop-blur-lg w-full max-w-screen-md max-h-[720px] p-6 overflow-auto">
                <div className="md:col-span-3">
                    <label htmlFor="summary" className="block mb-2 text-sm font-medium text-gray-900">Summary</label>
                    <textarea id="summary" rows={summary.split(' ').length / 7} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" value={summary} onChange={(e) => setSummary(e.target.value)}></textarea>
                </div>
                <div className="md:col-span-3 flex flex-col md:flex-row gap-3 items-center">
                    <button className="w-full max-w-fit text-sm bg-[rgb(var(--primary-rgb))] text-[rgb(var(--background-start-rgb))] rounded-lg p-2" onClick={() => setToEdit({ field: '', index: -1 })}>Save</button>
                    <button className="w-full max-w-fit text-sm text-[rgb(var(--primary-rgb))]  rounded-lg p-2" onClick={() => {
                        setSummary(oldSummary);
                        setToEdit({ field: '', index: -1 });
                    }}>
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export function EditSkills({
    skills,
    setSkills,
    setToEdit,
}: { skills: string[], setSkills: Function, setToEdit: Function }) {
    const oldSkills = skills;

    return (
        <div className="w-svw h-svh fixed top-0 left-0 bottom-0 bg-transparent flex justify-center items-center  z-50" aria-hidden={true}>
            <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3 backdrop-blur-lg w-full max-w-screen-md max-h-[720px] p-6 overflow-auto">
                <div className="md:col-span-3">
                    <label htmlFor="skills" className="block mb-2 text-sm font-medium text-gray-900">Skills</label>
                    <textarea id="skills" rows={skills.length / 3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" value={skills.join(',')} onChange={(e) => setSkills(e.target.value.split(','))}></textarea>
                </div>
                <div className="md:col-span-3 flex flex-col md:flex-row gap-3 items-center">
                    <button className="w-full max-w-fit text-sm bg-[rgb(var(--primary-rgb))] text-[rgb(var(--background-start-rgb))] rounded-lg p-2" onClick={() => setToEdit({ field: '', index: -1 })}>Save</button>
                    <button className="w-full max-w-fit text-sm text-[rgb(var(--primary-rgb))]  rounded-lg p-2" onClick={() => {
                        setSkills(oldSkills);
                        setToEdit({ field: '', index: -1 });
                    }}>
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export function EditExperience({
    experiences,
    experience_idx,
    setExperiences,
    setToEdit,
}: { experiences: experienceProps[], experience_idx: number, setExperiences: Function, setToEdit: Function }) {

    return (
        <div className="w-svw h-svh fixed top-0 left-0 bottom-0 bg-transparent flex justify-center items-center  z-50" aria-hidden={true}>
            <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3 backdrop-blur-lg w-full max-w-screen-md max-h-[720px] p-6 overflow-auto">
                <div className="md:col-span-3 flex flex-row justify-between items-stretch p-0 m-0 mb-1">
                    <div className="w-2/3">
                        <input type="text" name="compony-name" id="compony-name" value={experiences[experience_idx].companyName} className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                            onChange={(e) => {
                                // const updatedExp = handleChange("companyName", e.target.value);
                                experiences[experience_idx].companyName = e.target.value;
                                console.log(experiences[experience_idx].companyName);
                                setExperiences([...experiences]);
                            }} />
                    </div>
                    <div>
                        <input type="text" name="compony-location" id="compony-location" value={experiences[experience_idx].location} className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                            onChange={(e) => {
                                experiences[experience_idx].location = e.target.value;
                                setExperiences([...experiences]);
                            }} />
                    </div>
                </div>
                <div className="md:col-span-3 flex flex-row justify-between items-center p-0 m-0 mb-1">
                    <div>
                        <input type="text" name="role-title" value={experiences[experience_idx].roleTitle} className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                            onChange={(e) => {
                                experiences[experience_idx].roleTitle = e.target.value;
                                setExperiences([...experiences]);
                            }} />
                    </div>
                    <div className="text-zinc-500 text-sm text-center align-middle flex justify-between">
                        <input type="date" name="starting-date" id="starting-date" value={experiences[experience_idx].startingDate} className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                            onChange={(e) => {
                                experiences[experience_idx].startingDate = e.target.value;
                                setExperiences([...experiences]);
                            }} />
                        <span className="p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0">TO</span>
                        <input type="date" name="ending-date" id="ending-date" value={experiences[experience_idx].endingDate} className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                            onChange={(e) => {
                                experiences[experience_idx].endingDate = e.target.value;
                                setExperiences([...experiences]);
                            }} />
                    </div>
                </div>
                <div className="md:col-span-3 flex flex-row justify-between items-stretch p-0 m-0 text-zinc-600 text-xs">
                    <textarea rows={experiences[experience_idx].summary ? experiences[experience_idx].summary.split(' ').length / 7 : 7} value={experiences[experience_idx].summary ? experiences[experience_idx].summary : ""} placeholder="Job role summary" className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                        onChange={(e) => {
                            experiences[experience_idx].summary = e.target.value;
                            setExperiences([...experiences]);
                        }} />
                </div>
                <div className="md:col-span-3 flex flex-col md:flex-row gap-3 items-center">
                    <button className="w-full max-w-fit text-sm bg-[rgb(var(--primary-rgb))] text-[rgb(var(--background-start-rgb))] rounded-lg p-2" onClick={() => setToEdit({ field: '', index: -1 })}>Save</button>
                    <button className="w-full max-w-fit text-sm text-[rgb(var(--primary-rgb))]  rounded-lg p-2" onClick={() => {
                        // setExperiences();
                        setToEdit({ field: '', index: -1 });
                    }}>
                        Discard Changes
                    </button>
                </div>
            </div>
        </div >
    );
}

export function EditProject({
    projects,
    project_idx,
    setProjects,
    setToEdit,
}: { projects: projectsProps[], project_idx: number, setProjects: Function, setToEdit: Function }) {
    return (

        <div className="w-svw h-svh fixed top-0 left-0 bottom-0 bg-transparent flex justify-center items-center  z-50" aria-hidden={true}>
            <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3 backdrop-blur-lg w-full max-w-screen-md max-h-[720px] p-6 overflow-auto">
                <div className="md:col-span-3">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                    <input type="text" value={projects[project_idx].title} id="title" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" onChange={(e) => {
                        projects[project_idx].title = e.target.value;
                        setProjects([...projects]);
                    }} />
                </div>
                <div className="md:col-span-3">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea rows={projects[project_idx].description.split(' ').length / 7} value={projects[project_idx].description} id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" onChange={(e) => {
                        projects[project_idx].description = e.target.value;
                        setProjects([...projects]);
                    }} />
                </div>
                <div className="md:col-span-3 flex flex-col md:flex-row gap-3 items-center">
                    <button className="w-full max-w-fit text-sm bg-[rgb(var(--primary-rgb))] text-[rgb(var(--background-start-rgb))] rounded-lg p-2" onClick={() => setToEdit({ field: '', index: -1 })}>Save</button>
                    <button className="w-full max-w-fit text-sm text-[rgb(var(--primary-rgb))]  rounded-lg p-2" onClick={() => {
                        // setSummary(oldSummary);
                        setToEdit({ field: '', index: -1 });
                    }}>
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export function EditEducation({
    educations,
    education_idx,
    setEducations,
    setToEdit,
}: { educations: educationProps[], education_idx: number, setEducations: Function, setToEdit: Function }) {
    return (
        <div className="w-svw h-svh fixed top-0 left-0 bottom-0 bg-transparent flex justify-center items-center  z-50" aria-hidden={true}>
            <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3 backdrop-blur-lg w-full max-w-screen-md max-h-[720px] p-6 overflow-auto">
                <div className="md:col-span-3 flex flex-row justify-between items-stretch p-0 m-0 mb-1">
                    <div className="w-2/3">
                        <input type="text" name="school-name" id="compony-name" value={educations[education_idx].schoolName} className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                            onChange={(e) => {
                                // const updatedExp = handleChange("companyName", e.target.value);
                                educations[education_idx].schoolName = e.target.value;
                                console.log(educations[education_idx].schoolName);
                                setEducations([...educations]);
                            }} />
                    </div>
                    <div>
                        <input type="text" name="compony-location" id="compony-location" value={educations[education_idx].location} className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                            onChange={(e) => {
                                educations[education_idx].location = e.target.value;
                                setEducations([...educations]);
                            }} />
                    </div>
                </div>
                <div className="md:col-span-3 flex flex-row justify-between items-center p-0 m-0 mb-1">
                    <div>
                        <input type="text" name="role-title" value={educations[education_idx].degreeTitle} className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                            onChange={(e) => {
                                educations[education_idx].degreeTitle = e.target.value;
                                setEducations([...educations]);
                            }} />
                    </div>
                    <div className="text-zinc-500 text-sm text-center align-middle flex justify-between">
                        <input type="date" name="starting-date" id="starting-date" value={educations[education_idx].startingDate} className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                            onChange={(e) => {
                                educations[education_idx].startingDate = e.target.value;
                                setEducations([...educations]);
                            }} />
                        <span className="p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0">TO</span>
                        <input type="date" name="ending-date" id="ending-date" value={educations[education_idx].endingDate} className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                            onChange={(e) => {
                                educations[education_idx].endingDate = e.target.value;
                                setEducations([...educations]);
                            }} />
                    </div>
                </div>
                <div className="md:col-span-3 flex flex-row justify-between items-stretch p-0 m-0 text-zinc-600 text-xs">
                    <textarea rows={educations[education_idx].summary ? educations[education_idx].summary.split(' ').length / 7 : 7} value={educations[education_idx].summary ? educations[education_idx].summary : ""} placeholder="Job role summary" className="w-full p-4 text-slate-600 text-sm border-0 rounded-xl outline-none focus:outline-none focus:ring-0"
                        onChange={(e) => {
                            educations[education_idx].summary = e.target.value;
                            setEducations([...educations]);
                        }} />
                </div>
                <div className="md:col-span-3 flex flex-col md:flex-row gap-3 items-center">
                    <button className="w-full max-w-fit text-sm bg-[rgb(var(--primary-rgb))] text-[rgb(var(--background-start-rgb))] rounded-lg p-2" onClick={() => setToEdit({ field: '', index: -1 })}>Save</button>
                    <button className="w-full max-w-fit text-sm text-[rgb(var(--primary-rgb))]  rounded-lg p-2" onClick={() => {
                        // setExperiences();
                        setToEdit({ field: '', index: -1 });
                    }}>
                        Discard Changes
                    </button>
                </div>
            </div>
        </div >
    );
}

export function EditCertificate({
    certificates,
    certificate_idx,
    setCertificates,
    setToEdit,
}: { certificates: certificateProps[], certificate_idx: number, setCertificates: Function, setToEdit: Function }) {
    return (

        <div className="w-svw h-svh fixed top-0 left-0 bottom-0 bg-transparent flex justify-center items-center  z-50" aria-hidden={true}>
            <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3 backdrop-blur-lg w-full max-w-screen-md max-h-[720px] p-6 overflow-auto">
                <div className="md:col-span-3">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                    <input type="text" value={certificates[certificate_idx].title} id="title" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" onChange={(e) => {
                        certificates[certificate_idx].title = e.target.value;
                        setCertificates([...certificates]);
                    }} />
                </div>
                <div className="md:col-span-3">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea rows={certificates[certificate_idx].description.split(' ').length / 7} value={certificates[certificate_idx].description} id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" onChange={(e) => {
                        certificates[certificate_idx].description = e.target.value;
                        setCertificates([...certificates]);
                    }} />
                </div>
                <div className="md:col-span-3 flex flex-col md:flex-row gap-3 items-center">
                    <button className="w-full max-w-fit text-sm bg-[rgb(var(--primary-rgb))] text-[rgb(var(--background-start-rgb))] rounded-lg p-2" onClick={() => setToEdit({ field: '', index: -1 })}>Save</button>
                    <button className="w-full max-w-fit text-sm text-[rgb(var(--primary-rgb))] rounded-lg p-2" onClick={() => {
                        // setSummary(oldSummary);
                        setToEdit({ field: '', index: -1 });
                    }}>
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>
        // <div>
        //     <h1 className="min-w-full text-zinc-800 text-lg ">{title}</h1>
        //     <p className="w-full p-0 m-0 text-zinc-600 text-xs">{description}</p>
        // </div>
    )
}
