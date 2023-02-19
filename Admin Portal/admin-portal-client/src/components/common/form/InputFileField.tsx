import convertToBase64 from "../../../utils/convertToBase64";              // | Utility Function
import UploadImage from "../../../assets/images/uploadImg.png";        // | Upload Image - Static
import Typography from "@mui/material/Typography";

import { baseURL } from "../../../utils/endpoints";

//Image Section
type InputFFPropType = {
    image: any, setImage: (value: any) => void,
    dimension: { height: number, width: number },
    id: string
}
export const InputFileField = ({ image, setImage, dimension, id }: InputFFPropType) => {
    console.log(image);

    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target?.files?.[0]) {
            const base64 = await convertToBase64(event.target.files[0]);
            setImage(base64);
        }
    }

    return (
        <>
            <div className="upload-image-container" style={{ position: "relative", borderRadius: "50%", overflow: "hidden" }}>
                <img
                    src={image || UploadImage} // (baseURL + image.replace('./','/'))
                    height={dimension.height}
                    width={dimension.width}
                    style={{ borderRadius: "50%", border: "5px solid #DEDEDE", objectFit: "cover" }}
                    alt="Upload"
                    onError={async (e: any) => {
                        e.target.onError = null;
                        e.target.src = UploadImage;  // Provide an alternate image reference here
                    }}
                />
                <label htmlFor={id}
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
                    id={id}
                    style={{ display: "none" }}
                    onChange={handleOnChange}
                />
            </div>
        </>
    );
}
//Image Section

export default InputFileField;