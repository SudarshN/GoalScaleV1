'use strict';

/**
 * The root conferenceApp module.
 * 
 * @type {conferenceApp|*|{}}
 */
var conferenceApp = conferenceApp || {};

/**
 * @ngdoc module
 * @name conferenceControllers
 * 
 * @description Angular module for controllers.
 * 
 */
conferenceApp.controllers = angular.module('conferenceControllers',
		[ 'ui.bootstrap' ]);

/**
 * @ngdoc controller
 * @name MyProfileCtrl
 * 
 * @description A controller used for the My Profile page.
 */
conferenceApp.controllers.controller('MyProfileCtrl', function($scope, $log,
		oauth2Provider, HTTP_ERRORS) {
	$scope.submitted = false;
	$scope.loading = false;

	$scope.doTheBack = function() {
		window.history.back();
	};

	/**
	 * The initial profile retrieved from the server to know the dirty state.
	 * 
	 * @type {{}}
	 */
	$scope.initialProfile = {};

	/**
	 * Initializes the My profile page. Update the profile if the user's profile
	 * has been stored.
	 */
	$scope.init = function() {
		var retrieveProfileCallback = function() {
			$scope.profile = {};
			$scope.loading = true;
			gapi.client.goalscale.getProfile().execute(function(resp) {
				$scope.$apply(function() {
					$scope.loading = false;
					if (resp.error) {
						// Failed to get a user profile.
					} else {
						// Succeeded to get the user profile.
						$scope.profile.displayName = resp.result.displayName;

						$scope.initialProfile = resp.result;
					}
				});
			});
		};
		if (!oauth2Provider.signedIn) {
			var modalInstance = oauth2Provider.showLoginModal();
			modalInstance.result.then(retrieveProfileCallback);
		} else {
			retrieveProfileCallback();
		}
	};

	/**
	 * Invokes the conference.saveProfile API.
	 * 
	 */
	$scope.saveProfile = function() {
		$scope.submitted = true;
		$scope.loading = true;
		gapi.client.goalscale.saveProfile($scope.profile).execute(
				function(resp) {
					$scope.$apply(function() {
						$scope.loading = false;
						if (resp.error) {
							// The request has failed.
							var errorMessage = resp.error.message || '';
							$scope.messages = 'Failed to update a profile : '
									+ errorMessage;
							$scope.alertStatus = 'warning';
							$log.error($scope.messages + 'Profile : '
									+ JSON.stringify($scope.profile));

							if (resp.code
									&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
								oauth2Provider.showLoginModal();
								return;
							}
						} else {
							// The request has succeeded.
							$scope.messages = 'The profile has been updated';
							$scope.alertStatus = 'success';
							$scope.submitted = false;
							$scope.initialProfile = {
								displayName : $scope.profile.displayName,

							};

							$log.info($scope.messages
									+ JSON.stringify(resp.result));
						}
					});
				});
	};
});
/**
 * *********************************Update Goalsetter
 * Ctrl***********************************
 */
conferenceApp.controllers
		.controller(
				'updateGoalsetterCtrl',
				function($scope, $routeParams, $log, oauth2Provider,
						HTTP_ERRORS) {
					$scope.submitted = false;
					$scope.loading = false;

					$scope.doTheBack = function() {
						window.history.back();
					};

					$scope.roles = [ 'ADMIN', 'GOALSETTER' ];

					/**
					 * The initial profile retrieved from the server to know the
					 * dirty state.
					 * 
					 * @type {{}}
					 */
					$scope.initialGoalsetter = {};

					/**
					 * Initializes the My profile page. Update the profile if
					 * the user's profile has been stored.
					 */
					$scope.init = function() {
						var retrieveGoalsetter = function() {
							$scope.goalsetter = {};
							$scope.loading = true;
							gapi.client.goalscale
									.getgoalsetter(
											{
												websafegaolsetterKey : $routeParams.websafegaolsetterKey
											})
									.execute(
											function(resp) {
												$scope
														.$apply(function() {
															$scope.loading = false;
															if (resp.error) {
																// Failed to get
																// a user
																// profile.
															} else {
																// Succeeded to
																// get the user
																// profile.
																$scope.goalsetter.name = resp.result.name;
																$scope.goalsetter.role = resp.result.role;
																$scope.goalsetter.description = resp.result.description;
																$scope.goalsetter.emailaddress = resp.result.emailaddress;
																$scope.initialGoalsetter = resp.result;
															}
														});
											});
						};
						if (!oauth2Provider.signedIn) {
							var modalInstance = oauth2Provider.showLoginModal();
							modalInstance.result.then(retrieveGoalsetter);
						} else {
							retrieveGoalsetter();
						}
					};

					/**
					 * Invokes the conference.saveProfile API.
					 * 
					 */
					$scope.saveGoalsetter = function() {
						$scope.submitted = true;
						$scope.loading = true;
						gapi.client.goalscale
								.saveGoalsetter(
										{
											websafegaolsetterKey : $routeParams.websafegaolsetterKey
										}, $scope.goalsetter)
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to update a profile : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages
																			+ 'Profile : '
																			+ JSON
																					.stringify($scope.profile));

															if (resp.code
																	&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
																oauth2Provider
																		.showLoginModal();
																return;
															}
														} else {
															// The request has
															// succeeded.
															$scope.messages = 'The profile has been updated';
															$scope.alertStatus = 'success';
															$scope.submitted = false;
															$scope.initialProfile = {
																displayName : $scope.goalsetter.name,

															};

															$log
																	.info($scope.messages
																			+ JSON
																					.stringify(resp.result));
														}
													});
										});
					};
				});

/**
 * *********************************Update Goalsetter
 * Ctrl***********************************
 */
conferenceApp.controllers
		.controller(
				'updateClientCtrl',
				function($scope, $routeParams, $log, oauth2Provider,
						HTTP_ERRORS) {
					$scope.submitted = false;
					$scope.loading = false;

					$scope.doTheBack = function() {
						window.history.back();
					};

					$scope.initialClient = {};

					/**
					 * Initializes the My profile page. Update the profile if
					 * the user's profile has been stored.
					 */
					$scope.init = function() {
						var retrieveClient = function() {
							$scope.client = {};
							$scope.loading = true;
							gapi.client.goalscale
									.getclient(
											{
												clientwebsafekey : $routeParams.clientwebsafekey
											})
									.execute(
											function(resp) {
												$scope
														.$apply(function() {
															$scope.loading = false;
															if (resp.error) {
																// Failed to get
																// a user
																// profile.
															} else {
																// Succeeded to
																// get the user
																// profile.
																$scope.client.name = resp.result.name;
																$scope.client.location = resp.result.location;
																$scope.client.medicalRecordNumber = resp.result.medicalRecordNumber;
																$scope.client.age = resp.result.age;
																$scope.client.description = resp.result.description;
																$scope.initialClient = resp.result;
															}
														});
											});
						};
						if (!oauth2Provider.signedIn) {
							var modalInstance = oauth2Provider.showLoginModal();
							modalInstance.result.then(retrieveProfileCallback);
						} else {
							retrieveClient();
						}
					};

					$scope.saveClient = function() {
						$scope.submitted = true;
						$scope.loading = true;
						gapi.client.goalscale
								.saveClient(
										{
											clientwebsafekey : $routeParams.clientwebsafekey
										}, $scope.client)
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to update a profile : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages
																			+ 'Profile : '
																			+ JSON
																					.stringify($scope.profile));

															if (resp.code
																	&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
																oauth2Provider
																		.showLoginModal();
																return;
															}
														} else {
															// The request has
															// succeeded.
															$scope.messages = 'The profile has been updated';
															$scope.alertStatus = 'success';
															$scope.submitted = false;
															$scope.initialProfile = {
																name : $scope.client.name,

															};

															$log
																	.info($scope.messages
																			+ JSON
																					.stringify(resp.result));
														}
													});
										});
					};
				});
