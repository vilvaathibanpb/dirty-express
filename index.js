const express = require('./customExpress');
const bodyParser = require('./bodyParser');

const backend = express();

backend.use(bodyParser());

backend.get('/api', (req, res) => {
    res.end('Hello World');
});

backend.post('/return-data', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    res.end(JSON.stringify({ dataReceived: data }))
})

backend.listen(3000, () => {
    console.log('Server is running on port 3000');
})