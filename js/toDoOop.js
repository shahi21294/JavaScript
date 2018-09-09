var toDo = function() {
	this.input = document.getElementById('addNewTask');
	this.addTask = function(entry) {
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
		var taskName=document.createTextNode(entry);
		d1.appendChild(newRow);
		newRow.appendChild(newTdOne);
		newTdOne.appendChild(label);
		label.appendChild(checkBox);
		label.appendChild(spanOne);
		newRow.appendChild(newTdTwo);
		newTdTwo.appendChild(spanTwo);
		spanTwo.appendChild (taskName);
		newRow.appendChild(newTdThree);
		newTdThree.appendChild(a);
		a.appendChild(img);
		checkBox.addEventListener("change", this.doneTask);
	    a.addEventListener("click", this.removeTask);
		checkBox.type="checkbox";
		newRow.className="all active";
		a.className="removeTask";
		label.className="container";
		spanOne.className="checkmark";
		img.src="img/cross.png";
		document.getElementById("addNewTask").value = "";
	}
  this.init = function() {
    this.addNewTask();
    this.doneTask();
	this.removeTask();
  }  
}

toDo.prototype.addNewTask = function() {
		var list = this;
		this.input.addEventListener('keydown', function(e) {
			if(e.keyCode === 13 ) {
				if(e.target.value.length > 0) {
					list.addTask(e.target.value);
					e.target.value = null;
				}else{
					alert("Invalid Task Name");
				}        
			}
		  });
	
}

toDo.prototype.doneTask = function() {
		if (this.checked == true){
			var taskRow=this.parentNode.parentNode.parentNode;
			var span =taskRow.getElementsByTagName("span");
			orgHtml = span[1].innerHTML;
			newHtml = "<strike>" + orgHtml + "</strike>";
			span[1].innerHTML = newHtml;
			taskRow.setAttribute("class", "all complete");
	
		} else if(this.checked == false) {
			var taskRow=this.parentNode.parentNode.parentNode;
			var span =taskRow.getElementsByTagName("span");
			var strike =span[1].getElementsByTagName("strike");
			span[1].innerHTML = strike[0].innerHTML;
			taskRow.setAttribute("class", "all active");
		}
}

toDo.prototype.removeTask = function() {
		var taskRow=this.parentNode.parentNode;
		var tbody=taskRow.parentNode;
		tbody.removeChild(taskRow);
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
