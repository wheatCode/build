class news_show_news_page extends ActionHandler {
    constructor(module, action, position_id, news_id) {
        super(module, action);
        this.position_id = position_id;
        this.news_id = news_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('nid', this.news_id);
    }
    ajax_success(xhttp) {
        var json_str = xhttp.responseText;
        //console.log(json_str);
        var obj = JSON.parse(json_str);
        console.log(1);
console.log(obj);
        //console.log(obj);
        var info = obj["news_info"];
        var img = obj["news_img"];
        var str = "";
        str += `               <header>
                            <!-- Navbar -->
                            <nav class="navbar bgdark text-white">
                                <div onclick="(new home_show_home_page('home','show_home_page','body','home')).run()">
                                <i class="fa fa-chevron-left text-white" aria-hidden="true"></i>
                                </div>
                                <span class="h6 m-auto pr-3 py-2">新聞111</span>
                            </nav>
                            <!-- /.Navbar -->
                            </header>
                            <br/>`;
        str += `<div class="container"><div class="pt-3"></div><div class="row border boxShadow rounded">
                <div class="col-2"></div>
                <div class="col-8"><span class="h5 m-0 m-auto pr-3 py-2">${info[0]["topic"]}</span></div>
                <div class="col-2"></div>
                </div>`;
        str += `<div class="row">
                <div class="col-1"></div>
                <div class="col-10"><img src="${img}" width="80%"></div>
                <div class="col-1"></div>
                </div>
                <div class="row">
                <div class="col-1"></div>
                <div class="col-10"><p>${info[0]["content"]}</p></div>
                <div class="col-1"></div>
                </div>`;

        str += `</div>`;
        document.getElementById(this.position_id).innerHTML = str;



    }



    ajax_error(xhttp) {


    }

}
