// --- CONTROLE DE TEMA (DARK/LIGHT) ---
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark' && toggleSwitch) {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    const theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme, false);
}

// --- MENU HAMBÚRGUER ---
try {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('open');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
} catch (err) {
    console.warn('Menu hambúrguer: erro na inicialização', err);
}

// --- ENVIO DO FORMULÁRIO (FETCH API) ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            email: document.getElementById('email').value,
            message: document.getElementById('text').value
        };

        try {
            // Lembre-se: esta rota deve existir no seu servidor Node.js
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Mensagem enviada com sucesso!');
                contactForm.reset(); // Limpa os campos após o envio
            } else {
                alert('Erro ao enviar mensagem no servidor.');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            alert('Não foi possível conectar ao servidor.');
        }
    });
}