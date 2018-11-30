'use strict';

var WSD = {};

WSD.dispatcher = $(document);

function signInProcess() {
    $('.alert').removeClass('alert-warning').addClass('alert--process alert-primary');
}

//jquery plugins
/**
 * The plugin replaces broken avatar images with the optional image or replaced with the default image
 * e.g $('.avatar').wsdDefaultAvatar('image path');
 * @param  optionalPath the location of the image, relative to the url argument
 * @return              chainable jquery object
 */
(function ($) {
    var defaultPath = 'assets/img/placeholder.png';

    $.fn.wsdDefaultAvatar = function(optionalPath) {
        return this.each(function(index, element) {
            $(element).on('error', function () {
                $(this).attr('src', optionalPath || defaultPath);
            });
        });
    };
}($));

/**
 * The plugin will send analytic data to the server from a certain event
 * e.g $('a').wsdAnalitics('click');
 * @param  eventName the name of the event needs to be monitored
 * @param  url       the server endpoint recives the json stringified event object
 * @return           chainable jquery object
 */
(function ($) {
    var defaultUrl = 'analytics';

    $.fn.wsdAnalitics = function(eventName, url) {
        return this.each(function(index, element) {
            $(element).on(eventName, function (event) {
                $.ajax(url || defaultUrl, {
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(event)
                });
            });
        });
    };
}($));

$('.avatar').wsdDefaultAvatar();
$('a').wsdAnalitics('click');

//analytics plugin can be initiated trough data-analytics attribute on the target element
$('[data-analytics]').each(function () {
    var $element = $(this);
    var events = $element.data('analytics').split(' ');

    for(var i = 0; i < events.length; i++) {
        $element.wsdAnalitics(events[i]);
    }
});