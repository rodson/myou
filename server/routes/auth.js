var express = require('express');
var router = express.Router();

var login = {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU0NDcxMWQ3OThiOThjYjg3N2FmZDgxMiIsInJvbGUiOiJyb290IiwiaWF0IjoxNDMwNzA4MDA3LCJleHAiOjE0MzEzMTI4MDd9.-LyKCzxsE6PStIZUk2NoXhCVLNjzCFudPKnjP5_F6e4","user":{"_id":"544711d798b98cb877afd812","username":"admin","email":"myou@cvte.cn","userType":"root","groupName":""}}

router.post('/login', function(req, res) {
  res.json(login);
});

router.get('/logout', function(req, res) {

});

module.exports = router;
