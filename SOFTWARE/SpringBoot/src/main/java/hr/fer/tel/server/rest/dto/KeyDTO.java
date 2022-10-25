package hr.fer.tel.server.rest.model;

import java.util.Comparator;
import java.util.Objects;

public class KeyDTO implements Comparable<KeyDTO>, Comparator<KeyDTO> {

    private String token1;
    private String token2;

    public KeyDTO(String token1, String token2) {
        this.token1 = token1;
        this.token2 = token2;
    }

    public String getToken1() {
        return token1;
    }

    public void setToken1(String token1) {
        this.token1 = token1;
    }

    public String getToken2() {
        return token2;
    }

    public void setToken2(String token2) {
        this.token2 = token2;
    }

    public static KeyDTO from(Key k){ return new KeyDTO(k.getToken1(), k.getToken2());}

    @Override
    public int compare(KeyDTO o1, KeyDTO o2) {
        int a = o1.token1.compareTo(o2.token1);
        if(a == 0)
            return o2.token2.compareTo(o1.token2);
        return a;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        KeyDTO keyDTO = (KeyDTO) o;
        return token1.equals(keyDTO.token1) && token2.equals(keyDTO.token2);
    }

    @Override
    public int hashCode() {
        return (token1 != null ? token1.hashCode() : 0) + (token2 != null ? token2.hashCode() : 0);
    }

    @Override
    public int compareTo(KeyDTO o) {
        int a = this.token1.compareTo(o.token1);
        if(a == 0)
            return this.token2.compareTo(o.token2);
        return a;
    }
}
