$(function () {
    // 根据本地缓存的id切换显示对应的页面
    if(sessionStorage.getItem('changeId') - 0 == 0){
        $('.figure_box').show().siblings().hide();
        $('.top_ctl li').eq(0).addClass('active').siblings().removeClass('active');
    }

    if(sessionStorage.getItem('changeId') - 0 == 1){
        $('.top_column_set').show().siblings().hide();
        $('.top_ctl li').eq(1).addClass('active').siblings().removeClass('active');
        
    }

    /**
     * 已发布稿件信息页面
     */

    // jQuery.ajax({
    //     "url": deleteAssetURL,
    //     "dataType": "jsonp",
    //     "data": {"hosts": host},
    //     "error": errorAjax,
    //     "beforeSend": start_load_pic,
    //     "complete": stop_load_pic,
    //     "success": function (data) {
    //         if (!data.status) {
    //             showErrorInfo(data.content);
    //             return false;
    //         }
    //         else {


    //         }
    //     }
    // });


    // 将这一段注释掉，这个是模拟数据
    var dataContent = {
        "content": [{
            "articlechannel": "VICE",
            "updateTime": "2018-04-05 20:11:05",
            "commentnum": 1,
            "articlespecial": "纵横",
            "describe": "十九大精神学习热潮",
            "readnum": 1222,
            "editUser": "邢冠文",
            "collectionnum": 123,
            "id": 1,
            "title": "《粉雄救兵》利用女性来煽情的伎俩其实相当牵强",
            "author": "邢冠文",
            "createTime": "2018-03-11 11:03:20",
            "describes": "111",
            "fabulousnum": 1111,
            "articlecolumn": "事儿"
        }],
        "status": true,
        "comment": [{
            "commontimg": "../../uploadimg/123.jpg",
            "id": 1,
            "commontcontent": "这篇文章真的是不错，强烈推荐",
            "commenttime": "38"
        }, {
            "commontimg": "../../uploadimg/321.jpg",
            "id": 2,
            "commontcontent": "这篇文章真心的一般，没有人的涵养在里面",
            "commenttime": "38"
        }],
        "reply": []
    }

    // 从这里开始--------------------------------------复制到上面的ajax的成功回掉函数内
    dataContent = dataContent.content[0];
    // 渲染已发布文章详情页
    var releaseArticleDetailsHtml = '';
    releaseArticleDetailsHtml = `<div class="col-md-8 cb">
                                    <h5>稿件基本信息</h5>
                                    <div class="row">
                                        <div class="col-md-4">稿件标题：</div>
                                        <div class="col-md-8">${dataContent.title}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">作者：</div>
                                        <div class="col-md-8">${dataContent.author}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">所属品牌/频道：</div>
                                        <div class="col-md-8">${dataContent.articlechannel}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">所属栏目：</div>
                                        <div class="col-md-8">${dataContent.articlespecial}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">所属专题：</div>
                                        <div class="col-md-8">${dataContent.articlecolumn}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">发布时间：</div>
                                        <div class="col-md-8">${dataContent.createTime}</div>
                                    </div>
                                    <form class="" id="setArticleNum" sid="${dataContent.id}">
                                        <h5>设置基础阅读数</h5>
                                        <div class="row">
                                            <label for="inputEmail3" class="col-sm-4 control-label">基础阅读数据</label>
                                            <div class="col-sm-4">
                                                <input type="email" class="form-control" id="readnum" placeholder="请输入基础数据" value="${dataContent.readnum || 1000}">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label for="inputPassword3" class="col-sm-4 control-label">基础点赞数</label>
                                            <div class="col-sm-4">
                                                <input type="text" class="form-control" id="fabulousnum" placeholder="请输入基础数据" value="${dataContent.fabulousnum || 1000}">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-offset-1 col-sm-4">
                                                <button type="submit" sytle="background: #000;" class="btn btn-default" id="saveArticleInfo">保存</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-md-4">
                                    <h5>浏览数据</h5>
                                    <div class="row">
                                        <div class="col-md-4">收藏人数：</div>
                                        <div class="col-md-6">${dataContent.collectionnum || 1000}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">阅读数量：</div>
                                        <div class="col-md-6">${dataContent.readnum || 1000}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">点赞数量：</div>
                                        <div class="col-md-6">${dataContent.fabulousnum || 1000}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">评论数量：</div>
                                        <div class="col-md-6">${dataContent.commentnum || 1000}</div>
                                    </div>
                                </div>`;
    $('#showArticleInfo').html(releaseArticleDetailsHtml);
    // 从这里结束--------------------------------------复制到上面的ajax的成功回掉函数内


    // 将设置的基础阅读数据发送给后台
    $('#showArticleInfo').on('click', function (e) {
        var articleReadnum = $('#readnum').val().trim(),
            articleFabulousnum = $('#fabulousnum').val().trim(),
            articleId = $('#setArticleNum').attr('sid'),
            data = {};
        if (e.target.id == 'saveArticleInfo') {
            if (articleReadnum == '' && articleFabulousnum == '' && articleId == '') {
                alert('请设置基础数据')
            } else {
                data = {
                    "id": articleId,
                    "readnum": articleReadnum,
                    "fabulousnum": articleFabulousnum
                };
                data = JSON.stringify(data);
                // jQuery.ajax({
                //     "url": deleteAssetURL,
                //     "dataType": "jsonp",
                //     "data": {"data": data},
                //     "error": errorAjax,
                //     "beforeSend": start_load_pic,
                //     "complete": stop_load_pic,
                //     "success": function (data) {
                //         if (!data.status) {
                //             showErrorInfo(data.content);
                //             return false;
                //         }
                //         else {


                //         }
                //     }
                // });
            }
        }
    })

    /**
     * 互动信息页面
     */
    function showInteractList(interactData) {
        var interactData = {
            "status": true,
            "content": [{
                "commontid": 1,
                "commoonttime": "2018-03-28 10:41:08",
                "commontcontent": "这篇文章真的是不错，强烈推荐",
                "articleid": 1,
                "commontimg": "../../uploadimg/123.jpg",
                "commontAuthor": "VICE团队",
                "reply": [{
                    "replycontent": "大家的认知度还是蛮高的，我也比较认可",
                    "replyid": 1,
                    "id": 1,
                    "commontid": 1,
                    "replyAuthor": "鲁班"
                }, {
                    "replycontent": "这个的社会响应不错",
                    "replyid": 2,
                    "id": 2,
                    "commontid": 1,
                    "replyAuthor": "亚瑟"
                }],
                "id": 1
            }, {
                "commontid": 2,
                "commoonttime": "2018-03-28 10:42:40",
                "commontcontent": "这篇文章真心的一般，没有人的涵养在里面",
                "articleid": 1,
                "commontimg": "../../uploadimg/321.jpg",
                "commontAuthor": "大仙",
                "reply": [{
                    "replycontent": "还是不出错的好",
                    "replyid": 3,
                    "id": 3,
                    "commontid": 2,
                    "replyAuthor": "李白"
                }, {
                    "replycontent": "总体感觉是不错的",
                    "replyid": 4,
                    "id": 4,
                    "commontid": 2,
                    "replyAuthor": "雅典娜"
                }],
                "id": 2
            }]
        };
        var interactHtml = '';
        interactCommontHtml = '',
        interactBackHtml = '',
        interactListHtml = '',
        replyData = '';
        $.each(interactData.content, function(i, v){
            replyData = v.reply;
            interactCommontHtml = `<tr>
                                        <td class="time">${v.commoonttime}</td>
                                        <td class="commont">${v.commontAuthor}</td>
                                        <td style="white-space: wrap;" class="commontContent">${v.commontcontent}</td>
                                        <td style="white-space: wrap;" class="backSelf"></td>
                                        <td style="white-space: wrap;" class="backContent"></td>
                                        <td>
                                            <button class="btn btn-primary btn-xs" articleid="${v.articleid}">删除</button>
                                        </td>
                                    </tr>`;
            $.each(replyData, function(index, val){
                console.log(val)
                // interactBackHtml = interactCommontHtml;
                if(index == 0){
                    interactBackHtml = interactCommontHtml
                }
                interactBackHtml += `<tr>
                                            <td class="time">${v.commoonttime}</td>
                                            <td class="commont">${v.commontAuthor}</td>
                                            <td style="white-space: wrap;" class="commontContent">${v.commontcontent}</td>
                                            <td style="white-space: wrap;" class="backSelf">${val.replyAuthor}</td>
                                            <td style="white-space: wrap;" class="backContent">${val.replycontent}</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs" articleid="${val.articleid}" replyid="${val.replyid}">删除</button>
                                            </td>
                                        </tr>`;
            })
            // console.log(interactBackHtml)
            interactListHtml += interactBackHtml;
        })
        $('#interactList').html(interactListHtml);
    }

    showInteractList();
    // 加载互动页面列表数据
    // jQuery.ajax({
    //     "url": deleteAssetURL,
    //     "dataType": "jsonp",
    //     "data": {"hosts": host},
    //     "error": errorAjax,
    //     "beforeSend": start_load_pic,
    //     "complete": stop_load_pic,
    //     "success": function (data) {
    //         if (!data.status) {
    //             showErrorInfo(data.content);
    //             return false;
    //         }
    //         else {
    //             window.interactData = data.content;
    //         }
    //     }
    // });

    // 删除
    $('#interactList').on('click', function (e) {
        if (e.target.className == 'btn btn-primary btn-xs') {
            
        }
    })


    // 搜索
    function AssetsearchValue(input) {
        var searchValue = input.value.toLowerCase();
        var table = $("table").find("tbody tr");
        var trarr = new Array()
        for (var i = 0; i < interactData.length; i++) {
            if (JSON.stringify(interactData[i]).match(searchValue)) {
                trarr.push(interactData[i]);
            }
        }
        serversConfigFoot(1, trarr, 20);
    };
    
    $(document).on('keyup', '.AssetsearchValue', function () {
        AssetsearchValue(this);
    });


    // 切换已发布稿件和互动页面
    $('.top_ctl li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).index() == 0) { //选中首页轮播图设置
            $('.figure_box').show().siblings().hide();
        }
        if ($(this).index() == 1) { //选中置顶栏目设置
            $('.top_column_set').show().siblings().hide();
        }
    });
})
