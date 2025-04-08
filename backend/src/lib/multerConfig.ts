import multer from 'multer';
import path from 'path';
import fs from 'fs';

const UPLOADS_DIR = './uploads';

// Убедимся, что папка uploads существует
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Настройка хранилища для multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Указываем папку для сохранения файлов
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        // Генерируем уникальное имя файла: timestamp-оригинальное_имя
        // Это помогает избежать конфликтов имен и сохраняет расширение
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

// Фильтр файлов (опционально) - например, разрешаем только определенные типы
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Пример: разрешаем только изображения и PDF
    // const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    // if (allowedMimeTypes.includes(file.mimetype)) {
    //     cb(null, true); // Принять файл
    // } else {
    //     cb(new Error('Invalid file type.')); // Отклонить файл
    // }
    cb(null, true); // Пока разрешаем любые файлы
};

// Создаем middleware multer с настройками
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10 // Ограничение размера файла (например, 10MB)
    }
});

export default upload; 