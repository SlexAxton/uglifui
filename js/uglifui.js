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
    },

    getCode : function () {
      return this.elements.ta_code.val();
    },

    getFlags : function () {
      return [];
    },

    submit : function () {
      this.elements.ta_code.val( uglify( this.getCode(), this.getFlags() ) );
    },

    hookEvents : function () {
      var self = this;

      // Hook up the submit event
      this.elements.frm_uglify.submit(function (){
        self.submit();
        return false;                             
      });
    }
  };

  // Start it up
  uglifui.init();
})( this, this.document, this.jQuery, this.uglify );