/** ****************************************************************************************** */
/** *********************************updateGoalCtrl*********************************** */
conferenceApp.controllers.controller('updateGoalCtrl', function($scope,
		$routeParams, $log, oauth2Provider, HTTP_ERRORS) {
	$scope.submitted = false;
	$scope.loading = false;

	$scope.doTheBack = function() {
		window.history.back();
	};

	$scope.initialgoal = {};
	$scope.goal = {};
	/**
	 * Initializes the My profile page. Update the profile if the user's profile
	 * has been stored.
	 */
	$scope.init = function() {
		var retrieveGoal = function() {

			$scope.loading = true;
			gapi.client.goalscale.getgoal({
				goalkey : $routeParams.goalkey
			}).execute(function(resp) {
				$scope.$apply(function() {
					$scope.loading = false;
					if (resp.error) {
						// Failed to get a user profile.
					} else {
						// Succeeded to get the user profile.
						$scope.goal.name = resp.result.name;
						$scope.goal.description = resp.result.description;
						$scope.goal.minustwoscale = resp.result.minustwoscale;
						$scope.goal.minusonescale = resp.result.minusonescale;
						$scope.goal.zeroscale = resp.result.zeroscale;
						$scope.goal.plustwoscale = resp.result.plustwoscale;
						$scope.goal.plusonescale = resp.result.plusonescale;
						$scope.goal.startDate = resp.result.startDate;
						$scope.goal.endDate = resp.result.endDate;
						$scope.initialgoal = resp.result;
					}
				});
			});
		};
		if (!oauth2Provider.signedIn) {
			var modalInstance = oauth2Provider.showLoginModal();
			modalInstance.result.then(retrieveProfileCallback);
		} else {
			retrieveGoal();
		}
	};

	$scope.saveGoal = function() {
		$scope.submitted = true;
		$scope.loading = true;
		gapi.client.goalscale.saveGoal({
			goalkey : $routeParams.goalkey
		}, $scope.goal).execute(
				function(resp) {
					$scope.$apply(function() {
						$scope.loading = false;
						if (resp.error) {
							// The request has failed.
							var errorMessage = resp.error.message || '';
							$scope.messages = 'Failed to update a profile : '
									+ errorMessage;
							$scope.alertStatus = 'warning';
							$log.error($scope.messages + 'Profile : '
									+ JSON.stringify($scope.goal));

							if (resp.code
									&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
								oauth2Provider.showLoginModal();
								return;
							}
						} else {
							// The request has succeeded.
							$scope.messages = 'The profile has been updated';
							$scope.alertStatus = 'success';
							$scope.submitted = false;
							$scope.initialgoal = {
								name : $scope.goal.name,

							};

							$log.info($scope.messages
									+ JSON.stringify(resp.result));
						}
					});
				});
	};
});
/**
 * @ngdoc controller
 * @name CreateConferenceCtrl
 * 
 * @description A controller used for the Create conferences page.
 */
conferenceApp.controllers.controller('CreateGoalCtrl', function($scope,
		$window, $routeParams, $log, oauth2Provider, HTTP_ERRORS) {

	/**
	 * The conference object being edited in the page.
	 * 
	 * @type {{}|*}
	 */
	$scope.Goal = $scope.Goal || {};

	if (!oauth2Provider.signedIn) {
		$window.location.assign('/');
		return;
	}

	$scope.doTheBack = function() {
		window.history.back();
	};

	/**
	 * Invokes the createGoal API.
	 * 
	 * @param conferenceForm
	 *            the form object.
	 */
	$scope.createGoal = function(GoalForm) {
		// console.log($scope.goal)
		console.log(GoalForm.Clientname);
		console.log($scope.Goal.Clientname);
		$scope.loading = true;
		gapi.client.goalscale.createGoal({
			clientwebsafekey : $routeParams.clientwebsafekey
		}, $scope.Goal).execute(
				function(resp) {
					$scope.$apply(function() {
						$scope.loading = false;
						if (resp.error) {
							// The request has failed.
							var errorMessage = resp.error.message || '';
							$scope.messages = 'Failed to create a goal : '
									+ errorMessage;
							$scope.alertStatus = 'warning';
							$log.error($scope.messages + ' Goal : '
									+ JSON.stringify($scope.Goal));

							if (resp.code
									&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
								oauth2Provider.showLoginModal();
								return;
							}
						} else {
							// The request has succeeded.
							$scope.messages = 'The Goal has been created : '
									+ resp.result;
							$scope.alertStatus = 'success';
							$scope.submitted = false;
							$scope.Goal = {};
							$log.info($scope.messages + ' : '
									+ JSON.stringify(resp.result));
						}
					});
				});
	};
});

/**
 * @ngdoc controller
 * @name CreateClientCtrl
 * 
 * @description A controller used for the Create client page.
 */
conferenceApp.controllers.controller('CreateClientCtrl', function($scope,
		$window, $log, $routeParams, oauth2Provider, HTTP_ERRORS) {

	/**
	 * The conference object being edited in the page.
	 * 
	 * @type {{}|*}
	 */

	$scope.doTheBack = function() {
		window.history.back();
	};

	$scope.Client = $scope.Client || {};

	if (!oauth2Provider.signedIn) {
		$window.location.assign('/');
		return;
	}

	/**
	 * Invokes the goalscale.createUser API.
	 * 
	 * @param conferenceForm
	 *            the form object.
	 */
	$scope.createUser = function(ClientForm) {
		// console.log($scope.goal)

		$scope.loading = true;

		gapi.client.goalscale.createUser({
			goalsetterwebsafekey : $routeParams.goalsetterwebsafekey
		}, $scope.Client).execute(
				function(resp) {
					$scope.$apply(function() {
						$scope.loading = false;
						if (resp.error) {
							// The request has failed.
							var errorMessage = resp.error.message || '';
							$scope.messages = 'Failed to create a Client : '
									+ errorMessage;
							$scope.alertStatus = 'warning';
							$log.error($scope.messages + ' Client : '
									+ JSON.stringify($scope.Goal));

							if (resp.code
									&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
								oauth2Provider.showLoginModal();
								return;
							}
						} else {
							// The request has succeeded.
							$scope.messages = 'The Client has been created : '
									+ resp.result.id;
							$scope.alertStatus = 'success';
							$scope.submitted = false;
							$scope.Client = {};
							$log.info($scope.messages + ' : '
									+ JSON.stringify(resp.result));
						}
					});
				});
	};
});
/** ****************** */
/* start of EvaluateReportCtrl */
/** **************************** */
/**
 * @ngdoc controller
 * @name EvaluateCtrl
 * 
 * @description A controller used for the Create client page.
 */
conferenceApp.controllers
		.controller(
				'EvaluateCtrl',
				function($scope, $window, $log, $routeParams, oauth2Provider,
						HTTP_ERRORS) {

					$scope.doTheBack = function() {
						window.history.back();
					};

					/**
					 * The conference object being edited in the page.
					 * 
					 * @type {{}|*}
					 */
					$scope.Evaluate = $scope.Evaluate || {};

					if (!oauth2Provider.signedIn) {
						$window.location.assign('/');
						return;
					}

					$scope.score = {
						minustwo : -2,
						minusone : -1,
						zero : 0,
						plustwo : 2,
						plusone : 1
					};

					/**
					 * Invokes the goalscale.createUser API.
					 * 
					 * @param conferenceForm
					 *            the form object.
					 */
					$scope.createReport = function(EvaluationForm) {
						// console.log($scope.goal)
						if ($scope.score.plustwo == true)
							$scope.Evaluate.score = 2;
						if ($scope.score.plusone == true)
							$scope.Evaluate.score = 1;
						if ($scope.score.minusone == true)
							$scope.Evaluate.score = -1;
						if ($scope.score.minustwo == true)
							$scope.Evaluate.score = -2;
						if ($scope.score.zero == true)
							$scope.Evaluate.score = 0;

						$scope.loading = true;

						gapi.client.goalscale
								.createReport(
										{
											websafeConferenceKey : $routeParams.websafeConferenceKey
										}, $scope.Evaluate)
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to create a Report : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages
																			+ ' User : '
																			+ JSON
																					.stringify($scope.Goal));

															if (resp.code
																	&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
																oauth2Provider
																		.showLoginModal();
																return;
															}
														} else {
															// The request has
															// succeeded.
															$scope.messages = 'The Report has been created for: '
																	+ resp.result;
															$scope.alertStatus = 'success';
															$scope.submitted = false;
															$scope.Evaluate = {};
															$log
																	.info($scope.messages
																			+ ' : '
																			+ JSON
																					.stringify(resp.result));
														}
													});
										});
					};
				});

/**
 * @ngdoc controller
 * @name CreateGoalSetterCtrl
 * 
 * @description A controller used for the Create client page.
 */
conferenceApp.controllers
		.controller(
				'CreateGoalSetterCtrl',
				function($scope, $window, $log, oauth2Provider, HTTP_ERRORS) {

					$scope.doTheBack = function() {
						window.history.back();
					};

					/**
					 * The Goalsetter object being edited in the page.
					 * 
					 * @type {{}|*}
					 */

					if (!oauth2Provider.signedIn) {
						$window.location.assign('/');
						return;
					}
					$scope.Goalsetter = $scope.Goalsetter || {};

					$scope.roles = [ 'ADMIN', 'GOALSETTER',

					];

					/**
					 * Invokes the conference.createConference API.
					 * 
					 * @param conferenceForm
					 *            the form object.
					 */
					$scope.creategoalsetter = function(GoalsetterForm) {
						// console.log($scope.goal)

						$scope.loading = true;
						gapi.client.goalscale
								.createGoalsetter($scope.Goalsetter)
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to create a GoalSetter : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages
																			+ ' User : '
																			+ JSON
																					.stringify($scope.Goalsetter));

															if (resp.code
																	&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
																oauth2Provider
																		.showLoginModal();
																return;
															}
														} else {
															// The request has
															// succeeded.
															$scope.messages = 'The GoalSetter has been created : '
																	+ resp.result.name;
															$scope.alertStatus = 'success';
															$scope.submitted = false;
															$scope.Goalsetter = {};
															$log
																	.info($scope.messages
																			+ ' : '
																			+ JSON
																					.stringify(resp.result));
														}
													});
										});
					};
				});

