//=============================================================================
// RPGツクールMZ - LL_StandingPictureBattle.js (LoopAnimation Ver.) v1.0.2
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 戦闘中に立ち絵を自動表示します。(ループアニメ連携 Ver.)
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-sbpicture/
 * @base LL_LoopAnimation
 *
 * @help LL_StandingPictureBattle.js (ループアニメ連携 Ver.)
 *
 * 戦闘中、下記のタイミングで立ち絵を自動表示します。
 *   ・戦闘開始時 (戦う・逃げる選択時)
 *   ・コマンド選択時
 *   ・被ダメージ時
 *   ・勝利時
 *   ・攻撃、防御、スキル発動時
 *   ・アイテム使用時
 *
 * 下記のようにステート、スイッチ、変数条件で表示する立ち絵を複数定義できます。
 *   ・スイッチ1がONかつ毒状態の立ち絵
 *   ・変数1が10以上かつ毒状態の立ち絵
 *   ・スイッチ1がONの時の立ち絵
 *   ・毒状態の立ち絵
 *   ・スイッチ・ステート・変数条件なしの通常立ち絵 (最低限必要)
 *
 * 残りHP％で立ち絵を切り替える:
 *   まず「残りHP％」を「100」に設定した立ち絵リストを作成します。
 *   上記をコピーして「残りHP％」を「50」に変更し、立ち絵リストを複製します。
 *   これでHPが半分以下になった場合、「50」に設定した立ち絵が呼ばれます。
 *   残りHP％毎に、複数立ち絵を定義することも可能です。
 *
 * 画像ファイルの表示優先順:
 *   1. ステートID、スイッチID、変数条件全てに一致するもの
 *   2. ステートID、スイッチID両方に一致するもの
 *   3. ステートID、変数条件両方に一致するもの
 *   4. ステートIDのみ一致するもの
 *   5. スイッチID、変数条件両方に一致するもの
 *   6. スイッチIDのみ一致するもの
 *   7. 変数条件のみ一致するもの
 *   8. 条件なし (ステートID、スイッチID、変数条件全て設定なし)
 *   (上記の中で、残りHP％が最も低いものが優先して表示されます)
 *
 * 画像を反転させたい場合:
 *   X拡大率に「-100」と入力すると画像が反転します。
 *   (原点を左上にしている場合、X座標が画像横幅分左にずれます)
 *
 * プラグインコマンド:
 *   立ち絵表示ON・OFF: 立ち絵の表示・非表示を一括制御します。
 *
 * ループアニメーションプラグイン連携(LL_LoopAnimation):
 *   立ち絵の代わりにループアニメーションを再生することができます。
 *   ループアニメーションプラグイン側で定義したアニメーションIDで、
 *   立ち絵リストと同じようにループアニメリストを作成します。
 *   ループアニメ切替変数で立ち絵表示とループアニメ表示を切替できます。
 *   ループアニメーションは同時に二つまで設定することができます。
 *
 * 利用規約:
 *   このプラグインの二次利用、二次配布は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/11/17
 *
 * @command setEnabled
 * @text 立ち絵表示ON・OFF
 * @desc 立ち絵の表示・非表示を一括制御します。
 *
 * @arg enabled
 * @text 立ち絵表示
 * @desc OFFにすると立ち絵が表示されなくなります。
 * @default true
 * @type boolean
 *
 * @param pictureListSettings
 * @text 立ち絵リスト
 * @desc ※この項目は使用しません
 *
 * @param sbCommandPictures
 * @text コマンド選択時
 * @desc コマンド選択中に表示する立ち絵を定義します。
 * ステート、スイッチ、残HP％毎に立ち絵を複数定義できます。
 * @default []
 * @type struct<sbCommandPictures>[]
 * @parent pictureListSettings
 *
 * @param sbDamagePictures
 * @text ダメージ時
 * @desc ダメージ時に表示する立ち絵を定義します。
 * ステート、スイッチ、残HP％毎に立ち絵を複数定義できます。
 * @default []
 * @type struct<sbDamagePictures>[]
 * @parent pictureListSettings
 *
 * @param sbWinPictures
 * @text 勝利時
 * @desc 戦闘勝利時に表示する立ち絵を定義します。
 * ステート、スイッチ、残HP％毎に立ち絵を複数定義できます。
 * @default []
 * @type struct<sbWinPictures>[]
 * @parent pictureListSettings
 *
 * @param sbActionPictures
 * @text 攻撃、防御、スキル発動時
 * @desc 攻撃、スキル、アイテム使用時に表示する立ち絵を定義します。
 * ステート、スイッチ、残HP％毎に立ち絵を複数定義できます。
 * @default []
 * @type struct<sbActionPictures>[]
 * @parent pictureListSettings
 *
 * @param sbItemPictures
 * @text アイテム使用時
 * @desc アイテム使用時に表示する立ち絵を定義します。
 * ステート、スイッチ、残HP％毎に立ち絵を複数定義できます。
 * @default []
 * @type struct<sbItemPictures>[]
 * @parent pictureListSettings
 *
 * @param loopAnimationSettings
 * @text ループアニメリスト
 * @desc ※この項目は使用しません
 *
 * @param sbCommandAnimations
 * @text コマンド選択時
 * @desc コマンド選択中に表示するアニメを定義します。
 * ステート、スイッチ、残HP％毎にアニメを複数定義できます。
 * @default []
 * @type struct<sbAnimations>[]
 * @parent loopAnimationSettings
 *
 * @param sbDamageAnimations
 * @text ダメージ時
 * @desc ダメージ時に表示するアニメを定義します。
 * ステート、スイッチ、残HP％毎にアニメを複数定義できます。
 * @default []
 * @type struct<sbAnimations>[]
 * @parent loopAnimationSettings
 *
 * @param sbWinAnimations
 * @text 勝利時
 * @desc 戦闘勝利時に表示するアニメを定義します。
 * ステート、スイッチ、残HP％毎にアニメを複数定義できます。
 * @default []
 * @type struct<sbAnimations>[]
 * @parent loopAnimationSettings
 *
 * @param startActorType
 * @text 戦闘開始時の表示アクター
 * @desc 戦う・逃げる選択時に表示されるアクターを選択してください。
 * @type select
 * @default none
 * @option 表示しない
 * @value none
 * @option 先頭のアクター
 * @value firstActor
 * @option ランダム
 * @value randomActor
 *
 * @param winActorType
 * @text 勝利時の表示アクター
 * @desc 勝利時に表示されるアクターを選択してください。
 * @type select
 * @default lastActor
 * @option 表示しない
 * @value none
 * @option 最後に行動したアクター
 * @value lastActor
 * @option 先頭のアクター
 * @value firstActor
 * @option ランダム
 * @value randomActor
 *
 * @param hiddenEnemyWindow
 * @text 敵選択時は非表示
 * @desc 敵選択時は立ち絵を非表示にします。
 * @default true
 * @type boolean
 *
 * @param hiddenActorWindow
 * @text 対象アクター選択時は非表示
 * @desc 対象アクター選択時は立ち絵を非表示にします。
 * @default false
 * @type boolean
 *
 * @param deathBeforeStates
 * @text 死亡時の直前ステート判定
 * @desc 死亡時に直前のステート状態で立ち絵を判定します。
 * 死亡時に専用の立ち絵を表示する場合はオフにしてください。
 * @default false
 * @type boolean
 *
 * @param disableSeVariableId
 * @text SE無効化変数
 * @desc この変数が0以外の時、立ち絵のSE再生を無効化します。
 * @type variable
 *
 * @param enableLoopAnimationVariableId
 * @text ループアニメ切替変数
 * @desc この変数が0以外の時、ループアニメーションに切り替えます。
 * 通常の立ち絵表示は無効化されます。
 * @type variable
 *
 * @param enableLoopAnimationVariableId
 * @text ループアニメ切替変数
 * @desc この変数が0以外の時、ループアニメーションに切り替えます。
 * 通常の立ち絵表示は無効化されます。
 * @type variable
 *
 * @param foreFrontVariableId
 * @text ウィンドウ前面切替変数
 * @desc この変数が0以外の時、ウィンドウより前面に表示されます。
 * 戦闘途中で切り替えた場合は次回戦闘より反映されます。
 * @type variable
 */

