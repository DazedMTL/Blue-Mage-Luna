//=============================================================================
// RPGツクールMZ - LL_ExFastDebug.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc プレイ高速化、デバッグ時のすり抜け動作を拡張します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_ExFastDebug.js
 *
 * 指定キーを押している間、プレイを高速化する機能を追加します。
 * 指定キーはキーコードで設定できます。初期状態ではDキー(68)に設定されています。
 * またデバッグ時のすり抜け動作を拡張します。
 * (すり抜け動作は通常通りCtrlキーを押している間のみ有効です)
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/6/22
 *
 * @param fastSettings
 * @text プレイ高速化の設定
 * @desc ※この項目は使用しません
 *
 * @param fastPlayKeyCode
 * @text 有効化キーコード
 * @desc このキーが押されている間、プレイを高速化します。
 * 例えばDキーに設定する場合は、68に設定します。
 * @default 68
 * @type number
 * @parent fastSettings
 *
 * @param fastSpeed
 * @text 高速化倍率
 * @desc プレイを高速化した時の速度倍率です。
 * 最大で16倍速まで指定ができます。
 * @default 2
 * @type number
 * @min 1
 * @max 16
 * @parent fastSettings
 *
 * @param enableFastPlay
 * @text テストプレイ以外も有効
 * @desc ONにするとテストプレイ時以外の通常プレイでも
 * プレイ高速化が有効になります。
 * @type boolean
 * @default true
 * @parent fastSettings
 *
 * @param debugSettings
 * @text テストプレイ時の設定
 * @desc ※この項目は使用しません
 *
 * @param skipEventTriggerHere
 * @text プレイヤーから接触：無効
 * @desc ONにするとテストプレイ時のみCtrlキーを押している間
 * 「プレイヤーから接触」イベントを無効化します。
 * @type boolean
 * @default true
 * @parent debugSettings
 *
 * @param skipEventTriggerTouch
 * @text イベントから接触：無効
 * @desc ONにするとテストプレイ時のみCtrlキーを押している間
 * 「イベントから接触」イベントを無効化します。
 * @type boolean
 * @default true
 * @parent debugSettings
 */

(() => {
  "use strict";
  const pluginName = "LL_ExFastDebug";

  const parameters = PluginManager.parameters(pluginName);
  // プレイ高速化の設定
  const fastPlayKeyCode = Number(parameters["fastPlayKeyCode"] || 68);
  const fastSpeed = Number(parameters["fastSpeed"] || 2);
  const enableFastPlay = eval(parameters["enableFastPlay"] || "true");
  // テストプレイ時の設定
  const skipEventTriggerHere = eval(
    parameters["skipEventTriggerHere"] || "true"
  );
  const skipEventTriggerTouch = eval(
    parameters["skipEventTriggerTouch"] || "true"
  );

  // プレイ高速化キー登録
  Input.keyMapper[fastPlayKeyCode] = "D";

  const _SceneManager_determineRepeatNumber =
    SceneManager.determineRepeatNumber;
  SceneManager.determineRepeatNumber = function (deltaTime) {
    const result = _SceneManager_determineRepeatNumber.apply(this, arguments);

    if (this._scene) {
      // マップのみ有効
      if (
        this._scene.constructor === Scene_Map ||
        this._scene.constructor === Scene_Battle
      ) {
        // プレイ高速化有効判定
        if (($gameTemp.isPlaytest() && !enableFastPlay) || enableFastPlay) {
          if (Input.isPressed("D")) {
            // プレイ高速化
            return result * fastSpeed;
          }
        }
      }
    }

    return result;
  };

  // プレイヤーから接触
  const _Game_Player_checkEventTriggerHere =
    Game_Player.prototype.checkEventTriggerHere;
  Game_Player.prototype.checkEventTriggerHere = function (triggers) {
    if (
      Input.isPressed("control") &&
      $gameTemp.isPlaytest() &&
      skipEventTriggerHere
    ) {
      return;
    }
    _Game_Player_checkEventTriggerHere.apply(this, arguments);
  };

  // イベントから接触 (プレイヤーから接触時)
  const _Game_Player_checkEventTriggerTouch =
    Game_Player.prototype.checkEventTriggerTouch;
  Game_Player.prototype.checkEventTriggerTouch = function (x, y) {
    if (
      Input.isPressed("control") &&
      $gameTemp.isPlaytest() &&
      skipEventTriggerTouch
    ) {
      return;
    }
    _Game_Player_checkEventTriggerTouch.apply(this, arguments);
  };

  // イベントから接触
  const _Game_Event_checkEventTriggerTouch =
    Game_Event.prototype.checkEventTriggerTouch;
  Game_Event.prototype.checkEventTriggerTouch = function (x, y) {
    if (
      Input.isPressed("control") &&
      $gameTemp.isPlaytest() &&
      skipEventTriggerTouch
    ) {
      return;
    }
    _Game_Event_checkEventTriggerTouch.apply(this, arguments);
  };
})();
