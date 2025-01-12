	jQuery(function ($) {
	    "use strict";
	    $('form#wrapped').attr('action', 'reservavuelo.inc.php');
	    $("#wizard_container").wizard({
	        stepsWrapper: "#wrapped",
	        submit: ".submit",
	        beforeSelect: function (event, state) {
	            if ($('input#website').val().length != 0) {
	                return false;
	            }
	            if (!state.isMovingForward)
	                return true;
	            var inputs = $(this).wizard('state').step.find(':input');
	            return !inputs.length || !!inputs.valid();
	        }
	    }).validate({
	        errorPlacement: function (error, element) {
	            if (element.is(':radio')) {
	                error.insertBefore(element.next());
	            } else {
	                error.insertAfter(element);
	            }
	        }
	    });
	    //  progress bar
	    $("#progressbar").progressbar();
	    $("#wizard_container").wizard({
	        afterSelect: function (event, state) {
	            $("#progressbar").progressbar("value", state.percentComplete);
	            $("#location").text("(" + state.stepsComplete + "/" + state.stepsPossible + ")");
	        }
	    });
	    //  date picker
	    $('input[name="dates"]').daterangepicker({
	        autoUpdateInput: false,
	        "opens": "left",
	        locale: {
	            cancelLabel: 'Cancelar'
	        }
	    });
	    $('input[name="dates"]').on('apply.daterangepicker', function (ev, picker) {
	        $(this).val(picker.startDate.format('DD-MM-YY') + ' > ' + picker.endDate.format('DD-MM-YY'));
	    });
	    $('input[name="dates"]').on('cancel.daterangepicker', function (ev, picker) {
	        $(this).val('');
	    });
	});