/*~struct~sbCommandPictures:
 *
 * @param actorId
 * @text アクターID
 * @desc アクターIDです。立ち絵を定義するアクターを選択してください。
 * @type actor
 *
 * @param stateId
 * @text ステートID
 * @desc 特定ステートで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定してください。
 * @type state
 *
 * @param switchId
 * @text スイッチID
 * @desc スイッチONで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定してください。
 * @type switch
 *
 * @param variableCase
 * @text 変数条件
 * @desc 変数条件で立ち絵を変更したい場合に使用します。
 * @default
 * @type struct<variableCase>
 *
 * @param hpPercentage
 * @text 残りHP％
 * @desc 残りHP％で立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は100％で設定してください。
 * @default 100
 * @min 0
 * @max 100
 * @type number
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 立ち絵として表示する画像ファイルを選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param origin
 * @text 原点
 * @desc 立ち絵の原点です。
 * @default upperleft
 * @type select
 * @option 左上
 * @value upperleft
 * @option 中央
 * @value center
 *
 * @param x
 * @text X座標
 * @desc 立ち絵の表示位置(X)です。
 * @default 464
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param y
 * @text Y座標
 * @desc 立ち絵の表示位置(Y)です。
 * @default 96
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param scaleX
 * @text X拡大率
 * @desc 立ち絵の拡大率(X)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Y拡大率
 * @desc 立ち絵の拡大率(Y)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param motion
 * @text モーション
 * @desc 再生モーションを選択してください。
 * @default floatrightfast
 * @type select
 * @option なし
 * @value none
 * @option 右からフロートイン (コマンド)
 * @value floatrightfast
 * @option 左からフロートイン (コマンド)
 * @value floatleftfast
 * @option 頷く
 * @value yes
 * @option ジャンプ
 * @value jump
 * @option 繰り返しジャンプ
 * @value jumploop
 * @option ガクガクし続ける
 * @value shakeloop
 * @option 横に揺れ続ける
 * @value noslowloop
 * @option 息づかい風
 * @value breathing
 * @option 息づかい風 (伸縮)
 * @value breathing2
 * @option 揺れる (ダメージ)
 * @value damage
 * @option 右からフロートイン (勝利)
 * @value floatright
 * @option 左からフロートイン (勝利)
 * @value floatleft
 * @option 左へスライド (攻撃)
 * @value stepleft
 * @option 右へスライド (攻撃)
 * @value stepright
 * @option 頭を下げる (防御)
 * @value headdown
 */

/*~struct~sbDamagePictures:
 *
 * @param actorId
 * @text アクターID
 * @desc アクターIDです。立ち絵を定義するアクターを選択してください。
 * @type actor
 *
 * @param stateId
 * @text ステートID
 * @desc 特定ステートで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定してください。
 * @type state
 *
 * @param switchId
 * @text スイッチID
 * @desc スイッチONで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定してください。
 * @type switch
 *
 * @param variableCase
 * @text 変数条件
 * @desc 変数条件で立ち絵を変更したい場合に使用します。
 * @default
 * @type struct<variableCase>
 *
 * @param hpPercentage
 * @text 残りHP％
 * @desc 残りHP％で立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は100％で設定してください。
 * @default 100
 * @min 0
 * @max 100
 * @type number
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 立ち絵として表示する画像ファイルを選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param origin
 * @text 原点
 * @desc 立ち絵の原点です。
 * @default upperleft
 * @type select
 * @option 左上
 * @value upperleft
 * @option 中央
 * @value center
 *
 * @param x
 * @text X座標
 * @desc 立ち絵の表示位置(X)です。
 * @default 464
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param y
 * @text Y座標
 * @desc 立ち絵の表示位置(Y)です。
 * @default 96
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param scaleX
 * @text X拡大率
 * @desc 立ち絵の拡大率(X)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Y拡大率
 * @desc 立ち絵の拡大率(Y)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param motion
 * @text モーション
 * @desc 再生モーションを選択してください。
 * @default damage
 * @type select
 * @option なし
 * @value none
 * @option 右からフロートイン (コマンド)
 * @value floatrightfast
 * @option 左からフロートイン (コマンド)
 * @value floatleftfast
 * @option 頷く
 * @value yes
 * @option ジャンプ
 * @value jump
 * @option 繰り返しジャンプ
 * @value jumploop
 * @option ガクガクし続ける
 * @value shakeloop
 * @option 横に揺れ続ける
 * @value noslowloop
 * @option 息づかい風
 * @value breathing
 * @option 息づかい風 (伸縮)
 * @value breathing2
 * @option 揺れる (ダメージ)
 * @value damage
 * @option 右からフロートイン (勝利)
 * @value floatright
 * @option 左からフロートイン (勝利)
 * @value floatleft
 * @option 左へスライド (攻撃)
 * @value stepleft
 * @option 右へスライド (攻撃)
 * @value stepright
 * @option 頭を下げる (防御)
 * @value headdown
 *
 * @param seName
 * @text ボイスSE
 * @desc ボイスとして再生するSEファイルを選択してください。
 * @dir audio/se
 * @type file
 * @require 1
 */

/*~struct~sbWinPictures:
 *
 * @param actorId
 * @text アクターID
 * @desc アクターIDです。立ち絵を定義するアクターを選択してください。
 * @type actor
 *
 * @param stateId
 * @text ステートID
 * @desc 特定ステートで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定してください。
 * @type state
 *
 * @param switchId
 * @text スイッチID
 * @desc スイッチONで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定してください。
 * @type switch
 *
 * @param variableCase
 * @text 変数条件
 * @desc 変数条件で立ち絵を変更したい場合に使用します。
 * @default
 * @type struct<variableCase>
 *
 * @param hpPercentage
 * @text 残りHP％
 * @desc 残りHP％で立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は100％で設定してください。
 * @default 100
 * @min 0
 * @max 100
 * @type number
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 立ち絵として表示する画像ファイルを選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param origin
 * @text 原点
 * @desc 立ち絵の原点です。
 * @default upperleft
 * @type select
 * @option 左上
 * @value upperleft
 * @option 中央
 * @value center
 *
 * @param x
 * @text X座標
 * @desc 立ち絵の表示位置(X)です。
 * @default 464
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param y
 * @text Y座標
 * @desc 立ち絵の表示位置(Y)です。
 * @default 96
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param scaleX
 * @text X拡大率
 * @desc 立ち絵の拡大率(X)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Y拡大率
 * @desc 立ち絵の拡大率(Y)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param motion
 * @text モーション
 * @desc 再生モーションを選択してください。
 * @default floatright
 * @type select
 * @option なし
 * @value none
 * @option 右からフロートイン (コマンド)
 * @value floatrightfast
 * @option 左からフロートイン (コマンド)
 * @value floatleftfast
 * @option 頷く
 * @value yes
 * @option ジャンプ
 * @value jump
 * @option 繰り返しジャンプ
 * @value jumploop
 * @option ガクガクし続ける
 * @value shakeloop
 * @option 横に揺れ続ける
 * @value noslowloop
 * @option 息づかい風
 * @value breathing
 * @option 息づかい風 (伸縮)
 * @value breathing2
 * @option 揺れる (ダメージ)
 * @value damage
 * @option 右からフロートイン (勝利)
 * @value floatright
 * @option 左からフロートイン (勝利)
 * @value floatleft
 * @option 左へスライド (攻撃)
 * @value stepleft
 * @option 右へスライド (攻撃)
 * @value stepright
 * @option 頭を下げる (防御)
 * @value headdown
 *
 * @param seName
 * @text ボイスSE
 * @desc ボイスとして再生するSEファイルを選択してください。
 * @dir audio/se
 * @type file
 * @require 1
 */

/*~struct~sbActionPictures:
 *
 * @param actorId
 * @text アクターID
 * @desc アクターIDです。立ち絵を定義するアクターを選択してください。
 * @type actor
 *
 * @param itemId
 * @text スキルID(カンマ区切り)
 * @desc このスキルが発動された時に立ち絵が表示されます。
 * なしの場合、攻撃、防御含め全スキル発動時に表示されます。
 * @type string
 *
 * @param stateId
 * @text ステートID
 * @desc 特定ステートで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定してください。
 * @type state
 *
 * @param switchId
 * @text スイッチID
 * @desc スイッチONで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定してください。
 * @type switch
 *
 * @param variableCase
 * @text 変数条件
 * @desc 変数条件で立ち絵を変更したい場合に使用します。
 * @default
 * @type struct<variableCase>
 *
 * @param hpPercentage
 * @text 残りHP％
 * @desc 残りHP％で立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は100％で設定してください。
 * @default 100
 * @min 0
 * @max 100
 * @type number
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 立ち絵として表示する画像ファイルを選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param origin
 * @text 原点
 * @desc 立ち絵の原点です。
 * @default upperleft
 * @type select
 * @option 左上
 * @value upperleft
 * @option 中央
 * @value center
 *
 * @param x
 * @text X座標
 * @desc 立ち絵の表示位置(X)です。
 * @default 464
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param y
 * @text Y座標
 * @desc 立ち絵の表示位置(Y)です。
 * @default 96
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param scaleX
 * @text X拡大率
 * @desc 立ち絵の拡大率(X)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Y拡大率
 * @desc 立ち絵の拡大率(Y)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param motion
 * @text モーション
 * @desc 再生モーションを選択してください。
 * @default floatrightfast
 * @type select
 * @option なし
 * @value none
 * @option 右からフロートイン (コマンド)
 * @value floatrightfast
 * @option 左からフロートイン (コマンド)
 * @value floatleftfast
 * @option 頷く
 * @value yes
 * @option ジャンプ
 * @value jump
 * @option 繰り返しジャンプ
 * @value jumploop
 * @option ガクガクし続ける
 * @value shakeloop
 * @option 横に揺れ続ける
 * @value noslowloop
 * @option 息づかい風
 * @value breathing
 * @option 息づかい風 (伸縮)
 * @value breathing2
 * @option 揺れる (ダメージ)
 * @value damage
 * @option 右からフロートイン (勝利)
 * @value floatright
 * @option 左からフロートイン (勝利)
 * @value floatleft
 * @option 左へスライド (攻撃)
 * @value stepleft
 * @option 右へスライド (攻撃)
 * @value stepright
 * @option 頭を下げる (防御)
 * @value headdown
 *
 * @param seName
 * @text ボイスSE
 * @desc ボイスとして再生するSEファイルを選択してください。
 * @dir audio/se
 * @type file
 * @require 1
 */

