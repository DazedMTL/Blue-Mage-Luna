//=============================================================================
// RPGツクールMZ - LL_EroStatusScreen.js v1.1.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc オリジナルエロステータス画面を実装します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_EroStatusScreen.js
 *
 * オリジナルエロステータス画面を実装します。

 * プラグインコマンド:
 *   画面呼び出し:  エロステータス画面を呼び出します。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/10/7
 *
 * @command showStatus
 * @text 画面呼び出し
 * @desc エロステータス画面を呼び出します。
 *
 * @param statusParams
 * @text パラメータリスト
 * @desc 表示するパラメータリストを定義します。
 * @default []
 * @type struct<statusParams>[]
 *
 * @param backgroundImage
 * @text 背景画像
 * @desc 背景画像として表示する画像を選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param addMenuCommandName
 * @text メニューコマンド名
 * @desc メニュー画面に追加するコマンド名です。
 * 空白にするとメニューを追加しません。
 * @default エロステ
 * @type string
 *
 * @param bgmSettings
 * @text 専用BGMの設定
 * @desc ※この項目は使用しません
 *
 * @param bgmName
 * @text BGM
 * @desc 再生する音楽ファイルを選択してください。
 * 未選択の場合はBGMが変化しません。
 * @dir audio/bgm
 * @type file
 * @require 1
 * @parent bgmSettings
 *
 * @param bgmVolume
 * @text BGMの音量
 * @desc BGMの音量(0～100%)です。 (初期値: 90%)
 * @default 90
 * @max 100
 * @min 0
 * @type number
 * @parent bgmSettings
 *
 * @param bgmPitch
 * @text BGMのピッチ
 * @desc BGMのピッチ(50～150%)です。 (初期値: 100%)
 * @default 100
 * @max 150
 * @min 50
 * @type number
 * @parent bgmSettings
 *
 * @param bgmPan
 * @text BGMの位相
 * @desc BGMの位相(-100～100)です。 (初期値: 0)
 * @default 0
 * @max 100
 * @min -100
 * @type number
 * @parent bgmSettings
 *
 * @param disableBgmVariableId
 * @text BGM無効化変数
 * @desc この変数が0以外の時、専用BGMを無効化します。
 * @type variable
 * @parent bgmSettings
 */

/*~struct~statusParams:
 *
 * @param x
 * @text X座標
 * @desc ステータスの表示位置(X)です。
 * @default 0
 * @type number
 * @min -9999
 * @max 9999
 *
 * @param y
 * @text Y座標
 * @desc ステータスの表示位置(Y)です。
 * @default 0
 * @type number
 * @min -9999
 * @max 9999
 *
 * @param label
 * @text 項目名
 * @desc 表示するステータスの項目名です。
 * 空白にすると表示されません。
 * @type string
 *
 * @param labelColor
 * @text 項目名の文字色
 * @desc 項目名の文字色をCSSカラーコードで指定します。
 * @default white
 * @type string
 *
 * @param labelFontSize
 * @text 項目名のフォントサイズ
 * @desc ステータス名のフォントサイズです。
 * @default 28
 * @type number
 * @max 100
 *
 * @param labelWidth
 * @text 項目名の横幅
 * @desc 項目名の横幅です。
 * @default 200
 * @type number
 * @max 9999
 *
 * @param labelX
 * @text 項目名のX座標
 * @desc 項目名の表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。
 * @default 0
 * @type number
 * @min -9999
 * @max 9999
 *
 * @param labelY
 * @text 項目名のY座標
 * @desc 項目名の表示位置(Y)の調整値です。
 * ＋で下へ、－で上へ調整します。
 * @default 0
 * @type number
 * @min -9999
 * @max 9999
 *
 * @param labelAlign
 * @text 項目名の文字揃え
 * @desc 項目名の文字配置を選択します。
 * @default left
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 *
 * @param variableId
 * @text 数値の変数ID
 * @desc パラメータの数値として利用する変数IDです。
 * @type variable
 *
 * @param valueColor
 * @text 数値の文字色
 * @desc 数値の文字色をCSSカラーコードで指定します。
 * @default white
 * @type string
 *
 * @param valueFontSize
 * @text 数値のフォントサイズ
 * @desc 数値のフォントサイズです。
 * @default 28
 * @type number
 * @max 100
 *
 * @param valueWidth
 * @text 数値の横幅
 * @desc 数値の横幅です。
 * @default 200
 * @type number
 * @max 9999
 *
 * @param valueX
 * @text 数値のX座標
 * @desc 数値の表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。
 * @default 0
 * @type number
 * @min -9999
 * @max 9999
 *
 * @param valueY
 * @text 数値のY座標
 * @desc 数値の表示位置(Y)の調整値です。
 * ＋で下へ、－で上へ調整します。
 * @default 0
 * @type number
 * @min -9999
 * @max 9999
 *
 * @param valueAlign
 * @text 数値の文字揃え
 * @desc 数値の文字配置を選択します。
 * @default left
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 *
 * @param valueLimit
 * @text 数値の最大値
 * @desc 数値の最大値です。
 * 最大値を設定しない場合は0で入力してください。
 * @type number
 * @max 99999999
 *
 * @param images
 * @text サムネイル画像リスト
 * @desc 変数に応じて変化するサムネイル画像を定義します。
 * 条件を複数満たした場合、最も下にある画像が選択されます。
 * @default []
 * @type struct<images>[]
 */

