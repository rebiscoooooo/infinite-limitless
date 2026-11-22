<?php

use Spatie\FlareClient\FlareMiddleware\AddGitInformation;
use Spatie\FlareClient\FlareMiddleware\CensorRequestBodyFields;
use Spatie\FlareClient\FlareMiddleware\CensorRequestHeaders;
use Spatie\FlareClient\FlareMiddleware\RemoveRequestIp;

return [
    'key' => env('FLARE_KEY'),

    'flare_middleware' => [
        RemoveRequestIp::class,
        AddGitInformation::class,
        CensorRequestBodyFields::class => [
            'censor_fields' => ['password', 'password_confirmation'],
        ],
        CensorRequestHeaders::class => [
            'headers' => ['API-KEY', 'Authorization', 'Cookie', 'Set-Cookie', 'X-CSRF-TOKEN', 'X-XSRF-TOKEN'],
        ],
    ],

    'send_logs_as_events' => true,
];
