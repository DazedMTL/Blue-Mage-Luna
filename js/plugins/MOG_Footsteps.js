//===========================================================================
// MOG_Footsteps.js
// Translate to Japanese : fungamemake.com
//===========================================================================
/*:
 * @target MV MZ
 * @plugindesc (v1.1) Apresenta as pegadas do character em determinadas regioes.
 * @author Moghunter
 *
 * @param Duration
 * @desc Duracao da pegada.
 * @default 60
 *
 * @param X-Axis Offset
 * @desc Definicao X-Axis para ajustes.
 * @default 0
 *
 * @param Y-Axis Offset
 * @desc Definicao Y-Axis para ajustes.
 * @default 5
 *
 * @help
 * ===========================================================================
 * +++ MOG - Footsteps (v1.1) +++
 * By Moghunter
 * https://atelierrgss.wordpress.com/
 * ===========================================================================
 * Apresenta as pegadas do character em determinadas regioes.
 *
 * Arquivos necessarios (/img/system/)
 *
 * FootStep.png
 * WaterSplash.png
 *
 * ===========================================================================
 * PLUGIN COMMAND
 * ===========================================================================
 * Para ativar ou desativar o sistema use os comandos abaixo.
 *
 * disable_footsteps
 * enable_footsteps
 *
 * ===========================================================================
 * HITORICO
 * ===========================================================================
 * (v1.1) - Opcao de definir o grafico dos passos nos personagens.
 *        - Melhoria na animacao do splash.
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc (v1.1) 特定の地形タグでキャラクターの足跡を表示します。
 * @author Moghunter
 *
 * @param Duration
 * @text 足跡の表示時間
 * @default 60
 *
 * @param X-Axis Offset
 * @text X軸位置
 * @desc 正:右 / 負:左
 * @default 0
 *
 * @param Y-Axis Offset
 * @text Y軸位置
 * @desc 正:下 / 負:上
 * @default 5
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * ===========================================================================
 * +++ MOG - Footsteps (v1.1) +++
 * By Moghunter
 * https://atelierrgss.wordpress.com/
 * ===========================================================================
 * 特定の地形タグでキャラクターの足跡を表示します。
 *
 * 必要な画像ファイルを下記フォルダに保存してください。
 * (/img/system/)
 *
 * FootStep.png
 * WaterSplash.png
 *
 *地形タグ、足跡画像、足音SEはマップのメモ欄から指定するように変更しました。
 *
 *例：<fsName1:1,FootStep2,Equip3>
 *そのマップ内のタグ1の地形でFootStep2の足跡を表示し、Equip3のSEを鳴らします。
 *複数設定できますが、fsNameは連番にして空きを作らないで下さい。
 *
 *次に設定する例：<fsName2:3,FootStep,Equip1>
 *そのマップ内のタグ3の地形でFootStepの足跡を表示し、Equip1のSEを鳴らします。
 *
 * ===========================================================================
 * プラグインコマンド
 * ===========================================================================
 * 以下のプラグインコマンドでシステムを有効/無効にします。
 *
 * enable_footsteps
 * disable_footsteps
 *
 * @command disable_footsteps
 * @text 足跡を有効にする
 * @desc 足跡を有効にする
 *
 * @command enable_footsteps
 * @text 足跡を無効にする
 * @desc 足跡を無効にする
 *
 * ===========================================================================
 * 更新履歴
 * ===========================================================================
 * (v1.1) - キャラクターの足跡のグラフィックを設定するオプション
 *        - スプラッシュアニメーションの改善
 *
 */

//===========================================================================
// ** PLUGIN PARAMETERS
//===========================================================================

//(function() {
//    'use strict';

var Imported = Imported || {};
Imported.MOG_Footsteps = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters("MOG_Footsteps");
Moghunter.footStepD = Number(Moghunter.parameters["Duration"] || 60);
Moghunter.footStepX = Number(Moghunter.parameters["X-Axis Offset"] || 0);
Moghunter.footStepY = Number(Moghunter.parameters["Y-Axis Offset"] || 0);
Moghunter.waterSplashSE = String(
  Moghunter.parameters["Play WaterSplash SE"] || "false"
);

