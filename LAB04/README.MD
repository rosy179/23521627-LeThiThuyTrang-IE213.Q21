**Mục tiêu bài thực hành**

- Thiết lập phần Frontend cho dự án ứng dụng minh họa "Movie Review" bằng ReactJS.
- Xây dựng thanh điều hướng (Navigation Header bar) cho ứng dụng.
- Thiết lập các định tuyến (routing) để kết nối các thành phần (components) trong ứng dụng.

**Công cụ / Môi trường sử dụng**

- Thư viện chính: `ReactJS`.
- Công cụ khởi tạo: `create-react-app`.
- Thư viện hỗ trợ UI: `Bootstrap` và `React-Bootstrap`.
- Thư viện điều hướng: `React Router Dom`.
- Môi trường chạy: Node.js với trình quản lý gói `npm`.

**Cách chạy**

- **Bước 1:** Tạo template frontend bằng câu lệnh `npx create-react-app frontend`.
- **Bước 2:** Di chuyển vào thư mục dự án bằng lệnh `cd frontend`.
- **Bước 3:** Cài đặt các gói bổ sung bằng lệnh `npm i react-bootstrap bootstrap` và `npm i react-router-dom`.
- **Bước 4:** Khởi chạy ứng dụng bằng câu lệnh `npm start`.

**Kết quả đầu ra**

- Một ứng dụng React cơ bản hiển thị trên trình duyệt tại địa chỉ `http://localhost:3000`.
- Thanh điều hướng có tên logo là "Movie Reviews", cùng các liên kết "Movies" và "Login/Logout".
- Hệ thống định tuyến hoạt động, cho phép chuyển đổi giữa các trang: danh sách phim, chi tiết phim, thêm review và đăng nhập.

**Giải thích ngắn gọn phần chính đã thực hiện**

- **Khởi tạo cấu trúc:** Tạo thư mục `Components` chứa các file chức năng như `movies-list.js`, `movie.js`, `add-review.js`, và `login.js`.
- **Xây dựng giao diện chính:** Sử dụng `React-Bootstrap` để tạo thanh `Navbar` trong `App.js`.
- **Quản lý trạng thái:** Sử dụng Hook `useState` để quản lý trạng thái đăng nhập của người dùng (`user`, `setUser`).
- **Cấu hình điều hướng:** Sử dụng thẻ `<Routes>` và `<Route>` từ `react-router-dom` (v6+) để định nghĩa các đường dẫn (path) tương ứng với từng component cụ thể.
