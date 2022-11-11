package hr.fer.tel.server.rest.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

import hr.fer.tel.server.rest.model.ActuationView;
import hr.fer.tel.server.rest.model.MesurmentView;

@JsonTypeInfo(
	      use = JsonTypeInfo.Id.NAME, 
	      include = As.PROPERTY, 
	      visible = true,
	      property = "viewType")
	    @JsonSubTypes({
	        @JsonSubTypes.Type(value = ActuationViewDTO.class, name = "actuation"),
	        @JsonSubTypes.Type(value = MesurmentViewDTO.class, name = "mesurment"),
	        @JsonSubTypes.Type(value = MesurmentViewDTO.class, name = "single"),
	        @JsonSubTypes.Type(value = MesurmentViewDTO.class, name = "series")

	    })
public class View2DTO {
	
	private long id;
    
    private String title;
    
    private String viewType;
    
	public View2DTO(long id, String title, String viewType) {
		super();
		this.id = id;
		this.title = title;
		this.viewType = viewType;
	}
	
	
	public View2DTO() {
		super();
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

	public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	} 
    
}
    