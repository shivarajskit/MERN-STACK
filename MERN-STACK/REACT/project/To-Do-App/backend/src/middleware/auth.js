const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const auth = req.header("Authorization")?.split(" ")[1];
    if (!auth) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
}

module.exports = auth;