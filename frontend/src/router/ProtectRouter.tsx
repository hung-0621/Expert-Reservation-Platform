import { useEffect, useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { asyncGet } from '../utils/fetch';
import { auth_api } from '../api/api';

interface ProtectedRouteProps {
    children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        const getStatus = async () => {
            const response = await asyncGet(auth_api.ME);
            if (response.code === 200 && response.data.user) {
                setIsAllowed(true);
            } else {
                setIsAllowed(false);
                navigate('/');
                alert('請先登入以存取此頁面');
            }
        };
        getStatus();
    }, []);


    if (isAllowed === null) {
        return null;
    }

    return isAllowed ? children : null;
}