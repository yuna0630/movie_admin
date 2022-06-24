package com.greenart.movie_admin.data.comment;

import java.util.Date;

import lombok.Data;

@Data
public class MovieCommentVO {
    private Integer mc_seq;
    private Integer mc_parent_seq;
    private Integer mc_mi_seq;
    private Integer mc_mai_seq;
    private String mc_content;
    private Integer mc_rate;
    private Date mc_reg_dt;
    private Date ai_mod_dt;
}
