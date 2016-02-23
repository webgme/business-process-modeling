/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/NodePropertyNames',
        './BusinessProcessModelingDecorator.Constants',
        './BusinessProcessModeling.META',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
        'js/Constants'], function (nodePropertyNames,
                                   BusinessProcessModelingDecoratorConstants,
                                   BusinessProcessModelingMETA,
                                   DiagramDesignerWidgetConstants,
                                   CONSTANTS) {

    /**
     * A module representing BusinessProcessModelingBase decorator functionality for the BusinessProcessModelingModelingLanguage.
     * @exports BusinessProcessModelingBase
     * @version 1.0
     */
    var BusinessProcessModelingBase;

    /**
     * Initializes a new instance of BusinessProcessModelingBase.
     * @constructor
     */
    BusinessProcessModelingBase = function () {

    };

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    BusinessProcessModelingBase.prototype._updatePorts = function () {
        var len = 4,
            SVGWidth = parseInt(this.skinParts.$svg.attr('width')),
            SVGHeight = parseInt(this.skinParts.$svg.attr('height')),
            PortWidth = BusinessProcessModelingDecoratorConstants.PORT_WIDTH,
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            META_TYPES = BusinessProcessModelingMETA.getMetaTypes(),
            shiftingRight = BusinessProcessModelingMETA.TYPE_INFO.isDataObject(gmeID) || BusinessProcessModelingMETA.TYPE_INFO.isAnnotation(gmeID),
            shiftingLeft = BusinessProcessModelingMETA.TYPE_INFO.isActivity(gmeID),
            offset = shiftingLeft ? (0 - PortWidth) : (shiftingRight ? PortWidth : 0),
            FIXTURE = this._noName ? 0 : (BusinessProcessModelingDecoratorConstants.NAME_LENGTH-SVGHeight) / 2 + offset;

        // reinitialize the port coordinates with an empty object
        this._connectionAreas = {};    
        this.skinParts.$connectorContainer.empty();

        // positioning the connectors' connection areas
    	// LEFT
    	this._connectionAreas[0] = {
        	"x1": 0 + FIXTURE,
        	"y1": SVGHeight / 2
        }
        // RIGHT
        this._connectionAreas[1] = {
        	"x1": SVGWidth + FIXTURE,
        	"y1": SVGHeight / 2
        }
        // TOP
        this._connectionAreas[2] = {
        	"x1": SVGWidth / 2 + FIXTURE,
        	"y1": 0
        }
        // BOTTOM
        this._connectionAreas[3] = {
        	"x1": SVGWidth / 2 + FIXTURE,
        	"y1": SVGHeight
        }

        while(len--) {

            // render connector
            var connectorE = $('<div/>', {'class': DiagramDesignerWidgetConstants.CONNECTOR_CLASS});

            if (len === 3) {
                connectorE.addClass(BusinessProcessModelingDecoratorConstants.BOTTOM_PORT_CLASS);
            } else if (len === 2) {
                connectorE.addClass(BusinessProcessModelingDecoratorConstants.TOP_PORT_CLASS);
            } else if (len === 1) {
                connectorE.addClass(BusinessProcessModelingDecoratorConstants.RIGHT_PORT_CLASS);
            } else {
                connectorE.addClass(BusinessProcessModelingDecoratorConstants.LEFT_PORT_CLASS);
            }

            connectorE.css({
                    'top': this._connectionAreas[len].y1 - PortWidth,
                    'left': this._connectionAreas[len].x1 - PortWidth
                });

            if (this._displayConnectors) {

                // register connectors for creating connections
                if (this.hostDesignerItem) {
                    this.hostDesignerItem.registerConnectors(connectorE);
                } else {
                    this.logger.error("Decorator's hostDesignerItem is not set");
                }

                this.skinParts.$connectorContainer.append(connectorE);
            }
        }
    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    BusinessProcessModelingBase.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Gets the connection areas for all connectors associated with this object including ports if there is any.
     * @param id {string} GME id of the port, null if connections has to be specified for this object.
     * @param isEnd {boolean} True if id object is the end point of the connection.
     * @param connectionMetaInfo {object} Source object's meta information.
     * @returns {Array} Connection areas to/from connections can be drawn.
     */
    BusinessProcessModelingBase.prototype.getConnectionAreas = function (id/*, isEnd, connectionMetaInfo*/) {

        var result = [],
            LEN = 20, // length of stem that can stick out of the connector before connections can turn 
            ANGLES = [180, 0, 270, 90]; // L, R, T, B

        //by default return the bounding box edges midpoints

        if (id === undefined || id === this.hostDesignerItem.id) {

            for (var i = 0; i < ANGLES.length; i++) {

                result.push( {"id": i,
                    "x1": this._connectionAreas[i].x1, // x's and y's determine the lines where connections can be drawn on
                    "y1": this._connectionAreas[i].y1,
                    "x2": this._connectionAreas[i].x1,
                    "y2": this._connectionAreas[i].y1,
                    "angle1": ANGLES[i], // angles determine from which direction between two angles connections can be drawn
                    "angle2": ANGLES[i],
                    "len": LEN} );
            }    
        }

        return result;
    };

    return BusinessProcessModelingBase;
});
