package com.greenart.movie_admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.greenart.movie_admin.data.movie.GenreInfoVO;
import com.greenart.movie_admin.data.movie.MovieImageVO;
import com.greenart.movie_admin.data.movie.MovieInfoVO;
import com.greenart.movie_admin.data.movie.MovieStoryImgVO;
import com.greenart.movie_admin.data.movie.MovieStoryTextVO;
import com.greenart.movie_admin.data.movie.TrailerVideoVO;
import com.greenart.movie_admin.data.movie.request.MovieDescriptionVO;
import com.greenart.movie_admin.data.movie.request.MovieTrailerRequest;

@Mapper
public interface MovieMapper {
    public void insertGenre(String name) throws Exception;
    public List<GenreInfoVO> getGenreList(Integer offset);
    public Integer getGenrePageCnt();
    public GenreInfoVO getGenreBySeq(Integer Seq);
    public void updateGenreName(Integer seq, String name) ; 
    public void deleteGenreInfo(Integer seq);

    public void insertMovieInfo(MovieInfoVO data);
    public void insertMovieImage(List<String> list, Integer seq);
    public void insertMovieStoryImg(Integer seq, String content, Integer order);
    public void insertMovieStoryText(Integer seq, String content, Integer order);
    public void insertMovieTrailerVideo(List<MovieTrailerRequest> list, Integer seq);

    public List<MovieInfoVO> selectMovieList(String keyword, Integer offset, String country);
    public Integer selectMoviePageCnt(String keyword, String country);

    public MovieInfoVO selectMovieInfoBySeq(Integer seq);
    public List<MovieImageVO> selectMovieImagesBySeq(Integer seq);
    public List<TrailerVideoVO> selectMovieTrailerVideoBySeq(Integer seq);
    public List<MovieDescriptionVO> selectMovieDescriptionBySeq(Integer seq);

    public void deleteMovieTrailerInfo(Integer seq);
    public void deleteMovieImageInfo(Integer seq);
    public void deleteMovieStoryTextInfo(Integer seq);
    public void deleteMovieStoryImageInfo(Integer seq);

    public void insertMovieTrailerInfo(TrailerVideoVO data);
    public void insertMovieImageInfo(MovieImageVO data);
    public void insertMovieStoryTextInfo(MovieStoryTextVO data);
    public void insertMovieStoryImageInfo(MovieStoryImgVO data);

    public void deleteStroyImgInfoByMovieSeq(Integer seq);
    public void deleteStroyTextInfoByMovieSeq(Integer seq);
    public List<String> selectDescFileNameList(Integer seq);

    public void patchMovieBasicInfo(MovieInfoVO data);
}
