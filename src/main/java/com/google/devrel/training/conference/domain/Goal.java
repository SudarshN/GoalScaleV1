package com.google.devrel.training.conference.domain;

import com.google.api.server.spi.config.AnnotationBoolean;
import com.google.api.server.spi.config.ApiResourceProperty;
import com.google.common.base.Preconditions;
import com.google.devrel.training.conference.form.GoalForm;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Parent;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Goal Class to store goal information
 */
@Entity
@Cache
public class Goal {
	/**
	 * The id for the datastore key.
	 *
	 * We use automatic id assignment for entities of Goal class.
	 */
	@Id
	private Long id;

	@Index
	private String name;

	/**
	 * The description of the goal.
	 */
	private String description;

	/**
	 * Holds Profile key as the parent.
	 */

	@Parent
	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	private Key<Client> clientKey;

	/**
	 * The userId of the organizer.
	 */
	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	private String UserId;

	private String Clientname;
	
	/**
	 * The starting date of this goal.
	 */
	private Date startDate;
	
	private List<Evaluate> listofevaluations = new ArrayList<>();

	/**
	 * The ending date of this goal.
	 */
	private Date endDate;
	
	private String minusonescale;
	private String minustwoscale;
	private String zeroscale;
	private String plustwoscale;
	private String plusonescale;

	/**
	 * Just making the default constructor private.
	 */
	public Goal() {
	}

	public Goal(final long id, final String clientid,
			final GoalForm goalform) {
		Preconditions.checkNotNull(goalform.getName(),
				"The name is required");
		this.id = id;
		this.clientKey = Key.create(Client.class, clientid);
		this.UserId = clientid;
		updateWithgoalForm(goalform);
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	public Key<Client> getProfileKey() {
		return clientKey;
	}

	
	// Get a String version of the key
	public String getWebsafeKey() {
		return Key.create(clientKey, Goal.class, id).getString();
	}

	@ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
	public String getOrganizerUserId() {
		return UserId;
	}

	
	/**
	 * Returns a defensive copy of startDate if not null.
	 * 
	 * @return a defensive copy of startDate if not null.
	 */
	public Date getStartDate() {
		return startDate == null ? null : new Date(startDate.getTime());
	}

	/**
	 * Returns a defensive copy of endDate if not null.
	 * 
	 * @return a defensive copy of endDate if not null.
	 */
	public Date getEndDate() {
		return endDate == null ? null : new Date(endDate.getTime());
	}



	/**
	 * Updates the goal with goalForm. This method is used upon
	 * object creation as well as updating existing goals.
	 *
	 * @param goalForm
	 *            contains form data sent from the client.
	 */
	public void updateWithgoalForm(GoalForm goalForm) {
		this.name = goalForm.getName();
		this.description = goalForm.getDescription();
		this.setMinusonescale(goalForm.getminusonescale());
		this.setMinustwoscale(goalForm.getminustwoscale());
		this.setZeroscale(goalForm.getzeroscale());
		this.setPlusonescale(goalForm.getplusonescale());
		this.setPlustwoscale(goalForm.getplustwoscale());
		this.setClientname(goalForm.getClientname());

		Date startDate = goalForm.getStartDate();
		this.startDate = startDate == null ? null : new Date(
				startDate.getTime());
		Date endDate = goalForm.getEndDate();
		this.endDate = endDate == null ? null : new Date(endDate.getTime());
		if (this.startDate != null) {
			// Getting the starting month for a composite query.
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(this.startDate);
			// Calendar.MONTH is zero based, so adding 1.
			
		}
		// Check maxAttendees value against the number of already allocated
		// seats.

		// The initial number of seatsAvailable is the same as maxAttendees.
		// However, if there are already some seats allocated, we should
		// subtract that numbers.

	}

	

	@Override
	public String toString() {
		StringBuilder stringBuilder = new StringBuilder("Id: " + id + "\n")
				.append("Name: ").append(name).append("\n");

		if (startDate != null) {
			stringBuilder.append("StartDate: ").append(startDate.toString())
					.append("\n");
		}
		if (endDate != null) {
			stringBuilder.append("EndDate: ").append(endDate.toString())
					.append("\n");
		}

		return stringBuilder.toString();
	}

	public String getMinusonescale() {
		return minusonescale;
	}

	public void setMinusonescale(String minusonescale) {
		this.minusonescale = minusonescale;
	}

	public String getMinustwoscale() {
		return minustwoscale;
	}

	public void setMinustwoscale(String minustwoscale) {
		this.minustwoscale = minustwoscale;
	}

	public String getZeroscale() {
		return zeroscale;
	}

	public void setZeroscale(String zeroscale) {
		this.zeroscale = zeroscale;
	}

	public String getPlustwoscale() {
		return plustwoscale;
	}

	public void setPlustwoscale(String plustwoscale) {
		this.plustwoscale = plustwoscale;
	}

	public String getPlusonescale() {
		return plusonescale;
	}

	public void setPlusonescale(String plusonescale) {
		this.plusonescale = plusonescale;
	}

	public String getClientname() {
		return Clientname;
	}

	public void setClientname(String clientname) {
		Clientname = clientname;
	}

	public List<Evaluate> getListofevaluations() {
		return listofevaluations;
	}

	

}
