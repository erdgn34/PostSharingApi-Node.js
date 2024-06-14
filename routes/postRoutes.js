const express = require('express');
const { createPost, updatePost, deletePost, getPosts, getPost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();
const upload = require('../middleware/fileUpload');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: Başlık
 *         content:
 *           type: string
 *           description: İçerik
 *         file:
 *           type: string
 *           format: binary
 *           description: Dosya
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Yeni bir post oluştur
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Başlık
 *               content:
 *                 type: string
 *                 description: İçerik
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Dosya
 *     responses:
 *       201:
 *         description: Post oluşturuldu
 *       400:
 *         description: Geçersiz giriş
 *       401:
 *         description: Yetkisiz
 *     security:
 *       - bearerAuth: []
 */
router.post('/', auth(['editor', 'vipuye']), upload.single('file'), createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Postu güncelle
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Başlık
 *               content:
 *                 type: string
 *                 description: İçerik
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Dosya
 *     responses:
 *       200:
 *         description: Başarılı
 *       400:
 *         description: Geçersiz giriş
 *       401:
 *         description: Yetkisiz
 *       404:
 *         description: Post bulunamadı
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', auth(['editor', 'vipuye']), upload.single('file'), updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Postu sil
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Başarılı
 *       401:
 *         description: Yetkisiz
 *       404:
 *         description: Post bulunamadı
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', auth('editor'), deletePost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Tüm postları getir
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Başarılı
 *       401:
 *         description: Yetkisiz
 */
router.get('/', getPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Belirli bir postu getir
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Başarılı
 *       401:
 *         description: Yetkisiz
 *       404:
 *         description: Post bulunamadı
 */
router.get('/:id', getPost);

module.exports = router;

