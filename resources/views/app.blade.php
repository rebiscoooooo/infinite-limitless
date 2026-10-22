<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'INFINITE: Live Limitless') }}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/webp" href="/assets/image/logo-infinite.webp">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Bebas+Neue&family=Great+Vibes&display=swap" rel="stylesheet">

    <!-- Scripts & Styles -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="bg-ch-dark-slate text-slate-100 font-barlow antialiased selection:bg-ch-teal selection:text-ch-dark-slate overflow-x-hidden min-h-screen">
    @inertia
</body>
</html>
