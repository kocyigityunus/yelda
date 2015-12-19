var express = require('express');
var router = express.Router();
var models = require('../models');
var generalResponse = require('../util/general_response');
var uuid = require('../util/uuid');

// /api/page
router.get('/', function(req, res, next) {

    models.BlogPost.findAll({})
    .then( function(blogPosts){
        console.log( "blogPosts : " , JSON.stringify( blogPosts , null , 2 ) );
        res.json( generalResponse( blogPosts ) );
    }).catch( function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
    });

});

router.get('/:id', function(req, res, next) {

  models.BlogPost.findOne( {
    where : { id : req.params.id }
  }).then( function(blogPost){
      console.log( "blogPost : " , JSON.stringify( blogPost , null , 2 ) );
      res.json( generalResponse( blogPost ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

router.post('/', function(req,res,next){
  // create
  console.log(req.body);
  models.BlogPost.build({
    title : req.body.title || uuid.generate(),
    type : req.body.type || 1 ,
    markdown : req.body.markdown,
    rawHtml : req.body.rawHtml,
  }).save().then(function(blogPost){
    res.json( generalResponse( blogPost ) );
  }).catch(function(err){
    console.log("error : ", err);
    res.json( generalResponse( null, null, err ) );
  });
});

router.post('/:id', function(req,res,next){
  // update
  models.BlogPost
    .findOne( { where : { id : req.params.id } } )
    .then( function( blogPost ){
      blogPost.update({
        title : req.body.title || uuid.generate(),
        type : req.body.type || 1 ,
        markdown : req.body.markdown,
        rawHtml : req.body.rawHtml,
      })
      .then(function(blogPost){
        res.json( generalResponse( blogPost ) );
      }).catch(function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
      });
    })
    .catch(function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, { detail : "error on finding blogPost" } ) );
    });
});

router.delete('/:id', function(req, res, next) {
  // delete
  models.BlogPost.destroy({ where : { id : req.params.id } })
  .then( function(blogPost){
      console.log("page : ", JSON.stringify( blogPost , null , 2 ) );
      res.json( generalResponse( blogPost ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

module.exports = router;
