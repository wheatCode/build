class home_show_home_page_E extends ActionHandler {
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

            this.loadModuleScript("notice", "show_notice_page_E");
            this.loadModuleScript("notice", "show_select_page_E");
            this.loadModuleScript("case", "show_select_page_E");
            this.loadModuleScript("case", "show_repair_type_E"); //temp
            // this.loadModuleScript("case", "show_case_page_E"); //temp
            this.loadModuleScript("case", "show_search_page_E");
            this.loadModuleScript("case", "do_unfinish_E");
            this.loadModuleScript("case", "sign_E");
            this.loadModuleScript("case", "show_search_result_E");
            this.loadModuleScript("repair", "show_apply_date_E"); //temp
            this.loadModuleScript("repair", "show_repair_history_E");
            this.loadModuleScript("repair_company", "show_repair_company_E"); //temp
            this.loadModuleScript("contact", "show_contact_E");
            this.loadModuleScript("login", "show_login_page");




            if (obj['status_code'] === 1) {


                var str = `
                
    <!-- Start your project here-->
    <header>

        <!-- Navbar -->
        <nav class="navbar fixed-top navbar-toggleable-md navbar-expand-lg double-nav">
            <!-- SideNav slide-out button -->
            <div class="float-left">
                <a href="#" data-activates="slide-out" class="button-collapse"><i class="fa fa-bars"></i></a>
            </div>
            <!-- Breadcrumb-->
            <ul class="nav navbar-nav nav-flex-icons ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-gear fa-lg p-0" aria-hidden="true"></i> 設定
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" onclick="(new login_do_logout_action('login','do_logout_action','body')).run();">登出</a>
                    </div>
                </li>
            </ul>
        </nav>
        <!-- /.Navbar -->
    </header>
    
    <!-- /.搜尋 -->
    <div class="tab-content px-0 pt-4">
        <div class="tab-pane fade " id="search" role="tabpanel">
        
        </div>

        <!-- /.通知 -->
        <div class="tab-pane fade p-0 mt-4" id="notice" role="tabpanel">
            
        </div>
        <!-- /首頁. -->
        <div class="tab-pane fade in show active" id="home" role="tabpanel">
            
        </div>

    
    </div>



    <footer class="page-footer fixed-bottom font-small pt-0">
        <div class="container-fluid pl-0 pr-0">
            <div class="tabs-wrapper ">
                <ul class="nav classic-tabs tabs-dark" role="tablist">
                    <li class="nav-item maxWith" onclick="(new case_show_select_page_E('case', 'show_select_page', 'home')).run();">
                        <a href="#home" id="homeb" class="nav-link waves-light active" data-toggle="tab" role="tab"><i class="fa fa-home  white-text fa-2x" aria-hidden="true"> </i>
                        </br>首頁</a>
                    </li>
                    <li class="nav-item maxWith" onclick="(new case_show_search_page_E('case', 'show_search_page_E', 'search')).run();">
                        <a href="#search" id="searchb" class="nav-link waves-light" data-toggle="tab" role="tab"><i class="fa fa-search  white-text fa-2x" aria-hidden="true"> </i>
                        </br>搜尋</a>
                    </li>
                    <li class="nav-item maxWith" onclick="(new notice_show_notice_page_E('notice', 'show_notice_page_E', 'notice')).run();">
                        <a href="#notice" id="noticeb" class="nav-link waves-light" data-toggle="tab" role="tab"><i class="fa fa-bell white-text fa-2x" aria-hidden="true"></i>
                        <span class="counter">2</span>
                        </br>通知</a>
                    </li>
                </ul>
            </div>
        </div>



        <!--Footer Links-->


    </footer>


    <!-- /Start your project here-->


    <!-- SCRIPTS -->
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
                $(function() {
                    $('#myTab a:last').tab('show')
                })
                $(document).ready(function() {
                    $('.mdb-select').material_select();
                });
                document.getElementById(this.position_id).innerHTML = str;
                (new case_show_select_page_E('case', 'show_select_page_E', 'home')).run();



                switch (this.blank) {
                    case 'home':
                        {
                            $('#homeb').click();
                            break;
                        }
                    case 'search':
                        {
                            $('#searchb').click();
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
                (new login_show_login_page("login", "show_login_page", "body",3)).run();
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
