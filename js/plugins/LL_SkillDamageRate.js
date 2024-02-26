//=============================================================================
// RPGツクールMZ - LL_SkillDamageRate.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc スキルのダメージ倍率を敵・味方毎に個別調整します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_SkillDamageRate.js
 *
 * スキルのメモ欄に下記を記述することで、ダメージ倍率を調整します。
 *   <multiplier_enemy:50>     # 使用者が敵の時、ダメージ倍率を50%
 *   <multiplier_actor:200>    # 使用者が味方の時、ダメージ倍率を200%
 *   <multiplier_enemy_2:25>   # 使用者が敵かつID:2の時、ダメージ倍率を25%
 *   <multiplier_actor_3:400>  # 使用者が味方かつID:3の時、ダメージ倍率を400%
 * ※ダメージ倍率はID指定のものが優先されます
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/7/8
 */

(() => {
  "use strict";
  const pluginName = "LL_SkillDamageRate";

  const parameters = PluginManager.parameters(pluginName);

  const _Game_Action_evalDamageFormula =
    Game_Action.prototype.evalDamageFormula;
  Game_Action.prototype.evalDamageFormula = function (target) {
    const baseValue = _Game_Action_evalDamageFormula.apply(this, arguments);

    const userDamageRate = this.exUserDamageRate();
    return baseValue * userDamageRate;
  };

  Game_Action.prototype.exUserDamageRate = function () {
    // アクター or 敵
    const subject = this.subject();
    let subjectId = null;
    let metaData = this.item().meta;

    if (subject.isActor()) {
      // アクター
      subjectId = subject.actorId();

      // メタデータ検索 (アクター＠ID)
      if (metaData["multiplier_actor_" + subjectId]) {
        return isNaN(metaData["multiplier_actor_" + subjectId])
          ? 1
          : Number(metaData["multiplier_actor_" + subjectId]) / 100;
      }
      // メタデータ検索 (アクター)
      if (metaData["multiplier_actor"]) {
        return isNaN(metaData["multiplier_actor"])
          ? 1
          : Number(metaData["multiplier_actor"]) / 100;
      }
    } else {
      // 敵
      subjectId = subject.enemyId();

      // メタデータ検索 (アクター＠ID)
      if (metaData["multiplier_enemy_" + subjectId]) {
        return isNaN(metaData["multiplier_enemy_" + subjectId])
          ? 1
          : Number(metaData["multiplier_enemy_" + subjectId]) / 100;
      }
      // メタデータ検索 (敵)
      if (metaData["multiplier_enemy"]) {
        return isNaN(metaData["multiplier_enemy"])
          ? 1
          : Number(metaData["multiplier_enemy"]) / 100;
      }
    }

    return 1;
  };
})();
