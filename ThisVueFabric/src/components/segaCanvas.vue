<template>
  <!DOCTYPE html>
  <html lang="ja">

  </html>
  <html>

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link rel="stylesheet" href="./css/setting_style.css" />
    <link rel="stylesheet" href="./css/style.css" />
    <link rel="stylesheet" href="./css/icons.css" />
    <link rel="stylesheet" href="./css/color_grid.css" />
    <title>遊技台設置</title>
  </head>

  <body>
    <!-- modal群 ?メニュー分必要? -->
    <!-- dropした際用 -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- ダイアログのコンテンツがここに挿入されます -->
        </div>
      </div>
    </div>

    <!-- 設定画面用 -->
    <div class="modal fade" id="staticSettingMenu" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticSettingMenuLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered setting_menu_main">
        <div class="modal-content setting_menu_content">
          <!-- ダイアログのコンテンツがここに挿入されます -->
        </div>
      </div>
    </div>

    <!-- メッセージダイアログ用 -->
    <div class="modal fade" id="staticMessageDialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticMessageDialogLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- ダイアログのコンテンツがここに挿入されます -->
        </div>
      </div>
    </div>

    <div class="header_menu" id="header_menu">
      <!-- 上部メニュー -->

      <!--1 Removal of game machines-->
      <button type="button" class="material-icons md-48" data-toggle="tooltip" data-placement="bottom" title="遊技台撤去"
        onclick="um_removalMachineSerial()">
        do_not_disturb_on
      </button>

      <!--2 Table fill and table fill color change-->
      <button type="button" class="material-icons md-48" data-toggle="tooltip" data-placement="bottom"
        title="遊技台塗りつぶし・塗りつぶし色の変更" onclick="setColorMachineObject()">
        format_color_fill
      </button>

      <!--3 Assume no allocation of the table frame.-->
      <button id="location_btnA" type="button" class="material-icons md-48 hidden_btn" data-toggle="tooltip"
        data-placement="bottom" title="遊技台枠を割付無しとする">
        close
      </button>
      <!--4-->
      <button id="location_btnB" type="button" class="material-icons md-48 hidden_btn" data-toggle="tooltip"
        data-placement="bottom" title="Button">
        remove
      </button>

      <!--5 Split island map area view-->
      <button type="button" id="um_setting_button03" class="material-icons md-48" data-toggle="tooltip"
        data-placement="bottom" title="島図エリア表示の分割" onclick="splitButton()">
        view_agenda
      </button>

      <!--6 Restore split island map area display-->
      <button type="button" id="splitButton" class="material-icons md-48 hidden_btn" data-toggle="tooltip"
        data-placement="bottom" title="分割した島図エリア表示を元に戻す" onclick="splitButton()">
        check_box_outline_blank
      </button>


      <!--7 Delete selected square/string-->
      <button type="button" class="material-icons md-48" data-toggle="tooltip" data-placement="bottom"
        title="選択された四角・文字列を削除" onclick="deleteObject()">
        delete_forever
      </button>

      <!--8-->
      <button type="button" class="material-icons md-48" data-toggle="tooltip" data-placement="bottom" title="Button"
        onclick="um_Undo()">
        undo
      </button>

      <!--9-->
      <button type="button" id="um_setting_button02" class="material-icons md-48" data-toggle="tooltip"
        data-placement="bottom" title="Button" onclick="um_Reload()">
        restart_alt
      </button>

      <!--10 Add square to island map-->
      <button type="button" id="um_setting_button06" class="material-icons material-icons md-48" data-toggle="tooltip"
        data-placement="bottom" title="島図に四角を追加" onclick="um_addMachineNameBox()">
        square
      </button>

      <!--11 Add text to island map-->
      <button type="button" id="um_setting_button07" class="material-icons material-icons md-48" data-toggle="tooltip"
        data-placement="bottom" title="島図に文字列を追加" onclick="um_addMachineNameText()">
        title
      </button>

      <!--12 Finalize the island map-->
      <button type="button" id="um_setting_button08" class="material-icons material-icons md-48" data-toggle="tooltip"
        data-placement="bottom" title="島図を確定する" onclick="um_savePng()">
        save
      </button>

      <!--13-->
      <button type="button" class="material-icons md-48" data-toggle="tooltip" data-placement="bottom" title="Button"
        onclick="debugFileSave()">
        download
      </button>

      <!--14-->
      <button type="button" id="um_setting_button02" class="material-icons md-48" data-toggle="tooltip"
        data-placement="bottom" title="Button" onclick="um_openSettingMenu()">
        settings
      </button>

      <!--15-->
      <button type="button" id="um_setting_button05" class="material-icons material-icons md-48" data-toggle="tooltip"
        data-placement="bottom" title="Button"
        onclick="openMessageDialog('title11','message22\na\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk')">
        settings
      </button>

      <!--16-->
      <select id="floor_select" disabled>
      </select>

    </div>

    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-2 sidebar" id="sidebar">
          <!-- サイドバーのコンテンツ -->
          <div class="d-flex flex-column justify-content-center align-items-center h-100">
            <div class="top-section" id="top-section">
            </div>
            <div class="bottom-section" id="bottom-section">
            </div>
          </div>

        </div>

        <div class="col-md-10 main" id="main" style="position: relative">
          <!-- メインコンテンツのコンテンツ -->
          <div class="canvas-container" id="canvas-container">
            <canvas id="canvas_view"></canvas>
          </div>
          <div id="canvas-header" style="display: none; background-color: #a6a7a9">

            <div>
              <button type="button" id="um_setting_button05" class="material-icons material-icons md-48"
                onclick="openMessageDialog('title11','message22\na\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk')">
                settings
              </button>
            </div>
            <div>
              ホールナンバー
            </div>
          </div>
          <div class="canvas2-container" id="canvas2-container">
            <canvas id="canvas_view2"></canvas>
          </div>
        </div>
        <!-- 分割画面 
      <div class="col-md-10 main" id="sub_window">
        <div class="sub_window_header">
          まるちめにゅー
        </div> 
        <canvas id="canvas_view2"></canvas>
      </div>
-->
      </div>

      <button id="zoom_in_button" type="button" class="material-icons md-48" onclick="zoomIN()">
        zoom_in
      </button>
      <button id="zoom_out_button" type="button" class="material-icons md-48" onclick="zoomOUT()">
        zoom_out
      </button>
    </div>
  </body>

  </html>
</template>

<script>
import { fabric } from 'fabric';


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Side menu
/*

横メニュー用

*/



function sm_button(_bntID){
}


function initSideMenu(){
    
}





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Map edit script
const images = [
  "./images/rect.png",
  "./images/line.png",
  "./images/space.png",
  "./images/machine.png",
  "./images/text.png",
  "./images/machines.png",
];


var canvasContainer = document.getElementById("main");
///Uncomment
// canvasContainer.addEventListener("dragover", handleDragOver, false);
// canvasContainer.addEventListener("drop", handleDrop, false);

// イメージの配置を調整する関数 (side menu)
function adjustImageLayout() {
    const sidebar = document.getElementById("sidebar");
    const sidebarWidth = sidebar.offsetWidth; // サイドバーの横幅
    const sidebarHeight = sidebar.offsetHeight; // サイドバーの縦幅
    const imageCount = images.length; // イメージの個数
  
    const imageContainer = sidebar.querySelector(".d-flex");
    imageContainer.innerHTML = ""; // 一度中身をクリア
  
    const imageWidth = sidebarWidth - 100; // イメージの横幅
    const imageHeight = sidebarHeight / imageCount - 30; // イメージの縦幅
  
    for (let i = 0; i < imageCount; i++) {
      const image = document.createElement("img");
      image.src = images[i];
      image.classList.add("mb-3", "img-fluid");
      image.setAttribute("draggable", true);
      image.style.width = `${imageWidth}px`;
      image.style.height = `${imageHeight}px`;
      image.id = "SIDE_MENU_ImageID_" + i;
      console.log(image);
      imageContainer.appendChild(image);
  
      image.addEventListener("dragstart", handleDragStart, false);
      image.addEventListener("dragend", handleDragEnd, false);
      image.addEventListener("drag", handleDrag, false);
    }
    /*
      var dragableObjects = document.querySelectorAll("img");
      [].forEach.call(dragableObjects, function (dragableObject) {
        dragableObject.addEventListener("dragstart", handleDragStart, false);
        dragableObject.addEventListener("dragend", handleDragEnd, false);
        dragableObject.addEventListener("drag", handleDrag, false);
      });
    */
  }
  

  
  function handleDragStart(e) {
    console.log("handle Drag Start");
    var target = e.target;
    e.dataTransfer.setData("text", target.id);
    target.style.opacity = "0.4";
  }
  
  function handleDragEnd(e) {
    var target = e.target;
    target.style.opacity = "1.0";
    /*
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "dialog.html", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        // 取得したダイアログのコンテンツをモーダル内に挿入
        var dialogContent = xhr.responseText;
        var modalContent = document.querySelector(
          "#staticBackdrop .modal-content"
        );
        modalContent.innerHTML = dialogContent;
        // モーダルを表示
        var modal = new bootstrap.Modal(
          document.getElementById("staticBackdrop")
        );
        modal.show();
      }
    };
    xhr.send();
  */
  }
  
  function handleDrag(e) {}
  
  function handleDragOver(e) {
    // デフォルトの動作をキャンセル
    e.preventDefault();
  }
  
  function handleDrop(e) {
    // デフォルトの動作をキャンセル
    e.preventDefault();
  
    // ドロップ位置を取得
    //  console.log(e);
    //  console.log(e.target);
    var x = Math.round(e.layerX / canvasScale / grid) * grid;
    var y = Math.round(e.layerY / canvasScale / grid) * grid;
  
    // ドラッグ対象のオブジェクトのデータを取得
    var tmp_id = e.dataTransfer.getData("text");
    console.log("drop_id1:" + tmp_id);
  
    if (!tmp_id.match(/SIDE_MENU_ImageID_/)) {
      return;
    }
    let id = tmp_id.replace("SIDE_MENU_ImageID_", "");
    console.log("drop_id2:" + id);
    switch (id) {
      case "0": //
        {
          var _rect = addBox(
            x,
            y,
            grid * 8,
            grid * 8,
            getDefaultColor(),
            "#000000"
          );
          canvas.add(_rect);
          addGameObject(_rect, ObjectType.BOX, 0);
        }
        break;
      case "1": //
        {
          var x1 = x + grid * 4;
          var y1 = y - grid * 4;
          var x2 = x - grid * 4;
          var y2 = y + grid * 4;
          let _lineArray = addLine(x1, y1, x2, y2);
          /*
          var _itexts = [];
          _itexts.push(_lineArray[0]);
          _itexts.push(_lineArray[1]);
          _itexts.push(_lineArray[2]);
          var _group = new fabric.Group(_itexts);
          canvas.add(_group);
          addGameObject(_group,ObjectType.LINE,0);
  */
  
          canvas.add(_lineArray[0]);
          canvas.add(_lineArray[1]);
          canvas.add(_lineArray[2]);
          addGameObject(_lineArray[0], ObjectType.LINE, 0);
        }
        break;
      case "2": //
        {
          var _rect = addSpaceBox(
            x,
            y,
            grid * 8,
            grid * 8,
            getDefaultColor(),
            "#000000"
          );
          canvas.add(_rect);
          addGameObject(_rect, ObjectType.SPACE_BOX, 0);
        }
        break;
      case "3": //
        {
          var _rect = addMachineBox(
            x,
            y,
            grid * 8,
            grid * 8,
            getDefaultColor(),
            "#000000",
            ""
          );
          canvas.add(_rect);
          addGameObject(_rect, ObjectType.MACHINE_BOX, 0);
          addMachineBoxDialog(_rect);
        }
        break;
      case "4": //
        {
          modalTargetObject = { x: x, y: y };
          addTextDialog();
        }
        break;
      case "5": //
        {
          modalTargetObject = { x: x, y: y };
          addMultiMachineDialog();
        }
        break;
    }
  
    /*
  // 複数配置?
    const rectWidth = grid * 8;
    const rectHeight = grid * 8;
    const rectSpacing = 0;
    const rectColumns = 1;
    const rectRows = 1;
    const rects = [];
    for (let row = 0; row < rectRows; row++) {
      for (let col = 0; col < rectColumns; col++) {
        const left = x + col * (rectWidth + rectSpacing);
        const top = y + row * (rectHeight + rectSpacing);
  
        const rect = new fabric.Rect({
          left: left,
          top: top,
          width: grid * 8,
          height: grid * 8,
          fill: "#FCAF17",
          originX: "center",
          originY: "center",
          stroke: "#ff0000",
          strokeWidth: 2,
        });
        rect.on("moving", function (e) {
          rect.set({
            left: Math.round(rect.left / grid) * grid,
            top: Math.round(rect.top / grid) * grid,
          });
        });
  
        // anime test
        var cnt = 0;
        const timeID = setInterval(animateRandom, 1000);
        function animateRandom(){
          if((cnt&1) == 0){
            rect.set({fill:"#ff0000"});
          }else {
            rect.set({fill:"#ffffff"});
          }
          cnt++;
          canvas.requestRenderAll();
          if(cnt >= 10){
            clearInterval(timeID);
          }
        }
        // aa
        // canvas上にrectオブジェクトを配置
        canvas.add(rect);
        rects.push(rect);
      }
    }
    canvas.setActiveObject(rects[0]);
  */
  }
  
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Setting data

// 設定画面データ

var settingMenuData = {
    setting_01: false,
    setting_02: false,
    setting_03: false,
    setting_04: false,
}


function initSettingData(){
    console.log("**** setting param init ****");
}






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Fabric function
/*

fabric生成関連

*/


// box
function addBox(_xx, _yy, _ww, _hh, _fill, _stroke) {
    var control_param = fabric.Object.prototype.controls;
    control_param.mtr.visible = false; // mtrは回転ポイントの名前
    control_param.bl.visible = true; // blは左下のコントロールポイントの名前
    control_param.br.visible = true; // brは右下のコントロールポイントの名前
    control_param.mb.visible = true; // mbは下中央のコントロールポイントの名前
    control_param.ml.visible = true; // mlは左中央のコントロールポイントの名前
    control_param.mr.visible = true; // mrは右中央のコントロールポイントの名前
    control_param.mt.visible = true; // mtは上中央のコントロールポイントの名前
    control_param.tl.visible = true; // tlは左上のコントロールポイントの名前
    control_param.tr.visible = true; // trは右上のコントロールポイントの名前

    var _rect = new fabric.Rect({
        idx: -1,
        left: _xx,
        top: _yy,
        fill: _fill,
        width: _ww,
        height: _hh,
        originX: 'left',
        originY: 'top',
        borderColor: 'red',
        controls: control_param,
        lockRotation: true,
        strokeWidth: 1,
        stroke: _stroke
    });
    /*
        _rect.on("moving",function(e){
    //        console.log(_rect);
            _rect.set({
                left: Math.round(_rect.left / grid) * grid,
                top: Math.round(_rect.top / grid) * grid
            });
        });
    */
    /*
        _rect.on("scaling",function(e){
            console.log("scaling...?");
            var _xx2 = Math.round(_rect.left / grid) * grid;
            var _hh2 = Math.round(_rect.top / grid) * grid;
            var _ww2 = Math.round(_rect.scaleX * _rect.width / grid) * grid;
            var _hh2 = Math.round(_rect.scaleY * _rect.height / grid) * grid;
            _rect.set({
                left: _xx2,
                right: _hh2,
                width: _ww2,
                height: _hh2,
                scaleX: 1.0,
                scaleY: 1.0,
            });
            canvas.requestRenderAll();
        });
    */
    /*
        _rect.on("scaled",function(e){
            console.log("scaled...?");
        });
    */
    return (_rect);
};

