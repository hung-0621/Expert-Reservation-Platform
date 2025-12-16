import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Landing from '../page/LandingPage';
import ExpertPage from '../page/ExpertPage';

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
                path: 'expert',
                element: <ExpertPage />
            },
        ],
    },
]);

export { router };