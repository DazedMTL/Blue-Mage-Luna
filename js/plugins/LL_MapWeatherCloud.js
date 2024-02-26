//=============================================================================
// RPGツクールMZ - LL_MapWeatherCloud.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc マップ上に流れる雲を表示します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_MapWeatherCloud.js
 *
 * マップ上に流れる雲を表示します。
 * マップのメモ欄に下記を記述すると雲が表示されます。
 *   <weather_cloud:10>  # 一度に平均10個の雲を生成
 *
 * 下記を追加で記述すると、マスク設定がおこなえます。
 *   <weather_cloud_mask:100,50,30,25>  # 左100px、上50px、右30px、下25px
 *
 * プラグインコマンド:
 *   プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/11/21
 *
 * @param cloudBitmaps
 * @text 雲画像リスト
 * @desc 表示する雲画像を登録します。
 * この中からランダムで表示されます。(ひとつでもOK)
 * @default []
 * @type struct<bitmapLists>[]
 *
 * @param cloudSpeed
 * @text 雲の流れる速さ
 * @desc 雲の流れる平均の速さを指定します。(0～10)
 * @default 3
 * @min 0
 * @max 10
 * @type number
 */

/*~struct~bitmapLists:
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 表示する画像ファイルを選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param lowerZoom
 * @text 下限拡大率
 * @desc 下限～上限拡大率の間でランダムに拡大縮小されます。
 * 拡大縮小させたくない場合、両方とも100に設定してください。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param upperZoom
 * @text 上限拡大率
 * @desc 下限～上限拡大率の間でランダムに拡大縮小されます。
 * 拡大縮小させたくない場合、両方とも100に設定してください。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 */

