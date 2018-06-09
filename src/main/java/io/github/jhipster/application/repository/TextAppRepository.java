package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TextApp;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TextApp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TextAppRepository extends JpaRepository<TextApp, Long> {

}
