const Post = require("./models/posts");
const Comment = require("./models/comments");
const ExpressError = require("./utils/ExpressError.js");
const { postSchema, commentSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in first!");
    return res.redirect("/user/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
      req.flash("error", "Post not found");
      return res.redirect("/posts");
    }

    const isAdmin = res.locals.currUser && res.locals.currUser.type === "Admin";

    if (!(post.user.equals(res.locals.currUser._id) || isAdmin)) {
      req.flash("error", "You don't have permission to make changes");
      return res.redirect(`/posts/${id}`);
    }

    next();
  } catch (error) {
    console.error("Error in isOwner middleware:", error);
    req.flash("error", "An error occurred");
    return res.redirect("/posts");
  }
};

module.exports.isCommentAuthor = async (req, res, next) => {
  try {
    const commentId = req.params.comId;
    const comment = await Comment.findById(commentId);
    const isAdmin = res.locals.currUser && res.locals.currUser.type === "Admin";
    if (!comment) {
      req.flash("error", "Comment not found");
      if (isAdmin) return res.redirect("/admin");
      return res.redirect("/posts");
    }

    if (!(comment.author.equals(res.locals.currUser._id) || isAdmin)) {
      req.flash(
        "error",
        "You don't have permission to delete comments of other authors"
      );
      return res.redirect("/posts");
    }

    next();
  } catch (error) {
    console.error("Error in isCommentAuthor middleware:", error);
    req.flash("error", "An error occurred");
    if (isAdmin) return res.redirect("/admin");
    return res.redirect("/posts");
  }
};

module.exports.validatePosts = (req, res, next) => {
  console.log("Request Body:", req.body);
  let { error } = postSchema.validate(req.body);
  console.log("Validation Error:", error);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateComment = (req, res, next) => {
  let { error } = commentSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
