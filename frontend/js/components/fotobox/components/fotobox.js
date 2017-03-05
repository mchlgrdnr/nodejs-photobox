/**
 * Main Skyrec controller
 */
FotoboxApp.component('fotoboxApp', {
    templateUrl: 'js/components/fotobox/templates/content.html',
    controllerAs: 'vm',
    controller: function (
    ) {
    	var vm = this;

    	/**
    	 * Array of all listeners of this component
    	 * @type {Array}
    	 **/
    	vm.listeners = [];


        /**
         * Lifecylce hook - init component
         */
		vm.$onInit = function () {
		};

        /**
         * Lifecylce hook - destroy component
         */
    	vm.$onDestroy = function () {
    	};
	}

});

