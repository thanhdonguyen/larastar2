<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="stylesheet" href="/css/app.css">
    
</head>
<body>
    <div id="app">
        <header>
            <h1>This is header Index</h1>
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer>
            <h2>This is foooter</h2>
        </footer>
    </div>
</body>
<script src="/js/app.js"></script>
</html>
