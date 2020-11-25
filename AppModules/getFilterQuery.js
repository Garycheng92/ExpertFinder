//logic for determining query route
const search=require('./Search')

function getFilterQuery(reqBody)
{
	filter_c=true
	filter_i=true
	filter_s=true

	// filter by course?
	if (reqBody.course)
	{
		if (Array.isArray(reqBody.course) && reqBody.course.indexOf("All") !== -1)
		{
			filter_c=false

		}
		else if (reqBody.course=="All")
		{
			filter_c=false
			
		}
	}
	else
	{
		filter_c=false
	}
	
	// filter by skillset?
	if (reqBody.skillset)
	{
		if (Array.isArray(reqBody.skillset) && reqBody.skillset.indexOf("All") !== -1)
		{
			filter_s=false
		}
		else if (reqBody.skillset=="All")
		{
			filter_s=false
		}
	}
	else
	{
		filter_s=false
	}
		
	// filter by industry?
	if (reqBody.industry)
	{
		if (Array.isArray(reqBody.industry) && reqBody.industry.indexOf("All") !== -1)
		{
			filter_i=false
		}
		else if (reqBody.industry=="All")
		{
			filter_i=false
		}
	}
	else
	{
		filter_i=false
	}
	let filter={}
	if (filter_i && filter_s && filter_c){
		filter= new search.FilterSCI(reqBody)
	}
	else if (filter_i && filter_s){
		filter= new search.FilterSI(reqBody)
	}
	else if (filter_s && filter_c){
		filter= new search.FilterSC(reqBody)
	}
	else if (filter_i && filter_c){
		filter= new search.FilterCI(reqBody)
	}
	else if (filter_i){
		filter= new search.FilterI(reqBody)
	}
	else if (filter_c){
		filter= new search.FilterC(reqBody)
	}
	else if (filter_s){
		filter= new search.FilterS(reqBody)
	}
	else {
		filter= new search.FilterNF(reqBody)
	}
	filter.getAddConstraintCount()
	console.log('filter as filter child Object: ' +filter)
	return filter
}


module.exports.getFilterQuery=getFilterQuery