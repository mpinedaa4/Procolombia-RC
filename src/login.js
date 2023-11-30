const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    
    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');
    
    const usuario = usuarioInput.value;
    const password = passwordInput.value;

    window.electronAPI.validateLogin(usuario, password);
    window.electronAPI.loginResult((event, result) => {
        if(result == true){
            window.electronAPI.openMainWin();
        }
        else{
            alert('Usuario y/o contraseña incorrecto(s)');
        }
      })
    
    /*
    // Verifica que el usuario y la contraseña sean correctos
    if (usuario === '1' && password === '1') {
        // Aquí puedes realizar las acciones necesarias, como cerrar la ventana de login
        window.electronAPI.openMainWin();
    } else {
        // Muestra un mensaje de error o realiza otras acciones en caso de credenciales incorrectas
        alert('Usuario y/o contraseña incorrecto(s)');
    }*/
});
  