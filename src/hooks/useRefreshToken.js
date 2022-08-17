import axios from "axios";
import { AuthContext } from "context/AuthProvider";
import { useContext } from "react";
import axiosInstance from "utils/axiosApi";
import { AUTHTOKENS, BASEURL } from "utils/constants";

const useRefreshToken = () => {
  console.log("useRefreshToken");
  const { setAuthTokens } = useContext(AuthContext);

  const refresh = async () => {
    const authTokens = localStorage.getItem(AUTHTOKENS)
      ? JSON.parse(localStorage.getItem(AUTHTOKENS))
      : null;
    const response = await axiosInstance.post(`${BASEURL}/api/token/refresh/`, {
      refresh: authTokens.refresh,
    });
    setAuthTokens(response.data);
    localStorage.setItem(AUTHTOKENS, JSON.stringify(response.data));

    return response.data;
  };

  return refresh;
};

export default useRefreshToken;
