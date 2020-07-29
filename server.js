const PORT = process.env.PORT || 5000;
const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({extended:false}));

app.get('/',(req, res) => {
    res.json({ msg: 'Hello' });
})
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/activate', require('./routes/emailVer'));

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));