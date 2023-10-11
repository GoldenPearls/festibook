package com.in4mation.festibook.dto.main;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class FestivalImageDTO {
    private int festival_no;
    private String festival_category;
    private String festival_name;
    private String festival_contents;
    private String festival_local;
    private String festival_addr;
    private String festival_zipcode;
    private Date start_date;
    private Date end_date;
    private String festival_phone;
    private String festival_homepage;
    private String festival_office;
    private double x;
    private double y;
    private String festival_image;
    private int festival_view;
}
