const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '/public')))

app.get('/article', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
  
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})