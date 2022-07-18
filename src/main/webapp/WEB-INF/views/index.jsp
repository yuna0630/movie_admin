<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/css/reset.css">
    <link rel="stylesheet" href="/assets/css/index.css">
    <script src="http://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="/assets/js/common/util.js"></script>
    <script src="/assets/js/index.js"></script>
    
</head>
<body>
    <h1>Admin Loging</h1>
    <div class="login_box">
        <p class="label">아이디</p>
        <input type="text" id="user_id">
        <p class="error">아이디를 올바르게 입력하세요.</p>
        <p class="label">비밀번호</p>
        <input type="password" id="user_pwd">
        <p class="error">비밀번호를 올바르게 입력하세요</p>
        <button id="login_btn">로그인</button>
    </div>
</body>
</html>