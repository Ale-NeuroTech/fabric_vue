<template>
    <div id="map_area" class="map_area">
        <canvas ref="canvas" width="400" height="300"></canvas>
    </div>
</template>
  
<script>
import { fabric } from 'fabric';

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

    methods: {

        //Controls
        renderIcon(ctx, left, top, styleOverride, fabricObject) {
            const size = fabricObject.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
            ctx.drawImage(this.img, -size / 2, -size / 2, size, size);
            ctx.restore();
        },

        //Delete
        deleteSelected() {
            const activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                if (activeObject.type === 'activeSelection') {
                    // Eliminar el grupo de objetos seleccionados
                    const objectsInGroup = activeObject.getObjects();
                    this.canvas.discardActiveObject();
                    objectsInGroup.forEach(object => {
                        this.canvas.remove(object);
                    });
                } else {
                    // Eliminar el objeto único seleccionado
                    this.canvas.remove(activeObject);
                }

                this.canvas.requestRenderAll();
            }
        },




        //Rectanlgle
        AddRectangle() {
            const rect = new fabric.Rect({
                left: 100,
                top: 50,
                fill: 'transparent',
                width: 200,
                height: 100,
                objectCaching: false,
                stroke: 'green',
                strokeWidth: 1,
            });
            // Crear un nuevo círculo que represente el centro
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const centerCircle = new fabric.Circle({
                radius: 5,
                fill: 'red',
                left: centerX - 5,
                top: centerY - 5,
                selectable: false,
            });
            // Agrupar el cuadrado y el círculo
            const group = new fabric.Group([rect, centerCircle], {
                left: rect.left,
                top: rect.top,
            });

            this.canvas.add(group);
            this.canvas.setActiveObject(group);
        },



        //line
        AddLine() {
            var line = new fabric.Line(
                [50, 50, 150, 150], {
                stroke: 'green',
                angle: -45
            });

            this.canvas.add(line);
            this.canvas.setActiveObject(line);
        },

        //space
        AddSpace() {
            var points = [
                { x: 0, y: 0 },
                { x: 0, y: 50 },
                { x: 50, y: 50 },
                { x: 0, y: 0 },
                { x: 50, y: 0 },
                { x: 0, y: 50 },
                { x: 50, y: 50 },
                { x: 50, y: 0 },
            ];

            var polyline = new fabric.Polyline(points, {
                left: 100,
                top: 40,
                fill: "transparent",
                stroke: "green",
            });

            this.canvas.add(polyline);
            this.canvas.setActiveObject(polyline);
        },
        //Text
        AddText() {
            // Create new Textbox instances 
            var textEditable = new fabric.Textbox(
                'Double click to edit あいうえお', {
                width: 500,
                editable: true
            });
            this.canvas.add(textEditable);
            this.canvas.centerObjectH(textEditable);
            this.canvas.setActiveObject(textEditable);
        },
        //Machine
        AddMachine() {

            var rect = new fabric.Rect({
                fill: '#eef',
                width: 40,
                height: 40,
                scaleY: 1,
                stroke: 'red',
                strokeWidth: 1,
                originX: 'center',
                originY: 'center'
            });

            var text = new fabric.Text('#', {
                fontSize: 10,
                originX: 'center',
                originY: 'center'
            });

            var group = new fabric.Group([rect, text], {
                left: 150,
                top: 100,
                angle: -10
            });

            this.canvas.setActiveObject(group);
            var number = (window.prompt("Machine number:"));

            if (/^[0-9.,]+$/.test(number)) {
                //Custom group
                group.item(0).set('fill', 'transparent');
                group.item(1).set({
                    text: number,
                    fill: 'black'
                });

                this.canvas.add(group);
            } else {
                alert('Please insert only numbers');
            }
        },
    },

    mounted() {
        const canvasElement = this.$refs.canvas;
        this.canvas = new fabric.Canvas(canvasElement);

        // Canvas size setup
        var map_area = document.getElementById('map_area');
        var map_width = map_area.offsetWidth - 3;
        var map_height = map_area.offsetHeight - 3;
        this.canvas.setHeight(map_height);
        this.canvas.setWidth(map_width);

        // Helper object setup
        const helperObj = new fabric.Object({});
        helperObj.set("selectable", false);
        this.canvas.add(helperObj);

        // Event listener for object added
        this.canvas.on("object:added", () => {
            let objects = this.canvas.getObjects();
            var selection = new fabric.ActiveSelection(objects, {
                canvas: this.canvas,
            });
            this.canvas.setActiveObject(selection);
            this.canvas.discardActiveObject();
            this.canvas.requestRenderAll();
        });

        // Custom control setup
        fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: (eventData, transform, fabricObject) => {
                if (transform) {
                    this.deleteSelected()
                }
            },
            render: (ctx, left, top, styleOverride, fabricObject) => this.renderIcon(ctx, left, top, styleOverride, fabricObject),
            cornerSize: 24
        });

        //Update canvas
        this.canvas.on('object:moving', (e) => {
            this.canvas.clearContext(this.canvas.contextTop);
        });

        // Custom control setup
        const deleteControlOptions = {
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            render: (ctx, left, top, styleOverride, fabricObject) => this.renderIcon(ctx, left, top, styleOverride, fabricObject),
            cornerSize: 24
        };

    },

};
</script>