conferenceApp.controllers.controller('ShowGoalCtrl', function($scope, $window,
		$routeParams, $log, oauth2Provider, HTTP_ERRORS) {

	/**
	 * Holds the status if the query is being executed.
	 * 
	 * @type {boolean}
	 */
	$scope.doTheBack = function() {
		window.history.back();
	};

	if (!oauth2Provider.signedIn) {
		$window.location.assign('/');
		return;
	}

	$scope.submitted = false;

	$scope.selectedTab = 'ALL';

	$scope.filters = [];

	$scope.filtereableFields = [ {
		enumValue : 'NAME',
		displayName : 'Name'
	}, {
		enumValue : 'DESCRIPTION',
		displayName : 'description'
	}, {
		enumValue : '-1SCALE',
		displayName : '-1SCALE'
	}, {
		enumValue : '-2SCALE',
		displayName : '-2SCALE'
	}, {
		enumValue : '0SCALE',
		displayName : '0SCALE'
	}, {
		enumValue : '+1SCALE',
		displayName : '+1SCALE'
	}, {
		enumValue : '+2SCALE',
		displayName : '+2SCALE'
	}, {
		enumValue : 'startdate',
		displayName : 'startdate'
	}, {
		enumValue : 'enddate',
		displayName : 'enddate'
	}, ]

	/**
	 * Possible operators.
	 * 
	 * @type {{displayName: string, enumValue: string}[]}
	 */
	$scope.operators = [ {
		displayName : '=',
		enumValue : 'EQ'
	}, {
		displayName : '>',
		enumValue : 'GT'
	}, {
		displayName : '>=',
		enumValue : 'GTEQ'
	}, {
		displayName : '<',
		enumValue : 'LT'
	}, {
		displayName : '<=',
		enumValue : 'LTEQ'
	}, {
		displayName : '!=',
		enumValue : 'NE'
	} ];

	/**
	 * Holds the conferences currently displayed in the page.
	 * 
	 * @type {Array}
	 */
	$scope.goals = [];

	/**
	 * Holds the state if offcanvas is enabled.
	 * 
	 * @type {boolean}
	 */
	$scope.isOffcanvasEnabled = false;

	/**
	 * Sets the selected tab to 'ALL'
	 */
	$scope.tabAllSelected = function() {
		$scope.selectedTab = 'ALL';
		if (!oauth2Provider.signedIn) {
			$window.location.assign('/');
			return;
		}
		$scope.queryGoals();
	};

	$scope.searchname = "";
	$scope.querygoal = function(searchname)
	{
		console.log(searchname);
		gapi.client.goalscale.searchgoal(
				{'searchname':$scope.searchname}).execute(function(resp){
					
						$scope.$apply(function() {
							if (resp.error) {
								
							}
							else
								{
								console.log(resp.result.name);
								$scope.goals = [];
								angular.forEach(resp.items, function(Goal) {
									$scope.goals.push(Goal);
								});
								}
						});
				});
	};

	/**
	 * Toggles the status of the offcanvas.
	 */
	$scope.toggleOffcanvas = function() {
		$scope.isOffcanvasEnabled = !$scope.isOffcanvasEnabled;
	};

	/**
	 * Namespace for the pagination.
	 * 
	 * @type {{}|*}
	 */
	$scope.pagination = $scope.pagination || {};
	$scope.pagination.currentPage = 0;
	$scope.pagination.pageSize = 20;
	/**
	 * Returns the number of the pages in the pagination.
	 * 
	 * @returns {number}
	 */
	$scope.pagination.numberOfPages = function() {
		return Math.ceil($scope.goals.length / $scope.pagination.pageSize);
	};

	/**
	 * Returns an array including the numbers from 1 to the number of the pages.
	 * 
	 * @returns {Array}
	 */
	$scope.pagination.pageArray = function() {
		var pages = [];
		var numberOfPages = $scope.pagination.numberOfPages();
		for ( var i = 0; i < numberOfPages; i++) {
			pages.push(i);
		}
		return pages;
	};

	/**
	 * Checks if the target element that invokes the click event has the
	 * "disabled" class.
	 * 
	 * @param event
	 *            the click event
	 * @returns {boolean} if the target element that has been clicked has the
	 *          "disabled" class.
	 */
	$scope.pagination.isDisabled = function(event) {
		return angular.element(event.target).hasClass('disabled');
	}

	/**
	 * Removes the filter specified by the index from $scope.filters.
	 * 
	 * @param index
	 */

	$scope.queryGoals = function() {
		$scope.submitted = false;
		if ($scope.selectedTab == 'ALL') {
			$scope.queryConferencesAll();
		} else if ($scope.selectedTab == 'YOU_HAVE_CREATED') {
			$scope.getConferencesCreated();
		} else if ($scope.selectedTab == 'YOU_WILL_ATTEND') {
			$scope.getConferencesAttend();
		}
	};

	$scope.queryConferencesAll = function() {
		var sendFilters = {
			filters : []
		}

		$scope.loading = true;
		gapi.client.goalscale.getgoalsfromclients({
			clientwebsafekey : $routeParams.clientwebsafekey
		}).execute(
				function(resp) {
					$scope.$apply(function() {
						$scope.loading = false;
						if (resp.error) {
							// The request has failed.
							var errorMessage = resp.error.message || '';
							$scope.messages = 'Failed to query goals : '
									+ errorMessage;
							$scope.alertStatus = 'warning';
							$log.error($scope.messages + ' filters : '
									+ JSON.stringify(sendFilters));
						} else {
							// The request has succeeded.
							$scope.submitted = false;
							$scope.messages = 'All Goals ';

							$scope.alertStatus = 'success';
							$log.info($scope.messages);

							$scope.goals = [];
							angular.forEach(resp.items, function(Goal) {
								$scope.goals.push(Goal);
							});
						}
						$scope.submitted = true;
					});
				});
	}

});
/** ********************************************************************************************* */
conferenceApp.controllers
		.controller(
				'ShowGoalsettersCtrl',
				function($scope, $window, $log, oauth2Provider, $routeParams,
						$location, HTTP_ERRORS) {

					$scope.doTheBack = function() {
						window.history.back();
					};

					/**
					 * Holds the status if the query is being executed.
					 * 
					 * @type {boolean}
					 */
					if (!oauth2Provider.signedIn) {
						$window.location.assign('/');
						return;
					}
					$scope.submitted = false;

					$scope.selectedTab = 'ALL';

					$scope.filters = [];

					$scope.filtereableFields = [ {
						enumValue : 'NAME',
						displayName : 'Name'
					}, {
						enumValue : 'DESCRIPTION',
						displayName : 'description'
					}, ]

					/**
					 * Possible operators.
					 * 
					 * @type {{displayName: string, enumValue: string}[]}
					 */
					$scope.operators = [ {
						displayName : '=',
						enumValue : 'EQ'
					}, {
						displayName : '>',
						enumValue : 'GT'
					}, {
						displayName : '>=',
						enumValue : 'GTEQ'
					}, {
						displayName : '<',
						enumValue : 'LT'
					}, {
						displayName : '<=',
						enumValue : 'LTEQ'
					}, {
						displayName : '!=',
						enumValue : 'NE'
					} ];

					/**
					 * Holds the conferences currently displayed in the page.
					 * 
					 * @type {Array}
					 */
					$scope.goalsetters = [];

					/**
					 * Holds the state if offcanvas is enabled.
					 * 
					 * @type {boolean}
					 */
					$scope.isOffcanvasEnabled = false;
					
					$scope.searchname = "";
					$scope.querygoalsetters = function(searchname)
					{
						console.log(searchname);
						gapi.client.goalscale.searchgoalsetter(
								{'searchname':$scope.searchname}).execute(function(resp){
									
										$scope.$apply(function() {
											if (resp.error) {
												
											}
											else
												{
												console.log(resp.result.name);
												$scope.goalsetters = [];
												angular
														.forEach(
																resp.items,
																function(
																		Goalsetter) {
																	$scope.goalsetters
																			.push(Goalsetter);
																});
												}
										});
								});
					};
					/**
					 * Sets the selected tab to 'ALL'
					 */
					$scope.tabAllSelected = function() {
						$scope.selectedTab = 'ALL';
						if (!oauth2Provider.signedIn) {
							$window.location.assign('/');
							return;
						}
						$scope.queryGoalsetters();
					};

					$scope.DeleteGoalsetter = function() {
						console.log($routeParams.websafegaolsetterKey);
						gapi.client.goalscale
								.deletegoalsetter(
										{
											websafegaolsetterKey : $routeParams.websafegaolsetterKey
										}).execute(function(resp) {
									$scope.$apply(function() {
										if (resp.error) {
										} else {
											console.log(resp.result);
										}
									});
								});

					};

					/**
					 * Toggles the status of the offcanvas.
					 */
					$scope.toggleOffcanvas = function() {
						$scope.isOffcanvasEnabled = !$scope.isOffcanvasEnabled;
					};

					$scope.queryGoalsetters = function() {
						$scope.submitted = false;
						if ($scope.selectedTab == 'ALL') {
							$scope.queryConferencesAll();
						}
					};

					$scope.getgoalsetter = function() {
						gapi.client.goalscale
								.getgoalsetter(
										{
											websafegaolsetterKey : $routeParams.websafegaolsetterKey
										})
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														if (resp.error) {
															// The request has
															// failed.
															$window.location
																	.assign('/');
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to get goalsetter : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages);

														} else {
															// The request has
															// succeeded.
															$scope.submitted = false;
															$scope.messages = 'All Goalsetters ';

															$scope.alertStatus = 'success';
															$log
																	.info($scope.messages);

															$scope.givengoalsettername = resp.result.name;
															$scope.givengoalsetterdescription = resp.result.description;
															$scope.givengoalsetterrole = resp.result.role;
															$scope.goalsetterwebsafekey = resp.result.websafeKey;

														}
													});
										});

					};

					$scope.queryConferencesAll = function() {
						var sendFilters = {
							filters : []
						}

						$scope.loading = true;
						var loggedinusername = '';
						gapi.client.goalscale
								.queryGoalsetters_nofilters()
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															$window.location
																	.assign('/');
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to query clients : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages
																			+ ' filters : '
																			+ JSON
																					.stringify(sendFilters));
														} else {
															// The request has
															// succeeded.
															$scope.submitted = false;
															$scope.messages = 'All Goalsetters ';

															$scope.alertStatus = 'success';
															$log
																	.info($scope.messages);

															$scope.goalsetters = [];
															angular
																	.forEach(
																			resp.items,
																			function(
																					Goalsetter) {
																				$scope.goalsetters
																						.push(Goalsetter);
																			});
														}
														$scope.submitted = true;
													});
										});
					}

				});