function addNameBox(_xx, _yy, _ww, _hh, _fill, _stroke) {
    var control_param = fabric.Object.prototype.controls;
    control_param.mtr.visible = false; // mtrは回転ポイントの名前
    control_param.bl.visible = true; // blは左下のコントロールポイントの名前
    control_param.br.visible = true; // brは右下のコントロールポイントの名前
    control_param.mb.visible = true; // mbは下中央のコントロールポイントの名前
    control_param.ml.visible = true; // mlは左中央のコントロールポイントの名前
    control_param.mr.visible = true; // mrは右中央のコントロールポイントの名前
    control_param.mt.visible = true; // mtは上中央のコントロールポイントの名前
    control_param.tl.visible = true; // tlは左上のコントロールポイントの名前
    control_param.tr.visible = true; // trは右上のコントロールポイントの名前

    var _rect = new fabric.Rect({
        idx: -1,
        left: _xx,
        top: _yy,
        fill: _fill,
        width: _ww,
        height: _hh,
        originX: 'left',
        originY: 'top',
        borderColor: 'red',
        controls: control_param,
        lockRotation: true,
        strokeWidth: 1,
        stroke: _stroke
    });
    return (_rect);
};

// box
function addSpaceBox(_xx, _yy, _ww, _hh, _fill, _stroke) {
    var control_param = fabric.Object.prototype.controls;
    control_param.mtr.visible = false; // mtrは回転ポイントの名前
    control_param.bl.visible = true; // blは左下のコントロールポイントの名前
    control_param.br.visible = true; // brは右下のコントロールポイントの名前
    control_param.mb.visible = true; // mbは下中央のコントロールポイントの名前
    control_param.ml.visible = true; // mlは左中央のコントロールポイントの名前
    control_param.mr.visible = true; // mrは右中央のコントロールポイントの名前
    control_param.mt.visible = true; // mtは上中央のコントロールポイントの名前
    control_param.tl.visible = true; // tlは左上のコントロールポイントの名前
    control_param.tr.visible = true; // trは右上のコントロールポイントの名前

    var _rect = new fabric.Rect({
        idx: -1,
        left: _xx,
        top: _yy,
        fill: _fill,
        width: _ww,
        height: _hh,
        originX: 'left',
        originY: 'top',
        borderColor: 'red',
        lockRotation: true,
        strokeWidth: 1,
        stroke: _stroke
    });

    var _xx2 = _xx;
    var _yy2 = _yy;
    var _line1 = new fabric.Line(
        [_xx2, _yy2, _xx2 + _ww, _yy2 + _hh],
        {
            type: 'line',
            stroke: '#202020',
            originX: 'left',
            originY: 'top',
            borderColor: 'red',
            strokeWidth: 1
        });

    var _line2 = new fabric.Line(
        [_xx2 + _ww, _yy2, _xx2, _yy2 + _hh],
        {
            type: 'line',
            stroke: '#202020',
            originX: 'left',
            originY: 'top',
            borderColor: 'red',
            strokeWidth: 1
        });

    var _itexts = [_rect, _line1, _line2];
    var _group = new fabric.Group(_itexts);
    _group.set({
        borderColor: 'red',
        controls: control_param
    });

    return (_group);
};


// box
function addMachineBox(_xx, _yy, _ww, _hh, _fill, _stroke, _text2) {
    var control_param = fabric.Object.prototype.controls;
    control_param.mtr.visible = false; // mtrは回転ポイントの名前
    control_param.bl.visible = false; // blは左下のコントロールポイントの名前
    control_param.br.visible = false; // brは右下のコントロールポイントの名前
    control_param.mb.visible = false; // mbは下中央のコントロールポイントの名前
    control_param.ml.visible = false; // mlは左中央のコントロールポイントの名前
    control_param.mr.visible = false; // mrは右中央のコントロールポイントの名前
    control_param.mt.visible = false; // mtは上中央のコントロールポイントの名前
    control_param.tl.visible = false; // tlは左上のコントロールポイントの名前
    control_param.tr.visible = false; // trは右上のコントロールポイントの名前

    var _rect = new fabric.Rect({
        idx: -1,
        colorTimeID: null,
        left: _xx,
        top: _yy,
        fill: _fill,
        width: _ww,
        height: _hh,
        originX: 'left',
        originY: 'top',
        lockRotation: true,
        strokeWidth: 1,
        controls: control_param,
        stroke: _stroke
    });
    let _text = new fabric.IText(_text2, {
        left: _xx + (_ww / 2),
        top: _yy + (_hh / 2),
        width: _ww,
        height: _hh,
        stroke: 'blue',
        fontSize: 10,
        strokeWidth: 0,
        editingBorderColor: 'black',
        angle: 0,
        controls: control_param,
        textAlign: 'center',
        originX: 'center',
        originY: 'center'
    });

    var _itexts;

    if(gameMode == GameMode.MODE_MACHINE_SET){
        var _rect2 = new fabric.Rect({
            colorTimeID: null,
            left: _xx,
            top: _yy + (_hh - 20),
            fill: "#ff0000",
            width: _ww,
            height: 20,
            originX: 'left',
            originY: 'top',
            controls: control_param,
            lockRotation: true,
            strokeWidth: 1,
            stroke: _stroke
        });

        let _text2 = new fabric.IText("未割付", {
            left: _xx + (_ww / 2),
            top: _yy + (_hh - 10),
            width: _ww,
            height: _hh,
            stroke: 'blue',
            fontSize: 10,
            strokeWidth: 0,
            editingBorderColor: 'black',
            angle: 0,
            controls: control_param,
            textAlign: 'center',
            originX: 'center',
            originY: 'center'
        });
    
        _itexts = [_rect, _text, _rect2,_text2];
    }else { //島図製作中は必要ない
        _itexts = [_rect, _text];

    }


    var _group = new fabric.Group(_itexts);
    _group.set({
        borderColor: 'red',
        controls: control_param
    });

    return (_group);
};


/*
// line 
function addLineOLD(){
    console.log("adLine2");

    var line = new fabric.Line([300, 200, 400, 400], {
      stroke: 'red',
      strokeWidth: 10,
      selectable: true,
      evented: true,
      hasControls: true,
      hasBorders: true,
    });
    canvas.add(line);
    
    // 頂点をマウスでドラッグして変更する
    line.on('mousedown', function (options) {
      if (options.target && options.target.type === 'line') {
        var pointer = canvas.getPointer(options.e);
        var activeObject = options.target;
        console.log(activeObject);
        var activeObjectCoords = activeObject.oCoords;
        console.log(activeObjectCoords);
        var xDiff = pointer.x - activeObjectCoords.tl.x;
        var yDiff = pointer.y - activeObjectCoords.tl.y;
        canvas.on('mouse:move', function (options) {
          var pointer = canvas.getPointer(options.e);
          activeObject.set({
            x1: pointer.x - xDiff,
            y1: pointer.y - yDiff,
            x2: pointer.x + (activeObjectCoords.br.x - activeObjectCoords.tr.x) - xDiff,
            y2: pointer.y + (activeObjectCoords.br.y - activeObjectCoords.tr.y) - yDiff,
          });
          line.setCoords();
          canvas.renderAll();
        });
        canvas.on('mouse:up', function () {
          canvas.off('mouse:move');
          canvas.off('mouse:up');
        });
      }
    });
};
*/


// テスト中だけどこっちが正式版になる予定
function addLine(_x1, _y1, _x2, _y2) {
    console.log("addLine");
    //    const element = document.querySelector('.scrollable');
    var x01 = _x1;
    var y01 = _y1;
    var x02 = _x2;
    var y02 = _y2;
    var control_param = fabric.Object.prototype.controls;
    control_param.mtr.visible = false; // mtrは回転ポイントの名前
    control_param.bl.visible = false; // blは左下のコントロールポイントの名前
    control_param.br.visible = false; // brは右下のコントロールポイントの名前
    control_param.mb.visible = false; // mbは下中央のコントロールポイントの名前
    control_param.ml.visible = false; // mlは左中央のコントロールポイントの名前
    control_param.mr.visible = false; // mrは右中央のコントロールポイントの名前
    control_param.mt.visible = false; // mtは上中央のコントロールポイントの名前
    control_param.tl.visible = false; // tlは左上のコントロールポイントの名前
    control_param.tr.visible = false; // trは右上のコントロールポイントの名前
    var _line = new fabric.Line(
        [x01, y01, x02, y02],
        {
            type: 'line',
            stroke: '#202020',
            originX: 'left',
            originY: 'top',
            borderColor: '#ffffff00',
            controls: control_param,
            strokeWidth: 2
        });
    var _circle1 = new fabric.Circle({
        //        NoDelete:true,
        parentObj: _line,
        left: x01,
        top: y01,
        fill: '#000000',
        radius: 20,
        originX: 'center',
        originY: 'center',
        strokeWidth: 2,
        stroke: "#000000",
        borderColor: '#00000000',
        controls: control_param
    });
    var _circle2 = new fabric.Circle({
        //        NoDelete:true,
        parentObj: _line,
        left: x02,
        top: y02,
        fill: '#000000',
        radius: 20,
        originX: 'center',
        originY: 'center',
        strokeWidth: 2,
        borderColor: '#00000000',
        controls: control_param
    });
    _line.on('moving', function (e) {
        //        console.log(_line);
        //        console.log(""+(_line.lineCoords.tl.x-_line.x1)+","+(_line.lineCoords.tl.y-_line.y1));
        _line.set({
            left: Math.round(_line.left / grid) * grid,
            top: Math.round(_line.top / grid) * grid
        });

        _line.setCoords();

        var _xx1 = _line.aCoords.tl.x;
        var _yy1 = _line.aCoords.tl.y;
        var _xx2 = _line.aCoords.br.x;
        var _yy2 = _line.aCoords.br.y;
        if (((_line.x1 > _line.x2) && (_line.y1 > _line.y2))) {

        } else if ((_line.x1 > _line.x2)) {
            _xx1 = _line.aCoords.tr.x;
            _xx2 = _line.aCoords.bl.x;
            _yy1 = _line.aCoords.tr.y;
            _yy2 = _line.aCoords.bl.y;
        } else if (_line.y1 > _line.y2) {
            _xx1 = _line.aCoords.tr.x;
            _xx2 = _line.aCoords.bl.x;
            _yy1 = _line.aCoords.tr.y;
            _yy2 = _line.aCoords.bl.y;
        }
        _circle1.set({
            left: _xx1,
            top: _yy1
        });
        _circle2.set({
            left: _xx2,
            top: _yy2
        });
        _circle1.setCoords();
        _circle2.setCoords();
        canvas.requestRenderAll();
    });
    _circle1.on('moving', function (e) {
        //        console.log("_circle1");
        _circle1.set({
            left: Math.round(_circle1.left / grid) * grid,
            top: Math.round(_circle1.top / grid) * grid
        });
        _circle1.setCoords();
        /*
                var _lx1 = _circle1.left;
                var _ly1 = _circle1.top;
                var _lx2 = _circle2.left;
                var _ly2 = _circle2.top;
                if (_lx1 < _lx2) {
                    [_lx1, _lx2] = [_lx2, _lx1];
                    [_ly1, _ly2] = [_ly2, _ly1];
                }
                if (_ly1 < _ly2) {
                    [_lx1, _lx2] = [_lx2, _lx1];
                    [_ly1, _ly2] = [_ly2, _ly1];
                }
                _line.set({
                    x1: _lx1,
                    y1: _ly1,
                    x2: _lx2,
                    y2: _ly2
                });
        */
        _line.set({
            x1: _circle1.left,
            y1: _circle1.top,
            x2: _circle2.left,
            y2: _circle2.top
        });
        _line.setCoords();
        canvas.requestRenderAll();
    });
    _circle2.on('moving', function (e) {
        //        console.log("_circle2");
        _circle2.set({
            left: Math.round(_circle2.left / grid) * grid,
            top: Math.round(_circle2.top / grid) * grid
        });
        _circle2.setCoords();
        _line.set({
            x1: _circle1.left,
            y1: _circle1.top,
            x2: _circle2.left,
            y2: _circle2.top
        });
        _line.setCoords();
        canvas.requestRenderAll();
    });

    //    canvas.add(_circle1);
    //    canvas.add(_circle2);
    //    canvas.add(_line);
    _line.set({         //管理者が居ない玉…要管理方法…
        circle1: _circle1,
        circle2: _circle2,
    });

    return ([_line, _circle1, _circle2]);
};



function addIText(str2, _xx, _yy, _fontSize) {
    var control_param = fabric.Object.prototype.controls;
    control_param.mtr.visible = false; // mtrは回転ポイントの名前
    control_param.bl.visible = true; // blは左下のコントロールポイントの名前
    control_param.br.visible = true; // brは右下のコントロールポイントの名前
    control_param.mb.visible = false; // mbは下中央のコントロールポイントの名前
    control_param.ml.visible = false; // mlは左中央のコントロールポイントの名前
    control_param.mr.visible = false; // mrは右中央のコントロールポイントの名前
    control_param.mt.visible = false; // mtは上中央のコントロールポイントの名前
    control_param.tl.visible = true; // tlは左上のコントロールポイントの名前
    control_param.tr.visible = true; // trは右上のコントロールポイントの名前
    let _text = new fabric.IText(str2, {
        left: _xx,
        top: _yy,
        fontSize: _fontSize,
        stroke: 'black',
        strokeWidth: 1,
        backgroundColor: "white",
        angle: 0,
//        borderColor: 'red',
//        editingBorderColor: "blue",
//        controls: control_param,
        editable: false,
        textAlign: 'center',
        originX: 'left',
        originY: 'top'
    });
    /*
        let _text = new fabric.Text(str, {
            left: _xx,
            top: _yy,
            fontSize: _fontSize,
            stroke: 'black',
            strokeWidth: 1,
            editingBorderColor: 'green',
            angle: 0,
            borderColor:'red',
            controls: control_param,
            textAlign: 'center',
            originX: 'center',
            originY: 'center'
        });
    */
    return (_text);
};


function addNameIText(str, _xx, _yy, _fontSize) {
    var control_param = fabric.Object.prototype.controls;
    control_param.mtr.visible = false; // mtrは回転ポイントの名前
    control_param.bl.visible = true; // blは左下のコントロールポイントの名前
    control_param.br.visible = true; // brは右下のコントロールポイントの名前
    control_param.mb.visible = false; // mbは下中央のコントロールポイントの名前
    control_param.ml.visible = false; // mlは左中央のコントロールポイントの名前
    control_param.mr.visible = false; // mrは右中央のコントロールポイントの名前
    control_param.mt.visible = false; // mtは上中央のコントロールポイントの名前
    control_param.tl.visible = true; // tlは左上のコントロールポイントの名前
    control_param.tr.visible = true; // trは右上のコントロールポイントの名前

    let _text = new fabric.IText(str, {
        left: _xx,
        top: _yy,
        fontSize: _fontSize,
        stroke: 'black',
        strokeWidth: 1,
        backgroundColor: "white",
        angle: 0,
        borderColor: 'red',
        editingBorderColor: "blue",
        controls: control_param,
        editable: false,
        textAlign: 'center',
        originX: 'left',
        originY: 'top'
    });
    return (_text);
};


function addITextGroup(str, _x, _y, _fontSize) {
    console.log("addITextGroup");

    var control_param = fabric.Object.prototype.controls;
    control_param.mtr.visible = false; // mtrは回転ポイントの名前
    control_param.bl.visible = true; // blは左下のコントロールポイントの名前
    control_param.br.visible = true; // brは右下のコントロールポイントの名前
    control_param.mb.visible = false; // mbは下中央のコントロールポイントの名前
    control_param.ml.visible = false; // mlは左中央のコントロールポイントの名前
    control_param.mr.visible = false; // mrは右中央のコントロールポイントの名前
    control_param.mt.visible = false; // mtは上中央のコントロールポイントの名前
    control_param.tl.visible = true; // tlは左上のコントロールポイントの名前
    control_param.tr.visible = true; // trは右上のコントロールポイントの名前

    var arr = Array.from(str);
    var ii = 0;
    var _itexts = [];
    var xx = 0;
    var yy = 0;

    var _rect = new fabric.Rect({
        left: _x,
        top: _y,
        width: 1,
        height: 1,
        originX: 'center',
        originY: 'center',
        fill: "white"
    });
    _itexts.push(_rect);

    for (ii = 0; ii < arr.length; ii++) {
        var ang = 0;
        var addY = _fontSize;
        var offX = 0;
        var offY = 0;
        var col = "#000000";
        if (arr[ii] == '\n') {
            xx -= _fontSize;
            yy = 0;
            continue;
        }

        switch (checkProhibitedChar(arr[ii])) {
            case 1: //全角記号
                ang = 90;
                offX = -1;
                col = "#0000ff";
                break;
            case 2: //全角記号（
                ang = 90;
                col = "#0000ff";
                break;
            case 3: //全角記号）
                ang = 90;
                col = "#0000ff";
                break;

            case 4: //半角記号
                ang = 90;
                col = "#ff0000";
                //addY = 15;
                break;
            case 5: //半角記号(
                ang = 90;
                col = "#ff0000";
                break;
            case 6: //半角記号)
                ang = 90;
                col = "#ff0000";
                break;
        }

        let _itext1 = new fabric.IText(arr[ii], {
            left: _x + xx + offX,
            top: _y + yy,
            fill: col,
            fontFamily: 'sans-serif',
            centerTransform: true,
            originX: 'center',          //fontSizeでは計算が合わないから…
            originY: 'center',          //fontSizeでは計算が合わないから…
            stroke: 'blue',
            strokeWidth: 0,
            angle: ang,
            backgroundColor: "white",
            editingBorderColor: 'red',
            dirty: true,
            lockUniScaling: true,
            controls: control_param,
            fontSize: _fontSize,
            textDirection: 'ttb' // 縦書きに設定
        });
        yy += (addY);
        _itexts.push(_itext1);
    }

    var _group = new fabric.Group(_itexts);
    _group.set({
        idx: -1,
        text: str,
        stroke: 'black',
        editingBorderColor: 'red',
        strokeWidth: 1,
        borderColor: 'red',
        fill: "red",
        controls: control_param
    });

    var _boundingRect = _group.getBoundingRect();
    console.log(_rect);
    _rect.set({
        left: 0,
        top: 0,
        width: _boundingRect.width,
        height: _boundingRect.height,
    });
    console.log(_rect);

    //    canvas.add(_group);
    return (_group);
};


