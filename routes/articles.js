import express from "express";
import Articles from "../models/articles.js";
import { jsonData } from "../utils/jsondata.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("mango");
  res.render("Articles/index", { articles: jsonData });
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
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.log(e);
    res.render("Articles/new", { article: article });
  }
});

router.get("/:id", async (req, res) => {
  const article = null;
  try {
    article = await Articles.findById(req.params.id);
    res.render("Articles/show", { article: article });
  } catch (error) {
    if (!article) return res.redirect("/");
    console.log(error);
  }
});

export default router;
