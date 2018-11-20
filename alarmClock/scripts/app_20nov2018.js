var myApp = angular.module('myApp',['ui.router']);

myApp.config(function ($stateProvider,$urlRouterProvider,myProviderProvider,appId) {
	$urlRouterProvider.otherwise('/clock');
	$stateProvider
		.state('clock',
				{
					url : '/clock',
					templateUrl : '../views/clock.html',
					controller : 'clockController'
				}
			)
		.state('alarm',
				{
					url : '/add/{id:[0-9]*}',
					templateUrl : '../views/addAlarm.html',
					controller : 'addAlarmController'
				}
			)
		.state('alarmList',
				{
					url : '/list',
					templateUrl : '../views/alarmList.html',
					controller : 'alarmListController'
				}
			)
		myProviderProvider.doConfig(appId);
});

var controllers = {};

controllers.alarmListController = function ($rootScope,$scope,$state) {
	$scope.alarmList = JSON.parse(localStorage.getItem('alarmList'));

	$scope.editThis = function(i) {
		$state.go("alarm", { id: i });
	}
};

controllers.clockController = function ($rootScope,$scope,$interval) {
	$scope.displayDate = '';
	$scope.displayTime = '';

	$interval(function(){$scope.tick()}, 1000);
	
	$scope.tick = function() {
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday'];

		var currentDate = new Date();
		
		var dateDisplay = weekday[currentDate.getDay()].substring(0,3) + ' ' + currentDate.getDate() + ' ' + months[currentDate.getMonth()] + ', ' + currentDate.getFullYear();
		var timeDisplay = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
		
		$scope.displayDate = dateDisplay;
		$scope.displayTime = timeDisplay;
	}
};

var alarmListArr = [];

controllers.addAlarmController = function ($rootScope,$scope,filterFilter,$state) {
	
	$scope.editFlag = false;

	$scope.hour = [...Array(12).keys()];
	$scope.min = [...Array(59).keys()];
	$scope.amPM = ['AM','PM'];

	$scope.weekdays = [
	    { name: 'Sunday',    selected: false },
	    { name: 'Monday',   selected: false },
	    { name: 'Tuesday',     selected: false },
	    { name: 'Wednesday', selected: false },
	    { name: 'Thursday', selected: false },
	    { name: 'Friday', selected: false },
	    { name: 'Saturday', selected: false }
	  ];
	
	$scope.alarmTypes = [
	    { name: 'None',    selected: false },
	    { name: 'Radar',   selected: false },
	    { name: 'Beep',     selected: false }
	  ];

	$scope.snoozeEnable = false;
	$scope.alarmLabel = '';

	$scope.getAlarm = function(id) {
		var allAlarms = JSON.parse(localStorage.getItem('alarmList'));
		return allAlarms[id];
	}

	if($state.params.id)
	{
		$scope.editFlag = true;

		var allDays = [];

		var alarmDetails = $scope.getAlarm($state.params.id);
		console.log(alarmDetails);
		
		$scope.hrSelected = alarmDetails['selectedHr'];
		$scope.minSelected = alarmDetails['selectedMin'];
		$scope.amPMSelected = alarmDetails['selectedAMPM'];
		$scope.snoozeEnable = alarmDetails['snooze'];
		$scope.alarmLabel = alarmDetails['label'];
		$scope.alarmTypeSelected = alarmDetails['selectedType'];

		angular.forEach($scope.weekdays, function(day){
	      	allDays.push(day.name);
	    });

		angular.forEach(alarmDetails['selectedDays'], function(day){
			var idx = allDays.indexOf(day);
	     	if(idx !== -1)
	     		$scope.weekdays[idx].selected = true;
	    });
	}

	$scope.saveAlarm = function() {

		$scope.daysSelected = [];

		angular.forEach($scope.weekdays, function(day){
	      if (day.selected) $scope.daysSelected.push(day.name);
	    });

	    // console.log($scope.daysSelected);
	    // console.log($scope.alarmTypeSelected);

	    var alarmSettings = {
			'selectedHr': $scope.hrSelected, 
			'selectedMin': $scope.minSelected, 
			'selectedAMPM' : $scope.amPMSelected,
			'label' : $scope.alarmLabel,
			'snooze' : $scope.snoozeEnable,
			'selectedDays': $scope.daysSelected, 
			'selectedType': $scope.alarmTypeSelected, 
		};

		alarmListArr = JSON.parse(localStorage.getItem('alarmList'));

		if($state.params.id && $state.params.id > -1)
		{
			alarmListArr[$state.params.id] = alarmSettings;
		}
		else
		{
			alarmListArr.push(alarmSettings);
		}

		console.log(alarmListArr);

		localStorage.setItem("alarmList", JSON.stringify(alarmListArr));

		/*
		// Helper method to get selected days
		$scope.selectedDays = function selectedDays() {
			return filterFilter($scope.weekdays, { selected: true });
		};

		// Watch days for changes
		$scope.$watch('weekdays|filter:{selected:true}', function (nv) {
			
			$scope.selection = nv.map(function (days) {
			  return days.name;
			});
			
			var arr = [{
				'selectedHr': $scope.hrSelected, 
				'selectedMin': $scope.minSelected, 
				'selectedDays': $scope.selection, 
				'selectedAMPM' : $scope.amPMSelected
			}];

			$scope.alarmList.push(arr);
			console.log($scope.alarmList);
			localStorage.setItem("alarmList", JSON.stringify($scope.alarmList));

		}, true);
		*/
	}

	$scope.deleteAlarm = function() {
		
	}
};

//Constants
myApp.constant('appId','008');

controllers.MyController4 = function (appId) {
	console.log(appId);
};

//Providers
myApp.provider('myProvider',function () {
	var provider = {};
	var configParam = '';

	provider.doConfig = function (conf) {
		configParam = conf;
	};

	provider.$get = function () {
		var service = {};

		service.providerFunc = function () {
			console.log('Inside Provider - ' + configParam);
		};

		return service;
	};

	return provider;
});

myApp.controller(controllers);
