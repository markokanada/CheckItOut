<?php

namespace App\Http\Controllers;

use App\Http\Requests\sendContactEmailRequest;
use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendContactEmail(sendContactEmailRequest $request)
{
    $validated = $request->validated();

    try {
        Mail::to('hello@example.com') 
           ->send(new ContactFormMail(
               $validated['name'],
               $validated['email'],
               $validated['description']
           ));

        return response()->json([
            'message' => 'Contact email sent successfully'
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to send email',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
