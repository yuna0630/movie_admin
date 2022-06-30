let movie_imgs = new Array();
let movie_desc_list = new Array();
let movie_trailer_list = new Array();
let edit_mode = 'new';

$(function() {
    $("#movie_img_select").change(function() {
        let form = $("#movie_img_form");
        let formData = new FormData(form[0]);
        if($(this).val() == '' || $(this).val() == null ) return;
        $.ajax({
            url:"/images/upload/movie",
            type:"put",
            data:formData,
            contentType:false,
            processData:false,
            success:function(result) {
                console.log(result)
                if(!result.message) {
                    alert(result.message);
                    return;
                }
                let tag = 
                '<div class="movie_img" filename ="'+result.file+'">'+
                    '<img src="/images/movie/'+result.file+'">'+
                    '<button onclick=deleteImg("'+result.file+'")>&times;</button>'+
                '</div>';
                movie_imgs.push(result.file);
                $(".movie_image_list").append(tag);
            },
            error:function(error) {
                console.log(error);
            }
        })
    });
    $("#desc_img_select").change(function() {
        let form = $("#desc_img_form");
        let formData = new FormData(form[0]);
        if($(this).val() == '' || $(this).val() == null ) return;
        $.ajax({
            url:"/images/upload/movie_desc",
            type:"put",
            data:formData,
            contentType:false,
            processData:false,
            success:function(result) {
                console.log(result)
                if(!result.message) {
                    alert(result.message);
                    return;
                }
                let order = $(".desc_img_box").length + $(".desc_text_box").length + 1;
                let tag = 
                '<div class="desc_img_box" filename ="'+result.file+'">'+
                    '<img src="/images/movie_desc/'+result.file+'">'+
                    '<button onclick=deleteDescImg("'+result.file+'")>&times;</button>'+
                '</div>';
                // movie_imgs.push(result.file);
                movie_desc_list.push({type:"img", content:result.file, order:order});
                console.log(movie_desc_list);
                $(".description_list").append(tag);
            },
            error:function(error) {
                console.log(error);
            }
        })
    });
    $("#text_add").click(function() {
        let order = $(".desc_img_box").length + $(".desc_text_box").length + 1;
        let tag = 
            '<div class="desc_text_box">'+
                '<textarea cols="30" rows="10" id="text'+order+'" onkeyup=saveDescText('+order+')></textarea>'+
                // '<button class="desc_text_save" onclick=saveDescText('+order+')>저장</button>'+
                '<button class="desc_text_del" onclick=deleteDescText('+order+')>삭제</button>'+
            '</div>' ;
        movie_desc_list.push({type:"text", content:"", order:order});
        console.log(movie_desc_list);
        $(".description_list").append(tag);
    });
    $("#trailer_select").change(function() {
        let form = $("#trailer_form");
        let formData = new FormData(form[0]);
        if($(this).val() == '' || $(this).val() == null ) return;
        $.ajax({
            url:"/movies/upload/movie_trailer",
            type:"put",
            data:formData,
            contentType:false,
            processData:false,
            success:function(result) {
                console.log(result);
                let split = $("#trailer_select").val().split("\\");
                split = split[split.length-1].split(".");
                let tag =
                    '<tr>'+
                        '<td>'+($("#trailer_file_table tbody tr").length+1)+'</td>'+
                        '<td>'+split[0]+'</td>'+
                        '<td>'+result.ext+'</td>'+
                        '<td>'+result.fileSize.toLocaleString()+'Bytes'+'</td>'+
                        '<td>'+
                            '<button class="delete_trailer" onclick=deleteTrailer("'+result.file+'")>삭제</button>'+
                        '</td>'+
                    '</tr>';
                    let trailer_order =$("#trailer_file_table tbody tr").length+1;
                movie_trailer_list.push(
                    {
                        order: trailer_order,
                        file:result.file,
                        ext:result.ext,
                        fileSize:result.fileSize,
                        originFileName:split[0]
                    }
                );
                $("#trailer_file_table tbody").append(tag);
                if(edit_mode == 'edit') {
                    let trailer = {
                        tvi_mi_seq:movie_seq,
                        tvi_order:trailer_order,
                        tvi_file_name:result.file
                    }
                    $.ajax({
                        url:"/api/movie/add/trailer",
                        type:"put",
                        contentType:"application/json",
                        data:JSON.stringify(trailer),
                        success:function(r) {
                            console.log(r);
                            let len =$("#trailer_file_table tbody tr").length;
                            $("#trailer_file_table tbody tr").eq(len-1).find(".delete_trailer")
                                .attr(
                                    "onclick",
                                    'deleteTrailer("'+result.file+'", '+r.seq+')'
                                    // deleteTrailer("asldkjaskdjklasdj.mp4", 3)
                                );
                        }
                    })
                }
            }
        })
    })
    $("#save").click(function(){
        if(!confirm("영화 정보를 등록하시겠습니까?")) return;
        let data= {
            movie_info:{
                mi_genre_seq:$("#genre_info option:selected").val(),
                mi_title:$("#movie_name").val(),
                mi_viewing_age:$("#viewing_age option:selected").val(),
                mi_running_time:$("#running_time").val(),
                mi_country:$("#movie_country").val(),
                mi_opening_dt:$("#opening_dt").val(),
                mi_showing_status:$("#movie_status option:selected").val(),
                mi_year:$("#movie_year").val(),
            },
            movie_imgs: movie_imgs,
            movie_desc_list: movie_desc_list,
            movie_trailer_list: movie_trailer_list,
        }
        console.log(JSON.stringify(data));
        $.ajax({ 
            url:"/api/movie/add",
            type:"put",
            data:JSON.stringify(data),
            contentType:"application/json",
            success:function(result) {
                alert(result.message);
                location.href= "/movie/list";
            }
        })    
    })
})
function deleteTrailer(filename, seq) {
    if(edit_mode == 'edit') {
        if(!confirm("해당 트레일러 영상을 삭제하시겠습니까?\n(🧨주의: 삭제된 데이터는 되돌릴 수 없습니다.)")){
            return;
        }
    }
    $.ajax({
        url:"/movies/delete/movie_trailer/"+filename,
        type:"delete",
        success:function(result) {
            console.log(result);
            movie_trailer_list = movie_trailer_list.filter((data) => data.file != filename);
            $("#trailer_file_table tbody").html("");
            for(let i=0; i<movie_trailer_list.length; i++) {
                movie_trailer_list[i].order = i+1;
                let tag =
                    '<tr>'+
                        '<td>'+(i+1)+'</td>'+
                        '<td>'+movie_trailer_list[i].originFileName+'</td>'+
                        '<td>'+movie_trailer_list[i].ext+'</td>'+
                        '<td>'+movie_trailer_list[i].fileSize.toLocaleString()+'Bytes'+'</td>'+
                        '<td>'+
                            '<button class="delete_trailer" onclick=deleteTrailer("'+movie_trailer_list[i].file+'")>삭제</button>'+
                        '</td>'+
                    '</tr>';
                $("#trailer_file_table tbody").append(tag);
            }
        }
    });
    if(edit_mode == 'edit'){
        $.ajax({
            url:"/api/movie/delete/trailer?seq="+seq,
            type:"delete",
            success:function(result) {
                console.log(result);
            }
        })
    }
}

