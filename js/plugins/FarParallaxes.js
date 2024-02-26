//=============================================================================
// FarParallaxes.js
//=============================================================================

/*:ja
 * @plugindesc 水中より下に表示させる一番遠い遠景
 * @author Lib
 *
 * @help
 * 水中より下に表示される遠遠景を表示します。
 *
 * 使用する画像ファイルは、img/parallaxes に置いてください。
 * 併用する場合はForegroundとWaterCustomの間に置いて下さい。
 *
 *
 * マップのメモ:
 * 以下の5項目を書いてください(設定項目は、遠景と似ています)。
 *  <fName:ファイル名> 前景として使うファイル名です（拡張子なし）
 *    名前が '!'で始まる場合、遠景同様視差ゼロとなります。
 *    ファイルは img/parallaxes に置いてください
 *
 * 例：
 * <fName:sample1>
 * sample1.png が遠遠景になります。
 *
 * <fName:!sample1>
 * 視差ゼロで!sample1.png が表示されます。
 *
 * プラグインコマンド:
 * RemakeFarParallaxes            # ファイルを指定して遠遠景を作りなおす。
 *
 * @command RemakeFarParallaxes
 * @text 遠遠景をリメイクする
 * @desc 遠遠景をリメイクする
 * @arg arg1
 * @text 遠遠景画像名
 * @desc 遠遠景画像名
 *
 */

var KMS = KMS || {};

(function () {
  KMS.imported = KMS.imported || {};
  KMS.imported["FarParallaxes"] = true;

  var pluginParams = PluginManager.parameters("FarParallaxes");
  var Param = {};
  Param.imageDir = "img/system/";

  ("use strict");

  //=======================
  // PluginManager
  //  プラグインコマンドを追加定義します。
  //=======================
  PluginManager.registerCommand(
    "FarParallaxes",
    "RemakeFarParallaxes",
    (args) => {
      var FarParallaxesName = args.arg1;
      $gameMap._FarParallaxesName = FarParallaxesName;
    }
  );

  //-----------------------------------------------------------------------------
  // KMS_FarParallaxes
  KMS_FarParallaxes = function () {
    this._dispSprite = new Sprite();
    this.lastX = 0;
    this.lastY = 0;
    this._dispSprite.x = 0;
    this._dispSprite.y = 0;
    this._underSprite = new Sprite();
  };

  /*
   * エフェクトの生成
   *
   * ※ 必ず画像のロードが完了した後に呼ぶこと
   */
  Object.defineProperty(KMS_FarParallaxes.prototype, "dispSprite", {
    get: function () {
      return this._dispSprite;
    },
  });

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  Spriteset_Map.prototype.createFarParallaxes = function () {
    if ($dataMap && $dataMap.meta.FarParallaxes) {
      this._FarParallaxes = new KMS_FarParallaxes();
    }
  };

  var _Spriteset_Map_createLowerLayer =
    Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function () {
    _Spriteset_Map_createLowerLayer.call(this);

    this.createFarParallaxes();
    this._baseSprite.addChild(this._FarParallaxes);
    this.sortSprites();
  };

  var _Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    _Spriteset_Map_update.call(this);
    this.updateFarParallaxes();
  };

  Spriteset_Map.prototype.createFarParallaxes = function () {
    this._FarParallaxes = new TilingSprite();
    this._FarParallaxes.move(0, 0, Graphics.width, Graphics.height);
    this._baseSprite.addChild(this._FarParallaxes);
  };

  Spriteset_Map.prototype.updateFarParallaxes = function () {
    if (this._FarParallaxesName !== $gameMap.FarParallaxesName()) {
      this._FarParallaxesName = $gameMap.FarParallaxesName();
      this._FarParallaxes.bitmap = ImageManager.loadParallax(
        this._FarParallaxesName
      );
    }
    if (this._FarParallaxes.bitmap) {
      this._FarParallaxes.origin.x = $gameMap.FarParallaxesOx();
      this._FarParallaxes.origin.y = $gameMap.FarParallaxesOy();
    }
  };

  var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "RemakeFarParallaxes") {
      var FarParallaxesName = args[0];
      $gameMap._FarParallaxesName = FarParallaxesName;
    }
  };

  ImageManager.isZeroFarParallaxes = function (filename) {
    return filename.charAt(0) === "!";
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  var _Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function () {
    _Game_Map_initialize.call(this);
    this.initFarParallaxes();
  };

  Game_Map.prototype.initFarParallaxes = function () {
    this._FarParallaxesDefined = true;
    this._FarParallaxesName = "";
    this._FarParallaxesZero = false;
    this._FarParallaxesSx = 0;
    this._FarParallaxesSy = 0;
    this._FarParallaxesX = 0;
    this._FarParallaxesY = 0;
    this.charSpeedX = 0;
    this.charSpeedY = 0;
  };

  Game_Map.prototype.guardFarParallaxes = function () {
    if (!this._FarParallaxesDefined) {
      this.initFarParallaxes();
    }
  };

  Game_Map.prototype.FarParallaxesName = function () {
    this.guardFarParallaxes();
    return this._FarParallaxesName;
  };

  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function (mapId) {
    _Game_Map_setup.call(this, mapId);
    this.setupFarParallaxes();
  };

  Game_Map.prototype.setupFarParallaxes = function () {
    this._FarParallaxesName = $dataMap.meta.fName || "";
    this._FarParallaxesZero = ImageManager.isZeroFarParallaxes(
      this._FarParallaxesName
    );
    this._FarParallaxesSx = Number($dataMap.meta.fSx) || 0;
    this._FarParallaxesSy = Number($dataMap.meta.fSy) || 0;
    this._FarParallaxesX = 0;
    this._FarParallaxesY = 0;
  };

  var _Game_Map_setDisplayPos = Game_Map.prototype.setDisplayPos;
  Game_Map.prototype.setDisplayPos = function (x, y) {
    _Game_Map_setDisplayPos.call(this, x, y);
    this.guardFarParallaxes();

    const endX = this.width() - this.screenTileX();
    this._displayX = endX < 0 ? endX / 2 : x.clamp(0, endX);
    this._FarParallaxesX = this._displayX;

    const endY = this.height() - this.screenTileY();
    this._displayY = endY < 0 ? endY / 2 : y.clamp(0, endY);
    this._FarParallaxesY = this._displayY;
  };

  Game_Map.prototype.FarParallaxesOx = function () {
    this.guardFarParallaxes();
    if (this._FarParallaxesZero) {
      return this._FarParallaxesX * this.tileWidth();
    } else {
      return 0;
    }
  };

  Game_Map.prototype.FarParallaxesOy = function () {
    this.guardFarParallaxes();
    if (this._FarParallaxesZero) {
      return this._FarParallaxesY * this.tileHeight();
    } else {
      return 0;
    }
  };
})();
