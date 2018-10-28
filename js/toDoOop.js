
	var taskInput = document.querySelector("#addNewTask");
	var todos = JSON.parse(localStorage.getItem('taskJson') || '[]');
	var users=[{ ID:101, userName: "ali",password: "123456"},{ ID:102, userName: "reza",password: "123456"}];
	
	function createTask(taskName){
		todos.push({userID:getCurrenttUser(),value:taskName,is_completed: '0'});
		localStorage.setItem("taskJson", JSON.stringify(todos));
		document.querySelector("#addNewTask").value = "";
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
	taskInput.addEventListener('keydown', function(e) {
		if (e.which == 13) {
			if(e.target.value.length > 0) {
				createTask(e.target.value);
				init();
			}else{
				errorMessage(2);
			}        
		}
	});
	function destroyTask(){
		var tBody = document.getElementById("appendTask");
		while (tBody.firstChild) {
			tBody.removeChild(tBody.firstChild);
		}
	}
	var getUserTask =  todos.filter(function(taskObject) {
				return taskObject.userID == getCurrenttUser();
	});
	function showTask() {
			var ulBody = document.getElementById('appendTask');
			for( var i = 0, len = getUserTask.length; i < len; i++ ){
					var li=document.createElement("li");
					var checkBox=document.createElement("input");
					var label=document.createElement("label");
					var img=document.createElement("img");
					var taskName=document.createTextNode(getUserTask[i].value);
					ulBody.appendChild(li);
					li.appendChild(checkBox);
					li.appendChild(label);
					li.appendChild(img);
					label.appendChild (taskName);
					checkBox.addEventListener("change", changeTaskStatus(getUserTask[i].value));
					img.addEventListener("click",removeTask(getUserTask[i].value));
					checkBox.type="checkbox";
					img.className="removeTask";
					img.src="img/cross.png";
					if(getUserTask[i].is_completed==='0'){
						checkBox.checked = false;
						li.className="all active";
					}else if(getUserTask[i].is_completed==='1'){
						label.style["text-decoration"] = "line-through";
						checkBox.checked = true;
						li.className="all complete";
					}
		 }
	}
	function init() {
		if (getUserByID()) {
			document.getElementById("loginShow").style.display = "none";
			document.getElementById("taskShow").style.display = "block";
			document.getElementById("userWelcome").innerHTML = getUserByID();
			document.getElementById("logout").addEventListener("click", logout);	
			destroyTask();
			showTask();
		} else {
		   document.getElementById("login").addEventListener("click", login);	
		   document.getElementById("loginShow").style.display = "block";
		   document.getElementById("taskShow").style.display = "none";
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
	function getUserNameAndPasswordInput(){
		var userName = document.getElementById('user').value;
		var password = document.getElementById('pass').value;
		return userName+'-'+password;
	}
	function errorMessage(errorCode){
		switch (errorCode){
			case 1: 
				alert("Invalid UserName and Password");
			break;
			case 2: 
				alert("Invalid Task Name");
			break;
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
	function showHideTaskByType(type,displayStyle) {
		var element=document.getElementsByClassName(type);
		for (var i=0;i<element.length;i+=1){
			element[i].style.display = displayStyle;
		}
	}
	init();

 