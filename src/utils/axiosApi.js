import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { AUTHTOKENS, BASEURL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASEURL,
});

export const axiosInstancePrivate = axios.create({
  baseURL: BASEURL,
  heders: {'content-Type': 'application/json'},
});

// axiosInstance.interceptors.request.use(async (req) => {
//   if (!authTokens) {
//     authTokens = localStorage.getItem(AUTHTOKENS)
//       ? JSON.parse(localStorage.getItem(AUTHTOKENS))
//       : null;
//     req.headers.Authorization = `Bearer ${authTokens?.access}`;
//   }

//   const user = jwt_decode(authTokens?.access);
//   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//   if (!isExpired) return req;

//   const response = await axios.post(`${BASEURL}/api/token/refresh/`, {
//     refresh: authTokens.refresh,
//   });

//   localStorage.setItem(AUTHTOKENS, JSON.stringify(response.data));
//   req.headers.Authorization = `Bearer ${response.data.access}`;

//   return req;
// });

export default axiosInstance;
