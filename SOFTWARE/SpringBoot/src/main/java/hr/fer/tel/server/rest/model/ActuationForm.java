package hr.fer.tel.server.rest.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ActuationForm")
public class ActuationForm {
	
    @Id
    @GeneratedValue
	private long id;
    
    @OneToOne(cascade = CascadeType.ALL)
    private Request defaultValuesRequest;
    
    @OneToOne(cascade = CascadeType.ALL)
    private Request submitFormRequest;
    
    @OneToOne(cascade = CascadeType.ALL)
	private BodyHelper inputs;

	public ActuationForm(Request defaultValuesRequest, Request submitFormRequest, BodyHelper inputs) {
		this.defaultValuesRequest = defaultValuesRequest;
		this.submitFormRequest = submitFormRequest;
		this.inputs = inputs;
	}

	public ActuationForm() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Request getDefaultValuesRequest() {
		return defaultValuesRequest;
	}

	public void setDefaultValuesRequest(Request defaultValuesRequest) {
		this.defaultValuesRequest = defaultValuesRequest;
	}

	public Request getSubmitFormRequest() {
		return submitFormRequest;
	}

	public void setSubmitFormRequest(Request submitFormRequest) {
		this.submitFormRequest = submitFormRequest;
	}

	public BodyHelper getInputs() {
		return inputs;
	}

	public void setInputs(BodyHelper inputs) {
		this.inputs = inputs;
	}
	
	

}
