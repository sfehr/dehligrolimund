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
* * Privacy Policy
* CREATE SLUGS
*
*/


jQuery( document ).ready( function( $ ) {

	// VARIABLES
	var projects = {};
	var project_titles = [];	

	
	// CONTENT OBJECT CONSTRUCTOR
	function Project( title, anchor, content, color ) {
		
		this.title = title;
		this.anchor = anchor;
		this.content = content;
		this.color = color;
		
	}	
	
		
	// INDEXING PROJECTS
	$( document ).find( '#fullpage .section' ).each( function( index ){

		// Get the content
		var title = $( this ).find( '.entry-title' ).html();
		var anchor = string_to_slug( title );
		var content = $( this ).find( '.entry-content' ).html();
		var color = $( this ).find( '.has-background' ).attr( 'class' );

		// Create Array
		project_titles[ index ] = anchor;
		
		// set data-slug attribute to all sections in #fullpage
		$( this ).attr( 'data-slug', anchor );
		
		// set data-slug attribute to all sections in #index
		$( 'body' ).find( '#index .section' ).eq( index ).attr( 'data-slug', anchor );
		
		// Creating objects based on the content
		projects[ index ] = new Project( title, anchor, content, color );
		
	});
	
	initialize_fullpage();	


	// FULLPAGE.js INITIALIZE
	function initialize_fullpage(){

		// initialize fullpage.js
		var myFullpage = new fullpage( '#fullpage', {
			licenseKey: '46DF6547-26D84335-893C5DFF-8E33EBD5',
			responsiveSlidesKey: 'ZGVobGlncm9saW11bmQuY29tXzlXdGNtVnpjRzl1YzJsMlpWTnNhV1JsY3c9PVVZag==',
			anchors: project_titles,
			normalScrollElements: '.ui-project-content, .ui-studio-content, #index',
			controlArrows: false,
			touchSensitivity: 75,
			responsiveWidth: 850,
			responsiveSlides: true,
			scrollBar: false,
/*			afterResponsive: function( isResponsive ){

			},			
*/

			// Section
			afterLoad: function( origin, destination, direction ){

				// get the index of the current active section
				var section_index = $( 'body' ).find( '.fp-section.active' ).index( 'article' );
				// doublecheck for '.section' class because in responsiveslides state slides are converted to sections as well
				if( -1 === section_index ){
				   section_index = $( 'body' ).find( '.fp-section.active' ).prevAll( 'article:first' ).index( 'article' )
				}

				// title
				getContent( projects[ section_index ].title, '.ui-project-title' ); // get content (item, container)
				// content
				getContent( projects[ section_index ].content, '.ui-project-content .container-content' );
					
				// get color
				getColor( projects[ section_index ].color, 'ui-project-content' ); //  ( color, container_class ) no dot notation
				
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
			},

			// Slide
			afterSlideLoad: function( section, origin, destination, direction ){
				
				// get UI options ( item, container, selector)
				getUiOptions( destination.item, 'body', undefined );		

			},
		});

	}



	// GET CONTENT
	function getContent( item, container ){
				
		container = $( container );
		container.html( item );

	}

	
	// GET COLOR
	function getColor( color, container_class ){

		// select container
		var container = $( '.' + container_class );
		// reset color class
		container.attr( 'class', container_class );
		// add color class
		container.addClass( color );

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
	
	// Display Arrow Cursor
	$( document ).on( 'mousemove', '.ui-navigation', function( e ) { 
		
		$( this ).find( 'svg' ).css({
			'display': 'block',
			'top': e.clientY,
			'left': e.clientX
		});

	});
	// Hide Arrow Cursor			   
	$( 'body' ).on( 'mouseleave', '.ui-navigation', function() { 
		
		$( this ).find( 'svg' ).css({
			'display': 'none',
		});		
	});				   


	// Display Project Info
	$( document ).on( 'click', '.ui-project-title, .ui-project-content > .ui-content-close', function( e ) { 

		e.preventDefault();
		$( 'body' ).toggleClass( 'project-info-expanded' );
		$( 'html, body' ).toggleClass( 'noscroll' ); // prevent background from scrolling

	});

	// Display Studio Info
	$( document ).on( 'click', '.site-title a, .ui-studio-content > .ui-content-close', function( e ) { 

		e.preventDefault();
		$( 'body' ).toggleClass( 'studio-info-expanded' );
		$( 'html, body' ).toggleClass( 'noscroll' ); // prevent background from scrolling

	});

	// Display Index
	$( document ).on( 'click', '.ui-index', function(){  

		// add index-active class to main container
		$( 'body' ).addClass( 'index-active' );
		
		// freeze scrolling for #fullpage
		fullpage_api.setAllowScrolling( false );

	});

	// Close Index
	$( document ).on( 'click', '.ui-index-close, .ui-slide-link', function(){

		// remove index-active class from main container
		$( 'body' ).removeClass( 'index-active' );

		// resume scrolling
		fullpage_api.setAllowScrolling( true );

		if( $( this ).hasClass( 'ui-slide-link' ) ){

			// get the section position
			var new_section = $( this ).parents( '.section' ).attr( 'data-slug' );
			// get the slide position
			var new_slide = $( this ).parents( '.slide' ).index() - 1;
			
			// check if responsive mode is active
			if( $( 'body' ).hasClass( 'fp-responsive' ) ){
				
				// when responsiveslides state is on slide index 0 and 1 is not valid
				new_slide++;
				new_slide = ( new_slide > 1 ) ? new_slide : '' ;
				
				// move to position (in respoinsiveslides active state there is no / between section and slide in the url )
				fullpage_api.silentMoveTo( new_section + new_slide );
			}
			else{
				
				// move to position
				fullpage_api.silentMoveTo( new_section, new_slide );
			}

		}

	});

	// PRIVACY POLICY
	$( document ).on( 'click', '.privacy-policy-link', function( e ){
		
		e.preventDefault();
		$( '.privacy-policy-content' ).toggle();
		
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