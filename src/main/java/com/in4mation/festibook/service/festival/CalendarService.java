package com.in4mation.festibook.service.festival;

import com.in4mation.festibook.dto.festival.CalendarVo;
import com.in4mation.festibook.repository.festival.CalendarMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CalendarService {

    private final CalendarMapper calendarMapper;


    @Autowired
    public CalendarService(CalendarMapper calendarMapper){
        this.calendarMapper = calendarMapper;
    }

    public List<CalendarVo> getAllEvents() {

        if (calendarMapper != null) {
            return calendarMapper.getAllEvents();
        } else {
            return Collections.emptyList();
        }
    }
}