/** ********************************************CreateClientforGoalsetterCtrl****************************** */
conferenceApp.controllers.controller('CreateClientforGoalsetterCtrl', function(
		$scope, $window, $log, oauth2Provider, $location, HTTP_ERRORS) {

	$scope.doTheBack = function() {
		window.history.back();
	};

	$scope.Client = $scope.Client || {};

	if (!oauth2Provider.signedIn) {
		$window.location.assign('/');
		return;
	}

	/**
	 * Invokes the goalscale.createUser API.
	 * 
	 * @param conferenceForm
	 *            the form object.
	 */
	$scope.createClient = function(ClientForm) {
		// console.log($scope.goal)

		$scope.loading = true;

		gapi.client.goalscale.createUserforGoalsetter($scope.Client).execute(
				function(resp) {
					$scope.$apply(function() {
						$scope.loading = false;
						if (resp.error) {
							// The request has failed.
							var errorMessage = resp.error.message || '';
							$scope.messages = 'Failed to create a Client : '
									+ errorMessage;
							$scope.alertStatus = 'warning';
							$log.error($scope.messages + ' Client : '
									+ JSON.stringify($scope.Client));

							if (resp.code
									&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
								oauth2Provider.showLoginModal();
								return;
							}
						} else {
							// The request has succeeded.
							$scope.messages = 'The Client has been created : ';

							$scope.alertStatus = 'success';
							$scope.submitted = false;
							$scope.Client = {};
							$log.info($scope.messages + ' : '
									+ JSON.stringify(resp.result));
						}
					});
				});
	};

});

/** ********************************************************************************************* */
conferenceApp.controllers.controller('ShowClientforGoalsetterCtrl', function(
		$scope, $window, $log, oauth2Provider, $location, HTTP_ERRORS) {

	$scope.doTheBack = function() {
		window.history.back();
	};

	/**
	 * Holds the status if the query is being executed.
	 * 
	 * @type {boolean}
	 */

	if (!oauth2Provider.signedIn) {
		$window.location.assign('/');
		return;
	}
	$scope.submitted = false;

	$scope.selectedTab = 'ALL';

	$scope.filters = [];

	/**
	 * Possible operators.
	 * 
	 * @type {{displayName: string, enumValue: string}[]}
	 */

	/**
	 * Holds the clients currently displayed in the page.
	 * 
	 * @type {Array}
	 */
	$scope.clients = [];

	/**
	 * Holds the state if offcanvas is enabled.
	 * 
	 * @type {boolean}
	 */
	$scope.isOffcanvasEnabled = false;

	/**
	 * Sets the selected tab to 'ALL'
	 */
	$scope.tabAllSelected = function() {
		$scope.selectedTab = 'ALL';
		if (!oauth2Provider.signedIn) {
			$window.location.assign('/');
			return;
		}
		$scope.queryallclientsforGoalsetter();
	};

	/**
	 * Toggles the status of the offcanvas.
	 */
	$scope.toggleOffcanvas = function() {
		$scope.isOffcanvasEnabled = !$scope.isOffcanvasEnabled;
	};

	/**
	 * Namespace for the pagination.
	 * 
	 * @type {{}|*}
	 */
	$scope.pagination = $scope.pagination || {};
	$scope.pagination.currentPage = 0;
	$scope.pagination.pageSize = 20;
	/**
	 * Returns the number of the pages in the pagination.
	 * 
	 * @returns {number}
	 */
	$scope.pagination.numberOfPages = function() {
		return Math.ceil($scope.clients.length / $scope.pagination.pageSize);
	};

	/**
	 * Returns an array including the numbers from 1 to the number of the pages.
	 * 
	 * @returns {Array}
	 */
	$scope.pagination.pageArray = function() {
		var pages = [];
		var numberOfPages = $scope.pagination.numberOfPages();
		for ( var i = 0; i < numberOfPages; i++) {
			pages.push(i);
		}
		return pages;
	};

	/**
	 * Checks if the target element that invokes the click event has the
	 * "disabled" class.
	 * 
	 * @param event
	 *            the click event
	 * @returns {boolean} if the target element that has been clicked has the
	 *          "disabled" class.
	 */
	$scope.pagination.isDisabled = function(event) {
		return angular.element(event.target).hasClass('disabled');
	}

	
	$scope.searchname = "";
	$scope.queryclients = function(searchname)
	{
		console.log(searchname);
		gapi.client.goalscale.searchclient(
				{'searchname':$scope.searchname}).execute(function(resp){
					
						$scope.$apply(function() {
							if (resp.error) {
								
							}
							else
							{
								console.log(resp.result.name);
								$scope.clients = [];
								angular.forEach(resp.items,function(Client) 
								{
											$scope.clients.push(Client);
								});
							}
						});
				});
	};

	$scope.queryClientsforGoalsetter = function() {
		$scope.submitted = false;
		if ($scope.selectedTab == 'ALL') {
			$scope.queryallclientsforGoalsetter();
		}
	};
	/* get the user email id from the session storage */
	var res = sessionStorage.getItem("username");
	var goalsettername1 = res.split("@");
	var goalsettername = goalsettername1[0];
	$scope.goalsettername = goalsettername;
	$scope.queryallclientsforGoalsetter = function() {

		$scope.loading = true;
		gapi.client.goalscale.getallClientsforGoalsetter().execute(
				function(resp) {
					$scope.$apply(function() {
						$scope.loading = false;
						if (resp.error) {
							// The request has failed.
							$window.location.assign('/');
							var errorMessage = resp.error.message || '';
							$scope.messages = 'Failed to query clients : '
									+ errorMessage;
							$scope.alertStatus = 'warning';

						} else {
							// The request has succeeded.
							$scope.submitted = false;
							$scope.messages = 'All Clients : ';

							$scope.alertStatus = 'success';
							$log.info($scope.messages);

							$scope.clients = [];
							angular.forEach(resp.items, function(Client) {
								$scope.clients.push(Client);
							});
						}
						$scope.submitted = true;
					});
				});
	}

});
/** ********************************************************************************************* */
conferenceApp.controllers
		.controller(
				'ShowClientCtrl',
				function($scope, $window, $log, oauth2Provider, $routeParams,
						HTTP_ERRORS) {

					/**
					 * Holds the status if the query is being executed.
					 * 
					 * @type {boolean}
					 */

					if (!oauth2Provider.signedIn) {
						$window.location.assign('/');
						return;
					}
					$scope.doTheBack = function() {
						window.history.back();
					};

					$scope.submitted = false;

					$scope.selectedTab = 'ALL';

					$scope.filters = [];

					$scope.filtereableFields = [ {
						enumValue : 'NAME',
						displayName : 'Name'
					}, {
						enumValue : 'DESCRIPTION',
						displayName : 'description'
					}, ]

					
					$scope.searchname = "";
					$scope.queryclients = function(searchname)
					{
						console.log(searchname);
						gapi.client.goalscale.searchclient(
								{'searchname':$scope.searchname}).execute(function(resp){
									
										$scope.$apply(function() {
											if (resp.error) {
												
											}
											else
											{
												console.log(resp.result.name);
												$scope.clients = [];
												angular.forEach(resp.items,function(Client) 
												{
															$scope.clients.push(Client);
												});
											}
										});
								});
					};
					$scope.DeleteClient = function() {
						console.log($routeParams.clientwebsafekey);
						gapi.client.goalscale.deleteclient({
							clientwebsafekey : $routeParams.clientwebsafekey
						}).execute(function(resp) {
							$scope.$apply(function() {
								if (resp.error) {
								} else {
									console.log(resp.result);
									$scope.doTheBack();
								}
							});
						});

					};

					/**
					 * Possible operators.
					 * 
					 * @type {{displayName: string, enumValue: string}[]}
					 */
					$scope.operators = [ {
						displayName : '=',
						enumValue : 'EQ'
					}, {
						displayName : '>',
						enumValue : 'GT'
					}, {
						displayName : '>=',
						enumValue : 'GTEQ'
					}, {
						displayName : '<',
						enumValue : 'LT'
					}, {
						displayName : '<=',
						enumValue : 'LTEQ'
					}, {
						displayName : '!=',
						enumValue : 'NE'
					} ];

					/**
					 * Holds the conferences currently displayed in the page.
					 * 
					 * @type {Array}
					 */
					$scope.clients = [];

					/**
					 * Holds the state if offcanvas is enabled.
					 * 
					 * @type {boolean}
					 */
					$scope.isOffcanvasEnabled = false;

					/**
					 * Sets the selected tab to 'ALL'
					 */
					$scope.tabAllSelected = function() {
						$scope.selectedTab = 'ALL';
						if (!oauth2Provider.signedIn) {
							$window.location.assign('/');
							return;
						}
						$scope.queryClients();
					};

					/**
					 * Toggles the status of the offcanvas.
					 */
					$scope.toggleOffcanvas = function() {
						$scope.isOffcanvasEnabled = !$scope.isOffcanvasEnabled;
					};

					/**
					 * Namespace for the pagination.
					 * 
					 * @type {{}|*}
					 */
					$scope.pagination = $scope.pagination || {};
					$scope.pagination.currentPage = 0;
					$scope.pagination.pageSize = 20;
					/**
					 * Returns the number of the pages in the pagination.
					 * 
					 * @returns {number}
					 */
					$scope.pagination.numberOfPages = function() {
						return Math.ceil($scope.clients.length
								/ $scope.pagination.pageSize);
					};

					/**
					 * Returns an array including the numbers from 1 to the
					 * number of the pages.
					 * 
					 * @returns {Array}
					 */
					$scope.pagination.pageArray = function() {
						var pages = [];
						var numberOfPages = $scope.pagination.numberOfPages();
						for ( var i = 0; i < numberOfPages; i++) {
							pages.push(i);
						}
						return pages;
					};

					/**
					 * Checks if the target element that invokes the click event
					 * has the "disabled" class.
					 * 
					 * @param event
					 *            the click event
					 * @returns {boolean} if the target element that has been
					 *          clicked has the "disabled" class.
					 */
					$scope.pagination.isDisabled = function(event) {
						return angular.element(event.target).hasClass(
								'disabled');
					}

					/**
					 * Removes the filter specified by the index from
					 * $scope.filters.
					 * 
					 * @param index
					 */

					$scope.queryClients = function() {
						$scope.submitted = false;
						if ($scope.selectedTab == 'ALL') {
							$scope.queryConferencesAll();
						} else if ($scope.selectedTab == 'YOU_HAVE_CREATED') {
							$scope.getConferencesCreated();
						} else if ($scope.selectedTab == 'YOU_WILL_ATTEND') {
							$scope.getConferencesAttend();
						}
					};
					$scope.init = function() {
						$scope.loading = true;
						gapi.client.goalscale
								.getClientsfromGoalsetter(
										{
											goalsetterwebsafekey : $routeParams.goalsetterwebsafekey
										})
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to get the client : '
																	+ $routeParams.websafeKey
																	+ ' '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages);

														} else {
															// The request has
															// succeeded.
															$scope.alertStatus = 'success';
															$scope.clients = [];
															angular
																	.forEach(
																			resp.items,
																			function(
																					Client) {
																				$scope.clients
																						.push(Client);
																			});
														}
													});
										});
					};

					$scope.getclient = function() {

						gapi.client.goalscale
								.getclient(
										{
											clientwebsafekey : $routeParams.clientwebsafekey
										})
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														if (resp.error) {
															// The request has
															// failed.
															$window.location
																	.assign('/');
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to get Client : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages);

														} else {
															// The request has
															// succeeded.
															$scope.submitted = false;
															$scope.messages = 'Client Details ';

															$scope.alertStatus = 'success';
															$log
																	.info($scope.messages);

															$scope.givenclientname = resp.result.name;
															$scope.givenclientdescription = resp.result.description;
															$scope.givenclientlocation = resp.result.location;
															$scope.givenclientmedicalrecordnumber = resp.result.medicalRecordNumber;
															$scope.givenclientage = resp.result.age;
															$scope.clientwebsafekey = resp.result.websafeKey;

														}
													});
										});
					};

					$scope.queryConferencesAll = function() {
						var sendFilters = {
							filters : []
						}

						$scope.loading = true;
						gapi.client.goalscale
								.getClientsfromGoalsetter(
										{
											goalsetterwebsafekey : $routeParams.goalsetterwebsafekey
										})
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															$window.location
																	.assign('/');
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to query clients : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages
																			+ ' filters : '
																			+ JSON
																					.stringify(sendFilters));
															$location.path('/');
														} else {
															// The request has
															// succeeded.
															$scope.submitted = false;
															$scope.messages = 'Query succeeded : ';

															$scope.alertStatus = 'success';
															$log
																	.info($scope.messages);

															$scope.clients = [];
															angular
																	.forEach(
																			resp.items,
																			function(
																					Client) {
																				$scope.clients
																						.push(Client);
																			});
														}
														$scope.submitted = true;
													});
										});
					}

				});
