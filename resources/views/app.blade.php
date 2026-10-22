<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, shrink-to-fit=no">
    <title inertia>{{ config('app.name', 'Infinite | Live Limitless') }}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/webp" href="/assets/image/logo-infinite.webp">

    <!-- CSS Frameworks & Icons matching exact original system -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Great+Vibes&family=Cinzel:wght@600;700;800&display=swap" rel="stylesheet">

    <!-- Original System Stylesheet -->
    <link rel="stylesheet" href="/assets/css/styles.css">

    <!-- Scripts & Styles -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="font-barlow antialiased selection:bg-ch-teal selection:text-ch-dark-slate overflow-x-hidden min-h-screen">
    @inertia

    @if(isset($page))
    <script data-page="app" type="application/json">{!! json_encode($page) !!}</script>
    @endif

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
