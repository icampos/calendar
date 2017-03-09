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

			resetCalendar();

			var initialDate,
			minDate, 
			finalDate,
			diff;


			initialDate = start;
			minDate = initialDate.replace(',', '/');
			finalDate = limitDate(start, days);
			diff = monthDiff(minDate, finalDate);

			$('.result').datepicker("setDate", new Date(initialDate));
			$(".result").datepicker({
				changeYear: false,
				changeMonth: false,
				dateFormat: 'm/d/yy',
				minDate: minDate,
				maxDate: finalDate,
				numberOfMonths: diff
				
			});

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

        monthDiff = function (init, limit) {

        	init = new Date(init);
        	limit = new Date(limit);

        	var numberOfMonths;

        	var date1 = new Date(init);
        	var date2 = new Date(limit);

        	var year1 = date1.getFullYear();
        	var year2 = date2.getFullYear();

        	var month1 = date1.getMonth();
        	var month2 = date2.getMonth();

        	if (month1 === 0) {
        		month1++;
        		month2++;
        	}

        	numberOfMonths = (year2 - year1) * 12 + (month2 - month1) + 1;

        	return numberOfMonths;
        }

        var resetCalendar = function () {
        	$('.result').empty();
        	$('.result').removeClass('hasDatepicker');
        }

        var getHolidays = function (country, year){
        	var holidays = 'https://holidayapi.com/v1/holidays?country=' + country + '&year=' + year + '&key=c2b9ef93-6988-4efc-9f29-334ef7b42af1&public=true&pretty=true';

        	if (year === 2008) {
        		$.getJSON(holidays, function (data, status) {
        			$.each(data.holidays, function (key, val) {
        				$('.holidays').append("<p>" + val[0]['date'] + "-" + val[0]['name'] + "</p>");
        			})
        		}
        	}
        }
        

        return {
        	renderCalendar: renderCalendar,
        	resetCalendar: resetCalendar
        };

    })();

    $('.render').click(function (e) {

    	start = $('#datepicker').val();
    	limit = parseInt($('#days').val());
    	code = $('#country').val();

    	if (!$('#datepicker').val() || !$('#days').val()) {
    		$('.error').css('display', 'block');
    		Calendar.resetCalendar();
    	} else {
    		$('.error').css('display', 'none');
    		Calendar.renderCalendar(start, limit, code);
    	}

    	e.preventDefault();

    });
});