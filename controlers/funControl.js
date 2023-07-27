import Articles from "../models/articles.js";
import ErrorHandler from "../utils/errorHandler.js";
let article = null;

// get all articles from database
export const getAllArticles = async (req, res, next) => {
  try {
    article = await Articles.find().sort({ creaatedAt: "desc" });
    if (!article) return next(new ErrorHandler("dataBase is empty", "400"));
    res.render("Articles/index", { articles: article });
  } catch (error) {
    next(error);
  }
};

// get new article which one we made rfecentlyfreshNewArticle
export const freshNewArticle = async (req, res, next) => {
  try {
    article = await res.render("Articles/new", { article: new Articles() });
    if (!article) return next(new ErrorHandler("please try agin ", "404"));
  } catch (error) {
    next(error);
  }
};

// we are creating a new article withe the help of saveArticleRedirect fun
export const postfun = async (req, res, next) => {
  try {
    await ((req, res, next) => {
      req.article = new Articles();
      next();
    },
    saveArticleRedirect("new"));
  } catch (error) {
    next(error);
  }
};

// here we getting the request for update
export const editArticleRequest = async (req, res, next) => {
  try {
    article = await Articles.findById(req.params.id);
    if (!article)
      return next(new ErrorHandler("Article is not present in databse", "404"));
  } catch (error) {
    next(error);
  }
};

// here we are getting reqest to show article indviuallay
export const showArticle = async (req, res, next) => {
  try {
    article = await Articles.findOne({ slug: req.params.slug });
    if (!article)
      return next(new ErrorHandler("Article is not present in databse", "404"));
    res.render("Articles/show", { article: article });
  } catch (error) {
    res.redirect("/");
    next(error);
  }
};

// here we are update the data with the help of putData
export const putData = async (req, res, next) => {
  try {
    await (async(req, res, next)=> {
      article = await Articles.findById(req.params.id);
      if(!article) return next(new ErrorHandler("Article is not present in databse", 400));
      req.article = article;
      next()
    },saveArticleRedirect("edit"))
  } catch (error) {
    next(error);
  }
};

export const dataDelete = async (req, res, next) => {
    try {
      await Articles.findOneAndRemove(req.param.id);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

function saveArticleRedirect(path) {
  return async (req, res) => {
    article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      const id = article.slug;
      res.redirect(`/${article.slug}`);
    } catch (e) {
      // console.log(e);
      res.render(`Articles/${path}`, { article: article });
    }
  };
}
