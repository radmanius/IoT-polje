package hr.fer.tel.server.rest.dto;

import hr.fer.tel.server.rest.model.DataExtractor;
import hr.fer.tel.server.rest.model.MeasurmentSelectForm;
import hr.fer.tel.server.rest.model.Request;
import hr.fer.tel.server.rest.model.View2;

public class MesurmentViewDTO extends View2{
	
	private String measurementUnit;
	
	private MeasurmentSelectForm selectForm;
	
	private Request query;
	
	private DataExtractor responseExtracting;

	public MesurmentViewDTO(String measurementUnit, MeasurmentSelectForm selectForm, Request query,
			DataExtractor responseExtracting) {
		super();
		this.measurementUnit = measurementUnit;
		this.selectForm = selectForm;
		this.query = query;
		this.responseExtracting = responseExtracting;
	}

	public MesurmentViewDTO() {
		super();
	}

	public String getMeasurementUnit() {
		return measurementUnit;
	}

	public void setMeasurementUnit(String measurementUnit) {
		this.measurementUnit = measurementUnit;
	}

	public MeasurmentSelectForm getSelectForm() {
		return selectForm;
	}

	public void setSelectForm(MeasurmentSelectForm selectForm) {
		this.selectForm = selectForm;
	}

	public Request getQuery() {
		return query;
	}

	public void setQuery(Request query) {
		this.query = query;
	}

	public DataExtractor getResponseExtracting() {
		return responseExtracting;
	}

	public void setResponseExtracting(DataExtractor responseExtracting) {
		this.responseExtracting = responseExtracting;
	}
	
}