<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@include file="/WEB-INF/includes/header.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Header</title>
    <link rel="stylesheet" href="/assets/css/reset.css">
    <link rel="stylesheet" href="/assets/css/header.css">
</head>
<body>
    <table>
        <h1>관리자 로그인</h1>
        <form action="login" method="post">
            <input type="text" name="id" placeholder="아이디를 입력하세요.">
            <input type="pwd" name="pwd" placeholder="비밀번호를 입력하세요.">
            <button type="submit">로그인</button>
        </form>
        <div class="">
            <a href="/member/join">
                <i class="fas fa-user-edit"></i>
                <span>사용자 등록</span>
            </a>
        </div>
    </table>
</body>
</html>
