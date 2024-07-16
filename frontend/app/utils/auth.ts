'use client';
// responsible for handling authentication and authorization
import useSWR from 'swr';
import { globalFetcher } from "@/app/utils/api-client";
import { UserResponse, TokenResponse } from "@/app/utils/interfaces";
import { AxiosError } from 'axios';

/**
 * Check if the current user is authenticated
 * 
 * @returns {UserResponse} an object that contains information about the user request
 */
export function useUser(): UserResponse {
    const tokenString =  localStorage.getItem('auth-token');
    const tokenObject = tokenString ? JSON.parse(tokenString) : null;

    if (!tokenObject) {
        return {
            user: null,
            isLoading: false,
            isError: Error('Access token not found')
        };
    }
    const {data, error, isLoading} = useSWR(
        {url: '/users/me', method: 'GET', token: tokenObject.access_token},
        globalFetcher,
        {revalidateOnFocus: false, revalidateOnReconnect: true}
    );
    return {
        user: data,
        isLoading,
        isError: error
    };
}

/**
 * Take the user email and password, and send them to the backend to get the access token
 * @param formData the data to be sent to the backend to get the access token,
 *                  typically the user's email and password, beside some default values
 *                  such as grant_type, client_id, and client_secret
 * @returns {TokenResponse} an object that contains the access token, and some information about the request
 */
export async function getLoginToken(formData: FormData): Promise<TokenResponse> {

    try {
        const res = await globalFetcher ({
            url:'auth/session',
            method: 'POST',
            token: '',
            bodyData: formData,
            contentType: 'application/x-www-form-urlencoded'
        });
        if (!res.access_token) {
            throw new Error('Access token not found');
        }
        return {accessToken: res.access_token, isError: null, isLoading: false};
    } catch (error) {
        return {accessToken:null, isError: {...error.response.data, status: error.response.status}, isLoading: false};
    }
}
