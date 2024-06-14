Proje Adı: Kullanıcı Yönetim ve Post Yönetimi RESTful API

Proje Açıklaması: Bu proje, kullanıcıların kayıt olmalarını, giriş yapmalarını, şifrelerini sıfırlamalarını sağlayan 
ve kullanıcıları editör ve normal kullanıcı olarak ayıran bir sistemdir.
 Ayrıca editörlerin post paylaşımı yapmalarını, paylaştıkları postları güncellemelerini, silmelerini ve pasife almalarını sağlar.
 Normal kullanıcılar ise sadece paylaşılan postları okuyabilirler.

Teknolojiler:

Node.js: Sunucu tarafı işlemleri için kullanıldı.
Express.js: Web uygulama çatısını oluşturmak için kullanıldı.
MongoDB: Veritabanı olarak kullanıldı.
JWT (JSON Web Token): Kullanıcı kimlik doğrulaması ve yetkilendirme için kullanıldı.
bcrypt: Şifrelerin güvenli bir şekilde saklanması için kullanıldı.
nodemailer: E-posta doğrulama ve iletişim için kullanıldı.
Proje Adımları:

Kullanıcı Kayıt ve Doğrulama: Kullanıcılar, isim, e-posta ve şifreleri ile kayıt olabilirler.
Kayıt işleminden sonra e-posta doğrulaması için bir e-posta gönderilir. Kullanıcılar e-postalarındaki bağlantıya tıklayarak hesaplarını doğrulayabilirler.
Kullanıcı Girişi ve JWT: Kayıtlı kullanıcılar e-posta ve şifreleri ile giriş yapabilirler. Başarılı bir girişten sonra JWT token alırlar.
Şifre Sıfırlama: Kullanıcılar, e-posta adreslerini kullanarak şifre sıfırlama isteği gönderebilirler.
Şifre sıfırlama bağlantısı içeren bir e-posta gönderilir ve kullanıcılar yeni şifrelerini belirleyebilirler.
Post Yönetimi: Editörler, başlık ve içerik girerek yeni bir post oluşturabilirler.
Ayrıca, kendi postlarını güncelleyebilir, silebilir ve pasife alabilirler. Normal kullanıcılar sadece aktif olan postları okuyabilirler.
Geliştirme Süreci: Projemiz, Node.js ve Express kullanılarak geliştirildi. MongoDB veritabanı, kullanıcı ve post verilerini depolamak için kullanıldı.
JWT, kullanıcı kimlik doğrulaması ve yetkilendirme için kullanıldı. bcrypt, şifrelerin güvenli bir şekilde saklanması için kullanıldı.
nodemailer, e-posta doğrulama ve iletişim için kullanıldı.

Sonuç: Proje, kullanıcıların kolayca kayıt olmalarını, giriş yapmalarını ve postları yönetmelerini sağlar.
RESTful API standartlarına uygun olarak tasarlanmıştır ve temel CRUD (Create, Read, Update, Delete) işlemlerini destekler.
Proje, güvenlik ve verimlilik açısından önemli teknolojileri kullanarak modern bir web uygulaması geliştirmenin temel prensiplerini göstermektedir.

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/978ccd5b-55e9-4601-877d-4ebdaca5b66f)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/432fc075-b3eb-40ea-9267-4c282564e266)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/757b4910-f94c-444c-a60c-b328a4152aac)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/98282930-d9f1-4479-89d7-b60793f7fea2)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/b01f0dcd-1441-41c7-a07d-0e062dbbea74)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/e35775a4-b531-4235-9c4d-6ff215f7e867)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/e64df352-18e3-42cd-b7ee-8c9daa8d70db)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/5a9e6b62-177b-4822-a980-71ea00771e03)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/d1441566-c88a-4ce0-bf60-2f48f32a4226)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/ab35a087-fbbc-4166-91e9-ab5801ee6721)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/8d5e27c6-08f1-47d7-a850-2a37971ebdd0)

![image](https://github.com/erdgn34/PostSharingApp/assets/116517667/51f4772a-840b-4e8b-9233-367c70ec6184)

# PostSharingApp

## Overview
PostSharingApp is a REST API for sharing posts with different user roles. Users can register, verify their email, login, reset their password, and post content. The app includes roles like `user`, `editor`, and `vipuye`, each with specific permissions.

## Features
- User Registration and Email Verification
- User Login and JWT Authentication
- Password Reset
- Role-Based Access Control
- File Uploads with Restrictions
- Post Management (Create, Update, Delete, View)
- View Count Tracking

## Roles
- `user`: Can only read posts.
- `editor`: Can upload PDFs, JPGs, JPEGs, PNGs, MP3s, and MP4s. Can create, update, delete, and deactivate posts.
- `vipuye`: Can only upload PDFs.

## Endpoints
### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and get a JWT token.
- `POST /api/auth/request-reset-password`: Request a password reset email.
- `POST /api/auth/reset-password/:token`: Reset password using a token.
- `GET /api/auth/verify/:token`: Verify user email.

### Posts
- `GET /api/posts`: Get all active posts.
- `GET /api/posts/:id`: Get a specific post and increment its view count.
- `POST /api/posts`: Create a new post (editor only).
- `PUT /api/posts/:id`: Update a post (editor only).
- `DELETE /api/posts/:id`: Delete a post (editor only).




