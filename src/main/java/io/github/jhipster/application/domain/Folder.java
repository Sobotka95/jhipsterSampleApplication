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
 * A Folder.
 */
@Entity
@Table(name = "folder")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Folder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private FileApp fileApp;

    @ManyToOne
    private Folder folder;

    @OneToMany(mappedBy = "folder")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Folder> folders = new HashSet<>();

    @OneToMany(mappedBy = "folder")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<File> files = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Folder name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public FileApp getFileApp() {
        return fileApp;
    }

    public Folder fileApp(FileApp fileApp) {
        this.fileApp = fileApp;
        return this;
    }

    public void setFileApp(FileApp fileApp) {
        this.fileApp = fileApp;
    }

    public Folder getFolder() {
        return folder;
    }

    public Folder folder(Folder folder) {
        this.folder = folder;
        return this;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }

    public Set<Folder> getFolders() {
        return folders;
    }

    public Folder folders(Set<Folder> folders) {
        this.folders = folders;
        return this;
    }

    public Folder addFolders(Folder folder) {
        this.folders.add(folder);
        folder.setFolder(this);
        return this;
    }

    public Folder removeFolders(Folder folder) {
        this.folders.remove(folder);
        folder.setFolder(null);
        return this;
    }

    public void setFolders(Set<Folder> folders) {
        this.folders = folders;
    }

    public Set<File> getFiles() {
        return files;
    }

    public Folder files(Set<File> files) {
        this.files = files;
        return this;
    }

    public Folder addFiles(File file) {
        this.files.add(file);
        file.setFolder(this);
        return this;
    }

    public Folder removeFiles(File file) {
        this.files.remove(file);
        file.setFolder(null);
        return this;
    }

    public void setFiles(Set<File> files) {
        this.files = files;
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
        Folder folder = (Folder) o;
        if (folder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), folder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Folder{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
