package com.greenart.movie_admin.api;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenart.movie_admin.data.account.AdminAccountInfoVO;
import com.greenart.movie_admin.mapper.AccountMapper;


@RestController
@RequestMapping("/api/admin")
public class AdminAPIController {
    @Autowired AccountMapper account_mapper;
    @Autowired AdminAccountInfoVO admin_account;
    
    @Transactional
    @PutMapping("/add")
    public Map<String, Object> putActorInfo(@RequestBody AdminAccountInfoVO data) {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        
        AdminAccountInfoVO info = new AdminAccountInfoVO(data.getAai_id());
        admin_account.insertAdminInfo(info);
        actor_mapper.inserActorInfo(info);
        List<CinemaActorPhotoVO> photo_list = new ArrayList<CinemaActorPhotoVO>();
        for(String s : data.getImages()) {
            CinemaActorPhotoVO photo = new CinemaActorPhotoVO();
            photo.setCap_cai_seq(info.getCai_seq());
            photo.setCap_file_name(s);
            photo_list.add(photo);
        }
        actor_mapper.insetActorImages(photo_list);
        resultMap.put("info", info);
        resultMap.put("data", data);
        resultMap.put("message", "배우정보를 추가했습니다.");
        return resultMap;
    }
}
