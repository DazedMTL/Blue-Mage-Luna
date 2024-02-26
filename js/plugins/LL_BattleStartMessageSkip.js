//=============================================================================
// RPGツクールMZ - LL_BattleStartMessageSkip.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 戦闘開始時のメッセージを非表示にします。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_BattleStartMessageSkip.js
 *
 * 戦闘開始時のメッセージを非表示にします。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/10/5
 *
 * @param disablePreemptiveMessage
 * @text 先制攻撃メッセージも非表示
 * @desc 先制攻撃、不意打ちメッセージも非表示にします。
 * @type boolean
 * @default true
 */

(() => {
  "use strict";
  const pluginName = "LL_BattleStartMessageSkip";
  const parameters = PluginManager.parameters(pluginName);

  const disablePreemptiveMessage = eval(
    parameters["disablePreemptiveMessage"] || "true"
  );

  BattleManager.displayStartMessages = function () {
    if (disablePreemptiveMessage) return;

    if (this._preemptive) {
      $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise) {
      $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
  };
})();
