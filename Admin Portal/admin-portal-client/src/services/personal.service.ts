import axios from "axios";
import endpoints from "../utils/endpoints";

const { login } = endpoints.personal;

export const httpLogin = (data: any) => axios.post(login, data);