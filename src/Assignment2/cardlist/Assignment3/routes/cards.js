var express = require('express');
var router = express.Router();


var list = [{ "name": "cat", "description": "fluffy white cat", "url": "https://www.thesprucepets.com/thmb/wWZ_Mympqnlq6hUbrnK6p2wIERk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/twenty20_e47b3798-dd9b-40b1-91ef-1d820337966e-5aa3f798642dca00363b0df1.jpg" },
{ "name": "black dog", "description": "3000 dollar dog", "url": "https://www.sritch.com/images/dogs-vancouver-20141108-0574.jpg" }];

router.get('/', function (req, res, next) {
  res.send(list);
});

router.get('/:name', function (req, res, next) {
  const name = req.params.name;
  const card = list.find(x => x.name === name);
  res.send(card);
});

router.post('/', function (req, res, next) {
  const card = req.body;
  list.push(card);
  res.send(list);
});

router.delete('/:name', function (req, res, next) {
  const name = req.params.name;
  list = list.filter(x => x.name !== name);
  res.send(list);
});

module.exports = router;
