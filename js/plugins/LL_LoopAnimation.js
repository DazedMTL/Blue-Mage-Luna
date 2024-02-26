//=============================================================================
// RPGツクールMZ - LL_LoopAnimation.js v1.6.1
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// Secondary use of this plugin is not permitted.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ループアニメーションを再生します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin/
 *
 * @help LL_LoopAnimation.js
 *
 * ループアニメーションを再生します。
 * アニメーション再生・停止はプラグインコマンドでおこないます。
 * アニメーション番号毎に、複数同時再生が可能です。
 *
 * プラグインコマンド:
 *   アニメーションの再生:           ループアニメーションを再生します。
 *   アニメーションの停止:           ループアニメーションを停止します。
 *   アニメーションの事前読み込み:   画像のプリロードをおこないます。
 *   アニメーションの静止画切り出し:
 *     アニメーションのフレームを静止画として切り出しで表示します。
 *
 * アニメーションフレームの記述方法:
 *   [フレーム画像],[SE],[SE無効化変数]
 *   runa_1/ruuna_seijo01              ←効果音なし
 *   runa_1/ruuna_seijo01,sonyuu-2     ←効果音あり
 *   runa_1/ruuna_seijo01,sonyuu-2,21  ←効果音あり(変数ID:21が0以外の時は停止)
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/12/16
 *
 * @command playAnimation
 * @text アニメーションの再生
 * @desc ループアニメーションを再生します。
 *
 * @arg number
 * @text アニメーション番号
 * @desc どのアニメーション番号に表示するか選択します。
 * @type select
 * @default 1
 * @option 1
 * @value 1
 * @option 2
 * @value 2
 * @option 3
 * @value 3
 * @option 4
 * @value 4
 * @option 5
 * @value 5
 * @option 6
 * @value 6
 * @option 7
 * @value 7
 * @option 8
 * @value 8
 *
 * @arg id
 * @text アニメーションID
 * @desc 表示するアニメーションIDです。
 * @type string
 *
 * @arg x
 * @text X座標
 * @desc アニメーションのX座標です。
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 *
 * @arg y
 * @text Y座標
 * @desc アニメーションのY座標です。
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 *
 * @arg scaleX
 * @text X拡大率
 * @desc アニメーションの拡大率(X)です。
 * \V[n]と入力すると変数n番を参照します。
 * @default 100
 * @type string
 *
 * @arg scaleY
 * @text Y拡大率
 * @desc アニメーションの拡大率(Y)です。
 * \V[n]と入力すると変数n番を参照します。
 * @default 100
 * @type string
 *
 * @arg reverse
 * @text 反転
 * @desc 0:通常、1:反転
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 *
 * @arg rotation
 * @text 回転
 * @desc アニメーションの回転率(-360～360)です。
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 *
 * @arg overlayImage
 * @text オーバーレイ画像
 * @desc オーバーレイとして表示する画像ファイルを選択してください。
 * 画像は画面サイズの大きさで作成してください。(固定表示)
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @arg tone
 * @text 色調の設定
 * @desc ※この項目は使用しません
 *
 * @arg toneR
 * @text 赤
 * @desc 色調のR成分です。 (-255～255)
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 * @parent tone
 *
 * @arg toneG
 * @text 緑
 * @desc 色調のG成分です。 (-255～255)
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 * @parent tone
 *
 * @arg toneB
 * @text 青
 * @desc 色調のB成分です。 (-255～255)
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 * @parent tone
 *
 * @arg toneC
 * @text グレー
 * @desc グレースケールの強さです。 (0～255)
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 * @parent tone
 *
 * @arg hue
 * @text 色相アニメーション
 * @desc ※この項目は使用しません
 *
 * @arg hueStart
 * @text 始点
 * @desc 色相アニメーションの始点です。 (0～360)
 * @default 0
 * @type string
 * @parent hue
 *
 * @arg hueEnd
 * @text 終点
 * @desc 色相アニメーションの終点です。 (0～360)
 * @default 360
 * @type string
 * @parent hue
 *
 * @arg hueFrame
 * @text 再生フレーム数
 * @desc 1色相あたりの再生フレーム数です。
 * 0にすると色相アニメーションを再生しません。
 * @default 0
 * @type string
 * @parent hue
 *
 * @arg hueInterval
 * @text 始点待機フレーム数
 * @desc 始点で待機するフレーム数です。
 * @default 0
 * @type string
 * @parent hue
 *
 * @arg hueReverse
 * @text 終点から逆再生
 * @desc ONにすると終点から始点まで逆再生でループします。
 * @default false
 * @type boolean
 * @parent hue
 *
 * @command stopAnimation
 * @text アニメーションの停止
 * @desc ループアニメーションを停止します。
 *
 * @arg number
 * @text アニメーション番号
 * @desc どのアニメーション番号を停止するか選択します。
 * @type select
 * @default 1
 * @option 1
 * @value 1
 * @option 2
 * @value 2
 * @option 3
 * @value 3
 * @option 4
 * @value 4
 * @option 5
 * @value 5
 * @option 6
 * @value 6
 * @option 7
 * @value 7
 * @option 8
 * @value 8
 *
 * @command reserveAnimation
 * @text アニメーションの事前読み込み
 * @desc ループアニメーション画像のプリロードをおこないます。
 * 再生前に読み込みしておくと画像読み込み待ちが発生しません。
 *
 * @arg id
 * @text アニメーションID
 * @desc プリロードをおこなうアニメーションIDです。
 * @type string
 *
 * @arg overlayImage
 * @text オーバーレイ画像
 * @desc プリロードをおこなうオーバーレイ画像です。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @command clippingAnimation
 * @text アニメーションの静止画切り出し
 * @desc ループアニメーションのフレームを
 * 静止画として切り出して表示します。
 *
 * @arg number
 * @text アニメーション番号
 * @desc どのアニメーション番号に表示するか選択します。
 * @type select
 * @default 1
 * @option 1
 * @value 1
 * @option 2
 * @value 2
 * @option 3
 * @value 3
 * @option 4
 * @value 4
 * @option 5
 * @value 5
 * @option 6
 * @value 6
 * @option 7
 * @value 7
 * @option 8
 * @value 8
 *
 * @arg id
 * @text アニメーションID
 * @desc 表示するアニメーションIDです。
 * @type string
 *
 * @arg fixedFrame
 * @text 切り出しフレーム数
 * @desc 静止画として切り出すフレーム数を指定します。
 * @default 1
 * @type number
 * @min 1
 * @max 9999
 *
 * @arg x
 * @text X座標
 * @desc アニメーションのX座標です。
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 *
 * @arg y
 * @text Y座標
 * @desc アニメーションのY座標です。
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 *
 * @arg scaleX
 * @text X拡大率
 * @desc アニメーションの拡大率(X)です。
 * \V[n]と入力すると変数n番を参照します。
 * @default 100
 * @type string
 *
 * @arg scaleY
 * @text Y拡大率
 * @desc アニメーションの拡大率(Y)です。
 * \V[n]と入力すると変数n番を参照します。
 * @default 100
 * @type string
 *
 * @arg reverse
 * @text 反転
 * @desc 0:通常、1:反転
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 *
 * @arg rotation
 * @text 回転
 * @desc アニメーションの回転率(-360～360)です。
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 *
 * @arg overlayImage
 * @text オーバーレイ画像
 * @desc オーバーレイとして表示する画像ファイルを選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @arg tone
 * @text 色調の設定
 * @desc ※この項目は使用しません
 *
 * @arg toneR
 * @text 赤
 * @desc 色調のR成分です。 (-255～255)
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 * @parent tone
 *
 * @arg toneG
 * @text 緑
 * @desc 色調のG成分です。 (-255～255)
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 * @parent tone
 *
 * @arg toneB
 * @text 青
 * @desc 色調のB成分です。 (-255～255)
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 * @parent tone
 *
 * @arg toneC
 * @text グレー
 * @desc グレースケールの強さです。 (0～255)
 * \V[n]と入力すると変数n番を参照します。
 * @default 0
 * @type string
 * @parent tone
 *
 * @arg hue
 * @text 色相アニメーション
 * @desc ※この項目は使用しません
 *
 * @arg hueStart
 * @text 始点
 * @desc 色相アニメーションの始点です。 (0～360)
 * @default 0
 * @type string
 * @parent hue
 *
 * @arg hueEnd
 * @text 終点
 * @desc 色相アニメーションの終点です。 (0～360)
 * @default 360
 * @type string
 * @parent hue
 *
 * @arg hueFrame
 * @text 再生フレーム数
 * @desc 1色相あたりの再生フレーム数です。
 * 0にすると色相アニメーションを再生しません。
 * @default 0
 * @type string
 * @parent hue
 *
 * @arg hueInterval
 * @text 始点待機フレーム数
 * @desc 始点で待機するフレーム数です。
 * @default 0
 * @type string
 * @parent hue
 *
 * @arg hueReverse
 * @text 終点から逆再生
 * @desc ONにすると終点から始点まで逆再生でループします。
 * @default false
 * @type boolean
 * @parent hue
 *
 * @param animations
 * @text アニメーションリスト
 * @desc 再生するアニメーションリストを定義します。
 * @default []
 * @type struct<animations>[]
 *
 * @param reserveImageWait
 * @text 事前読み込み時のウェイト
 * @desc 事前読み込み実行時、読み込みが完了するまでウェイトします。
 * @default true
 * @type boolean
 *
 * @param titleSettings
 * @text タイトル画面の設定
 * @desc ※この項目は使用しません
 *
 * @param titleAnimations1
 * @text アニメーション1
 * @desc タイトル画面で表示するアニメーションを設定します。
 * @default
 * @type struct<titleAnimations>
 * @parent titleSettings
 *
 * @param titleAnimations2
 * @text アニメーション2
 * @desc タイトル画面で表示するアニメーションを設定します。
 * @default
 * @type struct<titleAnimations>
 * @parent titleSettings
 *
 * @param titleAnimations3
 * @text アニメーション3
 * @desc タイトル画面で表示するアニメーションを設定します。
 * @default
 * @type struct<titleAnimations>
 * @parent titleSettings
 *
 * @param titleAnimations4
 * @text アニメーション4
 * @desc タイトル画面で表示するアニメーションを設定します。
 * @default
 * @type struct<titleAnimations>
 * @parent titleSettings
 *
 * @param titleAnimations5
 * @text アニメーション5
 * @desc タイトル画面で表示するアニメーションを設定します。
 * @default
 * @type struct<titleAnimations>
 * @parent titleSettings
 *
 * @param titleAnimations6
 * @text アニメーション6
 * @desc タイトル画面で表示するアニメーションを設定します。
 * @default
 * @type struct<titleAnimations>
 * @parent titleSettings
 *
 * @param titleAnimations7
 * @text アニメーション7
 * @desc タイトル画面で表示するアニメーションを設定します。
 * @default
 * @type struct<titleAnimations>
 * @parent titleSettings
 *
 * @param titleAnimations8
 * @text アニメーション8
 * @desc タイトル画面で表示するアニメーションを設定します。
 * @default
 * @type struct<titleAnimations>
 * @parent titleSettings
 *
 * @param titleReserveImage
 * @text 起動時に事前読み込み
 * @desc タイトル画面に表示する画像のプリロードをおこないます。
 * 起動が遅くなる場合はオフに設定してください。
 * @type boolean
 * @default true
 * @parent titleSettings
 */

