import express from "express";
import * as articlesController from "../controlers/funControl.js";

const router = express.Router();

router.get("/", articlesController.getArticles);

router.get("/new", articlesController.getNewArticle);

router.post("/", articlesController.postNewArticle, saveArticleRedirect("new"));

router.get("/edit/:id", articlesController.getEditArticle);

router.get("/:slug", articlesController.getArticleBySlug);

router.put(
  "/:id",
  articlesController.putEditArticle,
  saveArticleRedirect("edit")
);

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
