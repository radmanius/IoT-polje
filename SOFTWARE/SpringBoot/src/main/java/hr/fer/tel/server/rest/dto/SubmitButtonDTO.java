package hr.fer.tel.server.rest.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;

import hr.fer.tel.server.rest.model.InputType;
import hr.fer.tel.server.rest.model.SubmitButton;

@JsonTypeName("SUBMIT")
public class SubmitButtonDTO extends InputsDTO {
	
	public SubmitButtonDTO(String name, String title) {
		super(InputType.SUBMIT, name, title);
	}

	public SubmitButtonDTO() {

	}
	
	public static SubmitButtonDTO of(SubmitButton input) {
		return new SubmitButtonDTO(input.getName(), input.getTitle());
	}

}
