const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (role) => async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'Token yok, yetkilendirme reddedildi' });
    }

    try {
    
        const actualToken = token.replace('Bearer ', '');
   
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

        req.user = decoded.user;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'Kullanıcı bulunamadı' });
        }
        if (role && user.role !== role) {
            return res.status(403).json({ msg: 'Erişim reddedildi' });
        }

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token geçerli değil' });
    }
};

module.exports = auth;
