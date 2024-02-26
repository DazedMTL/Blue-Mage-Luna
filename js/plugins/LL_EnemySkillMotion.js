//=============================================================================
// RPGツクールMZ - LL_EnemySkillMotion.js v1.3.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 敵キャラにモーションを実装します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_EnemySkillMotion.js
 *
 * 敵キャラにモーションを実装します。
 * 出現時、スキル発動時、ダメージ時にモーションを再生する機能を実装します。
 * 下記のタグを記述することでモーションが再生されます。
 *
 * 1. スキルのメモ欄に記述
 *   <motion_action:1>             # スキル発動時に敵キャラが左右移動
 *   <motion_action:2>             # スキル発動時に敵キャラが回転
 *
 * 2. 敵キャラのメモ欄に記述
 *   <motion_action:none>          # スキル発動時のモーションを無効に
 *   <start_motion:upper>          # 戦闘開始時に上から出現
 *   <start_motion:lower>          # 戦闘開始時に下から出現
 *   <start_motion:left>           # 戦闘開始時に左から出現
 *   <start_motion:right>          # 戦闘開始時に右から出現
 *   <start_motion:upper,50>       # 戦闘開始時に50％の確率で上から出現
 *   <damage_motion:blink>         # ダメージ時に点滅
 *   <damage_se:Devil1>            # ダメージ時にSE:Devil1を再生
 *   <hue_animation:0,360,1>       # 0～360で1Fで色相アニメーション
 *   <hue_animation:0,360,1,60>    # 始点60F待機後に色相アニメーション
 *   <hue_animation:0,360,1,60,1>  # 終点から逆再生して色相アニメーション
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/12/16
 *
 * @param damageSettings
 * @text ダメージ時の設定
 * @desc ※この項目は使用しません
 *
 * @param damageSeDisabledVariableId
 * @text 通常SE無効化変数
 * @desc この変数が0以外の時、通常のダメージSEを無効化して
 * 指定したダメージSEのみを再生します。
 * @type variable
 * @parent damageSettings
 *
 * @param blinkStrength
 * @text 点滅の強さ
 * @desc ダメージ時の点滅効果が指定されている時の、
 * 点滅効果の強さを指定します。(0～255)
 * @default 192
 * @min 0
 * @max 255
 * @type number
 * @parent damageSettings
 */

