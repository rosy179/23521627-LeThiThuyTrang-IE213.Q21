**Mục tiêu bài thực hành**

- Xây dựng giao diện Frontend cho ứng dụng xem và đánh giá phim bằng ReactJS.
- Kết nối giao diện với hệ thống Backend đã xây dựng trước đó thông qua các API.
- Hiển thị danh sách phim, chi tiết phim và danh sách review tương ứng cho từng bộ phim.

**Công cụ / Môi trường sử dụng**

- Thư viện chính: `ReactJS`.
- Thư viện gọi API: `axios`.
- Thư viện điều hướng: `react-router-dom`.
- Thư viện giao diện: `react-bootstrap` và `bootstrap`.
- Thư viện định dạng thời gian: `momentjs`.
- Công cụ hỗ trợ kiểm thử API: `Postman` hoặc `Insomnia`.
- Môi trường chạy: Node.js với trình quản lý gói `npm`.

**Cách chạy**

- **Bước 1:** Di chuyển vào thư mục frontend của Lab05.
- **Bước 2:** Cài đặt các thư viện cần thiết bằng lệnh `npm i`.
- **Bước 3:** Đảm bảo Backend đang chạy và có thể truy cập tại địa chỉ `http://localhost:5000/api/v1/movies`.
- **Bước 4:** Khởi chạy ứng dụng frontend bằng lệnh `npm start`.
- **Bước 5:** Mở trình duyệt tại địa chỉ `http://localhost:3000` để kiểm tra giao diện.

**Kết quả đầu ra**

- Giao diện web hiển thị danh sách phim dưới dạng thẻ (Card) kèm hình ảnh và mô tả ngắn.
- Người dùng có thể tìm kiếm phim theo tiêu đề hoặc theo xếp hạng.
- Khi chọn một phim, ứng dụng hiển thị trang chi tiết gồm nội dung plot và danh sách review tương ứng.
- Thời gian review được định dạng rõ ràng bằng `momentjs`, ví dụ: `18th April 2022`.

**Giải thích ngắn gọn phần chính đã thực hiện**

- **Tạo lớp dịch vụ:** Sử dụng `MovieDataService` với `axios` để định nghĩa các hàm `getAll()`, `get()`, `find()`, `createReview()`, `updateReview()`, `deleteReview()` và `getRatings()`.
- **Xây dựng MoviesList:** Dùng `useState()` và `useEffect()` để tải dữ liệu ban đầu, sau đó dùng `map()` để hiển thị danh sách phim và hỗ trợ tìm kiếm theo Title hoặc Rating.
- **Xây dựng Movie Component:** Khi người dùng mở chi tiết phim, ứng dụng lấy `id` từ URL, gọi API lấy dữ liệu phim theo ID và hiển thị plot kèm danh sách review bên dưới.
- **Hiển thị review:** Mỗi review được hiển thị với tên người dùng, thời gian đánh giá và nội dung review; thời gian được định dạng lại bằng `moment(review.date).format("Do MMMM YYYY")`.
- **Kiểm tra dữ liệu review:** Có thể thêm review mới bằng giao diện hoặc kiểm tra thông qua `Postman`/`Insomnia` để đảm bảo API Backend trả dữ liệu đúng cho trang chi tiết phim.
