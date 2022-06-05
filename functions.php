<?php

const TEXT_DOMAIN = '';

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
    require_once __DIR__ . '/vendor/autoload.php';
}

$loader = new Innocode\WPThemeModule\Loader();
$loader->run();
