package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.News;

import io.github.jhipster.application.repository.NewsRepository;
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
 * REST controller for managing News.
 */
@RestController
@RequestMapping("/api")
public class NewsResource {

    private final Logger log = LoggerFactory.getLogger(NewsResource.class);

    private static final String ENTITY_NAME = "news";

    private final NewsRepository newsRepository;

    public NewsResource(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    /**
     * POST  /news : Create a new news.
     *
     * @param news the news to create
     * @return the ResponseEntity with status 201 (Created) and with body the new news, or with status 400 (Bad Request) if the news has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/news")
    @Timed
    public ResponseEntity<News> createNews(@RequestBody News news) throws URISyntaxException {
        log.debug("REST request to save News : {}", news);
        if (news.getId() != null) {
            throw new BadRequestAlertException("A new news cannot already have an ID", ENTITY_NAME, "idexists");
        }
        News result = newsRepository.save(news);
        return ResponseEntity.created(new URI("/api/news/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /news : Updates an existing news.
     *
     * @param news the news to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated news,
     * or with status 400 (Bad Request) if the news is not valid,
     * or with status 500 (Internal Server Error) if the news couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/news")
    @Timed
    public ResponseEntity<News> updateNews(@RequestBody News news) throws URISyntaxException {
        log.debug("REST request to update News : {}", news);
        if (news.getId() == null) {
            return createNews(news);
        }
        News result = newsRepository.save(news);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, news.getId().toString()))
            .body(result);
    }

    /**
     * GET  /news : get all the news.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of news in body
     */
    @GetMapping("/news")
    @Timed
    public List<News> getAllNews() {
        log.debug("REST request to get all News");
        return newsRepository.findAll();
        }

    /**
     * GET  /news/:id : get the "id" news.
     *
     * @param id the id of the news to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the news, or with status 404 (Not Found)
     */
    @GetMapping("/news/{id}")
    @Timed
    public ResponseEntity<News> getNews(@PathVariable Long id) {
        log.debug("REST request to get News : {}", id);
        News news = newsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(news));
    }

    /**
     * DELETE  /news/:id : delete the "id" news.
     *
     * @param id the id of the news to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/news/{id}")
    @Timed
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        log.debug("REST request to delete News : {}", id);
        newsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
