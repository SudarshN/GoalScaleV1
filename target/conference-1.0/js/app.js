'use strict';

/**
 * @ngdoc object
 * @name conferenceApp
 * @requires $routeProvider
 * @requires conferenceControllers
 * @requires ui.bootstrap
 * 
 * @description Root app, which routes and specifies the partial html and
 *              controller depending on the url requested.
 * 
 */
var app = angular.module('conferenceApp',
		[ 'conferenceControllers', 'ngRoute', 'ui.bootstrap' ]).config(
		[ '$routeProvider', function($routeProvider) {

			$routeProvider
			.when('/goal/detail/:websafeConferenceKey', {
				templateUrl : '/partials/admin/goal_detail.html',
				controller : 'GoalDetailCtrl'
			}).
			
			when('/goalsetter/goal/detail/:websafeConferenceKey', {
				templateUrl : '/partials/goalsetter/goal_detail.html',
				controller : 'GoalDetailCtrl'
			}).
			when('/goal/detail/:websafeConferenceKey/Evaluations', {
				templateUrl : '/partials/conference_detail.html',
				controller : 'GoalDetailCtrl'
			}).
			
			when('/goalsetter/goal/detail/:websafeConferenceKey/Evaluations', {
				templateUrl : '/partials/goalsetter/conference_detail.html',
				controller : 'GoalDetailCtrl'
			}).
			
			when('/profile', {
				templateUrl : '/partials/profile.html',
				controller : 'MyProfileCtrl'
			}).
			
			when('/Showgoalsetters', {
				templateUrl : '/partials/admin/Showgoalsetters.html',
				controller : 'ShowGoalsettersCtrl'
			}).
			when('/goalsetter/client',{
				templateUrl : '/partials/goalsetter/client.html',
				controller : 'CreateClientforGoalsetterCtrl'
			}).
			
			when('/goalsetterdetail/:websafegaolsetterKey', {
				templateUrl : '/partials/admin/Goalsetterdetail.html',
				controller : 'ShowGoalsettersCtrl'
			}).
			when('/updategoalsetter/:websafegaolsetterKey/Update', {
				templateUrl : '/partials/admin/UpdateGoalsetter.html',
				controller : 'updateGoalsetterCtrl'
			}).
			when('/updateClient/:clientwebsafekey/Update', {
				templateUrl : '/partials/admin/UpdateClient.html',
				controller : 'updateClientCtrl'
			}).
			when('/updateGoal/:goalkey/Update', {
				templateUrl : '/partials/admin/UpdateGoal.html',
				controller : 'updateGoalCtrl'
			}).
			when('/showclients/:goalsetterwebsafekey', {
				templateUrl : '/partials/showclients.html',
				controller : 'ShowClientCtrl'
			}).
			when('/viewreports', {
				templateUrl : '/partials/Viewreport.html',
				controller : 'ViewreportCtrl'
			}).
			
			when('/createclient/:goalsetterwebsafekey',{
				templateUrl : '/partials/client.html',
				controller : 'CreateClientCtrl'
			}).
			
			when('/clientdetail/:clientwebsafekey',{
				templateUrl : '/partials/admin/Clientdetail.html',
				controller : 'CreateClientCtrl'
			}).
			
			when('/goalsetter/clientdetail/:clientwebsafekey',{
				templateUrl : '/partials/goalsetter/Clientdetail.html',
				controller : 'CreateClientCtrl'
			}).

			when('/showgoals/:clientwebsafekey', {
				templateUrl : '/partials/show_conferences.html',
				controller : 'ShowGoalCtrl'
			}).
			
			when('/goalsetter/showgoals/:clientwebsafekey', {
				templateUrl : '/partials/goalsetter/show_conferences.html',
				controller : 'ShowGoalCtrl'
			}).
			
			when('/goalsetter/showgoals/:websafeclientKey', {
				templateUrl : '/partials/goalsetter/show_conferences.html',
				controller : 'ShowGoalCtrl'
			}).
			
			when('/createGoal/:clientwebsafekey', {
				templateUrl : '/partials/create_conferences.html',
				controller : 'CreateGoalCtrl'
			}).
			
			when('/goalsetter/createGoal/:clientwebsafekey', {
				templateUrl : '/partials/goalsetter/create_conferences.html',
				controller : 'CreateGoalCtrl'
			}).
			
			when('/goalsetter/createGoal/:websafeclientKey', {
				templateUrl : '/partials/goalsetter/create_conferences.html',
				controller : 'CreateGoalCtrl'
			}).

			when('/admin/home', {
				templateUrl : '/partials/admin/home.html',
				controller : 'ShowGoalsettersCtrl'
			}).
			
			when('/goalsetter/home', {
				templateUrl : '/partials/goalsetter/home.html',
				controller : 'ShowClientforGoalsetterCtrl'
			}).

			when('/goalsetter/showclients', {
				templateUrl : '/partials/goalsetter/showclients.html',
				controller : 'ShowClientforGoalsetterCtrl'
			}).when('/', {
				templateUrl : '/partials/login.modal.html'
			}).when('/goalsetter', {
				templateUrl : '/partials/goalsetter.html',
				controller : 'CreateGoalSetterCtrl'
			}).when('/goal/detail/:websafeConferenceKey/Evaluate', {
				templateUrl : '/partials/Evaluate.html',
				controller : 'EvaluateCtrl'
			}).
			when('/goalsetter/goal/detail/:websafeConferenceKey/Evaluate', {
				templateUrl : '/partials/goalsetter/Evaluate.html',
				controller : 'EvaluateCtrl'
			}).

			when('/reports', {
				templateUrl : '/partials/showreports.html',
				controller : 'ShowReportCtrl'
			}).

			otherwise({
				redirectTo : '/'
			});
		} ]);

