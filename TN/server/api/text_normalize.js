const mongoose = require('mongoose');
const router = require('express').Router();
const Text = mongoose.model('Text');

router.post('http://43.239.223.87:5000/text_normalize',(req,res,next)=>{
    const { body } = req;
})