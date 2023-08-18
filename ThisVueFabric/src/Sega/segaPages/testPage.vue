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
        <CanvasA 
          :map_width="map_width"
          :map_height="map_height"
          :grid="grid"
          :GameMode="GameMode"
          :gameMode="gameMode"
          :canvas="canvas"
          :canvas2="canvas2"
          :canvasScale="canvasScale"
          :ctx="ctx"
          :ctx2="ctx2"
          :animationTimeID="animationTimeID"
          :animationTimeCnt="animationTimeCnt"
          :floorList="floorList"
          :floorInfo="floorInfo"
          :gameMachineList="gameMachineList"
          :newMachineApiData="newMachineApiData"
          :machineGroup="machineGroup"
          :gameMachineInfo="gameMachineInfo"
          :GameMachineGroup="GameMachineGroup"
          :stockMachineApiData="stockMachineApiData"
          :testBaseData="testBaseData"
          :gameObjectList="gameObjectList"
          :mainStatus="mainStatus"
          :ObjectType="ObjectType"
          :colorPalleteTable="colorPalleteTable"
          :machine_object_status="machine_object_status"
          :images="images"
          />
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

import CanvasA from '../segaComponents/canvasA.vue'

import rect_img from '../images/rect.png'
import line_img from '../images/line.png'
import space_img from '../images/space.png'
import machine_img from '../images/machine.png'
import text_img from '../images/text.png'
import machines_img from '../images/machines.png'


