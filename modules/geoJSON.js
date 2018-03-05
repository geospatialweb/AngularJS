(function () {
'use strict';

var geoJSON = function (result) {
    var fc = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[]]
            }
        }]
    };

    result.forEach(function (row) {
        return fc.features[0].geometry.coordinates[0].push([parseFloat(row.lng), parseFloat(row.lat)]);
    });

    return fc;
};

module.exports = geoJSON;

return true;
})();
