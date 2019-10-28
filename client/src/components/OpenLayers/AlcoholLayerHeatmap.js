import ImageWMS from 'ol/source/ImageWMS'
import { Image } from 'ol/layer'
export default new Image({
  source: new ImageWMS({
    url: 'http://149.165.157.200:8080/geoserver/wms',
    params: { LAYERS: 'solap:alcohol_outlet', STYLES: 'heatmap' },
    ratio: 1,
    serverType: 'geoserver'
  })
})
