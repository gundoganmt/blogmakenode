const mongoose = require('mongoose');

const BlogpostsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  seo_title: {
    type: String
  },
  seo_desc: {
    type: String
  },
  slug: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  publish_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    default: 'published'
  },
  blogcover: {
    type: String,
    required: true
  },
  is_featured: {
    type: Boolean,
    default: false
  }
});

const Blogposts = mongoose.model('Blogposts', BlogpostsSchema);

module.exports = Blogposts;
