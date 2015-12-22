'use strict';

angular.module ( 'filters', [] )

//takes an html text blob, separates HTML tags from normal text
//only sends the normal text (non-HTML) to the regex filter
.filter ( 'htmlSeparator', [ '$sce','$filter', function ( $sce, $filter ) { 
    return function ( text ){
      if ( !text || !text.length ) { return; }
      var finalText = '';
      var blobsStartWithOpenTag = text.split ( '<' );
      angular.forEach ( blobsStartWithOpenTag, function ( v, k ) {
        var tagAndText = v.split ( '>' );
        if ( tagAndText[0]) {
          //this is an html tag, don't filter it
          finalText +=  '<' + tagAndText[0] + '>';
        }
        if ( tagAndText[1]) {
          //this is non-html text: remove corrupt chars from it
          finalText += $filter ( 'removeCorruptDbChars' )( tagAndText[1] );
        }
      });
      return $sce.trustAsHtml ( finalText );
    }
  }])

//this filter could do anything
//in this case, several specific regex rules replace question marks with other characters, based on context
  .filter ( 'removeCorruptDbChars', function () {
    return function ( text ) {
      text =  text.replace ( /([a-zA-Z])\?([a-zA-Z])/g, '$1\'$2' );
      //replace ?letter with "letter
      text =  text.replace ( /\?([a-zA-Z])/g, '"$1' );
      //replace white?white with -
      text =  text.replace ( /\s\?\s/g, ' - '  );
      //replace white? with "
      text =  text.replace ( /\s\?/g, ' "'  );
      //replace strings beginning with ? with "
      text =  text.replace ( /^\?/, '"'  );
      //replace ?< with "<
      text =  text.replace ( /\?</g, '"<' );
      //replace >? with >"
      text =  text.replace ( />\?/g, '>"' );
      //replace ??white with ?"white
      text =  text.replace ( /\?\?(\s)/g, '?" ' );
      return text;
    }
  });
