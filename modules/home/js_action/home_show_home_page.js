class home_show_home_page extends ActionHandler {
    constructor(module, action, position_id, blank) {
        super(module, action);
        this.position_id = position_id;
        this.blank = blank;

    }
    prepareArgs() {
        this.php = true;
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);

            this.loadModuleScript("news", "do_select_action");
            this.loadModuleScript("repair", "show_repair_page");
            this.loadModuleScript("repair", "show_public_repair_page");
            this.loadModuleScript("notice", "show_select_page");
            this.loadModuleScript("notice", "show_notice_page");
            this.loadModuleScript("user_profile", "show_update_page");
            this.loadModuleScript("case", "do_select_action");
            this.loadModuleScript("login", "do_logout_action");
            this.loadModuleScript("case", "show_select_page");



            if (obj['status_code'] === 1) {
                (new news_do_select_action('news', 'do_select_action', 'news')).run();

                var utype = obj['pf'][0]["type"];
                console.log(utype);


                var str = `
                <header>
        <!-- Navbar -->
        <nav class="navbar fixed-top double-nav" style="height:51px">
            <!-- SideNav slide-out button -->
            <div class="float-left">
                <a href="#" data-activates="slide-out" class="button-collapse"><i class="fa fa-bars"></i> 
            </div>
            <!-- Breadcrumb-->
            <div class="breadcrumb-dn mr-auto">
                <p>華友聯</p>
            </div>
            <ul class="nav navbar-nav nav-flex-icons ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-gear fa-lg p-0" aria-hidden="true"></i> 設定
                     
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" onclick="(new user_profile_show_update_page('user_profile','show_update_page','body')).run()">基本資料</a> 
                        <a class="dropdown-item" onclick="(new login_do_logout_action('login','do_logout_action','body')).run()">登出</a>
						<a href="tel:077801381">聯絡我們</a>
                    </div>
                </li>
            </ul>
        </nav>
        <!-- /.Navbar -->
    </header>
                
                
    <div class="tab-content px-0 mt-3">
        <div class="tab-pane fade in show active" id="fix" role="tabpanel">
            <div class="container pl-1 pr-0 mt-2">
                 <div class="mt-1">
                    <button type="button"  class="btn btn-ins m-0 w-32" onclick="(new repair_show_repair_page('repair','show_repair_page','body','Hydropowerrepair','1')).run()"><i class="fa fa-s15" aria-hidden="true"></i></br>水電<br>報修</button>
                    <button type="button"  class="btn btn-cyan m-0 w-32" onclick="(new repair_show_repair_page('repair','show_repair_page','body','ElectricalEngineering','2')).run()"><i class="fa fa-desktop" aria-hidden="true"></i></br>電機<br>相關</button>
                    <button type="button"  class="btn btn-indigo m-0 w-32" onclick="(new repair_show_repair_page('repair','show_repair_page','body','Installationwork','3')).run()"><i class="fa fa-wrench" aria-hidden="true" ></i></br>安裝<br>工程</button>
                </div>
                <div class="mt-1">
                    <button type="button" id="pfbtn" class="btn btn-teal darken-3 m-0 w-32" click="checktype()"><i class="fa fa-building" aria-hidden="true" ></i></br>公設<br>維修</button>
                    <button type="button"  class="btn btn-red m-0 w-32" onclick="(new repair_show_repair_page('repair','show_repair_page','body','Furnituremaintenance','5')).run()"><i class="fa fa-bed" aria-hidden="true" ></i></br>家具<br>維修</button> 
                    <button type="button"  class="btn btn-deep-purple darken-3 m-0 w-32" onclick="(new repair_show_repair_page('repair','show_repair_page','body','CleaningServices','6')).run()"><i class="fa fa-bug" aria-hidden="true" ></i></br>清潔<br>服務</button>
                </div>
                <div class="mt-1">
                    <button type="button"  class="btn btn-warning m-0 w-49" onclick="(new repair_show_repair_page('repair','show_repair_page','body','Paintingworks','7')).run()"><i class="fa fa-paint-brush" aria-hidden="true" ></i></br>歲末油漆</button>
                    <button type="button"  class="btn btn-pink m-0 w-49" onclick="(new repair_show_repair_page('repair','show_repair_page','body','Other','8')).run()"><i class="fa fa-info" aria-hidden="true" ></i></br>其他維修</button>
                </div>


            </div>
            
            <div class="container-fluid text-left maxHeight" id="news"></div>
        </div>
    <!-- /.通知 -->
        <div class="tab-pane fade" id="notice" role="tabpanel">
            <div class="my-0 py-0 pt-3">
                <select class="mdb-select">
                        <option value="" disabled selected>全部顯示</option>
                        <option value="1">全部顯示</option>
                        <option value="2">完成通知</option>
                        <option value="3">時間通知</option>
                    </select>
            </div>
        </div>

        <!-- /.紀錄 -->
        <div class="tab-pane fade " id="record" role="tabpanel">
            
        </div>
    </div>
    
    <footer class="page-footer fixed-bottom font-small pt-0">
        <div class="container-fluid px-0">
            <div class="tabs-wrapper">
                <ul class="nav classic-tabs tabs-dark pl-3" role="tablist">
                    <li class="nav-item maxWidth" onclick="(new news_do_select_action('news', 'do_select_action', 'news')).run();">
                        <a href="#fix" id="homeb" class="nav-link waves-light active" data-toggle="tab" role="tab"><i class="fa fa-home  white-text fa-2x" aria-hidden="true"> </i>
                        </br>首頁</a>
                    </li>
                    <li class="nav-item maxWidth" onclick="(new case_show_select_page('case', 'show_select_page', 'record')).run();">
                        <a href="#record" id="recordb" class="nav-link waves-light" data-toggle="tab" role="tab"><i class="fa fa-history  white-text fa-2x" aria-hidden="true"> </i>
                        </br>紀錄</a>
                    </li>
                    <li class="nav-item maxWidth" onclick="(new notice_show_notice_page('notice','show_notice_page ','notice')).run()"> 
                        <a href="#notice" id="noticeb" class="nav-link waves-light" data-toggle="tab" role="tab"><i class="fa fa-bell white-text fa-2x" aria-hidden="true"></i>
                        
                        </br>通知</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
    
    <script>
        // SideNav Button Initialization
        $(".button-collapse").sideNav();
        // SideNav Scrollbar Initialization
        var sideNavScrollbar = document.querySelector('.custom-scrollbar');
        Ps.initialize(sideNavScrollbar);
        // SideNav Options>

        $(function() {
            $('#myTab a:last').tab('show')
        })
        $(document).ready(function() {
            $('.mdb-select').material_select();
        });
    </script>
                    `;

                document.getElementById(this.position_id).innerHTML = str;


                $(document).ready(function() {
                    $("#pfbtn").click(function checktype() {
                        if (utype == "pf_user") {
                            (new repair_show_public_repair_page('repair', 'show_public_repair_page', 'body')).run();
                        }
                        else {
                            alert("您沒有公設報修權限");
                        }


                    });




                });

                switch (this.blank) {
                    case 'home':
                        {
                            $('#homeb').click();
                            break;
                        }
                    case 'record':
                        {
                            $('#recordb').click();
                            break;
                        }
                    case 'notice':
                        {
                            $('#noticeb').click();
                            break;
                        }
                    default:
                        {
                            $('#homeb').click();
                            break;
                        }

                }



            }
            else if (obj['status_code'] == 2) {
                (new login_show_login_page("login", "show_login_page", "body")).run();
                var script = this.loadModuleScript("login", "show_login_page");
            }
            else if (obj['status_code'] == 5) {
                console.log("dd");
                (new home_show_home_page('home', 'show_home_page', 'body')).run();
                //var script = this.loadModuleScript("home", "show_home_page_E");
            }
            else {
                console.log("Invalid status code " + obj['status_code']);
            }
        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            document.getElementById(this.position_id).innerHTML = msg;
        }
    }
    ajax_error(msg) {


    }


}
