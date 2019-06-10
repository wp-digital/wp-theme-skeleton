<?php

namespace modules\theme;

use WPKit\Module\AbstractThemeInitialization;
use Innocode\WPThemeAssets;

/**
 * Class Initialization
 *
 * @package modules\theme
 */
class Initialization extends AbstractThemeInitialization
{
    /**
     * @var array
     */
    protected static $_image_sizes = [

    ];

	public function register_image_sizes()
	{
        foreach ( static::$_image_sizes as $key => $data ) {
            $width = isset( $data[0] ) ? $data[0] : 0;
            $height = isset( $data[1] ) ? $data[1] : 0;
            $crop = isset( $data[2] ) ? $data[2] : false;

            add_image_size( $key, $width, $height, $crop );
            add_image_size( "{$key}2x", $width * 2, $height * 2, $crop );
        }
	}

    public function register_dynamic_sidebars()
    {

    }

    public function register_nav_menus()
    {

    }

    public function add_action_wp_enqueue_scripts()
    {
        static::_enqueue_styles();
        static::_enqueue_scripts();
    }

    public function add_action_admin_enqueue_scripts()
    {
        WPThemeAssets\Queue::add_style( 'theme-admin', 'css/admin.css' );
    }

    public function add_action_login_enqueue_scripts()
    {
        WPThemeAssets\Queue::add_style( 'theme-login', 'css/login.css' );
    }

    public function add_action_wp_body_open()
    {
        WPThemeAssets\Helpers::template( 'sprite.svg' );
    }

    public function add_action_wp_footer()
    {
        get_template_part( 'partials/no-js' );
    }

    /**
     * @return array
     */
    public function add_filter_focal_previews_sizes()
    {
        return array_keys( static::$_image_sizes );
    }

    /**
     * @return array
     */
    public function add_filter_aws_lambda_critical_css_styles()
    {
        return [
            'theme',
        ];
    }

    /**
     * @param string $stylesheet
     *
     * @return string
     */
    public function add_filter_aws_lambda_critical_css_stylesheet( $stylesheet )
    {
        $stylesheet = str_replace(
            '../fonts/',
            $this->get_theme_assets_url() . '/build/fonts/',
            $stylesheet
        );

        return function_exists( 'get_cloudfront_attachment_url' )
            ? get_cloudfront_attachment_url( $stylesheet, true )
            : $stylesheet;
    }

    public function add_action_aws_lambda_critical_css_printed()
    {
        add_filter( 'deferred_loading_styles', function () {
            return [
                'theme',
            ];
        } );
    }

    /**
     * @return array|string
     */
    public function add_filter_deferred_loading_scripts()
    {
        return '*';
    }

    public function admin_register_editor_stylesheet()
    {
        add_editor_style( WPThemeAssets\Helpers::url( 'css/editor.css' ) );
    }

    protected function _enqueue_styles()
    {
        WPThemeAssets\Queue::add_style( 'theme-screen', 'css/screen.css' );
        WPThemeAssets\Queue::add_style(
            'theme-print',
            'css/print.css',
            [],
            'print'
        );
    }

    protected function _enqueue_scripts()
    {
        foreach ( [
            'vendor',
            'common',
            'main',
        ] as $handle ) {
            // We add 'defer' attribute, so no need to load script in footer.
            // Probably browser can load it faster if it will be placed in header with 'defer'.
            WPThemeAssets\Queue::add_script(
                "theme-$handle",
                "js/$handle.js"
            );
        }
    }
}
