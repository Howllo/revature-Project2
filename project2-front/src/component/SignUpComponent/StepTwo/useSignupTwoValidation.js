import {useSignup} from "../Context/UseSignup.jsx";
import {projectApi} from "../../../util/axios.js";
import {RequirementsUsername} from "../../../util/RequirementsAccount.js";

export const useSignupTwoValidation = () => {
    const { data } = useSignup();

    const validateAll = async () => {
        const isUsernameAllowed = await checkUsername();
        const isValidUsername = RequirementsUsername(data.username);
        return !(!isValidUsername || !isUsernameAllowed);
    }

    const checkUsername = async () => {
        try {
            const response = await projectApi.get(`/user/check/username/${data.username}`);
            return response.status === 200;
        } catch (e) {
            if(e.response.status === 403 || e.response.status === 500){
                console.log(e.response.status);
            }
            return false;
        }
    }

    return {
        checkUsername,
        validateAll
    }
}

export default useSignupTwoValidation;