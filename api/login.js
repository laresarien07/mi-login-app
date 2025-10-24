const express = require('express');
const app = express();

app.use(express.json());

 app.post('/', (req, res) => {
    const { username, password } = req.body;
    
    console.log('🔐 Intento de login:', username);
    
    if (username === "admin" && password === "1234") {
        res.json({ 
            success: true, 
            message: 'Has iniciado sesión correctamente',
            redirect: '/panel.html'
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: 'Usuario o contraseña incorrectos' 
        });
    }
});

module.exports = app;