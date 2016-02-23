/* globals define, _, WebGMEGlobal */
/* jshint browser: true */
/**
 * @author zhangpn / https://github.com/zhangpn
 */

define(['underscore'], function (_underscore) {
    'use strict';

    var _metaID = 'BusinessProcessModeling.META.js',

        //META ASPECT TYPES
        META_TYPES = {
            'Activity': 'Activity',
            'Annotation': 'Annotation',
            'Artifact': 'Artifact',
            'Artifact2Activity': 'Artifact2Activity',
            'BPMFolder': 'BPMFolder',
            'BPMMetaLanguage': 'BPMMetaLanguage',
            'BPModel': 'BPModel',
            'CallActivity': 'CallActivity',
            'Complex': 'Complex',
            'Conditional': 'Conditional',
            'ConnectionBase': 'ConnectionBase',
            'DataObject': 'DataObject',
            'EndEvent': 'EndEvent',
            'Event': 'Event',
            'EventBased': 'EventBased',
            'Event_Activity': 'Event_Activity',
            'Exclusive': 'Exclusive',
            'ExclusiveEventBased': 'ExclusiveEventBased',
            'FCO': 'FCO',
            'Gateway': 'Gateway',
            'Gateway2Event': 'Gateway2Event',
            'Gateway_Activity': 'Gateway_Activity',
            'Group': 'Group',
            'Inclusive': 'Inclusive',
            'Intermediate2Gateway': 'Intermediate2Gateway',
            'IntermediateEvent': 'IntermediateEvent',
            'Lane': 'Lane',
            'Parallel': 'Parallel',
            'ParallelEventBased': 'ParallelEventBased',
            'Pool': 'Pool',
            'Sequential': 'Sequential',
            'StartEvent': 'StartEvent',
            'SubProcess': 'SubProcess',
            'Task': 'Task',
            'Transaction': 'Transaction'
        },
        client = WebGMEGlobal.Client;

    function _getMetaTypes() {
        var metaNodes = client.getAllMetaNodes(),
            dictionary = {},
            i,
            name;

        for (i = 0; i < metaNodes.length; i += 1) {
            name = metaNodes[i].getAttribute('name');
            if (META_TYPES[name]) {
                dictionary[name] = metaNodes[i].getId();
            }
        }

        return dictionary;
    }
    function _getMetaTypesOf(objId) {
        var orderedMetaList = Object.keys(META_TYPES).sort(),
            metaDictionary = _getMetaTypes(),
            i,
            result = [];

        for (i = 0; i < orderedMetaList.length; i += 1) {
            if (client.isTypeOf(objId, metaDictionary[orderedMetaList[i]])) {
                result.push(orderedMetaList[i]);
            }
        }

        return result;
    }

    //META ASPECT TYPE CHECKING
    var _isActivity = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Activity]);};
	var _isAnnotation = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Annotation]);};
	var _isArtifact = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Artifact]);};
	var _isArtifact2Activity = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Artifact2Activity]);};
	var _isBPMFolder = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.BPMFolder]);};
	var _isBPMMetaLanguage = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.BPMMetaLanguage]);};
	var _isBPModel = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.BPModel]);};
	var _isCallActivity = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.CallActivity]);};
	var _isComplex = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Complex]);};
	var _isConditional = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Conditional]);};
	var _isConnectionBase = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ConnectionBase]);};
	var _isDataObject = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.DataObject]);};
	var _isEndEvent = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.EndEvent]);};
	var _isEvent = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Event]);};
	var _isEventBased = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.EventBased]);};
	var _isEvent_Activity = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Event_Activity]);};
	var _isExclusive = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Exclusive]);};
	var _isExclusiveEventBased = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ExclusiveEventBased]);};
	var _isFCO = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.FCO]);};
	var _isGateway = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Gateway]);};
	var _isGateway2Event = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Gateway2Event]);};
	var _isGateway_Activity = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Gateway_Activity]);};
	var _isGroup = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Group]);};
	var _isInclusive = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Inclusive]);};
	var _isIntermediate2Gateway = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Intermediate2Gateway]);};
	var _isIntermediateEvent = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.IntermediateEvent]);};
	var _isLane = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Lane]);};
	var _isParallel = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Parallel]);};
	var _isParallelEventBased = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ParallelEventBased]);};
	var _isPool = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Pool]);};
	var _isSequential = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Sequential]);};
	var _isStartEvent = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.StartEvent]);};
	var _isSubProcess = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.SubProcess]);};
	var _isTask = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Task]);};
	var _isTransaction = function (objID) { return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Transaction]);};
	

    //return utility functions
    return {
        getMetaTypes: _getMetaTypes,
        getMetaTypesOf: _getMetaTypesOf,
        TYPE_INFO: {
			isActivity: _isActivity,
			isAnnotation: _isAnnotation,
			isArtifact: _isArtifact,
			isArtifact2Activity: _isArtifact2Activity,
			isBPMFolder: _isBPMFolder,
			isBPMMetaLanguage: _isBPMMetaLanguage,
			isBPModel: _isBPModel,
			isCallActivity: _isCallActivity,
			isComplex: _isComplex,
			isConditional: _isConditional,
			isConnectionBase: _isConnectionBase,
			isDataObject: _isDataObject,
			isEndEvent: _isEndEvent,
			isEvent: _isEvent,
			isEventBased: _isEventBased,
			isEvent_Activity: _isEvent_Activity,
			isExclusive: _isExclusive,
			isExclusiveEventBased: _isExclusiveEventBased,
			isFCO: _isFCO,
			isGateway: _isGateway,
			isGateway2Event: _isGateway2Event,
			isGateway_Activity: _isGateway_Activity,
			isGroup: _isGroup,
			isInclusive: _isInclusive,
			isIntermediate2Gateway: _isIntermediate2Gateway,
			isIntermediateEvent: _isIntermediateEvent,
			isLane: _isLane,
			isParallel: _isParallel,
			isParallelEventBased: _isParallelEventBased,
			isPool: _isPool,
			isSequential: _isSequential,
			isStartEvent: _isStartEvent,
			isSubProcess: _isSubProcess,
			isTask: _isTask,
			isTransaction: _isTransaction
		}
    };
});