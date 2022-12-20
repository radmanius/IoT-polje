package hr.fer.tel.server.rest.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import hr.fer.tel.server.rest.model.BooleanInput;
import hr.fer.tel.server.rest.model.DateInput;
import hr.fer.tel.server.rest.model.DecimalInput;
import hr.fer.tel.server.rest.model.InputType;
import hr.fer.tel.server.rest.model.Inputs;
import hr.fer.tel.server.rest.model.IntegerInput;
import hr.fer.tel.server.rest.model.StringInput;
import hr.fer.tel.server.rest.model.SubmitButton;
import hr.fer.tel.server.rest.model.TimeInput;


@JsonTypeInfo(
	      use = JsonTypeInfo.Id.NAME, 
	      include = JsonTypeInfo.As.EXISTING_PROPERTY, 
	      visible = true,
	      property = "inputType")
	    @JsonSubTypes({
	        @JsonSubTypes.Type(value = BooleanInputDTO.class, name = "BOOLEAN"),
	        @JsonSubTypes.Type(value = DateInputDTO.class, name = "DATE"),
	        @JsonSubTypes.Type(value = DecimalInputDTO.class, name = "DECIMAL"),
	        @JsonSubTypes.Type(value = IntegerInputDTO.class, name = "INTEGER"),
	        @JsonSubTypes.Type(value = StringInputDTO.class, name = "STRING"),
	        @JsonSubTypes.Type(value = SubmitButtonDTO.class, name = "SUBMIT"),
	        @JsonSubTypes.Type(value = TimeInputDTO.class, name = "TIME")
	    })
public class InputsDTO {
	private InputType inputType;
	private String name;
	private String title;

	public InputsDTO(InputType inputType, String name, String title) {
		super();
//		this.inputType = inputType;
		this.name = name;
		this.title = title;
	}

	public InputsDTO() {

	}

	public InputType getInputType() {
		return inputType;
	}

	public void setInputType(InputType inputType) {
		this.inputType = inputType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public static InputsDTO of(Inputs inputs) {

		if (inputs instanceof BooleanInput) {

			BooleanInput a = (BooleanInput) inputs;
			BooleanInputDTO input1 = BooleanInputDTO.of(a);
			return input1;

		}
		if (inputs instanceof DateInput) {

			DateInput a = (DateInput) inputs;
			DateInputDTO input1 = DateInputDTO.of(a);
			return input1;

		}
		if (inputs instanceof DecimalInput) {

			DecimalInput a = (DecimalInput) inputs;
			DecimalInputDTO input1 = DecimalInputDTO.of(a);
			return input1;

		}
		if (inputs instanceof IntegerInput) {

			IntegerInput a = (IntegerInput) inputs;
			IntegerInputDTO input1 = IntegerInputDTO.of(a);
			return input1;

		}
		if (inputs instanceof StringInput) {

			StringInput a = (StringInput) inputs;
			StringInputDTO input1 = StringInputDTO.of(a);
			return input1;

		}
		if (inputs instanceof SubmitButton) {

			SubmitButton a = (SubmitButton) inputs;
			SubmitButtonDTO input1 = SubmitButtonDTO.of(a);
			return input1;

		}
		if (inputs instanceof TimeInput) {

			TimeInput a = (TimeInput) inputs;
			TimeInputDTO input1 = TimeInputDTO.of(a);
			return input1;

		}
		
		return null;

	}
}