/*~struct~animations:
 *
 * @param id
 * @text アニメーションID
 * @desc 再生時に呼び出す際に使用するIDです。
 * 半角英数字(_)で入力してください。
 * @type string
 *
 * @param animationFrames
 * @text アニメーションフレーム
 * @desc img/ll_loopanimation配下の画像パスを改行区切りで入力。
 * カンマ区切りでSE名を入力することで効果音を再生できます。
 * アニメーションフレームを定義します。
 * @type multiline_string
 *
 * @param frame
 * @text 再生フレーム数
 * @desc 1画像あたりの再生フレーム数です。
 * @default 4
 * @type number
 * @min 1
 * @max 9999
 */

/*~struct~titleAnimations:
 *
 * @param id
 * @text アニメーションID
 * @desc 表示するアニメーションIDです。
 * @type string
 *
 * @param fixedFrame
 * @text 切り出しフレーム数
 * @desc 静止画として切り出すフレーム数を指定します。
 * 動画として再生する場合は空白にしてください。
 * @default
 * @type string
 *
 * @param x
 * @text X座標
 * @desc アニメーションのX座標です。
 * @default 0
 * @type string
 *
 * @param y
 * @text Y座標
 * @desc アニメーションのY座標です。
 * @default 0
 * @type string
 *
 * @param scaleX
 * @text X拡大率
 * @desc アニメーションの拡大率(X)です。
 * @default 100
 * @type string
 *
 * @param scaleY
 * @text Y拡大率
 * @desc アニメーションの拡大率(Y)です。
 * @default 100
 * @type string
 *
 * @param reverse
 * @text 反転
 * @desc 0:通常、1:反転
 * @default 0
 * @type string
 *
 * @param rotation
 * @text 回転
 * @desc アニメーションの回転率(-360～360)です。
 * @default 0
 * @type string
 *
 * @param tone
 * @text 色調の設定
 * @desc ※この項目は使用しません
 *
 * @param toneR
 * @text 赤
 * @desc 色調のR成分です。 (-255～255)
 * @default 0
 * @type string
 * @parent tone
 *
 * @param toneG
 * @text 緑
 * @desc 色調のG成分です。 (-255～255)
 * @default 0
 * @type string
 * @parent tone
 *
 * @param toneB
 * @text 青
 * @desc 色調のB成分です。 (-255～255)
 * @default 0
 * @type string
 * @parent tone
 *
 * @param toneC
 * @text グレー
 * @desc グレースケールの強さです。 (0～255)
 * @default 0
 * @type string
 * @parent tone
 *
 * @param hue
 * @text 色相アニメーション
 * @desc ※この項目は使用しません
 *
 * @param hueStart
 * @text 始点
 * @desc 色相アニメーションの始点です。 (0～360)
 * @default 0
 * @type string
 * @parent hue
 *
 * @param hueEnd
 * @text 終点
 * @desc 色相アニメーションの終点です。 (0～360)
 * @default 360
 * @type string
 * @parent hue
 *
 * @param hueFrame
 * @text 再生フレーム数
 * @desc 1色相あたりの再生フレーム数です。
 * 0にすると色相アニメーションを再生しません。
 * @default 0
 * @type string
 * @parent hue
 *
 * @param hueInterval
 * @text 始点待機フレーム数
 * @desc 始点で待機するフレーム数です。
 * @default 0
 * @type string
 * @parent hue
 *
 * @param hueReverse
 * @text 終点から逆再生
 * @desc ONにすると終点に到達したら始点まで逆再生します。
 * @default false
 * @type boolean
 * @parent hue
 */

