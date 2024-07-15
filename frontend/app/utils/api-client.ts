 // utilities that interact with the FastAPI backend, and return the data in a format that the frontend can use

import axios from "axios";

interface globalFetcherProps {
    url: string;
    method: string;
    token: string;
    bodyData?: string | object;
    contentType?: string;
    
}

const BASE_API_URL = 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


/**
 * globalFetcher is a utility function that makes various requests to the FastAPI backend according to the parameters passed to it
 * @param param0 object that contains all the necessary information to make the request
 * @returns a promise that resolve to the json data from the response as an object, or an error if the request fails
 */
export const globalFetcher = async ({url, method, token, bodyData, contentType='application/json' }: globalFetcherProps) => {
    try{
        const {status, data} = await apiClient.request(
            {
                url,
                method,
                headers: {Authorization: `Bearer ${token}`, 'Content-Type': contentType},
                data: bodyData
            }
        );
        if (status >= 300 || status < 200) {
            throw new Error(data.detail);
        }
        return data;
    } catch (error) {
        console.log(error);
        // throw new Error(error);
    }
}

