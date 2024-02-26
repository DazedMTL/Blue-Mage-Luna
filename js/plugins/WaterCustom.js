//=============================================================================
// WaterCustom.js
//=============================================================================

/*:ja
 * @plugindesc 遠景より下に表示する水中遠景
 * @author Lib TOMY (Kamesoft) 神無月サスケ
 *
 * @help
 * 遠景マップより下に表示される水エフェクト付き遠遠景を表示します。
 * エフェクト挙動はFilterControllerMZ.jsに任せたため、
 * 水中遠景を作る機能のみ残っています。
 *
 * Foreground(神無月サスケ氏作)とKMS_WaterMapEffects(TOMY氏作)を組み合わせた
 * カスタムプラグインです。
 * 使用する画像ファイルは、img/parallaxes に置いてください。
 * 併用する場合はForegroundより上に置いて下さい。
 *
 * マップのメモ:
 * 以下の5項目を書いてください(設定項目は、遠景と似ています)。
 *  <wName:ファイル名> 前景として使うファイル名です（拡張子なし）
 *    名前が '!'で始まる場合、遠景同様視差ゼロとなります。
 *    ファイルは img/parallaxes に置いてください
 *  <wLoopX:数字> X座標にループするかどうか  (0:no 1:yes)。
 *    省略時は0(=no)になります。
 *  <wLoopY:number> Y座標にループするかどうか  (0:no 1:yes)。
 *    省略時は0(=no)になります。
 *
 * 例：
 * <wName:sample1><wLoopX:1><wLoopY:1>
 * sample1.png が水中遠景になり、斜め上にループします。
 *
 * <wName:!sample1>
 * 視差ゼロで!sample1.png が表示されます。
 *
 * プラグインコマンド:
 * RemakeWater            # ファイルを指定して水中遠景を作りなおす。
 *
 * @command RemakeWater
 * @text 水中をリメイクする
 * @desc 水中をリメイクする
 * @arg arg1
 * @text 水中画像名
 * @desc 水中画像名
 *
 */

var KMS = KMS || {};

