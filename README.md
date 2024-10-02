# README: Ứng dụng Đặt Vé Xem Phim

## 1. Mô tả
Ứng dụng React Native đặt vé xem phim với giao diện tự thiết kế, sử dụng dữ liệu cục bộ (local data). Dữ liệu phim được tạo ngẫu nhiên và được sử dụng trong toàn bộ ứng dụng. Ứng dụng có 2 trang chính: **Trang Home** và **Trang Đặt Vé**.

### Trang Home:
- **Tab 1 (Danh sách phim)**: Hiển thị danh sách phim với hơn 1000 phim ngẫu nhiên, bao gồm:
    - Tên phim (`title`), mô tả (`description`), ảnh bìa (`thumbnail`), nút **Đặt Vé**, và nút **Yêu Thích**.
    - Nếu phim đã được đặt, nút Đặt Vé sẽ đổi thành **Đã Xem** và bị vô hiệu hóa.
- **Tab 2 (Danh sách phim yêu thích)**: Hiển thị các phim đã được đánh dấu là **Yêu Thích** từ Tab 1.
- **Tab 3 (Danh sách phim đã đặt)**: Hiển thị các phim đã được đặt vé từ Tab 1.

### Trang Đặt Vé:
- Hiển thị thông tin chi tiết về phim được chọn từ Tab 1:
    - Ảnh bìa (`thumbnail`), tiêu đề (`title`), mô tả (`description`) và nút **Đặt Vé**.
    - Khi nhấn vào nút **Đặt Vé**, chuyển về **Tab 3** để hiển thị danh sách các phim đã đặt.

## 2. Cấu trúc ứng dụng

### Trang Home
- **Tab 1**: Danh sách phim được tạo ngẫu nhiên với hơn 1000 phim, có thể thêm, xóa, hoặc cập nhật trạng thái `favorite` và `isBooked`.
    - Khi nhấn nút **Đặt Vé**: Phim sẽ được đánh dấu là **Đã Xem** và chuyển sang Tab 3.
    - Khi nhấn nút **Yêu Thích**: Phim sẽ được thêm vào danh sách yêu thích và hiển thị ở Tab 2.

### Trang Đặt Vé
- Hiển thị thông tin chi tiết của phim đã chọn.
- Nhấn **Đặt Vé** sẽ thêm phim vào danh sách đã đặt và điều hướng trở về **Tab 3**.

## 3. Dữ liệu phim cục bộ (local data)
- Dữ liệu phim được tạo ngẫu nhiên bằng cách sử dụng script Python với hơn 1200 phim.
- Các trường dữ liệu trong phim:
    - `id`: Mã định danh phim.
    - `title`: Tên phim ngẫu nhiên.
    - `description`: Mô tả ngẫu nhiên.
    - `thumbnail`: URL ảnh đại diện của phim.
    - `favorite`: Trạng thái yêu thích (`true` hoặc `false`).
    - `isBooked`: Trạng thái đặt vé (`true` hoặc `false`).

## 4. Test case tự động với Detox
- **Test case 1**: Kiểm tra việc chuyển giữa các tab.
- **Test case 2**: Thêm phim vào mục yêu thích và kiểm tra xuất hiện trong Tab 2.
- **Test case 3**: Đặt vé cho phim và kiểm tra phim có trong Tab 3.
- **Test case 4**: Kiểm tra trạng thái "Đã Xem" khi đặt vé.
- **Test case 5**: Đảm bảo không thể đặt lại vé cho phim đã đặt.