Moghunter.footStepName1 = String(
  Moghunter.parameters["FootStep File Name1"] || ""
);
Moghunter.footStepName2 = String(
  Moghunter.parameters["FootStep File Name2"] || ""
);
Moghunter.footStepName3 = String(
  Moghunter.parameters["FootStep File Name3"] || ""
);
Moghunter.footStepName4 = String(
  Moghunter.parameters["FootStep File Name4"] || ""
);
Moghunter.footStepName5 = String(
  Moghunter.parameters["FootStep File Name5"] || ""
);
Moghunter.footStepName6 = String(
  Moghunter.parameters["FootStep File Name6"] || ""
);
Moghunter.footStepName7 = String(
  Moghunter.parameters["FootStep File Name7"] || ""
);

Moghunter.footStepsTerrainTagID1 = Number(
  Moghunter.parameters["StepFoot Terrain ID1"] || 0
);
Moghunter.footStepsTerrainTagID2 = Number(
  Moghunter.parameters["StepFoot Terrain ID2"] || 0
);
Moghunter.footStepsTerrainTagID3 = Number(
  Moghunter.parameters["StepFoot Terrain ID3"] || 0
);
Moghunter.footStepsTerrainTagID4 = Number(
  Moghunter.parameters["StepFoot Terrain ID4"] || 0
);
Moghunter.footStepsTerrainTagID5 = Number(
  Moghunter.parameters["StepFoot Terrain ID5"] || 0
);
Moghunter.footStepsTerrainTagID6 = Number(
  Moghunter.parameters["StepFoot Terrain ID6"] || 0
);
Moghunter.footStepsTerrainTagID7 = Number(
  Moghunter.parameters["StepFoot Terrain ID7"] || 0
);

Moghunter.waterSplashSEFile1 = String(
  Moghunter.parameters["SE File Name1"] || ""
);
Moghunter.waterSplashSEFile2 = String(
  Moghunter.parameters["SE File Name2"] || ""
);
Moghunter.waterSplashSEFile3 = String(
  Moghunter.parameters["SE File Name3"] || ""
);
Moghunter.waterSplashSEFile4 = String(
  Moghunter.parameters["SE File Name4"] || ""
);
Moghunter.waterSplashSEFile5 = String(
  Moghunter.parameters["SE File Name5"] || ""
);
Moghunter.waterSplashSEFile6 = String(
  Moghunter.parameters["SE File Name6"] || ""
);
Moghunter.waterSplashSEFile7 = String(
  Moghunter.parameters["SE File Name7"] || ""
);

var _Game_Map_setup_FS = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (mapId) {
  _Game_Map_setup_FS.call(this, mapId);
  this.setupFootStep();
};

Game_Map.prototype.setupFootStep = function () {
  if ($dataMap.meta) {
    var actor = $gameParty.leader();
    if (actor) {
      var index = 1;
      var settings = {};
      while ("fsName" + index in $dataMap.meta) {
        settings[index] = $dataMap.meta["fsName" + index].split(",");
        index++;
      }

      if (settings[1]) {
        Moghunter.footStepsTerrainTagID1 = Number(settings[1][0] || 0);
        Moghunter.footStepName1 = String(settings[1][1] || "");
        Moghunter.waterSplashSEFile1 = String(settings[1][2] || "");
      }

      if (settings[2]) {
        Moghunter.footStepsTerrainTagID2 = Number(settings[2][0] || 0);
        Moghunter.footStepName2 = String(settings[2][1] || "");
        Moghunter.waterSplashSEFile2 = String(settings[2][2] || "");
      }

      if (settings[3]) {
        Moghunter.footStepsTerrainTagID3 = Number(settings[3][0] || 0);
        Moghunter.footStepName3 = String(settings[3][1] || "");
        Moghunter.waterSplashSEFile3 = String(settings[3][2] || "");
      }

      if (settings[4]) {
        Moghunter.footStepsTerrainTagID4 = Number(settings[4][0] || 0);
        Moghunter.footStepName4 = String(settings[4][1] || "");
        Moghunter.waterSplashSEFile4 = String(settings[4][2] || "");
      }

      if (settings[5]) {
        Moghunter.footStepsTerrainTagID5 = Number(settings[5][0] || 0);
        Moghunter.footStepName5 = String(settings[5][1] || "");
        Moghunter.waterSplashSEFile5 = String(settings[5][2] || "");
      }

      if (settings[6]) {
        Moghunter.footStepsTerrainTagID6 = Number(settings[6][0] || 0);
        Moghunter.footStepName6 = String(settings[6][1] || "");
        Moghunter.waterSplashSEFile6 = String(settings[6][2] || "");
      }

      if (settings[7]) {
        Moghunter.footStepsTerrainTagID7 = Number(settings[7][0] || 0);
        Moghunter.footStepName7 = String(settings[7][1] || "");
        Moghunter.waterSplashSEFile7 = String(settings[7][2] || "");
      }
    }

    $gamePlayer.refresh();
  }
};

