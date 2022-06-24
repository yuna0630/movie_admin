package com.greenart.movie_admin.data.comment;

import lombok.Data;

@Data
public class CommentLikeDislikeVO {
    private Integer cld_seq;
    private Integer cld_ai_seq;
    private Integer cld_mi_seq;
    private Integer cld_like_dislike;
}
