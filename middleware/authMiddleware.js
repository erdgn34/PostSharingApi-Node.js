const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (role) => async (req, res, next) => {
    // Token var mı kontrol et
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'Token yok, yetkilendirme reddedildi' });
    }

    try {
        // Bearer kısmını çıkar
        const actualToken = token.replace('Bearer ', '');

        // Token'ı doğrula
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

        // Kullanıcıyı istek nesnesine ekle
        req.user = decoded.user;

        // Veritabanında kullanıcıyı bul
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'Kullanıcı bulunamadı' });
        }

        // Rol kontrolü
        if (role && user.role !== role) {
            return res.status(403).json({ msg: 'Erişim reddedildi' });
        }

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token geçerli değil' });
    }
};

module.exports = auth;
