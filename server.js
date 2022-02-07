const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5500;

// .....................................................

    router.use('/fileanalyse', fileUpload());
    
    router.post('/fileanalyse', (req, res) => {
        
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        
        const file = req.files.upfile;

        res.json({
            "name": file.name,
            "type": file.mimetype,
            "size": file.size,
        });
    });

    // .....................................................

app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.path} : ${req.ip}`)
    next();
});

app.use("/public", express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use('/api', router);

app.use(function (req, res) {
    res.status(404).type("txt").send("404 Not Found");
});

app.listen(PORT, () => {
    console.log('Node is listening on port ' + PORT + '...');
});