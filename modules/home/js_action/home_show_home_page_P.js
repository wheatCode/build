class home_show_home_page_P extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;

    }
    prepareArgs() {
        this.php = true;
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            
            this.loadModuleScript("user_profile", "show_select_page_p");
            this.loadModuleScript("case", "show_select_page_p");
            this.loadModuleScript("repair_company", "show_select_page_P");
            this.loadModuleScript("news", "show_select_page_P");
            



            if (obj['status_code'] === 1) {
                



                var str = `
                <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark flex w-100 z-index999">
            <a onclick="(new home_show_home_page_P('home','show_home_page_P','body')).run()"class="nav-link"><img src="http://www.huayulien.com/wp-content/uploads/2015/04/H-logo-e1429491876768.png" class="img-fluid flex-center"></a>

            <ul class="navbar-nav nav-flex-icons mr-auto">

                <li class="nav-item">
                    <a onclick="(new user_profile_show_select_page_p('user_profile','show_select_page_p','body1')).run()" class="nav-link" id="userProfile">
                        <p class="white-text">使用者管理</p>
                    </a>
                </li>

                <li class="nav-item">
                    <a onclick="(new case_show_select_page_p('case','show_select_page_p','body1')).run()"class="nav-link">
                        <p class="white-text">案件管理</p>
                    </a>
                </li>

                <li class="nav-item ">
                    <a onclick="(new repair_company_show_select_page_P('repair_company','show_select_page_P','body1')).run()"class="nav-link">
                        <p class="white-text">廠商管理</p>
                    </a>
                </li>

                <li class="nav-item ">
                    <a onclick="(new building_show_management_page('building','show_management_page','body1')).run()"class="nav-link">
                        <p class="white-text">建案管理</p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a onclick="(new news_show_select_page_P('news','show_select_page_P','body1')).run()"class="nav-link">
                        <p class="white-text">新聞管理</p>
                    </a>
                </li>
            </ul>


            <ul class="navbar-nav nav-flex-icons ml-auto">
                <li class="dropdown ">
                    <a class="nav-link dropdown-toggle " href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-bell white-text fa-10x mt-1" aria-hidden="true"></i> 
                    </a>
                    <div class="dropdown-menu dropdown-menu-right mt-2" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="case.html">編號:B123456----案件已逾期</a>
                        <a class="dropdown-item" href="case.html">編號:C983147----案件已逾期</a>
                        <a class="dropdown-item" href="case.html">編號:F373991----案件已逾期</a>
                    </div>
                </li>



                <li class="dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-user-circle fa-2x white-text" aria-hidden="true"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right mt-2" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">登出</a>
                    </div>
                </li>
            </ul>

        </nav>
    </header>
     <div class="container" style="padding-top:75px" id="body1">
     </div>
                    `;

                document.getElementById(this.position_id).innerHTML = str;
           


                // switch (this.blank) {
                //     case 'home':
                //         {
                //             $('#homeb').click();
                //             break;
                //         }
                //     case 'record':
                //         {
                //             $('#recordb').click();
                //             break;
                //         }
                //     case 'notice':
                //         {
                //             $('#noticeb').click();
                //             break;
                //         }
                //     default:
                //         {
                //             $('#homeb').click();
                //             break;
                //         }

                // }



            }
            else if (obj['status_code'] == 2) {
                (new login_show_login_page("login", "show_login_page", "body")).run();
                var script = this.loadModuleScript("login", "show_login_page");
            }
            else if (obj['status_code'] == 5) {
                console.log("dd");
                (new home_show_home_page_P('home', 'show_home_page_P', 'body')).run();
                var script = this.loadModuleScript("home", "show_home_page_P");
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
