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

export interface BaseResponse {
    isLoading: boolean;
    isError: Error | null;
}

export interface UserResponse extends BaseResponse{
    user: User | null
}

export interface TokenResponse extends BaseResponse {
    accessToken: string | null;
}
