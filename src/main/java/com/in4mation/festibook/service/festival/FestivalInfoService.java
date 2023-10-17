package com.in4mation.festibook.service.festival;

import com.in4mation.festibook.dto.festival.FestivalInfoVo;
import com.in4mation.festibook.dto.festival.LocationVo;
import com.in4mation.festibook.repository.festival.FestivalInfoMapper;
import org.apache.ibatis.mapping.ParameterMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

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



    public int incrementViews(int festival_no) {
        // 기존 조회수를 가져온 다음 증가시키는 로직을 구현
        int currentViews = festivalInfoMapper.getViewsByNo(festival_no);
        int updatedViews = currentViews + 1;


        // Map을 사용하여 parameterMap 구성
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("festival_no", festival_no);
        parameterMap.put("festival_view", updatedViews);

        //조회수 업데이트
        festivalInfoMapper.updateViews(parameterMap);

        return updatedViews;
    }

}
