package hr.fer.tel.server.rest.dto;

import java.util.ArrayList;
import java.util.List;

import hr.fer.tel.server.rest.model.Layout;
import hr.fer.tel.server.rest.model.Scene;
import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.model.View;

public class SceneDTO {

    private long id;

    private String title;

    private String subtitle;

    private LayoutDTO layout;

    private String pictureLink;

    private List<TagDTO> tags = new ArrayList<>();

    private List<View2DTO> views = new ArrayList<>();

    private List<RoleDTO> roles = new ArrayList<>();

    private List<KeyDTO> keys = new ArrayList<>();

	public SceneDTO(long id, String title, String subtitle, LayoutDTO layout, String pictureLink, List<TagDTO> tags,
			List<View2DTO> views, List<RoleDTO> roles, List<KeyDTO> keys) {
		super();
		this.id = id;
		this.title = title;
		this.subtitle = subtitle;
		this.layout = layout;
		this.pictureLink = pictureLink;
		this.tags = tags;
		this.views = views;
		this.roles = roles;
		this.keys = keys;
	}

	public SceneDTO() {
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

	public LayoutDTO getLayout() {
		return layout;
	}

	public void setLayout(LayoutDTO layout) {
		this.layout = layout;
	}

	public String getPictureLink() {
		return pictureLink;
	}

	public void setPictureLink(String pictureLink) {
		this.pictureLink = pictureLink;
	}

	public List<TagDTO> getTags() {
		return tags;
	}

	public void setTags(List<TagDTO> tags) {
		this.tags = tags;
	}

	public List<View2DTO> getViews() {
		return views;
	}

	public void setViews(List<View2DTO> views) {
		this.views = views;
	}

	public List<RoleDTO> getRoles() {
		return roles;
	}

	public void setRoles(List<RoleDTO> roles) {
		this.roles = roles;
	}

	public List<KeyDTO> getKeys() {
		return keys;
	}

	public void setKeys(List<KeyDTO> keys) {
		this.keys = keys;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}
