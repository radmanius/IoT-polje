package hr.fer.tel.server.rest.model;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonTypeName;

import hr.fer.tel.server.rest.dto.ActuationViewDTO;

@Entity
//@DiscriminatorValue("actuation")
//@Table(name = "ActuationView")
////public class ActuationView{
@PrimaryKeyJoinColumn(name = "actuationId")
//@JsonTypeName("actuation")
public class ActuationView extends View2{

	
//    @Id
//    @GeneratedValue
//	private long id;
    
	
    @OneToOne(cascade = CascadeType.ALL)
	private ActuationForm form;

	public ActuationView(String title, String viewType, ActuationForm form) {
//		this.title = title;
//		this.viewType = viewType;
		this.form = form;
	}

	public ActuationView() {
		
	}
	
	public ActuationView(ActuationViewDTO dto) {
		super(dto.getId(), dto.getTitle(), dto.getViewType());
		
		this.form = new ActuationForm(dto.getForm());

	}

//	public long getId() {
//		return id;
//	}
//
//	public void setId(long id) {
//		this.id = id;
//	}

//	public String getTitle() {
//		return title;
//	}
//
//	public void setTitle(String title) {
//		this.title = title;
//	}
//
//	public String getViewType() {
//		return viewType;
//	}
//
//	public void setViewType(String viewType) {
//		this.viewType = viewType;
//	}

	public ActuationForm getForm() {
		return form;
	}

	public void setForm(ActuationForm form) {
		this.form = form;
	}
	
}
