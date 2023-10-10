package com.in4mation.festibook.dto.festival;

import lombok.Data;

import java.sql.Date;

@Data
public class FestivalInfoVo {

    private int festival_no;

    private String member_id;

    private String festival_name;

    private String festival_category;

    private Date start_date;

    private Date end_date;

    private String festival_contents;

    private String festival_addr;

    private String festival_zipcode;

    private String festival_phone;

    private String festival_homepage;

    private String festival_office;

    private String festival_image;


}
