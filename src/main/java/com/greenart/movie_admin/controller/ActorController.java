package com.greenart.movie_admin.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.annotation.JsonCreator.Mode;
import com.greenart.movie_admin.data.actor.ActorCountryVO;
import com.greenart.movie_admin.data.actor.CinemaActorListVO;
import com.greenart.movie_admin.mapper.ActorMapper;
import com.greenart.movie_admin.service.ActorService;

@Controller
@RequestMapping("/actor")
public class ActorController {
    @Autowired ActorService actor_service;
    @Autowired ActorMapper actor_mapper;
    @GetMapping("/list")
    public String getActorList(
    @RequestParam @Nullable String keyword,
    @RequestParam @Nullable Integer page,
    @RequestParam @Nullable String country, Model model) {
        
        
        if(page == null) page = 1;
        
        model.addAttribute("countryURL", actor_service.makeActorCountryLink(keyword));
        model.addAttribute("pagerURL", actor_service.makePagerURL(keyword, country));
        model.addAttribute("keyword", keyword);
        model.addAttribute("page", page);
        model.addAttribute("country", country);
        model.addAttribute("list", actor_service.getCinemaActorList(keyword, country, page));

        return "/actor/list";
    
    }
    @GetMapping("/movie_role")
    public String getActorMovieRole(Model model,
    @RequestParam @Nullable String keyword,
    @RequestParam @Nullable Integer page,
    @RequestParam @Nullable String country){
        if(page == null) page = 1;
        model.addAttribute("keyword", keyword);
        model.addAttribute("page", page);
        model.addAttribute("country", country);
        model.addAttribute("list", actor_mapper.selectActorRoleCntInfo((page-1)*10, keyword, country));
        model.addAttribute("pageCount", actor_mapper.selectActorRoleCntInfoPageCount(keyword, country));
        return "/actor/movie_role";
    }
}
