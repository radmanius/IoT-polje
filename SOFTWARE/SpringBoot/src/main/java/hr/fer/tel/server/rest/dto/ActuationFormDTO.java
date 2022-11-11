package hr.fer.tel.server.rest.dto;

import java.util.Map;

public class ActuationFormDTO {
	
	private long id;
    
    private RequestDTO defaultValuesRequest;
    
    private RequestDTO submitFormRequest;
        
    private Map<String, String> inputs;

	public ActuationFormDTO(long id, RequestDTO defaultValuesRequest, RequestDTO submitFormRequest,
			Map<String, String> inputs) {
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

	public Map<String, String> getInputs() {
		return inputs;
	}

	public void setInputs(Map<String, String> inputs) {
		this.inputs = inputs;
	}
    
}
