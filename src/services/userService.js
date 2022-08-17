import { AUTHTOKENS } from "utils/constants";

export const setUserToken = (authTokens) => {
  localStorage.setItem(AUTHTOKENS, authTokens);
};