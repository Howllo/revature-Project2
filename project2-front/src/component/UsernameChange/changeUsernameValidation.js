
import { projectApi } from "../../util/axios";
import { RequirementsUsername } from "../../util/RequirementsAccount.js";

export const changeUsernameValidation = (username) => {

  const validateAll = async () => {
    const isUsernameAllowed = await checkUsername();
    const isValidUsername = RequirementsUsername(username);
    return !(!isValidUsername || !isUsernameAllowed);
  };

  const checkUsername = async () => {
    try {
      const response = await projectApi.get(
        `/user/check/username/${username}`
      );
      return response.status === 200;
    } catch (e) {
      if (e.response.status === 403 || e.response.status === 500) {
        console.log(e.response.status);
      }
      return false;
    }
  };

  return {
    checkUsername,
    validateAll,
  };
};

export default changeUsernameValidation;
