import Image from "next/image";
import profilePic from "@/public/Images/uploadImg.png";
import { useEffect, useState } from "react";

const ProfileImage = ({ src }: { src?: string }) => {
    return (
        <>
            <Image
                src={src || profilePic}
                alt="profile"
                style={{ height: "50px", width: "50px", borderRadius: "50%", objectFit: "cover" }}
                onError={(e: any) => {
                    console.log('Error: ', e, '\nImage Link:', src)
                    e.target.src = profilePic;  // Provide an alternate image reference here
                    e.target.onError = null;
                }}
            />
        </>
    );
}

export const CustomImage = ({ src, alt, rest }: { src: string, alt: string, rest: any }) => {
    const [srcImage, setSrcImage] = useState<any>('');
    useEffect(() => {
        setSrcImage(src);
    }, [src]);
    return (
        <>
            <Image
                src={srcImage}
                alt={alt}
                {...rest}
                onError={() => {
                    setSrcImage(profilePic);
                }}
            />
        </>
    );
}

export default ProfileImage;