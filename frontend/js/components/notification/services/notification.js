'use strict';

/**
 * Notification service
 * This service is used to handle notifications in a central place
 *
 * Example usage:
 *           notification.alert({
 *               message: 'Stream started for the camera 1!',
 *               type: 'success',
 *               showCloseButton: true
 *           });
 */
SkyletterApp.factory('notification', function () {
		var factory = {};

		/**
		 * Severity values
		 *
		 * @enum {string}
		 */
		var severity = {
			info: 'info',
			warning: 'warning',
			error: 'error',
			success: 'success'
		};


		/**
		 * Raise an alert window which has to be closed manually
		 *
		 * @param {Object} options - Notification options
		 * @param {function} [approveCallback] - Callback function for the approve button
		 * @param {function} [declineCallback] - Callback function for canceled request
		 * @return void
		 */
		factory.alert = function (options, approveCallback, declineCallback) {
			Messenger().post(options);

			var loc = ['bottom', 'right'];
			var style = 'flat';

			var $output = $('.controls output');
			var $lsel = $('.location-selector');
			var $tsel = $('.theme-selector');

			var update = function(){
				var classes = 'messenger-fixed';
				for (var i=0; i < loc.length; i++)
					classes += ' messenger-on-' + loc[i];

				$.globalMessenger({ extraClasses: classes, theme: style });
				Messenger.options = { extraClasses: classes, theme: style };

				$output.text("Messenger.options = {\n    extraClasses: '" + classes + "',\n    theme: '" + style + "'\n}");
			};

			update();
		};

		return factory;
	});
