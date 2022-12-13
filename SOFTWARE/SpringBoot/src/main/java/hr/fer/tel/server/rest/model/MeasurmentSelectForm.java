package hr.fer.tel.server.rest.model;

import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import hr.fer.tel.server.rest.dto.BooleanInputDTO;
import hr.fer.tel.server.rest.dto.DateInputDTO;
import hr.fer.tel.server.rest.dto.DecimalInputDTO;
import hr.fer.tel.server.rest.dto.IntegerInputDTO;
import hr.fer.tel.server.rest.dto.MeasurmentSelectFormDTO;
import hr.fer.tel.server.rest.dto.MesurmentViewDTO;
import hr.fer.tel.server.rest.dto.StringInputDTO;
import hr.fer.tel.server.rest.dto.SubmitButtonDTO;
import hr.fer.tel.server.rest.dto.TimeInputDTO;


@Entity
@Table(name = "MeasurmentSelectForm")
public class MeasurmentSelectForm {
	
    @Id
    @GeneratedValue
	private long id;
    
    @OneToOne(cascade = CascadeType.ALL)
	private Request submitSelectionRequest;
	
//	@Convert(converter = BodyHelperJson.class)
//    private Map<String, String> inputs;
	
	@OneToOne(cascade = CascadeType.ALL)
    private Inputs inputs;

	public MeasurmentSelectForm(Request submitSelectionRequest, Inputs inputs) {
		super();
		this.submitSelectionRequest = submitSelectionRequest;
		this.inputs = inputs;
	}
	
//	public MeasurmentSelectForm(Request submitSelectionRequest, Inputs inputs) {
//		super();
//		this.submitSelectionRequest = submitSelectionRequest;
//		this.inputs = inputs;
//	}

	public MeasurmentSelectForm() {
	}

	public MeasurmentSelectForm(MeasurmentSelectFormDTO dto) {
		this.submitSelectionRequest = new Request(dto.getSubmitSelectionRequest());
		//this.inputs = new Inputs(dto.getInputs());
		
		if (dto.getInputs() instanceof BooleanInputDTO) {
			BooleanInputDTO a = (BooleanInputDTO)dto.getInputs();
			this.inputs = new BooleanInput(a);
		}
		
		if (dto.getInputs() instanceof DateInputDTO) {
			DateInputDTO a = (DateInputDTO)dto.getInputs();
			this.inputs = new DateInput(a);
		}
		
		if (dto.getInputs() instanceof DecimalInputDTO) {
			DecimalInputDTO a = (DecimalInputDTO)dto.getInputs();
			this.inputs = new DecimalInput(a);
		}
		
		if (dto.getInputs() instanceof IntegerInputDTO) {
			IntegerInputDTO a = (IntegerInputDTO)dto.getInputs();
			this.inputs = new IntegerInput(a);
		}
		
		if (dto.getInputs() instanceof StringInputDTO) {
			StringInputDTO a = (StringInputDTO)dto.getInputs();
			this.inputs = new StringInput(a);
		}
		
		if (dto.getInputs() instanceof SubmitButtonDTO) {
			SubmitButtonDTO a = (SubmitButtonDTO)dto.getInputs();
			this.inputs = new SubmitButton(a);
		}
		
		if (dto.getInputs() instanceof TimeInputDTO) {
			TimeInputDTO a = (TimeInputDTO)dto.getInputs();
			this.inputs = new TimeInput(a);
		}
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

	public Inputs getInputs() {
		return inputs;
	}

	public void setInputs(Inputs inputs) {
		this.inputs = inputs;
	}

//	public Map<String, String> getInputs() {
//		return inputs;
//	}
//
//	public void setInputs(Map<String, String> inputs) {
//		this.inputs = inputs;
//	}

	

}
