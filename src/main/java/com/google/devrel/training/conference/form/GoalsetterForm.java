package com.google.devrel.training.conference.form;

import java.util.List;

import com.google.devrel.training.conference.domain.Client;

public class GoalsetterForm {
	
	/**
     * The name of the client.
     */
    private String name;
    
    private String emailaddress;

    /**
     * The description of the conference.
     */
    private String description;
    
    private List<Client> clients;
    
    private GoalsetterForm(){}
    
    public static enum ROLE
	{
		ADMIN,
		GOALSETTER
	} 
    
    ROLE role;
    /**
     * 
     * @param name
     * @param description
     */
    public GoalsetterForm(String name, String description,String emailaddress,ROLE role)
    {
    	this.name = name;
    	this.description = description;
    	this.emailaddress = emailaddress;
    	this.role = role;
    }
    
    public String getname()
    {
    	return name;
    }
    
    
    public String getdescription()
    {
    	return description;
    }
    
    public List<Client> getclients()
    {
    	return clients;
    }
    
    public String getemailaddress()
    {
    	return emailaddress;
    }
    
    public ROLE getRole() {
        return role;
    }


}
