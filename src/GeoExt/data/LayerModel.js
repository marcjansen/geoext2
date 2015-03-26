/*
 * Copyright (c) 2008-2015 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See https://github.com/geoext/geoext2/blob/master/license.txt for the full
 * text of the license.
 */

/*
 * @requires GeoExt/Version.js
 */

/**
 * The layer model class used by the stores.
 *
 * @class GeoExt.data.LayerModel
 */
Ext.define('GeoExt.data.LayerModel',{
    alternateClassName: 'GeoExt.data.LayerRecord',
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'GeoExt.Version'
    ],
    alias: 'model.gx_layer',
    inheritableStatics: {
        /**
         * Convenience function for creating new layer model instance object
         * using a layer object.
         *
         * @param {OpenLayers.Layer} layer
         * @return {GeoExt.data.LayerModel}
         * @static
         */
        createFromLayer: function(layer) {
            return this.getProxy().getReader().readRecords([layer]).records[0];
        }
    },
    fields: [
        'id',
        {
            name: 'title',
            type: 'string',
            mapping: 'name',
            // When using Ext.create to create records, the `mapping` of the
            // fields is ignored, but the convert function is being used. See
            // e.g. here: http://stackoverflow.com/q/20108609/860988
            convert: function(v, rec){
                var key = (GeoExt.isExt4) ? 'raw' : 'data',
                    layer = rec && rec[key] || {},
                    converted;
                if (v){
                    converted = v;
                } else {
                    converted = layer.name;
                }
                // write the converted value back to the layer, so that
                // set('title', 'new title') is reflected in the layer as well
                layer.name = converted;
                return converted;
            }
        },
        {
            name: 'legendURL',
            type: 'string',
            mapping: 'metadata.legendURL',
            // See the comment for the `title`-field for an explanation why we
            // use a convert-function and not a `mapping`
            convert: function(v, rec) {
                var key = (GeoExt.isExt4) ? 'raw' : 'data',
                    converted;
                if (v){
                    converted = v;
                } else if (rec && rec[key] && rec[key].metadata) {
                    converted = rec[key].metadata.legendURL;
                }
                // TODO do we need to write back here as well?
                return converted;
            }
        },
        {
            name: 'hideTitle',
            type: 'bool',
            mapping: 'metadata.hideTitle',
            // See the comment for the `title`-field for an explanation why we
            // use a convert-function and not a `mapping`
            convert: function(v, rec) {
                var key = (GeoExt.isExt4) ? 'raw' : 'data',
                    converted;
                if (v){
                    converted = v;
                } else if (rec && rec[key] && rec[key].metadata) {
                    converted = rec[key].metadata.hideTitle;
                }
                // TODO do we need to write back here as well?
                return converted;
            }
        },
        {
            name: 'hideInLegend',
            type: 'bool',
            mapping: 'metadata.hideInLegend',
            // See the comment for the `title`-field for an explanation why we
            // use a convert-function and not a `mapping`
            convert: function(v, rec) {
                var key = (GeoExt.isExt4) ? 'raw' : 'data',
                    converted;
                if (v){
                    converted = v;
                } else if (rec && rec[key] && rec[key].metadata) {
                    converted = rec[key].metadata.hideInLegend;
                }
                // TODO do we need to write back here as well?
                return converted;
            }
        }
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    /**
     * Returns the {OpenLayers.Layer} layer object used in this model instance.
     *
     * @return {OpenLayers.Layer}
     */
    getLayer: function() {
        return (GeoExt.isExt4) ? this.raw : this.data;
    }
});
