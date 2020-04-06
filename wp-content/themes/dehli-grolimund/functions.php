<?php
/**
 * dehli-grolimund functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package dehli-grolimund
 *
 *
 *
 * //// SF Functions:
 *
 * Load CMB2 Functions
 * Display Post Types in homepage
 * Chose a custom template in homepage
 * Add Header Tags
 * Custom Color Palette
 * Custom Image Sizes
 * Get Custom Field Values: Media Group
 * Get Custom Field Values: Keywords
 *
 * 
 */

if ( ! function_exists( 'dehli_grolimund_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function dehli_grolimund_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on dehli-grolimund, use a find and replace
		 * to change 'dehli-grolimund' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'dehli-grolimund', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'dehli-grolimund' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'dehli_grolimund_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'dehli_grolimund_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function dehli_grolimund_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'dehli_grolimund_content_width', 640 );
}
add_action( 'after_setup_theme', 'dehli_grolimund_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */

function dehli_grolimund_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'dehli-grolimund' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'dehli-grolimund' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'dehli_grolimund_widgets_init' );


/**
 * Enqueue scripts and styles.
 */
function dehli_grolimund_scripts() {
	
	wp_enqueue_style( 'dg-fullpage-style', get_template_directory_uri() . '/css/fullpage.css' );
	
	wp_enqueue_style( 'dehli-grolimund-style', get_stylesheet_uri() );

	wp_enqueue_script( 'dehli-grolimund-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'dehli-grolimund-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	
	wp_enqueue_script( 'fullpage-js', 'https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.8/fullpage.min.js', array(), '', true );
	
	wp_enqueue_script( 'dg-scripts-js', get_template_directory_uri() . '/js/dg-scripts.js', array( 'jquery' ), '', true );
	
}
add_action( 'wp_enqueue_scripts', 'dehli_grolimund_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}



/** SF:
 * Load CMB2 Functions
 */	
require_once( dirname(__FILE__) . '/inc/dg-cmb2-functions.php');


/** SF:
 * Display Post Types in homepage
 */
function dg_display_home_posts( $query ) {
	
  if ( !is_admin() && $query->is_main_query() ) {
	  
    if ( $query->is_home() ) {
		
		// POST TYPE
		// LANGUAGE
		// PAGINATION
		$query->set( 'posts_per_page', -1 );
		
		// ORDER: orders the post by post_type ASC and by date DESC
		$post_order = array(
			'post_type' => 'ASC',
			'date' => 'DESC',
		);
		$query->set( 'orderby', $post_order );		
    }
  }
}

add_action( 'pre_get_posts', 'dg_display_home_posts' );


/** SF:
 * Chose a custom template in homepage
 */
function dg_choose_template( $template ) {

	if ( !is_admin() && is_home() ) {
		
		$new_template = locate_template( array( 'single.php' ) );
		
		if ( !empty( $new_template ) ) {
			return $new_template;
		}
	}

	return $template;
}
add_filter( 'template_include', 'dg_choose_template', 99 );


/** SF:
 * Add Header Tags
 */
function dg_custom_header() {
	
	// for EN typeface
	echo '<link rel="stylesheet" href="https://use.typekit.net/wlv6frg.css">';
	
}

add_action( 'wp_head', 'dg_custom_header' );


/** SF:
 * Custom Color Palette
 */
function dg_gutenberg_custom_colors() {
	
	// disable custom colors
	add_theme_support( 'disable-custom-colors' );
	
	// add custom color palette
	add_theme_support( 'editor-color-palette', array(
		array(
			'name'  => __( 'Rosengarten', 'dehli-grolimund' ),
			'slug'  => 'gray',
			'color'	=> '#cbc9c9',
		),
		array(
			'name'  => __( 'Rosengarten Light', 'dehli-grolimund' ),
			'slug'  => 'light-gray',
			'color'	=> '#dddcdc',
		),	
		array(
			'name'  => __( 'Coral', 'dehli-grolimund' ),
			'slug'  => 'coral',
			'color'	=> '#fabeab',
		),	
		array(
			'name'  => __( 'Meiji Jingu', 'dehli-grolimund' ),
			'slug'  => 'green',
			'color'	=> '#b5dcb7',
		),
		array(
			'name'  => __( 'Corn Tea', 'dehli-grolimund' ),
			'slug'  => 'beige',
			'color'	=> '#f2d9b0',
		),


	) );	
}
add_action( 'after_setup_theme', 'dg_gutenberg_custom_colors' );


/** SF:
 * Custom Image Sizes
 */
function dg_add_custom_img_sizes() {
	
	add_image_size( 'dg-large', 1250, 1250 );
	add_image_size( 'dg-extra-large', 1700, 1700 );
	
}
add_action( 'after_setup_theme', 'dg_add_custom_img_sizes' );


/** SF:
 * Get Custom Field Values: Media Group
 */
function dg_get_media_group_entries( $wrapper_class, $class, $theme_img_size = '' ) {
	
	
	// GET FIELD
	
	$media_group_entries = get_post_meta( get_the_ID(), 'dg_media_repeat_group', true );
	
	// process group values
	foreach ( ( array ) $media_group_entries as $key => $entry ) {
		
	
		// VALUES
		
		// media type
		$media_type = isset( $entry[ 'dg_media_select_media' ] ) ? $entry[ 'dg_media_select_media' ] : ''; // check if select menu value is set
		// ui options attribute
		$ui_options = isset( $entry[ 'check_ui_options' ] ) ? 'data-ui-options="' . $entry[ 'check_ui_options' ][0] . '"' : '';
		// sizes
		$img_size_class = isset( $entry[ 'dg_media_select_size' ] ) ? $entry[ 'dg_media_select_size' ] : '';
		
		// checks if a size is set in the theme, gets custom field value if otherwise
		if( empty( $theme_img_size ) ){
			
			// get custom field value
			
			if( isset( $img_size_class ) ){

				switch( $img_size_class ){

						case 's' :
							$img_size = 'medium';
							break;

						case 'm' :
							$img_size = 'large';
							break;

						case 'l' :
							$img_size = 'dg-large';
							break;

						case 'full' :
							$img_size = 'dg-extra-large';
							break;					
				}
			}
		}
		else{
			$img_size = $theme_img_size;
		}
		
		
		// resets the array
		$media = null;

		
		// IMAGE (file_list)
		if ( isset( $entry[ 'image' ] ) && !empty( $entry[ 'image' ] ) && $media_type === 'img' ) {
			
			// Loop through the file_list and fill it in the $media array
			foreach ( (array) $entry[ 'image' ] as $attachment_id => $attachment_url ) {
				$media[] = wp_get_attachment_image( $attachment_id, $img_size );
			}
		}
		
		// BOOKS (file_list)
		if ( isset( $entry[ 'image' ] ) && !empty( $entry[ 'image' ] ) && $media_type === 'book' ) {
			
			// Loop through the file_list and fill it in the $media array
			foreach ( (array) $entry[ 'image' ] as $attachment_id => $attachment_url ) {
				
				// extra markup for books
				$media[] = '<div class="container-img">' . wp_get_attachment_image( $attachment_id, $img_size ) . '<span class="inner-shadow"></span></div>';
			}
		}
		
		// MOVIE (oembed)
		if ( isset( $entry[ 'movie' ] ) && !empty( $entry[ 'movie' ] ) && $media_type === 'mov' ) {
			$media[] = wp_oembed_get( esc_url( $entry[ 'movie' ] ) );
		}
		

		// MARKUP
		
		// final check if a value exists
		if ( !empty( $media ) ){
			print '<div class="' . $wrapper_class . '" ' . $ui_options . '>';
				print '<div class="' . $class . ' itm-' . $media_type . ' itm-' . $img_size_class . '">' .  implode( '', $media ) . '</div><!-- .' . $class . ' -->';
				print '<button class="ui-slide-link"></button>';
			print '</div><!-- .' . $wrapper_class . ' -->';
		}
	}	
}

add_filter( 'dg_custom_fields', 'dg_get_media_group_entries' );



/** SF:
 * Get Custom Field Values: Keywords
 */
function dg_get_keywords() {
	
	$prefix = 'dg_keyword_';
	
	// GET FIELD
	$keywords = get_post_meta( get_the_ID(), $prefix . 'keywords_text', true );
	
	print $keywords;
	
}

add_filter( 'dg_custom_fields', 'dg_get_keywords' );