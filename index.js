var express = require('express');
var cors = require('cors');
require('dotenv').config()
var bodyParser = require("body-parser");
const multer = require('multer')

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port)
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    // Access file attributes
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const fileSize = req.file.size;

    // Respond with the attributes in a JSON response
    res.json({
        name: fileName,
        type: fileType,
        size: fileSize,
    });
})