export default {

    components: {
      Toolbar_button,
      SegaMap,
      Stencil_area,
      Sidebar,
      CanvasA,
    },

    data() {
    return {
      map_width: 800,
      map_height: 600,
      grid: 8,
      GameMode: {
        MODE_MAP_EDIT: 0,
        MODE_MACHINE_SET: 1
      },
      gameMode: null,
      canvas: null,
      canvas2: null,
      canvasScale: 1,
      ctx: null,
      ctx2: null,
      animationTimeID: 0,
      animationTimeCnt: 0,
      floorList: null,
      floorInfo: {
        floor: "",
        floorID: 1,
      },
      gameMachineList: null,
      //DummyData
      machineGroup: 1,
      newMachineApiData: [
        {
          id: 1,
          machineGroup: this.machineGroup,
          machineType: "パチスロ蒼天の拳４　111111111",
          serialID: "A10001",
          name: "そうてん",
        },
        {
          id: 2,
          machineGroup: this.machineGroup,
          machineType: "パチスロ蒼天の拳４　111111112",
          serialID: "A10002",
          name: "そうてん",
        },
        {
          id: 3,
          machineGroup: this.machineGroup,
          machineType: "パチスロ蒼天の拳４　111111113",
          serialID: "A10003",
          name: "そうてん",
        },
        {
          id: 4,
          machineGroup: this.machineGroup,
          machineType: "パチスロ蒼天の拳４　111111114",
          serialID: "A10004",
          name: "そうてん",
        },
        {
          id: 5,
          machineGroup: this.machineGroup,
          machineType: "パチスロ蒼天の拳４　111111115",
          serialID: "A10005",
          name: "そうてん",
        },
        {
          id: 6,
          machineGroup: this.machineGroup,
          machineType: "パチスロ蒼天の拳４　111111116",
          serialID: "A10006",
          name: "そうてん",
        },
        {
          id: 7,
          machineGroup: this.machineGroup,
          machineType: "パチスロ蒼天の拳４　111111117",
          serialID: "A10007",
          name: "そうてん",
        },
        {
          id: 8,
          machineGroup: this.machineGroup,
          machineType: "パチスロ蒼天の拳４　111111118",
          serialID: "A10008",
          name: "そうてん",
        },
      ],
      //遊技台情報
      gameMachineInfo: {
        idx: -1,
        id: 0,
        machineGroup: this.GameMachineGroup,
        machineType: "0",       // 機種
        serialID: "0",          // シリアル
        name: "name",
        setF: false,            // 設置済み
        status: 1,              // new=1 / stock=2
        setting: function (_flag) {    //設置・解除
          this.setF = _flag;
        }
      },
      GameMachineGroup: {
          NULL: 0,
          PACHINKO: 1,
          SLOT: 2,
          BLANCK: 3,
      },
      stockMachineApiData: [
        {
          id: 1,
          machineGroup: this.machineGroup,
          machineType: "P蒼天の拳天刻　211111111",
          serialID: "B10001",
          name: "Pそう",
        },
        {
          id: 2,
          machineGroup: this.machineGroup,
          machineType: "P蒼天の拳天刻　211111112",
          serialID: "B10002",
          name: "Pそう",
        },
        {
          id: 3,
          machineGroup: this.machineGroup,
          machineType: "P蒼天の拳天刻　211111113",
          serialID: "B10003",
          name: "Pそう",
        },
        {
          id: 4,
          machineGroup: this.machineGroup,
          machineType: "P蒼天の拳天刻　211111114",
          serialID: "B10004",
          name: "Pそう",
        },
        {
          id: 5,
          machineGroup: this.machineGroup,
          machineType: "P蒼天の拳天刻　211111115",
          serialID: "B10005",
          name: "Pそう",
        },
        {
          id: 6,
          machineGroup: this.machineGroup,
          machineType: "P蒼天の拳天刻rid　211111116",
          serialID: "B10006",
          name: "Pそう",
        },
        {
          id: 7,
          machineGroup: this.machineGroup,
          machineType: "P蒼天の拳天刻　211111117",
          serialID: "B10007",
          name: "Pそう",
        },
        {
          id: 8,
          machineGroup: this.machineGroup,
          machineType: "P蒼天の拳天刻　211111118",
          serialID: "B10008",
          name: "Pそう",
        },
      ],
      testBaseData: {
        object: [
          {
            floor: "",
            floorID: 2,

            objType: 1,
            colorPalleteID: 0,
            xpos: 10 * this.grid,
            ypos: 10 * this.grid,
            width: 8 * this.grid,
            height: 8 * this.grid,
            text: "読込データ",
          },
          {
            floor: "",
            floorID: 2,

            objType: 1,
            colorPalleteID: 0,
            xpos: 18 * this.grid,
            ypos: 10 * this.grid,
            width: 8 * this.grid,
            height: 8 * this.grid,
            text: "読込データ",
          },

          {
            floor: "",
            floorID: 1,

            objType: 1,
            colorPalleteID: 0,
            xpos: 34 * this.grid,
            ypos: 10 * this.grid,
            width: 8 * this.grid,
            height: 8 * this.grid,
            text: "読込データ",
          },

          {
            floor: "",
            floorID: 1,

            objType: 1,
            colorPalleteID: 0,
            xpos: 16 * this.grid,
            ypos: 30 * this.grid,
            width: 8 * this.grid,
            height: 8 * this.grid,
            text: "読込データ",
          },
          {
            floor: "",
            floorID: 1,

            objType: 1,
            colorPalleteID: 0,
            xpos: 24 * this.grid,
            ypos: 30 * this.grid,
            width: 8 * this.grid,
            height: 8 * this.grid,
            text: "読込データ",
          },

          {
            floor: "",
            floorID: 1,

            objType: 1,
            colorPalleteID: 0,
            xpos: 26 * this.grid,
            ypos: 10 * this.grid,
            width: 8 * this.grid,
            height: 8 * this.grid,
            text: "読込データ",
          },
          {
            floor: "",
            floorID: 1,

            objType: 1,
            colorPalleteID: 0,
            xpos: 32 * this.grid,
            ypos: 30 * this.grid,
            width: 8 * this.grid,
            height: 8 * this.grid,
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
            width: 8 * this.grid,
            height: 8 * this.grid,
          },
          {
            floor: "",
            floorID: 1,

            objType: 6,
            colorPalleteID: 0,
            xpos: 720,
            ypos: 264,
            width: 8 * this.grid,
            height: 8 * this.grid,
          },
        ],
      },
      //全フロア分一括で管理してます
      gameObjectList: [],
      // 全体のステータス
      mainStatus: {
        floor: "1", //現在のフロア
        floorID: 1,
        actionID: 0, //直前のアクション

        lastActionType: 0,
        lastActionObj: null,

        isSplit: false,   //分割中
        targetCanvasID: 0,  //分割中先に指定しているオブジェクトがいるcanvas
      },
      ObjectType: {
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
      },
      // 島図で保持するカラーパレットについて.pdf
      colorPalleteTable: [
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
      ],
      machine_object_status: null,
      images: [
        rect_img,
        line_img,
        space_img,
        machine_img,
        text_img,
        machines_img,
      ],

    };
  },

  created(){
    // this.gameMode = this.GameMode.MODE_MAP_EDIT; //0
    this.gameMode = this.GameMode.MODE_MACHINE_SET; //1
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

    
//
//テストデータ













// const gameMode = GameMode.MODE_MACHINE_SET;




    /*

共有データ

*/




// 1グリッドのpicサイズ


// 島図全体のサイズ(グリッド数)

// ?ここに置いていいのか?





// フロアの情報
// let floorInfo = {
//   //フロアの情報
//   floor: "",
//   floorID: 1,
// };

// var floorList = null;







//




/*

横メニュー用

*/



function sm_button(_bntID){
}







/*

// 配置オブジェクト

オブジェクトの管理

*/



/*
var floorObjectInfo = {
  floor: "",
  floorID: 0,
  objects: null,
};
*/

// オブジェクト情報
var gameObjectInfo = {
  objType: this.ObjectType.NULL,
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

  if(this.gameMode == this.GameMode.MODE_MACHINE_SET){
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

var location_btnA = document.getElementById('location_btnA');
var location_btnB = document.getElementById('location_btnB');


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

    var x = Math.floor(element.scrollLeft + (element.clientWidth / 2) / this.grid) * this.grid;
    var y = Math.floor(element.scrollTop + (element.clientHeight / 2) / this.grid) * this.grid;;
    var _rect = addNameBox(
          x,
          y,
          this.grid * 8,
          this.grid * 8,
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

    var x = Math.floor(element.scrollLeft + (element.clientWidth / 2) / this.grid) * this.grid;
    var y = Math.floor(element.scrollTop + (element.clientHeight / 2) / this.grid) * this.grid;;
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

    var x = Math.floor(element.scrollLeft + (element.clientWidth / 2) / this.grid) * this.grid;
    var y = Math.floor(element.scrollTop + (element.clientHeight / 2) / this.grid) * this.grid;;
    var _rect = addNameBox(
          x,
          y,
          this.grid * 8,
          this.grid * 8,
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

    var x = Math.floor(element.scrollLeft + (element.clientWidth / 2) / this.grid) * this.grid;
    var y = Math.floor(element.scrollTop + (element.clientHeight / 2) / this.grid) * this.grid;;
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





//
function um_savePng(){
    testSaveCanvas();    
}



//
function initUpperMenu(){   //
    //modal = null;
    um_setIconGroupMode(0);
}


/*

fabric生成関連

*/




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


// var animationObjectList = null;
// var animationTimeID = 0;
// var animationTimeCnt = 0;



/*
### 遊技台情報
- パチンコ・スロット・その他?
- 筐体種類・機種
- 筐体シリアルID
- 属性
*/








// var gameMachineList = null;

// debug用
var debugCount2 = 0;



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





// 設定画面データ

var settingMenuData = {
    setting_01: false,
    setting_02: false,
    setting_03: false,
    setting_04: false,
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




var colorPalleteUndefined = "#000000";





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

/*

dialog展開と戻り値

*/



// テキスト変更時のダイアログ表示(machineSet)
function setTextDialogRespons2(_res) {
  if (modalDialog) {
    if (_res == 1) {
      let element1 = document.getElementById("set_text_input_text2");
      let element2 = document.getElementById("set_text_input_type2");
      console.log("" + element1.value);
      if (!element1.value || (element1.value == "")) {
        return;
      }

      var idx = modalTargetObject.idx;
      var obj = modalTargetObject.obj;
      var oldType = false;
      if(checkGameObjectTypeNAMETEXT_VERTICAL(idx)){  //現状縦だったら…
        oldType = true;
      }
      var _cnvs = null;
      if(mainStatus.targetCanvasID == 0){
        _cnvs = canvas;
      }else {
        _cnvs = canvas2;
      }


      console.log("oldType = "+oldType);

      if (element2.checked) {
        var _text = addITextGroup(element1.value, obj.left, obj.top, 20);
        _cnvs.add(_text);
        if(oldType){
          updateGameObjectAt_ReCreate(idx, _text);
        }else {
          updateGameObjectAt_ReCreate2(idx, _text,ObjectType.NAME_TEXT_VERTICAL);
        }

        if (oldType) {  //元が縦だったら…
          // 古いほう削除
          for (var ii = 0; ii < obj._objects.length; ii++) {
            var _obj2 = obj._objects[ii];
            _cnvs.remove(_obj2);
            _obj2 = null;
          }
        }
        _cnvs.remove(obj);
        obj = null;
        /*
              } else if (obj._objects) {
                for (var ii = 0; ii < obj._objects.length; ii++) {
                  var obj2 = obj._objects.at(ii);
                  console.log(obj2);
                  if (obj2.text) {
                    obj2.set({ text: element1.value });
                    break;
                  }
                }
        */
      } else {
        if (oldType) {  //元が縦だったら…
          var _text = addNameIText(element1.value, obj.left, obj.top, 20);
          _cnvs.add(_text);
          updateGameObjectAt_ReCreate2(idx, _text,ObjectType.NAME_TEXT);
          // 古いほう削除
          for (var ii = 0; ii < obj._objects.length; ii++) {
            var _obj2 = obj._objects[ii];
            _cnvs.remove(_obj2);
            _obj2 = null;
          }
          _cnvs.remove(obj);
          obj = null;
        } else {
          obj.set({ text: element1.value });
        }
      }

      _cnvs.requestRenderAll();

      /*
          if(!element1.value || (element1.value == "")){
            console.log("null text");
      
            modalDialog.hide();
            modalDialog = null;
            modalTargetObject = null;
            return;
          }
      
          if(!element2.checked){    //横
            _text = addText(element1.value,_x,_y,20);
            canvas.add(_text);
            addGameObject(_text,ObjectType.TEXT,0);
          }else {                   //縦
            _text = addITextGroup(element1.value,_x,_y,20);
            canvas.add(_text);
            addGameObject(_text,ObjectType.TEXT_VERTICAL,0);
          }
      */
    }

    modalDialog.hide();
    modalDialog = null;
    modalTargetObject = null;
  }
}

// テキスト変更時ダイアログ表示(machineSet)
function setTextDialog2() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./dialog/set_text_dialog2.html", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 取得したダイアログのコンテンツをモーダル内に挿入
      var dialogContent = xhr.responseText;
      var modalContent = document.querySelector(
        "#staticBackdrop .modal-content"
      );
      modalContent.innerHTML = dialogContent;
      // モーダルを表示
      modalDialog = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      modalDialog.show();
    }
  };
  xhr.send();
}





// reloadレスポンス
function reloadDialogRespons(_res) {
  {
    console.log("reloadDialog");
    if(_res == 1){
      location.reload();
    }

    modalDialog.hide();
    modalDialog = null;
    modalTargetObject = null;
  }
}

// reload
function reloadDialog(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./dialog/reload_dialog.html", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 取得したダイアログのコンテンツをモーダル内に挿入
      var dialogContent = xhr.responseText;
      var modalContent = document.querySelector(
        "#staticBackdrop .modal-content"
      );
      modalContent.innerHTML = dialogContent;
      // モーダルを表示
      modalDialog = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      modalDialog.show();
    }
  };
  xhr.send();
}



// 遊技台削除
function deleteObjectDialogRespons(_res) {
  if (modalDialog) {
    console.log("deleteObjectDialog");

    var _obj = modalTargetObject;
    deleteObject2(_obj);
    resetCanvasActiveObject();

    modalDialog.hide();
    modalDialog = null;
    modalTargetObject = null;
  }
}

// 遊技台削除
function deleteObjectDialog() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./dialog/delete_object_dialog.html", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 取得したダイアログのコンテンツをモーダル内に挿入
      var dialogContent = xhr.responseText;
      var modalContent = document.querySelector(
        "#staticBackdrop .modal-content"
      );
      modalContent.innerHTML = dialogContent;
      // モーダルを表示
      modalDialog = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      modalDialog.show();
    }
  };
  xhr.send();
}






