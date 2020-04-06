/*
*
* FULLPAGE.js INITIALIZE
* GET CONTENT
* GET COLOR
* GET UI COLOR
* UI INTERACTION
* * Section/Slide Navigation Arrows
* * Display Project Info
* * Display Studio Info
* * Display Index
* * Close Index
* CREATE SLUGS
*
*/


jQuery( document ).ready( function( $ ) {

	// VARIABLES
	var projects = [];	
		
	// INDEXING PROJECTS
	$( document ).find( '.section' ).each( function( index ){

		// Get the content
		var title = $( this ).find( '.entry-title' ).text();
		var anchor = string_to_slug( title );

		// Create Array
		projects[ index ] = anchor;
	});

	initialize_fullpage();	


	// FULLPAGE.js INITIALIZE
	function initialize_fullpage(){

		// prepare markup
		$( document ).find( '#index .section' ).each( function( index ){

			// set data-slug attribute to all sections
			$( this ).attr( 'data-slug', projects[ index ] );

		});   

		// initialize fullpage.js
		var myFullpage = new fullpage( '#fullpage', {
			anchors: projects,
			normalScrollElements: '.ui-project-content, .ui-studio-content, #index',
			controlArrows: false,
			dragAndMove: true,

			// Section
			afterLoad: function( origin, destination, direction ){

				// get content (item, container, selector)
				// title
				getContent( destination.item, '.ui-project-title', '.entry-title' ); 
				// content
				getContent( destination.item, '.ui-project-content .container-content', '.entry-content' );
				// get color ( item, container, selector) no dot-notation
				getColor( destination.item, 'ui-project-content', 'has-background' );
				// get UI options ( item, container, selector)
				getUiOptions( destination.item, 'body', '.slide.active' );

				// up button
				if( destination.isFirst ){
					$( '.itm-up' ).addClass( 'hide' );
				}
				else{
					$( '.itm-up' ).removeClass( 'hide' );
				}

				// down button
				if( destination.isLast ){
					$( '.itm-down' ).addClass( 'hide' );
				}
				else{
					$( '.itm-down' ).removeClass( 'hide' );
				}

				/*
				// hide left button
				$( '.itm-left' ).addClass( 'hide' );

				// if the section contains more than 1 slide show the right button
				if( $( '.fp-section.active' ).find( '.slide' ).length > 1 ){
					$( '.itm-right' ).removeClass( 'hide' );
				}
				else{
					$( '.itm-right' ).addClass( 'hide' );

				}
				*/

			},

			// Slide
			afterSlideLoad: function( section, origin, destination, direction ){
				
				// get UI options ( item, container, selector)
				getUiOptions( destination.item, 'body', undefined );
				
	/*			var current_slide = destination.index;

				
				// left button
				if( destination.isFirst ){
					$( '.itm-left' ).addClass( 'hide' );
				}
				else{
					$( '.itm-left' ).removeClass( 'hide' );
				}

				// right button
				if( destination.isLast ){
					$( '.itm-right' ).addClass( 'hide' );
				}
				else{
					$( '.itm-right' ).removeClass( 'hide' );
				}
	*/			

			},
		});

	}



	// GET CONTENT
	function getContent( item, container, selector ){

		var container = $( container );
		var value = $( item ).find( selector ).html();
		container.html( value );

	}

	
	// GET COLOR
	function getColor( item, container, selector ){

		// get colo class
		var color =  $( item ).find( '.' + selector ).attr( 'class' );
		// reset class
		$( 'body' ).find( '.' + container ).attr( 'class', container );
		// add color class
		$( 'body' ).find( '.' + container ).addClass( color );

	}
	
	// GET UI COLOR
	function getUiOptions( item, container, selector ){

		// get color
		var ui_option;
		if( selector == undefined ){
			
			ui_option = $( item ).attr( 'data-ui-options' );
			
		}
		else{
			ui_option = $( item ).find( selector ).attr( 'data-ui-options' );
		}
		
		// set color class to container
		if( ui_option != undefined ){
			$( container ).attr( 'data-ui-options', ui_option );
		}
		else{
			$( container ).removeAttr( 'data-ui-options' );
		}
		
	}	
	

	// UI INTERACTION 

	// Section/Slide Navigation Arrows
	$( document ).on( 'click', '.ui-navigation', function( e ) { 

		e.preventDefault();

		// UP
		if( $( this ).hasClass( 'itm-up' ) ){
			fullpage_api.moveSectionUp();
		}
		// DOWN
		if( $( this ).hasClass( 'itm-down' ) ){
			fullpage_api.moveSectionDown();
		}
		// RIGHT
		if( $( this ).hasClass( 'itm-right' ) ){
			fullpage_api.moveSlideRight();
		}
		// LEFT
		if( $( this ).hasClass( 'itm-left' ) ){
			fullpage_api.moveSlideLeft();
		}	

	});


	// Display Project Info
	$( document ).on( 'click', '.ui-project-title, .ui-project-content > .ui-content-close', function( e ) { 

		e.preventDefault();
		$( 'body' ).toggleClass( 'project-info-expanded' );

	});

	// Display Studio Info
	$( document ).on( 'click', '.site-title a, .ui-studio-content > .ui-content-close', function( e ) { 

		e.preventDefault();
		$( 'body' ).toggleClass( 'studio-info-expanded' );

	});

	// Display Index
	$( document ).on( 'click', '.ui-index', function(){  

		// add index-active class to main container
		$( 'body' ).addClass( 'index-active' );
		// freeze scrolling for #fullpage
		$( 'html, body' ).css( 'overflow', 'scroll' );
		$( 'html, body' ).css( 'height', 'auto' );	
	//	fullpage_api.setAllowScrolling( false );

	});

	// Close Index
	$( document ).on( 'click', '.ui-index-close, .ui-slide-link', function(){

		// remove index-active class from main container
		$( 'body' ).removeClass( 'index-active' );

		// resume scrolling
		$( 'html, body' ).css( 'overflow', 'hidden' );
		$( 'html, body' ).css( 'height', '100%' );	
	//	fullpage_api.setAllowScrolling( true );	


		if( $( this ).hasClass( 'ui-slide-link' ) ){

			// get the section position
			var new_section = $( this ).parents( '.section' ).attr( 'data-slug' );
			// get the slide position
			var new_slide = $( this ).parents( '.slide' ).index() - 1;

			// move to position
			fullpage_api.silentMoveTo( new_section, new_slide );

		}

	});



	// CREATE SLUGS
	function string_to_slug ( str ) {

		str = str.replace(/^\s+|\s+$/g, ''); // trim
		str = str.toLowerCase();

		// remove accents, swap ñ for n, etc
		var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to   = "aaaaeeeeiiiioooouuuunc------";
		for (var i=0, l=from.length ; i<l ; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}

		str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes

		return str;
	}
	
	
});	