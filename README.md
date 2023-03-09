# BÀI TEST ĐẦU VÀO LÊ ĐĂNG CƯƠNG - FRONTEND DEVELOPER

## Đề bài

Create a simple game where you are walking along a trail. You begin your adventure at the bottom of the trail and you hike your way up to the top. If you turn around you are facing the other direction.

## Thời gian làm bài

- Tìm hiểu đề bài: 5 giờ
- Code: 7 giờ

## Chạy dự án

- first time:

```bash
  npm install
```

```bash
  npm start
```

- run dev:

```bash
  npm start
```

- run build:

```bash
  npm run build
```

## Mô tả luồng đi của các khung hình

D6 [D5] [D7] [C ]\
D5 [D4] [D6]\
D4 [D3] [D5]\
D3 [D2] [D4]\
D2 [D3] [D1]\
D1 [D2]\
D7 [D6]\
C&nbsp;&nbsp;&nbsp;[D7] [B&nbsp;&nbsp;] [A&nbsp;]\
B&nbsp;&nbsp; [A&nbsp;&nbsp;] [C&nbsp;&nbsp;]\
A&nbsp;&nbsp; [C&nbsp;&nbsp;] [B&nbsp;&nbsp;]

## Giải thích các trường thông tin

1. id : dùng để định danh cho scene.
2. background_url: src sẽ hiển thị lên scene.
3. defaultPosition: điểm khởi tạo của khung nhìn.
4. hitzones: Đại diện cho các scene có điểm chạm để đi tới đó
   4.1: minX: giới hạn nhỏ nhất của hoành độ thỏa mãn điều kiện đi đến scene này.\
   4.2: maxX: giới hạn lớn nhất của hoành độ thỏa mãn điều kiện đi đến scene này.\
   4.3: minY: giới hạn nhỏ nhất của tung độ thỏa mãn điều kiện đi đến scene này.\
   4.4: maxY: giới hạn lớn nhất của tung độ thỏa mãn điều kiện đi đến scene này.\
   4.5: goto: ID scene sẽ chuyển đến nếu điểm chạm thỏa mãn điều kiện giới hạn tọa độ.\
   4.6: defaultPosition: điểm offset mà khung nhìn cần dịch đến để thuận tiện cho hướng nhìn của người dùng. ví dụ: từ D6 xuống D5 thì khi load xong màn D5 sẽ tự dịch khung nhìn vào khoảng tọa độ mà nhấn vào giữa màn hình sẽ đi đến D4 để gợi ý luồng đi xuống dưới.

## Các thao tác

1. Nhấn vào nút sang trái, phải để dịch chuyển khung nhìn về phía tương ứng (nút nhấn được mở rộng vùng bấm giúp người dùng dễ thao tác).
2. Drag để dịch chuyển khung nhìn về phía tương ứng.
3. Click vào con đường để thay đổi sang khung nhìn khác tương ứng với địa điểm đã click.

## Cải thiện dự án

1. Cải thiện các thao tác dịch chuyển khung nhìn không bị giật
2. Đo tốc độ vuốt nếu tốc độ trượt nhanh thì sẽ tăng giá trị TRANSLATE_SMOOTH.
3. Khi người dùng click nhiều lần vào một nút (sang trái hoặc sang phải) trong 1 khoảng thời gian ngắn 2 giây thì sẽ tăng giá trị TRANSLATE_UNIT lên cho lần click đó
4. Thêm icon chỉ dẫn click vào vị trí nào để hướng dẫn người dùng có thể click vào vị trí đó để đi sang màn khác
5. Thay đổi logic tìm vị trí chuyển màn:
   \
   Logic hiện tại: tìm vị trí click có nằm trong khoảng tọa độ từ minX đến maxX và minY đến maxY của hitzone không, nếu có thì chuyển đến scene có ID tương ứng.

Logic muốn cập nhật: hitzone sẽ được xác định bới không gian một tập các đồ thị dạng ax+by=c. Tập các đồ thị này tạo ra một đa giác kép kín. Kiểm tra nếu tọa độ click nằm trong đa giác kín này sẽ thực hiện thao tác chuyển đến scene có ID tương ứng.

6. Load trước image. Với bài toán thực tế ảnh sẽ rất lớn. Vì vậy khi update một currentScene mới sẽ ngay lập tức load ra các ảnh của tất cả các scene có thể đi đến đồng thời set opacity=0 để không hiển thị. Khi người dùng nhấn vào một điểm bất kỳ sẽ cập nhật opacity của scene tương ứng lên 1 opacity=0 và ẩn scene cũ đi. lặp lại từ đẩu để load trước ảnh scene mới có thể đi đến.
   ví dụ: scene D6 hiển thị sẽ tạo ra 3 khung ảnh ẩn của scene D5, scene D7, scene C. Nếu người dùng đi đến D5 thì sẽ chuyển opacity scene D5 = 1, các scene còn lại là 0, load scene D4, scene D6 lên trước và có thuộc tính opacity = 0...
