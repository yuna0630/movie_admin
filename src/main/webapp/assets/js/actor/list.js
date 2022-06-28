let img_files = new Array();
let edit = false;
// window.onbeforeunload = function(e) {
//     if(edit) {
//         return false;
//     }
//     else {
//         location.reload();
//     }
// }

$(function() {
    // $("#add_img").click(function() {
    $("#actor_img_file").change(function() {
        let form = $("#actor_img_form");
        let formData = new FormData(form[0]);
        if($(this).val() == '' || $(this).val() == null ) return;
        $.ajax({
            url:"/images/upload/actor",
            type:"put",
            data:formData,
            contentType:false,
            processData:false,
            success:function(result) {
                if(!result.message) {
                    alert(result.message);
                    return;
                }
                let tag = 
                '<div class="actor_img" filename ="'+result.file+'" style="background-image:url(/images/actor/'+result.file+')">'+
                    '<button onclick=deleteImg("'+result.file+'")>&times;</button>'+
                '</div>';
                img_files.push(result.file);
                $(".img_list").append(tag);
            },
            error:function(error) {
                console.log(error);
            }
        })
    });
    
    $("#add_actor").click(function() {
        if(isEmpty($("#actor_name").val(), false)) {
            alert("배우 이름을 입력하세요.");
            return;
        }
        if(isEmpty($("#actor_country").val(), false)) {
            alert("국적을 입력하세요.");
            return;
        }
        
        let data = {
            name:$("#actor_name").val(),
            country:$("#actor_country").val(),
            images:img_files,
        }
        $.ajax ({
            url:"/api/actor/add",
            type:"put",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(result) {
                alert(result.message);
                location.reload();
            }
        })
    })
    $("#actor_add").click(function(){
        $(".actor_add_popup").show();
    })
    $("#close_popup").click(function(){
        if(!confirm("취소하시겠습니까?\n🤡입력하신 정보는 저장되지 않습니다.")) return;
        $.ajax({
            url:"/images/delete/actor/list",
            type:"delete",
            contentType:"application/json",
            data:JSON.stringify(img_files),
            success:function(result) {
                $("#actor_name").val("");
                $("#actor_country").val("");
                $(".img_list").html("");
                img_files = new Array();
                $(".actor_add_popup").hide();
            }
        })
    })
})

function deleteImg(file) {
    // img_files 배열에서 입력된 파라미터 file 값과 동일하지 않은 것들을 걸러내서
    // 새로운 배열을 만들고, img_files에 덮어쓴다.
    $.ajax ({
        url:"/images/delete/actor/"+file,
        type:"delete",
        success:function(result) {
            alert(result.message);
            if(result.status) {
                img_files = img_files.filter((img)=>(file != img));
                $(".img_list").html("");
            
                for(let i=0; i< img_files.length; i++) {
                    let tag = 
                        '<div class="actor_img" filename ="'+img_files[i]+'" style="background-image:url(/images/actor/'+img_files[i]+')">'+
                            '<button onclick=deleteImg("'+img_files[i]+'")>&times;</button>'+
                        '</div>';
                    $(".img_list").append(tag);
                }
            }
        }
    })
}

