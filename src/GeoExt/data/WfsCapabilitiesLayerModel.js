/*
 * Copyright (c) 2008-2015 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See https://github.com/geoext/geoext2/blob/master/license.txt for the full
 * text of the license.
 */

/*
 * @include GeoExt/data/reader/WfsCapabilities.js
 */

/**
 * The model for WFS layers coming from a WFS GetCapabilities document.
 *
 * @class GeoExt.data.WfsCapabilitiesLayerModel
 */
Ext.define('GeoExt.data.WfsCapabilitiesLayerModel',{
    extend: 'GeoExt.data.LayerModel',
    alternateClassName: [
        'GeoExt.data.WFSCapabilitiesModel',
        'GeoExt.data.WfsCapabilitiesModel'
    ],
    requires: ['GeoExt.data.reader.WfsCapabilities'],
    alias: 'model.gx_wfscapabilities',
    fields: [
        {
            name: "name",
            type: "string",
            mapping: "metadata.name",
            // See `GeoExt.data.LayerModel` for an explanation while we need a
            // mapping and a convert function
            convert: function(v, rec) {
                var key = (GeoExt.isExt4) ? 'raw' : 'data',
                    metadata = rec[key].metadata,
                    converted;
                if (metadata){
                    converted = metadata.name;
                } else if (v) {
                    converted = v;
                }
                return converted;
            }
        },
        {
            name: "namespace",
            type: "string",
            mapping: "metadata.featureNS"
            // TODO should we add a convert function with the same logic as
            // above?
        },
        {
            name: "abstract",
            type: "string",
            mapping: "metadata.abstract"
            // TODO should we add a convert function with the same logic as
            // above?
        }
    ],
    proxy: {
        type: 'ajax',
        reader: {
            type: 'gx_wfscapabilities'
        }
    }
});
