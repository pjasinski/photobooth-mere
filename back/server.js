const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const app = express();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname + ".jpg");
  }
})
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const upload = multer({storage: storage});
express.urlencoded();
express.json()

app.use(express.static('./public')) 
app.use(express.static('./uploads/')) // we will store images in this directory

// Note: since static folder public has Index.html in it. This route won't even hit, and the file will be served directly
app.get('/', (req, res)=>{
    res.sendFile("index.html", { root: __dirname + "/public" }) // sendFile needs absolute path, the second parameter helps creating path
})
app.post('/img', upload.single('image'),(req, res, next) => {
  console.log(req.body.img);
})
const port = process.env.PORT || 5000
app.listen(port, 
    ()=>console.log(`Server running on port ${port}`))