<template>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- ダイアログのコンテンツがここに挿入されます -->
        </div>
      </div>
    </div>

    <!-- 設定画面用 -->
    <div
      class="modal fade"
      id="staticSettingMenu"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticSettingMenuLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered setting_menu_main">
        <div class="modal-content setting_menu_content">
          <!-- ダイアログのコンテンツがここに挿入されます -->
        </div>
      </div>
    </div>

    <!-- メッセージダイアログ用 -->
    <div
      class="modal fade"
      id="staticMessageDialog"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticMessageDialogLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- ダイアログのコンテンツがここに挿入されます -->
        </div>
      </div>
    </div>

    <div class="header_menu" id="header_menu">
      <!-- 上部メニュー -->
      <Toolbar_button />
    </div>

    <div class="container-fluid h-100">
      <div class="row h-100">
        <Sidebar />

        <div class="col-md-10 main" id="main" style="position: relative">
          <!-- メインコンテンツのコンテンツ -->
          <div class="canvas-container" id="canvas-container">
            <canvas id="canvas_view"></canvas>
          </div>
          <div
            id="canvas-header"
            style="display: none; background-color: #a6a7a9"
          >
 
          <div>
            <button
            type="button"
            id="um_setting_button05"
            class="material-icons material-icons md-48"
            onclick="openMessageDialog('title11','message22\na\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk')"
          >
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
      </div>

      <button
        id="zoom_in_button"
        type="button"
        class="material-icons md-48"
        onclick="zoomIN()"
      >
        zoom_in
      </button>
      <button
        id="zoom_out_button"
        type="button"
        class="material-icons md-48"
        onclick="zoomOUT()"
      >
        zoom_out
      </button>
    </div>
    <!---->
    <!---->
    <!---->
    <!---->
    <!---->
    <!---->
    <!---->
    <!---->
    <!---->
    <div class="main">
        <div class="parent">
            
            <Stencil_area 
                @add-rectangle-clicked="handleAddRectangle" 
                @add-line-clicked="handleAddLine" 
                @add-space-clicked="handleAddSpace" 
                @add-text-clicked="handleAddText" 
                @add-machine-clicked="handleAddMachine" 
            />
            <SegaMap ref="segamap" />
        </div>
    </div>
    
    
</template>

<script>
import SegaMap from '../segaComponents/segaMap.vue';
import Toolbar_button from '../segaComponents/toolbar_button.vue';
import Stencil_area from '../segaComponents/stencil_area.vue';
import Sidebar from '../segaComponents/sidebar.vue';


export default {
    components: {
        Toolbar_button,
        SegaMap,
        Stencil_area,
        Sidebar,
    },
    methods: {
    handleAddRectangle() {
      this.$refs.segamap.AddRectangle();
    },
    handleAddLine() {
      this.$refs.segamap.AddLine();
    },
    handleAddSpace() {
      this.$refs.segamap.AddSpace();
    },
    handleAddText() {
      this.$refs.segamap.AddText();
    },
    handleAddMachine() {
      this.$refs.segamap.AddMachine();
    },
  },



  mounted() {


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
let floorInfo = {
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
//////////////////

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
    const GameMode = {
  MODE_MAP_EDIT: 0,     // 島図
  MODE_MACHINE_SET: 1,  // 遊技機設置
};
const gameMode = GameMode.MODE_MAP_EDIT;
// 1グリッドのpicサイズ

/////////////////////////////////////////////////



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
            }else {

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
              if(_obj2.parentObj){   //ラインのcircle
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
              for(var ii = 0;ii < _obj._objects.length;ii++){

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
                }else {   //それ以外はそのまま
                }
              }
              cnvs.requestRenderAll();
            }
          }else {
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
                strokeWidth:1
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
  },
}
</script>