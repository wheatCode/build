class notice_show_select_page_E extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        // this.id = id;
        // this.type = type;
        // this.title = title;
        // this.repair_title = repair_title;
        // this.content = content;
        // this.repairCompany = repairCompany;
        // this.end_datetime = end_datetime;
        // this.building = building_header + " " + building_footer;
    }
    prepareArgs() {
        this.php = false;
    }
    showResult() {
        var str = "";

        str += `
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
            </ul>
            <div class="sidenav-bg mask-strong"></div>
        </div>
        <!--/. Sidebar navigation -->
        <!-- Navbar -->

        <nav class="navbar bgdark text-white py-1">
            <a class="navbar-brand text-right" href="index.html">
            <i class="fa fa-chevron-left text-white" aria-hidden="true"></i>
        </a>
            <span class="h6 m-auto pr-3 font30">
                   ??????????????????
            </span>
        </nav>
        <!-- /.Navbar -->
    </header>

    <div class="container mt-4 pt-0 font30">
        <div class="row border boxShadow mt-2">
            <div class="col-12">
                <div class="row">
                    <div class="col-4">
                        <span>??????: JIA</span>
                    </div>
                    <div class="col-4">
                        <span></span>
                    </div>
                    <div class="col-4">
                        <span>??????: 1070001</span>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-4">
                        <span>????????????:</span>
                        <span>2016/01/02</span>
                    </div>
                    <div class="col-4">

                    </div>
                    <div class="col-4">
                        <span>????????????:</span>
                        <span>2016/05/02</span>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-4">
                        <span>??????: A5-2</span>
                    </div>
                    <div class="col-4">
                        <span>????????????: ?????????</span>
                    </div>
                    <div class="col-4">
                        <span>?????????: ?????????</span>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-4">
                        <span>??????: 735-4496</span>
                    </div>
                    <div class="col-4">

                    </div>
                    <div class="col-4">
                        <span>????????????:?????????</span>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <span>??????: ??????????????????132???</span>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <span>????????????: ????????????</span>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <span>??????:</span>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <textarea class="form-control rounded-0" id="exampleFormControlTextarea1" rows="10" placeholder=" ?????????????????????????????????????????????" disabled></textarea>
                    </div>
                </div>
            </div>
            <div class="col-12 border boxShadow">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="font30">????????????</th>
                            <th class="font30">????????????</th>
                            <th class="font30">??????</th>
                            <th class="font30">??????</th>
                            <th class="font30">????????????</th>
                            <th class="font30">????????????</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td class="font30"></td>
                            <td class="font30"></td>
                            <td class="font30"></td>
                            <td class="font30"></td>
                            <td class="font30"></td>
                        </tr>
                    </tbody>
                    <!--Table body-->
                </table>
            </div>
            <div class="col-12 ">
                <div class="row">
                    <div class="col-12">
                        <span>????????????:</span>
                    </div>
                    <div class="col-12">
                        <table class="table table-bordered">
                            <tr>
                                <th class="font30">2018/05/02</th>
                                <th class="font30">????????????????????????</th>
                            </tr>
                            <tr>
                                <th class="font30">2018/05/12</th>
                                <th class="font30">??????????????????</th>
                            </tr>
                            <tr>
                                <th class="font30">2018/05/15</th>
                                <th class="font30">??????6/1??????</th>
                            </tr>
                            <tr>
                                <th class="font30">2018/05/16</th>
                                <th>
                                    <div class="row">
                                        <div class="col-8"><input type="text" /></div>
                                        <div class="col-4"><button type="button" class="btn btn-indigo font30">??????</button></div>
                                    </div>
                                </th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="row mx-2">
        <div class="col-7">
            <div class="col-12 selectfont">
                <select class="mdb-select selectfont">
                        <option value="" disabled selected>???????????????</option>
                        <option value="1">???????????????</option>
                        <option value="2">???????????????</option>
                        <option value="3">???????????????</option>
                        <option value="4">???????????????</option>
                        <option value="5">???????????????</option>
                        <option value="6">???????????????</option>
                        <option value="7">???????????????</option>
                        <option value="8">???????????????</option>
                    </select>
            </div>
            <table class="table">
                <tr>
                    <th scope="col" class="px-2 font30">????????????</th>
                    <th scope="col" class="pl-2 font30">????????????</th>
                    <th scope="col" class="pl-2 font30">????????????</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th class="pt-4 pl-3 font30">????????????</th>
                        <td class="pt-4 font30">07-5512234</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a type="button" class="btn bg-transparent p-2" href="RepairCompony.html">
                                                    <i class="fa fa-file fa-lg text-dark"></i>
                                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="pt-4 pl-3 font30">????????????</th>
                        <td class="pt-4 font30">07-5531158</td>
                        <td>
                            <div class="btn-group font30" role="group" aria-label="Basic example">
                                <a type="button" class="btn bg-transparent p-2" href="RepairCompony.html">
                                                    <i class="fa fa-file fa-lg text-dark"></i>
                                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="pt-4 pl-3 font30">????????????</th>
                        <td class="pt-4 font30">07-5631158</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a type="button" class="btn bg-transparent p-2" href="RepairCompony.html">
                                                    <i class="fa fa-file fa-lg text-dark"></i>
                                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="pt-4 pl-3 font30">????????????</th>
                        <td class="pt-4 font30">07-5531155</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a type="button" class="btn bg-transparent p-2" href="RepairCompony.html">
                                                    <i class="fa fa-file fa-lg text-dark"></i>
                                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-5 font30">
            <div class="col-12 mt-4">
                <span>??????????????????</span>
            </div>
            <div class=" mt-2 ">
                <div class="form-check">
                    <input class="form-check-input " name="group100" type="radio" id="radio100">
                    <label class="form-check-label font30" for="radio100">2017/02/03 07:00</label>
                </div>
            </div>
            <div class=" mt-2 ">
                <div class="form-check">
                    <input class="form-check-input " name="group100" type="radio" id="radio101">
                    <label class="form-check-label font30" for="radio101">2017/02/04 06:00</label>
                </div>
            </div>
            <div class=" mt-2 ">
                <div class="form-check">
                    <input class="form-check-input " name="group100" type="radio" id="radio102">
                    <label class="form-check-label font30" for="radio102">??????:</label>
                    <div class="form-check">
                        <div class="row my-0">
                            <div class="col-5">
                                <input type="date" class="form-control" id="month1" placeholder="Enter month">
                            </div>
                            <div class="col-3">
                                <input placeholder="??????" type="text" id="input_starttime1" class="form-control timepicker">
                            </div>
                            <div class="col-3">
                                <input placeholder="~" type="text" id="input_starttime1" class="form-control timepicker">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class=" mt-2 ">
                <button type="button" class="btn btn-indigo font30">??????</button>
            </div>
        </div>
    </div>

    </div>
    </div>
  	`;



        document.getElementById(this.position_id).innerHTML = str;
    }
}
