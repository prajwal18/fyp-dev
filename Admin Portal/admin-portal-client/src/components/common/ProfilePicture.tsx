import { MyImg } from "../../constants/FillerImg";
import { userBaseURL } from "../../utils/endpoints";

export const setProfileImg = (data: any) => {
    return { ...data, profile: <MyImg src={`${userBaseURL}${(data?.profilePicture || '/abc.jpg')}`} /> };
}