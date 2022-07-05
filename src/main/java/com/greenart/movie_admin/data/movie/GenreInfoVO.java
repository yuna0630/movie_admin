package com.greenart.movie_admin.data.movie;

import lombok.Data;

@Data
public class GenreInfoVO {
    private Integer genre_seq;
    private String genre_name;

    private Integer genre_count;
}
