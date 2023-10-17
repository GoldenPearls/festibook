package com.in4mation.festibook.service.festival;

import com.in4mation.festibook.dto.festival.FestivalMapDTO;
import com.in4mation.festibook.dto.festival.paginationDTO;
import com.in4mation.festibook.repository.festival.mapDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapService {

    @Autowired
    mapDAO dao;

    public List<FestivalMapDTO> mapFestival(paginationDTO paginationdto){

        return dao.mapFestival(paginationdto);
    };

    public List<FestivalMapDTO> allFestival(){

        return dao.allFestival();
    };

    // 페이징을 위한 전체 데이터 개수 파악
    public int getCount() {
        return dao.getCount();
    }

}
