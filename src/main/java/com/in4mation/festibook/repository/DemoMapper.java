package com.in4mation.festibook.repository;

import com.in4mation.festibook.dto.DemoVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface DemoMapper {
    List<DemoVo> select();
    void insert();
}
