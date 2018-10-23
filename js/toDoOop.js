
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
	function showTask() {
			destroyTask();
			var getUserTask =  todos.filter(function(taskObject) {
				return taskObject.userID == getCurrenttUser();
			});
			for( var i = 0, len = getUserTask.length; i < len; i++ ){
					var d1 = document.getElementById('appendTask');
					var newRow=document.createElement("tr");
					var newTdOne=document.createElement("td");
					var newTdTwo=document.createElement("td");
					var newTdThree=document.createElement("td");
					var checkBox=document.createElement("input");
					var a=document.createElement("a");
					var img=document.createElement("img");
					var spanOne=document.createElement("span");
					var spanTwo=document.createElement("span");
					var label=document.createElement("label");
					var strike=document.createElement("strike");
					var taskName=document.createTextNode(getUserTask[i].value);
					d1.appendChild(newRow);
					newRow.appendChild(newTdOne);
					newTdOne.appendChild(checkBox);
					newRow.appendChild(newTdTwo);
					newTdTwo.appendChild(spanTwo);
					if(getUserTask[i].is_completed==='0'){
						spanTwo.appendChild (taskName);
						newRow.className="all active";
						checkBox.checked = false;
					}else if(getUserTask[i].is_completed==='1'){
						spanTwo.appendChild (strike);
						strike.appendChild (taskName);
						newRow.className="all complete";
						checkBox.checked = true;
					}
					newRow.appendChild(newTdThree);
					newTdThree.appendChild(a);
					a.appendChild(img);
					checkBox.addEventListener("change", changeTaskStatus(getUserTask[i].value));
					a.addEventListener("click",removeTask(getUserTask[i].value));
					checkBox.type="checkbox";
					a.className="removeTask";
					label.className="container";
					img.src="img/cross.png";
		 }
	}
	function init() {
		if (getUserByID()) {
			document.getElementById("loginShow").style.display = "none";
			document.getElementById("taskShow").style.display = "block";
			document.getElementById("userWelcome").innerHTML = getUserByID();
			document.getElementById("logout").addEventListener("click", logout);	
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
				showHideTaskByType("all","table-row");
			break;
			case "complete" : 
				showHideTaskByType("complete","table-row");
				showHideTaskByType("all","none");
			break;
			case "active" :
				showHideTaskByType("active","table-row");
				showHideTaskByType("all","none");
			break;
		}
	}
	function showHideTaskByType(type) {
		var element=document.getElementsByClassName(type);
		for (var i=0;i<element.length;i+=1){
			element[i].style.display = 'table-row';
		}
	}
	init();

 