package hr.fer.tel.server.rest.model;

import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import hr.fer.tel.server.rest.dto.ActuationFormDTO;

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
        
	@Convert(converter = BodyHelperJson.class)
    private Map<String, String> inputs;

	public ActuationForm(Request defaultValuesRequest, Request submitFormRequest, Map<String, String> inputs) {
		this.defaultValuesRequest = defaultValuesRequest;
		this.submitFormRequest = submitFormRequest;
		this.inputs = inputs;
	}

	public ActuationForm() {
	}
	
	public ActuationForm(ActuationFormDTO dto) {
		this.defaultValuesRequest = new Request(dto.getDefaultValuesRequest());
		this.submitFormRequest = new Request(dto.getSubmitFormRequest());
		this.inputs = dto.getInputs();
		
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

	public Map<String, String> getInputs() {
		return inputs;
	}

	public void setInputs(Map<String, String> inputs) {
		this.inputs = inputs;
	}
	
	

}
