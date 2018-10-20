
	var taskInput = document.querySelector("#addNewTask");
	var todos = JSON.parse(localStorage.getItem('taskJson') || '[]');
	var users=[{ ID:101, userName: "ali",password: "123456"},{ ID:102, userName: "reza",password: "123456"}];
	
	function createTodo(taskName,userID){
		todos.push({userID:userID,value:taskName,state: '0'});
		localStorage.setItem("taskJson", JSON.stringify(todos));
		document.querySelector("#addNewTask").value = "";
	}
	function getCurrenttUser(){
		return localStorage.getItem('loginID');
	}
	function doneTask(toDoName) {
		var found='';
		return function() {
				if (this.checked === true){
					found = getTaskByName(toDoName);
					todos[found].state="1";
			} else if(this.checked === false) {
					found = getTaskByName(toDoName);
					todos[found].state="0";
			}
			localStorage.setItem("taskJson", JSON.stringify(todos));
			init();
		}
	};
	function getTaskByName(name) {
		for( var i = 0, len = todos.length; i < len; i++ ){ 
				 if(todos[i].value === name )
					 return i;
		}
	};
	function removeTask(toDoName) {
		return function() {
			var found = getTaskByName(toDoName);
			todos.splice(found, 1);
			localStorage.setItem("taskJson", JSON.stringify(todos));
			init();
		}
	};
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
	function getUserByID(userID){
		var findUser = 0;
		users.forEach(function(element) {
			if(element['ID']==userID)
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
				createTodo(e.target.value,getCurrenttUser());
				init();
			}else{
				alert("Invalid Task Name");
			}        
		}
	});
	function init() {
		var userID=localStorage.getItem('loginID');
		if (getUserByID(userID)) {
			document.getElementById("loginShow").style.display = "none";
			document.getElementById("taskShow").style.display = "block";
			document.getElementById("userWelcome").innerHTML = getUserByID(userID);
			document.getElementById("logout").addEventListener("click", logout);	
			showTask();
		} else {
		   document.getElementById("login").addEventListener("click", login);	
		   document.getElementById("loginShow").style.display = "block";
		   document.getElementById("taskShow").style.display = "none";
		}
	}
	function showTask() {
			var tBody = document.getElementById("appendtask");
				while (tBody.firstChild) {
					tBody.removeChild(tBody.firstChild);
				}
			var userID=localStorage.getItem('loginID');	
			for( var i = 0, len = todos.length; i < len; i++ ){
				if(userID==todos[i].userID){
					var d1 = document.getElementById('appendtask');
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
					var taskName=document.createTextNode(todos[i].value);
					
					d1.appendChild(newRow);
					newRow.appendChild(newTdOne);
					newTdOne.appendChild(checkBox);
					newRow.appendChild(newTdTwo);
					newTdTwo.appendChild(spanTwo);
					if(todos[i].state==='0'){
						spanTwo.appendChild (taskName);
						newRow.className="all active";
						checkBox.checked = false;
					}else if(todos[i].state==='1'){
						spanTwo.appendChild (strike);
						strike.appendChild (taskName);
						newRow.className="all complete";
						checkBox.checked = true;
					}
					newRow.appendChild(newTdThree);
					newTdThree.appendChild(a);
					a.appendChild(img);
					checkBox.addEventListener("change", doneTask(todos[i].value));
					a.addEventListener("click",removeTask(todos[i].value));
					checkBox.type="checkbox";
					a.className="removeTask";
					label.className="container";
					img.src="img/cross.png";
					
				}
		 }
	};	
	function login() {	
		var userName = document.getElementById('user').value;
		var password = document.getElementById('pass').value;
		if(user || pass){
			if(getUserID(userName,password)!==0){
				localStorage.setItem("loginID", getUserID(userName,password));
				init();
			}else
				alert("Invalid UserName and Password");
		}else{
				alert("Invalid UserName and Password");
		}   
	}
	function logout() {	
		localStorage.setItem("loginID", "null");
		init();
	}
	function filterTask(type) {
		var element='';
		var i=0;
		if(type==='all'){
			 element=document.getElementsByClassName("all");
				for (i=0;i<element.length;i+=1){
				  element[i].style.display = 'table-row';
				}
		}else if (type==='complete'){
			element=document.getElementsByClassName("all");
				for (i=0;i<element.length;i+=1){
				  element[i].style.display = 'none';
				}
			 element=document.getElementsByClassName("complete");
				for (i=0;i<element.length;i+=1){
				  element[i].style.display = 'table-row';
				}
		}else if (type==='active'){
			 element=document.getElementsByClassName("all");
				for (i=0;i<element.length;i+=1){
				  element[i].style.display = 'none';
				}
			 element=document.getElementsByClassName("active");
				for (i=0;i<element.length;i+=1){
				  element[i].style.display = 'table-row';
				}
		  }
	}
	init();

 