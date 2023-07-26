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

router.post("/", async (req, res) => {
  const { title, description, markdown } = req.body;
  let article = new Articles({
    title,
    description,
    markdown,
  });
  try {
    article = await article.save();
    const id = article.slug;
    res.redirect(`/${id}`);
  } catch (e) {
    // console.log(e);
    res.render("Articles/new", { article: article });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    article = await Articles.findOne({ slug: req.params.alug });
    console.log(article);
    if (article) return res.render("Articles/show", { article: article });
  } catch (error) {
    res.redirect("/");
    // console.log(error);
  }
});

export default router;
