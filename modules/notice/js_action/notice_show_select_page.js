class notice_show_select_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        // this.id = id;
        this.type = 'finish';
        // this.title = title;
        // this.repair_title = repair_title;
        // this.content = content;
        // this.repairCompany = repairCompany;
        // this.end_datetime = end_datetime;
        // this.building = building_header + " " + building_footer;
        // console.log(this.building);
    }
    prepareArgs() {
        this.php = false;
    }
    showResult() {
        var str = "";

        if (this.type === "finish") {
            str += `
            <!-- Start your project here-->
    <header>
        <!-- Sidebar navigation -->
        <div id="slide-out" class="side-nav sn-bg-4 fixed">
            <ul class="custom-scrollbar">
                <!-- Logo -->
                <li>
                    <div class="logo-wrapper waves-light">
                        <a href="#"><img src="http://www.huayulien.com/wp-content/uploads/2015/04/H-logo-e1429491876768.png" class="img-fluid flex-center"></a>
                    </div>
                </li>
                <!--/. Logo -->
                <!--Social-->
                <li>
                    <ul class="social">
                        <li><a href="#" class="icons-sm fb-ic"><i class="fa fa-facebook"> </i></a></li>
                        <li><a href="#" class="icons-sm pin-ic"><i class="fa fa-pinterest"> </i></a></li>
                        <li><a href="#" class="icons-sm gplus-ic"><i class="fa fa-google-plus"> </i></a></li>
                        <li><a href="#" class="icons-sm tw-ic"><i class="fa fa-twitter"> </i></a></li>
                    </ul>
                </li>
                <!--/Social-->
                <!--Search Form-->
                <li>
                    <form class="search-form" role="search">
                        <div class="form-group md-form mt-0 pt-1 waves-light">
                            <input type="text" class="form-control" placeholder="Search">
                        </div>
                    </form>
                </li>
                <!--/.Search Form-->
                <!-- Side navigation links -->
                <li>

                    <div class="sidenav-bg mask-strong"></div>
        </div>
        <!--/. Sidebar navigation -->
        <!-- Navbar -->

        <nav class="navbar bgdark text-white py-1">
            <div onclick="(new home_show_home_page('home','show_home_page','body','notice')).run()">
            <i class="fa fa-chevron-left text-white" aria-hidden="true"></i>
        </div>
            <span class="h6 m-auto pr-3">
                   評價
            </span>
        </nav>
        <!-- /.Navbar -->
    </header>
    
         <div class="row mr-1 ml-1">
        <div class="col-12 border boxShadow rounded p-3">
            <p class="h6">此次維修已完成，請給予我們評價和意見，感謝您!</p>

        </div>
        <div class="col-12 mt-2 font-weight-bold">
            維修項目:<input type="text" class="form-control my-0 pb-0" id="month1" placeholder="Enter month" readonly="readonly" value="水電報修">
        </div>
        <div class="col-12 mt-2 font-weight-bold">
            待修狀況:<input type="text" class="form-control my-0 pb-0" id="month1" placeholder="Enter month" readonly="readonly" value="壁癌">
        </div>
        <div class="col-12 mt-2 font-weight-bold">
            維修內容:<input type="text" class="form-control my-0 pb-0" id="month1" placeholder="Enter month" readonly="readonly" value="壁癌處理、重新粉刷">
        </div>
        <div class="col-12 mt-2 font-weight-bold">
            地點:<input type="text" class="form-control my-0 pb-0" id="month1" placeholder="Enter month" readonly="readonly" value="舞樂天B5-5">
        </div>
        <div class="col-12 mt-2 font-weight-bold">
            日期:<input type="text" class="form-control my-0" id="month1" placeholder="Enter month" readonly="readonly" value="03/08/2018 4:00PM">
        </div>
        <div class="col-12 mt-2 font-weight-bold">
            維修廠商:<input type="text" class="form-control my-0" id="month1" placeholder="Enter month" readonly="readonly" value="03/08/2018 4:00PM">
        </div>
        <div class="col-12 mt-2 font-weight-bold">
            評價:
            <span id="start01" class="fa fa-star"></span>
            <span id="start02" class="fa fa-star"></span>
            <span id="start03" class="fa fa-star"></span>
            <span id="start04" class="fa fa-star"></span>
            <span id="start05" class="fa fa-star"></span>
            <!--沒辦法就暫時用這個簡單版的 -->
        </div>
        <div class="col-12 mt-2 font-weight-bold">
            意見回復:
            <textarea type="text" id="materialFormContactMessageEx" class="form-control md-textarea" rows="5"></textarea>

        </div>
        <a href="testindex.html "><button type="button " class="btn btn-primary rounded ">送出</button></a>

    </div>
  	`
        }
        else if (this.type === "cancel") {
            str += `<!--/. Sidebar navigation -->
<!-- Navbar -->
<nav class="navbar bgdark text-white py-1" style="height:51px">
    <div onclick="(new home_show_home_page('home','show_home_page','body','notice')).run()">
        <i class="fa fa-chevron-left text-white" aria-hidden="true"></i>
    </div>
    
    <span class="h6 m-auto pr-3">
        報修取消通知
    </span>
</nav>
<!-- /.Navbar -->
</header>

<div class="container mt-2">
    <div class="row mr-1 ml-1">
        <div class="col-12 border boxShadow rounded p-3">
            <p class="h5">報修取消通知</p>
            <p class="h6">我們將幫您取消維修服務</p>
            <div class="fclass="mt-1 font-weight-bold"">
                時間:
                <input type="text" class="form-control my-0 pb-0" id="month1" placeholder="Enter month" readonly="readonly" value="${this.end_datetime}">
            </div>
            <div class="mt-1 font-weight-bold">
                維修項目:
                <input type="text" class="form-control my-0 pb-0" id="month1" placeholder="Enter month" readonly="readonly" value="${this.repair_title}">
            </div>
            <div class="mt-1 font-weight-bold">
                維修原因:
                <textarea type="text" id="materialFormContactMessageEx" class="form-control" style="background-color:#e9ecef" rows="4" readonly="readonly">${this.content}</textarea>
            </div>
            <div class="mt-1 font-weight-bold">
                地點:
                <input type="text" class="form-control my-0 pb-0" id="month1 " placeholder="Enter month " readonly="readonly" value="${this.building}">
                <!--<label>Example label</label> -->
            </div>
            <div class="mt-1 font-weight-bold">
                維修廠商:
                <input type="text" class="form-control my-0 pb-0" id="month1 " placeholder="Enter month " readonly="readonly" value="${this.repairCompany}">
                <!--<label>Example label</label> -->
            </div>
        </div>
            <button type="button " class="btn btn-primary rounded" onclick="(new home_show_home_page('home','show_home_page','body','notice')).run()">確認</button>
    </div>
</div>

<!-- /Start your project here-->

  	`;
        }
        else if (this.type === "confirm") {
            str += `<!--/. Sidebar navigation -->
<!-- Navbar -->
<nav class="navbar bgdark text-white py-1" style="height:51px">
    <div onclick="(new home_show_home_page('home','show_home_page','body','notice')).run()">
        <i class="fa fa-chevron-left text-white" aria-hidden="true"></i>
    </div>
    
    <span class="h6 m-auto pr-3">
        報修確認通知
    </span>
</nav>
<!-- /.Navbar -->
</header>

<div class="container mt-2">
    <div class="row mr-1 ml-1">
        <div class="col-12 border boxShadow rounded p-3">
            <p class="h5">報修確認通知</p>
            <p class="h6">我們將會在以下時間為您服務</p>
            <div class="font-weight-bold">
                時間:
                <input type="text" class="form-control my-0 pb-0" placeholder="Enter month" readonly="readonly" value="${this.end_datetime}">
            </div>
            <div class="mt-1 font-weight-bold">
                維修問題:<input type="text" class="form-control my-0 pb-0" id="month1" placeholder="Enter month" readonly="readonly" value="${this.title}">
            </div>
            <div class="mt-1 font-weight-bold">
                當前維修項目:<input type="text" class="form-control my-0 pb-0" id="month1" placeholder="Enter month" readonly="readonly" value="${this.repair_title}">
            </div>
            <div class="mt-1 font-weight-bold">
                維修內容:<textarea type="text" id="materialFormContactMessageEx" class="form-control" style="background-color:#e9ecef" rows="4" readonly="readonly">${this.content}</textarea>
            </div>
            <div class="mt-1 font-weight-bold">
                地點:
                <input type="text" class="form-control my-0 pb-0" placeholder="Enter month " readonly="readonly" value="${this.building}">
                <!--<label>Example label</label> -->
            </div>
            <div class="mt-1 font-weight-bold">
                維修廠商:
                <input type="text" class="form-control my-0 pb-0" placeholder="Enter month " readonly="readonly" value="${this.repairCompany}">
                <!--<label>Example label</label> -->
            </div>
        </div>
            <button type="button " class="btn btn-primary rounded" onclick="(new home_show_home_page('home','show_home_page','body','notice')).run()">確認</button>
        
            <button type="button " class="btn btn-danger rounded ">取消維修</button>
        
    </div>
</div>

<!-- /Start your project here-->

  	`;
        }
        document.getElementById(this.position_id).innerHTML = str;

        $(document).ready(function() {
            $('#start01').mouseenter(function() {
                $('#start01').addClass('checked');
            }).mouseleave(function() {
                $('#start01').removeClass('checked');
            }).on('click', function() {
                $('#start01').addClass('checked');
                console.log(1);
            });
            $('#start02').mouseenter(function() {
                $('#start01').addClass('checked');
                $('#start02').addClass('checked');
            }).mouseleave(function() {
                $('#start01').removeClass('checked');
                $('#start02').removeClass('checked');
            }).on('click', function() {
                $('#start01').addClass('checked');
                $('#start02').addClass('checked');
                console.log(2);
            });
            $('#start03').mouseenter(function() {
                $('#start01').addClass('checked');
                $('#start02').addClass('checked');
                $('#start03').addClass('checked');
            }).mouseleave(function() {
                $('#start01').removeClass('checked');
                $('#start02').removeClass('checked');
                $('#start03').removeClass('checked');
            }).on('click', function() {
                $('#start01').addClass('checked');
                $('#start02').addClass('checked');
                $('#start03').addClass('checked');
                console.log(3);
            });
            $('#start04').mouseenter(function() {
                $('#start01').addClass('checked');
                $('#start02').addClass('checked');
                $('#start03').addClass('checked');
                $('#start04').addClass('checked');
            }).mouseleave(function() {
                $('#start01').removeClass('checked');
                $('#start02').removeClass('checked');
                $('#start03').removeClass('checked');
                $('#start04').removeClass('checked');
            }).on('click', function() {
                $('#start01').addClass('checked');
                $('#start02').addClass('checked');
                $('#start03').addClass('checked');
                $('#start04').addClass('checked');
                console.log(4);
            });
            $('#start05').mouseenter(function() {
                $('#start01').addClass('checked');
                $('#start02').addClass('checked');
                $('#start03').addClass('checked');
                $('#start04').addClass('checked');
                $('#start05').addClass('checked');
            }).mouseleave(function() {
                $('#start01').removeClass('checked');
                $('#start02').removeClass('checked');
                $('#start03').removeClass('checked');
                $('#start04').removeClass('checked');
                $('#start05').removeClass('checked');
            }).on('click', function() {
                $('#start01').addClass('checked');
                $('#start02').addClass('checked');
                $('#start03').addClass('checked');
                $('#start04').addClass('checked');
                $('#start04').addClass('checked');
                console.log(5);
            });
        });
    }
}
