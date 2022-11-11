package hr.fer.tel.server.rest.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("actuation")
public class ActuationViewDTO extends View2DTO{

	private ActuationFormDTO form;
	
	public ActuationViewDTO(ActuationFormDTO form) {
		super();
		this.form = form;
	}
	
	public ActuationViewDTO() {
		super();
	}

	public ActuationFormDTO getForm() {
		return form;
	}

	public void setForm(ActuationFormDTO form) {
		this.form = form;
	}
	
	
  
  
}