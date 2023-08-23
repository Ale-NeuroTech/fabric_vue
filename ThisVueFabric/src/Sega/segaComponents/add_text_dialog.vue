<template>
    <!-- モーダルの設定 -->

<div class="modal-header">
  <h1 class="modal-title fs-5" id="staticBackdropLabel">てきすと</h1>
  <button
    type="button"
    class="btn-close"
    data-bs-dismiss="modal"
    aria-label="閉じる"
  ></button>
</div>
<div class="modal-body">
  <form>
    <div class="mb-3">
      <label for="recipient-name">てきすと：</label>
      <input type="text" class="form-control" id="add_text_input_text" />
      <input type="text" style="display: none;"/>
    </div>

    <div class="mb-3">
      <label class="checkbox-container">
        <span class="checkbox-label">縦</span>
        <input type="checkbox" name="direction" id="add_text_input_type" />
      </label>
    </div>

  </form>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-secondary" onclick="addTextDialogRespons(0)">CANCEL</button>
  <button type="button" class="btn btn-primary" onclick="addTextDialogRespons(1)">OK</button>
</div>

</template>

<script>
   export default {
    name: 'add_text_dialog'
}
</script>