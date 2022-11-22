const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email!'],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email!',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password!'],
      minLength: [6, 'Password must be at least 6 characters long!'],
      //   maxLength: [23, 'Password must not exceed more than 23 characters long!'],
    },
    photo: {
      type: String,
      required: [true, 'Please provide a photo of yourself!'],
      default:
        'https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png',
    },
    phone: {
      type: String,
      default: '781-781-7817',
    },
    bio: {
      type: String,
      default: 'bio',
      maxLength: [250, 'Bio must not exceed 250 characters long!'],
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
