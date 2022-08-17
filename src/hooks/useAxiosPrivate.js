import { AuthContext } from "context/AuthProvider";
import { useContext, useEffect } from "react";
import { axiosInstancePrivate } from "utils/axiosApi";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { authTokens } = useContext(AuthContext);
  const refresh = useRefreshToken();
  useEffect(() => {
    const requestIntercept = axiosInstancePrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authTokens?.access}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstancePrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        //if our access token is expired
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstancePrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstancePrivate.interceptors.response.eject(requestIntercept);
      axiosInstancePrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authTokens, refresh]);

  return axiosInstancePrivate;
};

export default useAxiosPrivate;
