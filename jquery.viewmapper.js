(function( $ ){

    var methods = {
        init : function( options ) {
            var arr = [];
            this.each(function(){
                var _self = $(this);
                var obj = {};
                $(_self).each(function(){
                    var _e = $(this);
                    obj[functions.getkey(_e)] = functions.process(_e);
                });
            });
        }
    };

    var functions = {
        process : function(_element) {
            var obj = {};
            _element.children().each(function(){
                var _child = $(this);
                var key = functions.getkey(_child), assigner;
                if (_child.children().length > 0) {
                    assigner = functions.process(_child);
                    assigner['element'] = _child;
                } else {
                    assigner = _child;
                }
                if (typeof obj[key] !== 'undefined') {
                    if (obj[key] instanceof Array) {
                        obj[key].push(assigner);
                    } else {
                        obj[key] = [obj[key],assigner];
                    }
                } else {
                    obj[key] = assigner;
                }

            });
            return obj;
        },
        getkey : function(_element) {
            if (_element.attr('id')) {
                key = _element.attr('id');
            } else if (_element.attr('class')) {
                key = _element.attr('class').split(' ')[0];
            } else {
                key = _element.prop('tagName').toLowerCase();
            }
            return key;
        }
    }

    $.fn.viewMap = function( method ) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.viewMap' );
        }

    };

})( jQuery );