package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.FileApp;

import io.github.jhipster.application.repository.FileAppRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FileApp.
 */
@RestController
@RequestMapping("/api")
public class FileAppResource {

    private final Logger log = LoggerFactory.getLogger(FileAppResource.class);

    private static final String ENTITY_NAME = "fileApp";

    private final FileAppRepository fileAppRepository;

    public FileAppResource(FileAppRepository fileAppRepository) {
        this.fileAppRepository = fileAppRepository;
    }

    /**
     * POST  /file-apps : Create a new fileApp.
     *
     * @param fileApp the fileApp to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fileApp, or with status 400 (Bad Request) if the fileApp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/file-apps")
    @Timed
    public ResponseEntity<FileApp> createFileApp(@RequestBody FileApp fileApp) throws URISyntaxException {
        log.debug("REST request to save FileApp : {}", fileApp);
        if (fileApp.getId() != null) {
            throw new BadRequestAlertException("A new fileApp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FileApp result = fileAppRepository.save(fileApp);
        return ResponseEntity.created(new URI("/api/file-apps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /file-apps : Updates an existing fileApp.
     *
     * @param fileApp the fileApp to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fileApp,
     * or with status 400 (Bad Request) if the fileApp is not valid,
     * or with status 500 (Internal Server Error) if the fileApp couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/file-apps")
    @Timed
    public ResponseEntity<FileApp> updateFileApp(@RequestBody FileApp fileApp) throws URISyntaxException {
        log.debug("REST request to update FileApp : {}", fileApp);
        if (fileApp.getId() == null) {
            return createFileApp(fileApp);
        }
        FileApp result = fileAppRepository.save(fileApp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fileApp.getId().toString()))
            .body(result);
    }

    /**
     * GET  /file-apps : get all the fileApps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fileApps in body
     */
    @GetMapping("/file-apps")
    @Timed
    public List<FileApp> getAllFileApps() {
        log.debug("REST request to get all FileApps");
        return fileAppRepository.findAll();
        }

    /**
     * GET  /file-apps/:id : get the "id" fileApp.
     *
     * @param id the id of the fileApp to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fileApp, or with status 404 (Not Found)
     */
    @GetMapping("/file-apps/{id}")
    @Timed
    public ResponseEntity<FileApp> getFileApp(@PathVariable Long id) {
        log.debug("REST request to get FileApp : {}", id);
        FileApp fileApp = fileAppRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fileApp));
    }

    /**
     * DELETE  /file-apps/:id : delete the "id" fileApp.
     *
     * @param id the id of the fileApp to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/file-apps/{id}")
    @Timed
    public ResponseEntity<Void> deleteFileApp(@PathVariable Long id) {
        log.debug("REST request to delete FileApp : {}", id);
        fileAppRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
