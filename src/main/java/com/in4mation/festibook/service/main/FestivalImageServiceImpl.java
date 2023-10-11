package com.in4mation.festibook.service.main;

import com.in4mation.festibook.dto.main.FestivalImageDTO;
import com.in4mation.festibook.repository.main.FestivalImageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FestivalImageServiceImpl implements FestivalImageService{

    @Autowired
    private FestivalImageMapper festivalImageMapper;


    @Override
    public List<FestivalImageDTO> getTop5FestivalsByViews() {
        return festivalImageMapper.getTop5FestivalsByViews();
    }

    @Override
    public List<FestivalImageDTO> getCurrentMonthFestivals() {
        return festivalImageMapper.findCurrentMonthFestivals();
    }
}