function deleteImg(filename){
    if(edit_mode == 'edit') {
        if(!confirm("영화 포스트를 삭제하시겠습니까?\n(🧨주의: 삭제된 데이터는 되돌릴 수 없습니다.)")){
            return;
        }
    }
    $.ajax({
        url:"/images/delete/movie/"+filename,
        type:"delete",
        success:function(result){
            alert(result.message);
            if(result.status) {
                movie_imgs = movie_imgs.filter((img)=>filename != img);
                $(".movie_image_list").html("");
                for(let i=0; i<movie_imgs.length; i++) {
                    let tag = 
                        '<div class="movie_img" filename ="'+movie_imgs[i]+'">'+
                            '<img src="/images/movie/'+movie_imgs[i]+'">'+
                            '<button onclick=deleteImg("'+movie_imgs[i]+'")>&times;</button>'+
                        '</div>';
                    $(".movie_image_list").append(tag);
                }
            }
        }
    })
}

function deleteDescImg(filename){
    if(edit_mode == 'edit') {
        if(!confirm("스토리 이미지를 삭제하시겠습니까?\n(🧨주의: 삭제된 데이터는 되돌릴 수 없습니다.)")){
            return;
        }
    }
    $.ajax({
        url:"/images/delete/movie_desc/"+filename,
        type:"delete",
        success:function(result){
            alert(result.message);
            if(result.status) {
                movie_desc_list = movie_desc_list.filter((desc) => filename != desc.content);
                $(".description_list").html("");
                for(let i=0; i<movie_desc_list.length; i++) {
                    movie_desc_list[i].order = i+1;
                    let tag = ""
                    if(movie_desc_list[i].type == "img") {
                        tag = 
                            '<div class="desc_img_box" filename ="'+movie_desc_list[i].content+'">'+
                                '<img src="/images/movie_desc/'+movie_desc_list[i].content+'">'+
                                '<button onclick=deleteDescImg("'+movie_desc_list[i].content+'")>&times;</button>'+
                            '</div>';
                    }
                    if(movie_desc_list[i].type == "text") {
                        tag = '<div class="desc_text_box">'+
                            '<textarea cols="30" rows="10" id="text'+movie_desc_list[i].order+'" onkeyup=saveDescText('+movie_desc_list[i].order+')>'+movie_desc_list[i].content+'</textarea>'+
                            // '<button class="desc_text_save" onclick=saveDescText('+movie_desc_list[i].order+')>저장</button>'+
                            '<button class="desc_text_del" onclick=deleteDescText('+movie_desc_list[i].order+')>삭제</button>'+
                        '</div>' ;

                    }
                    $(".description_list").append(tag);
                }
            }
        }
    })
}

