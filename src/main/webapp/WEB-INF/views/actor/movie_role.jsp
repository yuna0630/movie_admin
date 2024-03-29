<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/includes/header.jsp"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="/assets/js/actor/movie_role.js"></script>
    <link rel="stylesheet" href="/assets/css/actor/movie_role.css">
</head>

<body>
    <main>
        <div class="actor_role_list_area">
            <c:forEach items="${list}" var="item">
                <div class="actor_role_item">
                    <div>
                        <span>${item.mi_year}</span>
                        <span>${item.mi_country}</span>
                    </div>
                    <h2>${item.mi_title}</h2>
                    <p>
                        <span>등록배우 : </span>
                        <span class="actor_count">${item.actor_count}</span>
                    </p>
                </div>
                <div class="button_area">
                    <button class="modify" data-seq="${item.mi_seq}" data-title="${item.mi_title}">배역 정보 수정</button>
                </div>
            </c:forEach>
        </div>
        <div class="actor_role_list_popup">
            <div class="actor_role_list_box">
                <button id="actor_role_list_close">&times;</button>
                <button id="actor_add">배역 추가</button>
                <div class="actor_role_list">
                    <h2></h2>
                    <div class="actors"></div>
                </div>
            </div>
        </div>
        <div class="actor_add_popup" style="display:none; border:1px solid #000">
            <div class="actor_add_form">
                <p>배우</p>
                <input type="text" id="actor_name">
                <p>배역 명</p>
                <input type="text" id="actor_role_name">
                <p>배역 유형</p>
                <input type="radio" name="role_type" class="role_type" id="role1" value="1">
                <label for="role1">주연</label>
                <input type="radio" name="role_type" class="role_type" id="role2" value="2" checked>
                <label for="role2">조연</label>
                <button id="actor_role_save">저장</button>
                <button id="actor_role_cancel">닫기</button>
            </div>
        </div>
        <div class="actor_modify_popup" style="display:none; border:1px solid #000">
            <div class="actor_modify_form">
                <p>배우</p>
                <input type="text" id="actor_mod_name">
                <p>배역 명</p>
                <input type="text" id="actor_mod_role_name">
                <p>배역 유형</p>
                <input type="radio" name="role_mod_type" class="role_mod_type" id="mod_role1" value="1">
                <label for="mod_role1">주연</label>
                <input type="radio" name="role_mod_type" class="role_mod_type" id="mod_role2" value="2" checked>
                <label for="mod_role2">조연</label>
                <button id="actor_mod_role_save">수정</button>
                <button id="actor_mod_role_cancel">닫기</button>
            </div>
        </div>
        <div class="actor_search_popup" style="display:none; border:1px solid #000">
            <div class="actor_search_form">
                <h2>배우 검색</h2>
                <input type="text" id="actor_search_keyword">
                <button id="actor_search_button">검색</button>
                <div class="actor_search_list">
                    <table>
                        <thead>
                            <tr>
                                <td>사진</td><td>이름</td><td>국적</td><td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="http://placekitten.com/60/80">
                                </td>
                                <td>배우 이름</td>
                                <td>배우 국적</td>
                                <td>
                                    <button class="actor_select">선택</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="actor_search_pager_area">
                </div>
            </div>
        </div>

        <div class="pager_area">
            <c:forEach begin="1" end="${pageCount}" var="i">
                <c:if test="${country != null}">
                    <a href="/actor/movie_role?page=${i}&keyword=${keyword}&country=${country}">${i}</a>
                </c:if>
                <c:if test="${country == null}">
                    <a href="/actor/movie_role?page=${i}&keyword=${keyword}">${i}</a>
                </c:if>
            </c:forEach>
        </div>
    </main>
</body>

</html>