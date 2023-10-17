package com.in4mation.festibook.repository.festival;

import com.in4mation.festibook.dto.festival.FestivalDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


import java.util.List;

@Mapper
public interface FestivalMapper {

    List<FestivalDTO> selectFestivalAll();
    List<FestivalDTO> searchFestivals(@Param("keyword") String keyword);

}