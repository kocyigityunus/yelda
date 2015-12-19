var express = require('express');
var router = express.Router();
var models = require('../models');
var generalResponse = require('../util/general_response');
var uuid = require('../util/uuid');

// /api/page
router.get('/', function(req, res, next) {

    models.Page.findAll({})
    .then( function(pages){
        console.log( "pages : " , JSON.stringify( pages , null , 2 ) );
        res.json( generalResponse( pages ) );
    }).catch( function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
    });

});

router.get('/:id', function(req, res, next) {

  models.Page.find( {
    where : { id : req.params.id }
  }).then( function(page){
      console.log( "page : " , JSON.stringify( page , null , 2 ) );
      res.json( generalResponse( page ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

router.post('/', function(req,res,next){
  // create
  console.log(req.body);
  models.Page.build({
    title : req.body.title || uuid.generate(),
    type : req.body.type || 1 ,
    markdown : req.body.markdown,
    rawHtml : req.body.rawHtml,
  }).save().then(function(page){
    res.json( generalResponse( page ) );
  }).catch(function(err){
    console.log("error : ", err);
    res.json( generalResponse( null, null, err ) );
  });
});

router.post('/:id', function(req,res,next){
  // update
  models.Page
    .find( { where : { id : req.params.id } } )
    .then( function( page ){
      page.update({
        title : req.body.title || uuid.generate(),
        type : req.body.type || 1 ,
        markdown : req.body.markdown,
        rawHtml : req.body.rawHtml,
      })
      .then(function(page){
        res.json( generalResponse( page ) );
      }).catch(function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
      });
    })
    .catch(function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, { detail : "error on finding page" } ) );
    });
});

router.delete('/:id', function(req, res, next) {
  // delete
  models.Page.destroy({ where : { id : req.params.id } })
  .then( function(page){
      console.log("page : ", JSON.stringify( version , null , 2 ) );
      res.json( generalResponse( page ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

module.exports = router;
