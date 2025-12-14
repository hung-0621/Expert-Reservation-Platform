const BASE_URL = import.meta.env.VITE_API_URL;

const auth_api_base = `${BASE_URL}/auth`;
const booking_api_base = `${BASE_URL}/booking`;
const expert_api_base = `${BASE_URL}/expert`;

export const auth_api = {
    LOGIN: `${auth_api_base}/login`,
    REGISTER: `${auth_api_base}/register`,
    LOGOUT: `${auth_api_base}/logout`,
    ME: `${auth_api_base}/me`,
}

export const booking_api = {
    CREATE: `${booking_api_base}/create`,
    CANCEL: `${booking_api_base}/cancel`,
    VIEW: `${booking_api_base}/view`,
}

export const expert_api = {
    LIST: `${expert_api_base}/list`,
    APPLY_TO_EXPERT: `${expert_api_base}/apply_to_expert`,
    FIND_BY_ID: (id: string) => `${expert_api_base}/${id}`,
}