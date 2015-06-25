package com.google.devrel.training.conference.domain;


public class GoalsetterReport {
	
	public String GoalSetterName;
	
	public int score;
	
	GoalsetterReport()
	{
		
	}
	
	GoalsetterReport(String name , int score)
	{
		this.GoalSetterName = name;
		this.score = score;
	}
	
	public String getGoalsetterName()
	{
		return GoalSetterName;
	}
	
	public int getscore()
	{
		return score;
	}

}
