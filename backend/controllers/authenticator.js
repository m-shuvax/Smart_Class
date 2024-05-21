const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = { id: user.id, username: user.username };
    const secret = 'your_jwt_secret_key';
    const options = { expiresIn: '1h' }; // תוקף של שעה

    return jwt.sign(payload, secret, options);
}





const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/login', (req, res) => {
    const user = { id: 1, username: 'exampleUser' }; // משתמש לדוגמה
    const token = generateToken(user);
    
    // הגדרת הקוקי עם הטוקן
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.json({ message: 'Login successful' });
});






function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(401); // ללא הרשאה
    }

    jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
        if (err) {
            return res.sendStatus(403); // אסור
        }
        req.user = user;
        next();
    });
}

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});
