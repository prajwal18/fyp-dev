import Image from "next/image";
import profilePic from "@/public/Images/uploadImg.png";
import { useEffect, useState } from "react";

const ProfileImage = ({ src }: { src?: string }) => {
    const [srcImage, setSrcImage] = useState<any>('');
    useEffect(() => {
        setSrcImage(src);
    }, [src])
    return (
        <>
            <Image
                src={srcImage || profilePic}
                alt="profile"
                height={50}
                width={50}
                style={{ height: "50px", width: "50px", borderRadius: "50%", objectFit: "cover" }}
                onError={(e: any) => {
                    setSrcImage(profilePic);
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