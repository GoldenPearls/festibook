package com.in4mation.festibook.dto.festival;

import lombok.Data;

@Data
public class FestivalMapDTO {
    private int festival_no;
    private String festival_category;
    private String festival_name;
    private String festival_addr;
    private String start_date;
    private String end_date;
    private String festival_image;
    private double x;
    private double y;
}
