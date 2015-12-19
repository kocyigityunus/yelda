var express = require('express');
var router = express.Router();
var models = require('../models');
var generalResponse = require('../util/general_response');

// /api/pageversion
router.get('/', function(req, res, next) {

  if( req.query.blogPostId ){

    models.BlogPostVersion.findAll({
      where : { blogPostId : req.query.blogPostId }
    }).then( function(blogPostVersions){
        console.log("blogPostVersions : ", JSON.stringify( blogPostVersions , null , 2 ) );
        res.json( generalResponse( blogPostVersions ) );
    }).catch( function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
    });

  }else{

    models.BlogPostVersion.findAll({})
    .then( function(blogPostVersions){
        console.log( "blogPostVersions : " , JSON.stringify( blogPostVersions , null , 2 ) );
        res.json( generalResponse( blogPostVersions ) );
    }).catch( function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
    });
  }

});

router.get('/:id', function(req, res, next) {

  models.BlogPostVersion.find( {
    where : { id : req.params.id }
  }).then( function(blogPostVersion){
      //console.log("vesion : ", JSON.stringify( version , null , 2 ) );
      res.json( generalResponse( blogPostVersion ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

router.post('/', function(req,res,next){
  // create
  console.log(req.body);
  models.BlogPostVersion.build({
    title : req.body.title || uuid.generate(),
    type : req.body.type || 1 ,
    markdown : req.body.markdown,
    rawHtml : req.body.rawHtml,
    pageId : req.body.pageId
  }).save().then(function(blogPostVersion){
    res.json( generalResponse( blogPostVersion ) );
  }).catch(function(err){
    console.log("error : ", err);
    res.json( generalResponse( null, null, err ) );
  });
});

router.post('/:id', function(req,res,next){
  // update
  models.BlogPostVersion
    .find( { where : { id : req.params.id } } )
    .then( function( blogPostVersion ){
      blogPostVersion.update({
        title : req.body.title || uuid.generate(),
        type : req.body.type || 1 ,
        markdown : req.body.markdown,
        rawHtml : req.body.rawHtml,
        pageId : req.body.pageId
      })
      .then(function(blogPostVersion){
        res.json( generalResponse( blogPostVersion ) );
      }).catch(function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
      });
    })
    .catch(function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, { detail : "error on finding blogPostVersion" } ) );
    });
});

router.delete('/:id', function(req, res, next) {
  // delete
  models.BlogPostVersion.destroy({ where : { id : req.params.id } })
  .then( function(blogPostVersion){
      console.log("blogPostVersion : ", JSON.stringify( blogPostVersion , null , 2 ) );
      res.json( generalResponse( blogPostVersion ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

module.exports = router;
