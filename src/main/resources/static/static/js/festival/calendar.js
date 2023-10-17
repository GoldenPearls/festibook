<<<<<<< HEAD
=======

>>>>>>> calendarFDetail_ch
  document.addEventListener('DOMContentLoaded', function() {
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                height: 800,
                initialView: 'dayGridMonth',
                locale: 'ko',
                      headerToolbar: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,listMonth'
                          },
                events: {
                    url: '/calendar/events', // 이벤트 데이터를 제공하는 엔드포인트 URL
                    method: 'GET',
                    failure: function() {
                        alert('이벤트 데이터를 가져오지 못했습니다.');
                    },

                },
                eventDataTransform: function(eventData){
                    return{
                        id: eventData.festival_no,
                        title: eventData.festival_name,
                        start: eventData.start_date,
                        end: eventData.end_date
                    };
                },
                displayEventTime: false,

                editable: false,

                eventClick: function(info) {
                    console.log(info);
                    //var festivalNo = info.event.extendedProps.festival_no;
                    var festivalNo = info.event._def.publicId;
                    var festivalNoInt = Number(festivalNo);

                    window.location.href = '/festivalInfo/' + festivalNoInt;
                }


            });
            calendar.render();
        });
<<<<<<< HEAD
=======

>>>>>>> calendarFDetail_ch
