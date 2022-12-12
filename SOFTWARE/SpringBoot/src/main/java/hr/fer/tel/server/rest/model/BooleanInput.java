package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "BooleanInput")
public class BooleanInput extends Inputs {

	private String description;
	private boolean defaultValue;

	public BooleanInput(String name, String title, String description, boolean defaultValue) {
		super(0, InputType.BOOLEAN, name, title);
		this.description = description;
		this.defaultValue = defaultValue;
	}

	public BooleanInput() {
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

}
