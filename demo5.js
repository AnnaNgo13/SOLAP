/**
 * Demos of
 *   - pulling additional attributes from a WFS to attach to a vector source,
 *   - univariate symbolization of a vector source,
 *   - univariate symbolization with normalization on a vector source, and
 *   - bivariate symbolziation with optional normalization (either var) on a vector source
 */

import "ol/ol.css";
import { Map, View } from "ol";
import Overlay from "ol/Overlay";
import { defaults as defaultControls, Attribution } from "ol/control";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { GeoJSON, WFS } from "ol/format";
import { all as allStrategy } from "ol/loadingstrategy";
import { Vector as VectorSource, XYZ } from "ol/source";
import { Stroke, Fill, Style } from "ol/style";
import colorbrewer from "colorbrewer";
import { quantiles, quantileGroups } from "qquantile";

/**
 * A CARTO basemap
 */
const basemapLayer = new TileLayer({
  source: new XYZ({
    url:
      "https://cartodb-basemaps-{a-d}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attributions:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attribution/">CartoDB</a>'
  })
});

/**
 * Counties sourced from WFS. Retrieve them all at once.
 */
const countySource = new VectorSource({
  format: new GeoJSON(),
  url: function(extent) {
    return (
      "http://149.165.157.200:8080/geoserver/ows?service=wfs&" +
      "version=1.1.0&request=GetFeature&typename=solap:mn_county_2010&" +
      "outputFormat=application/json&srsname=EPSG:3857"
    );
  },
  attributions: "U.S. Census Bureau",
  strategy: allStrategy //it's not that much, just grab it all
});

/**
 * Counties sourced from WFS. Retrieve them all at once.
 */
const tractSource = new VectorSource({
  format: new GeoJSON(),
  url: function(extent) {
    return (
      "http://149.165.157.200:8080/geoserver/ows?service=wfs&" +
      "version=1.1.0&request=GetFeature&typename=solap:mn_tract_2010&" +
      "outputFormat=application/json&srsname=EPSG:3857"
    );
  },
  attributions: "U.S. Census Bureau",
  strategy: allStrategy //it's not that much, just grab it all
});

/**
 * Basic polygon. The transparent fill is used to catch clicks on features
 * (not in this demo). Note that without a fill, clicks will only register on
 * feature boundaries/strokes.
 */
const styleBasicPolygon = new Style({
  stroke: new Stroke({
    color: "rgba(0, 0, 0, 1.0)",
    width: 1
  }),
  fill: new Fill({
    color: "transparent"
  })
});

/**
 * Construct a layer from source counties
 */
const countyLayer = new VectorLayer({
  name: "mn_counties_2010",
  source: countySource,
  style: styleBasicPolygon
});

/**
 * Construct a layer from source tracts
 */
const tractLayer = new VectorLayer({
  name: "mn_counties_2010",
  source: tractSource,
  style: styleBasicPolygon
});

/**
 * Start of attributions setup.
 * https://openlayers.org/en/latest/examples/attributions.html
 */
const attribution = new Attribution({
  collapsible: false
});

/**
 * Popup
 * https://openlayers.org/en/latest/examples/popup.html?q=overlay
 */
var container = document.getElementById("popup");
var content = document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");
var overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/**
 * The map. Note the use of overlays option for use with
 * popups and the controls option to add the attributions
 * control.
 */
const map = new Map({
  target: "map",
  layers: [basemapLayer, tractLayer],
  view: new View({
    center: [-10440000, 5693000],
    zoom: 6
  }),
  overlays: [overlay],
  controls: defaultControls({
    attribution: false
  }).extend([attribution])
});

/**
 * Attributions setup to collapse if map is small
 */
const checkSize = function() {
  var small = map.getSize()[0] < 600;
  attribution.setCollapsible(small);
  attribution.setCollapsed(small);
};
window.addEventListener("resize", checkSize);
checkSize();

/**
 * Get properties of tracts a WFS source with expected
 * tract_geoid and county_geoid attributes as keys.
 *
 * @param {Object} options
 * @param {string} options.wfsUrl
 * @param {string} options.featurePrefix prefix for feature types, e.g. GeoServer workspace name
 * @param {string} options.featureType features name, e.g. GeoServer layer names; expects only one
 * @param {string[]} options.propertyNames property names to retrieve from layer
 */
const getFeaturePropertiesFromWfs = function(options) {
  const defaultOpts = {
    wfsUrl: "http://149.165.157.200:8080/geoserver/wfs",
    featurePrefix: "solap",
    featureType: "demographics",
    propertyNames: ["total", "male", "female", "person_under_5_years"].concat([
      "tract_geoid",
      "county_geoid"
    ])
  };
  const opts = Object.assign({}, defaultOpts, options);

  // assemble request options
  const featureRequest = new WFS().writeGetFeature({
    srsName: opts.srsName,
    featurePrefix: opts.featurePrefix,
    featureTypes: [opts.featureType],
    propertyNames: opts.propertyNames, // always add the join key
    outputFormat: "application/json"
  });

  fetch(opts.wfsUrl, {
    method: "POST",
    body: new XMLSerializer().serializeToString(featureRequest)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const features = new GeoJSON().readFeatures(json);
      const result = { tracts: {}, counties: {} };
      let featProps;

      // populate tracts
      for (let i = 0; i < features.length; i++) {
        featProps = features[i].getProperties();
        result.tracts[featProps.tract_geoid] = featProps["total"];
      }

      // get unique county geoids
      const countyGeoids = Array.from(
        new Set(Object.keys(result.tracts).map(x => x.slice(0, 5)))
      );

      // zero placeholders for all counties
      for (let i = 0; i < countyGeoids.length; i++) {
        result.counties[countyGeoids[i]] = 0;
      }

      // sum by county
      for (let prop in result.tracts) {
        result.counties[prop.slice(0, 5)] += result.tracts[prop];
      }

      console.log("result :", result);
      alert(
        `Retrieved attributes for ${
          Object.keys(result.tracts).length
        } tracts in ${Object.keys(result.counties).length} counties`
      );
    });
};

// populate additional attributes to an existing vector source
document
  .querySelector(".demo-button-add-attrs")
  .addEventListener("click", function(e) {
    getFeaturePropertiesFromWfs(); // real implementation would need params; these are testOpts in the function def
  });

window.app = {};
app = window.app;
app.map = map;
