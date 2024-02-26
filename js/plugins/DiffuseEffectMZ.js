//=============================================================================
// DiffuseEffectMZ.js
//=============================================================================
// [Update History]
// DiffuseEffect.js for RMMV
// 2017.Feb.12 Ver0.0.0 Closed Version
// 2019.Jun.27 Ver1.0.0 First Release
// DiffuseEffectMZ.js
// 2021.Apr.19 Ver1.0.0 First Release
// 2022.Feb.15 Ver1.1.0 Fix Bug: Error when back from the menu
//   this work is helped by こま(Koma, @koma_neko)
// 2022.Oct.03 Ver1.2.0 Enables to display effects under menu scenes

/*:
 * @target MZ
 * @plugindesc [Ver1.2.0]Display light diffusion effect on map/battle/title and menu scene
 * @author Sasuke KANNAZUKI (thx to Rokan)
 *
 * @param Title Effect Type
 * @desc 0:none >=1: display the same effect as plugin parameter at title
 * @type number
 * @min 0
 * @default 0
 *
 * @param Menu Effect Definition
 * @desc How to set screen effect number
 * @type select
 * @option constant
 * @option variable
 * @option Not use menu screen effect
 * @value none
 * @default constant
 *
 * @param Menu Effect Type
 * @parent Menu Effect Definition
 * @text Screen Effect (constant)
 * @desc 0:none >=1: display the same effect as plugin parameter
 * @type number
 * @min 0
 * @default 0
 *
 * @param Menu Effect Variable
 * @parent Menu Effect Definition
 * @text Screen Effect（variable）
 * @desc screen effect become the value of the specified variable
 * @type variable
 * @min 1
 * @default 1
 *
 * @param Invalidate Switch
 * @parent Menu Effect Definition
 * @desc Screen effect doesn't work during this switch is ON. Set 0 to display always.
 * @type switch
 * @min 0
 * @default 0
 *
 * @param Variable At Main
 * @parent Menu Effect Definition
 * @desc 0:default screen effect. >=1: value of specified variable
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Item
 * @parent Menu Effect Definition
 * @desc 0:default screen effect. >=1: value of specified variable
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Skill
 * @parent Menu Effect Definition
 * @desc 0:default screen effect. >=1: value of specified variable
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Equip
 * @parent Menu Effect Definition
 * @desc 0:default screen effect. >=1: value of specified variable
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Status
 * @parent Menu Effect Definition
 * @desc 0:default screen effect. >=1: value of specified variable
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Option
 * @parent Menu Effect Definition
 * @desc 0:default screen effect. >=1: value of specified variable
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Save
 * @parent Menu Effect Definition
 * @desc 0:default screen effect. >=1: value of specified variable
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Load
 * @parent Menu Effect Definition
 * @desc 0:default screen effect. >=1: value of specified variable
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At GameEnd
 * @parent Menu Effect Definition
 * @desc 0:default screen effect. >=1: value of specified variable
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At User Defined
 * @parent Menu Effect Definition
 * @text Variable At User Defined Scenes
 * @desc Set screen effect at defined scene by plugins
 * @type struct<userDefinedScene>[]
 * @default
 *
 * @requiredAssets img/system/RE_001
 * @requiredAssets img/system/RE_002
 * @requiredAssets img/system/RE_003
 *
 * @command start
 * @text Start ScreenEffect
 * @desc See help to the effect of number
 *
 * @arg effect
 * @text Screen Effect
 * @desc Screen Effect to Apply
 * @option 1:diffuse from center
 * @value 1
 * @option 2:converge to center
 * @value 2
 * @option 3:from top to the bottom of center
 * @value 3
 * @option 4:same as 3 but all horizontal position
 * @value 4
 * @option 5:from right up to left down
 * @value 5
 * @option 21:go up with drawing irregular spiral
 * @value 21
 * @option 22:go up with waving
 * @value 22
 * @option 23:go up with drawing regular spiral
 * @value 23
 * @option 31:go down like the snow falling down
 * @value 31
 * @option 0:no effect
 * @value 0
 * @type select
 * @default 0
 *
 * @command end
 * @text End ScreenEffect
 * @desc Finish Screen Effect
 *
 * @arg fade
 * @text vanish with fade?
 * @desc fade or erase immiaiately?
 * @on Yes. With Fade.
 * @off No. Erase All Now.
 * @type boolean
 * @default true
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 * This plugin enables to display light diffusion effect on map and battle.
 *
 * At first you have to do:
 * This plugin requires 3 image files to run.
 * Put RE_001, RE_002, RE_003 at img/system.
 *
 * Magic Numbers and Effect:
 * When set option or call plugin command, set the following numer.
 *  1 : diffuse from center
 *  2 : converge to center
 *  3 : from top to the bottom of center
 *  4 : from top to the bottom of all horizontal position
 *  5 : from right up to left down
 * 21 : go up with drawing irregular spiral
 * 22 : go up with waving
 * 23 : go up with drawing regular spiral
 * 31 : go down like the snow falling down
 *  0 : disappear
 *
 * Copyright: This plugin is based on Rokan's RGSS3 script material.
 * see "Kaisou Ryouiki" http://kaisou-ryouiki.sakura.ne.jp/
 * Thanks to Rokan.
 *
 * こま(Koma, @koma_neko) fixed bug at ver1.0.0.
 * Thanks to Koma
 *
 * License:
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc [Ver1.2.0]マップやタイトル、メニュー画面に拡散する光を表示します
 * @author 神無月サスケ (原案:ろかん)
 *
 * @param Title Effect Type
 * @text タイトル画面での効果
 * @desc タイトル画面での光拡散の表示 0:しない 1以上:する(プラグインコマンドの引数と同じ)
 * @type number
 * @min 0
 * @default 0
 *
 * @param Menu Effect Definition
 * @text メニュー画面での効果の設定
 * @desc 定数、変数、使用しないから選択可能です。
 * @type select
 * @option 定数
 * @value constant
 * @option 変数
 * @value variable
 * @option 使用しない
 * @value none
 * @default constant
 *
 * @param Menu Effect Type
 * @parent Menu Effect Definition
 * @text 画面効果(定数指定)
 * @desc メニュー画面での光拡散の表示 0:しない 1以上:する(プラグインコマンドの引数と同じ)
 * @type number
 * @min 0
 * @default 0
 *
 * @param Menu Effect Variable
 * @parent Menu Effect Definition
 * @text 画面効果（変数指定）
 * @desc 指定された変数の値の画面効果になります。変数の値はプラグインコマンドの引数と一緒です。
 * @type variable
 * @min 1
 * @default 1
 *
 * @param Invalidate Switch
 * @parent Menu Effect Definition
 * @text 無効化スイッチ
 * @desc このスイッチがONの間は、画面効果を表示しません。0を指定すると、常に表示します。
 * @type switch
 * @min 0
 * @default 0
 *
 * @param Variable At Main
 * @parent Menu Effect Definition
 * @text メインメニュー画面適用変数
 * @desc 画面効果の値を指定する変数IDです。0の場合、デフォルト値になります。
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Item
 * @parent Menu Effect Definition
 * @text アイテム画面適用変数
 * @desc 画面効果の値を指定する変数IDです。0の場合、デフォルト値になります。
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Skill
 * @parent Menu Effect Definition
 * @text スキル画面適用変数
 * @desc 画面効果の値を指定する変数IDです。0の場合、デフォルト値になります。
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Equip
 * @parent Menu Effect Definition
 * @text 装備画面適用変数
 * @desc 画面効果の値を指定する変数IDです。0の場合、デフォルト値になります。
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Status
 * @parent Menu Effect Definition
 * @text ステータス画面適用変数
 * @desc 画面効果の値を指定する変数IDです。0の場合、デフォルト値になります。
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Option
 * @parent Menu Effect Definition
 * @text オプション画面適用変数
 * @desc 画面効果の値を指定する変数IDです。0の場合、デフォルト値になります。
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Save
 * @parent Menu Effect Definition
 * @text セーブ画面適用変数
 * @desc 画面効果の値を指定する変数IDです。0の場合、デフォルト値になります。
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At Load
 * @parent Menu Effect Definition
 * @text ロード画面適用変数
 * @desc 画面効果の値を指定する変数IDです。0の場合、デフォルト値になります。
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At GameEnd
 * @parent Menu Effect Definition
 * @text ゲーム終了画面適用変数
 * @desc 画面効果の値を指定する変数IDです。0の場合、デフォルト値になります。
 * @type variable
 * @min 0
 * @default 0
 *
 * @param Variable At User Defined
 * @parent Menu Effect Definition
 * @text プラグイン定義画面適用変数
 * @desc 他のプラグインで導入されたメニュー画面の画面効果を指定します。
 * @type struct<userDefinedSceneJpn>[]
 * @default
 *
 * @requiredAssets img/system/RE_001
 * @requiredAssets img/system/RE_002
 * @requiredAssets img/system/RE_003
 *
 * @command start
 * @text 画面エフェクト開始
 * @desc 画面エフェクトの対応する数値はヘルプ本文を参照してください
 *
 * @arg effect
 * @text 画面効果
 * @desc 適用する画面効果
 * @option 1:中心から発散
 * @value 1
 * @option 2:中心へ収束
 * @value 2
 * @option 3:中央上部から下へ
 * @value 3
 * @option 4:上部全体から下へ
 * @value 4
 * @option 5:右上から左下へ
 * @value 5
 * @option 21:不規則な螺旋を描き上昇
 * @value 21
 * @option 22:ゆらゆらと上昇
 * @value 22
 * @option 23:規則的な螺旋を描き上昇
 * @value 23
 * @option 31:雪
 * @value 31
 * @option 0:効果なし
 * @value 0
 * @type select
 * @default 0
 *
 * @command end
 * @text 画面エフェクト終了
 * @desc 画面エフェクトを終了します。
 *
 * @arg fade
 * @text フェードしながら終了？
 * @desc いいえの場合、即消去します。
 * @on フェードあり
 * @off 即消去
 * @type boolean
 * @default true
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 * このプラグインは、マップ上に拡散する球状のアニメを表示可能にします。
 * この効果は、戦闘中も有効です。
 *
 * 最初にすべきこと:
 * このプラグインの実行には、添付の画像ファイルが必要です。
 * img/system フォルダに、RE_001, RE_002, RE_003を置いて下さい。
 *
 * 画面効果の数値：
 * タイトルやメニューのオプションや、プラグインコマンドでの設定の場合、
 * 以下の数値が、画面効果に対応します。
 *  1 : 中心から発散
 *  2 : 中心へ収束
 *  3 : 中央上部から下へ
 *  4 : 上部全体から下へ
 *  5 : 右上から左下へ
 * 21 : 不規則な螺旋を描いて上昇
 * 22 : ゆらゆらと上昇
 * 23 : 規則正しい螺旋を描いて上昇
 * 31 : 雪
 *  0 : 消去
 *
 * 著作権表記:
 * このプラグインは、ろかん氏のRGSS3素材をベースに作成しました。
 * Webサイト：回想領域 http://kaisou-ryouiki.sakura.ne.jp/
 * ろかん氏に謝意を示します。
 *
 * Ver1.0.0におけるバグを、こま(Koma, @koma_neko)様から修正して戴きました。
 * こま様には大変感謝しています。
 *
 * ライセンス表記:
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

/*~struct~userDefinedScene:
 *
 * @param NewSceneName
 * @text Scene Name
 * @desc Class Name on the Plugin. The class must be the sub class of Scene_MenuBase.
 * @type String
 * @default Scene_Xxxx
 *
 * @param VarId
 * @text Variable At The Scene
 * @desc 0:default screen effect. >=1: value of specified variable
 * @type variable
 * @min 0
 * @default 0
 */

