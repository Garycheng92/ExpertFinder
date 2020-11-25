const express = require('express');
const app = express();
const filterQuery=require('./sqlF2Filter')
var mysql = require('./dbcon.js');
app.set('mysql', mysql);

function courseParams(searchArray,courses){
	searchArray.push(courses)
	if (Array.isArray(courses)){
		searchArray.push(courses.length)
	}
	else{
		searchArray.push(1)
	}
	return searchArray
}

function industryParams(searchArray,industries){
	searchArray.push(industries)
	if (Array.isArray(industries)){
		searchArray.push(industries.length)
	}
	else{
		searchArray.push(1)
	}
	return searchArray
}


function skillsetParams(searchArray,skillsets){
	searchArray.push(skillsets)
	if (Array.isArray(skillsets)){
		searchArray.push(skillsets.length)
	}
	else{
		searchArray.push(1)
	}
	return searchArray
}


class Search{
	constructor(requestBody){
		this.queryString='';
		this.searchParams=[];
		this.course=requestBody.course
		this.skillset=requestBody.skillset
		this.industry=requestBody.industry
	}
	getAddConstraintCount(){
		this.searchParams=[];
	}
}


class SearchBar extends Search{
	constructor(requestBody){
		super(requestBody);
	}
}


class Filter extends Search{
	constructor(requestBody){
		super(requestBody);
		this.queryString=filterQuery.nf;
	}
}

class FilterC extends Filter{
	constructor(requestBody){
		super(requestBody);
		this.queryString=filterQuery.c
	}
	getAddConstraintCount(){
		this.searchParams=courseParams(this.searchParams,this.course)
	}
}

class FilterI extends Filter{
	constructor(requestBody){
		super(requestBody);
		this.queryString=filterQuery.i
	}
	getAddConstraintCount(){
		this.searchParams=industryParams(this.searchParams,this.industry)
	}
}
class FilterS extends Filter{
	constructor(requestBody){
		super(requestBody);
		this.queryString=filterQuery.s
	}
	getAddConstraintCount(){
		this.searchParams=skillsetParams(this.searchParams,this.skillset)
	}
}

class FilterCI extends Filter{
	constructor(requestBody){
		super(requestBody);
		this.queryString=filterQuery.ci
	}
	getAddConstraintCount(){
		this.searchParams=courseParams(this.searchParams,this.course)
		this.searchParams=industryParams(this.searchParams,this.industry)
		this.searchParams.push(2);
	}
}

class FilterSC extends Filter{
	constructor(requestBody){
		super(requestBody);
		this.queryString=filterQuery.sc
	}
	getAddConstraintCount(){
		this.searchParams=courseParams(this.searchParams,this.course)
		this.searchParams=skillsetParams(this.searchParams,this.skillset)
		this.searchParams.push(2);
	}
}

class FilterSI extends Filter{
	constructor(requestBody){
		super(requestBody);
		this.queryString=filterQuery.si
	}
	getAddConstraintCount(){
		this.searchParams=skillsetParams(this.searchParams,this.skillset)
		this.searchParams=industryParams(this.searchParams,this.industry)
		this.searchParams.push(2);
	}
}

class FilterSCI extends Filter{
	constructor(requestBody){
		super(requestBody);
		this.queryString=filterQuery.sci
	}
	getAddConstraintCount(){
		this.searchParams=industryParams(this.searchParams,this.industry)
		this.searchParams=skillsetParams(this.searchParams,this.skillset)
		this.searchParams=courseParams(this.searchParams,this.course)
		this.searchParams.push(3);
	}
}

class FilterNF extends Filter{
	constructor(requestBody){
		super(requestBody);
	}
}


module.exports.Search=Search
module.exports.SearchBar=SearchBar 
module.exports.Filter=Filter
module.exports.FilterC =FilterC 
module.exports.FilterI=FilterI
module.exports.FilterS=FilterS
module.exports.FilterCI=FilterCI 
module.exports.FilterSC=FilterSC
module.exports.FilterSI=FilterSI 
module.exports.FilterSCI=FilterSCI
module.exports.FilterNF=FilterNF