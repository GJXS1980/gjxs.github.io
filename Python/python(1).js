var editor = CodeMirror.fromTextArea($('#yourcode')[0], {
    mode: "python", // 语言模式
    theme: "cobalt", // 主题
    keyMap: "sublime", // 快键键风格
    lineNumbers: true, // 显示行号
    smartIndent: true, // 智能缩进
    indentUnit: 4, // 智能缩进单位为4个空格长度
    indentWithTabs: true, // 使用制表符进行智能缩进
    lineWrapping: true, //
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],// 在行槽中添加行号显示器、折叠器、语法检测器
    foldGutter: true, // 启用行槽中的代码折叠
    autofocus: true, // 自动聚焦
    matchBrackets: true, // 匹配结束符号，比如"]、}"
    autoCloseBrackets: true, // 自动闭合符号
    // styleActiveLine: true, // 显示选中行的样式
});
editor.on("keypress", function() {
    // 显示智能提示
    editor.showHint(); // 注意，注释了CodeMirror库中show-hint.js第131行的代码（阻止了代码补全，同时提供智能提示）
});
editor.setSize('100%','100%');

var isLogin = $("#isLogin").val();
var now_answer = localStorage.getItem('code');
if(now_answer == null){
    now_answer = '';
}
if(isLogin == 1){
    var history_answer = $("#history").val();
    if(now_answer == '' && history_answer != ''){
        editor.setValue(history_answer);
    }

    if(now_answer != '' && history_answer == ''){
        editor.setValue(now_answer);
        localStorage.removeItem('code');
        save();
    }

    if(now_answer != '' && history_answer != ''){
        //提示是否覆盖
        var index = layer.confirm('检测到您之前保存过代码，是否覆盖？', {
            btn: ['确认覆盖','不覆盖'] //按钮
            ,cancel: function(index, layero){
                localStorage.removeItem('code');
                editor.setValue(history_answer);
            }
        }, function(){
            //确认覆盖
            editor.setValue(now_answer);
            localStorage.removeItem('code');
            save();
            layer.close(index)
        }, function(){
            localStorage.removeItem('code');
            editor.setValue(history_answer);
        });
    }
}else{
    editor.setValue(now_answer);
    localStorage.removeItem('code');
}


var output = '';
/**
 * 结果输出
 * @param text
 */
function outf(text) {
    if(output !== text){
        output = text;
    }
    var mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + text;
}
/**
 * 错误日式
 * @param x
 * @returns {*}
 */
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

/**
 * 运行代码
 */
$(document).delegate('.start','click',function() {
    var prog = editor.getValue();
    if (prog.trim().length <= 0) {
        tip("请输入代码");
        return;
    }
    //修改按钮
    var self = $(this);
    self.addClass('stop').removeClass('start');
    self.text('停止');

    //清楚文本输出
    var mypre = document.getElementById("output");
    mypre.innerHTML = '';
    var cancas = document.getElementById("mycanvas");
    cancas.innerHTML = '';

    //禁用清除按钮
    $(".clear").attr("disabled",true);
    $(".clear").css("color","gray");

    Sk.pre = "output";
    Sk.configure({
        __future__: Sk.python3,
        inputfunTakesPrompt: true,
        inputfun: function (f) {
            $("#output").append('<span>' + f + '<input id="input" /></span><br>');
            $("#input").focus();
            return new Promise(function (resolve, reject) {
                $("#input").on("keyup", function (e) {
                    if (e.keyCode == 13) {
                        $("#input").off("keyup");
                        var input = $("#input").val();
                        resolve(input);
                        $("#input").after(input);
                        $("#input").remove();
                    }
                })
            })
        },
        output: outf,
        read: builtinRead
    });

    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    var myPromise = Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });

    myPromise.then(function (mod) {
        console.log('success');
        self.addClass('start').removeClass('stop');
        self.text('运行');

        $(".clear").removeAttr("disabled");
        $(".clear").css("color","#2473b9");
    }, function (err) {
        self.addClass('start').removeClass('stop');
        self.text('运行');
        var msg = err.toString();
        if(msg.indexOf("Right-hand") < 0 && msg.indexOf("Promise") < 0 && msg.indexOf("resolve") < 0){
            outf(msg);
        }
        console.log(err.toString());

        $(".clear").removeAttr("disabled");
        $(".clear").css("color","#2473b9");
    });
});
/**
 * 终止执行
 */
var over = true;
$(document).delegate('.stop','click',function() {
    if(over == false){
        return false;
    }
    over = false;
    Promise = null;
    setTimeout(function(){
        var oldjs = null;
        var t = null;
        oldjs = document.getElementById("test");
        if(oldjs) oldjs.parentNode.removeChild(oldjs);
        var scriptObj = document.createElement("script");
        scriptObj.src = "/revision/js/promise.js";
        scriptObj.type = "text/javascript";
        scriptObj.id = "test";
        document.getElementsByTagName("head")[0].appendChild(scriptObj);
        var self = $(".stop");
        self.addClass('start').removeClass('stop');
        self.text('运行');
        over =true;
        $(".clear").removeAttr("disabled");
        $(".clear").css("color","#2473b9");
        $("#input").remove();
        outf("执行已停止")
    },200);

});

function tip(msg){
    $(".tip-text").find('span:first').text(msg);
    $(".tip-text").hide();
    $(".tip-text").show();
    setTimeout(function(){
        close();
    },5000)
}

function close(){
    $(".tip-text").hide();
}

function reset(){
    var mypre = document.getElementById("output");
    mypre.innerHTML = '';
    var cancas = document.getElementById("mycanvas");
    cancas.innerHTML = '';
    var self = $(".stop");
    self.addClass('start').removeClass('stop');
    self.text('运行');
}

function expo(){
    var timestamp=new Date().getTime();
    var textToWrite = editor.getValue();
    if(textToWrite.trim().length <= 0){
        tip("请输入代码");return;
    }
    var textToWrite = textToWrite.replace(/\n/g, "\r\n");
    var fileNameToSaveAs = "main.py";
    var zipName = timestamp+'python.zip';
    var zip = new JSZip();
    var type = 'blob';
    zip.file(fileNameToSaveAs,textToWrite);
    zip.generateAsync({ type:type });
    zip.generateAsync({type}).then(content => {
        saveAs(content, zipName)
    })
}
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function show(self){
    $(self).parent().next().fadeIn();
}

var flag = true;
function save(){
    if(flag  == false){
        return false;
    }

    var prog = editor.getValue();
    if(prog.trim().length <= 0){
        tip("请输入代码");return;
    }
    var data  = {};
    data.code = prog;
    flag  = false;
    $.post('/python/save',data,function(json){
        flag = true;
        if(json.code == '0000'){
            tip("保存成功！系统仅保存最后一次提交的代码。");return;
        }else{
            tip("保存失败！请刷新页面重试！");return;
        }
    })
}

function loginSave(){
    var prog = editor.getValue();
    if(prog.trim().length <= 0){
        tip("请输入代码");return;
    }
    localStorage.setItem('code',prog);
    setTimeout(function(){
        window.location.href=ucenter_login;
    },100);
}