// EnemyAttackAnimation.js Ver.1.0.0
// MIT License (C) 2022 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
 * @target MZ MV
 * @plugindesc 敵キャラの通常攻撃アニメーションを設定します。
 * @author あわやまたな (Awaya_Matana)
 * @url https://awaya3ji.seesaa.net/
 * @help スキルのアニメーションを［通常攻撃］にした場合の敵キャラの
 * アニメーションを設定できます。
 *
 * [更新履歴]
 * 2022/06/13：Ver.1.0.0　公開
 *
 * @param defaultAnimationId
 * @text デフォルトアニメーションID
 * @desc 何も設定していない時のアニメーションIDです。
 * 「なし」にするとシステム効果音［敵攻撃］になります。
 * @type animation
 * @default 1
 *
 * @param enemyList
 * @text 敵キャラリスト
 * @desc 敵キャラとアニメーションの組み合わせを設定します。
 * @type struct<enemy>[]
 *
 */

/*~struct~enemy:
 *
 * @param enemyId
 * @text 敵キャラID
 * @type enemy
 * @default 1
 *
 * @param animationId
 * @text アニメーションID
 * @desc 「なし」にするとシステム効果音［敵攻撃］になります。
 * @type animation
 *
 */

"use strict";

{
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  const parameter = PluginManager.parameters(pluginName);

  const defaultAnimationId = Number(parameter["defaultAnimationId"]);
  const enemyList = JSON.parse(parameter["enemyList"] || "[]").map(JSON.parse);
  const animationList = [];
  enemyList.forEach(
    (item) =>
      (animationList[Number(item.enemyId || 0)] = Number(item.animationId || 0))
  );

  //-----------------------------------------------------------------------------
  // Game_Enemy

  Game_Enemy.prototype.attackAnimationId1 = function () {
    const animationId = animationList[this._enemyId];
    return animationId === undefined ? defaultAnimationId : animationId;
  };

  //-----------------------------------------------------------------------------
  // Window_BattleLog

  const _Window_BattleLog_showEnemyAttackAnimation =
    Window_BattleLog.prototype.showEnemyAttackAnimation;
  Window_BattleLog.prototype.showEnemyAttackAnimation = function (
    subject,
    targets
  ) {
    const animationId = subject.attackAnimationId1();
    if (animationId > 0) {
      this.showNormalAnimation(targets, animationId);
    } else {
      _Window_BattleLog_showEnemyAttackAnimation.call(this, subject, targets);
    }
  };
}
