<div ng-app="optinomicApp" ng-controller="MainCtrl" ng-cloak>
    <div ng-controller="AppCtrl">
        <div ng-if="!d.init">
            __opapp_include(../lib/html/optinomic/templates/loading.html)
        </div>
        <div ng-if="d.init">
            <div ng-if="d.haveData" id="top">