/** ********************************************************************************* */
conferenceApp.controllers
		.controller(
				'ViewreportCtrl',
				function($scope, $window, $log, oauth2Provider, HTTP_ERRORS) {

					$scope.doTheBack = function() {
						window.history.back();
					};

					/**
					 * Holds the status if the query is being executed.
					 * 
					 * @type {boolean}
					 */

					if (!oauth2Provider.signedIn) {
						$window.location.assign('/');
						return;
					}

					$scope.doTheBack = function() {
						window.history.back();
					};

					var reports = [];
					var goalsettername = [];
					var averagescore = [];
					var i = 0;

					gapi.client.goalscale
							.queryGoalsetters_nofilters()
							.execute(
									function(resp) {
										$scope
												.$apply(function() {
													$scope.loading = false;
													if (resp.error) {
														// The request has
														// failed.
														var errorMessage = resp.error.message
																|| '';
														$scope.messages = 'Failed to query reports : '
																+ errorMessage;
														$scope.alertStatus = 'warning';
														$log
																.error($scope.messages
																		+ ' filters : '
																		+ JSON
																				.stringify(sendFilters));
													} else {
														// The request has
														// succeeded.

														angular
																.forEach(
																		resp.items,
																		function(
																				Goalsetter) {
																			reports
																					.push(Goalsetter);
																			goalsettername
																					.push(reports[i].id);
																			averagescore
																					.push(reports[i].averagescore);
																			i++;
																		});
														google
																.load(
																		"visualization",
																		"1",
																		{
																			packages : [ "corechart" ],
																			callback : function() {
																				drawChart();
																			}
																		});
													}
													$scope.submitted = true;
												});
									});

					// google.setOnLoadCallback(drawChart);
					function drawChart() {
						console.log("enter draw");
						var data = new google.visualization.DataTable();
						// Declare columns
						data.addColumn('string', 'Goalsetter Name');
						data.addColumn('number', 'Score');

						// data.addRows(reports.length);

						for ( var j = 0; j < i; j++)
							data
									.addRows([ [ goalsettername[j],
											averagescore[j] ] ]);

						/*
						 * var data = google.visualization .arrayToDataTable([
						 * ['Year', 'value', { role: 'style' }], ['2010', 10, '
						 * color: gray'], ['2010', 200, 'color: #76A7FA'],
						 * ['2020', 16, 'opacity: 0.2'], ['2040', 22,
						 * 'stroke-color: #703593; stroke-width: 4; fill-color:
						 * #C5A5CF'], [ '2040', 28, 'stroke-color: #871B47;
						 * stroke-opacity: 0.6; stroke-width: 8; fill-color:
						 * #BC5679; fill-opacity: 0.2']]);
						 */
						var view = new google.visualization.DataView(data);

						var options = {
							title : 'Goalsetters Performance',
							tooltip : {
								isHtml : false
							},
							legend : 'none',

						};

						var chart = new google.visualization.ColumnChart(
								document.getElementById('chart_div'));
						google.visualization.events.addListener(chart, 'ready',
								function() {
									var content = '<img src="'
											+ chart.getImageURI() + '">';
									$('#graph-images').append(content);
								});
						chart.draw(view, options);
						printpdf();

					}

					function printpdf() {
						var doc = new jsPDF('p', 'pt', 'a4', false)
						/* Creates a new Document */
						doc.setFontSize(15);
						/* Define font size for the document */
						var yAxis = 30;
						var imageTags = $('#graph-images img');
						var images = [];
						for ( var i = 0; i < imageTags.length; i++) {
							images = imageTags[i].currentSrc;
							var someText = 'Report For All Goalsetters ';
							doc.text(60, yAxis, someText);
							/* Add some text in the PDF */
							yAxis = yAxis + 20;
							/* Update yAxis */
							doc.addImage(images, 'png', 40, yAxis, 500, 150,
									undefined, 'none');
							/*
							 * for( var i =0 ; i< reports.length ; i++) { var
							 * sumtxt = 'Goal Setter Name ' + goalsettername[i];
							 * var score = 'AverageScore ' + averagescore[i];
							 * var rating =''; if(score == 1) rating = 'Good';
							 * if(score = 2) rating = 'Excellent'; if(score = 0)
							 * rating = 'Moderate'; if(score = -1) rating =
							 * 'bad'; if(score = -2) rating = 'Very bad';
							 * doc.text(70, yAxis+20, sumtxt + score + 'OverAll
							 * Performance'+rating);
							 *  }
							 */
							/* Update yAxis */
						}

						doc.output('dataurlnewwindow');

					}
				});

