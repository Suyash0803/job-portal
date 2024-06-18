const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No Authorization Header' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: payload.userID };
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid Token' });
    }
};

module.exports = userAuth;
