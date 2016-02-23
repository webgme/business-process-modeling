/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/Constants',
    'js/NodePropertyNames',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.DecoratorBase',
    '../Core/BusinessProcessModelingDecorator.Core.js',
    '../Core/BusinessProcessModelingDecorator.Constants',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
    'css!./BusinessProcessModelingDecorator.DiagramDesignerWidget'], function (CONSTANTS,
                                                                               nodePropertyNames,
                                                                               DiagramDesignerWidgetDecoratorBase,
                                                                               BusinessProcessModelingDecoratorCore,
                                                                               BusinessProcessModelingDecoratorConstants,
                                                                               DiagramDesignerWidgetConstants) {
    /**
    * A module representing DiagramDesignerWidget specific functionality for the BusinessProcessModelingModelingLanguage.
    * @exports BusinessProcessModelingDecoratorDiagramDesignerWidget
    * @version 1.0
    */
    var BusinessProcessModelingDecoratorDiagramDesignerWidget,
        DECORATOR_ID = "BusinessProcessModelingDecoratorDiagramDesignerWidget";

    /**
     * Initializes a new instance of BusinessProcessModelingDecoratorDiagramDesignerWidget
     * @param options {object} options for initialization
     * @constructor
     */
    BusinessProcessModelingDecoratorDiagramDesignerWidget = function (options) {
        var opts = _.extend({}, options);

        DiagramDesignerWidgetDecoratorBase.apply(this, [opts]);

        // this widget supports connectors and connections
        this._initializeDecorator({"connectors": true});

        this.logger.debug("BusinessProcessModelingDecoratorDiagramDesignerWidget ctor");
    };

    _.extend(BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype, DiagramDesignerWidgetDecoratorBase.prototype);
    _.extend(BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype, BusinessProcessModelingDecoratorCore.prototype);

    BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DECORATORBASE MEMBERS **************************/

    /**
     * Called when a new element is added to the widget
     */
    BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype.on_addTo = function () {
        this._hideName = true;
        this._renderContent();
    };

    /**
     * Shows all source connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype.showSourceConnectors = function (params) {
        this.logger.debug('showSourceConnectors: ' + JSON.stringify(params));
        this.$sourceConnectors.show();
    };

    /**
     * Hides the source 'connectors' - detaches them from the DOM
     */
    BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype.hideSourceConnectors = function () {
        this.$sourceConnectors.hide();
    };

    /**
     * Shows all end (destination) connectors.
     * @param params {String[]} Registered connector IDs to show.
     */
    BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype.showEndConnectors = function (params) {
        this.logger.debug('showEndConnectors: ' + JSON.stringify(params));

        // TODO: elements from same BusinessProcessModeling domain could be connected
        this.$endConnectors.show();
    };

    /**
     * Hides the end (destination) 'connectors' - detaches them from the DOM
     */
    BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype.hideEndConnectors = function () {
        this.$endConnectors.hide();
    };

    /**
     * Initializes all connectors then hides them.
     */
    BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype.initializeConnectors = function () {

        //find connectors
        this.$sourceConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);
        this.$endConnectors = this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS);

        // hide all connectors by default
        this.hideSourceConnectors();
        this.hideEndConnectors();
    };


    /**** Override from ModelDecoratorCore ****/
    BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype._registerForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype._unregisterForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    BusinessProcessModelingDecoratorDiagramDesignerWidget.prototype.notifyComponentEvent = function (componentList) {
        this.update();
    };

    return BusinessProcessModelingDecoratorDiagramDesignerWidget;
});
