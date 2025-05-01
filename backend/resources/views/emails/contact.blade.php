<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>CheckItOut - Új kapcsolatfelvétel / New Contact Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>📬 Új kapcsolatfelvétel</h2>
    <p>Kedves Adminisztrátor!</p>
    <p>Egy új üzenet érkezett a rendszerbe:</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Feladó:</strong> {{ $name }} &lt;{{ $email }}&gt;</p>
        <p><strong>Üzenet:</strong></p>
        <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">
            {{ $description }}
        </p>
    </div>

    <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;">

    <h2>📬 New Contact Request</h2>
    <p>Dear Administrator,</p>
    <p>A new message has been received:</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>From:</strong> {{ $name }} &lt;{{ $email }}&gt;</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">
            {{ $description }}
        </p>
    </div>

    <br><br>
    <p>Üdvözlettel / Best regards,<br><strong>CheckItOut csapat / team</strong></p>
</body>
</html>