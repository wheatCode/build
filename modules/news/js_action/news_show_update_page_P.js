class news_show_update_page_P extends ActionHandler {
    constructor(module, action, position_id,type,newsTopic,newsContent,newsDate,newsId) {
        super(module, action);
        this.position_id = position_id;
        this.type=type;
        this.newsTopic= newsTopic;
        this.newsContent= newsContent;
        this.newsDate= newsDate;
        this.newsId= newsId;
        
        
    }
    prepareArgs() {
        this.addArgs("nid",this.newsId);
        this.php = true;
    }
    ajax_success(xhttp){
        var json_str = xhttp.responseText;
        var obj = JSON.parse(json_str);
        var newsTopic =this.newsTopic;
        
        
        this.newsContent = this.newsContent.split("<br><br>");
        console.log(this.newsId);
        
        
        var content = "";
        var num=1;
                content+= `
        <div class="row mt-0">
            <div class="col-lg-12 col-md-7">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold">新聞編輯</h1>
                </div>
                <from>
                <br>
                <label for="title" style="color:#757575">新聞標籤</label>
                <select class="mt-3 browser-default custom-select" id="title">
                            <option value="activities">好康活動</option>
                            <option value="latest">最新消息</option>
                            <option value="information">節慶資訊</option>
                </select>
                <div class="mt-2">
                    <label>新聞標題</label>
                    <input type="text" style="max-width:100%" id="topic" class="form-control mb-0 pb-1" value="${this.newsTopic}">
                 </div> 
                 <div id="showInsertText">
                 <label>新聞內容</label>
                 `;
                 for(var a in this.newsContent){
                  content+=`
                    <textarea id="content${num}" type="text"  class="md-textarea form-control" rows="10" placeholder="第 ${num} 段">${this.newsContent[a]}</textarea>
                    `;
                    num++;
                 }
                 
                 content+=`
                                  </div>
                 <div>
                                  <button class="rounded mb-3" id="insertText">+</button>
                    <label hidden>日期</label>
                    <input type="text" style="max-width:100%" id="date" class="form-control mb-0 pb-1" value="${this.newsDate}" hidden>
                </div>`;
                
                
                
                
                if(obj['news_img']){
                    
                    
                
                content+=`
                <div>
                    <label hidden>圖片</label>
                    <img src="${obj['news_img']}" class="w-100">
                </div>
                  `;      
                } 
                
                    
            content+=`
                    </select>
                    <div class="text-center mt-3 d-flex justify-content-center">
                                <div id="showButton" style="display:inline-block!important">
 <button onclick="(new news_do_update_action_P('news','do_update_action_P','body1',${this.newsId},${num-1})).run()" class="btn btn-blue darken-4 waves-effect px-5" type="submit">修改</button>
                    </div>
                     <button onclick="(new news_show_select_page_P('news','show_select_page_P','body1')).run()" class="btn btn-danger text-white waves-effect px-5">取消</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;
var em =this;
   $(document).ready(function() {
            $('#insertText').on('click',function() {
                var data = `<textarea type="text mr-0" style="max-width:100%" id="content${num}" class="md-textarea form-control" placeholder="第 ${num} 段" rows="5"></textarea>
                    `;
                    $('#showInsertText').append(data);
                    $('#showButton').html(`<button onclick="(new news_do_update_action_P('news','do_update_action_P','body1',${em.newsId},${num})).run()" class="btn btn-blue darken-4 waves-effect px-5" type="submit">修改</button>`);
                    
                   num++;  
            })
   });
   
                $('#' + this.position_id).html(content);
                this.loadModuleScript("news", "do_update_action_P");
                
    }
    ajax_error(msg) {
        // $('#' + this.position_id).html(msg.status);
    }      
}

 




