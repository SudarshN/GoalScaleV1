package com.google.devrel.training.conference.domain;

import static com.google.devrel.training.conference.service.OfyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.AnnotationBoolean;
import com.google.api.server.spi.config.ApiResourceProperty;
import com.google.devrel.training.conference.form.ClientForm;
import com.google.devrel.training.conference.form.GoalsetterForm;
import com.google.devrel.training.conference.form.GoalsetterForm.ROLE;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Parent;

@Entity
@Cache
public class Goalsetter {

	/**
	 * The id for the datastore key.
	 *
	 * We use automatic id assignment for entities of Goalsetter class.
	 */
	@Id
	private String id;
	
	private List<Integer>scores = new ArrayList<>();
	
	private ROLE role;
	
	private int Averagescore;

	/**
	 * The name of the goal.
	 */
	@Index
	private String name;

	private String description;

	
	private String emailaddress;

	private List<Client> clients = new ArrayList<Client>();
	/**
	 * Holds Profile key as the parent.
	 */
	@Parent
	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	private Key<Profile> profileKey;

	/**
	 * The userId of the organizer.
	 */
	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	private String organizerUserId;

	/**
	 * Just making the default constructor private.
	 */
	public Goalsetter() {
	}

	public Goalsetter(final String id, final String organizerUserId,
			final GoalsetterForm conferenceForm) {

		this.id = id;
		this.profileKey = Key.create(Profile.class, organizerUserId);
		this.organizerUserId = organizerUserId;
		updateWithGoalsetterForm(conferenceForm);
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<Client> getclients() {
		return clients;
	}

	public ROLE getRole() {
        return role;
    }
	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	public Key<Profile> getProfileKey() {
		return profileKey;
	}

	// Get a String version of the key
	public String getWebsafeKey() {
		return Key.create(profileKey, Goalsetter.class, id).getString();
	}

	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	public String getOrganizerUserId() {
		return organizerUserId;
	}

	public String getdescription() {
		return description;
	}

	/**
	 * Returns organizer's display name.
	 *
	 * @return organizer's display name. If there is no Profile, return his/her
	 *         userId.
	 */
	public String getOrganizerDisplayName() {
		// Profile organizer = ofy().load().key(Key.create(Profile.class,
		// organizerUserId)).now();
		Profile organizer = ofy().load().key(getProfileKey()).now();
		if (organizer == null) {
			return organizerUserId;
		} else {
			return organizer.getDisplayName();
		}
	}

	public String getDisplayName() {
		return name;
	}

	public String getemailaddress() {
		return emailaddress;
	}

	/**
	 * Updates the Conference with ConferenceForm. This method is used upon
	 * object creation as well as updating existing Conferences.
	 *
	 * @param conferenceForm
	 *            contains form data sent from the client.
	 */
	public void updateWithGoalsetterForm(GoalsetterForm conferenceForm) {

		this.name = conferenceForm.getname();
		this.description = conferenceForm.getdescription();
		this.emailaddress = conferenceForm.getemailaddress();
		this.role = conferenceForm.getRole();
	}
	
	@Override
	public String toString() {
		StringBuilder stringBuilder = new StringBuilder("Id: " + id + "\n")
				.append("Name: ").append(name).append("\n");

		return stringBuilder.toString();
	}

	public void calculateAverage()
	{
		int sum = 0;
		for(int i =0 ; i< scores.size() ; i++)
		{
			sum += scores.get(i);
		}
		Averagescore = sum/scores.size();
		
	}
	
	public List<Integer> getScores() {
		return scores;
	}

	public int getAveragescore() {
		return Averagescore;
	}

	

	

}
