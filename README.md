# Thông tin sinh viên

Họ tên: Lê Thị Thùy Trang
MSSV: 23521627
Lớp: IE213.Q21

## Danh sách các LAB

### Lab01: MONGODB – CRUD Operation (Thiết lập môi trường, thực hành viết lệnh với MongoDB) (Hoàn thành)

Bài thực hành LAB01 tập trung vào việc làm quen với MongoDB thông qua các thao tác CRUD (Create, Read, Update, Delete) cơ bản. Sinh viên sẽ học cách:

- Thiết lập và kết nối đến MongoDB database
- Thực hiện các thao tác cơ bản với documents: insert, find, update, delete
- Sử dụng aggregation để tính toán thống kê
- Quản lý indexes và constraints

#### Cách chạy chương trình

1. **Thiết lập môi trường MongoDB:**
   - Cài đặt MongoDB và MongoDB Shell
   - Khởi động MongoDB service

2. **Kết nối và sử dụng database:**

   ```bash
   # Mở MongoDB Shell và chuyển đến database
   use 23521627-IE213
   # Kết quả: switched to db 23521627-IE213
   ```

3. **Thực hiện các thao tác CRUD:**

   **Insert documents:**

   ```bash
   db.employees.insertMany([
     {"id":1,"name":{"first":"John","last":"Doe"},"age":48},
     {"id":2,"name":{"first":"Jane","last":"Doe"},"age":16},
     {"id":3,"name":{"first":"Alice","last":"A"},"age":32},
     {"id":4,"name":{"first":"Bob","last":"B"},"age":64}
   ])
   ```

   **Tạo index unique:**

   ```bash
   db.employees.createIndex({id:1},{unique:true})
   ```

   **Query documents:**

   ```bash
   # Tìm tất cả documents
   db.employees.find()

   # Tìm theo điều kiện
   db.employees.find({"name.first": "John", "name.last": "Doe"})
   ```

   **Update documents:**

   ```bash
   # Thêm trường organization
   db.employees.updateMany({}, { $set: { organization: "UIT" } })

   # Thay đổi organization cho id 5,6
   db.employees.updateMany(
     { id: { $in: [5, 6] } },
     { $set: { organization: "USSH" } }
   )
   ```

   **Aggregation:**

   ```bash
   db.employees.aggregate([
     {
       $match: {
         organization: { $in: ["UIT", "USSH"] }
       }
     },
     {
       $group: {
         _id: "$organization",
         totalAge: { $sum: "$age" },
         averageAge: { $avg: "$age" }
       }
     }
   ])
   ```

#### Kết quả thực hiện

- **Kết nối database thành công:** `switched to db 23521627-IE213`
- **Insert thành công:** Nhận được `acknowledged: true` và `insertedIds` cho 4 documents
- **Index unique:** Tạo thành công index cho trường `id`
- **Query results:** Hiển thị documents theo định dạng JSON với `_id`, `id`, `name`, `age`, `organization`
- **Update results:** `acknowledged: true`, `matchedCount`, `modifiedCount` cho biết số documents được cập nhật
- **Aggregation results:**
  ```
  { _id: 'UIT', totalAge: 160, averageAge: 40 }
  { _id: 'USSH', totalAge: 90, averageAge: 45 }
  ```

---

### Lab02: THIẾT LẬP BACKEND VỚI NODE|EXPRESSJS (Hoàn thành)

**Mục tiêu bài thực hành**

- Thiết lập hệ thống backend cho ứng dụng web bằng Node.js và ExpressJS.
- Kết nối ứng dụng với MongoDB Atlas.
- Xây dựng API cơ bản để truy xuất dữ liệu phim theo kiến trúc Route -> Controller -> DAO.

**Công cụ / môi trường sử dụng**

- Node.js.
- Trình soạn thảo mã nguồn: Visual Studio Code.
- Các dependency chính: `express`, `cors`, `dotenv`, `mongodb`.
- Công cụ hỗ trợ: `nodemon`.
- Cơ sở dữ liệu: MongoDB Atlas Cloud.

**Cách chạy**

- Bước 1: Vào thư mục `Lab02/movie-reviews/backend`.
- Bước 2: Cài dependencies bằng `npm install`.
- Bước 3: Cấu hình biến môi trường trong `.env` (URI kết nối, namespace DB, cổng chạy).
- Bước 4: Chạy server bằng `npm run dev` (hoặc `node index.js`).
- Bước 5: Mở trình duyệt tại `http://localhost:3000/api/v1/movies` để kiểm tra API.

