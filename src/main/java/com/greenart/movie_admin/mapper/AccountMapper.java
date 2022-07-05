package com.greenart.movie_admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.greenart.movie_admin.data.account.AdminAccountInfoVO;
<<<<<<< HEAD
@Mapper
public interface AccountMapper {
    public AdminAccountInfoVO insertAdmin(AdminAccountInfoVO data);
    public Integer isDuplicatedId(String id);
    public AdminAccountInfoVO loginAdmin(String id, String pwd);

    public Integer selectAdminListPageCount(String keyword);
    public List<AdminAccountInfoVO> selectAdminList(String keyword, Integer offset);

=======

@Mapper
public interface AccountMapper {
    public List<AdminAccountInfoVO> selectAllAdminAccount(String keyword, Integer offset);
    public Integer selectAdminAccountInfoCnt(String keyword);
    public Integer selectAdminAccountPageCnt(String keyword);
    public void insertAdminAccount(AdminAccountInfoVO data);
    public void updateAdminAccount(AdminAccountInfoVO data);
    public void deleteAdminAccount(Integer seq);

    public AdminAccountInfoVO selectAdminBySeq(Integer seq);
    public AdminAccountInfoVO loginUser(AdminAccountInfoVO data);
>>>>>>> admin_info_work2
}
