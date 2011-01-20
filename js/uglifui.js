/**
 * UglifUI
 * by Alex Sexton - AlexSexton@gmail.com
 *
 * A web interface to UglifyJS
 *
 * All the UglifyJS Code plus the modifications made to it
 * in order to make UglifUI work are subject to the license
 * that UglifyJS is released under (currently BSD)
 *
 * The rest of the code (more or less this file) is WTFPL
 * so go crazy.
 *
 * I pronounce it "UG-LIH-FEW-EYE" ["JAY-ESS"] - but I don't
 * care how you say it.
 */
(function ( global, doc, $, uglify, undef ) {
  // Create our app object
  var uglifui = {
    init: function () {
      var self = this;

      // Dom ready
      $(function () {
        self.setElements();
        self.hookEvents();
      });
    },
    
    elements : {},

    setElements : function () {
      // Main code text area
      this.elements.ta_code = $('#code');
      // The form element
      this.elements.frm_uglify = $('#ugForm');
      // List of flags
      this.elements.ul_flags = $('#flagList');
    },

    getCode : function () {
      return this.elements.ta_code.val();
    },

    getFlags : function () {
      var flags = [],
          linelen = $('#max-line-len'),
          lineval = global.parseInt( $('#linelen').val(), 10 );

      // Loop through and add the correct flags
      this.elements.ul_flags.find(':checked:not(#max-line-len)').each(function ( key, elem ) {
        flags.push( '--' + elem.id );
      });

      // Special case for line len (with a sane minimum)
      if ( linelen.is( ':checked' ) && lineval > 3 ) {
        flags.push( '--max-line-len' );
        flags.push( lineval + "" );
      }

      return flags;
    },

    submit : function () {
      var code = this.getCode(),
          flags = this.getFlags();
      this.elements.ta_code.val( uglify( code, flags ) );
    },

    hookEvents : function () {
      var self = this;

      // Hook up the submit event
      this.elements.frm_uglify.submit(function ( e ) {
        e.preventDefault();
        self.submit();
        return false;                             
      });
    }
  };

  // Start it up
  uglifui.init();
})( this, this.document, this.jQuery, this.uglify );
