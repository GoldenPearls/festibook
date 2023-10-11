package com.in4mation.festibook.controller.festival;


import com.in4mation.festibook.dto.festival.CalendarVo;
import com.in4mation.festibook.repository.festival.CalendarMapper;
import com.in4mation.festibook.service.festival.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.stereotype.Controller; //새로
import org.springframework.ui.Model; //새로
import org.springframework.web.bind.annotation.GetMapping; //새로

@Controller
@RequestMapping("/calendar")
public class CalendarController {


    private final CalendarService calendarservice;

    @Autowired
    public CalendarController(CalendarService calendarservice) {
        this.calendarservice = calendarservice;

    }
    @GetMapping("/events")
    @ResponseBody
    public ResponseEntity<List<CalendarVo>> getCalendarEvents() {
        List<CalendarVo> events = calendarservice.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping
    public String calendarPage(Model model) {
        List<CalendarVo> events = calendarservice.getAllEvents();
        model.addAttribute("events", events);
        return "calendar";
    }


}