//===========================================================================
// ** Game System
//===========================================================================

//==============================
// * Initialize
//==============================
var _mog_footStep_Gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
  _mog_footStep_Gsys_initialize.call(this);
  this._footStepSpriteData = [];
  this._footStepMapID = 0;
  this._footStepVisible = true;
};

//===========================================================================
// ** Game Interpreter
//===========================================================================

//==============================
// * PluginCommand
//==============================
PluginManager.registerCommand("MOG_Footsteps", "disable_footsteps", (args) => {
  $gameSystem._footStepVisible = true;
  return true;
});

PluginManager.registerCommand("MOG_Footsteps", "enable_footsteps", (args) => {
  $gameSystem._footStepVisible = false;
  return true;
});

//===========================================================================
// ** Sound Manager
//===========================================================================

//==============================
// * Play Step SE
//==============================
SoundManager.playStepSE = function (fileName) {
  var se = {};
  se.name = fileName;
  se.pitch = 100;
  se.volume = 100;
  AudioManager.playSe(se);
};

//===========================================================================
// ** Game Battler
//===========================================================================

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function () {
  if (this.isEnemy()) {
    return this.enemy().note.split(/[\r\n]+/);
  }
  if (this.isActor()) {
    return this.actor().note.split(/[\r\n]+/);
  }
};

//===========================================================================
// ** Game Event
//===========================================================================
//==============================
// * Setup Page
//==============================
var _mog_footStep_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function () {
  _mog_footStep_gevent_setupPage.call(this);
  this.checkFootStep();
};

//==============================
// * Check Foot Sptep
//==============================
Game_Event.prototype.checkFootStep = function () {
  if (!this._erased && this.page()) {
    this.list().forEach(function (l) {
      if (l.code === 108) {
        var comment = l.parameters[0].split(": ");
        if (comment[0].toLowerCase() == "footstep_sprite ") {
          this._footSteps[3] = String(comment[1]);
        } else if (comment[0].toLowerCase() == "disable_footstep") {
          this._footSteps[8] = false;
        }
      }
    }, this);
  }
};

//===========================================================================
// ** Scene Map
//===========================================================================

//==============================
// * Terminate
//==============================
var _mog_footstep_scMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function () {
  _mog_footstep_scMap_terminate.call(this);
  if (this._spriteset) {
    this._spriteset.recordFootStepData();
  }
};

//===========================================================================
// ** Spriteset Map
//===========================================================================

//==============================
// * record Foot Step Data
//==============================
Spriteset_Map.prototype.recordFootStepData = function () {
  if (!this._footSteps) {
    return;
  }
  for (var i = 0; i < this._footSteps.length; i++) {
    this._footSteps[i].recordData();
  }
};

//==============================
// * create Characters
//==============================
var _mog_footsteps_sprmap_createCharacters =
  Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function () {
  _mog_footsteps_sprmap_createCharacters.call(this);
  this.createFootstepsSprites();
};

