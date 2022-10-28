package hr.fer.tel.server.rest.model;

import javax.persistence.*;

@Entity
@Table(name = "Layout")
public class Layout {

    @Id
    @GeneratedValue
    private long id;

    private String name;

    public Layout() {

    }

    public Layout(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        return getName();
    }
}
