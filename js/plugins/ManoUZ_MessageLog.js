////////////////////////////////////////////////////////////////////////////////////////

/*:
 * @plugindesc ノベルゲーム向けの機能を提供します
 * @author しぐれん
 *
 * @target MZ
 * @orderAfter MOG_TitleSplashScreen
 *
 * @url https://siguren400.booth.pm/items/3300534
 *
 *
 * @command Show
 * @text バックログを開く
 *
 * @command ClearAll
 * @text 全てのログをクリアする
 * @desc 保存されているログを全て消します。
 *
 *
 * @command GetLogSize
 * @text 現在のログの大きさを取得
 * @arg variableId
 * @text 結果を書き込む変数
 * @type variable
 * @default 0
 *
 * @command SetAutoMode
 * @text オートモードの設定
 * @desc イベントコマンドからオート設定のON/OFFを切り替えます。
 * @arg automode
 * @type boolean
 * @default true
 *
 * @command GetAutoMode
 * @text オートモードの状態取得
 * @desc 現在のオート設定の状態を取得します。
 * @arg swtichId
 * @type switch
 * @default 0
 *
 * @command HasLastVoice
 * @text 最後に再生した音声の有無を取得
 * @desc 音声再生ボタンが有効かどうかを取得します。
 * @arg switchId
 * @default 0
 *
 *
 * @command GetAutoWaitTime
 * @text GetAutoWaitTime/オート待ち時間取得
 * @arg variableId
 * @text 結果を書き込む変数
 * @type variable
 * @default 0
 *
 * @command SetAutoWaitTime
 * @text SetAutoWaitTime/オート待ち時間設定
 * @arg variableId
 * @type variable
 * @default 0
 *
 * @command SetLogLimitSizeBasic
 * @text ログの保存容量を設定
 * @arg variableId
 * @type variable
 * @default 0
 *
 * @command GetLogLimitSizeBasic
 * @text ログの保存容量を取得
 * @arg variableId
 * @text 結果を書き込む変数
 * @type variable
 * @default 0
 *
 * @command SetLogLimitSizeExtends
 * @text ログの予備容量を設定
 * @arg variableId
 * @type variable
 * @default 0
 *
 * @command GetLogLimitSizeExtends
 * @text ログの予備容量を取得
 * @desc 取得するのはオプションの状態です。
 * @arg variableId
 * @text 結果を書き込む変数
 * @type variable
 * @default 0
 *
 * @command GetKeepingAutoMode
 * @text オート保持の設定を取得
 * @type switch
 * @default 0
 *
 * @command GetMachinakaLines
 * @text 街中モードの同時表示数を取得
 * @arg variableId
 * @text 結果を書き込む変数
 * @type variable
 * @default 0
 *
 * @command SetMachinakaLines
 * @text 街中モードの同時表示数を設定
 * @arg variableId
 * @type variable
 * @default 0
 *
 *
 * @command ShowConsloeProxy
 * @text ログ表示用のデータをコンソールに表示
 *
 * @param menuCommand
 * @text メニューコマンド
 * @type struct<MultiLangString>
 * @desc メニューにログを開くコマンドを追加します。
 * コマンド名が空欄の場合、追加しません。
 * @default {"ja_JP":"","en_US":"","zh_CN":"","ko_KR":"","de_DE":"","fr_FR":"","ru_RU":""}
 *
 * @param voice
 * @text ボイス設定
 * @desc 「文章の表示」と「SEの再生」を関連付けます。
 * 合致したファイルを音声として、メッセージログに記録します。
 * @type struct<VoiceJA>
 * @default {"regex":"voice","files":"[]"}
 *
 * @param buttonSetting
 * @text ボタンの全般設定
 * @type struct<ButtonSettingJA>
 * @default {"offsetX":"0","offsetY":"0","windowOverlap":"outside","windowStretchY":"0"}
 *
 * @param backlogButton
 * @text ログ表示ボタン
 * @type struct<ButtonJA>
 * @default {"x":"0","y":"0","image":"MessageButton","enabledSwitch":"0","pressedSound":"{\"name\":\"Book1\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}","hot":"{\"x\":\"0\",\"y\":\"256\",\"width\":\"64\",\"height\":\"64\"}","cold":"{\"x\":\"64\",\"y\":\"256\",\"width\":\"64\",\"height\":\"64\"}"}
 * @parent buttonSetting
 *
 * @param saveButton
 * @text セーブボタン
 * @type struct<ButtonJA>
 * @default {"x":"64","y":"0","image":"MessageButton","enabledSwitch":"0","pressedSound":"{\"name\":\"Book2\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}","hot":"{\"x\":\"0\",\"y\":\"128\",\"width\":\"64\",\"height\":\"64\"}","cold":"{\"x\":\"64\",\"y\":\"128\",\"width\":\"64\",\"height\":\"64\"}"}
 * @parent buttonSetting
 *
 * @param loadButton
 * @text ロードボタン
 * @type struct<ButtonJA>
 * @default {"x":"128","y":"0","image":"MessageButton","enabledSwitch":"0","pressedSound":"{\"name\":\"Book2\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}","hot":"{\"x\":\"0\",\"y\":\"192\",\"width\":\"64\",\"height\":\"64\"}","cold":"{\"x\":\"64\",\"y\":\"192\",\"width\":\"64\",\"height\":\"64\"}"}
 * @parent buttonSetting
 *
 * @param voiceRepeatButton
 * @text ボイスリプレイボタン
 * @desc 押した場合、最後のボイスをもう一度再生します。
 * @type struct<ButtonJA>
 * @default {"x":"256","y":"0","image":"MessageButton","enabledSwitch":"0","pressedSound":"","hot":"{\"x\":\"0\",\"y\":\"320\",\"width\":\"64\",\"height\":\"64\"}","cold":"{\"x\":\"64\",\"y\":\"320\",\"width\":\"64\",\"height\":\"64\"}"}
 * @parent buttonSetting
 *
 * @param autoButton
 * @text オートボタン
 * @desc オート状態の場合、
 * 解除されるまでボタンが押されている状態の表示になります。
 * @type struct<ButtonJA>
 * @default {"x":"196","y":"0","image":"MessageButton","enabledSwitch":"0","pressedSound":"{\"name\":\"Key\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}","hot":"{\"x\":\"0\",\"y\":\"0\",\"width\":\"64\",\"height\":\"64\"}","cold":"{\"x\":\"64\",\"y\":\"0\",\"width\":\"64\",\"height\":\"64\"}"}
 * @parent buttonSetting
 *
 * @param autoGauge
 * @text オートゲージ
 * @type struct<AutoGauge>
 * @default {"gaugeType":"circle","x":"0","y":"0","width":"10","texture":"","color":"FF0000"}
 * @parent autoButton
 *
 * @param skipButton
 * @text 既読スキップボタン
 * @desc 押された際に指定スイッチをONにします。
 * 既読スキップの処理はManoUZ_Kidokuを使います。
 * @type struct<ButtonJA>
 * @default {"x":"320","y":"0","image":"MessageButton","hot":"{\"x\":\"0\",\"y\":\"64\",\"width\":\"64\",\"height\":\"64\"}","cold":"{\"x\":\"64\",\"y\":\"64\",\"width\":\"64\",\"height\":\"64\"}","enabledSwitch":"0","pressedSound":"{\"name\":\"Key\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}"}
 * @parent buttonSetting
 *
 * @param skipSwitch
 * @text スキップモード時にONにするスイッチ
 * @desc 未設定の場合、スキップボタンを押しても動きません。
 * @type switch
 * @default 0
 * @parent skipButton
 *
 * @param logWriteSwitch
 * @text ログ書き込み有効化スイッチ
 * @desc 指定したスイッチがONの場合のみ、ログを書き込みます。
 * 未指定の場合、常に書き込みます。
 * @type switch
 * @default 0
 *
 * @param logWriteOnBattle
 * @text 戦闘中のログ書き込み
 * @desc OFFにすると、戦闘中はログの書き込みを行いません。
 * @type boolean
 * @default false
 *
 * @param logStyle
 * @type struct<LogStyleJA>
 * @text ログ画面スタイル
 * @desc ログ画面の配置などを設定します。
 * @default {"windowFileName":"Window","background":"","speakerName":"【%1】","choiceFormat":"【%1】：%2","choiceText":"{\"ja_JP\":\"選択肢\",\"en_US\":\"choices\",\"zh_CN\":\"选择\",\"ko_KR\":\"선택\",\"de_DE\":\"Auswahl\",\"fr_FR\":\"Les choix\",\"ru_RU\":\"Выбор\"}","voiceIconIndex":"4"}
 *
 * @param autoWaitTime
 * @text オート待ち時間
 * @type number
 * @default 360
 *
 * @param logLimitBasic
 * @text ログ保存数(基本)
 * @desc 古いログを掃除する際に、ここで指定した個数以下にします。
 * @type number
 * @default 40
 *
 * @param logLimitExtends
 * @text ログ保存数(追加)
 * @desc 保存されたログが基本＋追加を超えた場合、
 * 古いログの破棄を行います。
 * @type number
 * @default 20
 *
 * @param machinakaModeSwitch
 * @text 街中モード制御スイッチ
 * @desc 指定スイッチがONの間のみ機能を有効化します。
 * @type switch
 * @default 0
 *
 * @param macinakaModeDefault
 * @text 街中モード初期値
 * @type boolean
 * @default true
 * @parent macinakaMode
 *
 * @param machinakaModeLines
 * @text 街中モード・表示行数
 * @type number
 * @default 3
 *
 * @param choiceFormat
 * @text 選択肢の表示形式
 * @type string
 * @desc %1に「選択肢」、%2に項目の文字列が表示されます。
 * @default 【%1】：%2
 * @parent logStyle
 *
 * @param choiceText
 * @text 選択肢
 * @type struct<MultiLangString>
 * @default {"ja_JP":"選択肢","en_US":"choices","zh_CN":"选择","ko_KR":"선택","de_DE":"Auswahl","fr_FR":"Les choix","ru_RU":"Выбор"}
 * @desc 選択肢の表示名。多言語対応済み。
 * @parent logStyle
 *
 * @param choiceCancelText
 * @text 選択肢キャンセル時の文章
 * @type struct<MultiLangString>
 * @default {"ja_JP":"キャンセル","en_US":"Cancel","zh_CN":"","ko_KR":"","de_DE":"","fr_FR":"","ru_RU":""}
 * @parent logStyle
 *
 * @help
 * 以下の機能を提供します
 * ■メッセージログの保存・表示
 * ■メッセージの途中セーブ・ロード実行
 * ■ボイス記録機能
 *
 * 「文章の表示」によって表示された文章をログとして記録します。
 *
 * ■ボタンの割り当てについて
 * メッセージの表示中、
 * 以下のシンボルの入力が行われた場合にシーン切り替えを実行します。
 * 内部判定はlongPressedを使用しているので、長押しが必要です。
 * ・セーブ:pageup
 * ・ロード:pagedown
 * ・ログ　:shift
 *
 * ■ボタン配置について
 * ボタン配置は相対位置で決められています。
 * ボタン領域の四角形は、全てのボタンを収めることができる四角形となります。
 * この四角形の右側がウィンドウの右側と合わさるような位置を基準とします。
 * offsetX,offsetYは、この位置を基準に動かします。
 *
 * ■途中セーブ機能について
 * メッセージ表示中にセーブ画面を開き、セーブを行えます。
 * トリガーが並列実行のイベントを実行中にセーブを行うと、
 * 不具合が発生することがあります。
 *
 * ■途中セーブをロードした場合の挙動
 * メッセージを正しく復元するために、イベントの実行状態を巻き戻します。
 * メッセージの文章によって変数などを操作するプラグインと併用すると、
 * 不具合が発生する可能性があります。
 *
 * ■ログデータが消えている場合
 * プラグインのバージョンが異なる場合、ログデータを初期化します。
 * この場合でもログ以外のセーブデータは読み込み可能です。
 *
 * ■ボイス記録機能
 * 文章の表示前に「SEの再生」が実行されていると、それをボイスとして記録します。
 *
 * 効果音が巻き込まれないように、判別方法が用意されています。
 * 効果音はaudio/se/の内部に配置されますが、
 * その中のサブフォルダで登録するかを判定します。
 * ※サブフォルダはツクールMZ ver1.3.1以降の機能です。
 * 対応するのは以下のファイルです。
 * ※以下の設定はパラメータ「ボイスファイル正規表現」が
 * 「voice」の場合の設定方法です。
 * ・フォルダ「audio/se/」内のサブフォルダ「voice」に含まれるファイル
 * ・ファイル名の先頭に「voice」と付くファイル
 * ・専用に登録したファイル(プラグインパラメータ:ボイスファイルリスト参照)
 *
 * ■メッセージ自動送り
 * 文章の表示が完了した後、一定時間の経過で自動的に次のメッセージを表示します。
 * ボイスがある場合、ボイスの再生完了まで待ちます。
 * 手動でメッセージ送りした場合、ボイスを停止します。
 *
 * メッセージ自動送りの速度を変更する場合、付属のオプションプラグインを入れてください。
 *
 * ■ログ画面の開き方
 * ログ画面はメッセージ表示中に以下の操作を押すと開きます。
 * ・shiftキーを押し続ける
 * ・マウスホイール上
 * ・画面内のボタンを押す
 * これ以外にも、プラグインコマンドで呼び出す方法があります。
 * マップ上で自由に呼び出せるようにしたい場合、
 * コモンイベントを利用してプラグインコマンドを呼び出してください。
 *
 * ■街中モード
 * マップ内を移動して複数のイベントに話しかけた場合を想定した機能です。
 * 同じイベントのイベントのメッセージを記録する場合、
 * 最新の1回分で上書きします。
 *
 * 街中モードによる表示はスイッチ制御で一時的に無効化できます。
 * 無効化中はログ画面を開いても街中モードの選択ウィンドウが非表示になります。
 *
 *
 *
 * ■利用規約
 * 1.利用可能なプロジェクト
 * ・ゲームの内容(配布および販売方法・年齢制限の有無など)を問わず、どのようなゲームにでもご利用いただけます。
 *
 * 2.利用条件
 * ・ゲームの配布(販売を含む)の際に、同梱のテキストなどに本プラグインを利用したことを記載してください。
 * ・複数人のチームによるゲーム作成の場合、参加者の内１名以上が本プラグインを購入している必要があります。
 * ・本プラグインを利用するに際し、利用者は自己の責任に基づいて使用するものとします。
 * ・本プラグインを改変しての利用は可能ですが、その場合は(5)で示すサポートの範囲外とします。
 *
 * 3.禁止事項
 * ・改変の有無に関わらず本プラグインをゲームの配布(販売を含む)以外の方法で、公開・配布・販売する行為。
 * ・配布(販売含む)されたゲームの中から本プラグイン抜き出して使用する行為。
 * ・このプラグインに記載された利用規約を削除・改変する行為。
 *
 * 4.免責事項
 * 当方は以下の内容についてその責任を負わないものとします。
 * ・本プラグインの更新によるセーブデータの互換性消失
 * ・セーブデータの破損
 * ・ゲームデータの破損
 * ・他のプラグインとの併用による誤作動・不具合
 * ・その他プラグインの使用によって生じた損害
 *
 * 5.不具合対応(サポート)
 * ・本プラグインの不具合について可能な限り対応しますが、修正を行うことを保証するものではありません。
 *
 * 9.利用規約の変更について
 * ・この利用規約は予告なく変更されることがあります。
 *
 */
/*~struct~PlaySeEN:
 * @param name
 * @type file
 * @dir audio/se/
 *
 * @param volume
 * @text Volume
 * @desc Adjust Voice File Volume
 * @default 90
 * @min 0
 * @max 100
 * @type number
 *
 * @param pitch
 * @text Pitch
 * @desc Adjust Voice File Pitch
 * @default 100
 * @type number
 *
 * @param pan
 * @text Pan
 * @desc Pan Voice File
 * @default 0
 * @min -100
 * @max 100
 * @type number
 */

/*~struct~PlaySeJA:
 * @param name
 * @type file
 * @dir audio/se/
 *
 * @param volume
 * @text 音量
 * @desc ボイスファイルの音量
 * @default 90
 * @min 0
 * @max 100
 * @type number
 *
 * @param pitch
 * @text ピッチ
 * @desc ボイスファイルのピッチ
 * @default 100
 * @type number
 *
 * @param pan
 * @text 左右バランス
 * @desc ボイスファイルの左右バランス
 * @default 0
 * @min -100
 * @max 100
 * @type number
 */
/*~struct~ButtonJA:
 *
 * @param x
 * @text X座標(相対位置)
 * @desc 基準位置はボタングループで設定。
 * 状況により基準位置は移動します。
 * @type number
 * @default 0
 *
 * @param y
 * @text Y座標(相対位置)
 * @desc 基準位置はボタングループで設定。
 * 状況により基準位置は移動します。
 * @type number
 * @default 0
 *
 * @param image
 * @text ボタン画像
 * @desc 空欄にするとボタンと対応した機能が無効になります。
 * @type file
 * @dir img/system/
 *
 * @param hot
 * @text 押されている時の画像
 * @type struct<Rect>
 * @desc ボタンがクリックされている間に表示する画像。
 * ボタン画像の一部から、指定範囲を切り出して使います。
 * @default {"x":"0","y":"0","width":"64","height":"64"}
 *
 * @param cold
 * @text 通常時の画像
 * @type struct<Rect>
 * @desc ボタンがクリックされていない間に表示する画像。
 * ボタン画像の一部から、指定範囲を切り出して使います。
 * @default {"x":"0","y":"0","width":"64","height":"64"}
 *
 * @param enabledSwitch
 * @text 有効化スイッチ
 * @desc 指定したスイッチがONの場合のみボタンを表示します。
 * ニューゲーム時にONになります。未指定の場合、常に有効化。
 * @type switch
 * @default 0
 *
 * @param pressedSound
 * @text 押された時の音声
 * @type struct<PlaySeJA>
 *
 */
/*~struct~AutoGauge:
 *
 * @param gaugeType
 * @type select
 * @option none
 * @option circle
 * @default circle
 *
 * @param x
 * @type number
 * @default 0
 *
 * @param y
 * @type number
 * @default 0
 *
 * @param width
 * @type number
 * @default 10
 *
 * @param texture
 * @type file
 * @dir img/system/
 *
 * @param color
 * @type string
 * @default FF0000
 */
/*~struct~ButtonSettingJA:
 * @param offsetX
 * @desc ボタンを横方向に移動します。
 * @type number
 * @min -123456
 * @default 0
 *
 * @param offsetY
 * @desc ボタンを縦方向に移動します。
 * @type number
 * @min -123456
 * @default 0
 *
 * @param windowOverlap
 * @text ウィンドウとの重なり
 * @type select
 * @option 内側(ウィンドウが少し大きくなります)
 * @value inside
 * @option 外側(必要に応じて選択肢が移動します)
 * @value outside
 * @option 絶対指定(ほぼ左上原点・メッセージが下側の場合のみ表示)
 * @value absolute
 * @default outside
 *
 * @param windowStretchY
 * @text ウィンドウの伸縮(Y)
 * @desc ボタン設置用のスペースを確保するときに使います。
 * @type number
 * @min -123456
 * @default 0
 *
 * @param disableSwitch
 * @text 強制ボタン非表示
 * @desc 指定したスイッチがONの間、全てのボタンを無効化します。
 * @type switch
 * @default 0
 * */
/*~struct~LogStyleJA:
 * @param windowRect
 * @text ウィンドウ配置
 * @type struct<Rect>
 *
 *
 * @param windowFileName
 * @type file
 * @text ウィンドウ画像
 * @dir img/system
 * @default Window
 *
 * @param background
 * @text 背景画像
 * @type file
 * @dir img/system
 * @desc ログシーンの背景に使う画像を設定します。
 *
 * @param freamColor
 * @text 枠線の色(空欄の場合非表示)
 * @desc 文章の間に入れる区切り線の色を指定します。#00FFFF表記
 * @type string
 * @default #00FFFF
 *
 * @param speakerName
 * @text 名前表示フォーマット
 * @desc 名前を変換して表示します(%1→名前,%2→ボイスアイコン)
 * @type string
 * @default 【%1】%2
 *
 *
 * @param voiceIconIndex
 * @text アイコン番号
 * @desc ログ表示の際に、ボイスがあるログにアイコンを表示します。
 * @type number
 * @default 4
 *
 *
 * @param lineSpacing
 * @text 行間スペース
 * @type number
 * @default 2
 *
 */
//通常効果音をボイス扱いするための機能
/*~struct~VoiceJA:
 * @param regex
 * @text ボイスファイル正規表現
 * @desc  正規表現で合致したファイル名を音声として扱います。
 * 内部的には「"^"+"この文字列"+".+"」で処理しています。
 * @type string
 * @default voice
 *
 * @param files
 * @text ボイスファイルリスト
 * @type file[]
 * @dir audio/se/
 * @desc 指定したファイルをボイスファイルとして扱います。
 * 正規表現で対応できないファイルを対応させる場合に使います。
 * @default []
 *
 *
 */

/*~struct~MultiLangString:
  * @param ja_JP
    @text 日本語

    @param en_US
    @text English

    @param zh_CN
    @text 中文(簡体)
    @desc 我不知道繁體中文，所以目​​前不支持。
    繁体については私が知らないので非対応です。

    @param ko_KR
    @text 한국

    @param de_DE
    @text Deutsche(ドイツ語)

    @param fr_FR
    @text français(フランス語)

    @param ru_RU
    @text русский(ロシア語)
 */

/**
 * @typedef {Object} ManoUZ_LogOptionParametor
 * @property {number} logLimitBasic
 * @property {number} logLimitExtends
 * @property {number} autoWaitTime
 * @property {boolean} keepingAutoMode
 * @property {number} gaugeColor
 * @property {number} machinakaLines
 */
/**
 * @typedef {Object} UZ_AudioFileParam
 * @property {string} name
 * @property {number} pan
 * @property {number} pitch
 * @property {number} pos
 * @property {number} volume
 */

/**
 * @typedef {object} LogManagerExportConcept
 * @property {(option:ManoUZ_LogOptionParametor)=>void} setOptionValue
 * @property {()=>ManoUZ_LogOptionParametor} cloneOptionValue
 * @property {(audio:UZ_AudioFileParam,exParam:any)=>void} playVoice
 */

