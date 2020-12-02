class Expert{
	constructor(id, first, last, title, bio, img, freq){
		this.user_id=id;
		this.fName=first;
		this.lName=last;
		this.profileTitle=title;
		this.profileBio=bio;
		this.profileImage=img;
		this.page=0
		this.rank=freq
	}
	setPage(pageNum){
		this.page=pageNum
	}
	
}
module.exports.Expert=Expert