(function () {
  KMS.imported = KMS.imported || {};
  KMS.imported["WaterCustom"] = true;

  var pluginParams = PluginManager.parameters("WaterCustom");
  var Param = {};
  Param.imageDir = "img/system/";

  ("use strict");

  //=======================
  // PluginManager
  //  プラグインコマンドを追加定義します。
  //=======================
  PluginManager.registerCommand("WaterCustom", "RemakeWater", (args) => {
    var WaterName = args.arg1;
    $gameMap._waterName = WaterName;
  });

  //-----------------------------------------------------------------------------
  // KMS_WaterEffect
  KMS_WaterEffect = function () {
    this._dispSprite = new Sprite();
    this.lastX = 0;
    this.lastY = 0;
    this._dispSprite.x = 0;
    this._dispSprite.y = 0;
    this._underSprite = new Sprite(); //水中用
  };

  /*
   * エフェクトの生成
   *
   * ※ 必ず画像のロードが完了した後に呼ぶこと
   */
  Object.defineProperty(KMS_WaterEffect.prototype, "dispSprite", {
    get: function () {
      return this._dispSprite;
    },
  });

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  Spriteset_Map.prototype.createWaterMapEffect = function () {
    if ($dataMap && $dataMap.meta.WaterEffect) {
      this._waterEffect = new KMS_WaterEffect();
    }
  };

  var _KMS_WaterMapEffect_Spriteset_Map_initialize =
    Spriteset_Map.prototype.initialize;
  Spriteset_Map.prototype.initialize = function () {
    _KMS_WaterMapEffect_Spriteset_Map_initialize.call(this);

    this.createWaterMapEffect();
    if (this._waterEffect) {
      this._baseSprite.addChild(this._waterEffect.dispSprite);
    }
  };

  var _Spriteset_Map_createLowerLayer =
    Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function () {
    _Spriteset_Map_createLowerLayer.call(this);

    this.createWater();
    this.sortSprites();
  };

  //順番並び替え
  Spriteset_Map.prototype.sortSprites = function () {
    this._baseSprite.removeChild(this._parallax);
    this._baseSprite.removeChild(this._tilemap);
    this._baseSprite.addChild(this._water); //水は一番下
    this._baseSprite.addChild(this._parallax);
    this._baseSprite.addChild(this._tilemap);
  };

  var _Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    _Spriteset_Map_update.call(this);
    this.updateWater();
  };

  Spriteset_Map.prototype.createWater = function () {
    this._water = new TilingSprite();
    this._water.move(0, 0, Graphics.width, Graphics.height);
  };

  Spriteset_Map.prototype.updateWater = function () {
    if (this._waterName !== $gameMap.waterName()) {
      this._waterName = $gameMap.waterName();
      this._water.bitmap = ImageManager.loadParallax(this._waterName);
    }
    if (this._water.bitmap) {
      this._water.origin.x = $gameMap.waterOx();
      this._water.origin.y = $gameMap.waterOy();
    }
  };

  var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "RemakeWater") {
      var WaterName = args[0];
      $gameMap._waterName = WaterName;
    }
  };

  ImageManager.isZeroWater = function (filename) {
    return filename.charAt(0) === "!";
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  var _Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function () {
    _Game_Map_initialize.call(this);
    this.initWater();
  };

  Game_Map.prototype.initWater = function () {
    this._waterDefined = true;
    this._waterName = "";
    this._waterZero = false;
    this._waterLoopX = false;
    this._waterLoopY = false;
    this._waterSx = 0;
    this._waterSy = 0;
    this._waterX = 0;
    this._waterY = 0;
    this.charSpeedX = 0;
    this.charSpeedY = 0;
  };

  Game_Map.prototype.guardWater = function () {
    if (!this._waterDefined) {
      this.initWater();
    }
  };

  Game_Map.prototype.waterName = function () {
    this.guardWater();
    return this._waterName;
  };

  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function (mapId) {
    _Game_Map_setup.call(this, mapId);
    this.setupWater();
  };

  Game_Map.prototype.setupWater = function () {
    this._waterName = $dataMap.meta.wName || "";
    this._waterZero = ImageManager.isZeroWater(this._waterName);
    this._waterLoopX = !!$dataMap.meta.wLoopX;
    this._waterLoopY = !!$dataMap.meta.wLoopY;
    this._waterSx = Number($dataMap.meta.wSx) || 0;
    this._waterSy = Number($dataMap.meta.wSy) || 0;
    this._waterX = 0;
    this._waterY = 0;
  };

  var _Game_Map_setDisplayPos = Game_Map.prototype.setDisplayPos;
  Game_Map.prototype.setDisplayPos = function (x, y) {
    _Game_Map_setDisplayPos.call(this, x, y);
    this.guardWater();
    if (this.isLoopHorizontal()) {
      this._waterX = x;
    } else {
      this._waterX = this._displayX;
    }
    if (this.isLoopVertical()) {
      this._waterY = y;
    } else {
      this._waterY = this._displayY;
    }
  };

  Game_Map.prototype.waterOx = function () {
    this.guardWater();
    if (this._waterZero) {
      return this._waterX * this.tileWidth();
    } else if (this._waterLoopX) {
      return (this._waterX * this.tileWidth()) / 2;
    } else {
      return 0;
    }
  };

  Game_Map.prototype.waterOy = function () {
    this.guardWater();
    if (this._waterZero) {
      return this._waterY * this.tileHeight();
    } else if (this._waterLoopY) {
      return (this._waterY * this.tileHeight()) / 2;
    } else {
      return 0;
    }
  };

  var _Game_Map_scrollDown = Game_Map.prototype.scrollDown;
  Game_Map.prototype.scrollDown = function (distance) {
    var lastY = this._displayY;
    _Game_Map_scrollDown.call(this, distance);
    this.guardWater();
    if (this.isLoopVertical()) {
      if (this._waterLoopY) {
        this._waterY += distance;
      }
    } else if (this.height() >= this.screenTileY()) {
      var displayY = Math.min(
        lastY + distance,
        this.height() - this.screenTileY()
      );
      this._waterY += displayY - lastY;
    }
  };

  var _Game_Map_scrollLeft = Game_Map.prototype.scrollLeft;
  Game_Map.prototype.scrollLeft = function (distance) {
    var lastX = this._displayX;
    _Game_Map_scrollLeft.call(this, distance);
    this.guardWater();
    if (this.isLoopHorizontal()) {
      if (this._waterLoopX) {
        this._waterX -= distance;
      }
    } else if (this.width() >= this.screenTileX()) {
      var displayX = Math.max(lastX - distance, 0);
      this._waterX += displayX - lastX;
    }
  };

  var _Game_Map_scrollRight = Game_Map.prototype.scrollRight;
  Game_Map.prototype.scrollRight = function (distance) {
    var lastX = this._displayX;
    _Game_Map_scrollRight.call(this, distance);
    this.guardWater();
    if (this.isLoopHorizontal()) {
      if (this._waterLoopX) {
        this._waterX += distance;
      }
    } else if (this.width() >= this.screenTileX()) {
      var displayX = Math.min(
        lastX + distance,
        this.width() - this.screenTileX()
      );
      this._waterX += displayX - lastX;
    }
  };

  var _Game_Map_scrollUp = Game_Map.prototype.scrollUp;
  Game_Map.prototype.scrollUp = function (distance) {
    var lastY = this._displayY;
    _Game_Map_scrollUp.call(this, distance);
    this.guardWater();
    if (this.isLoopVertical()) {
      if (this._waterLoopY) {
        this._waterY -= distance;
      }
    } else if (this.height() >= this.screenTileY()) {
      var displayY = Math.max(lastY - distance, 0);
      this._waterY += displayY - lastY;
    }
  };

  var _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function (sceneActive) {
    this.updateMoveCorrection();
    _Game_Map_update.call(this, sceneActive);
    this.updateWater();
  };

  //////////////////////////////////////////////////////////////////
  //画面補正
  //スクロールに影響されないようにするための移動補正値を保存しておく。
  Game_Map.prototype.updateMoveCorrection = function () {
    if (this.lastX == null) {
      this.lastX = this.displayX() * this.tileWidth();
      this.lastY = this.displayY() * this.tileHeight();
    }

    var rx = this.displayX() * this.tileWidth();
    var ry = this.displayY() * this.tileHeight();
    this.charSpeedX = rx - this.lastX;
    this.charSpeedY = ry - this.lastY;
    this.lastX = rx;
    this.lastY = ry;
  };

  Game_Map.prototype.updateWater = function () {
    this.guardWater();
    if (this._waterLoopX) {
      this._waterX += this._waterSx / this.tileWidth() / 2;
    }
    if (this._waterLoopY) {
      this._waterY += this._waterSy / this.tileHeight() / 2;
    }
  };
})();
