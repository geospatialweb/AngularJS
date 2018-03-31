(function () {
'use strict';

function mapBoxDirective($sce)
{
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapBox.html')
	};

	return ddo;
}

mapBoxDirective.$inject = ['$sce'];

module.exports = mapBoxDirective;

return true;
})();
