//=============================================================================
// RPGツクールMZ - LL_BattleCursorCustom.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 戦闘画面選択カーソルをカスタマイズします。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_BattleCursorCustom.js
 *
 * 戦闘画面選択カーソルをカスタマイズします。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/4/8
 *
 * @param cursorSettings
 * @text カーソル画像の設定
 * @desc ※この項目は使用しません
 *
 * @param cursorImage
 * @text カーソル画像
 * @desc カーソル画像として使用する画像を選択してください。
 * @dir img/system
 * @type file
 * @require 1
 * @parent cursorSettings
 *
 * @param cursorAdjustX
 * @text X座標調整値
 * @desc カーソル画像の表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent cursorSettings
 *
 * @param cursorAdjustY
 * @text Y座標調整値
 * @desc カーソル画像の表示位置(Y)の調整値です。
 * ＋で下へ、－で上へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent cursorSettings
 *
 * @param cursorMoveFream
 * @text イージングフレーム数
 * @desc カーソル移動時のイージングのフレーム数です。
 * @default 24
 * @min 1
 * @max 999
 * @type number
 * @parent cursorSettings
 *
 * @param selectWindowSettings
 * @text 選択ウィンドウの設定
 * @desc ※この項目は使用しません
 *
 * @param exSelectWindowHomeX
 * @text 全体選択時のX座標
 * @desc 全体選択時のウィンドウ位置(X)です。
 * @default 16
 * @min -9999
 * @max 9999
 * @type number
 * @parent selectWindowSettings
 *
 * @param exSelectWindowHomeY
 * @text 全体選択時のY座標
 * @desc 全体選択時のウィンドウ位置(Y)です。
 * @default 128
 * @min -9999
 * @max 9999
 * @type number
 * @parent selectWindowSettings
 *
 * @param enemyCursorAllText
 * @text 敵全体選択時の文字列
 * @desc 敵全体選択時の表示文字列です。
 * @default 敵全体
 * @type string
 * @parent selectWindowSettings
 *
 * @param actorCursorAllText
 * @text 味方全体選択時の文字列
 * @desc 味方全体選択時の表示文字列です。
 * @default 味方全体
 * @type string
 * @parent selectWindowSettings
 *
 * @param exSelectWindowAdjustX
 * @text X座標調整値
 * @desc ウィンドウの表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent selectWindowSettings
 *
 * @param exSelectWindowAdjustY
 * @text Y座標調整値
 * @desc ウィンドウの表示位置(Y)の調整値です。
 * ＋で下へ、－で上へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent selectWindowSettings
 *
 * @param exSelectWindowBackground
 * @text 背景画像
 * @desc ウィンドウの背景画像です。
 * @dir img/system
 * @type file
 * @require 1
 * @parent selectWindowSettings
 *
 * @param exSelectWindowBackgroundX
 * @text 背景画像X座標
 * @desc 背景画像の表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。
 * @default -24
 * @min -9999
 * @max 9999
 * @type number
 * @parent selectWindowSettings
 *
 * @param exSelectWindowBackgroundY
 * @text 背景画像Y座標
 * @desc 背景画像の表示位置(Y)の調整値です。
 * ＋で右へ、－で左へ調整します。
 * @default -32
 * @min -9999
 * @max 9999
 * @type number
 * @parent selectWindowSettings
 *
 * @param exSelectWindowSkin
 * @text ウィンドウスキン
 * @desc ウィンドウスキンに使用する画像です。
 * @default Window
 * @dir img/system
 * @type file
 * @require 1
 * @parent selectWindowSettings
 */

