package com.in4mation.festibook.service.main;

import com.in4mation.festibook.dto.main.FestivalImageDTO;

import java.util.List;

public interface FestivalImageService {
    List<FestivalImageDTO> getTop5FestivalsByViews();

    // 랜덤으로 이번달 행사 가지고 오는 것
    List<FestivalImageDTO> getCurrentMonthFestivals();
}
