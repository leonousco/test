/*! iOSList - v2.0.0 -  * https://brianhadaway.github.io/iOSList
 * Copyright (c)  2014  Brian Hadaway; Licensed MIT */(function($, window, document, undefined) {
    var IosList = function(elem, options) {
        this.$elem = $(elem);
        this.$elem.data('instance', this);
        this.init(options);
    };

    IosList.prototype = {
        defaults: {
            classes: {
                animated: 'ioslist-animated',
                container: 'ioslist-wrapper',
                hidden: 'ioslist-hidden',
                stationaryHeader: 'ioslist-fake-header'
            },
            selectors: {
                groupContainer: '.ioslist-group-container',
                groupHeader: '.ioslist-group-header',
                stationaryHeader: 'h2'
            }
        },

        init: function(options) {
            var scope = this,
                isIOS = navigator.userAgent.match(/ipad|iphone|ipod/gi) ? true : false;

            //set defaults
            this.options = $.extend(true, {}, this.defaults, (options || {}));
            this.elems = [];
            //indicate that this is an ioslist
            this.$elem.addClass('ioslist');
            //wrap all the children
            this.$elem.children().wrapAll(["<div class='", this.options.classes.container, "' data-ios='", isIOS, "'></div>"].join(''));
            this.$elem.prepend(['<', this.options.selectors.stationaryHeader, '/>'].join(''));
            this.$listWrapper = this.$elem.find('.' + this.options.classes.container);
            this.$fakeHeader = this.$elem.find(this.options.selectors.stationaryHeader).eq(0);
            this.$fakeHeader.addClass(this.options.classes.stationaryHeader);

            this.$elem.find(this.options.selectors.groupContainer).each(function(index, elem) {
                var $tmp_list = scope.$elem.find(scope.options.selectors.groupContainer).eq(index),
                    $tmp_header = $tmp_list.find(scope.options.selectors.groupHeader).eq(0),
                    $tmp_listHeight = $tmp_list.height(),
                    $tmp_listOffset = $tmp_list.position().top; //각리스트헤더의 탑위치 (컨테이너에내의 절대값)
                scope.elems.push({
                    'list': $tmp_list,
                    'header': $tmp_header,
                    'listHeight': $tmp_listHeight,
                    'headerDate': $tmp_header.attr("data-date"),
                    'headerText': $tmp_header.text(),
                    'headerHeight': $tmp_header.outerHeight(),
                    'listOffset': $tmp_listOffset,
                    'listBottom': $tmp_listHeight + $tmp_listOffset
                });
            });

            this.$fakeHeader.text(this.elems[0].headerText);
            this.$fakeHeader.attr("data-header", this.elems[0].headerDate);

            this.$listWrapper.scroll(function() {
                scope.testPosition();
            });

        },
        
        refreshElements: function(currentScrollTop) {
            var scope = this;
            this.elems = [];
            this.$elem.find(this.options.selectors.groupContainer).each(function(index, elem) {
                var $tmp_list = scope.$elem.find(scope.options.selectors.groupContainer).eq(index),
                    $tmp_header = $tmp_list.find(scope.options.selectors.groupHeader).eq(0),
                    $tmp_listHeight = $tmp_list.height(),
                    $tmp_listOffset = $tmp_list.position().top + currentScrollTop;
                scope.elems.push({
                    'list': $tmp_list,
                    'header': $tmp_header,
                    'listHeight': $tmp_listHeight,
                    'headerDate': $tmp_header.attr("data-date"),
                    'headerText': $tmp_header.text(),
                    'headerHeight': $tmp_header.outerHeight(),
                    'listOffset': $tmp_listOffset,
                    'listBottom': $tmp_listHeight + $tmp_listOffset
                });
            });
        },

        testPosition: function() {
            var currentTop = this.$listWrapper.scrollTop(),
                topElement, offscreenElement, topElementBottom, i = 0;
            
            while ((this.elems[i].listOffset - currentTop) <= 0) {
                topElement = this.elems[i];
                topElementBottom = topElement.listBottom - currentTop;
                if (topElementBottom < -topElement.headerHeight) {
                    offscreenElement = topElement;
                }
                i++;
                if (i >= this.elems.length) {
                    break;
                }
            }
            
            if (topElementBottom < 0 && topElementBottom > -topElement.headerHeight) {
                //20150611ROY this.$fakeHeader.addClass(this.options.classes.hidden);
               //20150611ROY $(topElement.list).addClass(this.options.classes.animated);
            } else {
                //20150611ROY this.$fakeHeader.removeClass(this.options.classes.hidden);
                if (topElement) {
                    //20150611ROY $(topElement.list).removeClass(this.options.classes.animated);
                }
            }

            if (topElement) {
            	//fake-header가 변경되는 시점
            	var beforeText = this.$fakeHeader.text();
            	var afterText = topElement.headerText;
            	
                this.$fakeHeader.attr("data-header", topElement.headerDate);
                this.$fakeHeader.text(topElement.headerText);
                
                if (beforeText != afterText)
                	this.$fakeHeader.trigger("dateheaderchange");
            }
        }
    };

    $.fn.ioslist = function(options, args) {
        if (typeof options === 'string') {
            return this.each(function() {
                $(this).data('instance')[options](args);
            });
        } else {
            return this.each(function() {
                new IosList(this, options);
            });
        }
    };

})(jQuery, window, document);