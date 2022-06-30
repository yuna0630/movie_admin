$(function(){
    edit_mode = 'edit';
    $("#genre_info").val(genre_no).prop("selected", true);
    $("#viewing_age").val(viewing_age).prop("selected", true);
    $("#movie_status").val(movie_status).prop("selected", true);

    console.log(genre_info);
    console.log(viewing_age);
    console.log(movie_status);

    $("input, button, textarea, select").prop("disabled", true);
    $("#edit").prop("disabled", false);
    $("#edit").click(function(){
        $("input, button, textarea, select").prop("disabled", false);
    });
})