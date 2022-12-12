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

		RequestDTO req1;
		if (form.getDefaultValuesRequest() == null) {
			req1 = null;
		}
		else {
			req1 = RequestDTO.of(form.getDefaultValuesRequest());
		}

		RequestDTO req2;
		if (form.getSubmitFormRequest() == null) {
			req2 = null;
		}
		else {
			req2 = RequestDTO.of(form.getDefaultValuesRequest());
		}

		return new ActuationFormDTO(form.getId(), req1, req2, InputsDTO.of(form.getInputs()));
	}
    
}
