package net.revature.project1.utils;

import java.util.regex.Pattern;

public class RegisterRequirementsUtils {
    private static final String PASSWORD_REGEX = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~`!@#$%^&*()\\-_+={}\\[\\]|;:<>,./?]).{8,}$";
    private static final String EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
    private static final String USERNAME_REGEX = "^[a-zA-Z0-9_-]{3,20}$";

    private static final Pattern passPattern = Pattern.compile(PASSWORD_REGEX);
    private static final Pattern emailPattern = Pattern.compile(EMAIL_REGEX);
    private static final Pattern usernamePattern = Pattern.compile(USERNAME_REGEX);

    /**
     * This is based on the RFC 5322 requirements for email.
     * @param email Takes in a  {@code String} email to be processed.
     * @return {@code True} if the password meets requirements or {@code False} if it fails to
     * meet the requirements.
     */
    public static boolean isValidEmail(String email) {
        email = email.trim();
        return emailPattern.matcher(email).matches();
    }

    /**
     * This is based on 1 uppercase, 1 lowercase, 1 special, 1 number, and 8 characters or greater.
     * @param password Take in {@code String} object password.
     * @return {@code True} if the password meets requirements or {@code False} if it fails to
     * meet the requirements.
     */
    public static boolean isValidPassword(String password) {
        password = password.trim();
        return passPattern.matcher(password).matches();
    }

    /**
     * Used to check if a username meets requirements.
     * @param username Take in a username to be checked for requirements
     * @return Boolean if it meets the requirements.
     */
    public static boolean isValidUsername(String username) {
        username = username.trim();
        return usernamePattern.matcher(username).matches();
    }
}
