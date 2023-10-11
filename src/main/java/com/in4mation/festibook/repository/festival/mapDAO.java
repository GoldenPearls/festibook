package com.in4mation.festibook.repository.festival;

import com.in4mation.festibook.dto.festival.paginationDTO;
import com.in4mation.festibook.dto.festival.FestivalMapDTO;
import com.in4mation.festibook.dto.festival.paginationDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface mapDAO {

    public List<FestivalMapDTO> mapFestival(paginationDTO paginationdto);

    public List<FestivalMapDTO> allFestival();

    public int getCount();

}
