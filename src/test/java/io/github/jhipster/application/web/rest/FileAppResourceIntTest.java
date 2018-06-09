package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.FileApp;
import io.github.jhipster.application.repository.FileAppRepository;
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
 * Test class for the FileAppResource REST controller.
 *
 * @see FileAppResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class FileAppResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private FileAppRepository fileAppRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFileAppMockMvc;

    private FileApp fileApp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FileAppResource fileAppResource = new FileAppResource(fileAppRepository);
        this.restFileAppMockMvc = MockMvcBuilders.standaloneSetup(fileAppResource)
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
    public static FileApp createEntity(EntityManager em) {
        FileApp fileApp = new FileApp()
            .title(DEFAULT_TITLE);
        return fileApp;
    }

    @Before
    public void initTest() {
        fileApp = createEntity(em);
    }

    @Test
    @Transactional
    public void createFileApp() throws Exception {
        int databaseSizeBeforeCreate = fileAppRepository.findAll().size();

        // Create the FileApp
        restFileAppMockMvc.perform(post("/api/file-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileApp)))
            .andExpect(status().isCreated());

        // Validate the FileApp in the database
        List<FileApp> fileAppList = fileAppRepository.findAll();
        assertThat(fileAppList).hasSize(databaseSizeBeforeCreate + 1);
        FileApp testFileApp = fileAppList.get(fileAppList.size() - 1);
        assertThat(testFileApp.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createFileAppWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fileAppRepository.findAll().size();

        // Create the FileApp with an existing ID
        fileApp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFileAppMockMvc.perform(post("/api/file-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileApp)))
            .andExpect(status().isBadRequest());

        // Validate the FileApp in the database
        List<FileApp> fileAppList = fileAppRepository.findAll();
        assertThat(fileAppList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFileApps() throws Exception {
        // Initialize the database
        fileAppRepository.saveAndFlush(fileApp);

        // Get all the fileAppList
        restFileAppMockMvc.perform(get("/api/file-apps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fileApp.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getFileApp() throws Exception {
        // Initialize the database
        fileAppRepository.saveAndFlush(fileApp);

        // Get the fileApp
        restFileAppMockMvc.perform(get("/api/file-apps/{id}", fileApp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fileApp.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFileApp() throws Exception {
        // Get the fileApp
        restFileAppMockMvc.perform(get("/api/file-apps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFileApp() throws Exception {
        // Initialize the database
        fileAppRepository.saveAndFlush(fileApp);
        int databaseSizeBeforeUpdate = fileAppRepository.findAll().size();

        // Update the fileApp
        FileApp updatedFileApp = fileAppRepository.findOne(fileApp.getId());
        // Disconnect from session so that the updates on updatedFileApp are not directly saved in db
        em.detach(updatedFileApp);
        updatedFileApp
            .title(UPDATED_TITLE);

        restFileAppMockMvc.perform(put("/api/file-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFileApp)))
            .andExpect(status().isOk());

        // Validate the FileApp in the database
        List<FileApp> fileAppList = fileAppRepository.findAll();
        assertThat(fileAppList).hasSize(databaseSizeBeforeUpdate);
        FileApp testFileApp = fileAppList.get(fileAppList.size() - 1);
        assertThat(testFileApp.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingFileApp() throws Exception {
        int databaseSizeBeforeUpdate = fileAppRepository.findAll().size();

        // Create the FileApp

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFileAppMockMvc.perform(put("/api/file-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileApp)))
            .andExpect(status().isCreated());

        // Validate the FileApp in the database
        List<FileApp> fileAppList = fileAppRepository.findAll();
        assertThat(fileAppList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFileApp() throws Exception {
        // Initialize the database
        fileAppRepository.saveAndFlush(fileApp);
        int databaseSizeBeforeDelete = fileAppRepository.findAll().size();

        // Get the fileApp
        restFileAppMockMvc.perform(delete("/api/file-apps/{id}", fileApp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FileApp> fileAppList = fileAppRepository.findAll();
        assertThat(fileAppList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FileApp.class);
        FileApp fileApp1 = new FileApp();
        fileApp1.setId(1L);
        FileApp fileApp2 = new FileApp();
        fileApp2.setId(fileApp1.getId());
        assertThat(fileApp1).isEqualTo(fileApp2);
        fileApp2.setId(2L);
        assertThat(fileApp1).isNotEqualTo(fileApp2);
        fileApp1.setId(null);
        assertThat(fileApp1).isNotEqualTo(fileApp2);
    }
}
