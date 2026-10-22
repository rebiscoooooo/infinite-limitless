<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorldPlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'min:3', 'max:50', 'unique:world_plan_registrations,username'],
            'email' => ['required', 'email', 'max:255', 'unique:world_plan_registrations,email'],
            'firstName' => ['required', 'string', 'max:100'],
            'middleName' => ['nullable', 'string', 'max:100'],
            'lastName' => ['required', 'string', 'max:100'],
            'birthdate' => ['required', 'date'],
            'contact' => ['required', 'string', 'max:50'],
            'address' => ['required', 'string', 'max:1000'],
            'packageType' => ['required', 'string', 'max:100'],
            'paymentDate' => ['required', 'date'],
            'paymentProof' => ['required', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:10240'], // up to 10MB
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'username.unique' => 'This username is already taken. Please choose another.',
            'email.unique' => 'This email address has already been registered.',
            'paymentProof.required' => 'Payment proof file (JPG, PNG, PDF) is required.',
            'paymentProof.mimes' => 'Invalid file type. Only JPG, PNG, and PDF files are allowed.',
            'paymentProof.max' => 'The payment proof file size cannot exceed 10MB.',
        ];
    }
}