**Kết quả đầu ra**

- Server backend chạy thành công trên cổng cấu hình (mặc định 3000).
- Endpoint `api/v1/movies` trả về JSON.
- Hoàn thiện các thành phần chính của backend:
  - `server.js` để khởi tạo app và middleware.
  - `index.js` để kết nối MongoDB và chạy server.
  - `api/movies.route.js` để định tuyến.
  - `dao/moviesDAO.js` để truy xuất dữ liệu collection `movies`.
  - `api/movies.controller.js` để xử lý request/response.

**Giải thích ngắn gọn phần chính đã thực hiện**

- Khởi tạo server bằng Express, bật middleware `cors` và `express.json()`.
- Tách cấu hình môi trường bằng `.env` để quản lý URI DB, namespace và PORT.
- Kết nối MongoDB Atlas bằng MongoClient trong `index.js`.
- Xây dựng lớp `MoviesDAO` với 2 phương thức chính:
  - `injectDB()` để lấy tham chiếu collection `movies`.
  - `getMovies()` để lấy danh sách phim theo phân trang/lọc và tổng số phim.
- Tạo controller để gọi DAO và trả dữ liệu JSON cho client.
- Gắn controller vào route `/api/v1/movies` để hoàn tất luồng API.
  **Hình ảnh minh họa kết quả**

### **Phần 1: Cài đặt và khởi tạo dự án**

#### **Bước 1.1** - Tải và cài đặt Node.js

