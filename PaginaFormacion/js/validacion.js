document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    const btnEnviar = document.getElementById('btnEnviar');
    let currentInputIndex = 0;

    // Función para activar el siguiente campo
    function activarSiguienteCampo() {
        if (currentInputIndex < inputs.length) {
            inputs[currentInputIndex].disabled = false;
            inputs[currentInputIndex].focus();
        }
    }

    // Activar el primer campo al cargar la página
    activarSiguienteCampo();

    // Función para validar el email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Función para validar el teléfono
    function validarTelefono(telefono) {
        const re = /^[0-9]{9}$/;
        return re.test(telefono);
    }

    // Función para validar un campo
    function validarCampo(input) {
        const valor = input.value.trim();
        let esValido = false;

        // Remover clases anteriores
        input.classList.remove('valid', 'invalid', 'active');

        if (valor === '') {
            input.classList.add('invalid');
            return false;
        }

        // Validaciones específicas según el tipo de campo
        switch (input.id) {
            case 'nombre':
                esValido = valor.length >= 2;
                break;
            case 'email':
                esValido = validarEmail(valor);
                break;
            case 'telefono':
                esValido = validarTelefono(valor);
                break;
            case 'mensaje':
                esValido = valor.length >= 10;
                break;
            case 'privacidad':
                esValido = input.checked;
                break;
        }

        if (esValido) {
            input.classList.add('valid');
            return true;
        } else {
            input.classList.add('invalid');
            return false;
        }
    }

    // Evento para cada campo
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.id === 'privacidad') return;
            this.classList.add('active');
        });

        input.addEventListener('blur', function() {
            if (this.id === 'privacidad') return;
            if (validarCampo(this)) {
                currentInputIndex++;
                activarSiguienteCampo();
            }
        });

        input.addEventListener('change', function() {
            if (this.id === 'privacidad') {
                validarCampo(this);
                verificarFormulario();
            }
        });
    });

    // Función para verificar si todo el formulario es válido
    function verificarFormulario() {
        const todosValidos = Array.from(inputs).every(input => validarCampo(input));
        btnEnviar.disabled = !todosValidos;
    }

    // Evento submit del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (Array.from(inputs).every(input => validarCampo(input))) {
            alert('¡Formulario enviado con éxito!');
            form.reset();
            // Desactivar todos los campos y reiniciar
            inputs.forEach(input => input.disabled = true);
            currentInputIndex = 0;
            activarSiguienteCampo();
            btnEnviar.disabled = true;
        }
    });
}); 