var mongoose = require('mongoose');


var stateSchema = new mongoose.Schema({
	number: {type: Number, required: true},
	changedOn: {
		type: Date,
		"default": Date.now
	}
});

var roomSchema = new mongoose.Schema({
	number: {type:Number, required: true},
	name: String,
	state: [stateSchema]
});

var workerSchema = new mongoose.Schema({
	name: {type: String, required: true},
	position: String,
	department: String,
	room: [roomSchema]
});



mongoose.model('Worker', workerSchema);


/*
db.workers.insert({name:"Dras", room:[{number:123}, {number:320}, {number:111}]})
*/