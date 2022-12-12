package hr.fer.tel.server.rest.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

import hr.fer.tel.server.rest.model.ActuationView;
import hr.fer.tel.server.rest.model.MesurmentView;
import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.model.View;

import java.util.List;

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
public class ViewDTO {

    private String title;
    
    private String viewType;
    
	public ViewDTO(String title, String viewType) {
		super();
		this.title = title;
		this.viewType = viewType;
	}
	
	
	public ViewDTO() {
		super();
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

	public static List<ViewDTO> of(List<View> views) {
		return views.stream().map(view -> ViewDTO.of(view)).toList();
	}

	public static ViewDTO of(View view) {
		return new ViewDTO(view.getTitle(), view.getViewType());
	}
    
}
    