// 正規表現
function checkProhibitedChar(str) {
    //                var pattern1 =  /[！-／：-＠［-｀｛-～ー、-〜”’・]+/g;
    //                var pattern4 =  /[!-/:-@[-`{-~]/g;
    var ret = 0;
    var pattern1 = /[！-／：-＠［-｀｛-～ー、-〜”’・]+/g;
    var pattern2 = /[！-／：-＠［-｀｛-～ー、-〜”’・]+/g;
    var pattern3 = /[！-／：-＠［-｀｛-～ー、-〜”’・]+/g;
    var pattern4 = /[!-/:-@[-`{-~]/g;
    var pattern5 = /[!-/:-@[-`{-~]/g;
    var pattern6 = /[!-/:-@[-`{-~]/g;

    if (pattern1.test(str)) {   //ただ90回転
        console.log(str);
        ret = 1;
    } else if (pattern2.test(str)) {   //上詰め
        console.log(str);
        ret = 2;
    } else if (pattern3.test(str)) {   //下詰め
        console.log(str);
        ret = 3;
    } else if (pattern4.test(str)) {   //ただ90回転
        console.log(str);
        ret = 4;
    } else if (pattern5.test(str)) {
        console.log(str);
        ret = 5;
    } else if (pattern6.test(str)) {
        console.log(str);
        ret = 6;
    }
    return (ret);
};


// machine box専用
// color animation
function setObjectAnimation(_canvasID, _obj) {
    //    console.log(_obj);
    /*
        const timeID = setInterval(colorAnim, 1000);
        function colorAnim() {
            let _rect = _obj._objects.at(0);
            var cnt = 0;
            if(_obj.colorTimeCnt){
                cnt = _obj.colorTimeCnt;
                _obj.colorTimeCnt++;
            }
            if ((cnt & 1) == 0) {
                _rect.set({ fill: "#ff0000" });
            } else {
                _rect.set({ fill: "#ffffff" });
            }
            _cnvs.requestRenderAll();           //これを１か所に纏めたい…
        }
        _obj.set({ colorTimeID: timeID ,colorTimeCnt:1});
        return (timeID);
    */
    animationObjectList.push({ canvasID: _canvasID, obj: _obj });
}

function stopObjectAnimation(_obj) {
    /*
        if(_obj.colorTimeID){
            clearInterval(_obj.colorTimeID);
        }
    */
    for (var ii = 0; ii < animationObjectList.length; ii++) {
        let _obj2 = animationObjectList.at(ii);
        if (_obj2) {
            if (_obj2.obj == _obj) {
                console.log("stop animation hit!");
                delete animationObjectList[ii];
                break;
            }
        }
    }
}


function setDisplayPriority(_obj) {
    _obj.bringToFront();
    //    canvas.bringToFront(_obj);   //最前面
    //    canvas.bringForward(_obj);   //+1
    //    canvas.sendToBack(_obj);     //最奥
    //    canvas.sendBackwards(_obj);   //-1
}


var animationObjectList = null;
var animationTimeID = 0;
var animationTimeCnt = 0;
function initFabricFunction() {
    animationObjectList = new Array();

    animationTimeID = setInterval(colorAnim2, 1000);
    function colorAnim2() {
        var col = "#ffffff";
        if ((animationTimeCnt & 1) == 0) {
            col = "#ff0000";
        }
        for (var ii = 0; ii < animationObjectList.length; ii++) {
            let _obj2 = animationObjectList.at(ii);
            if (_obj2) {
                let _obj = _obj2.obj;
                let _rect = _obj._objects.at(0);
                _rect.set({ fill: col });
            }
        }
        if (animationObjectList.length > 0) {
            animationTimeCnt++;
            canvas.requestRenderAll();
            if (canvas2) {
                canvas2.requestRenderAll();     //...
            }
        }
    }
}






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Machine Set Mode


const GameMode = {
  MODE_MAP_EDIT: 0,     // 島図
  MODE_MACHINE_SET: 1,  // 遊技機設置
};

const gameMode = GameMode.MODE_MACHINE_SET;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Shared Data
/*

共有データ

*/




// 1グリッドのpicサイズ
let grid = 8;

// 島図全体のサイズ(グリッド数)
const map_width = 300;
const map_height = 300;

// ?ここに置いていいのか?

// 全体のステータス
var mainStatus = {
  floor: "1", //現在のフロア
  floorID: 1,
  actionID: 0, //直前のアクション

  lastActionType: 0,
  lastActionObj: null,

  isSplit: false,   //分割中
  targetCanvasID: 0,  //分割中先に指定しているオブジェクトがいるcanvas
};

function initMainStatus() {}

// フロアの情報
var floorInfo = {
  //フロアの情報
  floor: "",
  floorID: 1,
};

var floorList = null;

// フロア初期化
function initFloor() {
  floorList = new Array();



  var copyFloor = Object.assign({}, floorInfo);
  copyFloor.floor = "1F";
  copyFloor.floorID = 1;
  floorList.push(copyFloor);
  copyFloor = Object.assign({}, floorInfo);
  copyFloor.floor = "2F";
  copyFloor.floorID = 2;
  floorList.push(copyFloor);
  copyFloor = Object.assign({}, floorInfo);
  copyFloor.floor = "B1";
  copyFloor.floorID = 3;
  floorList.push(copyFloor);

  console.log(floorList);
}




//
function getFloorList(){
  return(floorList);
}





//Delete icon
var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
var img = document.createElement('img');
img.src = deleteIcon;

//custom controlls
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'blue';
fabric.Object.prototype.cornerStyle = 'circle';

export default {
  data() {
    return {
      canvas: null,
      img: img,
    };
  },

  methods: {},
  
  mounted() {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////Main
    "use strict";

    /*
    
    島図本体
    
    */

    let ctx;
    let ctx2;
    let canvas;
    let canvas2;
    //let isSelecting = false;
    let startPoint, endPoint;
    var canvasScale = 1;
    var modalDialog = null; //
    var modalTargetObject = null; //メニュー対象のobject
    //let isCreate = true;

    //const newMachine = newMachineApiData;
    //const stockMachine = stockMachineApiData;
    const unitScale = 1;
    const canvasWidth = map_width * grid * unitScale;
    const canvasHeight = map_width * grid * unitScale;


    // ウィンドウのリサイズイベントでイメージの配置を調整
    //window.addEventListener("resize", resizeLayout());

    // 初回読み込み時にもイメージの配置を調整
    window.addEventListener("load", init);

    function init() {
      console.log("main init");

      // ヘッダーの高さを取得
      const header = document.getElementById("header_menu");
      const headerHeight = header.offsetHeight;

      // コンテンツ要素に高さを指定
      const bodycontent = document.getElementById("main");
      const sidebarcontent = document.getElementById("sidebar");
      bodycontent.style.height = `calc(100vh - ${headerHeight}px)`;
      sidebarcontent.style.height = `calc(100vh - ${headerHeight}px)`;




      initCanvas();
      initFabricFunction();

      //
      initMainStatus();
      initFloor();
      initGameObject();
      initGameMachine();
      initSettingData();

      initUpperMenu();
      initSideMenu();


      //

      setFloorObjectList();


      // mapのロード
      if (gameMode == GameMode.MODE_MACHINE_SET) {  //遊技台
        loadGameMachenList();     //
        loadGameObjectList();

        setFloorSelector();

        resizeLayout();

        createFabricObject(0, canvas, 1);
        //    createFabricObject(1,canvas2,2);
      } else { //島図
        loadGameMachenList();     //?本来は存在しない?
        loadGameObjectList();

        resizeLayout();

        createFabricObject(0, canvas, 1);
        //    createFabricObject(1,canvas2,2);
        //    removeFabricObject(0,canvas,1);
      }
    }

    function resizeLayout() {
      if (gameMode == GameMode.MODE_MACHINE_SET) {
        adjustMachineLayout();
      } else {
        adjustImageLayout();
      }
    }

    function initCanvas() {
      const stencilMenuWidth = 0;
      canvas = new fabric.Canvas("canvas_view");

      if (gameMode == GameMode.MODE_MACHINE_SET) {
        canvas2 = new fabric.Canvas("canvas_view2");
      }
      canvas.setDimensions({
        width: map_width * grid * canvasScale,
        height: map_height * grid * canvasScale,
      });

      if (gameMode == GameMode.MODE_MACHINE_SET) {
        canvas2.setDimensions({
          width: map_width * grid * canvasScale,
          height: map_height * grid * canvasScale,
        });
      }
      ctx = canvas.getContext("2d");
      if (gameMode == GameMode.MODE_MACHINE_SET) {
        ctx2 = canvas.getContext("2d");
      }
      canvas.set("zIndex", 1);
      // scale
      canvas.setZoom(canvasScale);

      // ==========================================
      //  Grid Lineの追加
      // ==========================================
      for (var i = 0; i < canvasWidth / grid; i++) {
        canvas.add(
          new fabric.Line(
            [
              i * grid + stencilMenuWidth,
              0,
              i * grid + stencilMenuWidth,
              canvasHeight,
            ],
            {
              type: "line",
              stroke: "#ccc",
              grid_line: true,
              selectable: false,
              hasControls: false,
              editable: false,
              evented: false,
              lockMovementX: true,
              lockMovementY: true,
              lockUniScaling: false,
            }
          )
        );
        canvas.add(
          new fabric.Line(
            [stencilMenuWidth, i * grid, stencilMenuWidth + canvasWidth, i * grid],
            {
              type: "line",
              stroke: "#ccc",
              grid_line: true,
              selectable: false,
              hasControls: false,
              editable: false,
              evented: false,
              lockMovementX: true,
              lockMovementY: true,
              lockUniScaling: false,
            }
          )
        );
      }
      if (gameMode == GameMode.MODE_MACHINE_SET) {
        for (var i = 0; i < canvasWidth / grid; i++) {
          canvas2.add(
            new fabric.Line(
              [
                i * grid + stencilMenuWidth,
                0,
                i * grid + stencilMenuWidth,
                canvasHeight,
              ],
              {
                type: "line",
                stroke: "#ccc",
                grid_line: true,
                selectable: false,
                hasControls: false,
                editable: false,
                evented: false,
                lockMovementX: true,
                lockMovementY: true,
                lockUniScaling: false,
              }
            )
          );
          canvas2.add(
            new fabric.Line(
              [stencilMenuWidth, i * grid, stencilMenuWidth + canvasWidth, i * grid],
              {
                type: "line",
                stroke: "#ccc",
                grid_line: true,
                selectable: false,
                hasControls: false,
                editable: false,
                evented: false,
                lockMovementX: true,
                lockMovementY: true,
                lockUniScaling: false,
              }
            )
          );
        }
      }




      // object 移動中
      function objectMoving(cnvs, options) {
        // この判定の方法でいいのか?
        //    console.log(options.target);

        if (options.target._objects) {
          //      console.log("objects:moving");
          /*
          for(var ii = 0;ii < options.target._objects.length;ii++){
            var _obj = options.target._objects[ii];
            _obj.set({
              left: Math.round(_obj.left / grid) * grid,
              top: Math.round(_obj.top / grid) * grid
            });
          }
      */
          // フリーポジションのobjectが混じった時の対応を考えておく…
          var _obj = options.target;
          _obj.set({
            left: Math.round(_obj.left / grid) * grid,
            top: Math.round(_obj.top / grid) * grid,
          });
          cnvs.requestRenderAll();
        } else {
          //      console.log("object:moving");
          var _obj = options.target;
          _obj.set({
            left: Math.round(_obj.left / grid) * grid,
            top: Math.round(_obj.top / grid) * grid,
          });
          cnvs.requestRenderAll();
        }
        setTargetObjectAction(10);
      }

      // object 移動完了
      function objectMoved(cnvs, options) {
        /*
        if(options.target._objects){
          console.log("objects:moved");
       
          for(var ii = 0;ii < options.target._objects.length;ii++){
            console.log(options.target._objects[ii]);
            var _obj = options.target._objects[ii];
            _obj.set({
                left: Math.round(_obj.left / grid) * grid,
                top: Math.round(_obj.top / grid) * grid
            });
          }
          canvas.requestRenderAll();
        }else{
          console.log("object:moved");
          console.log(options.target);
          var _obj = options.target;
          _obj.set({
                  left: Math.round(_obj.left / grid) * grid,
                  top: Math.round(_obj.top / grid) * grid
          });
        }
      */
      }

      // object サイズ変更
      function objectScaling(cnvs, options) {
        console.log("object:scaling");
        setTargetObjectAction(11);
      }


      var rewindObject = null;
      // 巻き戻しバックアップ
      function setObjectPosition(cnvs) {
        rewindObject = Object.assign({}, cnvs.getActiveObject());
      }

      // 巻き戻し実行
      function rewindObjectPosition(cnvs) {
        if (rewindObject) {

          var _obj = cnvs.getActiveObject();
          _obj.left = rewindObject.left;
          _obj.top = rewindObject.top;

          _obj.setCoords();
          canvas.requestRenderAll();
        }
      }

      function resetObjectPosition() {
        rewindObject = null;
      }


      // コリジョン
      function checkObjectCollision(cnvs) {
        var _ret = false;
        var idxList = new Array();

        var _obj = cnvs.getActiveObject();
        if (!_obj) {
          return;
        }
        if (!_obj.idx) {
          if (!_obj._objects) {
            return;
          }

          var chkF = false;
          for (var ii = 0; ii < _obj._objects.length; ii++) {
            var _obj3 = _obj.item(ii);
            var idx = _obj3.idx;
            if (checkGameObjectTypeMACHINE_BOX(idx)) {
              chkF = true;
              idxList.push(idx);
            }
          }
          if (!chkF) {
            return;
          }
        } else {
          if (!checkGameObjectTypeMACHINE_BOX(_obj.idx)) {
            return;
          }

          idxList.push(_obj.idx);
        }


        {   //筐体同士
          console.log("checkObjectCollision : " + _obj.idx);
          //    checkGameObjectCollision(_obj);
          var _x00 = _obj.left;
          var _y00 = _obj.top;
          var _x01 = _obj.left + _obj.width - (grid - 1);
          var _y01 = _obj.top + _obj.height - (grid - 1);
          for (var ii = 0; ii < gameObjectList.length; ii++) {
            if (gameObjectList.at(ii)) {
              if (gameObjectList.at(ii).obj) {
                var chkF2 = true;
                for (var jj = 0; jj < idxList.length; jj++) { //自分自身は除外
                  if (gameObjectList.at(ii).obj.idx == idxList.at(jj)) {
                    chkF2 = false;
                    break;
                  }
                }

                if (chkF2) {
                  var _obj2 = gameObjectList.at(ii).obj;
                  if (!checkGameObjectTypeMACHINE_BOX(_obj2.idx)) {
                    continue;
                  }

                  var _x10 = _obj2.left;
                  var _y10 = _obj2.top;
                  var _x11 = _obj2.left + _obj2.width;
                  var _y11 = _obj2.top + _obj2.height;

                  if ((_x00 < _x11) && (_x01 > _x10) && (_y00 < _y11) && (_y01 > _y10)) {
                    console.log(_x00 + "," + _y00 + "," + _x01 + "," + _y01 + ",");
                    console.log(_x10 + "," + _y10 + "," + _x11 + "," + _y11 + ",");
                    console.log("hit");
                    console.log(_obj);
                    console.log(gameObjectList.at(ii));

                    _ret = true;
                    break;
                  }
                }
              }
            }
          }
        }


        return (_ret);
      }


      // コントローラー形状変化
      function setControllerType(cnvs) {

        // 遊技台設置
        if (gameMode == GameMode.MODE_MACHINE_SET) {
          var ctrlF = 0;
          var _obj = cnvs.getActiveObject();

          if (!_obj.idx) {
            if (_obj._objects) {
              /* 効果なし？
                        _obj.set({
                          originX:"left",
                          originY:"top"
                        });
              */
              console.log(_obj.length);
              console.log(_obj.items);
              console.log(_obj._objects.length);
              console.log(_obj.item(0));
              for (var ii = 0; ii < _obj._objects.length; ii++) {
                var _obj2 = _obj.item(ii);
                if (_obj2.idx) {
                  var idx = _obj2.idx;
                  if (checkGameObjectTypeMACHINE_BOX(idx)) {
                    ctrlF = 1;
                    break;
                  } else if (checkGameObjectTypeTEXT(idx)) {
                    if (ctrlF != 1) {
                      ctrlF = 4;
                    }
                  }
                } else {

                }
              }
            } else {
              ctrlF = 1;
            }
          } else {
            if (_obj.idx) {
              var idx = _obj.idx;
              if (checkGameObjectTypeMACHINE_BOX(idx)) {
                ctrlF = 1;
              }
            } else if (checkGameObjectTypeTEXT(idx)) {
              if (ctrlF != 1) {
                ctrlF = 4;
              }
            } else {
              ctrlF = 1;
            }
          }

          switch (ctrlF) {
            case 1:   // 移動不可・サイズ変更不可
              _obj.hasControls = false;
              _obj.lockMovementX = true;
              _obj.lockMovementY = true;
              _obj.lockUniScaling = false;
              break;
            case 2:   // 移動可・サイズ変更不可
              break;
            default:
              _obj.selectable = true;
              //          _obj.editable = true;
              _obj.evented = true;
              _obj.hasControls = true;
              _obj.lockMovementX = false;
              _obj.lockMovementY = false;
              _obj.lockUniScaling = false;
              _obj.lockScalingFlip = true;
              break;
          }
        } else {
          // 島図作成

          var ctrlF = 0;
          var _obj = cnvs.getActiveObject();

          if (!_obj.idx) {
            if (_obj._objects) {
              console.log("group select");
              console.log(_obj.length);
              console.log(_obj.items);
              console.log(_obj._objects.length);
              console.log(_obj);

              var additionList = new Array();
              for (var ii = 0; ii < _obj._objects.length; ii++) {
                var _obj2 = _obj.item(ii);
                console.log("aaaaaaaaaaaa");
                if (_obj2.idx) {
                  var idx = _obj2.idx;
                  if (checkGameObjectTypeMACHINE_BOX(idx)) {
                    ctrlF = 2;
                  } else if (checkGameObjectTypeSPACE_BOX(idx)) {
                    ctrlF = 2;
                  } else if (checkGameObjectTypeLINE(idx)) {
                    ctrlF = 2;
                  } else if (checkGameObjectTypeTEXT(idx)) {
                    if (ctrlF != 2) {
                      ctrlF = 4;
                    }
                  }
                } else {
                  if (_obj2.parentObj) {   //ラインのcircle
                    additionList.push(_obj2.parentObj);
                    console.log(_obj2.parentObj);
                  }
                  ctrlF = 2;
                }
              }
              /*  lineのcircleを片方だけ選択した際の処理…旨くいかないので後で対応方法考える
                        for(var ii = 0;ii < additionList.length;ii++){
                          var _obj3 = additionList.at(ii);
                          var _obj4 = _obj3.circle1;
                          var _obj5 = _obj3.circle2;
                          console.log(_obj4);
                          console.log(_obj5);
                          cnvs.setActiveObject(_obj4);
                          cnvs.setActiveObject(_obj5);
                        }
                        _obj.setCoords();
                        cnvs.requestRenderAll();
              */
            } else {
              ctrlF = 2;
            }
          } else {
            if (_obj.idx) {
              var idx = _obj.idx;
              if (checkGameObjectTypeMACHINE_BOX(idx)) {
                ctrlF = 2;
              } else if (checkGameObjectTypeSPACE_BOX(idx)) {
                ctrlF = 2;
              } else if (checkGameObjectTypeLINE(idx)) {
                ctrlF = 2;
              } else if (checkGameObjectTypeTEXT(idx)) {
                if (ctrlF != 2) {
                  ctrlF = 4;
                }
              }
            } else {
              ctrlF = 2;
            }
          }

          switch (ctrlF) {
            case 2:   // 移動可・サイズ変更不可
              _obj.hasControls = false;
              _obj.lockMovementX = false;
              _obj.lockMovementY = false;
              _obj.lockUniScaling = false;
              break;
            case 4:   // 4隅のみスケール
              {
                _obj.selectable = true;
                //            _obj.editable = true;
                _obj.evented = true;
                _obj.hasControls = true;
                _obj.lockMovementX = false;
                _obj.lockMovementY = false;
                _obj.lockUniScaling = false;
                _obj.lockScalingFlip = true;

                var control_param = fabric.Object.prototype.controls;
                control_param.mtr.visible = false; // mtrは回転ポイントの名前
                control_param.bl.visible = true; // blは左下のコントロールポイントの名前
                control_param.br.visible = true; // brは右下のコントロールポイントの名前
                control_param.mb.visible = false; // mbは下中央のコントロールポイントの名前
                control_param.ml.visible = false; // mlは左中央のコントロールポイントの名前
                control_param.mr.visible = false; // mrは右中央のコントロールポイントの名前
                control_param.mt.visible = false; // mtは上中央のコントロールポイントの名前
                control_param.tl.visible = true; // tlは左上のコントロールポイントの名前
                control_param.tr.visible = true; // trは右上のコントロールポイントの名前
                _obj.set({ controls: control_param });
              }
              break;

            default:  // 全てOK
              _obj.selectable = true;
              //          _obj.editable = true;
              _obj.evented = true;
              _obj.hasControls = true;
              _obj.lockMovementX = false;
              _obj.lockMovementY = false;
              _obj.lockUniScaling = false;
              _obj.lockScalingFlip = true;
              break;
          }

        }
      }

      // object 選択開始
      function selectionCreated(cnvsID, cnvs, options) {
        //console.log("selection:created");
        setObjectPosition(cnvs);
        setControllerType(cnvs);
        setTargetObjectAction(1);


        if (gameMode == GameMode.MODE_MACHINE_SET) {
          swapMachineStatus();
        }

      }

      // object 選択変更・更新
      function selectionUpdated(cnvsID, cnvs) {
        //console.log("selection:updated");
        setObjectPosition(cnvs);
        setControllerType(cnvs);
        setTargetObjectAction(2);

        if (gameMode == GameMode.MODE_MACHINE_SET) {
          swapMachineStatus();
        }
      }

      // object 選択解除
      function selectionCleared(cnvsID, cnvs) {
        //console.log("selection:cleared");
        setTargetObjectAction(3);
        resetObjectPosition();
      }

      // mouse移動
      function mouseMove(cnvs, options) {
        //    console.log("mouse:move");
      }

      // mouse up
      function mouseUp(cnvs, options) {
        // console.log("mouse:up");
        console.log(mainStatus.lastActionType);
        allocationGameMachine();

        if (gameMode == GameMode.MODE_MAP_EDIT) {
          if (checkObjectCollision(cnvs)) {    //test
            rewindObjectPosition(cnvs);
            return;
          }
        }
        switch (mainStatus.lastActionType) {  //さっきまで何してた?
          case 0:   //何もしてない
            break;
          case 1:
            break;
          case 2:
            break;
          case 10:
            {
              setObjectPosition(cnvs);
              //setControllerType(cnvs);
            }
            break;
          case 11:  // scale
            {
              //          var _obj = mainStatus.lastActionObj;
              var _obj = cnvs.getActiveObject();
              console.log(_obj);
              if (!_obj.idx) {
                if (_obj._objects) {
                  for (var ii = 0; ii < _obj._objects.length; ii++) {

                    var _obj2 = _obj.item(ii);
                    if (checkGameObjectTypeBOXES(_obj2.idx)) {  //箱系
                      /* 
                                        var _w = (_obj.scaleX * _obj2.width / grid) * grid;
                                        var _h = (_obj.scaleY * _obj2.height / grid) * grid;
                                        _w = _w / _obj.scaleX;
                                        _h = _h / _obj.scaleY;
                                        var _x =  (_obj.scaleX * _obj2.left / grid) * grid;
                                        var _y =  (_obj.scaleY * _obj2.top / grid) * grid;
                                        _x = _x / _obj.scaleX;
                                        _y = _y / _obj.scaleY; 
                      */
                      var st = _obj2.strokeWidth / _obj.scaleX;
                      _obj2.set({
                        strokeWidth: st
                      });
                    } else {   //それ以外はそのまま
                    }
                  }
                  cnvs.requestRenderAll();
                }
              } else {
                if (checkGameObjectTypeBOXES(_obj.idx)) {  //箱系
                  console.log("scale...");
                  console.log(_obj);
                  var _w = Math.floor(_obj.scaleX * _obj.width / grid) * grid;
                  var _h = Math.floor(_obj.scaleY * _obj.height / grid) * grid;
                  _obj.set({
                    width: _w,
                    height: _h,
                    scaleX: 1,
                    scaleY: 1,
                    strokeWidth: 1
                  });
                  cnvs.requestRenderAll();
                }   //それ以外はそのまま
              }
            }
            break;
        }

        {   //オブジェクトの更新
          var _obj = cnvs.getActiveObject();
          if (!_obj) {
            return;
          }
          if (!_obj.idx) {
            if (_obj._objects) {
              for (var ii = 0; ii < _obj._objects.length; ii++) {
                var _obj3 = _obj.item(ii);
                updateGameObjectAt(_obj3.idx, _obj3);
              }
            }
          } else {
            updateGameObjectAt(_obj.idx, _obj);
          }
        }


      }

      function mouseDown(cnvs, options) {
        //    console.log("mouse:down");
      }

      //Double click function to print in the console the machine data
      //機械データをコンソールに印刷するダブルクリック機能
      async function mouseDblclick(cnvs, options) {
        console.log("mouse:dblclick");
        console.log(options.target);

        if (gameMode == GameMode.MODE_MACHINE_SET) {
          if (options.target) {
            var _idx = options.target.idx;
            if (_idx) {
              if (await checkGameObjectTypeMACHINE_BOX_promise(_idx)) {
                modalTargetObject = { idx: _idx, obj: options.target };
                //モーダル
                infoMachineDialog(obj2_promise, options.target);
              } else if (checkGameObjectTypeNAMETEXT(_idx) || checkGameObjectTypeNAMETEXT_VERTICAL(_idx)) {
                modalTargetObject = { idx: _idx, obj: options.target };
                setTextDialog2();
              }
            }
          }
        }
      }

      // ==========================================
      // 基本のイベント
      // ==========================================
      canvas.on("object:moving", function (options) {
        mainStatus.targetCanvasID = 0;
        objectMoving(canvas, options);
      });
      canvas.on("object:moved", function (options) {
        mainStatus.targetCanvasID = 0;
        objectMoved(canvas, options);
      });
      canvas.on("object:scaling", function (options) {
        mainStatus.targetCanvasID = 0;
        objectScaling(canvas, options);
      });
      //
      canvas.on("selection:created", (options) => {
        mainStatus.targetCanvasID = 0;
        selectionCreated(0, canvas, options);
      });
      canvas.on("selection:updated", () => {
        mainStatus.targetCanvasID = 0;
        selectionUpdated(0, canvas);
      });
      canvas.on("selection:cleared", () => {
        mainStatus.targetCanvasID = 0;
        selectionCleared(0, canvas);
      });
      //
      canvas.on("mouse:move", function (options) {
        mainStatus.targetCanvasID = 0;
        mouseMove(canvas, options);
      });
      canvas.on("mouse:up", function (options) {
        mainStatus.targetCanvasID = 0;
        mouseUp(canvas, options);
      });
      canvas.on("mouse:down", function (options) {
        mainStatus.targetCanvasID = 0;
        mouseDown(canvas, options);
      });
      canvas.on("mouse:dblclick", function (options) {
        mainStatus.targetCanvasID = 0;
        mouseDblclick(canvas, options);
      });

      // ==========================================
      // canvas2
      // ==========================================
      if (gameMode == GameMode.MODE_MACHINE_SET) {
        canvas2.on("object:moving", function (options) {
          mainStatus.targetCanvasID = 1;
          objectMoving(canvas2, options);
        });
        canvas2.on("object:moved", function (options) {
          mainStatus.targetCanvasID = 1;
          objectMoved(canvas2, options);
        });
        canvas2.on("object:scaling", function (options) {
          mainStatus.targetCanvasID = 1;
          objectScaling(canvas2, options);
        });
        //
        canvas2.on("selection:created", (options) => {
          mainStatus.targetCanvasID = 1;
          selectionCreated(1, canvas2, options);
        });
        canvas2.on("selection:updated", () => {
          mainStatus.targetCanvasID = 1;
          selectionUpdated(1, canvas2);
        });
        canvas2.on("selection:cleared", () => {
          mainStatus.targetCanvasID = 1;
          selectionCleared(1, canvas2);
        });
        //
        canvas2.on("mouse:move", function (options) {
          mainStatus.targetCanvasID = 1;
          mouseMove(canvas2, options);
        });
        canvas2.on("mouse:up", function (options) {
          mainStatus.targetCanvasID = 1;
          mouseUp(canvas2, options);
        });
        canvas2.on("mouse:down", function (options) {
          mainStatus.targetCanvasID = 1;
          mouseDown(canvas2, options);
        });
        canvas2.on("mouse:dblclick", function (options) {
          mainStatus.targetCanvasID = 1;
          mouseDblclick(canvas2, options);
        });
      }

    }

    /*
    document.addEventListener("DOMContentLoaded", function () {
      var checkboxes = document.querySelectorAll('input[name="direction"]');
      checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          console.log("checkbox????????");
          if (this.checked) {
            checkboxes.forEach(function (otherCheckbox) {
              if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
              }
            });
          }
        });
      });
    });
    */


    function swapMachineStatus() {
      if (mainStatus.isSplit) {
        //分割中の台情報入れ替え
        var obj1 = canvas.getActiveObject();
        var obj2 = canvas2.getActiveObject();
        if ((obj1) && (obj2)) {
          if ((obj1.idx) && (obj2.idx)) {
            if (checkGameObjectTypeMACHINE_BOX(obj1.idx) && checkGameObjectTypeMACHINE_BOX(obj2.idx)) {
              console.log("swap");
              swapGameObjectAt_Machine(0, obj1.idx, obj1, 1, obj2.idx, obj2);
              resetCanvasActiveObject();
            }
          }
        }
      }
    }

    // アクティブから外す
    function resetCanvasActiveObject() {
      /*
        canvas.setActiveObject(null);
        if(canvas2){
          canvas2.setActiveObject(null);
        }
      */
      canvas.discardActiveObject();
      if (canvas2) {
        canvas2.discardActiveObject();
      }
    }


    // オブジェクト削除
    function deleteObject() {
      console.log("delete");

      // よくない書き方だけどとりあえず…
      if (true) {   //settingにsw何か置く
        var _obj = canvas.getActiveObject();
        modalTargetObject = _obj;
        deleteObjectDialog();
      } else {
        var _obj = canvas.getActiveObject();
        deleteObject2(_obj);
      }
    }


    // fabric & gameObject削除
    function deleteObject2(_obj) {
      console.log(_obj);
      if (!_obj) {
        return
      }

      if (_obj.NoDelete) {    //削除禁止オブジェクト
        return;
      }

      if (_obj.parentObj) {
        //親オブジェがいるなら…
        _obj = _obj.parentObj;
      }

      if (_obj) {
        if (_obj.idx) {
          if (checkGameObjectTypeMACHINE_BOX(_obj.idx)) {
            if (gameMode == GameMode.MODE_MACHINE_SET) {
              return;
            }
            /*
                    stopObjectAnimation(_obj);
                    //
                    for (var ii = 0; ii < _obj._objects.length; ii++) {
                      var _obj2 = _obj._objects[ii];
                      console.log("" + _obj2);
                      canvas.remove(_obj2);
                      if (_obj2.idx) {
                        if (_obj2.idx >= 0) {
                          deleteGameObjectAt(_obj2.idx);
                        }
                      }
                      _obj2 = null;
                    }
                    canvas.remove(_obj);
                    if (_obj.idx) {
                      deleteGameObjectAt(_obj.idx);
                    }
                    _obj = null;
            */
          }
          if (gameMode == GameMode.MODE_MAP_EDIT) {
            if (_obj.type == "line") {
              let c1 = _obj.circle1;
              let c2 = _obj.circle2;
              canvas.remove(c1);
              canvas.remove(c2);
              c1 = null;
              c2 = null;
            }
          }
          //
          console.log("" + _obj);
          canvas.remove(_obj);
          deleteGameObjectAt(_obj.idx);
          _obj = null;
        } else {
          for (var jj = 0; jj < _obj._objects.length; jj++) {
            var _obj2 = _obj._objects[jj];
            if (_obj2.idx) {
              if (checkGameObjectTypeMACHINE_BOX(_obj2.idx)) {
                if (gameMode == GameMode.MODE_MACHINE_SET) {
                  continue;
                }
              }
              if (gameMode == GameMode.MODE_MAP_EDIT) {
                if (_obj2.type == "line") {
                  let c1 = _obj2.circle1;
                  let c2 = _obj2.circle2;
                  canvas.remove(c1);
                  canvas.remove(c2);
                  c1 = null;
                  c2 = null;
                }
              }
              //
              console.log("" + _obj2);
              canvas.remove(_obj2);
              deleteGameObjectAt(_obj2.idx);
              _obj2 = null;
            }

          }
        }

        canvas.requestRenderAll();
        resetCanvasActiveObject();
      }
    }


    // 直前に行った動作
    function setTargetObjectAction(_eveID) {
      //  console.log("event = " + _eveID);
      switch (_eveID) {
        case 1:
          {
            //        console.log("selection:created");
            mainStatus.lastActionType = 1;
          }
          break;
        case 2:
          {
            //        console.log("selection:updated");
            mainStatus.lastActionType = 2;
          }
          break;
        case 3:
          {
            //        console.log("selection:cleared");
            mainStatus.lastActionType = 3;
          }
          break;
        case 10:
          {
            mainStatus.lastActionType = 10;
          }
          break;
        case 11:    //スケール
          {
            mainStatus.lastActionType = 11;
            mainStatus.lastActionObj = canvas.getActiveObject();
          }
          break;
      }
    }

    function zoomIN() {
      console.log("zoom in");
      if (canvasScale < 10.0) {
        canvasScale += 0.5;
      }
      canvas.setZoom(canvasScale);
      if (canvas2) {
        canvas2.setZoom(canvasScale);
      }
    }

    function zoomOUT() {
      console.log("zoom out");

      if (canvasScale > 0.5) {
        canvasScale -= 0.5;
      } else {
        canvasScale = 0.5;
      }
      canvas.setZoom(canvasScale);
      if (canvas2) {
        canvas2.setZoom(canvasScale);
      }
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Upper menu
/*

島図上部メニュー用

*/



// 共通dailog
var um_modal = null;


// 遊技台割付なしに設定
function um_allocationOffGameMachine(){
    console.log("um_allocationOffGameMachine()");

    var _cnvs = null;    
    if(mainStatus.targetCanvasID == 0){
        _cnvs = canvas;
    }else {
        _cnvs = canvas2;
    }
    var _obj = _cnvs.getActiveObject();
    if(_obj){
        if(_obj.idx){
            if(checkGameObjectTypeMACHINE_BOX(_obj.idx)){
                if(getGameObjectMachineBox_SerialID(_obj.idx)){
                    removeMachineData(_obj.idx);
                }
                stopObjectAnimation(_obj);
                setGameObjectMachineAllocationOFF(_obj.idx,true);  // 
                updateGameObjectAt_Machine(mainStatus.targetCanvasID,_obj.idx, _obj, 0, 0, null);
                
                updateGameObjectAt_Color(_obj.idx,_obj,getGameObjectColorPalleteID(_obj.idx));
                _cnvs.requestRenderAll();
            }
        }
    }
}


// 遊技台割付ありに設定
function um_allocationOnGameMachine(){
    console.log("um_allocationGameMachine()");
    
    var _cnvs = null;    
    if(mainStatus.targetCanvasID == 0){
        _cnvs = canvas;
    }else {
        _cnvs = canvas2;
    }
    var _obj = _cnvs.getActiveObject();
    if(_obj){
        if(_obj.idx){
            if(checkGameObjectTypeMACHINE_BOX(_obj.idx)){
                stopObjectAnimation(_obj);
                setGameObjectMachineAllocationOFF(_obj.idx,false);   //
                updateGameObjectAt_Machine(mainStatus.targetCanvasID,_obj.idx, _obj, _obj.machineGroup, _obj.machineType, _obj.serialID);

                updateGameObjectAt_Color(_obj.idx,_obj,getGameObjectColorPalleteID(_obj.idx));
                _cnvs.requestRenderAll();
            }
        }
    }

}

var location_btnA = document.getElementById('location_btnA');
var location_btnB = document.getElementById('location_btnB');
// location_btnA.addEventListener("click", allocationGameMachine);
// location_btnB.addEventListener("click", allocationGameMachine);
//Allow on and off machine function on clik
function allocationGameMachine() {


    if (machine_object_status == "B") {
        var _cnvs = null;
        if (mainStatus.targetCanvasID == 0) {
            _cnvs = canvas;
        } else {
            _cnvs = canvas2;
        }
        var _obj = _cnvs.getActiveObject();
        if (_obj) {
            if (_obj.idx) {
                if (checkGameObjectTypeMACHINE_BOX(_obj.idx)) {
                    stopObjectAnimation(_obj);
                    updateGameObjectAt_Machine(mainStatus.targetCanvasID, _obj.idx, _obj, 0, 0, null);
                    updateGameObjectAt_Color(_obj.idx, _obj, getGameObjectColorPalleteID(_obj.idx));
                    _cnvs.requestRenderAll();
                }
            }
        }
        location_btnA.onclick = um_allocationOffGameMachine;


    } else if (machine_object_status == "A") {

        var _cnvs = null;
        if (mainStatus.targetCanvasID == 0) {
            _cnvs = canvas;
        } else {
            _cnvs = canvas2;
        }
        var _obj = _cnvs.getActiveObject();
        if (_obj) {
            if (_obj.idx) {
                if (checkGameObjectTypeMACHINE_BOX(_obj.idx)) {
                    stopObjectAnimation(_obj);
                    updateGameObjectAt_Machine(mainStatus.targetCanvasID, _obj.idx, _obj, _obj.machineGroup, _obj.machineType, _obj.serialID);
                    updateGameObjectAt_Color(_obj.idx, _obj, getGameObjectColorPalleteID(_obj.idx));
                    _cnvs.requestRenderAll();
                }
            }
        }
        location_btnB.onclick = um_allocationOnGameMachine;
    }
}

// 遊技台撤去
function um_removalMachineSerial(){
    console.log("um_removalMachineSerial()");

    var _cnvs = null;    
    if(mainStatus.targetCanvasID == 0){
        _cnvs = canvas;
    }else {
        _cnvs = canvas2;
    }
    var _obj = _cnvs.getActiveObject();
    if(_obj){
        if(_obj.idx){
            if(checkGameObjectTypeMACHINE_BOX(_obj.idx)){
                if(getGameObjectMachineBox_SerialID(_obj.idx)){
                    removeMachineData(_obj.idx);
                    stopObjectAnimation(_obj);
                    updateGameObjectAt_Machine(mainStatus.targetCanvasID,_obj.idx, _obj, 0, 0, null);

                    _cnvs.requestRenderAll();
                }
            }
        }
    }
}


// 島図遊技台テキスト変更
function um_changeMachineNo(){
    // 島図はcanvasしかない
    var _obj = canvas.getActiveObject();
    if(_obj){
        if(_obj.idx){
            if (checkGameObjectTypeMACHINE_BOX(_obj.idx)) {
                addMachineBoxDialog(_obj);
            }
        }
    }
}


// 島図テキスト変更
function um_changeText(){
    // 現状ではcanvasのみ?
    var _obj = canvas.getActiveObject();
    if(_obj){
        if(_obj.idx){
           if(checkGameObjectTypeTEXT(_obj.idx)){
                modalTargetObject = { idx: _obj.idx, obj: _obj };
                setTextDialog();
           } 
        }
    }
}

// 島図undo
function um_Undo(){
    console.log("undo");
}


// 島図reload
function um_Reload(){
    console.log("reloead");

//    location.reload();
    reloadDialog();
}


// 設定画面を開く(setting_menu.html)
function um_openSettingMenu() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./dialog/setting_menu.html", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            // 取得したダイアログのコンテンツをモーダル内に挿入
            var dialogContent = xhr.responseText;
            var modalContent = document.querySelector(
                "#staticSettingMenu .modal-content"
            );
            modalContent.innerHTML = dialogContent;
            // モーダルを表示
            um_modal = new bootstrap.Modal(
                document.getElementById("staticSettingMenu")
//                document.getElementById("staticMessageDialog")
            );

            {   //初期設定
                let element = document.getElementById('modal_setting_menu_01');
                element.checked = settingMenuData.setting_01;
                element = document.getElementById('modal_setting_menu_02');
                element.checked = settingMenuData.setting_02;
                element = document.getElementById('modal_setting_menu_03');
                element.checked = settingMenuData.setting_03;
                element = document.getElementById('modal_setting_menu_04');
                element.checked = settingMenuData.setting_04;
            }
            um_modal.show();
        }
    };
    xhr.send();
}

// 設定画面 ok
function um_saveSettingMenu() {
    if (um_modal) {  // save & close
        let element = document.getElementById('modal_setting_menu_01');
        settingMenuData.setting_01 = element.checked;
        console.log(element.checked);
        element = document.getElementById('modal_setting_menu_02');
        settingMenuData.setting_02 = element.checked;
        console.log(element.checked);
        element = document.getElementById('modal_setting_menu_03');
        settingMenuData.setting_03 = element.checked;
        console.log(element.checked);
        element = document.getElementById('modal_setting_menu_04');
        settingMenuData.setting_04 = element.checked;
        console.log(element.checked);

        um_modal.hide();
        um_modal = null;
    }
}


// 名称Box追加
function um_addMachineNameBox(){
    console.log("namebox");
    const element = document.querySelector('.canvas-container');

    var x = Math.floor(element.scrollLeft + (element.clientWidth / 2) / grid) * grid;
    var y = Math.floor(element.scrollTop + (element.clientHeight / 2) / grid) * grid;;
    var _rect = addNameBox(
          x,
          y,
          grid * 8,
          grid * 8,
          getDefaultColor(),
          "#000000"
        );
        canvas.add(_rect);
        addGameObject(_rect, ObjectType.NAME_BOX, 0);
}

// 名称text追加
function um_addMachineNameText(){
    console.log("nametext");
    const element = document.querySelector('.canvas-container');

    var x = Math.floor(element.scrollLeft + (element.clientWidth / 2) / grid) * grid;
    var y = Math.floor(element.scrollTop + (element.clientHeight / 2) / grid) * grid;;
    var txt = "遊技台名称";
    _text = addNameIText(txt,x,y,20);
    canvas.add(_text);
    addGameObject(_text,ObjectType.NAME_TEXT,0);
}




// 個別アイコン変更(非アクティブ化)
function um_setIconDisabled(_name, _set) {
    let element = document.getElementById(_name);
    if (element) {
        element.disabled = _set;
    }
}


// 状態別アイコングループの状態変更
function um_setIconGroupMode(_mode) {
    switch (_mode) {
        case 0:         // 何も選択してない状態
            // test 
//            um_setIconDisabled('um_setting_button02', true);
//            um_setIconDisabled('um_setting_button03', true);
            break;
        case 1:         // 遊技台選択中
            break;
        case 2:         // 
            break;
        case 3:         // 
            break;
    }
}


//
function um_savePng(){
    testSaveCanvas();    
}



//
function initUpperMenu(){   //
    var modal = null;
    um_setIconGroupMode(0);
}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
////Dummy data


//テストデータ
const machineGroup = 1;
const newMachineApiData = [
  {
    id: 1,
    machineGroup: machineGroup,
    machineType: "パチスロ蒼天の拳４　111111111",
    serialID: "A10001",
    name: "そうてん",
  },
  {
    id: 2,
    machineGroup: machineGroup,
    machineType: "パチスロ蒼天の拳４　111111112",
    serialID: "A10002",
    name: "そうてん",
  },
  {
    id: 3,
    machineGroup: machineGroup,
    machineType: "パチスロ蒼天の拳４　111111113",
    serialID: "A10003",
    name: "そうてん",
  },
  {
    id: 4,
    machineGroup: machineGroup,
    machineType: "パチスロ蒼天の拳４　111111114",
    serialID: "A10004",
    name: "そうてん",
  },
  {
    id: 5,
    machineGroup: machineGroup,
    machineType: "パチスロ蒼天の拳４　111111115",
    serialID: "A10005",
    name: "そうてん",
  },
  {
    id: 6,
    machineGroup: machineGroup,
    machineType: "パチスロ蒼天の拳４　111111116",
    serialID: "A10006",
    name: "そうてん",
  },
  {
    id: 7,
    machineGroup: machineGroup,
    machineType: "パチスロ蒼天の拳４　111111117",
    serialID: "A10007",
    name: "そうてん",
  },
  {
    id: 8,
    machineGroup: machineGroup,
    machineType: "パチスロ蒼天の拳４　111111118",
    serialID: "A10008",
    name: "そうてん",
  },
];

const stockMachineApiData = [
  {
    id: 1,
    machineGroup: machineGroup,
    machineType: "P蒼天の拳天刻　211111111",
    serialID: "B10001",
    name: "Pそう",
  },
  {
    id: 2,
    machineGroup: machineGroup,
    machineType: "P蒼天の拳天刻　211111112",
    serialID: "B10002",
    name: "Pそう",
  },
  {
    id: 3,
    machineGroup: machineGroup,
    machineType: "P蒼天の拳天刻　211111113",
    serialID: "B10003",
    name: "Pそう",
  },
  {
    id: 4,
    machineGroup: machineGroup,
    machineType: "P蒼天の拳天刻　211111114",
    serialID: "B10004",
    name: "Pそう",
  },
  {
    id: 5,
    machineGroup: machineGroup,
    machineType: "P蒼天の拳天刻　211111115",
    serialID: "B10005",
    name: "Pそう",
  },
  {
    id: 6,
    machineGroup: machineGroup,
    machineType: "P蒼天の拳天刻　211111116",
    serialID: "B10006",
    name: "Pそう",
  },
  {
    id: 7,
    machineGroup: machineGroup,
    machineType: "P蒼天の拳天刻　211111117",
    serialID: "B10007",
    name: "Pそう",
  },
  {
    id: 8,
    machineGroup: machineGroup,
    machineType: "P蒼天の拳天刻　211111118",
    serialID: "B10008",
    name: "Pそう",
  },
];



const testBaseData = {
  object: [
    {
      floor: "",
      floorID: 2,

      objType: 1,
      colorPalleteID: 0,
      xpos: 10 * grid,
      ypos: 10 * grid,
      width: 8 * grid,
      height: 8 * grid,
      text: "読込データ",
    },
    {
      floor: "",
      floorID: 2,

      objType: 1,
      colorPalleteID: 0,
      xpos: 18 * grid,
      ypos: 10 * grid,
      width: 8 * grid,
      height: 8 * grid,
      text: "読込データ",
    },

    {
      floor: "",
      floorID: 1,

      objType: 1,
      colorPalleteID: 0,
      xpos: 34 * grid,
      ypos: 10 * grid,
      width: 8 * grid,
      height: 8 * grid,
      text: "読込データ",
    },

    {
      floor: "",
      floorID: 1,

      objType: 1,
      colorPalleteID: 0,
      xpos: 16 * grid,
      ypos: 30 * grid,
      width: 8 * grid,
      height: 8 * grid,
      text: "読込データ",
    },
    {
      floor: "",
      floorID: 1,

      objType: 1,
      colorPalleteID: 0,
      xpos: 24 * grid,
      ypos: 30 * grid,
      width: 8 * grid,
      height: 8 * grid,
      text: "読込データ",
    },

    {
      floor: "",
      floorID: 1,

      objType: 1,
      colorPalleteID: 0,
      xpos: 26 * grid,
      ypos: 10 * grid,
      width: 8 * grid,
      height: 8 * grid,
      text: "読込データ",
    },
    {
      floor: "",
      floorID: 1,

      objType: 1,
      colorPalleteID: 0,
      xpos: 32 * grid,
      ypos: 30 * grid,
      width: 8 * grid,
      height: 8 * grid,
      text: "読込データ",
    },

    {
      floor: "",
      floorID: 1,

      objType: 4,
      colorPalleteID: 0,
      xpos: 0,
      ypos: 0,
      width: 0,
      height: 0,
      x1: 100,
      y1: 570,
      x2: 400,
      y2: 570,
    },
    {
      floor: "",
      floorID: 1,

      objType: 5,
      colorPalleteID: 0,
      xpos: 400,
      ypos: 240,
      width: 50,
      height: 150,
    },
    {
      floor: "",
      floorID: 1,

      objType: 2,
      colorPalleteID: 0,
      xpos: 200,
      ypos: 600,
      width: 0,
      height: 0,
      text: "階段怪談",
      scaleX: 2.0,
      scaleY: 2.0,
    },
    {
      floor: "",
      floorID: 1,

      objType: 3,
      colorPalleteID: 0,
      xpos: 400,
      ypos: 200,
      width: 0,
      height: 0,
      text: "カウンター",
      scaleX: 1.5,
      scaleY: 1.5,
    },
    {
      floor: "",
      floorID: 1,

      objType: 6,
      colorPalleteID: 0,
      xpos: 720,
      ypos: 200,
      width: 8 * grid,
      height: 8 * grid,
    },
    {
      floor: "",
      floorID: 1,

      objType: 6,
      colorPalleteID: 0,
      xpos: 720,
      ypos: 264,
      width: 8 * grid,
      height: 8 * grid,
    },
  ],
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Game Machine

/*
### 遊技台情報
- パチンコ・スロット・その他?
- 筐体種類・機種
- 筐体シリアルID
- 属性
*/


const GameMachineGroup = {
    NULL: 0,
    PACHINKO: 1,
    SLOT: 2,
    BLANCK: 3,
};


//遊技台情報
var gameMachineInfo = {
    idx: -1,
    id: 0,
    machineGroup: GameMachineGroup.NULL,
    machineType: "0",       // 機種
    serialID: "0",          // シリアル
    name: "name",
    setF: false,            // 設置済み
    status: 1,              // new=1 / stock=2
    setting: function (_flag) {    //設置・解除
        this.setF = _flag;
    }
}


var gameMachineList = null;

// debug用
var debugCount2 = 0;

// 追加
function addGameMachineList(json,stat) {
    var obj = Object.assign({}, gameMachineInfo);
    obj.id = json.id;
    obj.machineGroup = json.machineGroup;
    obj.machineType = json.machineType;
    obj.serialID = json.serialID;
    obj.name = json.name;
    obj.setF = false;
    obj.status = stat;

    obj.idx = gameMachineList.push(obj);
    //console.log("len = " + gameMachineList.length);
    //    console.log(obj);
}

// 削除
function deleteGameMachine(idx) {
    delete gameMachineList[idx];
}

// indexから
function getGameMachineAt(idx) {
    if (idx >= gameMachineList.length) {
        return (null);
    }
    if (!gameMachineList.at(idx)) {
        //    if(gameMachineList.at(idx) == undefined){
        return (null);
    }
    return (gameMachineList.at(idx));
}

// serialから
function getGameMachineSerialID(serialID) {
    for (var ii = 0; ii < gameMachineList.length; ii++) {
        if (!gameMachineList.at(ii)) {
            //        if((gameMachineList.at(ii) == undefined) || (gameMachineList.at(ii) == null)){
            continue;
        }
        if (gameMachineList.at(ii).serialID == serialID) {
            //            console.log("getGameMachineSerialID="+ii);
            return (gameMachineList.at(ii));
        }
    }
    return (null);
}

// 同型機種が何台あるか
function getGameMachineTypeNum(_machineType) {
    var ret = 0;
    for (var ii = 0; ii < gameMachineList.length; ii++) {
        if (!gameMachineList.at(ii)) {
            //        if((gameMachineList.at(ii) == undefined) || (gameMachineList.at(ii) == null)){
            continue;
        }
        if (gameMachineList.at(ii).machineType == _machineType) {
            ret++;
        }
    }
    return (ret);
}

// 未設置台
function getGameMachineUnusedList(_stat) {
    var list = new Array();
    for (var ii = 0; ii < gameMachineList.length; ii++) {
        if ((gameMachineList.at(ii) == undefined) || (gameMachineList.at(ii) == null)) {
            continue;
        }
        if(gameMachineList.at(ii).status == _stat){
            if (!gameMachineList.at(ii).setF) {
                list.push(gameMachineList.at(ii));
            }
        }
    }
    return (list);
}


// 未設置台(_at以降のリスト)
function getGameMachineUnusedListAt(_stat,_type,_serialID) {
    var list = new Array();
    var chkF = false;
    for (var ii = 0; ii < gameMachineList.length; ii++) {
        if ((gameMachineList.at(ii) == undefined) || (gameMachineList.at(ii) == null)) {
            continue;
        }
        if(gameMachineList.at(ii).status == _stat){
            if((gameMachineList.at(ii).machineType == _type) && (gameMachineList.at(ii).serialID == _serialID)){ //これでいいのか…
                chkF = true;
            }
            if(chkF){
                if (!gameMachineList.at(ii).setF) {
                    list.push(gameMachineList.at(ii));
                }
            }
        }
    }
    return (list);
}


// 全リストの台
function getGameMachineList() {
    return (gameMachineList);
}


// 全リスト(ステータス合わせ)
function getGameMachineListStat(_stat) {
    var list = new Array();
    for (var ii = 0; ii < gameMachineList.length; ii++) {
        if ((gameMachineList.at(ii) == undefined) || (gameMachineList.at(ii) == null)) {
            continue;
        }
        if(gameMachineList.at(ii).status == _stat){
            list.push(gameMachineList.at(ii));
        }
    }
    return (list);
}



// 島図から設置・未設置台の振り分け
function calsGameMachine(objlist) {
    //gameObjectList(こっちでやるか向こうでやるか)
}


// 島図と在庫が矛盾ないかチェック(false = OK/true = NG)
function checkGameMachine(objlist) {
    //gameObjectList(こっちでやるか向こうでやるか)

    var ret = false;
    return (ret);
}


function loadGameMachenList() {
    //    newMachineApiData;    
    //     stockMachineApiData
    for (var ii = 0; ii < newMachineApiData.length; ii++) {
        addGameMachineList(newMachineApiData.at(ii),1);
    }
    for (var ii = 0; ii < stockMachineApiData.length; ii++) {
        addGameMachineList(stockMachineApiData.at(ii),2);
    }

}


/*
function testFunc() {
    console.log("---- test list ----");

    var machineTest = {
        "id": 1,
        "machineGroup": GameMachineGroup.SLOT,
        "machineType": "北斗の拳(?英数字の羅列?)",
        "serialID": "A10000",
        "name": "ほくと",
    }
    addGameMachineList(machineTest);

    machineTest.id = 2;
    machineTest.serialID = "A10001";
    addGameMachineList(machineTest);

    machineTest.id = 3;
    machineTest.serialID = "A10002";
    addGameMachineList(machineTest);

    machineTest.id = 4;
    machineTest.serialID = "A10003";
    addGameMachineList(machineTest);

    machineTest.id = 5;
    machineTest.serialID = "A10004";
    addGameMachineList(machineTest);

    machineTest.id = 6;
    machineTest.machineType = "幼女戦記(?英数字の羅列?)";
    machineTest.serialID = "B20000";
    machineTest.name = "ようじょ";
    addGameMachineList(machineTest);

    machineTest.id = 7;
    machineTest.serialID = "B20001";
    addGameMachineList(machineTest);


    console.log("---- get list ----");

    deleteGameMachine(2);    // delete ...

    var obj = getGameMachineAt(2);
    console.log(obj);

    obj = getGameMachineAt(3);
    obj.setting(true);
    console.log(obj);

    obj = getGameMachineSerialID("A10001");
    obj.setting(true);
    console.log(obj);

    obj = getGameMachineAt(3);
    console.log(obj);

    var num = getGameMachineTypeNum(obj.machineType);
    console.log(obj.machineType + " num=" + num);

    var list = getGameMachineUnusedList();
    console.log("unused num = " + list.length);
    list.at(0).setting(true);

    obj = getGameMachineAt(0);
    console.log(obj);

    var list2 = getGameMachineList();
    console.log(list2);
}
*/


function initGameMachine() {   //init
    console.log("**** init gameMachineList ****");
    gameMachineList = new Array();

//    testFunc();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Game Object
/*

// 配置オブジェクト

オブジェクトの管理

*/







const ObjectType = {
  NULL: 0,
  MACHINE_BOX: 1, // 遊技機
  TEXT: 2, // テキスト(のみ)
  TEXT_VERTICAL: 3, // テキスト(のみ)
  LINE: 4, // line
  BOX: 5, // ボックス(のみ)
  SPACE_BOX: 6, // 壁空間
  TEXT_BOX: 7, // テキスト付ボックス
  NAME_TEXT: 8,
  NAME_TEXT_VERTICAL: 9,
  NAME_BOX: 10,
};

/*
var floorObjectInfo = {
  floor: "",
  floorID: 0,
  objects: null,
};
*/

// オブジェクト情報
var gameObjectInfo = {
  objType: ObjectType.NULL,
  obj: null,

  floor: "",
  floorID: 0,

  // 共通
  colorPalleteID: 0, //位置・色
  xpos: 0, //pic単位
  ypos: 1,
  width: 8,
  height: 8,

  //objType別の情報
  machineGroup: 0,
  machineType: "",
  serialID: "",
  allocationOFF: false,

  text: "", //テキスト
  x1: 0, //line用
  y1: 0,
  x2: 0,
  y2: 0,

  scaleX: 1.0,
  scaleY: 1.0,
};


/*
 階層毎に管理しようと思ったけど一括管理に変更
*/
//var floorObjectList = null;   //各フロア毎の管理
var gameObjectList;       //全フロア分一括で管理してます



/*
function getGameObjectList(_floorID){
  for(var ii = 0;ii < floorObjectList.length;ii++){
    if(floorObjectList.at(ii).floorID == _floorID){
      gameObjectList = floorObjectList.at(ii).objects;
    }
  }
  return(gameObjectList);
}
*/


function pushGameObjectList(_obj){
  var idx = -1;

  // 隙間を探す…
  for(var ii = 0;ii < gameObjectList.length;ii++){
    if(!gameObjectList.at(ii)){
      gameObjectList.splice(ii,1,_obj);
      idx = ii + 1;
      break;
    }
  }
  if(idx == -1){
    // なければpush
    idx = gameObjectList.push(_obj);  
  }
return(idx);
}


// 追加
function addGameObject(_obj, _type, _col) {
  var copyObj = Object.assign({}, gameObjectInfo);
  //getGameObjectList(mainStatus.floorID);

  copyObj.floor = mainStatus.floor;
  copyObj.floorID = mainStatus.floorID;

  copyObj.objType = _type;
  copyObj.colorPalleteID = _col;
  copyObj.xpos = _obj.left;
  copyObj.ypos = _obj.top;
  copyObj.width = _obj.width;
  copyObj.height = _obj.height;
  copyObj.obj = _obj;
  var idx = pushGameObjectList(copyObj);
  _obj.idx = idx;
  console.log("idx = " + idx);

  switch (
  _type //
  ) {
    case ObjectType.MACHINE_BOX:
      {
        copyObj.text = _obj.item(1).text;
        console.log(copyObj.text);
      }
      break;
    case ObjectType.BOX:
      {
      }
      break;
    case ObjectType.LINE:
      {
        copyObj.x1 = _obj.x1;
        copyObj.y1 = _obj.y1;
        copyObj.x2 = _obj.x2;
        copyObj.y2 = _obj.y2;
      }
      break;
    case ObjectType.SPACE_BOX:
      {
      }
      break;
    case ObjectType.TEXT:
      {
        copyObj.text = _obj.text;
        copyObj.scaleX = _obj.scaleX;
        copyObj.scaleY = _obj.scaleY;
        console.log(copyObj.text);
      }
      break;
    case ObjectType.TEXT_BOX:
      {
      }
      break;
    case ObjectType.TEXT_VERTICAL:
      {
        copyObj.text = _obj.text;
        copyObj.scaleX = _obj.scaleX;
        copyObj.scaleY = _obj.scaleY;
        console.log(copyObj.text);
      }
      break;
    case ObjectType.NAME_TEXT:
      {
        copyObj.text = _obj.text;
        copyObj.scaleX = _obj.scaleX;
        copyObj.scaleY = _obj.scaleY;
        console.log(copyObj.text);
      }
      break;
      case ObjectType.NAME_TEXT_VERTICAL:
        {
          copyObj.text = _obj.text;
          copyObj.scaleX = _obj.scaleX;
          copyObj.scaleY = _obj.scaleY;
          console.log(copyObj.text);
        }
        break;
      case ObjectType.NAME_BOX:
      {
      }
      break;
  }

  setGameObjectDisplayPriority();
}

// オブジェクト取得
function getGameObjectAt(idx){
  var obj2 = gameObjectList.at(idx - 1);
  return(obj2);  
}

// 遊技台シリアル取得
function getGameObjectMachineBox_SerialID(_idx){
  var obj2 = gameObjectList.at(_idx - 1);
  return(obj2.serialID);
}

// オブジェクト更新
function updateGameObjectAt(idx, _obj) {
  //getGameObjectList(mainStatus.floorID);

  var obj2 = gameObjectList.at(idx - 1);
  obj2.xpos = _obj.left;
  obj2.ypos = _obj.top;
  obj2.width = _obj.width;
  obj2.height = _obj.height;
  obj2.obj = _obj;
  _obj.idx = idx;
}


// オブジェクト更新
function updateGameObjectAt_Machine(_canvasID,idx, _obj,_machineGroup,_machineType,_serialID) {
  //getGameObjectList(mainStatus.floorID);
  var obj2 = gameObjectList.at(idx - 1);
  obj2.xpos = _obj.left;
  obj2.ypos = _obj.top;
  obj2.width = _obj.width;
  obj2.height = _obj.height;

  obj2.machineGroup = _machineGroup;
  obj2.machineType = _machineType;
  obj2.serialID = _serialID;

  obj2.obj = _obj;
  _obj.idx = idx;

  if(gameMode == GameMode.MODE_MACHINE_SET){
    setGameObjectMachineBoxColor(_canvasID,idx);
  }
}

// オブジェクト遊技台情報入れ替え
function swapGameObjectAt_Machine(_canvasID1,_idx1,_obj1,_canvasID2,_idx2,_obj2){
  console.log("swap");
  stopObjectAnimation(_obj1);   //とりあえずアニメ止める
  stopObjectAnimation(_obj2);

  var obj11 = gameObjectList.at(_idx1 - 1);
  var obj12 = gameObjectList.at(_idx2 - 1);

  var serialID = obj11.serialID;
  var machineGroup = obj11.machineGroup;
  var machineType = obj11.machineType;
  var colorPalleteID = obj11.colorPalleteID;
  updateGameObjectAt_Machine(_canvasID1,_obj1.idx,_obj1,obj12.machineGroup,obj12.machineType,obj12.serialID);
  updateGameObjectAt_Color(_obj1.idx,_obj1,obj12.colorPalleteID);
  updateGameObjectAt_Machine(_canvasID2,_obj2.idx,_obj2,machineGroup,machineType,serialID);
  updateGameObjectAt_Color(_obj2.idx,_obj2,colorPalleteID);

  // 見た目も入れ替える
  if(!obj11.serialID){
    setObjectAnimation(0,_obj1);
  }
  if(!obj12.serialID){
    setObjectAnimation(1,_obj2);
  }
  console.log(obj11);
  console.log(obj12);
}


// オブジェクト更新
function updateGameObjectAt_Color(idx, _obj,_col) {
  //getGameObjectList(mainStatus.floorID);
  var obj2 = gameObjectList.at(idx - 1);
  obj2.colorPalleteID = _col;

  let _rect = _obj._objects.at(0);
  _rect.set({ fill: getColorPallete(_col) });
}

// オブジェクト更新(作り直して再登録/TYPEまで書き換え)
function updateGameObjectAt_ReCreate2(idx, _obj,_type) {
  //getGameObjectList(mainStatus.floorID);
  console.log("ReCreate2 type = "+_type);

  var obj2 = gameObjectList.at(idx - 1);
  _obj.idx = idx;
  obj2.objType = _type;
  obj2.xpos = _obj.left;
  obj2.ypos = _obj.top;
  obj2.width = _obj.width;
  obj2.height = _obj.height;
  obj2.obj = _obj;
  _obj.idx = idx;
}


// オブジェクト更新(作り直して再登録)
function updateGameObjectAt_ReCreate(idx, _obj) {
  //getGameObjectList(mainStatus.floorID);

  var obj2 = gameObjectList.at(idx - 1);
  _obj.idx = idx;
  obj2.xpos = _obj.left;
  obj2.ypos = _obj.top;
  obj2.width = _obj.width;
  obj2.height = _obj.height;
  obj2.obj = _obj;
  _obj.idx = idx;
}

// 削除
function deleteGameObjectAt(idx) {
  //getGameObjectList(mainStatus.floorID);

  {
    delete gameObjectList[idx-1];
  }
}


// テキスト情報持ちか?
function checkGameObjectTypeTEXT(_idx) {
  //getGameObjectList(mainStatus.floorID);

  var ret = false;
  var obj2 = gameObjectList.at(_idx - 1);
  if (
    obj2.objType == ObjectType.TEXT ||
    obj2.objType == ObjectType.TEXT_VERTICAL ||
    obj2.objType == ObjectType.MACHINE_BOX
  ) {
    ret = true;
  }

  return ret;
}

// テキスト_VERTICALか?
function checkGameObjectTypeTEXT_VERTICAL(_idx) {
  //getGameObjectList(mainStatus.floorID);

  var ret = false;
  var obj2 = gameObjectList.at(_idx - 1);
  if (obj2.objType == ObjectType.TEXT_VERTICAL) {
    ret = true;
  }
  return ret;
}

// テキスト
function checkGameObjectTypeNAMETEXT(_idx) {
  //getGameObjectList(mainStatus.floorID);

  var ret = false;
  var obj2 = gameObjectList.at(_idx - 1);
  if (obj2.objType == ObjectType.NAME_TEXT) {
    ret = true;
  }
  return ret;
}

// テキスト_VERTICALか?
function checkGameObjectTypeNAMETEXT_VERTICAL(_idx) {
  //getGameObjectList(mainStatus.floorID);

  var ret = false;
  var obj2 = gameObjectList.at(_idx - 1);
  if (obj2.objType == ObjectType.NAME_TEXT_VERTICAL) {
    ret = true;
  }
  return ret;
}
//グローバル変数
var obj2_promise;
// MACHINEか?
function checkGameObjectTypeMACHINE_BOX_promise(_idx) {
  return new Promise((resolve, reject) => {
    obj2_promise = gameObjectList.at(_idx - 1);
    console.log(obj2_promise);
    if (obj2_promise.objType == ObjectType.MACHINE_BOX) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

// 旧式
function checkGameObjectTypeMACHINE_BOX(_idx) {
  //getGameObjectList(mainStatus.floorID);
  var ret = false;
  var obj2 = gameObjectList.at(_idx - 1);
  console.log(obj2);
  if (obj2.objType == ObjectType.MACHINE_BOX) {
    ret = true;
  }
  return ret;
}

// SPACEか?
function checkGameObjectTypeSPACE_BOX(_idx) {
  //getGameObjectList(mainStatus.floorID);

  var ret = false;
  var obj2 = gameObjectList.at(_idx - 1);
  if (obj2.objType == ObjectType.SPACE_BOX) {
    ret = true;
  }
  return ret;
}

// LINEか?
function checkGameObjectTypeLINE(_idx) {
  //getGameObjectList(mainStatus.floorID);

  var ret = false;
  var obj2 = gameObjectList.at(_idx - 1);
  if (obj2.objType == ObjectType.LINE) {
    ret = true;
  }
  return ret;
}




// BOXか?
function checkGameObjectTypeBOXES(_idx) {
  //getGameObjectList(mainStatus.floorID);

  var ret = false;
  var obj2 = gameObjectList.at(_idx - 1);
  if ((obj2.objType == ObjectType.MACHINE_BOX) || (obj2.objType == ObjectType.BOX) || (obj2.objType == ObjectType.SPACE_BOX) || (obj2.objType == ObjectType.NAME_BOX)) {
    ret = true;
  }
  return ret;
}

function setGameObjectMachineAllocationOFF(_idx,_sw){
  var _obj = gameObjectList.at(_idx - 1);
  _obj.allocationOFF = _sw;
}


//
var machine_object_status;
var location_btnA = document.getElementById('location_btnA');
var location_btnB = document.getElementById('location_btnB');
function setGameObjectMachineBoxColor(_cnvsID, _idx) {
  //getGameObjectList(mainStatus.floorID);

  var _obj = gameObjectList.at(_idx - 1);

  console.log("test");
  console.log(_obj);
  console.log(_obj.obj);


  if (_obj.allocationOFF) {    // ベニヤ板
    console.log("B");
    machine_object_status = "A";
    
    location_btnB.classList.remove("hidden_btn");
    location_btnA.classList.add("hidden_btn");
    _obj.obj.item(2).visible = false;
    _obj.obj.item(3).visible = true;

  }else if(!_obj.serialID){
    console.log("A");
    machine_object_status = "B";

    location_btnA.classList.remove("hidden_btn");
    location_btnB.classList.add("hidden_btn");
    // 何も設定されてない
    setObjectAnimation(_cnvsID, _obj.obj);
    _obj.obj.item(2).visible = false;
    _obj.obj.item(3).visible = false;

  } else {
    console.log("C");
    machine_object_status = "C";

    //設置済み
    _obj.obj.item(2).visible = true;
    _obj.obj.item(3).visible = false;
  }
}

// json
function saveGameObjectList() {
/*
  var jsonData = JSON.stringify(gameObjectList, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json";
  link.click();
  console.log("------------------------");
  console.log(jsonData);
  console.log("------------------------");
*/  
}


// json 読込 -> gameObjectListに復元
function loadGameObjectList() {
  //getGameObjectList(mainStatus.floorID);

  /* 予定
  [
    {
      "floor": "1F",
      "floorID": 1,
      "object": [
        {
          "objType": 1,
          "colorPalleteID":0
        },
        {
          "objType": 1,
          "colorPalleteID":0
        }
      ]
    },
    {
      "floor": "B1",
      "floorID": 2,
      "object": [
        {
          "objType": 1,
          "colorPalleteID":0
        },
        {
          "objType": 1,
          "colorPalleteID":0
        }
      ]
    }
  ]
  */



  var jsonData = JSON.stringify(testBaseData);
  //(jsonData);
  var mapData = JSON.parse(jsonData);
  //console.log(mapData);


  var ii = 0;
  for (ii = 0; ii < mapData.object.length; ii++) {
    var obj = mapData.object.at(ii);

    var idx = pushGameObjectList(obj);
    obj.idx = idx;
    obj.obj = null;
  }


  //  console.log(floorObjectList);
}

// gameObjectListからフロアのfabricオブジェクト生成
function createFabricObject(cnvsID, cnvs, _floorID) {
  //getGameObjectList(mainStatus.floorID);

  var ii = 0;
  for (ii = 0; ii < gameObjectList.length; ii++) {
    var obj = gameObjectList.at(ii);

    if (obj.floorID != _floorID) {  //対象フロアのオブジェクトのみ
      continue;
    }

    switch (obj.objType) {
      case ObjectType.MACHINE_BOX:
        {
          var x = obj.xpos;
          var y = obj.ypos;
          var w = obj.width;
          var h = obj.height;
          var col = obj.colorPalleteID;
          var text = obj.text;
          var _rect = addMachineBox(
            x,
            y,
            w,
            h,
            getColorPallete(col),
            "#000000",
            text
          );
          cnvs.add(_rect);

          if (gameMode == GameMode.MODE_MACHINE_SET) {
            //          _rect.selectable = false;
            _rect.hasControls = false;
            _rect.editable = false;
            //          _rect.evented = false;
            _rect.lockMovementX = true;
            _rect.lockMovementY = true;
            _rect.lockUniScaling = false;
          }

          updateGameObjectAt(obj.idx, _rect);

          if (gameMode == GameMode.MODE_MACHINE_SET) {
//            if(!obj.serialID){
              setGameObjectMachineBoxColor(cnvsID, obj.idx);
//            }
          }
        }
        break;
      case ObjectType.TEXT:
        {
          var _text = addIText(obj.text, obj.xpos, obj.ypos, 20);
          _text.set({
            scaleX: obj.scaleX,
            scaleY: obj.scaleY
          });

          if (gameMode == GameMode.MODE_MACHINE_SET) {
            _text.selectable = false;
            _text.hasControls = false;
            _text.editable = false;
            _text.evented = false;
            _text.lockMovementX = true;
            _text.lockMovementY = true;
            _text.lockUniScaling = false;
          }

          cnvs.add(_text);
          updateGameObjectAt(obj.idx, _text);
        }
        break;
      case ObjectType.TEXT_VERTICAL:
        {
          console.log(obj);
          var _text = addITextGroup(obj.text, obj.xpos, obj.ypos, 20);
          _text.set({
            scaleX: obj.scaleX,
            scaleY: obj.scaleY
          });

          if (gameMode == GameMode.MODE_MACHINE_SET) {
            _text.selectable = false;
            _text.hasControls = false;
            _text.editable = false;
            _text.evented = false;
            _text.lockMovementX = true;
            _text.lockMovementY = true;
            _text.lockUniScaling = false;
          }
          cnvs.add(_text);
          updateGameObjectAt(obj.idx, _text);
        }
        break;
      case ObjectType.LINE:
        {
          let _lineArray = addLine(obj.x1, obj.y1, obj.x2, obj.y2);
          if (gameMode == GameMode.MODE_MACHINE_SET) {
            _lineArray[0].selectable = false;
            _lineArray[0].hasControls = false;
            _lineArray[0].editable = false;
            _lineArray[0].evented = false;
            _lineArray[0].lockMovementX = true;
            _lineArray[0].lockMovementY = true;
            _lineArray[0].lockUniScaling = false;
            cnvs.add(_lineArray[0]);
          }else {
            cnvs.add(_lineArray[0]);
            cnvs.add(_lineArray[1]);
            cnvs.add(_lineArray[2]);
          }

          updateGameObjectAt(obj.idx, _lineArray[0]);
        }
        break;
      case ObjectType.BOX:
        {
          var _rect = addBox(
            obj.xpos,
            obj.ypos,
            obj.width,
            obj.height,
            getDefaultColor(),
            "#000000"
          );
          if (gameMode == GameMode.MODE_MACHINE_SET) {
            _rect.selectable = false;
            _rect.hasControls = false;
            _rect.editable = false;
            _rect.evented = false;
            _rect.lockMovementX = true;
            _rect.lockMovementY = true;
            _rect.lockUniScaling = false;
          }
          cnvs.add(_rect);
          updateGameObjectAt(obj.idx, _rect);
        }
        break;
      case ObjectType.SPACE_BOX:
        {
          var _rect = addSpaceBox(
            obj.xpos,
            obj.ypos,
            obj.width,
            obj.height,
            getDefaultColor(),
            "#000000"
          );
          if (gameMode == GameMode.MODE_MACHINE_SET) {
            _rect.selectable = false;
            _rect.hasControls = false;
            _rect.editable = false;
            _rect.evented = false;
            _rect.lockMovementX = true;
            _rect.lockMovementY = true;
            _rect.lockUniScaling = false;
          }
          cnvs.add(_rect);
          updateGameObjectAt(obj.idx, _rect);
        }
        break;
      case ObjectType.TEXT_BOX:
        {
        }
        break;
      case ObjectType.NAME_TEXT:
        {
          var _text = addNameIText(obj.text, obj.xpos, obj.ypos, 20);
          _text.set({
            scaleX: obj.scaleX,
            scaleY: obj.scaleY
          });

          if (gameMode == GameMode.MODE_MACHINE_SET) {
            _text.selectable = false;
            _text.hasControls = false;
            _text.editable = false;
            _text.evented = false;
            _text.lockMovementX = true;
            _text.lockMovementY = true;
            _text.lockUniScaling = false;
          }

          cnvs.add(_text);
          updateGameObjectAt(obj.idx, _text);
        }
        break;
      case ObjectType.NAME_TEXT_VERTICAL:
        {
          console.log(obj);
          var _text = addITextGroup(obj.text, obj.xpos, obj.ypos, 20);
          _text.set({
            scaleX: obj.scaleX,
            scaleY: obj.scaleY
          });

          if (gameMode == GameMode.MODE_MACHINE_SET) {
            _text.selectable = false;
            _text.hasControls = false;
            _text.editable = false;
            _text.evented = false;
            _text.lockMovementX = true;
            _text.lockMovementY = true;
            _text.lockUniScaling = false;
          }
          cnvs.add(_text);
          updateGameObjectAt(obj.idx, _text);
        }
        break;
      case ObjectType.NAME_BOX:
        {
          var _rect = addNameBox(
            obj.xpos,
            obj.ypos,
            obj.width,
            obj.height,
            getDefaultColor(),
            "#000000"
          );
          if (gameMode == GameMode.MODE_MACHINE_SET) {
            _rect.selectable = false;
            _rect.hasControls = false;
            _rect.editable = false;
            _rect.evented = false;
            _rect.lockMovementX = true;
            _rect.lockMovementY = true;
            _rect.lockUniScaling = false;
          }
          cnvs.add(_rect);
          updateGameObjectAt(obj.idx, _rect);
        }
        break;
    }
  }
}


// 指定フロア分解除(フロア移動等) fabricのみ削除
function removeFabricObject(cnvsID, cnvs, _floorID) {
  //  getGameObjectList(mainStatus.floorID);

  console.log("removeFabricObject...");

  for (var ii = 0; ii < gameObjectList.length; ii++) {
    var _base_obj = gameObjectList.at(ii);

    if (_base_obj.floorID != _floorID) {  //対象フロアのオブジェクトのみ
      continue;
    }

    var _obj = _base_obj.obj;
    //    console.log(_obj);
    if (!_obj) {
      continue;
    }

    if (_obj.NoDelete) {    //削除禁止オブジェクト
      return;
    }
    if (_obj.parentObj) {   //親オブジェがいるなら…
      _obj = _obj.parentObj;
    }

    if (_obj) {
      if (_obj._objects) {

        //
        stopObjectAnimation(_obj);

        //
        for (var ii2 = 0; ii2 < _obj._objects.length; ii2++) {
          var _obj2 = _obj._objects[ii2];
          cnvs.remove(_obj2);
          _obj2 = null;
        }
        cnvs.remove(_obj);
        _obj.obj = null;
      } else {
        if (_obj.type == "line") {
          let c1 = _obj.circle1;
          let c2 = _obj.circle2;
          cnvs.remove(c1);
          cnvs.remove(c2);
          c1 = null;
          c2 = null;
        }
        //
        console.log("" + _obj);
        cnvs.remove(_obj);
      }
    }
  }
  canvas.requestRenderAll();
}



// floorデータ読み込んだら…
function setFloorObjectList() {
  /*
    var mapData = getFloorList();
    for(var ii = 0;ii < mapData.length;ii++){
      var _obj = mapData.at(ii);
      var copyObj = Object.assign({}, floorObjectInfo);
      copyObj.floor = _obj.floor;
      copyObj.floorID = _obj.floorID;
      copyObj.objects = new Array();
      floorObjectList.push(copyObj);
    }
    gameObjectList = floorObjectList.at(0).objects;
  */
}

function initGameObject() {
  //init
  console.log("**** init gameObjectList ****");
  //  floorObjectList = new Array();
  gameObjectList = new Array();
}

//
function setGameObjectDisplayPriority() {
  //  getGameObjectList(mainStatus.floorID);

  for (var ii = 0; ii < gameObjectList.length; ii++) {
    var _obj = gameObjectList.at(ii);
    if(_obj){
    switch (_obj.objType) {
      case ObjectType.TEXT: //テキストを最前面に移動させる
      case ObjectType.NAME_TEXT:
      case ObjectType.NAME_TEXT_VERTICAL:
      case ObjectType.TEXT_VERTICAL:
      case ObjectType.TEXT_BOX:
        setDisplayPriority(_obj.obj);
        break;
    }
    }
  }

  canvas.requestRenderAll();
}

function getGameObjectColorPalleteID(_idx){
  var _obj = gameObjectList.at(_idx - 1);
  return(_obj.colorPalleteID);
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
////Machine set script


// サイドボタン作成
function adjustMachineLayout() {
    // ボタンの生成を実行
    const topSection = document.getElementById("top-section");
    createMachineListButtons(getGameMachineUnusedList(1), topSection);

    const bottomSection = document.getElementById("bottom-section");
    createMachineListButtons(getGameMachineUnusedList(2), bottomSection);
}

function createMachineListButtons(items, container) {
    items.forEach((item) => {
        createMachineListButton(item, container);
    });
}

// サイドボタン
function createMachineListButton_sub(item) {
    const sidebarWidth = sidebar.offsetWidth; // サイドバーの横幅
    const contentWidth = sidebarWidth - 30; // イメージの横幅
    const contentHeight = 10; // イメージの縦幅

    const button = document.createElement("button");
    button.classList.add(
        "mb-1",
        "btn-light",
        "align-items-center",
        "d-flex",
        "flex-column",
        "justify-content-center"
    );
    button.textContent = item.machineType + "\n" + item.serialID;
    //クリック
    button.addEventListener("click", function () {
        setMachineButton(item, button);
   });
   //ダブルクリック
    button.addEventListener("dblclick", function () {
        infoMachineDialog(item);
    });
    button.style.width = `${contentWidth}px`;
    button.style.height = `${contentHeight}vh`;
    return (button);
}

// サイドボタン
function createMachineListButton(item, container) {

    var button = createMachineListButton_sub(item);
    container.appendChild(button);
}

// サイドボタン削除
function removeMachineListButton(remove_btn, container) {
    //    console.log(container.childNodes);
    container.childNodes.forEach((btn) => {
        if (btn == remove_btn) {
            container.removeChild(remove_btn);
            return;
        }
    });
}


// 遊技台設定
function setMachineButton(_item, _btn) {
    console.log("_item: ");
    console.log(_item);
    //Info modal
    console.log(canvas.getActiveObject());
    console.log(canvas2.getActiveObject());

    var _cnvs = null;
    if(mainStatus.targetCanvasID == 0){
        _cnvs = canvas;
    }else {
        _cnvs = canvas2;
    }

    
    var _obj = _cnvs.getActiveObject();
    if (_obj) {
        var _idx = _obj.idx;
        if (!_idx) {        //一括

            if(_obj._objects){
                var chkF = true;
                for(var ii = 0;ii < _obj._objects.length;ii++){     //余計な物が混じってないか
                    var _obj2 = _obj._objects[ii];
                    if(_obj2.idx){
                        if(!checkGameObjectTypeMACHINE_BOX(_obj2.idx)){
                            chkF = false;
                            break;
                        }                        
                    }else {
                        chkF = false;
                        break;
                    }
                }

                if(chkF){
/*
//                    let array = [1, 4, 9, 16];
                    let array = new Array();
                    array.push({test:1});
                    array.push({test:4});
                    array.push({test:9});
                    array.push({test:16});
                    let i=0;
                    let j=3;
                    [array[i], array[j]] = [array[j], array[i]];
                    console.log(array); // => Array [16, 4, 9, 1]
*/
                    var objList = new Array();
                    for(var ii = 0;ii < _obj._objects.length;ii++){
                        var tmp = _obj.item(ii);
                        objList.push(tmp);
                    }

                    // 上優先 > 左優先
                    console.log("list並び替え");
                    for(var ii = 0;ii < (objList.length-1);ii++){
                        for(var jj = (ii+1);jj < objList.length;jj++){
                            if(objList[ii].top > objList[jj].top){
                                console.log("swap1");
                                [objList[ii],objList[jj]] = [objList[jj],objList[ii]];

                            }else if(objList[ii].top == objList[jj].top){
                                if(objList[ii].left > objList[jj].left){
                                    console.log("swap2:"+ii+","+jj);
                                    [objList[ii],objList[jj]] = [objList[jj],objList[ii]];
                                }
                            }
                        }
                    }
                    var machineList = getGameMachineUnusedListAt(_item.status,_item.machineType,_item.serialID);

                    if (_item.status == 1) {
                        insertS = document.getElementById("top-section");
                    } else {
                        insertS = document.getElementById("bottom-section");
                    }
            
                    var btnList = new Array();
                    var chkF = false;
                    insertS.childNodes.forEach((btn2) => {
                        if (btn2 == _btn) {
                            chkF = true;
                        }
                        if(chkF){
                            btnList.push(btn2);
                        }
                    });
                    modalTargetObject = { objList: objList ,objNum: objList.length ,machineList:machineList,machineNum:machineList.length ,btnList:btnList,btnNum:btnList.length};
                    setMultiMachineDialog();
                }
            }

        } else {            //単体
            if (checkGameObjectTypeMACHINE_BOX(_idx)) {
/*
                var _machine_obj = getGameObjectAt(_idx);
                if (_machine_obj.serialID) {  //すでに配置済みなら返却する
                    console.log("now = " + _machine_obj.serialID);
                    var _now_machine = getGameMachineSerialID(_machine_obj.serialID);
                    _now_machine.setF = false;
                    var insertS = null;
                    if (_now_machine.status == 1) {
                        insertS = document.getElementById("top-section");
                    } else {
                        insertS = document.getElementById("bottom-section");
                    }

                    //1個前の未設置遊技台を探す
                    var _list = getGameMachineList();
                    var ii = 0;
                    for (ii = (_list.length - 1); ii >= 0; ii--) {
                        if (_list.at(ii).serialID == _now_machine.serialID) {
                            break;
                        }
                    }
                    ii--;
                    if (ii >= 0) {
                        for (; ii >= 0; ii--) {
                            if (!_list.at(ii).setF) {
                                break;
                            }
                        }
                    }

                    if (ii < 0) {     //先頭

                        var chkID = _list.at(0).machineType + "\n" + _list.at(0).serialID;
                        console.log(chkID);
                        insertS.childNodes.forEach((_btn2) => {
                            console.log(_btn2.textContent);
                            if (_btn2.textContent == chkID) {
                                console.log("hit!!!");
                                var button = createMachineListButton_sub(_now_machine);
                                _btn2.before(button);
                            }
                        });

                    } else {
                        var chkID = _list.at(ii).machineType + "\n" + _list.at(ii).serialID;
                        console.log(chkID);
                        insertS.childNodes.forEach((_btn2) => {
                            console.log(_btn2.textContent);
                            if (_btn2.textContent == chkID) {
                                console.log("hit!!!");
                                var button = createMachineListButton_sub(_now_machine);
                                _btn2.after(button);
                            }
                        });
                    }

                }

                stopObjectAnimation(_obj);
                updateGameObjectAt_Machine(_idx, _obj, _item.machineGroup, _item.machineType, _item.serialID);
                _item.setF = true;      //設置

                //リストから解除
                const topSection = document.getElementById("top-section");
                removeMachineListButton(_btn, topSection);
*/
                setMachineData(_obj,_idx,_item,_btn);
                modalTargetObject = { idx: _idx, obj: _obj };
                setColorDialog();
            }
        }
    }
}


// 遊技台解除してリスト戻し
function removeMachineData(_idx){
    var _machine_obj = getGameObjectAt(_idx);

    console.log("now = " + _machine_obj.serialID);
    var _now_machine = getGameMachineSerialID(_machine_obj.serialID);
    _now_machine.setF = false;
    var insertS = null;
    if (_now_machine.status == 1) { //新台
        insertS = document.getElementById("top-section");
    } else {        //在庫
        insertS = document.getElementById("bottom-section");
    }
//    console.log("remove status "+_now_machine.status);
//    console.log(insertS);

    //1個前の未設置遊技台を探す
    var _list = getGameMachineListStat(_now_machine.status);
    var ii = 0;
    for (ii = (_list.length - 1); ii >= 0; ii--) {
        if (_list.at(ii).serialID == _now_machine.serialID) {
            console.log("machine hit "+ii);
            break;
        }
    }
//    console.log("chk = "+ii);
    ii--;
    if (ii >= 0) {
        for (; ii >= 0; ii--) {
            if (!_list.at(ii).setF) {       //未設定の物を探す
                break;
            }
        }
    }

    console.log("num = "+_list.length+","+ii);
    if (ii < 0) {     //先頭
        console.log("top");
        ii = 1;
        for (; ii < (_list.length);ii++) {
            console.log(_list.at(ii).setF);
            if (!_list.at(ii).setF) {       //未設定の物を探す
                break;
            }
        }

        var chkID = _list.at(ii).machineType + "\n" + _list.at(ii).serialID;
        console.log(chkID);
        var chkF = false;
        insertS.childNodes.forEach((_btn2) => {
//                console.log(_btn2.textContent);
            if (_btn2.textContent == chkID) {
                if(!chkF){
                    chkF = true;
                    console.log("hit!!!");
                    var button = createMachineListButton_sub(_now_machine);
                    _btn2.before(button);
                }
            }
        });
    } else {
        console.log("top2");
        var chkID = _list.at(ii).machineType + "\n" + _list.at(ii).serialID;
        console.log(chkID);
        insertS.childNodes.forEach((_btn2) => {
//            console.log(_btn2.textContent);
            if (_btn2.textContent == chkID) {
                console.log("hit!!!");
                var button = createMachineListButton_sub(_now_machine);
                _btn2.after(button);
            }
        });
    }
}

// 遊技台割り当て
function setMachineData(_obj,_idx,_item,_btn){
    var _machine_obj = getGameObjectAt(_idx);
    if (_machine_obj.serialID) {  //すでに配置済みなら返却する
        console.log("delete _machine_obj.serialID="+_machine_obj.serialID);
        removeMachineData(_idx);
    }

    var _cnvs = null;
    if(mainStatus.targetCanvasID == 0){
        _cnvs = canvas;
    }else {
        _cnvs = canvas2;
    }

    stopObjectAnimation(_obj);
    updateGameObjectAt_Machine(mainStatus.targetCanvasID,_idx, _obj, _item.machineGroup, _item.machineType, _item.serialID);
    updateGameObjectAt_Color(_obj.idx,_obj,getGameObjectColorPalleteID(_obj.idx));
    _item.setF = true;      //設置

    //リストから解除
    var insertS = null;
    if (_item.status == 1) { //新台
        insertS = document.getElementById("top-section");
    } else {        //在庫
        insertS = document.getElementById("bottom-section");
    }
    console.log("_item_status="+_item.status);
    console.log(insertS);
//    const topSection = document.getElementById("top-section");
    removeMachineListButton(_btn, insertS);
    _cnvs.requestRenderAll();
}


//画面分割
function splitButton() {
    let floor_select = document.getElementById("floor_select");
    const canvasContainer = document.getElementById("canvas-container");
    const canvas2Container = document.getElementById("canvas2-container");
    const canvasHeader = document.getElementById("canvas-header");
    changeIcon();
    
    if (!mainStatus.isSplit) {
        // 分割表示
        canvasHeader.style.display = "block";
        const canvasHeaderHeight = canvasHeader.offsetHeight;
        canvas2Container.style.height = `calc(50% - ${canvasHeaderHeight / 2}px)`;
        canvasContainer.style.height = `calc(50% - ${canvasHeaderHeight / 2}px)`;
        canvas2Container.style.display = "block";
        
        mainStatus.isSplit = true;
        resetCanvasActiveObject();
        
        removeFabricObject(1, canvas2, 2);    //前回分
        createFabricObject(1, canvas2, 2);
        floor_select.disabled = false;
        
    } else {
        // 元の表示に戻す
        canvasContainer.style.height = `100%`;
        canvasHeader.style.display = "none";
        canvas2Container.style.display = "none";
        
        mainStatus.isSplit = false;
        resetCanvasActiveObject();
        floor_select.disabled = true;
    }
}

//Change icons　function
function changeIcon(){
    let splitbtn = document.getElementById('um_setting_button03');
    let restore_btn = document.getElementById('splitButton');
    splitbtn.classList.toggle("hidden_btn");
    restore_btn.classList.toggle("hidden_btn");
    
}


// 色変更
function setColorMachineObject() {
    var _obj = canvas.getActiveObject();

    if (_obj) {
        if (_obj.idx) {
            if (checkGameObjectTypeMACHINE_BOX(_obj.idx)) {
                modalTargetObject = { idx: _obj.idx, obj: _obj };
                setColorDialog();
            }
        }
    }
}


function setFloorSelector(){
    var list = getFloorList();
    const selector = document.getElementById("floor_select");
    for(var ii = 0;ii < list.length;ii++){
      var option = document.createElement("option");
      option.text = list.at(ii).floor;
      option.value = list.at(ii).floorID;
      if(ii == 1){  //フロア
        option.selected = true;
      }
      selector.appendChild(option);
    }
    selector.addEventListener('change', floorSelectorChange);
}

function floorSelectorChange(){
    const selector = document.getElementById("floor_select");
    console.log("floorID:"+selector.value);
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Collor pallete
/*

// カラーパレットテーブル

*/


var colorPalleteTable2 = [
    "#",    //    塗りつぶし無し(白色)    R:255    G:255    B:255
    "#",    //    塗りつぶし無しの点滅色(暗側)    R:192    G:192    B:192
    "#",    //    灰色    R:192    G:192    B:192
    "#",    //    灰色の点滅色(暗側)    R:86    G:86    B:86
    "#",    //    赤色    R:255    G:0    B:0
    "#",    //    赤色の点滅色(暗側)    R:181    G:0    B:0
    "#",    //    青色    R:0    G:112    B:192
    "#",    //    青色の点滅色(暗側)    R:0    G:82    B:142
    "#",    //    緑色    R:0    G:176    B:80
    "#",    //    緑色の点滅色(暗側)    R:0    G:96    B:44
    "#",    //    黄色    R:255    G:255    B:0
    "#",    //    黄色の点滅色(暗側)    R:119    G:119    B:0
    "#",    //    オレンジ色    R:255    G:192    B:0
    "#",    //    オレンジ色の点滅色(暗側)    R:168    G:126    B:0
    "#",    //    紫色    R:112    G:48    B:160
    "#",    //    紫色の点滅色(暗側)    R:65    G:28    B:91
    "#",    //    水色    R:0    G:176    B:240
    "#",    //    水色の点滅色(暗側)    R:0    G:79    B:108
    "#",    //    茶色    R:149    G:86    B:41
    "#",    //    茶色の点滅色(暗側)    R:82    G:48    B:22
];



// 島図で保持するカラーパレットについて.pdf
var colorPalleteTable = [
    "#FFFFFF",  //白(0=デフォルト)
    "#BFBFBF",  //灰色
    "#FF0000",  //赤
    "#0070C0",  //青
    "#00B050",  //緑
    "#FFFF00",  //黄色
    "#FFC000",  //オレンジ
    "#7030A0",  //紫
    "#00B0F0",  //水
    "#955629",  //茶
];
var colorPalleteUndefined = "#000000";

function getColorPallete(idx){
    if((idx >= colorPalleteTable.length) || (idx < 0)){
        return(colorPalleteUndefined);        
    }

    return(colorPalleteTable[idx]);
}

// ???
function getDefaultColor(){
    return(colorPalleteTable[0]);
}

/*
{       //test
    console.log("---- color test ----");
    var col = getColorPallete(3);
    console.log("color = "+col);
    col = getColorPallete(30);
    console.log("color = "+col);
    col = getColorPallete(-10);
    console.log("color = "+col);
}
*/









  },

};
</script>