// 遊技台情報
function infoMachineDialogRespons(_res) {
  if (modalDialog) {
    console.log("infoMachineDialogRespons");
    modalDialog.hide();
    modalDialog = null;
    modalTargetObject = null;
  }
}

// 遊技台情報
function infoMachineDialog(data) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "info_machinebox_dialog.html", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 取得したダイアログのコンテンツをモーダル内に挿入
      var dialogContent = xhr.responseText;
      var modalContent = document.querySelector(
        "#staticBackdrop .modal-content"
      );
      modalContent.innerHTML = dialogContent;
      // モーダルを表示
      var modalElement = document.getElementById("staticBackdrop");
      var modalDialog = new bootstrap.Modal(modalElement);
      
      // モダール値表示/
      var machine_modal = document.getElementById('machine_info_modal');
      machine_modal.innerHTML = `
        <table class="modal_table">
        <tbody>
          <tr>
            <td>台番号 (data.serialID):</td>
            <td>${data.serialID || "-"}</td>
          </tr>
          <tr>
            <td>設置種類 (data.machineType):</td>
            <td>${data.machineType || "-"}</td>
          </tr>
          <tr>
            <td>設置機種 (data.machineGroup):</td>
            <td>${data.machineGroup || "-"}</td>
          </tr>
          <tr>
            <td>盤面番号 ():</td>
            <td>-</td>
          </tr>
          <tr>
            <td>枠番号 (): </td>
            <td>-</td>
          </tr>
          <tr>
            <td>主基板番号():</td>
            <td>-</td>
          </tr>
        </tbody>
        </table>
      `;
      
      // モダール出
      modalDialog.show();
    }
  };
  xhr.send();
}