Truy cập [nodejs.org](https://nodejs.org) để tải phiên bản LTS mới nhất.

![Cài đặt Node.js](LAB02/images/step-1.1-nodejs-install.png)

---

#### **Bước 1.2** - Cài đặt công cụ soạn thảo mã nguồn

Chọn một trong những công cụ phổ biến như VS Code, WebStorm, hoặc Sublime Text.

![Cài đặt Editor](LAB02/images/step-1.2-editor-install.png)
![Editor Setup](LAB02/images/step-1.2b-editor-install.png)

---

#### **Bước 1.3** - Khởi tạo cấu trúc thư mục dự án

Tạo một thư mục mới để chứa mã nguồn của dự án.

![Cấu trúc thư mục](LAB02/images/step-1.3-project-structure.png)

---

#### **Bước 1.4** - Khởi tạo dự án với npm

Chạy lệnh `npm init` để tạo file `package.json`.

```bash
npm init
```

![npm init](LAB02/images/step-1.4-npm-init.png)

---

#### **Bước 1.5** - Cài đặt các dependency cần thiết

Cài đặt các package cần thiết cho dự án: MongoDB, Express, CORS, và Dotenv.

```bash
npm install mongodb express cors dotenv
```

![Cài đặt Dependencies](LAB02/images/step-1.5-dependencies.png)

---

#### **Bước 1.6** - Cài đặt Nodemon

Nodemon là công cụ hỗ trợ tự động khởi động lại server khi có thay đổi mã nguồn.

```bash
npm install --save-dev nodemon
```

![Cài đặt Nodemon](LAB02/images/step-1.6-nodemon.png)

---

### **Phần 2: Xây dựng cấu trúc backend**

#### **Bước 2.1** - Tạo file `server.js`

File này chịu trách nhiệm khởi tạo máy chủ web.

![Tạo server.js](LAB02/images/step-2.1-server-js.png)

---

#### **Bước 2.2** - Tạo file `.env`

Lưu trữ các biến môi trường phát triển như URI kết nối MongoDB Atlas, PORT, v.v.

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3000
```

![Tạo file .env](LAB02/images/step-2.2-env-file.png)

---

#### **Bước 2.3** - Tạo file `index.js`

File chính để quản lý kết nối dữ liệu, khởi tạo đối tượng và chạy máy chủ.

![Tạo index.js](LAB02/images/step-2.3-index-js.png)

---

#### **Bước 2.4** - Tạo định tuyến (Route)

Tạo file `api/movies.route.js` để xử lý các định tuyến liên quan đến phim.

![Tạo Route File](LAB02/images/step-2.4-route-file.png)

---

#### **Bước 2.5** - Thiết lập DAO (Data Access Object)

DAO là lớp truy cập dữ liệu, giúp tách biệt logic xử lý dữ liệu từ controller.

![DAO Part 1](LAB02/images/step-2.5-dao-part1.png)
![DAO Part 2](LAB02/images/step-2.5-dao-part2.png)
![DAO Part 3](LAB02/images/step-2.5b-dao-part3.png)

---

#### **Bước 2.6** - Thiết lập Controller

Controller xử lý logic kinh doanh và gọi đến các phương thức DAO.

![Thiết lập Controller](LAB02/images/step-2.6-controller.png)
![Controller Part 2](LAB02/images/step-2.6b-controller-part2.png)

---

#### **Bước 2.7** - Tích hợp Controller vào Route

Đưa các controller vừa tạo vào định tuyến để hoàn thiện API.

![Tích hợp Controller vào Route](LAB02/images/step-2.7-route-controller.png)

### Lab03: Hoàn thiện Back-end cho ứng dụng minh họa (Hoàn thành)\*\*

**Mục tiêu bài thực hành**

- Hoàn thiện backend cho ứng dụng Movie Reviews theo mô hình Route -> Controller -> DAO.
- Bổ sung chức năng review CRUD, tra cứu phim theo ID kèm review và lấy danh sách rating.
- Kiểm thử toàn bộ API bằng Insomnia.

**Công cụ / môi trường sử dụng**

- Node.js và JavaScript ES6.
- Trình soạn thảo mã nguồn: Visual Studio Code.
- Thư viện chính: `express`, `cors`, `dotenv`, `mongodb`, `nodemon`.
- Cơ sở dữ liệu: MongoDB Atlas Cloud.
- Công cụ kiểm thử API: Insomnia.

**Cách chạy**

- Bước 1: Vào thư mục `Lab03/movie-reviews/backend`.
- Bước 2: Cài dependencies bằng `npm install`.
- Bước 3: Cấu hình file `.env` với `MOVIEREVIEWS_DB_URI`, `MOVIEREVIEWS_NS`, `PORT`.
- Bước 4: Chạy server bằng `npm run dev` hoặc `node index.js`.
- Bước 5: Kiểm thử các endpoint sau bằng Insomnia:
  - `GET /api/v1/movies`
  - `GET /api/v1/movies/id/:id`
  - `GET /api/v1/movies/ratings`
  - `POST /api/v1/movies/review`
  - `PUT /api/v1/movies/review`
  - `DELETE /api/v1/movies/review`

**Kết quả đầu ra**

- Backend chạy thành công trên cổng cấu hình.
- API trả được danh sách phim, phim theo ID kèm review, và danh sách rating.
- Thêm, sửa, xóa review hoạt động qua endpoint `/api/v1/movies/review`.

**Giải thích ngắn gọn phần chính đã thực hiện**

- **Routing:** Dùng `express.Router()` để định tuyến request đến đúng controller.
- **Controller:** Nhận dữ liệu từ `req.body` hoặc `req.params`, gọi DAO và trả JSON cho client.
- **DAO:** Thao tác trực tiếp với MongoDB bằng `insertOne`, `updateOne`, `deleteOne`, `aggregate` và `distinct`.
- **Tra cứu nâng cao:** Dùng `$lookup` để lấy phim kèm các review liên quan, và `distinct("rated")` để lấy danh sách rating.

**Hình ảnh minh họa kết quả**

**Bài 1 — Thiết lập định tuyến cho review**

![alt text](LAB03/images/image.png)

**Bài 2 — Thiết lập Controller cho review**

![alt text](LAB03/images/image-1.png)

**Bài 3 — Thiết lập DAO cho reviews**

![alt text](LAB03/images/image-2.png)

**3.6 — Thử nghiệm các API thêm / xóa / sửa dữ liệu**

![Thêm](LAB03/images/image-3.png)
![Sửa](LAB03/images/image-4.png)
![Xóa](LAB03/images/image-5.png)

**Bài 4 — Hoàn thành back-end cho ứng dụng minh họa**

![alt text](LAB03/images/image-6.png)

**4.1 — Thêm định tuyến lấy phim theo Id kèm review và lấy rating**

**4.2 — Thêm controller `apiGetMovieById()` và `apiGetRatings()`**

![alt text](LAB03/images/image-7.png)

**4.3 — Thêm DAO `getMovieById()` và `getRatings()`**

![alt text](LAB03/images/image-8.png)

**4.4 — Thử nghiệm các API vừa tạo**

**Kết quả API: Lấy tất cả thông tin của phim và các review liên quan theo Id phim**

![alt text](LAB03/images/image-9.png)

**Kết quả API: Lấy tất cả các loại rating của phim trên dữ liệu**

![alt text](LAB03/images/image-10.png)

### Lab04: chưa hoàn thành

### Lab05: chưa hoàn thành

### Lab06: chưa hoàn thành
