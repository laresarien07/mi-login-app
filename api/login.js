module.exports = async (req, res) => {
  console.log('🔍 Llamada a API recibida:', req.method, req.url);
  
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    console.log('✅ Preflight CORS aceptado');
    return res.status(200).end();
  }
  
  // Para debugging: responder a GET con info
  if (req.method === 'GET') {
    console.log('ℹ️ GET recibido - mostrando info');
    return res.json({ 
      message: 'API Login funcionando. Usa POST para login.',
      endpoint: '/api/login',
      method: 'POST',
      body: { username: 'admin', password: '1234' }
    });
  }
  
  // Solo procesar POST para login
  if (req.method !== 'POST') {
    console.log('❌ Método no permitido:', req.method);
    return res.status(405).json({ error: 'Método no permitido. Use POST.' });
  }
  
  try {
    console.log('📨 Body recibido:', req.body);
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.log('❌ Datos faltantes');
      return res.status(400).json({
        success: false, 
        message: 'Usuario y contraseña requeridos'
      });
    }
    
    console.log('🔐 Intento de login:', username);
    
    if (username === 'admin' && password === '1234') {
      console.log('✅ Login exitoso');
      return res.json({
        success: true,
        message: 'Login exitoso',
        redirect: '/panel.html'
      });
    } else {
      console.log('❌ Login fallido');
      return res.status(401).json({
        success: false, 
        message: 'Usuario o contraseña incorrectos'
      });
    }
  } catch (error) {
    console.error('💥 Error interno:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor',
      details: error.message
    });
  }
};