//==============================
// * create Footsteps Sprites
//==============================
Spriteset_Map.prototype.createFootstepsSprites = function () {
  if ($gameSystem._footStepMapID != $gameMap._mapId) {
    $gameSystem._footStepSpriteData = [];
  }
  this._footSteps = [];
  for (var i = 0; i < this._characterSprites.length; i++) {
    this._footSteps[i] = new FootStepsSprites(this._characterSprites[i], i);
    this._tilemap.addChild(this._footSteps[i]);
  }
  $gameSystem._footStepMapID = $gameMap._mapId;
  $gameSystem._footStepSpriteData = [];
};

//===========================================================================
// ** Game CharacterBase
//===========================================================================

//==============================
// * create Characters
//==============================
var _mog_footstep_gchar_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function () {
  _mog_footstep_gchar_initMembers.call(this);
  this._footSteps = [
    false,
    0,
    0,
    String(Moghunter.footStepName1),
    0,
    0,
    0,
    1,
    true,
    1.0,
  ];
};

//==============================
// * Set Position
//==============================
var _mog_footsteps_gcharbase_setPosition =
  Game_CharacterBase.prototype.setPosition;
Game_CharacterBase.prototype.setPosition = function (x, y) {
  _mog_footsteps_gcharbase_setPosition.call(this, x, y);
  this._footSteps[0] = false;
  this._footSteps[4] = x;
  this._footSteps[5] = y;
  this._footSteps[1] = x;
  this._footSteps[2] = y;
};

//==============================
// * Update
//==============================
var _mog_footstep_gchar_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function () {
  _mog_footstep_gchar_update.call(this);
  this.updateFootSteps();
};

//==============================
// * Update Foot Steps
//==============================
Game_CharacterBase.prototype.updateFootSteps = function () {
  if (this.needCreateFootSteps()) {
    this.prepareFootSteps();
  } else {
    this._footSteps[4] = this._x;
    this._footSteps[5] = this._y;
    this._footSteps[1] = this._x;
    this._footSteps[2] = this._y;
  }
};

//==============================
// * prepare Foot Steps
//==============================
//var terrainTagG = 0;
Game_CharacterBase.prototype.prepareFootSteps = function () {
  var terrainTag = $gameMap.terrainTag(this._footSteps[1], this._footSteps[2]);
  this.terrainTagG = terrainTag;

  if (
    terrainTag === Moghunter.footStepsTerrainTagID1 ||
    terrainTag === Moghunter.footStepsTerrainTagID2 ||
    terrainTag === Moghunter.footStepsTerrainTagID3 ||
    terrainTag === Moghunter.footStepsTerrainTagID4 ||
    terrainTag === Moghunter.footStepsTerrainTagID5 ||
    terrainTag === Moghunter.footStepsTerrainTagID6 ||
    terrainTag === Moghunter.footStepsTerrainTagID7
  ) {
    this._footSteps[0] = true;
    this._footSteps[4] = this._footSteps[1];
    this._footSteps[5] = this._footSteps[2];
    this._footSteps[6] = 0;
    this._footSteps[7] = 1;
    this._footSteps[9] = 1.0;
    if (this._type && this.isBoat()) {
      this._footSteps[0] = false;
    }
  }

  this._footSteps[1] = this._x;
  this._footSteps[2] = this._y;
};

//==============================
// * Need Create Foot Steps
//==============================
Game_CharacterBase.prototype.needCreateFootSteps = function () {
  if (!this._footSteps[8]) {
    return false;
  }
  if (this._vehicleGettingOn) {
    return false;
  }
  if (this._vehicleGettingOff) {
    return false;
  }
  if (this._opacity === 0) {
    return false;
  }
  if (this._transparent) {
    return false;
  }
  if (this._visible === false) {
    return false;
  }
  if (this._characterName === "") {
    return false;
  }
  if (this._footSteps[1] != this._x) {
    return true;
  }
  if (this._footSteps[2] != this._y) {
    return true;
  }
  return false;
};

//==============================
// * scrollexX Step
//==============================
Game_CharacterBase.prototype.scrolledXStep = function () {
  return $gameMap.adjustX(this._footSteps[4]);
};

//==============================
// * scrollexY Step
//==============================
Game_CharacterBase.prototype.scrolledYStep = function () {
  return $gameMap.adjustY(this._footSteps[5]);
};

