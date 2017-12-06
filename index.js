/**
 * Created by Houssem on 06/12/2017.
 */
const  express = require('express');
const app = express();
const router = require("./serveur/routes/router");

const PORT = 80;

app.use("/",express.static('public'));
app.use('/rest',router);

app.listen(PORT, function () {
    console.log('Example app listening on port '+PORT+' !')
});