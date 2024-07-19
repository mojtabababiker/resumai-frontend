// utilities that interact with the FastAPI backend on resumes endpoint, and return the data in a format that the frontend can use

import {globalFetcher} from "@/app/utils/api-client";

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