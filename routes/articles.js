import express from "express";
const router = express.Router();


router.get('/', (req, res) => {
    const articles = [{
        title: "text article", 
        createDate : Date.now(),
        descrption : "text description"
    }]
    res.render('index', {articles : articles});
})

export default router;