/** ********************************************************************************* */
conferenceApp.controllers.controller('CreatePDFCtrl', function($scope, $window,
		$log, oauth2Provider, HTTP_ERRORS) {

	/**
	 * Holds the status if the query is being executed.
	 * 
	 * @type {boolean}
	 */

	if (!oauth2Provider.signedIn) {
		$window.location.assign('/');
		return;
	}

	function printpdf() {
		var specialElementHandlers = {
			'#editor' : function(element, renderer) {
				return true;
			}
		};
		var doc = new jsPDF('landscape');
		doc.fromHTML($('body').get(0), 15, 15, {
			'width' : 170,
			'elementHandlers' : specialElementHandlers
		});
		doc.output('save');
	}
});
/** ********************************************************************************************* */
conferenceApp.controllers.controller('ShowReportCtrl', function($scope,
		$window, $log, oauth2Provider, HTTP_ERRORS) {

	/**
	 * Holds the status if the query is being executed.
	 * 
	 * @type {boolean}
	 */

	$scope.doTheBack = function() {
		window.history.back();
	};

	if (!oauth2Provider.signedIn) {
		$window.location.assign('/');
		return;
	}

	$scope.submitted = false;

	$scope.selectedTab = 'ALL';

	$scope.filters = [];

	$scope.filtereableFields = [ {
		enumValue : 'NAME',
		displayName : 'Name'
	}, {
		enumValue : 'DESCRIPTION',
		displayName : 'description'
	}, ]

	/**
	 * Possible operators.
	 * 
	 * @type {{displayName: string, enumValue: string}[]}
	 */
	$scope.operators = [ {
		displayName : '=',
		enumValue : 'EQ'
	}, {
		displayName : '>',
		enumValue : 'GT'
	}, {
		displayName : '>=',
		enumValue : 'GTEQ'
	}, {
		displayName : '<',
		enumValue : 'LT'
	}, {
		displayName : '<=',
		enumValue : 'LTEQ'
	}, {
		displayName : '!=',
		enumValue : 'NE'
	} ];

	/**
	 * Holds the conferences currently displayed in the page.
	 * 
	 * @type {Array}
	 */
	$scope.reports = [];

	/**
	 * Holds the state if offcanvas is enabled.
	 * 
	 * @type {boolean}
	 */
	$scope.isOffcanvasEnabled = false;

	/**
	 * Sets the selected tab to 'ALL'
	 */
	$scope.printReport = function() {
		google.load('visualization', '1', {
			packages : [ 'corechart', 'bar' ]
		});
		google.setOnLoadCallback(drawBasic);

		function drawBasic() {

			var data = google.visualization
					.arrayToDataTable([ [ 'City', '2010 Population', ],
							[ 'New York City, NY', 8175000 ],
							[ 'Los Angeles, CA', 3792000 ],
							[ 'Chicago, IL', 2695000 ],
							[ 'Houston, TX', 2099000 ],
							[ 'Philadelphia, PA', 1526000 ] ]);

			var options = {
				title : 'Population of Largest U.S. Cities',
				chartArea : {
					width : '50%'
				},
				hAxis : {
					title : 'Total Population',
					minValue : 0
				},
				vAxis : {
					title : 'City'
				}
			};

			var chart = new google.visualization.BarChart(document
					.getElementById('chart_div'));

			chart.draw(data, options);
		}

		/*
		 * var doc = new jsPDF(); doc.setFontSize(22); doc.text(20, 20, 'Goal
		 * Attainment Scaling Report'); doc.addPage(); doc.setFontSize(16);
		 * doc.text(20, 30, 'This is some normal sized text underneath.');
		 * doc.save('GoalReport.pdf');
		 * 
		 * //get the PDF buffer doc.output();
		 */
	};

	$scope.tabAllSelected = function() {
		$scope.selectedTab = 'ALL';
		if (!oauth2Provider.signedIn) {
			$window.location.assign('/');
			return;
		}
		$scope.queryReports();
	};

	$scope.tabYouHaveCreatedSelected = function() {
		$scope.selectedTab = 'YOU_HAVE_CREATED';
		if (!oauth2Provider.signedIn) {
			oauth2Provider.showLoginModal();
			return;
		}
		$scope.queryClients();
	};

	$scope.tabYouWillAttendSelected = function() {
		$scope.selectedTab = 'YOU_WILL_ATTEND';
		if (!oauth2Provider.signedIn) {
			oauth2Provider.showLoginModal();
			return;
		}
		$scope.queryClients();
	};

	/**
	 * Toggles the status of the offcanvas.
	 */
	$scope.toggleOffcanvas = function() {
		$scope.isOffcanvasEnabled = !$scope.isOffcanvasEnabled;
	};

	/**
	 * Namespace for the pagination.
	 * 
	 * @type {{}|*}
	 */
	$scope.pagination = $scope.pagination || {};
	$scope.pagination.currentPage = 0;
	$scope.pagination.pageSize = 20;
	/**
	 * Returns the number of the pages in the pagination.
	 * 
	 * @returns {number}
	 */
	$scope.pagination.numberOfPages = function() {
		return Math.ceil($scope.reports.length / $scope.pagination.pageSize);
	};

	/**
	 * Returns an array including the numbers from 1 to the number of the pages.
	 * 
	 * @returns {Array}
	 */
	$scope.pagination.pageArray = function() {
		var pages = [];
		var numberOfPages = $scope.pagination.numberOfPages();
		for ( var i = 0; i < numberOfPages; i++) {
			pages.push(i);
		}
		return pages;
	};

	/**
	 * Checks if the target element that invokes the click event has the
	 * "disabled" class.
	 * 
	 * @param event
	 *            the click event
	 * @returns {boolean} if the target element that has been clicked has the
	 *          "disabled" class.
	 */
	$scope.pagination.isDisabled = function(event) {
		return angular.element(event.target).hasClass('disabled');
	}

	/**
	 * Removes the filter specified by the index from $scope.filters.
	 * 
	 * @param index
	 */

	$scope.queryReports = function() {
		$scope.submitted = false;
		if ($scope.selectedTab == 'ALL') {
			$scope.queryConferencesAll();
		} else if ($scope.selectedTab == 'YOU_HAVE_CREATED') {
			$scope.getConferencesCreated();
		} else if ($scope.selectedTab == 'YOU_WILL_ATTEND') {
			$scope.getConferencesAttend();
		}
	};

	$scope.queryConferencesAll = function() {
		var sendFilters = {
			filters : []
		}

		$scope.loading = true;
		gapi.client.goalscale.queryGoalsetters_nofilters().execute(
				function(resp) {
					$scope.$apply(function() {
						$scope.loading = false;
						if (resp.error) {
							// The request has failed.
							var errorMessage = resp.error.message || '';
							$scope.messages = 'Failed to query reports : '
									+ errorMessage;
							$scope.alertStatus = 'warning';
							$log.error($scope.messages + ' filters : '
									+ JSON.stringify(sendFilters));
						} else {
							// The request has succeeded.
							$scope.submitted = false;
							$scope.messages = 'Query succeeded : '
									+ JSON.stringify(sendFilters);
							$scope.alertStatus = 'success';
							$log.info($scope.messages);

							$scope.reports = [];
							angular.forEach(resp.items, function(Goalsetter) {
								$scope.reports.push(Goalsetter);
							});
						}
						$scope.submitted = true;
					});
				});
	}

});

/** ********************************************************************************** */
/**
 * @ngdoc controller
 * @name ShowConferenceCtrl
 * 
 * @description A controller used for the Show conferences page.
 */
