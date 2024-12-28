import {Box, Typography} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {RequirementsUsernameCheckmark} from "../../../util/RequirementsAccount.js";
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import useSignupTwoValidation from "./useSignupTwoValidation.js";

export default function SignupUsernamePresent({username}) {
    const [isValidUsername, setIsValidUserName] = useState(RequirementsUsernameCheckmark(username));
    const { checkUsername } = useSignupTwoValidation();
    const [doesUsernameExist, setDoesUsernameExist] = useState(false)

    useEffect(() => {
        setIsValidUserName(RequirementsUsernameCheckmark(username))
    }, [username]);

    useEffect(() => {
        const checkUsernameDebounced = setTimeout(async () => {
            if (username && username.length >= 3) {
                const exists = !(await checkUsername());
                setDoesUsernameExist(exists);
            }
        }, 500);

        return () => clearTimeout(checkUsernameDebounced);
    }, [username]);

    const getCorrectIcon = () =>{
        if(isValidUsername === true){
            return (
                <DoneIcon sx={{
                    color: 'green'
                }}/>
            )
        } else {
            return (
                <CloseIcon sx={{
                    color: 'red'
                }}/>
            )
        }
    }

    return (
        <Box
            sx={{
                marginTop: '10px',
                maxWidth: '428px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'left',
                height: 'flex',
                padding: '5px',
                paddingLeft: '15px',
                paddingBottom: '10px',
                borderRadius: '10px',
                border: '1px solid rgb(204,204,204)',
            }}
        >
            {
                doesUsernameExist &&
                <Box
                    sx={{
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                    }}
                >
                    <CloseIcon
                        sx={{
                            color: 'red'
                        }}
                    />

                    <Typography
                        variant="h5"
                        fontFamily=""
                        sx={{
                            marginTop: '1px',
                            marginLeft: '5px',
                            fontSize: '15px',
                            fontHeight: 'bold',
                            fontWeight: 600,
                            maxWidth: '250px',
                            color: 'rgb(102,102,102)'
                        }}
                    >
                        This username is already taken.
                    </Typography>
                </Box>
            }

            <Box
                sx={{
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                }}
            >
                {
                    getCorrectIcon()
                }

                <Typography
                    variant="h5"
                    fontFamily=""
                    sx={{
                        marginTop: '1px',
                        marginLeft: '5px',
                        fontSize: '15px',
                        fontHeight: 'bold',
                        fontWeight: 600,
                        color: 'rgb(102,102,102)'
                    }}
                >
                     Only contains letters, numbers, and hyphens
                </Typography>
            </Box>

            <Box
                sx={{
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                }}
            >
                {
                    username.length < 3 ? <CloseIcon sx={{
                        color: 'red'
                    }}/> : <DoneIcon sx={{
                        color: 'green'
                    }}/>
                }

                <Typography
                    variant="h5"
                    fontFamily=""
                    sx={{
                        marginTop: '1px',
                        marginLeft: '5px',
                        fontSize: '15px',
                        fontHeight: 'bold',
                        fontWeight: 600,
                        color: 'rgb(102,102,102)'
                    }}
                >
                    At least 3 characters
                </Typography>
            </Box>

            <Box
                sx={{
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                }}
            >
                {
                    username.length > 20 ? <CloseIcon sx={{
                        color: 'red'
                    }}/> : <DoneIcon sx={{
                        color: 'green'
                    }}/>
                }

                <Typography
                    variant="h5"
                    fontFamily=""
                    sx={{
                        marginTop: '1px',
                        marginLeft: '5px',
                        fontSize: '15px',
                        fontHeight: 'bold',
                        fontWeight: 600,
                        color: 'rgb(102,102,102)'
                    }}
                >
                    Must have less than or equal to 20 characters.
                </Typography>
            </Box>
        </Box>
    )
}

SignupUsernamePresent.propTypes = {
    username: PropTypes.string.isRequired,
};