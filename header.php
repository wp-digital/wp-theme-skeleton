<!DOCTYPE html>
<html <?php language_attributes() ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ) ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <meta name="theme-color" content="#000000"> <!-- @TODO: set theme color -->
    <?php wp_head() ?>
</head>
<body <?php body_class( 'with-hovers' ) ?>>
    <?php do_action( 'header' ) ?>
	<?php get_template_part( 'partials/sprite' );