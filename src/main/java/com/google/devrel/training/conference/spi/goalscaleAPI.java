package com.google.devrel.training.conference.spi;

import static com.google.devrel.training.conference.service.OfyService.factory;
import static com.google.devrel.training.conference.service.OfyService.ofy;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.inject.Named;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.api.server.spi.response.NotFoundException;
import com.google.api.server.spi.response.UnauthorizedException;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.memcache.MemcacheService;
import com.google.appengine.api.memcache.MemcacheServiceFactory;
import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.repackaged.com.google.api.client.util.store.DataStore;
import com.google.devrel.training.conference.Constants;
import com.google.devrel.training.conference.domain.Announcement;
import com.google.devrel.training.conference.domain.Client;
import com.google.devrel.training.conference.domain.Evaluate;
import com.google.devrel.training.conference.domain.Goal;
import com.google.devrel.training.conference.domain.Goalsetter;
import com.google.devrel.training.conference.domain.Profile;
import com.google.devrel.training.conference.form.ClientForm;
import com.google.devrel.training.conference.form.EvaluationForm;
import com.google.devrel.training.conference.form.GoalForm;
import com.google.devrel.training.conference.form.ConferenceQueryForm;
import com.google.devrel.training.conference.form.GoalsetterForm;
import com.google.devrel.training.conference.form.ProfileForm;
import com.google.devrel.training.conference.form.ProfileForm.TeeShirtSize;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Work;
import com.googlecode.objectify.cmd.Query;
import com.googlecode.objectify.cmd.QueryKeys;

/**
 * Defines goalscale APIs.
 */
@Api(name = "goalscale", version = "v1", scopes = { Constants.EMAIL_SCOPE }, clientIds = {
		Constants.WEB_CLIENT_ID,Constants.ANDROID_CLIENT_ID, com.google.api.server.spi.Constant.API_EXPLORER_CLIENT_ID },audiences = {Constants.ANDROID_AUDIENCE}, description = "API for the Goal Scale Backend application.")
public class goalscaleAPI {

	/*
	 * Get the display name from the user's email. For example, if the email is
	 * lemoncake@example.com, then the display name becomes "lemoncake."
	 */
	private static final Boolean True = null;
	private static final Boolean False = null;

	private static String extractDefaultDisplayNameFromEmail(String email) {
		return email == null ? null : email.substring(0, email.indexOf("@"));
	}

	/**
	 * Creates or updates a Profile object associated with the given user
	 * object.
	 *
	 * @param user
	 *            A User object injected by the cloud endpoints.
	 * @param profileForm
	 *            A ProfileForm object sent from the client form.
	 * @return Profile object just created.
	 * @throws UnauthorizedException
	 *             when the User object is null.
	 */

	// Declare this method as a method available externally through Endpoints
	@ApiMethod(name = "saveProfile", path = "profile", httpMethod = HttpMethod.POST)
	// The request that invokes this method should provide data that
	// conforms to the fields defined in ProfileForm
	// TODO 1 Pass the ProfileForm parameter
	// TODO 2 Pass the User parameter
	public Profile saveProfile(final User user, ProfileForm profileForm)
			throws UnauthorizedException {

		UserService usw = UserServiceFactory.getUserService();
		User user1 = usw.getCurrentUser();

		// TODO 2
		// If the user is not logged in, throw an UnauthorizedException
		if (user == null) {
			throw new UnauthorizedException("Authorization required");
		}

		// TODO 2
		// Get the userId and mainEmail
		String mainEmail = user.getEmail();
		String userId = user.getUserId();

		// TODO 1
		// Get the displayName and teeShirtSize sent by the request.

		String displayName = profileForm.getDisplayName();
		TeeShirtSize teeShirtSize = profileForm.getTeeShirtSize();

		// Get the Profile from the datastore if it exists
		// otherwise create a new one
		Profile profile = ofy().load().key(Key.create(Profile.class, userId))
				.now();

		if (profile == null) {
			// Populate the displayName and teeShirtSize with default values
			// if not sent in the request
			if (displayName == null) {
				displayName = extractDefaultDisplayNameFromEmail(user
						.getEmail());
			}
			
			// Now create a new Profile entity
			profile = new Profile(userId, displayName, mainEmail);
		} else {
			// The Profile entity already exists
			// Update the Profile entity
			profile.update(displayName, teeShirtSize);
		}

		// TODO 3
		// Save the entity in the datastore
		ofy().save().entity(profile).now();

		// Return the profile
		return profile;
	}
	@ApiMethod(name = "saveGoalsetter", path = "/updategoalsetter/{websafegaolsetterKey}/Update", httpMethod = HttpMethod.GET)
	public Goalsetter saveGoalsetter(@Named("websafegaolsetterKey") final String websafegaolsetterKey, GoalsetterForm goalsetterform)
			throws UnauthorizedException {
			
		if(goalsetterform == null) return null;
		Key<Goalsetter> goalsetterkey = Key.create(websafegaolsetterKey);
		Goalsetter goalsetter = ofy().load().key(goalsetterkey).now();		
		//if(goalsetter == null) return null;

		goalsetter.updateWithGoalsetterForm(goalsetterform);
		

		// TODO 3
		// Save the entity in the datastore
		ofy().save().entity(goalsetter).now();

		// Return the profile
		return goalsetter;
	}

