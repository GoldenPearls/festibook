package com.in4mation.festibook.service.festival;

import com.in4mation.festibook.dto.festival.FestivalDTO;
import com.in4mation.festibook.repository.festival.FestivalMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FestivalService {
    private final FestivalMapper festivalMapper;

    @Autowired
    public FestivalService(FestivalMapper festivalMapper) {
        this.festivalMapper = festivalMapper;
    }

    public List<FestivalDTO> getAllFestivals() {
        return festivalMapper.selectFestivalAll();
    }
    public List<FestivalDTO> searchFestivals(String keyword) {
        return festivalMapper.searchFestivals(keyword);
    }

}