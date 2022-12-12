package hr.fer.tel.server.rest.dto;

import hr.fer.tel.server.rest.model.InputType;
import hr.fer.tel.server.rest.model.SubmitButton;

public class SubmitButtonDTO extends InputsDTO {
	
	public SubmitButtonDTO(String name, String title) {
		super(InputType.SUBMIT, name, title);
		// TODO Auto-generated constructor stub
	}

	public SubmitButtonDTO() {

	}
	
	public static SubmitButtonDTO of(SubmitButton input) {
		return new SubmitButtonDTO(input.getName(), input.getTitle());
	}

}
