<template>
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
    <Toolbar_button />
  </div>

  <div class="container-fluid h-100">
    <div class="row h-100">
      <Sidebar />
      <CanvasA :map_width="map_width" :map_height="map_height" :grid="grid" :GameMode="GameMode" :gameMode="gameMode"
        :canvas="canvas" :canvas2="canvas2" :canvasScale="canvasScale" :ctx="ctx" :ctx2="ctx2"
        :animationTimeID="animationTimeID" :animationTimeCnt="animationTimeCnt" :floorList="floorList"
        :floorInfo="floorInfo" :gameMachineList="gameMachineList" :newMachineApiData="newMachineApiData"
        :machineGroup="machineGroup" :gameMachineInfo="gameMachineInfo" :GameMachineGroup="GameMachineGroup"
        :stockMachineApiData="stockMachineApiData" :testBaseData="testBaseData" :gameObjectList="gameObjectList"
        :mainStatus="mainStatus" :ObjectType="ObjectType" :colorPalleteTable="colorPalleteTable"
        :machine_object_status="machine_object_status" :images="images" :stencilMenuWidth="stencilMenuWidth"
        :gameObjectInfo="gameObjectInfo" :obj2_promise="obj2_promise" :settingMenuData="settingMenuData"
        :colorPalleteUndefined="colorPalleteUndefined" :colorPalleteTable2="colorPalleteTable2"/>
    </div>

    <button id="zoom_in_button" type="button" class="material-icons md-48" onclick="zoomIN()">
      zoom_in
    </button>
    <button id="zoom_out_button" type="button" class="material-icons md-48" onclick="zoomOUT()">
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

      <Stencil_area @add-rectangle-clicked="handleAddRectangle" @add-line-clicked="handleAddLine"
        @add-space-clicked="handleAddSpace" @add-text-clicked="handleAddText" @add-machine-clicked="handleAddMachine" />
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
      // オブジェクト情報
      gameObjectInfo: {
        objType: null,
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
      },
      stencilMenuWidth: 0,
      //グローバル変数
      obj2_promise: 0,
      settingMenuData: {
        setting_01: false,
        setting_02: false,
        setting_03: false,
        setting_04: false,
      },
      colorPalleteUndefined: "#000000",
      colorPalleteTable2: [
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
      ],
    };
  },




  created() {
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

    var location_btnA = document.getElementById('location_btnA');
    var location_btnB = document.getElementById('location_btnB');

    // 共通dailog
    var um_modal = null;

    // debug用
    var debugCount2 = 0;





  },
}

</script>