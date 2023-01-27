type SessionRetTyp = {
    setSession: (value: any) => void,
    getSession: () => any,
    clearSession: () => void
}

const useSession = (key: string): SessionRetTyp => {
    const sessionKey = key;

    function setSession(value: any) {
        if (typeof window !== "undefined") {
            localStorage.setItem(sessionKey, JSON.stringify(value));
        }
    }
    function getSession() {
        if (typeof window !== "undefined") {
            let sessionnData = JSON.parse(localStorage.getItem(sessionKey) || "");
            return sessionnData;
        }
        return null;
    }
    function clearSession() {
        if (typeof window !== "undefined") {
            localStorage.removeItem(sessionKey);
        }
    }

    return { setSession, getSession, clearSession }
}

export default useSession;