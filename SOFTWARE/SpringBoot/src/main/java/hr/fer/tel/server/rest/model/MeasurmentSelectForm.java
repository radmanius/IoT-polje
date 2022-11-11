package hr.fer.tel.server.rest.model;

import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import hr.fer.tel.server.rest.dto.MeasurmentSelectFormDTO;
import hr.fer.tel.server.rest.dto.MesurmentViewDTO;


@Entity
@Table(name = "MeasurmentSelectForm")
public class MeasurmentSelectForm {
	
    @Id
    @GeneratedValue
	private long id;
    
    @OneToOne(cascade = CascadeType.ALL)
	private Request submitSelectionRequest;
	
	@Convert(converter = BodyHelperJson.class)
    private Map<String, String> inputs;

	public MeasurmentSelectForm(Request submitSelectionRequest, Map<String, String> inputs) {
		super();
		this.submitSelectionRequest = submitSelectionRequest;
		this.inputs = inputs;
	}

	public MeasurmentSelectForm() {
	}

	public MeasurmentSelectForm(MeasurmentSelectFormDTO dto) {
		this.submitSelectionRequest = new Request(dto.getSubmitSelectionRequest());
		this.inputs = dto.getInputs();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Request getSubmitSelectionRequest() {
		return submitSelectionRequest;
	}

	public void setSubmitSelectionRequest(Request submitSelectionRequest) {
		this.submitSelectionRequest = submitSelectionRequest;
	}

	public Map<String, String> getInputs() {
		return inputs;
	}

	public void setInputs(Map<String, String> inputs) {
		this.inputs = inputs;
	}


}
