$(document).ready(function () {

	var Calendar = (function () {

		$("#datepicker").datepicker({
			changeYear: true,
			changeMonth: true
		});

	})();

	var startDate = function () {
		date = $('#datepicker').val();
		return date;

	}

});