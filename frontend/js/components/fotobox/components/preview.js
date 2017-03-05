/**
 * Main Skyrec controller
 */
FotoboxApp.component('preview', {
    templateUrl: 'js/components/fotobox/templates/preview.html',
    controllerAs: 'vm',
    controller: function (
        $http,
        $rootScope
    ) {
    	var vm = this;
        vm.previewImages = [];

    	/**
    	 * Array of all listeners of this component
    	 * @type {Array}
    	 **/
    	vm.listeners = [];


        /**
         * Lifecylce hook - init component
         */
		vm.$onInit = function () {
            $rootScope.$on('previewImages.update', function (event, data) {
                vm.previewImages = data;
                var previewModal = angular.element( document.querySelector('#preview-modal'));
                previewModal.modal('show');
            });
		};

        /**
         * Printing an image
         */
        vm.printImage = function (image) {
            $http
                .get('/api/v1/printpicture/' + encodeURIComponent(image))
                .then(function(response){
                    // todo: notification success printing the image
                }, function () {
                    // todo: notification error printing the image
                    // show try again button?
                });
        }

        /**
         * Lifecylce hook - destroy component
         */
    	vm.$onDestroy = function () {
    	};
	}

});