/*~struct~images:
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 表示する画像を選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param variableId
 * @text 条件変数ID
 * @desc 条件として検査する変数IDです。
 * なしにすると無条件で表示されます。
 * @type variable
 *
 * @param higherValue
 * @text 条件しきい値
 * @desc 変数がこの数値以上の時に条件を満たします。
 * @default 0
 * @type number
 * @max 99999999
 *
 * @param x
 * @text X座標調整値
 * @desc 画像の表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param y
 * @text Y座標調整値
 * @desc 画像の表示位置(Y)の調整値です。
 * ＋で下へ、－で上へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param opacity
 * @text 不透明度
 * @desc 画像の不透明度です。(0～255)
 * @default 255
 * @min 0
 * @max 255
 * @type number
 */

(() => {
  "use strict";
  const pluginName = "LL_EroStatusScreen";

  const parameters = PluginManager.parameters(pluginName);
  const backgroundImage = String(parameters["backgroundImage"] || "");
  const addMenuCommandName = String(parameters["addMenuCommandName"] || "");
  const statusParams = String(parameters["statusParams"] || "");
  // BGM
  const bgmName = String(parameters["bgmName"] || "");
  const bgmVolume = Number(parameters["bgmVolume"] || 90);
  const bgmPitch = Number(parameters["bgmPitch"] || 100);
  const bgmPan = Number(parameters["bgmPan"] || 0);
  const disableBgmVariableId = Number(parameters["disableBgmVariableId"] || 0);

  const statusParamLists = JSON.parse(
    JSON.stringify(statusParams, function (key, value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    })
  );

  // Extra Padding
  const exPadding = 16;

  // 画面呼び出し
  PluginManager.registerCommand(pluginName, "showStatus", (args) => {
    SceneManager.push(Scene_EroStatus);
  });

  //-----------------------------------------------------------------------------
  // Scene_EroStatus
  //
  // エロステータスを表示する独自のシーンを定義します。

  function Scene_EroStatus() {
    this.initialize(...arguments);
  }

  Scene_EroStatus.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_EroStatus.prototype.constructor = Scene_EroStatus;

  Scene_EroStatus.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);

    this._mapBgm = null;
    this._mapBgs = null;
  };

  Scene_EroStatus.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createStatusWindow();
    this._statusWindow.opacity = 0;
  };

  Scene_EroStatus.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    this.playMusic();
    this._statusWindow.refresh();
  };

  Scene_EroStatus.prototype.createStatusWindow = function () {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_ExEroStatus(rect);
    this._statusWindow.setHandler("cancel", this.popScene.bind(this));
    // this._statusWindow.setHandler("pagedown", this.nextActor.bind(this));
    // this._statusWindow.setHandler("pageup", this.previousActor.bind(this));
    this.addWindow(this._statusWindow);
  };

  Scene_EroStatus.prototype.statusWindowRect = function () {
    const wx = exPadding * -1;
    const wy = exPadding * -1;
    const ww = Graphics.boxWidth + exPadding * 2;
    const wh = Graphics.boxHeight - wy + exPadding * 2;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_EroStatus.prototype.createBackground = function () {
    Scene_MenuBase.prototype.createBackground.call(this);
    this._exBackgroundSprite = new Sprite();
    this._exBackgroundSprite.bitmap = ImageManager.loadPicture(backgroundImage);
    this.addChild(this._exBackgroundSprite);
  };

  Scene_EroStatus.prototype.needsCancelButton = function () {
    return false;
  };

  Scene_EroStatus.prototype.playMusic = function () {
    this.saveBgmAndBgs();

    if (bgmName && $gameVariables.value(disableBgmVariableId) === 0) {
      const bgm = {
        name: bgmName,
        volume: bgmVolume,
        pitch: bgmPitch,
        pan: bgmPan,
      };
      AudioManager.playBgm(bgm);
      AudioManager.stopBgs();
      AudioManager.stopMe();
    }
  };

  Scene_EroStatus.prototype.terminate = function () {
    Scene_MenuBase.prototype.terminate.call(this);
    this.replayBgmAndBgs();
  };

  Scene_EroStatus.prototype.saveBgmAndBgs = function () {
    this._mapBgm = AudioManager.saveBgm();
    this._mapBgs = AudioManager.saveBgs();
  };

  Scene_EroStatus.prototype.replayBgmAndBgs = function () {
    if (this._mapBgm) {
      AudioManager.replayBgm(this._mapBgm);
    } else {
      AudioManager.stopBgm();
    }
    if (this._mapBgs) {
      AudioManager.replayBgs(this._mapBgs);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_ExEroStatus
  //
  // The window for displaying the map name on the map screen.

  function Window_ExEroStatus() {
    this.initialize(...arguments);
  }

  Window_ExEroStatus.prototype = Object.create(Window_StatusBase.prototype);
  Window_ExEroStatus.prototype.constructor = Window_ExEroStatus;

  Window_ExEroStatus.prototype.initialize = function (rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this.refresh();
    this.activate();
  };

  Window_ExEroStatus.prototype.refresh = function () {
    Window_StatusBase.prototype.refresh.call(this);
    this.drawEroStatuses();
  };

  Window_ExEroStatus.prototype.drawEroStatuses = function () {
    statusParamLists.forEach(
      function (item) {
        let baseX = item.x;
        let baseY = item.y;
        let image = this.getThumbImageName(item.images);
        let bitmap = ImageManager.loadPicture(image.imageName);

        // サムネイルの描画
        if (image.opacity) {
          // 不透明度を設定
          this.contents.paintOpacity = image.opacity;
        }
        this.contents.blt(
          bitmap,
          0,
          0,
          bitmap.width,
          bitmap.height,
          baseX + image.x,
          baseY + image.y
        );
        this.contents.paintOpacity = 255;
        // 項目の描画
        this.contents.fontSize = item.labelFontSize;
        this.changeTextColor(item.labelColor);
        this.drawText(
          item.label,
          baseX + item.labelX,
          baseY + item.labelY,
          item.labelWidth,
          item.labelAlign
        );
        // 値の描画
        let value = $gameVariables.value(item.variableId);
        if (
          $gameVariables.value(item.variableId) > item.valueLimit &&
          item.valueLimit > 0
        ) {
          value = item.valueLimit;
        }
        this.contents.fontSize = item.valueFontSize;
        this.changeTextColor(item.valueColor);
        this.drawText(
          value,
          baseX + item.valueX,
          baseY + item.valueY,
          item.valueWidth,
          item.valueAlign
        );

        this.contents.fontSize = $gameSystem.mainFontSize();
        this.resetTextColor();
      }.bind(this)
    );
  };

  Window_ExEroStatus.prototype.getThumbImageName = function (imageLists) {
    let result = {
      imageName: "",
      variableId: null,
      higherValue: null,
      x: 0,
      y: 0,
    };
    if (imageLists) {
      imageLists.forEach(
        function (item) {
          if (
            $gameVariables.value(item.variableId) >= item.higherValue ||
            !item.variableId ||
            Number(item.variableId) === 0
          ) {
            result = item;
          }
        }.bind(this)
      );
    }

    return result;
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  const _Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _Scene_Menu_createCommandWindow.apply(this, arguments);

    this._commandWindow.setHandler(
      "exEroStatus",
      this.commandExEroStatus.bind(this)
    );
  };

  Scene_Menu.prototype.commandExEroStatus = function () {
    SceneManager.push(Scene_EroStatus);
  };

  //-----------------------------------------------------------------------------
  // Window_MenuCommand
  //

  const _Window_MenuCommand_addMainCommands =
    Window_MenuCommand.prototype.addMainCommands;
  Window_MenuCommand.prototype.addMainCommands = function () {
    _Window_MenuCommand_addMainCommands.apply(this, arguments);

    if (addMenuCommandName) {
      this.addCommand(addMenuCommandName, "exEroStatus", true);
    }
  };
})();
