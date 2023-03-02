import Image from "next/image";
import profilePic from "@/public/Images/uploadImg.png";

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

export default ProfileImage;