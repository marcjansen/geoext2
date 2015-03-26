/*
 * Copyright (c) 2008-2015 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See https://github.com/geoext/geoext2/blob/master/license.txt for the full
 * text of the license.
 */

/*
 * @include GeoExt/data/reader/Wmc.js
 */

/**
 * The model for WMS layers coming from a Web Map Context document.
 *
 * @class GeoExt.data.WmcLayerModel
 */
Ext.define('GeoExt.data.WmcLayerModel',{
    extend: 'GeoExt.data.LayerModel',
    alternateClassName: ['GeoExt.data.WMCLayerModel'],
    requires: ['GeoExt.data.reader.Wmc'],
    alias: 'model.gx_wmc',
    fields: [
        {
            name: "name",
            type: "string",
            mapping: "metadata.name",
            // See `GeoExt.data.LayerModel` for an explanation while we need a
            // mapping and a convert function
            convert: function(v, rec) {
                var key = (GeoExt.isExt4) ? 'raw' : 'data',
                    layer = rec[key],
                    metadata = layer.metadata,
                    converted;
                if (metadata){
                    converted = metadata.name;
                } else if (v) {
                    converted = v;
                }
                return converted;
            }
        },
        {name: "abstract", type: "string", mapping: "metadata.abstract"},
        {name: "metadataURL", type: "string", mapping: "metadata.metadataURL"},
        {name: "queryable", type: "boolean", mapping: "metadata.queryable"},
        {name: "formats", mapping: "metadata.formats"}, // array
        {name: "styles", mapping: "metadata.styles"} // array
    ],
    proxy: {
        type: 'ajax',
        reader: {
            type: 'gx_wmc'
        }
    }
});
