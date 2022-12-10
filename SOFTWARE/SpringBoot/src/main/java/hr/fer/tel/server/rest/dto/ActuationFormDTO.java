package hr.fer.tel.server.rest.dto;

import hr.fer.tel.server.rest.model.ActuationForm;
import hr.fer.tel.server.rest.model.Inputs;

public class ActuationFormDTO {
	
	private long id;
    
    private RequestDTO defaultValuesRequest;
    
    private RequestDTO submitFormRequest;
        
    private Inputs inputs;

	public ActuationFormDTO(long id, RequestDTO defaultValuesRequest, RequestDTO submitFormRequest,
			Inputs inputs) {
		super();
		this.id = id;
		this.defaultValuesRequest = defaultValuesRequest;
		this.submitFormRequest = submitFormRequest;
		this.inputs = inputs;
	}

	public ActuationFormDTO() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public RequestDTO getDefaultValuesRequest() {
		return defaultValuesRequest;
	}

	public void setDefaultValuesRequest(RequestDTO defaultValuesRequest) {
		this.defaultValuesRequest = defaultValuesRequest;
	}

	public RequestDTO getSubmitFormRequest() {
		return submitFormRequest;
	}

	public void setSubmitFormRequest(RequestDTO submitFormRequest) {
		this.submitFormRequest = submitFormRequest;
	}

	public Inputs getInputs() {
		return inputs;
	}

	public void setInputs(Inputs inputs) {
		this.inputs = inputs;
	}
	
	public static ActuationFormDTO of(ActuationForm form) {
		return new ActuationFormDTO(form.getId(), 
				RequestDTO.of(form.getDefaultValuesRequest()), 
				RequestDTO.of(form.getDefaultValuesRequest()),
				null);
	}
    
}
