import profilePic from "../assets/images/profilePic.png";
const MyImg = ({ src }: { src?: string }) => {
    return (
        <>
            <img 
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

export default MyImg;