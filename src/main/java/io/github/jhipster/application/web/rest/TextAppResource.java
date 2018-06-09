package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.TextApp;

import io.github.jhipster.application.repository.TextAppRepository;
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
 * REST controller for managing TextApp.
 */
@RestController
@RequestMapping("/api")
public class TextAppResource {

    private final Logger log = LoggerFactory.getLogger(TextAppResource.class);

    private static final String ENTITY_NAME = "textApp";

    private final TextAppRepository textAppRepository;

    public TextAppResource(TextAppRepository textAppRepository) {
        this.textAppRepository = textAppRepository;
    }

    /**
     * POST  /text-apps : Create a new textApp.
     *
     * @param textApp the textApp to create
     * @return the ResponseEntity with status 201 (Created) and with body the new textApp, or with status 400 (Bad Request) if the textApp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/text-apps")
    @Timed
    public ResponseEntity<TextApp> createTextApp(@RequestBody TextApp textApp) throws URISyntaxException {
        log.debug("REST request to save TextApp : {}", textApp);
        if (textApp.getId() != null) {
            throw new BadRequestAlertException("A new textApp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TextApp result = textAppRepository.save(textApp);
        return ResponseEntity.created(new URI("/api/text-apps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /text-apps : Updates an existing textApp.
     *
     * @param textApp the textApp to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated textApp,
     * or with status 400 (Bad Request) if the textApp is not valid,
     * or with status 500 (Internal Server Error) if the textApp couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/text-apps")
    @Timed
    public ResponseEntity<TextApp> updateTextApp(@RequestBody TextApp textApp) throws URISyntaxException {
        log.debug("REST request to update TextApp : {}", textApp);
        if (textApp.getId() == null) {
            return createTextApp(textApp);
        }
        TextApp result = textAppRepository.save(textApp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, textApp.getId().toString()))
            .body(result);
    }

    /**
     * GET  /text-apps : get all the textApps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of textApps in body
     */
    @GetMapping("/text-apps")
    @Timed
    public List<TextApp> getAllTextApps() {
        log.debug("REST request to get all TextApps");
        return textAppRepository.findAll();
        }

    /**
     * GET  /text-apps/:id : get the "id" textApp.
     *
     * @param id the id of the textApp to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the textApp, or with status 404 (Not Found)
     */
    @GetMapping("/text-apps/{id}")
    @Timed
    public ResponseEntity<TextApp> getTextApp(@PathVariable Long id) {
        log.debug("REST request to get TextApp : {}", id);
        TextApp textApp = textAppRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(textApp));
    }

    /**
     * DELETE  /text-apps/:id : delete the "id" textApp.
     *
     * @param id the id of the textApp to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/text-apps/{id}")
    @Timed
    public ResponseEntity<Void> deleteTextApp(@PathVariable Long id) {
        log.debug("REST request to delete TextApp : {}", id);
        textAppRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
