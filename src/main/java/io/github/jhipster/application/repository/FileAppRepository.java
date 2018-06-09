package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.FileApp;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FileApp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FileAppRepository extends JpaRepository<FileApp, Long> {

}
