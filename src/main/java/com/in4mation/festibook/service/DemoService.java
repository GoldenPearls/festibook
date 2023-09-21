package com.in4mation.festibook.service;

import com.in4mation.festibook.domain.DemoVo;
import com.in4mation.festibook.repository.DemoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DemoService {
    @Autowired
    private DemoMapper mapper;

    public List<DemoVo> select() {
        return mapper.select();
    }

    public void insert(DemoVo vo) {
        mapper.insert();
    }
}