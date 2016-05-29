var express	=	require("express");
var multer	=	require('multer');
var app	=	express();
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + '-' + Date.now() + file.originalname.substr(file.originalname.lastIndexOf('.')));
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){

      res.sendFile(__dirname + "/index.html");
});
app.use('/img', express.static(__dirname + '/uploads'));
app.get('/menu',function(req,res){
	if(req.param('res_id') == "FIRST_RES")
	{
      res.sendFile(__dirname + "/data/menu.json");
	}else{
		res.end();
	}
});
app.get('/listfood',function(req,res){

      res.sendFile(__dirname + "/data/listfood.json");
});

app.get('/food',function(req,res){

      res.sendFile(__dirname + "/data/food.json");
});

app.get('/tables',function(req,res){

      res.sendFile(__dirname + "/data/tables.json");
});

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end(req.file.filename);
	});
});

app.listen(8081,function(){
    console.log("Working on port 8081");
});
