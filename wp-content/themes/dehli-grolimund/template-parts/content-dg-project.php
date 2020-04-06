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
			// project title: wont be displayed in by js
			the_title( '<h1 class="entry-title">', '</h1>' );
		?>

		<div class="entry-content">
			<?php
			
			// project tilte
			the_title( '<p>', '</p>' );
			// project content
			the_content();

			?>
		</div><!-- .entry-content -->
	</div><!-- .entry-info -->
	
	<?php
			
	// SLIDES
	dg_get_media_group_entries( 'slide', 'entry-media' ); 
	
		
	?>		

</article><!-- #post-<?php the_ID(); ?> -->
