package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;

import javax.persistence.*;

import hr.fer.tel.server.rest.dto.SceneDTO;

@Entity
@Table(name = "ShortScene")
public class ShortScene {

    @Id
    @GeneratedValue
    private long id;
    private String title;
    private String subtitle;
    private String pictureLink;

    public ShortScene() {
    }

    public ShortScene(long id, String title, String subtitle, String pictureLink) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.pictureLink = pictureLink;
    }

    public String getPictureLink() {
        return pictureLink;
    }

    public void setPictureLink(String pictureLink) {
        this.pictureLink = pictureLink;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public static ShortScene from(SceneDTO s) {
      return new ShortScene(s.getId(), s.getTitle(), s.getSubtitle(), s.getPictureLink());
    }
}
