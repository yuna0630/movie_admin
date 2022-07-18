$(function (){
    $("#login_btn").click(function(){
        if(isEmpty($("#user_id").val())) {
            $("#user_id+.error").css("display", "block");
        }
        else{
            $("#user_id+.error").css("display", "");
        }
        if(isEmpty($("#user_pwd").val())) {
            $("#user_pwd+.error").css("display", "block");
        }
        else{
            $("#user_pwd+.error").css("display", "");
        }
        let data = {
            aai_id:$("#user_id").val(),
            aai_pwd:$("#user_pwd").val()
        }
        $.ajax({
            url:"/api/account/login",
            type:"post",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(r) {
                console.log(r);
                alert(r.message);
                if(r.status) {
                    location.href = "/summary"
                }
            }
        })
    })
})