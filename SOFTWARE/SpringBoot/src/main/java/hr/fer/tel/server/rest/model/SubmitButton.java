package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SubmitButton")
public class SubmitButton extends Inputs{

	public SubmitButton(String name, String title) {
		super(0, InputType.SUBMIT, name, title);
		// TODO Auto-generated constructor stub
	}

	

}
