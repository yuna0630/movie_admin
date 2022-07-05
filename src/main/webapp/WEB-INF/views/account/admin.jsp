<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/includes/header.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/css/actor/list.css">
    <script src="/assets/js/.js"></script>
</head>
<body>
    <main>
        <h1>관리자 목록</h1>
        <button id="admin_account_regist">관리자 정보 등록</button>
        <div class="admin_regist_popup">
            <div class="admin_regist_box">
                <div class="admin_info">
                    <span>관리자 이름</span>
                    <input type="text" id="adnmin_name" value="${item.aai_name}" placeholder="관리자 이름을 입력하세요(한글)">
                    <span>관리자 역할</span>
                    <select id="admin_role">
                        <option value="1">일반관리</option>
                        <option value="2">마스터</option>
                    </select>
                </div>
                <button type="button" id="add_admin">관리자 추가</button>
                <button type="button" id="close_popup">취소</button>
            </div>
        </div>
            <div class="search_box">
                <form action="/admin/list" method="get">
                    <input type="text" name="keyword" placeholder="관리자 이름 검색" value="${keyword}">
                    <button type="submit">검색</button>
                </form>
            </div>
        </div>
        <div class="admin_list_wrap">
            <c:forEach items="${list}" var="item">
                <a href="/admin/detail?actor_no=${item.aai_seq}" class="admin_list_item">
                    <p>
                        <span>${item.aai_name}</span>
                        <span>|</span>
                        <span>${item.aai_role}</span>
                    </p>
                </a>
            </c:forEach>
        </div>
        <div class="pager_area">
            <%--
            <c:forEach begin="1" end="${pageCount}" var="i">
                <a href="/actor/list?page=${i}">${i}</a>
            </c:forEach>
            --%>
            <c:forEach items="${pagerURL}" var="url" varStatus="stat">
                <a href="${url}"
                    <c:if test="${page == stat.count}"> class="current"</c:if>
                >${stat.count}</a>
            </c:forEach>
        </div>
    </main>
</body>
</html>