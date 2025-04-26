// Validación y experiencia de usuario para el formulario de suscripción
const form = document.getElementById('form-suscripcion');
const tarjeta = document.getElementById('tarjeta');
const expiracion = document.getElementById('expiracion');
const cvc = document.getElementById('cvc');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const btnPagar = form.querySelector('button[type="submit"]');
const successMsg = document.getElementById('success-msg');

function crearMensajeError(id) {
    let span = document.getElementById(id);
    if (!span) {
        span = document.createElement('span');
        span.className = 'error-msg';
        span.id = id;
        span.style.color = '#e11d48';
        span.style.fontSize = '0.97em';
        span.style.marginTop = '2px';
        if (id === 'error-tarjeta') tarjeta.parentNode.appendChild(span);
        if (id === 'error-expiracion') expiracion.parentNode.appendChild(span);
        if (id === 'error-cvc') cvc.parentNode.appendChild(span);
        if (id === 'error-nombre') nombre.parentNode.appendChild(span);
        if (id === 'error-email') email.parentNode.appendChild(span);
    }
    return span;
}

crearMensajeError('error-tarjeta');
crearMensajeError('error-expiracion');
crearMensajeError('error-cvc');
crearMensajeError('error-nombre');
crearMensajeError('error-email');

function validarCampos() {
    let valido = true;
    // Validar nombre
    if (nombre.value.trim().length < 3) {
        document.getElementById('error-nombre').textContent = 'Introduce un nombre válido.';
        valido = false;
    } else {
        document.getElementById('error-nombre').textContent = '';
    }
    // Validar email
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        document.getElementById('error-email').textContent = 'Introduce un email válido.';
        valido = false;
    } else {
        document.getElementById('error-email').textContent = '';
    }
    // Validar tarjeta (16 dígitos)
    if (!/^\d{16}$/.test(tarjeta.value.replace(/\s/g, ''))) {
        document.getElementById('error-tarjeta').textContent = 'Introduce 16 dígitos.';
        valido = false;
    } else {
        document.getElementById('error-tarjeta').textContent = '';
    }
    // Validar expiración (MM/AA)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiracion.value)) {
        document.getElementById('error-expiracion').textContent = 'Formato MM/AA.';
        valido = false;
    } else {
        document.getElementById('error-expiracion').textContent = '';
    }
    // Validar CVC (3 o 4 dígitos)
    if (!/^\d{3,4}$/.test(cvc.value)) {
        document.getElementById('error-cvc').textContent = 'Introduce 3 o 4 dígitos.';
        valido = false;
    } else {
        document.getElementById('error-cvc').textContent = '';
    }
    // Habilitar/deshabilitar botón
    btnPagar.disabled = !valido;
    return valido;
}

form.addEventListener('input', validarCampos);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validarCampos()) {
        btnPagar.disabled = true;
        successMsg.style.color = '#059669';
        successMsg.textContent = '¡Pago realizado con éxito!';
        setTimeout(() => {
            successMsg.textContent = '';
            btnPagar.disabled = false;
            form.reset();
        }, 3000);
    }
});

// Modo claro/oscuro
const toggleDark = document.getElementById('toggle-dark');
toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleDark.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Barra de progreso visual
const progressBar = document.getElementById('progress-bar');
function actualizarProgreso() {
    let total = 5;
    let completados = 0;
    if (nombre.value.trim().length >= 3) completados++;
    if (/^\S+@\S+\.\S+$/.test(email.value)) completados++;
    if (/^\d{16}$/.test(tarjeta.value.replace(/\s/g, ''))) completados++;
    if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiracion.value)) completados++;
    if (/^\d{3,4}$/.test(cvc.value)) completados++;
    let porcentaje = Math.round((completados / total) * 100);
    progressBar.style.width = porcentaje + '%';
}
form.addEventListener('input', actualizarProgreso);
document.addEventListener('DOMContentLoaded', actualizarProgreso);