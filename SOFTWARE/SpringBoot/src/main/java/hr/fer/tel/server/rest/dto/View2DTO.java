package hr.fer.tel.server.rest.dto;

public class View2DTO {
	
	private long id;
    
    private String title;
    
    private String viewType;
    
	public View2DTO(long id, String title, String viewType) {
		super();
		this.id = id;
		this.title = title;
		this.viewType = viewType;
	}
	
	public View2DTO() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	} 
    
}
    