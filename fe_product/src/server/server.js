const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors()); // Cho phép React (cổng 3000) gọi sang API này

// Cấu hình kết nối SQL Server
const config = {
  user: "sa", // Tên đăng nhập SQL của bạn
  password: "your_password", // Mật khẩu SQL của bạn
  server: "localhost",
  database: "TenDatabaseCuaBan",
  options: {
    encrypt: true,
    trustServerCertificate: true, // Bỏ qua lỗi SSL khi chạy local
  },
};

// API lấy danh sách tất cả sản phẩm
app.get("/api/products", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT * FROM Products");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// API lấy chi tiết 1 sản phẩm theo ID
app.get("/api/products/:id", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM Products WHERE ProductID = @id");
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server đang chạy tại cổng ${PORT}`));
