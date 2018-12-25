<?php
/**
 * For translating admin panel need to call this function before requiring of any module
 */
const TEXT_DOMAIN = '';
load_theme_textdomain( TEXT_DOMAIN, get_template_directory() . '/languages' );

require_once __DIR__ . '/vendor/autoload.php';

$dotenv = new Dotenv\Dotenv( __DIR__ );
$dotenv->overload();

require_once ABSPATH . 'WPKit/init_autoloader.php';

$loader = new WPKit\Module\Loader();

try {
    $loader->load_modules();
} catch ( \WPKit\Exception\WpException $exception ) {
    echo $exception;
}