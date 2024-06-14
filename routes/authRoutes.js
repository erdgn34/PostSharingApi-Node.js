const express = require('express');
const { register, verifyEmail, login, resetPassword, requestPasswordReset } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: Kullanıcı adı
 *         email:
 *           type: string
 *           description: Kullanıcı e-postası
 *         password:
 *           type: string
 *           description: Kullanıcı şifresi
 *         role:
 *           type: string
 *           description: Kullanıcı rolü
 *           enum:
 *             - user
 *             - editor
 *             - vipuye
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Kullanıcı doğrulama ve yetkilendirme
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Kullanıcı kaydı yap
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: Kullanıcı adı
 *               email:
 *                 type: string
 *                 description: Kullanıcı e-postası
 *               password:
 *                 type: string
 *                 description: Kullanıcı şifresi
 *               role:
 *                 type: string
 *                 description: Kullanıcı rolü
 *                 enum:
 *                   - user
 *                   - editor
 *                   - vipuye
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 *       400:
 *         description: Geçersiz giriş
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/verify/{token}:
 *   get:
 *     summary: E-posta doğrulama
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Doğrulama tokenı
 *     responses:
 *       200:
 *         description: E-posta doğrulandı
 *       400:
 *         description: Geçersiz token
 */
router.get('/verify/:token', verifyEmail);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi yap
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Kullanıcı e-postası
 *               password:
 *                 type: string
 *                 description: Kullanıcı şifresi
 *     responses:
 *       200:
 *         description: Giriş başarılı
 *       400:
 *         description: Geçersiz giriş
 *       401:
 *         description: Yetkisiz
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/request-reset-password:
 *   post:
 *     summary: Şifre sıfırlama talebi
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Kullanıcı e-postası
 *     responses:
 *       200:
 *         description: Sıfırlama e-postası gönderildi
 *       400:
 *         description: Geçersiz giriş
 */
router.post('/request-reset-password', requestPasswordReset);

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   post:
 *     summary: Şifre sıfırlama
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Şifre sıfırlama tokenı
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Yeni şifre
 *     responses:
 *       200:
 *         description: Şifre sıfırlandı
 *       400:
 *         description: Geçersiz giriş
 *       401:
 *         description: Yetkisiz
 */
router.post('/reset-password/:token', resetPassword);

module.exports = router;
