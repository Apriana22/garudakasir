const UserModel = require("./../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../../../config/config.json')

const login = async function(req, res){
    try {
        const User = await UserModel.findAll({
            where: {
                email : req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, User[0].password);
        if(!match) return res.status(401).json({message: "Wrong email or password"});
        const id = User[0].id
        const email = User[0].email;
        const name = User[0].name;
        const accessToken = jwt.sign({id, email, name}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '1036800s'
        });

        res.json({accessToken})
        
    } catch (error) {
        res.status(404).json({message: "email not exist"})
    }
}

const refresh_token = async function(req, res){
    try {
        const refresh_token = req.cookies.refresh_token;
        if(!refresh_token) return res.send(401);
        const Pengguna = await UserModel.findAll({
            where: {
                refresh_token: refresh_token
            }
        })
        if(!Pengguna[0]) return res.send(403),
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
            if(err) return res.send(403);
            const id = Pengguna[0].id
            const email = Pengguna[0].email;
            const name = Pengguna[0].name;
            const accessToken = jwt.sign({id, email, name}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn : '3600s'
            });
            res.json({accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}
const logout = function(req, res) {
    const token = req.headers['authorization'].split(' ')[1]; // Get the token from the request headers
    // Add the token to the blacklist or revoked token list
    // You can store the blacklisted tokens in a database or cache
    // For simplicity, I'll use an array here:
    config.blacklistedTokens.push(token);
    res.sendStatus(200);
  }
module.exports = { login, refresh_token, logout }