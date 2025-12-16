import type { ApiResponse } from '../interface/ApiResponse';

interface RequestOptions {
    headers?: HeadersInit;
}

function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
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
    const csrfToken = getCookie('csrf_access_token');

    const headers: any = {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
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
    const csrfToken = getCookie('csrf_access_token');

    const headers: any = {
        'Content-Type': 'application/json',
        ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
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