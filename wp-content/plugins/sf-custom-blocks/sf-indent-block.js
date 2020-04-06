
/* This section of the code registers a new block, sets an icon and a category, and indicates what type of fields it'll include. */
  
wp.blocks.registerBlockType( 'brad/border-box', {
	title: 'SF Indent',
	icon: 'smiley',
	category: 'common',
	attributes: { // The data this block will be storing
		type: { type: 'string', default: 'default' }, // Block box type for loading the appropriate CSS class. Default class is 'default'.		
		title: { type: 'string' }, // Block box title in h4 tag		
		content: { type: 'array', source: 'children', selector: 'p' } // Block box content in p tag
},
  
/* This configures how the content and color fields will work, and sets up the necessary elements */
  
	edit: function( props ) {
		
		function updateType( event ) {
			props.setAttributes( { type: event.target.value } );
		}		
		
		function updateTitle( event ) {
			props.setAttributes( { title: event.target.value } );
		}
		
		function updateContent( newdata ) {
			props.setAttributes( { content: newdata } );
		}
		
		return el( 'div', {
					className: 'notice-box notice-' + props.attributes.type
		},
			el( 'select', {
				onChange: updateType,
				value: props.attributes.type,
			}, 
			   el( "option", { value: "default" }, "Default" ),
			   el( "option", { value: "success" }, "Success" ),
			   el( "option", { value: "danger" }, "Danger" )
			),
			   el(
				'input',
			{
					type: 'text',
					placeholder: 'Enter title here...',
					value: props.attributes.title,
					onChange: updateTitle,
					style: { width: '100%' }
				}
			),
			   el(
				wp.editor.RichText,
				{
					tagName: 'p',
					onChange: updateContent,
					value: props.attributes.content,
					placeholder: 'Enter description here...'
				}
			)
		  ); // End return

	},  // End edit()
	
	save: function( props ) {
		
		return wp.element.createElement(
			'h3',
			{ style: { border: "3px solid " + props.attributes.color } },
			props.attributes.content
		);
		
	}
});