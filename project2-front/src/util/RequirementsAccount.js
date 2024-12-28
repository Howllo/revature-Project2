let PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~`!@#$%^&*()\-_+={}[\]|;:<>,./?]).{8,}$/;
let EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
let USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;
let CHECKMARK_USER_REGEX = /^[a-zA-Z0-9_-]{0,}$/;

let regexEmail = new RegExp(EMAIL_REGEX);
let regexUsername = new RegExp(USERNAME_REGEX);
let regexPassword = new RegExp(PASSWORD_REGEX);
let regexCheckmark = new RegExp(CHECKMARK_USER_REGEX);


export function RequirementsEmail(test_string) {
    return regexEmail.test(test_string);
}

export function RequirementsPassword(testPassword) {
    return regexPassword.test(testPassword);
}

export function RequirementsUsername(testUsername) {
    return regexUsername.test(testUsername);
}

export function RequirementsUsernameCheckmark(testUsername) {
    return regexCheckmark.test(testUsername);
}