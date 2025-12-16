import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Landing from '../page/LandingPage';
import ExpertPage from '../page/ExpertPage';
import ProtectedRoute from './ProtectRouter';
import AboutZZYPage from '../page/AboutZZYPage';
import PlatformIntroPage from '../page/PlatformIntroPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Landing />
            },
            {
                path: '/expert',
                element:
                    <ProtectedRoute>
                        <ExpertPage />
                    </ProtectedRoute>
            },
            {
                path: '/platform-intro',
                element: 
                    <PlatformIntroPage />
            },
            {
                path: '/about-zzy',
                element: 
                    <AboutZZYPage />
            },
        ],
    },
]);

export { router };