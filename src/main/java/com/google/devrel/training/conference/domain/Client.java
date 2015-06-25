package com.google.devrel.training.conference.domain;

import static com.google.devrel.training.conference.service.OfyService.ofy;

import com.google.api.server.spi.config.AnnotationBoolean;
import com.google.api.server.spi.config.ApiResourceProperty;
import com.google.devrel.training.conference.form.ClientForm;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Parent;

import java.util.ArrayList;
import java.util.List;

/**
 * Client Class to store goal information
 */
@Entity
@Cache
public class Client {

	/**
	 * The id for the datastore key.
	 *
	 * We use automatic id assignment for entities of Client class.
	 */
	@Id
	private String id;

	/**
	 * The name of the client.
	 */
	@Index
	private String name;

	private String description;
	
	private String goalsetterid;
	
	private String location;
	
	@Index
	private int medicalRecordNumber;
	
	private int age;
	/**
	 * Holds Goalsetter key as the parent.
	 */
	@Parent
	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	private Key<Goalsetter> goalsetterkey;
	
	private List<Goal> listofgoals  = new ArrayList<Goal>();
	
	//private Key<Goal> goalkey;

	/**
	 * The userId of the goalsetter.
	 */
	@Index
	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	private String userrId;

	/**
	 * Just making the default constructor private.
	 */
	private Client() {
	}

	public Client(final String id, final String goalsetterId,
			final ClientForm clientForm) {
		
		this.id = id;
		this.goalsetterkey = Key.create(Goalsetter.class, goalsetterId);
		setGoalsetterid(goalsetterId);
		this.userrId = goalsetterId;
		updateWithClientForm(clientForm);
	}

	
	
	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	public Key<Goalsetter> getGoalsetterKey() {
		return goalsetterkey;
	}
	
	

	// Get a String version of the key
	public String getWebsafeKey() {
		return Key.create(goalsetterkey, Client.class, id).getString();
	}

	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	public String getOrganizerUserId() {
		return userrId;
	}
	
	public String getdescription(){
		return description;
	}

	/**
	 * Returns organizer's display name.
	 *
	 * @return organizer's display name. If there is no Profile, return his/her
	 *         userId.
	 */
	public String getOrganizerDisplayName() {
		
		Goalsetter organizer = ofy().load().key(getGoalsetterKey()).now();
		if (organizer == null) {
			return userrId;
		} else {
			return organizer.getDisplayName();
		}
	}
	
	 public String getDisplayName() {
	        return name;
	    }

	 public List<Goal> getGoals() {
			return listofgoals;
		}

	/**
	 * Updates the Client with ClientForm. This method is used upon
	 * object creation as well as updating existing Client.
	 *
	 * @param ClientForm
	 *            contains form data sent from the client.
	 */
	public void updateWithClientForm(ClientForm clientForm) {
		
		this.name = clientForm.getname();
		this.description = clientForm.getdescription();
		setAge(clientForm.getage());
		setLocation(clientForm.getlocation());
		setMedicalRecordNumber(clientForm.getMedicalRecordNumber());
		
	}

	@Override
	public String toString() {
		StringBuilder stringBuilder = new StringBuilder("Id: " + id + "\n")
				.append("Name: ").append(name).append("\n");

		return stringBuilder.toString();
	}

	public String getGoalsetterid() {
		return goalsetterid;
	}

	public void setGoalsetterid(String goalsetterid) {
		this.goalsetterid = goalsetterid;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getMedicalRecordNumber() {
		return medicalRecordNumber;
	}

	public void setMedicalRecordNumber(int medicalRecordNumber) {
		this.medicalRecordNumber = medicalRecordNumber;
	}

}
