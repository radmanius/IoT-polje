package hr.fer.tel.server.rest.dto;

import hr.fer.tel.server.rest.model.MeasurmentSelectForm;


public class MeasurmentSelectFormDTO {
	    
	private RequestDTO submitSelectionRequest;
	
    private InputsDTO inputs;

	public MeasurmentSelectFormDTO(RequestDTO submitSelectionRequest, InputsDTO inputs) {
		super();
		this.submitSelectionRequest = submitSelectionRequest;
		this.inputs = inputs;
	}

	public MeasurmentSelectFormDTO() {
	}

	public RequestDTO getSubmitSelectionRequest() {
		return submitSelectionRequest;
	}

	public void setSubmitSelectionRequest(RequestDTO submitSelectionRequest) {
		this.submitSelectionRequest = submitSelectionRequest;
	}

	public InputsDTO getInputs() {
		return inputs;
	}

	public void setInputs(InputsDTO inputs) {
		this.inputs = inputs;
	}
	
	public static MeasurmentSelectFormDTO of(MeasurmentSelectForm form) {
		RequestDTO req;

		if (form.getSubmitSelectionRequest() == null) {
			req = null;
		}
		else {
			req = RequestDTO.of(form.getSubmitSelectionRequest());
		}

		return new MeasurmentSelectFormDTO(req, InputsDTO.of(form.getInputs()));
	}


}
