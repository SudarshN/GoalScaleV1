package com.google.devrel.training.conference.form;

public class ClientForm {
	
	/**
     * The name of the client.
     */
    private String name;
    
    /**
     * The description of the Client.
     */
    private String description;
    
    private int age;
    
    private String location;
    
    private int medicalRecordNumber;
    
   
    
    private ClientForm(){}
    
    /**
     * 
     * @param name
     * @param description
     * @param medicalRecordNumber 
     */
    public ClientForm(String name, String description, int age , String location , int medicalRecordNumber)
    {
    	this.name = name;
    	this.description = description;
    	
    	this.age = age;
    	this.location = location;
    	this.medicalRecordNumber = medicalRecordNumber;
    }
    
    public String getname()
    {
    	return name;
    }
    
    
    public String getdescription()
    {
    	return description;
    }

	public int getage() {
		return age;
	}

	
	public String getlocation() {
		return location;
	}

	public int getMedicalRecordNumber() {
		return medicalRecordNumber;
	}

	public void setMedicalRecordNumber(int medicalRecordNumber) {
		this.medicalRecordNumber = medicalRecordNumber;
	}

	


}