conferenceApp.controllers
		.controller(
				'ShowConferenceCtrl',
				function($scope, $window, $log, oauth2Provider, HTTP_ERRORS) {

					$scope.doTheBack = function() {
						window.history.back();
					};

					/**
					 * Holds the status if the query is being executed.
					 * 
					 * @type {boolean}
					 */

					if (!oauth2Provider.signedIn) {
						$window.location.assign('/');
						return;
					}

					$scope.submitted = false;

					$scope.selectedTab = 'ALL';

					/**
					 * Holds the filters that will be applied when
					 * queryConferencesAll is invoked.
					 * 
					 * @type {Array}
					 */
					$scope.filters = [];

					$scope.filtereableFields = [ {
						enumValue : 'CITY',
						displayName : 'City'
					}, {
						enumValue : 'TOPIC',
						displayName : 'Topic'
					}, {
						enumValue : 'MONTH',
						displayName : 'Start month'
					}, {
						enumValue : 'MAX_ATTENDEES',
						displayName : 'Max Attendees'
					} ]

					/**
					 * Possible operators.
					 * 
					 * @type {{displayName: string, enumValue: string}[]}
					 */
					$scope.operators = [ {
						displayName : '=',
						enumValue : 'EQ'
					}, {
						displayName : '>',
						enumValue : 'GT'
					}, {
						displayName : '>=',
						enumValue : 'GTEQ'
					}, {
						displayName : '<',
						enumValue : 'LT'
					}, {
						displayName : '<=',
						enumValue : 'LTEQ'
					}, {
						displayName : '!=',
						enumValue : 'NE'
					} ];

					/**
					 * Holds the conferences currently displayed in the page.
					 * 
					 * @type {Array}
					 */
					$scope.conferences = [];

					/**
					 * Holds the state if offcanvas is enabled.
					 * 
					 * @type {boolean}
					 */
					$scope.isOffcanvasEnabled = false;

					/**
					 * Sets the selected tab to 'ALL'
					 */
					$scope.tabAllSelected = function() {
						$scope.selectedTab = 'ALL';
						$scope.queryConferences();
					};

					/**
					 * Sets the selected tab to 'YOU_HAVE_CREATED'
					 */
					$scope.tabYouHaveCreatedSelected = function() {
						$scope.selectedTab = 'YOU_HAVE_CREATED';
						if (!oauth2Provider.signedIn) {
							oauth2Provider.showLoginModal();
							return;
						}
						$scope.queryConferences();
					};

					/**
					 * Sets the selected tab to 'YOU_WILL_ATTEND'
					 */
					$scope.tabYouWillAttendSelected = function() {
						$scope.selectedTab = 'YOU_WILL_ATTEND';
						if (!oauth2Provider.signedIn) {
							oauth2Provider.showLoginModal();
							return;
						}
						$scope.queryConferences();
					};

					/**
					 * Toggles the status of the offcanvas.
					 */
					$scope.toggleOffcanvas = function() {
						$scope.isOffcanvasEnabled = !$scope.isOffcanvasEnabled;
					};

					/**
					 * Namespace for the pagination.
					 * 
					 * @type {{}|*}
					 */
					$scope.pagination = $scope.pagination || {};
					$scope.pagination.currentPage = 0;
					$scope.pagination.pageSize = 20;
					/**
					 * Returns the number of the pages in the pagination.
					 * 
					 * @returns {number}
					 */
					$scope.pagination.numberOfPages = function() {
						return Math.ceil($scope.clients.length
								/ $scope.pagination.pageSize);
					};

					/**
					 * Returns an array including the numbers from 1 to the
					 * number of the pages.
					 * 
					 * @returns {Array}
					 */
					$scope.pagination.pageArray = function() {
						var pages = [];
						var numberOfPages = $scope.pagination.numberOfPages();
						for ( var i = 0; i < numberOfPages; i++) {
							pages.push(i);
						}
						return pages;
					};

					/**
					 * Checks if the target element that invokes the click event
					 * has the "disabled" class.
					 * 
					 * @param event
					 *            the click event
					 * @returns {boolean} if the target element that has been
					 *          clicked has the "disabled" class.
					 */
					$scope.pagination.isDisabled = function(event) {
						return angular.element(event.target).hasClass(
								'disabled');
					}

					/**
					 * Adds a filter and set the default value.
					 */
					$scope.addFilter = function() {
						$scope.filters.push({
							field : $scope.filtereableFields[0],
							operator : $scope.operators[0],
							value : ''
						})
					};

					/**
					 * Clears all filters.
					 */
					$scope.clearFilters = function() {
						$scope.filters = [];
					};

					/**
					 * Removes the filter specified by the index from
					 * $scope.filters.
					 * 
					 * @param index
					 */
					$scope.removeFilter = function(index) {
						if ($scope.filters[index]) {
							$scope.filters.splice(index, 1);
						}
					};

					/**
					 * Query the conferences depending on the tab currently
					 * selected.
					 * 
					 */
					$scope.queryConferences = function() {
						$scope.submitted = false;
						if ($scope.selectedTab == 'ALL') {
							$scope.queryConferencesAll();
						} else if ($scope.selectedTab == 'YOU_HAVE_CREATED') {
							$scope.getConferencesCreated();
						} else if ($scope.selectedTab == 'YOU_WILL_ATTEND') {
							$scope.getConferencesAttend();
						}
					};

					/**
					 * Invokes the conference.queryConferences API.
					 */
					$scope.queryConferencesAll = function() {
						var sendFilters = {
							filters : []
						}
						for ( var i = 0; i < $scope.filters.length; i++) {
							var filter = $scope.filters[i];
							if (filter.field && filter.operator && filter.value) {
								sendFilters.filters.push({
									field : filter.field.enumValue,
									operator : filter.operator.enumValue,
									value : filter.value
								});
							}
						}
						$scope.loading = true;
						gapi.client.conference
								.queryConferences(sendFilters)
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to query conferences : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages
																			+ ' filters : '
																			+ JSON
																					.stringify(sendFilters));
														} else {
															// The request has
															// succeeded.
															$scope.submitted = false;
															$scope.messages = 'Query succeeded : '
																	+ JSON
																			.stringify(sendFilters);
															$scope.alertStatus = 'success';
															$log
																	.info($scope.messages);

															$scope.conferences = [];
															angular
																	.forEach(
																			resp.items,
																			function(
																					conference) {
																				$scope.conferences
																						.push(conference);
																			});
														}
														$scope.submitted = true;
													});
										});
					}

					/**
					 * Invokes the conference.getConferencesCreated method.
					 */
					$scope.getConferencesCreated = function() {
						$scope.loading = true;
						gapi.client.conference
								.getConferencesCreated()
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to query the conferences created : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages);

															if (resp.code
																	&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
																oauth2Provider
																		.showLoginModal();
																return;
															}
														} else {
															// The request has
															// succeeded.
															$scope.submitted = false;
															$scope.messages = 'Query succeeded : Conferences you have created';
															$scope.alertStatus = 'success';
															$log
																	.info($scope.messages);

															$scope.conferences = [];
															angular
																	.forEach(
																			resp.items,
																			function(
																					conference) {
																				$scope.conferences
																						.push(conference);
																			});
														}
														$scope.submitted = true;
													});
										});
					};

					/**
					 * Retrieves the conferences to attend by calling the
					 * conference.getProfile method and invokes the
					 * conference.getConference method n times where n == the
					 * number of the conferences to attend.
					 */
					$scope.getConferencesAttend = function() {
						$scope.loading = true;
						gapi.client.conference
								.getConferencesToAttend()
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														if (resp.error) {
															// The request has
															// failed.
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'Failed to query the conferences to attend : '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages);

															if (resp.code
																	&& resp.code == HTTP_ERRORS.UNAUTHORIZED) {
																oauth2Provider
																		.showLoginModal();
																return;
															}
														} else {
															// The request has
															// succeeded.
															$scope.conferences = resp.result.items;
															$scope.loading = false;
															$scope.messages = 'Query succeeded : Conferences you will attend (or you have attended)';
															$scope.alertStatus = 'success';
															$log
																	.info($scope.messages);
														}
														$scope.submitted = true;
													});
										});
					};
				});

/** *******************************ShowClientforgoalsettersCtrl******************************************************** */
conferenceApp.controllers.controller('ShowClientforgoalsettersCtrl', function(
		$scope, $window, $log, $routeParams, HTTP_ERRORS) {

	$scope.client = [];

	if (!oauth2Provider.signedIn) {
		$window.location.assign('/');
		return;
	}

	$scope.doTheBack = function() {
		window.history.back();
	};

	$scope.init = function() {
		$scope.loading = true;
		gapi.client.goalscale.getClientsfromGoalsetter({
			websafegaolsetterKey : $routeParams.websafegaolsetterKey
		}).execute(
				function(resp) {
					$scope.$apply(function() {
						$scope.loading = false;
						if (resp.error) {
							// The request has failed.
							var errorMessage = resp.error.message || '';
							$scope.messages = 'Failed to get the client : '
									+ $routeParams.websafeKey + ' '
									+ errorMessage;
							$scope.alertStatus = 'warning';
							$log.error($scope.messages);
						} else {
							// The request has succeeded.
							$scope.alertStatus = 'success';
							$scope.clients = [];
							angular.forEach(resp.items, function(Client) {
								$scope.clients.push(Client);
							});
						}
					});
				});
	};
});
/** ************************************************************************************** */

/** *********************************ShowGoalforClientCtrl**************************************** */
conferenceApp.controllers.controller('ShowGoalforClientCtrl', function($scope,
		oauth2Provider, $log, $routeParams, HTTP_ERRORS) {

	$scope.goal = [];

	$scope.doTheBack = function() {
		window.history.back();
	};

	$scope.init = function() {
		$scope.loading = true;
		gapi.client.goalscale.getallGoals({
			websafeclientKey : $routeParams.websafeclientKey
		}).execute(
				function(resp) {
					$scope.$apply(function() {
						$scope.loading = false;
						if (resp.error) {
							// The request has failed.
							var errorMessage = resp.error.message || '';
							$scope.messages = 'Failed to get the goal : '
									+ $routeParams.websafeKey + ' '
									+ errorMessage;
							$scope.alertStatus = 'warning';
							$log.error($scope.messages);
						} else {
							// The request has succeeded.
							$scope.alertStatus = 'success';
							$scope.goals = [];
							angular.forEach(resp.items, function(Goal) {
								$scope.goals.push(Goal);
							});
						}
					});
				});
	};
});

/** ************************************************************************************** */

