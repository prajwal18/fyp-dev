import { useState } from "react";

type UseSessionType = (key:string) => ({getSession: () => any, setSession: (data:any) => void, clearSession: () => void});
const useSession: UseSessionType = (key) => {
    const [name, setName] = useState<string>(key);

    function getSession(){
        const unparsedData = localStorage.getItem(name);
        if(unparsedData){
            return JSON.parse(unparsedData);
        } else {
            return unparsedData;
        }
    }

    function setSession(data:any){
        localStorage.setItem(key, JSON.stringify(data));
    }

    function clearSession(){
        localStorage.removeItem(name);
    }

    return {getSession, setSession, clearSession}
}

export default useSession;