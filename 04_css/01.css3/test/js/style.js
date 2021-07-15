//1.获取元素
var cloud = document.getElementById('cloud');//筋斗云
var navBar = document.getElementById('navBar');//ul元素
//声明一个变量来存储筋斗云的主人
var boss = navBar.children[0];//默认主人是第一个li元素
//2.注册事件
for(var i = 0;i<navBar.children.length;i++){
    //2.1 鼠标移入
    navBar.children[i].onmouseover = function (  ) {
        //3.事件处理： 筋斗云缓动到移入的li元素
        animationSlow(cloud,this.offsetLeft);
    }
    //2.2  鼠标移出
    navBar.children[i].onmouseout = function (  ) {
        animationSlow(cloud,boss.offsetLeft);
    }
    //2.3 鼠标单击
    navBar.children[i].onclick = function (  ) {
        //3.事件处理： 筋斗云主人变成当前点击的li元素
        boss = this;
    }
}	