// holding the app interfaces

export interface globalFetcherProps {
    url: string;
    method: string;
    token: string;
    bodyData?: string | object;
    contentType?: string;
    
}

export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

interface AccessToken {
    access_token: string;
    token_type: string;
}

export interface BaseResponse {
    isLoading: boolean;
    isError: any | Error | null;
}

export interface UserResponse extends BaseResponse{
    user: User | null
}

export interface TokenResponse extends BaseResponse {
    accessToken: AccessToken | null;
}