function saveDescText(order){
    // if($("#text"+order).prop("disabled")) {
    //     $("#text"+order+"button").html("저장");
    //     $("#text"+order).prop("disabled", false);
    // }
    // else{
        movie_desc_list.find(desc => desc.order == order).content = $("#text"+order).val();
    //     $("#text"+order+"+button").html("수정");
    //     $("#text"+order).prop("disabled",true);
    // }
}

function deleteDescText(order){
    if(edit_mode == 'edit') {
        if(!confirm("스토리 텍스트를 삭제하시겠습니까?\n(🍟주의: 삭제된 데이터는 되돌릴 수 없습니다.)")){
            return;
        }
    }
    if(!confirm("설명을 삭제하시겠습니까?")) return;
    movie_desc_list = movie_desc_list.filter((desc) => order != desc.order);
    $(".description_list").html("");
    for(let i=0; i<movie_desc_list.length; i++) {
        movie_desc_list[i].order = i+1;
        let tag = ""
        if(movie_desc_list[i].type == "img") {
            tag = 
                '<div class="desc_img_box" filename ="'+movie_desc_list[i].content+'">'+
                    '<img src="/images/movie_desc/'+movie_desc_list[i].content+'">'+
                    '<button onclick=deleteDescImg("'+movie_desc_list[i].content+'")>&times;</button>'+
                '</div>';
        }
        if(movie_desc_list[i].type == "text") {
            tag = '<div class="desc_text_box">'+
                '<textarea cols="30" rows="10" id="text'+movie_desc_list[i].order+'" onkeyup=saveDescText('+movie_desc_list[i].order+')>'+movie_desc_list[i].content+'</textarea>'+
                // '<button class="desc_text_save" onclick=saveDescText('+movie_desc_list[i].order+')>저장</button>'+
                '<button class="desc_text_del" onclick=deleteDescText('+movie_desc_list[i].order+')>삭제</button>'+
            '</div>' ;

        }
        $(".description_list").append(tag);
    }
}