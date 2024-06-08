const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
transporter.verify((error, success)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Ready for messages");
        console.log(success);
    }
});

const register = async (req, res) => {
    const { name, email, password,role } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log(user);

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ name, email, password: await bcrypt.hash(password, 10),role });

        await user.save();

        const verificationToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const url = `http://localhost:${process.env.PORT}/api/auth/verify/${verificationToken}`;

        await transporter.sendMail({
            to: email,
            subject: 'Verify your email',
            html: `<a href="${url}">Verify your email</a>`,
        });

        res.status(200).json({ msg: 'Verification email sent' });
    } catch (err) {
        console.error("Error in register function: ", err);
        res.status(500).json({ msg: 'Server error',error:err.message });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }
        if (user.isVerified) {
            return res.status(400).json({ msg: 'Email already verified' });
        }
        user.isVerified = true;
        await user.save();
       
        return res.redirect('/verified.html');
    } catch (err) {
        res.status(400).json({ msg: 'Invalid token' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        if (!user.isVerified) {
            return res.status(400).json({ msg: 'Email not verified' });
        }
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};


const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const resetToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const resetUrl = `http://localhost:${process.env.PORT}/reset-password/${resetToken}`;

        await transporter.sendMail({
            to: email,
            subject: 'Password Reset',
            html: `<a href="${resetUrl}">Reset your password</a>`,
        });

        res.status(200).json({ msg: 'Password reset email sent' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};


const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ msg: 'Password reset successful' });
    } catch (err) {
        res.status(400).json({ msg: 'Invalid token' });
    }
};


module.exports = { register, verifyEmail, login, resetPassword,requestPasswordReset };
