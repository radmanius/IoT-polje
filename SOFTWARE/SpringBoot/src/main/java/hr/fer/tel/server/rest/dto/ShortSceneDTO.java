package hr.fer.tel.server.rest.dto;
import java.util.ArrayList;
import java.util.List;

import hr.fer.tel.server.rest.model.Layout;
import hr.fer.tel.server.rest.model.Scene;
import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.model.View;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ShortSceneDTO {
	
	long id;
	
	String title;
	
	String subtitle;
	
	List<String> tags;
	
	public ShortSceneDTO(long id, String title, String subtitle, List<String> tags) {
		this.id = id;
		this.title = title;
		this.subtitle = subtitle;
		this.tags = tags;
	}
	
	
	public long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getSubtitle() {
		return subtitle;
	}

	public List<String> getTags() {
		return tags;
	}

	public static ShortSceneDTO of(Scene scene) {
		List<String> tags = scene.getTags().stream().map((tag) -> tag.getName()).toList();
		return new ShortSceneDTO(scene.getId(), scene.getTitle(), scene.getSubtitle(), tags);
	}

}