//==============================
// * screen X Step
//==============================
Game_CharacterBase.prototype.screenXStep = function () {
  var tw = $gameMap.tileWidth();
  return Math.round(this.scrolledXStep() * tw + tw / 2);
};

//==============================
// * screen Y Step
//==============================
Game_CharacterBase.prototype.screenYStep = function () {
  var th = $gameMap.tileHeight();
  return Math.round(
    this.scrolledYStep() * th + th - this.shiftY() - this.jumpHeight()
  );
};

//===========================================================================
// ** Game Vehicle
//===========================================================================

//==============================
// * Initialize
//==============================
var _mog_footStep_gveh_initialize = Game_Vehicle.prototype.initialize;
Game_Vehicle.prototype.initialize = function (type) {
  _mog_footStep_gveh_initialize.call(this, type);
  if (!this.isBoat()) {
    this._footSteps[8] = false;
  }
};

//===========================================================================
// ** FootStepsSprites
//===========================================================================
function FootStepsSprites() {
  this.initialize.apply(this, arguments);
}
FootStepsSprites.prototype = Object.create(Sprite.prototype);
FootStepsSprites.prototype.constructor = FootStepsSprites;

//==============================
// * Initialize
//==============================
FootStepsSprites.prototype.initialize = function (sprite, id) {
  Sprite.prototype.initialize.call(this);
  this._id = id;
  this.z = 0;
  this._sprite = sprite;
  this._character = this._sprite._character;
  this._footsprites = [];
  this._splashSE = String(Moghunter.waterSplashSE) === "true" ? true : false;
  if ($gameSystem._footStepSpriteData[this._id]) {
    this.reloadSprites();
  }
  this._visible = true;
};

//==============================
// * Reload Sprites
//==============================
FootStepsSprites.prototype.reloadSprites = function () {
  var data = $gameSystem._footStepSpriteData[this._id];
  for (i = 0; i < data.length; i++) {
    this._footsprites[i] = new Sprite(ImageManager.loadSystem(data[i]._name));
    this._footsprites[i].anchor.x = 0.5;
    this._footsprites[i].anchor.y = 0.5;
    this._footsprites[i]._name = data[i]._name;
    this._footsprites[i].opacity = data[i].opacity;
    this._footsprites[i]._rx = data[i]._rx;
    this._footsprites[i]._ry = data[i]._ry;
    this._footsprites[i]._duration = data[i]._duration;
    this._footsprites[i]._dir = data[i]._dir;
    this._footsprites[i]._mode = data[i]._mode;
    this._footsprites[i].scale.x = data[i].scaleX;
    this._footsprites[i].scale.y = data[i].scaleY;
    this._footsprites[i]._wait = data[i]._wait;
    this._footsprites[i].visible = data[i].visible;
    this._footsprites[i]._wait = data[i]._wait;
    this.setDirection(this._footsprites[i]);
    this.updatePosition(this._footsprites[i]);
    this.addChild(this._footsprites[i]);
  }
};

//==============================
// * Foot Step NAme
//==============================
FootStepsSprites.prototype.footStepName1 = function () {
  return String(Moghunter.footStepName1);
};
//==============================
// * Foot Step NAme
//==============================
FootStepsSprites.prototype.footStepName2 = function () {
  return String(Moghunter.footStepName2);
};
//==============================
// * Foot Step NAme
//==============================
FootStepsSprites.prototype.footStepName3 = function () {
  return String(Moghunter.footStepName3);
};
//==============================
// * Foot Step NAme
//==============================
FootStepsSprites.prototype.footStepName4 = function () {
  return String(Moghunter.footStepName4);
};
//==============================
// * Foot Step NAme
//==============================
FootStepsSprites.prototype.footStepName5 = function () {
  return String(Moghunter.footStepName5);
};
//==============================
// * Foot Step NAme
//==============================
FootStepsSprites.prototype.footStepName6 = function () {
  return String(Moghunter.footStepName6);
};
//==============================
// * Foot Step NAme
//==============================
FootStepsSprites.prototype.footStepName7 = function () {
  return String(Moghunter.footStepName7);
};

