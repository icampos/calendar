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
				minDate, 
				finalDate;

			initialDate = start;
			minDate = initialDate.replace(',', '/');
			finalDate = limitDate(start, days);
		

			$('.result').datepicker("setDate", new Date(initialDate));
			$(".result").datepicker({
				changeYear: false,
				changeMonth: false,
				dateFormat: 'm/d/yy',
				minDate: minDate,
                maxDate: finalDate,
				
			});

			$('.result').datepicker("setDate", new Date());

		};

		var limitDate = function (initial, limit) {

            var initial,
                newInitial,
                limit,
                resultDate;

            //Format initial date
            initial = new Date(initial);

            initial.setDate(initial.getDate() + limit);

            var dd = initial.getDate();
            var mm = initial.getMonth() + 1;
            var y = initial.getFullYear();

            resultDate = mm + '/' + dd + '/' + y;

            return resultDate;
        }

		return {
			renderCalendar: renderCalendar
		};

	})();
	
	$('.render').click(function (e) {

		start = $('#datepicker').val();
		limit = parseInt($('#days').val());
		code = $('#country').val();

		console.log(start+" "+limit);

		Calendar.renderCalendar(start, limit, code);
		

		e.preventDefault();

	});
});