	@ApiMethod(name = "saveClient", path = "/updateClient/{clientwebsafekey}/Update", httpMethod = HttpMethod.GET)
	public Client saveClient(@Named("clientwebsafekey") final String clientwebsafekey, ClientForm clientform)
			throws UnauthorizedException {
			
		
		Key<Client> clientkey = Key.create(clientwebsafekey);
		Client client = ofy().load().key(clientkey).now();		
		

		client.updateWithClientForm(clientform);
		

		// TODO 3
		// Save the entity in the datastore
		ofy().save().entity(client).now();

		// Return the profile
		return client;
	}
	
	@ApiMethod(name = "saveGoal", path = "/updateGoal/{goalkey}/Update", httpMethod = HttpMethod.GET)
	public Goal saveGoal(@Named("goalkey") final String goalkey, GoalForm goalForm)
			throws UnauthorizedException {
			
		
		Key<Goal> clientkey = Key.create(goalkey);
		Goal goal = ofy().load().key(clientkey).now();		
		

		goal.updateWithgoalForm(goalForm);
		

		// TODO 3
		// Save the entity in the datastore
		ofy().save().entity(goal).now();

		// Return the profile
		return goal;
	}


	/**
	 * Returns a Profile object associated with the given user object. The cloud
	 * endpoints system automatically inject the User object.
	 *
	 * @param user
	 *            A User object injected by the cloud endpoints.
	 * @return Profile object.
	 * @throws UnauthorizedException
	 *             when the User object is null.
	 */
	@ApiMethod(name = "getProfile", path = "/profile", httpMethod = HttpMethod.GET)
	public Profile getProfile(final User user) throws UnauthorizedException {
		
		if (user == null) {
            throw new UnauthorizedException("Authorization required");
        }
		// TODO
		// load the Profile Entity
		String userId = user.getUserId();
		Key<Profile> key = Key.create(Profile.class, userId);

		Profile profile = (Profile) ofy().load().key(key).now();
		return profile;
	}

	/**
	 * Gets the Profile entity for the current user or creates it if it doesn't
	 * exist
	 * 
	 * @param user
	 * @return user's Profile
	 */
	private static Profile getProfileFromUser(User user) {
		// First fetch the user's Profile from the datastore.
		Profile profile = ofy().load()
				.key(Key.create(Profile.class, user.getUserId())).now();
		if (profile == null) {
			// Create a new Profile if it doesn't exist.
			// Use default displayName and teeShirtSize
			String email = user.getEmail();
			profile = new Profile(user.getUserId(),
					extractDefaultDisplayNameFromEmail(email), email
					);
		}
		return profile;
	}

