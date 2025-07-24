<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $assunto = $_POST['subject'];
    $message = $_POST['message'];

    $body = "<h2>Mensagem recebida</h2>
             <p><b>Nome:</b> {$name}</p>
             <p><b>Email:</b> {$email}</p>
             <p><b>Assunto:</b> {$assunto}</p>
             <p><b>Mensagem:</b><br>{$message}</p>";

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->CharSet = 'UTF-8';
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'comercial@stgbr.com.br';
        $mail->Password = 'Com22234!';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('comercial@stgbr.com.br', $name);
        $mail->addAddress('comercial@stgbr.com.br', 'STG');

        $mail->isHTML(true);
        $mail->Subject = "Mensagem recebida do site: {$assunto}";
        $mail->Body    = $body;
        $mail->AltBody = strip_tags($body);

        $mail->send();
        echo 'Mensagem enviada com sucesso.';
    } catch (Exception $e) {
        echo "A mensagem não pôde ser enviada. Erro do Mailer: {$mail->ErrorInfo}";
    }
}
?>
