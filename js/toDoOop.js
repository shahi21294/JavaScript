var toDo = function() {
	this.input = document.getElementById('addNewTask');
	this.todos = JSON.parse(localStorage.getItem('taskJson') || '[]');
	console.log(this.todos );
	this.showTask = function() {
			var tBody = document.getElementById("appendtask");
				while (tBody.firstChild) {
					tBody.removeChild(tBody.firstChild);
				}
			for( var i = 0, len = this.todos.length; i < len; i++ ){
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
	this.addTask = function(entry) {
		this.todos.push({ value: entry,state: '0'});
		localStorage.setItem("taskJson", JSON.stringify(this.todos));
	}
	this.modifyTask = function(entry) {
		var found = this.getTaskByName('entry');
	}
	this.getTaskByName = function(name) {
		for( var i = 0, len = this.todos.length; i < len; i++ ){ 
				 if( this.todos[i].value === name )
					 return i;
		}
	}

	this.init = function() {
		this.showTask();
		this.addNewTask();
	}  
}
toDo.prototype.addNewTask = function() {
		var list = this;
		this.input.addEventListener('keydown', function(e) {
			if(e.keyCode === 13 ) {
				if(e.target.value.length > 0) {
					list.addTask(e.target.value);
					list.showTask();
					e.target.value = null;
				}else{
					alert("Invalid Task Name");
				}        
			}
		  });
}
toDo.prototype.doneTask = function(toDoName) {
	var list = this;
	return function() {
			if (this.checked == true){
				var found = list.getTaskByName(toDoName);
				list.todos[found].state="1";
		} else if(this.checked == false) {
				var found = list.getTaskByName(toDoName);
				list.todos[found].state="0";
		}
		localStorage.setItem("taskJson", JSON.stringify(list.todos));
		list.showTask();
	}
}
toDo.prototype.removeTask = function(toDoName) {
		var list = this;
		return function() {
			var found = list.getTaskByName(toDoName);
			list.todos.splice(found, 1);
			localStorage.setItem("taskJson", JSON.stringify(list.todos));
			list.showTask();
		}

		
}
var lists = {};
lists = new toDo().init();
function showHide(type) {
	if(type=='all'){
		var element=document.getElementsByClassName("all")
			for (var i=0;i<element.length;i+=1){
			  element[i].style.display = 'table-row';
			}
	}else if (type=='complete'){
		var element=document.getElementsByClassName("all")
			for (var i=0;i<element.length;i+=1){
			  element[i].style.display = 'none';
			}
		var element=document.getElementsByClassName("complete")
			for (var i=0;i<element.length;i+=1){
			  element[i].style.display = 'table-row';
			}
	}else if (type=='active'){
		var element=document.getElementsByClassName("all")
			for (var i=0;i<element.length;i+=1){
			  element[i].style.display = 'none';
			}
		var element=document.getElementsByClassName("active")
			for (var i=0;i<element.length;i+=1){
			  element[i].style.display = 'table-row';
			}
	  }
}
