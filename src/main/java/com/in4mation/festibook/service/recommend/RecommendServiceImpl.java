package com.in4mation.festibook.service.recommend;

import com.in4mation.festibook.dto.main.FestivalImageDTO;
import com.in4mation.festibook.repository.recommend.RecommendMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendServiceImpl implements RecommendService {

    @Autowired
    RecommendMapper recommendMapper;

    @Override
    public List<FestivalImageDTO> getRecommendedFestivals(String memberId) {
        return recommendMapper.findFestivalsByMemberCategory(memberId);
    }
}