	/**
	 * Creates a new Conference object and stores it to the datastore.
	 *
	 * @param user
	 *            A user who invokes this method, null when the user is not
	 *            signed in.
	 * @param conferenceForm
	 *            A ConferenceForm object representing user's inputs.
	 * @return A newly created Conference Object.
	 * @throws UnauthorizedException
	 *             when the user is not signed in.
	 */
	@ApiMethod(name = "createGoal", path = "/createGoal/{clientwebsafekey}", httpMethod = HttpMethod.POST)
	public Goal createGoal(
			@Named("clientwebsafekey") final String clientwebsafekey,
			final GoalForm goalform)
			throws NotFoundException {
			  
		
		// Allocate Id first, in order to make the transaction idempotent.
		
		Key<Client> clientKey = Key.create(clientwebsafekey);
		if (clientKey == null) {
            throw new NotFoundException("No Client found with key: " + clientKey);
        }
		Client client = ofy().load().key(clientKey).now();
		
		String clientid = client.getId();

		final Key<Goal> goalKey = factory().allocateId(clientKey, Goal.class);
		final long goalId = goalKey.getId();
		
		//final Long goalId = 12345;

		Goal goal = new Goal(goalId, clientid, goalform);
		// Save Goal and Profile.

		client.getGoals().add(goal);
		ofy().save().entities(goal, client).now();
		return goal;

	}

	// create client for Goalsetter , Goalsetter Login
		@ApiMethod(name = "createUserforGoalsetter", path = "/partials/goalsetter/client", httpMethod = HttpMethod.POST)
		public Client createUserforGoalsetter(
				
				final ClientForm clientform, final User user) throws UnauthorizedException {

			
			List<Goalsetter> goalsetterlist=  queryforallgoalsetters();
			//List<Goalsetter> goalsetterlist = queryforallgoalsetters();
			
			Goalsetter goalsetter = null;
			for(int i =0 ; i < goalsetterlist.size() ; i++)
			{
				if(goalsetterlist.get(i).getemailaddress().equals(user.getEmail()))
				{
					goalsetter = goalsetterlist.get(i);
				}
					
			}

			final String clientId = clientform.getname();

			Client client = new Client(clientId, goalsetter.getName(), clientform);

			goalsetter.getclients().add(client);
			ofy().save().entities(client, goalsetter).now();
			return client;

		}

		@ApiMethod(name = "deletegoalsetter", path = "/goalsetterdetail/{websafegaolsetterKey}", httpMethod = HttpMethod.POST)
		public Goalsetter deletegoalsetter(@Named("websafegaolsetterKey") final String websafegaolsetterKey)
		{
			Key<Goalsetter> goalsetterKey = Key.create(websafegaolsetterKey);
			Goalsetter goalsetter = ofy().load().key(goalsetterKey).now();
			
			String gsid = goalsetter.getId();
			
			int clientsize = goalsetter.getclients().size();
			for(int i = 0; i < clientsize ; i ++)
			{
				if(goalsetter.getclients().get(i).getGoalsetterid().equals(gsid))
				{
					Client temp = goalsetter.getclients().get(i);
					int goalssize = temp.getGoals().size();
					for(int j = 0 ; j< goalssize ; j++)
					{
						Goal tempgoal = temp.getGoals().get(j);
						ofy().delete().entity(tempgoal).now();
					}
						
					ofy().delete().entity(temp).now();
				}
				
			}
			ofy().delete().entity(goalsetter).now();
			return goalsetter;
		}
		
		
		@ApiMethod(name = "deleteclient", path = "/clientdetail/{clientwebsafekey}", httpMethod = HttpMethod.POST)
		public Client deleteclient(@Named("clientwebsafekey") final String clientwebsafekey)
		{
			Key<Client> clientkey = Key.create(clientwebsafekey);
			Client client = ofy().load().key(clientkey).now();
			
			String gsid = client.getOrganizerUserId();
			
			Key<Goalsetter> goalsetterkey = Key.create(Goalsetter.class, gsid);
			Goalsetter gs = ofy().load().key(goalsetterkey).now();
			if(gs == null) 
			{//gs.getclients();
				List<Goalsetter> gslist = queryforallgoalsetters();
				for(int i = 0; i < gslist.size() ; i ++)
				{
					if(gslist.get(i).getclients().get(i).getGoalsetterid().equals(gsid))
					{
						gslist.get(i).getclients().remove(i);
					}
					
				}
				
				List<Goal> goals = client.getGoals();
				for(int j = 0 ; j < goals.size();j++)
				{
					Goal temp = goals.get(j);
					ofy().delete().entity(temp).now();
					
				}
				ofy().delete().entity(client).now();
				return client;
			}
			
			int clientsize = gs.getclients().size();
			for(int i = 0; i < clientsize ; i ++)
			{
				if(gs.getclients().get(i).getGoalsetterid().equals(gsid))
					gs.getclients().remove(i);
				
			}
			List<Goal> goals = client.getGoals();
			for(int j = 0 ; j < goals.size();j++)
			{
				Goal temp = goals.get(j);
				ofy().delete().entity(temp).now();
				
			}
			ofy().delete().entity(client).now();
			return client;
		}
		
		
		@ApiMethod(name = "deletegoal", path = "goal/detail/{goalkey}", httpMethod = HttpMethod.POST)
		public Goal deletegoal(@Named("goalkey") final String goalkey,final User user)
		{
			Key<Goal> glkey = Key.create(goalkey);
			Goal goal = ofy().load().key(glkey).now();	
			
			
			List<Client> listofclients = ofy().load().type(Client.class).list();
			int clientsize = listofclients.size();
			
			for(int i = 0; i < clientsize ; i++)
			{
				if(listofclients.get(i).getGoals().get(i).getName().equals(goal.getName()))
				{
					listofclients.remove(i);
					ofy().save().entity(listofclients.get(i));
					break;
				}
					
			}
			
			ofy().delete().entity(goal).now();
			return goal;
		}
	// create client
	@ApiMethod(name = "createUser", path = "client", httpMethod = HttpMethod.POST)
	public Client createUser(
			@Named("goalsetterwebsafekey") final String goalsetterwebsafekey,
			final ClientForm clientform) throws UnauthorizedException {

		Key<Goalsetter> goalsetterKey = Key.create(goalsetterwebsafekey);
		Goalsetter goalsetter = ofy().load().key(goalsetterKey).now();

		final String clientId = clientform.getname();

		Client client = new Client(clientId, goalsetter.getName(), clientform);

		goalsetter.getclients().add(client);
		ofy().save().entities(client, goalsetter).now();
		return client;

	}

