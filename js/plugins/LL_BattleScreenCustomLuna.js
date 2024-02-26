//=============================================================================
// RPGツクールMZ - LL_BattleScreenCustomLuna.js v1.2.1
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 戦闘画面レイアウトをカスタマイズします。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_BattleScreenCustomLuna.js
 *
 * 戦闘画面レイアウトをカスタマイズします。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/12/16
 *
 * @param partyCommandSettings
 * @text パーティコマンドの設定
 * @desc ※この項目は使用しません
 *
 * @param partyCommandWidth
 * @text ウィンドウ横幅
 * @desc パーティコマンドウィンドウの横幅です。
 * @default 720
 * @type number
 * @min 0
 * @max 9999
 * @parent partyCommandSettings
 *
 * @param partyCommandX
 * @text X座標
 * @desc パーティコマンドウィンドウのX座標です。
 * @default 60
 * @min -9999
 * @max 9999
 * @type number
 * @parent partyCommandSettings
 *
 * @param partyCommandY
 * @text Y座標
 * @desc パーティコマンドウィンドウのY座標です。
 * @default 24
 * @min -9999
 * @max 9999
 * @type number
 * @parent partyCommandSettings
 *
 * @param partyCommandBackground
 * @text 背景画像
 * @desc パーティコマンドの背景画像です。
 * @dir img/system
 * @type file
 * @require 1
 * @parent partyCommandSettings
 *
 * @param partyCommandBackgroundX
 * @text 背景画像X座標
 * @desc 背景画像の表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent partyCommandSettings
 *
 * @param partyCommandBackgroundY
 * @text 背景画像Y座標
 * @desc 背景画像の表示位置(Y)の調整値です。
 * ＋で下へ、－で上へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent partyCommandSettings
 *
 * @param partyCommandSelectLast
 * @text コマンド選択記憶
 * @desc 直前に選択したコマンド位置を記憶させます。
 * @type boolean
 * @default true
 * @parent partyCommandSettings
 *
 * @param actorCommandSettings
 * @text アクターコマンドの設定
 * @desc ※この項目は使用しません
 *
 * @param actorCommandWidth
 * @text ウィンドウ横幅
 * @desc アクターコマンドウィンドウの横幅です。
 * @default 840
 * @type number
 * @min 0
 * @max 9999
 * @parent actorCommandSettings
 *
 * @param actorCommandBackground
 * @text 背景画像
 * @desc アクターコマンドの背景画像です。
 * @dir img/system
 * @type file
 * @require 1
 * @parent actorCommandSettings
 *
 * @param actorCommandBackgroundX
 * @text 背景画像X座標
 * @desc 背景画像の表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent actorCommandSettings
 *
 * @param actorCommandBackgroundY
 * @text 背景画像Y座標
 * @desc 背景画像の表示位置(Y)の調整値です。
 * ＋で下へ、－で上へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent actorCommandSettings
 *
 * @param actorStatusSettings
 * @text アクターステータスの設定
 * @desc ※この項目は使用しません
 *
 * @param actorStatusWidth
 * @text ウィンドウ横幅
 * @desc アクターステータスウィンドウの横幅です。
 * @default 840
 * @type number
 * @min 0
 * @max 9999
 * @parent actorStatusSettings
 *
 * @param actorStatusColSpacing
 * @text アクター間の余白
 * @desc アクター間の余白です。
 * @default 8
 * @type number
 * @min 0
 * @max 9999
 * @parent actorStatusSettings
 *
 * @param actorBackgrounds
 * @text 背景画像
 * @desc アクターステータスの背景画像を設定します。
 * アクター毎に異なる背景画像を設定できます。
 * @default []
 * @type struct<actorBackgrounds>[]
 * @parent actorStatusSettings
 *
 * @param otherSettings
 * @text その他の設定
 * @desc ※この項目は使用しません
 *
 * @param windowSkin
 * @text ウィンドウスキン
 * @desc 戦闘画面のウィンドウスキンに使用する画像です。
 * @default Window
 * @dir img/system
 * @type file
 * @require 1
 * @parent otherSettings
 */

