const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'AzQ,PI)0(')

        req.user = decode
        next()
    } catch (error) {
        if (error.name == "TokenExpiredError") {
            res.status(401).json({
                message: "トークンが期限切れです"
            })
        } else {
            res.json({
                message: '認証失敗'
            })
        }
    }
}

module.exports = authenticate