	@ApiMethod(name = "searchgoalsetter", path = "searchgoalsetter", httpMethod = HttpMethod.POST)
	public List<Goalsetter> searchgoalsetter(
			@Named("searchname") final String searchname
			) throws UnauthorizedException {

		List<Goalsetter> temp = new ArrayList<Goalsetter>();
		Query<Goalsetter> goalsettrs = ofy().load().type(Goalsetter.class).order("name");
		
		int size = goalsettrs.list().size();
		
		for(int i = 0 ; i <size ; i++)
		{
			if(goalsettrs.list().get(i).getName().equals(searchname))
			{
				temp.add( goalsettrs.list().get(i));
				return temp;
			}
		}
		return null;

	}
	
	@ApiMethod(name = "searchclient", path = "searchclient", httpMethod = HttpMethod.POST)
	public List<Client> searchclient(
			@Named("searchname") final String searchname
			) throws UnauthorizedException {

		List<Client> temp = new ArrayList<Client>();
		Query<Client> clinets = ofy().load().type(Client.class).order("name");
		
		int size = clinets.list().size();
		
		for(int i = 0 ; i <size ; i++)
		{
			if(clinets.list().get(i).getName().equals(searchname))
			{
				temp.add( clinets.list().get(i));
				return temp;
			}
		}
		return null;

	}
	
