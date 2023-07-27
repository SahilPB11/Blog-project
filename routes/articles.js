import express from "express";
import Articles from "../models/articles.js";
import { jsonData } from "../utils/jsondata.js";
const router = express.Router();
let article = null;

router.get("/", async (req, res) => {
  article = await Articles.find().sort({ creaatedAt: "desc" });
  res.render("Articles/index", { articles: article });
});

router.get("/new", async (req, res) => {
  await res.render("Articles/new", { article: new Articles() });
});

router.post(
  "/",
  async (req, res, next) => {
    req.article = new Articles();
    next();
  },
  saveArticleRedirect("new")
);

router.get("/edit/:id", async (req, res) => {
  try {
    article = await Articles.findById(req.params.id);
    res.render("Articles/edit", { article: article });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:slug", async (req, res) => {
  try {
    article = await Articles.findOne({ slug: req.params.slug });
    if (article) return res.render("Articles/show", { article: article });
  } catch (error) {
    res.redirect("/");
    // console.log(error);
  }
});

router.put(
  "/:id",
  async (req, res, next) => {
    console.log("i am in");
    req.article = await Articles.findById(req.params.id);
    next();
  },
  saveArticleRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  try {
    await Articles.findOneAndRemove(req.param.id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

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

export default router;
