package com.in4mation.festibook.controller.festival;


import com.in4mation.festibook.dto.festival.FestivalMapDTO;
import com.in4mation.festibook.dto.festival.paginationDTO;
import com.in4mation.festibook.service.festival.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import java.util.ArrayList;
import java.util.List;


@Controller
public class MapController {

    @Autowired
    private MapService mapService;

    @GetMapping("/festival/map")
    public String festivalMap(Model model, @RequestParam(value = "page", defaultValue = "1") final int page) {

        paginationDTO paginationdto = new paginationDTO(this.mapService.getCount(), page);
        List<FestivalMapDTO> festival = this.mapService.mapFestival(paginationdto);

        for (FestivalMapDTO festivalDTO : festival) {
            festivalDTO.setFestival_image("/static/images/" + festivalDTO.getFestival_no() + ".jpg");
        }
        List<String> imagePaths = new ArrayList<>();
        for (FestivalMapDTO festivalDTO : festival) {
            imagePaths.add(festivalDTO.getFestival_image());
        }
        model.addAttribute("imagePaths", imagePaths);

        model.addAttribute("festival", festival);
        model.addAttribute("page", page);
        model.addAttribute("pageDto", paginationdto);

        return "listTest";
    }

    @GetMapping("/all")
    @ResponseBody
    public List<FestivalMapDTO> all() {

        List<FestivalMapDTO> allfestival = mapService.allFestival();

        return allfestival;
    }


}
