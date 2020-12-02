//Get request to get new page of experts
const pgInput=document.getElementById('newPage');
const pgForm=document.getElementById('pagenationForm')

function getNewPage(new_pg){
	pgInput.value=new_pg;
	pgForm.submit();
}