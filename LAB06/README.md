**Mục tiêu bài thực hành**

- **Bài 1: Thêm và Sửa Review**
  - Xây dựng chức năng đăng nhập để phân quyền người dùng (chỉ người dùng đã đăng nhập mới có quyền sửa/xóa review của chính họ).
  - Xây dựng giao diện và logic để người dùng có thể thêm mới một đánh giá (review) cho phim.
  - Xây dựng tính năng chỉnh sửa các đánh giá đã tồn tại.
- **Bài 2: Xóa Review**
  - Cho phép người dùng xóa đánh giá mà họ đã tự đăng.
- **Bài 3: Lấy dữ liệu cho trang tiếp theo (Phân trang - Pagination)**
  - Thực hiện chức năng phân trang cho danh sách phim mặc định.
  - Đảm bảo việc tìm kiếm theo tên phim hoặc xếp hạng cũng hỗ trợ phân trang chính xác.

**Công cụ / Môi trường sử dụng**

- **Thư viện chính:** `ReactJS`, `React Bootstrap` (Form, Button, Col, Row, Container, Card).
- **Thư viện điều hướng:** `react-router-dom` (Link, Route).
- **Dịch vụ kết nối API:** `MovieDataService` (các phương thức `getAll`, `find`, `createReview`, `updateReview`, `deleteReview`).
- **React Hooks sử dụng:** `useState`, `useEffect`.
- **Môi trường chạy:** Node.js với trình quản lý gói `npm`.

**Cách chạy**

- **Bước 1:** Đảm bảo Backend đang chạy ổn định tại địa chỉ `http://localhost:5000`.
- **Bước 2:** Di chuyển vào thư mục frontend của Lab06 và khởi chạy ứng dụng bằng lệnh `npm start`.
- **Bước 3: Thực hiện Bài 1 (Thêm/Sửa):**
  - Người dùng truy cập trang Login (`/login`), nhập Username và ID để đăng nhập.
  - Hệ thống tự động chuyển hướng (redirect) về trang Home sau khi đăng nhập thành công.
  - Tại trang chi tiết phim, nhấn "Add Review" để thêm mới đánh giá hoặc nhấn "Edit" trên đánh giá của chính mình để chỉnh sửa.
- **Bước 4: Thực hiện Bài 2 (Xóa):**
  - Đăng nhập vào tài khoản, tìm đến đánh giá do chính mình viết và nhấn nút "Delete".
- **Bước 5: Thực hiện Bài 3 (Phân trang):**
  - Tại trang danh sách phim, cuộn xuống dưới cùng để xem số trang hiện tại.
  - Nhấn nút "Get next ... results" để tải thêm dữ liệu của trang tiếp theo.

**Kết quả đầu ra**

- **Bài 1:**
  - Giao diện form đăng nhập hiển thị chính xác.
  - Hiển thị Form "Create Review" hoặc "Edit Review" tùy vào trạng thái người dùng đang thêm mới hay chỉnh sửa.
  - Thông báo "Review submitted successfully" hiển thị sau khi gửi thành công kèm liên kết quay lại trang phim.
- **Bài 2:**
  - Review bị xóa khỏi giao diện ngay lập tức mà không cần tải lại trang nhờ vào việc cập nhật state của React.
- **Bài 3:**
  - Hiển thị dòng chữ: `"Showing page: [số trang]."`.
  - Nút bấm chuyển trang hoạt động mượt mà dựa trên số lượng phim mỗi trang (`entriesPerPage`).

**Giải thích ngắn gọn phần chính đã thực hiện**

- **Bài 1: Thêm/Sửa Review**
  - Sử dụng biến trạng thái `editing` (boolean) để xác định xem người dùng đang thêm mới hay sửa dựa trên props truyền vào (`currentReview`).
  - Hàm `saveReview` sẽ kiểm tra biến `editing` để quyết định gọi `createReview` hoặc `updateReview` từ `MovieDataService`.
- **Bài 2: Xoá Review**
  - Khi nhấn "Delete", hàm `deleteReview` được gọi với `reviewId` và `index` của review đó trong mảng.
  - Sau khi API backend phản hồi thành công, sử dụng hàm `splice(index, 1)` để loại bỏ review khỏi mảng `reviews` trong state `movie`, giao diện cập nhật ngay lập tức.
- **Bài 3: Phân trang danh sách phim**
  - Sử dụng `useEffect` lắng nghe sự thay đổi của biến `currentPage`. Mỗi khi `currentPage` thay đổi (tăng lên), hàm `retrieveMovies()` hoặc `retrieveNextPage()` sẽ được gọi lại để lấy dữ liệu trang mới từ server.
  - Thêm biến `currentSearchMode` để quản lý trạng thái đang tìm kiếm theo tiêu chí nào (`"findByTitle"`, `"findByRating"` hoặc `""`), giúp tự động reset `currentPage` về 0 khi người dùng thay đổi cách tìm kiếm.
