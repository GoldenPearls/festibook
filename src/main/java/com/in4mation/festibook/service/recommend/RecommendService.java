package com.in4mation.festibook.service.recommend;

import com.in4mation.festibook.dto.main.FestivalImageDTO;

import java.util.List;


public interface RecommendService {
    List<FestivalImageDTO> getRecommendedFestivals(String memberId);
}
