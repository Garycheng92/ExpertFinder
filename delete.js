//post request to delete skill
function deleteSkill(buttonID){
		var but=document.getElementById(buttonID)
		
		var par=but.parentElement.parentElement
		console.log(par)
		var del_skill={};
		del_skill.userID=document.getElementById('storedUserID').value
		
		for (var i=0; i < par.children.length;i++){
			if ((par.children[i]).getAttribute('id')=='skill'){
				console.log('skill value: '+ par.children[i].innerHTML)
				del_skill.skillName=par.children[i].innerHTML;
			}
		}

		var request = new XMLHttpRequest();
		request.open("POST", '/Feature1_delete_skill', true);
		request.setRequestHeader('Content-Type', 'application/json');
		request.addEventListener('load',function()
		{
			if(request.status >= 200 && request.status < 400)
			{
				location.reload();
			} 
			else 
			{
			  console.log(request.status);
			}
	  });
		console.log(JSON.stringify(del_skill));
		request.send(JSON.stringify(del_skill));
		event.preventDefault();
}