//==============================
// * Update Duration
//==============================
FootStepsSprites.prototype.playSplashSound = function () {
  if (this._character.terrainTagG === Moghunter.footStepsTerrainTagID1) {
    SoundManager.playStepSE(String(Moghunter.waterSplashSEFile1));
  }
  if (this._character.terrainTagG === Moghunter.footStepsTerrainTagID2) {
    SoundManager.playStepSE(String(Moghunter.waterSplashSEFile2));
  }
  if (this._character.terrainTagG === Moghunter.footStepsTerrainTagID3) {
    SoundManager.playStepSE(String(Moghunter.waterSplashSEFile3));
  }
  if (this._character.terrainTagG === Moghunter.footStepsTerrainTagID4) {
    SoundManager.playStepSE(String(Moghunter.waterSplashSEFile4));
  }
  if (this._character.terrainTagG === Moghunter.footStepsTerrainTagID5) {
    SoundManager.playStepSE(String(Moghunter.waterSplashSEFile5));
  }
  if (this._character.terrainTagG === Moghunter.footStepsTerrainTagID6) {
    SoundManager.playStepSE(String(Moghunter.waterSplashSEFile6));
  }
  if (this._character.terrainTagG === Moghunter.footStepsTerrainTagID7) {
    SoundManager.playStepSE(String(Moghunter.waterSplashSEFile7));
  }
};

//==============================
// * Record Data
//==============================
FootStepsSprites.prototype.recordData = function () {
  if (!this._footsprites) {
    return;
  }
  $gameSystem._footStepSpriteData[this._id] = [];
  for (i = 0; i < this._footsprites.length; i++) {
    var sprite = this._footsprites[i];
    $gameSystem._footStepSpriteData[this._id][i] = {};
    $gameSystem._footStepSpriteData[this._id][i]._name = sprite._name;
    $gameSystem._footStepSpriteData[this._id][i].opacity = sprite.opacity;
    $gameSystem._footStepSpriteData[this._id][i]._rx = sprite._rx;
    $gameSystem._footStepSpriteData[this._id][i]._ry = sprite._ry;
    $gameSystem._footStepSpriteData[this._id][i]._duration = sprite._duration;
    $gameSystem._footStepSpriteData[this._id][i]._dir = sprite._dir;
    $gameSystem._footStepSpriteData[this._id][i]._mode = sprite._mode;
    $gameSystem._footStepSpriteData[this._id][i].scaleX = sprite.scale.x;
    $gameSystem._footStepSpriteData[this._id][i].scaleY = sprite.scale.y;
    $gameSystem._footStepSpriteData[this._id][i]._wait = sprite._wait;
    $gameSystem._footStepSpriteData[this._id][i].visible = sprite.visible;
  }
};

//==============================
// * Create Foot Steps
//==============================
FootStepsSprites.prototype.createFootSteps = function () {
  this._character._footSteps[0] = false;

  var terrainTag = this._character.terrainTagG;

  if (terrainTag === Moghunter.footStepsTerrainTagID1) {
    var name = this.footStepName1();
  }
  if (terrainTag === Moghunter.footStepsTerrainTagID2) {
    var name = this.footStepName2();
  }
  if (terrainTag === Moghunter.footStepsTerrainTagID3) {
    var name = this.footStepName3();
  }
  if (terrainTag === Moghunter.footStepsTerrainTagID4) {
    var name = this.footStepName4();
  }
  if (terrainTag === Moghunter.footStepsTerrainTagID5) {
    var name = this.footStepName5();
  }
  if (terrainTag === Moghunter.footStepsTerrainTagID6) {
    var name = this.footStepName6();
  }
  if (terrainTag === Moghunter.footStepsTerrainTagID7) {
    var name = this.footStepName7();
  }

  this._footsprites.push(new Sprite(ImageManager.loadSystem(name)));
  var id = this._footsprites.length - 1;
  this._footsprites[id]._name = name;
  this._footsprites[id]._rx =
    this._character.screenXStep() - this.screenX() + Moghunter.footStepX;
  this._footsprites[id]._ry =
    this._character.screenYStep() - this.screenY() + Moghunter.footStepY;
  if (this._character._footSteps[6] === 1) {
    var yf = 10 - this._character._footSteps[9] * 5.0;
    var yf2 = Math.min(Math.max(yf, 0), 10);
    this._footsprites[id]._ry += yf2;
  }
  this._footsprites[id].anchor.x = 0.5;
  this._footsprites[id].anchor.y = 0.5;
  this._footsprites[id].scale.x = this._character._footSteps[9];
  this._footsprites[id].scale.y = this._character._footSteps[9];
  var d = this._character._footSteps[6] === 0 ? Moghunter.footStepD : 30;
  this._footsprites[id]._duration = Math.min(Math.max(d, 1), 999);
  this._footsprites[id]._dir = this._character.direction();
  this._footsprites[id]._mode = this._character._footSteps[6];
  this._footsprites[id]._wait = this._character._footSteps[7];
  this._footsprites[id].visible = false;
  this.setDirection(this._footsprites[id]);
  this.addChild(this._footsprites[id]);
};

