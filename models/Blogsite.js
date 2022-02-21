const mongoose = require('mongoose');

const BlogsiteSchema = new mongoose.Schema({
  site_name: {
    type: String,
    required: true
  },
  about_title: {
    type: String
  },
  about_content: {
    type: String
  },
  seo_title: {
    type: String
  },
  seo_desc: {
    type: String
  },
  creation_time: {
    type: Date,
    default: Date.now
  },
  contact_enabled: {
    type: Boolean,
    default: false
  },
  logo_picture: {
    type: String
  },
  current_plan: {
    type: String,
    default: 'draft'
  },
  domain: {
    type: String
  },
  template: {
    type: String
  },
  twitter: {
    type: String
  },
  facebook: {
    type: String
  },
  instagram: {
    type: String
  },
  github: {
    type: String
  },
  youtube: {
    type: String
  },
  linkedin: {
    type: String
  },
  headers: [
    {
      header: {
        type: String
      },
      subheader: {
        type: String
      }
    }
  ],
  posts: [
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
      }
    }
  ],
  owner: {
    type: String,
    required: true
  },

});

const Blogsite = mongoose.model('Blogsite', BlogsiteSchema);

module.exports = Blogsite;
