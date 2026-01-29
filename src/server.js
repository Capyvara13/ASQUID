const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Configuração do Transporter usando RESEND
const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    secure: true,
    auth: {
        user: 'resend', // O usuário é sempre a palavra 'resend'
        pass: 're_Dnv8zAui_Fc3UapBfL2Afs1aEsfcFB7cz' // Sua chave do Resend
    }
});

app.post('/send-email', async (req, res) => {
    const { email, message } = req.body;

    // MailOptions atualizado conforme solicitado
    const mailOptions = {
        // O "from" deve ser este para contas não verificadas
        from: 'SQUID Project <onboarding@resend.dev>', 
        to: 'squidproject@outlook.com.br', 
        subject: `Novo Contato SQUID: ${email}`,
        html: `
            <h3>Nova mensagem recebida</h3>
            <p><strong>Quem enviou:</strong> ${email}</p>
            <p><strong>Mensagem:</strong> ${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`E-mail enviado com sucesso para squiproject@outlook.com.br`);
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error('Erro no Resend:', error);
        res.status(500).json({ message: 'Erro ao enviar e-mail pelo servidor.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor SQUID rodando em http://localhost:${PORT}`);
});