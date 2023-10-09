package com.in4mation.festibook.service.main;

import com.in4mation.festibook.dto.main.FestivalDTO;

import java.util.List;

public interface FestivalImageService {
    List<FestivalDTO> getTop5FestivalsByViews();
}
