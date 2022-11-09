package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "DataExtractor")
public class DataExtractor {
	
    @Id
    @GeneratedValue
	private long id;
    
    private String dateFormat;
    
    private String timeColumn;
    
    private String valueColumn;

	public DataExtractor(String dateFormat, String timeColumn, String valueColumn) {
		super();
		this.dateFormat = dateFormat;
		this.timeColumn = timeColumn;
		this.valueColumn = valueColumn;
	}

	public DataExtractor() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}

	public String getTimeColumn() {
		return timeColumn;
	}

	public void setTimeColumn(String timeColumn) {
		this.timeColumn = timeColumn;
	}

	public String getValueColumn() {
		return valueColumn;
	}

	public void setValueColumn(String valueColumn) {
		this.valueColumn = valueColumn;
	}
    
    

}