// 複数遊技台設置時のダイアログ表示
function setMultiMachineDialogRespons(_res) {
  if (modalDialog) {
    if (_res == 1) {
      var objList = modalTargetObject.objList;
      var objNum = modalTargetObject.objNum;
      var machineList = modalTargetObject.machineList;
      var machineNum = modalTargetObject.machineNum;
      var btnList = modalTargetObject.btnList;
      var btnNum = modalTargetObject.btnNum;

      console.log(objList);
      console.log(objNum);
      console.log(machineList);
      console.log(machineNum);
      console.log(btnList);
      console.log(btnNum);

      var _num = 0;

      if (objNum > machineNum) {    //短いほう優先
        _num = machineNum;
      } else {
        _num = objNum;
      }
      for (var ii = 0; ii < _num; ii++) {
        var _obj = objList.at(ii);
        var _idx = _obj.idx;
        var _item = machineList.at(ii);
        var _btn = btnList.at(ii);
        setMachineData(_obj, _idx, _item, _btn);
        console.log("----"+ii);
        console.log(_item);
        console.log(_btn);

        //      console.log(getGameObjectAt(_idx));
      }
    }



    console.log("setMultiMachineDialogRespon");
    modalDialog.hide();
    modalDialog = null;
    modalTargetObject = null;
  }
}

