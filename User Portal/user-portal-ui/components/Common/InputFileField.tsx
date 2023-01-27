import convertToBase64 from "@/utils/convertToBase64";          // | Utility Function
import UploadImage from "../../public/Images/uploadImg.png";        // | Upload Image - Static
import Image from "next/image";


//Image Section
type InputFFPropType = {
    image: any, setImage: (value: any) => void,
    dimension: {height: number, width: number}
}
export const InputFileField = ({ image, setImage, dimension }: InputFFPropType) => {
    console.log("Why is this not working: ", UploadImage.src)

    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const base64 = await convertToBase64(event.target?.files?.[0]);
        setImage(base64);
    }

    return (
        <>
            <div className="upload-image-container">
                <label htmlFor="upload">
                    <Image
                        src={UploadImage}
                        height={dimension.height}
                        width={dimension.width}
                        alt={"Current Image"}
                        onError={async (e: any) => {
                            e.target.onError = null;
                            e.target.src = "";  // Provide an alternate image reference here
                        }}
                    />
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