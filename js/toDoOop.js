	var taskInput = document.querySelector("#addNewTask");
	function clearTaskInput(){
		document.querySelector("#addNewTask").value = "";
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
	function generateTaskUI(taskTitle,isComplete) {
			var ulBody = document.getElementById('appendTask');
			var li=document.createElement("li");
			var checkBox=document.createElement("input");
			var label=document.createElement("label");
			var img=document.createElement("img");
			var taskName=document.createTextNode(taskInd);
			ulBody.appendChild(li);
			li.appendChild(checkBox);
			li.appendChild(label);
			li.appendChild(img);
			label.appendChild (taskName);
			checkBox.addEventListener("change", changeTaskStatus(taskTitle));
			img.addEventListener("click",removeTask(taskTitle));
			checkBox.type="checkbox";
			img.className="removeTask";
			img.src="img/cross.png";
			if(isComplete){
				//label.style["text-decoration"] = "line-through";
				checkBox.checked = true;
				li.className="all complete";
			}else{
				checkBox.checked = false;
				li.className="all active";
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

	function showHideTaskByType(type,displayStyle) {
		var element=document.getElementsByClassName(type);
		for (var i=0;i<element.length;i+=1){
			element[i].style.display = displayStyle;
		}
	}
	init();

 