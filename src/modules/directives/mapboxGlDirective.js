(function () {
'use strict';

function mapboxGlDirective($sce)
{
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapboxGl.html')
	};

	return ddo;
}

mapboxGlDirective.$inject = ['$sce'];

module.exports = mapboxGlDirective;

return true;
})();
