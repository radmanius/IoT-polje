package hr.fer.tel.server.rest.dto;

import java.util.List;

import hr.fer.tel.server.rest.model.Tag;

public class TagDTO {
	    
    private String name;

	public TagDTO(long id, String name) {
		super();
		this.name = name;
	}
	
	public TagDTO(String name) {
		super();
		this.name = name;
	}

	public TagDTO() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public static List<TagDTO> of(List<Tag> tags) {
		return tags.stream().map(tag -> TagDTO.of(tag)).toList();
	}
	
	public static TagDTO of(Tag tag) {
		return new TagDTO(tag.getName());
	}
    
    

}
