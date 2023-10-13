package com.in4mation.festibook.repository;

import com.in4mation.festibook.dto.FestivalInfoVo;
import com.in4mation.festibook.dto.LocationVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

@Mapper
public interface FestivalInfoMapper {
    FestivalInfoVo getFestivalInfoByNo(@Param("festival_no") int festival_no );

    LocationVo getLocation(@Param("festival_no") int festival_no);

    // 조회수 가져오기
    int getViewsByNo(int festival_no);

    //조회수 증가
    int incrementViews(Map<String,Object> parameterMap);

    // 조회수 업데이트
    void updateViews(Map<String, Object> parametrMap);
}
