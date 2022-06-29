const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        })
        user.save()
            .then(user => {
                res.json({
                    message: "ユーザー登録完了!"
                })
            })
            .catch(error => {
                res.json({
                    message: "ユーザー登録に失敗しました"
                })
            })
    })


}

module.exports = {
    register
}