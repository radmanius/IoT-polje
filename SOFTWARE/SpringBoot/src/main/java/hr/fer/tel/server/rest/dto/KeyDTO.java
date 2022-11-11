package hr.fer.tel.server.rest.dto;

public class KeyDTO {
	
    private long id;
    
    private String name;
    
    private String value;
    
    private boolean canDelete;

	public KeyDTO(long id, String name, String value, boolean canDelete) {
		super();
		this.id = id;
		this.name = name;
		this.value = value;
		this.canDelete = canDelete;
	}

	public KeyDTO() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public boolean isCanDelete() {
		return canDelete;
	}

	public void setCanDelete(boolean canDelete) {
		this.canDelete = canDelete;
	}
    
}
