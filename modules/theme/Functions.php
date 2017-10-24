<?php

namespace modules\theme;

use WPKit\Module\AbstractThemeFunctions;

/**
* Class Functions
*
* @package modules\theme
*/
class Functions extends AbstractThemeFunctions
{
    /**
     * @return bool
     */
    public static function is_development()
    {
        return in_array( static::get_environment(), [ 'development', 'stage' ] );
    }

    /**
     * @return bool
     */
    public static function is_production()
    {
        return static::get_environment() == 'production';
    }

    /**
     * @return string
     */
    public static function get_environment()
    {
        return defined( 'ENVIRONMENT' ) ? ENVIRONMENT : 'production';
    }

    /**
     * @return string
     */
    public static function get_assets_suffix()
    {
        return static::is_production() ? '.min' : '';
    }
}