const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = {
        user: [],
        vipuye: ['.pdf'],
        editor: ['application/pdf', 'image/jpeg', 'image/png', 'audio/mp3', 'video/mp4']
    };

    const role =req.user && req.user.role;
    if(!role){
        return cb(new Error('User role is not found'),false)
    }
    console.log(`Kullanıcı Rolü: ${role}`);

    const fileExtension = path.extname(file.originalname).toLowerCase();
   
    //     try {
//         const buffer = await fs.readFile(file.path);
//         const { FileType } = await import('file-type');
//         const fileType = await FileType.fromBuffer(buffer);
//         const mimeType = fileType ? fileType.mime : null;

//         if (allowedFileTypes[role].includes(fileExtension) && allowedMimeTypes[role].includes(mimeType)) {
//             cb(null, true);
//         } else {
//             cb(new Error('Invalid file type'), false);
//         }
//     } catch (err) {
//         return cb(new Error('Error determining file type'), false);
//     }
    
    if (allowedFileTypes[role].includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit   
});

module.exports = upload