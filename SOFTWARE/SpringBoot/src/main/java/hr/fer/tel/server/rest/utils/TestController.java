package hr.fer.tel.server.rest.utils;

import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@Profile("test")
@RestController
@RequestMapping("/")
public class TestController {

    @RequestMapping(value = "/a", method = RequestMethod.GET)
    public ResponseEntity<String> getAnonymous() {
        return ResponseEntity.ok("Anonymous");
    }

    @RolesAllowed( "iot-read")
    @RequestMapping(value = "/read", method = RequestMethod.GET)
    public ResponseEntity<String> getUser() {
        return ResponseEntity.ok("Reading");
    }

    @RolesAllowed("iot-write")
    @RequestMapping(value = "/write", method = RequestMethod.GET)
    public ResponseEntity<String> getAdmin() {
        return ResponseEntity.ok("Writing");
    }

    @RequestMapping("/")
    public ResponseEntity<String> getHello(){
        return ResponseEntity.ok("Server works");
    }

}