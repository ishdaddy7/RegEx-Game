'use strict'

var router = require('express').Router();
var db = require('../../../db');
var Question = db.model('question');

var AnsweredQuestion = db.model('answeredQuestion');

module.exports = router;


router.param('id', function(req, res, next, id){
	Question.findById(id, {include: [AnsweredQuestion]}) //too slow?
	.then(function(question){
		if(!question) {
			res.sendStatus(404);
		}else{
			req.question = question;
		}
		next();
	})
	.catch(next);
})


router.get('/', function(req, res, next){
	Question.findAll()
	.then(function(allQuestions){
		res.send(allQuestions);
	})
	.catch(next);
})


router.post('/', function(req, res, next){
	var question;
	Question.create(req.body)
	.then(function(createdQuestion){
		question = createdQuestion;
		return createdQuestion; //test this.
	})
	.then(function(){
		res.status(201).send(question);
	})
	.catch(next);
})

router.get('/:id', function(req, res, next){
	return res.send(req.question);
})


router.put('/:id', function(req, res, next){
	var question;
	req.question.update(req.body)
	.then(function(updatedQuestion){
		question = updatedQuestion;
		return updatedQuestion; //test this!!
	})
	.then(function(){
		res.status(204).send(question);
	})
	.catch(next);
})

router.delete('/:id', function(req, res, next){
	req.question.destroy()
	.then(function(removedQuestion){  //do we need this?
		res.sendStatus(410)
	})
})










