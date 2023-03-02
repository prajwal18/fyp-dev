import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import convertToBase64 from "@/utils/convertToBase64";              // | Utility Function
import UploadImage from "@/public/Images/uploadImg.png";            // | Upload Image - Static
import { baseURL } from "@/utils/endpoints";


//Image Section
type InputFFPropType = {
    image: any, setImage: (value: any) => void,
    dimension: { height: number, width: number },
    id: string
}
export const InputFileField = ({ image, setImage, dimension, id }: InputFFPropType) => {

    // State to hold image upload type (Image upload or location, i.e. http://localhost)
    const [ isNew, setIsNew ] = useState(true);

    useEffect(() => {
        if(JSON.stringify(image)){
            if(!JSON.stringify(image).includes('data:image/')){
                setIsNew(false);
            } else {
                setIsNew(true);
            }
        }
        console.log('Image', image);
    }, [image]);

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
                    src={ image ? (isNew ? image : (baseURL+image)) : UploadImage} // (baseURL + image.replace('./','/'))
                    height={dimension.height}
                    width={dimension.width}
                    style={{ borderRadius: "50%", border: "2px solid rgba(0,0,0,0.5)", objectFit: "cover" }}
                    alt={'upload'}
                    onError={async (e: any) => {
                        e.target.onError = null;
                        e.target.src = UploadImage;  // Provide an alternate image reference here
                    }}
                />
                <label htmlFor={id}
                    style={{
                        position: "absolute", display: "flex",
                        bottom: "0px", height: "40%",
                        width: "100%", background: "rgba(0,0,0,0.87)",
                        alignItems: "center", justifyContent: "center",
                        cursor: "pointer",
                    }}>
                    <Typography sx={{ color: "white" }}>
                        {
                            isNew ? 'UPLOAD' : 'CHANGE'
                        }
                    </Typography>
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