	@ApiMethod(name = "searchgoal", path = "searchgoal", httpMethod = HttpMethod.POST)
	public List<Goal> searchgoal(
			@Named("searchname") final String searchname
			) throws UnauthorizedException {

		List<Goal> temp = new ArrayList<Goal>();
		Query<Goal> clinets = ofy().load().type(Goal.class).order("name");
		
		int size = clinets.list().size();
		
		for(int i = 0 ; i <size ; i++)
		{
			if(clinets.list().get(i).getName().equals(searchname))
			{
				temp.add( clinets.list().get(i));
				return temp;
			}
		}
		return null;

	}
	
	
	@ApiMethod(name = "createGoalsetter", path = "goalsetter", httpMethod = HttpMethod.POST)
	public Goalsetter createGoalsetter(final User user,
			final GoalsetterForm gsForm) throws UnauthorizedException {
		if (user == null) {
			throw new UnauthorizedException("Authorization required");
		}

		final String userId = user.getUserId();
		final String goalsetterid = gsForm.getname();

		final Queue queue = QueueFactory.getDefaultQueue();

		Goalsetter gs = ofy().transact(new Work<Goalsetter>() {
			@Override
			public Goalsetter run() {
				Profile profile = getProfileFromUser(user);
				Goalsetter goalsetter = new Goalsetter(goalsetterid, userId,
						gsForm);
				// Save Conference and Profile.
				ofy().save().entities(goalsetter, profile).now();
				queue.add(
						ofy().getTransaction(),
						TaskOptions.Builder
								.withUrl("/tasks/send_confirmation_email")
								.param("email", profile.getMainEmail())
								.param("userInfo", goalsetter.toString()));
				return goalsetter;
			}
		});

		return gs;
	}
///
	@ApiMethod(name = "createReport", path = "goal/detail/{{goal.websafeConferenceKey}}/Evaluate", httpMethod = HttpMethod.POST)
	public Evaluate createReport( @Named("websafeConferenceKey") final String websafeConferenceKey, final EvaluationForm evalForm , final User user)
			throws UnauthorizedException {
		

		 Key<Goal> goalKey = Key.create(websafeConferenceKey);
	     Goal goal = ofy().load().key(goalKey).now();
	        
		final String userId = user.getUserId();
		final String goalname = goal.getName();

		Evaluate evalte = new Evaluate(goalname, userId,websafeConferenceKey, evalForm);
		goal.getListofevaluations().add(evalte);
		
		Goalsetter goalsetter = null;
		
		//Key<Profile> userKey = Key.create(Profile.class, userId);
		//List<Goalsetter> goalsetterlist=  ofy().load().type(Goalsetter.class)
                //.ancestor(userKey)
               // .list();
		List<Goalsetter> goalsetterlist = queryforallgoalsetters();
		for(int i =0 ; i < goalsetterlist.size() ; i++)
		{
			if(goalsetterlist.get(i).getemailaddress().equals(user.getEmail()))
			{
				goalsetter = goalsetterlist.get(i);
				goalsetter.getScores().add((int)evalForm.getscore());
				
				goalsetter.calculateAverage();
				break;
			}
				
		}
		
		
		// Save Evaluate .
		ofy().save().entities(goal,evalte,goalsetter).now();

		return evalte;

	}

	@ApiMethod(name = "queryConferences_nofilters", path = "queryConferences_nofilters", httpMethod = HttpMethod.POST)
	public List<Client> queryConferences_nofilters(final User user) {
		// Find all entities of type Conference

		Query<Client> query = ofy().load().type(Client.class).order("name");

		return query.list();
	}

	@ApiMethod(name = "queryGoals_nofilters", path = "queryGoals_nofilters", httpMethod = HttpMethod.POST)
	public List<Goal> queryGoals_nofilters() {
		// Find all entities of type Conference
		Query<Goal> query = ofy().load().type(Goal.class).order("name");

		return query.list();
	}

	public List<Goalsetter> queryforallgoalsetters() {

		Query<Goalsetter> query = ofy().load().type(Goalsetter.class)
				.order("name");

		return query.list();

	}

	public List<Client> queryforallClients() {

		Query<Client> query = ofy().load().type(Client.class).order("name");

		return query.list();

	}

	@ApiMethod(name = "queryGoalsetters_nofilters", path = "queryGoalsetters_nofilters", httpMethod = HttpMethod.POST)
	public List<Goalsetter> queryGoalsetters_nofilters(final User user)
			throws UnauthorizedException {
		// Find all entities of type Goalsetter
		//if (user == null) {
			//throw new UnauthorizedException("Authorization required");
		//}
		Query<Goalsetter> query = ofy().load().type(Goalsetter.class)
				.order("name");

		return query.list();

	}

