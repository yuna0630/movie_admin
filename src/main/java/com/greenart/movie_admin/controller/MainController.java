package com.greenart.movie_admin.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.greenart.movie_admin.data.account.AdminAccountInfoVO;
import com.greenart.movie_admin.mapper.AccountMapper;
import com.greenart.movie_admin.util.AESAlgorithm;

@Controller
public class MainController {
    @Autowired AccountMapper account_mapper;

    @GetMapping("/")
    public String getMain(){
        return "/index";
    }
    @GetMapping("/summary")
    public String getSummary(){
        return "/summary";
    }

    @GetMapping("/admin/join")
    public String getaAdminJoin() {
        return "/index";
    }

    @PostMapping("/account/login")
    public String postAdminLogin(String id, String pwd, HttpSession session) throws Exception{
        AdminAccountInfoVO user = account_mapper.loginAdmin(id, AESAlgorithm.Encrypt(pwd));
        if(user == null) {
            session.setAttribute("msg", "아이디 또는 비밀번호 오류입니다.");
        }
        else if(user.getAai_role() == 1) {
            session.setAttribute("msg", "관리자 전용 서비스 화면입니다.");
        }
        else {
            session.setAttribute("msg", null);
            session.setAttribute("login_user", user);
            return "redirect:/";
        }
        return "/index";
    }
    @GetMapping("/logout")
    public String getLogout(HttpSession session) {
        session.getAttribute("login_user");
        return "redirect:/";
    }
    
}
