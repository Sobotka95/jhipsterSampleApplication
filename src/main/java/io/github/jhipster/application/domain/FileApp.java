package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A FileApp.
 */
@Entity
@Table(name = "file_app")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FileApp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @OneToMany(mappedBy = "fileApp")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Folder> folders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public FileApp title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Folder> getFolders() {
        return folders;
    }

    public FileApp folders(Set<Folder> folders) {
        this.folders = folders;
        return this;
    }

    public FileApp addFolders(Folder folder) {
        this.folders.add(folder);
        folder.setFileApp(this);
        return this;
    }

    public FileApp removeFolders(Folder folder) {
        this.folders.remove(folder);
        folder.setFileApp(null);
        return this;
    }

    public void setFolders(Set<Folder> folders) {
        this.folders = folders;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        FileApp fileApp = (FileApp) o;
        if (fileApp.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fileApp.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FileApp{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
