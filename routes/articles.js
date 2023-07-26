import express from "express";
import Articles from "../models/articles.js"
const router = express.Router();


router.get('/', (req, res) => {
    const articles = [{
        title: "text article", 
        createDate :new Date().toLocaleDateString(),
        descrption : "text description"
    },
    {
        title: "text article-2", 
        createDate : new Date().toLocaleDateString(),
        descrption : "text description"
    }]
    res.render('Articles/index', {articles : articles});
})

router.get("/new", (req, res) =>{
    res.render('Articles/new');
})

router.post("/", (req, res) => {
    
})

export default router;