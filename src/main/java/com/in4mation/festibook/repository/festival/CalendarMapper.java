package com.in4mation.festibook.repository.festival;

import com.in4mation.festibook.dto.festival.CalendarVo;
import org.apache.ibatis.annotations.Mapper;


import java.util.List;

@Mapper
public interface CalendarMapper {
        List<CalendarVo> getAllEvents();

}
