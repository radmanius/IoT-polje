package hr.fer.tel.server.rest.dto;

import hr.fer.tel.server.rest.model.BooleanInput;
import hr.fer.tel.server.rest.model.InputType;

public class BooleanInputDTO extends InputsDTO{

	private String description;
	private boolean defaultValue;

	public BooleanInputDTO(String name, String title, String description, boolean defaultValue) {
		super(InputType.BOOLEAN, name, title);
		this.description = description;
		this.defaultValue = defaultValue;
	}

	public BooleanInputDTO() {
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(boolean defaultValue) {
		this.defaultValue = defaultValue;
	}
	
	public static BooleanInputDTO of(BooleanInput input) {
		return new BooleanInputDTO(input.getName(), input.getTitle(), input.getDescription(), input.isDefaultValue());
	}

}
