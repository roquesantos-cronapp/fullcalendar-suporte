(function($app) {
	angular.module('custom.services', []);

	app.service('calendar', function() {
		var c = $('#calendar');
		
		var events = [
		  { title: 'Valter - Viegas - Rossana', start: '2018-11-08' },
		  { title: 'Igor - Alex - Rossana', start: '2018-11-08' },
		  { title: 'Valter - Ivan - Rossana', start: '2018-11-08' },
		  { title: 'Orlando - Samuel - David', start: '2018-11-19' },
		  { title: 'Gabriela - Priscila - Hosana', start: '2018-11-19' },
		  { title: 'Silvia - Irlan - Jade', start: '2018-11-19' }
		];
		
		return {
			go : function(date) {
				c.fullCalendar('gotoDate', date);
			},
			render : function(eventos, update, callback) {
				if (update) {
					c.fullCalendar('addEvent', obj);
					c.fullCalendar('renderEvent', obj, true);
					callback();
				}
				c.fullCalendar({
				  dayNamesShort: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
				  header: {
				    left: '',
				    center: 'title',
				    right: ''
				  },
          themeSystem: 'bootstrap3',
          titleFormat: '[ESCALA DO CTI - ] MMMM [de] YYYY',
          titleRangeSeparator: ' de ',
          weekNumbers: true,
          weekNumberTitle: 'Horário/Dia',
          locale: 'pt-br',
          eventLimit: true, // allow "more" link when too many events
          fixedWeekCount: false,
          showNonCurrentDates: false,
          contentHeight: 600,
          eventTextColor: '#000',
          eventColor: '#fff',
          events: events,
          dayRender: function(date, cell) {
            var today = $.fullCalendar.moment();
            var end = $.fullCalendar.moment().add(7, 'days');
            
            if (date.get('date') == today.get('date')) {
                cell.addClass('normalize-today');
            }
          },
          columnHeaderHtml: function(mom) {
            return '<span>' + mom.format('ddd') + '</span><br/><span>CTI A - CTI B - CTI D</span>';
          },
          weekNumberCalculation: function(mom) {
            return '';
          },
          eventAfterAllRender: function() {
            var plantoes = [
              '07 - 13h',
              '13 - 19h',
              '19 - 07h'
            ];
            
            var colors = ['#ccdde2', '#93a3bc', '#a2c7e5', '#ffd5ff', '#d9dcd6'];
            
            var weeks = $('.fc-content-skeleton table');
            
            weeks.each(function(index, element) {
              var week = $(element),
                content = week.find('tbody'),
                rows = week.find('tr'),
                color = colors[index];
                
                rows.each(function() {
                    $(this).find('td:first-child').css('background', color);
                });
                
                content.each(function() { 
                  var tbody = $(this);
                  var trs = tbody.find('tr');
                  var tr = '<tr><td class="fc-week-number"></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
                 
                  if (trs.length < 3) {
                    for (var j = trs.length; j <= 3; j++) {
                      tbody.append(tr);
                    }
                      
                    trs = tbody.find('tr');
                  }
                  
                  trs.each(function(i, e) {
                    $(e).find('td:first-child').css('background', color).html(plantoes[i]);
                  });
                });
            });
          }
        });
			}
		};
	});
}(app));