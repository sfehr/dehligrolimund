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
	const is_coarse = matchMedia( '(pointer:coarse)' ).matches;
	const vw = Math.max( document.documentElement.clientWidth || 0, window.innerWidth || 0 );
	const vh = Math.max( document.documentElement.clientHeight || 0, window.innerHeight || 0 );
//	let vh_css = vh * 0.01; // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let viewport = ( vh > vw ) ? ( vh * 0.01 ) : ( vw * 0.01 ); // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	
	// DIMENSIONS
	
	document.documentElement.style.setProperty( '--vh', `${ viewport }px` ); // Then we set the value in the --vh custom property to the root of the document

	window.addEventListener( 'orientationchange', () => {
		let viewport = ( vh > vw ) ? ( vh * 0.01 ) : ( vw * 0.01 ); 
		document.documentElement.style.setProperty( '--vh', `${ viewport }px` );
	});	

	
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
	
	
	if( ( vw < 850 ) && is_coarse ){
		// MOBILE, TOUCH
		sf_viwport_handler();
	 }
	else{
		// DESKTOP, POINTER
		initialize_fullpage();
	}
	

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
//			responsiveWidth: 850,
			responsiveSlides: false,
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
		
		if( ( vw > 850 ) && !is_coarse ){
			// freeze scrolling for #fullpage
			fullpage_api.setAllowScrolling( false );
		}

	});

	// Close Index
	$( document ).on( 'click', '.ui-index-close, .ui-slide-link', function(){

		// remove index-active class from main container
		$( 'body' ).removeClass( 'index-active' );

		if( $( this ).hasClass( 'ui-slide-link' ) ){
			// get the section position
			var new_section = $( this ).parents( '.section' ).attr( 'data-slug' );
			var section_index = $( this ).parents( '.section' ).index();
			// get the slide position
			var new_slide = $( this ).parents( '.slide' ).index() - 1;
			
		
			// DESKTOP
			if( ( vw > 850 ) && !is_coarse ){
		
				// resume scrolling
				fullpage_api.setAllowScrolling( true );
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
			// MOBILE
			else{
				
				var destination = jQuery( '#fullpage .section' ).eq( section_index ).find( '.slide' ).eq( new_slide );
				destination[ 0 ].scrollIntoView({
					behavior: "smooth", // or "auto" or "instant"
					block: "start" // or "end"
				});				
				
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
	
	
	// VIEWPORT HANDLER
	function sf_viwport_handler(){
		
//		const elements = document.querySelectorAll( '#fullpage .section' );
		const elements = document.querySelectorAll( '#fullpage .slide' );

		function handleIntersection( entries ) {

		  entries.map( ( entry ) => {
			  
			  if ( entry.isIntersecting ){
				  
//				  section_index = jQuery( entry.target ).index();
				  section_index = jQuery( entry.target.parentElement ).index();
				  // title
				  getContent( projects[ section_index ].title, '.ui-project-title' ); // get content (item, container)
				  // content
				  getContent( projects[ section_index ].content, '.ui-project-content .container-content' );					
				  // get color
				  getColor( projects[ section_index ].color, 'ui-project-content' ); //  ( color, container_class ) no dot notation
				  // get UI options ( item, container, selector)
				  getUiOptions( entry.target, 'body' );

			}
		  });
		}
		
		let options = {
//		  root: document.querySelector( '#fullpage' ),
		  rootMargin: '25% 0% 25% 0%',
//		  threshold: [0, 0.25, 0.5, 0.75, 1]
			threshold: 0.5
		}		

		const observer = new IntersectionObserver( handleIntersection, options );

		elements.forEach( element => observer.observe( element ) );
		
	}
	
	
	// RESIZE EVENTS
	jQuery( window ).on( 'orientationchange', function(){
		// resets the horizontal scroll position to avoid strange croppings when orientation is changed back to portrait
		jQuery( '.itm-book' ).each( function(){
			jQuery( this ).scrollLeft( 0 );
		});
	});

});	