**Mục tiêu bài thực hành**

- Mở rộng backend cho ứng dụng Movie bằng cách thêm chức năng đánh giá (reviews).
- Xây dựng API cho việc tạo, đọc, cập nhật và xóa reviews.
- Tích hợp reviews với movies thông qua movie_id.
- Sử dụng luồng Route -> Controller -> DAO để quản lý reviews.

**Công cụ / Môi trường sử dụng**

- Node.js.
- Trình soạn thảo mã nguồn: Visual Studio Code.
- Dependency chính: `express`, `cors`, `dotenv`, `mongodb`.
- Công cụ hỗ trợ chạy phát triển: `nodemon`.
- Cơ sở dữ liệu: MongoDB Atlas Cloud.

**Cách chạy**

- **Bước 1:** Tiếp tục từ Lab02, thêm các file mới cho reviews.
- **Bước 2:** Cài đặt thêm package nếu cần (thường đã có từ Lab02).
- **Bước 3:** Tạo các file cho reviews:
  - `api/reviews.route.js` để định tuyến API reviews.
  - `dao/reviewsDAO.js` để truy xuất dữ liệu collection `reviews`.
  - `api/reviews.controller.js` để nhận request và trả response cho reviews.
- **Bước 4:** Cập nhật `server.js` để include routes reviews nếu cần.
- **Bước 5:** Chạy backend bằng `npm run dev` hoặc `node index.js`.
- **Bước 6:** Truy cập các endpoint reviews như `POST /api/v1/movies/:id/reviews` để kiểm tra.

**Kết quả đầu ra**

- Backend hỗ trợ đầy đủ CRUD cho reviews.
- API reviews tích hợp với movies.
- Cấu trúc backend mở rộng với reviews.

**Giải thích ngắn gọn phần chính đã thực hiện**

- **Thiết lập DAO cho reviews:** Tương tự moviesDAO, nhưng cho collection `reviews`.
- **Thiết lập Controller cho reviews:** Xử lý POST, GET, PUT, DELETE cho reviews.
- **Thiết lập Routing cho reviews:** Ánh xạ các endpoint cho reviews.
