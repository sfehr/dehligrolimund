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
	
	<div class="slide">
		
		<?php
			
		// project content
		// get custom fields
		
		// <div class="entry-media itm-img itm-s"><img src="https://via.placeholder.com/1500x1000"></div>
		
		?>		
		<button class="ui-slide-link"></button>
	</div><!-- .slide -->

</article><!-- #post-<?php the_ID(); ?> -->
