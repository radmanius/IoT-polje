package hr.fer.tel.server.rest.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;



@JsonTypeName("mesurment")
public class MesurmentViewDTO extends View2DTO{
	
	private String measurementUnit;
	
	private MeasurmentSelectFormDTO selectForm;
	
	private RequestDTO query;
	
	private DataExtractorDTO responseExtracting;

	public MesurmentViewDTO(String measurementUnit, MeasurmentSelectFormDTO selectForm, RequestDTO query,
			DataExtractorDTO responseExtracting) {
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

	public MeasurmentSelectFormDTO getSelectForm() {
		return selectForm;
	}

	public void setSelectForm(MeasurmentSelectFormDTO selectForm) {
		this.selectForm = selectForm;
	}

	public RequestDTO getQuery() {
		return query;
	}

	public void setQuery(RequestDTO query) {
		this.query = query;
	}

	public DataExtractorDTO getResponseExtracting() {
		return responseExtracting;
	}

	public void setResponseExtracting(DataExtractorDTO responseExtracting) {
		this.responseExtracting = responseExtracting;
	}
	
}