package hr.fer.tel.server.rest.dto;

import java.util.List;

import hr.fer.tel.server.rest.model.Layout;
import hr.fer.tel.server.rest.model.Scene;
import hr.fer.tel.server.rest.model.View;

public class SceneDTO {

	private long id;
	private String title;
	private String subtitle;
	private String pictureLink;
	private Layout layout;
	private List<String> tags;
	private List<View> views;

	public SceneDTO() {
		
	}

	public SceneDTO(long id, String title, String subtitle, String pictureLink, Layout layout, List<String> tags,
			List<View> views) {
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

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public List<View> getViews() {
		return views;
	}

	public void setViews(List<View> views) {
		this.views = views;
	}

	public static SceneDTO from(Scene scene) {
		return new SceneDTO(scene.getId(), scene.getTitle(), scene.getSubtitle(), scene.getPictureLink(),
				scene.getLayout(), scene.getTags(), scene.getViews());
	}
}
