package com.google.devrel.training.conference.form;

import java.util.Date;

/**
 * A simple Java object (POJO) representing a Goal form sent from the client.
 */
public class GoalForm {
    /**
     * The name of the conference.
     */
    private String name;

    /**
     * The description of the conference.
     */
    private String description;

    private String Clientname;
   
    /**
     * The start date of the conference.
     */
    private Date startDate;

    /**
     * The end date of the conference.
     */
    private Date endDate;
    
    private String minusonescale;
    private String minustwoscale;
    private String zeroscale;
    private String plustwoscale;
    private String plusonescale;

    /**
     * The capacity of the conference.
     */
    

    private GoalForm() {}

    /**
     * Public constructor is solely for Unit Test.
     * @param name
     * @param description
     * @param topics
     * @param city
     * @param startDate
     * @param endDate
     * @param maxAttendees
     */
    public GoalForm(String name, String description, String Clientname,
                          Date startDate, Date endDate, String minusonescale, String minustwoscale,
                          String zeroscale, String plusonescale, String plustwoscale) {
        this.name = name;
        this.description = description;
        
        this.minusonescale = minusonescale;
        this.minustwoscale = minustwoscale;
        this.zeroscale = zeroscale;
        this.plusonescale = plusonescale;
        this.plustwoscale = plustwoscale;
        this.Clientname = Clientname;
       
        this.startDate = startDate == null ? null : new Date(startDate.getTime());
        this.endDate = endDate == null ? null : new Date(endDate.getTime());
       
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }



    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }
    
    public String getClientname()
    {
    	return Clientname;
    }

    
    public String getminusonescale()
    {
    	return minusonescale;
    }
    
    public String getminustwoscale()
    {
    	return minustwoscale;
    }
    public String getzeroscale()
    {
    	return zeroscale;
    }
    
    public String getplusonescale()
    {
    	return plusonescale;
    }
    
    public String getplustwoscale()
    {
    	return plustwoscale;
    }
}
