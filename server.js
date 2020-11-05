const PORT = process.env.PORT || 5000;
const express = require('express');
const connectDB = require('./db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'Hello' });
});
app.use('/signup', require('./routes/users'));
app.use('/login', require('./routes/auth'));
app.use('/activate', require('./routes/emailVer'));
app.use('/kyc', require('./routes/kyc'));
app.use('/forgotpass', require('./routes/forgotPass'));
app.use('/resetpass', require('./routes/resetPass'));
app.use('/companyInfo', require('./routes/companyInfo'));
app.use('/tradeid', require('./routes/tradeId'));
app.use('/trade', require('./routes/trade'));
app.use('/reminder', require('./routes/reminder'));
app.use('/profile', require('./routes/profile'));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