//==============================
// * set Direction
//==============================
FootStepsSprites.prototype.setDirection = function (sprite) {
  if (sprite._mode != 0) {
    return;
  }
  if (sprite._dir === 4) {
    sprite.rotation = 1.6;
  } else if (sprite._dir === 6) {
    sprite.rotation = -1.6;
  } else if (sprite._dir === 8) {
    sprite.rotation = 3.15;
  } else {
    sprite.rotation = 0;
  }
};

//==============================
// * screen Y
//==============================
FootStepsSprites.prototype.screenX = function () {
  return -($gameMap.displayX() * $gameMap.tileWidth());
};

//==============================
// * screen Y
//==============================
FootStepsSprites.prototype.screenY = function () {
  return -($gameMap.displayY() * $gameMap.tileHeight());
};

//==============================
// * Update Splash
//==============================
FootStepsSprites.prototype.updateSplash = function (sprite) {
  sprite.scale.x += 0.02;
  sprite.scale.y += 0.01;
  sprite.opacity -= 7;
};

//==============================
// * Update Position
//==============================
FootStepsSprites.prototype.updatePosition = function (sprite) {
  sprite.x = this.screenX() + sprite._rx;
  sprite.y = this.screenY() + sprite._ry - sprite.bitmap.height / 2;
};

//==============================
// * Update Duration
//==============================
FootStepsSprites.prototype.updateDuration = function (i) {
  if (this._footsprites[i].opacity > 0) {
    this._footsprites[i].opacity -= 2;
    return;
  }
  this.removeChild(this._footsprites[i]);
  this._footsprites.splice(i, 1);
};

//==============================
// * Update Initial
//==============================
FootStepsSprites.prototype.updateInitial = function (i) {
  this._footsprites[i]._wait--;
  if (this._footsprites[i]._wait === 0) {
    this._footsprites[i].visible = true;
    //		if (this._splashSE && this._footsprites[i]._mode === 1) { this.playSplashSound() };
    //		if (this._splashSE) { this.playSplashSound() };
    this.playSplashSound();
  }
};

//==============================
// * Update Sprites
//==============================
FootStepsSprites.prototype.updateSprites = function (i) {
  this.updatePosition(this._footsprites[i]);
  if (!this._visible) {
    this._footsprites[i].opacity -= 10;
    this._footsprites[i]._duration = 0;
    this.updateDuration(i);
    return;
  }
  if (this._footsprites[i]._wait > 0) {
    this.updateInitial(i);
  } else {
    if (this._footsprites[i]._mode === 1) {
      this.updateSplash(this._footsprites[i]);
    }
    if (this._footsprites[i]._duration > 0) {
      this._footsprites[i]._duration--;
    } else {
      this.updateDuration(i);
    }
  }
};

//==============================
// * Update
//==============================
FootStepsSprites.prototype.update = function () {
  Sprite.prototype.update.call(this);
  this._visible = !$gameSystem._footStepVisible ? false : this._sprite.visible;
  if (this._character._footSteps[0]) {
    this.createFootSteps();
  }
  if (!this._footsprites) {
    return;
  }
  for (i = 0; i < this._footsprites.length; i++) {
    this.updateSprites(i);
  }
};

//})();
