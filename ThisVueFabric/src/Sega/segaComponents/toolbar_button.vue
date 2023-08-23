<template>
  <!--1 Removal of game machines-->
  <button
        type="button"
        class="material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="遊技台撤去"
        onclick="um_removalMachineSerial()">
        do_not_disturb_on
      </button>

      <!--2 Table fill and table fill color change-->
      <button
        type="button"
        class="material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="遊技台塗りつぶし・塗りつぶし色の変更"
        onclick="setColorMachineObject()">
        format_color_fill
      </button>

      <!--3 Assume no allocation of the table frame.-->
      <button
        id="location_btnA"
        type="button"
        class="material-icons md-48 hidden_btn"
        data-toggle="tooltip"
        data-placement="bottom"
        title="遊技台枠を割付無しとする">
        close
      </button>
      <!--4-->
      <button
        id="location_btnB"
        type="button"
        class="material-icons md-48 hidden_btn"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Button">
        remove
      </button>
      
      <!--5 Split island map area view-->
      <button
        type="button"
        id="um_setting_button03"
        class="material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="島図エリア表示の分割"
        onclick="splitButton()">
        view_agenda
      </button>

      <!--6 Restore split island map area display-->
      <button
        type="button"
        id="splitButton"
        class="material-icons md-48 hidden_btn"
        data-toggle="tooltip"
        data-placement="bottom"
        title="分割した島図エリア表示を元に戻す"
        onclick="splitButton()">
        check_box_outline_blank
      </button>


      <!--7 Delete selected square/string-->
      <button
        type="button"
        class="material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="選択された四角・文字列を削除"
        onclick="deleteObject()">
        delete_forever
      </button>

      <!--8-->
      <button
        type="button"
        class="material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Button"
        onclick="um_Undo()">
        undo
      </button>

      <!--9-->
      <button
        type="button"
        id="um_setting_button02"
        class="material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Button"
        onclick="um_Reload()">
        restart_alt
      </button>

      <!--10 Add square to island map-->
      <button
        type="button"
        id="um_setting_button06"
        class="material-icons material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="島図に四角を追加"
        onclick="um_addMachineNameBox()">
        square
      </button>

      <!--11 Add text to island map-->
      <button
        type="button"
        id="um_setting_button07"
        class="material-icons material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="島図に文字列を追加"
        onclick="um_addMachineNameText()">
        title
      </button>

      <!--12 Finalize the island map-->
      <button
        type="button"
        id="um_setting_button08"
        class="material-icons material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="島図を確定する"
        onclick="um_savePng()">
        save
      </button>

      <!--13-->
      <button
        type="button"
        class="material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Button"
        onclick="debugFileSave()">
        download
      </button>

      <!--14-->
      <button
        type="button"
        id="um_setting_button02"
        class="material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Button"
        onclick="um_openSettingMenu()">
        settings
      </button>

      <!--15-->
      <button
        type="button"
        id="um_setting_button05"
        class="material-icons material-icons md-48"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Button"
        onclick="openMessageDialog('title11','message22\na\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk')">
        settings
      </button>

      <!--16-->
      <select id="floor_select" disabled>
      </select>
</template>

<script>
export default {
  name: 'ToolbarButtons'
}
</script>
