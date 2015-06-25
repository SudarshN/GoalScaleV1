package com.google.devrel.training.conference.form;

import java.util.Date;

public class EvaluationForm {

	public String Notes;
	
	public double score;
	
	public Date EvaluationDate;
	
	public EvaluationForm(String Notes,double score,Date EvaluationDate)
    {
    	this.Notes = Notes;
    	this.score = score;
    	this.EvaluationDate = EvaluationDate;
    }
	
	public double getscore()
	{
		return score;
	}
	public String getsNotes()
	{
		return Notes;
	}
	public Date getEvaluationDate()
	{
		return EvaluationDate;
	}
}
