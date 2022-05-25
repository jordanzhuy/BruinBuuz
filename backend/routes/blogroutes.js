const express = require('express');
const router = express.Router();
const Blog = require('../models/blogmodels');//import schema in blogmodels.js
// const requireLogin = require('../middleware/requireLogin');
// later add requireLogin to create-blog my-posts

router.get('/', (req, res) => {
    const blogs = [
      {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('home', { title: 'Home', blogs });
});

router.post('/Create', (req, res) => {
    const {title, body, picture} = req.body;
    console.log(title, body, picture);
    
    if (!title || !body) {
        return res.status(422).json({error: "Please add all the fields"})
    }

    // req.user.password = undefined; // to hide the passwd
    const newBlog = new Blog ({
        title,
       // tags,//TODO: be modified later
        body,
        picture,
        //author: req.user,
    })
    newBlog.save()
    .then(data =>{
        res.json({newblog: data});
        console.log("blog uploading to database.")
    })//if everything success, send response to json with data
    .catch(error =>{
        res.json(error);
        console.log(error);
    })//if has error, catch it and send it as json file also
});

router.get('/all-blog', (req, res) => {
    Blog.find().populate("author", "_id name").sort({ createdAt:-1 })
        .then(result => {
           // res.render('home', {blogs: result, title: 'All blogs'}); using ejs
           res.json({posts});
        })
        .catch(err => { console.log(err); });
});

router.get('/my-posts', (req, res) => {
    const id = req.user._id;
    Blog.find({author: id})
    .populate("author", "_id name")
    .then(myposts => {
        res.json({myposts});
    })
    .catch(err => {  console.log(err); });
});

// display one post in detail
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
});

module.exports = router;