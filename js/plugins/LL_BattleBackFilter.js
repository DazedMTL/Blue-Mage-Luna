//=============================================================================
// RPGツクールMZ - LL_BattleBackFilter.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 戦闘背景にスクロールとフィルタ効果を追加します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_BattleBackFilter.js
 *
 * 戦闘背景にスクロールとフィルタ効果を追加します。
 * プラグインパラメータで専用の変数を予め設定しておき、
 * 変数の数値でそれぞれの効果の強さを設定できます。
 *
 * 推奨設定値: スクロール=10、揺れ=60  ※0にすると効果無効
 *
 * 「揺れ」エフェクトには、専用のフィルタ画像が必須となります。
 * img/systemに配置し、プラグインパラメータで画像を設定してください。
 *
 * プラグインコマンド:
 *   プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/12/10
 *
 * @param scroll1VariableId
 * @text 戦闘背景1のスクロール変数
 * @desc 戦闘背景1のスクロール速度を設定する変数です。
 * (推奨設定値: 10)
 * @default 0
 * @type variable
 *
 * @param scroll2VariableId
 * @text 戦闘背景2のスクロール変数
 * @desc 戦闘背景2のスクロール速度を設定する変数です。
 * (推奨設定値: 10)
 * @default 0
 * @type variable
 *
 * @param displacement1VariableId
 * @text 戦闘背景1の揺れ変数
 * @desc 戦闘背景1の揺れの強さを設定する変数です。
 * (推奨設定値: 60)
 * @default 0
 * @type variable
 *
 * @param displacement2VariableId
 * @text 戦闘背景2の揺れ変数
 * @desc 戦闘背景2の揺れの強さを設定する変数です。
 * (推奨設定値: 60)
 * @default 0
 * @type variable
 *
 * @param displacementFilterSettings
 * @text 揺れフィルタの設定
 * @desc ※この項目は使用しません
 *
 * @param displacementFilterImage
 * @text 揺れフィルタ用画像
 * @desc 「揺れ」フィルタ時に使用する画像です。
 * @dir img/system
 * @type file
 * @require 1
 * @parent displacementFilterSettings
 *
 * @param displacementFilterRepeatHeight
 * @text パターンの高さ
 * @desc 繰り返しパターンの1つあたりの高さです。
 * この高さを超えると座標を一度リセットします。
 * @default 256
 * @min 0
 * @max 9999
 * @type number
 * @parent displacementFilterSettings
 */

(() => {
  "use strict";
  const pluginName = "LL_BattleBackFilter";

  const parameters = PluginManager.parameters(pluginName);
  const scroll1VariableId = Number(parameters["scroll1VariableId"] || 0);
  const scroll2VariableId = Number(parameters["scroll2VariableId"] || 0);
  const displacement1VariableId = Number(
    parameters["displacement1VariableId"] || 0
  );
  const displacement2VariableId = Number(
    parameters["displacement2VariableId"] || 0
  );
  const displacementFilterImage = String(
    parameters["displacementFilterImage"] || ""
  );
  const displacementFilterRepeatHeight = Number(
    parameters["displacementFilterRepeatHeight"] || 256
  );

  //-----------------------------------------------------------------------------
  // Spriteset_Battle
  //

  const _Spriteset_Battle_createBattleback =
    Spriteset_Battle.prototype.createBattleback;
  Spriteset_Battle.prototype.createBattleback = function () {
    _Spriteset_Battle_createBattleback.apply(this, arguments);

    this.createDisplacementFilter();
  };

  const _Spriteset_Battle_updateBattleback =
    Spriteset_Battle.prototype.updateBattleback;
  Spriteset_Battle.prototype.updateBattleback = function () {
    _Spriteset_Battle_updateBattleback.apply(this, arguments);

    this._back1Sprite.origin.x +=
      Number($gameVariables.value(scroll1VariableId)) / 10;
    this._back2Sprite.origin.x +=
      Number($gameVariables.value(scroll2VariableId)) / 10;
    this.updateDisplacementFilter();
  };

  Spriteset_Battle.prototype.createDisplacementFilter = function () {
    // 揺れフィルタ用画像が設定されているか？
    if (displacementFilterImage == "") {
      throw new Error(pluginName + ": 揺れフィルタ用画像を設定してください！");
    }

    this._displacementSprite = new Sprite(
      ImageManager.loadSystem(displacementFilterImage)
    );
    this._displacement1Filter = new PIXI.filters.DisplacementFilter(
      this._displacementSprite
    );
    this._displacement2Filter = new PIXI.filters.DisplacementFilter(
      this._displacementSprite
    );
    this._back1Sprite.filters = [this._displacement1Filter];
    this._back2Sprite.filters = [this._displacement2Filter];
    this._baseSprite.addChild(this._displacementSprite);
  };

  Spriteset_Battle.prototype.updateDisplacementFilter = function () {
    this._displacementSprite.y -= 1;
    if (this._displacementSprite.y < -displacementFilterRepeatHeight) {
      this._displacementSprite.y = 0;
    }
    this._displacement1Filter.scale.x =
      Number($gameVariables.value(displacement1VariableId)) / 2;
    this._displacement1Filter.scale.y = Number(
      $gameVariables.value(displacement1VariableId)
    );
    this._displacement2Filter.scale.x =
      Number($gameVariables.value(displacement2VariableId)) / 2;
    this._displacement2Filter.scale.y = Number(
      $gameVariables.value(displacement2VariableId)
    );
  };
})();
