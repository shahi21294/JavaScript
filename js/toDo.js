			
			function removeTask(){
					var taskRow=this.parentNode.parentNode;
					var tbody=taskRow.parentNode;
					tbody.removeChild(taskRow);
			}
			function addNewTask(EnterKey) {
				if(event.key === 'Enter') {
					if(EnterKey.value) {
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
						var taskName=document.createTextNode(EnterKey.value);
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
						checkBox.addEventListener("change", doneTask);
						a.addEventListener("click", removeTask);
						
						checkBox.type="checkbox";
						newRow.className="all active";
						a.className="removeTask";
						label.className="container";
						spanOne.className="checkmark";
						img.src="img/cross.png";
						document.getElementById("addNewTask").value = "";
					}else{
						alert("Invalid Task Name");
					}        
				}
			}
			function doneTask() {
				var taskRow=this.parentNode.parentNode.parentNode;
				var span =taskRow.getElementsByTagName("span");
			  if (this.checked == true){
					org_html = span[1].innerHTML;
					new_html = "<strike>" + org_html + "</strike>";
					span[1].innerHTML = new_html;
					taskRow.setAttribute("class", "all complete");
			
			  } else {
					var strike =span[1].getElementsByTagName("strike");
					span[1].innerHTML = strike[0].innerHTML;
					taskRow.setAttribute("class", "all active");
			  }
			}
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