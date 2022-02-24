const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Blogsite = require('../models/Blogsite');
const Categories = require('../models/Categories');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: fileFilter
});

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
    const blognames = ['merilyn', 'unique', 'ronaldo']
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

router.get('/blogpost', ensureAuthenticated, (req, res) =>{
  res.render('blog/blogpost', {
    current_user: req.user
  })
});

async function catsFromBlogsite(blogsite) {
  let categs = []; // array of objects
  for (const item of blogsite.categories) {
    let foundCateg = (
      await Categories.findById(item._id)
    )
    categs.push(foundCateg);
  }
  return categs;
}


router.get('/blog-setting', ensureAuthenticated, async (req, res) =>{
  const site_id = req.query.site_id
  let blogsite = await Blogsite.findOne({ _id: site_id })
  if(!blogsite){
    res.sendStatus(404)
  } 
  else{
    var c = await catsFromBlogsite(blogsite)
    console.log(c)
    res.render('blog/blog-setting', {
      current_user: req.user,
      blogsite: blogsite,
      categories: await catsFromBlogsite(blogsite)
    })
  }
});

const cpUpload = upload.fields([{ name: 'site_logo' }, { name: 'site_icon' }])
router.post('/general/:site_id', cpUpload, ensureAuthenticated, (req, res) =>{
  Blogsite.findOne({ _id: req.params.site_id }).then(site =>{
    if(!site){
      res.sendStatus(404)
    }
    else{
      site.contact_enabled = req.body.contact_enabled == 'true'
      site.seo_title = req.body.seo_title
      site.seo_desc = req.body.seo_desc
      site.twitter = req.body.twitter
      site.facebook = req.body.facebook
      site.instagram = req.body.instagram
      site.github = req.body.github
      site.youtube = req.body.youtube
      site.linkedin = req.body.linkedin
      site.site_logo = req.files['site_logo'][0].filename
      site.site_icon = req.files['site_icon'][0].filename
      try{
        site.save().then(
          res.send({
            current_field: 'g',
            success: true
          })
        )
      }
      catch(e){
        res.send({
          current_field: 'g',
          success: false,
          msg: 'Error occured while processing the data. Please try again'
        })
      }
    }
  })
});

router.post('/site-categ/:site_id', upload.none(), ensureAuthenticated, (req, res) =>{
  const { categ_name, categ_parent, seo_kw, seo_title, seo_desc } = req.body
  Blogsite.findOne({ _id: req.params.site_id }).then(blogsite =>{
    if(!blogsite){
      res.send({
        success: false,
        msg: 'Error occured! Refresh the page and try again please!'
      })
    }
    else{
      const newCateg = new Categories({
        categ_name,
        categ_parent,
        seo_kw,
        seo_title,
        seo_desc
      })
      newCateg.save().then(newCateg =>{
        blogsite.categories.push(newCateg)
        blogsite.save().then(
          res.send({
            current_field: 'c',
            success: true,
            categ_name: categ_name,
            categ_parent: categ_parent
          })
        )
      })

    }
  })
})

module.exports = router;
