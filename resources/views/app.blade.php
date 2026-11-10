<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, shrink-to-fit=no">
    <title inertia>{{ config('app.name', 'Infinite | Live Limitless') }}</title>
    <meta name="description" content="Infinite builds limitless opportunities through leadership, premium skincare and wellness products, and global expansion.">
    <link rel="canonical" href="https://infinite-limitless.com/">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://infinite-limitless.com/#organization",
          "name": "Infinite",
          "url": "https://infinite-limitless.com/",
          "description": "Infinite builds limitless opportunities through leadership, premium skincare and wellness products, and global expansion."
        },
        {
          "@type": "WebSite",
          "@id": "https://infinite-limitless.com/#website",
          "name": "Infinite | Live Limitless",
          "url": "https://infinite-limitless.com/",
          "publisher": {"@id": "https://infinite-limitless.com/#organization"}
        },
        {
          "@type": "WebPage",
          "@id": "https://infinite-limitless.com/#webpage",
          "url": "https://infinite-limitless.com/",
          "name": "Infinite | Live Limitless",
          "isPartOf": {"@id": "https://infinite-limitless.com/#website"}
        }
      ]
    }
    </script>
    <noscript><h1>Infinite | Live Limitless</h1><p>Building limitless opportunities through leadership, premium products, and global expansion.</p></noscript>

    <!-- Favicon -->
    <link rel="icon" type="image/webp" href="/assets/image/logo-infinite.webp">

    <!-- Performance Optimization: DNS Prefetch & Preconnect for CDNs & Fonts -->
    <link rel="dns-prefetch" href="//cdn.jsdelivr.net">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- CSS Frameworks & Icons matching exact original system -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

    <!-- Fonts -->
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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
</body>
</html>
