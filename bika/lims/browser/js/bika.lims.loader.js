/**
 * Dictionary of JS objects to be loaded at runtime.
 * The key is the DOM element to look for in the current page. The
 * values are the JS objects to be loaded if a match is found in the
 * page for the specified key. The loader initializes the JS objects
 * following the order of the dictionary.
 */
window.bika.lims.controllers =  {

    // JS objects to be loaded always
    "body":
        ['SiteView',
         'CalculationEvents'],

    // JS objects to be loaded on specific views or pages
    "table.bika-listing-table":
        ['BikaListingTableView'],

    ".template-base_edit.portaltype-method":
        ['MethodEditView'],

    ".template-base_edit.portaltype-analysisservice":
        ['AnalysisServiceEditView'],

    ".template-base_edit.portaltype-instrumentcertification":
        ['InstrumentCertificationEditView'],

    ".template-base_edit.portaltype-bikasetup":
        ['BikaSetupEditView'],

    "#ar_publish_container":
        ['AnalysisRequestPublishView'],

    ".template-base_edit.portaltype-artemplate":
        ['ARTemplateEditView'],

    ".template-base_edit.portaltype-client":
        ['ClientEditView'],

    ".template-referenceanalyses.portaltype-instrument":
        ['InstrumentReferenceAnalysesView'],

    ".template-analyses.portaltype-referencesample":
        ['ReferenceSampleAnalysesView'],

    ".portaltype-analysisrequest":
        ['SampleView'],

    ".portaltype-sample":
        ['SampleView'],

    ".template-manage_results.portaltype-analysisrequest":
        ['AnalysisRequestManageResultsView'],

    ".template-base_view.portaltype-analysisrequest":
        ['AnalysisRequestViewView'],

    ".template-analyses.portaltype-analysisrequest":
        ['AnalysisRequestAnalysesView'],

    ".template-arimport_view.portaltype-arimport":
        ['AnalysisRequestImportView'],

    ".template-base_edit.portaltype-arimport":
        ['AnalysisRequestImportView'],

    ".template-base_edit.portaltype-supplyorder":
        ['SupplyOrderEditView'],

    ".template-import.portaltype-plone-site":
        ['InstrumentImportView'],

    // Add here your view-controller/s assignment

};



/**
 * Initializes only the js controllers needed for the current view.
 * Initializes the JS objects from the controllers dictionary for which
 * there is at least one match with the dict key. The JS objects are
 * loaded in the same order as defined in the controllers dict.
 */
window.bika.lims.initview = function() {
    var loaded = new Array();
    var controllers = window.bika.lims.controllers;
    for (var key in controllers) {
        if ($(key).length) {
            controllers[key].forEach(function(js) {
                if ($.inArray(js, loaded) < 0) {
                    console.debug('[bika.lims.loader] Loading '+js);
                    try {
                        obj = new window[js]();
                        obj.load();
                        loaded.push(js);
                    } catch (e) {
                       // statements to handle any exceptions
                       console.warn('[bika.lims.loader] Unable to load '+js+": "+ e.message);
                    }
                }
            });
        }
    }
    return loaded.length;
};

/**
 * Initializes all bika.lims js stuff
 */
window.bika.lims.initialize = function() {
    return window.bika.lims.initview();
};


(function( $ ) {
$(document).ready(function(){

    // Initializes bika.lims
    window.bika.lims.initialize();

});
}(jQuery));