(() => {
  "use strict";
  const pluginName = "LL_EnemySkillMotion";

  const parameters = PluginManager.parameters(pluginName);
  const damageSeDisabledVariableId = Number(
    parameters["damageSeDisabledVariableId"] || 0
  );
  const blinkStrength = Number(parameters["blinkStrength"] || 192);

  // アニメーションフレーム数定義
  const animationFrame = {
    action1: 36,
    action2: 36,
    upper: 128,
    lower: 128,
    left: 128,
    right: 128,
    blink: 36,
    none: 0,
  };

  //-----------------------------------------------------------------------------
  // Sprite_Enemy
  //

  const _Sprite_Enemy_updatePosition = Sprite_Enemy.prototype.updatePosition;
  Sprite_Enemy.prototype.updatePosition = function () {
    _Sprite_Enemy_updatePosition.apply(this, arguments);

    this.x += this._offsetXLL;
    this.y += this._offsetYLL;
  };

  const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
  Sprite_Enemy.prototype.initMembers = function () {
    _Sprite_Enemy_initMembers.apply(this, arguments);

    this._currentAction = "";
    this._motionLL = "";
    this._animationCountLL = 0;
    this._offsetXLL = 0;
    this._offsetYLL = 0;

    // 色相アニメーション
    this._hueAnimation = null;
    this._hueAnimationFrame = 0;
    this._hueAnimationFrameCount = 0;
    this._hueAnimationFrameReverse = false;
    this._hueAnimationFrameIsReverse = false;
    this._hueAnimationFrameInterval = 0;
  };

  const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
  Sprite_Enemy.prototype.update = function () {
    _Sprite_Enemy_update.apply(this, arguments);

    if (this._enemy) {
      this.refreshBitmapLL();
      this.updateMotionLL(this._motionLL);
      this.hueAnimationLL();
    }
  };

  Sprite_Enemy.prototype.refreshBitmapLL = function () {
    const isPhase = BattleManager.isPhase();

    //------------------------------
    // 出現時
    //------------------------------
    if (this._enemy._startMotionLL) {
      if (isPhase == "start") {
        if (this._currentAction !== "Start") {
          this._currentAction = "Start";
          // 出現時モーション情報を取得
          const startMotion = this._enemy._startMotionLL;
          this.setBitmapLL(startMotion);
          return;
        }
      }
    }

    //------------------------------
    // 被ダメージ時
    //------------------------------
    if (this._enemy._damageLL) {
      // リフレッシュ判定
      if (this._enemy._damageRefreshLL) {
        this._currentAction = "";
        this._enemy._damageRefreshLL = false;
      }
      if (isPhase == "action") {
        if (this._currentAction !== "Damage") {
          this._currentAction = "Damage";
          // 敵キャラのメタ情報を取得
          let enemyMetaData = "";
          if (this._enemy) {
            enemyMetaData = this._enemy.enemy().meta;
          }
          // ダメージモーション
          if (enemyMetaData["damage_motion"]) {
            this.setBitmapLL(enemyMetaData["damage_motion"]);
          }
          // ダメージSE
          if (enemyMetaData["damage_se"]) {
            this.playSeLL(enemyMetaData["damage_se"]);
          }
        }
      } else {
        this._enemy._damageLL = false;
      }
      return;
    }
    //------------------------------
    // アクション時
    //------------------------------
    if (this._enemy._actionLL) {
      if (isPhase == "action") {
        if (this._currentAction !== "Action") {
          this._currentAction = "Action";
          // アクション情報を取得
          const activeActionItem = this._enemy._actionLL._item;
          if (activeActionItem) {
            // スキルのメタ情報を取得
            const metaData = activeActionItem.object().meta;
            // 敵キャラのメタ情報を取得
            let enemyMetaData = "";
            if (this._enemy) {
              enemyMetaData = this._enemy.enemy().meta;
            }

            if (enemyMetaData["motion_action"] != "none") {
              if (metaData["motion_action"] == "1") {
                this.setBitmapLL("action1");
              }
              if (metaData["motion_action"] == "2") {
                this.setBitmapLL("action2");
              }
            }
          }
        }
        return;
      } else {
        this._enemy._actionLL = false;
      }
    }

    if (isPhase !== "action" && isPhase !== "start") {
      this._currentAction = "Normal";
    }
  };

  Sprite_Enemy.prototype.setBitmapLL = function (motion) {
    this._offsetXLL = 0;
    this._offsetYLL = 0;
    this._motionLL = motion;
    this._animationCountLL = animationFrame[this._motionLL];
  };

  Sprite_Enemy.prototype.updateMotionLL = function (sMotion) {
    if (this._animationCountLL < 1) return;
    if (sMotion == "action1") {
      // 移動
      if (this._animationCountLL > 24) {
        this._offsetXLL -= 2;
        this._offsetYLL += 2;
      } else if (this._animationCountLL > 12) {
        this._offsetXLL += 4;
      } else {
        this._offsetXLL -= 2;
        this._offsetYLL -= 2;
      }
      // 反転
      if (this._animationCountLL > 24) {
        if (this.scale.x < 0) {
          this.scale.x *= -1;
        }
      } else if (this._animationCountLL > 12) {
        if (this.scale.x > 0) {
          this.scale.x *= -1;
        }
      } else {
        if (this.scale.x < 0) {
          this.scale.x *= -1;
        }
      }

      this._animationCountLL -= 1;
    }
    if (sMotion == "action2") {
      // 移動・拡大
      if (this._animationCountLL > 18) {
        this._offsetXLL -= 2;
        this._offsetYLL -= 10;
        this.scale.x += 0.02;
        this.scale.y += 0.02;
      } else {
        this._offsetXLL += 2;
        this._offsetYLL += 10;
        this.scale.x -= 0.02;
        this.scale.y -= 0.02;
      }
      // 回転
      if (this._animationCountLL > 1) {
        this.rotation = (this._animationCountLL / 36) * 6;
      } else {
        this.rotation = 0;
      }

      this._animationCountLL -= 1;
    }
    if (sMotion == "upper") {
      // イージングアニメーション
      const moveYFream = 128;
      const moveHeight = Graphics.boxHeight / 2;
      const animationCount = moveYFream - (this._animationCountLL - 1);
      const moveYRate = Math.sqrt(
        1 - Math.pow(animationCount / moveYFream - 1, 2)
      );
      this._offsetYLL = Math.round(moveHeight * moveYRate) - moveHeight;

      this._animationCountLL -= 1;
    }
    if (sMotion == "lower") {
      // イージングアニメーション
      const moveYFream = 128;
      const moveHeight = Graphics.boxHeight / 2;
      const animationCount = moveYFream - (this._animationCountLL - 1);
      const moveYRate = Math.sqrt(
        1 - Math.pow(animationCount / moveYFream - 1, 2)
      );
      this._offsetYLL = (Math.round(moveHeight * moveYRate) - moveHeight) * -1;

      this._animationCountLL -= 1;
    }
    if (sMotion == "left") {
      // イージングアニメーション
      const moveYFream = 128;
      const moveWidth = Graphics.boxWidth / 2;
      const animationCount = moveYFream - (this._animationCountLL - 1);
      const moveYRate = Math.sqrt(
        1 - Math.pow(animationCount / moveYFream - 1, 2)
      );
      this._offsetXLL = Math.round(moveWidth * moveYRate) - moveWidth;

      this._animationCountLL -= 1;
    }
    if (sMotion == "right") {
      // イージングアニメーション
      const moveYFream = 128;
      const moveWidth = Graphics.boxWidth / 2;
      const animationCount = moveYFream - (this._animationCountLL - 1);
      const moveYRate = Math.sqrt(
        1 - Math.pow(animationCount / moveYFream - 1, 2)
      );
      this._offsetXLL = (Math.round(moveWidth * moveYRate) - moveWidth) * -1;

      this._animationCountLL -= 1;
    }
    if (sMotion == "blink") {
      // 点滅
      if (this._animationCountLL > 1) {
        if (Math.floor(this._animationCountLL / 2) % 2 == 0) {
          this.setColorTone([blinkStrength, blinkStrength, blinkStrength, 0]);
        } else {
          this.setColorTone([
            blinkStrength / 2,
            blinkStrength / 2,
            blinkStrength / 2,
            0,
          ]);
        }
      } else {
        this.setColorTone([0, 0, 0, 0]);
      }

      this._animationCountLL -= 1;
    } else {
      this.setColorTone([0, 0, 0, 0]);
    }

    return this._animationCountLL;
  };

  Sprite_Enemy.prototype.playSeLL = function (seName) {
    if (!seName) return;

    const se = {
      name: seName,
      volume: 90,
      pitch: 100,
      pan: 0,
    };
    AudioManager.playSe(se);
  };

  const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function (battler) {
    _Sprite_Enemy_setBattler.apply(this, arguments);

    this.setHueAnimationLL();
  };

  Sprite_Enemy.prototype.setHueAnimationLL = function () {
    // 色相アニメーションメタ読み込み
    let hueAnimationMeta = [];
    if (this._enemy) {
      const enemyMetaData = this._enemy.enemy().meta;
      if (enemyMetaData["hue_animation"]) {
        hueAnimationMeta = enemyMetaData["hue_animation"].split(",");
      }
    }
    this._hueAnimation = {
      start: Number(hueAnimationMeta[0] || 0),
      end: Number(hueAnimationMeta[1] || 360),
      frame: Number(hueAnimationMeta[2] || 0),
      interval: Number(hueAnimationMeta[3] || 0),
      reverse: eval(hueAnimationMeta[4] || "false"),
    };
    this._hueAnimationFrame = this._hueAnimation.start;
    this._hueAnimationFrameCount = this._hueAnimation.frame;
    this._hueAnimationFrameInterval = this._hueAnimation.interval;
    this._hueAnimationFrameReverse = this._hueAnimation.reverse;
  };

  Sprite_Enemy.prototype.hueAnimationLL = function () {
    if (this._hueAnimation) {
      if (this._hueAnimation.frame > 0) {
        this._hueAnimationFrameCount--;
        // 色相適用
        this.setHue(this._hueAnimationFrame);
        // 色相変化
        if (this._hueAnimationFrameCount < 1) {
          this._hueAnimationFrameCount = this._hueAnimation.frame;
          // 始点待機フレーム加算
          if (this._hueAnimationFrame === this._hueAnimation.start) {
            this._hueAnimationFrameCount += this._hueAnimation.interval;
          }
          this._hueAnimationFrame += !this._hueAnimationFrameIsReverse ? 1 : -1;
        }
        // 色相開始点リセット
        if (this._hueAnimationFrame >= this._hueAnimation.end) {
          if (this._hueAnimationFrameReverse) {
            this._hueAnimationFrameIsReverse = true;
          } else {
            this._hueAnimationFrame = this._hueAnimation.start;
          }
        }
        if (this._hueAnimationFrame <= this._hueAnimation.start) {
          this._hueAnimationFrameIsReverse = false;
        }
      }
    }
  };

  //-----------------------------------------------------------------------------
  // BattleManager
  //

  BattleManager.isPhase = function () {
    return this._phase;
  };

  //-----------------------------------------------------------------------------
  // Game_Enemy
  //

  const _Game_Enemy_initialize = Game_Enemy.prototype.initialize;
  Game_Enemy.prototype.initialize = function (enemyId, x, y) {
    _Game_Enemy_initialize.apply(this, arguments);

    // 出現時モーション
    this.startMotionLL();
  };

  const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
  Game_Enemy.prototype.initMembers = function () {
    _Game_Enemy_initMembers.apply(this, arguments);

    this._actionLL = null;
    this._damageLL = false;
    this._damageRefreshLL = false;
    this._startMotionLL = "";
  };

  const _Game_Enemy_performActionStart =
    Game_Enemy.prototype.performActionStart;
  Game_Enemy.prototype.performActionStart = function (action) {
    _Game_Enemy_performActionStart.apply(this, arguments);

    this._actionLL = action;
  };

  const _Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
  Game_Enemy.prototype.performDamage = function () {
    // メタ情報取得
    const metaData = this.enemy().meta;
    // 通常SE無効化
    if (
      metaData["damage_se"] &&
      $gameVariables.value(damageSeDisabledVariableId) !== 0
    ) {
      Game_Battler.prototype.performDamage.call(this);
      this.requestEffect("blink");
      // SoundManager.playEnemyDamage();
    } else {
      _Game_Enemy_performDamage.apply(this, arguments);
    }

    this._damageLL = true;
    this._damageRefreshLL = true;
  };

  Game_Enemy.prototype.startMotionLL = function () {
    // メタ情報取得
    const metaData = this.enemy().meta;
    if (metaData["start_motion"]) {
      const startMotionMeta = metaData["start_motion"].split(",");
      // 確率判定
      if (startMotionMeta[1]) {
        if (Math.random() > Number(startMotionMeta[1]) / 100) {
          return;
        }
      }
      // 出現時モーション指定
      this._startMotionLL = startMotionMeta[0];
    }
  };
})();
