<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RegisteredMail extends Mailable
{
    use Queueable, SerializesModels;

    public function build()
    {
        return $this->subject('CheckItOut - Sikeres regisztráció! | Successfull registration!')->view('emails.registration');
    }
}
