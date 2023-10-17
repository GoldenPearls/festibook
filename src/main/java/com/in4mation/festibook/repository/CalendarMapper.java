package com.in4mation.festibook.repository;

import com.in4mation.festibook.dto.CalendarVo;
import org.apache.ibatis.annotations.Mapper;


import java.util.List;

@Mapper
public interface CalendarMapper {
        List<CalendarVo> getAllEvents();

}
