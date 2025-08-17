const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 🧠 Kết nối MongoDB Atlas
mongoose.connect('mongodb+srv://rsvpuser:thiepmoitotnghiep@rsvp.4ie4yim.mongodb.net/?retryWrites=true&w=majority&appName=RSVP', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Kết nối MongoDB Atlas thành công!'))
.catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// 🎓 Schema
const Rsvp = mongoose.model('Rsvp', {
  name: String,
  message: String,
  attending: String
});

// 🎯 API nhận RSVP
app.post('/rsvp', async (req, res) => {
  const { name, message, attending } = req.body;
  const rsvp = new Rsvp({ name, message, attending });
  await rsvp.save();
  res.status(201).send('Đã lưu lời chúc!');
});

// 🔐 API admin (có thể thêm xác thực sau)
app.get('/admin', async (req, res) => {
  const data = await Rsvp.find().sort({ _id: -1 });
  res.json(data);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});
app.get('/admin-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.listen(4000, () => {
  console.log('🚀 Server đang chạy tại http://localhost:4000');
});
