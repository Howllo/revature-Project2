package net.revature.project1.repository;

import net.revature.project1.dto.PostResponseDto;
import net.revature.project1.dto.PostSmallResponseDto;
import net.revature.project1.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    @Query("SELECT new net.revature.project1.dto.PostSmallResponseDto(" +
            "p.id, " +
            "CASE WHEN p.postParent.id IS NULL THEN NULL ELSE p.postParent.id END, " +
            "p.user.username, " +
            "p.user.displayName, " +
            "p.media, " +
            "p.postEdited, " +
            "p.postAt) " +
            "FROM Post p WHERE p.id = :id")
    Optional<PostSmallResponseDto> getUserPost(@Param("id") Long id);

    @Query("SELECT p FROM Post p " +
            "WHERE p.user IN (SELECT f FROM AppUser u JOIN u.following f WHERE u.id = :userId) " +
            "AND p.id < :lastPostId " +
            "ORDER BY p.postAt DESC")
    List<Post> getFollowingPostsChunk(
            @Param("userId") Long userId,
            @Param("lastPostId") Long lastPostId,
            @Param("chunkSize") int chunkSize);

    @Query("SELECT COUNT(p) FROM Post p WHERE p.postParent.id = :postId")
    Long getPostCommentNumber(@Param("postId") Long postId);

    @Query("SELECT p.id, COUNT(c.id) " +
            "FROM Post p LEFT JOIN Post c ON c.postParent.id = p.id " +
            "WHERE p.id IN :postIds " +
            "GROUP BY p.id")
    List<Object[]> fetchCommentCounts(@Param("postIds") List<Long> postIds);

    List<Post> findByPostParentIdOrderByPostAtDesc(Long parentId);
}
