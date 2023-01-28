import convertToBase64 from "@/utils/convertToBase64";              // | Utility Function
import UploadImage from "../../public/Images/uploadImg.png";        // | Upload Image - Static
import Image from "next/image";
import Typography from "@mui/material/Typography";


//Image Section
type InputFFPropType = {
    image: any, setImage: (value: any) => void,
    dimension: { height: number, width: number }
}
export const InputFileField = ({ image, setImage, dimension }: InputFFPropType) => {
    console.log("Why is this not working: ", UploadImage.src)

    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target?.files?.[0]) {
            const base64 = await convertToBase64(event.target.files[0]);
            setImage(base64);
        }
    }

    return (
        <>
            <div className="upload-image-container" style={{ position: "relative", borderRadius: "50%", overflow: "hidden" }}>
                <Image
                    src={image || UploadImage}
                    height={dimension.height}
                    width={dimension.width}
                    style={{ borderRadius: "50%", border: "5px solid #DEDEDE", objectFit: "cover" }}
                    alt={"Current Image"}
                    onError={async (e: any) => {
                        e.target.onError = null;
                        e.target.src = UploadImage;  // Provide an alternate image reference here
                    }}
                />
                <label htmlFor="upload"
                    style={{
                        position: "absolute", display: "flex",
                        bottom: "0px", height: "30%",
                        width: "100%", background: "rgba(0,0,0)",
                        alignItems: "center", justifyContent: "center",
                        cursor: "pointer"
                    }}>
                    <Typography sx={{ color: "white" }}>UPLOAD</Typography>
                </label>
                <input
                    type="file"
                    id="upload"
                    style={{ display: "none" }}
                    onChange={handleOnChange}
                />
            </div>
        </>
    );
}
//Image Section

export default InputFileField;