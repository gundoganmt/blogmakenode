const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profile_pic: {
    type: String
  },
  account_desc: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  email_approved: {
    type: Boolean,
    default: false
  },
  member_since: {
    type: Date,
    default: Date.now
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
  sites: [
    {
      siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sites'
      }
    }
  ],
  notifs: [
    {
      notifId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notif'
      }
    }
  ],
  writer: [
    {
      blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'writer'
      }
    }
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
