import profilePic from "../assets/images/profilePic.png";
const MyImg = ({ src }: { src?: string }) => {
    return (
        <img src={src || profilePic} alt="profile" style={{ height: "50px", width: "50px", borderRadius: "50%", objectFit: "cover" }} />
    );
}

export default MyImg;