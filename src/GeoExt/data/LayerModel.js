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
            // When using Ext.create to create records, the `mapping` of the
            // fields is ignored, but the convert function is being used. See
            // e.g. here: http://stackoverflow.com/q/20108609/860988
            convert: function(v, rec){
                var key = (GeoExt.isExt4) ? 'raw' : 'data';
                return (rec && rec[key]) ? rec[key].name : undefined;
            }
        },
        {
            name: 'legendURL',
            type: 'string',
            // See the comment for the `title`-field for an explanation why we
            // use a convert-function and not a `mapping`
            convert: function(v, rec) {
                var key = (GeoExt.isExt4) ? 'raw' : 'data';
                if (rec && rec[key] && rec[key].metadata) {
                    return rec[key].metadata.legendURL;
                }
                return undefined;
            }
        },
        {
            name: 'hideTitle',
            type: 'bool',
            // See the comment for the `title`-field for an explanation why we
            // use a convert-function and not a `mapping`
            convert: function(v, rec) {
                var key = (GeoExt.isExt4) ? 'raw' : 'data';
                if (rec && rec[key] && rec[key].metadata) {
                    return rec[key].metadata.hideTitle;
                }
                return undefined;
            }
        },
        {
            name: 'hideInLegend',
            type: 'bool',
            // See the comment for the `title`-field for an explanation why we
            // use a convert-function and not a `mapping`
            convert: function(v, rec) {
                var key = (GeoExt.isExt4) ? 'raw' : 'data';
                if (rec && rec[key] && rec[key].metadata) {
                    return rec[key].metadata.hideInLegend;
                }
                return undefined;
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
