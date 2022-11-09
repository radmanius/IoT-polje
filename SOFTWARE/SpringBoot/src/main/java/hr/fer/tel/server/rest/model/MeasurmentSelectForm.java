package hr.fer.tel.server.rest.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "MeasurmentSelectForm")
public class MeasurmentSelectForm {
	
    @Id
    @GeneratedValue
	private long id;
    
    @OneToOne(cascade = CascadeType.ALL)
	private Request request;
	
    @OneToOne(cascade = CascadeType.ALL)
	private BodyHelper inputs;

	public MeasurmentSelectForm(Request request, BodyHelper inputs) {
		super();
		this.request = request;
		this.inputs = inputs;
	}

	public MeasurmentSelectForm() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Request getRequest() {
		return request;
	}

	public void setRequest(Request request) {
		this.request = request;
	}

	public BodyHelper getInputs() {
		return inputs;
	}

	public void setInputs(BodyHelper inputs) {
		this.inputs = inputs;
	}

}
