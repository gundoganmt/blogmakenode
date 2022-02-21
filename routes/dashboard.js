const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Blogsite = require('../models/Blogsite');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) =>{
  const current_user = req.user
  res.render('dashboard/my-sites', {
    current_user: current_user,
    blogsites: await Blogsite.find({ owner: current_user._id })
  })
});

router.get('/templates', ensureAuthenticated, (req, res) =>
  res.render('dashboard/templates', {
    user: req.user
  })
);

router.post('/create-site', ensureAuthenticated, (req, res) =>{
    const current_user = req.user
    const blognames = ['blogar', 'unique', 'ronaldo']
    const { site_name, template } = req.body;

    if(site_name.trim().length < 3 || site_name.trim().length > 50){
        res.send({ 'success': false, 'msg': 'Site name should be between 3 and 50 characters!'})
        return;
    }
    if(!blognames.includes(template)){
        res.send({ 'success': false, 'msg': 'Something wrong happened. Refresh the page and try again!'})
        return;
    }
    Blogsite.findOne({ site_name: site_name, owner: current_user._id}).then(blogsite =>{
        if(blogsite){
            res.send({ 'success': false, 'msg': 'You already have a blog site with that name!'})
            return;
        }
        else{
            const newSite = new Blogsite({
                site_name: site_name, 
                template: template,
                owner: current_user._id
            })
            newSite.save().then(site =>{
                res.send({'success': true, 'msg': '/my-sites'})
            })
        }
    })
});

router.get('/blogpost', ensureAuthenticated, (req, res) =>
  res.render('blog/blogpost', {
    user: req.user
  })
);

router.get('/blog-setting', ensureAuthenticated, (req, res) =>
  res.render('blog/blog-setting', {
    user: req.user
  })
);

module.exports = router;
