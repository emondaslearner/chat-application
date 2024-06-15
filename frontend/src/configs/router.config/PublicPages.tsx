import Login from '@src/pages/Login';
import RouteConfig from '../../Router/RouteConfig'; // Import the appropriate type if you have defined it
import SignUp from '@src/pages/SignUp';
import ForgotPassword from '@src/pages/ForgotPassword';
import VerifyOtp from '@src/pages/VerifyOtp';

const PublicPages: RouteConfig[] = [
    {
        path: '/login',
		element: <Login />,
		meta: {
			layout: 'blank',
			isMenu: false
		}
    },
    {
        path: '/sign-up',
		element: <SignUp />,
		meta: {
			layout: 'blank',
			isMenu: false
		}
    },
    {
        path: '/forgot-password',
		element: <ForgotPassword />,
		meta: {
			layout: 'blank',
			isMenu: false
		}
    },
    {
        path: '/verify-otp',
		element: <VerifyOtp />,
		meta: {
			layout: 'blank',
			isMenu: false
		}
    },
];

export default PublicPages;
