<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>CheckItOut - Jelszó visszaállítás / Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    @php
        $resetUrl = $resetLink;
        if (strpos($resetLink, 'backend.') !== false) {
            $resetUrl = str_replace('backend.', 'frontend.', $resetLink);
        }
    @endphp

    <h2>🔐 Jelszó visszaállítás</h2>
    <p>Kedves Felhasználó!</p>
    <p>Kérjük, kattintson az alábbi gombra a jelszó visszaállításához:</p>
    
    <div style="margin: 20px 0;">
        <a href="{{ $resetUrl }}" 
           style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Jelszó visszaállítása
        </a>
    </div>
    
    <p>Ha Ön nem kért jelszó-visszaállítást, akkor hagyja figyelmen kívül ezt az emailt.</p>

    <hr>

    <h2>🔐 Password Reset</h2>
    <p>Dear User,</p>
    <p>Please click the button below to reset your password:</p>
    
    <div style="margin: 20px 0;">
        <a href="{{ $resetUrl }}" 
           style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Reset Password
        </a>
    </div>
    
    <p>If you did not request a password reset, please ignore this email.</p>

    <br><br>
    <p>Üdvözlettel / Best regards,<br><strong>CheckItOut csapat / team</strong></p>
</body>
</html>