/*~struct~sbItemPictures:
 *
 * @param actorId
 * @text アクターID
 * @desc アクターIDです。立ち絵を定義するアクターを選択してください。
 * @type actor
 *
 * @param itemId
 * @text アイテムID(カンマ区切り)
 * @desc このアイテムを使用した時に立ち絵が表示されます。
 * なしにすると全アイテム使用時に表示されます。
 * @type string
 *
 * @param stateId
 * @text ステートID
 * @desc 特定ステートで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定してください。
 * @type state
 *
 * @param switchId
 * @text スイッチID
 * @desc スイッチONで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定してください。
 * @type switch
 *
 * @param variableCase
 * @text 変数条件
 * @desc 変数条件で立ち絵を変更したい場合に使用します。
 * @default
 * @type struct<variableCase>
 *
 * @param hpPercentage
 * @text 残りHP％
 * @desc 残りHP％で立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は100％で設定してください。
 * @default 100
 * @min 0
 * @max 100
 * @type number
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 立ち絵として表示する画像ファイルを選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param origin
 * @text 原点
 * @desc 立ち絵の原点です。
 * @default upperleft
 * @type select
 * @option 左上
 * @value upperleft
 * @option 中央
 * @value center
 *
 * @param x
 * @text X座標
 * @desc 立ち絵の表示位置(X)です。
 * @default 464
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param y
 * @text Y座標
 * @desc 立ち絵の表示位置(Y)です。
 * @default 96
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param scaleX
 * @text X拡大率
 * @desc 立ち絵の拡大率(X)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Y拡大率
 * @desc 立ち絵の拡大率(Y)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param motion
 * @text モーション
 * @desc 再生モーションを選択してください。
 * @default floatrightfast
 * @type select
 * @option なし
 * @value none
 * @option 右からフロートイン (コマンド)
 * @value floatrightfast
 * @option 左からフロートイン (コマンド)
 * @value floatleftfast
 * @option 頷く
 * @value yes
 * @option ジャンプ
 * @value jump
 * @option 繰り返しジャンプ
 * @value jumploop
 * @option ガクガクし続ける
 * @value shakeloop
 * @option 横に揺れ続ける
 * @value noslowloop
 * @option 息づかい風
 * @value breathing
 * @option 息づかい風 (伸縮)
 * @value breathing2
 * @option 揺れる (ダメージ)
 * @value damage
 * @option 右からフロートイン (勝利)
 * @value floatright
 * @option 左からフロートイン (勝利)
 * @value floatleft
 * @option 左へスライド (攻撃)
 * @value stepleft
 * @option 右へスライド (攻撃)
 * @value stepright
 * @option 頭を下げる (防御)
 * @value headdown
 *
 * @param seName
 * @text ボイスSE
 * @desc ボイスとして再生するSEファイルを選択してください。
 * @dir audio/se
 * @type file
 * @require 1
 */

/*~struct~variableCase:
 *
 * @param id
 * @text 変数ID
 * @desc 条件に使用する変数IDです。
 * @type variable
 *
 * @param type
 * @text 変数条件
 * @desc 変数IDとの比較条件です。
 * @default equal
 * @type select
 * @option 一致する
 * @value equal
 * @option 以上
 * @value higher
 * @option 以下
 * @value lower
 *
 * @param value
 * @text 変数比較数値
 * @desc 変数IDと比較する数値です。
 * @default 0
 * @min -99999999
 * @max 99999999
 * @type number
 */

/*~struct~sbAnimations:
 *
 * @param actorId
 * @text アクターID
 * @desc アクターIDです。アニメを定義するアクターを選択してください。
 * @type actor
 *
 * @param stateId
 * @text ステートID
 * @desc 特定ステートでアニメを変更したい場合に使用します。
 * 通常時のアニメは空白(なし)で設定してください。
 * @type state
 *
 * @param switchId
 * @text スイッチID
 * @desc スイッチONでアニメを変更したい場合に使用します。
 * 通常時のアニメは空白(なし)で設定してください。
 * @type switch
 *
 * @param variableCase
 * @text 変数条件
 * @desc 変数条件でアニメを変更したい場合に使用します。
 * @default
 * @type struct<variableCase>
 *
 * @param hpPercentage
 * @text 残りHP％
 * @desc 残りHP％でアニメを変更したい場合に使用します。
 * 通常時のアニメは100％で設定してください。
 * @default 100
 * @min 0
 * @max 100
 * @type number
 *
 * @param animation1
 * @text アニメーション1
 * @desc 表示するアニメーション1の設定です。
 * @default
 * @type struct<sbAnimationSettings>
 *
 * @param animation2
 * @text アニメーション2
 * @desc 表示するアニメーション2の設定です。
 * @default
 * @type struct<sbAnimationSettings>
 */

/*~struct~sbAnimationSettings:
 *
 * @param animationId
 * @text アニメーションID
 * @desc 表示するアニメーションIDです。
 * @type string
 *
 * @param x
 * @text X座標
 * @desc アニメーションの表示位置(X)です。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param y
 * @text Y座標
 * @desc アニメーションの表示位置(Y)です。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param scaleX
 * @text X拡大率
 * @desc アニメーションの拡大率(X)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Y拡大率
 * @desc アニメーションの拡大率(Y)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param rotation
 * @text 回転
 * @desc アニメーションの回転率(-360～360)です。
 * @default 0
 * @min -360
 * @max 360
 * @type number
 */