function _0x2a75(_0x439a6a, _0x1fc4b3) {
  const _0x34b415 = _0x34b4();
  return (
    (_0x2a75 = function (_0x2a75e2, _0x411bce) {
      _0x2a75e2 = _0x2a75e2 - 0x1f2;
      let _0x1caec8 = _0x34b415[_0x2a75e2];
      return _0x1caec8;
    }),
    _0x2a75(_0x439a6a, _0x1fc4b3)
  );
}
function _0x34b4() {
  const _0x295903 = [
    "writeSaveContents",
    "macinakaModeDefault",
    "itemHeight",
    "_temporaly",
    "lineText",
    "pressedSound",
    "quickSaveFileName",
    "_localBoundsRect",
    "_defaultState",
    "quickSave",
    "refreshLang",
    "isTextAutoMode",
    "setShowFast",
    "createLogButtonSprites",
    "setLogLimitBasic",
    "_mapId",
    "machinakaWindowHeight",
    "list",
    "_autoXXX",
    "write",
    "callDrawIcon",
    "top",
    "_choiceText",
    "_layout",
    "_scrollY",
    "initSwitch",
    "_parallelMode",
    "getLogItemStyle",
    "variableId",
    "onMapEventStarted",
    "7XoqXbv",
    "skipSwitch",
    "bottom",
    "voiceIconIndex",
    "GetKeepingAutoMode",
    "createAutoGauge",
    "_textState",
    "CleanupOldData",
    "command250",
    "onVoiceStop",
    "nameIsMeetsTitle",
    "event",
    "autoGauge",
    "isNwjs",
    "mainAreaTop",
    "createOutside",
    "machinakaRect",
    "background",
    "SetLogLimitSizeBasic",
    "height",
    "onMachnakaOk",
    "_disableSwitch",
    "endFill",
    "visible",
    "_autoGaugeFunc",
    "2419256avHTfT",
    "movementAmountOfChoice",
    "_currentTime",
    "gaugeColor",
    "baseRect",
    "_backgroundSprite",
    "HasLastVoice",
    "radius",
    "125awfZat",
    "setJumpTarget",
    "isKeepingAutoMode",
    "isNumberInput",
    "_machinakaMode",
    "onBacklogOk",
    "createSprite",
    "zh_CN",
    "isLogSaveEnabled",
    "isLogWriteEnabled",
    "setTitle",
    "onNewGame",
    "choice",
    "layout",
    "_logManager",
    "_rootMapId",
    "logSizeRed",
    "_coldFrame",
    "playSe",
    "isLocationMatch",
    "pan",
    "otherLocationMatch",
    "_interpreter",
    "logWriteOnBattle",
    "getAutoWaitTime",
    "timerValue",
    "isMachinakaModeEnabled",
    "index",
    "lineSpacing",
    "loadButton",
    "_format",
    "_swicthId",
    "helpAreaHeight",
    "updatePlacement",
    "_behavior",
    "voiceIcon",
    "bitmap",
    "_background",
    "onChoiceOk",
    "keepingAutoMode",
    "_itemstyle",
    "isBottomHelpMode",
    "bottomLineIndex",
    "setLocal",
    "mapId",
    "10dOkzDA",
    "nextBottomIndex",
    "openOptionScene",
    "pushScene",
    "_frameColor",
    "playVoice",
    "regex",
    "RPGMAKER_NAME",
    "_channelFunc",
    "playClickSound",
    "topItemIndex",
    "windowskin",
    "start",
    "20388342IkAoNN",
    "createSpriteList",
    "setOptionValue",
    "autoTime",
    "image",
    "callOkHandler",
    "_paramNames",
    "choiceFormat",
    "needsVoiceIconRender",
    "isLogButtonEnabled",
    "isBeingTouched",
    "saveContents",
    "_machinakaRect",
    "itemPadding",
    "_radius",
    "valueRate",
    "hasLastVoice",
    "updateAutoTimer",
    "_switchId",
    "_positionType",
    "clearTextItem",
    "ko_KR",
    "_behaviorList",
    "enabledSwitch",
    "updateFrame",
    "setBattleMode",
    "_symbol",
    "updateInput",
    "clear",
    "onSaveLoaded",
    "_logStyle",
    "addLines",
    "popScene",
    "_textTerminate",
    "optionNormalize",
    "setValue",
    "Container",
    "\x0ascroll:",
    "_type",
    "symbol",
    "canSave",
    "1625678hVMLbD",
    "stop",
    "addOriginalCommands",
    "time",
    "createOnOffButtonSprite",
    "value",
    "_numLines",
    "_color",
    "isBattleMode",
    "itemStyle",
    "updateInterpreter",
    "true",
    "registerCommandMZ",
    "shift",
    "forceCleanup",
    "_texture",
    "isEnabled",
    "プラグインファイルの名前を変更してはいけません<br>",
    "backlogButton",
    "_choiceStyle",
    "_title",
    "choiceCancelType",
    "_commandWindow",
    "_cache",
    "isChoiceMatch",
    "setList",
    "select",
    "setLastVoiceParam",
    "disableSwitch",
    "getAutoMode",
    "play",
    "lineHeight",
    "drawTextEx",
    "selectLastItem",
    "setupStartingMapEvent",
    "onLabel",
    "setTextTerminate",
    "_item",
    "readOnryData",
    "_errorFiles",
    "lineIndex",
    "_seBuffers",
    "faceRect",
    "onAutoSaveSuccess",
    "calcSize",
    "_map",
    "baseTexture",
    "cloneOptionValue",
    "forceSelect",
    "createMachinakaList",
    "_index",
    "isInside",
    "cold",
    "hasVoice",
    "currentValue",
    "setLastVoiceBuffer",
    "204VBUGDu",
    "_scrollIndex",
    "autoWaitTime",
    "maxItems",
    "parse",
    "loadObject",
    "_volume",
    "logButtonAreaHeight",
    "isButtonDisabled",
    "getContents",
    "speakerName",
    "clearLastCodeIndex",
    "gaugeType",
    "logWindowRect",
    "createChoiceItemText",
    "right",
    "_windowStretchY",
    "calcRectHeight",
    "multiLineItems",
    "callMZ",
    "registerCommand",
    "parent",
    "messageLog",
    "_list",
    "eventId",
    "setPlayVoiceFunction",
    "isAutoMode",
    "exec",
    "pitch",
    "isMacinakaMode",
    "mainAreaHeight",
    "endMessage",
    "ManoUZ_MessageLog",
    "_lineIndex",
    "getLogSize",
    "setColdFrame",
    "stopVoice",
    "45xetVed",
    "width",
    "refresh",
    "onMachinakaCancel",
    "nextTopIndex",
    "faceName",
    "logLimitExtends",
    "_lastIndex",
    "drawFace",
    "prototype",
    "create",
    "111617fWAdsA",
    "geometry",
    "createLogWindow",
    "_machinakaList",
    "setupNewGame",
    "numLines",
    "wheelY",
    "switchId",
    "loadWindowskin",
    "_autoSpeedList",
    "_value",
    "ShowConsloeProxy",
    "textLines",
    "isValid",
    "itemRectWithPadding",
    "loadBitmap",
    "swtichId",
    "_logSwitch",
    "update",
    "hasName",
    "numItemLines",
    "buttonSetting",
    "ClearAll",
    "setHandler",
    "choiceCancelText",
    "isButtonOn",
    "setRootMap",
    "calcWindowHeight",
    "src",
    "newPage",
    "resetTimer",
    "createTitle",
    "setAutoMode",
    "playBuzzerSound",
    "_windowFileName",
    "SetLogLimitSizeExtends",
    "coldFrame",
    "isAbsolute",
    "_height",
    "error",
    "_eventId",
    "inBattle",
    "isPressed",
    "Unknow\x20RPG\x20MAKER:",
    "isButtonHot",
    "itemRect",
    "_buttons",
    "setHelpWindow",
    "needsDrawBackground",
    "startMessage",
    "_faceindex",
    "_needsShowFast",
    "freamColor",
    "itemRectForText",
    "createProxy",
    "setText",
    "_machinakaFocus",
    "isSaveEnabled",
    "_table",
    "_buttonsSprites",
    "skipButton",
    "_textuerName",
    "logSize",
    "cancel",
    "correctDataErrors",
    "_overlapType",
    "_msg",
    "defaultQuickSaveFileName",
    "needsAutoModeStop",
    "some",
    "setGaugeFunction",
    "needsNextMessage",
    "_func",
    "31566RkVVzI",
    "boxWidth",
    "setupBitmapStyle",
    "min",
    "_readOnlyData",
    "windowRect",
    "makeCache",
    "callUpdateHelp",
    "loadGame",
    "colSpacing",
    "1iZjFuU",
    "_name",
    "processTouch",
    "_logListWindow",
    "needsHelpWindow",
    "getLogItem",
    "_voiceReg",
    "drawItem",
    "isItemChoice",
    "needsDrawFace",
    "_messageStream",
    "getWorkaround",
    "isLocal",
    "UZMSGLOG",
    "label",
    "_logItem",
    "setParallelMode",
    "makeSaveContents",
    "createHelpWindow",
    "ru_RU",
    "slice",
    "clearOldData",
    "setLastVoice",
    "isTriggered",
    "itemAt",
    "_hotFrame",
    "length",
    "GetAutoSpeed",
    "timeRate",
    "pause",
    "_logWriteOnBattle",
    "makeMZ_arg",
    "add",
    "left",
    "maxValue",
    "_voice",
    "setContents",
    "addItem",
    "Show",
    "isLongPressed",
    "_option",
    "_auto",
    "mainAreaLeft",
    "parentId",
    "repeatLastVoice",
    "terminateMessage",
    "_pan",
    "initSwitchs",
    "clearLog",
    "GetLogLimitSizeExtends",
    "onEnedOfText",
    "logWriteSwitch",
    "logLimitBasic",
    "_choice",
    "setAutoGauge",
    "mode",
    "_logButtonGroop",
    "convertCall",
    "open",
    "speakerNameFormat",
    "_seBuffer",
    "8149887fZnAxj",
    "name",
    "<br>",
    "setLocation",
    "setAutoWaitTime",
    "extractSaveContents",
    "setLastCodeIndex",
    "color",
    "close",
    "changeAutoMode",
    "logquicksave",
    "call",
    "offsetY",
    "endAutoTimer",
    "_offsetY",
    "checkLogSize",
    "_enabled",
    "isOpen",
    "_voiceList",
    "faceWidth",
    "本来のファイル名:\x20",
    "createSpriteWithType",
    "commandName",
    "lastCodeIndex",
    "cloneValue",
    "saveButton",
    "smoothSelect",
    "addStopListener",
    "onClick",
    "_logWindow",
    "has",
    "_pitch",
    "isRunning",
    "titleText",
    "Current\x20file\x20name:\x20",
    "currentLocal",
    "_style",
    "currentItem",
    "faceHeight",
    "現在のファイル名:\x20",
    "bottomItemIndex",
    "machinakaWindowRect",
    "text",
    "createCommandWindow",
    "volume",
    "max",
    "command101",
    "callMV",
    "isIconLeft",
    "getLogLimitSizeBasic",
    "_childInterpreter",
    "needsTextTerminate",
    "bind",
    "onBoot",
    "getLogLimitSizeExtends",
    "createDisplayObjects",
    "pageup",
    "menuCommand",
    "currentScript",
    "_commandName",
    "_messageWindow",
    "_speakerName",
    "locale",
    "setLogListWindow",
    "_cancelText",
    "createMinimize",
    "saveCurrentLog",
    "_battleMode",
    "tryReadingSaveContents",
    "table",
    "lastItem",
    "linkWindow",
    "cancelText",
    "_gauge",
    "Do\x20not\x20rename\x20the\x20plugin\x20file.<br>",
    "iconWidth",
    "loadSystem",
    "_logList",
    "_width",
    "notitle",
    "_logWrite",
    "en_US",
    "convertEscapeCharacters",
    "clone",
    "obj",
    "pluginVersion",
    "isVoiceFile",
    "makeNewLog",
    "readSaveContents",
    "lineStyle",
    "choiceText",
    "isRepeated",
    "setWorkaround",
    "cursorUp",
    "readSwitch",
    "onStartMessage",
    "drawItemBackground",
    "offsetX",
    "quickLoad",
    "round",
    "logStyle",
    "getGaugeColor",
    "machinakaLines",
    "onAutosaveFailure",
    "_pluginName",
    "SetAutoMode",
    "title",
    "logManager",
    "_contents",
    "de_DE",
    "getStyle",
    "push",
    "setMachinakaTitle",
    "addChild",
    "arc",
    "windowStretchY",
    "saveObject",
    "lastVoice",
    "faceIndex",
    "none",
    "167492onmICj",
    "_nameBoxWindow",
    "_macinakaMode",
    "windowMessageInit",
    "makeData",
    "onTerminateMessage",
    "auto",
    "callCancelHandler",
    "_onOff",
    "applyData",
    "isVisible",
    "isVoiceStoped",
    "autoGaugeRate",
    "ja_JP",
    "_windowRect",
    "cursorDown",
    "map",
    "deselect",
    "isEmpty",
    "createButtonSprite",
    "isEventRunning",
    "machinakaModeSwitch",
    "_offsetX",
    "_defaultOption",
    "windowSkinBitmap",
    "_facename",
    "machinakeModeEnabled",
    "refreshAutoKeeping",
    "setBehavior",
    "option",
    "createGameObjects",
    "cloneDefaultOption",
    "inside",
    "_se",
    "isSceneChanging",
    "topIndex",
    "Graphics",
    "addWindow",
    "selectlLastItem",
    "redraw",
    "isMVcommandEnabeled",
    "version",
    "logSizeYellow",
    "test",
    "_pressed",
    "isTopItem",
    "abs",
    "makeItemList",
    "isCurrentItemEnabled",
    "_helpWindow",
    "updateHelp",
    "registerCommandMV",
    "hotFrame",
    "createEmptySaveContents",
    "contentsHeight",
    "startAutoTimer",
    "get",
    "voiceParam",
    "createMachinakaWindow",
    "_text",
    "resetTemporaly",
    "isAnyButtonOverlaped",
    "initialize",
    "activate",
    "GetLogLimitSizeBasic",
    "voice",
    "setScrollIndex",
    "rowSpacing",
    "needsShowFast",
    "isInputEnabled",
    "isItemEnalbled",
    "GetAutoMode",
    "getCurrentText",
    "makeStateText",
    "backgroundBitmap",
    "_machinakaWindow",
    "match",
    "_version",
  ];
  _0x34b4 = function () {
    return _0x295903;
  };
  return _0x34b4();
}
(function (_0x56cb11, _0x474943) {
  const _0x4e7c23 = _0x2a75,
    _0x19248d = _0x56cb11();
  while (!![]) {
    try {
      const _0x3c56a6 =
        (parseInt(_0x4e7c23(0x268)) / 0x1) *
          (-parseInt(_0x4e7c23(0x40d)) / 0x2) +
        (-parseInt(_0x4e7c23(0x20a)) / 0x3) *
          (-parseInt(_0x4e7c23(0x31d)) / 0x4) +
        (parseInt(_0x4e7c23(0x3aa)) / 0x5) *
          (parseInt(_0x4e7c23(0x25e)) / 0x6) +
        (parseInt(_0x4e7c23(0x389)) / 0x7) *
          (-parseInt(_0x4e7c23(0x3a2)) / 0x8) +
        (-parseInt(_0x4e7c23(0x2a5)) / 0x9) *
          (parseInt(_0x4e7c23(0x3d7)) / 0xa) +
        (-parseInt(_0x4e7c23(0x215)) / 0xb) *
          (-parseInt(_0x4e7c23(0x445)) / 0xc) +
        parseInt(_0x4e7c23(0x3e4)) / 0xd;
      if (_0x3c56a6 === _0x474943) break;
      else _0x19248d["push"](_0x19248d["shift"]());
    } catch (_0x2ac110) {
      _0x19248d["push"](_0x19248d["shift"]());
    }
  }
})(_0x34b4, 0x751b0);
/**
 * @type {LogManagerExportConcept}
 */
