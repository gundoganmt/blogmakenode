const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Welcome Page
router.get('/blogs/:template', (req, res) =>{
    const template = req.params.template
    if(template == 'merilyn'){
        res.render('merilyn/index')
    }
});


module.exports = router;
