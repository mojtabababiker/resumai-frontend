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
export async function addResume(resumeObj: object, toUpdate?:boolean): Promise<{data: string, message: string}> {

    const tokenObj = localStorage.getItem('auth-token');

    const token = tokenObj ? JSON.parse(tokenObj) : null;
    if (!token) {
        throw new Error('Session ended, Login required');
    }
    const {_id, ...resume} = resumeObj;
    const res = await globalFetcher(
        {
            url:`/resumes/${toUpdate && _id}`,
            method: toUpdate ? 'put' : 'post',
            token: token,
            bodyData: toUpdate ? JSON.stringify({data: resume}) : JSON.stringify(resume),
        }
    );
    return {data: res, message: 'Resume Saved successfully'};
}

export async function updateResume(resumeObj: object): Promise<{data: string, message: string}> {
    const res = await addResume(resumeObj, true);
    return res;
}

export async function deleteResume(resumeId: string): Promise<any> {
    const tokenObj = localStorage.getItem('auth-token');
    const token = tokenObj ? JSON.parse(tokenObj) : null;

    if (!token) {
        throw new Error('Session ended, Login required');
    }

    const res = await globalFetcher(
        {
            url: `/resumes?resume_id=${resumeId}`,
            method: 'delete',
            token: token,
        }
    );

    return res;
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