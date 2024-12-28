package net.revature.project1.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "parent_post")
    private Post postParent;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    private String comment;

    @Column(name = "media")
    private String media;

    @Column(name = "post_at", nullable = false)
    private Timestamp postAt;

    @Column(name= "post_edit")
    private boolean postEdited;

    @ManyToMany
    @JoinTable(
            name = "post_like",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private final Set<AppUser> likes = new HashSet<>();

    public Post() {}

    public Post(AppUser user, String comment) {
        this.user = user;
        this.comment = comment;
        this.postAt = new Timestamp(System.currentTimeMillis());
    }

    public Post(AppUser user, String comment, String media) {
        this.user = user;
        this.comment = comment;
        this.media = media;
        this.postAt = new Timestamp(System.currentTimeMillis());
    }

    public Long getId() {
        return id;
    }

    public Post getPostParent() {
        return postParent;
    }

    public AppUser getUser() {
        return user;
    }

    public String getComment() {
        return comment;
    }

    public String getMedia() {
        return media;
    }

    public Timestamp getPostAt() {
        return postAt;
    }

    public boolean isPostEdited() {
        return postEdited;
    }

    public Set<AppUser> getLikes() {
        return likes;
    }

    public void setMedia(String media) {
        this.media = media;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setPostEdited(boolean postEdited) {
        this.postEdited = postEdited;
    }

    public void setPostAt(Timestamp postAt) {
        this.postAt = postAt;
    }
}