	@ApiMethod(name = "checkforregisteredusers", path = "checkforregisteredusers", httpMethod = HttpMethod.POST)
	public Goalsetter checkforregisteredusers(
			@Named("emailaddress") String emailaddress,final User user) {
		// Find all entities of type Goalsetter
		Query<Goalsetter> query = ofy().load().type(Goalsetter.class);
		for (int i = 0; i < query.list().size(); i++) {
			if (query.list().get(i).getemailaddress().equals(emailaddress)) {
				return query.list().get(i);
			}
		}
		return null;
	}

	@ApiMethod(name = "queryreports_nofilters", path = "queryreports_nofilters", httpMethod = HttpMethod.POST)
	public List<Evaluate> queryreports_nofilters(User user) {
		// Find all entities of type Evaluate

		Query<Evaluate> query = ofy().load().type(Evaluate.class);

		return query.list();
	}

	/**
	 * Queries against the datastore with the given filters and returns the
	 * result.
	 *
	 * Normally this kind of method is supposed to get invoked by a GET HTTP
	 * method, but we do it with POST, in order to receive conferenceQueryForm
	 * Object via the POST body.
	 *
	 * @param conferenceQueryForm
	 *            A form object representing the query.
	 * @return A List of Conferences that match the query.
	 */
	@ApiMethod(name = "queryClients", path = "queryClients", httpMethod = HttpMethod.POST)
	public List<Client> queryClients(ConferenceQueryForm conferenceQueryForm) {
		Iterable<Client> conferenceIterable = conferenceQueryForm.getQuery();
		List<Client> result = new ArrayList<>(0);
		List<Key<Profile>> organizersKeyList = new ArrayList<>(0);
		for (Client conference : conferenceIterable) {
			organizersKeyList.add(Key.create(Profile.class,
					conference.getOrganizerUserId()));
			result.add(conference);
		}
		// To avoid separate datastore gets for each Conference, pre-fetch the
		// Profiles.
		ofy().load().keys(organizersKeyList);
		return result;
	}

	/**
	 * Returns a list of Conferences that the user created. In order to receive
	 * the websafeConferenceKey via the JSON params, uses a POST method.
	 *
	 * @param user
	 *            A user who invokes this method, null when the user is not
	 *            signed in.
	 * @return a list of Conferences that the user created.
	 * @throws UnauthorizedException
	 *             when the user is not signed in.
	 */
	@ApiMethod(name = "getConferencesCreated", path = "getConferencesCreated", httpMethod = HttpMethod.POST)
	public List<Goal> getConferencesCreated(final User user)
			throws UnauthorizedException {
		// If not signed in, throw a 401 error.
		if (user == null) {
			throw new UnauthorizedException("Authorization required");
		}
		String userId = user.getUserId();
		Key<Profile> userKey = Key.create(Profile.class, userId);
		return ofy().load().type(Goal.class).ancestor(userKey).order("name")
				.list();
	}
	
	public List<Client> getallClients(final User user)
	{
		Key<Profile> userKey = Key.create(Profile.class, user.getUserId());
		List<Goalsetter> goalsetterlist1=  ofy().load().type(Goalsetter.class)
                .ancestor(userKey)
                .list();
		List<Goalsetter> goalsetterlist = queryforallgoalsetters();
		for(int i =0 ; i < goalsetterlist.size() ; i++)
		{
			if(goalsetterlist.get(i).getemailaddress().equals(user.getEmail()))
			{
				return goalsetterlist.get(i).getclients();
			}
		}
		return null;
				
	}

	@ApiMethod(name = "getallClientsforGoalsetter", path = "getallClientsforGoalsetter", httpMethod = HttpMethod.POST)
	public List<Client> getallClientsforGoalsetter(final User user)
			throws UnauthorizedException {
		// If not signed in, throw a 401 error.
		if (user == null) {
			throw new UnauthorizedException("Authorization required");
		}
		
		Key<Profile> userKey = Key.create(Profile.class, user.getUserId());
		List<Goalsetter> goalsetterlist1=  ofy().load().type(Goalsetter.class)
                .ancestor(userKey)
                .list();
		List<Goalsetter> goalsetterlist = queryforallgoalsetters();
		for(int i =0 ; i < goalsetterlist.size() ; i++)
		{
			if(goalsetterlist.get(i).getemailaddress().equals(user.getEmail()))
			{
				return goalsetterlist.get(i).getclients();
			}
				
		}
		return null;
	}

