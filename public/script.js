async function login(event) {
    event.preventDefault(); // Prevenir envío tradicional del formulario
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        
        if (result.success) {
            window.location.href = result.redirect;
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión');
    }
}

// Agrega el event listener al formulario
document.getElementById('loginForm').addEventListener('submit', login);