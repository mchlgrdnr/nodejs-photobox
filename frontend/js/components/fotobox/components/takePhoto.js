/**
 * Main Skyrec controller
 */
FotoboxApp.component('takePhoto', {
    templateUrl: 'js/components/fotobox/templates/takePhoto.html',
    controllerAs: 'vm',
    controller: function (
        $http,
        $scope,
        $rootScope,
        $timeout,
        $location,
        $q
    ) {
    	var vm = this;
        vm.previewImage = '';

    	/**
    	 * Array of all listeners of this component
    	 * @type {Array}
    	 **/
    	vm.listeners = [];

    	/**
    	 * init | countdown | preview
    	 **/
    	vm.mode = 'init';

        /**
         * Lifecylce hook - init component
         */
		vm.$onInit = function () {
		};

        /**
         * Take a picture
         */
        vm.takePicture = function () {
        	// change view to countdown view
        	vm.changeView('countdown');
        	$timeout(function () {
        		$scope.$broadcast('timer-start');
        	}, 1000);


            // change view to preview

            // print photo
        };

        /**
         * Callback for the countdown method
         */
        vm.countdownFinished = function () {
            $scope.$apply(function () {
                vm.changeView('preview');

                $http
                    .get('/api/v1/takepicture')
                    .then(function(response){
                        vm.pictures = response.data;

                        var requests = [];
                        angular.forEach(vm.pictures, function (picture, key) {
                            var defered = $q.defer();

                            vm.pictures[key] = {
                                abs: $location.absUrl() + picture,
                                fileName: picture
                            };

                            requests.push(defered);
                            defered.resolve;
                        });

                        $q.all(requests).then(function(){
                            $rootScope.$emit('previewImages.update', vm.pictures);
                        });

                    });

        	});
        }

        /**
         * Lifecylce hook - destroy component
         */
    	vm.$onDestroy = function () {
    	};

        /**
         * Change the view
         */
    	vm.changeView = function (mode) {
    		vm.mode = mode;
    	}
	}

});

