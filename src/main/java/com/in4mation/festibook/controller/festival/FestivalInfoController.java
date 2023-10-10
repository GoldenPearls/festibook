package com.in4mation.festibook.controller.festival;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.in4mation.festibook.dto.festival.FestivalInfoVo;
import com.in4mation.festibook.dto.festival.LocationVo;
import com.in4mation.festibook.service.festival.FestivalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/festivalInfo")
public class FestivalInfoController {
    private final FestivalInfoService festivalInfoService;

    @Autowired
    public FestivalInfoController(FestivalInfoService festivalInfoService) {
        this.festivalInfoService = festivalInfoService;
    }

    @GetMapping("/{festival_no}")
    public String showFestivalInfo(@PathVariable int festival_no, Model model) throws JsonProcessingException {

        //축제 정보
        FestivalInfoVo festivalInfoVo = festivalInfoService.getFestivalInfoByNo(festival_no);
        model.addAttribute("festivalInfoVo", festivalInfoVo);
        System.out.println("festivalInfoVo: " + festivalInfoVo);

        // 이미지 경로를 모델에 추가
        String imagePath = "/static/images/" + festival_no + ".jpg"; // 예를 들어 이미지 파일 이름은 festivalNo에 따라 동적으로 생성
        model.addAttribute("imagePath", imagePath);

        //위치 정보
        LocationVo locationVo = festivalInfoService.getLocation(festival_no);

        // 위치 정보를 JSON 형식으로 변환
        Map<String, Double> locationData = new HashMap<>();
        locationData.put("x", locationVo.getX());
        locationData.put("y", locationVo.getY());

        // JSON 데이터를 모델에 추가
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String locationJson = objectMapper.writeValueAsString(locationData);
            model.addAttribute("locationJson", locationJson);
            System.out.println("locationJson: " + locationJson);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("festivalNo", festival_no);
        return "festivalInfo";
    }

    @GetMapping("/location/{festival_no}")
    @ResponseBody
    public LocationVo getLocation(@PathVariable int festival_no) {
        return festivalInfoService.getLocation(festival_no);
    }

}
