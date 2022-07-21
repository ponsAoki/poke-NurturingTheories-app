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

const login = (req, res, next) => {
    const userName = req.body.username
    const password = req.body.password

    //userNameが一致するレコードをDBから取得
    User.findOne({ email: userName })
        .then(user => {
            if (user) {
                //リクエスト(POST)されたpasswrodをDBのものと比較
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    //passwordが一致した場合トークンを作成(有効期間1日)
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1day' })
                        res.json({
                            message: 'ログイン完了!',
                            token
                        })
                    } else {
                        res.json({
                            message: 'パスワードが違います'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'ユーザーが見当たりません'
                })
            }
        })
}

module.exports = {
    register,
    login
}