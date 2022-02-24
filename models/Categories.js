const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categ_name: {
    type: String,
    required: true
  },
  categ_parent: {
    type: String,
    default: 'none'
  },
  seo_title: {
    type: String
  },
  seo_kw: {
    type: String
  },
  seo_desc: {
    type: String
  },

});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