(() => {
  "use strict";
  const pluginName = "LL_StandingPictureBattle";

  const parameters = PluginManager.parameters(pluginName);
  const paramJsonParse = function (key, value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  };

  const sbCommandPictures = String(parameters["sbCommandPictures"] || "[]");
  const sbDamagePictures = String(parameters["sbDamagePictures"] || "[]");
  const sbWinPictures = String(parameters["sbWinPictures"] || "[]");
  const sbActionPictures = String(parameters["sbActionPictures"] || "[]");
  const sbItemPictures = String(parameters["sbItemPictures"] || "[]");
  const startActorType = String(parameters["startActorType"] || "none");
  const winActorType = String(parameters["winActorType"] || "lastActor");
  const hiddenEnemyWindow = eval(parameters["hiddenEnemyWindow"] || "true");
  const hiddenActorWindow = eval(parameters["hiddenActorWindow"] || "false");
  const deathBeforeStates = eval(parameters["deathBeforeStates"] || "false");
  const disableSeVariableId = Number(parameters["disableSeVariableId"] || 0);
  const enableLoopAnimationVariableId = Number(
    parameters["enableLoopAnimationVariableId"] || 0
  );
  const foreFrontVariableId = Number(parameters["foreFrontVariableId"] || 0);

  const sbCommandPictureLists = JSON.parse(
    JSON.stringify(sbCommandPictures, paramJsonParse)
  );
  const sbDamagePictureLists = JSON.parse(
    JSON.stringify(sbDamagePictures, paramJsonParse)
  );
  const sbWinPictureLists = JSON.parse(
    JSON.stringify(sbWinPictures, paramJsonParse)
  );
  let sbActionPictureLists = JSON.parse(
    JSON.stringify(sbActionPictures, paramJsonParse)
  );
  let sbItemPictureLists = JSON.parse(
    JSON.stringify(sbItemPictures, paramJsonParse)
  );

  // スキルIDを配列に変換
  sbActionPictureLists = sbActionPictureLists.map(function (val) {
    if (val.itemId) {
      val.itemId = String(val.itemId || "")
        .split(",")
        .map(Number);
    }
    return val;
  });
  sbItemPictureLists = sbItemPictureLists.map(function (val) {
    if (val.itemId) {
      val.itemId = String(val.itemId || "")
        .split(",")
        .map(Number);
    }
    return val;
  });

  //-----------------------------------------------------------------------------
  // ループアニメーションプラグインのアニメリストを取得
  // On LL_LoopAnimation Plugin
  //-----------------------------------------------------------------------------
  const laPluginName = "LL_LoopAnimation";
  const laParameters = PluginManager.parameters(laPluginName);
  const animations = String(laParameters["animations"] || "");
  const animationLists = JSON.parse(JSON.stringify(animations, paramJsonParse));

  const sbCommandAnimations = String(parameters["sbCommandAnimations"] || "[]");
  const sbDamageAnimations = String(parameters["sbDamageAnimations"] || "[]");
  const sbWinAnimations = String(parameters["sbWinAnimations"] || "[]");
  const sbCommandAnimationLists = JSON.parse(
    JSON.stringify(sbCommandAnimations, paramJsonParse)
  );
  const sbDamageAnimationLists = JSON.parse(
    JSON.stringify(sbDamageAnimations, paramJsonParse)
  );
  const sbWinAnimationLists = JSON.parse(
    JSON.stringify(sbWinAnimations, paramJsonParse)
  );

  // Plugin Command
  PluginManager.registerCommand(pluginName, "setEnabled", (args) => {
    const enabled = eval(args.enabled || "true");
    $gameSystem._StandingPictureBattleDisabled = !enabled;
  });

  // 独自変数定義
  let animationCount = 0;
  let refSbPicture = false;
  let motionSbPicture = "";
  let showDamageActorId = null;
  let activeCommandActorId = null;
  let activeDamageActorId = null;
  let activeActionActorId = null;
  let activeActionItemId = null;
  let activeActionDataClass = null;
  let activeStanbyActorId = null;

  // 独自変数 (ループアニメーション)
  let refSbAnimation = false;
  let showLoopDamageActorId = null;
  let activeLoopCommandActorId = null;
  let activeLoopDamageActorId = null;
  let activeLoopActionActorId = null;
  let activeLoopStanbyActorId = null;

  // アニメーションフレーム数定義
  const animationFrame = {
    yes: 24,
    yesyes: 48,
    no: 24,
    noslow: 48,
    jump: 24,
    jumpjump: 48,
    jumploop: 48,
    shake: 1,
    shakeloop: 1,
    runleft: 1,
    runright: 1,
    damage: 1,
    floatrightfast: 12,
    floatright: 48,
    floatleftfast: 12,
    floatleft: 48,
    noslowloop: 96,
    breathing: 96,
    breathing2: 96,
    stepleft: 24,
    stepright: 24,
    headdown: 12,
    none: 0,
  };

  //-----------------------------------------------------------------------------
  // 画像ファイル名を取得
  //-----------------------------------------------------------------------------
  const getImageName = (actorId, pictureLists, itemId = null) => {
    if (!pictureLists) return;

    // アクターのステート情報を取得
    let actorStates = [];
    if (actorId) {
      actorStates = $gameActors.actor(actorId)._states;

      // 死亡時に直前のステートIDで判定するか？
      if (actorStates.indexOf(1) !== -1 && deathBeforeStates) {
        actorStates = $gameActors.actor(actorId).beforeStates();
      }
    }
    let specificPicture = null;

    // アクターIDが一致する立ち絵を検索
    pictureLists = pictureLists.filter(function (item) {
      if (Number(item.actorId) == actorId) {
        return true;
      }
    });

    // アイテムID(スキルID)が指定されているか？
    // (処理を共通化するため、ここではskillIdも便宜的にitemIdとして扱う)
    if (itemId !== null) {
      pictureLists = pictureLists.filter(function (item) {
        if (item.itemId.includes(itemId)) {
          return true;
        }
      });
    }

    // ステートにかかっているか？
    if (actorStates.length) {
      // ステートID・スイッチID・変数IDが有効な立ち絵リストを検索
      specificPicture = pictureLists.filter(function (item) {
        if (item.variableCase) {
          if (
            actorStates.indexOf(Number(item.stateId)) !== -1 &&
            $gameSwitches.value(Number(item.switchId)) &&
            ((String(item.variableCase.type) == "equal" &&
              $gameVariables.value(Number(item.variableCase.id)) ==
                Number(item.variableCase.value)) ||
              (String(item.variableCase.type) == "higher" &&
                $gameVariables.value(Number(item.variableCase.id)) >=
                  Number(item.variableCase.value)) ||
              (String(item.variableCase.type) == "lower" &&
                $gameVariables.value(Number(item.variableCase.id)) <=
                  Number(item.variableCase.value)))
          ) {
            return true;
          }
        }
      });
      if (specificPicture.length)
        return checkHpPercentage(actorId, specificPicture);
      // ステートID・スイッチIDが有効な立ち絵リストを検索
      specificPicture = pictureLists.filter(function (item) {
        if (
          actorStates.indexOf(Number(item.stateId)) !== -1 &&
          $gameSwitches.value(Number(item.switchId)) &&
          !item.variableCase
        ) {
          return true;
        }
      });
      if (specificPicture.length)
        return checkHpPercentage(actorId, specificPicture);
      // ステートID・変数IDが有効な立ち絵リストを検索
      specificPicture = pictureLists.filter(function (item) {
        if (item.variableCase) {
          if (
            actorStates.indexOf(Number(item.stateId)) !== -1 &&
            (Number(item.switchId) === 0 || !item.switchId) &&
            ((String(item.variableCase.type) == "equal" &&
              $gameVariables.value(Number(item.variableCase.id)) ==
                Number(item.variableCase.value)) ||
              (String(item.variableCase.type) == "higher" &&
                $gameVariables.value(Number(item.variableCase.id)) >=
                  Number(item.variableCase.value)) ||
              (String(item.variableCase.type) == "lower" &&
                $gameVariables.value(Number(item.variableCase.id)) <=
                  Number(item.variableCase.value)))
          ) {
            return true;
          }
        }
      });
      if (specificPicture.length)
        return checkHpPercentage(actorId, specificPicture);
      // ステートIDが有効な立ち絵リストを検索
      specificPicture = pictureLists.filter(function (item) {
        if (
          actorStates.indexOf(Number(item.stateId)) !== -1 &&
          (Number(item.switchId) === 0 || !item.switchId) &&
          !item.variableCase
        ) {
          return true;
        }
      });
      if (specificPicture.length)
        return checkHpPercentage(actorId, specificPicture);
    }

    // スイッチID・変数IDが有効な立ち絵リストを検索
    specificPicture = pictureLists.filter(function (item) {
      if (item.variableCase) {
        if (
          (Number(item.stateId) === 0 || !item.stateId) &&
          $gameSwitches.value(Number(item.switchId)) &&
          ((String(item.variableCase.type) == "equal" &&
            $gameVariables.value(Number(item.variableCase.id)) ==
              Number(item.variableCase.value)) ||
            (String(item.variableCase.type) == "higher" &&
              $gameVariables.value(Number(item.variableCase.id)) >=
                Number(item.variableCase.value)) ||
            (String(item.variableCase.type) == "lower" &&
              $gameVariables.value(Number(item.variableCase.id)) <=
                Number(item.variableCase.value)))
        ) {
          return true;
        }
      }
    });
    if (specificPicture.length)
      return checkHpPercentage(actorId, specificPicture);
    // スイッチIDが有効な立ち絵リストを検索
    specificPicture = pictureLists.filter(function (item) {
      if (
        (Number(item.stateId) === 0 || !item.stateId) &&
        $gameSwitches.value(Number(item.switchId)) &&
        !item.variableCase
      ) {
        return true;
      }
    });
    if (specificPicture.length)
      return checkHpPercentage(actorId, specificPicture);
    // 変数IDが有効な立ち絵リストを検索
    specificPicture = pictureLists.filter(function (item) {
      if (item.variableCase) {
        if (
          (Number(item.stateId) === 0 || !item.stateId) &&
          (Number(item.switchId) === 0 || !item.switchId) &&
          ((String(item.variableCase.type) == "equal" &&
            $gameVariables.value(Number(item.variableCase.id)) ==
              Number(item.variableCase.value)) ||
            (String(item.variableCase.type) == "higher" &&
              $gameVariables.value(Number(item.variableCase.id)) >=
                Number(item.variableCase.value)) ||
            (String(item.variableCase.type) == "lower" &&
              $gameVariables.value(Number(item.variableCase.id)) <=
                Number(item.variableCase.value)))
        ) {
          return true;
        }
      }
    });
    if (specificPicture.length)
      return checkHpPercentage(actorId, specificPicture);

    // 上記で見つからなかった場合、通常の立ち絵を検索
    let normalPicture = pictureLists.filter(function (item) {
      if (
        (Number(item.stateId) === 0 || !item.stateId) &&
        (Number(item.switchId) === 0 || !item.switchId) &&
        !item.variableCase
      )
        return true;
    });
    if (normalPicture.length) return checkHpPercentage(actorId, normalPicture);
  };

  const checkHpPercentage = (actorId, pictureLists) => {
    // アクターの残HP％を取得
    let hpRate = getHpRate(actorId);
    // 最もHP%が低い立ち絵を適用する
    let minHpRate = 100;
    let result = null;
    pictureLists.forEach(function (item) {
      if (
        hpRate <= Number(item.hpPercentage) &&
        minHpRate >= Number(item.hpPercentage)
      ) {
        result = item;
        minHpRate = Number(item.hpPercentage);
      } else if (!item.hpPercentage && minHpRate >= 100) {
        // プラグインパラメータが更新されていない場合、便宜的に100として扱う
        result = item;
        minHpRate = Number(item.hpPercentage);
      }
    });
    return result;
  };

  // アクターのHPレートを取得
  const getHpRate = (actorId) => {
    if (!$gameActors.actor(actorId)) return 0;
    return $gameActors.actor(actorId).mhp > 0
      ? ($gameActors.actor(actorId).hp / $gameActors.actor(actorId).mhp) * 100
      : 0;
  };

  // Battle Managerを拡張
  BattleManager.isPhase = function () {
    return this._phase;
  };
  BattleManager.isSubject = function () {
    return this._subject;
  };

  // Game Partyを拡張
  Game_Party.prototype.aliveBattleMembers = function () {
    return this.allMembers()
      .slice(0, this.maxBattleMembers())
      .filter((actor) => actor.isAppeared())
      .filter((actor) => actor.isAlive());
  };
  Game_Party.prototype.firstBattleMember = function () {
    return this.allMembers()
      .slice(0, 1)
      .filter((actor) => actor.isAppeared());
  };
  Game_Party.prototype.randomBattleMenber = function () {
    let r = Math.randomInt(this.maxBattleMembers());
    return this.allMembers()
      .slice(r, r + 1)
      .filter((actor) => actor.isAppeared());
  };

  const _Game_Battler_performActionStart =
    Game_Battler.prototype.performActionStart;
  Game_Battler.prototype.performActionStart = function (action) {
    _Game_Battler_performActionStart.apply(this, arguments);
    // スキルIDを取得
    activeActionItemId = action._item._itemId;
    activeActionDataClass = action._item._dataClass;
  };

  const _Game_Battler_performDamage = Game_Battler.prototype.performDamage;
  Game_Battler.prototype.performDamage = function () {
    _Game_Battler_performDamage.apply(this, arguments);
    // ダメージを受けたアクターIDを取得
    showDamageActorId = this._actorId;
    showLoopDamageActorId = this._actorId;
  };

  // 死亡時の直前ステートIDを保持するため、Game_BattlerBaseを拡張
  const _Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
  Game_BattlerBase.prototype.initMembers = function () {
    _Game_BattlerBase_initMembers.apply(this, arguments);

    this._beforeStates = [];
  };

  const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
  Game_BattlerBase.prototype.die = function () {
    this._beforeStates = this._states;

    _Game_BattlerBase_die.apply(this, arguments);
  };

  Game_BattlerBase.prototype.beforeStates = function () {
    return this._beforeStates;
  };

  //-----------------------------------------------------------------------------
  // Ex Standing Picture Battle class
  //
  // 戦闘中立ち絵を表示する独自のクラスを追加定義します。

  class ExStandingPictureBattle {
    static create(elm) {
      // ウィンドウ前面表示判定
      const foreFront = $gameVariables.value(foreFrontVariableId) !== 0;
      // 立ち絵1
      elm._spbSprite = new Sprite_LL_SPicture();
      elm.addChildAt(
        elm._spbSprite,
        elm.children.indexOf(foreFront ? elm._windowLayer : elm._spriteset) + 1
      );
      // バトル開始・終了フラグをオフ
      this._battleStart = false;
      this._battleEnd = false;
      // 継続表示用アクターID
      this._currentSbActorId = null;
    }

    static update(elm) {
      // Torigoya Skill CutIn Manager (競合回避)
      const torigoyaSkillCutInWait = Torigoya.SkillCutIn
        ? Torigoya.SkillCutIn.CutInManager.isPlaying()
        : false;

      // 初期設定
      let sbPicture = null;
      let isPhase = BattleManager.isPhase();
      let isInputting = BattleManager.isInputting();
      let isEscaped = BattleManager.isEscaped();
      let isAllDead = $gameParty.isAllDead();
      let commandActor = BattleManager.actor();
      let isSubject = BattleManager.isSubject();
      if (BattleManager._action) {
        if (BattleManager._action._subjectActorId) {
          this._lastActionActorId = BattleManager._action._subjectActorId;
        }
      }
      //-----------------------------------------------------------------------------
      // ターン開始時
      //-----------------------------------------------------------------------------
      if (isPhase == "start") {
        if (!this._battleStart) {
          // 生存しているアクターを取得
          this._aliveBattleMembers = $gameParty.aliveBattleMembers();
          // 先頭アクターIDを取得
          this._firstActorId =
            this._aliveBattleMembers.length > 0
              ? this._aliveBattleMembers[0]._actorId
              : null;
          // ランダムアクターID抽選
          this._randomActorId =
            this._aliveBattleMembers.length > 0
              ? this._aliveBattleMembers[
                  Math.floor(Math.random() * this._aliveBattleMembers.length)
                ]._actorId
              : null;
          this._battleStart = true;
        }
      }
      //-----------------------------------------------------------------------------
      // ターン終了時
      //-----------------------------------------------------------------------------
      if (isPhase == "turnEnd") {
        // 生存しているアクターを取得
        this._aliveBattleMembers = $gameParty.aliveBattleMembers();
        // 先頭アクターIDを取得
        this._firstActorId =
          this._aliveBattleMembers.length > 0
            ? this._aliveBattleMembers[0]._actorId
            : null;
        // ランダムアクターID抽選
        this._randomActorId =
          this._aliveBattleMembers.length > 0
            ? this._aliveBattleMembers[
                Math.floor(Math.random() * this._aliveBattleMembers.length)
              ]._actorId
            : null;
      }

      // 立ち絵を非表示に設定している場合、処理を中断
      if (
        $gameSystem._StandingPictureBattleDisabled ||
        $gameVariables.value(enableLoopAnimationVariableId) !== 0
      ) {
        elm._spbSprite.opacity = 0;
        return;
      }

      //-----------------------------------------------------------------------------
      // 戦闘終了時
      //-----------------------------------------------------------------------------
      if (isPhase == "battleEnd") {
        if (isEscaped) {
          // 逃走
        } else if (isAllDead) {
          // 全滅
        } else {
          if (!this._battleEnd) {
            // 生存しているアクターを取得
            let aliveBattleMembers = $gameParty.aliveBattleMembers();
            // 先頭アクターIDを取得
            this._firstActorId =
              aliveBattleMembers.length > 0
                ? aliveBattleMembers[0]._actorId
                : null;
            // ランダムアクターID抽選
            this._randomActorId =
              aliveBattleMembers.length > 0
                ? aliveBattleMembers[
                    Math.floor(Math.random() * aliveBattleMembers.length)
                  ]._actorId
                : null;
          }
          if (winActorType == "lastActor") {
            sbPicture = getImageName(
              this._lastActionActorId,
              sbWinPictureLists
            );
          } else if (winActorType == "randomActor") {
            sbPicture = getImageName(this._randomActorId, sbWinPictureLists);
          } else if (winActorType == "firstActor") {
            sbPicture = getImageName(this._firstActorId, sbWinPictureLists);
          }
          if (!this._battleEnd) {
            if (sbPicture) {
              refSbPicture = true;
              motionSbPicture = sbPicture.motion;
              animationCount = animationFrame[motionSbPicture];
              // elm._spbSprite.opacity = 0;

              // SE再生
              this.playSe(sbPicture);
            }
          }
        }
        this._battleEnd = true;
      }
      //-----------------------------------------------------------------------------
      // 被ダメージ時
      //-----------------------------------------------------------------------------
      if (showDamageActorId) {
        if (isPhase == "action") {
          sbPicture = getImageName(showDamageActorId, sbDamagePictureLists);
          if (sbPicture) {
            if (activeDamageActorId != showDamageActorId) {
              activeDamageActorId = showDamageActorId;
              refSbPicture = true;
              motionSbPicture = sbPicture.motion;
              animationCount = animationFrame[motionSbPicture];
              // elm._spbSprite.opacity = 0;

              // SE再生
              this.playSe(sbPicture);
            }
          }
        } else {
          showDamageActorId = null;
          sbPicture = null;
        }
      }
      //-----------------------------------------------------------------------------
      // アクション時
      //-----------------------------------------------------------------------------
      if (!showDamageActorId) {
        if (isPhase == "action" && !torigoyaSkillCutInWait) {
          // スキル発動時
          if (activeActionDataClass == "skill") {
            sbPicture = getImageName(
              isSubject._actorId,
              sbActionPictureLists,
              activeActionItemId
            );
            // 見つからなかった場合、スキルIDなしの立ち絵を再検索
            if (!sbPicture)
              sbPicture = getImageName(
                isSubject._actorId,
                sbActionPictureLists,
                0
              );
          }
          // アイテム使用時
          if (activeActionDataClass == "item") {
            sbPicture = getImageName(
              isSubject._actorId,
              sbItemPictureLists,
              activeActionItemId
            );
            // 見つからなかった場合、アイテムIDなしの立ち絵を再検索
            if (!sbPicture)
              sbPicture = getImageName(
                isSubject._actorId,
                sbItemPictureLists,
                0
              );
          }
          if (sbPicture) {
            if (activeActionActorId != isSubject._actorId) {
              activeActionActorId = isSubject._actorId;
              refSbPicture = true;
              motionSbPicture = sbPicture.motion;
              animationCount = animationFrame[motionSbPicture];
              // elm._spbSprite.opacity = 0;

              activeCommandActorId = null;

              // SE再生
              this.playSe(sbPicture);
            }
          }
        }
      }
      //-----------------------------------------------------------------------------
      // 戦う or 逃げる 選択時
      //-----------------------------------------------------------------------------
      if (isPhase == "turn" || isPhase == "input") {
        if (!commandActor && isInputting) {
          let selectStartActorId = null;
          if (startActorType == "firstActor") {
            sbPicture = getImageName(this._firstActorId, sbCommandPictureLists);
            selectStartActorId = this._firstActorId;
          } else if (startActorType == "randomActor") {
            sbPicture = getImageName(
              this._randomActorId,
              sbCommandPictureLists
            );
            selectStartActorId = this._randomActorId;
          }
          if (sbPicture) {
            sbPicture = JSON.parse(JSON.stringify(sbPicture));
            if (activeCommandActorId != selectStartActorId) {
              activeCommandActorId = selectStartActorId;
              refSbPicture = true;
              // 通常
              motionSbPicture = sbPicture.motion;
              animationCount = animationFrame[motionSbPicture];
              elm._spbSprite.opacity = 0;
            }
          }
        }
      }
      //-----------------------------------------------------------------------------
      // コマンド入力時
      //-----------------------------------------------------------------------------
      if (isPhase == "turn" || isPhase == "input") {
        if (commandActor) {
          sbPicture = getImageName(
            commandActor._actorId,
            sbCommandPictureLists
          );
          if (sbPicture) {
            sbPicture = JSON.parse(JSON.stringify(sbPicture));
            if (activeCommandActorId != commandActor._actorId) {
              activeCommandActorId = commandActor._actorId;
              refSbPicture = true;
              // 通常
              motionSbPicture = sbPicture.motion;
              animationCount = animationFrame[motionSbPicture];
              elm._spbSprite.opacity = 0;
            }
            // 敵選択時は非表示にする
            if (hiddenEnemyWindow) {
              if (elm._enemyWindow) {
                elm._spbSprite.visible = !elm._enemyWindow.active;
              }
            }

            // 対象アクター選択時は非表示にする
            if (hiddenActorWindow && elm._spbSprite.visible === true) {
              if (elm._actorWindow) {
                elm._spbSprite.visible = !elm._actorWindow.active;
              }
            }
          }
        }
      }

      //-----------------------------------------------------------------------------
      // 継続表示
      //-----------------------------------------------------------------------------
      if (sbPicture && refSbPicture) {
        this._currentSbActorId = sbPicture.actorId;
      }
      if (!sbPicture && this._currentSbActorId && !this._battleEnd) {
        if ($gameActors.actor(this._currentSbActorId).isAlive()) {
          sbPicture = getImageName(
            this._currentSbActorId,
            sbCommandPictureLists
          );
          if (sbPicture) {
            sbPicture = JSON.parse(JSON.stringify(sbPicture));
            if (activeStanbyActorId != sbPicture.actorId) {
              activeStanbyActorId = sbPicture.actorId;
              refSbPicture = true;
              motionSbPicture = "none";
              animationCount = animationFrame[motionSbPicture];
              // elm._spbSprite.opacity = 0;

              activeCommandActorId = null;
              activeDamageActorId = null;
              activeActionActorId = null;
            }
          }
        }
      } else {
        activeStanbyActorId = null;
      }

      // 立ち絵ピクチャ作成
      if (sbPicture && refSbPicture) {
        this.refresh(elm._spbSprite, sbPicture);
        refSbPicture = false;
      }

      // フェード処理
      if (sbPicture) {
        this.fadeIn(elm._spbSprite, sbPicture);
      } else {
        this.fadeOut(elm._spbSprite, sbPicture);
      }

      // 立ち絵モーション再生
      if (animationCount > 0) {
        animationCount = this.animation(
          elm._spbSprite,
          motionSbPicture,
          animationCount
        );
      }
    }

    static refresh(sSprite, sPicture) {
      sSprite.setPicture(sPicture);
      sSprite.showing = false;
      let calcScaleX = Number(sPicture.scaleX);
      let calcScaleY = Number(sPicture.scaleY);
      // 画像が読み込まれたあとに実行
      sSprite.bitmap.addLoadListener(
        function () {
          if (
            Number(sPicture.origin) != 1 &&
            String(sPicture.origin) != "center"
          ) {
            // 左上原点
            sSprite.x = Number(sPicture.x);
            sSprite.y = Number(sPicture.y);
            sSprite.originX = Number(sPicture.x);
            sSprite.originY = Number(sPicture.y);
          } else {
            // 中央原点
            sSprite.x =
              Number(sPicture.x) - (sSprite.width * calcScaleX) / 100 / 2;
            sSprite.y =
              Number(sPicture.y) - (sSprite.height * calcScaleY) / 100 / 2;
            sSprite.originX =
              Number(sPicture.x) - (sSprite.width * calcScaleX) / 100 / 2;
            sSprite.originY =
              Number(sPicture.y) - (sSprite.height * calcScaleY) / 100 / 2;
          }
          // 切替効果
          if (sSprite.opacity == 0) {
            //
          }
          sSprite.scale.x = calcScaleX / 100;
          sSprite.scale.y = calcScaleY / 100;
          sSprite.showing = true;
          // 非表示状態リセット
          sSprite.visible = true;
        }.bind(this)
      );
    }

    static fadeIn(sSprite, sPicture) {
      if (!sSprite.showing) return;
      if (sSprite.opacity >= 255) {
        sSprite.opening = false;
        sSprite.opacity = 255;
        return;
      }
      sSprite.opening = true;
      sSprite.closing = false;
      sSprite.opacity += 24;
    }

    static fadeOut(sSprite, sPicture) {
      if (sSprite.opacity == 0) {
        activeCommandActorId = null;
        activeDamageActorId = null;
        activeActionActorId = null;
        sSprite.closing = false;
        return;
      }
      sSprite.closing = true;
      if (!sPicture) {
        //sSprite.opacity = 0;
        //return;
      }
      sSprite.opacity -= 24;
    }

    static animation(sSprite, sMotion, animationCount) {
      if (!sSprite.showing) return animationCount;
      if (sMotion == "yes") {
        if (animationCount > 12) {
          sSprite.y += 2;
        } else {
          sSprite.y -= 2;
        }
        animationCount -= 1;
      }
      if (sMotion == "yesyes") {
        if (animationCount > 36) {
          sSprite.y += 2;
        } else if (animationCount > 24) {
          sSprite.y -= 2;
        } else if (animationCount > 12) {
          sSprite.y += 2;
        } else {
          sSprite.y -= 2;
        }
        animationCount -= 1;
      }
      if (sMotion == "no") {
        if (animationCount > 18) {
          sSprite.x += 2;
        } else if (animationCount > 6) {
          sSprite.x -= 2;
        } else {
          sSprite.x += 2;
        }
        animationCount -= 1;
      }
      if (sMotion == "noslow") {
        if (animationCount > 36) {
          sSprite.x += 1;
        } else if (animationCount > 12) {
          sSprite.x -= 1;
        } else {
          sSprite.x += 1;
        }
        animationCount -= 1;
      }
      if (sMotion == "jump") {
        if (animationCount > 12) {
          sSprite.y -= 2;
        } else {
          sSprite.y += 2;
        }
        animationCount -= 1;
      }
      if (sMotion == "jumpjump") {
        if (animationCount > 36) {
          sSprite.y -= 2;
        } else if (animationCount > 24) {
          sSprite.y += 2;
        } else if (animationCount > 12) {
          sSprite.y -= 2;
        } else {
          sSprite.y += 2;
        }
        animationCount -= 1;
      }
      if (sMotion == "jumploop") {
        if (animationCount > 36) {
          sSprite.y -= 2;
        } else if (animationCount > 24) {
          sSprite.y += 2;
        }
        animationCount -= 1;
        if (animationCount == 0) animationCount = animationFrame["jumploop"];
      }
      if (sMotion == "shake") {
        if (animationCount <= 2) {
          sSprite.x -= 2;
          animationCount += 1;
        } else if (animationCount <= 4) {
          sSprite.y -= 2;
          animationCount += 1;
        } else if (animationCount <= 6) {
          sSprite.x += 4;
          sSprite.y += 4;
          animationCount += 1;
        } else if (animationCount <= 8) {
          sSprite.y -= 2;
          animationCount += 1;
        } else if (animationCount == 9) {
          sSprite.x -= 2;
          animationCount += 1;
        } else if (animationCount == 10) {
          sSprite.x -= 2;
          animationCount = 0;
        }
      }
      if (sMotion == "shakeloop") {
        if (animationCount <= 2) {
          sSprite.x -= 1;
          animationCount += 1;
        } else if (animationCount <= 4) {
          sSprite.y -= 1;
          animationCount += 1;
        } else if (animationCount <= 6) {
          sSprite.x += 2;
          sSprite.y += 2;
          animationCount += 1;
        } else if (animationCount <= 8) {
          sSprite.y -= 1;
          animationCount += 1;
        } else if (animationCount <= 10) {
          sSprite.x -= 1;
          animationCount += 1;
        }
        if (animationCount > 10) animationCount = 1;
      }
      if (sMotion == "runleft") {
        sSprite.x -= 16;
        if (sSprite.x < -2000) animationCount = 0;
      }
      if (sMotion == "runright") {
        sSprite.x += 16;
        if (sSprite.x > 2000) animationCount = 0;
      }
      //
      if (sMotion == "damage") {
        if (animationCount <= 2) {
          sSprite.x -= 4;
          animationCount += 1;
        } else if (animationCount <= 4) {
          sSprite.y -= 4;
          animationCount += 1;
        } else if (animationCount <= 6) {
          sSprite.x += 8;
          sSprite.y += 8;
          animationCount += 1;
        } else if (animationCount <= 8) {
          sSprite.y -= 4;
          animationCount += 1;
        } else if (animationCount == 9) {
          sSprite.x -= 4;
          animationCount += 1;
        } else if (animationCount == 10) {
          sSprite.x -= 4;
          animationCount = 0;
        }
      }
      if (sMotion == "floatrightfast") {
        if (animationCount == 12) {
          sSprite.x += 22;
        } else {
          sSprite.x -= 2;
        }
        animationCount -= 1;
      }
      if (sMotion == "floatright") {
        if (animationCount == 48) {
          sSprite.x += 47;
        } else {
          sSprite.x -= 1;
        }
        animationCount -= 1;
      }
      if (sMotion == "floatleftfast") {
        if (animationCount == 12) {
          sSprite.x -= 22;
        } else {
          sSprite.x += 2;
        }
        animationCount -= 1;
      }
      if (sMotion == "floatleft") {
        if (animationCount == 48) {
          sSprite.x -= 47;
        } else {
          sSprite.x += 1;
        }
        animationCount -= 1;
      }
      if (sMotion == "noslowloop") {
        if (animationCount > 72) {
          sSprite.x += 0.25;
        } else if (animationCount > 24) {
          sSprite.x -= 0.25;
        } else {
          sSprite.x += 0.25;
        }
        animationCount -= 1;
        if (animationCount == 0) animationCount = animationFrame["noslowloop"];
      }
      if (sMotion == "breathing") {
        if (animationCount > 72) {
          sSprite.y += 0.5;
        } else if (animationCount > 48) {
          sSprite.y -= 0.5;
        } else {
        }
        animationCount -= 1;
        if (animationCount == 0) animationCount = animationFrame["breathing"];
      }
      if (sMotion == "breathing2") {
        if (animationCount > 48) {
          // sSprite.anchor.y = 1;
          sSprite.y -= sSprite.height * 0.0003;
          sSprite.scale.y += 0.0003;
        } else {
          // sSprite.anchor.y = 1;
          sSprite.y += sSprite.height * 0.0003;
          sSprite.scale.y -= 0.0003;
        }
        animationCount -= 1;
        if (animationCount == 0) animationCount = animationFrame["breathing2"];
      }
      if (sMotion == "stepleft") {
        if (animationCount > 12) {
          sSprite.x -= 2;
        } else {
          sSprite.x += 2;
        }
        animationCount -= 1;
      }
      if (sMotion == "stepright") {
        if (animationCount > 12) {
          sSprite.x += 2;
        } else {
          sSprite.x -= 2;
        }
        animationCount -= 1;
      }
      if (sMotion == "headdown") {
        sSprite.y += 2;
        animationCount -= 1;
      }
      return animationCount;
    }

    static playSe(sPicture) {
      // 有効化判定
      const enabled = $gameVariables.value(disableSeVariableId) === 0;
      if (!sPicture.seName || !enabled) return;

      const se = {
        name: String(sPicture.seName || ""),
        volume: 90,
        pitch: 100,
        pan: 0,
      };

      AudioManager.playSe(se);
    }
  }

  //-----------------------------------------------------------------------------
  // Ex Loop Animation Battle class
  //
  // 戦闘中ループアニメーションを表示する独自のクラスを追加定義します。

  class ExLoopAnimationBattle {
    static create(elm) {
      // ウィンドウ前面表示判定
      const foreFront = $gameVariables.value(foreFrontVariableId) !== 0;
      // ループアニメーション1
      elm._spbAnimeSprite = new Sprite_LL_LoopAnimation();
      elm.addChildAt(
        elm._spbAnimeSprite,
        elm.children.indexOf(foreFront ? elm._windowLayer : elm._spriteset) + 1
      );
      // ループアニメーション2
      elm._spbAnimeSprite2 = new Sprite_LL_LoopAnimation();
      elm.addChildAt(
        elm._spbAnimeSprite2,
        elm.children.indexOf(foreFront ? elm._windowLayer : elm._spriteset) + 1
      );
      // バトル開始・終了フラグをオフ
      this._battleStart = false;
      this._battleEnd = false;
      // 継続表示用アクターID
      this._currentSbActorId = null;
    }

    static update(elm) {
      // 初期設定
      let sbAnimation = null;
      let isPhase = BattleManager.isPhase();
      let isInputting = BattleManager.isInputting();
      let isEscaped = BattleManager.isEscaped();
      let isAllDead = $gameParty.isAllDead();
      let commandActor = BattleManager.actor();
      let isSubject = BattleManager.isSubject();

      if (BattleManager._action) {
        if (BattleManager._action._subjectActorId) {
          this._lastActionActorId = BattleManager._action._subjectActorId;
        }
      }
      //-----------------------------------------------------------------------------
      // ターン開始時
      //-----------------------------------------------------------------------------
      if (isPhase == "start") {
        if (!this._battleStart) {
          // 生存しているアクターを取得
          this._aliveBattleMembers = $gameParty.aliveBattleMembers();
          // 先頭アクターIDを取得
          this._firstActorId =
            this._aliveBattleMembers.length > 0
              ? this._aliveBattleMembers[0]._actorId
              : null;
          // ランダムアクターID抽選
          this._randomActorId =
            this._aliveBattleMembers.length > 0
              ? this._aliveBattleMembers[
                  Math.floor(Math.random() * this._aliveBattleMembers.length)
                ]._actorId
              : null;
          this._battleStart = true;
        }
      }
      //-----------------------------------------------------------------------------
      // ターン終了時
      //-----------------------------------------------------------------------------
      if (isPhase == "turnEnd") {
        // 生存しているアクターを取得
        this._aliveBattleMembers = $gameParty.aliveBattleMembers();
        // 先頭アクターIDを取得
        this._firstActorId =
          this._aliveBattleMembers.length > 0
            ? this._aliveBattleMembers[0]._actorId
            : null;
        // ランダムアクターID抽選
        this._randomActorId =
          this._aliveBattleMembers.length > 0
            ? this._aliveBattleMembers[
                Math.floor(Math.random() * this._aliveBattleMembers.length)
              ]._actorId
            : null;
      }

      // 立ち絵を非表示に設定している場合、処理を中断
      if (
        $gameSystem._StandingPictureBattleDisabled ||
        $gameVariables.value(enableLoopAnimationVariableId) === 0
      ) {
        elm._spbAnimeSprite.opacity = 0;
        elm._spbAnimeSprite2.opacity = 0;
        return;
      }

      //-----------------------------------------------------------------------------
      // 戦闘終了時
      //-----------------------------------------------------------------------------
      if (isPhase == "battleEnd") {
        if (isEscaped) {
          // 逃走
        } else if (isAllDead) {
          // 全滅
        } else {
          if (!this._battleEnd) {
            // 生存しているアクターを取得
            let aliveBattleMembers = $gameParty.aliveBattleMembers();
            // 先頭アクターIDを取得
            this._firstActorId =
              aliveBattleMembers.length > 0
                ? aliveBattleMembers[0]._actorId
                : null;
            // ランダムアクターID抽選
            this._randomActorId =
              aliveBattleMembers.length > 0
                ? aliveBattleMembers[
                    Math.floor(Math.random() * aliveBattleMembers.length)
                  ]._actorId
                : null;
          }
          if (winActorType == "lastActor") {
            sbAnimation = getImageName(
              this._lastActionActorId,
              sbWinAnimationLists
            );
          } else if (winActorType == "randomActor") {
            sbAnimation = getImageName(
              this._randomActorId,
              sbWinAnimationLists
            );
          } else if (winActorType == "firstActor") {
            sbAnimation = getImageName(this._firstActorId, sbWinAnimationLists);
          }
          if (!this._battleEnd) {
            if (sbAnimation) {
              refSbAnimation = true;
            }
          }
        }
        this._battleEnd = true;
      }
      //-----------------------------------------------------------------------------
      // 被ダメージ時
      //-----------------------------------------------------------------------------
      if (showLoopDamageActorId) {
        if (isPhase == "action") {
          sbAnimation = getImageName(
            showLoopDamageActorId,
            sbDamageAnimationLists
          );
          if (sbAnimation) {
            if (activeLoopDamageActorId != showLoopDamageActorId) {
              activeLoopDamageActorId = showLoopDamageActorId;
              refSbAnimation = true;
              // elm._spbAnimeSprite.opacity = 0;
              // elm._spbAnimeSprite2.opacity = 0;
            }
          }
        } else {
          showLoopDamageActorId = null;
          sbAnimation = null;
        }
      }
      //-----------------------------------------------------------------------------
      // アクション時
      //-----------------------------------------------------------------------------
      if (!showLoopDamageActorId) {
        //
      }
      //-----------------------------------------------------------------------------
      // 戦う or 逃げる 選択時
      //-----------------------------------------------------------------------------
      if (isPhase == "turn" || isPhase == "input") {
        if (!commandActor && isInputting) {
          let selectStartActorId = null;
          if (startActorType == "firstActor") {
            sbAnimation = getImageName(
              this._firstActorId,
              sbCommandAnimationLists
            );
            selectStartActorId = this._firstActorId;
          } else if (startActorType == "randomActor") {
            sbAnimation = getImageName(
              this._randomActorId,
              sbCommandAnimationLists
            );
            selectStartActorId = this._randomActorId;
          }
          if (sbAnimation) {
            sbAnimation = JSON.parse(JSON.stringify(sbAnimation));
            if (activeLoopCommandActorId != selectStartActorId) {
              activeLoopCommandActorId = selectStartActorId;
              refSbAnimation = true;
              elm._spbAnimeSprite.opacity = 0;
              elm._spbAnimeSprite2.opacity = 0;
            }
          }
        }
      }
      //-----------------------------------------------------------------------------
      // コマンド入力時
      //-----------------------------------------------------------------------------
      if (isPhase == "turn" || isPhase == "input") {
        if (commandActor) {
          sbAnimation = getImageName(
            commandActor._actorId,
            sbCommandAnimationLists
          );
          if (sbAnimation) {
            sbAnimation = JSON.parse(JSON.stringify(sbAnimation));
            if (activeLoopCommandActorId != commandActor._actorId) {
              activeLoopCommandActorId = commandActor._actorId;
              refSbAnimation = true;
              // elm._spbAnimeSprite.opacity = 0;
              // elm._spbAnimeSprite2.opacity = 0;
            }
            // 敵選択時は非表示にする
            if (hiddenEnemyWindow) {
              if (elm._enemyWindow) {
                elm._spbAnimeSprite.visible = !elm._enemyWindow.active;
                elm._spbAnimeSprite2.visible = !elm._enemyWindow.active;
              }
            }

            // 対象アクター選択時は非表示にする
            if (
              hiddenActorWindow &&
              (elm._spbAnimeSprite.visible === true ||
                elm._spbAnimeSprite2.visible === true)
            ) {
              if (elm._actorWindow) {
                elm._spbAnimeSprite.visible = !elm._actorWindow.active;
                elm._spbAnimeSprite2.visible = !elm._actorWindow.active;
              }
            }
          }
        }
      }

      //-----------------------------------------------------------------------------
      // 継続表示
      //-----------------------------------------------------------------------------
      if (sbAnimation && refSbAnimation) {
        this._currentSbActorId = sbAnimation.actorId;
      }
      if (!sbAnimation && this._currentSbActorId && !this._battleEnd) {
        if ($gameActors.actor(this._currentSbActorId).isAlive()) {
          sbAnimation = getImageName(
            this._currentSbActorId,
            sbCommandAnimationLists
          );
          if (sbAnimation) {
            sbAnimation = JSON.parse(JSON.stringify(sbAnimation));
            if (activeLoopStanbyActorId != sbAnimation.actorId) {
              activeLoopStanbyActorId = sbAnimation.actorId;
              refSbAnimation = true;
              // elm._spbAnimeSprite.opacity = 0;
              // elm._spbAnimeSprite2.opacity = 0;

              activeLoopCommandActorId = null;
              activeLoopDamageActorId = null;
              // activeLoopActionActorId = null;
            }
          }
        }
      } else {
        activeLoopStanbyActorId = null;
      }

      // ループアニメーション作成
      if (sbAnimation && refSbAnimation) {
        this.refresh(elm._spbAnimeSprite, sbAnimation, "animation1");
        this.refresh(elm._spbAnimeSprite2, sbAnimation, "animation2");
        refSbAnimation = false;
      }

      // ループアニメーションフェード処理
      if (sbAnimation) {
        this.fadeIn(elm._spbAnimeSprite, sbAnimation);
        this.fadeIn(elm._spbAnimeSprite2, sbAnimation);
      } else {
        this.fadeOut(elm._spbAnimeSprite, sbAnimation);
        this.fadeOut(elm._spbAnimeSprite2, sbAnimation);
      }
    }

    static fadeIn(sSprite, sAnimation) {
      if (!sSprite.showing) return;
      if (sSprite.opacity >= 255) {
        sSprite.opening = false;
        sSprite.opacity = 255;
        return;
      }
      sSprite.opening = true;
      sSprite.closing = false;
      sSprite.opacity += 24;
    }

    static fadeOut(sSprite, sAnimation) {
      if (sSprite.opacity == 0) {
        activeLoopCommandActorId = null;
        activeLoopDamageActorId = null;
        activeLoopActionActorId = null;
        sSprite.closing = false;
        return;
      }
      sSprite.closing = true;
      if (!sAnimation) {
        //sSprite.opacity = 0;
        //return;
      }
      sSprite.opacity -= 24;
    }

    static refresh(sSprite, sAnimation, number) {
      sSprite.showing = false;

      const animation = sAnimation[number];
      if (animation) {
        // アニメーション情報を取得
        const animationList = animationLists.find(function (item) {
          if (item.id === animation.animationId) return true;
        });

        if (animationList) {
          // アニメーション設定を生成
          const animationSetting = {
            animationId: animation.animationId,
            x: animation.x,
            y: animation.y,
            scaleX: animation.scaleX,
            scaleY: animation.scaleY,
            rotation: animation.rotation,
            tone: [0, 0, 0, 0],
            picture: "",
          };
          // アニメーションセット
          sSprite.setPicture(
            animationList.id,
            animationList.frame,
            animationSetting
          );
          // 非表示状態リセット
          sSprite.visible = true;
          sSprite.showing = true;
        }
      } else {
        // アニメーションを削除
        sSprite.removePicture();
      }
    }
  }

  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.apply(this, arguments);
    // 立ち絵
    ExStandingPictureBattle.update(this);
    // ループアニメーション
    ExLoopAnimationBattle.update(this);
  };

  // const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
  // Scene_Battle.prototype.createSpriteset = function() {
  // 	_Scene_Battle_createSpriteset.apply(this, arguments);
  // 	// 立ち絵
  // 	ExStandingPictureBattle.create(this);
  // };

  const _Scene_Battle_createWindowLayer =
    Scene_Battle.prototype.createWindowLayer;
  Scene_Battle.prototype.createWindowLayer = function () {
    _Scene_Battle_createWindowLayer.apply(this, arguments);
    // 立ち絵
    ExStandingPictureBattle.create(this);
    // ループアニメーション
    ExLoopAnimationBattle.create(this);
  };

  //-----------------------------------------------------------------------------
  // Sprite_LL_SPicture
  //
  // 立ち絵を表示するための独自のスプライトを追加定義します。

  function Sprite_LL_SPicture() {
    this.initialize.apply(this, arguments);
  }

  Sprite_LL_SPicture.prototype = Object.create(Sprite.prototype);
  Sprite_LL_SPicture.prototype.constructor = Sprite_LL_SPicture;

  Sprite_LL_SPicture.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);

    this.bitmap = null;
    this.opacity = 0;
    this.opening = false;
    this.closing = false;
    this.originX = 0;
    this.originY = 0;
    this.showing = false;

    this.setOverlayBitmap();
    this.initMembers();
  };

  Sprite_LL_SPicture.prototype.setOverlayBitmap = function () {
    //
  };

  Sprite_LL_SPicture.prototype.initMembers = function () {
    //
  };

  Sprite_LL_SPicture.prototype.update = function () {
    Sprite.prototype.update.call(this);
  };

  Sprite_LL_SPicture.prototype.setPicture = function (sPicture) {
    // ベース画像
    this.bitmap = null;
    this.bitmap = ImageManager.loadPicture(sPicture.imageName);
  };

  Sprite_LL_SPicture.prototype.setBlendColor = function (color) {
    Sprite.prototype.setBlendColor.call(this, color);
  };

  Sprite_LL_SPicture.prototype.setColorTone = function (tone) {
    Sprite.prototype.setColorTone.call(this, tone);
  };

  Sprite_LL_SPicture.prototype.setBlendMode = function (mode) {
    this.blendMode = mode;
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
      return;
    }

    // アニメーション設定読み込み
    const animationList = animationLists.find(
      function (item, index) {
        if (item.id === this._animationId) return true;
      }.bind(this)
    );

    if (!animationList) return;

    const animationFrames = animationList.animationFrames
      .split(/\r\n|\n/)
      .filter((v) => v);
    const animationFrame =
      animationFrames[this._animationFrameNumber].split(",");

    // 画像表示
    this._spriteMain.bitmap = ImageManager.loadLoopAnimation(animationFrame[0]);

    // 効果音再生
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

    // フレーム処理
    this._animationFrameCount++;
    if (this._animationFrame === this._animationFrameCount) {
      this._animationFrameCount = 0;
      this._animationFrameNumber++;

      if (animationFrames.length === this._animationFrameNumber) {
        this._animationFrameNumber = 0;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // ImageManager
  //

  ImageManager.loadLoopAnimation = function (filename) {
    return this.loadBitmap("img/ll_loopanimation/", filename);
  };
})();
