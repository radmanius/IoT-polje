package hr.fer.tel.server.rest.dto;

import java.util.Map;

import hr.fer.tel.server.rest.model.MeasurmentSelectForm;
import hr.fer.tel.server.rest.model.MesurmentView;

public class MeasurmentSelectFormDTO {
	
	private long id;
    
	private RequestDTO submitSelectionRequest;
	
    private Map<String, String> inputs;

	public MeasurmentSelectFormDTO(RequestDTO submitSelectionRequest, Map<String, String> inputs) {
		super();
		this.submitSelectionRequest = submitSelectionRequest;
		this.inputs = inputs;
	}

	public MeasurmentSelectFormDTO() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public RequestDTO getSubmitSelectionRequest() {
		return submitSelectionRequest;
	}

	public void setSubmitSelectionRequest(RequestDTO submitSelectionRequest) {
		this.submitSelectionRequest = submitSelectionRequest;
	}

	public Map<String, String> getInputs() {
		return inputs;
	}

	public void setInputs(Map<String, String> inputs) {
		this.inputs = inputs;
	}
	
	public static MeasurmentSelectFormDTO of(MeasurmentSelectForm form) {
		return null;
	}


}
