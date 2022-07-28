<?php

namespace Module\Theme;

use Innocode\WPThemeAssets;
use Innocode\WPThemeModule\Abstracts\AbstractThemeInitialization;

/**
 * Class Initialization
 *
 * @package Module\Theme
 */
class Initialization extends AbstractThemeInitialization {

	/**
	 * @return array
	 */
	public function get_image_sizes(): array {
		return [];
	}

	/**
	 * @return array
	 */
	public function get_nav_menus_locations(): array {
		return [];
	}

	/**
	 * @return void
	 */
	public function enqueue_styles(): void {
		WPThemeAssets\Queue::add_style( 'theme-screen', 'css/screen.css' );
		WPThemeAssets\Queue::add_style(
			'theme-print',
			'css/print.css',
			[],
			'print'
		);
	}

	/**
	 * @return void
	 */
	public function enqueue_scripts(): void {
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

	/**
	 * @return void
	 */
	public function add_action_admin_init(): void {
		add_editor_style( WPThemeAssets\Helpers::url( 'css/editor.css' ) );
	}

	/**
	 * @return void
	 */
	public function add_action_admin_enqueue_scripts(): void {
		WPThemeAssets\Queue::add_style( 'theme-admin', 'css/admin.css' );
	}

	/**
	 * @return void
	 */
	public function add_action_login_enqueue_scripts(): void {
		WPThemeAssets\Queue::add_style( 'theme-login', 'css/login.css' );
	}

	/**
	 * @return void
	 */
	public function add_action_wp_body_open(): void {
		WPThemeAssets\Helpers::template( 'sprite.svg' );
	}

	/**
	 * @return void
	 */
	public function add_action_wp_footer(): void {
		get_template_part( 'partials/no-js' );
	}

	/**
	 * @return array
	 */
	public function add_filter_focal_previews_sizes(): array {
		return array_keys( $this->get_image_sizes() );
	}

	/**
	 * @return array
	 */
	public function add_filter_innocode_critical_css_styles(): array {
		return [
			'theme-screen',
		];
	}

	/**
	 * @param string $stylesheet
	 *
	 * @return string
	 */
	public function add_filter_innocode_critical_css_stylesheet( string $stylesheet ): string {
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

	/**
	 * @return array
	 */
	public function add_filter_deferred_loading_styles(): array {
		return [
			'dashicons',
			'wp-block-library',
		];
	}

	/**
	 * @return void
	 */
	public function add_action_innocode_critical_css_printed(): void {
		add_filter(
			'deferred_loading_styles',
			function () {
				return [
					'theme-screen',
				];
			}
		);
	}

	/**
	 * @return array|string
	 */
	public function add_filter_deferred_loading_scripts() {
		return '*';
	}
}
