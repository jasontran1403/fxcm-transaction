package com.something.service;

import java.util.HashMap;
import java.util.List;

import com.something.domain.Role;
import com.something.domain.User;


public interface UserService {
    User saveUser(User user);
    User regis(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    User updateRef(String username, String usernameRef, String side);
    HashMap<String, List<User>> getMapDown(String username);
    HashMap<String, List<User>> getMapDown5Level(String username);
    List<User> getTreeUp(String username);
    List<User>getUsers();
    List<User> getTreeUpToRoot(String username);
    void updateSale(String username, long sale);
    void updateteamSale(String username, long sale);
    void calRank();
    void updateMaxOut(User user, double amount, String type);
    void enabledAuthen(User user);
    void activated(User user);
    void disabledAuthen(User user);
    void changePassword(User user);
}
