<?php
/**
 * Plugin Name: SF Custom Blocks
 * Author: Sebastian Fehr
 * Version: 1.0.0
 */
  
function sf_load_block() {
	
	wp_enqueue_script( 'sf-indent-block', plugin_dir_url(__FILE__) . 'sf-indent-block.js', array( 'wp-blocks', 'wp-editor'), true );
	
}
   
add_action('enqueue_block_editor_assets', 'sf_load_block');