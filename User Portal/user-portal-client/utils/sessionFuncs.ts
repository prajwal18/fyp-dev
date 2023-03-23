import Cookies from "universal-cookie";
import { toast } from 'react-toastify';

export const manageSessionRouting = (asPath: string, push: (value: string) => void, setIncludeLayout: (value: any) => void) => {
    const cookies = new Cookies();
    const session = cookies.get('user_session');
    const token = cookies.get('user_token');

    if (session && token) {

        if (['Student', 'Teacher'].includes(session.role)) {
            setIncludeLayout(true);
            if (asPath === '/' || asPath === `/${session.role}`) {
                push(`/${session.role}/Dashboard`);
            } else if (!(asPath.includes('/Common/') || asPath.includes(`/${session.role}/`))) {
                toast.warn(`You cannot access ${asPath} route. kokokoko`);
                push(`/${session.role}/Dashboard`);
            }
        } else {
            setIncludeLayout(false);
            push('/Auth/Login');
            toast.warn('Sorry, you have invalid credentials. Try to Login.');
            cookies.remove('user_session');
            cookies.remove('user_token');
        }
    } else {
        setIncludeLayout(false);
        if (asPath === '/') {
            push('/Auth/Login');
        } else if (!asPath.includes('/Auth/')) {
            push('/Auth/Login');
            toast.warn('Restricted page, login to access.');
        }
    }

}

export const clearSession = () => {
    const cookies = new Cookies();

    // Removing token
    cookies.remove('user_session', { path: '/' });
    // Removing session
    cookies.remove('user_token', { path: '/' });
}

export const setSession = (key: string, data: any) => {
    const cookies = new Cookies();

    // setting the session value
    cookies.set(key, data);
}

export const containsSession = () => {
    const cookies = new Cookies();
    const session = cookies.get('user_session');

    if(session && session.role && session.email && session.id) {
        return true;
    }
    return false;
}

export const getUserSession = () => {
    const cookies = new Cookies();
    return cookies.get('user_session');
}

export const getTokenData = () => {
    const cookies = new Cookies();
    return cookies.get('user_token');
}