// server.js
const app = require('./app'); 
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on port', port);
});
