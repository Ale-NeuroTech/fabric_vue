<template>
    <!-- モーダルの設定 -->

    <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">遊技台の縦横の台数を指定してください</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button>
    </div>
    <div class="modal-body">
        <form>
            <div class="mb-3">
                <label for="recipient-name">遊戯番号を指定して下さい：</label>
                <input type="number" class="form-control" onkeyup="value = value.length > 5 ? value.slice(0,5): value;"
                    max="99999" id="add_multi_machinebox_input_number1" />
            </div>
            <div class="mb-3"></div>
            <input type="number" class="form-control" onkeyup="value = value.length > 5 ? value.slice(0,5): value;"
                max="99999" id="add_multi_machinebox_input_number2" />
            <input type="text" style="display: none;" />
        </form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="addMultiMachineDialogRespons(0)">CANCEL</button>
        <button type="button" class="btn btn-primary" onclick="addMultiMachineDialogRespons(1)">OK</button>
    </div>
</template>

<script>
</script>