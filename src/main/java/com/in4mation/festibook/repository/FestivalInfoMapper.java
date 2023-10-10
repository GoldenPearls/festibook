package com.in4mation.festibook.repository;

import com.in4mation.festibook.dto.FestivalInfoVo;
import com.in4mation.festibook.dto.LocationVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface FestivalInfoMapper {
    FestivalInfoVo getFestivalInfoByNo(@Param("festival_no") int festival_no );

    LocationVo getLocation(@Param("festival_no") int festival_no);

}
