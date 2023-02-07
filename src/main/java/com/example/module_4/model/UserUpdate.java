package com.example.module_4.model;

public class UserUpdate {
    private Long id;
    private String oldPassword;
    private String newPassword;
    private String autPassword;

    public UserUpdate(Long id, String oldPassword, String newPassword, String autPassword) {
        this.id = id;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.autPassword = autPassword;
    }

    public UserUpdate() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getAutPassword() {
        return autPassword;
    }

    public void setAutPassword(String autPassword) {
        this.autPassword = autPassword;
    }
}
