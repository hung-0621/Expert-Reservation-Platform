import { createBrowserRouter } from 'react-router-dom';
import Layout from '../compoenets/Layout';
import Landing from '../page/LandingPage';

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
                path:'booking',
                element: <div>Booking Page</div>
            }
        ],
    },
]);

export { router };