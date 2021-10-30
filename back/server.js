const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const app = express();
const fs = require("fs");
let imgCounter = 0;
const cors = require('cors');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname + ".jpg");
  }
})
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/*const corsOptions = {
  origin:'https://photobooth.patrickjasinski.com/',
  credentials: true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
*/
const upload = multer({storage: storage});
express.urlencoded();
express.json()

app.use(express.static('./public')) 
app.use(express.static('./uploads/')) // we will store images in this directory

// Note: since static folder public has Index.html in it. This route won't even hit, and the file will be served directly
app.post('/', upload.single('image'),(req, res, next) => {
  let base64String = req.body.img;
  //console.log(base64String + "\n");
  let base64Image = base64String.split(';base64,').pop();
  //console.log(base64Image);
  fs.writeFile('./uploads/image' + Math.floor(Date.now() / 1000) + '.png', base64Image, {encoding: 'base64'}, function(err) {
    console.log('File created');
});
  imgCounter++;
})

app.get('/',(req, res) => {
  res.send({text: "Hello World"});
});
const port = process.env.PORT || 5000
app.listen(port, 
    ()=>console.log(`Server running on port ${port}`))