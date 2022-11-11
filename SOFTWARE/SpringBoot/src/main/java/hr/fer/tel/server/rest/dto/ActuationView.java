package hr.fer.tel.server.rest.dto;

import hr.fer.tel.server.rest.model.ActuationForm;
import hr.fer.tel.server.rest.model.View2;

public class ActuationView extends View2{

	private ActuationForm form;
	
	public ActuationView(ActuationForm form) {
		super();
		this.form = form;
	}
	
	public ActuationView() {
		super();
	}

	public ActuationForm getForm() {
		return form;
	}

	public void setForm(ActuationForm form) {
		this.form = form;
	}
	
	
  
  
}