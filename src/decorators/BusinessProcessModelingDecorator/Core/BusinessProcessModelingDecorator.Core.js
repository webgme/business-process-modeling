/*
 * Copyright (C) 2013-2014 Vanderbilt University, All rights reserved.
 *
 * Author:
 * Peng Zhang
 */

"use strict";

define(['js/Constants',
    './BusinessProcessModelingDecorator.Constants',
    'js/NodePropertyNames',
    'js/RegistryKeys',
    './BusinessProcessModelingBase',
    './BusinessProcessModeling.META',
    'text!./BusinessProcessModelingDecorator.html',
    'text!../default.svg'], function (CONSTANTS,
                                      BPMDConstants,
                                      nodePropertyNames,
                                      REGISTRY_KEYS,
                                      BusinessProcessModelingBase,
                                      BusinessProcessModelingMETA,
                                      BusinessProcessModelingDecoratorTemplate,
                                      DefaultSvgTemplate) {

    /**
    * A module representing core decorator functionality for the BusinessProcessModelingModelingLanguage.
    * @exports BusinessProcessModelingDecoratorCore
    * @version 1.0
    */
    var BusinessProcessModelingDecoratorCore,
        SVG_ICON_PATH = "/decorators/BusinessProcessModelingDecorator/Icons/";

    /**
     * Contains downloaded svg elements from the server.
     * @type {{}}
     * @private
     */
    var svgCache = {};

    /**
     * Svg element that can be used as a placeholder for the icon if the icon does not exist on the server.
     * @type {*|jQuery|HTMLElement}
     * @private
     */
    var errorSVGBase = $(DefaultSvgTemplate);

    /**
     * ID list of meta types.
     * @type {*}
     * @private
     */
    if(Object.keys(svgCache || {}).length === 0){
        var _metaAspectTypes = BusinessProcessModelingMETA.getMetaTypes();

        for (var m in _metaAspectTypes) {

            if (_metaAspectTypes.hasOwnProperty(m)) {

                // get the svg's url on the server for this META type
                var svg_resource_url = SVG_ICON_PATH + m + ".svg";

                // get the svg from the server in SYNC mode, may take some time
                $.ajax(svg_resource_url, {'async': false})
                    .done(function (data) {

                        // TODO: console.debug('Successfully downloaded: ' + svg_resource_url + ' for ' + metaType);
                        // downloaded successfully
                        // cache the downloaded content
                        svgCache[m] = $(data.childNodes[0]);
                    })
                    .fail(function () {

                        // download failed for this type
                        // TODO: console.warning('Failed to download: ' + svg_resource_url);
                    });
            }
        }
    }

    /**
     * Creates a new instance of BusinessProcessModelingDecoratorCore.
     * @constructor
     */
    BusinessProcessModelingDecoratorCore = function () {
    };

    /**
     * Represents the base element that would be inserted into the DOM.
     */
    BusinessProcessModelingDecoratorCore.prototype.$DOMBase = (function () {
        var el = $(BusinessProcessModelingDecoratorTemplate);
        //use the same HTML template as the DefaultDecorator.DiagramDesignerWidget
        //but remove the connector DOM elements since they are not needed in the PartBrowser
        //el.find('div.name').remove();
        return el;
    })();

    /**** Override from *.WidgetDecoratorBase ****/
	BusinessProcessModelingDecoratorCore.prototype.getTerritoryQuery = function () {
        var territoryRule = {};

        territoryRule[this._metaInfo[CONSTANTS.GME_ID]] = { "children": 1 };

        return territoryRule;
    };

    /**
     * Initializes decorator.
     * @param params {object}  parameters for initialization
     * @param params.connectors {boolean} True if connectors have to be rendered otherwise false.
     * @private
     */
    BusinessProcessModelingDecoratorCore.prototype._initializeDecorator = function (params) {
        this.$name = undefined;

        this._displayConnectors = false;
        if (params && params.connectors) {
            this._displayConnectors = params.connectors;
        }
    };

    /**
     * Downloads and caches the svg files for a given METAType based on a gmeID
     * @param gmeID {string} An ID of the GME object.
     * @returns {*|jQuery|HTMLElement} SVG element that should be displayed.
     */
    BusinessProcessModelingDecoratorCore.prototype.getSVGByMetaType = function (gmeID) {

        // define local variables
        var BusinessProcessModelingClassNames,
            BusinessProcessModelingClassName,
            returnSVG,
            len;

        // get all META types for the given GME object including inheritance in the meta model
        BusinessProcessModelingClassNames = BusinessProcessModelingMETA.getMetaTypesOf(gmeID);

        // reverse the list since the iteration is backwards in the while loop
        BusinessProcessModelingClassNames.reverse();

        // length of the list on which the iteration is performed
        len = BusinessProcessModelingClassNames.length;



        
        // iterate through the list from the last element to the first one
        while (len--) {
            // get current the META type name
            BusinessProcessModelingClassName = BusinessProcessModelingClassNames[len];

            if (BusinessProcessModelingClassName === undefined || BusinessProcessModelingClassName === null || BusinessProcessModelingClassName === "") {

                // if the META type name is invalid return with an error SVG
                returnSVG = errorSVGBase.clone();

            } else {

                // META type name is valid
                if (svgCache[BusinessProcessModelingClassName]) {

                    // if META type name is already in the cache use the cached value
                    // do NOT download again from the server

                    returnSVG = svgCache[BusinessProcessModelingClassName].clone();
                }
            }
        }

        if (returnSVG === undefined) {

            // if svg is not defined use the default error svg
            returnSVG = errorSVGBase.clone();
        }

        return returnSVG;
    };

    /**
     * Gets a clone of an error svg icon.
     * @returns {*|jQuery|HTMLElement} Error svg icon.
     */
    BusinessProcessModelingDecoratorCore.prototype.getErrorSVG = function () {

        return this._errorSVGBase.clone();
    };

    /**
     * @todo Not implemented yet.
     * @param searchDesc {string} Search description or query.
     * @returns {boolean} True if this object satisfies the search condition.
     */
    BusinessProcessModelingDecoratorCore.prototype.doSearch = function (searchDesc) {

        //TODO: correct implementation needed
        return false;
    };

    /**
     * Renders the content in the placeholder DOM element.
     * @private
     */
    BusinessProcessModelingDecoratorCore.prototype._renderContent = function () {

        // gme id of the rendered object
        var gmeID = this._metaInfo[CONSTANTS.GME_ID];

                // get domain specific knowledge
        var META_TYPES = BusinessProcessModelingMETA.getMetaTypes(),
            isTypeGateway = BusinessProcessModelingMETA.TYPE_INFO.isGateway(gmeID),
            isTypeConditional = BusinessProcessModelingMETA.TYPE_INFO.isConditional(gmeID),
            isTypeSequential = BusinessProcessModelingMETA.TYPE_INFO.isSequential(gmeID),
            isTypeEvent = BusinessProcessModelingMETA.TYPE_INFO.isEvent(gmeID),
            isTypeActivity = BusinessProcessModelingMETA.TYPE_INFO.isActivity(gmeID),
            isTypeArtifact = BusinessProcessModelingMETA.TYPE_INFO.isArtifact(gmeID),
            isTypeAnnotation = BusinessProcessModelingMETA.TYPE_INFO.isAnnotation(gmeID),
            isAbstract = gmeID === META_TYPES.Conditional || gmeID === META_TYPES.Sequential || gmeID === META_TYPES.Event || gmeID === META_TYPES.Activity || gmeID === META_TYPES.Artifact;


        // meta type of the rendered object
        this._metaType = BusinessProcessModelingMETA.getMetaTypesOf(gmeID)[0];

        if (DEBUG) {

            //render GME-ID in the DOM, for debugging
            this.$el.attr({"data-id": gmeID});
        }

        // setting the name of component
        this.skinParts.$name = this.$el.find(".name");

        // if (isTypeAnnotation) {

        // 	this.$el.find('.svg-container').remove();
        // 	this.skinParts.$desc = this.$el.find('.description');
        // 	this.skinParts.$desc.css('background-color', '#F7EFEF');
        // 	this.skinParts.$desc.css('border-left', '2px solid black');
        // 	this.skinParts.$desc.css('padding', 5);

        // 	var borderClass = $('<div/>', {'class':'border-holder'});
        // 	borderClass.css('height', 80);
        // 	borderClass.css('width', 90);
        // 	borderClass.css('border-top', '2px solid black');

        // }

        //empty out SVG container
        this.$el.find('.svg-container').empty();

        //figure out the necessary SVG based on children type
        this.skinParts.$svg = this.getSVGByMetaType(gmeID);

        if (this.skinParts.$svg) {

            //this.skinParts.$svg.append(this._BusinessProcessModelingDecoratorCore.getPortSVG());
            this.$el.find('.svg-container').append(this.skinParts.$svg);

            //render the connectors
            this.skinParts.$connectorContainer = this.$el.find('.connector-container');
            this.skinParts.$connectorContainer.empty();

        } else {

            // append error svg if the svg does not exist for this element
            this.$el.find('.svg-container').append(this.getErrorSVG());
        }

        if ((isTypeArtifact || isTypeActivity || isTypeEvent || isTypeSequential || isTypeConditional) && !isAbstract) { 

        	_.extend(this, new BusinessProcessModelingBase());
        }
        
        // call the type specific renderer
        this._renderMetaTypeSpecificParts();

        // update the rendered object
        this.update();
    };


    /**
     * Updates the rendered object. This function is called by the Widget.
     */
    BusinessProcessModelingDecoratorCore.prototype.update = function () {

        // internal update function
        this._update();

        if (this._displayConnectors) {

            // initializes the connectors if they have to be displayed.
            this.initializeConnectors();
        }
    };

    /**
     * Updates the rendered object.
     * @private
     */
    BusinessProcessModelingDecoratorCore.prototype._update = function () {

        // update name of the rendered object
        this._updateColors();
        this._updateName();
        this._updatePorts();
    };

    BusinessProcessModelingDecoratorCore.prototype._updateColors = function () {
        this._getNodeColorsFromRegistry();

        if (this.fillColor) {
            this.skinParts.$svg.find('rect').attr('fill', this.fillColor);
            this.skinParts.$svg.find('ellipse').attr('fill', this.fillColor);
        } else {
            this.$el.css({'background-color': ''});
        }

        if (this.borderColor) {
            this.$el.css({'border-color': this.borderColor,
                          'box-shadow': '0px 0px 7px 0px ' + this.borderColor + ' inset'});
            this.skinParts.$name.css({'border-color': this.borderColor});
        } else {
            this.$el.css({'border-color': '',
                'box-shadow': ''});
            this.skinParts.$name.css({'border-color': ''});
        }

        if (this.textColor) {
            this.$el.css({'color': this.textColor});
        } else {
            this.$el.css({'color': ''});
        }
    };

    BusinessProcessModelingDecoratorCore.prototype._getNodeColorsFromRegistry = function () {
        var objID = this._metaInfo[CONSTANTS.GME_ID];
        this.fillColor = this.preferencesHelper.getRegistry(objID, REGISTRY_KEYS.COLOR, true);
        this.borderColor = this.preferencesHelper.getRegistry(objID, REGISTRY_KEYS.BORDER_COLOR, true);
        this.textColor = this.preferencesHelper.getRegistry(objID, REGISTRY_KEYS.TEXT_COLOR, true);
    };

    /**
     * Updates the name of the rendered object.
     * @private
     */
    BusinessProcessModelingDecoratorCore.prototype._updateName = function () {

        // initialize local variables
        var control = this._control,
            gmeID = this._metaInfo[CONSTANTS.GME_ID],
            name = (control._client.getNode(gmeID)).getAttribute(nodePropertyNames.Attributes.name),
            desc = control._client.getNode(gmeID).getAttribute(BPMDConstants.DESC),    
            META_TYPES = BusinessProcessModelingMETA.getMetaTypes(),
            isTypeConditional = BusinessProcessModelingMETA.TYPE_INFO.isConditional(gmeID),
            isTypeIntermediateEvent = BusinessProcessModelingMETA.TYPE_INFO.isIntermediateEvent(gmeID),
            isTypeSequential = BusinessProcessModelingMETA.TYPE_INFO.isSequential(gmeID),
            isTypeEvent = BusinessProcessModelingMETA.TYPE_INFO.isEvent(gmeID),
            isTypeActivity = BusinessProcessModelingMETA.TYPE_INFO.isActivity(gmeID),
            isTypeArtifact = BusinessProcessModelingMETA.TYPE_INFO.isArtifact(gmeID),
            isTypePool = BusinessProcessModelingMETA.TYPE_INFO.isPool(gmeID),
            isTypeLane = BusinessProcessModelingMETA.TYPE_INFO.isLane(gmeID),
            isAbstract = gmeID === META_TYPES.Conditional || gmeID === META_TYPES.Sequential || gmeID === META_TYPES.Event || gmeID === META_TYPES.Activity || gmeID === META_TYPES.Artifact,
            isNonAbstract = !isAbstract && (isTypeArtifact || isTypeLane || isTypePool || isTypeActivity || isTypeEvent || isTypeConditional || isTypeSequential);


        var isTypeGateway = BusinessProcessModelingMETA.TYPE_INFO.isGateway(gmeID),
            isTypeDataObject = BusinessProcessModelingMETA.TYPE_INFO.isDataObject(gmeID),
            marginTop = isTypeDataObject ? 25 : 0,
            maxHeight = isTypeDataObject ? 54 : 80;

            // updating description of tasks/artifacts in the center of elements
            this.skinParts.$desc = this.$el.find('.description');

            if ((isTypeActivity | isTypeArtifact) && isTypeIntermediateEvent !== true) {

                if (isTypeArtifact) {

                    this.skinParts.$desc.css('height', maxHeight);
                    this.skinParts.$desc.css('margin-top', marginTop);
                }

                if (this.skinParts.$desc) {

                    this.skinParts.$desc.text(desc);
                }

            } else {

                this.skinParts.$desc.remove();
            }

        if (this.skinParts.$name) {

            // if type is gateway, set name to desc
            if (isTypeGateway || isTypeIntermediateEvent) {

                if (desc) {

                    this.skinParts.$name[0].className = "gateway-description";
                    this.skinParts.$name.text(desc);
                    
                } else {

                    var name_written = this._hideName ? "" : name;
                    this.skinParts.$name.text(name_written);
                }

            } else if (name.indexOf('!') == 0) {

                // if name startswith '!' that means the text has to have an overline
                this.skinParts.$name.text(name.slice(1));
                this.skinParts.$name.css('text-decoration', 'overline');

            } else {

                // normal text
                this.skinParts.$name.text(name);
                this.skinParts.$name.css('text-decoration', 'none');
            }

            if (!this._hideName) return;

            if (isNonAbstract && !isTypeIntermediateEvent && (isTypeActivity || isTypeArtifact || isTypeEvent)) {

                this.skinParts.$name.hide();
                this._noName = true;

            } else if (isNonAbstract) {

                var WIDTH = BPMDConstants.NAME_LENGTH;           
                this.skinParts.$name.css('width', WIDTH);
                this._noName = false;
            }
        }
    };

    /* TO BE OVERRIDDEN IN META TYPE SPECIFIC CODE */

    /**
     * Renders and updates the ports for this object.
     * @private
     */
    BusinessProcessModelingDecoratorCore.prototype._updatePorts = function () {

    };

    /**
     * Renders the object based on the meta type.
     * @private
     */
    BusinessProcessModelingDecoratorCore.prototype._renderMetaTypeSpecificParts = function () {

    };

    /**
     * Registers a GME ID for notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    BusinessProcessModelingDecoratorCore.prototype._registerForNotification = function(portId) {

    };

    /**
     * Unregisters a GME ID from the event notifications.
     * @param portId {string} GME ID for getting notification about this object.
     * @private
     */
    BusinessProcessModelingDecoratorCore.prototype._unregisterForNotification = function(portId) {

    };


    return BusinessProcessModelingDecoratorCore;
});
