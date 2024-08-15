const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.posts = require("./post.model.js")(mongoose);
db.comment = require("./comment.model.js")(mongoose);
db.postlike = require("./postLike.model.js")(mongoose);
db.community = require("./community.model.js")(mongoose);
db.conversation = require("./conversation.model.js")(mongoose);
db.message = require("./message.model.js")(mongoose);

module.exports = db;