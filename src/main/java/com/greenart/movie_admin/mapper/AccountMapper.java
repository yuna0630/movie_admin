package com.greenart.movie_admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.greenart.movie_admin.data.account.AdminAccountInfoVO;
@Mapper
public interface AccountMapper {
    public AdminAccountInfoVO insertAdmin(AdminAccountInfoVO data);
    public Integer isDuplicatedId(String id);
    public AdminAccountInfoVO loginAdmin(String id, String pwd);

    public Integer selectAdminListPageCount(String keyword);
    public List<AdminAccountInfoVO> selectAdminList(String keyword, Integer offset);

}