(() => {
  "use strict";
  const pluginName = "LL_LoopAnimation";

  const parameters = PluginManager.parameters(pluginName);
  const paramJsonParse = function (key, value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  };

  const animations = String(parameters["animations"] || "");
  const animationLists = JSON.parse(JSON.stringify(animations, paramJsonParse));
  const reserveImageWait = eval(parameters["reserveImageWait"] || "true");

  // タイトル画面のアニメーション設定
  const titleAnimations = {
    1: JSON.parse(
      JSON.stringify(
        String(parameters["titleAnimations1"] || ""),
        paramJsonParse
      )
    ),
    2: JSON.parse(
      JSON.stringify(
        String(parameters["titleAnimations2"] || ""),
        paramJsonParse
      )
    ),
    3: JSON.parse(
      JSON.stringify(
        String(parameters["titleAnimations3"] || ""),
        paramJsonParse
      )
    ),
    4: JSON.parse(
      JSON.stringify(
        String(parameters["titleAnimations4"] || ""),
        paramJsonParse
      )
    ),
    5: JSON.parse(
      JSON.stringify(
        String(parameters["titleAnimations5"] || ""),
        paramJsonParse
      )
    ),
    6: JSON.parse(
      JSON.stringify(
        String(parameters["titleAnimations6"] || ""),
        paramJsonParse
      )
    ),
    7: JSON.parse(
      JSON.stringify(
        String(parameters["titleAnimations7"] || ""),
        paramJsonParse
      )
    ),
    8: JSON.parse(
      JSON.stringify(
        String(parameters["titleAnimations8"] || ""),
        paramJsonParse
      )
    ),
  };
  const titleReserveImage = eval(parameters["titleReserveImage"] || "true");

  // アニメーション最大数
  const ANIMATION_MAX = 8;

  // アニメーションの再生
  PluginManager.registerCommand(pluginName, "playAnimation", (args) => {
    const number = Number(args.number || 1);
    const animationId = String(args.id || "");

    // 制御文字変換 (変数指定)
    const variableReplacer = (_, p1) => $gameVariables.value(parseInt(p1));

    const x = Number(
      String(args.x || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    const y = Number(
      String(args.y || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    let scaleX = Number(
      String(args.scaleX || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) ||
        100
    );
    let scaleY = Number(
      String(args.scaleY || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) ||
        100
    );
    const reverse = Number(
      String(args.reverse || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) ||
        0
    );
    const rotation = Number(
      String(args.rotation || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) ||
        0
    );
    const toneR = Number(
      String(args.toneR || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    const toneG = Number(
      String(args.toneG || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    const toneB = Number(
      String(args.toneB || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    const toneC = Number(
      String(args.toneC || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    const tone = [toneR, toneG, toneB, toneC];
    const picture = String(args.overlayImage || "");

    // 反転
    if (reverse != 0) scaleX = -scaleX;

    // 色相アニメーション
    const hueAnimation = {
      start: Number(
        String(args.hueStart || "").replace(
          /\\V\[(\d+)\]/gi,
          variableReplacer
        ) || 0
      ),
      end: Number(
        String(args.hueEnd || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) ||
          360
      ),
      frame: Number(
        String(args.hueFrame || "").replace(
          /\\V\[(\d+)\]/gi,
          variableReplacer
        ) || 0
      ),
      interval: Number(
        String(args.hueInterval || "").replace(
          /\\V\[(\d+)\]/gi,
          variableReplacer
        ) || 0
      ),
      reverse: eval(args.hueReverse || "false"),
    };

    // 旧セーブデータ対策
    if (!$gameSystem._LL_LoopAnimation) {
      $gameSystem._LL_LoopAnimation = {};
      for (let i = 1; i <= ANIMATION_MAX; i++) {
        $gameSystem._LL_LoopAnimation[i] = {
          animationId: "",
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          tone: [0, 0, 0, 0],
          picture: "",
        };
      }
    }

    // アニメーションセット
    $gameSystem._LL_LoopAnimation[number] = {
      animationId: animationId,
      x: x,
      y: y,
      scaleX: scaleX,
      scaleY: scaleY,
      rotation: rotation,
      tone: tone,
      picture: picture,
      hueAnimation: hueAnimation,
    };
  });

  // アニメーションの停止
  PluginManager.registerCommand(pluginName, "stopAnimation", (args) => {
    const number = Number(args.number || 1);

    // 旧セーブデータ対策
    if (!$gameSystem._LL_LoopAnimation) {
      $gameSystem._LL_LoopAnimation = {};
      for (let i = 1; i <= ANIMATION_MAX; i++) {
        $gameSystem._LL_LoopAnimation[i] = {
          animationId: "",
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          tone: [0, 0, 0, 0],
          picture: "",
        };
      }
    }

    $gameSystem._LL_LoopAnimation[number] = {
      animationId: "",
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      tone: [0, 0, 0, 0],
      picture: "",
    };
  });

  // アニメーション画像の事前読み込み
  PluginManager.registerCommand(
    pluginName,
    "reserveAnimation",
    function (args) {
      const animationId = String(args.id || "");
      const overlayImage = String(args.overlayImage || "");

      // アニメーション設定読み込み
      const animationList = animationLists.find(
        function (item, index) {
          if (item.id === animationId) return true;
        }.bind(this)
      );
      if (!animationList) return;

      const animationFrames = animationList.animationFrames
        .split(/\r\n|\n/)
        .filter((v) => v);

      animationFrames.forEach(function (elm) {
        ImageManager.loadLoopAnimation(elm.split(",")[0]);
      });

      // オーバーレイ画像のプリロード
      ImageManager.loadPicture(overlayImage);

      // 読み込みが完了するまでウェイト
      if (reserveImageWait) {
        this.setWaitMode("image");
      }
    }
  );

  // アニメーションの静止画切り出し
  PluginManager.registerCommand(pluginName, "clippingAnimation", (args) => {
    const number = Number(args.number || 1);
    const animationId = String(args.id || "");
    const fixedFrame = Number(args.fixedFrame || 1);

    // 制御文字変換 (変数指定)
    const variableReplacer = (_, p1) => $gameVariables.value(parseInt(p1));

    const x = Number(
      String(args.x || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    const y = Number(
      String(args.y || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    let scaleX = Number(
      String(args.scaleX || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) ||
        100
    );
    let scaleY = Number(
      String(args.scaleY || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) ||
        100
    );
    const reverse = Number(
      String(args.reverse || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) ||
        0
    );
    const rotation = Number(
      String(args.rotation || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) ||
        0
    );
    const toneR = Number(
      String(args.toneR || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    const toneG = Number(
      String(args.toneG || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    const toneB = Number(
      String(args.toneB || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    const toneC = Number(
      String(args.toneC || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) || 0
    );
    const tone = [toneR, toneG, toneB, toneC];
    const picture = String(args.overlayImage || "");

    // 反転
    if (reverse != 0) scaleX = -scaleX;

    // 色相アニメーション
    const hueAnimation = {
      start: Number(
        String(args.hueStart || "").replace(
          /\\V\[(\d+)\]/gi,
          variableReplacer
        ) || 0
      ),
      end: Number(
        String(args.hueEnd || "").replace(/\\V\[(\d+)\]/gi, variableReplacer) ||
          360
      ),
      frame: Number(
        String(args.hueFrame || "").replace(
          /\\V\[(\d+)\]/gi,
          variableReplacer
        ) || 0
      ),
      interval: Number(
        String(args.hueInterval || "").replace(
          /\\V\[(\d+)\]/gi,
          variableReplacer
        ) || 0
      ),
      reverse: eval(args.hueReverse || "false"),
    };

    // 旧セーブデータ対策
    if (!$gameSystem._LL_LoopAnimation) {
      $gameSystem._LL_LoopAnimation = {};
      for (let i = 1; i <= ANIMATION_MAX; i++) {
        $gameSystem._LL_LoopAnimation[i] = {
          animationId: "",
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          tone: [0, 0, 0, 0],
          picture: "",
        };
      }
    }

    // アニメーションセット
    $gameSystem._LL_LoopAnimation[number] = {
      animationId: animationId,
      x: x,
      y: y,
      scaleX: scaleX,
      scaleY: scaleY,
      rotation: rotation,
      tone: tone,
      picture2: picture,
      fixedFrame: fixedFrame,
      hueAnimation: hueAnimation,
    };
  });

  //-----------------------------------------------------------------------------
  // ImageManager
  //

  ImageManager.loadLoopAnimation = function (filename) {
    return this.loadBitmap("img/ll_loopanimation/", filename);
  };

  //-----------------------------------------------------------------------------
  // Game_System
  //
  // ループアニメーション制御用の独自配列を追加定義します。

  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _Game_System_initialize.apply(this, arguments);

    this._LL_LoopAnimation = {};
    for (let i = 1; i <= ANIMATION_MAX; i++) {
      this._LL_LoopAnimation[i] = {
        animationId: "",
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        tone: [0, 0, 0, 0],
        picture: "",
      };
    }
  };

  //-----------------------------------------------------------------------------
  // ExLoopAnimation
  //
  // ループアニメーションを再生する独自のクラスを追加定義します。

  class ExLoopAnimation {
    static create(scene, targetChild) {
      scene._loopAnimation = {};
      for (let i = ANIMATION_MAX; i >= 1; i--) {
        scene._loopAnimation[i] = new Sprite_LL_LoopAnimation();
        scene.addChildAt(
          scene._loopAnimation[i],
          scene.children.indexOf(targetChild) + 1
        );
      }
    }

    static update(scene, targetVariable) {
      // 旧セーブデータ対策
      if (!targetVariable) {
        return;
      }

      for (let i = 1; i <= ANIMATION_MAX; i++) {
        // 旧セーブデータ対策
        if (targetVariable[i]) {
          if (targetVariable[i].animationId) {
            const animationList = animationLists.find(
              function (item, index) {
                if (item.id === targetVariable[i].animationId) return true;
              }.bind(this)
            );

            if (animationList) {
              if (
                scene._loopAnimation[i].checkCurrentPicture(
                  animationList.id,
                  targetVariable[i]
                )
              ) {
                scene._loopAnimation[i].setPicture(
                  animationList.id,
                  animationList.frame,
                  targetVariable[i]
                );
              }
            }
          } else {
            scene._loopAnimation[i].removePicture();
          }
        }
      }
    }
  }

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.apply(this, arguments);
    ExLoopAnimation.update(this, $gameSystem._LL_LoopAnimation);
  };

  const _Scene_Map_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    _Scene_Map_createDisplayObjects.apply(this, arguments);
    ExLoopAnimation.create(this, this._spriteset);
  };

  //-----------------------------------------------------------------------------
  // Scene_Title
  //

  const _Scene_Title_initialize = Scene_Title.prototype.initialize;
  Scene_Title.prototype.initialize = function () {
    _Scene_Title_initialize.apply(this, arguments);
    this.setLoopAnimation();
  };

  Scene_Title.prototype.setLoopAnimation = function () {
    // タイトル画面に表示するアニメーションを定義
    this._LL_LoopAnimation = {};
    for (let i = 1; i <= ANIMATION_MAX; i++) {
      const animationId = String(titleAnimations[i].id || "");
      const fixedFrame = titleAnimations[i].fixedFrame
        ? Number(titleAnimations[i].fixedFrame || 1)
        : null;
      const x = Number(titleAnimations[i].x || 0);
      const y = Number(titleAnimations[i].y || 0);
      let scaleX = Number(titleAnimations[i].scaleX || 100);
      let scaleY = Number(titleAnimations[i].scaleY || 100);
      const reverse = Number(titleAnimations[i].reverse || 0);
      const rotation = Number(titleAnimations[i].rotation || 0);
      const toneR = Number(titleAnimations[i].toneR || 0);
      const toneG = Number(titleAnimations[i].toneG || 0);
      const toneB = Number(titleAnimations[i].toneB || 0);
      const toneC = Number(titleAnimations[i].toneC || 0);
      const tone = [toneR, toneG, toneB, toneC];
      const picture = String(titleAnimations[i].overlayImage || "");

      // 反転
      if (reverse != 0) scaleX = -scaleX;

      // 色相アニメーション
      const hueAnimation = {
        start: Number(titleAnimations[i].hueStart || 0),
        end: Number(titleAnimations[i].hueEnd || 360),
        frame: Number(titleAnimations[i].hueFrame || 0),
        interval: Number(titleAnimations[i].hueInterval || 0),
        reverse: eval(titleAnimations[i].hueReverse || "false"),
      };

      // アニメーションセット
      this._LL_LoopAnimation[i] = {
        animationId: animationId,
        x: x,
        y: y,
        scaleX: scaleX,
        scaleY: scaleY,
        rotation: rotation,
        tone: tone,
        picture: picture,
        fixedFrame: fixedFrame,
        hueAnimation: hueAnimation,
      };

      // アニメーション画像の事前読み込み
      if (titleReserveImage) {
        const animationList = animationLists.find(
          function (item, index) {
            if (item.id === animationId) return true;
          }.bind(this)
        );
        if (animationList) {
          const animationFrames = animationList.animationFrames
            .split(/\r\n|\n/)
            .filter((v) => v);
          animationFrames.forEach(function (elm) {
            ImageManager.loadLoopAnimation(elm.split(",")[0]);
          });
        }
      }
    }
  };

  const _Scene_Title_update = Scene_Title.prototype.update;
  Scene_Title.prototype.update = function () {
    _Scene_Title_update.apply(this, arguments);
    ExLoopAnimation.update(this, this._LL_LoopAnimation);
  };

  const _Scene_Title_createBackground = Scene_Title.prototype.createBackground;
  Scene_Title.prototype.createBackground = function () {
    _Scene_Title_createBackground.apply(this, arguments);
    ExLoopAnimation.create(this, this._backSprite2);
  };

  //-----------------------------------------------------------------------------
  // Sprite_LL_LoopAnimation
  //
  // ループアニメーションを再生する独自のスプライトを追加定義します。

  function Sprite_LL_LoopAnimation() {
    this.initialize.apply(this, arguments);
  }

  Sprite_LL_LoopAnimation.prototype = Object.create(Sprite.prototype);
  Sprite_LL_LoopAnimation.prototype.constructor = Sprite_LL_LoopAnimation;

  Sprite_LL_LoopAnimation.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.bitmap = null;
    this.opacity = 255;
    this._animationId = "";
    this._animationDirectory = "";
    this._animationFrame = 0;
    this._animationFrameCount = 0;
    this._animationFrameNumber = 0;
    this._animation = null;

    // アニメーション画像
    this._spriteMain = new Sprite();
    this.addChild(this._spriteMain);
    // オーバーレイ画像
    this._spriteOverlay = new Sprite();
    this.addChild(this._spriteOverlay);
    // 静止画切り出しフレーム
    this._animationFixedFrame = null;
    // オーバーレイ画像 (静止画用)
    this._spriteOverlayFixed = new Sprite();
    this._spriteMain.addChild(this._spriteOverlayFixed);
    // 色相アニメーション
    this._hueAnimation = null;
    this._hueAnimationFrame = 0;
    this._hueAnimationFrameCount = 0;
    this._hueAnimationFrameReverse = false;
    this._hueAnimationFrameIsReverse = false;
    this._hueAnimationFrameInterval = 0;
  };

  Sprite_LL_LoopAnimation.prototype.setPicture = function (
    id,
    frame,
    animation
  ) {
    this._animationId = id;
    this._animationFrame = frame;
    this._animationFrameCount = 0;
    this._animationFrameNumber = 0;
    this._animation = animation;

    // X座標、Y座標
    this._spriteMain.x = animation.x;
    this._spriteMain.y = animation.y;
    // 拡大率
    this._spriteMain.scale.x = Number(animation.scaleX || 100) / 100;
    this._spriteMain.scale.y = Number(animation.scaleY || 100) / 100;
    // 色調
    this._spriteMain.setColorTone(animation.tone);
    // 角度
    this._spriteMain.rotation =
      (Number(animation.rotation || 0) * Math.PI) / 180;
    // オーバーレイ
    this._spriteOverlay.bitmap = ImageManager.loadPicture(animation.picture);

    // 静止画切り出しフレーム
    this._animationFixedFrame = animation.fixedFrame
      ? Number(animation.fixedFrame) - 1
      : null;
    // オーバーレイ (静止画用)
    this._spriteOverlayFixed.bitmap = ImageManager.loadPicture(
      animation.picture2
    );
    // 色相アニメーション
    this.setHue(0);
    this._hueAnimation = animation.hueAnimation;
    this._hueAnimationFrame = 0;
    this._hueAnimationFrameCount = 0;
    this._hueAnimationFrameReverse = false;
    this._hueAnimationFrameIsReverse = false;
    this._hueAnimationFrameInterval = 0;
    if (this._hueAnimation) {
      this._hueAnimationFrame = this._hueAnimation.start;
      this._hueAnimationFrameCount = this._hueAnimation.frame;
      this._hueAnimationFrameInterval = this._hueAnimation.interval;
      this._hueAnimationFrameReverse = this._hueAnimation.reverse;
    }
  };

  Sprite_LL_LoopAnimation.prototype.removePicture = function () {
    this._animationId = "";
    this._animationFrame = 0;
    this._animationFrameCount = 0;
    this._animationFrameNumber = 0;
  };

  Sprite_LL_LoopAnimation.prototype.currentPictureId = function () {
    return this._animationId;
  };

  Sprite_LL_LoopAnimation.prototype.checkCurrentPicture = function (
    animationId,
    animation
  ) {
    return this._animationId !== animationId || this._animation !== animation;
  };

  Sprite_LL_LoopAnimation.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateFrame();
  };

  Sprite_LL_LoopAnimation.prototype.updateFrame = function () {
    if (this._animationId === "") {
      this._spriteMain.bitmap = null;
      this._spriteOverlay.bitmap = null;
      this._spriteOverlayFixed.bitmap = null;
      return;
    }

    //------------------------------
    // アニメーション設定読み込み
    //------------------------------
    const animationList = animationLists.find(
      function (item, index) {
        if (item.id === this._animationId) return true;
      }.bind(this)
    );
    // 該当のアニメーションIDが存在しない場合、中断
    if (!animationList) {
      return;
    }
    const animationFrames = animationList.animationFrames
      .split(/\r\n|\n/)
      .filter((v) => v);

    //------------------------------
    // 色相アニメーション
    //------------------------------
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

    //------------------------------
    // 静止画切り出しモード
    //------------------------------
    if (this._animationFixedFrame !== null) {
      // アニメーションフレーム読み込み判定
      if (!animationFrames[this._animationFixedFrame]) {
        throw new Error(
          "指定したアニメーションフレームが存在しません！ (" +
            this._animationId +
            ": " +
            (this._animationFixedFrame + 1) +
            ")"
        );
      }
      // アニメーションフレーム設定読み込み
      const animationFixedFrame =
        animationFrames[this._animationFixedFrame].split(",");
      // 静止画切り出し表示
      this._spriteMain.bitmap = ImageManager.loadLoopAnimation(
        animationFixedFrame[0]
      );
      return;
    }

    //------------------------------
    // アニメーション再生
    //------------------------------
    const animationFrame =
      animationFrames[this._animationFrameNumber].split(",");
    this._spriteMain.bitmap = ImageManager.loadLoopAnimation(animationFrame[0]);

    //------------------------------
    // 効果音再生
    //------------------------------
    if (animationFrame[1]) {
      // 変数有効化チェック
      if (
        (animationFrame[2] && $gameVariables.value(animationFrame[2]) === 0) ||
        !animationFrame[2]
      ) {
        if (this._animationFrameCount === 0) {
          const se = {
            name: String(animationFrame[1] || ""),
            volume: Number(animationFrame[3] || 90),
            pitch: Number(animationFrame[4] || 100),
            pan: Number(animationFrame[5] || 0),
          };
          AudioManager.playSe(se);
        }
      }
    }

    //------------------------------
    // アニメーションフレーム更新
    //------------------------------
    this._animationFrameCount++;
    if (this._animationFrame === this._animationFrameCount) {
      this._animationFrameCount = 0;
      this._animationFrameNumber++;
      if (animationFrames.length === this._animationFrameNumber) {
        this._animationFrameNumber = 0;
      }
    }
  };
})();
