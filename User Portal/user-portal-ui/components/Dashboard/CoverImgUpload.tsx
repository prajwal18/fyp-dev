import convertToBase64 from "@/utils/convertToBase64";              // | Utility Function
import FillerImg from "@/public/Images/login-background.jpg";        // | Upload Image - Static
import Image from "next/image";
import CameraAltSharpIcon from '@mui/icons-material/CameraAltSharp';


//Image Section
type ImgUploadPropType = {
    image: any, setImage: (value: any) => void,
    id: string
}
export const CoverImgUpload = ({ image, setImage, id }: ImgUploadPropType) => {

    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target?.files?.[0]) {
            const base64 = await convertToBase64(event.target.files[0]);
            setImage(base64);
        }
    }

    return (
        <>
            <div className="upload-image-container" style={{ position: "relative", width: "100%", overflow: "hidden" }}>
                <Image
                    src={image || FillerImg}
                    height={200}
                    width={100}
                    style={{ objectFit: "cover", width: "100%" }}
                    alt={"Current Image"}
                    onError={async (e: any) => {
                        e.target.onError = null;
                        e.target.src = FillerImg;  // Provide an alternate image reference here
                    }}
                />
                <label htmlFor={id} style={{
                    position: "absolute", top: "20px", right: "20px",
                    padding: "20px",
                    justifyContent: "center", alignItems: "center",
                    background: "rgba(0,0,0,0.8)", color: "white",
                    cursor: "pointer", borderRadius: "50%"
                }}>
                    <CameraAltSharpIcon sx={{ color: "white" }} />
                </label>
                <input
                    type="file"
                    id={id}
                    style={{ display: "none" }}
                    onChange={handleOnChange}
                />
            </div>
        </>
    );
}
//Image Section

export default CoverImgUpload;