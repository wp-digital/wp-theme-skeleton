<?php

namespace Module\Theme;

use Innocode\WPThemeModule\Abstracts\AbstractThemeInitialization;
use Innocode\WPThemeAssets;

/**
 * Class Initialization
 *
 * @package Module\Theme
 */
class Initialization extends AbstractThemeInitialization
{
    public function get_image_sizes() : array
    {
        return [];
    }

    public function get_nav_menus_locations() : array
    {
        return [];
    }

    public function enqueue_styles()
    {
        WPThemeAssets\Queue::add_style( 'theme-screen', 'css/screen.css' );
        WPThemeAssets\Queue::add_style(
            'theme-print',
            'css/print.css',
            [],
            'print'
        );
    }

    public function enqueue_scripts()
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

    public function add_action_admin_init()
    {
        add_editor_style( WPThemeAssets\Helpers::url( 'css/editor.css' ) );
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
        return array_keys( $this->get_image_sizes() );
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
        // @TODO: fix url
        $stylesheet = str_replace(
            '../fonts/',
            WPThemeAssets\Helpers::url( '/build/fonts/' ),
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
}
