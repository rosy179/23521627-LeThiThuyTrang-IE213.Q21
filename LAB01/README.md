## Mục tiêu bài thực hành

- Thiết lập môi trường.
- Thực hành viết lệnh với MongoDB.

## Công cụ và môi trường sử dụng

Công cụ: MongoDB Shell
Môi trường: Windows 11

## Cách chạy

- Sau khi mở MongoDB shell, dùng câu lệnh
  `use 23521627-IE213`
  để sử dụng database. Khi đó sẽ xuất ra kết quả:
  `switched to db 23521627-IE213`
- Để có thể insert documents vào database ta sử dụng câu lệnh "db.employees.insertMany()"
  `db.employees.insertMany([{"id":1,"name":{"first":"John","last":"Doe"},"age":48},
  {"id":2,"name":{"first":"Jane","last":"Doe"},"age":16},
  {"id":3,"name":{"first":"Alice","last":"A"},"age":32},
  {"id":4,"name":{"first":"Bob","last":"B"},"age":64}])`
  sau đó sẽ hiển thị ra kết quả như sau:
  `{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('69a682bccf4dabb71082e102'),
    '1': ObjectId('69a682bccf4dabb71082e103'),
    '2': ObjectId('69a682bccf4dabb71082e104'),
    '3': ObjectId('69a682bccf4dabb71082e105')
  }
}`
- Để xem tất cả documents trong collection "employees", ta sử dụng câu lệnh:
  `db.employees.find()`
- Để trường id trở thành trường duy nhất, không có id nào trùng thì ta thực hiện câu lệnh
  `db.employees.createIndex({id:1},{unique:true})`
- Để tìm kiếm tên đầu và tên cuối của các documents, ta có ví dụ sau:
  `db.employees.find({
  "name.first": "John",
  "name.last": "Doe"
})`
  và kết quả sẽ hiển thị như sau:
  {
  \_id: ObjectId('69a682bccf4dabb71082e102'),
  id: 1,
  name: {
  first: 'John',
  last: 'Doe'
  },
  age: 48
  }
