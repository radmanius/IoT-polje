package hr.fer.tel.server.rest.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;

import hr.fer.tel.server.rest.model.InputType;
import hr.fer.tel.server.rest.model.StringInput;

@JsonTypeName("STRING")
public class StringInputDTO extends InputsDTO {

	private String description;
	private String defaultValue;
	private String pattern;

	public StringInputDTO(String name, String title, String description, String defaultValue, String pattern) {
		super(InputType.STRING, name, title);
		this.description = description;
		this.defaultValue = defaultValue;
		this.pattern = pattern;
	}

	public StringInputDTO() {

	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}
	
	public static StringInputDTO of(StringInput input) {
		return new StringInputDTO(input.getName(), input.getTitle(), input.getDescription(), input.getDefaultValue(), input.getPattern());
	}

}
