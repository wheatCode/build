class news_do_select_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;

    }
    prepareArgs() {
        this.php = true;
    }
    ajax_success(xhttp) {
        var json_str = xhttp.responseText;
        //console.log(json_str);
        var obj = JSON.parse(json_str);
        var info = obj['news_info'];
        var img = obj['news_img'];
        this.loadModuleScript("news", "show_news_page");
        var str = "";
        str += `<div id="area">`;
        for (var i in info) {

            str += `<div class="row mt-0"><div class="col-12"><a  onclick="(new news_show_news_page('news', 'show_news_page', 'body', '${info[i]["id"]}')).run();"><div class="row mt-2"><div class="col px-0"><div class="row border boxShadow mx-1 mt-0"><div class="col-5 px-0">`;
            str += '<img src="' + obj['news_img'][i] + '" alt="" srcset="" width="85px" height="80px"></div><div class="col-7 pl-0 pr-1 my-0"><h5 class="font-weight-bold my-1">';
            str += info[i]['topic'] + '</h5></div></div></div></div></a></div></div>';


        }
        str += `</div>`;



        document.getElementById(this.position_id).innerHTML = str;

    }



    ajax_error(xhttp) {


    }

}
