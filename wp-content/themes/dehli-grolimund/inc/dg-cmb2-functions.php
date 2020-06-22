<?php
/**
 * Include and setup custom metaboxes and fields. (make sure you copy this file to outside the CMB2 directory)
 *
 * Be sure to replace all instances of 'yourprefix_' with your project's prefix.
 * http://nacin.com/2010/05/11/in-wordpress-prefix-everything/
 *
 * @category dehli-grolimund
 * @package  Demo_CMB2
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/CMB2/CMB2
 */



/* 
*
* KEYWORD METABOX
* MEDIA METABOX
* 
*/


add_action( 'cmb2_admin_init', 'dg_register_keyword_box' );

function dg_register_keyword_box() {
	
	$prefix = 'dg_keyword_';

	// META BOX
	$cmb_keywords = new_cmb2_box( array(
		'id'           => $prefix . 'keyword_box',
		'title'        => esc_html__( 'Keywords', 'dehli-grolimund' ),
		'object_types' => array( 'post' ),
	) );
	
	// TEXT AREA FIELD
	$cmb_keywords->add_field( array(
		'name'       => __( 'Project Keywords', 'dehli-grolimund' ),
		'id'         => $prefix . 'keywords_text',
		'type'       => 'text_medium',
	) );
	
	// TEXT AREA FIELD
	$cmb_keywords->add_field( array(
		'name'       => __( 'Project Date', 'dehli-grolimund' ),
		'id'         => $prefix . 'date',
		'type'       => 'text_medium',
	) );	
	
}


add_action( 'cmb2_admin_init', 'dg_register_media_box' );

function dg_register_media_box() {
	
	$prefix = 'dg_media_';

	// META BOX
	$cmb_media_group = new_cmb2_box( array(
		'id'           => $prefix . 'mediabox',
		'title'        => esc_html__( 'Media (Image or Movie)', 'dehli-grolimund' ),
		'object_types' => array( 'post' ),
	) );	
	
	// GROUP FIELD
	$group_field_id = $cmb_media_group->add_field( array(
		'id'          => $prefix . 'repeat_group',
		'type'        => 'group',
		'title'        => esc_html__( 'Media (Image or Movie)', 'dehli-grolimund' ),		
		'description' => __( 'Generates reusable form entries', 'dehli-grolimund' ),
		// 'repeatable'  => false, // use false if you want non-repeatable group
		'options'     => array(
			'group_title'       => __( 'Media Entry {#}', 'dehli-grolimund' ), // since version 1.1.4, {#} gets replaced by row number
			'add_button'        => __( 'Add Another Entry', 'dehli-grolimund' ),
			'remove_button'     => __( 'Remove Entry', 'dehli-grolimund' ),
			'sortable'          => true,
			// 'closed'         => true, // true to have the groups closed by default
			// 'remove_confirm' => esc_html__( 'Are you sure you want to remove?', 'cmb2' ), // Performs confirmation before removing group.
		),
	) );

	// SELECT FIELD 
	$cmb_media_group->add_group_field( $group_field_id, array(
		'name'    => __( 'Media Type', 'dehli-grolimund' ),
		'id'      => $prefix . 'select_media',
		'type'    => 'select',
		'options' => array(
			'img' => __( 'Image', 'dehli-grolimund' ),
			'book'=> __( 'Book', 'dehli-grolimund' ),
			'mov' => __( 'Movie', 'dehli-grolimund' ),
		),
		'default' => 'img',
	) );
	
	// SELECT FIELD
	$cmb_media_group->add_group_field( $group_field_id, array(
		'name'    => __( 'Size', 'dehli-grolimund' ),
		'id'      => $prefix . 'select_size',
		'type'    => 'select',
		'options' => array(
			's' => __( 'Small', 'dehli-grolimund' ),
			'm' => __( 'Medium', 'dehli-grolimund' ),
			'l' => __( 'Large', 'dehli-grolimund' ),
			'full' => __( 'Full', 'dehli-grolimund' ),
		),
		'default' => 'm',
	) );
	
	// MULTICHECK FIELD
	$cmb_media_group->add_group_field( $group_field_id, array(
		'name'    => __( 'UI options', 'dehli-grolimund' ),
		'id'      => 'check_ui_options',
		'type'    => 'multicheck',
		'select_all_button' => false,
		'options' => array(
			'white' => __( 'White Text', 'dehli-grolimund' ),
		),
	) );
	
	// FILE LIST FIELD
	$cmb_media_group->add_group_field( $group_field_id, array(
		'name' => esc_html__( 'Image', 'dehli-grolimund' ),
		'id'   => 'image',
		'type' => 'file_list',
		'preview_size' => array( 100, 100 ), // Default: array( 50, 50 )
		// 'query_args' => array( 'type' => 'image' ), // Only images attachment
		'attributes' => array(
		//	'required'               => true, // Will be required only if visible.
		),		
	) );	
	
	// OEMBED FIELD
	$cmb_media_group->add_group_field( $group_field_id, array(
		'name' => esc_html__( 'Movie', 'dehli-grolimund' ),
		'desc' => 'Enter a youtube, twitter, or instagram URL. Supports services listed at <a href="http://codex.wordpress.org/Embeds">http://codex.wordpress.org/Embeds</a>.',
		'id'   => 'movie',
		'type' => 'oembed',
	) );
	
/*
	// MOVIE FIELD (for shortcode)
	$cmb_media_group->add_group_field( $group_field_id, array(
		'name' => esc_html__( 'Movie', 'dehli-grolimund' ),
		'desc' => 'Enter a short code',
		'id'   => 'movie',
		'type' => 'textarea',
	) );	
*/
}