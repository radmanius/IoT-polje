package hr.fer.tel.server.rest.dto;

import java.util.List;

import hr.fer.tel.server.rest.model.Layout;
import hr.fer.tel.server.rest.model.Scene2;
import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.model.View2;

public class Scene2DTO {

    private long id;
    private String title;
    private String subtitle;
    private String pictureLink;
    private Layout layout;
    private List<Tag> tags;
    private List<View2> views;

    public Scene2DTO() {

    }

    public Scene2DTO(long id, String title, String subtitle, String pictureLink, Layout layout, List<Tag> tags,
                    List<View2> views) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.pictureLink = pictureLink;
        this.layout = layout;
        this.tags = tags;
        this.views = views;
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

    public Layout getLayout() {
        return layout;
    }

    public void setLayout(Layout layout) {
        this.layout = layout;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<View2> getViews() {
        return views;
    }

    public void setViews(List<View2> views) {
        this.views = views;
    }

    public static Scene2DTO from(Scene2 scene) {
        return new Scene2DTO(scene.getId(), scene.getTitle(), scene.getSubtitle(), scene.getPictureLink(),
                scene.getLayout(), scene.getTags(), scene.getViews());
    }
}
