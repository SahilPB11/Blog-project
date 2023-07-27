import express from "express";
import {
  dataDelete,
  editArticleRequest,
  freshNewArticle,
  getAllArticles,
  postfun,
  putData,
  showArticle,
} from "../controlers/funControl.js";
const router = express.Router();

// get all articles from database
router.get("/", getAllArticles);

// get new article which one we made rfecently
router.get("/new", freshNewArticle);

// we are creating a new article withe the help of saveArticleRedirect fun
router.post("/", postfun);

// here we getting the request for update
router.get("/edit/:id", editArticleRequest);

// here we are getting reqest to show article indviuallay
router.get("/:slug", showArticle);

// here we are update the data with the help of putData
router.put("/:id", putData);

// here we are delete the data with the help of deleteData
router.delete("/:id", dataDelete);

export default router;
