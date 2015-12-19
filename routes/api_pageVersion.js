var express = require('express');
var router = express.Router();
var models = require('../models');
var generalResponse = require('../util/general_response');

// /api/pageversion
router.get('/', function(req, res, next) {

  if( req.query.pageId ){

    models.PageVersion.findAll({
      where : { pageId : req.query.pageId }
    }).then( function(pageVersions){
        console.log("pageVersions : ", JSON.stringify( pageVersions , null , 2 ) );
        res.json( generalResponse( pageVersions ) );
    }).catch( function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
    });

  }else{

    models.PageVersion.findAll({})
    .then( function(pageVersions){
        console.log( "pageVersions : " , JSON.stringify( pageVersions , null , 2 ) );
        res.json( generalResponse( pageVersions ) );
    }).catch( function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
    });
  }

});

router.get('/:id', function(req, res, next) {

  models.PageVersion.find( {
    where : { id : req.params.id }
  }).then( function(pageVersion){
      //console.log("vesion : ", JSON.stringify( version , null , 2 ) );
      res.json( generalResponse( pageVersion ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

router.post('/', function(req,res,next){
  // create
  console.log(req.body);
  models.PageVersion.build({
    title : req.body.title || uuid.generate(),
    type : req.body.type || 1 ,
    markdown : req.body.markdown,
    rawHtml : req.body.rawHtml,
    pageId : req.body.pageId
  }).save().then(function(pageVersion){
    res.json( generalResponse( pageVersion ) );
  }).catch(function(err){
    console.log("error : ", err);
    res.json( generalResponse( null, null, err ) );
  });
});

router.post('/:id', function(req,res,next){
  // update
  models.PageVersion
    .find( { where : { id : req.params.id } } )
    .then( function( pageVersion ){
      pageVersion.update({
        title : req.body.title || uuid.generate(),
        type : req.body.type || 1 ,
        markdown : req.body.markdown,
        rawHtml : req.body.rawHtml,
        pageId : req.body.pageId
      })
      .then(function(pageVersion){
        res.json( generalResponse( pageVersion ) );
      }).catch(function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
      });
    })
    .catch(function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, { detail : "error on finding pageVersion" } ) );
    });
});

router.delete('/:id', function(req, res, next) {
  // delete
  models.PageVersion.destroy({ where : { id : req.params.id } })
  .then( function(pageVersion){
      console.log("pageVersion : ", JSON.stringify( pageVersion , null , 2 ) );
      res.json( generalResponse( pageVersion ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

module.exports = router;
