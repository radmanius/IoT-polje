package hr.fer.tel.server.rest.dto;
import java.util.ArrayList;
import java.util.List;

import hr.fer.tel.server.rest.model.Layout;
import hr.fer.tel.server.rest.model.Scene;
import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.model.View2;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ShortSceneDTO {
	
	long id;
	
	String title;
	
	String subtitle;
	
	List<TagDTO> tags;
	
	public ShortSceneDTO(long id, String title, String subtitle, List<TagDTO> tags) {
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

	public List<TagDTO> getTags() {
		return tags;
	}

	public static ShortSceneDTO of(Scene scene) {
		return new ShortSceneDTO(scene.getId(), scene.getTitle(), scene.getSubtitle(), TagDTO.of(scene.getTags()));
	}

}
