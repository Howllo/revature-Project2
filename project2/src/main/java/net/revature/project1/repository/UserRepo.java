package net.revature.project1.repository;

import net.revature.project1.dto.UserSearchDto;
import net.revature.project1.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<AppUser, Long> {

    /**
     * Used to check if a username exist or not already.
     * @param username Take in the string username to be searched.
     * @return Boolean that is {@code True} if the name exist or {@code False} if the name doesn't exist.
     */
    boolean existsByUsername(String username);

    /**
     * Used to find a user by their username.
     * @param username Take in the username to be used for the search.
     * @return AppUser if it found something or empty if it didn't.
     */
    Optional<AppUser> findAppUserByUsername(String username);

    /**
     * Used to check if the email exist or not already.
     * @param email Take in email to check the database.
     * @return Boolean of {@code True} if the email exist or {@code False} if the email doesn't exist.
     */
    boolean existsByEmail(String email);

    /**
     * Used to find a user by their email.
     * @param email Take in the email to be used for the search.
     * @return Optional of AppUser.
     */
    Optional<AppUser> findAppUserByEmail(String email);

    /**
     * Used to get a list of user that is closed to the searched target.
     * @param username Take in the current typed name to be used to get like status.
     * @return Return a  list of AppUser if it found something or empty if it didn't.
     */
    List<UserSearchDto> findTop7ByUsernameContaining(String username);
}