/**
 * @ngdoc filter
 * @name startFrom
 * 
 * @description A filter that extracts an array from the specific index.
 * 
 */
app.filter('startFrom', function() {
	/**
	 * Extracts an array from the specific index.
	 * 
	 * @param {Array}
	 *            data
	 * @param {Integer}
	 *            start
	 * @returns {Array|*}
	 */
	var filter = function(data, start) {
		return data.slice(start);
	}
	return filter;
});

/**
 * @ngdoc constant
 * @name HTTP_ERRORS
 * 
 * @description Holds the constants that represent HTTP error codes.
 * 
 */
app.constant('HTTP_ERRORS', {
	'UNAUTHORIZED' : 401
});

/**
 * @ngdoc service
 * @name oauth2Provider
 * 
 * @description Service that holds the OAuth2 information shared across all the
 *              pages.
 * 
 */
app.factory('oauth2Provider',
				function($modal) {
					var oauth2Provider = {
						CLIENT_ID : '841290731383-51toj55ied9tkr448kr99uktnmsm5hs4.apps.googleusercontent.com',
						SCOPES : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
						signedIn : false
					};

					/**
					 * Calls the OAuth2 authentication method.
					 */
					oauth2Provider.signIn = function(callback) {
						gapi.auth.signIn({
							'clientid' : oauth2Provider.CLIENT_ID,
							'cookiepolicy' : 'single_host_origin',
							'accesstype' : 'online',
							'approveprompt' : 'auto',
							'scope' : oauth2Provider.SCOPES,
							'callback' : callback
						});
					};

					/**
					 * Logs out the user.
					 */
					oauth2Provider.signOut = function() {
						gapi.auth.signOut();
						// Explicitly set the invalid access token in order to
						// make the API calls fail.
						gapi.auth.setToken({
							access_token : ''
						})
						oauth2Provider.signedIn = false;
					};

					/**
					 * Shows the modal with Google+ sign in button.
					 * 
					 * @returns {*|Window}
					 */
					oauth2Provider.showLoginModal = function() {
						var modalInstance = $modal.open({
							templateUrl : '/partials/login.modal.html',
							controller : 'OAuth2LoginModalCtrl'
						});
						return modalInstance;
					};

					return oauth2Provider;
				});

app.factory('storage', [
		'$window',
		function($window) {
			return {
				memorize : function(value) {
					try {
						if ($window.Storage) {
							$window.sessionStorage.setItem('tasks',
									$window.JSON.stringify(value));
							return true;
						} else {
							return false;
						}
					} catch (error) {
						console.error(error, error.message);
					}
					return false;
				},
				recall : function() {
					try {
						if ($window.Storage) {
							return $window.JSON.parse($window.sessionStorage
									.getItem('tasks'))
						} else {
							return false;
						}
					} catch (error) {
						console.error(error, error.message);
					}
					return false;
				}
			}
		} ]);
