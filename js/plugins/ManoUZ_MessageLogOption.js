/*:
 * @plugindesc メッセージログにオプションを追加
 * @author しぐれん
 *
 * @target MZ
 *
 * @command OpenScene
 * @text オプション画面を開く/OpenScene
 *
 *
 * @param textON
 * @default ON
 *
 * @param textOFF
 * @default OFF
 *
 * @param logLimitBasic
 * @text 基本のログ保持数
 * @desc 古いログを掃除する際に、ここで指定した個数以下にします。
 * @type number
 * @default 80
 *
 * @param logLimitBasicText
 * @default ログの保持数(基本)
 * @parent logLimitBasic
 *
 * @param logLimitBasicHelp
 * @default セーブデータの大きさに影響します。
 * @parent logLimitBasic
 *
 * @param logLimitBasicItemList
 * @type struct<EnumItem>[]
 * @default ["{\"text\":\"少ない\",\"value\":\"50\"}","{\"text\":\"標準\",\"value\":\"80\"}","{\"text\":\"多い\",\"value\":\"150\"}","{\"text\":\"とても多い\",\"value\":\"200\"}"]
 * @parent logLimitBasic
 *
 * @param logLimitExtendsText
 * @default ログの保持数(追加)
 *
 * @param logLimitExtendsHelp
 * @default メモリの消費量に影響します。
 * @parent logLimitBasic
 *
 * @param logLimitExtends
 * @text 追加のログ保持数(初期値)
 * @desc 保存されたログが基本＋追加を超えた場合、
 * 古いログの破棄を行います。
 * @type number
 * @default 100
 *
 * @param logLimitExtendsItemList
 * @desc 設定変更用の項目です。
 * @type struct<EnumItem>[]
 * @default ["{\"text\":\"少ない\",\"value\":\"20\"}","{\"text\":\"普通\",\"value\":\"50\"}","{\"text\":\"多い\",\"value\":\"80\"}"]
 * @parent logLimitExtends
 *
 * @param autoWaitTime
 * @type number
 * @default 240
 *
 * @param autoWaitTimeText
 * @text 自動テキスト送り待機
 * @default オート待ち時間
 * @parent autoWaitTime
 *
 * @param autoWaitTimeHelp
 * @text ヘルプ文章
 * @default 文章表示完了後の待機時間です。
 * @parent autoWaitTime
 *
 * @param autoWaitTimeItemList
 * @type struct<EnumItem>[]
 * @default ["{\"text\":\"短い\",\"value\":\"180\"}","{\"text\":\"標準\",\"value\":\"360\"}","{\"text\":\"長い\",\"value\":\"480\"}","{\"text\":\"とても長い\",\"value\":\"600\"}"]
 * @parent autoWaitTime
 *
 * @param gaugeColorText
 * @type string
 * @default ゲージ色
 *
 * @param gaugeColorHelp
 * @type string
 * @default オート待ち時間の間に表示するゲージの色。
 * @parent gaugeColorText
 *
 *
 * @param gaugeColorItemListOld
 * @type number[]
 * @desc 数値指定です。
 * 各自で16進数を10進数に変換して設定します。
 * @default ["13181999","12674371","8104783","3050327","45797","20362","16628736"]
 * @parent gaugeColorText
 *
 *
 * @param keepAutoMode
 * @default オートモードを保持
 *
 * @param keepAutoModeHelp
 * @default 会話終了後もオートモードを維持します。
 * @parent keepAutoMode
 *
 * @param machinkaMode
 * @default 街中モード行数
 *
 *
 *
 * @help
 * ManoUZ_MessageLogにオプション機能を取り付けます。
 *
 * 数値を直接変更するプラグインコマンドは本体側にあります。
 *
 */
/*~struct~EnumItem:
 * @param text
 * @type string
 *
 * @param value
 * @type number
 * @default 0
 */

/*~struct~OptionXXXX:

 * @param optionName
 * @type string
 * 
 * @param helpText

 * @param itemList
 * @default []
*/