(() => {
  "use strict";
  const pluginName = "LL_BattleCursorCustom";

  const parameters = PluginManager.parameters(pluginName);

  // カーソル画像
  const cursorImage = String(parameters["cursorImage"] || "");
  const cursorAdjustX = Number(parameters["cursorAdjustX"] || 0);
  const cursorAdjustY = Number(parameters["cursorAdjustY"] || 0);
  const cursorMoveFream = Number(parameters["cursorMoveFream"] || 24);

  // 敵選択ウィンドウ
  const exSelectWindowHomeX = Number(parameters["exSelectWindowHomeX"] || 0);
  const exSelectWindowHomeY = Number(parameters["exSelectWindowHomeY"] || 0);
  const enemyCursorAllText = String(parameters["enemyCursorAllText"] || "");
  const actorCursorAllText = String(parameters["actorCursorAllText"] || "");
  const exSelectWindowAdjustX = Number(
    parameters["exSelectWindowAdjustX"] || 0
  );
  const exSelectWindowAdjustY = Number(
    parameters["exSelectWindowAdjustY"] || 0
  );
  const exSelectWindowBackground = String(
    parameters["exSelectWindowBackground"] || ""
  );
  const exSelectWindowBackgroundX = Number(
    parameters["exSelectWindowBackgroundX"] || 0
  );
  const exSelectWindowBackgroundY = Number(
    parameters["exSelectWindowBackgroundY"] || 0
  );
  const exSelectWindowSkin = String(
    parameters["exSelectWindowSkin"] || "Window"
  );

  // 共通変数
  let exSelectWindowTargetX = 0;
  let exSelectWindowTargetY = 0;
  let exSelectWindowVisible = false;

  function getSprite(battler) {
    let result = null;

    if (battler) {
      if (battler.isActor()) {
        //
      } else {
        const enemySprites = BattleManager.getEnemySprites();

        result = enemySprites.find(function (item) {
          if (item._battler === battler) return true;
        });
      }
    }
    return result;
  }

  //-----------------------------------------------------------------------------
  // BattleManager
  //

  BattleManager.getEnemySprites = function () {
    return BattleManager._spriteset._enemySprites;
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle
  //

  const _Scene_Battle_createAllWindows =
    Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    _Scene_Battle_createAllWindows.apply(this, arguments);

    this.createExBattleSelectCursor();
    this.createExBattleSelectWindow();
  };

  Scene_Battle.prototype.createExBattleSelectCursor = function () {
    this._targetCursorSprite1 = new Sprite_LL_BattleCursor();
    this._targetCursorSprite1.bitmap = ImageManager.loadSystem(cursorImage);
    this._targetCursorSprite1.anchor.x = 0.5;
    this.addChild(this._targetCursorSprite1);

    this._targetCursorSprite2 = new Sprite_LL_BattleCursor();
    this._targetCursorSprite2.bitmap = ImageManager.loadSystem(cursorImage);
    this._targetCursorSprite2.anchor.x = 0.5;
    this.addChild(this._targetCursorSprite2);

    this._targetCursorSprite3 = new Sprite_LL_BattleCursor();
    this._targetCursorSprite3.bitmap = ImageManager.loadSystem(cursorImage);
    this._targetCursorSprite3.anchor.x = 0.5;
    this.addChild(this._targetCursorSprite3);

    this._targetCursorSprite4 = new Sprite_LL_BattleCursor();
    this._targetCursorSprite4.bitmap = ImageManager.loadSystem(cursorImage);
    this._targetCursorSprite4.anchor.x = 0.5;
    this.addChild(this._targetCursorSprite4);

    this._targetCursorSprite5 = new Sprite_LL_BattleCursor();
    this._targetCursorSprite5.bitmap = ImageManager.loadSystem(cursorImage);
    this._targetCursorSprite5.anchor.x = 0.5;
    this.addChild(this._targetCursorSprite5);

    this._targetCursorSprite6 = new Sprite_LL_BattleCursor();
    this._targetCursorSprite6.bitmap = ImageManager.loadSystem(cursorImage);
    this._targetCursorSprite6.anchor.x = 0.5;
    this.addChild(this._targetCursorSprite6);

    this._targetCursorSprite7 = new Sprite_LL_BattleCursor();
    this._targetCursorSprite7.bitmap = ImageManager.loadSystem(cursorImage);
    this._targetCursorSprite7.anchor.x = 0.5;
    this.addChild(this._targetCursorSprite7);

    this._targetCursorSprite8 = new Sprite_LL_BattleCursor();
    this._targetCursorSprite8.bitmap = ImageManager.loadSystem(cursorImage);
    this._targetCursorSprite8.anchor.x = 0.5;
    this.addChild(this._targetCursorSprite8);
  };

  Scene_Battle.prototype.createExBattleSelectWindow = function () {
    const rect = this.exBattleSelectWindow();
    const exSelectWindow = new Window_ExBattleSelect(rect);
    this.addWindow(exSelectWindow);
    this._exSelectWindow = exSelectWindow;
    this._exSelectWindow.setEnemyWindow(this._enemyWindow);
    this._exSelectWindow.setActorWindow(this._actorWindow);
  };

  Scene_Battle.prototype.exBattleSelectWindow = function () {
    const ww = 384;
    const wh = this.calcWindowHeight(1, false);
    const wx = 100;
    const wy = 300;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Battle.prototype.startEnemySelection = function () {
    this._enemyWindow.refresh();
    this._enemyWindow.show();
    this._enemyWindow.select(0);
    this._enemyWindow.activate();
    // this._statusWindow.hide();
  };

  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.apply(this, arguments);
    this.updateExBattleSelectCursor();
  };

  Scene_Battle.prototype.updateExBattleSelectCursor = function () {
    if (this._enemyWindow.active && this._enemyWindow.cursorAll()) {
      const enemies = this._enemyWindow._enemies;
      for (let i = 0; i < enemies.length; i++) {
        const enemySprite = getSprite(enemies[i]);
        const x = enemySprite.x;
        const y = enemySprite.y - enemySprite.height * 0.9;

        if (i === 0) {
          this._targetCursorSprite1.setTarget(x + 4, y - 60);
          this._targetCursorSprite1.visible = true;
        }
        if (i === 1) {
          this._targetCursorSprite2.setTarget(x + 4, y - 60);
          this._targetCursorSprite2.visible = true;
        }
        if (i === 2) {
          this._targetCursorSprite3.setTarget(x + 4, y - 60);
          this._targetCursorSprite3.visible = true;
        }
        if (i === 3) {
          this._targetCursorSprite4.setTarget(x + 4, y - 60);
          this._targetCursorSprite4.visible = true;
        }
        if (i === 4) {
          this._targetCursorSprite5.setTarget(x + 4, y - 60);
          this._targetCursorSprite5.visible = true;
        }
        if (i === 5) {
          this._targetCursorSprite6.setTarget(x + 4, y - 60);
          this._targetCursorSprite6.visible = true;
        }
        if (i === 6) {
          this._targetCursorSprite7.setTarget(x + 4, y - 60);
          this._targetCursorSprite7.visible = true;
        }
        if (i === 7) {
          this._targetCursorSprite8.setTarget(x + 4, y - 60);
          this._targetCursorSprite8.visible = true;
        }
      }
      this._exSelectWindow.setPlacement(
        exSelectWindowHomeX,
        exSelectWindowHomeY,
        enemyCursorAllText
      );
      this._exSelectWindow.show();
    } else if (this._enemyWindow.active) {
      const enemySprite = getSprite(this._enemyWindow.enemy());
      if (enemySprite) {
        const x = enemySprite.x;
        const y = enemySprite.y - enemySprite.height * 0.9;

        this._targetCursorSprite1.setTarget(x + 4, y - 60);
        this._targetCursorSprite2.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite3.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite4.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite5.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite6.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite7.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite8.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite1.visible = true;
        this._targetCursorSprite2.visible = false;
        this._targetCursorSprite3.visible = false;
        this._targetCursorSprite4.visible = false;
        this._targetCursorSprite5.visible = false;
        this._targetCursorSprite6.visible = false;
        this._targetCursorSprite7.visible = false;
        this._targetCursorSprite8.visible = false;

        this._exSelectWindow.setPlacement(x, y - 96, enemySprite._enemy.name());
        this._exSelectWindow.show();
      }
    } else if (this._actorWindow.active && this._actorWindow.cursorAll()) {
      for (let i = 0; i < this._actorWindow.maxItems(); i++) {
        const actorWindowRect = this._actorWindow.itemRect(i);
        const x = actorWindowRect.x + actorWindowRect.width / 2 + 10;
        const y = this._actorWindow.y;

        if (i === 0) {
          this._targetCursorSprite1.setTarget(x, y);
          this._targetCursorSprite1.visible = true;
        }
        if (i === 1) {
          this._targetCursorSprite2.setTarget(x, y);
          this._targetCursorSprite2.visible = true;
        }
        if (i === 2) {
          this._targetCursorSprite3.setTarget(x, y);
          this._targetCursorSprite3.visible = true;
        }
        if (i === 3) {
          this._targetCursorSprite4.setTarget(x, y);
          this._targetCursorSprite4.visible = true;
        }
      }
      this._exSelectWindow.setPlacement(
        exSelectWindowHomeX,
        exSelectWindowHomeY,
        actorCursorAllText
      );
      this._exSelectWindow.show();
    } else if (this._actorWindow.active) {
      const actorWindowRect = this._actorWindow.itemRect(
        this._actorWindow._index
      );
      const x = actorWindowRect.x + actorWindowRect.width / 2 + 10;
      const y = this._actorWindow.y;

      this._targetCursorSprite1.setTarget(x, y);
      this._targetCursorSprite2.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite3.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite4.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite5.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite6.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite7.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite8.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite1.visible = true;
      this._targetCursorSprite2.visible = false;
      this._targetCursorSprite3.visible = false;
      this._targetCursorSprite4.visible = false;
      this._targetCursorSprite5.visible = false;
      this._targetCursorSprite6.visible = false;
      this._targetCursorSprite7.visible = false;
      this._targetCursorSprite8.visible = false;

      this._exSelectWindow.setPlacement(
        x,
        y - 48,
        $gameParty.battleMembers()[this._actorWindow._index].name()
      );
      this._exSelectWindow.show();
    } else if (
      this._actorCommandWindow.active &&
      !this._partyCommandWindow.active
    ) {
      const index = this._statusWindow._index;
      if (index > -1) {
        const actorWindowRect = this._actorWindow.itemRect(index);
        const x = actorWindowRect.x + actorWindowRect.width / 2 + 10;
        const y = this._actorWindow.y;

        this._targetCursorSprite1.setTarget(x, y);
        this._targetCursorSprite2.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite3.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite4.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite5.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite6.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite7.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite8.setTarget(
          this._targetCursorSprite1.x,
          this._targetCursorSprite1.y
        );
        this._targetCursorSprite1.visible = true;
        this._targetCursorSprite2.visible = false;
        this._targetCursorSprite3.visible = false;
        this._targetCursorSprite4.visible = false;
        this._targetCursorSprite5.visible = false;
        this._targetCursorSprite6.visible = false;
        this._targetCursorSprite7.visible = false;
        this._targetCursorSprite8.visible = false;
      }
    } else {
      // カーソル初期位置をアクター1番に合わせる
      const actorWindowRect = this._actorWindow.itemRect(0);
      const x = actorWindowRect.x + actorWindowRect.width / 2 + 10;
      const y = this._actorWindow.y;

      this._targetCursorSprite1.setTarget(x, y);
      this._targetCursorSprite2.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite3.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite4.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite5.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite6.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite7.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );
      this._targetCursorSprite8.setTarget(
        this._targetCursorSprite1.x,
        this._targetCursorSprite1.y
      );

      this._targetCursorSprite1.visible = false;
      this._targetCursorSprite2.visible = false;
      this._targetCursorSprite3.visible = false;
      this._targetCursorSprite4.visible = false;
      this._targetCursorSprite5.visible = false;
      this._targetCursorSprite6.visible = false;
      this._targetCursorSprite7.visible = false;
      this._targetCursorSprite8.visible = false;

      this._exSelectWindow.hide();
    }
  };

  Scene_Battle.prototype.onSelectAction = function () {
    const action = BattleManager.inputtingAction();
    if (!action.needsSelection()) {
      if (action.isForAll() || action.isForRandom()) {
        if (action.isForOpponent()) {
          this.startEnemySelection();
          this._enemyWindow.selectForItem(action);
        } else {
          this.startActorSelection();
          this._actorWindow.selectForItem(action);
        }
      } else {
        this.selectNextCommand();
      }
    } else if (action.isForOpponent()) {
      this.startEnemySelection();
      this._enemyWindow.selectForItem(action);
    } else {
      this.startActorSelection();
      this._actorWindow.selectForItem(action);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_ExBattleSelect
  //
  // 対象エネミー、対象アクターを表示するウィンドウです。

  function Window_ExBattleSelect() {
    this.initialize(...arguments);
  }

  Window_ExBattleSelect.prototype = Object.create(Window_Base.prototype);
  Window_ExBattleSelect.prototype.constructor = Window_ExBattleSelect;

  Window_ExBattleSelect.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._text = "";

    // 背景画像
    this.createBackground();
  };

  Window_ExBattleSelect.prototype.loadWindowskin = function () {
    this.windowskin = ImageManager.loadSystem(exSelectWindowSkin);
  };

  Window_ExBattleSelect.prototype.setEnemyWindow = function (enemyWindow) {
    this._enemyWindow = enemyWindow;
  };

  Window_ExBattleSelect.prototype.setActorWindow = function (actorWindow) {
    this._actorWindow = actorWindow;
  };

  Window_ExBattleSelect.prototype.update = function () {
    Window_Base.prototype.update.call(this);

    if (!this._enemyWindow.visible && !this._actorWindow.visible) {
      exSelectWindowVisible = false;
    }
    this.visible = exSelectWindowVisible;
    if (this._bgSprite) {
      this._bgSprite.opacity = this.openness;
    }
  };

  Window_ExBattleSelect.prototype.setPlacement = function (x, y, text) {
    this.width = this.windowWidth(text);
    if (x === exSelectWindowHomeX && y === exSelectWindowHomeY) {
      this.x = x;
      this.y = y;
    } else {
      this.x = x - this.width / 2 + exSelectWindowAdjustX;
      this.y = y - this.height / 2 + exSelectWindowAdjustY;
    }

    // 文字の更新
    this.contents.clear();
    this.drawText(text, 0, 0, this.innerWidth, "center");
  };

  Window_ExBattleSelect.prototype.windowWidth = function (text) {
    if (text) {
      const textWidth = this.textSizeEx(text).width;
      const padding = this.padding + this.itemPadding();
      const width = Math.ceil(textWidth) + padding * 2;
      return Math.min(width, Graphics.boxWidth);
    } else {
      return 0;
    }
  };

  Window_ExBattleSelect.prototype.createBackground = function () {
    this._bgSprite = new Sprite();
    this._bgSprite.bitmap = ImageManager.loadSystem(exSelectWindowBackground);
    this._bgSprite.bitmap.addLoadListener(
      function () {
        this._bgSprite.x = 0 + exSelectWindowBackgroundX;
        this._bgSprite.y = 0 + exSelectWindowBackgroundY;
      }.bind(this)
    );
    this._bgSprite.opacity = 0;
    this.addChildAt(this._bgSprite, 1);
  };

  //-----------------------------------------------------------------------------
  // Window_BattleEnemy
  //

  const _Window_BattleEnemy_initialize =
    Window_BattleEnemy.prototype.initialize;
  Window_BattleEnemy.prototype.initialize = function (rect) {
    _Window_BattleEnemy_initialize.apply(this, arguments);

    this.opacity = 0;
    this.contentsOpacity = 0;
    this.width = 0;
  };

  Window_BattleEnemy.prototype.maxCols = function () {
    return 1;
  };

  Window_BattleEnemy.prototype.cursorRight = function (wrap) {
    Window_Selectable.prototype.cursorDown.apply(this, arguments);
  };

  Window_BattleEnemy.prototype.cursorLeft = function (wrap) {
    Window_Selectable.prototype.cursorUp.apply(this, arguments);
  };

  Window_BattleEnemy.prototype.updateArrows = function () {
    this.downArrowVisible = false;
    this.upArrowVisible = false;
  };

  Window_BattleEnemy.prototype.selectForItem = function (action) {
    if (action.isForAll() || action.isForRandom()) {
      this.setCursorFixed(true);
      this.setCursorAll(true);
    } else {
      this.setCursorFixed(false);
      this.setCursorAll(false);
    }
    this.forceSelect(0);
  };

  const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
  Window_BattleEnemy.prototype.select = function (index) {
    if (this.cursorAll()) {
      Window_Selectable.prototype.select.call(this, index);
      $gameTroop.multipleSelect($gameTroop.aliveMembers());
    } else {
      _Window_BattleEnemy_select.apply(this, arguments);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_BattleActor
  //

  Window_BattleActor.prototype.selectForItem = function (action) {
    if (action.isForAll() || action.isForRandom()) {
      this.setCursorFixed(true);
      this.setCursorAll(true);
    } else {
      this.setCursorFixed(false);
      this.setCursorAll(false);
    }
    this.forceSelect(0);
  };

  const _Window_BattleActor_select = Window_BattleActor.prototype.select;
  Window_BattleActor.prototype.select = function (index) {
    if (this.cursorAll()) {
      Window_Selectable.prototype.select.call(this, index);
      $gameParty.multipleSelect($gameParty.aliveMembers());
    } else {
      _Window_BattleActor_select.apply(this, arguments);
    }

    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const marginY = -48;
    if (actor) {
      exSelectWindowTargetX = rect.x + rect.width / 2 + this.itemPadding();
      exSelectWindowTargetY = this.y + marginY;
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Unit
  //

  Game_Unit.prototype.multipleSelect = function (activeMembers) {
    for (const member of this.members()) {
      if (activeMembers.includes(member)) {
        member.select();
      } else {
        member.deselect();
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_LL_BattleCursor
  //
  // バトルカーソルを表示するための独自のスプライトを追加定義します。

  function Sprite_LL_BattleCursor() {
    this.initialize.apply(this, arguments);
  }

  Sprite_LL_BattleCursor.prototype = Object.create(Sprite.prototype);
  Sprite_LL_BattleCursor.prototype.constructor = Sprite_LL_BattleCursor;

  Sprite_LL_BattleCursor.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);

    this._homeX = 0;
    this._homeY = 0;
    this._targetX = 0;
    this._targetY = 0;
    this._targetMoveCount = 0;
  };

  Sprite_LL_BattleCursor.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updatePosition();
  };

  Sprite_LL_BattleCursor.prototype.setTarget = function (x, y) {
    if (
      this._targetX === x + cursorAdjustX &&
      this._targetY === y + cursorAdjustY
    )
      return;

    this._targetMoveCount = 0;
    this._targetX = x + cursorAdjustX;
    this._targetY = y + cursorAdjustY;
    this._homeX = this.x;
    this._homeY = this.y;
  };

  Sprite_LL_BattleCursor.prototype.updatePosition = function () {
    // イージングアニメーション
    const moveFream = cursorMoveFream;
    const moveRate = Math.sqrt(
      1 - Math.pow(this._targetMoveCount / moveFream - 1, 2)
    );
    const moveX = Math.round((this._targetX - this._homeX) * moveRate);
    const moveY = Math.round((this._targetY - this._homeY) * moveRate);
    this.x = this._homeX + moveX;
    this.y = this._homeY + moveY;
    if (this._targetMoveCount < moveFream) this._targetMoveCount += 1;
  };
})();
