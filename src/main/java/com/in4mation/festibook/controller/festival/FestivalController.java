package com.in4mation.festibook.controller.festival;

import com.in4mation.festibook.dto.festival.FestivalDTO;
import com.in4mation.festibook.service.festival.FestivalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
@Controller
public class FestivalController {
    private final FestivalService festivalService;


    @Autowired
    public FestivalController(FestivalService festivalService) {
        this.festivalService = festivalService;
    }

    /*@GetMapping("/festival")
    public String getAllFestivals(Model model) {
        List<FestivalDTO> festivals = festivalService.getAllFestivals();
        for (FestivalDTO festival : festivals) {
            festival.setFestival_image("/static/static/images/" + festival.getFestival_no() + ".jpg");
        }
        model.addAttribute("festivals", festivals);
        return "festivalList"; // HTML 템플릿 파일 이름
    }
*/
    @GetMapping("/festival")
    public String getAllFestivals(Model model) {
        List<FestivalDTO> festivals = festivalService.getAllFestivals();

        // 이미지 경로를 설정하고 모델에 추가
        for (FestivalDTO festival : festivals) {
            festival.setFestival_image("/static/images/" + festival.getFestival_no() + ".jpg");
        }
        List<String> imagePaths = new ArrayList<>();
        for (FestivalDTO festival : festivals) {
            imagePaths.add(festival.getFestival_image());
        }
        model.addAttribute("imagePaths", imagePaths);

        model.addAttribute("festivals", festivals);

        return "festivalList"; // HTML 템플릿 파일 이름
    }
    @GetMapping("/festival/search")
    public String searchFestivals(@RequestParam(name = "keyword") String keyword, Model model) {
        List<FestivalDTO> festivals = festivalService.searchFestivals(keyword);

        // 이미지 경로를 설정하고 모델에 추가
        for (FestivalDTO festival : festivals) {
            festival.setFestival_image("/static/images/" + festival.getFestival_no() + ".jpg");
        }

        model.addAttribute("festivals", festivals);

        return "festivalList";
    }


}