var users='{\
  "users": [\
    {\
      "id": "100",\
      "userName": "ali",\
      "password": "MTIzNDU2"\
    },{\
      "id": "101",\
      "userName": "reza",\
      "password": "MTIzNDU2"\
    }\
  ]\
}';
class User {
  constructor(userName,password) {
    this.userName = userName;
    this.password = password;
  }
}
var toDo = function() {
	this.input = document.getElementById('addNewTask');
	this.todos = JSON.parse(localStorage.getItem('taskJson') || '[]');
	this.showTask = function() {
			var tBody = document.getElementById("appendtask");
				while (tBody.firstChild) {
					tBody.removeChild(tBody.firstChild);
				}
			var userID=localStorage.getItem('loginID');	
			for( var i = 0, len = this.todos.length; i < len; i++ ){
				if(userID===this.todos[i].userID){
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
					var taskName=document.createTextNode(this.todos[i].value);
					d1.appendChild(newRow);
					newRow.appendChild(newTdOne);
					newTdOne.appendChild(checkBox);
					newRow.appendChild(newTdTwo);
					newTdTwo.appendChild(spanTwo);
					if(this.todos[i].state==='0'){
						spanTwo.appendChild (taskName);
						newRow.className="all active";
						checkBox.checked = false;
					}else if(this.todos[i].state==='1'){
						spanTwo.appendChild (strike);
						strike.appendChild (taskName);
						newRow.className="all complete";
						checkBox.checked = true;
					}
					newRow.appendChild(newTdThree);
					newTdThree.appendChild(a);
					a.appendChild(img);
					checkBox.addEventListener("change", this.doneTask(this.todos[i].value));
					a.addEventListener("click",this.removeTask(this.todos[i].value));
					checkBox.type="checkbox";
					a.className="removeTask";
					label.className="container";
					img.src="img/cross.png";
					document.getElementById("addNewTask").value = "";
				}
		 }
	};
	this.addTask = function(entry,userID) {
		this.todos.push({ userID:userID, value: entry,state: '0'});
		localStorage.setItem("taskJson", JSON.stringify(this.todos));
	};
	
	this.getTaskByName = function(name) {
		for( var i = 0, len = this.todos.length; i < len; i++ ){ 
				 if( this.todos[i].value === name )
					 return i;
		}
	};
};
toDo.prototype.addNewTask = function() {
		var list = this;
		this.input.addEventListener('keydown', function(e) {
			if(e.keyCode === 13 ) {
				if(e.target.value.length > 0) {
					var userID=localStorage.getItem('loginID');
					list.addTask(e.target.value,userID);
					list.showTask();
					e.target.value = null;
				}else{
					alert("Invalid Task Name");
				}        
			}
		  });
};
toDo.prototype.doneTask = function(toDoName) {
	var list = this;
    var found='';
	return function() {
			if (this.checked === true){
				found = list.getTaskByName(toDoName);
				list.todos[found].state="1";
		} else if(this.checked === false) {
				found = list.getTaskByName(toDoName);
				list.todos[found].state="0";
		}
		localStorage.setItem("taskJson", JSON.stringify(list.todos));
		list.showTask();
	}
};
toDo.prototype.removeTask = function(toDoName) {
		var list = this;
		return function() {
			var found = list.getTaskByName(toDoName);
			list.todos.splice(found, 1);
			localStorage.setItem("taskJson", JSON.stringify(list.todos));
			list.showTask();
		}
};
function init() {
		var user=localStorage.getItem('loginID');
		if (user != "null") {
			document.getElementById("loginShow").style.display = "none";
			document.getElementById("taskShow").style.display = "block";
			document.getElementById("userWelcome").innerHTML = user;
			new toDo().showTask();
		} else {
		   document.getElementById("loginShow").style.display = "block";
		   document.getElementById("taskShow").style.display = "none";
		}
		new toDo().addNewTask();
		document.getElementById("login").addEventListener("click", login);
}  
init();
   
function login() {	
	var userName = document.getElementById('user').value;
	var password = document.getElementById('pass').value;
	if(user || pass){
		if(checkUser(userName,password)!=0){
			localStorage.setItem("loginID", userName);
			init();
		}else{
			alert("Invalid UserName and Password");
		}  
	}else{
		alert("Invalid UserName and Password");
	}   
}
function logout() {	
	localStorage.setItem("loginID", null);
	init();
}
function checkUser(userName,password){
	var data = JSON.parse(users);
	var findUser = 0;
	data['users'].forEach(function(element) {
	if(userName===element['userName'] && btoa(password)===element['password'])
		   findUser = userName;
	});
	if(findUser===0)
		return 0;
	else 
		return findUser;
}
function showHide(type) {
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
