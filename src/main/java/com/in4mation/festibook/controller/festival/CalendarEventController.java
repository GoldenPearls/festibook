package com.in4mation.festibook.controller.festival;

import com.in4mation.festibook.dto.festival.CalendarVo;
import com.in4mation.festibook.repository.festival.CalendarMapper;
import com.in4mation.festibook.service.festival.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/calendar")
public class CalendarEventController {
        private final CalendarService calendarservice;

        @Autowired
        private CalendarMapper calendarMapper;

        public CalendarEventController(CalendarService calendarservice){
            this.calendarservice = calendarservice;

    }

    @GetMapping("/calendarEvents")
    @ResponseBody
        public ResponseEntity<List<CalendarVo>> getCalendarEvents(){
            List<CalendarVo> events = calendarservice.getAllEvents();
            return ResponseEntity.ok(events);
        }
}
