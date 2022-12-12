package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "DateInput")
public class DateInput extends Inputs {

	private String description;
	private String defaultValue;

	public DateInput(String name, String title, String description, String defaultValue) {
		super(0, InputType.DATE, name, title);
		this.description = description;
		this.defaultValue = defaultValue;
	}

	public DateInput() {

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