/*~struct~userDefinedSceneJpn:
 *
 * @param NewSceneName
 * @text シーン名
 * @desc プラグイン上でのクラス名。Scene_MenuBaseのサブクラスのみ有効です。
 * @type String
 * @default Scene_Xxxx
 *
 * @param VarId
 * @text シーン適用変数
 * @desc 画面効果の値を指定する変数IDです。0の場合、デフォルト値になります。
 * @type variable
 * @min 0
 * @default 0
 */

(() => {
  const pluginName = "DiffuseEffectMZ";

  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const titleType = Number(parameters["Title Effect Type"] || 0);

  const menuDefinition = parameters["Menu Effect Definition"];
  const menuType = Number(parameters["Menu Effect Type"] || 0);
  const menuVarId = Number(parameters["Menu Effect Variable"] || 0);

  const defaultEffectType = () => {
    switch (menuDefinition) {
      case "constant":
        return menuType;
      case "variable":
        return $gameVariables.value(menuVarId);
      case "none":
        return 0;
    }
    return 0;
  };

  const invalidSwitchId = Number(parameters["Invalidate Switch"] || 0);

  const isEffectValid = () => {
    return !invalidSwitchId || !$gameSwitches.value(invalidSwitchId);
  };

  const sceneVarId = {};
  sceneVarId["Scene_Menu"] = Number(parameters["Variable At Main"] || 0);
  sceneVarId["Scene_Item"] = Number(parameters["Variable At Item"] || 0);
  sceneVarId["Scene_Skill"] = Number(parameters["Variable At Skill"] || 0);
  sceneVarId["Scene_Equip"] = Number(parameters["Variable At Equip"] || 0);
  sceneVarId["Scene_Status"] = Number(parameters["Variable At Status"] || 0);
  sceneVarId["Scene_Options"] = Number(parameters["Variable At Option"] || 0);
  sceneVarId["Scene_Save"] = Number(parameters["Variable At Save"] || 0);
  sceneVarId["Scene_Load"] = Number(parameters["Variable At Load"] || 0);
  sceneVarId["Scene_GameEnd"] = Number(parameters["Variable At GameEnd"] || 0);

  const userDefinedScene = parameters["Variable At User Defined"];
  if (userDefinedScene) {
    for (const scene of eval(userDefinedScene)) {
      const s = JsonEx.parse(scene);
      sceneVarId[s.NewSceneName] = Number(s.VarId);
    }
  }

  const currentSceneName = () => SceneManager._scene.constructor.name;

  // Sub classes of Scene_MenuBase, but it doesn't display screen effects.
  const invalidSceneNames = ["Scene_Shop", "Scene_Name"];

  const currentScreenEffect = () => {
    if (!isEffectValid()) {
      return 0;
    }
    const sceneName = currentSceneName();
    if (invalidSceneNames.includes(sceneName)) {
      return 0;
    }
    const varId = sceneVarId[sceneName];
    if (varId) {
      return $gameVariables.value(varId);
    } else {
      return defaultEffectType();
    }
  };

  //
  // process plugin commands
  //
  PluginManager.registerCommand(pluginName, "start", (args) => {
    $gameScreen.startREffect(+args.effect);
  });

  PluginManager.registerCommand(pluginName, "end", (args) => {
    if (args.fade === "true") {
      $gameScreen.fadeREffect();
    } else {
      $gameScreen.endREffect();
    }
  });

  //
  // process Game_Screen
  //
  const _Game_Screen_initialize = Game_Screen.prototype.initialize;
  Game_Screen.prototype.initialize = function () {
    _Game_Screen_initialize.call(this);
    this.rEffectType = 0;
    this.requestResetREffect = false;
  };

  Game_Screen.prototype.startREffect = function (type) {
    this.rEffectType = type;
  };

  Game_Screen.prototype.endREffect = function () {
    this.requestResetREffect = true;
    this.rEffectType = 0;
  };

  Game_Screen.prototype.fadeREffect = function () {
    this.rEffectType = 0;
  };

  //
  // define at Game_Temp
  //
  const _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_initialize.call(this);
    this.rEffects = new REffects();
  };

  //
  // add or remove effects sprites at/from Spriteset
  //
  const _Spriteset_Base_createUpperLayer =
    Spriteset_Base.prototype.createUpperLayer;
  Spriteset_Base.prototype.createUpperLayer = function () {
    this.addChild($gameTemp.rEffects);
    _Spriteset_Base_createUpperLayer.call(this);
  };

  const _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function () {
    _Scene_Map_terminate.call(this);
    this._spriteset.removeChild($gameTemp.rEffects);
  };

  const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
  Scene_Battle.prototype.terminate = function () {
    _Scene_Battle_terminate.call(this);
    this._spriteset.removeChild($gameTemp.rEffects);
  };

  // ------------------------------------------------------
  //
  // Sprite_REffect : an element of the light
  //
  function Sprite_REffect() {
    this.initialize.apply(this, arguments);
  }

  Sprite_REffect.prototype = Object.create(Sprite.prototype);
  Sprite_REffect.prototype.constructor = Sprite_REffect;

  Sprite_REffect.span = false;

  Sprite_REffect.prototype.initialize = function (type) {
    Sprite.prototype.initialize.call(this);
    this.reset();
    this.effectType = type || 0;
    if (type) {
      this.setup(type);
    }
  };

  Sprite_REffect.prototype.reset = function () {
    this.effectType = 0;
    this.initialPos = new Point(0, 0);
    this.moveAngle = new Point(0.0, 0.0); // radian
    this.radius = 0.0;
    this.blendMode = 1;
    this.bitmap = null;
    Sprite_REffect.span = !Sprite_REffect.span;
    return this;
  };

  Sprite_REffect.prototype.setZoom = function (value) {
    this.scale.set(value, value);
  };

  Sprite_REffect.prototype.setGraphic = function (filename) {
    this.bitmap = ImageManager.loadSystem(filename);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
  };

  Sprite_REffect.prototype.setStartPos = function (typeX, typeY) {
    switch (typeX) {
      case 0: // random
        this.initialPos.x = Math.randomInt(Graphics.width + 150) - 75;
        break;
      case 1: // out of screen (left)
        this.initialPos.x = -45;
        break;
      case 2: // center
        this.initialPos.x = Graphics.width / 2;
        break;
      case 3: // out of screen (right)
        this.initialPos.x = Graphics.width + 45;
        break;
    }
    switch (typeY) {
      case 0: // random
        this.initialPos.y = Math.randomInt(Graphics.height + 75) - 36;
        break;
      case 1: // out of screen (upper)
        this.initialPos.y = -45;
        break;
      case 2: // center
        this.initialPos.y = Graphics.height / 2;
        break;
      case 3: // out of screen (down)
        this.initialPos.y = Graphics.height + 45;
        break;
    }
    this.x = this.initialPos.x;
    this.y = this.initialPos.y;
  };

  Sprite_REffect.prototype.setMoveAngle = function (ax, ay) {
    this.moveAngle.x = Math.cos(ax * 0.01);
    this.moveAngle.y = Math.sin((ay || ax) * 0.01);
  };

  Sprite_REffect.prototype.getX = function () {
    return this.initialPos.x + this.radius * this.moveAngle.x;
  };

  Sprite_REffect.prototype.getY = function () {
    return this.initialPos.y + this.radius * this.moveAngle.y;
  };

  Sprite_REffect.prototype.getZoom = function () {
    return (
      ((this.radius * this.moveAngle.y) / Graphics.width / 1.5 + 0.8) *
      (this.opacity / 200.0)
    );
  };

  Sprite_REffect.prototype.setup = function (type) {
    this.effectType = type;
    switch (Math.floor(this.effectType / 10)) {
      case 0:
        this.setupDiffusion();
        break;
      case 2:
        this.setupSpiral();
        break;
      case 3:
        this.setupSnow();
        break;
    }
    return this;
  };

  Sprite_REffect.prototype.setupDiffusion = function () {
    switch (this.effectType) {
      case 1:
        this.radius = Math.randomInt(Graphics.width / 3) + 1.0;
        this.moveSpeed = (Math.randomInt(75) + 1) * 0.01 + 0.75;
        this.duration = Math.randomInt(100) + 80;
        this.setStartPos(2, 2);
        this.setMoveAngle(Math.randomInt(2 * Math.PI * 100));
        this.setGraphic("RE_001");
        break;
      case 2:
        this.radius = Math.randomInt(Graphics.width / 3) + 45.0;
        this.moveSpeed = (Math.randomInt(75) + 1) * -0.01 - 0.75;
        this.duration = Math.randomInt(100) + 90;
        this.setStartPos(2, 2);
        this.setMoveAngle(Math.randomInt(2 * Math.PI * 100));
        this.setGraphic("RE_001");
        break;
      case 3:
        this.radius = Math.randomInt(Graphics.width / 2) + 1.0;
        this.moveSpeed = (Math.randomInt(75) + 1) * 0.01 + 0.75;
        this.duration = Math.randomInt(100) + 80;
        this.setStartPos(2, 1);
        this.setMoveAngle(
          Math.randomInt(2 * Math.PI * 100),
          Math.randomInt(Math.PI * 100)
        );
        this.setGraphic("RE_001");
        break;
      case 4:
        this.radius = Math.randomInt(Graphics.width / 2) + 1.0;
        this.moveSpeed = (Math.randomInt(75) + 1) * 0.01 + 0.75;
        this.duration = Math.randomInt(100) + 80;
        this.setStartPos(0, 1);
        this.setMoveAngle(
          Math.randomInt(2 * Math.PI * 100),
          Math.randomInt(Math.PI * 100)
        );
        this.setGraphic("RE_001");
        break;
      case 5:
        this.radius = Math.randomInt(Graphics.width / 2) + 1.0;
        this.moveSpeed = (Math.randomInt(75) + 1) * 0.01 + 0.75;
        this.duration = Math.randomInt(100) + 120;
        this.setStartPos(3, 1);
        this.setMoveAngle(
          Math.randomInt(Math.PI * 100) + 90,
          Math.randomInt(Math.PI * 100)
        );
        this.setGraphic("RE_001");
        break;
    }
    this.maxOpacity = Math.randomInt(160) + 40;
    this.opacity = 1;
  };

  Sprite_REffect.prototype.setupSpiral = function () {
    switch (this.effectType) {
      case 21:
        this.radius = Math.randomInt(300) + 1.0;
        this.moveSpeed = 7.5 - this.radius / 50.0;
        this.nextAngle = Math.randomInt(360) * 1.0;
        this.collapseSpeed = 1;
        this.setStartPos(2, 3);
        this.setGraphic("RE_002");
        break;
      case 22:
        this.radius = Math.randomInt(60) + 1.0;
        this.moveSpeed = (Math.randomInt(150) + 1.0) * 0.01 + 1.0;
        this.nextAngle = Math.randomInt(360) * 1.0;
        this.collapseSpeed = Math.randomInt(3) === 0 ? 2 : 1;
        this.setStartPos(0, 3);
        this.setGraphic("RE_002");
        break;
      case 23:
        this.radius = 270;
        this.moveSpeed = 2.55;
        this.nextAngle = Sprite_REffect.span ? 0.0 : 180.0;
        this.collapseSpeed = 0;
        this.setStartPos(2, 3);
        this.setGraphic("RE_002");
        break;
    }
    this.opacity = 255;
    this.floatY = this.y * 1.0;
  };

  Sprite_REffect.prototype.setupSnow = function () {
    this.setStartPos(0, 1);
    this.setGraphic("RE_003");
    var z = Math.randomInt(100);
    if (z <= 49) {
      this.setZoom((3 + Math.randomInt(2)) / 10.0);
    } else if (z <= 89) {
      this.setZoom((6 + Math.randomInt(2)) / 10.0);
    } else {
      this.setZoom((9 + Math.randomInt(2)) / 10.0);
    }
    this.moveSpeed = this.scale.x * 2.4;
    this.floatY = this.y * 1.0;
    this.radius = Math.randomInt(15) + 1.0;
    this.nextAngle = Math.randomInt(360);
    this.duration = 1500;
    this.opacity = 255;
  };

  Sprite_REffect.prototype.update = function () {
    Sprite.prototype.update.call(this);
    switch (Math.floor(this.effectType / 10)) {
      case 0:
        this.updateDiffusion();
        break;
      case 2:
        this.updateSpiral();
        break;
      case 3:
        this.updateSnow();
        break;
    }
  };

  Sprite_REffect.prototype.updateDiffusion = function () {
    this.duration--;
    this.radius = Math.max(this.radius + this.moveSpeed, 0.0);
    this.x = Math.floor(this.getX());
    this.y = Math.floor(this.getY());
    this.setZoom(this.getZoom());
    this.opacity = Math.min(
      this.opacity + (this.duration > 0 ? 1 : -1),
      this.maxOpacity
    );
  };

  Sprite_REffect.prototype.updateSpiral = function () {
    this.nextAngle += Math.min(this.moveSpeed / 1.5, 2);
    if (this.nextAngle >= 360) {
      this.nextAngle = 0;
    }
    this.setMoveAngle(this.nextAngle * 1.74533);
    this.x = this.getX();
    this.y = Math.round((this.floatY -= this.moveSpeed));
    this.setZoom(this.getZoom());
    this.opacity -= this.collapseSpeed;
  };

  Sprite_REffect.prototype.updateSnow = function () {
    this.duration -= 3;
    this.nextAngle += Math.min(this.moveSpeed / 1.5, 2);
    if (this.nextAngle >= 360) {
      this.nextAngle = 0;
    }
    this.setMoveAngle(this.nextAngle * 1.74533);
    this.x = this.getX();
    this.y = Math.round((this.floatY += this.moveSpeed));
    this.opacity = this.duration;
  };

  Sprite_REffect.prototype.needDispose = function () {
    switch (Math.floor(this.effectType / 10)) {
      case 0:
        return this.opacity === 0;
      case 2:
        return this.y <= -(this.height * this.anchor.y) || this.opacity === 0;
      case 3:
        return this.y > Graphics.height || this.opacity === 0;
      default:
        return true;
    }
  };

  // ------------------------------------------------------
  //
  // REffects : manage Sprite_REffect objects
  //
  function REffects() {
    this.initialize.apply(this, arguments);
  }

  REffects.prototype = Object.create(Sprite.prototype);
  REffects.prototype.constructor = REffects;

  REffects.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.reset();
  };

  REffects.prototype.reset = function () {
    if (this.sprites) {
      while (this.sprites.length > 0) {
        this.removeChild(this.sprites.shift());
      }
    }
    this.sprites = [];
    this.spriteFactory = [];
    this.effectType = 0;
    this.waitCount = 0;
  };

  REffects.prototype.restoreSprites = function () {
    while (this.sprites.length > 0) {
      const sprite = this.sprites.shift();
      this.removeChild(sprite);
      this.spriteFactory.push(sprite.reset());
    }
    this.waitCount = 0;
  };

  REffects.prototype.newSprite = function () {
    if (this.spriteFactory.length > 0) {
      return this.spriteFactory.shift().setup(this.effectType);
    } else {
      return new Sprite_REffect(this.effectType);
    }
  };

  REffects.prototype.setNewSprite = function () {
    const sprite = this.newSprite();
    this.addChild(sprite);
    this.sprites.push(sprite);
    return sprite;
  };

  REffects.prototype.update = function () {
    this.updateReset();
    this.updateChangeType();
    this.updateWaitCount();
    Sprite.prototype.update.call(this);
    this.updateRestoreSprites();
  };

  REffects.prototype.updateReset = function () {
    if ($gameScreen.requestResetREffect) {
      this.restoreSprites();
      $gameScreen.requestResetREffect = false;
    }
  };

  REffects.prototype.updateChangeType = function () {
    $gameScreen.rEffectType = $gameScreen.rEffectType || 0;
    if (this.effectType != $gameScreen.rEffectType) {
      this.effectType = $gameScreen.rEffectType;
    }
  };

  REffects.prototype.updateWaitCount = function () {
    if (this.effectType) {
      if (this.waitCount === 0) {
        this.setNewSprite();
        this.waitCount = this.effectType > 30 ? 20 : 10;
      }
      this.waitCount--;
    }
  };

  REffects.prototype.updateRestoreSprites = function () {
    const rEffects = this;
    this.sprites = this.sprites.filter(function (sprite) {
      if (sprite.needDispose()) {
        rEffects.removeChild(sprite);
        rEffects.spriteFactory.push(sprite.reset());
        return false;
      }
      return true;
    });
  };

  // ------------------------------------------------------
  //
  // REffectsTitle : REffect for Title.
  //
  function REffectsTitle() {
    this.initialize.apply(this, arguments);
  }

  REffectsTitle.prototype = Object.create(REffects.prototype);
  REffectsTitle.prototype.constructor = REffectsTitle;

  REffectsTitle.prototype.initialize = function () {
    REffects.prototype.initialize.call(this);
    this.effectType = titleType;
  };

  REffectsTitle.prototype.updateReset = function () {};

  REffectsTitle.prototype.updateChangeType = function () {};

  const _Scene_Title_createForeground = Scene_Title.prototype.createForeground;
  Scene_Title.prototype.createForeground = function () {
    _Scene_Title_createForeground.call(this);
    if (titleType) {
      this.addChild(new REffectsTitle());
    }
  };

  // ------------------------------------------------------
  //
  // REffectsMenu : REffect for MenuBase.
  //
  function REffectsMenu() {
    this.initialize.apply(this, arguments);
  }

  REffectsMenu.prototype = Object.create(REffects.prototype);
  REffectsMenu.prototype.constructor = REffectsTitle;

  REffectsMenu.prototype.initialize = function () {
    REffects.prototype.initialize.call(this);
    this.effectType = currentScreenEffect();
  };

  REffectsMenu.prototype.updateReset = function () {};

  REffectsMenu.prototype.updateChangeType = function () {};

  const _Scene_MenuBase_create = Scene_MenuBase.prototype.create;
  Scene_MenuBase.prototype.create = function () {
    _Scene_MenuBase_create.call(this);
    if (currentScreenEffect()) {
      this.addChild(new REffectsMenu());
    }
  };
})();
