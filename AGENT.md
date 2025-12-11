# 📋 AGENT.md - Cấu Hình Dự Án Website

## 🎯 Thông Tin Dự Án

**Tên dự án:** Website Bán Điện Thoại  
**Loại:** E-commerce Website (Fullstack)  
**Ngày tạo:** 2025-12-10  
**Developer:** Phuongle2312

---

## 🏗️ Kiến Trúc Hệ Thống

### Tech Stack

#### Backend
- **Framework:** Laravel 12.x
- **Language:** PHP 8.2+
- **Database:** SQLite (Development) / MySQL (Production)
- **Authentication:** Laravel Sanctum
- **API:** RESTful API

#### Frontend
- **Framework:** React.js 18.x
- **Language:** JavaScript (ES6+)
- **UI Library:** React Bootstrap
- **Styling:** CSS3, Bootstrap 5
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Routing:** React Router DOM

---

## 📁 Cấu Trúc Thư Mục

```
Website/
├── be_product/                    # Backend (Laravel)
│   └── example-app/
│       ├── app/
│       │   ├── Http/
│       │   │   ├── Controllers/
│       │   │   │   └── ProductController.php
│       │   │   └── Middleware/
│       │   │       └── Cors.php
│       │   └── Models/
│       │       └── Product.php
│       ├── database/
│       │   ├── migrations/
│       │   │   └── 2025_12_08_123027_create_products_table.php
│       │   └── seeders/
│       │       ├── DatabaseSeeder.php
│       │       └── ProductSeeder.php
│       ├── routes/
│       │   └── api.php
│       ├── storage/
│       │   └── app/
│       │       └── public/
│       │           └── products/        # Lưu ảnh sản phẩm
│       └── .env
│
└── fe_product/                    # Frontend (React)
    ├── public/
    │   └── image/                 # Ảnh tĩnh (legacy)
    ├── src/
    │   ├── components/            # Reusable components
    │   ├── context/
    │   │   └── CartContext.js     # Cart state management
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── ProductList.js
    │   │   ├── Product.js
    │   │   ├── ProductCard.js     # Cart page
    │   │   ├── Checkout.js
    │   │   ├── Contact.js
    │   │   └── Services.js
    │   ├── services/
    │   │   └── api.js             # API calls
    │   └── App.js
    └── package.json
```

---

## 🔧 Cấu Hình Môi Trường

### Backend (.env)
```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# DB_DATABASE=database/database.sqlite

CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend
```javascript
// API Base URL
const API_BASE_URL = 'http://localhost:8000/api';
```

---

## 🗄️ Database Schema

### Bảng: products
```sql
- id (bigint, primary key, auto_increment)
- name (varchar)
- image_path (varchar, nullable)      # Đường dẫn tương đối trong storage
- price (varchar)
- description (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### Accessor
- `image_url`: Tự động trả về full URL của ảnh
  - Format: `http://localhost:8000/storage/products/p1.jpg`

---

## 🚀 Cách Chạy Dự Án

### Backend
```bash
cd e:\Github\Website\be_product\example-app

# Lần đầu setup
php artisan storage:link
php artisan migrate:fresh --seed

# Chạy server
php artisan serve
# Server: http://localhost:8000
```

### Frontend
```bash
cd e:\Github\Website\fe_product

# Cài đặt dependencies (lần đầu)
npm install

# Chạy development server
npm start
# Server: http://localhost:3000
```

---

## 📡 API Endpoints

### Products
- `GET /api/products` - Lấy tất cả sản phẩm
- `GET /api/products/{id}` - Lấy chi tiết sản phẩm
- `GET /api/products/search?q={query}` - Tìm kiếm sản phẩm

### Response Format
```json
{
  "id": 1,
  "name": "iPhone 17 Pro Max",
  "image_path": "products/p1.jpg",
  "price": "34.990.000₫",
  "description": "...",
  "image_url": "http://localhost:8000/storage/products/p1.jpg",
  "created_at": "2025-12-10T...",
  "updated_at": "2025-12-10T..."
}
```

---

## 🎨 Design System

### Colors
- **Primary:** Green (#28a745)
- **Secondary:** Gray (#6c757d)
- **Success:** Green (#28a745)
- **Danger:** Red (#dc3545)
- **Warning:** Yellow (#ffc107)

### Typography
- **Font Family:** System fonts, Bootstrap default
- **Headings:** Bold, Green color
- **Body:** Regular, Dark gray

### Components
- **Cards:** Shadow, rounded corners (rounded-4)
- **Buttons:** Rounded, with hover effects
- **Images:** Responsive, object-fit: contain

---

## 🔐 Security

### CORS
- Middleware: `App\Http\Middleware\Cors`
- Allowed Origins: `*` (Development) / Specific domains (Production)
- Allowed Methods: GET, POST, PUT, DELETE, OPTIONS

### Image Storage
- Path: `storage/app/public/products/`
- Access: Via symbolic link `public/storage/`
- Naming: p1.jpg, p2.jpg, p3.jpg, ...

---

## 📦 Dependencies

### Backend (composer.json)
```json
{
  "require": {
    "php": "^8.2",
    "laravel/framework": "^12.0"
  }
}
```

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-router-dom": "^6.x",
    "react-bootstrap": "^2.x",
    "axios": "^1.x",
    "aos": "^2.x",
    "framer-motion": "^10.x",
    "react-toastify": "^9.x"
  }
}
```

---

## 🐛 Troubleshooting

### Backend không chạy
```bash
# Kiểm tra .env
# Đảm bảo DB_CONNECTION=sqlite
# Tạo file database.sqlite nếu chưa có
New-Item -ItemType File -Path "database\database.sqlite"
```

### Frontend không hiển thị ảnh
```bash
# Kiểm tra symbolic link
php artisan storage:link

# Kiểm tra ảnh trong storage/app/public/products/
# Đảm bảo Frontend dùng product.image_url
```

### CORS Error
```bash
# Kiểm tra middleware Cors đã được register
# File: bootstrap/app.php
```

---

## 📝 Git Workflow

### Branches
- `main` - Production
- `develop` - Development
- `feature/*` - New features

### Commit Convention
```
feat: Add login functionality
fix: Fix image display issue
docs: Update AGENT.md
style: Improve UI design
refactor: Refactor ProductSeeder
```

---

## 🎯 Roadmap

### ✅ Completed
- [x] Setup Laravel + React
- [x] Product CRUD API
- [x] Product listing page
- [x] Product detail page
- [x] Shopping cart
- [x] Checkout flow
- [x] Image storage with Laravel Storage
- [x] CORS configuration

### 🚧 In Progress
- [ ] User authentication (Login/Register)
- [ ] User profile management
- [ ] Order management
- [ ] Payment integration

### 📅 Planned
- [ ] Admin dashboard
- [ ] Product reviews
- [ ] Wishlist
- [ ] Email notifications
- [ ] Search filters
- [ ] Product categories

---

## 👥 Team

- **Developer:** Phuongle2312
- **Repository:** https://github.com/Phuongle2312/Website

---

## 📞 Support

Nếu gặp vấn đề, tham khảo các file hướng dẫn:
- `HUONG_DAN_SU_DUNG.md` - Hướng dẫn sử dụng
- `SETUP_LARAVEL_STORAGE.md` - Setup storage
- `FIX_DATABASE_ERROR.md` - Fix lỗi database
- `walkthrough.md` - Tổng quan các thay đổi

---

**Last Updated:** 2025-12-10
