/**
 * Created by Houssem on 06/12/2017.
 */
const  express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.send('Hello World!')
})

module.exports = router;