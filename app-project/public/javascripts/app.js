var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http) {
    $scope.data = [];
    var request = $http.get('/api/todos');    
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

    $scope.addTask = function () {
    	dataObj = {name:document.getElementById('name').value};

    	var request = $http.post('/api/todos', dataObj);    
	    request.success(function(data) {
	        $scope.data = data;
	    });
	    request.error(function(data){
	        console.log('Error: ' + data);
	    });	
    }
});


app.controller('userController', function($scope, $http) {
    $scope.data = [];
    var request = $http.get('/api/users');    
    request.success(function(data) {
        $scope.users = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

    $scope.addUser = function () {
        dataObj = {name:document.getElementById('name').value,mobile:document.getElementById('mobile').value};

        var request = $http.post('/api/users', dataObj);    
        request.success(function(data) {
            $scope.users = data;
        });
        request.error(function(data){
            console.log('Error: ' + data);
        }); 
    }
});


app.controller('chatController', function($scope, $http) {
    
    var r = document.getElementById('reciever').value;
    var request = $http.get('/api/chat/'+r);    
    request.success(function(data) {
        $scope.chat = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
    

    $scope.sendMsg = function () {
        dataObj = {
            sender:document.getElementById('sender').value,
            message:document.getElementById('message').value,
            reciever:document.getElementById('reciever').value
        };

        var request = $http.post('/api/sendmsg', dataObj);    
        request.success(function(data) {
            $scope.chat = data;
        });
        request.error(function(data){
            console.log('Error: ' + data);
        }); 
    }
});




app.controller('loginController', function($scope, $http, $q) {
   
    $scope.login = function () {
        var userdata = '';

        dataObj = {mobile:document.getElementById('mobile').value};

        var request = $http.post('/api/login', dataObj);
   
        request.success(function(data) {
            if(data)
            {
                console.log(data);
                setTimeout(function(){ window.location = '/users' ; }, 3000);
            }
        });
        request.error(function(data){
            console.log('Error: ' + data);
        });
    }
});
