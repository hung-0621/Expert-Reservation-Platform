import type { ApiResponse } from '../interface/ApiResponse';

interface RequestOptions {
    headers?: HeadersInit;
}

export async function asyncGet(api: string, options: RequestOptions = {}): Promise<ApiResponse<any>> {
    const headers: any = {
        'Content-Type': 'application/json',
        ...options.headers
    }
    
    const response = await fetch(api, {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        credentials: 'include',
    });

    try {
        return await response.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw error;
    }
}

export async function asyncPost(api: string, body: {} | FormData, options: RequestOptions = {}): Promise<any>{
    const isFormData = body instanceof FormData;
    
    const headers: any = {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
    };

    const response = await fetch(api, {
        method: 'POST',
        headers: headers,
        body: isFormData ? body : JSON.stringify(body),
        mode: 'cors',
        credentials: 'include',
    });

    try {
        return await response.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw error;
    }
}

export async function asyncDelete(api: string, options: RequestOptions = {}): Promise<any> {
    const headers: any = {
        'Content-Type': 'application/json',
        ...options.headers
    }
    const response = await fetch(api, {
        method: 'DELETE',
        headers: headers,
        mode: 'cors',
        credentials: 'include',
    });

    try {
        return await response.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw error;
    }
}