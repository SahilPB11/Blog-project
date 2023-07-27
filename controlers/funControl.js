import Articles from "../models/articles.js";
import ErrorHandler from "../utils/errorHandler.js";

//  get all articles from database
export const getArticles = async (req, res, next) => {
  try{
    const articles = await Articles.find().sort({ creaatedAt: "desc" });
    res.render("Articles/index", { articles });
  }catch(error){
    next(error);
  }
};

// rendering new article which was made by us recently
export const getNewArticle = async (req, res, next) => {
  try{
  await res.render("Articles/new", { article: new Articles() });
  }catch(error){
    next(error);
  }
};

// crreating a new artice and sending data wiyh the help of post
export const postNewArticle = async (req, res, next) => {
  try{
  req.article = new Articles();
  next();
  }catch(error){
    next(error);
  }
};

// here we doing editing in a article and then send for updation
export const getEditArticle = async (req, res, next) => {
  try {
    const article = await Articles.findById(req.params.id);
    if(!article) return next(new ErrorHandler("Article is not present in database", 404));
    res.render("Articles/edit", { article });
  } catch (error) {
    next(error);
  }
};

// here we are finding the article with the help of slug and then showing them on browser
export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Articles.findOne({ slug: req.params.slug });
    if (article) return res.render("Articles/show", { article });
  } catch (error) {
    res.redirect("/");
  }
};

// here we are updating the artice which was we adited 
export const putEditArticle = async (req, res, next) => {
  try{
    req.article = await Articles.findById(req.params.id);
  next();
  }catch(error){
    next(error);
  }
};

// here we are he article 
export const deleteArticle = async (req, res, next) => {
  try {
    await Articles.findOneAndRemove(req.param.id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
