package com.in4mation.festibook.repository.main;

import com.in4mation.festibook.dto.main.FestivalDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FestivalImageMapper {
    List<FestivalDTO> getTop5FestivalsByViews();
}
