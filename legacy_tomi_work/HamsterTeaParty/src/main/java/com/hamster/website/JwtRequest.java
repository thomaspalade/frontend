package com.hamster.website;
import java.io.Serializable;
public class JwtRequest implements Serializable {
    private String userName;
    private String passwd;
    //need default constructor for JSON Parsing
    public JwtRequest()
    {
    }
    public JwtRequest(String username, String passwd) {
        this.setUserName(username);
        this.setPasswd(passwd);
    }
    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String username) {
        this.userName = username;
    }
    public String getPasswd() {
        return this.passwd;
    }
    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
}