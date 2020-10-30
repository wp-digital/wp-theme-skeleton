<?php

const TEXT_DOMAIN = '';

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
    require_once __DIR__ . '/vendor/autoload.php';
}

if ( file_exists( __DIR__ . '/.env' ) ) {
    $dotenv = Dotenv\Dotenv::createImmutable( __DIR__ );
    $dotenv->load();
}

$loader = new Innocode\WPThemeModule\Loader();
$loader->run();
