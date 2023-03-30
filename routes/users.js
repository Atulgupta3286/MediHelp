var mongoose = require("mongoose");
mongoose.set("strictQuery", false);
var plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/project");

var userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  address: String ,
  mobileNumber: String
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);