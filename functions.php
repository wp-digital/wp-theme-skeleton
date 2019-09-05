<?php

const TEXT_DOMAIN = '';

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
    require_once __DIR__ . '/vendor/autoload.php';
}

if ( file_exists( __DIR__ . '/.env' ) ) {
    $dotenv = new Dotenv\Dotenv( __DIR__ );
    $dotenv->overload();
}

$loader = new Innocode\WPThemeModule\Loader();
$loader->run();
