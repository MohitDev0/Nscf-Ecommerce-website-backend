const privateKey = process.env.privateKey;
const jwt = require('jsonwebtoken');
function verifyuser(req, res, cb) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(" ")[1];
        jwt.verify(token, privateKey, { algorithm: 'HS384' }, function (err, decoded) {
            if (err) {
                res.status(400).json("Invalid Token");
            } else {
                if (decoded.user.isAdmin) {
                    req.body.user = decoded.user;
                    cb();
                } else {
                    res.status(401).json("user is not Admin");
                }
            }
        });
    } else {
        res.status(401).json("Enter a token");
    }
}

module.exports = verifyuser;