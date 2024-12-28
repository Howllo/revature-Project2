package net.revature.project1.repository;

import net.revature.project1.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepo extends JpaRepository<AppUser, Long> {
}
