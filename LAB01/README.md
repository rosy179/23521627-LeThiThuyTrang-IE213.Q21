## Mục tiêu bài thực hành

- Thiết lập môi trường.
- Thực hành viết lệnh với MongoDB.

## Công cụ và môi trường sử dụng

Công cụ: MongoDB Shell
Môi trường: Windows 11

## Cách chạy

- Sau khi mở MongoDB shell, dùng câu lệnh
  ```bash
  use 23521627-IE213
  ```
  để sử dụng database. Khi đó sẽ xuất ra kết quả:
  ```bash
  switched to db 23521627-IE213
  ```
- Để có thể insert documents vào database ta sử dụng câu lệnh "db.employees.insertMany()"
  ```bash
  db.employees.insertMany([{"id":1,"name":{"first":"John","last":"Doe"},"age":48},
  {"id":2,"name":{"first":"Jane","last":"Doe"},"age":16},
  {"id":3,"name":{"first":"Alice","last":"A"},"age":32},
  {"id":4,"name":{"first":"Bob","last":"B"},"age":64}])
  ```
  sau đó sẽ hiển thị ra kết quả như sau:
  ```bash
  {
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('69a682bccf4dabb71082e102'),
    '1': ObjectId('69a682bccf4dabb71082e103'),
    '2': ObjectId('69a682bccf4dabb71082e104'),
    '3': ObjectId('69a682bccf4dabb71082e105')
    }
  }
  ```
- Để xem tất cả documents trong collection "employees", ta sử dụng câu lệnh:
  `db.employees.find()`
- Để trường id trở thành trường duy nhất, không có id nào trùng thì ta thực hiện câu lệnh
  `db.employees.createIndex({id:1},{unique:true})`
- Để tìm kiếm tên đầu và tên cuối của các documents, ta có ví dụ sau:

  ```bash
  db.employees.find({
  "name.first": "John",
  "name.last": "Doe"
  })
  ```

  và kết quả sẽ hiển thị như sau:

  ```bash
  {
  \_id: ObjectId('69a682bccf4dabb71082e102'),
  id: 1,
  name: {
  first: 'John',
  last: 'Doe'
  },
  age: 48
  }
  ```

- Để tìm kiếm những documents có tên giữa, ta có ví dụ sau:

  ```bash
  db.employees.find({
  "name.middle": { $exists: true }
  })
  ```

  và kết quả sẽ như sau:

  ```bash
  {
  _id: ObjectId('69a68551cf4dabb71082e10d'),
  id: 5,
  name: {
    first: 'Rooney',
    middle: 'K',
    last: 'A'
  },
  age: 30
  }
  {
  _id: ObjectId('69a68551cf4dabb71082e10e'),
  id: 6,
  name: {
    first: 'Ronaldo',
    middle: 'T',
    last: 'B'
  },
  age: 60
  }
  ```

- Để xóa tên giữa của các documents có tên giữa (name.middle), ta có ví dụ sau:

  ```bash
  db.employees.updateMany(
  { "name.middle": { $exists: true } },
  { $unset: { "name.middle": "" } }
  )
  ```

  và kết quả sẽ hiển thị như sau:

  ```bash
  {
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
  }
  ```

  có nghĩa là đã tìm được 2 documents có tên giữa và xóa đi tên giữa của các documents đó. Để có thể check lại, ta dùng câu lệnh db.employees.find()

- Để chèn thêm trường "organization" là UIT cho các documents ta thực hiện như sau:

  ```bash
  db.employees.updateMany(
  {},
  { $set: { organization: "UIT" } }
  )
  ```

  và kết quả sẽ hiển thị như sau:

  ```bash
  {
  acknowledged: true,
  insertedId: null,
  matchedCount: 6,
  modifiedCount: 6,
  upsertedCount: 0
  }
  ```

  tức là tổng cộng có 6 documents và đã thêm trường organization vào các documents đó. Để kiểm tra lại ta sử dụng câu lệnh db.employees.find()

- Để thay đổi trường "organization" cho các id 5, 6 ta thực hiện câu lệnh sau:

  ```bash
  db.employees.updateMany(
  { id: { $in: [5, 6] } },
  { $set: { organization: "USSH" } }
  )
  ```

  và kết quả sẽ hiển thị như sau:

  ```bash
  {
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
  }
  ```

  lúc này đã thay đổi 2 documents có id là 5 và 6 từ organization UIT sang USSH, để kiểm tra lại ta sử dụng lệnh db.employees.find()

- Để tính tổng số tuổi và trung bình tuổi của các documents thuộc mỗi trường organization, ta thực hiện như sau:
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
  kết quả hiển thị đươc như sau:
  ```bash
  {
  _id: 'UIT',
  totalAge: 160,
  averageAge: 40
  }
  {
  _id: 'USSH',
  totalAge: 90,
  averageAge: 45
  }
  ```
