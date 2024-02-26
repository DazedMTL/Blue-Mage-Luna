//=============================================================================
// RPGツクールMZ - LL_InstantKey.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc マップ上で指定キーを押した時にコモンイベントを呼び出します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_InstantKey.js
 *
 * マップ上で指定キーを押した時にコモンイベントを呼び出します。
 * コモンイベントリストで呼び出すコモンイベントを予め登録しておきます。
 * マップで自由に操作できる時に呼び出すことができます。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/12/6
 *
 * @param commonEvents
 * @text コモンイベントリスト
 * @desc 指定キー押下で呼び出すコモンイベントを定義します。
 * @default []
 * @type struct<commonEvents>[]
 */

/*~struct~commonEvents:
 *
 * @param keyName
 * @text 指定キー
 * @desc コモンイベント呼び出しに使用するキーです。
 * A～Zで登録します。(半角英字、大文字)
 * @type string
 *
 * @param commonEventId
 * @text コモンイベント
 * @desc 呼び出すコモンイベントです。
 * @type common_event
 *
 * @param variableId
 * @text 有効化変数
 * @desc この変数が0以外の時に呼び出しを許可します。
 * 「なし」に設定すると無条件で許可します。
 * @type variable
 */

(() => {
  "use strict";
  const pluginName = "LL_InstantKey";

  const parameters = PluginManager.parameters(pluginName);
  const paramJsonParse = function (key, value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  };

  const commonEvents = JSON.parse(
    JSON.stringify(String(parameters["commonEvents"] || ""), paramJsonParse)
  );

  //-----------------------------------------------------------------------------
  // Input
  //

  const _Input_clear = Input.clear;
  Input.clear = function () {
    _Input_clear.apply(this, arguments);

    this._currentKeyDownAtoZ = "";
  };

  const _Input__onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function (event) {
    _Input__onKeyDown.apply(this, arguments);

    // AtoZ KeyDown
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const keyName = String.fromCharCode(event.keyCode);
      this._currentKeyDownAtoZ = keyName;
    }
  };

  const _Input__onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function (event) {
    _Input__onKeyUp.apply(this, arguments);

    // AtoZ KeyUp
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      this._currentKeyDownAtoZ = "";
    }
  };

  Input.getKeyDownAtoZ = function () {
    return this._currentKeyDownAtoZ;
  };

  // ↓使わなかったため、削除
  // Input.isKeyDownAtoZ = function(keyName) {
  // 	return this._currentKeyDownAtoZ == keyName;
  // };

  // Input.keyDownAtoZReset = function() {
  // 	this._currentKeyDownAtoZ = "";
  // };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  const _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
  Scene_Map.prototype.updateScene = function () {
    _Scene_Map_updateScene.apply(this, arguments);

    if (
      !SceneManager.isSceneChanging() &&
      !$gameMap.isEventRunning() &&
      !$gamePlayer.isMoving()
    ) {
      // 指定キー押下時にコモンイベント呼び出し
      const currentKeyName = Input.getKeyDownAtoZ();
      const commonEvent = commonEvents.find(function (item) {
        if (
          item.keyName == currentKeyName &&
          ($gameVariables.value(item.variableId) !== 0 ||
            Number(item.variableId) === 0)
        )
          return true;
      });
      if (commonEvent) {
        $gameTemp.reserveCommonEvent(commonEvent.commonEventId);

        // ↓重複呼び出し対策、なくても大丈夫そうなため削除
        // Input.keyDownAtoZReset();
      }
    }
  };
})();
