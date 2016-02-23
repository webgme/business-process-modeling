/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/Constants',
    'js/NodePropertyNames',
    'js/Widgets/PartBrowser/PartBrowserWidget.DecoratorBase',
    '../Core/BusinessProcessModelingDecorator.Core.js',
    'css!./BusinessProcessModelingDecorator.PartBrowserWidget'], function (CONSTANTS,
                                                       nodePropertyNames,
                                                       PartBrowserWidgetDecoratorBase,
                                                       BusinessProcessModelingDecoratorCore) {

    /**
     * A module representing PartBrowserWidget specific functionality for the BusinessProcessModelingModelingLanguage.
     * @exports BusinessProcessModelingDecoratorPartBrowserWidget
     * @version 1.0
     */
    var BusinessProcessModelingDecoratorPartBrowserWidget,
        DECORATOR_ID = "BusinessProcessModelingDecoratorPartBrowserWidget";

    /**
     * Initializes a new instance of BusinessProcessModelingDecoratorPartBrowserWidget
     * @param options {object} options for initialization
     * @constructor
     */
    BusinessProcessModelingDecoratorPartBrowserWidget = function (options) {
        var opts = _.extend( {}, options);

        PartBrowserWidgetDecoratorBase.apply(this, [opts]);

        // Part browser widget does not support creating connections therefore do not render connectors
        this._initializeDecorator({"connectors": false});

        this.logger.debug("BusinessProcessModelingDecoratorPartBrowserWidget ctor");
    };


    /************************ INHERITANCE *********************/
    _.extend(BusinessProcessModelingDecoratorPartBrowserWidget.prototype, PartBrowserWidgetDecoratorBase.prototype);
    _.extend(BusinessProcessModelingDecoratorPartBrowserWidget.prototype, BusinessProcessModelingDecoratorCore.prototype);


    /**************** OVERRIDE INHERITED / EXTEND ****************/

    /**** Override from PartBrowserWidgetDecoratorBase ****/
    BusinessProcessModelingDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;

    /**
     * Called before appending the element to the part browser. Renders content for the part browser.
     */
    BusinessProcessModelingDecoratorPartBrowserWidget.prototype.beforeAppend = function () {
        this.$el = this.$DOMBase.clone();
        this._hideName = false;
        this._renderContent();
    };


    /**
     * Called after element is appended to the part browser. Currently this method does nothing.
     */
    BusinessProcessModelingDecoratorPartBrowserWidget.prototype.afterAppend = function () {

    };


    /**** Override from ModelDecoratorCore ****/
    BusinessProcessModelingDecoratorPartBrowserWidget.prototype._registerForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.registerComponentIDForPartID(portId, partId);
    };


    /**** Override from ModelDecoratorCore ****/
    BusinessProcessModelingDecoratorPartBrowserWidget.prototype._unregisterForNotification = function (portId) {
        var partId = this._metaInfo[CONSTANTS.GME_ID];

        this._control.unregisterComponentIDFromPartID(portId, partId);
    };

    return BusinessProcessModelingDecoratorPartBrowserWidget;
});