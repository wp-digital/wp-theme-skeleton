<?php

namespace modules\theme;

use WPKit\Module\AbstractThemeInitialization;

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
            $width  = isset( $data[0] ) ? $data[0] : 0;
            $height = isset( $data[1] ) ? $data[1] : 0;
            $crop   = isset( $data[2] ) ? $data[2] : false;

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

    public function register_remove_admin_bar_nodes_hook()
    {
        add_action( 'admin_bar_menu', function ( \WP_Admin_Bar $wp_admin_bar ) {
            $wp_admin_bar->remove_node( 'comments' );
        }, 999 );
    }

    public function register_remove_post_types_supports()
    {
        foreach ( [
            'post',
            'page',
        ] as $post_type ) {
            remove_post_type_support( $post_type, 'comments' );
            remove_post_type_support( $post_type, 'custom-fields' );
        }
    }

    public function add_action_wp_enqueue_scripts()
    {
        static::_enqueue_styles();
        static::_enqueue_scripts();
    }

    public function add_action_admin_enqueue_scripts()
    {
        $assets_url = $this->get_theme_assets_url();
        $suffix = Functions::get_assets_suffix();

        wp_enqueue_style( 'theme-admin', "$assets_url/build/css/admin$suffix.css" );
    }

    public function add_action_after_setup_theme()
    {
        add_theme_support( 'post-thumbnails', [ 'post', 'page' ] );
        add_theme_support( 'title-tag' );

        remove_action( 'wp_head', 'wp_generator' );
        remove_action( 'wp_head', 'wlwmanifest_link' );
        remove_action( 'wp_head', 'rsd_link' );
        remove_action( 'wp_head', 'rest_output_link_wp_head' );
        remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
        remove_action( 'wp_head', 'wp_shortlink_wp_head' );

        remove_action( 'template_redirect', 'wp_shortlink_header', 11 );
        remove_action( 'template_redirect', 'rest_output_link_header', 11 );
    }

    public function add_action_admin_bar_init()
    {
        remove_action( 'wp_head', '_admin_bar_bump_cb' );
    }

    public function add_action_login_enqueue_scripts()
    {
        $assets_url = $this->get_theme_assets_url();
        $suffix = Functions::get_assets_suffix();

        wp_enqueue_style( 'theme-login', "$assets_url/build/css/login$suffix.css" );
    }

    public function add_action_admin_menu()
    {
        remove_menu_page( 'edit-comments.php' );
        remove_submenu_page( 'options-general.php', 'options-discussion.php' );
        remove_submenu_page( 'options-general.php', 'options-writing.php' );

        if ( !is_super_admin() ) {
            remove_submenu_page( 'themes.php', 'themes.php' );
        }
    }

    /**
     * @param \WP_Screen $current_screen
     */
    public function add_action_current_screen( $current_screen )
    {
        if ( $current_screen->base == 'edit' ) {
            foreach ( [ 'posts', 'pages' ] as $post_type ) {
                add_filter( "manage_{$post_type}_columns", function ( $columns ) {
                    unset( $columns['comments'], $columns['author'] );

                    return $columns;
                } );
            }
        }
    }

    public function add_action_wp_footer()
    {
        echo "<noscript>
            <div style=\"position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 20px; background-color: #FFF; text-align: center; color: #000; z-index: 999; border-top: 1px solid #000;\">
                " . __( 'JavaScript is disabled on your browser. Please enable JavaScript or upgrade to a JavaScript-capable browser to use this site.', TEXT_DOMAIN ) . "
            </div>
        </noscript>
        <script>document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className.replace(/\b(no-js)\b/,'');</script>";
    }

    /**
     * @return string
     */
    public function add_filter_network_home_url()
    {
        return home_url( '/' );
    }

    /**
     * @return string
     */
    public function add_filter_excerpt_more()
    {
        return '...';
    }

    /**
     * @param array $settings
     *
     * @return array
     */
    public function add_filter_tiny_mce_before_init( $settings )
    {
        $settings['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6';

        return $settings;
    }

    public function add_filter_login_body_class( array $classes )
    {
        if ( false !== ( $key = array_search( 'wp-core-ui', $classes ) ) ) {
            unset( $classes[ $key ] );
        }

        return $classes;
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
        $stylesheet = str_replace( '../fonts/', $this->get_theme_assets_url() . '/build/fonts/', $stylesheet );

        return function_exists( 'get_cloudfront_attachment_url' ) ? get_cloudfront_attachment_url( $stylesheet, true ) : $stylesheet;
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
        $assets_url = $this->get_theme_assets_url();
        $suffix = Functions::get_assets_suffix();

        add_editor_style( "$assets_url/build/css/editor$suffix.css" );
    }

    public function admin_register_remove_meta_boxes()
    {
        add_action( 'admin_init', function () {
            remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
            remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
            remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
            remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
            remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
        }, 100 );

        add_action( 'add_meta_boxes', function () {
            foreach ( get_post_types() as $post_type ) {
                remove_meta_box( 'commentsdiv', $post_type, 'normal' );
                remove_meta_box( 'commentstatusdiv', $post_type, 'normal' );
                remove_meta_box( 'postcustom', $post_type, 'normal' );
                remove_meta_box( 'authordiv', $post_type, 'normal' );
            }

            remove_meta_box( 'trackbacksdiv', 'post', 'normal' );
        }, 100 );
    }

    public function admin_register_widgets_hook()
    {
        add_action( 'widgets_init', function () {
            unregister_widget( 'WP_Widget_Calendar' );
            unregister_widget( 'WP_Widget_Archives' );
            unregister_widget( 'WP_Widget_Links' );
            unregister_widget( 'WP_Widget_Meta' );
            unregister_widget( 'WP_Widget_Search' );
            unregister_widget( 'WP_Widget_Categories' );
            unregister_widget( 'WP_Widget_Pages' );
            unregister_widget( 'WP_Widget_Recent_Posts' );
            unregister_widget( 'WP_Widget_Recent_Comments' );
            unregister_widget( 'WP_Widget_RSS' );
            unregister_widget( 'WP_Widget_Tag_Cloud' );
            unregister_widget( 'WP_Nav_Menu_Widget' );
        }, 20 );
    }

    public function admin_register_remove_from_nav_menus()
    {
        add_action( 'admin_head-nav-menus.php', function () {
            remove_meta_box( 'add-post_tag', 'nav-menus', 'side' );
            remove_meta_box( 'add-post-type-post', 'nav-menus', 'side' );
        } );
    }

    protected function _enqueue_styles()
    {
        if ( !is_admin_bar_showing() && !is_customize_preview() ) {
            wp_deregister_style( 'dashicons' );
        }

        $assets_url = $this->get_theme_assets_url();
        $suffix = Functions::get_assets_suffix();

        wp_enqueue_style(
            'theme',
            "$assets_url/build/css/screen$suffix.css"
        );
        wp_enqueue_style(
            'theme-print',
            "$assets_url/build/css/print$suffix.css",
            [],
            null,
            'print'
        );
    }

    protected function _enqueue_scripts()
    {
        $assets_url = $this->get_theme_assets_url();
        $suffix = Functions::get_assets_suffix();

        // We add 'defer' attribute, so no need to load script in footer.
        // Probably browser can load it faster if it will be placed in header with 'defer'.
        wp_enqueue_script(
            'theme',
            "$assets_url/build/js/common$suffix.js",
            []
        );
    }
}