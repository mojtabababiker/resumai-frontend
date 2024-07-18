// Props interface declarations

import { ReactNode } from "react"

// title Props
export interface Link {
    linkUrl: string
    linkType: string
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

// language Props
export interface language {
    name: string
    proficient: string
}

//template Props
export interface templateProps {
    title: titleProps
    summary: string
    skills: string[]
    experiences: experienceProps[]
    education: educationProps[]
    projects?: projectsProps[]
    certificates?: certificateProps[]
    languages: language[]
}
