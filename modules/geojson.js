(function () {
'use strict';

var geojson = function (features) {
    var fc = {
        "type": "FeatureCollection",
        "features": []
    };

    features.forEach(function (feature) {
        var geometry = JSON.parse(feature.st_asgeojson),
            geojson = {
                "type": "Feature",
                "geometry": {
                    "type": geometry.type,
                    "coordinates": geometry.coordinates
                },
                "properties": {}
            };

        for (var prop in feature) {
            if (prop !== 'st_asgeojson')
                geojson.properties[prop] = feature[prop];
        }

        fc.features.push(geojson);

        return true;
    });

    return fc;
};

module.exports = geojson;

return true;
})();
