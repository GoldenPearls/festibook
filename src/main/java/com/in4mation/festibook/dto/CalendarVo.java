package com.in4mation.festibook.dto;


import lombok.Data;

import java.util.Date;

@Data
public class CalendarVo {


    private int festival_no;

    private String festival_name;

    private Date start_date;

    private Date end_date;

}
