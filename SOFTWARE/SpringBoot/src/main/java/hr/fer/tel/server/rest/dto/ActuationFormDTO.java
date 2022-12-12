package hr.fer.tel.server.rest.dto;

import hr.fer.tel.server.rest.model.ActuationForm;
import hr.fer.tel.server.rest.model.Inputs;

public class ActuationFormDTO {
	
	private long id;
    
    private RequestDTO defaultValuesRequest;
    
    private RequestDTO submitFormRequest;
        
    private InputsDTO inputs;

	public ActuationFormDTO(long id, RequestDTO defaultValuesRequest, RequestDTO submitFormRequest,
			InputsDTO inputs) {
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

	public InputsDTO getInputs() {
		return inputs;
	}

	public void setInputs(InputsDTO inputs) {
		this.inputs = inputs;
	}
	
	public static ActuationFormDTO of(ActuationForm form) {
		return new ActuationFormDTO(form.getId(), 
				RequestDTO.of(form.getDefaultValuesRequest()), 
				RequestDTO.of(form.getDefaultValuesRequest()),
				InputsDTO.of(form.getInputs()));
	}
    
}
