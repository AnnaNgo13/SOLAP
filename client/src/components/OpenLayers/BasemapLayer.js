/**
 * CARTO Voyager basemap
 */
import { Tile as TileLayer } from "ol/layer";
import { XYZ } from "ol/source";

export default new TileLayer({
  name: "tiledBasemap",
  source: new XYZ({
    url:
      "https://{1-4}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
    attributions:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attribution/">CartoDB</a>'
  })
});