/**
 * @ngdoc controller
 * @name ConferenceDetailCtrl
 * 
 * @description A controller used for the conference detail page.
 */
conferenceApp.controllers
		.controller(
				'GoalDetailCtrl',
				function($scope, $window, oauth2Provider, $log, $routeParams,
						HTTP_ERRORS) {
					$scope.goal = {};

					if (!oauth2Provider.signedIn) {
						$window.location.assign('/');
						return;
					}

					$scope.doTheBack = function() {
						window.history.back();
					};

					$scope.isUserAttending = false;

					$scope.goalkey = $routeParams.websafeConferenceKey;

					$scope.DeleteGoal = function() {
						console.log($scope.goalkey);
						gapi.client.goalscale.deletegoal({
							goalkey : $routeParams.websafeConferenceKey
						}).execute(function(resp) {
							$scope.$apply(function() {
								if (resp.error) {
								} else {
									console.log(resp.result);
								}
							});
						});

					};

					$scope.goaldetail = function() {
						gapi.client.goalscale
								.getgoal({
									goalkey : $routeParams.websafeConferenceKey
								})
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'No evaluations for this goal : '
																	+ $routeParams.websafeKey
																	+ ' '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages);
														} else {
															// The request has
															// succeeded.
															$scope.alertStatus = 'success';
															$scope.evalautes = [];
															$scope.goalname = resp.result.name;
															$scope.goaldescription = resp.result.name;
															$scope.minustwogoalstatement = resp.result.minustwoscale;
															$scope.minusonegoalstatement = resp.result.minusonescale;
															$scope.zerogoalstatement = resp.result.zeroscale;
															$scope.plusonegoalstatement = resp.result.plusonescale;
															$scope.plustwogoalstatement = resp.result.plustwoscale;
															$scope.startdate = resp.result.startDate;
															$scope.enddate = resp.result.endDate;
															// $scope.goal =
															// resp.result;
														}
													});

										});
					};
					/**
					 * Initializes the conference detail page. Invokes the
					 * conference.getConference method and sets the returned
					 * conference in the $scope.
					 * 
					 */
					$scope.init = function() {
						$scope.loading = true;
						gapi.client.goalscale
								.getGoalEvaluate(
										{
											websafeConferenceKey : $routeParams.websafeConferenceKey
										})
								.execute(
										function(resp) {
											$scope
													.$apply(function() {
														$scope.loading = false;
														if (resp.error) {
															// The request has
															// failed.
															var errorMessage = resp.error.message
																	|| '';
															$scope.messages = 'No evaluations for this goal : '
																	+ $routeParams.websafeKey
																	+ ' '
																	+ errorMessage;
															$scope.alertStatus = 'warning';
															$log
																	.error($scope.messages);
														} else {
															// The request has
															// succeeded.
															$scope.alertStatus = 'success';
															$scope.evalautes = [];
															angular
																	.forEach(
																			resp.items,
																			function(
																					Evaluate) {
																				$scope.evalautes
																						.push(Evaluate);
																			});
															// $scope.goal = resp.result;
														}
													});
										});

					};

				});

/**
 * @ngdoc controller
 * @name RootCtrl
 * 
 * @description The root controller having a scope of the body element and
 *              methods used in the application wide such as user
 *              authentications.
 * 
 */
conferenceApp.controllers
		.controller(
				'RootCtrl',
				function($scope, $window, $location, oauth2Provider) {

					var emailid;
					/**
					 * Returns if the viewLocation is the currently viewed page.
					 * 
					 * @param viewLocation
					 * @returns {boolean} true if viewLocation is the currently
					 *          viewed page. Returns false otherwise.
					 */
					$scope.isActive = function(viewLocation) {
						return viewLocation === $location.path();
					};

					/**
					 * Returns the OAuth2 signedIn state.
					 * 
					 * @returns {oauth2Provider.signedIn|*} true if siendIn,
					 *          false otherwise.
					 */
					$scope.getSignedInState = function() {
						return oauth2Provider.signedIn;
					};

					/**
					 * Calls the OAuth2 authentication method.
					 */
					$scope.signIn = function() {
						console.log('entered signIn');

						oauth2Provider
								.signIn(function() {
									gapi.client.oauth2.userinfo
											.get()
											.execute(
													function(resp) {
														$scope
																.$apply(function() {

																	
																	if (resp.email) {
																		if (window.sessionStorage)

																			sessionStorage
																					.setItem(
																							"username",
																							resp.email);
																		sessionStorage
																				.setItem(
																						"accesstoken",
																						gapi.auth
																								.getToken().access_token);
																		emailid = resp.email;
																		console
																				.log(emailid);

																		$scope.alertStatus = 'success';
																		$scope.rootMessages = 'Logged in with '
																				+ resp.email;

																		var request = gapi.client.goalscale
																				.checkforregisteredusers({
																					'emailaddress' : emailid
																				});
																		request
																				.execute(function(
																						response) {
																					//oauth2Provider.signedIn = true;
																					//$window.location
																						//	.assign('/#/admin/home');
																					if (response.emailaddress == emailid) {
																						if (response.role == 'ADMIN') {
																							console
																									.log(' A vlid user');
																							oauth2Provider.signedIn = true;
																							$window.location
																									.assign('/#/admin/home');
																						} else if (response.role == 'GOALSETTER') {
																							console
																									.log('Goalsetter');
																							oauth2Provider.signedIn = true;
																							$window.location
																									.assign('/#/goalsetter/home');
																						}

																					}

																				});

																	}
																});

													});

								});

					};

					/**
					 * Render the signInButton and restore the credential if
					 * it's stored in the cookie. (Just calling this to restore
					 * the credential from the stored cookie. So hiding the
					 * signInButton immediately after the rendering)
					 */
					$scope.initSignInButton = function() {

						var persistedval = sessionStorage
								.getItem("accesstoken");
						if (persistedval) {
							gapi.auth.setToken({access_token :persistedval});
							console.log(gapi.auth.getToken().access_token);
							oauth2Provider.signedIn = true;
						}
						var sessionParams = {
							'client_id' : oauth2Provider.CLIENT_ID,
							'session_state' : null
						};
						gapi.auth.checkSessionState(sessionParams, function(
								stateMatched) {
							if (stateMatched == true) {
								console.log("You be logged out");
							} else {

								console.log('called initSignInButton');
								if (gapi.auth.getToken() == null) {
									var persistedval = sessionStorage
											.getItem("accesstoken");
									if (persistedval) {
										gapi.auth.setToken(persistedval);
										oauth2Provider.signedIn = true;
									}
								}

							}
						});

						gapi.signin.render($("#signInButton"), {
							'callback' : function() {

								if (gapi.auth.getToken()
										&& gapi.auth.getToken().access_token) {
									$scope.$apply(function() {
										oauth2Provider.signedIn = true;
										console.log('initsign executed');

									});
								}
							},
							'clientid' : oauth2Provider.CLIENT_ID,
							'cookiepolicy' : 'single_host_origin',
							'scope' : oauth2Provider.SCOPES
						});
					};

					/**
					 * Logs out the user.
					 */
					$scope.signOut = function() {
						oauth2Provider.signOut();
						$scope.alertStatus = 'success';
						$scope.rootMessages = 'Logged out';
					};

					/**
					 * Collapses the navbar on mobile devices.
					 */
					$scope.collapseNavbar = function() {
						angular.element(
								document.querySelector('.navbar-collapse'))
								.removeClass('in');
					};

				});

/**
 * @ngdoc controller
 * @name OAuth2LoginModalCtrl
 * 
 * @description The controller for the modal dialog that is shown when an user
 *              needs to login to achive some functions.
 * 
 */
conferenceApp.controllers.controller('OAuth2LoginModalCtrl', function($scope,
		$modalInstance, $rootScope, oauth2Provider) {
	$scope.singInViaModal = function() {
		oauth2Provider.signIn(function() {
			gapi.client.oauth2.userinfo.get().execute(function(resp) {
				$scope.$root.$apply(function() {
					oauth2Provider.signedIn = true;
					$scope.$root.alertStatus = 'success';
					$scope.$root.rootMessages = 'Logged in with ' + resp.email;
				});

				$modalInstance.close();
			});
		});
	};
});

/**
 * @ngdoc controller
 * @name DatepickerCtrl
 * 
 * @description A controller that holds properties for a datepicker.
 */
conferenceApp.controllers
		.controller('DatepickerCtrl',
				function($scope) {
					$scope.today = function() {
						$scope.dt = new Date();
					};
					$scope.today();

					$scope.clear = function() {
						$scope.dt = null;
					};

					// Disable weekend selection
					$scope.disabled = function(date, mode) {
						return (mode === 'day' && (date.getDay() === 0 || date
								.getDay() === 6));
					};

					$scope.toggleMin = function() {
						$scope.minDate = ($scope.minDate) ? null : new Date();
					};
					$scope.toggleMin();

					$scope.open = function($event) {
						$event.preventDefault();
						$event.stopPropagation();
						$scope.opened = true;
					};

					$scope.dateOptions = {
						'year-format' : "'yy'",
						'starting-day' : 1
					};

					$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy/MM/dd',
							'shortDate' ];
					$scope.format = $scope.formats[0];
				});
