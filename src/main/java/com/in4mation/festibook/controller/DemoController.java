package com.in4mation.festibook.controller;

import com.in4mation.festibook.dto.DemoVo;
import com.in4mation.festibook.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DemoController {
    @Autowired
    private DemoService demoService;

    @GetMapping("select")
    public List<DemoVo> getSelectList(){ return demoService.select(); }

    @GetMapping("insert")
    public void insertDemoVo(){
        DemoVo vo = new DemoVo();
        vo.setDemo_id("내가만든dummy_id");
        vo.setDemo_name("내가만든dummy_name");

        demoService.insert(vo);
    }
}