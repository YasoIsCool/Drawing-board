/*!
* @Canvas for Drawing board
* The creation time is 2018.1.22
* The creator is Yaso
*/
<template>
  <div class="hello">
    <canvas id = "cavs" width ="1200" height="542"></canvas><br/>
    <div id="kuang">
      <div class="k1">
        <input type="color" id="color" class="button button2" ref="color" @change="changeColor">
      </div>
      <div class="k1">
        <input type="button" value="保存" id="baocun" class="button button2" @click="saveImg">
      </div>
      <div class="k1">
        <input type="button" value="下载" id="xiazai" class="button button2" @click="downLoad">
      </div>
      <div class="k1">
        <input type="button" value="撤销" id="chexiao" class="button button2" @click="chexiao">
      </div>
      <div class="k1">
        <input type="button" value="清屏" id="qingping" class="button button2"  @click="qingping">
      </div>
      <div class="k1">
        <input type="button" value="铅笔" id="Line" class="button button2"  @click="lineClick">
      </div>
      <div class="k1">
        <input type="button" value="橡皮" id="xpc" class="button button2"  @click="xpcClick">
      </div>
      <div class="k1">
        <input class="button button2" type="range" ref="cuxi" id="cuxi" value="3"  min="0" max="10" @change="changeCuxi">
      </div>
    </div>
    <div style="position: fixed;left:50%;top:50%" ref="imgTest">
      <!--测试图片交互-->
    </div>
  </div>
</template>
<script>
  export default {
    //实例化画板
    mounted:function(){
      let VM=this;
      VM.canvas = document.getElementById("cavs");//获取canvas
      VM.context = VM.canvas.getContext('2d');//获取context
      VM.canX=VM.context.shadowOffsetX;//获取画布左上角的x坐标
      VM.canY=VM.context.shadowOffsetY;//获取画布左上角的y坐标
      VM.context.lineCap="round";//线条起始和结尾样式
      VM.context.lineJoin="round";//线条转弯样式
      let cavs= $('#cavs');
      let cavsJS=document.getElementById("cavs")
      //适应单击事件
      cavs.mousemove(function(e){//当鼠标在画布上移动时执行
        if(VM.painting===true){//判断是否是可绘画状态
          let x = e.pageX;//鼠标当前x坐标
          let y = e.pageY;//鼠标当前y坐标
          VM.context.lineTo(x-VM.canX,y-VM.canY);//确定线的结束位置，canvas.offsetLeft画板离浏览器左侧的距离，canvas.offsetTop画板离浏览器上部的距离
          VM.context.stroke();
        }
      });
      cavs.mousedown(function(e){//当鼠标按下时触发
        VM.painting = true;//鼠标按下可以作画
        VM.p_x = e.pageX;//画笔起始x坐标
        VM.p_y = e.pageY;//画笔起始y坐标
        VM.context.beginPath();//开始作画
        VM.context.moveTo(VM.p_x-VM.canX,VM.p_y-VM.canY);//画笔开始位置
        //复制图像，为了撤销
        let imgData=VM.context.getImageData(0,0,VM.canvas.width,VM.canvas.height);
        //加入数组
        VM.imgData.push(imgData);
      });
      cavs.mouseup(function(e){
        VM.painting = false;//鼠标松开，禁止作画
        VM.context.closePath();//关闭画笔路径

      });
      cavs.mouseleave(function(e){//鼠标移出时，禁止作画
        VM.painting = false;
        VM.context.closePath();
      });

      //适应移动端，触摸事件
      cavsJS.addEventListener("touchmove", function(e){
        e.preventDefault();
        if(VM.painting===true){//判断是否是可绘画状态
          let x = e.touches[0].pageX;//鼠标当前x坐标
          let y = e.touches[0].pageY;//鼠标当前y坐标
          VM.context.lineTo(x-VM.canX,y-VM.canY);//确定线的结束位置，canvas.offsetLeft画板离浏览器左侧的距离，canvas.offsetTop画板离浏览器上部的距离
          VM.context.stroke();
          console.log('touchmove');
        }
      });
      cavsJS.addEventListener("touchstart", function(e){
        console.log('touchstart');
        VM.painting = true;//鼠标按下可以作画
        VM.p_x = e.touches[0].pageX;//画笔起始x坐标
        VM.p_y = e.touches[0].pageY;//画笔起始y坐标
        VM.context.beginPath();//开始作画
        VM.context.moveTo(VM.p_x-VM.canX,VM.p_y-VM.canY);//画笔开始位置
        //复制图像，为了撤销
        let imgData=VM.context.getImageData(0,0,VM.canvas.width,VM.canvas.height);
        //加入数组
        VM.imgData.push(imgData);
      });
      cavsJS.addEventListener("touchend", function(e){
        console.log('touchend');
        VM.painting = false;//鼠标松开，禁止作画
        VM.context.closePath();//关闭画笔路径
      });

    },
    name:'TestMenu',
    data(){
      return{
        canType:"line",     // 当前绘图属性
        canvas:"",       //canvas Js对象
        context:"",       //context 对象
        canX:0,           //起始坐标
        canY:0,             //起始坐标
        paint:"",           //添加事件集合
        painting:false,//初始化设置为不可画状态
        p_x:0,           //画笔初始x坐标
        p_y:0,           //画笔初始y坐标
        imgData:[],     //临时图片
      }
    },
    methods:{
      //改变画笔颜色
      changeColor(){
        this.context.strokeStyle = this.$refs.color.value;
      },
      //改变粗细
      changeCuxi(){
        this.context.lineWidth = this.$refs.cuxi.value
      },
      //点击铅笔
      lineClick(){
        this.canType="line";
        this.context.strokeStyle = $("#color").val();
      },
      //点击橡皮
      xpcClick(){
        this.canType="xpc";
        this.context.strokeStyle = "#FFF";
      },
      //清空屏幕
      qingping(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
      },
      //撤销上一步
      chexiao(){
        this.context.putImageData(this.imgData.pop(),0,0);
      },
      //保存图片
      saveImg(){
        this.$refs.imgTest.innerHTML ='';
        let type = 'png';
        let imgData = this.canvas.toDataURL(type);
        imgData = imgData.replace(this.fixType(type),'image/octet-stream');
        let imgTest=`<img ref="imgTest" src="${imgData}" width="400px" height="400px"/> `
        this.$refs.imgTest.innerHTML =imgTest;

      },
      //下载图片
      downLoad(){
        let file="画板图片";
        let type = 'png';
        let imgData = this.canvas.toDataURL(type);
        // 加工image data，替换mime type
        imgData = imgData.replace(this.fixType(type),'image/octet-stream');
        // 下载后的文件名
        let filename = file + '.' + type;
        // download
        this.saveFile(imgData,filename);
      },
      fixType(type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        let r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
      },
      saveFile(data, filename){
        let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;

        let event = document.createEvent('MouseEvents');
        // initMouseEvent()方法参数解释在    http://blog.sina.com.cn/s/blog_3e9b01a50100leyj.html
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
      },
    },
  }
</script>
<style scoped>
  .hello{
    height:100%;
    width:100%;
    position:fixed;
  }
  #cavs{
    border: 1px solid #CC6600;
  }
</style>
