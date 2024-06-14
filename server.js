const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express();


connectDB();


app.use(bodyParser.json());

// Swagger options
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Post Sharing API',
        version: '1.0.0',
        description: 'Post Sharing API documentation',
      },
      servers: [
        {
          url: 'http://localhost:3002',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotalar
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/reset-password/:token', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'resetPasswordForm.html'));
});
app.use('/api/posts/uploads', express.static(path.join(__dirname, 'uploads')));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
