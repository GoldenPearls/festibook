package com.in4mation.festibook.controller.main;

import com.in4mation.festibook.dto.main.FestivalDTO;
import com.in4mation.festibook.service.main.FestivalImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/festivals")
public class FestivalImageController {

    @Autowired
    private FestivalImageService festivalImageService;

    @GetMapping("/top5")
    public ResponseEntity<List<FestivalDTO>> getTop5FestivalsByViews() {
        List<FestivalDTO> festivals = festivalImageService.getTop5FestivalsByViews();
        return ResponseEntity.ok(festivals);
    }
}
