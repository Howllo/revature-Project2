package net.revature.project1.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseHandler {
    /**
     * Generic method to handle different types of responses based on the provided enum and data.
     *
     * @param status The enum representing the status of the operation
     * @param data The data to be returned in case of success (can be null)
     * @param message Optional message to override default messages
     * @return ResponseEntity with appropriate status code and response body
     */
    public static <T, E extends Enum<E>> ResponseEntity<?> returnType(E status, T data, String... message) {
        return switch(status.name()) {
            case "SUCCESS" -> {
                if (data != null) {
                    yield ResponseEntity.ok(data);
                }
                yield ResponseEntity.ok(message.length > 0 ? message[0] : "Operation completed successfully.");
            }
            case "SUCCESS_DELETED", "SUCCESS_UPDATED" ->
                    ResponseEntity.ok(message.length > 0 ? message[0] : "Operation completed successfully.");

            case "SUCCESS_UNLIKED" ->
                ResponseEntity.ok(message.length > 0 ? message[0] : "Operation successfully unliked.");

            case "INVALID_REQUEST", "INVALID_INPUT", "INVALID_ALREADY_EXISTS",
                 "INVALID_POST", "INVALID_USER", "INVALID_COMMENT", "INVALID_ALREADY_LIKED" ->
                    ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(message.length > 0 ? message[0] : "Invalid request parameters.");

            case "UNAUTHORIZED", "INVALID_TOKEN", "TOKEN_EXPIRED" ->
                    ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(message.length > 0 ? message[0] :
                                    "Unauthorized - Please check your credentials and try again.");

            case "FORBIDDEN" ->
                    ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(message.length > 0 ? message[0] :
                                    "Forbidden - You don't have permission to perform this action.");

            case "NOT_FOUND" ->
                    ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(message.length > 0 ? message[0] : "Requested resource not found.");

            case "CONFLICT" ->
                    ResponseEntity.status(HttpStatus.CONFLICT)
                            .body(message.length > 0 ? message[0] :
                                    "Operation could not be completed due to a conflict.");

            default ->
                    ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(message.length > 0 ? message[0] :
                                    "Internal Server Error - An unexpected error occurred.");
        };
    }
}