$(document).ready(function () {

	var Calendar = (function () {

		$("#datepicker").datepicker({
			changeYear: true,
			changeMonth: true,
			dateFormat: 'm/d/yy'
		});

		var startDate = function () {
			date = $('#datepicker').val();
			return date;

		}

		var renderCalendar = function (start, days, code) {

			var initialDate,
			minDate

			initialDate = start;
			minDate = initialDate.replace(',', '/');
		

			$('.result').datepicker("setDate", new Date(initialDate));
			$(".result").datepicker({
				changeYear: false,
				changeMonth: false,
				dateFormat: 'm/d/yy',
				minDate: minDate,
				
			});

		};

		return {
			renderCalendar: renderCalendar
		};

	})();
	$('.render').click(function (e) {

		start = $('#datepicker').val();
		limit = parseInt($('#days').val());
		code = $('#country').val();

		Calendar.renderCalendar(start, limit, code);
		

		e.preventDefault();

	});
});