// 複数遊技台設置
function setMultiMachineDialog() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./dialog/set_multi_machinebox_dialog.html", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 取得したダイアログのコンテンツをモーダル内に挿入
      var dialogContent = xhr.responseText;
      var modalContent = document.querySelector(
        "#staticBackdrop .modal-content"
      );
      modalContent.innerHTML = dialogContent;
      // モーダルを表示
      modalDialog = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      modalDialog.show();
    }
  };
  xhr.send();
}


//
function setColorDialogButton(_btn) {
  if (modalDialog) {
    {
      console.log(_btn);
      var _idx = modalTargetObject.idx;
      var _obj = modalTargetObject.obj;
      console.log(_idx + "," + _obj);
      updateGameObjectAt_Color(_idx, _obj, _btn);
    }
    /*
        modalDialog.hide();
        modalDialog = null;
        modalTargetObject = null;
    */
  }
}


// 色変更時のダイアログ表示
function setColorDialogRespons(_res) {
  if (modalDialog) {

    modalDialog.hide();
    modalDialog = null;
    modalTargetObject = null;
  }
}

// カラーパレット
function setColorDialog() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./dialog/set_color_dialog.html", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 取得したダイアログのコンテンツをモーダル内に挿入
      var dialogContent = xhr.responseText;
      var modalContent = document.querySelector(
        "#staticBackdrop .modal-content"
      );
      modalContent.innerHTML = dialogContent;
      // モーダルを表示
      modalDialog = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      modalDialog.show();
    }
  };
  xhr.send();
}



