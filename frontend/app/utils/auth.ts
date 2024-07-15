// responsible for handling authentication and authorization
import useSWR from 'swr';
import { globalFetcher } from "@/app/utils/api-client";


interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

interface BaseResponse {
    isLoading: boolean;
    isError: Error | null;
}

interface UserResponse extends BaseResponse{
    user: User | null
}

interface TokenResponse extends BaseResponse {
    accessToken: string | null;
}

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
export function getLoginToken(formData: FormData): TokenResponse {
    const {data, error, isLoading} = useSWR(
        {
            url:'auth/session',
            method: 'POST',
            token: '',
            bodyData: formData.toString(),
            contentType: 'application/x-www-form-urlencoded'
        },
        globalFetcher,
        {revalidateOnFocus: false, revalidateOnReconnect: false}
    )
    return {
        accessToken: data,
        isLoading,
        isError: error
    };
}
