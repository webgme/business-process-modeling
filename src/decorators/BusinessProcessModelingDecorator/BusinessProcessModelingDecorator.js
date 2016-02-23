/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 * 
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/Decorators/DecoratorBase',
    './DiagramDesigner/BusinessProcessModelingDecorator.DiagramDesignerWidget',
    './PartBrowser/BusinessProcessModelingDecorator.PartBrowserWidget'], function (
                                                           DecoratorBase,
                                                           BusinessProcessModelingDecoratorDiagramDesignerWidget,
                                                           BusinessProcessModelingDecoratorPartBrowserWidget) {

    /**
    * A module representing a decorator for the PN Modeling Language.
    * @exports BusinessProcessModelingDecorator
    * @version 1.0
    */
    var BusinessProcessModelingDecorator,
        __parent__ = DecoratorBase,
        __parent_proto__ = DecoratorBase.prototype,
        DECORATOR_ID = "BusinessProcessModelingDecorator";

    /**
     * Represents a BusinessProcessModelingDecorator factory.
     * @constructor
     * @param {object} params Parameters for this object.
     */
    BusinessProcessModelingDecorator = function (params) {
        var opts = _.extend( {"loggerName": this.DECORATORID}, params);

        __parent__.apply(this, [opts]);

        this.logger.debug("BusinessProcessModelingDecorator ctor");
    };

    _.extend(BusinessProcessModelingDecorator.prototype, __parent_proto__);
    BusinessProcessModelingDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    /**
     * Initializes the supported widget map for this decorator.
     *
     * @see BusinessProcessModelingDecoratorDiagramDesignerWidget:BusinessProcessModelingDecoratorDiagramDesignerWidget
     * @see BusinessProcessModelingDecoratorPartBrowserWidget:BusinessProcessModelingDecoratorPartBrowserWidget
     */
    BusinessProcessModelingDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {'DiagramDesigner': BusinessProcessModelingDecoratorDiagramDesignerWidget,
                                   'PartBrowser': BusinessProcessModelingDecoratorPartBrowserWidget};
    };

    return BusinessProcessModelingDecorator;
});