// テキスト変更時のダイアログ表示
function setTextDialogRespons(_res) {
  if (modalDialog) {
    if (_res == 1) {
      let element1 = document.getElementById("set_text_input_text");
      console.log("" + element1.value);
      if (!element1.value || (element1.value == "")) {
        return;
      }

      var idx = modalTargetObject.idx;
      var obj = modalTargetObject.obj;

      if (checkGameObjectTypeTEXT_VERTICAL(idx)) {
        var _text = addITextGroup(element1.value, obj.left, obj.top, 20);
        canvas.add(_text);
        updateGameObjectAt_ReCreate(idx, _text);

        // 古いほう削除
        for (var ii = 0; ii < obj._objects.length; ii++) {
          var _obj2 = obj._objects[ii];
          canvas.remove(_obj2);
          _obj2 = null;
        }
        canvas.remove(obj);
        obj = null;

      } else
        if (obj._objects) {
          for (var ii = 0; ii < obj._objects.length; ii++) {
            var obj2 = obj._objects.at(ii);
            console.log(obj2);
            if (obj2.text) {
              obj2.set({ text: element1.value });
              break;
            }
          }
        } else {
          obj.set({ text: element1.value });
        }

      canvas.requestRenderAll();

      /*
          if(!element1.value || (element1.value == "")){
            console.log("null text");
      
            modalDialog.hide();
            modalDialog = null;
            modalTargetObject = null;
            return;
          }
      
          if(!element2.checked){    //横
            _text = addText(element1.value,_x,_y,20);
            canvas.add(_text);
            addGameObject(_text,ObjectType.TEXT,0);
          }else {                   //縦
            _text = addITextGroup(element1.value,_x,_y,20);
            canvas.add(_text);
            addGameObject(_text,ObjectType.TEXT_VERTICAL,0);
          }
      */
    }

    modalDialog.hide();
    modalDialog = null;
    modalTargetObject = null;
  }
}

// テキスト変更時ダイアログ表示
function setTextDialog() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./dialog/set_text_dialog.html", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 取得したダイアログのコンテンツをモーダル内に挿入
      var dialogContent = xhr.responseText;
      var modalContent = document.querySelector(
        "#staticBackdrop .modal-content"
      );
      modalContent.innerHTML = dialogContent;
      // モーダルを表示
      modalDialog = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      modalDialog.show();
    }
  };
  xhr.send();
}