	/**
	 * Returns a Conference object with the given conferenceId.
	 *
	 * @param websafeConferenceKey
	 *            The String representation of the Conference Key.
	 * @return a Conference object with the given conferenceId.
	 * @throws NotFoundException
	 *             when there is no Conference with the given conferenceId.
	 */
	@ApiMethod(name = "getGoalEvaluate", path = "goal/{websafeConferenceKey}", httpMethod = HttpMethod.GET)
	public List<Evaluate> getGoalEvaluate(
			@Named("websafeConferenceKey") final String websafeConferenceKey)
			throws NotFoundException {
		Key<Goal> conferenceKey = Key.create(websafeConferenceKey);
		Goal conference = ofy().load().key(conferenceKey).now();
		
		if (conference == null) {
			//Evaluate evalte = new Evaluate(conference.getName(),conference.getOrganizerUserId(),websafeConferenceKey, null);
			//conference.getListofevaluations().add(evalte);
			//conference.getListofevaluations().get(0).setGoalwebsafekey(websafeConferenceKey);
		}
		return conference.getListofevaluations();
	}
	
	@ApiMethod(name = "getgoalsetter", path = "goalsetterdetail/{websafegaolsetterKey}", httpMethod = HttpMethod.GET)
	public Goalsetter getgoalsetter(
			@Named("websafegaolsetterKey") final String websafegaolsetterKey)
			throws NotFoundException {
		Key<Goalsetter> goalsetterkey = Key.create(websafegaolsetterKey);
		Goalsetter goalsetter = ofy().load().key(goalsetterkey).now();		
		return goalsetter;
	}
	
	@ApiMethod(name ="getclient", path = "clientdetail/{clientwebsafekey}", httpMethod = HttpMethod.GET)
	public Client getclient(
			@Named("clientwebsafekey") final String clientwebsafekey)
			throws NotFoundException {
		Key<Client> clientkey = Key.create(clientwebsafekey);
		Client client = ofy().load().key(clientkey).now();		
		return client;
	}
	
	@ApiMethod(name ="getgoal", path = "conference_detail/{goalkey}", httpMethod = HttpMethod.GET)
	public Goal getgoal(
			@Named("goalkey") final String goalkey)
			throws NotFoundException {
		Key<Goal> glkey = Key.create(goalkey);
		Goal goal = ofy().load().key(glkey).now();		
		return goal;
	}

	@ApiMethod(name = "getClientsfromGoalsetter", path = "/showclients/{goalsetterwebsafekey}", httpMethod = HttpMethod.GET)
	public List<Client> getClientsfromGoalsetter(
			@Named("goalsetterwebsafekey") final String goalsetterwebsafekey)
			throws NotFoundException {
		Key<Goalsetter> goalsetterKey = Key.create(goalsetterwebsafekey);
		Goalsetter goalsetter = ofy().load().key(goalsetterKey).now();
		if (goalsetter == null) {
			throw new NotFoundException("No Conference found with key: "
					+ goalsetter);
		}
		return goalsetter.getclients();
	}

	@ApiMethod(name = "getgoalsfromclients", path = "showgoals/{clientwebsafekey}", httpMethod = HttpMethod.GET)
	public List<Goal> getgoalsfromclients(
			@Named("clientwebsafekey") final String clientwebsafekey)
			throws NotFoundException {
		Key<Client> clientkey = Key.create(clientwebsafekey);
		Client client = ofy().load().key(clientkey).now();
		if (client == null) {
			throw new NotFoundException("No client found with key: " + client);
		}
		return client.getGoals();
	}

	@ApiMethod(name = "getAnnouncement", path = "announcement", httpMethod = HttpMethod.GET)
	public Announcement getAnnouncement() {
		MemcacheService memcacheService = MemcacheServiceFactory
				.getMemcacheService();
		Object message = memcacheService
				.get(Constants.MEMCACHE_ANNOUNCEMENTS_KEY);
		if (message != null) {
			return new Announcement(message.toString());
		}
		return null;
	}

}
