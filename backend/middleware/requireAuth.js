const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { response } = require('express');

const requireAuth = async (req, res, next) => {
//verify authentication
const {authorization} = req.headers
if(!authorization){
    return response.status(401).json({error: 'Authorisation token required'})
}
const token = authorization.split(' ')[1]
try{
const {_id} = jwt.verify(token, process.env.SECRET)
req.user = await User.findOne({_id}).select('_id')
}catch(error){
    console.log(error)
    res.status(400).json({error:"Request is not authorized"})
}

}
module.exports = requireAuth