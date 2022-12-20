package hr.fer.tel.server.rest.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import hr.fer.tel.server.rest.dto.ActuationFormDTO;
import hr.fer.tel.server.rest.dto.BooleanInputDTO;
import hr.fer.tel.server.rest.dto.DateInputDTO;
import hr.fer.tel.server.rest.dto.DecimalInputDTO;
import hr.fer.tel.server.rest.dto.IntegerInputDTO;
import hr.fer.tel.server.rest.dto.StringInputDTO;
import hr.fer.tel.server.rest.dto.SubmitButtonDTO;
import hr.fer.tel.server.rest.dto.TimeInputDTO;

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
        
//	@Convert(converter = BodyHelperJson.class)
//    private Map<String, String> inputs;
    
    @OneToOne(cascade = CascadeType.ALL)
    private Inputs inputs;
	
	public ActuationForm(Request defaultValuesRequest, Request submitFormRequest, Inputs inputs) {
		this.defaultValuesRequest = defaultValuesRequest;
		this.submitFormRequest = submitFormRequest;
		this.inputs = inputs;
	}

	public ActuationForm() {
	}
	
	public ActuationForm(ActuationFormDTO dto) {
		this.defaultValuesRequest = new Request(dto.getDefaultValuesRequest());
		this.submitFormRequest = new Request(dto.getSubmitFormRequest());
		
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

	public Inputs getInputs() {
		return inputs;
	}

	public void setInputs(Inputs inputs) {
		this.inputs = inputs;
	}
	
	

}
