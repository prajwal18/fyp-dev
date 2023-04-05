import { useEffect, useState } from "react";
import profilePic from "../assets/images/profilePic.png";

export const MyImg = ({ src }: { src?: string }) => {
    return (
        <>
            <CustImage
                src={src || 'abc.jpg'}
                style={{ height: "50px", width: "50px", borderRadius: "50%", objectFit: "cover" }}
                alt="Profile"
            />
        </>
    );
}

export const CustImage = ({ src, style, alt }: { src: string, style: any, alt: string }) => {
    const [srcPic, setSrcPic] = useState<any>(null);
    useEffect(() => {
        setSrcPic(src)
    }, [src])
    return (
        <>
            <img
                src={srcPic}
                alt={alt}
                style={style}
                onError={(e: any) => {
                    setSrcPic(profilePic);
                }}
            />
        </>
    );

}