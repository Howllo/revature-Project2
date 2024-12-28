package net.revature.project1.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="app_user")
public class AppUser {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "display_name")
    private String displayName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "profile_pic")
    private String profilePic;

    @Column(name = "banner_pic")
    private String bannerPic;

    private String biography;

    @Column(name = "user_role")
    private String userRole = "ROLE_USER";

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @ManyToMany
    @JoinTable(
            name = "follower_following",
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name ="following_id")
    )
    private final Set<AppUser> follower = new HashSet<>();

    @ManyToMany(mappedBy = "follower")
    private final Set<AppUser> following = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "user_friend",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name ="friend_id", referencedColumnName = "id")
    )
    private final Set<AppUser> initiatedFriendships  = new HashSet<>();

    @ManyToMany(mappedBy = "initiatedFriendships")
    private final Set<AppUser> receivedFriendships  = new HashSet<>();

    @ManyToMany(mappedBy = "likes")
    private final Set<Post> likedPosts = new HashSet<>();

    public AppUser() {}

    public AppUser(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getUsername() {
        return username;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public String getBannerPic() {
        return bannerPic;
    }

    public String getBiography() {
        return biography;
    }

    public String getRole() {
        return userRole;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Set<AppUser> getFollower() {
        return follower;
    }

    public Set<AppUser> getFollowing() {
        return following;
    }

    public Set<AppUser> getInitiatedFriendships() {
        return initiatedFriendships;
    }

    public Set<AppUser> getReceivedFriendships() {
        return receivedFriendships;
    }

    public Set<Post> getLikedPosts() {
        return likedPosts;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public void setBannerPic(String bannerPic) {
        this.bannerPic = bannerPic;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
