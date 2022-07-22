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
                    //passwordが一致した場合トークンを作成(有効期間付き)
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'AzQ,PI)0(', { expiresIn: '1m' })
                        let refreshToken = jwt.sign({ name: user.name }, 'refreshTokenSecret', { expiresIn: '48h' })
                        res.json({
                            message: 'ログイン完了!',
                            token,
                            refreshToken
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

const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, 'refreshTokenSecret', (err, decode) => {
        if (err) {
            res.status(400).json({
                err
            })
        } else {
            let token = jwt.sign({ name: decode.name }, 'AzQ,PI)0(', { expiresIn: '60s' })
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                message: 'トークンのリフレッシュ成功！',
                token,
                refreshToken
            })
        }
    })
}

module.exports = {
    register,
    login,
    refreshToken
}