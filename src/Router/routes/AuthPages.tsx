import RouteConfig from '../RouteConfig';
import Chat from '../../pages/Chat'

const AuthPages: RouteConfig[] = [
    {
        path: '/',
		element: <Chat />,
		meta: {
			isMenu: true
		}
    }
];

export default AuthPages;
