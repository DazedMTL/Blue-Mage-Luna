//=============================================================================
// RPGツクールMZ - LL_BattleFrontPicture.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 戦闘中「ピクチャの表示」を前面表示に変更します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_BattleFrontPicture.js
 *
 * 戦闘中「ピクチャの表示」を前面表示に変更します。
 * 有効化変数の数値が0以外の時に前面表示されます。
 * 戦闘途中で変数を切り替えた場合は次回戦闘より反映されます。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/11/13
 *
 * @param enableVariableId
 * @text 有効化変数ID
 * @desc この変数が0以外の時、ピクチャを前面表示します。
 * 戦闘途中で切り替えた場合は次回戦闘より反映されます。
 * @type variable
 */

(() => {
  "use strict";
  const pluginName = "LL_BattleFrontPicture";

  const parameters = PluginManager.parameters(pluginName);
  const enableVariableId = Number(parameters["enableVariableId"] || 0);

  //-----------------------------------------------------------------------------
  // Scene_Battle
  //

  const _Scene_Battle_createDisplayObjects =
    Scene_Battle.prototype.createDisplayObjects;
  Scene_Battle.prototype.createDisplayObjects = function () {
    _Scene_Battle_createDisplayObjects.apply(this, arguments);

    // ピクチャスプライトをウィンドウよりも前面に追加
    if ($gameVariables.value(enableVariableId) !== 0) {
      this.createFrontPictureSprite();
    }
  };

  Scene_Battle.prototype.createFrontPictureSprite = function () {
    this._spriteset.createFrontPictures(this);
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Battle
  //

  const _Spriteset_Battle_createPictures =
    Spriteset_Battle.prototype.createPictures;
  Spriteset_Battle.prototype.createPictures = function () {
    // ピクチャスプライトをウィンドウよりも前面に追加
    if ($gameVariables.value(enableVariableId) !== 0) {
      return;
    }

    _Spriteset_Battle_createPictures.apply(this, arguments);
  };

  Spriteset_Battle.prototype.createFrontPictures = function (scene) {
    const rect = this.pictureContainerRect();
    this._pictureContainer = new Sprite();
    this._pictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
    for (let i = 1; i <= $gameScreen.maxPictures(); i++) {
      this._pictureContainer.addChild(new Sprite_Picture(i));
    }
    // ウィンドウよりも前面に追加 (SceneのChildに追加)
    scene.addChild(this._pictureContainer);
  };
})();
