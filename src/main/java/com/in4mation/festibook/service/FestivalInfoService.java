package com.in4mation.festibook.service;

import com.in4mation.festibook.dto.FestivalInfoVo;
import com.in4mation.festibook.dto.LocationVo;
import com.in4mation.festibook.repository.FestivalInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FestivalInfoService {

    private final FestivalInfoMapper festivalInfoMapper;


    @Autowired
    public FestivalInfoService(FestivalInfoMapper festivalInfoMapper){

        this.festivalInfoMapper = festivalInfoMapper;
    }

    public FestivalInfoVo getFestivalInfoByNo(int festival_no){
        return festivalInfoMapper.getFestivalInfoByNo(festival_no);
    }

    public LocationVo getLocation(int festival_no){

        return festivalInfoMapper.getLocation(festival_no);
    }

}