// テキスト追加時のダイアログ表示
function addTextDialogRespons(_res) {
  if (modalDialog) {

    var _x = modalTargetObject.x;
    var _y = modalTargetObject.y;
    let element1 = document.getElementById("add_text_input_text");
    let element2 = document.getElementById("add_text_input_type");
    var _text = null;

    console.log("" + element1.value + "," + element2.checked);
    if (!element1.value || (element1.value == "")) {
      console.log("null text");

      modalDialog.hide();
      modalDialog = null;
      modalTargetObject = null;
      return;
    }

    if (!element2.checked) {    //横
      _text = addIText(element1.value, _x, _y, 20);
      canvas.add(_text);
      addGameObject(_text, ObjectType.TEXT, 0);
    } else {                   //縦
      _text = addITextGroup(element1.value, _x, _y, 20);
      canvas.add(_text);
      addGameObject(_text, ObjectType.TEXT_VERTICAL, 0);
    }

    modalDialog.hide();
    modalDialog = null;
    modalTargetObject = null;
  }
}

// 一括遊技台追加時のダイアログ表示
function addTextDialog() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./dialog/add_text_dialog.html", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 取得したダイアログのコンテンツをモーダル内に挿入
      var dialogContent = xhr.responseText;
      var modalContent = document.querySelector(
        "#staticBackdrop .modal-content"
      );
      modalContent.innerHTML = dialogContent;
      // モーダルを表示
      modalDialog = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      modalDialog.show();
    }
  };
  xhr.send();
}


// 一括遊技台追加時のダイアログ表示 戻り値
function addMultiMachineDialogRespons(_res) {
  if (modalDialog) {

    console.log(modalTargetObject);
    let element1 = document.getElementById("add_multi_machinebox_input_number1")
    let element2 = document.getElementById("add_multi_machinebox_input_number2")

    console.log(element1.value);
    console.log(element2.value);

    var _x = modalTargetObject.x;
    var _y = modalTargetObject.y;
    var _w = element1.value;
    var _h = element2.value;
    if (!_w) {
      _w = 1;
    }
    if (!_h) {
      _h = 1;
    }

    console.log("" + _x + "," + _y + "," + _w + "," + _h);
    for (var jj = 0; jj < _h; jj++) {
      for (var ii = 0; ii < _w; ii++) {
        var _rect = addMachineBox(_x + (ii * this.grid * 8), _y + (jj * this.grid * 8), this.grid * 8, this.grid * 8, getDefaultColor(), "#000000", "");
        canvas.add(_rect);
        addGameObject(_rect, ObjectType.MACHINE_BOX, 0);
      }
    }


    modalDialog.hide();
    modalDialog = null;
    modalTargetObject = null;
  }
}


// 一括遊技台追加時のダイアログ表示
function addMultiMachineDialog() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./dialog/add_multi_machinebox_dialog.html", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 取得したダイアログのコンテンツをモーダル内に挿入
      var dialogContent = xhr.responseText;
      var modalContent = document.querySelector(
        "#staticBackdrop .modal-content"
      );
      modalContent.innerHTML = dialogContent;
      // モーダルを表示
      modalDialog = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      modalDialog.show();
    }
  };
  xhr.send();
}


// 遊技BOX追加時ダイアログ表示 戻り値 (ダブルクリック時は別？)
function addMachineBoxDialogRespons(_res) {
  if (modalDialog) {
    let element = document.getElementById("add_machinebox_input_text")
    console.log(element.value);
    console.log(modalTargetObject.item(1));

    modalTargetObject.item(1).set({
      text: element.value
    });

    modalDialog.hide();
    modalDialog = null;
    modalTargetObject = null;
    canvas.requestRenderAll();
  }
}


// 遊技BOX追加時・ダブルクリック時のダイアログ表示
function addMachineBoxDialog(_obj) {
  modalTargetObject = _obj;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", ".src/sega/segapages/add_machinebox_dialog.html", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 取得したダイアログのコンテンツをモーダル内に挿入
      var dialogContent = xhr.responseText;
      var modalContent = document.querySelector(
        "#staticBackdrop .modal-content"
      );
      modalContent.innerHTML = dialogContent;
      // モーダルを表示
      modalDialog = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      modalDialog.show();
    }
  };
  xhr.send();
}




var canvasContainer = document.getElementById("main");
canvasContainer.addEventListener("dragover", handleDragOver, false);
canvasContainer.addEventListener("drop", handleDrop, false);


  

  
  
  
 
  
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
  
  

























  },
}

</script>