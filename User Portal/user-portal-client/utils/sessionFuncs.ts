import Cookies from "universal-cookie";
import { toast } from 'react-toastify';

export const manageSessionRouting = (asPath: string, push: (value:string) => void, setIncludeLayout: (value:any) => void) => {
    const cookies = new Cookies();
    const session = cookies.get('user_session');
    const token = cookies.get('user_token');

    if(session && token) {
        // If there is some session stored
        if(['Student', 'Teacher'].includes(session.role) && typeof session.id === 'string' && typeof session.email === 'string'){
            // This confirms (~v~) the user's logged in
            setIncludeLayout(true);
            if(asPath === '/' || asPath === `/${session.role}`){
                push(`/${session.role}/Dashboard`);
            }
            if(asPath.includes('/Auth/') || !asPath.includes(`/${session.role}`) ) {
                toast.warn(`You cannot access ${asPath} route.`);
                push(`/${session.role}/Dashboard`);
            }
        } else {
            cookies.remove('user_session');
            cookies.remove('user_token');
            push('/Auth/Login');
            toast.warn('Sorry, you have invalid credentials. Try to Login again.');
        }

    } else {
        // If the user is not logged in
        setIncludeLayout(false);
        if(asPath === '/'){
            push('/Auth/Login');
        }
        if(asPath.includes('/Student/') || asPath.includes('/Teacher/')) {
            // If the user is not in any of the Auth routes
            push('/Auth/Login');
            toast.warn('Restricted page, login to access.');
        }
    }

}

export const clearSession = () => {
    const cookies = new Cookies();

    // Removing token
    cookies.remove('user_session');
    // Removing session
    cookies.remove('user_token');
}

export const setSession = (key: string, data: any) => {
    const cookies = new Cookies();
    
    // setting the session value
    cookies.set(key, data);
}

export const getUserSession = () => {
    const cookies = new Cookies();
    return cookies.get('user_session');
}

export const getTokenData = () => {
    const cookies = new Cookies();
    return cookies.get('user_token');
}