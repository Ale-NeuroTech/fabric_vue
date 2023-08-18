<template>
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
</template>

<script>
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//Usado
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
export default {
    props: {
        mapWidth: Number,
        mapHeight: Number,
        grid: Number,
        gameMode: Number,
        newMachineApiData: Array,
        stockMachineApiData: Array,
        testBaseData: Array,
        gameObjectList: Array,
        ObjectType: Array,
        colorPalleteTable: Array,
        mainStatus: Array,
        images: Array,
    },


    data() {
        return {
            canvas: null,
            canvas2: null,
            animationObjectList: [],
        };
    },

    methods: {
        init: function () {
            console.log(this.gameMode);
            console.log("main init");
            console.log(this.gameMode);

            // ヘッダーの高さを取得
            const header = document.getElementById("header_menu");
            const headerHeight = header.offsetHeight;

            // コンテンツ要素に高さを指定
            const bodycontent = document.getElementById("main");
            const sidebarcontent = document.getElementById("sidebar");
            bodycontent.style.height = `calc(100vh - ${headerHeight}px)`;
            sidebarcontent.style.height = `calc(100vh - ${headerHeight}px)`;




            this.initCanvas();
            this.initFabricFunction();
            this.initMainStatus();
            this.initFloor();
            this.initGameObject();
            this.initGameMachine();
            this.initSettingData();
            this.initUpperMenu();
            this.initSideMenu();
            this.setFloorObjectList();



            // mapのロード
            if (this.gameMode == "1") {  //遊技台
                this.loadGameMachenList();     //
                this.loadGameObjectList();

                this.setFloorSelector();

                this.resizeLayout();

                this.createFabricObject(0, this.canvas, 1);
                //    createFabricObject(1,canvas2,2);
            } else { //島図
                this.loadGameMachenList();     //?本来は存在しない?
                this.loadGameObjectList();

                this.resizeLayout();

                this.createFabricObject(0, this.canvas, 1);
                //    createFabricObject(1,canvas2,2);
                //    removeFabricObject(0,canvas,1);
            }
        },
        //////////
        initCanvas: function () {
            const stencilMenuWidth = 0;
            this.canvas = new fabric.Canvas("canvas_view");
            console.log("this.gameMode");
            console.log(this.gameMode);
            console.log("warana");
            console.log(this.gameMode);
            console.log("warana");
            if (this.gameMode == "1") {
                // if (this.gameMode == this.GameMode.MODE_MACHINE_SET) {
                this.canvas2 = new fabric.Canvas("canvas_view2");
            }
            this.canvas.setDimensions({
                width: this.map_width * this.grid * this.canvasScale,
                height: this.map_height * this.grid * this.canvasScale,
            });

            if (this.gameMode == "1") {
                this.canvas2.setDimensions({
                    width: this.map_width * this.grid * this.canvasScale,
                    height: this.map_height * this.grid * this.canvasScale,
                });
            }
            this.ctx = this.canvas.getContext("2d");
            if (this.gameMode == "1") {
                this.ctx2 = this.canvas.getContext("2d");
            }
            this.canvas.set("zIndex", 1);
            // scale
            this.canvas.setZoom(this.canvasScale);

            // ==========================================
            //  Grid Lineの追加
            // ==========================================
            for (var i = 0; i < this.canvasWidth / this.grid; i++) {
                this.canvas.add(
                    new fabric.Line(
                        [
                            i * this.grid + stencilMenuWidth,
                            0,
                            i * this.grid + stencilMenuWidth,
                            this.canvasHeight,
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
                this.canvas.add(
                    new fabric.Line(
                        [stencilMenuWidth, i * this.grid, stencilMenuWidth + this.canvasWidth, i * grid],
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
            if (this.gameMode == "1") {
                for (var i = 0; i < this.canvasWidth / this.grid; i++) {
                    this.canvas2.add(
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
                    this.canvas2.add(
                        new fabric.Line(
                            [stencilMenuWidth, i * this.grid, stencilMenuWidth + this.canvasWidth, i * grid],
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
                    this.canvas.requestRenderAll();
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
                if (this.gameMode == "1") {
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
            const selectionCreated = (cnvsID, cnvs, options) => {
                //console.log("selection:created");
                this.setObjectPosition(cnvs);
                this.setControllerType(cnvs);
                this.setTargetObjectAction(1);


                if (this.gameMode == "1") {
                    swapMachineStatus();
                }

            }

            // object 選択変更・更新
            function selectionUpdated(cnvsID, cnvs) {
                //console.log("selection:updated");
                setObjectPosition(cnvs);
                setControllerType(cnvs);
                setTargetObjectAction(2);

                if (this.gameMode == "1") {
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
            const mouseUp = (cnvs, options) => {
                // console.log("mouse:up");
                //console.log(this.mainStatus.lastActionType);
                this.allocationGameMachine();



                if (this.gameMode == "0") {
                    if (checkObjectCollision(cnvs)) {    //test
                        rewindObjectPosition(cnvs);
                        return;
                    }
                }
                switch (this.mainStatus.lastActionType) {  //さっきまで何してた?
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

                if (this.gameMode == "1") {
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
            this.canvas.on("object:moving", (options) => {
                this.$parent.mainStatus.targetCanvasID = 0;
                objectMoving(this.canvas, options);
            });

            this.canvas.on("object:moved", (options) => {
                this.$parent.mainStatus.targetCanvasID = 0;
                objectMoved(this.canvas, options);
            });

            this.canvas.on("object:scaling", (options) => {
                this.$parent.mainStatus.targetCanvasID = 0;
                objectScaling(this.canvas, options);
            });

            this.canvas.on("selection:created", (options) => {
                this.$parent.mainStatus.targetCanvasID = 0;
                selectionCreated(0, this.canvas, options);
            });

            this.canvas.on("selection:updated", () => {
                this.$parent.mainStatus.targetCanvasID = 0;
                selectionUpdated(0, this.canvas);
            });

            this.canvas.on("selection:cleared", () => {
                this.$parent.mainStatus.targetCanvasID = 0;
                selectionCleared(0, this.canvas);
            });

            this.canvas.on("mouse:move", (options) => {
                this.$parent.mainStatus.targetCanvasID = 0;
                mouseMove(this.canvas, options);
            });

            this.canvas.on("mouse:up", (options) => {
                this.$parent.mainStatus.targetCanvasID = 0;
                mouseUp(this.canvas, options);
            });

            this.canvas.on("mouse:down", (options) => {
                this.$parent.mainStatus.targetCanvasID = 0;
                mouseDown(this.canvas, options);
            });

            this.canvas.on("mouse:dblclick", (options) => {
                this.$parent.mainStatus.targetCanvasID = 0;
                mouseDblclick(this.canvas, options);
            });
            // ==========================================
            // canvas2
            // ==========================================
            if (this.gameMode == "1") {
                this.canvas2.on("object:moving", function (options) {
                    this.mainStatus.targetCanvasID = 1;
                    objectMoving(this.canvas2, options);
                });
                this.canvas2.on("object:moved", function (options) {
                    this.mainStatus.targetCanvasID = 1;
                    objectMoved(this.canvas2, options);
                });
                this.canvas2.on("object:scaling", function (options) {
                    this.mainStatus.targetCanvasID = 1;
                    objectScaling(this.canvas2, options);
                });
                //
                this.canvas2.on("selection:created", (options) => {
                    this.mainStatus.targetCanvasID = 1;
                    selectionCreated(1, this.canvas2, options);
                });
                this.canvas2.on("selection:updated", () => {
                    this.mainStatus.targetCanvasID = 1;
                    selectionUpdated(1, this.canvas2);
                });
                this.canvas2.on("selection:cleared", () => {
                    this.mainStatus.targetCanvasID = 1;
                    selectionCleared(1, this.canvas2);
                });
                //
                this.canvas2.on("mouse:move", function (options) {
                    this.mainStatus.targetCanvasID = 1;
                    mouseMove(this.canvas2, options);
                });
                this.canvas2.on("mouse:up", function (options) {
                    this.mainStatus.targetCanvasID = 1;
                    mouseUp(this.canvas2, options);
                });
                this.canvas2.on("mouse:down", function (options) {
                    this.mainStatus.targetCanvasID = 1;
                    mouseDown(this.canvas2, options);
                });
                this.canvas2.on("mouse:dblclick", function (options) {
                    this.mainStatus.targetCanvasID = 1;
                    mouseDblclick(this.canvas2, options);
                });
            }

        },

        //////////
        initFabricFunction: function () {
            const self = this;
            this.animationObjectList = new Array();
            console.log("warana");
            console.log(this.animationObjectList);
            console.log("warana");
            this.animationTimeID = setInterval(colorAnim2, 1000);
            function colorAnim2() {
                var col = "#ffffff";
                if ((this.animationTimeCnt & 1) == 0) {
                    col = "#ff0000";
                }
                for (var ii = 0; ii < self.animationObjectList.length; ii++) {
                    let _obj2 = self.animationObjectList[ii];
                    if (_obj2) {
                        let _obj = _obj2.obj;
                        let _rect = _obj._objects.at(0);
                        _rect.set({ fill: col });
                    }
                }
                if (self.animationObjectList.length > 0) {
                    self.animationTimeCnt++;
                    self.canvas.requestRenderAll();
                    if (this.canvas2) {
                        this.canvas2.requestRenderAll();     //...
                    }
                }
            }
        },

        //////////
        initMainStatus: function () {

        },

        //////////// フロア初期化
        initFloor: function () {
            this.floorList = new Array();
            var copyFloor = Object.assign({}, this.floorInfo);
            copyFloor.floor = "1F";
            copyFloor.floorID = 1;
            this.floorList.push(copyFloor);
            copyFloor = Object.assign({}, this.floorInfo);
            copyFloor.floor = "2F";
            copyFloor.floorID = 2;
            this.floorList.push(copyFloor);
            copyFloor = Object.assign({}, this.floorInfo);
            copyFloor.floor = "B1";
            copyFloor.floorID = 3;
            this.floorList.push(copyFloor);
            console.log(this.floorList);
        },

        ///////////
        initGameObject: function () {
            //init
            console.log("**** init gameObjectList ****");
            //  floorObjectList = new Array();
            // gameObjectList = new Array();
        },

        ///////////
        initGameMachine: function () {   //init
            console.log("**** init gameMachineList ****");
            this.gameMachineList = new Array();

            //    testFunc();
        },

        ///////////
        initSettingData: function () {
            console.log("**** setting param init ****");
        },

        ///////////
        initUpperMenu: function () {   //
            // modal = null;
            this.um_setIconGroupMode(0);
        },

        ///////////// 状態別アイコングループの状態変更
        um_setIconGroupMode: function (_mode) {
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
        },

        ////////////
        initSideMenu: function () {

        },

        ///////////// floorデータ読み込んだら…
        setFloorObjectList: function () {
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
        },

        /////////////
        loadGameMachenList: function () {
            //    newMachineApiData;    
            //     stockMachineApiData
            console.log(this.newMachineApiData);
            for (var ii = 0; ii < this.newMachineApiData.length; ii++) {
                this.addGameMachineList(this.newMachineApiData[ii], 1);
            }
            for (var ii = 0; ii < this.stockMachineApiData.length; ii++) {
                this.addGameMachineList(this.stockMachineApiData[ii], 2);
            }
        },

        ////////////// 追加
        addGameMachineList: function (json, stat) {
            var obj = Object.assign({}, this.gameMachineInfo);
            obj.id = json.id;
            obj.machineGroup = json.machineGroup;
            obj.machineType = json.machineType;
            obj.serialID = json.serialID;
            obj.name = json.name;
            obj.setF = false;
            obj.status = stat;

            obj.idx = this.gameMachineList.push(obj);
            //console.log("len = " + gameMachineList.length);
            //    console.log(obj);
        },

        //////////////// json 読込 -> gameObjectListに復元
        loadGameObjectList: function () {
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



            var jsonData = JSON.stringify(this.testBaseData);
            //(jsonData);
            var mapData = JSON.parse(jsonData);
            //console.log(mapData);


            var ii = 0;
            for (ii = 0; ii < mapData.object.length; ii++) {
                var obj = mapData.object.at(ii);

                var idx = this.pushGameObjectList(obj);
                obj.idx = idx;
                obj.obj = null;
            }


            //  console.log(floorObjectList);
        },

        /////////////
        pushGameObjectList: function (_obj) {
            var idx = -1;

            // 隙間を探す…
            for (var ii = 0; ii < this.gameObjectList.length; ii++) {
                if (!this.gameObjectList.at(ii)) {
                    this.gameObjectList.splice(ii, 1, _obj);
                    idx = ii + 1;
                    break;
                }
            }
            if (idx == -1) {
                // なければpush
                idx = this.gameObjectList.push(_obj);
            }
            return (idx);
        },

        /////////////
        setFloorSelector: function () {
            var list = this.getFloorList();
            const selector = document.getElementById("floor_select");
            for (var ii = 0; ii < list.length; ii++) {
                var option = document.createElement("option");
                option.text = list.at(ii).floor;
                option.value = list.at(ii).floorID;
                if (ii == 1) {  //フロア
                    option.selected = true;
                }
                selector.appendChild(option);
            }
            selector.addEventListener('change', this.floorSelectorChange);
        },

        /////////////
        getFloorList: function () {
            return (this.floorList);
        },

        /////////////
        floorSelectorChange: function () {
            const selector = document.getElementById("floor_select");
            console.log("floorID:" + selector.value);
        },

        /////////////
        resizeLayout: function () {
            if (this.gameMode == "1") {
                this.adjustMachineLayout();
            } else {
                this.adjustImageLayout();
            }
        },

        /////////////// サイドボタン作成
        adjustMachineLayout: function () {
            // ボタンの生成を実行
            const topSection = document.getElementById("top-section");
            this.createMachineListButtons(this.getGameMachineUnusedList(1), topSection);

            const bottomSection = document.getElementById("bottom-section");
            this.createMachineListButtons(this.getGameMachineUnusedList(2), bottomSection);
        },

        ////////////
        createMachineListButtons: function (items, container) {
            items.forEach((item) => {
                this.createMachineListButton(item, container);
            });
        },

        ////////////// 未設置台
        getGameMachineUnusedList: function (_stat) {
            var list = new Array();
            for (var ii = 0; ii < this.gameMachineList.length; ii++) {
                if ((this.gameMachineList.at(ii) == undefined) || (this.gameMachineList.at(ii) == null)) {
                    continue;
                }
                if (this.gameMachineList.at(ii).status == _stat) {
                    if (!this.gameMachineList.at(ii).setF) {
                        list.push(this.gameMachineList.at(ii));
                    }
                }
            }
            return (list);
        },

        ////////////// サイドボタン
        createMachineListButton: function (item, container) {
            var button = this.createMachineListButton_sub(item);
            container.appendChild(button);
        },

        ////////////// サイドボタン
        createMachineListButton_sub: function (item) {
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
        },

        ///////////// gameObjectListからフロアのfabricオブジェクト生成
        createFabricObject: function (cnvsID, cnvs, _floorID) {
            //getGameObjectList(mainStatus.floorID);

            var ii = 0;
            for (ii = 0; ii < this.gameObjectList.length; ii++) {
                var obj = this.gameObjectList.at(ii);

                if (obj.floorID != _floorID) {  //対象フロアのオブジェクトのみ
                    continue;
                }

                switch (obj.objType) {
                    case this.ObjectType.MACHINE_BOX:
                        {
                            var x = obj.xpos;
                            var y = obj.ypos;
                            var w = obj.width;
                            var h = obj.height;
                            var col = obj.colorPalleteID;
                            var text = obj.text;
                            var _rect = this.addMachineBox(
                                x,
                                y,
                                w,
                                h,
                                this.getColorPallete(col),
                                "#000000",
                                text
                            );
                            cnvs.add(_rect);

                            if (this.gameMode == "1") {
                                //          _rect.selectable = false;
                                _rect.hasControls = false;
                                _rect.editable = false;
                                //          _rect.evented = false;
                                _rect.lockMovementX = true;
                                _rect.lockMovementY = true;
                                _rect.lockUniScaling = false;
                            }

                            this.updateGameObjectAt(obj.idx, _rect);

                            if (this.gameMode == "1") {
                                //            if(!obj.serialID){
                                this.setGameObjectMachineBoxColor(cnvsID, obj.idx);
                                //            }
                            }
                        }
                        break;
                    case this.ObjectType.TEXT:
                        {
                            var _text = this.addIText(obj.text, obj.xpos, obj.ypos, 20);
                            _text.set({
                                scaleX: obj.scaleX,
                                scaleY: obj.scaleY
                            });

                            if (this.gameMode == "1") {
                                _text.selectable = false;
                                _text.hasControls = false;
                                _text.editable = false;
                                _text.evented = false;
                                _text.lockMovementX = true;
                                _text.lockMovementY = true;
                                _text.lockUniScaling = false;
                            }

                            cnvs.add(_text);
                            this.updateGameObjectAt(obj.idx, _text);
                        }
                        break;
                    case this.ObjectType.TEXT_VERTICAL:
                        {
                            console.log(obj);
                            var _text = this.addITextGroup(obj.text, obj.xpos, obj.ypos, 20);
                            _text.set({
                                scaleX: obj.scaleX,
                                scaleY: obj.scaleY
                            });

                            if (this.gameMode == "1") {
                                _text.selectable = false;
                                _text.hasControls = false;
                                _text.editable = false;
                                _text.evented = false;
                                _text.lockMovementX = true;
                                _text.lockMovementY = true;
                                _text.lockUniScaling = false;
                            }
                            cnvs.add(_text);
                            this.updateGameObjectAt(obj.idx, _text);
                        }
                        break;
                    case this.ObjectType.LINE:
                        {
                            let _lineArray = this.addLine(obj.x1, obj.y1, obj.x2, obj.y2);
                            if (this.gameMode == "1") {
                                _lineArray[0].selectable = false;
                                _lineArray[0].hasControls = false;
                                _lineArray[0].editable = false;
                                _lineArray[0].evented = false;
                                _lineArray[0].lockMovementX = true;
                                _lineArray[0].lockMovementY = true;
                                _lineArray[0].lockUniScaling = false;
                                cnvs.add(_lineArray[0]);
                            } else {
                                cnvs.add(_lineArray[0]);
                                cnvs.add(_lineArray[1]);
                                cnvs.add(_lineArray[2]);
                            }

                            this.updateGameObjectAt(obj.idx, _lineArray[0]);
                        }
                        break;
                    case this.ObjectType.BOX:
                        {
                            var _rect = this.addBox(
                                obj.xpos,
                                obj.ypos,
                                obj.width,
                                obj.height,
                                this.getDefaultColor(),
                                "#000000"
                            );
                            if (this.gameMode == "1") {
                                _rect.selectable = false;
                                _rect.hasControls = false;
                                _rect.editable = false;
                                _rect.evented = false;
                                _rect.lockMovementX = true;
                                _rect.lockMovementY = true;
                                _rect.lockUniScaling = false;
                            }
                            cnvs.add(_rect);
                            this.updateGameObjectAt(obj.idx, _rect);
                        }
                        break;
                    case this.ObjectType.SPACE_BOX:
                        {
                            var _rect = this.addSpaceBox(
                                obj.xpos,
                                obj.ypos,
                                obj.width,
                                obj.height,
                                this.getDefaultColor(),
                                "#000000"
                            );
                            if (this.gameMode == "1") {
                                _rect.selectable = false;
                                _rect.hasControls = false;
                                _rect.editable = false;
                                _rect.evented = false;
                                _rect.lockMovementX = true;
                                _rect.lockMovementY = true;
                                _rect.lockUniScaling = false;
                            }
                            cnvs.add(_rect);
                            this.updateGameObjectAt(obj.idx, _rect);
                        }
                        break;
                    case this.ObjectType.TEXT_BOX:
                        {
                        }
                        break;
                    case this.ObjectType.NAME_TEXT:
                        {
                            var _text = addNameIText(obj.text, obj.xpos, obj.ypos, 20);
                            _text.set({
                                scaleX: obj.scaleX,
                                scaleY: obj.scaleY
                            });

                            if (this.gameMode == "1") {
                                _text.selectable = false;
                                _text.hasControls = false;
                                _text.editable = false;
                                _text.evented = false;
                                _text.lockMovementX = true;
                                _text.lockMovementY = true;
                                _text.lockUniScaling = false;
                            }

                            cnvs.add(_text);
                            this.updateGameObjectAt(obj.idx, _text);
                        }
                        break;
                    case this.ObjectType.NAME_TEXT_VERTICAL:
                        {
                            console.log(obj);
                            var _text = this.addITextGroup(obj.text, obj.xpos, obj.ypos, 20);
                            _text.set({
                                scaleX: obj.scaleX,
                                scaleY: obj.scaleY
                            });

                            if (this.gameMode == "1") {
                                _text.selectable = false;
                                _text.hasControls = false;
                                _text.editable = false;
                                _text.evented = false;
                                _text.lockMovementX = true;
                                _text.lockMovementY = true;
                                _text.lockUniScaling = false;
                            }
                            cnvs.add(_text);
                            this.updateGameObjectAt(obj.idx, _text);
                        }
                        break;
                    case this.ObjectType.NAME_BOX:
                        {
                            var _rect = addNameBox(
                                obj.xpos,
                                obj.ypos,
                                obj.width,
                                obj.height,
                                this.getDefaultColor(),
                                "#000000"
                            );
                            if (this.gameMode == "1") {
                                _rect.selectable = false;
                                _rect.hasControls = false;
                                _rect.editable = false;
                                _rect.evented = false;
                                _rect.lockMovementX = true;
                                _rect.lockMovementY = true;
                                _rect.lockUniScaling = false;
                            }
                            cnvs.add(_rect);
                            this.updateGameObjectAt(obj.idx, _rect);
                        }
                        break;
                }
            }
        },

        /////////////// box
        addMachineBox: function (_xx, _yy, _ww, _hh, _fill, _stroke, _text2) {
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

            if (this.gameMode == "1") {
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

                _itexts = [_rect, _text, _rect2, _text2];
            } else { //島図製作中は必要ない
                _itexts = [_rect, _text];

            }


            var _group = new fabric.Group(_itexts);
            _group.set({
                borderColor: 'red',
                controls: control_param
            });

            return (_group);
        },

        /////////////
        getColorPallete: function (idx) {
            if ((idx >= this.colorPalleteTable.length) || (idx < 0)) {
                return (this.colorPalleteUndefined);
            }

            return (this.colorPalleteTable[idx]);
        },

        /////////////// オブジェクト更新
        updateGameObjectAt: function (idx, _obj) {
            //getGameObjectList(mainStatus.floorID);

            var obj2 = this.gameObjectList.at(idx - 1);
            obj2.xpos = _obj.left;
            obj2.ypos = _obj.top;
            obj2.width = _obj.width;
            obj2.height = _obj.height;
            obj2.obj = _obj;
            _obj.idx = idx;
        },

        ////////////
        setGameObjectMachineBoxColor: function (_cnvsID, _idx) {
            //getGameObjectList(mainStatus.floorID);

            var _obj = this.gameObjectList.at(_idx - 1);

            console.log("test");
            console.log(_obj);
            console.log(_obj.obj);


            if (_obj.allocationOFF) {    // ベニヤ板
                console.log("B");
                this.machine_object_status = "A";

                location_btnB.classList.remove("hidden_btn");
                location_btnA.classList.add("hidden_btn");
                _obj.obj.item(2).visible = false;
                _obj.obj.item(3).visible = true;

            } else if (!_obj.serialID) {
                console.log("A");
                this.machine_object_status = "B";

                location_btnA.classList.remove("hidden_btn");
                location_btnB.classList.add("hidden_btn");
                // 何も設定されてない
                this.setObjectAnimation(_cnvsID, _obj.obj);
                _obj.obj.item(2).visible = false;
                _obj.obj.item(3).visible = false;

            } else {
                console.log("C");
                this.machine_object_status = "C";

                //設置済み
                _obj.obj.item(2).visible = true;
                _obj.obj.item(3).visible = false;
            }
        },

        ////////////// machine box専用 // color animation
        setObjectAnimation: function (_canvasID, _obj) {
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
            this.animationObjectList.push({ canvasID: _canvasID, obj: _obj });
        },

        ////////////// テスト中だけどこっちが正式版になる予定
        addLine: function (_x1, _y1, _x2, _y2) {
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
                    left: Math.round(_line.left / this.grid) * this.grid,
                    top: Math.round(_line.top / this.grid) * this.grid
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
                    left: Math.round(_circle1.left / this.grid) * this.grid,
                    top: Math.round(_circle1.top / this.grid) * this.grid
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
                    left: Math.round(_circle2.left / this.grid) * this.grid,
                    top: Math.round(_circle2.top / this.grid) * this.grid
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
        },

        ////////////// box
        addBox: function (_xx, _yy, _ww, _hh, _fill, _stroke) {
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
        },

        ////////////
        getDefaultColor: function () {
            return (this.colorPalleteTable[0]);
        },

        ////////////
        addIText: function (str2, _xx, _yy, _fontSize) {
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
        },

        //////////////
        addITextGroup: function (str, _x, _y, _fontSize) {
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

                switch (this.checkProhibitedChar(arr[ii])) {
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
        },

        /////////////// 正規表現
        checkProhibitedChar: function (str) {
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
        },

        ////////////// box
        addSpaceBox: function (_xx, _yy, _ww, _hh, _fill, _stroke) {
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
        },

        //////////////Allow on and off machine function on clik
        allocationGameMachine: function () {


            if (this.machine_object_status == "B") {
                var _cnvs = null;
                if (this.mainStatus.targetCanvasID == 0) {
                    _cnvs = this.canvas;
                } else {
                    _cnvs = this.canvas2;
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
                location_btnA.onclick = this.um_allocationOffGameMachine;


            } else if (this.machine_object_status == "A") {

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
        },

        ////////////// イメージの配置を調整する関数 (side menu)
        adjustImageLayout: function () {
            const sidebar = document.getElementById("sidebar");
            const sidebarWidth = sidebar.offsetWidth; // サイドバーの横幅
            const sidebarHeight = sidebar.offsetHeight; // サイドバーの縦幅
            const imageCount = this.images.length; // イメージの個数

            const imageContainer = sidebar.querySelector(".d-flex");
            imageContainer.innerHTML = ""; // 一度中身をクリア

            const imageWidth = sidebarWidth - 100; // イメージの横幅
            const imageHeight = sidebarHeight / imageCount - 30; // イメージの縦幅

            for (let i = 0; i < imageCount; i++) {
                const image = document.createElement("img");
                image.src = this.images[i];
                image.classList.add("mb-3", "img-fluid");
                image.setAttribute("draggable", true);
                image.style.width = `${imageWidth}px`;
                image.style.height = `${imageHeight}px`;
                image.id = "SIDE_MENU_ImageID_" + i;
                console.log(image);
                imageContainer.appendChild(image);

                image.addEventListener("dragstart", this.handleDragStart, false);
                image.addEventListener("dragend", this.handleDragEnd, false);
                image.addEventListener("drag", this.handleDrag, false);
            }
            /*
              var dragableObjects = document.querySelectorAll("img");
              [].forEach.call(dragableObjects, function (dragableObject) {
                dragableObject.addEventListener("dragstart", handleDragStart, false);
                dragableObject.addEventListener("dragend", handleDragEnd, false);
                dragableObject.addEventListener("drag", handleDrag, false);
              });
            */
        },

        ////////////
        handleDragStart: function (e) {
            console.log("handle Drag Start");
            var target = e.target;
            e.dataTransfer.setData("text", target.id);
            target.style.opacity = "0.4";
        },

        ////////////
        handleDragEnd: function (e) {
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
        },

        ////////////
        handleDrag: function (e) {},
    },

    mounted() {

        var location_btnA = document.getElementById('location_btnA');
        var location_btnB = document.getElementById('location_btnB');
        location_btnA.addEventListener("click", this.allocationGameMachine);
        location_btnB.addEventListener("click", this.allocationGameMachine);
        this.init();
        //Funcion en methods (Pendiente de arreglar)
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        //Nuevo-Pendiente
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////



        /*
        
        島図本体
        
        */

        // let ctx;
        // let ctx2;

        //let isSelecting = false;
        let startPoint, endPoint;
        // var canvasScale = 1;
        var modalDialog = null; //
        var modalTargetObject = null; //メニュー対象のobject
        //let isCreate = true;

        //const newMachine = newMachineApiData;
        //const stockMachine = stockMachineApiData;
        const unitScale = 1;
        const canvasWidth = this.map_width * this.grid * unitScale;
        const canvasHeight = this.map_width * this.grid * unitScale;


        // ウィンドウのリサイズイベントでイメージの配置を調整
        //window.addEventListener("resize", resizeLayout());

        // 初回読み込み時にもイメージの配置を調整
        window.addEventListener("load", this.init);






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
                var obj1 = this.canvas.getActiveObject();
                var obj2 = this.canvas2.getActiveObject();
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
            this.canvas.discardActiveObject();
            if (this.canvas2) {
                this.canvas2.discardActiveObject();
            }
        }


        // オブジェクト削除
        function deleteObject() {
            console.log("delete");

            // よくない書き方だけどとりあえず…
            if (true) {   //settingにsw何か置く
                var _obj = this.canvas.getActiveObject();
                modalTargetObject = _obj;
                deleteObjectDialog();
            } else {
                var _obj = this.canvas.getActiveObject();
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
                        if (this.gameMode == "1") {
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

                    ///////INCLUDE THIS IN INDEX1
                    ///////INCLUDE THIS IN INDEX1
                    ///////INCLUDE THIS IN INDEX1
                    ///////INCLUDE THIS IN INDEX1
                    ///////INCLUDE THIS IN INDEX1
                    ///////INCLUDE THIS IN INDEX1
                    ///////INCLUDE THIS IN INDEX1
                    ///////INCLUDE THIS IN INDEX1
                    ///////INCLUDE THIS IN INDEX1
                    // if (this.gameMode == "0") {
                    //     if (_obj.type == "line") {
                    //         let c1 = _obj.circle1;
                    //         let c2 = _obj.circle2;
                    //         this.canvas.remove(c1);
                    //         this.canvas.remove(c2);
                    //         c1 = null;
                    //         c2 = null;
                    //     }
                    // }
                    //






                    console.log("" + _obj);
                    this.canvas.remove(_obj);
                    deleteGameObjectAt(_obj.idx);
                    _obj = null;
                } else {
                    for (var jj = 0; jj < _obj._objects.length; jj++) {
                        var _obj2 = _obj._objects[jj];
                        if (_obj2.idx) {
                            if (checkGameObjectTypeMACHINE_BOX(_obj2.idx)) {
                                if (this.gameMode == "1") {
                                    continue;
                                }
                            }
                            if (this.gameMode == "0") {
                                if (_obj2.type == "line") {
                                    let c1 = _obj2.circle1;
                                    let c2 = _obj2.circle2;
                                    this.canvas.remove(c1);
                                    this.canvas.remove(c2);
                                    c1 = null;
                                    c2 = null;
                                }
                            }
                            //
                            console.log("" + _obj2);
                            this.canvas.remove(_obj2);
                            deleteGameObjectAt(_obj2.idx);
                            _obj2 = null;
                        }

                    }
                }

                this.canvas.requestRenderAll();
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
                        mainStatus.lastActionObj = this.canvas.getActiveObject();
                    }
                    break;
            }
        }

        function zoomIN() {
            console.log("zoom in");
            if (canvasScale < 10.0) {
                canvasScale += 0.5;
            }
            this.canvas.setZoom(canvasScale);
            if (this.canvas2) {
                this.canvas2.setZoom(canvasScale);
            }
        }

        function zoomOUT() {
            console.log("zoom out");

            if (canvasScale > 0.5) {
                canvasScale -= 0.5;
            } else {
                canvasScale = 0.5;
            }
            this.canvas.setZoom(canvasScale);
            if (this.canvas2) {
                this.canvas2.setZoom(canvasScale);
            }
        }
    }
}





</script>