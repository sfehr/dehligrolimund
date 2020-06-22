<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package dehli-grolimund
 */

?>

<article class="section" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<div class="entry-info">
		<?php
		// title
		// date
		// keyword
		the_title( '<p class="entry-title">', '</p>' );	?>
		
		<div class="entry-date"><?php dg_get_keywords( 'date' ); ?></div>
		
		<div class="entry-keyword"><?php dg_get_keywords( 'keywords_text' ); ?></div>
		
	</div><!-- .entry-info -->
	
	<?php
			
	// SLIDES
	dg_get_media_group_entries( 'slide', 'entry-media', 'medium' );
	
		
	?>	

</article><!-- #post-<?php the_ID(); ?> -->
