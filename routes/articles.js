import express from "express";
import * as articlesController from "../controlers/funControl.js";
const router = express.Router();

//  get all articles from database
router.get("/", articlesController.getArticles);

// rendering new article which was made by us recently
router.get("/new", articlesController.getNewArticle);

// crreating a new artice and sending data wiyh the help of post send for cration and save in a database with the help of saveArticleRedirect function
router.post("/", articlesController.postNewArticle, saveArticleRedirect("new"));

// here we doing editing in a article and then send for updation
router.get("/edit/:id", articlesController.getEditArticle);

// here we are finding the article with the help of slug and then showing them on browser
router.get("/:slug", articlesController.getArticleBySlug);

// here we are updating the artice which was we adited 
router.put(
  "/:id",
  articlesController.putEditArticle,
  saveArticleRedirect("edit")
);

// here we are he article 
router.delete("/:id", articlesController.deleteArticle);

function saveArticleRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      const id = article.slug;
      res.redirect(`/${article.slug}`);
    } catch (e) {
      // console.log(e);
      res.render(`Articles/${path}`, { article });
    }
  };
}

export default router;
