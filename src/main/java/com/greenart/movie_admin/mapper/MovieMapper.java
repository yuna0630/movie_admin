package com.greenart.movie_admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.greenart.movie_admin.data.movie.GenreInfoVO;

@Mapper
public interface MovieMapper {
    public void insertGenre(String name) throws Exception;
    public List<GenreInfoVO> getGenreList(Integer offset);
    public Integer getGenrePageCnt();
    public GenreInfoVO getGenreBySeq(Integer Seq);
    public void updateGenreName(Integer seq, String name) ; 
    public void deleteGenreInfo(Integer seq);

    
}
