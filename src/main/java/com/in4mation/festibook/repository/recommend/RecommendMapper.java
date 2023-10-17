package com.in4mation.festibook.repository.recommend;

import com.in4mation.festibook.dto.main.FestivalImageDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecommendMapper {
    List<FestivalImageDTO> findFestivalsByMemberCategory(String memberId);
}
