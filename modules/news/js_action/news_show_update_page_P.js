class news_show_update_page_P extends ActionHandler {
    constructor(module, action, position_id,newsTopic,newsContent,newsDate,newsId) {
        super(module, action);
        this.position_id = position_id;
        this.newsTopic= newsTopic;
        this.newsContent= newsContent;
        this.newsDate= newsDate;
        this.newsId= newsId;
        
        
    }
    prepareArgs() {
        this.php = false;
    }
    showResult(xhttp){
        var newsTopic =this.newsTopic;
       
        console.log(newsTopic);
        
        
                var content = "";
                content+= `
        <div class="row mt-0">
            <div class="col-lg-12 col-md-7">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold">廠商編輯</h1>
                </div>
                <from>
                <div class="mt-2">
                    <label>新聞標題</label>
                    <input type="text" style="max-width:100%" id="topic" class="form-control mb-0 pb-1" value="${this.newsTopic}">
                 </div> 
                 <div>
                    <label>新聞內容</label>
                    <input type="text" style="max-width:100%" id="content" class="form-control mb-0 pb-1" value="${this.newsContent}">
                 </div>
                 <div>
                    <label hidden>日期</label>
                    <input type="text" style="max-width:100%" id="date" class="form-control mb-0 pb-1" value="${this.newsDate}" hidden>
                </div>
                
                        `;
                    
                
                    
            content+=`
                    </select>
                    </div>
                    <div class="text-center mt-3">
                        <button onclick="(new news_do_update_action_P('news','do_update_action_P','body1','${this.newsId}')).run()" class="btn btn-blue darken-4 waves-effect px-5" type="submit">修改</button>
                        <button onclick="(new news_show_select_page_P('news','show_select_page_P','body1')).run()" class="btn btn-danger text-white waves-effect px-5">取消</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;
                $('#' + this.position_id).html(content);
                this.loadModuleScript("news", "show_select_page_P");
                this.loadModuleScript("news", "do_update_action_P");
                
    }
          
}

 




