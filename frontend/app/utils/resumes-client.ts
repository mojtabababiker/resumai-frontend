// utilities that interact with the FastAPI backend on resumes endpoint, and return the data in a format that the frontend can use

import {globalFetcher} from "@/app/utils/api-client";
import { templateProps } from "../ui/resume-templates/interfaces";


export interface Resume {
    data: templateProps,
    _id: string,
    created_at: string,
    updated_at: string,
    templateId:string,
}

/**
 * a utility that interact with the backend API to create a new resume for the current logged in user
 * @param resumeObj the json string that represent the resume fields data
 */
export async function addResume(resumeObj: object): Promise<{data: string, message: string}> {

    const tokenObj = localStorage.getItem('auth-token');

    const token = tokenObj ? JSON.parse(tokenObj) : null;
    if (!token) {
        throw new Error('Session ended, Login required');
    }

    const res = await globalFetcher(
        {
            url:'/resumes',
            method: 'post',
            token: token,
            bodyData: JSON.stringify(resumeObj),
        }
    );
    return {data: res, message: 'Resume Saved successfully'};
}

export async function getUserResumes(): Promise<{recent:Resume[], all: Resume[]}> {
    const tokenObj = localStorage.getItem('auth-token');
    const token = tokenObj ? JSON.parse(tokenObj) : null;

    if (!token) {
        throw new Error('Session ended, Login required');
    }

    const res:Resume[] = await globalFetcher(
        {
            url: '/resumes',
            method: 'get',
            token,
        }
    );
    res.sort((a, b) => {
        if (a.updated_at === b.updated_at) {
            return 0;
        }
        if (a.updated_at < b.updated_at) {
            return 1;
        }
        return -1;
    })
    return {recent: res.slice(0, 3), all: res}
}