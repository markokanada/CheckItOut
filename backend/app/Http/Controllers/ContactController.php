<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendContactEmail(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'description' => 'required|string',
    ]);

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
