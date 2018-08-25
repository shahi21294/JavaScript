var taskNumberArray = [];
			for(var i = 1; i <= 100; i++){
				taskNumberArray.push(i);
			}
			var taskCounter=0;
			
			function removeTask(id){
					var element = document.getElementById('RemoveId-'+id);
					element.parentNode.removeChild(element);
			}
			function addNewTask(EnterKey) {
				if(event.key === 'Enter') {
					if(EnterKey.value) {
						var d1 = document.getElementById('appendtask');
						d1.insertAdjacentHTML('afterbegin', '<tr id="RemoveId-'+taskNumberArray[taskCounter]+'" class="all active">\
													<td style="width: 5%;">\
																	<input type="checkbox"  id="check-'+taskNumberArray[taskCounter]+'" onclick="doneTask('+taskNumberArray[taskCounter]+');"><label for="check-'+taskNumberArray[taskCounter]+'"></label>\
													</td>\
													<td >\
														<span id="textField-'+taskNumberArray[taskCounter]+'">'+EnterKey.value+'</span>\
													</td>\
													<td style="width: 5%;">\
														 <a  id="removeTask" onclick="removeTask('+taskNumberArray[taskCounter]+');" ><img src="img/cross.png" ></i></a>\
													</td>\
												</tr>');
						taskCounter=taskCounter+1;	
						document.getElementById("addNewTask").value = "";
					}else{
						alert("Invalid Task Name");
					}        
				}
			}
			function doneTask(checkBoxId) {
			  var checkBox = document.getElementById('check-'+checkBoxId);
			  if (checkBox.checked == true){
					org_html = document.getElementById("textField-"+checkBoxId).innerHTML;
					new_html = "<strike id='strike-"+checkBoxId+"'>" + org_html + "</strike>";
					document.getElementById("textField-"+checkBoxId).innerHTML = new_html;
					document.getElementById("RemoveId-"+checkBoxId).setAttribute("class", "all complete");
			
			  } else {
				document.getElementById("strike-"+checkBoxId).outerHTML = document.getElementById("strike-"+checkBoxId).innerHTML;
				document.getElementById("RemoveId-"+checkBoxId).setAttribute("class", "all active");
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