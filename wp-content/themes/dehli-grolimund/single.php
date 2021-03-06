<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package dehli-grolimund
 */

get_header( 'dg' );
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			
			<div class="ui-navigation itm-up">
				<div class="container-cursor">
					<svg viewBox="0 0 50 50">
						<polyline class="arrow" points="45.5,14.7 25,35.3 4.5,14.7 "/>
					</svg>
				</div>	
			</div>
			<div class="ui-navigation itm-down">
				<div class="container-cursor">
					<svg viewBox="0 0 50 50">
						<polyline class="arrow" points="45.5,14.7 25,35.3 4.5,14.7 "/>
					</svg>
				</div>
			</div>
			<div class="ui-navigation itm-left">
				<div class="container-cursor">
					<svg viewBox="0 0 50 50">
						<polyline class="arrow" points="45.5,14.7 25,35.3 4.5,14.7 "/>
					</svg>
				</div>
			</div>
			<div class="ui-navigation itm-right">
				<div class="container-cursor">
					<svg viewBox="0 0 50 50">
						<polyline class="arrow" points="45.5,14.7 25,35.3 4.5,14.7 "/>
					</svg>
				</div>
			</div>			
			<button class="ui-index"><?php echo esc_html__( 'Index', 'dehli-grolimund' ); ?></button>
			<button class="ui-index-close"><?php echo esc_html__( 'Close', 'dehli-grolimund' ); ?></button>
			<button class="ui-project-title">...</button>
			<div class="ui-index-title"><?php echo esc_html__( 'Index', 'dehli-grolimund' ); ?></div>
			
			<div class="ui-project-content">
				<button class="ui-content-close"><?php echo esc_html__( 'Close', 'dehli-grolimund' ); ?></button>
				<div class="container-content">...</div>
		  	</div>

			<div class="ui-studio-content">
				<button class="ui-content-close"><?php echo esc_html__( 'Close', 'dehli-grolimund' ); ?></button>
				<div class="container-content">
					<?php
					
					// STUDIO CONTENT
					$page = get_page_by_title( 'Info Dehli Grolimund' );	
					echo $page->post_content;
					
					// PRIVACY POLICY
					$page = get_page_by_title( 'Privacy Policy' );	
					echo $page->post_content;
					
					?>
				</div>
		  	</div>			
			
			<div id="fullpage">
			<?php
				
			// PROJECT LOOP
				
			while ( have_posts() ) :
				the_post();

				get_template_part( 'template-parts/content', 'dg-project' );

			endwhile; // End of the loop.
			?>
			</div><!-- #fullpage -->
			<div id="index">
			<?php
				
			// INDEX LOOP
				
			while ( have_posts() ) :
				the_post();

				get_template_part( 'template-parts/content', 'dg-index' );

			endwhile; // End of the loop.
			?>
			</div><!-- #index -->						
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer( 'dg' );