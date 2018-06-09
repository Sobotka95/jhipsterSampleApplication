package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.TextApp;
import io.github.jhipster.application.repository.TextAppRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TextAppResource REST controller.
 *
 * @see TextAppResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class TextAppResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private TextAppRepository textAppRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTextAppMockMvc;

    private TextApp textApp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TextAppResource textAppResource = new TextAppResource(textAppRepository);
        this.restTextAppMockMvc = MockMvcBuilders.standaloneSetup(textAppResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TextApp createEntity(EntityManager em) {
        TextApp textApp = new TextApp()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT);
        return textApp;
    }

    @Before
    public void initTest() {
        textApp = createEntity(em);
    }

    @Test
    @Transactional
    public void createTextApp() throws Exception {
        int databaseSizeBeforeCreate = textAppRepository.findAll().size();

        // Create the TextApp
        restTextAppMockMvc.perform(post("/api/text-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textApp)))
            .andExpect(status().isCreated());

        // Validate the TextApp in the database
        List<TextApp> textAppList = textAppRepository.findAll();
        assertThat(textAppList).hasSize(databaseSizeBeforeCreate + 1);
        TextApp testTextApp = textAppList.get(textAppList.size() - 1);
        assertThat(testTextApp.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testTextApp.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createTextAppWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = textAppRepository.findAll().size();

        // Create the TextApp with an existing ID
        textApp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTextAppMockMvc.perform(post("/api/text-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textApp)))
            .andExpect(status().isBadRequest());

        // Validate the TextApp in the database
        List<TextApp> textAppList = textAppRepository.findAll();
        assertThat(textAppList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTextApps() throws Exception {
        // Initialize the database
        textAppRepository.saveAndFlush(textApp);

        // Get all the textAppList
        restTextAppMockMvc.perform(get("/api/text-apps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(textApp.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getTextApp() throws Exception {
        // Initialize the database
        textAppRepository.saveAndFlush(textApp);

        // Get the textApp
        restTextAppMockMvc.perform(get("/api/text-apps/{id}", textApp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(textApp.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTextApp() throws Exception {
        // Get the textApp
        restTextAppMockMvc.perform(get("/api/text-apps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTextApp() throws Exception {
        // Initialize the database
        textAppRepository.saveAndFlush(textApp);
        int databaseSizeBeforeUpdate = textAppRepository.findAll().size();

        // Update the textApp
        TextApp updatedTextApp = textAppRepository.findOne(textApp.getId());
        // Disconnect from session so that the updates on updatedTextApp are not directly saved in db
        em.detach(updatedTextApp);
        updatedTextApp
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT);

        restTextAppMockMvc.perform(put("/api/text-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTextApp)))
            .andExpect(status().isOk());

        // Validate the TextApp in the database
        List<TextApp> textAppList = textAppRepository.findAll();
        assertThat(textAppList).hasSize(databaseSizeBeforeUpdate);
        TextApp testTextApp = textAppList.get(textAppList.size() - 1);
        assertThat(testTextApp.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTextApp.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingTextApp() throws Exception {
        int databaseSizeBeforeUpdate = textAppRepository.findAll().size();

        // Create the TextApp

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTextAppMockMvc.perform(put("/api/text-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textApp)))
            .andExpect(status().isCreated());

        // Validate the TextApp in the database
        List<TextApp> textAppList = textAppRepository.findAll();
        assertThat(textAppList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTextApp() throws Exception {
        // Initialize the database
        textAppRepository.saveAndFlush(textApp);
        int databaseSizeBeforeDelete = textAppRepository.findAll().size();

        // Get the textApp
        restTextAppMockMvc.perform(delete("/api/text-apps/{id}", textApp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TextApp> textAppList = textAppRepository.findAll();
        assertThat(textAppList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TextApp.class);
        TextApp textApp1 = new TextApp();
        textApp1.setId(1L);
        TextApp textApp2 = new TextApp();
        textApp2.setId(textApp1.getId());
        assertThat(textApp1).isEqualTo(textApp2);
        textApp2.setId(2L);
        assertThat(textApp1).isNotEqualTo(textApp2);
        textApp1.setId(null);
        assertThat(textApp1).isNotEqualTo(textApp2);
    }
}
