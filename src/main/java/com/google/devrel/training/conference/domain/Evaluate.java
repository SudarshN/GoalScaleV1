package com.google.devrel.training.conference.domain;

import com.google.api.server.spi.config.AnnotationBoolean;
import com.google.api.server.spi.config.ApiResourceProperty;
import com.google.devrel.training.conference.form.EvaluationForm;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Parent;

import java.util.Date;

/**
 * Goal Class to store goal information
 */
@Entity
@Cache
public class Evaluate {

	/**
	 * The id for the datastore key.
	 *
	 * We use automatic id assignment for entities of Evaluate class.
	 */
	@Id
	private String evaluateid;

	/**
	 * The name of the goal.
	 */
	
	private String Goalname;
	
	
	private String Notes;
	
	private double score;
	
	private Date  Evaluationdate;
	/**
	 * Holds Profile key as the parent.
	 */
	@Parent
	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	private Key<Profile> goalkey;
	
	private String goalwebsafekey;
	
	
	/**
	 * The userId of the organizer.
	 */
	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	private String UserId;

	/**
	 * Just making the default constructor private.
	 */
	private Evaluate() {
	}

	public Evaluate(final String id, final String UserId,String goalwebsafekey,
			final EvaluationForm evaluateform) {
		
		this.evaluateid = id;
		//this.goalkey = Key.create(Goal.class, organizerUserId);
		this.setGoalwebsafekey(goalwebsafekey);
		this.UserId = UserId;
		updateWithEvaluationForm(evaluateform);
	}

	
	
	public String getId() {
		return evaluateid;
	}

	public double getscore()
	{
		return score;
	}
	

	
	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	public Key<Profile> getGoalKey() {
		return goalkey;
	}
	
	

	// Get a String version of the key
	public String getWebsafeKey() {
		return Key.create(goalkey, Goal.class, evaluateid).getString();
	}

	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	public String getOrganizerUserId() {
		return evaluateid;
	}
	
	
	
	
	/**
	 * Updates the Conference with ConferenceForm. This method is used upon
	 * object creation as well as updating existing Conferences.
	 *
	 * @param conferenceForm
	 *            contains form data sent from the client.
	 */
	public void updateWithEvaluationForm(EvaluationForm evaluateForm) {
		
		
		this.Notes = evaluateForm.getsNotes();
		this.score = evaluateForm.getscore();
		this.Evaluationdate = evaluateForm.getEvaluationDate();
	}

	@Override
	public String toString() {
		StringBuilder stringBuilder = new StringBuilder("Id: " + evaluateid + "\n")
				.append("Name: ").append(Goalname).append("\n");

		return stringBuilder.toString();
	}

	public String getGoalwebsafekey() {
		return goalwebsafekey;
	}

	public void setGoalwebsafekey(String goalwebsafekey) {
		this.goalwebsafekey = goalwebsafekey;
	}

}
