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
		.state('alarmSet',
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
		.state('alarmPlay',
				{
					url : '/play/:id',
					templateUrl : '../views/alarmPlay.html',
					controller : 'alarmPlayController'
				}
			)
		myProviderProvider.doConfig(appId);
});

var controllers = {};

controllers.alarmPlayController = function ($rootScope,$scope,$interval,$state) {

	$scope.getAlarm = function(id) {
		var allAlarms = JSON.parse(localStorage.getItem('alarmList'));
		return allAlarms[id];
	}

	if($state.params.id)
	{
		var alarmDetails = $scope.getAlarm($state.params.id);
		console.log(alarmDetails);
		
		$scope.hr = alarmDetails['selectedHr'];
		$scope.min = alarmDetails['selectedMin'];
		$scope.amPM = alarmDetails['selectedAMPM'];
		$scope.snooze = alarmDetails['snooze'];
		$scope.labelTxt = alarmDetails['label'];
		$scope.alarmType = alarmDetails['selectedType'];
		$scope.days = alarmDetails['selectedDays'].join();
	}
}

controllers.alarmListController = function ($rootScope,$scope,$state) {
	$scope.alarmList = JSON.parse(localStorage.getItem('alarmList'));

	$scope.editThis = function(i) {
		$state.go('alarmSet', { id: i });
	}
};

controllers.clockController = function ($rootScope,$scope,$interval,$state) {
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

		var alarmList = (localStorage.getItem('alarmList')) ? JSON.parse(localStorage.getItem('alarmList')) : [];
		
		if(alarmList.length > 0) {
			var setForCurrentDay = false;
			
			angular.forEach(alarmList, function(alarmDetails, key){

				if(alarmDetails['selectedAMPM'] == 'PM' && alarmDetails['selectedHr'] != 12)
				{
					selectedHr = ((alarmDetails['selectedHr'] + 12) < 24) ? (alarmDetails['selectedHr'] + 12) : 0
				}
				else
				{
					selectedHr = alarmDetails['selectedHr'];
				}
				
				var loopFlag = true;

				angular.forEach(alarmDetails['selectedDays'], function(day){
					if(loopFlag) {
						var idx = weekday.indexOf(day);
				     	if(idx == currentDate.getDay()) {
				     		setForCurrentDay = true;
				     		loopFlag = false;
				     	}
					}
			    });

				console.log(setForCurrentDay,selectedHr,alarmDetails['selectedMin'],alarmDetails['selectedAMPM'],currentDate.getHours(),currentDate.getMinutes())
				
				if(setForCurrentDay && currentDate.getHours() == selectedHr && currentDate.getMinutes() == alarmDetails['selectedMin'])
					$state.go('alarmPlay', { id: key });
				
		    });
		}
	}
};

var alarmListArr = [];

controllers.addAlarmController = function ($rootScope,$scope,filterFilter,$state) {
	
	$scope.editFlag = false;

	var hours = [...Array(13).keys()];
	hours.shift();

	$scope.hour = hours;
	$scope.min = [...Array(60).keys()];
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

		if(localStorage.getItem('alarmList'))
			alarmListArr = JSON.parse(localStorage.getItem('alarmList'));

		if($state.params.id != '')
		{
			alarmListArr[$state.params.id] = alarmSettings;
		}
		else
		{
			alarmListArr.push(alarmSettings);
		}

		console.log(alarmListArr);

		localStorage.setItem("alarmList", JSON.stringify(alarmListArr));
	}

	$scope.deleteAlarm = function() {
		var alarmListArrNew = [];

		if($state.params.id)
		{
			var alarmListArrOld = JSON.parse(localStorage.getItem('alarmList'));

			angular.forEach(alarmListArrOld, function(arr, key){
				console.log(key,arr);
				if(key != $state.params.id)
					alarmListArrNew.push(arr);
		    });

		    localStorage.setItem("alarmList", JSON.stringify(alarmListArrNew));
		    $state.go('alarmList');
		}
		
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
