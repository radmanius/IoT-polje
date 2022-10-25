package hr.fer.tel.server.rest.model;

public class ShortScene {

    private String id;
    private String title;
    private String subtitle;
    private String pictureLink;

    public ShortScene() {
    }

    public ShortScene(String id, String title, String subtitle, String pictureLink) {
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
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