const ManoUZ_MessageLog = (function () {
  "use strict";
  const _0x285c62 = _0x2a75;
  const _0x4a27d6 = 0x1348b28;
  class _0x5884e6 {
    [_0x285c62(0x2cf)]() {
      return "";
    }
    ["numItemLines"]() {
      return 0x1;
    }
    ["voiceParam"]() {
      return null;
    }
    ["needsVoiceIconRender"]() {
      const _0x238d2a = _0x285c62;
      return !!this[_0x238d2a(0x356)]();
    }
    ["needsDrawBackground"]() {
      return !![];
    }
    [_0x285c62(0x20f)]() {
      return null;
    }
    ["faceIndex"]() {
      return 0x0;
    }
    [_0x285c62(0x34a)]() {
      return !![];
    }
    ["isIconLeft"]() {
      return ![];
    }
    ["lineIndex"]() {
      return 0x0;
    }
  }
  class _0x408e3c extends _0x5884e6 {
    constructor(_0x54728b) {
      super(), (this["_item"] = _0x54728b);
    }
    [_0x285c62(0x34a)]() {
      return ![];
    }
    ["item"]() {
      return null;
    }
    [_0x285c62(0x228)]() {
      return ![];
    }
    ["numItemLines"]() {
      const _0x4d2a82 = _0x285c62;
      return this[_0x4d2a82(0x432)][_0x4d2a82(0x21a)]();
    }
    ["voiceParam"]() {
      const _0x5c40c5 = _0x285c62;
      return this[_0x5c40c5(0x432)][_0x5c40c5(0x356)]();
    }
    [_0x285c62(0x3ec)]() {
      const _0x3a76ac = _0x285c62;
      return this[_0x3a76ac(0x34a)]() && this[_0x3a76ac(0x432)]["hasVoice"]();
    }
    ["needsDrawItem"]() {
      return ![];
    }
    [_0x285c62(0x20f)]() {
      const _0x259383 = _0x285c62;
      return this[_0x259383(0x432)][_0x259383(0x20f)]();
    }
    [_0x285c62(0x31b)]() {
      const _0x150759 = _0x285c62;
      return this[_0x150759(0x432)][_0x150759(0x31b)]();
    }
    [_0x285c62(0x2d5)]() {
      return ![];
    }
    [_0x285c62(0x245)]() {
      return ![];
    }
  }
  class _0x18e2c7 extends _0x5884e6 {
    constructor(_0x954ec6) {
      super(), (this["_choice"] = _0x954ec6);
    }
    [_0x285c62(0x2cf)]() {
      const _0x46a616 = _0x285c62;
      return this[_0x46a616(0x29d)][_0x46a616(0x2cf)]();
    }
    [_0x285c62(0x245)]() {
      return !![];
    }
  }
  class _0x35851c extends _0x408e3c {
    constructor(_0x40384b) {
      super(_0x40384b);
    }
    [_0x285c62(0x2d5)]() {
      return !![];
    }
    [_0x285c62(0x34a)]() {
      return !![];
    }
    [_0x285c62(0x2cf)]() {
      return this["_item"]["speakerName"]();
    }
    ["lineIndex"]() {
      return 0x0;
    }
    [_0x285c62(0x245)]() {
      return !![];
    }
  }
  class _0x24e642 extends _0x408e3c {
    constructor(_0xd90535, _0x3b9ea5) {
      super(_0xd90535), (this["_lineIndex"] = _0x3b9ea5);
    }
    [_0x285c62(0x435)]() {
      return this["_lineIndex"];
    }
    [_0x285c62(0x2d5)]() {
      return ![];
    }
    [_0x285c62(0x34a)]() {
      const _0x58f857 = _0x285c62;
      return !this[_0x58f857(0x432)][_0x58f857(0x44f)]();
    }
    [_0x285c62(0x2cf)]() {
      const _0x2763de = _0x285c62;
      return this["_item"][_0x2763de(0x2cf)]();
    }
    ["needsDrawItem"]() {
      return !![];
    }
    [_0x285c62(0x245)]() {
      const _0x2712bd = _0x285c62;
      return this[_0x2712bd(0x34a)]();
    }
  }
  class _0xbe7ca8 extends _0x408e3c {
    constructor(_0x1fc26d, _0x363cb1) {
      const _0x27626d = _0x285c62;
      super(_0x1fc26d), (this[_0x27626d(0x206)] = _0x363cb1);
    }
    [_0x285c62(0x2cf)]() {
      return "";
    }
    [_0x285c62(0x34a)]() {
      return ![];
    }
    [_0x285c62(0x435)]() {
      return this["_lineIndex"];
    }
    [_0x285c62(0x245)]() {
      return ![];
    }
  }
  class _0x50cfcd {
    ["onSaveLoaded"]() {}
    [_0x285c62(0x24b)]() {
      return [];
    }
    ["voiceParam"]() {
      return null;
    }
    ["hasVoice"]() {
      return !!this["voiceParam"]();
    }
    [_0x285c62(0x425)]() {}
    ["titleText"]() {
      return null;
    }
  }
  class _0x55b263 extends _0x50cfcd {
    constructor() {
      const _0x3d2646 = _0x285c62;
      super(),
        (this[_0x3d2646(0x358)] = ""),
        (this[_0x3d2646(0x247)] = 0x0),
        (this[_0x3d2646(0x336)] = null),
        (this[_0x3d2646(0x33e)] = null),
        (this[_0x3d2646(0x413)] = 0x0);
    }
    ["startMessage"](_0x3acd38, _0x11b0b9, _0x5f1262) {
      const _0x4ece72 = _0x285c62;
      (this[_0x4ece72(0x247)] = _0x5f1262),
        (this[_0x4ece72(0x336)] = _0x11b0b9),
        (this[_0x4ece72(0x358)] = ""),
        (this[_0x4ece72(0x2e2)] = _0x3acd38);
    }
    [_0x285c62(0x2c6)]() {
      const _0x512278 = _0x285c62;
      if (!this["_text"]) return null;
      const _0x464d28 =
        this[_0x512278(0x358)][_0x512278(0x369)](/([^\r\n]\s*\S.*)/);
      if (_0x464d28) return _0x464d28[0x0];
      return null;
    }
    ["write"](_0x4b2c5d, _0x11d495, _0x58bb4c, _0x2d07b6, _0x2f8d67) {
      const _0x263d68 = _0x285c62;
      (this[_0x263d68(0x2e2)] = _0x4b2c5d),
        (this[_0x263d68(0x358)] = _0x11d495),
        (this[_0x263d68(0x336)] = _0x58bb4c),
        (this[_0x263d68(0x247)] = _0x2d07b6),
        (this[_0x263d68(0x33e)] = _0x2f8d67);
    }
    [_0x285c62(0x403)](_0x43c18b) {
      const _0x4a6b33 = _0x285c62;
      this[_0x4a6b33(0x413)] += _0x43c18b;
    }
    [_0x285c62(0x2cf)]() {
      const _0x4af850 = _0x285c62;
      return this[_0x4af850(0x358)];
    }
    [_0x285c62(0x221)]() {
      return this["_numLines"];
    }
    [_0x285c62(0x21a)]() {
      const _0x4e1d29 = _0x285c62,
        _0x1102da = this[_0x4e1d29(0x228)]() ? 0x1 : 0x0,
        _0x45b915 = !!this[_0x4e1d29(0x20f)]() ? 0x4 : 0x0;
      return Math[_0x4e1d29(0x2d2)](
        _0x45b915,
        _0x1102da + this[_0x4e1d29(0x221)]()
      );
    }
    [_0x285c62(0x20f)]() {
      return this["_facename"];
    }
    [_0x285c62(0x31b)]() {
      const _0x2fa9e7 = _0x285c62;
      return this[_0x2fa9e7(0x247)];
    }
    [_0x285c62(0x228)]() {
      const _0x37b0da = _0x285c62;
      return !!this[_0x37b0da(0x2e2)];
    }
    [_0x285c62(0x44f)]() {
      const _0x13c861 = _0x285c62;
      return this[_0x13c861(0x2e2)];
    }
    [_0x285c62(0x356)]() {
      return this["_se"];
    }
    [_0x285c62(0x3ec)]() {
      const _0x2a8e52 = _0x285c62;
      return !!this[_0x2a8e52(0x33e)];
    }
    [_0x285c62(0x24b)]() {
      const _0x154a3d = _0x285c62,
        _0x5657eb = this[_0x154a3d(0x228)](),
        _0x5a9e58 = _0x5657eb ? 0x1 : 0x0,
        _0x2d1bf7 = new _0x24e642(this, _0x5a9e58),
        _0x54b66d = [_0x2d1bf7];
      if (_0x5657eb) {
        const _0x1b51dc = new _0x35851c(this);
        _0x54b66d["unshift"](_0x1b51dc);
      }
      const _0xdc7e22 = this[_0x154a3d(0x21a)]();
      for (
        let _0x89b82c = _0x5a9e58 + 0x1;
        _0x89b82c < _0xdc7e22;
        ++_0x89b82c
      ) {
        const _0x57a328 = new _0xbe7ca8(this, _0x89b82c);
        _0x54b66d[_0x154a3d(0x314)](_0x57a328);
      }
      return _0x54b66d;
    }
  }
  class _0x31d482 {
    constructor(_0x50cbda) {
      const _0x279da2 = _0x285c62;
      (this[_0x279da2(0x36a)] = _0x50cbda),
        (this[_0x279da2(0x218)] = []),
        (this["_logList"] = new _0x3769ee()),
        (this[_0x279da2(0x24d)] = 0x0),
        this[_0x279da2(0x450)]();
    }
    ["checkLogSize"](_0x4a5586, _0x3162a9) {
      const _0x247b02 = _0x285c62,
        _0x536fa3 = Math["max"](_0x4a5586, _0x3162a9);
      if (this[_0x247b02(0x218)][_0x247b02(0x282)] > _0x536fa3) {
        const _0x5e7886 = Math["abs"](_0x3162a9 - _0x4a5586),
          _0x5eba1f = this[_0x247b02(0x218)][_0x247b02(0x27c)](_0x5e7886);
        this[_0x247b02(0x218)] = _0x5eba1f;
      }
    }
    [_0x285c62(0x28d)](_0x1ef9e9) {
      const _0x167707 = _0x285c62;
      this[_0x167707(0x2f2)] && this["_logList"]["add"](_0x1ef9e9);
    }
    [_0x285c62(0x346)]() {
      const _0xfa013 = _0x285c62;
      return this[_0xfa013(0x36a)];
    }
    [_0x285c62(0x2bc)]() {
      const _0x363d11 = _0x285c62;
      return this[_0x363d11(0x211)];
    }
    ["setLastCodeIndex"](_0x377b64) {
      const _0x3b5aa2 = _0x285c62;
      this[_0x3b5aa2(0x211)] = _0x377b64;
    }
    [_0x285c62(0x450)]() {
      const _0x42fda5 = _0x285c62;
      this[_0x42fda5(0x2ab)](NaN);
    }
    ["createMachinakaList"]() {
      const _0xf7189c = _0x285c62,
        _0x162370 = this[_0xf7189c(0x218)]["filter"]((_0x5a0970) => {
          const _0x30a507 = _0xf7189c;
          if (this["_logList"])
            return !this[_0x30a507(0x2f2)]["isLocationMatch"](
              _0x5a0970["mapId"](),
              _0x5a0970[_0x30a507(0x1fd)]()
            );
          return !![];
        });
      return (
        this[_0xf7189c(0x2f2)] &&
          !this[_0xf7189c(0x2f2)][_0xf7189c(0x32f)]() &&
          _0x162370[_0xf7189c(0x314)](this["_logList"]),
        _0x162370
      );
    }
    [_0x285c62(0x2e7)]() {
      const _0x5bc2aa = _0x285c62;
      if (!this["_logList"] || this[_0x5bc2aa(0x2f2)][_0x5bc2aa(0x32f)]())
        return;
      const _0x48ef8c = this["_machinakaList"]["findIndex"]((_0x423e30) => {
        const _0x5e0b6c = _0x5bc2aa;
        return this[_0x5e0b6c(0x2f2)][_0x5e0b6c(0x3bf)](_0x423e30);
      });
      _0x48ef8c >= 0x0
        ? (this["_machinakaList"][_0x48ef8c] = this[_0x5bc2aa(0x2f2)])
        : this[_0x5bc2aa(0x218)][_0x5bc2aa(0x314)](this["_logList"]),
        (this["_logList"] = null);
    }
    [_0x285c62(0x2fc)](_0x5f3dfe, _0x408dbe) {
      const _0x4b3a1a = _0x285c62,
        _0x358ba7 = new _0x3769ee();
      _0x358ba7[_0x4b3a1a(0x2a8)](_0x5f3dfe, _0x408dbe),
        (this[_0x4b3a1a(0x2f2)] = _0x358ba7);
    }
    ["createProxy"]() {
      const _0x529811 = _0x285c62;
      if (this[_0x529811(0x2f2)])
        return this[_0x529811(0x2f2)][_0x529811(0x24b)]();
      return [];
    }
    [_0x285c62(0x31a)]() {
      const _0x321b36 = _0x285c62;
      if (this[_0x321b36(0x2f2)]) {
        const _0x3ac199 = this[_0x321b36(0x2f2)][_0x321b36(0x2eb)]();
        if (_0x3ac199) return _0x3ac199[_0x321b36(0x356)]();
      }
      return null;
    }
    ["calcSize"]() {}
    [_0x285c62(0x41b)]() {}
    [_0x285c62(0x2e6)]() {
      const _0x2a9702 = _0x285c62,
        _0x5999c3 = new _0x31d482(this[_0x2a9702(0x36a)]);
      return (_0x5999c3[_0x2a9702(0x218)] = []), _0x5999c3;
    }
    [_0x285c62(0x253)]() {
      return 0x0;
    }
  }
  class _0x52a5b6 extends _0x50cfcd {
    constructor(_0x4b2be4, _0x3f8aee) {
      const _0x284d8d = _0x285c62;
      super(),
        (this[_0x284d8d(0x358)] = _0x4b2be4),
        (this[_0x284d8d(0x43f)] = _0x3f8aee);
    }
    [_0x285c62(0x24b)]() {
      return [new _0x18e2c7(this)];
    }
    [_0x285c62(0x2cf)]() {
      const _0x3aac93 = _0x285c62;
      return this[_0x3aac93(0x358)];
    }
    [_0x285c62(0x2c6)]() {
      return this["_text"];
    }
  }
  class _0x73368a {
    [_0x285c62(0x37c)]() {
      return [];
    }
    ["lastItemIndex"]() {
      const _0x3d3dc8 = _0x285c62;
      return this[_0x3d3dc8(0x253)]() - 0x1;
    }
    [_0x285c62(0x3d6)]() {
      return NaN;
    }
    [_0x285c62(0x1fd)]() {
      return NaN;
    }
    [_0x285c62(0x253)]() {
      const _0x41bdbe = _0x285c62;
      return this[_0x41bdbe(0x37c)]()[_0x41bdbe(0x282)];
    }
    [_0x285c62(0x3bd)](_0xa29648, _0x23d089) {
      const _0x2005cf = _0x285c62;
      return (
        this[_0x2005cf(0x3d6)]() === _0xa29648 &&
        this[_0x2005cf(0x1fd)]() === _0x23d089
      );
    }
    [_0x285c62(0x3bf)](_0xa8dcb8) {
      const _0x123d42 = _0x285c62,
        _0x47b50c = this["mapId"](),
        _0x1b24b8 = this[_0x123d42(0x1fd)]();
      if (isNaN(_0x47b50c) || isNaN(_0x1b24b8)) return ![];
      return (
        this["mapId"]() === _0xa8dcb8[_0x123d42(0x3d6)]() &&
        this[_0x123d42(0x1fd)]() === _0xa8dcb8[_0x123d42(0x1fd)]()
      );
    }
    ["createProxy"]() {
      const _0x199cb6 = _0x285c62,
        _0x3735ed = [],
        _0x3e9b76 = this[_0x199cb6(0x37c)]();
      for (const _0x5f1aa6 of _0x3e9b76) {
        const _0x4be1c6 = _0x5f1aa6[_0x199cb6(0x24b)]();
        _0x3735ed[_0x199cb6(0x314)](..._0x4be1c6);
      }
      return _0x3735ed;
    }
  }
  class _0x3769ee extends _0x73368a {
    constructor() {
      super(), this["clear"]();
    }
    [_0x285c62(0x37c)]() {
      return this["_list"];
    }
    [_0x285c62(0x400)]() {
      const _0x388f00 = _0x285c62;
      (this[_0x388f00(0x1fc)] = []),
        this["setTitle"](""),
        this["setLocation"](NaN, NaN);
    }
    [_0x285c62(0x234)]() {
      const _0x5ea9c2 = _0x285c62;
      if (this[_0x5ea9c2(0x421)]) return this[_0x5ea9c2(0x421)];
      for (const _0x56029d of this["_list"]) {
        const _0x2c69b3 = _0x56029d[_0x5ea9c2(0x2c6)]();
        if (_0x2c69b3) return _0x2c69b3;
      }
      return _0x5ea9c2(0x2f4);
    }
    [_0x285c62(0x3b4)](_0x44d6ff) {
      this["_title"] = _0x44d6ff;
    }
    [_0x285c62(0x2a8)](_0x2a89f1, _0x232f92) {
      const _0x95ebd9 = _0x285c62;
      (this[_0x95ebd9(0x37a)] = _0x2a89f1), (this["_eventId"] = _0x232f92);
    }
    [_0x285c62(0x3d6)]() {
      return this["_mapId"];
    }
    [_0x285c62(0x1fd)]() {
      const _0x54b793 = _0x285c62;
      return this[_0x54b793(0x23d)];
    }
    [_0x285c62(0x32f)]() {
      const _0x3b23a8 = _0x285c62;
      return this[_0x3b23a8(0x1fc)]["length"] <= 0x0;
    }
    [_0x285c62(0x401)]() {}
    ["createMinimize"]() {
      const _0x2dcdd0 = _0x285c62,
        _0x5e84e0 = this[_0x2dcdd0(0x2eb)](),
        _0x3cc64c = new _0x3769ee();
      return _0x3cc64c["add"](_0x5e84e0), _0x3cc64c;
    }
    [_0x285c62(0x2eb)]() {
      const _0x50de1c = _0x285c62;
      const _0x22aedd = this["lastItemIndex"](),
        _0xe6fe17 = this[_0x50de1c(0x1fc)][_0x22aedd];
      return _0xe6fe17 ? _0xe6fe17 : null;
    }
    ["add"](_0x551515) {
      const _0x4c5f3d = _0x285c62;
      this[_0x4c5f3d(0x1fc)][_0x4c5f3d(0x314)](_0x551515);
    }
  }
  class _0x32232e {
    ["isValid"]() {
      return ![];
    }
    ["playClickSound"]() {}
    ["x"]() {
      return 0x0;
    }
    ["y"]() {
      return 0x0;
    }
    [_0x285c62(0x20b)]() {
      return 0x0;
    }
    [_0x285c62(0x39c)]() {
      return 0x0;
    }
    [_0x285c62(0x21c)]() {
      return 0x0;
    }
    [_0x285c62(0x351)]() {
      return null;
    }
    ["coldFrame"]() {
      return null;
    }
    [_0x285c62(0x3ce)]() {
      return null;
    }
  }
  class _0x2b8168 {
    [_0x285c62(0x3b7)]() {
      return null;
    }
    ["isEnabled"]() {
      return ![];
    }
    [_0x285c62(0x2c1)]() {}
  }
  class _0x1c93ed {
    constructor(_0x221d3e) {
      const _0x410e29 = _0x285c62;
      (this[_0x410e29(0x3b8)] = _0x221d3e), this["setPlayVoiceFunction"](null);
    }
    [_0x285c62(0x313)]() {
      const _0x584288 = _0x285c62;
      return this[_0x584288(0x3b8)][_0x584288(0x386)]();
    }
    [_0x285c62(0x1fe)](_0x299c61) {
      this["_channelFunc"] = _0x299c61;
    }
    ["playVoice"](_0x10206e, _0xcfcd35) {
      const _0x22584d = _0x285c62;
      this["_channelFunc"] && !!_0xcfcd35
        ? this[_0x22584d(0x3df)](_0x10206e, _0xcfcd35)
        : AudioManager[_0x22584d(0x3bc)](_0x10206e);
    }
    ["voiceIconIndex"]() {
      const _0x3bff40 = _0x285c62;
      return this[_0x3bff40(0x3b8)]["getLogItemStyle"]()[_0x3bff40(0x3cd)];
    }
    ["createChoiceItemText"](_0x1e8bc6) {
      const _0x1d6a3b = _0x285c62;
      return this[_0x1d6a3b(0x3b8)][_0x1d6a3b(0x1f3)](_0x1e8bc6);
    }
    ["setLastVoiceParam"](_0x2beb1c, _0x2567e0) {
      const _0x47983e = _0x285c62;
      this[_0x47983e(0x3b8)][_0x47983e(0x428)](_0x2beb1c, _0x2567e0);
    }
    [_0x285c62(0x3e6)](_0x1739b4) {
      const _0x1cadc0 = _0x285c62;
      this[_0x1cadc0(0x3b8)]["setOptionValue"](_0x1739b4);
    }
    ["cloneOptionValue"]() {
      const _0x138cc6 = _0x285c62;
      return this["_logManager"][_0x138cc6(0x43c)]();
    }
  }
  class _0x1e2249 extends Sprite_Clickable {
    constructor(_0x1fc21e) {
      const _0x2a62ef = _0x285c62;
      super();
      const _0x474a62 = _0x1fc21e[_0x2a62ef(0x3b7)]();
      (this["_behavior"] = _0x1fc21e),
        (this["bitmap"] = _0x474a62[_0x2a62ef(0x3ce)]());
      const _0x584648 = _0x474a62["hotFrame"]();
      this["setHotFrame"](
        _0x584648["x"],
        _0x584648["y"],
        _0x584648[_0x2a62ef(0x20b)],
        _0x584648["height"]
      );
      const _0x331379 = _0x474a62[_0x2a62ef(0x239)]();
      this[_0x2a62ef(0x208)](
        _0x331379["x"],
        _0x331379["y"],
        _0x331379["width"],
        _0x331379[_0x2a62ef(0x39c)]
      ),
        this[_0x2a62ef(0x3fc)](),
        (this["x"] = _0x474a62["x"]()),
        (this["y"] = _0x474a62["y"]()),
        (this[_0x2a62ef(0x349)] = ![]),
        (this["_hovered"] = ![]);
    }
    [_0x285c62(0x339)](_0x45a6ca) {}
    get [_0x285c62(0x39c)]() {
      const _0x24368b = _0x285c62;
      return Math["max"](
        this[_0x24368b(0x281)][_0x24368b(0x39c)],
        this[_0x24368b(0x3bb)]["height"]
      );
    }
    get ["width"]() {
      const _0x35fc6f = _0x285c62;
      return Math[_0x35fc6f(0x2d2)](
        this[_0x35fc6f(0x281)][_0x35fc6f(0x20b)],
        this[_0x35fc6f(0x3bb)][_0x35fc6f(0x20b)]
      );
    }
    [_0x285c62(0x227)]() {
      const _0x6c1cd3 = _0x285c62;
      super[_0x6c1cd3(0x227)](),
        this[_0x6c1cd3(0x26a)](),
        this[_0x6c1cd3(0x3fc)]();
    }
    ["setHotFrame"](_0xd1569e, _0x5afaad, _0x53367f, _0x2d5239) {
      const _0x3eec31 = _0x285c62;
      this[_0x3eec31(0x281)] = new Rectangle(
        _0xd1569e,
        _0x5afaad,
        _0x53367f,
        _0x2d5239
      );
    }
    [_0x285c62(0x208)](_0x53d490, _0x57efd2, _0x5ea148, _0x343100) {
      this["_coldFrame"] = new Rectangle(
        _0x53d490,
        _0x57efd2,
        _0x5ea148,
        _0x343100
      );
    }
    [_0x285c62(0x241)]() {
      const _0x202de1 = _0x285c62;
      return this[_0x202de1(0x23f)]();
    }
    [_0x285c62(0x3fc)]() {
      const _0x4f640f = _0x285c62,
        _0xa553d6 = this[_0x4f640f(0x241)]()
          ? this[_0x4f640f(0x281)]
          : this[_0x4f640f(0x3bb)];
      _0xa553d6 &&
        this["setFrame"](
          _0xa553d6["x"],
          _0xa553d6["y"],
          _0xa553d6["width"],
          _0xa553d6[_0x4f640f(0x39c)]
        );
    }
    ["isClickEnabled"]() {
      const _0x10c386 = _0x285c62;
      if (this[_0x10c386(0x1fa)]) {
        if (!this[_0x10c386(0x1fa)][_0x10c386(0x3a0)]) return ![];
      }
      return (
        this[_0x10c386(0x3a0)] && this[_0x10c386(0x3cc)][_0x10c386(0x41d)]()
      );
    }
    [_0x285c62(0x2c1)]() {
      const _0x478cdd = _0x285c62;
      this["isClickEnabled"]() && this[_0x478cdd(0x3cc)]["onClick"]();
    }
    [_0x285c62(0x246)]() {
      const _0x33d60 = _0x285c62;
      this[_0x33d60(0x3a0)] = this[_0x33d60(0x3cc)][_0x33d60(0x41d)]();
    }
  }
  class _0x2e7035 {
    [_0x285c62(0x43d)](_0x114fd6, _0x45ad67) {}
    [_0x285c62(0x330)](_0x393444) {
      return null;
    }
    [_0x285c62(0x411)](_0x2f79a5) {
      return null;
    }
    [_0x285c62(0x320)](_0x321094) {}
    [_0x285c62(0x374)]() {}
    [_0x285c62(0x307)]() {}
  }
  const _0x3bdadf = _0x285c62(0x205);
  function _0xb4fdfc() {
    const _0xf5d53b = _0x285c62,
      _0xf45a37 = decodeURIComponent(
        document[_0xf5d53b(0x2df)][_0xf5d53b(0x231)]
      )[_0xf5d53b(0x369)](/([^/]+)\.js$/);
    if (_0xf45a37) return _0xf45a37[0x1];
    return "";
  }
  function _0x2e9580(_0x9e4e23) {
    const _0x5c4bb1 = _0x285c62,
      _0xdb3ccd = _0xb4fdfc();
    if (_0x9e4e23 === _0xdb3ccd) return;
    const _0x3f0007 =
      _0x5c4bb1(0x2ef) +
      (_0x5c4bb1(0x2c7) + _0xdb3ccd + _0x5c4bb1(0x2a7)) +
      ("Original\x20file\x20name:\x20" + _0x9e4e23 + "<br>") +
      _0x5c4bb1(0x41e) +
      (_0x5c4bb1(0x2cc) + _0xdb3ccd + _0x5c4bb1(0x2a7)) +
      (_0x5c4bb1(0x2b9) + _0x9e4e23);
    throw new Error(_0x3f0007);
  }
  _0x2e9580(_0x3bdadf);
  class _0x5ba378 extends _0x2e7035 {
    ["forceSelect"](_0x51ff74, _0xc2e864) {
      const _0x5df231 = _0x285c62;
      _0x51ff74[_0x5df231(0x43d)](_0xc2e864);
    }
    [_0x285c62(0x330)](_0x97ffd9) {
      return new _0x1e2249(_0x97ffd9);
    }
    [_0x285c62(0x411)](_0x2c52a8) {
      return new _0xb66e50(_0x2c52a8);
    }
    [_0x285c62(0x374)]() {
      const _0x3da8ba = _0x285c62,
        _0x446762 = _0x570b0c[_0x3da8ba(0x33a)]()["quickSaveFileName"](),
        _0x353e0f = DataManager[_0x3da8ba(0x279)]();
      return StorageManager[_0x3da8ba(0x319)](_0x446762, _0x353e0f);
    }
    [_0x285c62(0x307)]() {
      const _0x5b55a1 = _0x285c62,
        _0x3212d3 = _0x570b0c[_0x5b55a1(0x33a)]()[_0x5b55a1(0x371)]();
      return StorageManager[_0x5b55a1(0x44a)](_0x3212d3)["then"](
        (_0x297c9b) => {
          const _0x461a9b = _0x5b55a1;
          return (
            DataManager[_0x461a9b(0x33b)](),
            DataManager[_0x461a9b(0x2aa)](_0x297c9b),
            DataManager[_0x461a9b(0x255)](),
            0x0
          );
        }
      );
    }
  }
  function _0x256328(_0x595192, _0x5b957f, _0x59935e) {
    const _0x5a3b9f = _0x285c62;
    if (Utils["RPGMAKER_NAME"] === "MZ") {
      _0x59935e[_0x5a3b9f(0x2b0)](_0x595192, _0x5b957f);
      return;
    }
    if (Utils[_0x5a3b9f(0x3de)] === "MV") {
      _0x59935e["call"](
        _0x595192,
        _0x5b957f["x"],
        _0x5b957f["y"],
        _0x5b957f["width"],
        _0x5b957f[_0x5a3b9f(0x39c)]
      );
      return;
    }
    throw new Error(_0x5a3b9f(0x240) + Utils["RPGMAKER_NAME"]);
  }
  class _0x162327 {
    constructor(_0x3be74f, _0x3adc84, _0x2d6a8c, _0x5315ff) {
      const _0x22663d = _0x285c62;
      (this[_0x22663d(0x269)] = _0x3be74f),
        (this[_0x22663d(0x44b)] = _0x3adc84),
        (this[_0x22663d(0x2c4)] = _0x2d6a8c),
        (this["_pan"] = _0x5315ff);
    }
    static [_0x285c62(0x214)](_0xf3b26d) {
      const _0x15da63 = _0x285c62;
      if (!_0xf3b26d) return null;
      const _0xf4c1d2 = JSON[_0x15da63(0x449)](_0xf3b26d),
        _0x55e209 = _0xf4c1d2[_0x15da63(0x2a6)],
        _0x51227a = Number(_0xf4c1d2[_0x15da63(0x2d1)]),
        _0x298330 = Number(_0xf4c1d2[_0x15da63(0x201)]),
        _0x3fac6d = Number(_0xf4c1d2[_0x15da63(0x3be)]);
      return new _0x162327(_0x55e209, _0x51227a, _0x298330, _0x3fac6d);
    }
    [_0x285c62(0x42b)]() {
      const _0x5b13c4 = _0x285c62;
      if (this["_name"]) {
        const _0x3bc810 = {
          pos: 0x0,
          name: this[_0x5b13c4(0x269)],
          volume: this["_volume"],
          pitch: this[_0x5b13c4(0x2c4)],
          pan: this[_0x5b13c4(0x296)],
        };
        AudioManager[_0x5b13c4(0x3bc)](_0x3bc810);
      }
    }
  }
  function _0x44b2f1(_0x32d3c0) {
    const _0xe50d03 = _0x285c62,
      _0x114454 = JSON[_0xe50d03(0x449)](_0x32d3c0);
    return new Rectangle(
      Number(_0x114454["x"]),
      Number(_0x114454["y"]),
      Number(_0x114454[_0xe50d03(0x20b)]),
      Number(_0x114454[_0xe50d03(0x39c)])
    );
  }
  class _0x1c4cb8 extends _0x32232e {
    constructor(
      _0x5051ec,
      _0x1a3a23,
      _0x31a6ac,
      _0x2de7b8,
      _0x4f2507,
      _0x130135,
      _0x37ca7b
    ) {
      const _0x3fe115 = _0x285c62;
      super(),
        (this[_0x3fe115(0x269)] = _0x5051ec),
        (this[_0x3fe115(0x281)] = _0x2de7b8),
        (this["_coldFrame"] = _0x4f2507),
        (this["_x"] = _0x1a3a23),
        (this["_y"] = _0x31a6ac),
        (this["_switchId"] = _0x130135),
        (this[_0x3fe115(0x33e)] = _0x37ca7b);
    }
    static [_0x285c62(0x214)](_0x16d906) {
      const _0x5f54de = _0x285c62,
        _0x47ed52 = JSON[_0x5f54de(0x449)](_0x16d906),
        _0x4d5eab = _0x162327[_0x5f54de(0x214)](_0x47ed52[_0x5f54de(0x370)]),
        _0x3b9f5d = _0x44b2f1(_0x47ed52["hot"]),
        _0x5d998f = _0x44b2f1(_0x47ed52[_0x5f54de(0x441)]),
        _0x48257d = Number(_0x47ed52["x"]),
        _0x23a215 = Number(_0x47ed52["y"]),
        _0x536621 = Number(_0x47ed52[_0x5f54de(0x3fb)] || 0x0);
      return new _0x1c4cb8(
        _0x47ed52[_0x5f54de(0x3e8)],
        _0x48257d,
        _0x23a215,
        _0x3b9f5d,
        _0x5d998f,
        _0x536621,
        _0x4d5eab
      );
    }
    [_0x285c62(0x222)]() {
      return !!this["_name"];
    }
    [_0x285c62(0x21c)]() {
      return this["_switchId"];
    }
    [_0x285c62(0x3ce)]() {
      const _0x4f5ac2 = _0x285c62;
      return ImageManager[_0x4f5ac2(0x2f1)](this["_name"]);
    }
    [_0x285c62(0x3e0)]() {
      const _0x2428d1 = _0x285c62;
      this[_0x2428d1(0x33e)] && this[_0x2428d1(0x33e)][_0x2428d1(0x42b)]();
    }
    [_0x285c62(0x239)]() {
      return this["_coldFrame"]["clone"]();
    }
    [_0x285c62(0x351)]() {
      const _0x1ebd56 = _0x285c62;
      return this[_0x1ebd56(0x281)][_0x1ebd56(0x2f8)]();
    }
    ["x"]() {
      return this["_x"];
    }
    ["y"]() {
      return this["_y"];
    }
    ["width"]() {
      const _0x4316a1 = _0x285c62;
      return Math["max"](
        this[_0x4316a1(0x281)][_0x4316a1(0x20b)],
        this[_0x4316a1(0x3bb)][_0x4316a1(0x20b)]
      );
    }
    [_0x285c62(0x39c)]() {
      const _0x6b6df8 = _0x285c62;
      return Math[_0x6b6df8(0x2d2)](
        this["_hotFrame"][_0x6b6df8(0x39c)],
        this[_0x6b6df8(0x3bb)][_0x6b6df8(0x39c)]
      );
    }
  }
  class _0x2a9f79 extends _0x2b8168 {
    constructor(_0x52890d, _0x5cd638) {
      const _0xf597d7 = _0x285c62;
      super(),
        (this[_0xf597d7(0x382)] = _0x52890d),
        (this[_0xf597d7(0x3fe)] = _0x5cd638);
    }
    ["isValid"]() {
      const _0x5b7547 = _0x285c62;
      return (
        this[_0x5b7547(0x382)] && this[_0x5b7547(0x382)][_0x5b7547(0x222)]()
      );
    }
    [_0x285c62(0x3b7)]() {
      const _0x44d31e = _0x285c62;
      return this[_0x44d31e(0x382)];
    }
    ["isEnabled"]() {
      const _0x5c0f89 = _0x285c62,
        _0x20bcb3 = this[_0x5c0f89(0x382)][_0x5c0f89(0x21c)]();
      if (_0x20bcb3) return $gameSwitches[_0x5c0f89(0x412)](_0x20bcb3);
      return !![];
    }
    [_0x285c62(0x40b)]() {
      const _0x485f53 = _0x285c62;
      return this[_0x485f53(0x3fe)];
    }
    [_0x285c62(0x3ff)]() {
      const _0x94ac1a = _0x285c62;
      this[_0x94ac1a(0x3fe)] && this[_0x94ac1a(0x27f)]() && this["onClick"]();
    }
    [_0x285c62(0x27f)]() {
      const _0x48168f = _0x285c62;
      return Input[_0x48168f(0x28f)](this[_0x48168f(0x3fe)]);
    }
    ["callOkHandler"]() {}
    [_0x285c62(0x2c1)]() {
      const _0x51c0a3 = _0x285c62;
      this[_0x51c0a3(0x382)][_0x51c0a3(0x3e0)](), this[_0x51c0a3(0x3e9)]();
    }
    [_0x285c62(0x3b0)]() {
      const _0x388f4b = _0x285c62;
      return this[_0x388f4b(0x310)]()
        [_0x388f4b(0x273)]()
        [_0x388f4b(0x330)](this);
    }
    [_0x285c62(0x310)]() {
      return _0x570b0c;
    }
    [_0x285c62(0x3da)](_0x353721) {
      const _0x28dff2 = _0x285c62;
      this[_0x28dff2(0x310)]()[_0x28dff2(0x3da)](_0x353721);
    }
  }
  class _0x487853 extends _0x2a9f79 {
    [_0x285c62(0x3e9)]() {
      const _0xb0ce0 = _0x285c62;
      this[_0xb0ce0(0x3da)](_0xd6acc9);
    }
    [_0x285c62(0x27f)]() {
      const _0x29697a = _0x285c62;
      return super[_0x29697a(0x27f)]() || TouchInput[_0x29697a(0x21b)] < 0x0;
    }
  }
  class _0x45d1c9 extends _0x2a9f79 {
    [_0x285c62(0x3e9)]() {
      const _0x317b8f = _0x285c62;
      this[_0x317b8f(0x3da)](Scene_Load);
    }
  }
  class _0xab5141 extends _0x2a9f79 {
    [_0x285c62(0x41d)]() {
      const _0x9b260b = _0x285c62;
      return (
        super[_0x9b260b(0x41d)]() &&
        this[_0x9b260b(0x310)]()[_0x9b260b(0x40c)]()
      );
    }
    [_0x285c62(0x3e9)]() {
      const _0x49ef2b = _0x285c62;
      this[_0x49ef2b(0x3da)](Scene_Save);
    }
  }
  class _0x4be04f extends _0x2a9f79 {
    [_0x285c62(0x41d)]() {
      const _0x200203 = _0x285c62;
      return super[_0x200203(0x41d)]() && this[_0x200203(0x310)]()["canSave"]();
    }
    ["callOkHandler"]() {
      const _0x4f6d88 = _0x285c62;
      this[_0x4f6d88(0x310)]()[_0x4f6d88(0x273)]()[_0x4f6d88(0x374)]();
    }
    [_0x285c62(0x438)]() {}
    [_0x285c62(0x30c)]() {}
  }
  class _0xbf6a81 extends _0x2a9f79 {
    ["callOkHandler"]() {
      const _0x1b48da = _0x285c62,
        _0x4b7644 = DataManager[_0x1b48da(0x266)](0x0);
      _0x4b7644 && SceneManager["goto"](Scene_Map);
    }
  }
  class _0x35d70b extends _0x2a9f79 {
    [_0x285c62(0x3b0)]() {
      const _0x45c8a6 = _0x285c62;
      return this[_0x45c8a6(0x310)]()
        [_0x45c8a6(0x273)]()
        ["createOnOffButtonSprite"](this);
    }
    [_0x285c62(0x22e)]() {
      return ![];
    }
  }
  class _0xb66e50 extends _0x1e2249 {
    constructor(_0x442de9) {
      super(_0x442de9), (this["_onOff"] = _0x442de9);
    }
    [_0x285c62(0x2c1)]() {
      const _0x595f0f = _0x285c62;
      super[_0x595f0f(0x2c1)](), this[_0x595f0f(0x3fc)]();
    }
    [_0x285c62(0x241)]() {
      const _0x29e249 = _0x285c62;
      return (
        this[_0x29e249(0x325)] && this[_0x29e249(0x325)][_0x29e249(0x22e)]()
      );
    }
  }
  class _0x76fbf2 extends _0xb66e50 {
    constructor(_0xc1d830) {
      const _0x5b9a84 = _0x285c62;
      super(_0xc1d830), (this[_0x5b9a84(0x2ee)] = null);
    }
    [_0x285c62(0x246)]() {
      const _0x29974d = _0x285c62;
      super[_0x29974d(0x246)](),
        this[_0x29974d(0x3fc)](),
        this[_0x29974d(0x2ee)] && this["_gauge"][_0x29974d(0x407)](0x0);
    }
    [_0x285c62(0x29e)](_0x1a4e47) {
      const _0x2e55d2 = _0x285c62;
      this[_0x2e55d2(0x2ee)] && this["removeChild"](this[_0x2e55d2(0x2ee)]),
        (this[_0x2e55d2(0x2ee)] = _0x1a4e47),
        this[_0x2e55d2(0x316)](_0x1a4e47);
    }
    [_0x285c62(0x227)]() {
      const _0x2ae1f8 = _0x285c62;
      super[_0x2ae1f8(0x227)](),
        this[_0x2ae1f8(0x2ee)] &&
          !this[_0x2ae1f8(0x2ee)]["update"] &&
          this[_0x2ae1f8(0x2ee)][_0x2ae1f8(0x407)](
            _0x570b0c["autoGaugeRate"]()
          );
    }
  }
  class _0x2f09d1 extends _0x35d70b {
    constructor(_0x1300c9, _0x56c3fe, _0x376d75) {
      const _0xc4356e = _0x285c62;
      super(_0x56c3fe, _0x376d75), (this[_0xc4356e(0x2ee)] = _0x1300c9);
    }
    [_0x285c62(0x3e9)]() {
      const _0x5e78a5 = _0x285c62;
      this[_0x5e78a5(0x310)]()[_0x5e78a5(0x2ae)]();
    }
    ["isButtonOn"]() {
      const _0x1d7489 = _0x285c62;
      return this[_0x1d7489(0x310)]()["isTextAutoMode"]();
    }
    [_0x285c62(0x3b0)]() {
      const _0x3ae416 = _0x285c62,
        _0x3052f9 = new _0x76fbf2(this);
      if (this["_gauge"] && this[_0x3ae416(0x2ee)][_0x3ae416(0x327)]()) {
        const _0x16b18c = this[_0x3ae416(0x2ee)]["createSprite"](
          this["_layout"][_0x3ae416(0x20b)]() / 0x2
        );
        _0x16b18c && _0x3052f9[_0x3ae416(0x29e)](_0x16b18c);
      }
      return _0x3052f9;
    }
  }
  class _0x13e1e0 extends _0x35d70b {
    constructor(_0xf39676, _0x4a65e4, _0x388454) {
      const _0x3d8bdb = _0x285c62;
      super(_0x4a65e4, _0x388454), (this[_0x3d8bdb(0x3f6)] = _0xf39676);
    }
    ["isButtonOn"]() {
      const _0x205f98 = _0x285c62;
      return $gameSwitches[_0x205f98(0x412)](this[_0x205f98(0x3f6)]);
    }
    [_0x285c62(0x3e9)]() {
      const _0x5f0e8f = _0x285c62,
        _0x5c7017 = $gameSwitches[_0x5f0e8f(0x412)](this[_0x5f0e8f(0x3f6)]);
      $gameSwitches["setValue"](this[_0x5f0e8f(0x3f6)], !_0x5c7017);
    }
    [_0x285c62(0x3ff)]() {
      const _0xd8a3a = _0x285c62;
      super[_0xd8a3a(0x3ff)]();
    }
  }
  function _0x4148f4(_0x303a85) {
    const _0x2632ed = _0x285c62,
      _0x4ede11 = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/[_0x2632ed(0x200)](
        _0x303a85
      );
    if (_0x4ede11) {
      const _0x4fe5ca = Number("0x" + _0x303a85);
      if (!isNaN(_0x4fe5ca)) return _0x4fe5ca;
    }
    return 0x0;
  }
  function _0x339702() {}
  class _0x2ebb2b {
    constructor(
      _0x1356bf,
      _0x401c1c,
      _0x4f4e31,
      _0x1203cf,
      _0x5c985a,
      _0x13e0b7
    ) {
      const _0x209784 = _0x285c62;
      (this[_0x209784(0x2f3)] = _0x4f4e31),
        (this[_0x209784(0x252)] = _0x1203cf),
        (this[_0x209784(0x40a)] = _0x13e0b7),
        (this[_0x209784(0x414)] = _0x5c985a),
        (this["_x"] = _0x1356bf),
        (this["_y"] = _0x401c1c);
    }
    static ["create"](_0x5a6ebb) {
      const _0x203765 = _0x285c62,
        _0x28266b = JSON[_0x203765(0x449)](_0x5a6ebb),
        _0x78b5da = Number(_0x28266b["x"] || 0x0),
        _0xc92c9d = Number(_0x28266b["y"] || 0x0),
        _0x398602 = String(_0x28266b[_0x203765(0x451)]),
        _0x1b4f93 = Number(_0x28266b[_0x203765(0x20b)]),
        _0x291b87 = _0x4148f4(_0x28266b["color"]),
        _0x14a7d1 = String(_0x28266b["texture"] || "");
      return new _0x2ebb2b(
        _0x78b5da,
        _0xc92c9d,
        _0x1b4f93,
        _0x14a7d1,
        _0x291b87,
        _0x398602
      );
    }
    [_0x285c62(0x327)]() {
      const _0x7dda22 = _0x285c62;
      return this[_0x7dda22(0x40a)];
    }
    [_0x285c62(0x224)]() {
      const _0x3133d6 = _0x285c62;
      return ImageManager[_0x3133d6(0x2f1)](this["_textuerName"]);
    }
    ["width"]() {
      const _0x524259 = _0x285c62;
      return this[_0x524259(0x2f3)];
    }
    ["color"]() {
      const _0x50d654 = _0x285c62;
      return _0x570b0c["option"]()[_0x50d654(0x30a)]();
    }
    [_0x285c62(0x2ba)]() {
      const _0x24a99b = _0x285c62;
      if (this["_type"] === _0x24a99b(0x31c)) return null;
    }
    [_0x285c62(0x3b0)](_0x9d3240) {
      const _0x4a4b6f = _0x285c62;
      if (this["_type"] === _0x4a4b6f(0x31c)) return null;
      const _0x5b070e = new _0x37d09c(_0x9d3240);
      (_0x5b070e["x"] = this["_x"]), (_0x5b070e["y"] = this["_y"]);
      if (this["_textuerName"]) {
        const _0x1ddd60 = this[_0x4a4b6f(0x224)]();
        _0x5b070e[_0x4a4b6f(0x260)](
          _0x1ddd60,
          this[_0x4a4b6f(0x2f3)],
          this[_0x4a4b6f(0x2ac)]()
        );
      } else _0x5b070e[_0x4a4b6f(0x2fe)](this["_width"], this["color"]());
      return _0x5b070e;
    }
  }
  class _0x1dfe97 extends _0x2a9f79 {
    ["callOkHandler"]() {
      const _0x362f8e = _0x285c62;
      this[_0x362f8e(0x310)]()["repeatLastVoice"]();
    }
    [_0x285c62(0x41d)]() {
      const _0x1e0549 = _0x285c62;
      return this[_0x1e0549(0x310)]()[_0x1e0549(0x3f4)]();
    }
    [_0x285c62(0x27f)]() {
      const _0xa768a8 = _0x285c62,
        _0x128bd9 = this["symbol"]();
      return _0x128bd9 && Input[_0xa768a8(0x27f)](_0x128bd9);
    }
  }
  class _0x5742d3 extends _0x2a9f79 {
    ["callOkHandler"]() {
      const _0x3a6ae0 = _0x285c62;
      this[_0x3a6ae0(0x310)]()[_0x3a6ae0(0x3d9)]();
    }
  }
  class _0x4ac46e {
    constructor(
      _0x27d87e,
      _0xd74423,
      _0x28da06,
      _0x5f5270,
      _0x15452c,
      _0x32a8bd
    ) {
      const _0x27e91e = _0x285c62;
      (this[_0x27e91e(0x1fc)] = _0x27d87e),
        (this[_0x27e91e(0x333)] = _0xd74423),
        (this[_0x27e91e(0x2b3)] = _0x28da06),
        (this[_0x27e91e(0x256)] = _0x5f5270),
        (this[_0x27e91e(0x1f5)] = _0x32a8bd),
        (this[_0x27e91e(0x39e)] = _0x15452c);
    }
    static [_0x285c62(0x214)](_0x2bc290, _0x1ad8a2) {
      const _0x24b27d = _0x285c62;
      if (_0x2bc290) {
        const _0x490f32 = JSON[_0x24b27d(0x449)](_0x2bc290),
          _0x5b6a7d = Number(_0x490f32[_0x24b27d(0x306)]),
          _0x1db6b6 = Number(_0x490f32[_0x24b27d(0x2b1)]),
          _0x5a7fbc = _0x490f32["windowOverlap"],
          _0x379916 = Number(_0x490f32[_0x24b27d(0x318)]),
          _0xdf3d13 = Number(_0x490f32[_0x24b27d(0x429)] || 0x0);
        return new _0x4ac46e(
          _0x1ad8a2,
          _0x5b6a7d,
          _0x1db6b6,
          _0x5a7fbc,
          _0xdf3d13,
          _0x379916
        );
      }
      return new _0x4ac46e(_0x1ad8a2, 0x0, 0x0, _0x24b27d(0x33d), 0x0, 0x0);
    }
    ["isButtonDisabled"]() {
      const _0x44e2b6 = _0x285c62;
      return $gameSwitches[_0x44e2b6(0x412)](this["_disableSwitch"]);
    }
    [_0x285c62(0x3e5)]() {
      const _0x18f633 = _0x285c62;
      return this[_0x18f633(0x1fc)][_0x18f633(0x32d)]((_0xe110f0) => {
        const _0x30b564 = _0x18f633;
        return _0xe110f0[_0x30b564(0x3b0)]();
      });
    }
    [_0x285c62(0x297)]() {
      const _0x12e944 = _0x285c62;
      for (const _0x12b38c of this[_0x12e944(0x1fc)]) {
        $gameSwitches[_0x12e944(0x407)](
          _0x12b38c[_0x12e944(0x3b7)]()[_0x12e944(0x21c)](),
          !![]
        );
      }
    }
    [_0x285c62(0x3ff)]() {
      const _0x1c9c1f = _0x285c62;
      for (const _0x539626 of this[_0x1c9c1f(0x1fc)]) {
        if (SceneManager[_0x1c9c1f(0x33f)]()) return;
        _0x539626[_0x1c9c1f(0x3ff)]();
      }
    }
    ["offsetX"]() {
      const _0x355b1c = _0x285c62;
      return this[_0x355b1c(0x333)];
    }
    [_0x285c62(0x2b1)]() {
      const _0x5f5df0 = _0x285c62;
      return this[_0x5f5df0(0x2b3)];
    }
    [_0x285c62(0x440)]() {
      const _0x40850d = _0x285c62;
      return this[_0x40850d(0x256)] === "inside";
    }
    [_0x285c62(0x23a)]() {
      const _0x29fb34 = _0x285c62;
      return this[_0x29fb34(0x256)] === "absolute";
    }
    [_0x285c62(0x398)]() {
      return new _0x355362(this);
    }
  }
  class _0x1fdb3f {
    constructor(_0x3616f9, _0x253a20) {
      const _0x3a2190 = _0x285c62;
      (this[_0x3a2190(0x26e)] = new RegExp("^" + _0x3616f9 + ".+")),
        (this[_0x3a2190(0x2b7)] = new Set(_0x253a20));
    }
    static ["create"](_0x5b074e) {
      const _0x15c64a = _0x285c62,
        _0x3cdfe1 = JSON[_0x15c64a(0x449)](_0x5b074e),
        _0x5f4322 = _0x3cdfe1[_0x15c64a(0x3dd)],
        _0x2c6030 = JSON[_0x15c64a(0x449)](_0x3cdfe1["files"]);
      return new _0x1fdb3f(_0x5f4322, _0x2c6030);
    }
    [_0x285c62(0x2fb)](_0xee373e) {
      const _0x1e8746 = _0x285c62;
      if (this["_voiceReg"][_0x1e8746(0x348)](_0xee373e)) return !![];
      return this[_0x1e8746(0x2b7)][_0x1e8746(0x2c3)](_0xee373e);
    }
  }
  class _0x5132ec {
    constructor(_0x22e99e) {
      const _0x4fdf93 = _0x285c62;
      (this["_list"] = _0x22e99e),
        (this["_title"] = _0x22e99e["createTitle"]()),
        (this[_0x4fdf93(0x424)] = null);
    }
    [_0x285c62(0x264)]() {
      const _0x1e3ecd = _0x285c62;
      !this["_cache"] &&
        (this[_0x1e3ecd(0x424)] = this[_0x1e3ecd(0x1fc)][_0x1e3ecd(0x24b)]());
    }
    [_0x285c62(0x30f)]() {
      const _0x14d62f = _0x285c62;
      return this[_0x14d62f(0x421)];
    }
    ["multiLineItems"]() {
      const _0x13de2d = _0x285c62;
      if (this[_0x13de2d(0x424)]) return this[_0x13de2d(0x424)];
      return [];
    }
    [_0x285c62(0x363)]() {
      const _0x193ec3 = _0x285c62;
      return !this[_0x193ec3(0x1fc)]["isEmpty"]();
    }
  }
  class _0x361391 extends Window_Selectable {
    constructor(_0x13a86b) {
      const _0x5b99b4 = _0x285c62;
      super(_0x13a86b), this[_0x5b99b4(0x2e4)](null), this["setList"]([]);
    }
    [_0x285c62(0x426)](_0x3eea48) {
      const _0x377de7 = _0x285c62;
      (this[_0x377de7(0x1fc)] = _0x3eea48[_0x377de7(0x32d)](
        (_0x488060) => new _0x5132ec(_0x488060)
      )),
        this[_0x377de7(0x20c)]();
    }
    ["maxItems"]() {
      const _0x5d3d7b = _0x285c62;
      return this["_list"][_0x5d3d7b(0x282)];
    }
    [_0x285c62(0x26f)](_0x2d97b2) {
      const _0x28dc3d = _0x285c62,
        _0x406c2c = this[_0x28dc3d(0x280)](_0x2d97b2);
      if (_0x406c2c) {
        const _0x2afdee = this[_0x28dc3d(0x223)](_0x2d97b2);
        this[_0x28dc3d(0x42d)](
          _0x406c2c[_0x28dc3d(0x30f)](),
          _0x2afdee["x"],
          _0x2afdee["y"],
          _0x2afdee[_0x28dc3d(0x20b)]
        );
      }
    }
    [_0x285c62(0x265)]() {
      const _0x21b99f = _0x285c62;
      super[_0x21b99f(0x265)]();
      if (this[_0x21b99f(0x26b)]) {
        const _0x571c62 = this[_0x21b99f(0x2ca)]();
        _0x571c62
          ? (_0x571c62["makeCache"](),
            this["_logListWindow"]["setList"](_0x571c62[_0x21b99f(0x1f7)]()))
          : this[_0x21b99f(0x26b)][_0x21b99f(0x426)]([]);
      }
    }
    [_0x285c62(0x2e4)](_0x4f6a69) {
      const _0x5211f0 = _0x285c62;
      this[_0x5211f0(0x26b)] = _0x4f6a69;
    }
    [_0x285c62(0x280)](_0x36c62f) {
      return this["_list"][_0x36c62f];
    }
    ["currentItem"]() {
      const _0x4f8bee = _0x285c62;
      return this[_0x4f8bee(0x280)](this[_0x4f8bee(0x3c5)]());
    }
    [_0x285c62(0x34d)]() {
      const _0x1d3542 = _0x285c62,
        _0xd92b5b = this[_0x1d3542(0x2ca)]();
      if (_0xd92b5b && _0xd92b5b[_0x1d3542(0x363)]()) return !![];
      return ![];
    }
    ["selectLastItem"]() {
      const _0x5ebf1c = _0x285c62,
        _0x60d1a7 = this[_0x5ebf1c(0x448)]();
      _0x570b0c["getWorkaround"]()[_0x5ebf1c(0x43d)](this, _0x60d1a7 - 0x1);
    }
  }
  class _0x42160e extends Window_Selectable {
    [_0x285c62(0x35b)](_0x55619e) {
      _0x256328(this, _0x55619e, super["initialize"]);
    }
    [_0x285c62(0x229)](_0x43b0ac) {
      return 0x1;
    }
    [_0x285c62(0x36f)](_0x4f7679) {
      return "";
    }
    [_0x285c62(0x3e1)](_0x2be60b) {
      return _0x2be60b;
    }
    ["bottomItemIndex"](_0x3bf4b1) {
      const _0x2146ed = _0x285c62,
        _0x1f16b8 = this["topItemIndex"](_0x3bf4b1),
        _0x152eb3 = this[_0x2146ed(0x229)](_0x3bf4b1);
      return _0x1f16b8 + _0x152eb3 - 0x1;
    }
    [_0x285c62(0x366)]() {
      const _0x3facbb = _0x285c62;
      return (
        "index:" +
        this[_0x3facbb(0x3c5)]() +
        _0x3facbb(0x409) +
        this[_0x3facbb(0x383)]
      );
    }
    [_0x285c62(0x34f)]() {
      const _0x30f300 = _0x285c62;
      this[_0x30f300(0x34e)]["setText"](this[_0x30f300(0x366)]());
    }
    ["baseRect"](_0x4e4cb1) {
      const _0x2eaa39 = _0x285c62;
      return super[_0x2eaa39(0x242)](_0x4e4cb1);
    }
    [_0x285c62(0x20e)]() {
      const _0x4d52e9 = _0x285c62,
        _0x390da1 = Math[_0x4d52e9(0x2d2)](0x0, this["index"]()),
        _0x12b9a4 = this["topItemIndex"](_0x390da1),
        _0xcb8978 = this["maxItems"](),
        _0x5793da = (_0x12b9a4 + _0xcb8978 - 0x1) % _0xcb8978,
        _0x227357 = this[_0x4d52e9(0x3e1)](_0x5793da);
      if (_0x227357 > _0x390da1) return this["bottomItemIndex"](_0x227357);
      return _0x227357;
    }
    [_0x285c62(0x302)](_0x3b8caa) {
      const _0x5360c1 = _0x285c62,
        _0x2ca96c = this[_0x5360c1(0x20e)]();
      this[_0x5360c1(0x2bf)](_0x2ca96c);
    }
    [_0x285c62(0x3d8)]() {
      const _0x4fd57b = _0x285c62,
        _0x4fff5e = Math[_0x4fd57b(0x2d2)](0x0, this[_0x4fd57b(0x3c5)]()),
        _0xbfaf6 = this[_0x4fd57b(0x2cd)](_0x4fff5e),
        _0x206a52 = this["maxItems"](),
        _0x4329b7 = (_0xbfaf6 + _0x206a52 + 0x1) % _0x206a52,
        _0x301d7d = this[_0x4fd57b(0x2cd)](_0x4329b7);
      if (_0x301d7d > _0x4fff5e) return _0x301d7d;
      return this["topItemIndex"](_0x301d7d);
    }
    [_0x285c62(0x32c)](_0x1abb5b) {
      const _0x5e2835 = _0x285c62,
        _0x515d72 = this["nextBottomIndex"]();
      this[_0x5e2835(0x2bf)](_0x515d72);
    }
    ["topLineIndex"]() {
      return this["topIndex"]();
    }
    [_0x285c62(0x3d4)]() {
      const _0x3f8bac = _0x285c62,
        _0x1e1833 = this[_0x3f8bac(0x340)](),
        _0x4c79ef = this["maxPageRows"]();
      return _0x1e1833 + _0x4c79ef;
    }
    [_0x285c62(0x1f6)](_0x3ec460) {
      const _0x247129 = _0x285c62,
        _0x34396d = this[_0x247129(0x42c)](),
        _0x5ba36c = this[_0x247129(0x360)]() * 0x2;
      return (_0x34396d + _0x5ba36c) * _0x3ec460;
    }
    [_0x285c62(0x242)](_0x229d34) {
      const _0x30d52e = _0x285c62,
        _0x151201 = this[_0x30d52e(0x3e1)](_0x229d34),
        _0x237884 = this["baseRect"](_0x151201),
        _0x51d5d3 = this[_0x30d52e(0x229)](_0x151201),
        _0x467174 = this[_0x30d52e(0x1f6)](_0x51d5d3 - 0x1);
      return (_0x237884["height"] += _0x467174), _0x237884;
    }
    [_0x285c62(0x24a)](_0x28b9d1) {
      const _0x3e8ad1 = _0x285c62,
        _0x46abaa = this[_0x3e8ad1(0x3a6)](_0x28b9d1),
        _0x365b6a = this[_0x3e8ad1(0x3f1)]();
      return (
        (_0x46abaa["x"] += _0x365b6a),
        (_0x46abaa[_0x3e8ad1(0x20b)] -= _0x365b6a * 0x2),
        _0x46abaa
      );
    }
    ["needsDrawBackground"](_0x5ac9ac) {
      const _0xda934 = _0x285c62,
        _0x53ef2f = this[_0xda934(0x3e1)](_0x5ac9ac);
      return _0x53ef2f === _0x5ac9ac;
    }
    [_0x285c62(0x305)](_0x27719a) {
      const _0x38c554 = _0x285c62;
      this[_0x38c554(0x245)](_0x27719a) && super[_0x38c554(0x305)](_0x27719a);
    }
    [_0x285c62(0x26f)](_0x24b026) {
      const _0x131de9 = _0x285c62,
        _0x388c7b = this[_0x131de9(0x36f)](_0x24b026);
      if (_0x388c7b) {
        const _0x491d0b = this[_0x131de9(0x24a)](_0x24b026);
        this[_0x131de9(0x42d)](
          _0x388c7b,
          _0x491d0b["x"],
          _0x491d0b["y"],
          _0x491d0b["width"]
        );
      }
    }
  }
  class _0x4116e6 extends _0x42160e {
    [_0x285c62(0x426)](_0x49d54c) {
      this["_list"] = _0x49d54c;
    }
    [_0x285c62(0x400)]() {
      const _0x2e4d36 = _0x285c62;
      this[_0x2e4d36(0x426)]([]);
    }
    [_0x285c62(0x448)]() {
      const _0x639fd1 = _0x285c62;
      return this[_0x639fd1(0x1fc)][_0x639fd1(0x282)];
    }
    ["itemAt"](_0x24ebc7) {
      return this["_list"][_0x24ebc7];
    }
    ["currentItem"]() {
      const _0x395ea7 = _0x285c62;
      return this[_0x395ea7(0x280)](this[_0x395ea7(0x3c5)]());
    }
    [_0x285c62(0x3e1)](_0x12d9c2) {
      const _0x192dd3 = _0x285c62,
        _0x5e82e8 = this[_0x192dd3(0x280)](_0x12d9c2);
      if (_0x5e82e8) return _0x12d9c2 - _0x5e82e8["lineIndex"]();
      return _0x12d9c2;
    }
    [_0x285c62(0x245)](_0x331af3) {
      const _0x560dcf = _0x285c62,
        _0x5bce8a = this[_0x560dcf(0x280)](_0x331af3);
      if (_0x5bce8a) return _0x5bce8a[_0x560dcf(0x245)]();
      return ![];
    }
    [_0x285c62(0x36f)](_0x30cb8a) {
      const _0x42813d = _0x285c62,
        _0x46bf42 = this[_0x42813d(0x280)](_0x30cb8a);
      if (_0x46bf42) return _0x46bf42[_0x42813d(0x2cf)]();
      return "";
    }
    [_0x285c62(0x229)](_0x3a381c) {
      const _0x52839b = _0x285c62,
        _0x1e7e5e = this[_0x52839b(0x280)](_0x3a381c);
      if (_0x1e7e5e) return _0x1e7e5e["numItemLines"]();
      return 0x1;
    }
    [_0x285c62(0x360)]() {
      return 0x0;
    }
    ["lineSpacing"]() {
      return 0x4;
    }
    [_0x285c62(0x42c)]() {
      const _0x2feb26 = _0x285c62;
      return super[_0x2feb26(0x42c)]() + this[_0x2feb26(0x3c6)]();
    }
    [_0x285c62(0x36d)]() {
      return this["lineHeight"]();
    }
  }
  class _0xda514a extends _0x4116e6 {
    [_0x285c62(0x35b)](_0x94b49c) {
      const _0x2c1f18 = _0x285c62;
      (this[_0x2c1f18(0x2c9)] =
        _0x570b0c[_0x2c1f18(0x433)]()[_0x2c1f18(0x309)]()),
        super[_0x2c1f18(0x35b)](_0x94b49c),
        this[_0x2c1f18(0x34c)]();
    }
    [_0x285c62(0x21d)]() {
      const _0x5c2e54 = _0x285c62,
        _0x34aa45 = _0x570b0c[_0x5c2e54(0x433)]()[_0x5c2e54(0x309)](),
        _0x1a56b3 = _0x34aa45[_0x5c2e54(0x335)]();
      _0x1a56b3
        ? (this[_0x5c2e54(0x3e2)] = _0x1a56b3)
        : super[_0x5c2e54(0x21d)]();
    }
    ["lineSpacing"]() {
      const _0xecd79 = _0x285c62;
      return this[_0xecd79(0x2c9)]["itemStyle"]()[_0xecd79(0x3c6)];
    }
    [_0x285c62(0x34c)]() {
      const _0x4b39ee = _0x285c62,
        _0xfdbb13 = _0x570b0c[_0x4b39ee(0x24b)]();
      this[_0x4b39ee(0x426)](_0xfdbb13);
    }
    [_0x285c62(0x426)](_0x388aee) {
      const _0x498043 = _0x285c62;
      super[_0x498043(0x426)](_0x388aee);
      for (const _0x20f17e of _0x388aee) {
        _0x20f17e && ImageManager["loadFace"](_0x20f17e["faceName"]());
      }
      this[_0x498043(0x20c)]();
    }
    [_0x285c62(0x236)]() {}
    ["playOkSound"]() {}
    [_0x285c62(0x343)]() {
      const _0x367691 = _0x285c62,
        _0x52cda9 = this[_0x367691(0x448)]() - 0x1;
      _0x570b0c[_0x367691(0x273)]()[_0x367691(0x43d)](this, _0x52cda9);
    }
    [_0x285c62(0x2b8)]() {
      const _0x398df0 = _0x285c62;
      return ImageManager[_0x398df0(0x2b8)];
    }
    [_0x285c62(0x2cb)]() {
      const _0x5d6315 = _0x285c62;
      return ImageManager[_0x5d6315(0x2cb)];
    }
    [_0x285c62(0x437)](_0x53d0fe) {
      const _0x16bd6e = _0x285c62,
        _0x5dbd8c = this[_0x16bd6e(0x280)](_0x53d0fe),
        _0x4e0253 = _0x5dbd8c ? _0x5dbd8c["lineIndex"]() : 0x0,
        _0x19461b = this["baseRect"](_0x53d0fe - _0x4e0253),
        _0x4ca52c = this["faceHeight"](),
        _0x174749 = this[_0x16bd6e(0x3c6)](),
        _0x1065fc = Math[_0x16bd6e(0x261)](_0x174749 * 0x2, 0x4);
      return (
        (_0x19461b[_0x16bd6e(0x20b)] = this[_0x16bd6e(0x2b8)]()),
        (_0x19461b["height"] = _0x4ca52c),
        (_0x19461b["x"] += this[_0x16bd6e(0x267)]()),
        (_0x19461b["y"] += _0x1065fc),
        _0x19461b
      );
    }
    [_0x285c62(0x271)](_0x520835) {
      const _0x48bdbf = _0x285c62,
        _0x3bc27c = this[_0x48bdbf(0x280)](_0x520835);
      if (!_0x3bc27c[_0x48bdbf(0x20f)]()) return ![];
      if (_0x3bc27c[_0x48bdbf(0x34a)]()) return !![];
      const _0x37cb1d = this[_0x48bdbf(0x340)]();
      if (_0x520835 === _0x37cb1d) return !![];
      return ![];
    }
    ["callDrawFace"](_0x5afb6f) {
      const _0x11724a = _0x285c62;
      if (this[_0x11724a(0x271)](_0x5afb6f)) {
        const _0x570028 = this[_0x11724a(0x437)](_0x5afb6f),
          _0x3b0d33 = this[_0x11724a(0x280)](_0x5afb6f);
        this[_0x11724a(0x212)](
          _0x3b0d33["faceName"](),
          _0x3b0d33["faceIndex"](),
          _0x570028["x"],
          _0x570028["y"],
          _0x570028[_0x11724a(0x20b)],
          _0x570028["height"]
        );
      }
    }
    [_0x285c62(0x2f0)]() {
      const _0x58fe33 = _0x285c62;
      return ImageManager[_0x58fe33(0x2f0)];
    }
    [_0x285c62(0x37f)](_0x1d69aa, _0x5b41fd) {
      const _0x5487bb = _0x285c62,
        _0x410465 = _0x1d69aa["isIconLeft"]()
          ? _0x5b41fd["x"]
          : _0x5b41fd["x"] + _0x5b41fd["width"] - this[_0x5487bb(0x2f0)]();
      this["drawIcon"](
        this[_0x5487bb(0x2c9)][_0x5487bb(0x3cd)](),
        _0x410465,
        _0x5b41fd["y"]
      );
    }
    [_0x285c62(0x26f)](_0x10d9e5) {
      const _0x482d1f = _0x285c62;
      this["callDrawFace"](_0x10d9e5);
      const _0x25b8c6 = this[_0x482d1f(0x280)](_0x10d9e5);
      if (!_0x25b8c6) return;
      const _0x1598e6 = this[_0x482d1f(0x24a)](_0x10d9e5);
      if (_0x25b8c6["needsVoiceIconRender"]()) {
        this[_0x482d1f(0x37f)](_0x25b8c6, _0x1598e6);
        if (_0x25b8c6["isIconLeft"]()) {
          const _0x5ad421 = this[_0x482d1f(0x2f0)]();
          this[_0x482d1f(0x42d)](
            _0x25b8c6[_0x482d1f(0x2cf)](),
            _0x1598e6["x"] + _0x5ad421,
            _0x1598e6["y"],
            _0x1598e6[_0x482d1f(0x20b)] - _0x5ad421
          );
          return;
        }
      }
      super[_0x482d1f(0x26f)](_0x10d9e5);
    }
    ["itemRectForText"](_0x7e8006) {
      const _0xee0696 = _0x285c62,
        _0x3b43f0 = super["itemRectForText"](_0x7e8006),
        _0x28eb44 = this["itemAt"](_0x7e8006);
      if (!!_0x28eb44[_0xee0696(0x20f)]()) {
        const _0x4c75c6 = this[_0xee0696(0x2b8)]();
        (_0x3b43f0["width"] -= _0x4c75c6),
          (_0x3b43f0["x"] += _0x4c75c6 + this["colSpacing"]());
      }
      return _0x3b43f0;
    }
  }
  class _0x2d2256 {
    constructor(
      _0x2a4bfd,
      _0x1d82b8,
      _0x3d25f1,
      _0xae39b8,
      _0x43964f,
      _0x214205
    ) {
      const _0x519c90 = _0x285c62;
      (this["_table"] = {
        ja: _0x2a4bfd,
        en: _0x1d82b8,
        zh: _0x3d25f1,
        ko: _0xae39b8,
        de: _0x43964f,
        ru: _0x214205,
      }),
        this[_0x519c90(0x375)](_0x519c90(0x2f6)),
        _0x277f4c[_0x519c90(0x288)](this);
    }
    static [_0x285c62(0x214)](_0x1bf615) {
      const _0xd84ef = _0x285c62,
        _0x1c9264 = JSON[_0xd84ef(0x449)](_0x1bf615);
      return new _0x2d2256(
        _0x1c9264[_0xd84ef(0x32a)],
        _0x1c9264["en_US"],
        _0x1c9264[_0xd84ef(0x3b1)],
        _0x1c9264[_0xd84ef(0x3f9)],
        _0x1c9264[_0xd84ef(0x312)],
        _0x1c9264[_0xd84ef(0x27b)]
      );
    }
    [_0x285c62(0x2cf)]() {
      return this["_currnet"];
    }
    ["getCurrentText"](_0x49853a) {
      const _0x3b9aa7 = _0x285c62;
      if (_0x49853a["match"](/^ja/)) return this[_0x3b9aa7(0x24f)]["ja"];
      if (_0x49853a["match"](/^en/)) return this[_0x3b9aa7(0x24f)]["en"];
      if (_0x49853a[_0x3b9aa7(0x369)](/^de/))
        return this[_0x3b9aa7(0x24f)]["de"];
      if (_0x49853a[_0x3b9aa7(0x369)](/^zh/))
        return this[_0x3b9aa7(0x24f)]["zh"];
      return this[_0x3b9aa7(0x24f)]["en"];
    }
    [_0x285c62(0x375)](_0x1b2679) {
      const _0x3dc8aa = _0x285c62;
      this["_currnet"] = this[_0x3dc8aa(0x365)](_0x1b2679);
    }
  }
  class _0x45832b {
    constructor() {
      const _0x2f0e6b = _0x285c62;
      this[_0x2f0e6b(0x1fc)] = [];
    }
    [_0x285c62(0x2c8)]() {
      const _0x3f46fb = _0x285c62;
      return $dataSystem[_0x3f46fb(0x2e3)];
    }
    ["add"](_0x35d96a) {
      const _0x696ea7 = _0x285c62;
      this[_0x696ea7(0x1fc)]["push"](_0x35d96a);
    }
    [_0x285c62(0x20c)]() {
      const _0x72e318 = _0x285c62,
        _0x55b6d0 = this[_0x72e318(0x2c8)]();
      for (const _0x1cf2ef of this[_0x72e318(0x1fc)]) {
        _0x1cf2ef["refreshLang"](_0x55b6d0);
      }
    }
    [_0x285c62(0x3d5)](_0xa3b26d) {
      return;
    }
  }
  const _0x277f4c = new _0x45832b();
  class _0x8cd0ff {
    constructor(_0x52dbd7, _0x4a7c80) {
      const _0x111bb2 = _0x285c62;
      (this["_speed"] = _0x52dbd7), (this[_0x111bb2(0x358)] = _0x4a7c80);
    }
    [_0x285c62(0x2cf)]() {
      const _0x16dc62 = _0x285c62;
      return this[_0x16dc62(0x358)][_0x16dc62(0x2cf)]();
    }
  }
  class _0x495e85 {
    constructor(_0x4af297, _0x54085e) {
      const _0x273145 = _0x285c62;
      this[_0x273145(0x21e)] = _0x4af297;
    }
    ["time"]() {
      return 0x140;
    }
  }
  class _0x43ee72 {
    constructor() {
      const _0x4502b3 = _0x285c62;
      this[_0x4502b3(0x400)](), (this["_enabled"] = ![]);
    }
    ["setAutoMode"](_0x347a91) {
      const _0x4e6d1a = _0x285c62;
      this[_0x4e6d1a(0x2b5)] = _0x347a91;
    }
    ["getAutoMode"]() {
      const _0xe55096 = _0x285c62;
      return this[_0xe55096(0x2b5)];
    }
    ["flipAutoMode"]() {
      const _0x1cdc41 = _0x285c62;
      this[_0x1cdc41(0x235)](!this["_enabled"]);
    }
    [_0x285c62(0x400)]() {
      const _0x4113ee = _0x285c62;
      this[_0x4113ee(0x444)](null), this["resetTimer"]();
    }
    [_0x285c62(0x233)]() {
      const _0x34f64e = _0x285c62;
      this[_0x34f64e(0x3a4)] = 0x0;
    }
    [_0x285c62(0x3c3)]() {
      const _0x3fbdbc = _0x285c62;
      return this[_0x3fbdbc(0x3a4)];
    }
    [_0x285c62(0x1ff)]() {
      const _0x53c10f = _0x285c62;
      return this[_0x53c10f(0x2b5)];
    }
    ["updateAutoTime"](_0x4b1be4) {
      const _0x137b06 = _0x285c62;
      this[_0x137b06(0x2b5)] && (this[_0x137b06(0x3a4)] += _0x4b1be4);
    }
    [_0x285c62(0x304)]() {
      const _0x4105e1 = _0x285c62;
      this[_0x4105e1(0x233)]();
    }
    [_0x285c62(0x209)]() {
      const _0x54f1ce = _0x285c62;
      this["_seBuffer"] &&
        this[_0x54f1ce(0x2a4)]["isPlaying"]() &&
        (this["_seBuffer"][_0x54f1ce(0x40e)](),
        (this[_0x54f1ce(0x2a4)] = null));
    }
    [_0x285c62(0x322)]() {
      const _0x43d8bb = _0x285c62;
      this[_0x43d8bb(0x209)](), this[_0x43d8bb(0x233)]();
    }
    ["onVoiceStop"]() {
      this["_seBuffer"] = null;
    }
    [_0x285c62(0x444)](_0x4d821d) {
      const _0xa5ad25 = _0x285c62;
      (this[_0xa5ad25(0x2a4)] = _0x4d821d),
        _0x4d821d &&
          _0x4d821d[_0xa5ad25(0x2c0)](
            this[_0xa5ad25(0x392)][_0xa5ad25(0x2d9)](this)
          );
    }
    [_0x285c62(0x328)]() {
      const _0x2a852d = _0x285c62;
      return !this[_0x2a852d(0x2a4)];
    }
    [_0x285c62(0x284)](_0x8afec0) {
      const _0x1fc10f = _0x285c62,
        _0x823f84 = this[_0x1fc10f(0x3a4)] / _0x8afec0;
      return Math["min"](0x1, _0x823f84);
    }
    [_0x285c62(0x25c)](_0x2acbf4) {
      const _0x141a64 = _0x285c62;
      if (this["isVoiceStoped"]()) {
        const _0x1cfb4c = this[_0x141a64(0x284)](_0x2acbf4);
        if (_0x1cfb4c >= 0x1) return !![];
      }
      return ![];
    }
  }
  class _0x83c4ce {
    constructor(_0x28d038, _0x2148fb, _0x33fda3) {
      const _0x2f4086 = _0x285c62;
      (this[_0x2f4086(0x3c8)] = _0x28d038),
        (this[_0x2f4086(0x381)] = _0x2148fb),
        (this[_0x2f4086(0x2e5)] = _0x33fda3);
    }
    [_0x285c62(0x1f3)](_0x1d3f19) {
      const _0x384e06 = _0x285c62,
        _0x10c0e4 = this[_0x384e06(0x381)][_0x384e06(0x2cf)]();
      return this[_0x384e06(0x3c8)]["format"](_0x10c0e4, _0x1d3f19);
    }
    [_0x285c62(0x2ed)]() {
      const _0x1b4b37 = _0x285c62;
      return this[_0x1b4b37(0x2e5)]["text"]();
    }
  }
  class _0x4f02fb {
    constructor(
      _0x71632d,
      _0x8fdb28,
      _0x268e4a,
      _0x3b42f0,
      _0x3de87c,
      _0x290112,
      _0x3d1bd1
    ) {
      const _0x551f6d = _0x285c62;
      (this[_0x551f6d(0x3d2)] = _0x71632d),
        (this[_0x551f6d(0x237)] = _0x8fdb28 || null),
        (this[_0x551f6d(0x3cf)] = _0x3b42f0 || null),
        (this["_frameColor"] = _0x3de87c || null),
        (this[_0x551f6d(0x32b)] = _0x268e4a),
        (this[_0x551f6d(0x3f0)] = _0x290112),
        (this[_0x551f6d(0x420)] = _0x3d1bd1);
    }
    static [_0x285c62(0x214)](_0x31a200, _0x5744c1) {
      const _0x1b5b94 = _0x285c62,
        _0x20e686 = JSON[_0x1b5b94(0x449)](_0x31a200),
        _0x27fd8e = _0x20e686["windowFileName"],
        _0x5028df = _0x20e686[_0x1b5b94(0x44f)],
        _0x3989f1 = _0x20e686[_0x1b5b94(0x39a)],
        _0x332b3a = Number(_0x20e686[_0x1b5b94(0x38c)]),
        _0x3974e2 = _0x20e686[_0x1b5b94(0x399)]
          ? _0x44b2f1(_0x20e686[_0x1b5b94(0x2f9)][_0x1b5b94(0x399)])
          : null,
        _0x55342d = _0x20e686[_0x1b5b94(0x263)]
          ? _0x44b2f1(_0x20e686["windowRect"])
          : null,
        _0x28c3ae = _0x20e686[_0x1b5b94(0x249)] || null,
        _0x3f17aa = Number(_0x20e686[_0x1b5b94(0x3c6)] || 0x2),
        _0x2b61b9 = {
          voiceIcon: _0x332b3a,
          numFaceLines: 0x4,
          lineSpacing: _0x3f17aa,
          speakerNameFormat: _0x5028df,
        };
      return new _0x4f02fb(
        _0x2b61b9,
        _0x27fd8e,
        _0x55342d,
        _0x3989f1,
        _0x28c3ae,
        _0x3974e2,
        _0x5744c1[_0x1b5b94(0x3b6)]
      );
    }
    [_0x285c62(0x3cd)]() {
      const _0x63d9e1 = _0x285c62;
      return this[_0x63d9e1(0x3d2)][_0x63d9e1(0x3cd)];
    }
    ["itemStyle"]() {
      return this["_itemstyle"];
    }
    [_0x285c62(0x1f2)]() {
      const _0x552e44 = _0x285c62;
      if (this[_0x552e44(0x32b)]) return this[_0x552e44(0x32b)]["clone"]();
      return null;
    }
    [_0x285c62(0x367)]() {
      const _0x2bfa3d = _0x285c62;
      if (this[_0x2bfa3d(0x3cf)])
        return ImageManager["loadSystem"](this[_0x2bfa3d(0x3cf)]);
      return null;
    }
    [_0x285c62(0x335)]() {
      const _0x525819 = _0x285c62;
      if (this[_0x525819(0x237)])
        return ImageManager[_0x525819(0x2f1)](this[_0x525819(0x237)]);
      return null;
    }
    ["itemPadding"]() {
      return 0x8;
    }
    [_0x285c62(0x2a3)]() {
      const _0x1c6a6a = _0x285c62;
      return this["_itemstyle"][_0x1c6a6a(0x2a3)];
    }
    ["createChoiceItemText"](_0x161f6d) {
      const _0xb0d74d = _0x285c62;
      return this[_0xb0d74d(0x420)][_0xb0d74d(0x1f3)](_0x161f6d);
    }
    ["cancelText"]() {
      const _0x798292 = _0x285c62,
        _0x9290e9 = this[_0x798292(0x420)][_0x798292(0x2ed)]();
      return this[_0x798292(0x1f3)](_0x9290e9);
    }
    ["itemFrameThickness"]() {
      return 0x4;
    }
    ["itemFrameColor"]() {
      const _0x4a16ee = _0x285c62;
      return this[_0x4a16ee(0x3db)];
    }
  }
  class _0x55c49b {
    constructor(_0x551fa8, _0x1eb8ef) {
      const _0x4ccb6f = _0x285c62;
      (this[_0x4ccb6f(0x2f5)] = _0x551fa8),
        (this[_0x4ccb6f(0x31f)] = _0x1eb8ef);
    }
    ["initSwitchs"]() {
      const _0x27b4e2 = _0x285c62;
      for (const _0x539f2a of [this["_logWrite"], this["_macinakaMode"]]) {
        $gameSwitches[_0x27b4e2(0x407)](_0x539f2a, !![]);
      }
    }
    [_0x285c62(0x202)]() {
      const _0x50ec5a = _0x285c62;
      return this[_0x50ec5a(0x303)](this["_macinakaMode"]);
    }
    ["isLogWriteEnabled"]() {
      const _0x1c635d = _0x285c62;
      return this[_0x1c635d(0x303)](this["_logWrite"]);
    }
    ["readSwitch"](_0x1a329c) {
      if (_0x1a329c <= 0x0) return !![];
      return $gameSwitches["value"](_0x1a329c);
    }
  }
  class _0x362d46 {
    constructor(_0x21ab15, _0x4c11ce) {
      const _0x2e94a9 = _0x285c62;
      (this[_0x2e94a9(0x3c9)] = _0x21ab15),
        (this[_0x2e94a9(0x373)] = _0x4c11ce);
    }
    [_0x285c62(0x384)]() {
      const _0x370303 = _0x285c62;
      $gameSwitches[_0x370303(0x407)](
        this[_0x370303(0x3c9)],
        this[_0x370303(0x373)]
      );
    }
    [_0x285c62(0x41d)]() {
      const _0x1396c7 = _0x285c62;
      if (this[_0x1396c7(0x3c9)] > 0x0)
        return $gameSwitches[_0x1396c7(0x412)](this["_swicthId"]);
      return this[_0x1396c7(0x373)];
    }
  }
  class _0x43955e {
    constructor(
      _0x539ac6,
      _0x27873f,
      _0x5f1da1,
      _0xe6ac10,
      _0x5e907d,
      _0x2ab637,
      _0x5ef5d9,
      _0x4ab451
    ) {
      const _0x53479d = _0x285c62;
      (this[_0x53479d(0x226)] = _0xe6ac10),
        (this[_0x53479d(0x28b)] = _0x539ac6),
        (this[_0x53479d(0x286)] = _0x5e907d),
        (this[_0x53479d(0x402)] = _0x27873f),
        (this[_0x53479d(0x291)] = _0x5f1da1),
        (this[_0x53479d(0x334)] = _0x2ab637),
        (this["_menuCommand"] = _0x5ef5d9),
        (this["_machinakaMode"] = _0x4ab451);
    }
    [_0x285c62(0x297)]() {
      const _0x3b24a2 = _0x285c62;
      this[_0x3b24a2(0x226)][_0x3b24a2(0x297)](),
        this[_0x3b24a2(0x3ae)][_0x3b24a2(0x384)]();
    }
    [_0x285c62(0x309)]() {
      const _0x22d68a = _0x285c62;
      return this[_0x22d68a(0x402)];
    }
    [_0x285c62(0x1f3)](_0xca5092) {
      const _0x5c7548 = _0x285c62;
      return this[_0x5c7548(0x402)][_0x5c7548(0x1f3)](_0xca5092);
    }
    [_0x285c62(0x3e7)]() {
      const _0x38da18 = _0x285c62;
      return this[_0x38da18(0x291)][_0x38da18(0x410)]();
    }
    [_0x285c62(0x3b3)]() {
      const _0x43e193 = _0x285c62;
      if (!this[_0x43e193(0x286)]) {
        if ($gameParty[_0x43e193(0x23e)]()) return ![];
      }
      return this["_logSwitch"][_0x43e193(0x3b3)]();
    }
    ["isMachinakaModeEnabled"]() {
      const _0x98a0d5 = _0x285c62;
      return this[_0x98a0d5(0x3ae)][_0x98a0d5(0x41d)]();
    }
    [_0x285c62(0x40c)]() {
      return !![];
    }
    [_0x285c62(0x2fb)](_0x368084) {
      const _0x5e6250 = _0x285c62;
      if (_0x368084)
        return this[_0x5e6250(0x28b)]["isVoiceFile"](_0x368084["name"]);
      return ![];
    }
    [_0x285c62(0x406)](_0x237791) {
      const _0x1d7ccd = _0x285c62,
        _0xc4e9a5 = {
          keepingAutoMode: !!_0x237791[_0x1d7ccd(0x3d1)],
          autoWaitTime: _0x2c62ee(
            _0x237791[_0x1d7ccd(0x447)],
            this[_0x1d7ccd(0x334)][_0x1d7ccd(0x447)]
          ),
          logLimitBasic: _0x2c62ee(
            _0x237791[_0x1d7ccd(0x29c)],
            this[_0x1d7ccd(0x334)][_0x1d7ccd(0x29c)]
          ),
          logLimitExtends: _0x2c62ee(
            _0x237791["logLimitExtends"],
            this["_defaultOption"][_0x1d7ccd(0x210)]
          ),
          gaugeColor: _0x2c62ee(
            _0x237791[_0x1d7ccd(0x3a5)],
            this["_defaultOption"][_0x1d7ccd(0x3a5)]
          ),
          machinakaLines: _0x2c62ee(
            _0x237791[_0x1d7ccd(0x30b)],
            this[_0x1d7ccd(0x334)]["machinakaLines"]
          ),
        };
      return _0xc4e9a5;
    }
    [_0x285c62(0x33c)]() {
      const _0x4f8d09 = _0x285c62;
      return this[_0x4f8d09(0x406)](this["_defaultOption"]);
    }
    [_0x285c62(0x2de)]() {
      return this["_menuCommand"];
    }
  }
  function _0x2c62ee(_0x371298, _0x5c2032) {
    return isNaN(_0x371298) ? _0x5c2032 : Number(_0x371298);
  }
  class _0x20ed36 {
    constructor() {
      const _0x31451d = _0x285c62;
      this[_0x31451d(0x400)]();
    }
    [_0x285c62(0x400)]() {
      const _0x42318a = _0x285c62;
      (this["_textState"] = null),
        (this[_0x42318a(0x277)] = null),
        (this["_se"] = null);
    }
    [_0x285c62(0x403)](_0x43a2c9) {
      const _0x374523 = _0x285c62;
      this[_0x374523(0x277)] &&
        this[_0x374523(0x277)][_0x374523(0x403)](_0x43a2c9);
    }
    [_0x285c62(0x246)](_0x2c3d94, _0x291529, _0x425d1a) {
      const _0x3c97d5 = _0x285c62;
      this[_0x3c97d5(0x277)] &&
        this[_0x3c97d5(0x277)][_0x3c97d5(0x246)](
          _0x2c3d94,
          _0x291529,
          _0x425d1a
        );
    }
    [_0x285c62(0x24c)](_0x9fa3a5, _0x574ce0, _0x121fae, _0x3e3e0f) {
      const _0x396ffc = _0x285c62;
      this[_0x396ffc(0x277)] &&
        this[_0x396ffc(0x277)][_0x396ffc(0x37e)](
          _0x9fa3a5,
          _0x574ce0,
          _0x121fae,
          _0x3e3e0f,
          this["_se"]
        );
    }
    [_0x285c62(0x26d)]() {
      const _0x4c958b = _0x285c62;
      return this[_0x4c958b(0x277)];
    }
    [_0x285c62(0x27e)](_0x27a174) {
      const _0x44c3b2 = _0x285c62;
      if (!_0x27a174) {
        this["_se"] = null;
        return;
      }
      const _0x4689ab = {
        name: _0x27a174[_0x44c3b2(0x2a6)],
        pan: _0x27a174[_0x44c3b2(0x3be)],
        pitch: _0x27a174[_0x44c3b2(0x201)],
        pos: _0x27a174["pos"] || 0x0,
        volume: _0x27a174[_0x44c3b2(0x2d1)],
      };
      this[_0x44c3b2(0x33e)] = _0x4689ab;
    }
    [_0x285c62(0x442)]() {
      const _0x2c1a60 = _0x285c62;
      return !!this[_0x2c1a60(0x33e)];
    }
    [_0x285c62(0x3f8)]() {}
    [_0x285c62(0x2b6)]() {
      const _0x5abf87 = _0x285c62;
      return !!this[_0x5abf87(0x277)];
    }
    [_0x285c62(0x2ad)]() {
      const _0x117622 = _0x285c62;
      this[_0x117622(0x400)]();
    }
    [_0x285c62(0x2a2)]() {
      const _0x33ab4b = _0x285c62;
      this[_0x33ab4b(0x277)] = new _0x55b263();
    }
  }
  class _0x2e7a74 {
    constructor() {
      const _0x31ffef = _0x285c62;
      this[_0x31ffef(0x257)] = new _0x20ed36();
    }
  }
  class _0x1db290 {
    constructor() {
      const _0x4ad182 = _0x285c62;
      this[_0x4ad182(0x3fd)](![]),
        this["setShowFast"](![]),
        this[_0x4ad182(0x278)](![]),
        this[_0x4ad182(0x431)](![]),
        this[_0x4ad182(0x35f)](NaN);
    }
    [_0x285c62(0x35f)](_0x5c5e52) {
      const _0x2571a5 = _0x285c62;
      this[_0x2571a5(0x446)] = _0x5c5e52;
    }
    [_0x285c62(0x431)](_0x84c2ec) {
      const _0x1a0ecf = _0x285c62;
      this[_0x1a0ecf(0x405)] = !!_0x84c2ec;
    }
    ["setParallelMode"](_0x2d4f6a) {
      (this["_parallelMode"] = _0x2d4f6a), (this["_parallelInputLock"] = !![]);
    }
    [_0x285c62(0x40c)]() {
      const _0x1cc54a = _0x285c62;
      return !this[_0x1cc54a(0x385)];
    }
    [_0x285c62(0x377)](_0x3a746a) {
      const _0x7f636b = _0x285c62;
      this[_0x7f636b(0x248)] = !!_0x3a746a;
    }
    [_0x285c62(0x361)]() {
      return this["_needsShowFast"];
    }
    [_0x285c62(0x3fd)](_0x48e380) {
      this["_battleMode"] = _0x48e380;
    }
    [_0x285c62(0x415)]() {
      const _0x8a073b = _0x285c62;
      return this[_0x8a073b(0x2e8)];
    }
  }
  class _0x36b381 {
    constructor(_0x34ea61) {
      const _0x4fef9b = _0x285c62;
      this[_0x4fef9b(0x3e6)](_0x34ea61);
    }
    [_0x285c62(0x3ba)]() {
      const _0x234b09 = _0x285c62;
      return this[_0x234b09(0x21f)][_0x234b09(0x210)];
    }
    [_0x285c62(0x347)]() {
      const _0x58a29f = _0x285c62;
      return this[_0x58a29f(0x21f)]["logLimitBasic"];
    }
    [_0x285c62(0x371)]() {
      const _0x270387 = _0x285c62;
      return this[_0x270387(0x258)]();
    }
    ["defaultQuickSaveFileName"]() {
      const _0xd6a258 = _0x285c62;
      return _0xd6a258(0x2af);
    }
    [_0x285c62(0x3e6)](_0xd610ea) {
      const _0xd9b3a7 = _0x285c62;
      this[_0xd9b3a7(0x21f)] = _0xd610ea;
    }
    ["setLogLimitBasic"](_0x4331a4) {
      const _0x2ff0c8 = _0x285c62;
      !isNaN(_0x4331a4) &&
        (this["_value"][_0x2ff0c8(0x210)] = Math["max"](0xa, _0x4331a4));
    }
    [_0x285c62(0x2d6)]() {
      const _0x25107e = _0x285c62;
      return this["_value"][_0x25107e(0x29c)];
    }
    ["setLogLimitExtends"](_0x5861a9) {
      const _0x58f1e9 = _0x285c62;
      !isNaN(_0x5861a9) &&
        (this[_0x58f1e9(0x21f)]["logLimitExtends"] = Math[_0x58f1e9(0x2d2)](
          0x4,
          _0x5861a9
        ));
    }
    [_0x285c62(0x2db)]() {
      const _0x1c5657 = _0x285c62;
      return this["_value"][_0x1c5657(0x210)];
    }
    [_0x285c62(0x3c2)]() {
      const _0x295b0d = _0x285c62;
      return this[_0x295b0d(0x21f)][_0x295b0d(0x447)];
    }
    [_0x285c62(0x2a9)](_0x31f1f8) {
      const _0x382bb6 = _0x285c62;
      !Number["isNaN"](_0x31f1f8) &&
        (this[_0x382bb6(0x21f)][_0x382bb6(0x447)] = Math["max"](
          0xa,
          _0x31f1f8
        ));
    }
    [_0x285c62(0x3ac)]() {
      const _0xd2c082 = _0x285c62;
      return !!this[_0xd2c082(0x21f)][_0xd2c082(0x3d1)];
    }
    [_0x285c62(0x30a)]() {
      const _0x52d984 = _0x285c62;
      return this[_0x52d984(0x21f)][_0x52d984(0x3a5)];
    }
    [_0x285c62(0x30b)]() {
      return this["_value"]["machinakaLines"];
    }
    [_0x285c62(0x2bd)]() {
      const _0x55244f = _0x285c62;
      return {
        keepingAutoMode: this[_0x55244f(0x21f)][_0x55244f(0x3d1)],
        logLimitBasic: this[_0x55244f(0x21f)][_0x55244f(0x29c)],
        logLimitExtends: this[_0x55244f(0x21f)][_0x55244f(0x210)],
        autoWaitTime: this["_value"][_0x55244f(0x447)],
        gaugeColor: this[_0x55244f(0x21f)][_0x55244f(0x3a5)],
        machinakaLines: this[_0x55244f(0x21f)][_0x55244f(0x30b)],
      };
    }
  }
  class _0x14f48f {
    constructor() {
      const _0x401a17 = _0x285c62;
      this[_0x401a17(0x434)] = new Set();
    }
    [_0x285c62(0x2fb)](_0x4daf69) {}
  }
  class _0x4410ac {
    constructor() {
      this["setGaugeFunction"]((_0x5ae49d) => {
        const _0x380119 = _0x2a75,
          _0x379a6a = new _0x37d09c(_0x5ae49d[_0x380119(0x3a9)]),
          _0x116343 = ImageManager[_0x380119(0x2f1)](_0x5ae49d["fileName"]);
        return (
          _0x379a6a[_0x380119(0x260)](
            _0x116343,
            _0x5ae49d["lineWidth"],
            _0x5ae49d[_0x380119(0x2ac)]
          ),
          _0x379a6a
        );
      });
    }
    [_0x285c62(0x25b)](_0xe44705) {
      const _0x4583ea = _0x285c62;
      this[_0x4583ea(0x3a1)] = _0xe44705;
    }
    [_0x285c62(0x38e)](_0x25f43f) {
      const _0x6bc73a = _0x285c62;
      if (this["_autoGaugeFunc"]) {
        const _0x41f7da = this[_0x6bc73a(0x3a1)](_0x25f43f);
        return _0x41f7da[_0x6bc73a(0x407)](0x0), _0x41f7da;
      }
      return null;
    }
  }
  function _0x10d916(_0x51a244) {
    const _0x1e92ae = _0x285c62;
    let _0x26d66c = _0x51a244;
    for (let _0xc0f0eb = 0x0; _0xc0f0eb < 0x64; ++_0xc0f0eb) {
      const _0x3dd2aa = $dataMapInfos[_0x26d66c];
      if (!_0x3dd2aa) return _0x26d66c;
      _0x26d66c = _0x3dd2aa[_0x1e92ae(0x293)];
    }
    return 0x0;
  }
  class _0x537e18 {
    constructor() {
      const _0x49d855 = _0x285c62;
      this[_0x49d855(0x22f)](0x0);
    }
    [_0x285c62(0x22f)](_0x1dc857) {
      const _0xa47ecf = _0x285c62;
      this[_0xa47ecf(0x3b9)] = _0x1dc857;
    }
    ["onMapTransfer"]() {}
  }
  function _0x397ab9() {
    const _0x85d1ef = _0x285c62;
    let _0x2d2dd0 = $gameMap[_0x85d1ef(0x3c0)];
    for (let _0x481aa9 = 0x0; _0x481aa9 < 0x3f2; ++_0x481aa9) {
      if (!_0x2d2dd0[_0x85d1ef(0x2d7)]) return _0x2d2dd0;
      _0x2d2dd0 = _0x2d2dd0[_0x85d1ef(0x2d7)];
    }
    return null;
  }
  class _0xaec220 {
    [_0x285c62(0x2fa)]() {
      return _0x4a27d6;
    }
    constructor(_0xb6fd79, _0x17f615, _0x4bcddf) {
      const _0x19ed42 = _0x285c62;
      this["setWorkaround"](_0xb6fd79),
        (this[_0x19ed42(0x311)] = null),
        (this["_autoXXX"] = new _0x43ee72()),
        this[_0x19ed42(0x359)](),
        (this[_0x19ed42(0x262)] = _0x17f615),
        (this[_0x19ed42(0x290)] = new _0x36b381(_0x17f615[_0x19ed42(0x33c)]())),
        (this[_0x19ed42(0x243)] = _0x4bcddf);
    }
    ["onAudioLoadError"](_0x1ff9bc) {}
    [_0x285c62(0x3e6)](_0x29e8aa) {
      const _0x152f5c = _0x285c62;
      if (_0x29e8aa) {
        const _0x57015c = this[_0x152f5c(0x262)][_0x152f5c(0x406)](_0x29e8aa);
        this[_0x152f5c(0x290)][_0x152f5c(0x3e6)](_0x57015c);
      } else
        this[_0x152f5c(0x290)][_0x152f5c(0x3e6)](
          this["_readOnlyData"][_0x152f5c(0x33c)]()
        );
    }
    [_0x285c62(0x43c)]() {
      const _0x1c9522 = _0x285c62,
        _0x51a78c = this["_option"][_0x1c9522(0x2bd)]();
      return this[_0x1c9522(0x262)][_0x1c9522(0x406)](_0x51a78c);
    }
    [_0x285c62(0x33a)]() {
      return this["_option"];
    }
    [_0x285c62(0x3d9)]() {}
    [_0x285c62(0x386)]() {
      const _0x2dab59 = _0x285c62;
      return this[_0x2dab59(0x433)]()[_0x2dab59(0x309)]()[_0x2dab59(0x416)]();
    }
    [_0x285c62(0x301)](_0x379c42) {
      this["_workaround"] = _0x379c42;
    }
    [_0x285c62(0x273)]() {
      return this["_workaround"];
    }
    [_0x285c62(0x388)](_0x4c4d95, _0x1a76b0) {
      const _0x468887 = _0x285c62;
      this[_0x468887(0x311)][_0x468887(0x2fc)](
        _0x1a76b0,
        _0x4c4d95["eventId"]()
      );
    }
    [_0x285c62(0x43e)]() {
      const _0x91dfcc = _0x285c62;
      return this[_0x91dfcc(0x44e)]()[_0x91dfcc(0x43e)]();
    }
    [_0x285c62(0x315)](_0x2623bb) {
      const _0x14054d = _0x285c62,
        _0x4231fd = this[_0x14054d(0x44e)]();
    }
    [_0x285c62(0x393)](_0x107c57) {
      const _0x33811e = _0x285c62,
        _0x51f6f3 = _0x107c57["event"]()[_0x33811e(0x2a6)];
      if (!_0x51f6f3) return ![];
      if (_0x51f6f3[_0x33811e(0x369)](/^EV\d{1,3}/)) return ![];
      return !![];
    }
    [_0x285c62(0x352)]() {
      const _0xe7b236 = _0x285c62;
      return new _0x31d482(this[_0xe7b236(0x2fa)]());
    }
    [_0x285c62(0x298)]() {
      const _0x928e0 = _0x285c62;
      this[_0x928e0(0x28c)](this["createEmptySaveContents"]());
    }
    ["clearOldData"]() {
      const _0x36ff74 = _0x285c62,
        _0x2bb56b = this["option"]();
      this[_0x36ff74(0x311)][_0x36ff74(0x2b4)](
        _0x2bb56b[_0x36ff74(0x347)](),
        _0x2bb56b["logSizeRed"]()
      );
    }
    [_0x285c62(0x28c)](_0xe4806b) {
      const _0x7207dc = _0x285c62;
      (this["_contents"] = _0xe4806b), this[_0x7207dc(0x279)]();
    }
    [_0x285c62(0x207)]() {
      const _0x135321 = _0x285c62;
      return this[_0x135321(0x311)][_0x135321(0x253)]();
    }
    [_0x285c62(0x44e)]() {
      return this["_contents"];
    }
    [_0x285c62(0x279)]() {
      const _0x30036a = _0x285c62;
      !this[_0x30036a(0x311)] &&
        (this["_contents"] = this["createEmptySaveContents"]());
    }
    [_0x285c62(0x2e9)](_0x459887) {
      const _0x5b3732 = _0x285c62;
      if (!_0x459887) return !![];
      try {
        const _0x2bbbf9 = _0x459887[_0x5b3732(0x346)]();
        if (_0x2bbbf9 !== this[_0x5b3732(0x2fa)]()) return ![];
        this[_0x5b3732(0x28c)](_0x459887);
      } catch (_0xa0586a) {
        return (
          console[_0x5b3732(0x23c)](_0xa0586a), console["error"](_0x459887), ![]
        );
      }
      const _0x571ca3 = _0x459887[_0x5b3732(0x2bc)](),
        _0x1d32ed = _0x397ab9();
      return (
        !isNaN(_0x571ca3) &&
          _0x1d32ed &&
          _0x1d32ed[_0x5b3732(0x2c5)]() &&
          _0x1d32ed["jumpTo"](_0x571ca3),
        !![]
      );
    }
    ["readSaveContents"](_0x70082b) {
      const _0x11f89c = _0x285c62;
      this[_0x11f89c(0x359)](), (this[_0x11f89c(0x311)] = null);
      const _0x3a345f = _0x70082b[_0x11f89c(0x1fb)],
        _0xa3bba1 = this["tryReadingSaveContents"](_0x3a345f);
      this["makeSaveContents"]();
      if (!_0xa3bba1) {
      }
    }
    [_0x285c62(0x359)]() {
      const _0x446011 = _0x285c62;
      this[_0x446011(0x37d)]["setLastVoiceBuffer"](null),
        (this[_0x446011(0x36e)] = new _0x1db290()),
        (this["_messageStream"] = new _0x20ed36());
    }
    [_0x285c62(0x3b5)]() {
      const _0x3a4513 = _0x285c62;
      this[_0x3a4513(0x243)][_0x3a4513(0x297)](),
        this[_0x3a4513(0x262)][_0x3a4513(0x297)](),
        this[_0x3a4513(0x359)](),
        this[_0x3a4513(0x298)]();
    }
    ["onBoot"]() {}
    [_0x285c62(0x3ab)](_0x4e9b67, _0x18b84b) {}
    [_0x285c62(0x430)](_0x3935cc, _0x5edbf4) {}
    [_0x285c62(0x433)]() {
      const _0x44a585 = _0x285c62;
      return this[_0x44a585(0x262)];
    }
    [_0x285c62(0x30b)]() {
      const _0x2b4045 = _0x285c62;
      return this[_0x2b4045(0x290)][_0x2b4045(0x30b)]();
    }
    [_0x285c62(0x378)]() {
      const _0x4fed51 = _0x285c62,
        _0x36da54 = this[_0x4fed51(0x243)];
      if (_0x36da54[_0x4fed51(0x440)]()) return new _0x2898bb(_0x36da54);
      if (_0x36da54[_0x4fed51(0x23a)]()) return new _0x32509b(_0x36da54);
      return new _0x355362(_0x36da54);
    }
    ["speakerNameFormat"]() {
      const _0x1725a7 = _0x285c62;
      return this[_0x1725a7(0x262)][_0x1725a7(0x309)]()["speakerNameFormat"]();
    }
    [_0x285c62(0x1f3)](_0x565df7) {
      const _0x10d6a9 = _0x285c62;
      return this[_0x10d6a9(0x262)]["createChoiceItemText"](_0x565df7);
    }
    [_0x285c62(0x278)](_0xea7035) {
      const _0x368609 = _0x285c62;
      this[_0x368609(0x36e)][_0x368609(0x278)](_0xea7035);
    }
    [_0x285c62(0x40c)]() {
      const _0x53ce09 = _0x285c62;
      return (
        $gameSystem[_0x53ce09(0x24e)]() &&
        this["_temporaly"][_0x53ce09(0x40c)]() &&
        this["_readOnlyData"][_0x53ce09(0x40c)]()
      );
    }
    [_0x285c62(0x36b)](_0x44d4b6) {
      const _0x339602 = _0x285c62;
      _0x44d4b6[_0x339602(0x1fb)] = this[_0x339602(0x3ef)]();
    }
    ["pushScene"](_0x14c15a) {
      const _0x55c59b = _0x285c62;
      SceneManager[_0x55c59b(0x314)](_0x14c15a),
        this[_0x55c59b(0x36e)][_0x55c59b(0x377)](!![]);
    }
    [_0x285c62(0x361)]() {
      const _0x5f2323 = _0x285c62;
      return this[_0x5f2323(0x36e)][_0x5f2323(0x361)]();
    }
    [_0x285c62(0x362)]() {
      const _0x41fb1d = _0x285c62;
      if ($gameMessage[_0x41fb1d(0x270)]() || $gameMessage[_0x41fb1d(0x3ad)]())
        return ![];
      return !![];
    }
    ["updateInput"]() {
      const _0x9def6c = _0x285c62;
      this[_0x9def6c(0x362)]() && this[_0x9def6c(0x243)]["updateInput"]();
    }
    [_0x285c62(0x283)]() {
      return 0x1;
    }
    [_0x285c62(0x354)]() {}
    ["endAutoTimer"]() {
      const _0x25e310 = _0x285c62;
      this[_0x25e310(0x37d)][_0x25e310(0x400)]();
    }
    [_0x285c62(0x329)]() {
      const _0x16ea48 = _0x285c62;
      return this[_0x16ea48(0x37d)]["timeRate"](
        this[_0x16ea48(0x290)][_0x16ea48(0x3c2)]()
      );
    }
    [_0x285c62(0x3f5)]() {
      const _0x1b1998 = _0x285c62;
      this[_0x1b1998(0x37d)]["updateAutoTime"](0x1);
    }
    ["isVoiceStoped"]() {
      return this["_autoXXX"]["isVoiceStoped"]();
    }
    [_0x285c62(0x2d8)]() {
      const _0x9c8bb0 = _0x285c62,
        _0x2bdb51 = this["_option"][_0x9c8bb0(0x3c2)]();
      return this[_0x9c8bb0(0x37d)][_0x9c8bb0(0x25c)](_0x2bdb51 + 0x14);
    }
    ["addLines"](_0x44a91c) {
      const _0x54532b = _0x285c62;
      this[_0x54532b(0x272)][_0x54532b(0x403)](_0x44a91c);
    }
    [_0x285c62(0x29a)]() {
      const _0x5c2c96 = _0x285c62,
        _0x418f43 = this[_0x5c2c96(0x272)][_0x5c2c96(0x26d)]();
      _0x418f43 && this[_0x5c2c96(0x28d)](_0x418f43),
        this[_0x5c2c96(0x272)][_0x5c2c96(0x2ad)]();
    }
    [_0x285c62(0x246)](_0x4b3189, _0x3f2dec) {
      const _0x3feb06 = _0x285c62,
        _0x43c146 = $gameMessage[_0x3feb06(0x20f)](),
        _0x7e8d12 = $gameMessage["faceIndex"]();
      this[_0x3feb06(0x272)][_0x3feb06(0x24c)](
        _0x4b3189,
        _0x3f2dec,
        _0x43c146,
        _0x7e8d12
      ),
        this[_0x3feb06(0x37d)]["onStartMessage"](),
        this[_0x3feb06(0x36e)]["setShowFast"](![]);
    }
    [_0x285c62(0x322)]() {
      const _0x405322 = _0x285c62;
      this[_0x405322(0x37d)][_0x405322(0x322)]();
    }
    [_0x285c62(0x2ab)](_0x530b5a) {
      const _0x2128c0 = _0x285c62,
        _0x3f79b8 = this[_0x2128c0(0x44e)]();
      _0x3f79b8[_0x2128c0(0x2bc)]() === _0x530b5a
        ? (this[_0x2128c0(0x294)](), this[_0x2128c0(0x272)][_0x2128c0(0x2ad)]())
        : (_0x3f79b8[_0x2128c0(0x2ab)](_0x530b5a),
          this[_0x2128c0(0x3b3)]() &&
            this[_0x2128c0(0x272)][_0x2128c0(0x2a2)]());
    }
    [_0x285c62(0x24b)]() {
      const _0x1fb5d8 = _0x285c62;
      return this[_0x1fb5d8(0x44e)]()[_0x1fb5d8(0x24b)]();
    }
    [_0x285c62(0x3fd)](_0x4de250) {
      const _0x190ee3 = _0x285c62;
      this[_0x190ee3(0x36e)][_0x190ee3(0x3fd)](_0x4de250);
    }
    [_0x285c62(0x3ed)]() {
      const _0x124114 = _0x285c62;
      return !this["_temporaly"][_0x124114(0x415)]();
    }
    ["isLogWriteEnabled"]() {
      const _0x3777bb = _0x285c62;
      return this[_0x3777bb(0x262)][_0x3777bb(0x3b3)]();
    }
    [_0x285c62(0x3b2)]() {
      const _0x8289c9 = _0x285c62;
      if (Utils[_0x8289c9(0x396)]()) return !![];
      if (Utils[_0x8289c9(0x274)]()) return !![];
      return ![];
    }
    [_0x285c62(0x3ef)]() {
      const _0x100e9a = _0x285c62;
      if (this[_0x100e9a(0x3b2)]()) return this[_0x100e9a(0x311)];
      return this[_0x100e9a(0x311)][_0x100e9a(0x2e6)]();
    }
    [_0x285c62(0x294)]() {
      const _0x3077ce = _0x285c62;
      if (this[_0x3077ce(0x328)]()) {
        const _0x33aafa = this[_0x3077ce(0x44e)]()[_0x3077ce(0x31a)]();
        _0x33aafa && ManoUZ_MessageLog["playVoice"](_0x33aafa, {});
      }
    }
    [_0x285c62(0x3f4)]() {
      const _0xf5131d = _0x285c62;
      if (this[_0xf5131d(0x272)]["hasVoice"]()) return !![];
      const _0xd6d9e2 = this[_0xf5131d(0x44e)](),
        _0x38ab32 = _0xd6d9e2["lastVoice"]();
      return !!_0x38ab32;
    }
    [_0x285c62(0x3d0)](_0x58fb4b, _0x176e0c) {
      const _0x2a60b9 = _0x285c62;
      if (_0x58fb4b === -0x2) {
        const _0x44fdc2 = this[_0x2a60b9(0x433)]()
            ["logStyle"]()
            [_0x2a60b9(0x2ed)](),
          _0x14159d = new _0x52a5b6(_0x44fdc2, _0x58fb4b);
        this[_0x2a60b9(0x28d)](_0x14159d);
        return;
      }
      if (0x0 <= _0x58fb4b && _0x58fb4b < _0x176e0c[_0x2a60b9(0x448)]()) {
        const _0x32f2a6 = _0x176e0c[_0x2a60b9(0x2bb)](_0x58fb4b),
          _0x1631c2 = _0x176e0c[_0x2a60b9(0x2f7)](_0x32f2a6),
          _0xbe6a31 = this[_0x2a60b9(0x433)]()
            [_0x2a60b9(0x309)]()
            [_0x2a60b9(0x1f3)](_0x1631c2),
          _0x45abc3 = new _0x52a5b6(_0xbe6a31, _0x58fb4b);
        this["addItem"](_0x45abc3);
      }
    }
    ["addItem"](_0x109517) {
      const _0x138a83 = _0x285c62;
      if (!this[_0x138a83(0x3b3)]()) return;
      const _0x4f7e45 = this[_0x138a83(0x44e)]();
      _0x4f7e45[_0x138a83(0x28d)](_0x109517);
    }
    [_0x285c62(0x331)]() {
      const _0x546909 = _0x285c62;
      return !isNaN(this[_0x546909(0x311)][_0x546909(0x2bc)]());
    }
    ["onEndEvent"]() {
      const _0x53e9ef = _0x285c62;
      this["_contents"][_0x53e9ef(0x450)](),
        this[_0x53e9ef(0x311)][_0x53e9ef(0x2e7)](),
        this[_0x53e9ef(0x27d)](),
        this[_0x53e9ef(0x272)]["clear"](),
        this["refreshAutoKeeping"]();
    }
    [_0x285c62(0x428)](_0x304e8a, _0xf3cc36) {
      const _0x4a59be = _0x285c62,
        _0x1e3a96 = this[_0x4a59be(0x262)][_0x4a59be(0x2fb)](_0x304e8a);
      return (
        _0x1e3a96 && this[_0x4a59be(0x272)]["setLastVoice"](_0x304e8a),
        _0x1e3a96
      );
    }
    ["setLastVoiceBuffer"](_0x5a09d5) {
      const _0xf023c2 = _0x285c62;
      this[_0xf023c2(0x37d)][_0xf023c2(0x444)](_0x5a09d5);
    }
    [_0x285c62(0x235)](_0x3f5fd9) {
      const _0x55fa7d = _0x285c62;
      this[_0x55fa7d(0x37d)][_0x55fa7d(0x235)](!!_0x3f5fd9);
    }
    ["getAutoMode"]() {
      const _0xa5825b = _0x285c62;
      return this[_0xa5825b(0x37d)]["getAutoMode"]();
    }
    [_0x285c62(0x2ae)]() {
      const _0x3d46fd = _0x285c62;
      this[_0x3d46fd(0x37d)]["flipAutoMode"]();
    }
    [_0x285c62(0x259)]() {
      const _0x3dc896 = _0x285c62;
      if (this["_option"][_0x3dc896(0x3ac)]()) return ![];
      if ($gameMessage["isBusy"]()) return ![];
      return !$gameMap[_0x3dc896(0x331)]();
    }
    [_0x285c62(0x338)]() {
      const _0x390c9d = _0x285c62;
      this[_0x390c9d(0x259)]() && this[_0x390c9d(0x37d)]["setAutoMode"](![]);
    }
    [_0x285c62(0x376)]() {
      const _0x91764d = _0x285c62;
      return this["_autoXXX"][_0x91764d(0x1ff)]();
    }
  }
  function _0x5168f4() {
    return PluginManager["parameters"](_0x3bdadf);
  }
  function _0x5381a6(_0x111a43) {
    const _0x50289e = _0x285c62,
      _0x511d2a = Number(_0x111a43[_0x50289e(0x38a)] || 0x0),
      _0x42773c = _0x2ebb2b[_0x50289e(0x214)](_0x111a43[_0x50289e(0x395)]),
      _0x2131f5 = new _0x2f09d1(
        _0x42773c,
        _0x1c4cb8[_0x50289e(0x214)](_0x111a43["autoButton"]),
        _0x50289e(0x323)
      ),
      _0x8842ef = new _0x487853(
        _0x1c4cb8["create"](_0x111a43[_0x50289e(0x41f)]),
        _0x50289e(0x41a)
      ),
      _0x1f0dc3 = new _0xab5141(
        _0x1c4cb8[_0x50289e(0x214)](_0x111a43[_0x50289e(0x2be)]),
        _0x50289e(0x2dd)
      ),
      _0x26c890 = new _0x45d1c9(
        _0x1c4cb8[_0x50289e(0x214)](_0x111a43[_0x50289e(0x3c7)]),
        "pagedown"
      ),
      _0x530032 = new _0x1dfe97(
        _0x1c4cb8[_0x50289e(0x214)](_0x111a43["voiceRepeatButton"]),
        null
      ),
      _0x10520d = new _0x13e1e0(
        _0x511d2a,
        _0x1c4cb8[_0x50289e(0x214)](_0x111a43[_0x50289e(0x251)]),
        "skip"
      ),
      _0x1f149f = [
        _0x8842ef,
        _0x1f0dc3,
        _0x26c890,
        _0x530032,
        _0x10520d,
        _0x2131f5,
      ]["filter"]((_0x53487f) => {
        const _0x3c1f3e = _0x50289e;
        return _0x53487f[_0x3c1f3e(0x222)]();
      }),
      _0x3396f8 = _0x4ac46e[_0x50289e(0x214)](
        _0x111a43[_0x50289e(0x22a)],
        _0x1f149f
      );
    return _0x3396f8;
  }
  const _0x570b0c = (function () {
      const _0x5d12ca = _0x285c62,
        _0x573214 = _0x5168f4(),
        _0x2ce287 = Number(_0x573214["machinakaModeLines"] || 0x3),
        _0x13a8e0 = Number(_0x573214[_0x5d12ca(0x332)] || 0x0),
        _0x1d7aaa = "true" === _0x573214[_0x5d12ca(0x36c)],
        _0x4c5c04 = new _0x362d46(_0x13a8e0, _0x1d7aaa),
        _0x59b689 = {
          autoWaitTime: Number(_0x573214[_0x5d12ca(0x447)] || 0x168),
          logLimitBasic: Number(_0x573214["logLimitBasic"] || 0x28),
          logLimitExtends: Number(_0x573214[_0x5d12ca(0x210)] || 0x14),
          keepingAutoMode: ![],
          gaugeColor: 0xff0000,
          machinakaLines: _0x2ce287,
        },
        _0x2aed3e = _0x2d2256[_0x5d12ca(0x214)](_0x573214[_0x5d12ca(0x2ff)]),
        _0x29135c = String(_0x573214[_0x5d12ca(0x3eb)]),
        _0x5193a5 = _0x2d2256[_0x5d12ca(0x214)](_0x573214[_0x5d12ca(0x22d)]),
        _0x587355 = _0x4f02fb["create"](_0x573214[_0x5d12ca(0x309)], {
          choice: new _0x83c4ce(_0x29135c, _0x2aed3e, _0x5193a5),
        }),
        _0x427318 = _0x5381a6(_0x573214),
        _0x24bc05 = new _0x495e85([], null),
        _0x503cb2 = _0x1fdb3f[_0x5d12ca(0x214)](_0x573214[_0x5d12ca(0x35e)]),
        _0x8ca52c = Number(_0x573214[_0x5d12ca(0x29b)]),
        _0x3a6f0f = _0x573214[_0x5d12ca(0x3c1)] === _0x5d12ca(0x418),
        _0x481b5a = {
          commandName: _0x2d2256[_0x5d12ca(0x214)](
            _0x573214["menuCommand"] || "{}"
          ),
          symbol: _0x5d12ca(0x275),
        },
        _0x40d629 = new _0x55c49b(_0x8ca52c, 0x0),
        _0x2a9bfc = new _0x43955e(
          _0x503cb2,
          _0x587355,
          _0x24bc05,
          _0x40d629,
          _0x3a6f0f,
          _0x59b689,
          _0x481b5a,
          _0x4c5c04
        ),
        _0x434631 = Utils[_0x5d12ca(0x3de)] === "MZ" ? new _0x5ba378() : null,
        _0x4d19e3 = new _0xaec220(_0x434631, _0x2a9bfc, _0x427318);
      return _0x4d19e3;
    })(),
    _0xeb87b8 = Game_Interpreter["prototype"][_0x285c62(0x2d3)];
  Game_Interpreter[_0x285c62(0x213)][_0x285c62(0x2d3)] = function (_0x46fe5a) {
    const _0x89dbb9 = _0x285c62,
      _0x55cb6b = this["_index"],
      _0x23c218 = _0xeb87b8["call"](this, _0x46fe5a);
    return _0x23c218 && _0x570b0c[_0x89dbb9(0x2ab)](_0x55cb6b), _0x23c218;
  };
  const _0x5a69e7 = Game_Interpreter[_0x285c62(0x213)][_0x285c62(0x391)];
  Game_Interpreter[_0x285c62(0x213)][_0x285c62(0x391)] = function (_0x642d3) {
    const _0x249fd9 = _0x285c62,
      _0x103ef5 = _0x5a69e7[_0x249fd9(0x2b0)](this, _0x642d3);
    if (!_0x570b0c[_0x249fd9(0x3b3)]()) return _0x103ef5;
    const _0x29dd29 = _0x570b0c["setLastVoiceParam"](_0x642d3[0x0], null);
    if (_0x29dd29) {
      const _0x2b6f55 = _0x5e8da0();
      _0x570b0c[_0x249fd9(0x444)](_0x2b6f55);
    }
    return _0x103ef5;
  };
  function _0x5e8da0() {
    const _0x274831 = _0x285c62,
      _0xe04c97 = AudioManager[_0x274831(0x436)][_0x274831(0x282)],
      _0x2e444d = AudioManager[_0x274831(0x436)][_0xe04c97 - 0x1];
    if (_0x2e444d) return _0x2e444d;
    return null;
  }
  const _0x1304cb = Window_ChoiceList[_0x285c62(0x213)]["callOkHandler"];
  Window_ChoiceList[_0x285c62(0x213)][_0x285c62(0x3e9)] = function () {
    const _0x200148 = _0x285c62;
    if (_0x570b0c[_0x200148(0x3b3)]()) {
      const _0x24f455 = this[_0x200148(0x3c5)]();
      _0x570b0c[_0x200148(0x3d0)](_0x24f455, this);
    }
    _0x1304cb[_0x200148(0x2b0)](this);
  };
  const _0x5c7624 = Window_ChoiceList[_0x285c62(0x213)][_0x285c62(0x324)];
  Window_ChoiceList[_0x285c62(0x213)][_0x285c62(0x324)] = function () {
    const _0x5e164d = _0x285c62;
    if (_0x570b0c["isLogWriteEnabled"]()) {
      const _0x306430 = $gameMessage[_0x5e164d(0x422)]();
      _0x570b0c[_0x5e164d(0x3d0)](_0x306430, this);
    }
    _0x5c7624["call"](this);
  };
  class _0xd6acc9 extends Scene_MenuBase {
    [_0x285c62(0x214)]() {
      const _0x5548cc = _0x285c62;
      super[_0x5548cc(0x214)](), this["createAllWindows"]();
    }
    [_0x285c62(0x310)]() {
      return _0x570b0c;
    }
    ["createBackground"]() {
      const _0x1a82ec = _0x285c62,
        _0x26a76d = this[_0x1a82ec(0x310)]()
          [_0x1a82ec(0x433)]()
          [_0x1a82ec(0x309)]()
          [_0x1a82ec(0x367)]();
      _0x26a76d
        ? ((this[_0x1a82ec(0x3a7)] = new Sprite(_0x26a76d)),
          this[_0x1a82ec(0x316)](this[_0x1a82ec(0x3a7)]))
        : super["createBackground"]();
    }
    ["createAllWindows"]() {
      const _0x412ac5 = _0x285c62;
      this[_0x412ac5(0x27a)](),
        this[_0x412ac5(0x357)](),
        this[_0x412ac5(0x217)](),
        this[_0x412ac5(0x2ec)]();
    }
    [_0x285c62(0x337)]() {
      const _0x3dbc11 = _0x285c62;
      return _0x570b0c["readOnryData"]()[_0x3dbc11(0x3c4)]();
    }
    [_0x285c62(0x2ec)]() {
      const _0x3034fc = _0x285c62;
      this[_0x3034fc(0x368)][_0x3034fc(0x2e4)](this[_0x3034fc(0x2c2)]),
        this[_0x3034fc(0x368)][_0x3034fc(0x42e)]();
      if (this[_0x3034fc(0x337)]()) {
        this[_0x3034fc(0x368)][_0x3034fc(0x35c)]();
        return;
      }
      this[_0x3034fc(0x2c2)]["selectlLastItem"](),
        this["_logWindow"][_0x3034fc(0x35c)]();
    }
    ["start"]() {
      const _0xfe51b5 = _0x285c62;
      super[_0xfe51b5(0x3e3)](), this["_logWindow"][_0xfe51b5(0x20c)]();
    }
    ["mainAreaLeft"]() {
      return 0x0;
    }
    [_0x285c62(0x26c)]() {
      return ![];
    }
    [_0x285c62(0x3ca)]() {
      const _0x495108 = _0x285c62;
      if (this[_0x495108(0x26c)]()) return super[_0x495108(0x3ca)]();
      return 0x0;
    }
    [_0x285c62(0x3d3)]() {
      return ![];
    }
    [_0x285c62(0x1f2)]() {
      const _0x5aaa63 = _0x285c62,
        _0x49c572 = _0x570b0c[_0x5aaa63(0x433)]()
          ["logStyle"]()
          [_0x5aaa63(0x1f2)]();
      if (_0x49c572) return _0x49c572;
      const _0x5a6066 = this["machinakaWindowHeight"](),
        _0x17ea76 = this["mainAreaLeft"](),
        _0x55740c = this[_0x5aaa63(0x397)]() + _0x5a6066,
        _0x12ff9c = this[_0x5aaa63(0x203)]() - _0x5a6066;
      return new Rectangle(
        _0x17ea76,
        _0x55740c,
        Graphics[_0x5aaa63(0x25f)],
        _0x12ff9c
      );
    }
    [_0x285c62(0x217)]() {
      const _0xdb2396 = _0x285c62,
        _0x25cc42 = this[_0xdb2396(0x1f2)](),
        _0x3b6f67 = new _0xda514a(_0x25cc42);
      this[_0xdb2396(0x26c)]() &&
        _0x3b6f67[_0xdb2396(0x244)](this[_0xdb2396(0x34e)]),
        _0x3b6f67["setHandler"]("ok", this[_0xdb2396(0x3af)]["bind"](this)),
        _0x3b6f67[_0xdb2396(0x22c)](
          _0xdb2396(0x254),
          this["onBacklogCancel"][_0xdb2396(0x2d9)](this)
        ),
        (this["_logWindow"] = _0x3b6f67),
        this["addWindow"](_0x3b6f67);
    }
    [_0x285c62(0x3af)]() {
      const _0x1c7943 = _0x285c62,
        _0x16b075 = this[_0x1c7943(0x2c2)]["currentItem"]();
      if (_0x16b075) {
        const _0x492349 = _0x16b075["voiceParam"]();
        _0x492349 && ManoUZ_MessageLog[_0x1c7943(0x3dc)](_0x492349, {});
      }
      this[_0x1c7943(0x2c2)]["activate"]();
    }
    ["onBacklogCancel"]() {
      const _0x1c74a6 = _0x285c62;
      this[_0x1c74a6(0x368)][_0x1c74a6(0x3a0)] && this[_0x1c74a6(0x337)]()
        ? (this[_0x1c74a6(0x2c2)][_0x1c74a6(0x32e)](),
          this[_0x1c74a6(0x368)][_0x1c74a6(0x35c)]())
        : this[_0x1c74a6(0x404)]();
    }
    [_0x285c62(0x37b)]() {
      const _0x45e5ac = _0x285c62;
      if (this[_0x45e5ac(0x337)]()) {
        const _0x490827 = _0x570b0c[_0x45e5ac(0x30b)](),
          _0x19a8c8 = this[_0x45e5ac(0x230)](_0x490827, !![]);
        return _0x19a8c8;
      }
      return 0x0;
    }
    [_0x285c62(0x2ce)]() {
      const _0x4892f7 = _0x285c62,
        _0x5c42a4 = this[_0x4892f7(0x292)](),
        _0x387d69 = this["mainAreaTop"](),
        _0x48779a = this[_0x4892f7(0x37b)]();
      return new Rectangle(
        _0x5c42a4,
        _0x387d69,
        Graphics[_0x4892f7(0x25f)],
        _0x48779a
      );
    }
    [_0x285c62(0x357)]() {
      const _0x42eef4 = _0x285c62,
        _0x1d9193 = this[_0x42eef4(0x2ce)](),
        _0x4f6ccf = new _0x361391(_0x1d9193);
      (_0x4f6ccf["visible"] = this[_0x42eef4(0x337)]()),
        _0x4f6ccf[_0x42eef4(0x22c)](
          "ok",
          this[_0x42eef4(0x39d)][_0x42eef4(0x2d9)](this)
        ),
        _0x4f6ccf["setHandler"](
          _0x42eef4(0x254),
          this[_0x42eef4(0x20d)][_0x42eef4(0x2d9)](this)
        );
      const _0x3cb624 = _0x570b0c["createMachinakaList"]();
      _0x4f6ccf["setList"](_0x3cb624),
        (this[_0x42eef4(0x368)] = _0x4f6ccf),
        this[_0x42eef4(0x342)](_0x4f6ccf);
    }
    [_0x285c62(0x39d)]() {
      const _0x2ce08a = _0x285c62,
        _0x51e3d4 = this[_0x2ce08a(0x368)][_0x2ce08a(0x2ca)]();
      this[_0x2ce08a(0x2c2)][_0x2ce08a(0x426)](_0x51e3d4[_0x2ce08a(0x1f7)]()),
        this[_0x2ce08a(0x2c2)][_0x2ce08a(0x427)](0x0),
        this["_logWindow"]["activate"]();
    }
    [_0x285c62(0x20d)]() {
      const _0x17e986 = _0x285c62;
      this[_0x17e986(0x404)]();
    }
  }
  class _0x396c25 {
    ["maxValue"]() {
      return 0x1;
    }
    [_0x285c62(0x443)]() {
      return 0x1;
    }
    [_0x285c62(0x3f3)]() {
      const _0x2c063e = _0x285c62,
        _0x13714c = Math[_0x2c063e(0x2d2)](0x1, this[_0x2c063e(0x28a)]());
      return this["currentValue"]() / _0x13714c;
    }
  }
  class _0x517ba5 extends PIXI[_0x285c62(0x341)] {
    ["redraw"](_0x17ae0d, _0x1af78f) {
      const _0x5b10a3 = _0x285c62;
      this[_0x5b10a3(0x216)][_0x5b10a3(0x400)]();
      const _0x3d8875 = -Math["PI"] / 0x2;
      this["beginFill"](0x0, 0x0),
        this[_0x5b10a3(0x317)](
          _0x1af78f,
          _0x1af78f,
          _0x1af78f,
          _0x3d8875,
          Math["PI"] * _0x17ae0d * 0x2 + _0x3d8875
        ),
        this[_0x5b10a3(0x39f)]();
    }
  }
  class _0x37d09c extends _0x517ba5 {
    constructor(_0x22f111) {
      super(), (this["_radius"] = _0x22f111);
    }
    [_0x285c62(0x260)](_0x31c477, _0x5ec99a, _0x4a7f0b) {
      _0x31c477["addLoadListener"]((_0x17807e) => {
        const _0x37ade0 = _0x2a75,
          _0x295f40 = new PIXI["Texture"](_0x17807e[_0x37ade0(0x43b)]);
        (this[_0x37ade0(0x41c)] = _0x295f40),
          this["lineTextureStyle"]({
            texture: _0x295f40,
            width: _0x5ec99a,
            color: _0x4a7f0b,
          });
      });
    }
    [_0x285c62(0x407)](_0x19c5f5) {
      const _0x2f7360 = _0x285c62;
      this[_0x2f7360(0x344)](_0x19c5f5, this[_0x2f7360(0x3f2)]);
    }
  }
  function _0x56469e(_0x2090ec) {
    const _0x1b26bb = _0x285c62;
    return {
      left: _0x2090ec["x"],
      top: _0x2090ec["y"],
      right: _0x2090ec["x"] + _0x2090ec["width"],
      bottom: _0x2090ec["y"] + _0x2090ec[_0x1b26bb(0x39c)],
    };
  }
  class _0x53ddc4 extends PIXI[_0x285c62(0x408)] {
    constructor(_0x328e7c) {
      const _0x26b447 = _0x285c62;
      super(),
        (this[_0x26b447(0x372)] = new Rectangle(0x0, 0x0, 0x0, 0x0)),
        (this["y"] = -0x1e240),
        (this["_behaviorList"] = _0x328e7c),
        (this[_0x26b447(0x250)] = _0x328e7c[_0x26b447(0x3e5)]()),
        this["calcSize"](),
        this["addChild"](...this[_0x26b447(0x250)]);
    }
    get [_0x285c62(0x20b)]() {
      const _0x3bfe7e = _0x285c62;
      return this[_0x3bfe7e(0x2f3)];
    }
    get [_0x285c62(0x39c)]() {
      const _0x465f5e = _0x285c62;
      return this[_0x465f5e(0x23b)];
    }
    [_0x285c62(0x439)]() {
      const _0x56faa9 = _0x285c62;
      if (this[_0x56faa9(0x250)][_0x56faa9(0x282)] <= 0x0) {
        (this[_0x56faa9(0x2f3)] = 0x0), (this[_0x56faa9(0x23b)] = 0x0);
        return;
      }
      const _0x4da7ce = this[_0x56faa9(0x250)][0x0],
        _0x193945 = _0x56469e(_0x4da7ce);
      for (
        let _0x3e4216 = 0x1;
        _0x3e4216 < this["_buttonsSprites"]["length"];
        _0x3e4216++
      ) {
        const _0x14f81d = _0x56469e(this["_buttonsSprites"][_0x3e4216]);
        (_0x193945[_0x56faa9(0x289)] = Math[_0x56faa9(0x261)](
          _0x193945[_0x56faa9(0x289)],
          _0x14f81d[_0x56faa9(0x289)]
        )),
          (_0x193945[_0x56faa9(0x1f4)] = Math[_0x56faa9(0x2d2)](
            _0x193945[_0x56faa9(0x1f4)],
            _0x14f81d["right"]
          )),
          (_0x193945[_0x56faa9(0x380)] = Math[_0x56faa9(0x261)](
            _0x193945[_0x56faa9(0x380)],
            _0x14f81d[_0x56faa9(0x380)]
          )),
          (_0x193945[_0x56faa9(0x38b)] = Math[_0x56faa9(0x2d2)](
            _0x193945["bottom"],
            _0x14f81d[_0x56faa9(0x38b)]
          ));
      }
      (this[_0x56faa9(0x2f3)] = Math[_0x56faa9(0x34b)](
        _0x193945["left"] - _0x193945["right"]
      )),
        (this[_0x56faa9(0x23b)] = Math[_0x56faa9(0x34b)](
          _0x193945[_0x56faa9(0x380)] - _0x193945[_0x56faa9(0x38b)]
        ));
    }
    [_0x285c62(0x35a)]() {
      const _0x28ffe2 = _0x285c62;
      return this[_0x28ffe2(0x250)][_0x28ffe2(0x25a)]((_0x1b8fe3) => {
        const _0x3bb4a7 = _0x28ffe2;
        return _0x1b8fe3[_0x3bb4a7(0x3ee)]();
      });
    }
    ["updateInput"]() {
      const _0x1bfb36 = _0x285c62;
      for (const _0x26d3e2 of this[_0x1bfb36(0x250)]) {
        _0x26d3e2[_0x1bfb36(0x227)]();
      }
    }
    [_0x285c62(0x246)]() {
      const _0x4a73ba = _0x285c62;
      this[_0x4a73ba(0x3a0)] = !this[_0x4a73ba(0x3fa)][_0x4a73ba(0x44d)]();
      for (const _0x326561 of this["_buttonsSprites"]) {
        _0x326561[_0x4a73ba(0x246)]();
      }
    }
    [_0x285c62(0x204)]() {}
    ["movementAmountOfChoice"](_0xef6852) {
      return 0x0;
    }
    [_0x285c62(0x3cb)](_0x332f58) {}
    [_0x285c62(0x318)]() {
      return 0x0;
    }
  }
  class _0x2898bb extends _0x53ddc4 {
    [_0x285c62(0x318)]() {
      return this["height"] - 0x10;
    }
    [_0x285c62(0x3cb)](_0x3d28d1) {
      const _0x1fff0b = _0x285c62,
        _0x560558 =
          this[_0x1fff0b(0x1fa)][_0x1fff0b(0x20b)] - this[_0x1fff0b(0x20b)],
        _0x32e03b =
          this[_0x1fff0b(0x1fa)][_0x1fff0b(0x39c)] - this[_0x1fff0b(0x39c)];
      (this["x"] = _0x560558 + this[_0x1fff0b(0x3fa)]["offsetX"]()),
        (this["y"] = _0x32e03b + this[_0x1fff0b(0x3fa)][_0x1fff0b(0x2b1)]());
    }
  }
  class _0x355362 extends _0x53ddc4 {
    [_0x285c62(0x3cb)](_0x471ace) {
      const _0x2c658f = _0x285c62,
        _0x59aa09 = this[_0x2c658f(0x1fa)][_0x2c658f(0x20b)] - this["width"],
        _0x57a397 =
          _0x471ace === 0x0
            ? this[_0x2c658f(0x1fa)]["height"]
            : -this[_0x2c658f(0x39c)];
      (this["x"] = _0x59aa09 + this[_0x2c658f(0x3fa)]["offsetX"]()),
        (this["y"] = _0x57a397 + this[_0x2c658f(0x3fa)]["offsetY"]());
    }
    [_0x285c62(0x3a3)](_0x59abfb) {
      if (_0x59abfb === 0x1) return 0x0;
      if (_0x59abfb === 0x2) return -this["height"];
      return this["height"];
    }
  }
  class _0x32509b extends _0x53ddc4 {
    constructor(_0x3318c9) {
      super(_0x3318c9);
    }
    [_0x285c62(0x3cb)](_0x53316e) {
      const _0x19c863 = _0x285c62;
      (this[_0x19c863(0x3a0)] = _0x53316e === 0x2),
        (this["x"] =
          this[_0x19c863(0x3fa)][_0x19c863(0x306)]() - this["parent"]["x"]),
        (this["y"] =
          this[_0x19c863(0x3fa)]["offsetY"]() - this[_0x19c863(0x1fa)]["y"]);
    }
  }
  const _0x5028a2 = Window_ChoiceList[_0x285c62(0x213)]["updatePlacement"];
  Window_ChoiceList["prototype"][_0x285c62(0x3cb)] = function () {
    const _0x13ef24 = _0x285c62;
    _0x5028a2["call"](this);
    if ($gameMessage["choicePositionType"]() === 0x2) {
      const _0x1fc7d7 = this[_0x13ef24(0x2e1)][_0x13ef24(0x44c)]();
      this["y"] += _0x1fc7d7;
    }
  };
  const _0x373f07 = Window_Message["prototype"][_0x285c62(0x35b)];
  Window_Message[_0x285c62(0x213)][_0x285c62(0x35b)] = function (_0x35136f) {
    const _0x2eb186 = _0x285c62;
    this["_logButtonGroop"] = null;
    if (!_0x570b0c[_0x2eb186(0x3ed)]()) {
      _0x373f07["call"](this, _0x35136f);
      return;
    }
    const _0x269d5a = _0x35136f[_0x2eb186(0x2f8)](),
      _0x9863ae = _0x570b0c[_0x2eb186(0x378)]();
    (this[_0x2eb186(0x2a0)] = _0x9863ae),
      (_0x269d5a[_0x2eb186(0x39c)] += _0x9863ae[_0x2eb186(0x318)]()),
      _0x373f07[_0x2eb186(0x2b0)](this, _0x269d5a),
      this[_0x2eb186(0x316)](_0x9863ae);
  };
  function _0x35f3ad(_0x5f2f3f) {
    const _0x3be5b6 = _0x285c62;
    return _0x5f2f3f[_0x3be5b6(0x2a0)];
  }
  Window_Message[_0x285c62(0x213)][_0x285c62(0x44c)] = function () {
    const _0x50aa05 = _0x285c62,
      _0x16a048 = _0x35f3ad(this);
    if (_0x16a048) return _0x16a048[_0x50aa05(0x3a3)](this[_0x50aa05(0x3f7)]);
    return 0x0;
  };
  const _0x39e472 = Window_Message[_0x285c62(0x213)][_0x285c62(0x353)];
  Window_Message[_0x285c62(0x213)][_0x285c62(0x353)] = function () {
    const _0x5b3585 = _0x285c62,
      _0x2f59e1 = _0x39e472[_0x5b3585(0x2b0)](this),
      _0x4fa98c = _0x35f3ad(this);
    if (_0x4fa98c) return _0x2f59e1 - _0x4fa98c[_0x5b3585(0x318)]();
    return _0x2f59e1;
  };
  const _0x1d4f46 = Window_Message["prototype"][_0x285c62(0x232)];
  Window_Message[_0x285c62(0x213)]["newPage"] = function (_0x34017e) {
    const _0x32c536 = _0x285c62,
      _0x4f7f9f = this[_0x32c536(0x42c)](),
      _0x4248eb = Math["round"](
        this[_0x32c536(0x38f)]["outputHeight"] / _0x4f7f9f
      );
    _0x570b0c[_0x32c536(0x403)](Math[_0x32c536(0x261)](_0x4248eb, 0x4)),
      _0x1d4f46[_0x32c536(0x2b0)](this, _0x34017e);
  };
  const _0x5a1ac0 = Window_Message[_0x285c62(0x213)]["onEndOfText"];
  Window_Message[_0x285c62(0x213)]["onEndOfText"] = function () {
    const _0x1b688a = _0x285c62,
      _0x5d063e = this["lineHeight"](),
      _0x33b038 = Math[_0x1b688a(0x308)](
        this[_0x1b688a(0x38f)]["outputHeight"] / _0x5d063e
      );
    _0x570b0c[_0x1b688a(0x403)](Math[_0x1b688a(0x261)](_0x33b038, 0x4)),
      _0x570b0c[_0x1b688a(0x29a)](),
      _0x5a1ac0[_0x1b688a(0x2b0)](this);
  };
  const _0x2889f1 = Window_Message[_0x285c62(0x213)]["startMessage"];
  Window_Message[_0x285c62(0x213)]["startMessage"] = function () {
    const _0x597900 = _0x285c62;
    _0x2889f1[_0x597900(0x2b0)](this);
    const _0x3551df = _0x35f3ad(this);
    if (_0x3551df) {
      _0x570b0c[_0x597900(0x361)]() && (this["_showFast"] = !![]);
      const _0x360be9 = this[_0x597900(0x31e)][_0x597900(0x2f7)](
        $gameMessage["speakerName"]()
      );
      _0x570b0c[_0x597900(0x246)](
        _0x360be9,
        this["_textState"][_0x597900(0x2cf)]
      ),
        _0x3551df[_0x597900(0x246)]();
    }
  };
  const _0x4c4f7e = Window_Message[_0x285c62(0x213)][_0x285c62(0x295)];
  Window_Message[_0x285c62(0x213)][_0x285c62(0x295)] = function () {
    const _0x2ebfa2 = _0x285c62;
    _0x570b0c[_0x2ebfa2(0x322)](),
      _0x4c4f7e[_0x2ebfa2(0x2b0)](this),
      _0x570b0c["refreshAutoKeeping"]();
  };
  const _0x2e43b3 = Window_Message["prototype"][_0x285c62(0x3cb)];
  Window_Message["prototype"]["updatePlacement"] = function () {
    const _0x189c3c = _0x285c62;
    _0x2e43b3[_0x189c3c(0x2b0)](this);
    const _0x81ecb3 = _0x35f3ad(this);
    _0x81ecb3 && _0x81ecb3["updatePlacement"](this["_positionType"]);
  };
  function _0x4714e8(_0x5be741) {
    const _0x447faf = _0x285c62;
    return _0x5be741[_0x447faf(0x2b6)]() && !_0x5be741["isClosing"]();
  }
  function _0x10bab5(_0x2a243) {
    const _0x4c822c = _0x285c62;
    if ($gameParty["inBattle"]()) return;
    _0x570b0c[_0x4c822c(0x3ff)](), _0x2a243 && _0x2a243["updateInput"]();
  }
  const _0x314ad5 = Window_Message[_0x285c62(0x213)]["updateInput"];
  Window_Message[_0x285c62(0x213)][_0x285c62(0x3ff)] = function () {
    const _0x476a99 = _0x285c62;
    !this[_0x476a99(0x38f)] && _0x4714e8(this) && _0x10bab5(_0x35f3ad(this));
    const _0x31c130 = this["pause"],
      _0x5d5193 = _0x314ad5[_0x476a99(0x2b0)](this);
    if (!this[_0x476a99(0x285)]) return _0x5d5193;
    if (!_0x570b0c[_0x476a99(0x376)]()) return _0x5d5193;
    !_0x31c130 && _0x570b0c[_0x476a99(0x354)]();
    _0x570b0c["updateAutoTimer"]();
    if (_0x570b0c[_0x476a99(0x2d8)]())
      return (
        _0x570b0c[_0x476a99(0x2b2)](),
        (this[_0x476a99(0x285)] = ![]),
        (this[_0x476a99(0x38f)] = null),
        this[_0x476a99(0x295)](),
        ![]
      );
    return !![];
  };
  const _0x16e130 = Window_Message["prototype"]["isTriggered"];
  Window_Message["prototype"][_0x285c62(0x27f)] = function () {
    const _0x38c7ce = _0x285c62,
      _0x207b26 = _0x35f3ad(this);
    if (
      _0x207b26 &&
      TouchInput[_0x38c7ce(0x300)]() &&
      _0x207b26[_0x38c7ce(0x35a)]()
    )
      return ![];
    return _0x16e130["call"](this);
  };
  const _0x5a7a8b = Scene_Map[_0x285c62(0x213)]["createDisplayObjects"];
  Scene_Map[_0x285c62(0x213)][_0x285c62(0x2dc)] = function () {
    const _0x34d049 = _0x285c62;
    _0x570b0c["setBattleMode"](![]),
      _0x5a7a8b[_0x34d049(0x2b0)](this),
      _0x570b0c[_0x34d049(0x361)]() &&
        (this["_messageWindow"]["openness"] = 0xff);
  };
  const _0x38c3e1 = Scene_Battle[_0x285c62(0x213)][_0x285c62(0x2dc)];
  Scene_Battle["prototype"][_0x285c62(0x2dc)] = function () {
    const _0x21ffb2 = _0x285c62;
    _0x570b0c["setBattleMode"](!![]), _0x38c3e1[_0x21ffb2(0x2b0)](this);
  };
  const _0x5a5b3c = Game_Map[_0x285c62(0x213)][_0x285c62(0x42f)];
  Game_Map[_0x285c62(0x213)]["setupStartingMapEvent"] = function () {
    const _0x4e7c49 = _0x285c62,
      _0x24f6a6 = _0x5a5b3c["call"](this);
    if (_0x24f6a6) {
      const _0x4cbabb = this[_0x4e7c49(0x3c0)][_0x4e7c49(0x1fd)](),
        _0x5946dd = this[_0x4e7c49(0x394)](_0x4cbabb);
      _0x5946dd &&
        _0x570b0c[_0x4e7c49(0x388)](_0x5946dd, this[_0x4e7c49(0x37a)]);
    }
    return _0x24f6a6;
  };
  const _0x1388b0 = Game_Map[_0x285c62(0x213)][_0x285c62(0x417)];
  Game_Map["prototype"][_0x285c62(0x417)] = function () {
    const _0x458a70 = _0x285c62,
      _0x350d5b = this[_0x458a70(0x3c0)]["isRunning"]();
    _0x1388b0[_0x458a70(0x2b0)](this),
      _0x350d5b &&
        !this[_0x458a70(0x3c0)][_0x458a70(0x2c5)]() &&
        _0x570b0c["onEndEvent"]();
  };
  const _0x35f0f3 = Window_MenuCommand[_0x285c62(0x213)]["addOriginalCommands"];
  Window_MenuCommand[_0x285c62(0x213)][_0x285c62(0x40f)] = function () {
    const _0x3800e4 = _0x285c62;
    _0x35f0f3["call"](this);
    const _0x3f287c = _0x570b0c[_0x3800e4(0x433)]()[_0x3800e4(0x2de)](),
      _0xdb7356 = _0x3f287c["commandName"]["text"]();
    _0xdb7356 && this["addCommand"](_0xdb7356, _0x3f287c[_0x3800e4(0x40b)]);
  };
  const _0x4ec7f4 = Scene_Menu[_0x285c62(0x213)][_0x285c62(0x2d0)];
  Scene_Menu[_0x285c62(0x213)]["createCommandWindow"] = function () {
    const _0x1b20a8 = _0x285c62;
    _0x4ec7f4[_0x1b20a8(0x2b0)](this);
    const _0x2bf3f5 = _0x570b0c[_0x1b20a8(0x433)]()["menuCommand"]();
    this[_0x1b20a8(0x423)][_0x1b20a8(0x22c)](
      _0x2bf3f5[_0x1b20a8(0x40b)],
      () => {
        const _0x3717eb = _0x1b20a8;
        SceneManager[_0x3717eb(0x314)](_0xd6acc9);
      }
    );
  };
  class _0x50ac4b {
    constructor(_0x4d97c6, _0x5d082c, _0x27df7f) {
      const _0x568603 = _0x285c62;
      (this[_0x568603(0x2e0)] = _0x4d97c6),
        (this[_0x568603(0x3ea)] = _0x5d082c),
        (this[_0x568603(0x25d)] = _0x27df7f);
    }
    [_0x285c62(0x287)](_0x34122f) {
      const _0x517f18 = _0x285c62,
        _0x5075f0 = {},
        _0x5b1327 = Math[_0x517f18(0x261)](
          _0x34122f["length"],
          this["_paramNames"][_0x517f18(0x282)]
        );
      for (let _0x2edf95 = 0x0; _0x2edf95 < _0x5b1327; ++_0x2edf95) {
        const _0x1542bf = this["_paramNames"][_0x2edf95];
        _0x5075f0[_0x1542bf] = _0x34122f[_0x2edf95];
      }
      return _0x5075f0;
    }
    [_0x285c62(0x2a1)](_0x3b8d7e) {
      const _0x361e59 = _0x285c62,
        _0x235537 = this[_0x361e59(0x287)](_0x3b8d7e);
      this["callMZ"](_0x235537);
    }
    [_0x285c62(0x1f8)](_0x50df88) {
      this["_func"](_0x50df88);
    }
  }
  class _0x5b16e8 {
    constructor(_0x28e8fc) {
      const _0x5611d0 = _0x285c62;
      (this[_0x5611d0(0x43a)] = new Map()),
        (this[_0x5611d0(0x30d)] = _0x28e8fc);
    }
    [_0x285c62(0x1f9)](_0x424706, _0x25eaff, _0x257c43) {
      const _0x2aef71 = _0x285c62;
      Utils[_0x2aef71(0x3de)] === "MZ" &&
        this[_0x2aef71(0x419)](_0x424706, _0x257c43),
        this[_0x2aef71(0x345)]() &&
          this["registerCommandMV"](_0x424706, _0x25eaff, _0x257c43);
    }
    ["isMVcommandEnabeled"]() {
      const _0x5c0b56 = _0x285c62;
      return Utils[_0x5c0b56(0x3de)] === "MV";
    }
    ["registerCommandMZ"](_0x4df66a, _0x2fd6c8) {
      const _0x52af4c = _0x285c62;
      PluginManager[_0x52af4c(0x1f9)](
        this[_0x52af4c(0x30d)],
        _0x4df66a,
        _0x2fd6c8
      );
    }
    [_0x285c62(0x350)](_0x48df10, _0x35820a, _0x3ceabb) {
      const _0x5677d3 = new _0x50ac4b(_0x48df10, _0x35820a, _0x3ceabb);
      this["_map"]["set"](_0x48df10, _0x5677d3);
    }
    [_0x285c62(0x2d4)](_0x70ca8f, _0x5f0323, _0x20942b) {
      const _0x1c8aed = _0x285c62,
        _0x5e2d92 = this[_0x1c8aed(0x43a)][_0x1c8aed(0x355)](_0x5f0323);
      if (_0x5e2d92) {
        const _0x438355 = _0x5e2d92[_0x1c8aed(0x287)](_0x20942b);
        return _0x5e2d92[_0x1c8aed(0x1f8)](_0x438355), !![];
      }
      return ![];
    }
  }
  const _0x4e9a6b = new _0x5b16e8(_0x3bdadf);
  _0x4e9a6b["registerCommand"](_0x285c62(0x28e), [], () => {
    const _0x4d9694 = _0x285c62;
    SceneManager[_0x4d9694(0x314)](_0xd6acc9);
  }),
    _0x4e9a6b[_0x285c62(0x1f9)]("SetTitle", [], (_0x476d0a) => {
      const _0x36b668 = _0x285c62,
        _0x525e4b = String(_0x476d0a[_0x36b668(0x30f)]);
      _0x570b0c[_0x36b668(0x315)](_0x525e4b);
    }),
    _0x4e9a6b[_0x285c62(0x1f9)](_0x285c62(0x22b), [], () => {
      const _0x31d5aa = _0x285c62;
      _0x570b0c[_0x31d5aa(0x298)]();
    }),
    _0x4e9a6b["registerCommand"](_0x285c62(0x390), [], (_0x5c3b99) => {
      const _0x1ab2fd = _0x285c62;
      _0x570b0c[_0x1ab2fd(0x27d)]();
    }),
    _0x4e9a6b[_0x285c62(0x1f9)]("GetLogSize", [], (_0x275d33) => {
      const _0x133867 = _0x285c62,
        _0x38d130 = Number(_0x275d33["variableId"]),
        _0x135ad2 = _0x570b0c[_0x133867(0x207)]();
      $gameVariables[_0x133867(0x407)](_0x38d130, _0x135ad2);
    }),
    _0x4e9a6b[_0x285c62(0x1f9)](
      _0x285c62(0x30e),
      [_0x285c62(0x29f)],
      (_0x7375c7) => {
        const _0x336726 = _0x285c62;
        _0x570b0c["setAutoMode"](_0x7375c7["automode"] === _0x336726(0x418));
      }
    ),
    _0x4e9a6b[_0x285c62(0x1f9)](
      _0x285c62(0x364),
      [_0x285c62(0x29f)],
      (_0x28322c) => {
        const _0x5d0224 = _0x285c62,
          _0x28a4ca = Number(_0x28322c[_0x5d0224(0x225)]),
          _0x46b4c9 = _0x570b0c[_0x5d0224(0x42a)]();
        $gameSwitches[_0x5d0224(0x407)](_0x28a4ca, _0x46b4c9);
      }
    ),
    _0x4e9a6b[_0x285c62(0x1f9)](
      "SetJumpTarget",
      [_0x285c62(0x276)],
      function (_0x2b0f40) {
        const _0x27fa77 = _0x285c62;
        this[_0x27fa77(0x3ab)](_0x2b0f40[_0x27fa77(0x276)]);
      }
    ),
    _0x4e9a6b[_0x285c62(0x1f9)](
      _0x285c62(0x3a8),
      [_0x285c62(0x21c)],
      (_0x3594f9) => {
        const _0x4f7176 = _0x285c62,
          _0x2b9905 = Number(_0x3594f9[_0x4f7176(0x21c)]);
        $gameSwitches[_0x4f7176(0x407)](
          _0x2b9905,
          _0x570b0c[_0x4f7176(0x3f4)]()
        );
      }
    ),
    _0x4e9a6b[_0x285c62(0x1f9)](_0x285c62(0x220), [], () => {
      const _0x258216 = _0x285c62,
        _0x2d627b = _0x570b0c[_0x258216(0x44e)]()[_0x258216(0x24b)]();
      for (const _0x4fb870 of _0x2d627b) {
        console[_0x258216(0x2ea)](_0x4fb870);
      }
    }),
    _0x4e9a6b[_0x285c62(0x1f9)]("GetAutoWaitTime", [], (_0x517beb) => {
      const _0x4cd414 = _0x285c62,
        _0x2a0f1c = _0x570b0c[_0x4cd414(0x33a)]()["getAutoWaitTime"](),
        _0x119f16 = Number(_0x517beb["variableId"]);
      $gameVariables[_0x4cd414(0x407)](_0x119f16, _0x2a0f1c);
    }),
    _0x4e9a6b[_0x285c62(0x1f9)]("SetAutoWaitTime", [], (_0x272286) => {
      const _0x31597a = _0x285c62,
        _0x5eb8ae = Number(_0x272286[_0x31597a(0x387)]),
        _0x1df4de = $gameVariables[_0x31597a(0x412)](_0x5eb8ae);
      !isNaN(_0x1df4de) &&
        _0x570b0c[_0x31597a(0x33a)]()[_0x31597a(0x2a9)](_0x1df4de);
    }),
    _0x4e9a6b[_0x285c62(0x1f9)](_0x285c62(0x39b), [], (_0x1f0b80) => {
      const _0x6bdb0f = _0x285c62,
        _0x47d517 = Number(_0x1f0b80["variableId"]),
        _0x27e56f = $gameVariables[_0x6bdb0f(0x412)](_0x47d517);
      _0x570b0c["option"]()[_0x6bdb0f(0x379)](_0x27e56f);
    }),
    _0x4e9a6b[_0x285c62(0x1f9)](_0x285c62(0x35d), [], (_0xf5f44d) => {
      const _0x43de95 = _0x285c62,
        _0x4845da = Number(_0xf5f44d[_0x43de95(0x387)]),
        _0x448d84 = _0x570b0c[_0x43de95(0x33a)]()[_0x43de95(0x2d6)]();
      $gameVariables["setValue"](_0x4845da, _0x448d84);
    }),
    _0x4e9a6b["registerCommand"](_0x285c62(0x238), [], (_0x396344) => {
      const _0x11081e = _0x285c62,
        _0xe11528 = Number(_0x396344[_0x11081e(0x387)]),
        _0x5c20b2 = $gameVariables["value"](_0xe11528);
      _0x570b0c[_0x11081e(0x33a)]()["setLogLimitExtends"](_0x5c20b2);
    }),
    _0x4e9a6b["registerCommand"](_0x285c62(0x299), [], (_0x4c6d87) => {
      const _0x447634 = _0x285c62,
        _0x297280 = Number(_0x4c6d87[_0x447634(0x387)]),
        _0x38de73 = _0x570b0c["option"]()[_0x447634(0x2db)]();
      $gameVariables[_0x447634(0x407)](_0x297280, _0x38de73);
    }),
    _0x4e9a6b[_0x285c62(0x1f9)](_0x285c62(0x38d), [], (_0x1c1213) => {
      const _0x8c192a = _0x285c62,
        _0x332687 = _0x570b0c[_0x8c192a(0x33a)]()[_0x8c192a(0x3ac)](),
        _0x2e6bcf = Number(_0x1c1213[_0x8c192a(0x21c)]);
      $gameSwitches[_0x8c192a(0x407)](_0x2e6bcf, _0x332687);
    });
  const _0x674702 = "UZMSGLOG_CONFIG",
    _0x7d1f15 = ConfigManager[_0x285c62(0x321)];
  ConfigManager[_0x285c62(0x321)] = function () {
    const _0x1e5502 = _0x285c62,
      _0x41e0f8 = _0x7d1f15[_0x1e5502(0x2b0)](this),
      _0x536515 = _0x570b0c[_0x1e5502(0x43c)]();
    return (_0x41e0f8[_0x674702] = _0x536515), _0x41e0f8;
  };
  const _0x210fbd = ConfigManager["applyData"];
  ConfigManager[_0x285c62(0x326)] = function (_0x474240) {
    const _0x248b64 = _0x285c62;
    _0x210fbd["call"](this, _0x474240);
    const _0x46fe93 = _0x474240[_0x674702];
    _0x570b0c[_0x248b64(0x3e6)](_0x46fe93);
  };
  const _0x323528 = DataManager[_0x285c62(0x279)];
  DataManager[_0x285c62(0x279)] = function () {
    const _0x56f1a3 = _0x285c62,
      _0x5180b9 = _0x323528[_0x56f1a3(0x2b0)](this);
    return _0x570b0c[_0x56f1a3(0x36b)](_0x5180b9), _0x5180b9;
  };
  const _0x304321 = DataManager[_0x285c62(0x2aa)];
  DataManager[_0x285c62(0x2aa)] = function (_0x314170) {
    const _0x5ddfae = _0x285c62;
    _0x304321[_0x5ddfae(0x2b0)](this, _0x314170),
      _0x570b0c[_0x5ddfae(0x2fd)](_0x314170);
  };
  const _0x425404 = DataManager[_0x285c62(0x219)];
  DataManager[_0x285c62(0x219)] = function () {
    const _0x7d2de7 = _0x285c62;
    _0x425404["call"](this), _0x570b0c[_0x7d2de7(0x3b5)]();
  };
  const _0x3ca4ae = DataManager[_0x285c62(0x33b)];
  DataManager[_0x285c62(0x33b)] = function () {
    const _0x5afa56 = _0x285c62;
    _0x3ca4ae[_0x5afa56(0x2b0)](this), _0x570b0c[_0x5afa56(0x279)]();
  };
  const _0x3cd7bc = Scene_Boot[_0x285c62(0x213)][_0x285c62(0x3e3)];
  Scene_Boot["prototype"]["start"] = function () {
    const _0x474b8f = _0x285c62;
    _0x3cd7bc["call"](this),
      _0x277f4c[_0x474b8f(0x20c)](),
      _0x570b0c[_0x474b8f(0x2da)]();
  };
  function _0x29fd4e(_0x281b09, _0x48c6eb) {
    window[_0x48c6eb] = _0x281b09;
  }
  const _0x29a1ad = [_0x3769ee, _0x55b263, _0x52a5b6, _0x31d482];
  for (const _0xb48b7d of _0x29a1ad) {
    _0x29fd4e(_0xb48b7d, _0xb48b7d[_0x285c62(0x2a6)]);
  }
  return new _0x1c93ed(_0x570b0c);
})();
