	var todos = JSON.parse(localStorage.getItem('taskJson') || '[]');
	var users=[{ ID:101, userName: "ali",password: "123456"},{ ID:102, userName: "reza",password: "123456"}];
	
	
	function createTask(taskName){
		todos.push({userID:getCurrenttUser(),value:taskName,is_completed: '0'});
		localStorage.setItem("taskJson", JSON.stringify(todos));
		clearTaskInput();
	}
	function getCurrenttUser(){
		return localStorage.getItem('loginID');
	}
	function changeTaskStatus(toDoName) {
		var found='';
		return function() {
				if (this.checked === true){
					found = getTaskByName(toDoName);
					todos[found].is_completed="1";
			} else if(this.checked === false) {
					found = getTaskByName(toDoName);
					todos[found].is_completed="0";
			}
			localStorage.setItem("taskJson", JSON.stringify(todos));
			init();
		}
	}
	function getTaskByName(name) {
		for( var i = 0, len = todos.length; i < len; i++ ){
				 if(todos[i].value === name )
					 return i;
		}
	}
	function removeTask(toDoName) {
		return function() {
			var found = getTaskByName(toDoName);
			todos.splice(found, 1);
			localStorage.setItem("taskJson", JSON.stringify(todos));
			init();
		}
	}
	function getUserID(userName,password){
		var findUser = 0;
		users.forEach(function(element) {
		if(userName===element['userName'] && password===element['password'])
			   findUser = element['ID'];
		});
		if(findUser===0)
			return 0;
		else 
			return findUser;
	}
	function getUserByID(){
		var findUser = 0;
		users.forEach(function(element) {
			if(element['ID']==getCurrenttUser())
				    findUser = element['userName'];
			}
		);
		if(findUser===0)
			return 0;
		else 
			return findUser;
	}
	function showTask() {
				var getUserTask =  todos.filter(function(taskObject) {
					return taskObject.userID == getCurrenttUser();
				});
				for( var i = 0, len = getUserTask.length; i < len; i++ ){
					if(getUserTask[i].is_completed==='0')
						generateTaskUI(getUserTask[i],false);
					else if(getUserTask[i].is_completed==='1'){
						generateTaskUI(getUserTask[i],true);
				}
			}
	}
	function login() {
		var fields = getUserNameAndPasswordInput().split('-');
		if(fields[0] || fields[1]){
			if(getUserID(fields[0],fields[1])!==0){
				localStorage.setItem("loginID", getUserID(fields[0],fields[1]));
				init();
			}else
				errorMessage(1);
		}else{
				errorMessage(1);
		}  
			
	}
	function logout() {	
		localStorage.setItem("loginID", "null");
		init();
	}
	function filterTask(type) {
		switch (type){
			case "all": 
				showHideTaskByType("all","block");
			break;
			case "complete" : 
				showHideTaskByType("all","none");
				showHideTaskByType("complete","block");
				
			break;
			case "active" :
				showHideTaskByType("all","none");
				showHideTaskByType("active","block");
				
			break;
		}
	}