(() => {
  "use strict";
  const pluginName = "LL_MapWeatherCloud";

  const parameters = PluginManager.parameters(pluginName);
  const paramJsonParse = function (key, value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  };

  // 雲画像リスト
  const cloudBitmaps = JSON.parse(
    JSON.stringify(String(parameters["cloudBitmaps"] || "[]"), paramJsonParse)
  );
  const cloudSpeed = Number(parameters["cloudSpeed"] || 3);

  /**
   * マップ上に雲を表示を表示するクラスを新規定義します。
   *
   * @class
   * @extends PIXI.Container
   */

  function WeatherCloud() {
    this.initialize(...arguments);
  }

  WeatherCloud.prototype = Object.create(PIXI.Container.prototype);
  WeatherCloud.prototype.constructor = WeatherCloud;

  WeatherCloud.prototype.initialize = function () {
    PIXI.Container.call(this);

    this._width = Graphics.width;
    this._height = Graphics.height;
    this._sprites = [];

    // 雲の速さ
    this._cloudSpeed = cloudSpeed;

    /**
     * The type of the weather in ["none", "rain", "storm", "snow"].
     *
     * @type string
     */
    this.type = "none";

    /**
     * The power of the weather in the range (0, 9).
     *
     * @type number
     */
    this.power = 0;

    /**
     * The origin point of the weather for scrolling.
     *
     * @type Point
     */
    this.origin = new Point();
  };

  /**
   * Destroys the weather.
   */
  WeatherCloud.prototype.destroy = function () {
    const options = { children: true, texture: true };
    PIXI.Container.prototype.destroy.call(this, options);
    // this._cloudBitmap.destroy();
  };

  /**
   * Updates the weather for each frame.
   */
  WeatherCloud.prototype.update = function () {
    this._updateAllSprites();
  };

  WeatherCloud.prototype._updateAllSprites = function () {
    const maxSprites = Math.floor(this.power);
    while (this._sprites.length < maxSprites) {
      this._addSprite();
    }
    while (this._sprites.length > maxSprites) {
      this._removeSprite();
    }
    for (const sprite of this._sprites) {
      this._updateSprite(sprite);
      sprite.x = sprite.ax - this.origin.x;
      sprite.y = sprite.ay - this.origin.y;
    }
  };

  WeatherCloud.prototype._addSprite = function () {
    const sprite = new Sprite(this.viewport);
    sprite.opacity = 0;
    this._sprites.push(sprite);
    this.addChild(sprite);
  };

  WeatherCloud.prototype._removeSprite = function () {
    this.removeChild(this._sprites.pop());
  };

  WeatherCloud.prototype._updateSprite = function (sprite) {
    switch (this.type) {
      case "cloud":
        this._updateCloudSprite(sprite);
        break;
    }
    if (sprite.opacity < 40) {
      this._rebornSprite(sprite);
    }
  };

  WeatherCloud.prototype._updateCloudSprite = function (sprite) {
    sprite.rotation = Math.PI / 16;
    sprite.ax += sprite.speed * Math.sin(sprite.rotation);

    // 寿命
    sprite.life -= 1;
    if (sprite.life < 0) {
      sprite.opacity -= 1;
    } else {
      sprite.opacity += 1;
    }
  };

  WeatherCloud.prototype._rebornSprite = function (sprite) {
    sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
    sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;

    // 透明度リセット
    sprite.opacity = 40;
    // 速度
    if (this._cloudSpeed > 0) {
      let speed = this._cloudSpeed + Math.randomInt(2) - Math.randomInt(2);
      if (speed < 0) speed = 0;
      speed = Math.randomInt((speed + 1) * 100) / 100;
      sprite.speed = speed;
    } else {
      sprite.speed = 0;
    }
    // 寿命
    sprite.life = 200 + Math.randomInt(200);
    // 画像抽選
    const rnd = Math.floor(Math.random() * cloudBitmaps.length);
    if (cloudBitmaps[rnd]) {
      const imageName = String(cloudBitmaps[rnd].imageName);
      sprite.bitmap = ImageManager.loadPicture(imageName);

      // 拡大率
      const upperZoom = Math.ceil(Number(cloudBitmaps[rnd].upperZoom || 100));
      const lowerZoom = Math.floor(Number(cloudBitmaps[rnd].lowerZoom || 100));
      const zoom = Number(
        Math.floor(Math.random() * (upperZoom - lowerZoom + 1) + lowerZoom)
      );
      sprite.scale.x = zoom / 100;
      sprite.scale.y = zoom / 100;
    }
  };

  /**
   * Mask set the weather.
   */
  WeatherCloud.prototype.setMask = function (x, y, lx, ly) {
    const mask = new PIXI.Graphics();
    mask.beginFill(0xffffff, 1);
    mask.drawRect(x, y, Graphics.width - lx - x, Graphics.height - ly - y);
    mask.endFill();
    this.mask = mask;
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //

  const _Spriteset_Map_createWeather = Spriteset_Map.prototype.createWeather;
  Spriteset_Map.prototype.createWeather = function () {
    _Spriteset_Map_createWeather.apply(this, arguments);

    this._weatherCloud = new WeatherCloud();
    this.addChild(this._weatherCloud);
  };

  const _Spriteset_Map_updateWeather = Spriteset_Map.prototype.updateWeather;
  Spriteset_Map.prototype.updateWeather = function () {
    _Spriteset_Map_updateWeather.apply(this, arguments);

    // メタデータ
    const meta = $dataMap.meta;

    // 雲表示有効化
    if (meta["weather_cloud"]) {
      this._weatherCloud.type = "cloud";
      this._weatherCloud.power = Number(meta["weather_cloud"]);
    } else {
      this._weatherCloud.type = "none";
      this._weatherCloud.power = 0;
    }
    this._weatherCloud.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
    this._weatherCloud.origin.y = $gameMap.displayY() * $gameMap.tileHeight();

    // マスク設定
    if (meta["weather_cloud_mask"]) {
      const maskMeta = meta["weather_cloud_mask"].split(",");
      this._weatherCloud.setMask(
        Number(maskMeta[0]),
        Number(maskMeta[1]),
        Number(maskMeta[2]),
        Number(maskMeta[3])
      );
    } else {
      this._weatherCloud.setMask(0, 0, 0, 0);
    }
  };
})();
