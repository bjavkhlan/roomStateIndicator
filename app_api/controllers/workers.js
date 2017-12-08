var mongoose = require('mongoose');
var Worker = mongoose.model('Worker');

var sendJSONresponse = function(res, status, content) {
  res.status(status); 
  res.json(content);
};



module.exports.workersList = function(req, res) {
  Worker
    .find()
    .exec(function(err, workers){
      if(!workers) {
        sendJSONresponse(res, 404, {
          "message": "no stations found"
        })
      } else {
        sendJSONresponse(res, 200, workers);
      }
    });
};

module.exports.changeWorkerState = function(req, res) {
  console.log(req.body.workerId);
  Worker
  .findById(req.body.workerId)
  .exec(
    function(err, worker) {
      if (err) {
        sendJSONresponse(res, 400, err);
        return;
      }
      doAddState(req, res, worker);
    }  
  );
};

var doAddState = function(req, res, worker) {
  //console.log(worker, req.body.room, req.body.state);
  worker.room[req.body.room].state.push({
    number: req.body.state
  });
  worker.save(function(err, data) {
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      sendJSONresponse(res, 200, {});
    }
  });
}

