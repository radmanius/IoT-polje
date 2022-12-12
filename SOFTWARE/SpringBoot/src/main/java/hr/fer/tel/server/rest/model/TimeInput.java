package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TimeInput")
public class TimeInput extends Inputs {

	private String description;
	private String defaultValue;

	public TimeInput(String name, String title, String description, String defaultValue) {
		super(0, InputType.TIME, name, title);
		this.description = description;
		this.defaultValue = defaultValue;
	}

	public TimeInput() {

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

}
