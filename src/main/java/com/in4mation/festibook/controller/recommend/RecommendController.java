package com.in4mation.festibook.controller.recommend;

import com.in4mation.festibook.dto.main.FestivalImageDTO;
import com.in4mation.festibook.service.recommend.RecommendServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recommend")
public class RecommendController {

    @Autowired
    private RecommendServiceImpl recommendServiceImpl;

    @GetMapping("/festivals")
    public ResponseEntity<List<FestivalImageDTO>> getRecommendedFestivals(@RequestParam String memberId) {
        List<FestivalImageDTO> festivals = recommendServiceImpl.getRecommendedFestivals(memberId);
        return new ResponseEntity<>(festivals, HttpStatus.OK);
    }
}
