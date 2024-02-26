//=============================================================================
// RPGツクールMZ - LL_SeAutoStop.js v1.1.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc SE再生時、再生途中のSEを一度自動停止します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_SeAutoStop.js
 *
 * SE再生時、再生途中のSEを一度自動停止します。
 * 自動停止させたくない場合は、無効化変数を設定し、
 * 数値を0以外にすることで自動停止を一時的に無効化することができます。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/8/7
 *
 * @param disableVariableId
 * @text 無効化変数
 * @desc この変数が0以外の時、自動停止を無効化します。
 * @type variable
 */

(() => {
  "use strict";
  const pluginName = "LL_SeAutoStop";

  const parameters = PluginManager.parameters(pluginName);
  const disableVariableId = Number(parameters["disableVariableId"] || 0);

  // Play SE
  const _Game_Interpreter_command250 = Game_Interpreter.prototype.command250;
  Game_Interpreter.prototype.command250 = function (params) {
    // 有効化判定
    const enabled = $gameVariables.value(disableVariableId) === 0;
    if (enabled) {
      // 再生中のSEを停止
      AudioManager.stopSe();
    }

    return _Game_Interpreter_command250.apply(this, arguments);
  };
})();
