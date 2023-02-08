type SessionRetTyp = {
    setSession: (value:any) => void,
    getSession: () => any,
    clearSession: () => void
}

const useSession = (key:string): SessionRetTyp => {
    const sessionKey = key;
    function setSession(value: any) {
        if(window !== undefined){
            let sessionValue = JSON.stringify(value);
            localStorage.setItem(sessionKey, sessionValue);
        }
    }
    function getSession() {
        if(window !== undefined){
            let sessionValue = JSON.parse(localStorage.getItem(sessionKey) || "");
            return sessionValue;
        }
        return null;
    }
    function clearSession() {
        if(window !== undefined){
            localStorage.removeItem(sessionKey);
        }
    }

    return { setSession, getSession, clearSession };
}

export default useSession;