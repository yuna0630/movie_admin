<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/css/reset.css">
    <link rel="stylesheet" href="/assets/css/index.css">
    <script src="http://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="/assets/js/common/util.js"></script>
    <script src="/assets/js/index.js"></script>
</head>
<body>
<<<<<<< HEAD
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
=======
    <div class="login_box">
        <h1>Admin Login</h1>
        <p class="label">아이디</p>
        <input type="text" id="user_id">
        <p class="error">아이디를 올바르게 입력하세요</p>
        <p class="label">비밀번호</p>
        <input type="password" id="user_pwd">
        <p class="error">비밀번호를 올바르게 입력하세요</p>
        <button id="login_btn">로그인</button>
    </div>
>>>>>>> admin_info_work2
</body>
</html>