import MyProfile from '@src/pages/MyProfile';
import RouteConfig from '../../Router/RouteConfig';
import Calls from '../../pages/Calls';
import Chat from '../../pages/Chat'
import Friends from '../../pages/Friends';

const AuthPages: RouteConfig[] = [
    {
        path: '/chat',
		element: <Chat />,
		meta: {
			layout: 'vertical',
			isMenu: true
		}
    },
    // {
    //     path: '/calls',
	// 	element: <Calls />,
	// 	meta: {
	// 		layout: 'vertical',
	// 		isMenu: true
	// 	}
    // },
    {
        path: '/friends',
		element: <Friends />,
		meta: {
			layout: 'vertical',
			isMenu: true
		}
    },
    {
        path: '/profile',
		element: <MyProfile />,
		meta: {
			layout: 'vertical',
			isMenu: true
		}
    }
];

export default AuthPages;