(function () {
  "use strict";
  /**
   * @typedef {ManoUZ_LogOptionParametor} OptionParametor
   */
  /**
   * @type {String}
   */

  const PLUGIN_NAME = "ManoUZ_MessageLogOption";
  function getParam() {
    return PluginManager.parameters(PLUGIN_NAME);
  }

  function getOption() {
    return ManoUZ_MessageLog.cloneOptionValue();
  }
  /**
   * @param {OptionParametor} option
   */
  function setOption(option) {
    ManoUZ_MessageLog.setOptionValue(option);
  }

  class Option_ItemBase {
    /**
     *
     * @param {string} key
     */
    constructor(key) {
      this._key = key;
      //        this._index=0;
    }
    helpText() {
      return "";
    }
    key() {
      return this._key;
    }

    name() {
      return "";
    }
    /**
     * @param {number} index
     * @returns
     */
    text(index) {
      return "";
    }
    /**
     *
     * @param {number} index
     * @returns
     */
    textColor(index) {
      return ColorManager.normalColor();
    }
    /**
     * @param {number} value
     * @returns
     */
    indexOf(value) {
      const maxItems = this.maxItems();
      for (let i = 0; i < maxItems; ++i) {
        const vv = this.value(i);
        if (vv === value) {
          return i;
        }
      }
      return 0;
    }
    maxItems() {
      return 1;
    }
    /**
     * @returns {number}
     * @param {number} _index
     */
    value(_index) {
      return 0;
    }
  }
  /**
   * @typedef {object} ValueTextPair
   * @property {number} value
   * @property {string} text
   */

  class OptionItemEnum extends Option_ItemBase {
    /**
     * @param {string} key
     * @param {string} name
     * @param {string} help
     * @param {number} defaultValue
     * @param {ValueTextPair[]} list
     */
    constructor(key, name, help, defaultValue, list) {
      super(key);
      this._defaultValue = defaultValue;
      this._name = name;
      this._list = list;
      this._helpText = help;
    }
    /**
     * @param {string} key
     * @param {string} name
     * @param {string} helpText
     * @param {number} defaultValue
     * @param {string} listText
     */
    static create(key, name, helpText, defaultValue, listText) {
      /**
       * @type {string[]}
       */
      const listObj = JSON.parse(listText || "[]");

      return new OptionItemEnum(
        key,
        name,
        helpText,
        defaultValue,
        listObj.map((text) => {
          const obj = JSON.parse(text);
          return {
            text: obj.text,
            value: Number(obj.value),
          };
        })
      );
    }
    helpText() {
      return this._helpText;
    }
    name() {
      return this._name;
    }
    maxItems() {
      return this._list.length;
    }
    /**
     * @param {number} index
     * @returns
     */
    text(index) {
      const item = this._list[index];
      if (item) {
        return item.text;
      }
      return "";
    }
    /**
     *
     * @param {number} index
     */
    value(index) {
      const item = this._list[index];
      if (item) {
        return item.value;
      }
      return 0;
    }
  }
  /**
   * @param {string} key
   * @param {string} name
   * @param {string} helpText
   * @param {number} defaultValue
   * @param {string} listText
   */
  function createEnumOption(key, name, helpText, defaultValue, listText) {
    return OptionItemEnum.create(
      key,
      String(name),
      helpText,
      Number(defaultValue),
      listText
    );
  }

  class OptionItem_Boolean extends Option_ItemBase {
    /**
     * @param {string} key
     * @param {string} name
     * @param {string} helpText
     */
    constructor(key, name, helpText) {
      super(key);
      this._name = name;
      this._helpText = helpText;
    }
    helpText() {
      return this._helpText;
    }
    name() {
      return this._name;
    }
    /**
     * @param {number} index
     * @returns
     */
    value(index) {
      return index;
    }
    /**
     * @param {number} index
     * @returns
     */
    text(index) {
      return !!index ? "OFF" : "ON";
    }
    maxItems() {
      return 2;
    }
  }

  class OptionItem_Number extends Option_ItemBase {
    /**
     * @param {string} name
     * @param {string} key
     * @param {number} min
     * @param {number} max
     */
    constructor(name, key, min, max) {
      super(key);
      this._min = min;
      this._max = max;
      this._name = name;
    }
    name() {
      return this._name;
    }
    /**
     * @param {number} index
     * @returns
     */
    text(index) {
      return this.value(index).toString();
    }
    maxItems() {
      return this._max - this._min;
    }
    /**
     *
     * @param {number} index
     * @returns
     */
    value(index) {
      return index + this._min;
    }
  }

  class OptionItemColorSelect extends Option_ItemBase {
    /**
     * @param {string} name
     * @param {string} help
     * @param {number[]} colorList
     */
    constructor(name, help, colorList) {
      super("color");
      this._name = name;
      this._help = help;
      this._colorList = colorList;
    }
    helpText() {
      return this._help;
    }
    name() {
      return this._name;
    }
    text() {
      return "████";
    }
    /**
     * @param {number} index
     * @returns
     */
    textColor(index) {
      const color = this.value(index);
      const _0x = color.toString(16);
      const zzz = _0x.padStart(6, "0");

      return `#${zzz}`;
    }
    maxItems() {
      return this._colorList.length;
    }
    /**
     *
     * @param {number} index
     * @returns
     */
    value(index) {
      return this._colorList[index];
    }
  }

  /**
   * @template {Option_ItemBase} OptionItemType
   */
  class OptionItemCase {
    /**
     *
     * @param {OptionItemType} obj
     * @param {(opt:OptionParametor)=>number} optionReadFunc
     *
     */
    constructor(obj, optionReadFunc) {
      this._index = 0;
      this._item = obj;
      this._readFunc = optionReadFunc;
    }
    /**
     * @param {OptionParametor} option
     */
    readIndex(option) {
      const value = this._readFunc(option);
      this._index = this._item.indexOf(value);
    }
    helpText() {
      return this._item.helpText();
    }
    name() {
      return this._item.name();
    }
    text() {
      return this._item.text(this._index);
    }
    textColor() {
      return this._item.textColor(this._index);
      //return ColorManager.normalColor();
    }
    changePrev() {
      if (this._index > 0) {
        this._index -= 1;
        return true;
      }
      return false;
    }
    changeNext() {
      if (this._index + 1 < this._item.maxItems()) {
        this._index += 1;
        return true;
      }
      return false;
    }
    /**
     * @returns {OptionItemType | Option_ItemBase}
     */
    item() {
      return this._item;
    }
    maxItems() {
      return this._item.maxItems();
    }
    value() {
      return this._item.value(this._index);
    }
    /**
     * @param {number} value
     */
    selectValue(value) {
      const index = this._item.indexOf(value);
      this._index = index;
    }
  }
  //TODO:mapを使って格納しておく
  //indexはWindow側で持つ

  class OptionXXXV2 {
    /**
     *
     * @param {Option_ItemBase[]} list
     */
    constructor(list) {
      /**
       * @type {Map<string,OptionItemCase< Option_ItemBase > >}
       */
      this._map = new Map();
      this.addItem(setting.logLimitBasic, (opt) => opt.logLimitBasic);
      this.addItem(setting.logLimitExtends, (opt) => opt.logLimitExtends);
      this.addItem(setting.autoSpeed, (opt) => opt.autoWaitTime);
      this.addItem(setting.keepAutoMode, (opt) =>
        opt.keepingAutoMode ? 1 : 0
      );
      this.addItem(setting.colorList, (opt) => opt.gaugeColor);
      this.addItem(setting.machinaka, (opt) => opt.machinakaLines);
    }
    /**
     *
     * @param {string} key
     */
    getValue(key) {
      const item = this._map.get(key);
      if (item) {
        return item.value();
      }
      return 0;
    }

    /**
     * @returns {ManoUZ_LogOptionParametor}
     *
     */
    createOption() {
      return {
        autoWaitTime: this.getValue(setting.autoSpeed.key()),
        logLimitBasic: this.getValue(setting.logLimitBasic.key()),
        logLimitExtends: this.getValue(setting.logLimitExtends.key()),
        keepingAutoMode: this.getValue(setting.keepAutoMode.key()) !== 0,
        gaugeColor: this.getValue(setting.colorList.key()),
        machinakaLines: this.getValue(setting.machinaka.key()),
      };
    }

    /**
     * @private
     * @param {Option_ItemBase} item
     * @param {(option:OptionParametor)=>number} func
     */
    addItem(item, func) {
      const key = item.key();
      this._map.set(key, new OptionItemCase(item, func));
    }
    /**
     *
     * @param {OptionParametor} option
     */
    setOption(option) {
      for (const iterator of this._map.values()) {
        iterator.readIndex(option);
      }
    }
    /**
     * @returns
     */
    createKeyList() {
      return Array.from(this._map.keys());
    }
    /**
     * @param {string} key
     * @returns {OptionItemCase<Option_ItemBase>}
     */
    getItem(key) {
      return this._map.get(key);
    }
  }

  const setting = (function () {
    const param = getParam();
    const logLimitBasic = createEnumOption(
      "logbasic",
      param.logLimitBasicText,
      param.logLimitBasicHelp || "",
      Number(param.logLimitBasic),
      param.logLimitBasicItemList || "[]"
    );

    const logLimitExtends = createEnumOption(
      "logextends",
      param.logLimitExtendsText,
      param.logLimitExtendsHelp || "",
      Number(param.logLimitExtends),
      param.logLimitExtendsItemList || "[]"
    );

    const autoSpeed = createEnumOption(
      "autospeed",
      param.autoWaitTimeText,
      param.autoWaitTimeHelp,
      Number(param.autoWaitTime),
      param.autoWaitTimeItemList || "[]"
    );

    /**
     * @type {String[]}
     */
    const colorArray = JSON.parse(param.gaugeColorItemListOld);
    const colorList = new OptionItemColorSelect(
      param.gaugeColorText,
      param.gaugeColorHelp,
      colorArray.map((c) => Number(c))
    );
    const keepAutoMode = new OptionItem_Boolean(
      "autokeep",
      param.keepAutoMode,
      param.keepAutoModeHelp
    );

    const machinaka = new OptionItem_Number(
      param.machinkaMode,
      ",machinaka",
      1,
      9
    );

    const result = {
      logLimitBasic,
      logLimitExtends,
      colorList,
      autoSpeed,
      keepAutoMode,
      machinaka,
    };
    return result;
  })();

  class Window_LogOption extends Window_Selectable {
    /**
     * @param {Rectangle} rect
     */
    constructor(rect) {
      super(rect);
      this._xxxx = new OptionXXXV2(setting.itemList);
      this._list = this._xxxx.createKeyList();
    }
    /**
     *
     * @param {ManoUZ_LogOptionParametor} value
     */
    setOption(value) {
      this._xxxx.setOption(value);
      this.refresh();
    }
    /**
     *  @returns {ManoUZ_LogOptionParametor}
     */
    createOption() {
      return this._xxxx.createOption();
    }
    maxItems() {
      if (this._list) {
        return this._list.length;
      }
      return 0;
    }
    changeNextValue() {
      const index = this.index();
      const key = this._list[index];
      const item = this._xxxx.getItem(key);
      if (item) {
        if (item.changeNext()) {
          this.playCursorSound();
          this.redrawItem(index);
        }
      }
    }
    changePrevValue() {
      const index = this.index();
      const key = this._list[index];
      const item = this._xxxx.getItem(key);
      if (item) {
        if (item.changePrev()) {
          this.playCursorSound();
          this.redrawItem(index);
        }
      }
    }
    cursorLeft() {
      this.changePrevValue();
    }
    cursorRight() {
      this.changeNextValue();
    }

    /**
     *
     * @param {OptionItemCase<Option_ItemBase>} item
     * @param {Rectangle} rect
     */
    drawItemText(item, rect) {
      const color = item.textColor();
      this.changeTextColor(color);
      this.drawText(item.text(), rect.x, rect.y, rect.width, "right");
    }
    /**
     * @param {number} index
     */
    itemAt(index) {
      const key = this._list[index];
      if (!key) {
        return null;
      }
      return this._xxxx.getItem(key);
    }
    /**
     * @param {number} index
     */
    drawItem(index) {
      const item = this.itemAt(index);
      if (item) {
        const rect = this.itemRectWithPadding(index);
        const nameWidth = Math.min(rect.width, 200);
        const name = item.name();
        this.drawTextEx(name, rect.x, rect.y, nameWidth);
        if (item.item() !== setting.colorList) {
          this.drawItemText(item, rect);
        } else {
          const colorRect = new Rectangle(
            rect.x + 240,
            rect.y + 2,
            rect.width - 240,
            rect.height - 4
          );
          const color = item.textColor();
          this.drawColorBar(colorRect, color);
        }
      }
    }
    /**
     * @param {Rectangle} rect
     * @param {string} color
     */
    drawColorBar(rect, color) {
      this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    }
    updateHelp() {
      const item = this.itemAt(this.index());
      if (item) {
        this._helpWindow.setText(item.helpText());
      }
    }
  }
  class Scene_MessageLogOption extends Scene_MenuBase {
    constructor() {
      super();
      this._helpWindow = null;
      this._opitonWindow = null;
    }
    create() {
      super.create();
      this.createAllWindows();
    }
    createAllWindows() {
      this.createHelpWindow();
      this.createLogOpitonWindow();
    }
    logWindowRect() {
      const x = 0;
      const y = this.mainAreaTop();
      const w = Graphics.boxWidth;
      const h = this.mainAreaHeight();
      return new Rectangle(x, y, w, h);
    }
    createLogOpitonWindow() {
      const low = new Window_LogOption(this.logWindowRect());
      low.setOption(getOption());
      low.setHandler("cancel", this.saveOption.bind(this));
      this._opitonWindow = low;
      this.addWindow(low);
      low.setHelpWindow(this._helpWindow);
      low.activate();
    }

    saveOption() {
      const value = this._opitonWindow.createOption();
      setOption(value);
      this.popScene();
    }
  }

  PluginManager.registerCommand(PLUGIN_NAME, "OpenScene", () => {
    SceneManager.push(Scene_MessageLogOption);
  });
})();