/*~struct~actorBackgrounds:
 *
 * @param actorId
 * @text アクターID
 * @desc 背景画像を設定するアクターIDです。
 * @type actor
 *
 * @param imageName
 * @text 背景画像
 * @desc アクターステータスの背景画像です。
 * @dir img/system
 * @type file
 * @require 1
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
 */

(() => {
  "use strict";
  const pluginName = "LL_BattleScreenCustomLuna";

  const parameters = PluginManager.parameters(pluginName);
  const paramJsonParse = function (key, value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  };
  // パーティコマンド
  const partyCommandWidth = Number(parameters["partyCommandWidth"] || 720);
  const partyCommandX = Number(parameters["partyCommandX"] || 60);
  const partyCommandY = Number(parameters["partyCommandY"] || 24);
  const partyCommandBackground = String(
    parameters["partyCommandBackground"] || ""
  );
  const partyCommandBackgroundX = Number(
    parameters["partyCommandBackgroundX"] || 0
  );
  const partyCommandBackgroundY = Number(
    parameters["partyCommandBackgroundY"] || 0
  );
  const partyCommandSelectLast = eval(
    parameters["partyCommandSelectLast"] || "true"
  );
  // アクターコマンド
  const actorCommandWidth = Number(parameters["actorCommandWidth"] || 840);
  const actorCommandBackground = String(
    parameters["actorCommandBackground"] || ""
  );
  const actorCommandBackgroundX = Number(
    parameters["actorCommandBackgroundX"] || 0
  );
  const actorCommandBackgroundY = Number(
    parameters["actorCommandBackgroundY"] || 0
  );
  // アクターステータス
  const actorStatusWidth = Number(parameters["actorStatusWidth"] || 840);
  const actorStatusColSpacing = Number(
    parameters["actorStatusColSpacing"] || 8
  );
  const actorBackgrounds = String(parameters["actorBackgrounds"] || "[]");
  // ウィンドウスキン
  const windowSkin = String(parameters["windowSkin"] || "Window");

  const actorBackgroundLists = JSON.parse(
    JSON.stringify(actorBackgrounds, paramJsonParse)
  );

  Scene_Battle.prototype.partyCommandWindowRect = function () {
    const ww = partyCommandWidth;
    const wh = this.calcWindowHeight(1, true);
    const wx = partyCommandX;
    const wy = partyCommandY;
    return new Rectangle(wx, wy, ww, wh);
  };

  const _Scene_Battle_createActorCommandWindow =
    Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function () {
    _Scene_Battle_createActorCommandWindow.apply(this, arguments);

    this._actorCommandWindow.y =
      this.statusWindowRect().y - this._actorCommandWindow.height;
  };

  Scene_Battle.prototype.actorCommandWindowRect = function () {
    const ww = actorCommandWidth;
    const wh = this.calcWindowHeight(1, true);
    const wx = 0;
    const wy = this.statusWindowRect().y - wh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Battle.prototype.statusWindowRect = function () {
    const extra = 10;
    const ww = actorStatusWidth;
    const wh = this.windowAreaHeight() + extra;
    const wx = 0;
    const wy = Graphics.boxHeight - wh + extra - 4;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Battle.prototype.updateStatusWindowPosition = function () {
    //
  };

  // タッチUI(戻るボタン)無効化
  Scene_Battle.prototype.updateCancelButton = function () {
    if (this._cancelButton) {
      this._cancelButton.visible = false;
    }
  };

  //-----------------------------------------------------------------------------
  // Window_PartyCommand
  //

  Window_PartyCommand.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.deactivate();

    // 背景画像
    this.createBackground();
    // コマンド選択記憶
    this._lastCommandSymbol = null;
  };

  const _Window_PartyCommand_update = Window_PartyCommand.prototype.update;
  Window_PartyCommand.prototype.update = function () {
    _Window_PartyCommand_update.apply(this, arguments);

    if (this._bgSprite) {
      this._bgSprite.opacity = this.openness;
    }
  };

  const _Window_PartyCommand_maxCols = Window_PartyCommand.prototype.maxCols;
  Window_PartyCommand.prototype.maxCols = function () {
    if (this._list) {
      return this._list.length;
    }
    return _Window_PartyCommand_maxCols.apply(this, arguments);
  };

  Window_PartyCommand.prototype.drawText = function (text, x, y, width, align) {
    // CommandIcon.js との競合対策
    // Window_Base.prototype.drawText.call(this, text.replace(/\\I\[(\d+)\]/gi, ''), x, y, width, align);

    this.drawTextEx(text, x, y);
  };

  Window_PartyCommand.prototype.createBackground = function () {
    this._bgSprite = new Sprite();
    this._bgSprite.bitmap = ImageManager.loadSystem(partyCommandBackground);
    this._bgSprite.bitmap.addLoadListener(
      function () {
        this._bgSprite.x =
          this.width / 2 - this._bgSprite.width / 2 + partyCommandBackgroundX;
        this._bgSprite.y =
          this.height / 2 - this._bgSprite.height / 2 + partyCommandBackgroundY;
      }.bind(this)
    );
    this._bgSprite.opacity = 0;
    this.addChildAt(this._bgSprite, 1);
  };

  const _Window_PartyCommand_makeCommandList =
    Window_PartyCommand.prototype.makeCommandList;
  Window_PartyCommand.prototype.makeCommandList = function () {
    this.addCommand(TextManager.fight, "fight");

    // AutoBattlePlus.js との競合対策
    let pluginParam = PluginManager.parameters("AutoBattlePlus");
    const autoCommandName = String(pluginParam["Auto Command Name"] || "");
    if (autoCommandName) {
      this.addCommand(autoCommandName, "auto");
    }
    const repeatCommandName = String(pluginParam["Repeat Command Name"] || "");
    if (repeatCommandName) {
      this.addCommand(repeatCommandName, "repeat");
    }

    // MPP_SmoothBattleLog.js との競合対策
    pluginParam = PluginManager.parameters("MPP_SmoothBattleLog");
    const logCommandName = String(pluginParam["Log Command"] || "");
    if (logCommandName) {
      this.addCommand(logCommandName, "pastLog");
    }

    this.addCommand(TextManager.escape, "escape", BattleManager.canEscape());
  };

  const _Window_PartyCommand_processOk =
    Window_PartyCommand.prototype.processOk;
  Window_PartyCommand.prototype.processOk = function () {
    _Window_PartyCommand_processOk.apply(this, arguments);

    this._lastCommandSymbol = this.currentSymbol();
  };

  const _Window_PartyCommand_setup = Window_PartyCommand.prototype.setup;
  Window_PartyCommand.prototype.setup = function () {
    _Window_PartyCommand_setup.apply(this, arguments);

    // コマンド選択記憶有効時
    if (partyCommandSelectLast) {
      this.selectLast();
    }
  };

  Window_PartyCommand.prototype.selectLast = function () {
    if (this._lastCommandSymbol) {
      this.selectSymbol(this._lastCommandSymbol);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_ActorCommand
  //

  const _Window_ActorCommand_initialize =
    Window_ActorCommand.prototype.initialize;
  Window_ActorCommand.prototype.initialize = function (rect) {
    _Window_ActorCommand_initialize.apply(this, arguments);

    // 背景画像
    this.createBackground();
  };

  const _Window_ActorCommand_update = Window_ActorCommand.prototype.update;
  Window_ActorCommand.prototype.update = function () {
    _Window_ActorCommand_update.apply(this, arguments);

    if (this._bgSprite) {
      this._bgSprite.opacity = this.openness;
    }
  };

  const _Window_ActorCommand_maxCols = Window_ActorCommand.prototype.maxCols;
  Window_ActorCommand.prototype.maxCols = function () {
    if (this._list) {
      return this._list.length;
    }
    return _Window_ActorCommand_maxCols.apply(this, arguments);
  };

  Window_ActorCommand.prototype.drawText = function (text, x, y, width, align) {
    // CommandIcon.js との競合対策
    // Window_Base.prototype.drawText.call(this, text.replace(/\\I\[(\d+)\]/gi, ''), x, y, width, align);

    this.drawTextEx(text, x, y);
  };

  Window_ActorCommand.prototype.createBackground = function () {
    this._bgSprite = new Sprite();
    this._bgSprite.bitmap = ImageManager.loadSystem(actorCommandBackground);
    this._bgSprite.bitmap.addLoadListener(
      function () {
        this._bgSprite.x =
          this.width / 2 - this._bgSprite.width / 2 + actorCommandBackgroundX;
        this._bgSprite.y =
          this.height / 2 - this._bgSprite.height / 2 + actorCommandBackgroundY;
      }.bind(this)
    );
    this._bgSprite.opacity = 0;
    this.addChildAt(this._bgSprite, 1);
  };

  //-----------------------------------------------------------------------------
  // Window_BattleStatus
  //

  const _Window_BattleStatus_initialize =
    Window_BattleStatus.prototype.initialize;
  Window_BattleStatus.prototype.initialize = function (rect) {
    _Window_BattleStatus_initialize.apply(this, arguments);

    this.opacity = 0;
  };

  Window_BattleStatus.prototype.colSpacing = function () {
    return actorStatusColSpacing;
  };

  const _Window_BattleStatus_drawItem = Window_BattleStatus.prototype.drawItem;
  Window_BattleStatus.prototype.drawItem = function (index) {
    const actor = this.actor(index);
    const rect = this.faceRect(index);

    const actorBackground = actorBackgroundLists.find(function (item) {
      if (item.actorId === actor._actorId) return true;
    });

    if (actorBackground) {
      const actorBackgroundImage = new Sprite();
      actorBackgroundImage.bitmap = ImageManager.loadSystem(
        actorBackground.imageName
      );
      actorBackgroundImage.x = rect.x + actorBackground.x;
      actorBackgroundImage.y = rect.y + actorBackground.y;
      this.addChildAt(actorBackgroundImage, 0);
    }

    _Window_BattleStatus_drawItem.apply(this, arguments);
  };

  // ウィンドウスキンカスタマイズ
  const _Scene_Battle_createAllWindows =
    Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    _Scene_Battle_createAllWindows.apply(this, arguments);

    this._partyCommandWindow.windowskin = ImageManager.loadSystem(windowSkin);
    this._actorCommandWindow.windowskin = ImageManager.loadSystem(windowSkin);
    this._helpWindow.windowskin = ImageManager.loadSystem(windowSkin);
    this._skillWindow.windowskin = ImageManager.loadSystem(windowSkin);
    this._itemWindow.windowskin = ImageManager.loadSystem(windowSkin);
    this._enemyWindow.windowskin = ImageManager.loadSystem(windowSkin);

    // MPP_SmoothBattleLog
    if (this._pastLogWindow) {
      this._pastLogWindow.windowskin = ImageManager.loadSystem(windowSkin);
    }
  };

  const _Window_Message_loadWindowskin =
    Window_Message.prototype.loadWindowskin;
  Window_Message.prototype.loadWindowskin = function () {
    if ($gameParty.inBattle()) {
      this.windowskin = ImageManager.loadSystem(windowSkin);
      return;
    }
    _Window_Message_loadWindowskin.apply(this, arguments);
  };

  // ステータスウィンドウの文字見切れ対策 (24→30)
  Sprite_Name.prototype.bitmapHeight = function () {
    return 30;
  };
})();
