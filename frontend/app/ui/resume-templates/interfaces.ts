// Props interface declarations

import { ReactNode } from "react"

// title Props
export interface Link {
    linkUrl: string
    type: string
}
export interface titleProps {
    children?: ReactNode
    name: string
    jobTitle: string
    links?: Link[]
    className?: string
}

// experience Props
export interface experienceProps {
    companyName: string
    roleTitle: string
    location: string
    summary?: string
    startingDate: string
    endingDate: string
}

// education Props
export interface educationProps {
    schoolName: string
    degreeTitle: string
    location: string
    summary?: string
    startingDate?: string
    endingDate?: string
}

// projects Props
export interface projectsProps {
    title: string
    description: string
}

// certificate Props
export interface certificateProps {
    title: string
    description: string
}

// achievement Props
export interface achievementProps {
    title: string
    description: string
}

// language Props
export interface language {
    name: string
    proficient: string
}

//template Props
export interface templateProps {
    templateId?: string
    className?: string
    title: titleProps
    summary: string
    skills: string[]
    experiences: experienceProps[]
    education: educationProps[]
    projects?: projectsProps[]
    certificates?: certificateProps[]
    achievements?: achievementProps[]
    languages: language[]
}

export interface resumeData extends templateProps {
    resumeId?: string
}

export interface templateFields {
    className?: string
    title: titleProps
    setTitle: Function
    summary: string
    setSummary: Function
    skills: string[]
    setSkills: Function
    experiences: experienceProps[]
    setExperiences: Function
    education: educationProps[]
    setEducation: Function
    projects?: projectsProps[]
    setProjects?: Function
    certificates?: certificateProps[]
    setCertificates?: Function
    languages: language[]
    setLanguages: Function
}

export interface EnhanceResume {
    resume_data: templateProps
    scoring_insights: {
        score: number
        insights: string[]
    }
}