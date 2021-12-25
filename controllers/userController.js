const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const hashPassword = bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            hashPassword
        });
        res.status(200).json({
            status: "Success",
            message: `Successfully created user ${username}`,
            data: {
                user: username
            }
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "Failed",
            message: `Could not create user ${username}`
        })
    }
}

exports.logIn = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "Could not find any user with that username."
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if(isCorrect) {
            console.log(res);
            res.status(200).json({
                status: "Success",
                message: `Successfully logged in ${username}`
            })
        } else {
            res.status(400).json({
                status: "Failed"
            })
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            status: "Failed"
        })
    }
}

exports.show = async (req, res) => {
    res.send("<h1>Testing user/show route</h1>")
}