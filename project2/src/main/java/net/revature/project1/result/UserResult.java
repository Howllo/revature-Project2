package net.revature.project1.result;

import net.revature.project1.dto.UserDto;
import net.revature.project1.enumerator.UserEnum;

public class UserResult {
    private final UserEnum result;
    private final String Message;
    private final UserDto userDto;

    public UserResult(UserEnum result, String message, UserDto userDto) {
        this.result = result;
        Message = message;
        this.userDto = userDto;
    }

    public UserEnum getResult() {
        return result;
    }

    public String getMessage() {
        return Message;
    }

    public UserDto getUserDto() {
        return userDto;
    }
}
