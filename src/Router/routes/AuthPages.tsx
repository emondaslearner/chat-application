import RouteConfig from '../RouteConfig';
import Chat from '../../pages/Chat'

const AuthPages: RouteConfig[] = [
    {
        path: '/',
		element: <Chat />,
		meta: {
			layout: 'blank',
			isMenu: true
		}
    }
];

export default AuthPages;
