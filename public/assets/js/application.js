var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/xterm/lib/xterm.js
var require_xterm = __commonJS((exports, module) => {
  (function(e, t) {
    if (typeof exports == "object" && typeof module == "object")
      module.exports = t();
    else if (typeof define == "function" && define.amd)
      define([], t);
    else {
      var i = t();
      for (var s in i)
        (typeof exports == "object" ? exports : e)[s] = i[s];
    }
  })(self, () => (() => {
    var e = { 4567: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.AccessibilityManager = undefined;
      const n = i2(9042), o = i2(9924), a = i2(844), h = i2(5596), c = i2(4725), l = i2(3656);
      let d = t2.AccessibilityManager = class extends a.Disposable {
        constructor(e3, t3) {
          super(), this._terminal = e3, this._renderService = t3, this._liveRegionLineCount = 0, this._charsToConsume = [], this._charsToAnnounce = "", this._accessibilityContainer = document.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = document.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
          for (let e4 = 0;e4 < this._terminal.rows; e4++)
            this._rowElements[e4] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e4]);
          if (this._topBoundaryFocusListener = (e4) => this._handleBoundaryFocus(e4, 0), this._bottomBoundaryFocusListener = (e4) => this._handleBoundaryFocus(e4, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions(), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = document.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this.register(new o.TimeBasedDebouncer(this._renderRows.bind(this))), !this._terminal.element)
            throw new Error("Cannot enable accessibility before Terminal.open");
          this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this.register(this._terminal.onResize((e4) => this._handleResize(e4.rows))), this.register(this._terminal.onRender((e4) => this._refreshRows(e4.start, e4.end))), this.register(this._terminal.onScroll(() => this._refreshRows())), this.register(this._terminal.onA11yChar((e4) => this._handleChar(e4))), this.register(this._terminal.onLineFeed(() => this._handleChar("\n"))), this.register(this._terminal.onA11yTab((e4) => this._handleTab(e4))), this.register(this._terminal.onKey((e4) => this._handleKey(e4.key))), this.register(this._terminal.onBlur(() => this._clearLiveRegion())), this.register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this._screenDprMonitor = new h.ScreenDprMonitor(window), this.register(this._screenDprMonitor), this._screenDprMonitor.setListener(() => this._refreshRowsDimensions()), this.register((0, l.addDisposableDomListener)(window, "resize", () => this._refreshRowsDimensions())), this._refreshRows(), this.register((0, a.toDisposable)(() => {
            this._accessibilityContainer.remove(), this._rowElements.length = 0;
          }));
        }
        _handleTab(e3) {
          for (let t3 = 0;t3 < e3; t3++)
            this._handleChar(" ");
        }
        _handleChar(e3) {
          this._liveRegionLineCount < 21 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e3 && (this._charsToAnnounce += e3) : this._charsToAnnounce += e3, e3 === "\n" && (this._liveRegionLineCount++, this._liveRegionLineCount === 21 && (this._liveRegion.textContent += n.tooMuchOutput)));
        }
        _clearLiveRegion() {
          this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
        }
        _handleKey(e3) {
          this._clearLiveRegion(), /\p{Control}/u.test(e3) || this._charsToConsume.push(e3);
        }
        _refreshRows(e3, t3) {
          this._liveRegionDebouncer.refresh(e3, t3, this._terminal.rows);
        }
        _renderRows(e3, t3) {
          const i3 = this._terminal.buffer, s3 = i3.lines.length.toString();
          for (let r2 = e3;r2 <= t3; r2++) {
            const e4 = i3.translateBufferLineToString(i3.ydisp + r2, true), t4 = (i3.ydisp + r2 + 1).toString(), n2 = this._rowElements[r2];
            n2 && (e4.length === 0 ? n2.innerText = "\xA0" : n2.textContent = e4, n2.setAttribute("aria-posinset", t4), n2.setAttribute("aria-setsize", s3));
          }
          this._announceCharacters();
        }
        _announceCharacters() {
          this._charsToAnnounce.length !== 0 && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
        }
        _handleBoundaryFocus(e3, t3) {
          const i3 = e3.target, s3 = this._rowElements[t3 === 0 ? 1 : this._rowElements.length - 2];
          if (i3.getAttribute("aria-posinset") === (t3 === 0 ? "1" : `${this._terminal.buffer.lines.length}`))
            return;
          if (e3.relatedTarget !== s3)
            return;
          let r2, n2;
          if (t3 === 0 ? (r2 = i3, n2 = this._rowElements.pop(), this._rowContainer.removeChild(n2)) : (r2 = this._rowElements.shift(), n2 = i3, this._rowContainer.removeChild(r2)), r2.removeEventListener("focus", this._topBoundaryFocusListener), n2.removeEventListener("focus", this._bottomBoundaryFocusListener), t3 === 0) {
            const e4 = this._createAccessibilityTreeNode();
            this._rowElements.unshift(e4), this._rowContainer.insertAdjacentElement("afterbegin", e4);
          } else {
            const e4 = this._createAccessibilityTreeNode();
            this._rowElements.push(e4), this._rowContainer.appendChild(e4);
          }
          this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(t3 === 0 ? -1 : 1), this._rowElements[t3 === 0 ? 1 : this._rowElements.length - 2].focus(), e3.preventDefault(), e3.stopImmediatePropagation();
        }
        _handleResize(e3) {
          this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
          for (let e4 = this._rowContainer.children.length;e4 < this._terminal.rows; e4++)
            this._rowElements[e4] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e4]);
          for (;this._rowElements.length > e3; )
            this._rowContainer.removeChild(this._rowElements.pop());
          this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
        }
        _createAccessibilityTreeNode() {
          const e3 = document.createElement("div");
          return e3.setAttribute("role", "listitem"), e3.tabIndex = -1, this._refreshRowDimensions(e3), e3;
        }
        _refreshRowsDimensions() {
          if (this._renderService.dimensions.css.cell.height) {
            this._accessibilityContainer.style.width = `${this._renderService.dimensions.css.canvas.width}px`, this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
            for (let e3 = 0;e3 < this._terminal.rows; e3++)
              this._refreshRowDimensions(this._rowElements[e3]);
          }
        }
        _refreshRowDimensions(e3) {
          e3.style.height = `${this._renderService.dimensions.css.cell.height}px`;
        }
      };
      t2.AccessibilityManager = d = s2([r(1, c.IRenderService)], d);
    }, 3614: (e2, t2) => {
      function i2(e3) {
        return e3.replace(/\r?\n/g, "\r");
      }
      function s2(e3, t3) {
        return t3 ? "[200~" + e3 + "[201~" : e3;
      }
      function r(e3, t3, r2, n2) {
        e3 = s2(e3 = i2(e3), r2.decPrivateModes.bracketedPasteMode && n2.rawOptions.ignoreBracketedPasteMode !== true), r2.triggerDataEvent(e3, true), t3.value = "";
      }
      function n(e3, t3, i3) {
        const s3 = i3.getBoundingClientRect(), r2 = e3.clientX - s3.left - 10, n2 = e3.clientY - s3.top - 10;
        t3.style.width = "20px", t3.style.height = "20px", t3.style.left = `${r2}px`, t3.style.top = `${n2}px`, t3.style.zIndex = "1000", t3.focus();
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.rightClickHandler = t2.moveTextAreaUnderMouseCursor = t2.paste = t2.handlePasteEvent = t2.copyHandler = t2.bracketTextForPaste = t2.prepareTextForTerminal = undefined, t2.prepareTextForTerminal = i2, t2.bracketTextForPaste = s2, t2.copyHandler = function(e3, t3) {
        e3.clipboardData && e3.clipboardData.setData("text/plain", t3.selectionText), e3.preventDefault();
      }, t2.handlePasteEvent = function(e3, t3, i3, s3) {
        e3.stopPropagation(), e3.clipboardData && r(e3.clipboardData.getData("text/plain"), t3, i3, s3);
      }, t2.paste = r, t2.moveTextAreaUnderMouseCursor = n, t2.rightClickHandler = function(e3, t3, i3, s3, r2) {
        n(e3, t3, i3), r2 && s3.rightClickSelect(e3), t3.value = s3.selectionText, t3.select();
      };
    }, 7239: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.ColorContrastCache = undefined;
      const s2 = i2(1505);
      t2.ColorContrastCache = class {
        constructor() {
          this._color = new s2.TwoKeyMap, this._css = new s2.TwoKeyMap;
        }
        setCss(e3, t3, i3) {
          this._css.set(e3, t3, i3);
        }
        getCss(e3, t3) {
          return this._css.get(e3, t3);
        }
        setColor(e3, t3, i3) {
          this._color.set(e3, t3, i3);
        }
        getColor(e3, t3) {
          return this._color.get(e3, t3);
        }
        clear() {
          this._color.clear(), this._css.clear();
        }
      };
    }, 3656: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.addDisposableDomListener = undefined, t2.addDisposableDomListener = function(e3, t3, i2, s2) {
        e3.addEventListener(t3, i2, s2);
        let r = false;
        return { dispose: () => {
          r || (r = true, e3.removeEventListener(t3, i2, s2));
        } };
      };
    }, 6465: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.Linkifier2 = undefined;
      const n = i2(3656), o = i2(8460), a = i2(844), h = i2(2585);
      let c = t2.Linkifier2 = class extends a.Disposable {
        get currentLink() {
          return this._currentLink;
        }
        constructor(e3) {
          super(), this._bufferService = e3, this._linkProviders = [], this._linkCacheDisposables = [], this._isMouseOut = true, this._wasResized = false, this._activeLine = -1, this._onShowLinkUnderline = this.register(new o.EventEmitter), this.onShowLinkUnderline = this._onShowLinkUnderline.event, this._onHideLinkUnderline = this.register(new o.EventEmitter), this.onHideLinkUnderline = this._onHideLinkUnderline.event, this.register((0, a.getDisposeArrayDisposable)(this._linkCacheDisposables)), this.register((0, a.toDisposable)(() => {
            this._lastMouseEvent = undefined;
          })), this.register(this._bufferService.onResize(() => {
            this._clearCurrentLink(), this._wasResized = true;
          }));
        }
        registerLinkProvider(e3) {
          return this._linkProviders.push(e3), { dispose: () => {
            const t3 = this._linkProviders.indexOf(e3);
            t3 !== -1 && this._linkProviders.splice(t3, 1);
          } };
        }
        attachToDom(e3, t3, i3) {
          this._element = e3, this._mouseService = t3, this._renderService = i3, this.register((0, n.addDisposableDomListener)(this._element, "mouseleave", () => {
            this._isMouseOut = true, this._clearCurrentLink();
          })), this.register((0, n.addDisposableDomListener)(this._element, "mousemove", this._handleMouseMove.bind(this))), this.register((0, n.addDisposableDomListener)(this._element, "mousedown", this._handleMouseDown.bind(this))), this.register((0, n.addDisposableDomListener)(this._element, "mouseup", this._handleMouseUp.bind(this)));
        }
        _handleMouseMove(e3) {
          if (this._lastMouseEvent = e3, !this._element || !this._mouseService)
            return;
          const t3 = this._positionFromMouseEvent(e3, this._element, this._mouseService);
          if (!t3)
            return;
          this._isMouseOut = false;
          const i3 = e3.composedPath();
          for (let e4 = 0;e4 < i3.length; e4++) {
            const t4 = i3[e4];
            if (t4.classList.contains("xterm"))
              break;
            if (t4.classList.contains("xterm-hover"))
              return;
          }
          this._lastBufferCell && t3.x === this._lastBufferCell.x && t3.y === this._lastBufferCell.y || (this._handleHover(t3), this._lastBufferCell = t3);
        }
        _handleHover(e3) {
          if (this._activeLine !== e3.y || this._wasResized)
            return this._clearCurrentLink(), this._askForLink(e3, false), void (this._wasResized = false);
          this._currentLink && this._linkAtPosition(this._currentLink.link, e3) || (this._clearCurrentLink(), this._askForLink(e3, true));
        }
        _askForLink(e3, t3) {
          this._activeProviderReplies && t3 || (this._activeProviderReplies?.forEach((e4) => {
            e4?.forEach((e5) => {
              e5.link.dispose && e5.link.dispose();
            });
          }), this._activeProviderReplies = new Map, this._activeLine = e3.y);
          let i3 = false;
          for (const [s3, r2] of this._linkProviders.entries())
            if (t3) {
              const t4 = this._activeProviderReplies?.get(s3);
              t4 && (i3 = this._checkLinkProviderResult(s3, e3, i3));
            } else
              r2.provideLinks(e3.y, (t4) => {
                if (this._isMouseOut)
                  return;
                const r3 = t4?.map((e4) => ({ link: e4 }));
                this._activeProviderReplies?.set(s3, r3), i3 = this._checkLinkProviderResult(s3, e3, i3), this._activeProviderReplies?.size === this._linkProviders.length && this._removeIntersectingLinks(e3.y, this._activeProviderReplies);
              });
        }
        _removeIntersectingLinks(e3, t3) {
          const i3 = new Set;
          for (let s3 = 0;s3 < t3.size; s3++) {
            const r2 = t3.get(s3);
            if (r2)
              for (let t4 = 0;t4 < r2.length; t4++) {
                const s4 = r2[t4], n2 = s4.link.range.start.y < e3 ? 0 : s4.link.range.start.x, o2 = s4.link.range.end.y > e3 ? this._bufferService.cols : s4.link.range.end.x;
                for (let e4 = n2;e4 <= o2; e4++) {
                  if (i3.has(e4)) {
                    r2.splice(t4--, 1);
                    break;
                  }
                  i3.add(e4);
                }
              }
          }
        }
        _checkLinkProviderResult(e3, t3, i3) {
          if (!this._activeProviderReplies)
            return i3;
          const s3 = this._activeProviderReplies.get(e3);
          let r2 = false;
          for (let t4 = 0;t4 < e3; t4++)
            this._activeProviderReplies.has(t4) && !this._activeProviderReplies.get(t4) || (r2 = true);
          if (!r2 && s3) {
            const e4 = s3.find((e5) => this._linkAtPosition(e5.link, t3));
            e4 && (i3 = true, this._handleNewLink(e4));
          }
          if (this._activeProviderReplies.size === this._linkProviders.length && !i3)
            for (let e4 = 0;e4 < this._activeProviderReplies.size; e4++) {
              const s4 = this._activeProviderReplies.get(e4)?.find((e5) => this._linkAtPosition(e5.link, t3));
              if (s4) {
                i3 = true, this._handleNewLink(s4);
                break;
              }
            }
          return i3;
        }
        _handleMouseDown() {
          this._mouseDownLink = this._currentLink;
        }
        _handleMouseUp(e3) {
          if (!this._element || !this._mouseService || !this._currentLink)
            return;
          const t3 = this._positionFromMouseEvent(e3, this._element, this._mouseService);
          t3 && this._mouseDownLink === this._currentLink && this._linkAtPosition(this._currentLink.link, t3) && this._currentLink.link.activate(e3, this._currentLink.link.text);
        }
        _clearCurrentLink(e3, t3) {
          this._element && this._currentLink && this._lastMouseEvent && (!e3 || !t3 || this._currentLink.link.range.start.y >= e3 && this._currentLink.link.range.end.y <= t3) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = undefined, (0, a.disposeArray)(this._linkCacheDisposables));
        }
        _handleNewLink(e3) {
          if (!this._element || !this._lastMouseEvent || !this._mouseService)
            return;
          const t3 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
          t3 && this._linkAtPosition(e3.link, t3) && (this._currentLink = e3, this._currentLink.state = { decorations: { underline: e3.link.decorations === undefined || e3.link.decorations.underline, pointerCursor: e3.link.decorations === undefined || e3.link.decorations.pointerCursor }, isHovered: true }, this._linkHover(this._element, e3.link, this._lastMouseEvent), e3.link.decorations = {}, Object.defineProperties(e3.link.decorations, { pointerCursor: { get: () => this._currentLink?.state?.decorations.pointerCursor, set: (e4) => {
            this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== e4 && (this._currentLink.state.decorations.pointerCursor = e4, this._currentLink.state.isHovered && this._element?.classList.toggle("xterm-cursor-pointer", e4));
          } }, underline: { get: () => this._currentLink?.state?.decorations.underline, set: (t4) => {
            this._currentLink?.state && this._currentLink?.state?.decorations.underline !== t4 && (this._currentLink.state.decorations.underline = t4, this._currentLink.state.isHovered && this._fireUnderlineEvent(e3.link, t4));
          } } }), this._renderService && this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((e4) => {
            if (!this._currentLink)
              return;
            const t4 = e4.start === 0 ? 0 : e4.start + 1 + this._bufferService.buffer.ydisp, i3 = this._bufferService.buffer.ydisp + 1 + e4.end;
            if (this._currentLink.link.range.start.y >= t4 && this._currentLink.link.range.end.y <= i3 && (this._clearCurrentLink(t4, i3), this._lastMouseEvent && this._element)) {
              const e5 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
              e5 && this._askForLink(e5, false);
            }
          })));
        }
        _linkHover(e3, t3, i3) {
          this._currentLink?.state && (this._currentLink.state.isHovered = true, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t3, true), this._currentLink.state.decorations.pointerCursor && e3.classList.add("xterm-cursor-pointer")), t3.hover && t3.hover(i3, t3.text);
        }
        _fireUnderlineEvent(e3, t3) {
          const i3 = e3.range, s3 = this._bufferService.buffer.ydisp, r2 = this._createLinkUnderlineEvent(i3.start.x - 1, i3.start.y - s3 - 1, i3.end.x, i3.end.y - s3 - 1, undefined);
          (t3 ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(r2);
        }
        _linkLeave(e3, t3, i3) {
          this._currentLink?.state && (this._currentLink.state.isHovered = false, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t3, false), this._currentLink.state.decorations.pointerCursor && e3.classList.remove("xterm-cursor-pointer")), t3.leave && t3.leave(i3, t3.text);
        }
        _linkAtPosition(e3, t3) {
          const i3 = e3.range.start.y * this._bufferService.cols + e3.range.start.x, s3 = e3.range.end.y * this._bufferService.cols + e3.range.end.x, r2 = t3.y * this._bufferService.cols + t3.x;
          return i3 <= r2 && r2 <= s3;
        }
        _positionFromMouseEvent(e3, t3, i3) {
          const s3 = i3.getCoords(e3, t3, this._bufferService.cols, this._bufferService.rows);
          if (s3)
            return { x: s3[0], y: s3[1] + this._bufferService.buffer.ydisp };
        }
        _createLinkUnderlineEvent(e3, t3, i3, s3, r2) {
          return { x1: e3, y1: t3, x2: i3, y2: s3, cols: this._bufferService.cols, fg: r2 };
        }
      };
      t2.Linkifier2 = c = s2([r(0, h.IBufferService)], c);
    }, 9042: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.tooMuchOutput = t2.promptLabel = undefined, t2.promptLabel = "Terminal input", t2.tooMuchOutput = "Too much output to announce, navigate to rows manually to read";
    }, 3730: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.OscLinkProvider = undefined;
      const n = i2(511), o = i2(2585);
      let a = t2.OscLinkProvider = class {
        constructor(e3, t3, i3) {
          this._bufferService = e3, this._optionsService = t3, this._oscLinkService = i3;
        }
        provideLinks(e3, t3) {
          const i3 = this._bufferService.buffer.lines.get(e3 - 1);
          if (!i3)
            return void t3(undefined);
          const s3 = [], r2 = this._optionsService.rawOptions.linkHandler, o2 = new n.CellData, a2 = i3.getTrimmedLength();
          let c = -1, l = -1, d = false;
          for (let t4 = 0;t4 < a2; t4++)
            if (l !== -1 || i3.hasContent(t4)) {
              if (i3.loadCell(t4, o2), o2.hasExtendedAttrs() && o2.extended.urlId) {
                if (l === -1) {
                  l = t4, c = o2.extended.urlId;
                  continue;
                }
                d = o2.extended.urlId !== c;
              } else
                l !== -1 && (d = true);
              if (d || l !== -1 && t4 === a2 - 1) {
                const i4 = this._oscLinkService.getLinkData(c)?.uri;
                if (i4) {
                  const n2 = { start: { x: l + 1, y: e3 }, end: { x: t4 + (d || t4 !== a2 - 1 ? 0 : 1), y: e3 } };
                  let o3 = false;
                  if (!r2?.allowNonHttpProtocols)
                    try {
                      const e4 = new URL(i4);
                      ["http:", "https:"].includes(e4.protocol) || (o3 = true);
                    } catch (e4) {
                      o3 = true;
                    }
                  o3 || s3.push({ text: i4, range: n2, activate: (e4, t5) => r2 ? r2.activate(e4, t5, n2) : h(0, t5), hover: (e4, t5) => r2?.hover?.(e4, t5, n2), leave: (e4, t5) => r2?.leave?.(e4, t5, n2) });
                }
                d = false, o2.hasExtendedAttrs() && o2.extended.urlId ? (l = t4, c = o2.extended.urlId) : (l = -1, c = -1);
              }
            }
          t3(s3);
        }
      };
      function h(e3, t3) {
        if (confirm(`Do you want to navigate to ${t3}?\n\nWARNING: This link could potentially be dangerous`)) {
          const e4 = window.open();
          if (e4) {
            try {
              e4.opener = null;
            } catch {
            }
            e4.location.href = t3;
          } else
            console.warn("Opening link blocked as opener could not be cleared");
        }
      }
      t2.OscLinkProvider = a = s2([r(0, o.IBufferService), r(1, o.IOptionsService), r(2, o.IOscLinkService)], a);
    }, 6193: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.RenderDebouncer = undefined, t2.RenderDebouncer = class {
        constructor(e3, t3) {
          this._parentWindow = e3, this._renderCallback = t3, this._refreshCallbacks = [];
        }
        dispose() {
          this._animationFrame && (this._parentWindow.cancelAnimationFrame(this._animationFrame), this._animationFrame = undefined);
        }
        addRefreshCallback(e3) {
          return this._refreshCallbacks.push(e3), this._animationFrame || (this._animationFrame = this._parentWindow.requestAnimationFrame(() => this._innerRefresh())), this._animationFrame;
        }
        refresh(e3, t3, i2) {
          this._rowCount = i2, e3 = e3 !== undefined ? e3 : 0, t3 = t3 !== undefined ? t3 : this._rowCount - 1, this._rowStart = this._rowStart !== undefined ? Math.min(this._rowStart, e3) : e3, this._rowEnd = this._rowEnd !== undefined ? Math.max(this._rowEnd, t3) : t3, this._animationFrame || (this._animationFrame = this._parentWindow.requestAnimationFrame(() => this._innerRefresh()));
        }
        _innerRefresh() {
          if (this._animationFrame = undefined, this._rowStart === undefined || this._rowEnd === undefined || this._rowCount === undefined)
            return void this._runRefreshCallbacks();
          const e3 = Math.max(this._rowStart, 0), t3 = Math.min(this._rowEnd, this._rowCount - 1);
          this._rowStart = undefined, this._rowEnd = undefined, this._renderCallback(e3, t3), this._runRefreshCallbacks();
        }
        _runRefreshCallbacks() {
          for (const e3 of this._refreshCallbacks)
            e3(0);
          this._refreshCallbacks = [];
        }
      };
    }, 5596: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.ScreenDprMonitor = undefined;
      const s2 = i2(844);

      class r extends s2.Disposable {
        constructor(e3) {
          super(), this._parentWindow = e3, this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this.register((0, s2.toDisposable)(() => {
            this.clearListener();
          }));
        }
        setListener(e3) {
          this._listener && this.clearListener(), this._listener = e3, this._outerListener = () => {
            this._listener && (this._listener(this._parentWindow.devicePixelRatio, this._currentDevicePixelRatio), this._updateDpr());
          }, this._updateDpr();
        }
        _updateDpr() {
          this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
        }
        clearListener() {
          this._resolutionMediaMatchList && this._listener && this._outerListener && (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = undefined, this._listener = undefined, this._outerListener = undefined);
        }
      }
      t2.ScreenDprMonitor = r;
    }, 3236: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.Terminal = undefined;
      const s2 = i2(3614), r = i2(3656), n = i2(6465), o = i2(9042), a = i2(3730), h = i2(1680), c = i2(3107), l = i2(5744), d = i2(2950), _ = i2(1296), u = i2(428), f = i2(4269), v = i2(5114), p = i2(8934), g = i2(3230), m = i2(9312), S = i2(4725), C = i2(6731), b = i2(8055), y = i2(8969), w = i2(8460), E = i2(844), k = i2(6114), L = i2(8437), D = i2(2584), R = i2(7399), x = i2(5941), A = i2(9074), B = i2(2585), T = i2(5435), M = i2(4567), O = typeof window != "undefined" ? window.document : null;

      class P extends y.CoreTerminal {
        get onFocus() {
          return this._onFocus.event;
        }
        get onBlur() {
          return this._onBlur.event;
        }
        get onA11yChar() {
          return this._onA11yCharEmitter.event;
        }
        get onA11yTab() {
          return this._onA11yTabEmitter.event;
        }
        get onWillOpen() {
          return this._onWillOpen.event;
        }
        constructor(e3 = {}) {
          super(e3), this.browser = k, this._keyDownHandled = false, this._keyDownSeen = false, this._keyPressHandled = false, this._unprocessedDeadKey = false, this._accessibilityManager = this.register(new E.MutableDisposable), this._onCursorMove = this.register(new w.EventEmitter), this.onCursorMove = this._onCursorMove.event, this._onKey = this.register(new w.EventEmitter), this.onKey = this._onKey.event, this._onRender = this.register(new w.EventEmitter), this.onRender = this._onRender.event, this._onSelectionChange = this.register(new w.EventEmitter), this.onSelectionChange = this._onSelectionChange.event, this._onTitleChange = this.register(new w.EventEmitter), this.onTitleChange = this._onTitleChange.event, this._onBell = this.register(new w.EventEmitter), this.onBell = this._onBell.event, this._onFocus = this.register(new w.EventEmitter), this._onBlur = this.register(new w.EventEmitter), this._onA11yCharEmitter = this.register(new w.EventEmitter), this._onA11yTabEmitter = this.register(new w.EventEmitter), this._onWillOpen = this.register(new w.EventEmitter), this._setup(), this.linkifier2 = this.register(this._instantiationService.createInstance(n.Linkifier2)), this.linkifier2.registerLinkProvider(this._instantiationService.createInstance(a.OscLinkProvider)), this._decorationService = this._instantiationService.createInstance(A.DecorationService), this._instantiationService.setService(B.IDecorationService, this._decorationService), this.register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this.register(this._inputHandler.onRequestRefreshRows((e4, t3) => this.refresh(e4, t3))), this.register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this.register(this._inputHandler.onRequestReset(() => this.reset())), this.register(this._inputHandler.onRequestWindowsOptionsReport((e4) => this._reportWindowsOptions(e4))), this.register(this._inputHandler.onColor((e4) => this._handleColorEvent(e4))), this.register((0, w.forwardEvent)(this._inputHandler.onCursorMove, this._onCursorMove)), this.register((0, w.forwardEvent)(this._inputHandler.onTitleChange, this._onTitleChange)), this.register((0, w.forwardEvent)(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this.register((0, w.forwardEvent)(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this.register(this._bufferService.onResize((e4) => this._afterResize(e4.cols, e4.rows))), this.register((0, E.toDisposable)(() => {
            this._customKeyEventHandler = undefined, this.element?.parentNode?.removeChild(this.element);
          }));
        }
        _handleColorEvent(e3) {
          if (this._themeService)
            for (const t3 of e3) {
              let e4, i3 = "";
              switch (t3.index) {
                case 256:
                  e4 = "foreground", i3 = "10";
                  break;
                case 257:
                  e4 = "background", i3 = "11";
                  break;
                case 258:
                  e4 = "cursor", i3 = "12";
                  break;
                default:
                  e4 = "ansi", i3 = "4;" + t3.index;
              }
              switch (t3.type) {
                case 0:
                  const s3 = b.color.toColorRGB(e4 === "ansi" ? this._themeService.colors.ansi[t3.index] : this._themeService.colors[e4]);
                  this.coreService.triggerDataEvent(`${D.C0.ESC}]${i3};${(0, x.toRgbString)(s3)}${D.C1_ESCAPED.ST}`);
                  break;
                case 1:
                  if (e4 === "ansi")
                    this._themeService.modifyColors((e5) => e5.ansi[t3.index] = b.rgba.toColor(...t3.color));
                  else {
                    const i4 = e4;
                    this._themeService.modifyColors((e5) => e5[i4] = b.rgba.toColor(...t3.color));
                  }
                  break;
                case 2:
                  this._themeService.restoreColor(t3.index);
              }
            }
        }
        _setup() {
          super._setup(), this._customKeyEventHandler = undefined;
        }
        get buffer() {
          return this.buffers.active;
        }
        focus() {
          this.textarea && this.textarea.focus({ preventScroll: true });
        }
        _handleScreenReaderModeOptionChange(e3) {
          e3 ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(M.AccessibilityManager, this)) : this._accessibilityManager.clear();
        }
        _handleTextAreaFocus(e3) {
          this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(D.C0.ESC + "[I"), this.updateCursorStyle(e3), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
        }
        blur() {
          return this.textarea?.blur();
        }
        _handleTextAreaBlur() {
          this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(D.C0.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
        }
        _syncTextArea() {
          if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService)
            return;
          const e3 = this.buffer.ybase + this.buffer.y, t3 = this.buffer.lines.get(e3);
          if (!t3)
            return;
          const i3 = Math.min(this.buffer.x, this.cols - 1), s3 = this._renderService.dimensions.css.cell.height, r2 = t3.getWidth(i3), n2 = this._renderService.dimensions.css.cell.width * r2, o2 = this.buffer.y * this._renderService.dimensions.css.cell.height, a2 = i3 * this._renderService.dimensions.css.cell.width;
          this.textarea.style.left = a2 + "px", this.textarea.style.top = o2 + "px", this.textarea.style.width = n2 + "px", this.textarea.style.height = s3 + "px", this.textarea.style.lineHeight = s3 + "px", this.textarea.style.zIndex = "-5";
        }
        _initGlobal() {
          this._bindKeys(), this.register((0, r.addDisposableDomListener)(this.element, "copy", (e4) => {
            this.hasSelection() && (0, s2.copyHandler)(e4, this._selectionService);
          }));
          const e3 = (e4) => (0, s2.handlePasteEvent)(e4, this.textarea, this.coreService, this.optionsService);
          this.register((0, r.addDisposableDomListener)(this.textarea, "paste", e3)), this.register((0, r.addDisposableDomListener)(this.element, "paste", e3)), k.isFirefox ? this.register((0, r.addDisposableDomListener)(this.element, "mousedown", (e4) => {
            e4.button === 2 && (0, s2.rightClickHandler)(e4, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
          })) : this.register((0, r.addDisposableDomListener)(this.element, "contextmenu", (e4) => {
            (0, s2.rightClickHandler)(e4, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
          })), k.isLinux && this.register((0, r.addDisposableDomListener)(this.element, "auxclick", (e4) => {
            e4.button === 1 && (0, s2.moveTextAreaUnderMouseCursor)(e4, this.textarea, this.screenElement);
          }));
        }
        _bindKeys() {
          this.register((0, r.addDisposableDomListener)(this.textarea, "keyup", (e3) => this._keyUp(e3), true)), this.register((0, r.addDisposableDomListener)(this.textarea, "keydown", (e3) => this._keyDown(e3), true)), this.register((0, r.addDisposableDomListener)(this.textarea, "keypress", (e3) => this._keyPress(e3), true)), this.register((0, r.addDisposableDomListener)(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this.register((0, r.addDisposableDomListener)(this.textarea, "compositionupdate", (e3) => this._compositionHelper.compositionupdate(e3))), this.register((0, r.addDisposableDomListener)(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this.register((0, r.addDisposableDomListener)(this.textarea, "input", (e3) => this._inputEvent(e3), true)), this.register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
        }
        open(e3) {
          if (!e3)
            throw new Error("Terminal requires a parent element.");
          e3.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this._document = e3.ownerDocument, this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e3.appendChild(this.element);
          const t3 = O.createDocumentFragment();
          this._viewportElement = O.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), t3.appendChild(this._viewportElement), this._viewportScrollArea = O.createElement("div"), this._viewportScrollArea.classList.add("xterm-scroll-area"), this._viewportElement.appendChild(this._viewportScrollArea), this.screenElement = O.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._helperContainer = O.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), t3.appendChild(this.screenElement), this.textarea = O.createElement("textarea"), this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", o.promptLabel), k.isChromeOS || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._coreBrowserService = this._instantiationService.createInstance(v.CoreBrowserService, this.textarea, this._document.defaultView ?? window), this._instantiationService.setService(S.ICoreBrowserService, this._coreBrowserService), this.register((0, r.addDisposableDomListener)(this.textarea, "focus", (e4) => this._handleTextAreaFocus(e4))), this.register((0, r.addDisposableDomListener)(this.textarea, "blur", () => this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(u.CharSizeService, this._document, this._helperContainer), this._instantiationService.setService(S.ICharSizeService, this._charSizeService), this._themeService = this._instantiationService.createInstance(C.ThemeService), this._instantiationService.setService(S.IThemeService, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(f.CharacterJoinerService), this._instantiationService.setService(S.ICharacterJoinerService, this._characterJoinerService), this._renderService = this.register(this._instantiationService.createInstance(g.RenderService, this.rows, this.screenElement)), this._instantiationService.setService(S.IRenderService, this._renderService), this.register(this._renderService.onRenderedViewportChange((e4) => this._onRender.fire(e4))), this.onResize((e4) => this._renderService.resize(e4.cols, e4.rows)), this._compositionView = O.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance(d.CompositionHelper, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this.element.appendChild(t3);
          try {
            this._onWillOpen.fire(this.element);
          } catch {
          }
          this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this._mouseService = this._instantiationService.createInstance(p.MouseService), this._instantiationService.setService(S.IMouseService, this._mouseService), this.viewport = this._instantiationService.createInstance(h.Viewport, this._viewportElement, this._viewportScrollArea), this.viewport.onRequestScrollLines((e4) => this.scrollLines(e4.amount, e4.suppressScrollEvent, 1)), this.register(this._inputHandler.onRequestSyncScrollBar(() => this.viewport.syncScrollArea())), this.register(this.viewport), this.register(this.onCursorMove(() => {
            this._renderService.handleCursorMove(), this._syncTextArea();
          })), this.register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows))), this.register(this.onBlur(() => this._renderService.handleBlur())), this.register(this.onFocus(() => this._renderService.handleFocus())), this.register(this._renderService.onDimensionsChange(() => this.viewport.syncScrollArea())), this._selectionService = this.register(this._instantiationService.createInstance(m.SelectionService, this.element, this.screenElement, this.linkifier2)), this._instantiationService.setService(S.ISelectionService, this._selectionService), this.register(this._selectionService.onRequestScrollLines((e4) => this.scrollLines(e4.amount, e4.suppressScrollEvent))), this.register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this.register(this._selectionService.onRequestRedraw((e4) => this._renderService.handleSelectionChanged(e4.start, e4.end, e4.columnSelectMode))), this.register(this._selectionService.onLinuxMouseSelection((e4) => {
            this.textarea.value = e4, this.textarea.focus(), this.textarea.select();
          })), this.register(this._onScroll.event((e4) => {
            this.viewport.syncScrollArea(), this._selectionService.refresh();
          })), this.register((0, r.addDisposableDomListener)(this._viewportElement, "scroll", () => this._selectionService.refresh())), this.linkifier2.attachToDom(this.screenElement, this._mouseService, this._renderService), this.register(this._instantiationService.createInstance(c.BufferDecorationRenderer, this.screenElement)), this.register((0, r.addDisposableDomListener)(this.element, "mousedown", (e4) => this._selectionService.handleMouseDown(e4))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(M.AccessibilityManager, this)), this.register(this.optionsService.onSpecificOptionChange("screenReaderMode", (e4) => this._handleScreenReaderModeOptionChange(e4))), this.options.overviewRulerWidth && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(l.OverviewRulerRenderer, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRulerWidth", (e4) => {
            !this._overviewRulerRenderer && e4 && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(l.OverviewRulerRenderer, this._viewportElement, this.screenElement)));
          }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
        }
        _createRenderer() {
          return this._instantiationService.createInstance(_.DomRenderer, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier2);
        }
        bindMouse() {
          const e3 = this, t3 = this.element;
          function i3(t4) {
            const i4 = e3._mouseService.getMouseReportCoords(t4, e3.screenElement);
            if (!i4)
              return false;
            let s4, r2;
            switch (t4.overrideType || t4.type) {
              case "mousemove":
                r2 = 32, t4.buttons === undefined ? (s4 = 3, t4.button !== undefined && (s4 = t4.button < 3 ? t4.button : 3)) : s4 = 1 & t4.buttons ? 0 : 4 & t4.buttons ? 1 : 2 & t4.buttons ? 2 : 3;
                break;
              case "mouseup":
                r2 = 0, s4 = t4.button < 3 ? t4.button : 3;
                break;
              case "mousedown":
                r2 = 1, s4 = t4.button < 3 ? t4.button : 3;
                break;
              case "wheel":
                if (e3.viewport.getLinesScrolled(t4) === 0)
                  return false;
                r2 = t4.deltaY < 0 ? 0 : 1, s4 = 4;
                break;
              default:
                return false;
            }
            return !(r2 === undefined || s4 === undefined || s4 > 4) && e3.coreMouseService.triggerMouseEvent({ col: i4.col, row: i4.row, x: i4.x, y: i4.y, button: s4, action: r2, ctrl: t4.ctrlKey, alt: t4.altKey, shift: t4.shiftKey });
          }
          const s3 = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, n2 = { mouseup: (e4) => (i3(e4), e4.buttons || (this._document.removeEventListener("mouseup", s3.mouseup), s3.mousedrag && this._document.removeEventListener("mousemove", s3.mousedrag)), this.cancel(e4)), wheel: (e4) => (i3(e4), this.cancel(e4, true)), mousedrag: (e4) => {
            e4.buttons && i3(e4);
          }, mousemove: (e4) => {
            e4.buttons || i3(e4);
          } };
          this.register(this.coreMouseService.onProtocolChange((e4) => {
            e4 ? (this.optionsService.rawOptions.logLevel === "debug" && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(e4)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), 8 & e4 ? s3.mousemove || (t3.addEventListener("mousemove", n2.mousemove), s3.mousemove = n2.mousemove) : (t3.removeEventListener("mousemove", s3.mousemove), s3.mousemove = null), 16 & e4 ? s3.wheel || (t3.addEventListener("wheel", n2.wheel, { passive: false }), s3.wheel = n2.wheel) : (t3.removeEventListener("wheel", s3.wheel), s3.wheel = null), 2 & e4 ? s3.mouseup || (s3.mouseup = n2.mouseup) : (this._document.removeEventListener("mouseup", s3.mouseup), s3.mouseup = null), 4 & e4 ? s3.mousedrag || (s3.mousedrag = n2.mousedrag) : (this._document.removeEventListener("mousemove", s3.mousedrag), s3.mousedrag = null);
          })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this.register((0, r.addDisposableDomListener)(t3, "mousedown", (e4) => {
            if (e4.preventDefault(), this.focus(), this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(e4))
              return i3(e4), s3.mouseup && this._document.addEventListener("mouseup", s3.mouseup), s3.mousedrag && this._document.addEventListener("mousemove", s3.mousedrag), this.cancel(e4);
          })), this.register((0, r.addDisposableDomListener)(t3, "wheel", (e4) => {
            if (!s3.wheel) {
              if (!this.buffer.hasScrollback) {
                const t4 = this.viewport.getLinesScrolled(e4);
                if (t4 === 0)
                  return;
                const i4 = D.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (e4.deltaY < 0 ? "A" : "B");
                let s4 = "";
                for (let e5 = 0;e5 < Math.abs(t4); e5++)
                  s4 += i4;
                return this.coreService.triggerDataEvent(s4, true), this.cancel(e4, true);
              }
              return this.viewport.handleWheel(e4) ? this.cancel(e4) : undefined;
            }
          }, { passive: false })), this.register((0, r.addDisposableDomListener)(t3, "touchstart", (e4) => {
            if (!this.coreMouseService.areMouseEventsActive)
              return this.viewport.handleTouchStart(e4), this.cancel(e4);
          }, { passive: true })), this.register((0, r.addDisposableDomListener)(t3, "touchmove", (e4) => {
            if (!this.coreMouseService.areMouseEventsActive)
              return this.viewport.handleTouchMove(e4) ? undefined : this.cancel(e4);
          }, { passive: false }));
        }
        refresh(e3, t3) {
          this._renderService?.refreshRows(e3, t3);
        }
        updateCursorStyle(e3) {
          this._selectionService?.shouldColumnSelect(e3) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
        }
        _showCursor() {
          this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = true, this.refresh(this.buffer.y, this.buffer.y));
        }
        scrollLines(e3, t3, i3 = 0) {
          i3 === 1 ? (super.scrollLines(e3, t3, i3), this.refresh(0, this.rows - 1)) : this.viewport?.scrollLines(e3);
        }
        paste(e3) {
          (0, s2.paste)(e3, this.textarea, this.coreService, this.optionsService);
        }
        attachCustomKeyEventHandler(e3) {
          this._customKeyEventHandler = e3;
        }
        registerLinkProvider(e3) {
          return this.linkifier2.registerLinkProvider(e3);
        }
        registerCharacterJoiner(e3) {
          if (!this._characterJoinerService)
            throw new Error("Terminal must be opened first");
          const t3 = this._characterJoinerService.register(e3);
          return this.refresh(0, this.rows - 1), t3;
        }
        deregisterCharacterJoiner(e3) {
          if (!this._characterJoinerService)
            throw new Error("Terminal must be opened first");
          this._characterJoinerService.deregister(e3) && this.refresh(0, this.rows - 1);
        }
        get markers() {
          return this.buffer.markers;
        }
        registerMarker(e3) {
          return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e3);
        }
        registerDecoration(e3) {
          return this._decorationService.registerDecoration(e3);
        }
        hasSelection() {
          return !!this._selectionService && this._selectionService.hasSelection;
        }
        select(e3, t3, i3) {
          this._selectionService.setSelection(e3, t3, i3);
        }
        getSelection() {
          return this._selectionService ? this._selectionService.selectionText : "";
        }
        getSelectionPosition() {
          if (this._selectionService && this._selectionService.hasSelection)
            return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
        }
        clearSelection() {
          this._selectionService?.clearSelection();
        }
        selectAll() {
          this._selectionService?.selectAll();
        }
        selectLines(e3, t3) {
          this._selectionService?.selectLines(e3, t3);
        }
        _keyDown(e3) {
          if (this._keyDownHandled = false, this._keyDownSeen = true, this._customKeyEventHandler && this._customKeyEventHandler(e3) === false)
            return false;
          const t3 = this.browser.isMac && this.options.macOptionIsMeta && e3.altKey;
          if (!t3 && !this._compositionHelper.keydown(e3))
            return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(), false;
          t3 || e3.key !== "Dead" && e3.key !== "AltGraph" || (this._unprocessedDeadKey = true);
          const i3 = (0, R.evaluateKeyboardEvent)(e3, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
          if (this.updateCursorStyle(e3), i3.type === 3 || i3.type === 2) {
            const t4 = this.rows - 1;
            return this.scrollLines(i3.type === 2 ? -t4 : t4), this.cancel(e3, true);
          }
          return i3.type === 1 && this.selectAll(), !!this._isThirdLevelShift(this.browser, e3) || (i3.cancel && this.cancel(e3, true), !i3.key || !!(e3.key && !e3.ctrlKey && !e3.altKey && !e3.metaKey && e3.key.length === 1 && e3.key.charCodeAt(0) >= 65 && e3.key.charCodeAt(0) <= 90) || (this._unprocessedDeadKey ? (this._unprocessedDeadKey = false, true) : (i3.key !== D.C0.ETX && i3.key !== D.C0.CR || (this.textarea.value = ""), this._onKey.fire({ key: i3.key, domEvent: e3 }), this._showCursor(), this.coreService.triggerDataEvent(i3.key, true), !this.optionsService.rawOptions.screenReaderMode || e3.altKey || e3.ctrlKey ? this.cancel(e3, true) : void (this._keyDownHandled = true))));
        }
        _isThirdLevelShift(e3, t3) {
          const i3 = e3.isMac && !this.options.macOptionIsMeta && t3.altKey && !t3.ctrlKey && !t3.metaKey || e3.isWindows && t3.altKey && t3.ctrlKey && !t3.metaKey || e3.isWindows && t3.getModifierState("AltGraph");
          return t3.type === "keypress" ? i3 : i3 && (!t3.keyCode || t3.keyCode > 47);
        }
        _keyUp(e3) {
          this._keyDownSeen = false, this._customKeyEventHandler && this._customKeyEventHandler(e3) === false || (function(e4) {
            return e4.keyCode === 16 || e4.keyCode === 17 || e4.keyCode === 18;
          }(e3) || this.focus(), this.updateCursorStyle(e3), this._keyPressHandled = false);
        }
        _keyPress(e3) {
          let t3;
          if (this._keyPressHandled = false, this._keyDownHandled)
            return false;
          if (this._customKeyEventHandler && this._customKeyEventHandler(e3) === false)
            return false;
          if (this.cancel(e3), e3.charCode)
            t3 = e3.charCode;
          else if (e3.which === null || e3.which === undefined)
            t3 = e3.keyCode;
          else {
            if (e3.which === 0 || e3.charCode === 0)
              return false;
            t3 = e3.which;
          }
          return !(!t3 || (e3.altKey || e3.ctrlKey || e3.metaKey) && !this._isThirdLevelShift(this.browser, e3) || (t3 = String.fromCharCode(t3), this._onKey.fire({ key: t3, domEvent: e3 }), this._showCursor(), this.coreService.triggerDataEvent(t3, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, 0));
        }
        _inputEvent(e3) {
          if (e3.data && e3.inputType === "insertText" && (!e3.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
            if (this._keyPressHandled)
              return false;
            this._unprocessedDeadKey = false;
            const t3 = e3.data;
            return this.coreService.triggerDataEvent(t3, true), this.cancel(e3), true;
          }
          return false;
        }
        resize(e3, t3) {
          e3 !== this.cols || t3 !== this.rows ? super.resize(e3, t3) : this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
        }
        _afterResize(e3, t3) {
          this._charSizeService?.measure(), this.viewport?.syncScrollArea(true);
        }
        clear() {
          if (this.buffer.ybase !== 0 || this.buffer.y !== 0) {
            this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
            for (let e3 = 1;e3 < this.rows; e3++)
              this.buffer.lines.push(this.buffer.getBlankLine(L.DEFAULT_ATTR_DATA));
            this._onScroll.fire({ position: this.buffer.ydisp, source: 0 }), this.viewport?.reset(), this.refresh(0, this.rows - 1);
          }
        }
        reset() {
          this.options.rows = this.rows, this.options.cols = this.cols;
          const e3 = this._customKeyEventHandler;
          this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this.viewport?.reset(), this._customKeyEventHandler = e3, this.refresh(0, this.rows - 1);
        }
        clearTextureAtlas() {
          this._renderService?.clearTextureAtlas();
        }
        _reportFocus() {
          this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(D.C0.ESC + "[I") : this.coreService.triggerDataEvent(D.C0.ESC + "[O");
        }
        _reportWindowsOptions(e3) {
          if (this._renderService)
            switch (e3) {
              case T.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
                const e4 = this._renderService.dimensions.css.canvas.width.toFixed(0), t3 = this._renderService.dimensions.css.canvas.height.toFixed(0);
                this.coreService.triggerDataEvent(`${D.C0.ESC}[4;${t3};${e4}t`);
                break;
              case T.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
                const i3 = this._renderService.dimensions.css.cell.width.toFixed(0), s3 = this._renderService.dimensions.css.cell.height.toFixed(0);
                this.coreService.triggerDataEvent(`${D.C0.ESC}[6;${s3};${i3}t`);
            }
        }
        cancel(e3, t3) {
          if (this.options.cancelEvents || t3)
            return e3.preventDefault(), e3.stopPropagation(), false;
        }
      }
      t2.Terminal = P;
    }, 9924: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.TimeBasedDebouncer = undefined, t2.TimeBasedDebouncer = class {
        constructor(e3, t3 = 1000) {
          this._renderCallback = e3, this._debounceThresholdMS = t3, this._lastRefreshMs = 0, this._additionalRefreshRequested = false;
        }
        dispose() {
          this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
        }
        refresh(e3, t3, i2) {
          this._rowCount = i2, e3 = e3 !== undefined ? e3 : 0, t3 = t3 !== undefined ? t3 : this._rowCount - 1, this._rowStart = this._rowStart !== undefined ? Math.min(this._rowStart, e3) : e3, this._rowEnd = this._rowEnd !== undefined ? Math.max(this._rowEnd, t3) : t3;
          const s2 = Date.now();
          if (s2 - this._lastRefreshMs >= this._debounceThresholdMS)
            this._lastRefreshMs = s2, this._innerRefresh();
          else if (!this._additionalRefreshRequested) {
            const e4 = s2 - this._lastRefreshMs, t4 = this._debounceThresholdMS - e4;
            this._additionalRefreshRequested = true, this._refreshTimeoutID = window.setTimeout(() => {
              this._lastRefreshMs = Date.now(), this._innerRefresh(), this._additionalRefreshRequested = false, this._refreshTimeoutID = undefined;
            }, t4);
          }
        }
        _innerRefresh() {
          if (this._rowStart === undefined || this._rowEnd === undefined || this._rowCount === undefined)
            return;
          const e3 = Math.max(this._rowStart, 0), t3 = Math.min(this._rowEnd, this._rowCount - 1);
          this._rowStart = undefined, this._rowEnd = undefined, this._renderCallback(e3, t3);
        }
      };
    }, 1680: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.Viewport = undefined;
      const n = i2(3656), o = i2(4725), a = i2(8460), h = i2(844), c = i2(2585);
      let l = t2.Viewport = class extends h.Disposable {
        constructor(e3, t3, i3, s3, r2, o2, h2, c2) {
          super(), this._viewportElement = e3, this._scrollArea = t3, this._bufferService = i3, this._optionsService = s3, this._charSizeService = r2, this._renderService = o2, this._coreBrowserService = h2, this.scrollBarWidth = 0, this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._wheelPartialScroll = 0, this._refreshAnimationFrame = null, this._ignoreNextScrollEvent = false, this._smoothScrollState = { startTime: 0, origin: -1, target: -1 }, this._onRequestScrollLines = this.register(new a.EventEmitter), this.onRequestScrollLines = this._onRequestScrollLines.event, this.scrollBarWidth = this._viewportElement.offsetWidth - this._scrollArea.offsetWidth || 15, this.register((0, n.addDisposableDomListener)(this._viewportElement, "scroll", this._handleScroll.bind(this))), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((e4) => this._activeBuffer = e4.activeBuffer)), this._renderDimensions = this._renderService.dimensions, this.register(this._renderService.onDimensionsChange((e4) => this._renderDimensions = e4)), this._handleThemeChange(c2.colors), this.register(c2.onChangeColors((e4) => this._handleThemeChange(e4))), this.register(this._optionsService.onSpecificOptionChange("scrollback", () => this.syncScrollArea())), setTimeout(() => this.syncScrollArea());
        }
        _handleThemeChange(e3) {
          this._viewportElement.style.backgroundColor = e3.background.css;
        }
        reset() {
          this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._coreBrowserService.window.requestAnimationFrame(() => this.syncScrollArea());
        }
        _refresh(e3) {
          if (e3)
            return this._innerRefresh(), void (this._refreshAnimationFrame !== null && this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));
          this._refreshAnimationFrame === null && (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
        }
        _innerRefresh() {
          if (this._charSizeService.height > 0) {
            this._currentRowHeight = this._renderDimensions.device.cell.height / this._coreBrowserService.dpr, this._currentDeviceCellHeight = this._renderDimensions.device.cell.height, this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
            const e4 = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._renderDimensions.css.canvas.height);
            this._lastRecordedBufferHeight !== e4 && (this._lastRecordedBufferHeight = e4, this._scrollArea.style.height = this._lastRecordedBufferHeight + "px");
          }
          const e3 = this._bufferService.buffer.ydisp * this._currentRowHeight;
          this._viewportElement.scrollTop !== e3 && (this._ignoreNextScrollEvent = true, this._viewportElement.scrollTop = e3), this._refreshAnimationFrame = null;
        }
        syncScrollArea(e3 = false) {
          if (this._lastRecordedBufferLength !== this._bufferService.buffer.lines.length)
            return this._lastRecordedBufferLength = this._bufferService.buffer.lines.length, void this._refresh(e3);
          this._lastRecordedViewportHeight === this._renderService.dimensions.css.canvas.height && this._lastScrollTop === this._activeBuffer.ydisp * this._currentRowHeight && this._renderDimensions.device.cell.height === this._currentDeviceCellHeight || this._refresh(e3);
        }
        _handleScroll(e3) {
          if (this._lastScrollTop = this._viewportElement.scrollTop, !this._viewportElement.offsetParent)
            return;
          if (this._ignoreNextScrollEvent)
            return this._ignoreNextScrollEvent = false, void this._onRequestScrollLines.fire({ amount: 0, suppressScrollEvent: true });
          const t3 = Math.round(this._lastScrollTop / this._currentRowHeight) - this._bufferService.buffer.ydisp;
          this._onRequestScrollLines.fire({ amount: t3, suppressScrollEvent: true });
        }
        _smoothScroll() {
          if (this._isDisposed || this._smoothScrollState.origin === -1 || this._smoothScrollState.target === -1)
            return;
          const e3 = this._smoothScrollPercent();
          this._viewportElement.scrollTop = this._smoothScrollState.origin + Math.round(e3 * (this._smoothScrollState.target - this._smoothScrollState.origin)), e3 < 1 ? this._coreBrowserService.window.requestAnimationFrame(() => this._smoothScroll()) : this._clearSmoothScrollState();
        }
        _smoothScrollPercent() {
          return this._optionsService.rawOptions.smoothScrollDuration && this._smoothScrollState.startTime ? Math.max(Math.min((Date.now() - this._smoothScrollState.startTime) / this._optionsService.rawOptions.smoothScrollDuration, 1), 0) : 1;
        }
        _clearSmoothScrollState() {
          this._smoothScrollState.startTime = 0, this._smoothScrollState.origin = -1, this._smoothScrollState.target = -1;
        }
        _bubbleScroll(e3, t3) {
          const i3 = this._viewportElement.scrollTop + this._lastRecordedViewportHeight;
          return !(t3 < 0 && this._viewportElement.scrollTop !== 0 || t3 > 0 && i3 < this._lastRecordedBufferHeight) || (e3.cancelable && e3.preventDefault(), false);
        }
        handleWheel(e3) {
          const t3 = this._getPixelsScrolled(e3);
          return t3 !== 0 && (this._optionsService.rawOptions.smoothScrollDuration ? (this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, this._smoothScrollState.target === -1 ? this._smoothScrollState.target = this._viewportElement.scrollTop + t3 : this._smoothScrollState.target += t3, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState()) : this._viewportElement.scrollTop += t3, this._bubbleScroll(e3, t3));
        }
        scrollLines(e3) {
          if (e3 !== 0)
            if (this._optionsService.rawOptions.smoothScrollDuration) {
              const t3 = e3 * this._currentRowHeight;
              this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, this._smoothScrollState.target = this._smoothScrollState.origin + t3, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState();
            } else
              this._onRequestScrollLines.fire({ amount: e3, suppressScrollEvent: false });
        }
        _getPixelsScrolled(e3) {
          if (e3.deltaY === 0 || e3.shiftKey)
            return 0;
          let t3 = this._applyScrollModifier(e3.deltaY, e3);
          return e3.deltaMode === WheelEvent.DOM_DELTA_LINE ? t3 *= this._currentRowHeight : e3.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t3 *= this._currentRowHeight * this._bufferService.rows), t3;
        }
        getBufferElements(e3, t3) {
          let i3, s3 = "";
          const r2 = [], n2 = t3 ?? this._bufferService.buffer.lines.length, o2 = this._bufferService.buffer.lines;
          for (let t4 = e3;t4 < n2; t4++) {
            const e4 = o2.get(t4);
            if (!e4)
              continue;
            const n3 = o2.get(t4 + 1)?.isWrapped;
            if (s3 += e4.translateToString(!n3), !n3 || t4 === o2.length - 1) {
              const e5 = document.createElement("div");
              e5.textContent = s3, r2.push(e5), s3.length > 0 && (i3 = e5), s3 = "";
            }
          }
          return { bufferElements: r2, cursorElement: i3 };
        }
        getLinesScrolled(e3) {
          if (e3.deltaY === 0 || e3.shiftKey)
            return 0;
          let t3 = this._applyScrollModifier(e3.deltaY, e3);
          return e3.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (t3 /= this._currentRowHeight + 0, this._wheelPartialScroll += t3, t3 = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e3.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t3 *= this._bufferService.rows), t3;
        }
        _applyScrollModifier(e3, t3) {
          const i3 = this._optionsService.rawOptions.fastScrollModifier;
          return i3 === "alt" && t3.altKey || i3 === "ctrl" && t3.ctrlKey || i3 === "shift" && t3.shiftKey ? e3 * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e3 * this._optionsService.rawOptions.scrollSensitivity;
        }
        handleTouchStart(e3) {
          this._lastTouchY = e3.touches[0].pageY;
        }
        handleTouchMove(e3) {
          const t3 = this._lastTouchY - e3.touches[0].pageY;
          return this._lastTouchY = e3.touches[0].pageY, t3 !== 0 && (this._viewportElement.scrollTop += t3, this._bubbleScroll(e3, t3));
        }
      };
      t2.Viewport = l = s2([r(2, c.IBufferService), r(3, c.IOptionsService), r(4, o.ICharSizeService), r(5, o.IRenderService), r(6, o.ICoreBrowserService), r(7, o.IThemeService)], l);
    }, 3107: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferDecorationRenderer = undefined;
      const n = i2(3656), o = i2(4725), a = i2(844), h = i2(2585);
      let c = t2.BufferDecorationRenderer = class extends a.Disposable {
        constructor(e3, t3, i3, s3) {
          super(), this._screenElement = e3, this._bufferService = t3, this._decorationService = i3, this._renderService = s3, this._decorationElements = new Map, this._altBufferIsActive = false, this._dimensionsChanged = false, this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this.register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations())), this.register(this._renderService.onDimensionsChange(() => {
            this._dimensionsChanged = true, this._queueRefresh();
          })), this.register((0, n.addDisposableDomListener)(window, "resize", () => this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(() => {
            this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
          })), this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this.register(this._decorationService.onDecorationRemoved((e4) => this._removeDecoration(e4))), this.register((0, a.toDisposable)(() => {
            this._container.remove(), this._decorationElements.clear();
          }));
        }
        _queueRefresh() {
          this._animationFrame === undefined && (this._animationFrame = this._renderService.addRefreshCallback(() => {
            this._doRefreshDecorations(), this._animationFrame = undefined;
          }));
        }
        _doRefreshDecorations() {
          for (const e3 of this._decorationService.decorations)
            this._renderDecoration(e3);
          this._dimensionsChanged = false;
        }
        _renderDecoration(e3) {
          this._refreshStyle(e3), this._dimensionsChanged && this._refreshXPosition(e3);
        }
        _createElement(e3) {
          const t3 = document.createElement("div");
          t3.classList.add("xterm-decoration"), t3.classList.toggle("xterm-decoration-top-layer", e3?.options?.layer === "top"), t3.style.width = `${Math.round((e3.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, t3.style.height = (e3.options.height || 1) * this._renderService.dimensions.css.cell.height + "px", t3.style.top = (e3.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height + "px", t3.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
          const i3 = e3.options.x ?? 0;
          return i3 && i3 > this._bufferService.cols && (t3.style.display = "none"), this._refreshXPosition(e3, t3), t3;
        }
        _refreshStyle(e3) {
          const t3 = e3.marker.line - this._bufferService.buffers.active.ydisp;
          if (t3 < 0 || t3 >= this._bufferService.rows)
            e3.element && (e3.element.style.display = "none", e3.onRenderEmitter.fire(e3.element));
          else {
            let i3 = this._decorationElements.get(e3);
            i3 || (i3 = this._createElement(e3), e3.element = i3, this._decorationElements.set(e3, i3), this._container.appendChild(i3), e3.onDispose(() => {
              this._decorationElements.delete(e3), i3.remove();
            })), i3.style.top = t3 * this._renderService.dimensions.css.cell.height + "px", i3.style.display = this._altBufferIsActive ? "none" : "block", e3.onRenderEmitter.fire(i3);
          }
        }
        _refreshXPosition(e3, t3 = e3.element) {
          if (!t3)
            return;
          const i3 = e3.options.x ?? 0;
          (e3.options.anchor || "left") === "right" ? t3.style.right = i3 ? i3 * this._renderService.dimensions.css.cell.width + "px" : "" : t3.style.left = i3 ? i3 * this._renderService.dimensions.css.cell.width + "px" : "";
        }
        _removeDecoration(e3) {
          this._decorationElements.get(e3)?.remove(), this._decorationElements.delete(e3), e3.dispose();
        }
      };
      t2.BufferDecorationRenderer = c = s2([r(1, h.IBufferService), r(2, h.IDecorationService), r(3, o.IRenderService)], c);
    }, 5871: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.ColorZoneStore = undefined, t2.ColorZoneStore = class {
        constructor() {
          this._zones = [], this._zonePool = [], this._zonePoolIndex = 0, this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
        }
        get zones() {
          return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
        }
        clear() {
          this._zones.length = 0, this._zonePoolIndex = 0;
        }
        addDecoration(e3) {
          if (e3.options.overviewRulerOptions) {
            for (const t3 of this._zones)
              if (t3.color === e3.options.overviewRulerOptions.color && t3.position === e3.options.overviewRulerOptions.position) {
                if (this._lineIntersectsZone(t3, e3.marker.line))
                  return;
                if (this._lineAdjacentToZone(t3, e3.marker.line, e3.options.overviewRulerOptions.position))
                  return void this._addLineToZone(t3, e3.marker.line);
              }
            if (this._zonePoolIndex < this._zonePool.length)
              return this._zonePool[this._zonePoolIndex].color = e3.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = e3.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = e3.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = e3.marker.line, void this._zones.push(this._zonePool[this._zonePoolIndex++]);
            this._zones.push({ color: e3.options.overviewRulerOptions.color, position: e3.options.overviewRulerOptions.position, startBufferLine: e3.marker.line, endBufferLine: e3.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
          }
        }
        setPadding(e3) {
          this._linePadding = e3;
        }
        _lineIntersectsZone(e3, t3) {
          return t3 >= e3.startBufferLine && t3 <= e3.endBufferLine;
        }
        _lineAdjacentToZone(e3, t3, i2) {
          return t3 >= e3.startBufferLine - this._linePadding[i2 || "full"] && t3 <= e3.endBufferLine + this._linePadding[i2 || "full"];
        }
        _addLineToZone(e3, t3) {
          e3.startBufferLine = Math.min(e3.startBufferLine, t3), e3.endBufferLine = Math.max(e3.endBufferLine, t3);
        }
      };
    }, 5744: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.OverviewRulerRenderer = undefined;
      const n = i2(5871), o = i2(3656), a = i2(4725), h = i2(844), c = i2(2585), l = { full: 0, left: 0, center: 0, right: 0 }, d = { full: 0, left: 0, center: 0, right: 0 }, _ = { full: 0, left: 0, center: 0, right: 0 };
      let u = t2.OverviewRulerRenderer = class extends h.Disposable {
        get _width() {
          return this._optionsService.options.overviewRulerWidth || 0;
        }
        constructor(e3, t3, i3, s3, r2, o2, a2) {
          super(), this._viewportElement = e3, this._screenElement = t3, this._bufferService = i3, this._decorationService = s3, this._renderService = r2, this._optionsService = o2, this._coreBrowseService = a2, this._colorZoneStore = new n.ColorZoneStore, this._shouldUpdateDimensions = true, this._shouldUpdateAnchor = true, this._lastKnownBufferLength = 0, this._canvas = document.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement);
          const c2 = this._canvas.getContext("2d");
          if (!c2)
            throw new Error("Ctx cannot be null");
          this._ctx = c2, this._registerDecorationListeners(), this._registerBufferChangeListeners(), this._registerDimensionChangeListeners(), this.register((0, h.toDisposable)(() => {
            this._canvas?.remove();
          }));
        }
        _registerDecorationListeners() {
          this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(undefined, true))), this.register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(undefined, true)));
        }
        _registerBufferChangeListeners() {
          this.register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(() => {
            this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
          })), this.register(this._bufferService.onScroll(() => {
            this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
          }));
        }
        _registerDimensionChangeListeners() {
          this.register(this._renderService.onRender(() => {
            this._containerHeight && this._containerHeight === this._screenElement.clientHeight || (this._queueRefresh(true), this._containerHeight = this._screenElement.clientHeight);
          })), this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth", () => this._queueRefresh(true))), this.register((0, o.addDisposableDomListener)(this._coreBrowseService.window, "resize", () => this._queueRefresh(true))), this._queueRefresh(true);
        }
        _refreshDrawConstants() {
          const e3 = Math.floor(this._canvas.width / 3), t3 = Math.ceil(this._canvas.width / 3);
          d.full = this._canvas.width, d.left = e3, d.center = t3, d.right = e3, this._refreshDrawHeightConstants(), _.full = 0, _.left = 0, _.center = d.left, _.right = d.left + d.center;
        }
        _refreshDrawHeightConstants() {
          l.full = Math.round(2 * this._coreBrowseService.dpr);
          const e3 = this._canvas.height / this._bufferService.buffer.lines.length, t3 = Math.round(Math.max(Math.min(e3, 12), 6) * this._coreBrowseService.dpr);
          l.left = t3, l.center = t3, l.right = t3;
        }
        _refreshColorZonePadding() {
          this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
        }
        _refreshCanvasDimensions() {
          this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowseService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowseService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
        }
        _refreshDecorations() {
          this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
          for (const e4 of this._decorationService.decorations)
            this._colorZoneStore.addDecoration(e4);
          this._ctx.lineWidth = 1;
          const e3 = this._colorZoneStore.zones;
          for (const t3 of e3)
            t3.position !== "full" && this._renderColorZone(t3);
          for (const t3 of e3)
            t3.position === "full" && this._renderColorZone(t3);
          this._shouldUpdateDimensions = false, this._shouldUpdateAnchor = false;
        }
        _renderColorZone(e3) {
          this._ctx.fillStyle = e3.color, this._ctx.fillRect(_[e3.position || "full"], Math.round((this._canvas.height - 1) * (e3.startBufferLine / this._bufferService.buffers.active.lines.length) - l[e3.position || "full"] / 2), d[e3.position || "full"], Math.round((this._canvas.height - 1) * ((e3.endBufferLine - e3.startBufferLine) / this._bufferService.buffers.active.lines.length) + l[e3.position || "full"]));
        }
        _queueRefresh(e3, t3) {
          this._shouldUpdateDimensions = e3 || this._shouldUpdateDimensions, this._shouldUpdateAnchor = t3 || this._shouldUpdateAnchor, this._animationFrame === undefined && (this._animationFrame = this._coreBrowseService.window.requestAnimationFrame(() => {
            this._refreshDecorations(), this._animationFrame = undefined;
          }));
        }
      };
      t2.OverviewRulerRenderer = u = s2([r(2, c.IBufferService), r(3, c.IDecorationService), r(4, a.IRenderService), r(5, c.IOptionsService), r(6, a.ICoreBrowserService)], u);
    }, 2950: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.CompositionHelper = undefined;
      const n = i2(4725), o = i2(2585), a = i2(2584);
      let h = t2.CompositionHelper = class {
        get isComposing() {
          return this._isComposing;
        }
        constructor(e3, t3, i3, s3, r2, n2) {
          this._textarea = e3, this._compositionView = t3, this._bufferService = i3, this._optionsService = s3, this._coreService = r2, this._renderService = n2, this._isComposing = false, this._isSendingComposition = false, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
        }
        compositionstart() {
          this._isComposing = true, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
        }
        compositionupdate(e3) {
          this._compositionView.textContent = e3.data, this.updateCompositionElements(), setTimeout(() => {
            this._compositionPosition.end = this._textarea.value.length;
          }, 0);
        }
        compositionend() {
          this._finalizeComposition(true);
        }
        keydown(e3) {
          if (this._isComposing || this._isSendingComposition) {
            if (e3.keyCode === 229)
              return false;
            if (e3.keyCode === 16 || e3.keyCode === 17 || e3.keyCode === 18)
              return false;
            this._finalizeComposition(false);
          }
          return e3.keyCode !== 229 || (this._handleAnyTextareaChanges(), false);
        }
        _finalizeComposition(e3) {
          if (this._compositionView.classList.remove("active"), this._isComposing = false, e3) {
            const e4 = { start: this._compositionPosition.start, end: this._compositionPosition.end };
            this._isSendingComposition = true, setTimeout(() => {
              if (this._isSendingComposition) {
                let t3;
                this._isSendingComposition = false, e4.start += this._dataAlreadySent.length, t3 = this._isComposing ? this._textarea.value.substring(e4.start, e4.end) : this._textarea.value.substring(e4.start), t3.length > 0 && this._coreService.triggerDataEvent(t3, true);
              }
            }, 0);
          } else {
            this._isSendingComposition = false;
            const e4 = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
            this._coreService.triggerDataEvent(e4, true);
          }
        }
        _handleAnyTextareaChanges() {
          const e3 = this._textarea.value;
          setTimeout(() => {
            if (!this._isComposing) {
              const t3 = this._textarea.value, i3 = t3.replace(e3, "");
              this._dataAlreadySent = i3, t3.length > e3.length ? this._coreService.triggerDataEvent(i3, true) : t3.length < e3.length ? this._coreService.triggerDataEvent(`${a.C0.DEL}`, true) : t3.length === e3.length && t3 !== e3 && this._coreService.triggerDataEvent(t3, true);
            }
          }, 0);
        }
        updateCompositionElements(e3) {
          if (this._isComposing) {
            if (this._bufferService.buffer.isCursorInViewport) {
              const e4 = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), t3 = this._renderService.dimensions.css.cell.height, i3 = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, s3 = e4 * this._renderService.dimensions.css.cell.width;
              this._compositionView.style.left = s3 + "px", this._compositionView.style.top = i3 + "px", this._compositionView.style.height = t3 + "px", this._compositionView.style.lineHeight = t3 + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
              const r2 = this._compositionView.getBoundingClientRect();
              this._textarea.style.left = s3 + "px", this._textarea.style.top = i3 + "px", this._textarea.style.width = Math.max(r2.width, 1) + "px", this._textarea.style.height = Math.max(r2.height, 1) + "px", this._textarea.style.lineHeight = r2.height + "px";
            }
            e3 || setTimeout(() => this.updateCompositionElements(true), 0);
          }
        }
      };
      t2.CompositionHelper = h = s2([r(2, o.IBufferService), r(3, o.IOptionsService), r(4, o.ICoreService), r(5, n.IRenderService)], h);
    }, 9806: (e2, t2) => {
      function i2(e3, t3, i3) {
        const s2 = i3.getBoundingClientRect(), r = e3.getComputedStyle(i3), n = parseInt(r.getPropertyValue("padding-left")), o = parseInt(r.getPropertyValue("padding-top"));
        return [t3.clientX - s2.left - n, t3.clientY - s2.top - o];
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.getCoords = t2.getCoordsRelativeToElement = undefined, t2.getCoordsRelativeToElement = i2, t2.getCoords = function(e3, t3, s2, r, n, o, a, h, c) {
        if (!o)
          return;
        const l = i2(e3, t3, s2);
        return l ? (l[0] = Math.ceil((l[0] + (c ? a / 2 : 0)) / a), l[1] = Math.ceil(l[1] / h), l[0] = Math.min(Math.max(l[0], 1), r + (c ? 1 : 0)), l[1] = Math.min(Math.max(l[1], 1), n), l) : undefined;
      };
    }, 9504: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.moveToCellSequence = undefined;
      const s2 = i2(2584);
      function r(e3, t3, i3, s3) {
        const r2 = e3 - n(e3, i3), a2 = t3 - n(t3, i3), l = Math.abs(r2 - a2) - function(e4, t4, i4) {
          let s4 = 0;
          const r3 = e4 - n(e4, i4), a3 = t4 - n(t4, i4);
          for (let n2 = 0;n2 < Math.abs(r3 - a3); n2++) {
            const a4 = o(e4, t4) === "A" ? -1 : 1, h2 = i4.buffer.lines.get(r3 + a4 * n2);
            h2?.isWrapped && s4++;
          }
          return s4;
        }(e3, t3, i3);
        return c(l, h(o(e3, t3), s3));
      }
      function n(e3, t3) {
        let i3 = 0, s3 = t3.buffer.lines.get(e3), r2 = s3?.isWrapped;
        for (;r2 && e3 >= 0 && e3 < t3.rows; )
          i3++, s3 = t3.buffer.lines.get(--e3), r2 = s3?.isWrapped;
        return i3;
      }
      function o(e3, t3) {
        return e3 > t3 ? "A" : "B";
      }
      function a(e3, t3, i3, s3, r2, n2) {
        let o2 = e3, a2 = t3, h2 = "";
        for (;o2 !== i3 || a2 !== s3; )
          o2 += r2 ? 1 : -1, r2 && o2 > n2.cols - 1 ? (h2 += n2.buffer.translateBufferLineToString(a2, false, e3, o2), o2 = 0, e3 = 0, a2++) : !r2 && o2 < 0 && (h2 += n2.buffer.translateBufferLineToString(a2, false, 0, e3 + 1), o2 = n2.cols - 1, e3 = o2, a2--);
        return h2 + n2.buffer.translateBufferLineToString(a2, false, e3, o2);
      }
      function h(e3, t3) {
        const i3 = t3 ? "O" : "[";
        return s2.C0.ESC + i3 + e3;
      }
      function c(e3, t3) {
        e3 = Math.floor(e3);
        let i3 = "";
        for (let s3 = 0;s3 < e3; s3++)
          i3 += t3;
        return i3;
      }
      t2.moveToCellSequence = function(e3, t3, i3, s3) {
        const o2 = i3.buffer.x, l = i3.buffer.y;
        if (!i3.buffer.hasScrollback)
          return function(e4, t4, i4, s4, o3, l2) {
            return r(t4, s4, o3, l2).length === 0 ? "" : c(a(e4, t4, e4, t4 - n(t4, o3), false, o3).length, h("D", l2));
          }(o2, l, 0, t3, i3, s3) + r(l, t3, i3, s3) + function(e4, t4, i4, s4, o3, l2) {
            let d2;
            d2 = r(t4, s4, o3, l2).length > 0 ? s4 - n(s4, o3) : t4;
            const _2 = s4, u = function(e5, t5, i5, s5, o4, a2) {
              let h2;
              return h2 = r(i5, s5, o4, a2).length > 0 ? s5 - n(s5, o4) : t5, e5 < i5 && h2 <= s5 || e5 >= i5 && h2 < s5 ? "C" : "D";
            }(e4, t4, i4, s4, o3, l2);
            return c(a(e4, d2, i4, _2, u === "C", o3).length, h(u, l2));
          }(o2, l, e3, t3, i3, s3);
        let d;
        if (l === t3)
          return d = o2 > e3 ? "D" : "C", c(Math.abs(o2 - e3), h(d, s3));
        d = l > t3 ? "D" : "C";
        const _ = Math.abs(l - t3);
        return c(function(e4, t4) {
          return t4.cols - e4;
        }(l > t3 ? e3 : o2, i3) + (_ - 1) * i3.cols + 1 + ((l > t3 ? o2 : e3) - 1), h(d, s3));
      };
    }, 1296: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.DomRenderer = undefined;
      const n = i2(3787), o = i2(2550), a = i2(2223), h = i2(6171), c = i2(4725), l = i2(8055), d = i2(8460), _ = i2(844), u = i2(2585), f = "xterm-dom-renderer-owner-", v = "xterm-rows", p = "xterm-fg-", g = "xterm-bg-", m = "xterm-focus", S = "xterm-selection";
      let C = 1, b = t2.DomRenderer = class extends _.Disposable {
        constructor(e3, t3, i3, s3, r2, a2, c2, l2, u2, p2, g2, m2) {
          super(), this._document = e3, this._element = t3, this._screenElement = i3, this._viewportElement = s3, this._helperContainer = r2, this._linkifier2 = a2, this._charSizeService = l2, this._optionsService = u2, this._bufferService = p2, this._coreBrowserService = g2, this._themeService = m2, this._terminalClass = C++, this._rowElements = [], this.onRequestRedraw = this.register(new d.EventEmitter).event, this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(v), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(S), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = (0, h.createRenderDimensions)(), this._updateDimensions(), this.register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this.register(this._themeService.onChangeColors((e4) => this._injectCss(e4))), this._injectCss(this._themeService.colors), this._rowFactory = c2.createInstance(n.DomRendererRowFactory, document), this._element.classList.add(f + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this.register(this._linkifier2.onShowLinkUnderline((e4) => this._handleLinkHover(e4))), this.register(this._linkifier2.onHideLinkUnderline((e4) => this._handleLinkLeave(e4))), this.register((0, _.toDisposable)(() => {
            this._element.classList.remove(f + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
          })), this._widthCache = new o.WidthCache(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
        }
        _updateDimensions() {
          const e3 = this._coreBrowserService.dpr;
          this.dimensions.device.char.width = this._charSizeService.width * e3, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e3), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e3), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e3), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
          for (const e4 of this._rowElements)
            e4.style.width = `${this.dimensions.css.canvas.width}px`, e4.style.height = `${this.dimensions.css.cell.height}px`, e4.style.lineHeight = `${this.dimensions.css.cell.height}px`, e4.style.overflow = "hidden";
          this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
          const t3 = `${this._terminalSelector} .${v} span { display: inline-block; height: 100%; vertical-align: top;}`;
          this._dimensionsStyleElement.textContent = t3, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
        }
        _injectCss(e3) {
          this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
          let t3 = `${this._terminalSelector} .${v} { color: ${e3.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
          t3 += `${this._terminalSelector} .${v} .xterm-dim { color: ${l.color.multiplyOpacity(e3.foreground, 0.5).css};}`, t3 += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`, t3 += "@keyframes blink_box_shadow_" + this._terminalClass + " { 50% {  border-bottom-style: hidden; }}", t3 += "@keyframes blink_block_" + this._terminalClass + " { 0% {" + `  background-color: ${e3.cursor.css};` + `  color: ${e3.cursorAccent.css}; } 50% {  background-color: inherit;` + `  color: ${e3.cursor.css}; }}`, t3 += `${this._terminalSelector} .${v}.${m} .xterm-cursor.xterm-cursor-blink:not(.xterm-cursor-block) { animation: blink_box_shadow_` + this._terminalClass + " 1s step-end infinite;}" + `${this._terminalSelector} .${v}.${m} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: blink_block_` + this._terminalClass + " 1s step-end infinite;}" + `${this._terminalSelector} .${v} .xterm-cursor.xterm-cursor-block {` + ` background-color: ${e3.cursor.css} !important;` + ` color: ${e3.cursorAccent.css} !important;}` + `${this._terminalSelector} .${v} .xterm-cursor.xterm-cursor-outline {` + ` outline: 1px solid ${e3.cursor.css}; outline-offset: -1px;}` + `${this._terminalSelector} .${v} .xterm-cursor.xterm-cursor-bar {` + ` box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e3.cursor.css} inset;}` + `${this._terminalSelector} .${v} .xterm-cursor.xterm-cursor-underline {` + ` border-bottom: 1px ${e3.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, t3 += `${this._terminalSelector} .${S} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${S} div { position: absolute; background-color: ${e3.selectionBackgroundOpaque.css};}${this._terminalSelector} .${S} div { position: absolute; background-color: ${e3.selectionInactiveBackgroundOpaque.css};}`;
          for (const [i3, s3] of e3.ansi.entries())
            t3 += `${this._terminalSelector} .${p}${i3} { color: ${s3.css}; }${this._terminalSelector} .${p}${i3}.xterm-dim { color: ${l.color.multiplyOpacity(s3, 0.5).css}; }${this._terminalSelector} .${g}${i3} { background-color: ${s3.css}; }`;
          t3 += `${this._terminalSelector} .${p}${a.INVERTED_DEFAULT_COLOR} { color: ${l.color.opaque(e3.background).css}; }${this._terminalSelector} .${p}${a.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${l.color.multiplyOpacity(l.color.opaque(e3.background), 0.5).css}; }${this._terminalSelector} .${g}${a.INVERTED_DEFAULT_COLOR} { background-color: ${e3.foreground.css}; }`, this._themeStyleElement.textContent = t3;
        }
        _setDefaultSpacing() {
          const e3 = this.dimensions.css.cell.width - this._widthCache.get("W", false, false);
          this._rowContainer.style.letterSpacing = `${e3}px`, this._rowFactory.defaultSpacing = e3;
        }
        handleDevicePixelRatioChange() {
          this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
        }
        _refreshRowElements(e3, t3) {
          for (let e4 = this._rowElements.length;e4 <= t3; e4++) {
            const e5 = this._document.createElement("div");
            this._rowContainer.appendChild(e5), this._rowElements.push(e5);
          }
          for (;this._rowElements.length > t3; )
            this._rowContainer.removeChild(this._rowElements.pop());
        }
        handleResize(e3, t3) {
          this._refreshRowElements(e3, t3), this._updateDimensions();
        }
        handleCharSizeChanged() {
          this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
        }
        handleBlur() {
          this._rowContainer.classList.remove(m), this.renderRows(0, this._bufferService.rows - 1);
        }
        handleFocus() {
          this._rowContainer.classList.add(m), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
        }
        handleSelectionChanged(e3, t3, i3) {
          if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e3, t3, i3), this.renderRows(0, this._bufferService.rows - 1), !e3 || !t3)
            return;
          const s3 = e3[1] - this._bufferService.buffer.ydisp, r2 = t3[1] - this._bufferService.buffer.ydisp, n2 = Math.max(s3, 0), o2 = Math.min(r2, this._bufferService.rows - 1);
          if (n2 >= this._bufferService.rows || o2 < 0)
            return;
          const a2 = this._document.createDocumentFragment();
          if (i3) {
            const i4 = e3[0] > t3[0];
            a2.appendChild(this._createSelectionElement(n2, i4 ? t3[0] : e3[0], i4 ? e3[0] : t3[0], o2 - n2 + 1));
          } else {
            const i4 = s3 === n2 ? e3[0] : 0, h2 = n2 === r2 ? t3[0] : this._bufferService.cols;
            a2.appendChild(this._createSelectionElement(n2, i4, h2));
            const c2 = o2 - n2 - 1;
            if (a2.appendChild(this._createSelectionElement(n2 + 1, 0, this._bufferService.cols, c2)), n2 !== o2) {
              const e4 = r2 === o2 ? t3[0] : this._bufferService.cols;
              a2.appendChild(this._createSelectionElement(o2, 0, e4));
            }
          }
          this._selectionContainer.appendChild(a2);
        }
        _createSelectionElement(e3, t3, i3, s3 = 1) {
          const r2 = this._document.createElement("div");
          return r2.style.height = s3 * this.dimensions.css.cell.height + "px", r2.style.top = e3 * this.dimensions.css.cell.height + "px", r2.style.left = t3 * this.dimensions.css.cell.width + "px", r2.style.width = this.dimensions.css.cell.width * (i3 - t3) + "px", r2;
        }
        handleCursorMove() {
        }
        _handleOptionsChanged() {
          this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
        }
        clear() {
          for (const e3 of this._rowElements)
            e3.replaceChildren();
        }
        renderRows(e3, t3) {
          const i3 = this._bufferService.buffer, s3 = i3.ybase + i3.y, r2 = Math.min(i3.x, this._bufferService.cols - 1), n2 = this._optionsService.rawOptions.cursorBlink, o2 = this._optionsService.rawOptions.cursorStyle, a2 = this._optionsService.rawOptions.cursorInactiveStyle;
          for (let h2 = e3;h2 <= t3; h2++) {
            const e4 = h2 + i3.ydisp, t4 = this._rowElements[h2], c2 = i3.lines.get(e4);
            if (!t4 || !c2)
              break;
            t4.replaceChildren(...this._rowFactory.createRow(c2, e4, e4 === s3, o2, a2, r2, n2, this.dimensions.css.cell.width, this._widthCache, -1, -1));
          }
        }
        get _terminalSelector() {
          return `.${f}${this._terminalClass}`;
        }
        _handleLinkHover(e3) {
          this._setCellUnderline(e3.x1, e3.x2, e3.y1, e3.y2, e3.cols, true);
        }
        _handleLinkLeave(e3) {
          this._setCellUnderline(e3.x1, e3.x2, e3.y1, e3.y2, e3.cols, false);
        }
        _setCellUnderline(e3, t3, i3, s3, r2, n2) {
          i3 < 0 && (e3 = 0), s3 < 0 && (t3 = 0);
          const o2 = this._bufferService.rows - 1;
          i3 = Math.max(Math.min(i3, o2), 0), s3 = Math.max(Math.min(s3, o2), 0), r2 = Math.min(r2, this._bufferService.cols);
          const a2 = this._bufferService.buffer, h2 = a2.ybase + a2.y, c2 = Math.min(a2.x, r2 - 1), l2 = this._optionsService.rawOptions.cursorBlink, d2 = this._optionsService.rawOptions.cursorStyle, _2 = this._optionsService.rawOptions.cursorInactiveStyle;
          for (let o3 = i3;o3 <= s3; ++o3) {
            const u2 = o3 + a2.ydisp, f2 = this._rowElements[o3], v2 = a2.lines.get(u2);
            if (!f2 || !v2)
              break;
            f2.replaceChildren(...this._rowFactory.createRow(v2, u2, u2 === h2, d2, _2, c2, l2, this.dimensions.css.cell.width, this._widthCache, n2 ? o3 === i3 ? e3 : 0 : -1, n2 ? (o3 === s3 ? t3 : r2) - 1 : -1));
          }
        }
      };
      t2.DomRenderer = b = s2([r(6, u.IInstantiationService), r(7, c.ICharSizeService), r(8, u.IOptionsService), r(9, u.IBufferService), r(10, c.ICoreBrowserService), r(11, c.IThemeService)], b);
    }, 3787: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.DomRendererRowFactory = undefined;
      const n = i2(2223), o = i2(643), a = i2(511), h = i2(2585), c = i2(8055), l = i2(4725), d = i2(4269), _ = i2(6171), u = i2(3734);
      let f = t2.DomRendererRowFactory = class {
        constructor(e3, t3, i3, s3, r2, n2, o2) {
          this._document = e3, this._characterJoinerService = t3, this._optionsService = i3, this._coreBrowserService = s3, this._coreService = r2, this._decorationService = n2, this._themeService = o2, this._workCell = new a.CellData, this._columnSelectMode = false, this.defaultSpacing = 0;
        }
        handleSelectionChanged(e3, t3, i3) {
          this._selectionStart = e3, this._selectionEnd = t3, this._columnSelectMode = i3;
        }
        createRow(e3, t3, i3, s3, r2, a2, h2, l2, _2, f2, p) {
          const g = [], m = this._characterJoinerService.getJoinedCharacters(t3), S = this._themeService.colors;
          let C, b = e3.getNoBgTrimmedLength();
          i3 && b < a2 + 1 && (b = a2 + 1);
          let y = 0, w = "", E = 0, k = 0, L = 0, D = false, R = 0, x = false, A = 0;
          const B = [], T = f2 !== -1 && p !== -1;
          for (let M = 0;M < b; M++) {
            e3.loadCell(M, this._workCell);
            let b2 = this._workCell.getWidth();
            if (b2 === 0)
              continue;
            let O = false, P = M, I = this._workCell;
            if (m.length > 0 && M === m[0][0]) {
              O = true;
              const t4 = m.shift();
              I = new d.JoinedCellData(this._workCell, e3.translateToString(true, t4[0], t4[1]), t4[1] - t4[0]), P = t4[1] - 1, b2 = I.getWidth();
            }
            const H = this._isCellInSelection(M, t3), F = i3 && M === a2, W = T && M >= f2 && M <= p;
            let U = false;
            this._decorationService.forEachDecorationAtCell(M, t3, undefined, (e4) => {
              U = true;
            });
            let N = I.getChars() || o.WHITESPACE_CELL_CHAR;
            if (N === " " && (I.isUnderline() || I.isOverline()) && (N = "\xA0"), A = b2 * l2 - _2.get(N, I.isBold(), I.isItalic()), C) {
              if (y && (H && x || !H && !x && I.bg === E) && (H && x && S.selectionForeground || I.fg === k) && I.extended.ext === L && W === D && A === R && !F && !O && !U) {
                I.isInvisible() ? w += o.WHITESPACE_CELL_CHAR : w += N, y++;
                continue;
              }
              y && (C.textContent = w), C = this._document.createElement("span"), y = 0, w = "";
            } else
              C = this._document.createElement("span");
            if (E = I.bg, k = I.fg, L = I.extended.ext, D = W, R = A, x = H, O && a2 >= M && a2 <= P && (a2 = M), !this._coreService.isCursorHidden && F && this._coreService.isCursorInitialized) {
              if (B.push("xterm-cursor"), this._coreBrowserService.isFocused)
                h2 && B.push("xterm-cursor-blink"), B.push(s3 === "bar" ? "xterm-cursor-bar" : s3 === "underline" ? "xterm-cursor-underline" : "xterm-cursor-block");
              else if (r2)
                switch (r2) {
                  case "outline":
                    B.push("xterm-cursor-outline");
                    break;
                  case "block":
                    B.push("xterm-cursor-block");
                    break;
                  case "bar":
                    B.push("xterm-cursor-bar");
                    break;
                  case "underline":
                    B.push("xterm-cursor-underline");
                }
            }
            if (I.isBold() && B.push("xterm-bold"), I.isItalic() && B.push("xterm-italic"), I.isDim() && B.push("xterm-dim"), w = I.isInvisible() ? o.WHITESPACE_CELL_CHAR : I.getChars() || o.WHITESPACE_CELL_CHAR, I.isUnderline() && (B.push(`xterm-underline-${I.extended.underlineStyle}`), w === " " && (w = "\xA0"), !I.isUnderlineColorDefault()))
              if (I.isUnderlineColorRGB())
                C.style.textDecorationColor = `rgb(${u.AttributeData.toColorRGB(I.getUnderlineColor()).join(",")})`;
              else {
                let e4 = I.getUnderlineColor();
                this._optionsService.rawOptions.drawBoldTextInBrightColors && I.isBold() && e4 < 8 && (e4 += 8), C.style.textDecorationColor = S.ansi[e4].css;
              }
            I.isOverline() && (B.push("xterm-overline"), w === " " && (w = "\xA0")), I.isStrikethrough() && B.push("xterm-strikethrough"), W && (C.style.textDecoration = "underline");
            let $ = I.getFgColor(), j = I.getFgColorMode(), z = I.getBgColor(), K = I.getBgColorMode();
            const q = !!I.isInverse();
            if (q) {
              const e4 = $;
              $ = z, z = e4;
              const t4 = j;
              j = K, K = t4;
            }
            let V, G, X, J = false;
            switch (this._decorationService.forEachDecorationAtCell(M, t3, undefined, (e4) => {
              e4.options.layer !== "top" && J || (e4.backgroundColorRGB && (K = 50331648, z = e4.backgroundColorRGB.rgba >> 8 & 16777215, V = e4.backgroundColorRGB), e4.foregroundColorRGB && (j = 50331648, $ = e4.foregroundColorRGB.rgba >> 8 & 16777215, G = e4.foregroundColorRGB), J = e4.options.layer === "top");
            }), !J && H && (V = this._coreBrowserService.isFocused ? S.selectionBackgroundOpaque : S.selectionInactiveBackgroundOpaque, z = V.rgba >> 8 & 16777215, K = 50331648, J = true, S.selectionForeground && (j = 50331648, $ = S.selectionForeground.rgba >> 8 & 16777215, G = S.selectionForeground)), J && B.push("xterm-decoration-top"), K) {
              case 16777216:
              case 33554432:
                X = S.ansi[z], B.push(`xterm-bg-${z}`);
                break;
              case 50331648:
                X = c.rgba.toColor(z >> 16, z >> 8 & 255, 255 & z), this._addStyle(C, `background-color:#${v((z >>> 0).toString(16), "0", 6)}`);
                break;
              default:
                q ? (X = S.foreground, B.push(`xterm-bg-${n.INVERTED_DEFAULT_COLOR}`)) : X = S.background;
            }
            switch (V || I.isDim() && (V = c.color.multiplyOpacity(X, 0.5)), j) {
              case 16777216:
              case 33554432:
                I.isBold() && $ < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && ($ += 8), this._applyMinimumContrast(C, X, S.ansi[$], I, V, undefined) || B.push(`xterm-fg-${$}`);
                break;
              case 50331648:
                const e4 = c.rgba.toColor($ >> 16 & 255, $ >> 8 & 255, 255 & $);
                this._applyMinimumContrast(C, X, e4, I, V, G) || this._addStyle(C, `color:#${v($.toString(16), "0", 6)}`);
                break;
              default:
                this._applyMinimumContrast(C, X, S.foreground, I, V, G) || q && B.push(`xterm-fg-${n.INVERTED_DEFAULT_COLOR}`);
            }
            B.length && (C.className = B.join(" "), B.length = 0), F || O || U ? C.textContent = w : y++, A !== this.defaultSpacing && (C.style.letterSpacing = `${A}px`), g.push(C), M = P;
          }
          return C && y && (C.textContent = w), g;
        }
        _applyMinimumContrast(e3, t3, i3, s3, r2, n2) {
          if (this._optionsService.rawOptions.minimumContrastRatio === 1 || (0, _.excludeFromContrastRatioDemands)(s3.getCode()))
            return false;
          const o2 = this._getContrastCache(s3);
          let a2;
          if (r2 || n2 || (a2 = o2.getColor(t3.rgba, i3.rgba)), a2 === undefined) {
            const e4 = this._optionsService.rawOptions.minimumContrastRatio / (s3.isDim() ? 2 : 1);
            a2 = c.color.ensureContrastRatio(r2 || t3, n2 || i3, e4), o2.setColor((r2 || t3).rgba, (n2 || i3).rgba, a2 ?? null);
          }
          return !!a2 && (this._addStyle(e3, `color:${a2.css}`), true);
        }
        _getContrastCache(e3) {
          return e3.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
        }
        _addStyle(e3, t3) {
          e3.setAttribute("style", `${e3.getAttribute("style") || ""}${t3};`);
        }
        _isCellInSelection(e3, t3) {
          const i3 = this._selectionStart, s3 = this._selectionEnd;
          return !(!i3 || !s3) && (this._columnSelectMode ? i3[0] <= s3[0] ? e3 >= i3[0] && t3 >= i3[1] && e3 < s3[0] && t3 <= s3[1] : e3 < i3[0] && t3 >= i3[1] && e3 >= s3[0] && t3 <= s3[1] : t3 > i3[1] && t3 < s3[1] || i3[1] === s3[1] && t3 === i3[1] && e3 >= i3[0] && e3 < s3[0] || i3[1] < s3[1] && t3 === s3[1] && e3 < s3[0] || i3[1] < s3[1] && t3 === i3[1] && e3 >= i3[0]);
        }
      };
      function v(e3, t3, i3) {
        for (;e3.length < i3; )
          e3 = t3 + e3;
        return e3;
      }
      t2.DomRendererRowFactory = f = s2([r(1, l.ICharacterJoinerService), r(2, h.IOptionsService), r(3, l.ICoreBrowserService), r(4, h.ICoreService), r(5, h.IDecorationService), r(6, l.IThemeService)], f);
    }, 2550: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.WidthCache = undefined, t2.WidthCache = class {
        constructor(e3, t3) {
          this._flat = new Float32Array(256), this._font = "", this._fontSize = 0, this._weight = "normal", this._weightBold = "bold", this._measureElements = [], this._container = e3.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
          const i2 = e3.createElement("span");
          i2.classList.add("xterm-char-measure-element");
          const s2 = e3.createElement("span");
          s2.classList.add("xterm-char-measure-element"), s2.style.fontWeight = "bold";
          const r = e3.createElement("span");
          r.classList.add("xterm-char-measure-element"), r.style.fontStyle = "italic";
          const n = e3.createElement("span");
          n.classList.add("xterm-char-measure-element"), n.style.fontWeight = "bold", n.style.fontStyle = "italic", this._measureElements = [i2, s2, r, n], this._container.appendChild(i2), this._container.appendChild(s2), this._container.appendChild(r), this._container.appendChild(n), t3.appendChild(this._container), this.clear();
        }
        dispose() {
          this._container.remove(), this._measureElements.length = 0, this._holey = undefined;
        }
        clear() {
          this._flat.fill(-9999), this._holey = new Map;
        }
        setFont(e3, t3, i2, s2) {
          e3 === this._font && t3 === this._fontSize && i2 === this._weight && s2 === this._weightBold || (this._font = e3, this._fontSize = t3, this._weight = i2, this._weightBold = s2, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${i2}`, this._measureElements[1].style.fontWeight = `${s2}`, this._measureElements[2].style.fontWeight = `${i2}`, this._measureElements[3].style.fontWeight = `${s2}`, this.clear());
        }
        get(e3, t3, i2) {
          let s2 = 0;
          if (!t3 && !i2 && e3.length === 1 && (s2 = e3.charCodeAt(0)) < 256)
            return this._flat[s2] !== -9999 ? this._flat[s2] : this._flat[s2] = this._measure(e3, 0);
          let r = e3;
          t3 && (r += "B"), i2 && (r += "I");
          let n = this._holey.get(r);
          if (n === undefined) {
            let s3 = 0;
            t3 && (s3 |= 1), i2 && (s3 |= 2), n = this._measure(e3, s3), this._holey.set(r, n);
          }
          return n;
        }
        _measure(e3, t3) {
          const i2 = this._measureElements[t3];
          return i2.textContent = e3.repeat(32), i2.offsetWidth / 32;
        }
      };
    }, 2223: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.TEXT_BASELINE = t2.DIM_OPACITY = t2.INVERTED_DEFAULT_COLOR = undefined;
      const s2 = i2(6114);
      t2.INVERTED_DEFAULT_COLOR = 257, t2.DIM_OPACITY = 0.5, t2.TEXT_BASELINE = s2.isFirefox || s2.isLegacyEdge ? "bottom" : "ideographic";
    }, 6171: (e2, t2) => {
      function i2(e3) {
        return 57508 <= e3 && e3 <= 57558;
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.createRenderDimensions = t2.excludeFromContrastRatioDemands = t2.isRestrictedPowerlineGlyph = t2.isPowerlineGlyph = t2.throwIfFalsy = undefined, t2.throwIfFalsy = function(e3) {
        if (!e3)
          throw new Error("value must not be falsy");
        return e3;
      }, t2.isPowerlineGlyph = i2, t2.isRestrictedPowerlineGlyph = function(e3) {
        return 57520 <= e3 && e3 <= 57527;
      }, t2.excludeFromContrastRatioDemands = function(e3) {
        return i2(e3) || function(e4) {
          return 9472 <= e4 && e4 <= 9631;
        }(e3);
      }, t2.createRenderDimensions = function() {
        return { css: { canvas: { width: 0, height: 0 }, cell: { width: 0, height: 0 } }, device: { canvas: { width: 0, height: 0 }, cell: { width: 0, height: 0 }, char: { width: 0, height: 0, left: 0, top: 0 } } };
      };
    }, 456: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.SelectionModel = undefined, t2.SelectionModel = class {
        constructor(e3) {
          this._bufferService = e3, this.isSelectAllActive = false, this.selectionStartLength = 0;
        }
        clearSelection() {
          this.selectionStart = undefined, this.selectionEnd = undefined, this.isSelectAllActive = false, this.selectionStartLength = 0;
        }
        get finalSelectionStart() {
          return this.isSelectAllActive ? [0, 0] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
        }
        get finalSelectionEnd() {
          if (this.isSelectAllActive)
            return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
          if (this.selectionStart) {
            if (!this.selectionEnd || this.areSelectionValuesReversed()) {
              const e3 = this.selectionStart[0] + this.selectionStartLength;
              return e3 > this._bufferService.cols ? e3 % this._bufferService.cols == 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols) - 1] : [e3 % this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols)] : [e3, this.selectionStart[1]];
            }
            if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
              const e3 = this.selectionStart[0] + this.selectionStartLength;
              return e3 > this._bufferService.cols ? [e3 % this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols)] : [Math.max(e3, this.selectionEnd[0]), this.selectionEnd[1]];
            }
            return this.selectionEnd;
          }
        }
        areSelectionValuesReversed() {
          const e3 = this.selectionStart, t3 = this.selectionEnd;
          return !(!e3 || !t3) && (e3[1] > t3[1] || e3[1] === t3[1] && e3[0] > t3[0]);
        }
        handleTrim(e3) {
          return this.selectionStart && (this.selectionStart[1] -= e3), this.selectionEnd && (this.selectionEnd[1] -= e3), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), true) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), false);
        }
      };
    }, 428: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.CharSizeService = undefined;
      const n = i2(2585), o = i2(8460), a = i2(844);
      let h = t2.CharSizeService = class extends a.Disposable {
        get hasValidSize() {
          return this.width > 0 && this.height > 0;
        }
        constructor(e3, t3, i3) {
          super(), this._optionsService = i3, this.width = 0, this.height = 0, this._onCharSizeChange = this.register(new o.EventEmitter), this.onCharSizeChange = this._onCharSizeChange.event, this._measureStrategy = new c(e3, t3, this._optionsService), this.register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
        }
        measure() {
          const e3 = this._measureStrategy.measure();
          e3.width === this.width && e3.height === this.height || (this.width = e3.width, this.height = e3.height, this._onCharSizeChange.fire());
        }
      };
      t2.CharSizeService = h = s2([r(2, n.IOptionsService)], h);

      class c {
        constructor(e3, t3, i3) {
          this._document = e3, this._parentElement = t3, this._optionsService = i3, this._result = { width: 0, height: 0 }, this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
        }
        measure() {
          this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`;
          const e3 = { height: Number(this._measureElement.offsetHeight), width: Number(this._measureElement.offsetWidth) };
          return e3.width !== 0 && e3.height !== 0 && (this._result.width = e3.width / 32, this._result.height = Math.ceil(e3.height)), this._result;
        }
      }
    }, 4269: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.CharacterJoinerService = t2.JoinedCellData = undefined;
      const n = i2(3734), o = i2(643), a = i2(511), h = i2(2585);

      class c extends n.AttributeData {
        constructor(e3, t3, i3) {
          super(), this.content = 0, this.combinedData = "", this.fg = e3.fg, this.bg = e3.bg, this.combinedData = t3, this._width = i3;
        }
        isCombined() {
          return 2097152;
        }
        getWidth() {
          return this._width;
        }
        getChars() {
          return this.combinedData;
        }
        getCode() {
          return 2097151;
        }
        setFromCharData(e3) {
          throw new Error("not implemented");
        }
        getAsCharData() {
          return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
        }
      }
      t2.JoinedCellData = c;
      let l = t2.CharacterJoinerService = class e3 {
        constructor(e4) {
          this._bufferService = e4, this._characterJoiners = [], this._nextCharacterJoinerId = 0, this._workCell = new a.CellData;
        }
        register(e4) {
          const t3 = { id: this._nextCharacterJoinerId++, handler: e4 };
          return this._characterJoiners.push(t3), t3.id;
        }
        deregister(e4) {
          for (let t3 = 0;t3 < this._characterJoiners.length; t3++)
            if (this._characterJoiners[t3].id === e4)
              return this._characterJoiners.splice(t3, 1), true;
          return false;
        }
        getJoinedCharacters(e4) {
          if (this._characterJoiners.length === 0)
            return [];
          const t3 = this._bufferService.buffer.lines.get(e4);
          if (!t3 || t3.length === 0)
            return [];
          const i3 = [], s3 = t3.translateToString(true);
          let r2 = 0, n2 = 0, a2 = 0, h2 = t3.getFg(0), c2 = t3.getBg(0);
          for (let e5 = 0;e5 < t3.getTrimmedLength(); e5++)
            if (t3.loadCell(e5, this._workCell), this._workCell.getWidth() !== 0) {
              if (this._workCell.fg !== h2 || this._workCell.bg !== c2) {
                if (e5 - r2 > 1) {
                  const e6 = this._getJoinedRanges(s3, a2, n2, t3, r2);
                  for (let t4 = 0;t4 < e6.length; t4++)
                    i3.push(e6[t4]);
                }
                r2 = e5, a2 = n2, h2 = this._workCell.fg, c2 = this._workCell.bg;
              }
              n2 += this._workCell.getChars().length || o.WHITESPACE_CELL_CHAR.length;
            }
          if (this._bufferService.cols - r2 > 1) {
            const e5 = this._getJoinedRanges(s3, a2, n2, t3, r2);
            for (let t4 = 0;t4 < e5.length; t4++)
              i3.push(e5[t4]);
          }
          return i3;
        }
        _getJoinedRanges(t3, i3, s3, r2, n2) {
          const o2 = t3.substring(i3, s3);
          let a2 = [];
          try {
            a2 = this._characterJoiners[0].handler(o2);
          } catch (e4) {
            console.error(e4);
          }
          for (let t4 = 1;t4 < this._characterJoiners.length; t4++)
            try {
              const i4 = this._characterJoiners[t4].handler(o2);
              for (let t5 = 0;t5 < i4.length; t5++)
                e3._mergeRanges(a2, i4[t5]);
            } catch (e4) {
              console.error(e4);
            }
          return this._stringRangesToCellRanges(a2, r2, n2), a2;
        }
        _stringRangesToCellRanges(e4, t3, i3) {
          let s3 = 0, r2 = false, n2 = 0, a2 = e4[s3];
          if (a2) {
            for (let h2 = i3;h2 < this._bufferService.cols; h2++) {
              const i4 = t3.getWidth(h2), c2 = t3.getString(h2).length || o.WHITESPACE_CELL_CHAR.length;
              if (i4 !== 0) {
                if (!r2 && a2[0] <= n2 && (a2[0] = h2, r2 = true), a2[1] <= n2) {
                  if (a2[1] = h2, a2 = e4[++s3], !a2)
                    break;
                  a2[0] <= n2 ? (a2[0] = h2, r2 = true) : r2 = false;
                }
                n2 += c2;
              }
            }
            a2 && (a2[1] = this._bufferService.cols);
          }
        }
        static _mergeRanges(e4, t3) {
          let i3 = false;
          for (let s3 = 0;s3 < e4.length; s3++) {
            const r2 = e4[s3];
            if (i3) {
              if (t3[1] <= r2[0])
                return e4[s3 - 1][1] = t3[1], e4;
              if (t3[1] <= r2[1])
                return e4[s3 - 1][1] = Math.max(t3[1], r2[1]), e4.splice(s3, 1), e4;
              e4.splice(s3, 1), s3--;
            } else {
              if (t3[1] <= r2[0])
                return e4.splice(s3, 0, t3), e4;
              if (t3[1] <= r2[1])
                return r2[0] = Math.min(t3[0], r2[0]), e4;
              t3[0] < r2[1] && (r2[0] = Math.min(t3[0], r2[0]), i3 = true);
            }
          }
          return i3 ? e4[e4.length - 1][1] = t3[1] : e4.push(t3), e4;
        }
      };
      t2.CharacterJoinerService = l = s2([r(0, h.IBufferService)], l);
    }, 5114: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreBrowserService = undefined, t2.CoreBrowserService = class {
        constructor(e3, t3) {
          this._textarea = e3, this.window = t3, this._isFocused = false, this._cachedIsFocused = undefined, this._textarea.addEventListener("focus", () => this._isFocused = true), this._textarea.addEventListener("blur", () => this._isFocused = false);
        }
        get dpr() {
          return this.window.devicePixelRatio;
        }
        get isFocused() {
          return this._cachedIsFocused === undefined && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(() => this._cachedIsFocused = undefined)), this._cachedIsFocused;
        }
      };
    }, 8934: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.MouseService = undefined;
      const n = i2(4725), o = i2(9806);
      let a = t2.MouseService = class {
        constructor(e3, t3) {
          this._renderService = e3, this._charSizeService = t3;
        }
        getCoords(e3, t3, i3, s3, r2) {
          return (0, o.getCoords)(window, e3, t3, i3, s3, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, r2);
        }
        getMouseReportCoords(e3, t3) {
          const i3 = (0, o.getCoordsRelativeToElement)(window, e3, t3);
          if (this._charSizeService.hasValidSize)
            return i3[0] = Math.min(Math.max(i3[0], 0), this._renderService.dimensions.css.canvas.width - 1), i3[1] = Math.min(Math.max(i3[1], 0), this._renderService.dimensions.css.canvas.height - 1), { col: Math.floor(i3[0] / this._renderService.dimensions.css.cell.width), row: Math.floor(i3[1] / this._renderService.dimensions.css.cell.height), x: Math.floor(i3[0]), y: Math.floor(i3[1]) };
        }
      };
      t2.MouseService = a = s2([r(0, n.IRenderService), r(1, n.ICharSizeService)], a);
    }, 3230: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.RenderService = undefined;
      const n = i2(3656), o = i2(6193), a = i2(5596), h = i2(4725), c = i2(8460), l = i2(844), d = i2(7226), _ = i2(2585);
      let u = t2.RenderService = class extends l.Disposable {
        get dimensions() {
          return this._renderer.value.dimensions;
        }
        constructor(e3, t3, i3, s3, r2, h2, _2, u2) {
          if (super(), this._rowCount = e3, this._charSizeService = s3, this._renderer = this.register(new l.MutableDisposable), this._pausedResizeTask = new d.DebouncedIdleTask, this._isPaused = false, this._needsFullRefresh = false, this._isNextRenderRedrawOnly = true, this._needsSelectionRefresh = false, this._canvasWidth = 0, this._canvasHeight = 0, this._selectionState = { start: undefined, end: undefined, columnSelectMode: false }, this._onDimensionsChange = this.register(new c.EventEmitter), this.onDimensionsChange = this._onDimensionsChange.event, this._onRenderedViewportChange = this.register(new c.EventEmitter), this.onRenderedViewportChange = this._onRenderedViewportChange.event, this._onRender = this.register(new c.EventEmitter), this.onRender = this._onRender.event, this._onRefreshRequest = this.register(new c.EventEmitter), this.onRefreshRequest = this._onRefreshRequest.event, this._renderDebouncer = new o.RenderDebouncer(_2.window, (e4, t4) => this._renderRows(e4, t4)), this.register(this._renderDebouncer), this._screenDprMonitor = new a.ScreenDprMonitor(_2.window), this._screenDprMonitor.setListener(() => this.handleDevicePixelRatioChange()), this.register(this._screenDprMonitor), this.register(h2.onResize(() => this._fullRefresh())), this.register(h2.buffers.onBufferActivate(() => this._renderer.value?.clear())), this.register(i3.onOptionChange(() => this._handleOptionsChanged())), this.register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged())), this.register(r2.onDecorationRegistered(() => this._fullRefresh())), this.register(r2.onDecorationRemoved(() => this._fullRefresh())), this.register(i3.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio"], () => {
            this.clear(), this.handleResize(h2.cols, h2.rows), this._fullRefresh();
          })), this.register(i3.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(h2.buffer.y, h2.buffer.y, true))), this.register((0, n.addDisposableDomListener)(_2.window, "resize", () => this.handleDevicePixelRatioChange())), this.register(u2.onChangeColors(() => this._fullRefresh())), ("IntersectionObserver" in _2.window)) {
            const e4 = new _2.window.IntersectionObserver((e5) => this._handleIntersectionChange(e5[e5.length - 1]), { threshold: 0 });
            e4.observe(t3), this.register({ dispose: () => e4.disconnect() });
          }
        }
        _handleIntersectionChange(e3) {
          this._isPaused = e3.isIntersecting === undefined ? e3.intersectionRatio === 0 : !e3.isIntersecting, this._isPaused || this._charSizeService.hasValidSize || this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = false);
        }
        refreshRows(e3, t3, i3 = false) {
          this._isPaused ? this._needsFullRefresh = true : (i3 || (this._isNextRenderRedrawOnly = false), this._renderDebouncer.refresh(e3, t3, this._rowCount));
        }
        _renderRows(e3, t3) {
          this._renderer.value && (e3 = Math.min(e3, this._rowCount - 1), t3 = Math.min(t3, this._rowCount - 1), this._renderer.value.renderRows(e3, t3), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = false), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: e3, end: t3 }), this._onRender.fire({ start: e3, end: t3 }), this._isNextRenderRedrawOnly = true);
        }
        resize(e3, t3) {
          this._rowCount = t3, this._fireOnCanvasResize();
        }
        _handleOptionsChanged() {
          this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
        }
        _fireOnCanvasResize() {
          this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
        }
        hasRenderer() {
          return !!this._renderer.value;
        }
        setRenderer(e3) {
          this._renderer.value = e3, this._renderer.value && (this._renderer.value.onRequestRedraw((e4) => this.refreshRows(e4.start, e4.end, true)), this._needsSelectionRefresh = true, this._fullRefresh());
        }
        addRefreshCallback(e3) {
          return this._renderDebouncer.addRefreshCallback(e3);
        }
        _fullRefresh() {
          this._isPaused ? this._needsFullRefresh = true : this.refreshRows(0, this._rowCount - 1);
        }
        clearTextureAtlas() {
          this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
        }
        handleDevicePixelRatioChange() {
          this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
        }
        handleResize(e3, t3) {
          this._renderer.value && (this._isPaused ? this._pausedResizeTask.set(() => this._renderer.value.handleResize(e3, t3)) : this._renderer.value.handleResize(e3, t3), this._fullRefresh());
        }
        handleCharSizeChanged() {
          this._renderer.value?.handleCharSizeChanged();
        }
        handleBlur() {
          this._renderer.value?.handleBlur();
        }
        handleFocus() {
          this._renderer.value?.handleFocus();
        }
        handleSelectionChanged(e3, t3, i3) {
          this._selectionState.start = e3, this._selectionState.end = t3, this._selectionState.columnSelectMode = i3, this._renderer.value?.handleSelectionChanged(e3, t3, i3);
        }
        handleCursorMove() {
          this._renderer.value?.handleCursorMove();
        }
        clear() {
          this._renderer.value?.clear();
        }
      };
      t2.RenderService = u = s2([r(2, _.IOptionsService), r(3, h.ICharSizeService), r(4, _.IDecorationService), r(5, _.IBufferService), r(6, h.ICoreBrowserService), r(7, h.IThemeService)], u);
    }, 9312: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.SelectionService = undefined;
      const n = i2(9806), o = i2(9504), a = i2(456), h = i2(4725), c = i2(8460), l = i2(844), d = i2(6114), _ = i2(4841), u = i2(511), f = i2(2585), v = String.fromCharCode(160), p = new RegExp(v, "g");
      let g = t2.SelectionService = class extends l.Disposable {
        constructor(e3, t3, i3, s3, r2, n2, o2, h2, d2) {
          super(), this._element = e3, this._screenElement = t3, this._linkifier = i3, this._bufferService = s3, this._coreService = r2, this._mouseService = n2, this._optionsService = o2, this._renderService = h2, this._coreBrowserService = d2, this._dragScrollAmount = 0, this._enabled = true, this._workCell = new u.CellData, this._mouseDownTimeStamp = 0, this._oldHasSelection = false, this._oldSelectionStart = undefined, this._oldSelectionEnd = undefined, this._onLinuxMouseSelection = this.register(new c.EventEmitter), this.onLinuxMouseSelection = this._onLinuxMouseSelection.event, this._onRedrawRequest = this.register(new c.EventEmitter), this.onRequestRedraw = this._onRedrawRequest.event, this._onSelectionChange = this.register(new c.EventEmitter), this.onSelectionChange = this._onSelectionChange.event, this._onRequestScrollLines = this.register(new c.EventEmitter), this.onRequestScrollLines = this._onRequestScrollLines.event, this._mouseMoveListener = (e4) => this._handleMouseMove(e4), this._mouseUpListener = (e4) => this._handleMouseUp(e4), this._coreService.onUserInput(() => {
            this.hasSelection && this.clearSelection();
          }), this._trimListener = this._bufferService.buffer.lines.onTrim((e4) => this._handleTrim(e4)), this.register(this._bufferService.buffers.onBufferActivate((e4) => this._handleBufferActivate(e4))), this.enable(), this._model = new a.SelectionModel(this._bufferService), this._activeSelectionMode = 0, this.register((0, l.toDisposable)(() => {
            this._removeMouseDownListeners();
          }));
        }
        reset() {
          this.clearSelection();
        }
        disable() {
          this.clearSelection(), this._enabled = false;
        }
        enable() {
          this._enabled = true;
        }
        get selectionStart() {
          return this._model.finalSelectionStart;
        }
        get selectionEnd() {
          return this._model.finalSelectionEnd;
        }
        get hasSelection() {
          const e3 = this._model.finalSelectionStart, t3 = this._model.finalSelectionEnd;
          return !(!e3 || !t3 || e3[0] === t3[0] && e3[1] === t3[1]);
        }
        get selectionText() {
          const e3 = this._model.finalSelectionStart, t3 = this._model.finalSelectionEnd;
          if (!e3 || !t3)
            return "";
          const i3 = this._bufferService.buffer, s3 = [];
          if (this._activeSelectionMode === 3) {
            if (e3[0] === t3[0])
              return "";
            const r2 = e3[0] < t3[0] ? e3[0] : t3[0], n2 = e3[0] < t3[0] ? t3[0] : e3[0];
            for (let o2 = e3[1];o2 <= t3[1]; o2++) {
              const e4 = i3.translateBufferLineToString(o2, true, r2, n2);
              s3.push(e4);
            }
          } else {
            const r2 = e3[1] === t3[1] ? t3[0] : undefined;
            s3.push(i3.translateBufferLineToString(e3[1], true, e3[0], r2));
            for (let r3 = e3[1] + 1;r3 <= t3[1] - 1; r3++) {
              const e4 = i3.lines.get(r3), t4 = i3.translateBufferLineToString(r3, true);
              e4?.isWrapped ? s3[s3.length - 1] += t4 : s3.push(t4);
            }
            if (e3[1] !== t3[1]) {
              const e4 = i3.lines.get(t3[1]), r3 = i3.translateBufferLineToString(t3[1], true, 0, t3[0]);
              e4 && e4.isWrapped ? s3[s3.length - 1] += r3 : s3.push(r3);
            }
          }
          return s3.map((e4) => e4.replace(p, " ")).join(d.isWindows ? "\r\n" : "\n");
        }
        clearSelection() {
          this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
        }
        refresh(e3) {
          this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._refresh())), d.isLinux && e3 && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
        }
        _refresh() {
          this._refreshAnimationFrame = undefined, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: this._activeSelectionMode === 3 });
        }
        _isClickInSelection(e3) {
          const t3 = this._getMouseBufferCoords(e3), i3 = this._model.finalSelectionStart, s3 = this._model.finalSelectionEnd;
          return !!(i3 && s3 && t3) && this._areCoordsInSelection(t3, i3, s3);
        }
        isCellInSelection(e3, t3) {
          const i3 = this._model.finalSelectionStart, s3 = this._model.finalSelectionEnd;
          return !(!i3 || !s3) && this._areCoordsInSelection([e3, t3], i3, s3);
        }
        _areCoordsInSelection(e3, t3, i3) {
          return e3[1] > t3[1] && e3[1] < i3[1] || t3[1] === i3[1] && e3[1] === t3[1] && e3[0] >= t3[0] && e3[0] < i3[0] || t3[1] < i3[1] && e3[1] === i3[1] && e3[0] < i3[0] || t3[1] < i3[1] && e3[1] === t3[1] && e3[0] >= t3[0];
        }
        _selectWordAtCursor(e3, t3) {
          const i3 = this._linkifier.currentLink?.link?.range;
          if (i3)
            return this._model.selectionStart = [i3.start.x - 1, i3.start.y - 1], this._model.selectionStartLength = (0, _.getRangeLength)(i3, this._bufferService.cols), this._model.selectionEnd = undefined, true;
          const s3 = this._getMouseBufferCoords(e3);
          return !!s3 && (this._selectWordAt(s3, t3), this._model.selectionEnd = undefined, true);
        }
        selectAll() {
          this._model.isSelectAllActive = true, this.refresh(), this._onSelectionChange.fire();
        }
        selectLines(e3, t3) {
          this._model.clearSelection(), e3 = Math.max(e3, 0), t3 = Math.min(t3, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e3], this._model.selectionEnd = [this._bufferService.cols, t3], this.refresh(), this._onSelectionChange.fire();
        }
        _handleTrim(e3) {
          this._model.handleTrim(e3) && this.refresh();
        }
        _getMouseBufferCoords(e3) {
          const t3 = this._mouseService.getCoords(e3, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
          if (t3)
            return t3[0]--, t3[1]--, t3[1] += this._bufferService.buffer.ydisp, t3;
        }
        _getMouseEventScrollAmount(e3) {
          let t3 = (0, n.getCoordsRelativeToElement)(this._coreBrowserService.window, e3, this._screenElement)[1];
          const i3 = this._renderService.dimensions.css.canvas.height;
          return t3 >= 0 && t3 <= i3 ? 0 : (t3 > i3 && (t3 -= i3), t3 = Math.min(Math.max(t3, -50), 50), t3 /= 50, t3 / Math.abs(t3) + Math.round(14 * t3));
        }
        shouldForceSelection(e3) {
          return d.isMac ? e3.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e3.shiftKey;
        }
        handleMouseDown(e3) {
          if (this._mouseDownTimeStamp = e3.timeStamp, (e3.button !== 2 || !this.hasSelection) && e3.button === 0) {
            if (!this._enabled) {
              if (!this.shouldForceSelection(e3))
                return;
              e3.stopPropagation();
            }
            e3.preventDefault(), this._dragScrollAmount = 0, this._enabled && e3.shiftKey ? this._handleIncrementalClick(e3) : e3.detail === 1 ? this._handleSingleClick(e3) : e3.detail === 2 ? this._handleDoubleClick(e3) : e3.detail === 3 && this._handleTripleClick(e3), this._addMouseDownListeners(), this.refresh(true);
          }
        }
        _addMouseDownListeners() {
          this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), 50);
        }
        _removeMouseDownListeners() {
          this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = undefined;
        }
        _handleIncrementalClick(e3) {
          this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e3));
        }
        _handleSingleClick(e3) {
          if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = false, this._activeSelectionMode = this.shouldColumnSelect(e3) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e3), !this._model.selectionStart)
            return;
          this._model.selectionEnd = undefined;
          const t3 = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
          t3 && t3.length !== this._model.selectionStart[0] && t3.hasWidth(this._model.selectionStart[0]) === 0 && this._model.selectionStart[0]++;
        }
        _handleDoubleClick(e3) {
          this._selectWordAtCursor(e3, true) && (this._activeSelectionMode = 1);
        }
        _handleTripleClick(e3) {
          const t3 = this._getMouseBufferCoords(e3);
          t3 && (this._activeSelectionMode = 2, this._selectLineAt(t3[1]));
        }
        shouldColumnSelect(e3) {
          return e3.altKey && !(d.isMac && this._optionsService.rawOptions.macOptionClickForcesSelection);
        }
        _handleMouseMove(e3) {
          if (e3.stopImmediatePropagation(), !this._model.selectionStart)
            return;
          const t3 = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
          if (this._model.selectionEnd = this._getMouseBufferCoords(e3), !this._model.selectionEnd)
            return void this.refresh(true);
          this._activeSelectionMode === 2 ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : this._activeSelectionMode === 1 && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e3), this._activeSelectionMode !== 3 && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
          const i3 = this._bufferService.buffer;
          if (this._model.selectionEnd[1] < i3.lines.length) {
            const e4 = i3.lines.get(this._model.selectionEnd[1]);
            e4 && e4.hasWidth(this._model.selectionEnd[0]) === 0 && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
          }
          t3 && t3[0] === this._model.selectionEnd[0] && t3[1] === this._model.selectionEnd[1] || this.refresh(true);
        }
        _dragScroll() {
          if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
            this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: false });
            const e3 = this._bufferService.buffer;
            this._dragScrollAmount > 0 ? (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e3.ydisp + this._bufferService.rows, e3.lines.length - 1)) : (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e3.ydisp), this.refresh();
          }
        }
        _handleMouseUp(e3) {
          const t3 = e3.timeStamp - this._mouseDownTimeStamp;
          if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && t3 < 500 && e3.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
            if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
              const t4 = this._mouseService.getCoords(e3, this._element, this._bufferService.cols, this._bufferService.rows, false);
              if (t4 && t4[0] !== undefined && t4[1] !== undefined) {
                const e4 = (0, o.moveToCellSequence)(t4[0] - 1, t4[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
                this._coreService.triggerDataEvent(e4, true);
              }
            }
          } else
            this._fireEventIfSelectionChanged();
        }
        _fireEventIfSelectionChanged() {
          const e3 = this._model.finalSelectionStart, t3 = this._model.finalSelectionEnd, i3 = !(!e3 || !t3 || e3[0] === t3[0] && e3[1] === t3[1]);
          i3 ? e3 && t3 && (this._oldSelectionStart && this._oldSelectionEnd && e3[0] === this._oldSelectionStart[0] && e3[1] === this._oldSelectionStart[1] && t3[0] === this._oldSelectionEnd[0] && t3[1] === this._oldSelectionEnd[1] || this._fireOnSelectionChange(e3, t3, i3)) : this._oldHasSelection && this._fireOnSelectionChange(e3, t3, i3);
        }
        _fireOnSelectionChange(e3, t3, i3) {
          this._oldSelectionStart = e3, this._oldSelectionEnd = t3, this._oldHasSelection = i3, this._onSelectionChange.fire();
        }
        _handleBufferActivate(e3) {
          this.clearSelection(), this._trimListener.dispose(), this._trimListener = e3.activeBuffer.lines.onTrim((e4) => this._handleTrim(e4));
        }
        _convertViewportColToCharacterIndex(e3, t3) {
          let i3 = t3;
          for (let s3 = 0;t3 >= s3; s3++) {
            const r2 = e3.loadCell(s3, this._workCell).getChars().length;
            this._workCell.getWidth() === 0 ? i3-- : r2 > 1 && t3 !== s3 && (i3 += r2 - 1);
          }
          return i3;
        }
        setSelection(e3, t3, i3) {
          this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e3, t3], this._model.selectionStartLength = i3, this.refresh(), this._fireEventIfSelectionChanged();
        }
        rightClickSelect(e3) {
          this._isClickInSelection(e3) || (this._selectWordAtCursor(e3, false) && this.refresh(true), this._fireEventIfSelectionChanged());
        }
        _getWordAt(e3, t3, i3 = true, s3 = true) {
          if (e3[0] >= this._bufferService.cols)
            return;
          const r2 = this._bufferService.buffer, n2 = r2.lines.get(e3[1]);
          if (!n2)
            return;
          const o2 = r2.translateBufferLineToString(e3[1], false);
          let a2 = this._convertViewportColToCharacterIndex(n2, e3[0]), h2 = a2;
          const c2 = e3[0] - a2;
          let l2 = 0, d2 = 0, _2 = 0, u2 = 0;
          if (o2.charAt(a2) === " ") {
            for (;a2 > 0 && o2.charAt(a2 - 1) === " "; )
              a2--;
            for (;h2 < o2.length && o2.charAt(h2 + 1) === " "; )
              h2++;
          } else {
            let t4 = e3[0], i4 = e3[0];
            n2.getWidth(t4) === 0 && (l2++, t4--), n2.getWidth(i4) === 2 && (d2++, i4++);
            const s4 = n2.getString(i4).length;
            for (s4 > 1 && (u2 += s4 - 1, h2 += s4 - 1);t4 > 0 && a2 > 0 && !this._isCharWordSeparator(n2.loadCell(t4 - 1, this._workCell)); ) {
              n2.loadCell(t4 - 1, this._workCell);
              const e4 = this._workCell.getChars().length;
              this._workCell.getWidth() === 0 ? (l2++, t4--) : e4 > 1 && (_2 += e4 - 1, a2 -= e4 - 1), a2--, t4--;
            }
            for (;i4 < n2.length && h2 + 1 < o2.length && !this._isCharWordSeparator(n2.loadCell(i4 + 1, this._workCell)); ) {
              n2.loadCell(i4 + 1, this._workCell);
              const e4 = this._workCell.getChars().length;
              this._workCell.getWidth() === 2 ? (d2++, i4++) : e4 > 1 && (u2 += e4 - 1, h2 += e4 - 1), h2++, i4++;
            }
          }
          h2++;
          let f2 = a2 + c2 - l2 + _2, v2 = Math.min(this._bufferService.cols, h2 - a2 + l2 + d2 - _2 - u2);
          if (t3 || o2.slice(a2, h2).trim() !== "") {
            if (i3 && f2 === 0 && n2.getCodePoint(0) !== 32) {
              const t4 = r2.lines.get(e3[1] - 1);
              if (t4 && n2.isWrapped && t4.getCodePoint(this._bufferService.cols - 1) !== 32) {
                const t5 = this._getWordAt([this._bufferService.cols - 1, e3[1] - 1], false, true, false);
                if (t5) {
                  const e4 = this._bufferService.cols - t5.start;
                  f2 -= e4, v2 += e4;
                }
              }
            }
            if (s3 && f2 + v2 === this._bufferService.cols && n2.getCodePoint(this._bufferService.cols - 1) !== 32) {
              const t4 = r2.lines.get(e3[1] + 1);
              if (t4?.isWrapped && t4.getCodePoint(0) !== 32) {
                const t5 = this._getWordAt([0, e3[1] + 1], false, false, true);
                t5 && (v2 += t5.length);
              }
            }
            return { start: f2, length: v2 };
          }
        }
        _selectWordAt(e3, t3) {
          const i3 = this._getWordAt(e3, t3);
          if (i3) {
            for (;i3.start < 0; )
              i3.start += this._bufferService.cols, e3[1]--;
            this._model.selectionStart = [i3.start, e3[1]], this._model.selectionStartLength = i3.length;
          }
        }
        _selectToWordAt(e3) {
          const t3 = this._getWordAt(e3, true);
          if (t3) {
            let i3 = e3[1];
            for (;t3.start < 0; )
              t3.start += this._bufferService.cols, i3--;
            if (!this._model.areSelectionValuesReversed())
              for (;t3.start + t3.length > this._bufferService.cols; )
                t3.length -= this._bufferService.cols, i3++;
            this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? t3.start : t3.start + t3.length, i3];
          }
        }
        _isCharWordSeparator(e3) {
          return e3.getWidth() !== 0 && this._optionsService.rawOptions.wordSeparator.indexOf(e3.getChars()) >= 0;
        }
        _selectLineAt(e3) {
          const t3 = this._bufferService.buffer.getWrappedRangeForLine(e3), i3 = { start: { x: 0, y: t3.first }, end: { x: this._bufferService.cols - 1, y: t3.last } };
          this._model.selectionStart = [0, t3.first], this._model.selectionEnd = undefined, this._model.selectionStartLength = (0, _.getRangeLength)(i3, this._bufferService.cols);
        }
      };
      t2.SelectionService = g = s2([r(3, f.IBufferService), r(4, f.ICoreService), r(5, h.IMouseService), r(6, f.IOptionsService), r(7, h.IRenderService), r(8, h.ICoreBrowserService)], g);
    }, 4725: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.IThemeService = t2.ICharacterJoinerService = t2.ISelectionService = t2.IRenderService = t2.IMouseService = t2.ICoreBrowserService = t2.ICharSizeService = undefined;
      const s2 = i2(8343);
      t2.ICharSizeService = (0, s2.createDecorator)("CharSizeService"), t2.ICoreBrowserService = (0, s2.createDecorator)("CoreBrowserService"), t2.IMouseService = (0, s2.createDecorator)("MouseService"), t2.IRenderService = (0, s2.createDecorator)("RenderService"), t2.ISelectionService = (0, s2.createDecorator)("SelectionService"), t2.ICharacterJoinerService = (0, s2.createDecorator)("CharacterJoinerService"), t2.IThemeService = (0, s2.createDecorator)("ThemeService");
    }, 6731: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.ThemeService = t2.DEFAULT_ANSI_COLORS = undefined;
      const n = i2(7239), o = i2(8055), a = i2(8460), h = i2(844), c = i2(2585), l = o.css.toColor("#ffffff"), d = o.css.toColor("#000000"), _ = o.css.toColor("#ffffff"), u = o.css.toColor("#000000"), f = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 };
      t2.DEFAULT_ANSI_COLORS = Object.freeze((() => {
        const e3 = [o.css.toColor("#2e3436"), o.css.toColor("#cc0000"), o.css.toColor("#4e9a06"), o.css.toColor("#c4a000"), o.css.toColor("#3465a4"), o.css.toColor("#75507b"), o.css.toColor("#06989a"), o.css.toColor("#d3d7cf"), o.css.toColor("#555753"), o.css.toColor("#ef2929"), o.css.toColor("#8ae234"), o.css.toColor("#fce94f"), o.css.toColor("#729fcf"), o.css.toColor("#ad7fa8"), o.css.toColor("#34e2e2"), o.css.toColor("#eeeeec")], t3 = [0, 95, 135, 175, 215, 255];
        for (let i3 = 0;i3 < 216; i3++) {
          const s3 = t3[i3 / 36 % 6 | 0], r2 = t3[i3 / 6 % 6 | 0], n2 = t3[i3 % 6];
          e3.push({ css: o.channels.toCss(s3, r2, n2), rgba: o.channels.toRgba(s3, r2, n2) });
        }
        for (let t4 = 0;t4 < 24; t4++) {
          const i3 = 8 + 10 * t4;
          e3.push({ css: o.channels.toCss(i3, i3, i3), rgba: o.channels.toRgba(i3, i3, i3) });
        }
        return e3;
      })());
      let v = t2.ThemeService = class extends h.Disposable {
        get colors() {
          return this._colors;
        }
        constructor(e3) {
          super(), this._optionsService = e3, this._contrastCache = new n.ColorContrastCache, this._halfContrastCache = new n.ColorContrastCache, this._onChangeColors = this.register(new a.EventEmitter), this.onChangeColors = this._onChangeColors.event, this._colors = { foreground: l, background: d, cursor: _, cursorAccent: u, selectionForeground: undefined, selectionBackgroundTransparent: f, selectionBackgroundOpaque: o.color.blend(d, f), selectionInactiveBackgroundTransparent: f, selectionInactiveBackgroundOpaque: o.color.blend(d, f), ansi: t2.DEFAULT_ANSI_COLORS.slice(), contrastCache: this._contrastCache, halfContrastCache: this._halfContrastCache }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear())), this.register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
        }
        _setTheme(e3 = {}) {
          const i3 = this._colors;
          if (i3.foreground = p(e3.foreground, l), i3.background = p(e3.background, d), i3.cursor = p(e3.cursor, _), i3.cursorAccent = p(e3.cursorAccent, u), i3.selectionBackgroundTransparent = p(e3.selectionBackground, f), i3.selectionBackgroundOpaque = o.color.blend(i3.background, i3.selectionBackgroundTransparent), i3.selectionInactiveBackgroundTransparent = p(e3.selectionInactiveBackground, i3.selectionBackgroundTransparent), i3.selectionInactiveBackgroundOpaque = o.color.blend(i3.background, i3.selectionInactiveBackgroundTransparent), i3.selectionForeground = e3.selectionForeground ? p(e3.selectionForeground, o.NULL_COLOR) : undefined, i3.selectionForeground === o.NULL_COLOR && (i3.selectionForeground = undefined), o.color.isOpaque(i3.selectionBackgroundTransparent)) {
            const e4 = 0.3;
            i3.selectionBackgroundTransparent = o.color.opacity(i3.selectionBackgroundTransparent, e4);
          }
          if (o.color.isOpaque(i3.selectionInactiveBackgroundTransparent)) {
            const e4 = 0.3;
            i3.selectionInactiveBackgroundTransparent = o.color.opacity(i3.selectionInactiveBackgroundTransparent, e4);
          }
          if (i3.ansi = t2.DEFAULT_ANSI_COLORS.slice(), i3.ansi[0] = p(e3.black, t2.DEFAULT_ANSI_COLORS[0]), i3.ansi[1] = p(e3.red, t2.DEFAULT_ANSI_COLORS[1]), i3.ansi[2] = p(e3.green, t2.DEFAULT_ANSI_COLORS[2]), i3.ansi[3] = p(e3.yellow, t2.DEFAULT_ANSI_COLORS[3]), i3.ansi[4] = p(e3.blue, t2.DEFAULT_ANSI_COLORS[4]), i3.ansi[5] = p(e3.magenta, t2.DEFAULT_ANSI_COLORS[5]), i3.ansi[6] = p(e3.cyan, t2.DEFAULT_ANSI_COLORS[6]), i3.ansi[7] = p(e3.white, t2.DEFAULT_ANSI_COLORS[7]), i3.ansi[8] = p(e3.brightBlack, t2.DEFAULT_ANSI_COLORS[8]), i3.ansi[9] = p(e3.brightRed, t2.DEFAULT_ANSI_COLORS[9]), i3.ansi[10] = p(e3.brightGreen, t2.DEFAULT_ANSI_COLORS[10]), i3.ansi[11] = p(e3.brightYellow, t2.DEFAULT_ANSI_COLORS[11]), i3.ansi[12] = p(e3.brightBlue, t2.DEFAULT_ANSI_COLORS[12]), i3.ansi[13] = p(e3.brightMagenta, t2.DEFAULT_ANSI_COLORS[13]), i3.ansi[14] = p(e3.brightCyan, t2.DEFAULT_ANSI_COLORS[14]), i3.ansi[15] = p(e3.brightWhite, t2.DEFAULT_ANSI_COLORS[15]), e3.extendedAnsi) {
            const s3 = Math.min(i3.ansi.length - 16, e3.extendedAnsi.length);
            for (let r2 = 0;r2 < s3; r2++)
              i3.ansi[r2 + 16] = p(e3.extendedAnsi[r2], t2.DEFAULT_ANSI_COLORS[r2 + 16]);
          }
          this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
        }
        restoreColor(e3) {
          this._restoreColor(e3), this._onChangeColors.fire(this.colors);
        }
        _restoreColor(e3) {
          if (e3 !== undefined)
            switch (e3) {
              case 256:
                this._colors.foreground = this._restoreColors.foreground;
                break;
              case 257:
                this._colors.background = this._restoreColors.background;
                break;
              case 258:
                this._colors.cursor = this._restoreColors.cursor;
                break;
              default:
                this._colors.ansi[e3] = this._restoreColors.ansi[e3];
            }
          else
            for (let e4 = 0;e4 < this._restoreColors.ansi.length; ++e4)
              this._colors.ansi[e4] = this._restoreColors.ansi[e4];
        }
        modifyColors(e3) {
          e3(this._colors), this._onChangeColors.fire(this.colors);
        }
        _updateRestoreColors() {
          this._restoreColors = { foreground: this._colors.foreground, background: this._colors.background, cursor: this._colors.cursor, ansi: this._colors.ansi.slice() };
        }
      };
      function p(e3, t3) {
        if (e3 !== undefined)
          try {
            return o.css.toColor(e3);
          } catch {
          }
        return t3;
      }
      t2.ThemeService = v = s2([r(0, c.IOptionsService)], v);
    }, 6349: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.CircularList = undefined;
      const s2 = i2(8460), r = i2(844);

      class n extends r.Disposable {
        constructor(e3) {
          super(), this._maxLength = e3, this.onDeleteEmitter = this.register(new s2.EventEmitter), this.onDelete = this.onDeleteEmitter.event, this.onInsertEmitter = this.register(new s2.EventEmitter), this.onInsert = this.onInsertEmitter.event, this.onTrimEmitter = this.register(new s2.EventEmitter), this.onTrim = this.onTrimEmitter.event, this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
        }
        get maxLength() {
          return this._maxLength;
        }
        set maxLength(e3) {
          if (this._maxLength === e3)
            return;
          const t3 = new Array(e3);
          for (let i3 = 0;i3 < Math.min(e3, this.length); i3++)
            t3[i3] = this._array[this._getCyclicIndex(i3)];
          this._array = t3, this._maxLength = e3, this._startIndex = 0;
        }
        get length() {
          return this._length;
        }
        set length(e3) {
          if (e3 > this._length)
            for (let t3 = this._length;t3 < e3; t3++)
              this._array[t3] = undefined;
          this._length = e3;
        }
        get(e3) {
          return this._array[this._getCyclicIndex(e3)];
        }
        set(e3, t3) {
          this._array[this._getCyclicIndex(e3)] = t3;
        }
        push(e3) {
          this._array[this._getCyclicIndex(this._length)] = e3, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
        }
        recycle() {
          if (this._length !== this._maxLength)
            throw new Error("Can only recycle when the buffer is full");
          return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
        }
        get isFull() {
          return this._length === this._maxLength;
        }
        pop() {
          return this._array[this._getCyclicIndex(this._length-- - 1)];
        }
        splice(e3, t3, ...i3) {
          if (t3) {
            for (let i4 = e3;i4 < this._length - t3; i4++)
              this._array[this._getCyclicIndex(i4)] = this._array[this._getCyclicIndex(i4 + t3)];
            this._length -= t3, this.onDeleteEmitter.fire({ index: e3, amount: t3 });
          }
          for (let t4 = this._length - 1;t4 >= e3; t4--)
            this._array[this._getCyclicIndex(t4 + i3.length)] = this._array[this._getCyclicIndex(t4)];
          for (let t4 = 0;t4 < i3.length; t4++)
            this._array[this._getCyclicIndex(e3 + t4)] = i3[t4];
          if (i3.length && this.onInsertEmitter.fire({ index: e3, amount: i3.length }), this._length + i3.length > this._maxLength) {
            const e4 = this._length + i3.length - this._maxLength;
            this._startIndex += e4, this._length = this._maxLength, this.onTrimEmitter.fire(e4);
          } else
            this._length += i3.length;
        }
        trimStart(e3) {
          e3 > this._length && (e3 = this._length), this._startIndex += e3, this._length -= e3, this.onTrimEmitter.fire(e3);
        }
        shiftElements(e3, t3, i3) {
          if (!(t3 <= 0)) {
            if (e3 < 0 || e3 >= this._length)
              throw new Error("start argument out of range");
            if (e3 + i3 < 0)
              throw new Error("Cannot shift elements in list beyond index 0");
            if (i3 > 0) {
              for (let s4 = t3 - 1;s4 >= 0; s4--)
                this.set(e3 + s4 + i3, this.get(e3 + s4));
              const s3 = e3 + t3 + i3 - this._length;
              if (s3 > 0)
                for (this._length += s3;this._length > this._maxLength; )
                  this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
            } else
              for (let s3 = 0;s3 < t3; s3++)
                this.set(e3 + s3 + i3, this.get(e3 + s3));
          }
        }
        _getCyclicIndex(e3) {
          return (this._startIndex + e3) % this._maxLength;
        }
      }
      t2.CircularList = n;
    }, 1439: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.clone = undefined, t2.clone = function e(t3, i2 = 5) {
        if (typeof t3 != "object")
          return t3;
        const s2 = Array.isArray(t3) ? [] : {};
        for (const r in t3)
          s2[r] = i2 <= 1 ? t3[r] : t3[r] && e(t3[r], i2 - 1);
        return s2;
      };
    }, 8055: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.contrastRatio = t2.toPaddedHex = t2.rgba = t2.rgb = t2.css = t2.color = t2.channels = t2.NULL_COLOR = undefined;
      const s2 = i2(6114);
      let r = 0, n = 0, o = 0, a = 0;
      var h, c, l, d, _;
      function u(e3) {
        const t3 = e3.toString(16);
        return t3.length < 2 ? "0" + t3 : t3;
      }
      function f(e3, t3) {
        return e3 < t3 ? (t3 + 0.05) / (e3 + 0.05) : (e3 + 0.05) / (t3 + 0.05);
      }
      t2.NULL_COLOR = { css: "#00000000", rgba: 0 }, function(e3) {
        e3.toCss = function(e4, t3, i3, s3) {
          return s3 !== undefined ? `#${u(e4)}${u(t3)}${u(i3)}${u(s3)}` : `#${u(e4)}${u(t3)}${u(i3)}`;
        }, e3.toRgba = function(e4, t3, i3, s3 = 255) {
          return (e4 << 24 | t3 << 16 | i3 << 8 | s3) >>> 0;
        };
      }(h || (t2.channels = h = {})), function(e3) {
        function t3(e4, t4) {
          return a = Math.round(255 * t4), [r, n, o] = _.toChannels(e4.rgba), { css: h.toCss(r, n, o, a), rgba: h.toRgba(r, n, o, a) };
        }
        e3.blend = function(e4, t4) {
          if (a = (255 & t4.rgba) / 255, a === 1)
            return { css: t4.css, rgba: t4.rgba };
          const i3 = t4.rgba >> 24 & 255, s3 = t4.rgba >> 16 & 255, c2 = t4.rgba >> 8 & 255, l2 = e4.rgba >> 24 & 255, d2 = e4.rgba >> 16 & 255, _2 = e4.rgba >> 8 & 255;
          return r = l2 + Math.round((i3 - l2) * a), n = d2 + Math.round((s3 - d2) * a), o = _2 + Math.round((c2 - _2) * a), { css: h.toCss(r, n, o), rgba: h.toRgba(r, n, o) };
        }, e3.isOpaque = function(e4) {
          return (255 & e4.rgba) == 255;
        }, e3.ensureContrastRatio = function(e4, t4, i3) {
          const s3 = _.ensureContrastRatio(e4.rgba, t4.rgba, i3);
          if (s3)
            return _.toColor(s3 >> 24 & 255, s3 >> 16 & 255, s3 >> 8 & 255);
        }, e3.opaque = function(e4) {
          const t4 = (255 | e4.rgba) >>> 0;
          return [r, n, o] = _.toChannels(t4), { css: h.toCss(r, n, o), rgba: t4 };
        }, e3.opacity = t3, e3.multiplyOpacity = function(e4, i3) {
          return a = 255 & e4.rgba, t3(e4, a * i3 / 255);
        }, e3.toColorRGB = function(e4) {
          return [e4.rgba >> 24 & 255, e4.rgba >> 16 & 255, e4.rgba >> 8 & 255];
        };
      }(c || (t2.color = c = {})), function(e3) {
        let t3, i3;
        if (!s2.isNode) {
          const e4 = document.createElement("canvas");
          e4.width = 1, e4.height = 1;
          const s3 = e4.getContext("2d", { willReadFrequently: true });
          s3 && (t3 = s3, t3.globalCompositeOperation = "copy", i3 = t3.createLinearGradient(0, 0, 1, 1));
        }
        e3.toColor = function(e4) {
          if (e4.match(/#[\da-f]{3,8}/i))
            switch (e4.length) {
              case 4:
                return r = parseInt(e4.slice(1, 2).repeat(2), 16), n = parseInt(e4.slice(2, 3).repeat(2), 16), o = parseInt(e4.slice(3, 4).repeat(2), 16), _.toColor(r, n, o);
              case 5:
                return r = parseInt(e4.slice(1, 2).repeat(2), 16), n = parseInt(e4.slice(2, 3).repeat(2), 16), o = parseInt(e4.slice(3, 4).repeat(2), 16), a = parseInt(e4.slice(4, 5).repeat(2), 16), _.toColor(r, n, o, a);
              case 7:
                return { css: e4, rgba: (parseInt(e4.slice(1), 16) << 8 | 255) >>> 0 };
              case 9:
                return { css: e4, rgba: parseInt(e4.slice(1), 16) >>> 0 };
            }
          const s3 = e4.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
          if (s3)
            return r = parseInt(s3[1]), n = parseInt(s3[2]), o = parseInt(s3[3]), a = Math.round(255 * (s3[5] === undefined ? 1 : parseFloat(s3[5]))), _.toColor(r, n, o, a);
          if (!t3 || !i3)
            throw new Error("css.toColor: Unsupported css format");
          if (t3.fillStyle = i3, t3.fillStyle = e4, typeof t3.fillStyle != "string")
            throw new Error("css.toColor: Unsupported css format");
          if (t3.fillRect(0, 0, 1, 1), [r, n, o, a] = t3.getImageData(0, 0, 1, 1).data, a !== 255)
            throw new Error("css.toColor: Unsupported css format");
          return { rgba: h.toRgba(r, n, o, a), css: e4 };
        };
      }(l || (t2.css = l = {})), function(e3) {
        function t3(e4, t4, i3) {
          const s3 = e4 / 255, r2 = t4 / 255, n2 = i3 / 255;
          return 0.2126 * (s3 <= 0.03928 ? s3 / 12.92 : Math.pow((s3 + 0.055) / 1.055, 2.4)) + 0.7152 * (r2 <= 0.03928 ? r2 / 12.92 : Math.pow((r2 + 0.055) / 1.055, 2.4)) + 0.0722 * (n2 <= 0.03928 ? n2 / 12.92 : Math.pow((n2 + 0.055) / 1.055, 2.4));
        }
        e3.relativeLuminance = function(e4) {
          return t3(e4 >> 16 & 255, e4 >> 8 & 255, 255 & e4);
        }, e3.relativeLuminance2 = t3;
      }(d || (t2.rgb = d = {})), function(e3) {
        function t3(e4, t4, i4) {
          const s3 = e4 >> 24 & 255, r2 = e4 >> 16 & 255, n2 = e4 >> 8 & 255;
          let o2 = t4 >> 24 & 255, a2 = t4 >> 16 & 255, h2 = t4 >> 8 & 255, c2 = f(d.relativeLuminance2(o2, a2, h2), d.relativeLuminance2(s3, r2, n2));
          for (;c2 < i4 && (o2 > 0 || a2 > 0 || h2 > 0); )
            o2 -= Math.max(0, Math.ceil(0.1 * o2)), a2 -= Math.max(0, Math.ceil(0.1 * a2)), h2 -= Math.max(0, Math.ceil(0.1 * h2)), c2 = f(d.relativeLuminance2(o2, a2, h2), d.relativeLuminance2(s3, r2, n2));
          return (o2 << 24 | a2 << 16 | h2 << 8 | 255) >>> 0;
        }
        function i3(e4, t4, i4) {
          const s3 = e4 >> 24 & 255, r2 = e4 >> 16 & 255, n2 = e4 >> 8 & 255;
          let o2 = t4 >> 24 & 255, a2 = t4 >> 16 & 255, h2 = t4 >> 8 & 255, c2 = f(d.relativeLuminance2(o2, a2, h2), d.relativeLuminance2(s3, r2, n2));
          for (;c2 < i4 && (o2 < 255 || a2 < 255 || h2 < 255); )
            o2 = Math.min(255, o2 + Math.ceil(0.1 * (255 - o2))), a2 = Math.min(255, a2 + Math.ceil(0.1 * (255 - a2))), h2 = Math.min(255, h2 + Math.ceil(0.1 * (255 - h2))), c2 = f(d.relativeLuminance2(o2, a2, h2), d.relativeLuminance2(s3, r2, n2));
          return (o2 << 24 | a2 << 16 | h2 << 8 | 255) >>> 0;
        }
        e3.ensureContrastRatio = function(e4, s3, r2) {
          const n2 = d.relativeLuminance(e4 >> 8), o2 = d.relativeLuminance(s3 >> 8);
          if (f(n2, o2) < r2) {
            if (o2 < n2) {
              const o3 = t3(e4, s3, r2), a3 = f(n2, d.relativeLuminance(o3 >> 8));
              if (a3 < r2) {
                const t4 = i3(e4, s3, r2);
                return a3 > f(n2, d.relativeLuminance(t4 >> 8)) ? o3 : t4;
              }
              return o3;
            }
            const a2 = i3(e4, s3, r2), h2 = f(n2, d.relativeLuminance(a2 >> 8));
            if (h2 < r2) {
              const i4 = t3(e4, s3, r2);
              return h2 > f(n2, d.relativeLuminance(i4 >> 8)) ? a2 : i4;
            }
            return a2;
          }
        }, e3.reduceLuminance = t3, e3.increaseLuminance = i3, e3.toChannels = function(e4) {
          return [e4 >> 24 & 255, e4 >> 16 & 255, e4 >> 8 & 255, 255 & e4];
        }, e3.toColor = function(e4, t4, i4, s3) {
          return { css: h.toCss(e4, t4, i4, s3), rgba: h.toRgba(e4, t4, i4, s3) };
        };
      }(_ || (t2.rgba = _ = {})), t2.toPaddedHex = u, t2.contrastRatio = f;
    }, 8969: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreTerminal = undefined;
      const s2 = i2(844), r = i2(2585), n = i2(4348), o = i2(7866), a = i2(744), h = i2(7302), c = i2(6975), l = i2(8460), d = i2(1753), _ = i2(1480), u = i2(7994), f = i2(9282), v = i2(5435), p = i2(5981), g = i2(2660);
      let m = false;

      class S extends s2.Disposable {
        get onScroll() {
          return this._onScrollApi || (this._onScrollApi = this.register(new l.EventEmitter), this._onScroll.event((e3) => {
            this._onScrollApi?.fire(e3.position);
          })), this._onScrollApi.event;
        }
        get cols() {
          return this._bufferService.cols;
        }
        get rows() {
          return this._bufferService.rows;
        }
        get buffers() {
          return this._bufferService.buffers;
        }
        get options() {
          return this.optionsService.options;
        }
        set options(e3) {
          for (const t3 in e3)
            this.optionsService.options[t3] = e3[t3];
        }
        constructor(e3) {
          super(), this._windowsWrappingHeuristics = this.register(new s2.MutableDisposable), this._onBinary = this.register(new l.EventEmitter), this.onBinary = this._onBinary.event, this._onData = this.register(new l.EventEmitter), this.onData = this._onData.event, this._onLineFeed = this.register(new l.EventEmitter), this.onLineFeed = this._onLineFeed.event, this._onResize = this.register(new l.EventEmitter), this.onResize = this._onResize.event, this._onWriteParsed = this.register(new l.EventEmitter), this.onWriteParsed = this._onWriteParsed.event, this._onScroll = this.register(new l.EventEmitter), this._instantiationService = new n.InstantiationService, this.optionsService = this.register(new h.OptionsService(e3)), this._instantiationService.setService(r.IOptionsService, this.optionsService), this._bufferService = this.register(this._instantiationService.createInstance(a.BufferService)), this._instantiationService.setService(r.IBufferService, this._bufferService), this._logService = this.register(this._instantiationService.createInstance(o.LogService)), this._instantiationService.setService(r.ILogService, this._logService), this.coreService = this.register(this._instantiationService.createInstance(c.CoreService)), this._instantiationService.setService(r.ICoreService, this.coreService), this.coreMouseService = this.register(this._instantiationService.createInstance(d.CoreMouseService)), this._instantiationService.setService(r.ICoreMouseService, this.coreMouseService), this.unicodeService = this.register(this._instantiationService.createInstance(_.UnicodeService)), this._instantiationService.setService(r.IUnicodeService, this.unicodeService), this._charsetService = this._instantiationService.createInstance(u.CharsetService), this._instantiationService.setService(r.ICharsetService, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(g.OscLinkService), this._instantiationService.setService(r.IOscLinkService, this._oscLinkService), this._inputHandler = this.register(new v.InputHandler(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this.register((0, l.forwardEvent)(this._inputHandler.onLineFeed, this._onLineFeed)), this.register(this._inputHandler), this.register((0, l.forwardEvent)(this._bufferService.onResize, this._onResize)), this.register((0, l.forwardEvent)(this.coreService.onData, this._onData)), this.register((0, l.forwardEvent)(this.coreService.onBinary, this._onBinary)), this.register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom())), this.register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput())), this.register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange())), this.register(this._bufferService.onScroll((e4) => {
            this._onScroll.fire({ position: this._bufferService.buffer.ydisp, source: 0 }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
          })), this.register(this._inputHandler.onScroll((e4) => {
            this._onScroll.fire({ position: this._bufferService.buffer.ydisp, source: 0 }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
          })), this._writeBuffer = this.register(new p.WriteBuffer((e4, t3) => this._inputHandler.parse(e4, t3))), this.register((0, l.forwardEvent)(this._writeBuffer.onWriteParsed, this._onWriteParsed));
        }
        write(e3, t3) {
          this._writeBuffer.write(e3, t3);
        }
        writeSync(e3, t3) {
          this._logService.logLevel <= r.LogLevelEnum.WARN && !m && (this._logService.warn("writeSync is unreliable and will be removed soon."), m = true), this._writeBuffer.writeSync(e3, t3);
        }
        resize(e3, t3) {
          isNaN(e3) || isNaN(t3) || (e3 = Math.max(e3, a.MINIMUM_COLS), t3 = Math.max(t3, a.MINIMUM_ROWS), this._bufferService.resize(e3, t3));
        }
        scroll(e3, t3 = false) {
          this._bufferService.scroll(e3, t3);
        }
        scrollLines(e3, t3, i3) {
          this._bufferService.scrollLines(e3, t3, i3);
        }
        scrollPages(e3) {
          this.scrollLines(e3 * (this.rows - 1));
        }
        scrollToTop() {
          this.scrollLines(-this._bufferService.buffer.ydisp);
        }
        scrollToBottom() {
          this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
        }
        scrollToLine(e3) {
          const t3 = e3 - this._bufferService.buffer.ydisp;
          t3 !== 0 && this.scrollLines(t3);
        }
        registerEscHandler(e3, t3) {
          return this._inputHandler.registerEscHandler(e3, t3);
        }
        registerDcsHandler(e3, t3) {
          return this._inputHandler.registerDcsHandler(e3, t3);
        }
        registerCsiHandler(e3, t3) {
          return this._inputHandler.registerCsiHandler(e3, t3);
        }
        registerOscHandler(e3, t3) {
          return this._inputHandler.registerOscHandler(e3, t3);
        }
        _setup() {
          this._handleWindowsPtyOptionChange();
        }
        reset() {
          this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
        }
        _handleWindowsPtyOptionChange() {
          let e3 = false;
          const t3 = this.optionsService.rawOptions.windowsPty;
          t3 && t3.buildNumber !== undefined && t3.buildNumber !== undefined ? e3 = !!(t3.backend === "conpty" && t3.buildNumber < 21376) : this.optionsService.rawOptions.windowsMode && (e3 = true), e3 ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
        }
        _enableWindowsWrappingHeuristics() {
          if (!this._windowsWrappingHeuristics.value) {
            const e3 = [];
            e3.push(this.onLineFeed(f.updateWindowsModeWrappedState.bind(null, this._bufferService))), e3.push(this.registerCsiHandler({ final: "H" }, () => ((0, f.updateWindowsModeWrappedState)(this._bufferService), false))), this._windowsWrappingHeuristics.value = (0, s2.toDisposable)(() => {
              for (const t3 of e3)
                t3.dispose();
            });
          }
        }
      }
      t2.CoreTerminal = S;
    }, 8460: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.forwardEvent = t2.EventEmitter = undefined, t2.EventEmitter = class {
        constructor() {
          this._listeners = [], this._disposed = false;
        }
        get event() {
          return this._event || (this._event = (e3) => (this._listeners.push(e3), { dispose: () => {
            if (!this._disposed) {
              for (let t3 = 0;t3 < this._listeners.length; t3++)
                if (this._listeners[t3] === e3)
                  return void this._listeners.splice(t3, 1);
            }
          } })), this._event;
        }
        fire(e3, t3) {
          const i2 = [];
          for (let e4 = 0;e4 < this._listeners.length; e4++)
            i2.push(this._listeners[e4]);
          for (let s2 = 0;s2 < i2.length; s2++)
            i2[s2].call(undefined, e3, t3);
        }
        dispose() {
          this.clearListeners(), this._disposed = true;
        }
        clearListeners() {
          this._listeners && (this._listeners.length = 0);
        }
      }, t2.forwardEvent = function(e3, t3) {
        return e3((e4) => t3.fire(e4));
      };
    }, 5435: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.InputHandler = t2.WindowsOptionsReportType = undefined;
      const n = i2(2584), o = i2(7116), a = i2(2015), h = i2(844), c = i2(482), l = i2(8437), d = i2(8460), _ = i2(643), u = i2(511), f = i2(3734), v = i2(2585), p = i2(1480), g = i2(6242), m = i2(6351), S = i2(5941), C = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 }, b = 131072;
      function y(e3, t3) {
        if (e3 > 24)
          return t3.setWinLines || false;
        switch (e3) {
          case 1:
            return !!t3.restoreWin;
          case 2:
            return !!t3.minimizeWin;
          case 3:
            return !!t3.setWinPosition;
          case 4:
            return !!t3.setWinSizePixels;
          case 5:
            return !!t3.raiseWin;
          case 6:
            return !!t3.lowerWin;
          case 7:
            return !!t3.refreshWin;
          case 8:
            return !!t3.setWinSizeChars;
          case 9:
            return !!t3.maximizeWin;
          case 10:
            return !!t3.fullscreenWin;
          case 11:
            return !!t3.getWinState;
          case 13:
            return !!t3.getWinPosition;
          case 14:
            return !!t3.getWinSizePixels;
          case 15:
            return !!t3.getScreenSizePixels;
          case 16:
            return !!t3.getCellSizePixels;
          case 18:
            return !!t3.getWinSizeChars;
          case 19:
            return !!t3.getScreenSizeChars;
          case 20:
            return !!t3.getIconTitle;
          case 21:
            return !!t3.getWinTitle;
          case 22:
            return !!t3.pushTitle;
          case 23:
            return !!t3.popTitle;
          case 24:
            return !!t3.setWinLines;
        }
        return false;
      }
      var w;
      (function(e3) {
        e3[e3.GET_WIN_SIZE_PIXELS = 0] = "GET_WIN_SIZE_PIXELS", e3[e3.GET_CELL_SIZE_PIXELS = 1] = "GET_CELL_SIZE_PIXELS";
      })(w || (t2.WindowsOptionsReportType = w = {}));
      let E = 0;

      class k extends h.Disposable {
        getAttrData() {
          return this._curAttrData;
        }
        constructor(e3, t3, i3, s3, r2, h2, _2, f2, v2 = new a.EscapeSequenceParser) {
          super(), this._bufferService = e3, this._charsetService = t3, this._coreService = i3, this._logService = s3, this._optionsService = r2, this._oscLinkService = h2, this._coreMouseService = _2, this._unicodeService = f2, this._parser = v2, this._parseBuffer = new Uint32Array(4096), this._stringDecoder = new c.StringToUtf32, this._utf8Decoder = new c.Utf8ToUtf32, this._workCell = new u.CellData, this._windowTitle = "", this._iconName = "", this._windowTitleStack = [], this._iconNameStack = [], this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = l.DEFAULT_ATTR_DATA.clone(), this._onRequestBell = this.register(new d.EventEmitter), this.onRequestBell = this._onRequestBell.event, this._onRequestRefreshRows = this.register(new d.EventEmitter), this.onRequestRefreshRows = this._onRequestRefreshRows.event, this._onRequestReset = this.register(new d.EventEmitter), this.onRequestReset = this._onRequestReset.event, this._onRequestSendFocus = this.register(new d.EventEmitter), this.onRequestSendFocus = this._onRequestSendFocus.event, this._onRequestSyncScrollBar = this.register(new d.EventEmitter), this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event, this._onRequestWindowsOptionsReport = this.register(new d.EventEmitter), this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event, this._onA11yChar = this.register(new d.EventEmitter), this.onA11yChar = this._onA11yChar.event, this._onA11yTab = this.register(new d.EventEmitter), this.onA11yTab = this._onA11yTab.event, this._onCursorMove = this.register(new d.EventEmitter), this.onCursorMove = this._onCursorMove.event, this._onLineFeed = this.register(new d.EventEmitter), this.onLineFeed = this._onLineFeed.event, this._onScroll = this.register(new d.EventEmitter), this.onScroll = this._onScroll.event, this._onTitleChange = this.register(new d.EventEmitter), this.onTitleChange = this._onTitleChange.event, this._onColor = this.register(new d.EventEmitter), this.onColor = this._onColor.event, this._parseStack = { paused: false, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 }, this._specialColors = [256, 257, 258], this.register(this._parser), this._dirtyRowTracker = new L(this._bufferService), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((e4) => this._activeBuffer = e4.activeBuffer)), this._parser.setCsiHandlerFallback((e4, t4) => {
            this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(e4), params: t4.toArray() });
          }), this._parser.setEscHandlerFallback((e4) => {
            this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(e4) });
          }), this._parser.setExecuteHandlerFallback((e4) => {
            this._logService.debug("Unknown EXECUTE code: ", { code: e4 });
          }), this._parser.setOscHandlerFallback((e4, t4, i4) => {
            this._logService.debug("Unknown OSC code: ", { identifier: e4, action: t4, data: i4 });
          }), this._parser.setDcsHandlerFallback((e4, t4, i4) => {
            t4 === "HOOK" && (i4 = i4.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(e4), action: t4, payload: i4 });
          }), this._parser.setPrintHandler((e4, t4, i4) => this.print(e4, t4, i4)), this._parser.registerCsiHandler({ final: "@" }, (e4) => this.insertChars(e4)), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, (e4) => this.scrollLeft(e4)), this._parser.registerCsiHandler({ final: "A" }, (e4) => this.cursorUp(e4)), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, (e4) => this.scrollRight(e4)), this._parser.registerCsiHandler({ final: "B" }, (e4) => this.cursorDown(e4)), this._parser.registerCsiHandler({ final: "C" }, (e4) => this.cursorForward(e4)), this._parser.registerCsiHandler({ final: "D" }, (e4) => this.cursorBackward(e4)), this._parser.registerCsiHandler({ final: "E" }, (e4) => this.cursorNextLine(e4)), this._parser.registerCsiHandler({ final: "F" }, (e4) => this.cursorPrecedingLine(e4)), this._parser.registerCsiHandler({ final: "G" }, (e4) => this.cursorCharAbsolute(e4)), this._parser.registerCsiHandler({ final: "H" }, (e4) => this.cursorPosition(e4)), this._parser.registerCsiHandler({ final: "I" }, (e4) => this.cursorForwardTab(e4)), this._parser.registerCsiHandler({ final: "J" }, (e4) => this.eraseInDisplay(e4, false)), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, (e4) => this.eraseInDisplay(e4, true)), this._parser.registerCsiHandler({ final: "K" }, (e4) => this.eraseInLine(e4, false)), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, (e4) => this.eraseInLine(e4, true)), this._parser.registerCsiHandler({ final: "L" }, (e4) => this.insertLines(e4)), this._parser.registerCsiHandler({ final: "M" }, (e4) => this.deleteLines(e4)), this._parser.registerCsiHandler({ final: "P" }, (e4) => this.deleteChars(e4)), this._parser.registerCsiHandler({ final: "S" }, (e4) => this.scrollUp(e4)), this._parser.registerCsiHandler({ final: "T" }, (e4) => this.scrollDown(e4)), this._parser.registerCsiHandler({ final: "X" }, (e4) => this.eraseChars(e4)), this._parser.registerCsiHandler({ final: "Z" }, (e4) => this.cursorBackwardTab(e4)), this._parser.registerCsiHandler({ final: "`" }, (e4) => this.charPosAbsolute(e4)), this._parser.registerCsiHandler({ final: "a" }, (e4) => this.hPositionRelative(e4)), this._parser.registerCsiHandler({ final: "b" }, (e4) => this.repeatPrecedingCharacter(e4)), this._parser.registerCsiHandler({ final: "c" }, (e4) => this.sendDeviceAttributesPrimary(e4)), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, (e4) => this.sendDeviceAttributesSecondary(e4)), this._parser.registerCsiHandler({ final: "d" }, (e4) => this.linePosAbsolute(e4)), this._parser.registerCsiHandler({ final: "e" }, (e4) => this.vPositionRelative(e4)), this._parser.registerCsiHandler({ final: "f" }, (e4) => this.hVPosition(e4)), this._parser.registerCsiHandler({ final: "g" }, (e4) => this.tabClear(e4)), this._parser.registerCsiHandler({ final: "h" }, (e4) => this.setMode(e4)), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, (e4) => this.setModePrivate(e4)), this._parser.registerCsiHandler({ final: "l" }, (e4) => this.resetMode(e4)), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, (e4) => this.resetModePrivate(e4)), this._parser.registerCsiHandler({ final: "m" }, (e4) => this.charAttributes(e4)), this._parser.registerCsiHandler({ final: "n" }, (e4) => this.deviceStatus(e4)), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, (e4) => this.deviceStatusPrivate(e4)), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, (e4) => this.softReset(e4)), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, (e4) => this.setCursorStyle(e4)), this._parser.registerCsiHandler({ final: "r" }, (e4) => this.setScrollRegion(e4)), this._parser.registerCsiHandler({ final: "s" }, (e4) => this.saveCursor(e4)), this._parser.registerCsiHandler({ final: "t" }, (e4) => this.windowOptions(e4)), this._parser.registerCsiHandler({ final: "u" }, (e4) => this.restoreCursor(e4)), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, (e4) => this.insertColumns(e4)), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, (e4) => this.deleteColumns(e4)), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, (e4) => this.selectProtected(e4)), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, (e4) => this.requestMode(e4, true)), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, (e4) => this.requestMode(e4, false)), this._parser.setExecuteHandler(n.C0.BEL, () => this.bell()), this._parser.setExecuteHandler(n.C0.LF, () => this.lineFeed()), this._parser.setExecuteHandler(n.C0.VT, () => this.lineFeed()), this._parser.setExecuteHandler(n.C0.FF, () => this.lineFeed()), this._parser.setExecuteHandler(n.C0.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(n.C0.BS, () => this.backspace()), this._parser.setExecuteHandler(n.C0.HT, () => this.tab()), this._parser.setExecuteHandler(n.C0.SO, () => this.shiftOut()), this._parser.setExecuteHandler(n.C0.SI, () => this.shiftIn()), this._parser.setExecuteHandler(n.C1.IND, () => this.index()), this._parser.setExecuteHandler(n.C1.NEL, () => this.nextLine()), this._parser.setExecuteHandler(n.C1.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new g.OscHandler((e4) => (this.setTitle(e4), this.setIconName(e4), true))), this._parser.registerOscHandler(1, new g.OscHandler((e4) => this.setIconName(e4))), this._parser.registerOscHandler(2, new g.OscHandler((e4) => this.setTitle(e4))), this._parser.registerOscHandler(4, new g.OscHandler((e4) => this.setOrReportIndexedColor(e4))), this._parser.registerOscHandler(8, new g.OscHandler((e4) => this.setHyperlink(e4))), this._parser.registerOscHandler(10, new g.OscHandler((e4) => this.setOrReportFgColor(e4))), this._parser.registerOscHandler(11, new g.OscHandler((e4) => this.setOrReportBgColor(e4))), this._parser.registerOscHandler(12, new g.OscHandler((e4) => this.setOrReportCursorColor(e4))), this._parser.registerOscHandler(104, new g.OscHandler((e4) => this.restoreIndexedColor(e4))), this._parser.registerOscHandler(110, new g.OscHandler((e4) => this.restoreFgColor(e4))), this._parser.registerOscHandler(111, new g.OscHandler((e4) => this.restoreBgColor(e4))), this._parser.registerOscHandler(112, new g.OscHandler((e4) => this.restoreCursorColor(e4))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, () => this.selectDefaultCharset()), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, () => this.selectDefaultCharset());
          for (const e4 in o.CHARSETS)
            this._parser.registerEscHandler({ intermediates: "(", final: e4 }, () => this.selectCharset("(" + e4)), this._parser.registerEscHandler({ intermediates: ")", final: e4 }, () => this.selectCharset(")" + e4)), this._parser.registerEscHandler({ intermediates: "*", final: e4 }, () => this.selectCharset("*" + e4)), this._parser.registerEscHandler({ intermediates: "+", final: e4 }, () => this.selectCharset("+" + e4)), this._parser.registerEscHandler({ intermediates: "-", final: e4 }, () => this.selectCharset("-" + e4)), this._parser.registerEscHandler({ intermediates: ".", final: e4 }, () => this.selectCharset("." + e4)), this._parser.registerEscHandler({ intermediates: "/", final: e4 }, () => this.selectCharset("/" + e4));
          this._parser.registerEscHandler({ intermediates: "#", final: "8" }, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((e4) => (this._logService.error("Parsing error: ", e4), e4)), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new m.DcsHandler((e4, t4) => this.requestStatusString(e4, t4)));
        }
        _preserveStack(e3, t3, i3, s3) {
          this._parseStack.paused = true, this._parseStack.cursorStartX = e3, this._parseStack.cursorStartY = t3, this._parseStack.decodedLength = i3, this._parseStack.position = s3;
        }
        _logSlowResolvingAsync(e3) {
          this._logService.logLevel <= v.LogLevelEnum.WARN && Promise.race([e3, new Promise((e4, t3) => setTimeout(() => t3("#SLOW_TIMEOUT"), 5000))]).catch((e4) => {
            if (e4 !== "#SLOW_TIMEOUT")
              throw e4;
            console.warn("async parser handler taking longer than 5000 ms");
          });
        }
        _getCurrentLinkId() {
          return this._curAttrData.extended.urlId;
        }
        parse(e3, t3) {
          let i3, s3 = this._activeBuffer.x, r2 = this._activeBuffer.y, n2 = 0;
          const o2 = this._parseStack.paused;
          if (o2) {
            if (i3 = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, t3))
              return this._logSlowResolvingAsync(i3), i3;
            s3 = this._parseStack.cursorStartX, r2 = this._parseStack.cursorStartY, this._parseStack.paused = false, e3.length > b && (n2 = this._parseStack.position + b);
          }
          if (this._logService.logLevel <= v.LogLevelEnum.DEBUG && this._logService.debug("parsing data" + (typeof e3 == "string" ? ` "${e3}"` : ` "${Array.prototype.map.call(e3, (e4) => String.fromCharCode(e4)).join("")}"`), typeof e3 == "string" ? e3.split("").map((e4) => e4.charCodeAt(0)) : e3), this._parseBuffer.length < e3.length && this._parseBuffer.length < b && (this._parseBuffer = new Uint32Array(Math.min(e3.length, b))), o2 || this._dirtyRowTracker.clearRange(), e3.length > b)
            for (let t4 = n2;t4 < e3.length; t4 += b) {
              const n3 = t4 + b < e3.length ? t4 + b : e3.length, o3 = typeof e3 == "string" ? this._stringDecoder.decode(e3.substring(t4, n3), this._parseBuffer) : this._utf8Decoder.decode(e3.subarray(t4, n3), this._parseBuffer);
              if (i3 = this._parser.parse(this._parseBuffer, o3))
                return this._preserveStack(s3, r2, o3, t4), this._logSlowResolvingAsync(i3), i3;
            }
          else if (!o2) {
            const t4 = typeof e3 == "string" ? this._stringDecoder.decode(e3, this._parseBuffer) : this._utf8Decoder.decode(e3, this._parseBuffer);
            if (i3 = this._parser.parse(this._parseBuffer, t4))
              return this._preserveStack(s3, r2, t4, 0), this._logSlowResolvingAsync(i3), i3;
          }
          this._activeBuffer.x === s3 && this._activeBuffer.y === r2 || this._onCursorMove.fire();
          const a2 = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), h2 = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
          h2 < this._bufferService.rows && this._onRequestRefreshRows.fire(Math.min(h2, this._bufferService.rows - 1), Math.min(a2, this._bufferService.rows - 1));
        }
        print(e3, t3, i3) {
          let s3, r2;
          const n2 = this._charsetService.charset, o2 = this._optionsService.rawOptions.screenReaderMode, a2 = this._bufferService.cols, h2 = this._coreService.decPrivateModes.wraparound, d2 = this._coreService.modes.insertMode, u2 = this._curAttrData;
          let f2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && i3 - t3 > 0 && f2.getWidth(this._activeBuffer.x - 1) === 2 && f2.setCellFromCodePoint(this._activeBuffer.x - 1, 0, 1, u2.fg, u2.bg, u2.extended);
          let v2 = this._parser.precedingJoinState;
          for (let g2 = t3;g2 < i3; ++g2) {
            if (s3 = e3[g2], s3 < 127 && n2) {
              const e4 = n2[String.fromCharCode(s3)];
              e4 && (s3 = e4.charCodeAt(0));
            }
            const t4 = this._unicodeService.charProperties(s3, v2);
            r2 = p.UnicodeService.extractWidth(t4);
            const i4 = p.UnicodeService.extractShouldJoin(t4), m2 = i4 ? p.UnicodeService.extractWidth(v2) : 0;
            if (v2 = t4, o2 && this._onA11yChar.fire((0, c.stringFromCodePoint)(s3)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + r2 - m2 > a2) {
              if (h2) {
                const e4 = f2;
                let t5 = this._activeBuffer.x - m2;
                for (this._activeBuffer.x = m2, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), true)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true), f2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), m2 > 0 && f2 instanceof l.BufferLine && f2.copyCellsFrom(e4, t5, 0, m2, false);t5 < a2; )
                  e4.setCellFromCodePoint(t5++, 0, 1, u2.fg, u2.bg, u2.extended);
              } else if (this._activeBuffer.x = a2 - 1, r2 === 2)
                continue;
            }
            if (i4 && this._activeBuffer.x) {
              const e4 = f2.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
              f2.addCodepointToCell(this._activeBuffer.x - e4, s3, r2);
              for (let e5 = r2 - m2;--e5 >= 0; )
                f2.setCellFromCodePoint(this._activeBuffer.x++, 0, 0, u2.fg, u2.bg, u2.extended);
            } else if (d2 && (f2.insertCells(this._activeBuffer.x, r2 - m2, this._activeBuffer.getNullCell(u2), u2), f2.getWidth(a2 - 1) === 2 && f2.setCellFromCodePoint(a2 - 1, _.NULL_CELL_CODE, _.NULL_CELL_WIDTH, u2.fg, u2.bg, u2.extended)), f2.setCellFromCodePoint(this._activeBuffer.x++, s3, r2, u2.fg, u2.bg, u2.extended), r2 > 0)
              for (;--r2; )
                f2.setCellFromCodePoint(this._activeBuffer.x++, 0, 0, u2.fg, u2.bg, u2.extended);
          }
          this._parser.precedingJoinState = v2, this._activeBuffer.x < a2 && i3 - t3 > 0 && f2.getWidth(this._activeBuffer.x) === 0 && !f2.hasContent(this._activeBuffer.x) && f2.setCellFromCodePoint(this._activeBuffer.x, 0, 1, u2.fg, u2.bg, u2.extended), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
        }
        registerCsiHandler(e3, t3) {
          return e3.final !== "t" || e3.prefix || e3.intermediates ? this._parser.registerCsiHandler(e3, t3) : this._parser.registerCsiHandler(e3, (e4) => !y(e4.params[0], this._optionsService.rawOptions.windowOptions) || t3(e4));
        }
        registerDcsHandler(e3, t3) {
          return this._parser.registerDcsHandler(e3, new m.DcsHandler(t3));
        }
        registerEscHandler(e3, t3) {
          return this._parser.registerEscHandler(e3, t3);
        }
        registerOscHandler(e3, t3) {
          return this._parser.registerOscHandler(e3, new g.OscHandler(t3));
        }
        bell() {
          return this._onRequestBell.fire(), true;
        }
        lineFeed() {
          return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), true;
        }
        carriageReturn() {
          return this._activeBuffer.x = 0, true;
        }
        backspace() {
          if (!this._coreService.decPrivateModes.reverseWraparound)
            return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, true;
          if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0)
            this._activeBuffer.x--;
          else if (this._activeBuffer.x === 0 && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
            this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
            const e3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            e3.hasWidth(this._activeBuffer.x) && !e3.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
          }
          return this._restrictCursor(), true;
        }
        tab() {
          if (this._activeBuffer.x >= this._bufferService.cols)
            return true;
          const e3 = this._activeBuffer.x;
          return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e3), true;
        }
        shiftOut() {
          return this._charsetService.setgLevel(1), true;
        }
        shiftIn() {
          return this._charsetService.setgLevel(0), true;
        }
        _restrictCursor(e3 = this._bufferService.cols - 1) {
          this._activeBuffer.x = Math.min(e3, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
        }
        _setCursor(e3, t3) {
          this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e3, this._activeBuffer.y = this._activeBuffer.scrollTop + t3) : (this._activeBuffer.x = e3, this._activeBuffer.y = t3), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
        }
        _moveCursor(e3, t3) {
          this._restrictCursor(), this._setCursor(this._activeBuffer.x + e3, this._activeBuffer.y + t3);
        }
        cursorUp(e3) {
          const t3 = this._activeBuffer.y - this._activeBuffer.scrollTop;
          return t3 >= 0 ? this._moveCursor(0, -Math.min(t3, e3.params[0] || 1)) : this._moveCursor(0, -(e3.params[0] || 1)), true;
        }
        cursorDown(e3) {
          const t3 = this._activeBuffer.scrollBottom - this._activeBuffer.y;
          return t3 >= 0 ? this._moveCursor(0, Math.min(t3, e3.params[0] || 1)) : this._moveCursor(0, e3.params[0] || 1), true;
        }
        cursorForward(e3) {
          return this._moveCursor(e3.params[0] || 1, 0), true;
        }
        cursorBackward(e3) {
          return this._moveCursor(-(e3.params[0] || 1), 0), true;
        }
        cursorNextLine(e3) {
          return this.cursorDown(e3), this._activeBuffer.x = 0, true;
        }
        cursorPrecedingLine(e3) {
          return this.cursorUp(e3), this._activeBuffer.x = 0, true;
        }
        cursorCharAbsolute(e3) {
          return this._setCursor((e3.params[0] || 1) - 1, this._activeBuffer.y), true;
        }
        cursorPosition(e3) {
          return this._setCursor(e3.length >= 2 ? (e3.params[1] || 1) - 1 : 0, (e3.params[0] || 1) - 1), true;
        }
        charPosAbsolute(e3) {
          return this._setCursor((e3.params[0] || 1) - 1, this._activeBuffer.y), true;
        }
        hPositionRelative(e3) {
          return this._moveCursor(e3.params[0] || 1, 0), true;
        }
        linePosAbsolute(e3) {
          return this._setCursor(this._activeBuffer.x, (e3.params[0] || 1) - 1), true;
        }
        vPositionRelative(e3) {
          return this._moveCursor(0, e3.params[0] || 1), true;
        }
        hVPosition(e3) {
          return this.cursorPosition(e3), true;
        }
        tabClear(e3) {
          const t3 = e3.params[0];
          return t3 === 0 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : t3 === 3 && (this._activeBuffer.tabs = {}), true;
        }
        cursorForwardTab(e3) {
          if (this._activeBuffer.x >= this._bufferService.cols)
            return true;
          let t3 = e3.params[0] || 1;
          for (;t3--; )
            this._activeBuffer.x = this._activeBuffer.nextStop();
          return true;
        }
        cursorBackwardTab(e3) {
          if (this._activeBuffer.x >= this._bufferService.cols)
            return true;
          let t3 = e3.params[0] || 1;
          for (;t3--; )
            this._activeBuffer.x = this._activeBuffer.prevStop();
          return true;
        }
        selectProtected(e3) {
          const t3 = e3.params[0];
          return t3 === 1 && (this._curAttrData.bg |= 536870912), t3 !== 2 && t3 !== 0 || (this._curAttrData.bg &= -536870913), true;
        }
        _eraseInBufferLine(e3, t3, i3, s3 = false, r2 = false) {
          const n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e3);
          n2.replaceCells(t3, i3, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData(), r2), s3 && (n2.isWrapped = false);
        }
        _resetBufferLine(e3, t3 = false) {
          const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e3);
          i3 && (i3.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), t3), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e3), i3.isWrapped = false);
        }
        eraseInDisplay(e3, t3 = false) {
          let i3;
          switch (this._restrictCursor(this._bufferService.cols), e3.params[0]) {
            case 0:
              for (i3 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i3), this._eraseInBufferLine(i3++, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, t3);i3 < this._bufferService.rows; i3++)
                this._resetBufferLine(i3, t3);
              this._dirtyRowTracker.markDirty(i3);
              break;
            case 1:
              for (i3 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i3), this._eraseInBufferLine(i3, 0, this._activeBuffer.x + 1, true, t3), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(i3 + 1).isWrapped = false);i3--; )
                this._resetBufferLine(i3, t3);
              this._dirtyRowTracker.markDirty(0);
              break;
            case 2:
              for (i3 = this._bufferService.rows, this._dirtyRowTracker.markDirty(i3 - 1);i3--; )
                this._resetBufferLine(i3, t3);
              this._dirtyRowTracker.markDirty(0);
              break;
            case 3:
              const e4 = this._activeBuffer.lines.length - this._bufferService.rows;
              e4 > 0 && (this._activeBuffer.lines.trimStart(e4), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - e4, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - e4, 0), this._onScroll.fire(0));
          }
          return true;
        }
        eraseInLine(e3, t3 = false) {
          switch (this._restrictCursor(this._bufferService.cols), e3.params[0]) {
            case 0:
              this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, t3);
              break;
            case 1:
              this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, t3);
              break;
            case 2:
              this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, t3);
          }
          return this._dirtyRowTracker.markDirty(this._activeBuffer.y), true;
        }
        insertLines(e3) {
          this._restrictCursor();
          let t3 = e3.params[0] || 1;
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return true;
          const i3 = this._activeBuffer.ybase + this._activeBuffer.y, s3 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, r2 = this._bufferService.rows - 1 + this._activeBuffer.ybase - s3 + 1;
          for (;t3--; )
            this._activeBuffer.lines.splice(r2 - 1, 1), this._activeBuffer.lines.splice(i3, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
        }
        deleteLines(e3) {
          this._restrictCursor();
          let t3 = e3.params[0] || 1;
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return true;
          const i3 = this._activeBuffer.ybase + this._activeBuffer.y;
          let s3;
          for (s3 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, s3 = this._bufferService.rows - 1 + this._activeBuffer.ybase - s3;t3--; )
            this._activeBuffer.lines.splice(i3, 1), this._activeBuffer.lines.splice(s3, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
        }
        insertChars(e3) {
          this._restrictCursor();
          const t3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          return t3 && (t3.insertCells(this._activeBuffer.x, e3.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
        }
        deleteChars(e3) {
          this._restrictCursor();
          const t3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          return t3 && (t3.deleteCells(this._activeBuffer.x, e3.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
        }
        scrollUp(e3) {
          let t3 = e3.params[0] || 1;
          for (;t3--; )
            this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        scrollDown(e3) {
          let t3 = e3.params[0] || 1;
          for (;t3--; )
            this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(l.DEFAULT_ATTR_DATA));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        scrollLeft(e3) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return true;
          const t3 = e3.params[0] || 1;
          for (let e4 = this._activeBuffer.scrollTop;e4 <= this._activeBuffer.scrollBottom; ++e4) {
            const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
            i3.deleteCells(0, t3, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i3.isWrapped = false;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        scrollRight(e3) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return true;
          const t3 = e3.params[0] || 1;
          for (let e4 = this._activeBuffer.scrollTop;e4 <= this._activeBuffer.scrollBottom; ++e4) {
            const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
            i3.insertCells(0, t3, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i3.isWrapped = false;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        insertColumns(e3) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return true;
          const t3 = e3.params[0] || 1;
          for (let e4 = this._activeBuffer.scrollTop;e4 <= this._activeBuffer.scrollBottom; ++e4) {
            const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
            i3.insertCells(this._activeBuffer.x, t3, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i3.isWrapped = false;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        deleteColumns(e3) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
            return true;
          const t3 = e3.params[0] || 1;
          for (let e4 = this._activeBuffer.scrollTop;e4 <= this._activeBuffer.scrollBottom; ++e4) {
            const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
            i3.deleteCells(this._activeBuffer.x, t3, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i3.isWrapped = false;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        eraseChars(e3) {
          this._restrictCursor();
          const t3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          return t3 && (t3.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e3.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
        }
        repeatPrecedingCharacter(e3) {
          const t3 = this._parser.precedingJoinState;
          if (!t3)
            return true;
          const i3 = e3.params[0] || 1, s3 = p.UnicodeService.extractWidth(t3), r2 = this._activeBuffer.x - s3, n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(r2), o2 = new Uint32Array(n2.length * i3);
          let a2 = 0;
          for (let e4 = 0;e4 < n2.length; ) {
            const t4 = n2.codePointAt(e4) || 0;
            o2[a2++] = t4, e4 += t4 > 65535 ? 2 : 1;
          }
          let h2 = a2;
          for (let e4 = 1;e4 < i3; ++e4)
            o2.copyWithin(h2, 0, a2), h2 += a2;
          return this.print(o2, 0, h2), true;
        }
        sendDeviceAttributesPrimary(e3) {
          return e3.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(n.C0.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(n.C0.ESC + "[?6c")), true;
        }
        sendDeviceAttributesSecondary(e3) {
          return e3.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e3.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(n.C0.ESC + "[>83;40003;0c")), true;
        }
        _is(e3) {
          return (this._optionsService.rawOptions.termName + "").indexOf(e3) === 0;
        }
        setMode(e3) {
          for (let t3 = 0;t3 < e3.length; t3++)
            switch (e3.params[t3]) {
              case 4:
                this._coreService.modes.insertMode = true;
                break;
              case 20:
                this._optionsService.options.convertEol = true;
            }
          return true;
        }
        setModePrivate(e3) {
          for (let t3 = 0;t3 < e3.length; t3++)
            switch (e3.params[t3]) {
              case 1:
                this._coreService.decPrivateModes.applicationCursorKeys = true;
                break;
              case 2:
                this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), this._charsetService.setgCharset(1, o.DEFAULT_CHARSET), this._charsetService.setgCharset(2, o.DEFAULT_CHARSET), this._charsetService.setgCharset(3, o.DEFAULT_CHARSET);
                break;
              case 3:
                this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
                break;
              case 6:
                this._coreService.decPrivateModes.origin = true, this._setCursor(0, 0);
                break;
              case 7:
                this._coreService.decPrivateModes.wraparound = true;
                break;
              case 12:
                this._optionsService.options.cursorBlink = true;
                break;
              case 45:
                this._coreService.decPrivateModes.reverseWraparound = true;
                break;
              case 66:
                this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire();
                break;
              case 9:
                this._coreMouseService.activeProtocol = "X10";
                break;
              case 1000:
                this._coreMouseService.activeProtocol = "VT200";
                break;
              case 1002:
                this._coreMouseService.activeProtocol = "DRAG";
                break;
              case 1003:
                this._coreMouseService.activeProtocol = "ANY";
                break;
              case 1004:
                this._coreService.decPrivateModes.sendFocus = true, this._onRequestSendFocus.fire();
                break;
              case 1005:
                this._logService.debug("DECSET 1005 not supported (see #2507)");
                break;
              case 1006:
                this._coreMouseService.activeEncoding = "SGR";
                break;
              case 1015:
                this._logService.debug("DECSET 1015 not supported (see #2507)");
                break;
              case 1016:
                this._coreMouseService.activeEncoding = "SGR_PIXELS";
                break;
              case 25:
                this._coreService.isCursorHidden = false;
                break;
              case 1048:
                this.saveCursor();
                break;
              case 1049:
                this.saveCursor();
              case 47:
              case 1047:
                this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
                break;
              case 2004:
                this._coreService.decPrivateModes.bracketedPasteMode = true;
            }
          return true;
        }
        resetMode(e3) {
          for (let t3 = 0;t3 < e3.length; t3++)
            switch (e3.params[t3]) {
              case 4:
                this._coreService.modes.insertMode = false;
                break;
              case 20:
                this._optionsService.options.convertEol = false;
            }
          return true;
        }
        resetModePrivate(e3) {
          for (let t3 = 0;t3 < e3.length; t3++)
            switch (e3.params[t3]) {
              case 1:
                this._coreService.decPrivateModes.applicationCursorKeys = false;
                break;
              case 3:
                this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
                break;
              case 6:
                this._coreService.decPrivateModes.origin = false, this._setCursor(0, 0);
                break;
              case 7:
                this._coreService.decPrivateModes.wraparound = false;
                break;
              case 12:
                this._optionsService.options.cursorBlink = false;
                break;
              case 45:
                this._coreService.decPrivateModes.reverseWraparound = false;
                break;
              case 66:
                this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire();
                break;
              case 9:
              case 1000:
              case 1002:
              case 1003:
                this._coreMouseService.activeProtocol = "NONE";
                break;
              case 1004:
                this._coreService.decPrivateModes.sendFocus = false;
                break;
              case 1005:
                this._logService.debug("DECRST 1005 not supported (see #2507)");
                break;
              case 1006:
              case 1016:
                this._coreMouseService.activeEncoding = "DEFAULT";
                break;
              case 1015:
                this._logService.debug("DECRST 1015 not supported (see #2507)");
                break;
              case 25:
                this._coreService.isCursorHidden = true;
                break;
              case 1048:
                this.restoreCursor();
                break;
              case 1049:
              case 47:
              case 1047:
                this._bufferService.buffers.activateNormalBuffer(), e3.params[t3] === 1049 && this.restoreCursor(), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
                break;
              case 2004:
                this._coreService.decPrivateModes.bracketedPasteMode = false;
            }
          return true;
        }
        requestMode(e3, t3) {
          const i3 = this._coreService.decPrivateModes, { activeProtocol: s3, activeEncoding: r2 } = this._coreMouseService, o2 = this._coreService, { buffers: a2, cols: h2 } = this._bufferService, { active: c2, alt: l2 } = a2, d2 = this._optionsService.rawOptions, _2 = (e4) => e4 ? 1 : 2, u2 = e3.params[0];
          return f2 = u2, v2 = t3 ? u2 === 2 ? 4 : u2 === 4 ? _2(o2.modes.insertMode) : u2 === 12 ? 3 : u2 === 20 ? _2(d2.convertEol) : 0 : u2 === 1 ? _2(i3.applicationCursorKeys) : u2 === 3 ? d2.windowOptions.setWinLines ? h2 === 80 ? 2 : h2 === 132 ? 1 : 0 : 0 : u2 === 6 ? _2(i3.origin) : u2 === 7 ? _2(i3.wraparound) : u2 === 8 ? 3 : u2 === 9 ? _2(s3 === "X10") : u2 === 12 ? _2(d2.cursorBlink) : u2 === 25 ? _2(!o2.isCursorHidden) : u2 === 45 ? _2(i3.reverseWraparound) : u2 === 66 ? _2(i3.applicationKeypad) : u2 === 67 ? 4 : u2 === 1000 ? _2(s3 === "VT200") : u2 === 1002 ? _2(s3 === "DRAG") : u2 === 1003 ? _2(s3 === "ANY") : u2 === 1004 ? _2(i3.sendFocus) : u2 === 1005 ? 4 : u2 === 1006 ? _2(r2 === "SGR") : u2 === 1015 ? 4 : u2 === 1016 ? _2(r2 === "SGR_PIXELS") : u2 === 1048 ? 1 : u2 === 47 || u2 === 1047 || u2 === 1049 ? _2(c2 === l2) : u2 === 2004 ? _2(i3.bracketedPasteMode) : 0, o2.triggerDataEvent(`${n.C0.ESC}[${t3 ? "" : "?"}${f2};${v2}\$y`), true;
          var f2, v2;
        }
        _updateAttrColor(e3, t3, i3, s3, r2) {
          return t3 === 2 ? (e3 |= 50331648, e3 &= -16777216, e3 |= f.AttributeData.fromColorRGB([i3, s3, r2])) : t3 === 5 && (e3 &= -50331904, e3 |= 33554432 | 255 & i3), e3;
        }
        _extractColor(e3, t3, i3) {
          const s3 = [0, 0, -1, 0, 0, 0];
          let r2 = 0, n2 = 0;
          do {
            if (s3[n2 + r2] = e3.params[t3 + n2], e3.hasSubParams(t3 + n2)) {
              const i4 = e3.getSubParams(t3 + n2);
              let o2 = 0;
              do {
                s3[1] === 5 && (r2 = 1), s3[n2 + o2 + 1 + r2] = i4[o2];
              } while (++o2 < i4.length && o2 + n2 + 1 + r2 < s3.length);
              break;
            }
            if (s3[1] === 5 && n2 + r2 >= 2 || s3[1] === 2 && n2 + r2 >= 5)
              break;
            s3[1] && (r2 = 1);
          } while (++n2 + t3 < e3.length && n2 + r2 < s3.length);
          for (let e4 = 2;e4 < s3.length; ++e4)
            s3[e4] === -1 && (s3[e4] = 0);
          switch (s3[0]) {
            case 38:
              i3.fg = this._updateAttrColor(i3.fg, s3[1], s3[3], s3[4], s3[5]);
              break;
            case 48:
              i3.bg = this._updateAttrColor(i3.bg, s3[1], s3[3], s3[4], s3[5]);
              break;
            case 58:
              i3.extended = i3.extended.clone(), i3.extended.underlineColor = this._updateAttrColor(i3.extended.underlineColor, s3[1], s3[3], s3[4], s3[5]);
          }
          return n2;
        }
        _processUnderline(e3, t3) {
          t3.extended = t3.extended.clone(), (!~e3 || e3 > 5) && (e3 = 1), t3.extended.underlineStyle = e3, t3.fg |= 268435456, e3 === 0 && (t3.fg &= -268435457), t3.updateExtended();
        }
        _processSGR0(e3) {
          e3.fg = l.DEFAULT_ATTR_DATA.fg, e3.bg = l.DEFAULT_ATTR_DATA.bg, e3.extended = e3.extended.clone(), e3.extended.underlineStyle = 0, e3.extended.underlineColor &= -67108864, e3.updateExtended();
        }
        charAttributes(e3) {
          if (e3.length === 1 && e3.params[0] === 0)
            return this._processSGR0(this._curAttrData), true;
          const t3 = e3.length;
          let i3;
          const s3 = this._curAttrData;
          for (let r2 = 0;r2 < t3; r2++)
            i3 = e3.params[r2], i3 >= 30 && i3 <= 37 ? (s3.fg &= -50331904, s3.fg |= 16777216 | i3 - 30) : i3 >= 40 && i3 <= 47 ? (s3.bg &= -50331904, s3.bg |= 16777216 | i3 - 40) : i3 >= 90 && i3 <= 97 ? (s3.fg &= -50331904, s3.fg |= 16777224 | i3 - 90) : i3 >= 100 && i3 <= 107 ? (s3.bg &= -50331904, s3.bg |= 16777224 | i3 - 100) : i3 === 0 ? this._processSGR0(s3) : i3 === 1 ? s3.fg |= 134217728 : i3 === 3 ? s3.bg |= 67108864 : i3 === 4 ? (s3.fg |= 268435456, this._processUnderline(e3.hasSubParams(r2) ? e3.getSubParams(r2)[0] : 1, s3)) : i3 === 5 ? s3.fg |= 536870912 : i3 === 7 ? s3.fg |= 67108864 : i3 === 8 ? s3.fg |= 1073741824 : i3 === 9 ? s3.fg |= 2147483648 : i3 === 2 ? s3.bg |= 134217728 : i3 === 21 ? this._processUnderline(2, s3) : i3 === 22 ? (s3.fg &= -134217729, s3.bg &= -134217729) : i3 === 23 ? s3.bg &= -67108865 : i3 === 24 ? (s3.fg &= -268435457, this._processUnderline(0, s3)) : i3 === 25 ? s3.fg &= -536870913 : i3 === 27 ? s3.fg &= -67108865 : i3 === 28 ? s3.fg &= -1073741825 : i3 === 29 ? s3.fg &= 2147483647 : i3 === 39 ? (s3.fg &= -67108864, s3.fg |= 16777215 & l.DEFAULT_ATTR_DATA.fg) : i3 === 49 ? (s3.bg &= -67108864, s3.bg |= 16777215 & l.DEFAULT_ATTR_DATA.bg) : i3 === 38 || i3 === 48 || i3 === 58 ? r2 += this._extractColor(e3, r2, s3) : i3 === 53 ? s3.bg |= 1073741824 : i3 === 55 ? s3.bg &= -1073741825 : i3 === 59 ? (s3.extended = s3.extended.clone(), s3.extended.underlineColor = -1, s3.updateExtended()) : i3 === 100 ? (s3.fg &= -67108864, s3.fg |= 16777215 & l.DEFAULT_ATTR_DATA.fg, s3.bg &= -67108864, s3.bg |= 16777215 & l.DEFAULT_ATTR_DATA.bg) : this._logService.debug("Unknown SGR attribute: %d.", i3);
          return true;
        }
        deviceStatus(e3) {
          switch (e3.params[0]) {
            case 5:
              this._coreService.triggerDataEvent(`${n.C0.ESC}[0n`);
              break;
            case 6:
              const e4 = this._activeBuffer.y + 1, t3 = this._activeBuffer.x + 1;
              this._coreService.triggerDataEvent(`${n.C0.ESC}[${e4};${t3}R`);
          }
          return true;
        }
        deviceStatusPrivate(e3) {
          if (e3.params[0] === 6) {
            const e4 = this._activeBuffer.y + 1, t3 = this._activeBuffer.x + 1;
            this._coreService.triggerDataEvent(`${n.C0.ESC}[?${e4};${t3}R`);
          }
          return true;
        }
        softReset(e3) {
          return this._coreService.isCursorHidden = false, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = false, true;
        }
        setCursorStyle(e3) {
          const t3 = e3.params[0] || 1;
          switch (t3) {
            case 1:
            case 2:
              this._optionsService.options.cursorStyle = "block";
              break;
            case 3:
            case 4:
              this._optionsService.options.cursorStyle = "underline";
              break;
            case 5:
            case 6:
              this._optionsService.options.cursorStyle = "bar";
          }
          const i3 = t3 % 2 == 1;
          return this._optionsService.options.cursorBlink = i3, true;
        }
        setScrollRegion(e3) {
          const t3 = e3.params[0] || 1;
          let i3;
          return (e3.length < 2 || (i3 = e3.params[1]) > this._bufferService.rows || i3 === 0) && (i3 = this._bufferService.rows), i3 > t3 && (this._activeBuffer.scrollTop = t3 - 1, this._activeBuffer.scrollBottom = i3 - 1, this._setCursor(0, 0)), true;
        }
        windowOptions(e3) {
          if (!y(e3.params[0], this._optionsService.rawOptions.windowOptions))
            return true;
          const t3 = e3.length > 1 ? e3.params[1] : 0;
          switch (e3.params[0]) {
            case 14:
              t3 !== 2 && this._onRequestWindowsOptionsReport.fire(w.GET_WIN_SIZE_PIXELS);
              break;
            case 16:
              this._onRequestWindowsOptionsReport.fire(w.GET_CELL_SIZE_PIXELS);
              break;
            case 18:
              this._bufferService && this._coreService.triggerDataEvent(`${n.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
              break;
            case 22:
              t3 !== 0 && t3 !== 2 || (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > 10 && this._windowTitleStack.shift()), t3 !== 0 && t3 !== 1 || (this._iconNameStack.push(this._iconName), this._iconNameStack.length > 10 && this._iconNameStack.shift());
              break;
            case 23:
              t3 !== 0 && t3 !== 2 || this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), t3 !== 0 && t3 !== 1 || this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
          }
          return true;
        }
        saveCursor(e3) {
          return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, true;
        }
        restoreCursor(e3) {
          return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), true;
        }
        setTitle(e3) {
          return this._windowTitle = e3, this._onTitleChange.fire(e3), true;
        }
        setIconName(e3) {
          return this._iconName = e3, true;
        }
        setOrReportIndexedColor(e3) {
          const t3 = [], i3 = e3.split(";");
          for (;i3.length > 1; ) {
            const e4 = i3.shift(), s3 = i3.shift();
            if (/^\d+$/.exec(e4)) {
              const i4 = parseInt(e4);
              if (D(i4))
                if (s3 === "?")
                  t3.push({ type: 0, index: i4 });
                else {
                  const e5 = (0, S.parseColor)(s3);
                  e5 && t3.push({ type: 1, index: i4, color: e5 });
                }
            }
          }
          return t3.length && this._onColor.fire(t3), true;
        }
        setHyperlink(e3) {
          const t3 = e3.split(";");
          return !(t3.length < 2) && (t3[1] ? this._createHyperlink(t3[0], t3[1]) : !t3[0] && this._finishHyperlink());
        }
        _createHyperlink(e3, t3) {
          this._getCurrentLinkId() && this._finishHyperlink();
          const i3 = e3.split(":");
          let s3;
          const r2 = i3.findIndex((e4) => e4.startsWith("id="));
          return r2 !== -1 && (s3 = i3[r2].slice(3) || undefined), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({ id: s3, uri: t3 }), this._curAttrData.updateExtended(), true;
        }
        _finishHyperlink() {
          return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), true;
        }
        _setOrReportSpecialColor(e3, t3) {
          const i3 = e3.split(";");
          for (let e4 = 0;e4 < i3.length && !(t3 >= this._specialColors.length); ++e4, ++t3)
            if (i3[e4] === "?")
              this._onColor.fire([{ type: 0, index: this._specialColors[t3] }]);
            else {
              const s3 = (0, S.parseColor)(i3[e4]);
              s3 && this._onColor.fire([{ type: 1, index: this._specialColors[t3], color: s3 }]);
            }
          return true;
        }
        setOrReportFgColor(e3) {
          return this._setOrReportSpecialColor(e3, 0);
        }
        setOrReportBgColor(e3) {
          return this._setOrReportSpecialColor(e3, 1);
        }
        setOrReportCursorColor(e3) {
          return this._setOrReportSpecialColor(e3, 2);
        }
        restoreIndexedColor(e3) {
          if (!e3)
            return this._onColor.fire([{ type: 2 }]), true;
          const t3 = [], i3 = e3.split(";");
          for (let e4 = 0;e4 < i3.length; ++e4)
            if (/^\d+$/.exec(i3[e4])) {
              const s3 = parseInt(i3[e4]);
              D(s3) && t3.push({ type: 2, index: s3 });
            }
          return t3.length && this._onColor.fire(t3), true;
        }
        restoreFgColor(e3) {
          return this._onColor.fire([{ type: 2, index: 256 }]), true;
        }
        restoreBgColor(e3) {
          return this._onColor.fire([{ type: 2, index: 257 }]), true;
        }
        restoreCursorColor(e3) {
          return this._onColor.fire([{ type: 2, index: 258 }]), true;
        }
        nextLine() {
          return this._activeBuffer.x = 0, this.index(), true;
        }
        keypadApplicationMode() {
          return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire(), true;
        }
        keypadNumericMode() {
          return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire(), true;
        }
        selectDefaultCharset() {
          return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), true;
        }
        selectCharset(e3) {
          return e3.length !== 2 ? (this.selectDefaultCharset(), true) : (e3[0] === "/" || this._charsetService.setgCharset(C[e3[0]], o.CHARSETS[e3[1]] || o.DEFAULT_CHARSET), true);
        }
        index() {
          return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), true;
        }
        tabSet() {
          return this._activeBuffer.tabs[this._activeBuffer.x] = true, true;
        }
        reverseIndex() {
          if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
            const e3 = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
            this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e3, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
          } else
            this._activeBuffer.y--, this._restrictCursor();
          return true;
        }
        fullReset() {
          return this._parser.reset(), this._onRequestReset.fire(), true;
        }
        reset() {
          this._curAttrData = l.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = l.DEFAULT_ATTR_DATA.clone();
        }
        _eraseAttrData() {
          return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= 67108863 & this._curAttrData.bg, this._eraseAttrDataInternal;
        }
        setgLevel(e3) {
          return this._charsetService.setgLevel(e3), true;
        }
        screenAlignmentPattern() {
          const e3 = new u.CellData;
          e3.content = 1 << 22 | "E".charCodeAt(0), e3.fg = this._curAttrData.fg, e3.bg = this._curAttrData.bg, this._setCursor(0, 0);
          for (let t3 = 0;t3 < this._bufferService.rows; ++t3) {
            const i3 = this._activeBuffer.ybase + this._activeBuffer.y + t3, s3 = this._activeBuffer.lines.get(i3);
            s3 && (s3.fill(e3), s3.isWrapped = false);
          }
          return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), true;
        }
        requestStatusString(e3, t3) {
          const i3 = this._bufferService.buffer, s3 = this._optionsService.rawOptions;
          return ((e4) => (this._coreService.triggerDataEvent(`${n.C0.ESC}${e4}${n.C0.ESC}\\`), true))(e3 === '"q' ? `P1\$r${this._curAttrData.isProtected() ? 1 : 0}"q` : e3 === '"p' ? 'P1$r61;1"p' : e3 === "r" ? `P1\$r${i3.scrollTop + 1};${i3.scrollBottom + 1}r` : e3 === "m" ? "P1$r0m" : e3 === " q" ? `P1\$r${{ block: 2, underline: 4, bar: 6 }[s3.cursorStyle] - (s3.cursorBlink ? 1 : 0)} q` : "P0$r");
        }
        markRangeDirty(e3, t3) {
          this._dirtyRowTracker.markRangeDirty(e3, t3);
        }
      }
      t2.InputHandler = k;
      let L = class {
        constructor(e3) {
          this._bufferService = e3, this.clearRange();
        }
        clearRange() {
          this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
        }
        markDirty(e3) {
          e3 < this.start ? this.start = e3 : e3 > this.end && (this.end = e3);
        }
        markRangeDirty(e3, t3) {
          e3 > t3 && (E = e3, e3 = t3, t3 = E), e3 < this.start && (this.start = e3), t3 > this.end && (this.end = t3);
        }
        markAllDirty() {
          this.markRangeDirty(0, this._bufferService.rows - 1);
        }
      };
      function D(e3) {
        return 0 <= e3 && e3 < 256;
      }
      L = s2([r(0, v.IBufferService)], L);
    }, 844: (e2, t2) => {
      function i2(e3) {
        for (const t3 of e3)
          t3.dispose();
        e3.length = 0;
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.getDisposeArrayDisposable = t2.disposeArray = t2.toDisposable = t2.MutableDisposable = t2.Disposable = undefined, t2.Disposable = class {
        constructor() {
          this._disposables = [], this._isDisposed = false;
        }
        dispose() {
          this._isDisposed = true;
          for (const e3 of this._disposables)
            e3.dispose();
          this._disposables.length = 0;
        }
        register(e3) {
          return this._disposables.push(e3), e3;
        }
        unregister(e3) {
          const t3 = this._disposables.indexOf(e3);
          t3 !== -1 && this._disposables.splice(t3, 1);
        }
      }, t2.MutableDisposable = class {
        constructor() {
          this._isDisposed = false;
        }
        get value() {
          return this._isDisposed ? undefined : this._value;
        }
        set value(e3) {
          this._isDisposed || e3 === this._value || (this._value?.dispose(), this._value = e3);
        }
        clear() {
          this.value = undefined;
        }
        dispose() {
          this._isDisposed = true, this._value?.dispose(), this._value = undefined;
        }
      }, t2.toDisposable = function(e3) {
        return { dispose: e3 };
      }, t2.disposeArray = i2, t2.getDisposeArrayDisposable = function(e3) {
        return { dispose: () => i2(e3) };
      };
    }, 1505: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.FourKeyMap = t2.TwoKeyMap = undefined;

      class i2 {
        constructor() {
          this._data = {};
        }
        set(e3, t3, i3) {
          this._data[e3] || (this._data[e3] = {}), this._data[e3][t3] = i3;
        }
        get(e3, t3) {
          return this._data[e3] ? this._data[e3][t3] : undefined;
        }
        clear() {
          this._data = {};
        }
      }
      t2.TwoKeyMap = i2, t2.FourKeyMap = class {
        constructor() {
          this._data = new i2;
        }
        set(e3, t3, s2, r, n) {
          this._data.get(e3, t3) || this._data.set(e3, t3, new i2), this._data.get(e3, t3).set(s2, r, n);
        }
        get(e3, t3, i3, s2) {
          return this._data.get(e3, t3)?.get(i3, s2);
        }
        clear() {
          this._data.clear();
        }
      };
    }, 6114: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.isChromeOS = t2.isLinux = t2.isWindows = t2.isIphone = t2.isIpad = t2.isMac = t2.getSafariVersion = t2.isSafari = t2.isLegacyEdge = t2.isFirefox = t2.isNode = undefined, t2.isNode = typeof navigator == "undefined";
      const i2 = t2.isNode ? "node" : navigator.userAgent, s2 = t2.isNode ? "node" : navigator.platform;
      t2.isFirefox = i2.includes("Firefox"), t2.isLegacyEdge = i2.includes("Edge"), t2.isSafari = /^((?!chrome|android).)*safari/i.test(i2), t2.getSafariVersion = function() {
        if (!t2.isSafari)
          return 0;
        const e3 = i2.match(/Version\/(\d+)/);
        return e3 === null || e3.length < 2 ? 0 : parseInt(e3[1]);
      }, t2.isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(s2), t2.isIpad = s2 === "iPad", t2.isIphone = s2 === "iPhone", t2.isWindows = ["Windows", "Win16", "Win32", "WinCE"].includes(s2), t2.isLinux = s2.indexOf("Linux") >= 0, t2.isChromeOS = /\bCrOS\b/.test(i2);
    }, 6106: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.SortedList = undefined;
      let i2 = 0;
      t2.SortedList = class {
        constructor(e3) {
          this._getKey = e3, this._array = [];
        }
        clear() {
          this._array.length = 0;
        }
        insert(e3) {
          this._array.length !== 0 ? (i2 = this._search(this._getKey(e3)), this._array.splice(i2, 0, e3)) : this._array.push(e3);
        }
        delete(e3) {
          if (this._array.length === 0)
            return false;
          const t3 = this._getKey(e3);
          if (t3 === undefined)
            return false;
          if (i2 = this._search(t3), i2 === -1)
            return false;
          if (this._getKey(this._array[i2]) !== t3)
            return false;
          do {
            if (this._array[i2] === e3)
              return this._array.splice(i2, 1), true;
          } while (++i2 < this._array.length && this._getKey(this._array[i2]) === t3);
          return false;
        }
        *getKeyIterator(e3) {
          if (this._array.length !== 0 && (i2 = this._search(e3), !(i2 < 0 || i2 >= this._array.length) && this._getKey(this._array[i2]) === e3))
            do {
              yield this._array[i2];
            } while (++i2 < this._array.length && this._getKey(this._array[i2]) === e3);
        }
        forEachByKey(e3, t3) {
          if (this._array.length !== 0 && (i2 = this._search(e3), !(i2 < 0 || i2 >= this._array.length) && this._getKey(this._array[i2]) === e3))
            do {
              t3(this._array[i2]);
            } while (++i2 < this._array.length && this._getKey(this._array[i2]) === e3);
        }
        values() {
          return [...this._array].values();
        }
        _search(e3) {
          let t3 = 0, i3 = this._array.length - 1;
          for (;i3 >= t3; ) {
            let s2 = t3 + i3 >> 1;
            const r = this._getKey(this._array[s2]);
            if (r > e3)
              i3 = s2 - 1;
            else {
              if (!(r < e3)) {
                for (;s2 > 0 && this._getKey(this._array[s2 - 1]) === e3; )
                  s2--;
                return s2;
              }
              t3 = s2 + 1;
            }
          }
          return t3;
        }
      };
    }, 7226: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.DebouncedIdleTask = t2.IdleTaskQueue = t2.PriorityTaskQueue = undefined;
      const s2 = i2(6114);

      class r {
        constructor() {
          this._tasks = [], this._i = 0;
        }
        enqueue(e3) {
          this._tasks.push(e3), this._start();
        }
        flush() {
          for (;this._i < this._tasks.length; )
            this._tasks[this._i]() || this._i++;
          this.clear();
        }
        clear() {
          this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = undefined), this._i = 0, this._tasks.length = 0;
        }
        _start() {
          this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
        }
        _process(e3) {
          this._idleCallback = undefined;
          let t3 = 0, i3 = 0, s3 = e3.timeRemaining(), r2 = 0;
          for (;this._i < this._tasks.length; ) {
            if (t3 = Date.now(), this._tasks[this._i]() || this._i++, t3 = Math.max(1, Date.now() - t3), i3 = Math.max(t3, i3), r2 = e3.timeRemaining(), 1.5 * i3 > r2)
              return s3 - t3 < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(s3 - t3))}ms`), void this._start();
            s3 = r2;
          }
          this.clear();
        }
      }

      class n extends r {
        _requestCallback(e3) {
          return setTimeout(() => e3(this._createDeadline(16)));
        }
        _cancelCallback(e3) {
          clearTimeout(e3);
        }
        _createDeadline(e3) {
          const t3 = Date.now() + e3;
          return { timeRemaining: () => Math.max(0, t3 - Date.now()) };
        }
      }
      t2.PriorityTaskQueue = n, t2.IdleTaskQueue = !s2.isNode && ("requestIdleCallback" in window) ? class extends r {
        _requestCallback(e3) {
          return requestIdleCallback(e3);
        }
        _cancelCallback(e3) {
          cancelIdleCallback(e3);
        }
      } : n, t2.DebouncedIdleTask = class {
        constructor() {
          this._queue = new t2.IdleTaskQueue;
        }
        set(e3) {
          this._queue.clear(), this._queue.enqueue(e3);
        }
        flush() {
          this._queue.flush();
        }
      };
    }, 9282: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.updateWindowsModeWrappedState = undefined;
      const s2 = i2(643);
      t2.updateWindowsModeWrappedState = function(e3) {
        const t3 = e3.buffer.lines.get(e3.buffer.ybase + e3.buffer.y - 1), i3 = t3?.get(e3.cols - 1), r = e3.buffer.lines.get(e3.buffer.ybase + e3.buffer.y);
        r && i3 && (r.isWrapped = i3[s2.CHAR_DATA_CODE_INDEX] !== s2.NULL_CELL_CODE && i3[s2.CHAR_DATA_CODE_INDEX] !== s2.WHITESPACE_CELL_CODE);
      };
    }, 3734: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.ExtendedAttrs = t2.AttributeData = undefined;

      class i2 {
        constructor() {
          this.fg = 0, this.bg = 0, this.extended = new s2;
        }
        static toColorRGB(e3) {
          return [e3 >>> 16 & 255, e3 >>> 8 & 255, 255 & e3];
        }
        static fromColorRGB(e3) {
          return (255 & e3[0]) << 16 | (255 & e3[1]) << 8 | 255 & e3[2];
        }
        clone() {
          const e3 = new i2;
          return e3.fg = this.fg, e3.bg = this.bg, e3.extended = this.extended.clone(), e3;
        }
        isInverse() {
          return 67108864 & this.fg;
        }
        isBold() {
          return 134217728 & this.fg;
        }
        isUnderline() {
          return this.hasExtendedAttrs() && this.extended.underlineStyle !== 0 ? 1 : 268435456 & this.fg;
        }
        isBlink() {
          return 536870912 & this.fg;
        }
        isInvisible() {
          return 1073741824 & this.fg;
        }
        isItalic() {
          return 67108864 & this.bg;
        }
        isDim() {
          return 134217728 & this.bg;
        }
        isStrikethrough() {
          return 2147483648 & this.fg;
        }
        isProtected() {
          return 536870912 & this.bg;
        }
        isOverline() {
          return 1073741824 & this.bg;
        }
        getFgColorMode() {
          return 50331648 & this.fg;
        }
        getBgColorMode() {
          return 50331648 & this.bg;
        }
        isFgRGB() {
          return (50331648 & this.fg) == 50331648;
        }
        isBgRGB() {
          return (50331648 & this.bg) == 50331648;
        }
        isFgPalette() {
          return (50331648 & this.fg) == 16777216 || (50331648 & this.fg) == 33554432;
        }
        isBgPalette() {
          return (50331648 & this.bg) == 16777216 || (50331648 & this.bg) == 33554432;
        }
        isFgDefault() {
          return (50331648 & this.fg) == 0;
        }
        isBgDefault() {
          return (50331648 & this.bg) == 0;
        }
        isAttributeDefault() {
          return this.fg === 0 && this.bg === 0;
        }
        getFgColor() {
          switch (50331648 & this.fg) {
            case 16777216:
            case 33554432:
              return 255 & this.fg;
            case 50331648:
              return 16777215 & this.fg;
            default:
              return -1;
          }
        }
        getBgColor() {
          switch (50331648 & this.bg) {
            case 16777216:
            case 33554432:
              return 255 & this.bg;
            case 50331648:
              return 16777215 & this.bg;
            default:
              return -1;
          }
        }
        hasExtendedAttrs() {
          return 268435456 & this.bg;
        }
        updateExtended() {
          this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
        }
        getUnderlineColor() {
          if (268435456 & this.bg && ~this.extended.underlineColor)
            switch (50331648 & this.extended.underlineColor) {
              case 16777216:
              case 33554432:
                return 255 & this.extended.underlineColor;
              case 50331648:
                return 16777215 & this.extended.underlineColor;
              default:
                return this.getFgColor();
            }
          return this.getFgColor();
        }
        getUnderlineColorMode() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 & this.extended.underlineColor : this.getFgColorMode();
        }
        isUnderlineColorRGB() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? (50331648 & this.extended.underlineColor) == 50331648 : this.isFgRGB();
        }
        isUnderlineColorPalette() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? (50331648 & this.extended.underlineColor) == 16777216 || (50331648 & this.extended.underlineColor) == 33554432 : this.isFgPalette();
        }
        isUnderlineColorDefault() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? (50331648 & this.extended.underlineColor) == 0 : this.isFgDefault();
        }
        getUnderlineStyle() {
          return 268435456 & this.fg ? 268435456 & this.bg ? this.extended.underlineStyle : 1 : 0;
        }
      }
      t2.AttributeData = i2;

      class s2 {
        get ext() {
          return this._urlId ? -469762049 & this._ext | this.underlineStyle << 26 : this._ext;
        }
        set ext(e3) {
          this._ext = e3;
        }
        get underlineStyle() {
          return this._urlId ? 5 : (469762048 & this._ext) >> 26;
        }
        set underlineStyle(e3) {
          this._ext &= -469762049, this._ext |= e3 << 26 & 469762048;
        }
        get underlineColor() {
          return 67108863 & this._ext;
        }
        set underlineColor(e3) {
          this._ext &= -67108864, this._ext |= 67108863 & e3;
        }
        get urlId() {
          return this._urlId;
        }
        set urlId(e3) {
          this._urlId = e3;
        }
        constructor(e3 = 0, t3 = 0) {
          this._ext = 0, this._urlId = 0, this._ext = e3, this._urlId = t3;
        }
        clone() {
          return new s2(this._ext, this._urlId);
        }
        isEmpty() {
          return this.underlineStyle === 0 && this._urlId === 0;
        }
      }
      t2.ExtendedAttrs = s2;
    }, 9092: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.Buffer = t2.MAX_BUFFER_SIZE = undefined;
      const s2 = i2(6349), r = i2(7226), n = i2(3734), o = i2(8437), a = i2(4634), h = i2(511), c = i2(643), l = i2(4863), d = i2(7116);
      t2.MAX_BUFFER_SIZE = 4294967295, t2.Buffer = class {
        constructor(e3, t3, i3) {
          this._hasScrollback = e3, this._optionsService = t3, this._bufferService = i3, this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.tabs = {}, this.savedY = 0, this.savedX = 0, this.savedCurAttrData = o.DEFAULT_ATTR_DATA.clone(), this.savedCharset = d.DEFAULT_CHARSET, this.markers = [], this._nullCell = h.CellData.fromCharData([0, c.NULL_CELL_CHAR, c.NULL_CELL_WIDTH, c.NULL_CELL_CODE]), this._whitespaceCell = h.CellData.fromCharData([0, c.WHITESPACE_CELL_CHAR, c.WHITESPACE_CELL_WIDTH, c.WHITESPACE_CELL_CODE]), this._isClearing = false, this._memoryCleanupQueue = new r.IdleTaskQueue, this._memoryCleanupPosition = 0, this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new s2.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
        }
        getNullCell(e3) {
          return e3 ? (this._nullCell.fg = e3.fg, this._nullCell.bg = e3.bg, this._nullCell.extended = e3.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new n.ExtendedAttrs), this._nullCell;
        }
        getWhitespaceCell(e3) {
          return e3 ? (this._whitespaceCell.fg = e3.fg, this._whitespaceCell.bg = e3.bg, this._whitespaceCell.extended = e3.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new n.ExtendedAttrs), this._whitespaceCell;
        }
        getBlankLine(e3, t3) {
          return new o.BufferLine(this._bufferService.cols, this.getNullCell(e3), t3);
        }
        get hasScrollback() {
          return this._hasScrollback && this.lines.maxLength > this._rows;
        }
        get isCursorInViewport() {
          const e3 = this.ybase + this.y - this.ydisp;
          return e3 >= 0 && e3 < this._rows;
        }
        _getCorrectBufferLength(e3) {
          if (!this._hasScrollback)
            return e3;
          const i3 = e3 + this._optionsService.rawOptions.scrollback;
          return i3 > t2.MAX_BUFFER_SIZE ? t2.MAX_BUFFER_SIZE : i3;
        }
        fillViewportRows(e3) {
          if (this.lines.length === 0) {
            e3 === undefined && (e3 = o.DEFAULT_ATTR_DATA);
            let t3 = this._rows;
            for (;t3--; )
              this.lines.push(this.getBlankLine(e3));
          }
        }
        clear() {
          this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new s2.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
        }
        resize(e3, t3) {
          const i3 = this.getNullCell(o.DEFAULT_ATTR_DATA);
          let s3 = 0;
          const r2 = this._getCorrectBufferLength(t3);
          if (r2 > this.lines.maxLength && (this.lines.maxLength = r2), this.lines.length > 0) {
            if (this._cols < e3)
              for (let t4 = 0;t4 < this.lines.length; t4++)
                s3 += +this.lines.get(t4).resize(e3, i3);
            let n2 = 0;
            if (this._rows < t3)
              for (let s4 = this._rows;s4 < t3; s4++)
                this.lines.length < t3 + this.ybase && (this._optionsService.rawOptions.windowsMode || this._optionsService.rawOptions.windowsPty.backend !== undefined || this._optionsService.rawOptions.windowsPty.buildNumber !== undefined ? this.lines.push(new o.BufferLine(e3, i3)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + n2 + 1 ? (this.ybase--, n2++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new o.BufferLine(e3, i3)));
            else
              for (let e4 = this._rows;e4 > t3; e4--)
                this.lines.length > t3 + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
            if (r2 < this.lines.maxLength) {
              const e4 = this.lines.length - r2;
              e4 > 0 && (this.lines.trimStart(e4), this.ybase = Math.max(this.ybase - e4, 0), this.ydisp = Math.max(this.ydisp - e4, 0), this.savedY = Math.max(this.savedY - e4, 0)), this.lines.maxLength = r2;
            }
            this.x = Math.min(this.x, e3 - 1), this.y = Math.min(this.y, t3 - 1), n2 && (this.y += n2), this.savedX = Math.min(this.savedX, e3 - 1), this.scrollTop = 0;
          }
          if (this.scrollBottom = t3 - 1, this._isReflowEnabled && (this._reflow(e3, t3), this._cols > e3))
            for (let t4 = 0;t4 < this.lines.length; t4++)
              s3 += +this.lines.get(t4).resize(e3, i3);
          this._cols = e3, this._rows = t3, this._memoryCleanupQueue.clear(), s3 > 0.1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup()));
        }
        _batchedMemoryCleanup() {
          let e3 = true;
          this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, e3 = false);
          let t3 = 0;
          for (;this._memoryCleanupPosition < this.lines.length; )
            if (t3 += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), t3 > 100)
              return true;
          return e3;
        }
        get _isReflowEnabled() {
          const e3 = this._optionsService.rawOptions.windowsPty;
          return e3 && e3.buildNumber ? this._hasScrollback && e3.backend === "conpty" && e3.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
        }
        _reflow(e3, t3) {
          this._cols !== e3 && (e3 > this._cols ? this._reflowLarger(e3, t3) : this._reflowSmaller(e3, t3));
        }
        _reflowLarger(e3, t3) {
          const i3 = (0, a.reflowLargerGetLinesToRemove)(this.lines, this._cols, e3, this.ybase + this.y, this.getNullCell(o.DEFAULT_ATTR_DATA));
          if (i3.length > 0) {
            const s3 = (0, a.reflowLargerCreateNewLayout)(this.lines, i3);
            (0, a.reflowLargerApplyNewLayout)(this.lines, s3.layout), this._reflowLargerAdjustViewport(e3, t3, s3.countRemoved);
          }
        }
        _reflowLargerAdjustViewport(e3, t3, i3) {
          const s3 = this.getNullCell(o.DEFAULT_ATTR_DATA);
          let r2 = i3;
          for (;r2-- > 0; )
            this.ybase === 0 ? (this.y > 0 && this.y--, this.lines.length < t3 && this.lines.push(new o.BufferLine(e3, s3))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
          this.savedY = Math.max(this.savedY - i3, 0);
        }
        _reflowSmaller(e3, t3) {
          const i3 = this.getNullCell(o.DEFAULT_ATTR_DATA), s3 = [];
          let r2 = 0;
          for (let n2 = this.lines.length - 1;n2 >= 0; n2--) {
            let h2 = this.lines.get(n2);
            if (!h2 || !h2.isWrapped && h2.getTrimmedLength() <= e3)
              continue;
            const c2 = [h2];
            for (;h2.isWrapped && n2 > 0; )
              h2 = this.lines.get(--n2), c2.unshift(h2);
            const l2 = this.ybase + this.y;
            if (l2 >= n2 && l2 < n2 + c2.length)
              continue;
            const d2 = c2[c2.length - 1].getTrimmedLength(), _ = (0, a.reflowSmallerGetNewLineLengths)(c2, this._cols, e3), u = _.length - c2.length;
            let f;
            f = this.ybase === 0 && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + u) : Math.max(0, this.lines.length - this.lines.maxLength + u);
            const v = [];
            for (let e4 = 0;e4 < u; e4++) {
              const e5 = this.getBlankLine(o.DEFAULT_ATTR_DATA, true);
              v.push(e5);
            }
            v.length > 0 && (s3.push({ start: n2 + c2.length + r2, newLines: v }), r2 += v.length), c2.push(...v);
            let p = _.length - 1, g = _[p];
            g === 0 && (p--, g = _[p]);
            let m = c2.length - u - 1, S = d2;
            for (;m >= 0; ) {
              const e4 = Math.min(S, g);
              if (c2[p] === undefined)
                break;
              if (c2[p].copyCellsFrom(c2[m], S - e4, g - e4, e4, true), g -= e4, g === 0 && (p--, g = _[p]), S -= e4, S === 0) {
                m--;
                const e5 = Math.max(m, 0);
                S = (0, a.getWrappedLineTrimmedLength)(c2, e5, this._cols);
              }
            }
            for (let t4 = 0;t4 < c2.length; t4++)
              _[t4] < e3 && c2[t4].setCell(_[t4], i3);
            let C = u - f;
            for (;C-- > 0; )
              this.ybase === 0 ? this.y < t3 - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + r2) - t3 && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
            this.savedY = Math.min(this.savedY + u, this.ybase + t3 - 1);
          }
          if (s3.length > 0) {
            const e4 = [], t4 = [];
            for (let e5 = 0;e5 < this.lines.length; e5++)
              t4.push(this.lines.get(e5));
            const i4 = this.lines.length;
            let n2 = i4 - 1, o2 = 0, a2 = s3[o2];
            this.lines.length = Math.min(this.lines.maxLength, this.lines.length + r2);
            let h2 = 0;
            for (let c3 = Math.min(this.lines.maxLength - 1, i4 + r2 - 1);c3 >= 0; c3--)
              if (a2 && a2.start > n2 + h2) {
                for (let e5 = a2.newLines.length - 1;e5 >= 0; e5--)
                  this.lines.set(c3--, a2.newLines[e5]);
                c3++, e4.push({ index: n2 + 1, amount: a2.newLines.length }), h2 += a2.newLines.length, a2 = s3[++o2];
              } else
                this.lines.set(c3, t4[n2--]);
            let c2 = 0;
            for (let t5 = e4.length - 1;t5 >= 0; t5--)
              e4[t5].index += c2, this.lines.onInsertEmitter.fire(e4[t5]), c2 += e4[t5].amount;
            const l2 = Math.max(0, i4 + r2 - this.lines.maxLength);
            l2 > 0 && this.lines.onTrimEmitter.fire(l2);
          }
        }
        translateBufferLineToString(e3, t3, i3 = 0, s3) {
          const r2 = this.lines.get(e3);
          return r2 ? r2.translateToString(t3, i3, s3) : "";
        }
        getWrappedRangeForLine(e3) {
          let t3 = e3, i3 = e3;
          for (;t3 > 0 && this.lines.get(t3).isWrapped; )
            t3--;
          for (;i3 + 1 < this.lines.length && this.lines.get(i3 + 1).isWrapped; )
            i3++;
          return { first: t3, last: i3 };
        }
        setupTabStops(e3) {
          for (e3 != null ? this.tabs[e3] || (e3 = this.prevStop(e3)) : (this.tabs = {}, e3 = 0);e3 < this._cols; e3 += this._optionsService.rawOptions.tabStopWidth)
            this.tabs[e3] = true;
        }
        prevStop(e3) {
          for (e3 == null && (e3 = this.x);!this.tabs[--e3] && e3 > 0; )
            ;
          return e3 >= this._cols ? this._cols - 1 : e3 < 0 ? 0 : e3;
        }
        nextStop(e3) {
          for (e3 == null && (e3 = this.x);!this.tabs[++e3] && e3 < this._cols; )
            ;
          return e3 >= this._cols ? this._cols - 1 : e3 < 0 ? 0 : e3;
        }
        clearMarkers(e3) {
          this._isClearing = true;
          for (let t3 = 0;t3 < this.markers.length; t3++)
            this.markers[t3].line === e3 && (this.markers[t3].dispose(), this.markers.splice(t3--, 1));
          this._isClearing = false;
        }
        clearAllMarkers() {
          this._isClearing = true;
          for (let e3 = 0;e3 < this.markers.length; e3++)
            this.markers[e3].dispose(), this.markers.splice(e3--, 1);
          this._isClearing = false;
        }
        addMarker(e3) {
          const t3 = new l.Marker(e3);
          return this.markers.push(t3), t3.register(this.lines.onTrim((e4) => {
            t3.line -= e4, t3.line < 0 && t3.dispose();
          })), t3.register(this.lines.onInsert((e4) => {
            t3.line >= e4.index && (t3.line += e4.amount);
          })), t3.register(this.lines.onDelete((e4) => {
            t3.line >= e4.index && t3.line < e4.index + e4.amount && t3.dispose(), t3.line > e4.index && (t3.line -= e4.amount);
          })), t3.register(t3.onDispose(() => this._removeMarker(t3))), t3;
        }
        _removeMarker(e3) {
          this._isClearing || this.markers.splice(this.markers.indexOf(e3), 1);
        }
      };
    }, 8437: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferLine = t2.DEFAULT_ATTR_DATA = undefined;
      const s2 = i2(3734), r = i2(511), n = i2(643), o = i2(482);
      t2.DEFAULT_ATTR_DATA = Object.freeze(new s2.AttributeData);
      let a = 0;

      class h {
        constructor(e3, t3, i3 = false) {
          this.isWrapped = i3, this._combined = {}, this._extendedAttrs = {}, this._data = new Uint32Array(3 * e3);
          const s3 = t3 || r.CellData.fromCharData([0, n.NULL_CELL_CHAR, n.NULL_CELL_WIDTH, n.NULL_CELL_CODE]);
          for (let t4 = 0;t4 < e3; ++t4)
            this.setCell(t4, s3);
          this.length = e3;
        }
        get(e3) {
          const t3 = this._data[3 * e3 + 0], i3 = 2097151 & t3;
          return [this._data[3 * e3 + 1], 2097152 & t3 ? this._combined[e3] : i3 ? (0, o.stringFromCodePoint)(i3) : "", t3 >> 22, 2097152 & t3 ? this._combined[e3].charCodeAt(this._combined[e3].length - 1) : i3];
        }
        set(e3, t3) {
          this._data[3 * e3 + 1] = t3[n.CHAR_DATA_ATTR_INDEX], t3[n.CHAR_DATA_CHAR_INDEX].length > 1 ? (this._combined[e3] = t3[1], this._data[3 * e3 + 0] = 2097152 | e3 | t3[n.CHAR_DATA_WIDTH_INDEX] << 22) : this._data[3 * e3 + 0] = t3[n.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | t3[n.CHAR_DATA_WIDTH_INDEX] << 22;
        }
        getWidth(e3) {
          return this._data[3 * e3 + 0] >> 22;
        }
        hasWidth(e3) {
          return 12582912 & this._data[3 * e3 + 0];
        }
        getFg(e3) {
          return this._data[3 * e3 + 1];
        }
        getBg(e3) {
          return this._data[3 * e3 + 2];
        }
        hasContent(e3) {
          return 4194303 & this._data[3 * e3 + 0];
        }
        getCodePoint(e3) {
          const t3 = this._data[3 * e3 + 0];
          return 2097152 & t3 ? this._combined[e3].charCodeAt(this._combined[e3].length - 1) : 2097151 & t3;
        }
        isCombined(e3) {
          return 2097152 & this._data[3 * e3 + 0];
        }
        getString(e3) {
          const t3 = this._data[3 * e3 + 0];
          return 2097152 & t3 ? this._combined[e3] : 2097151 & t3 ? (0, o.stringFromCodePoint)(2097151 & t3) : "";
        }
        isProtected(e3) {
          return 536870912 & this._data[3 * e3 + 2];
        }
        loadCell(e3, t3) {
          return a = 3 * e3, t3.content = this._data[a + 0], t3.fg = this._data[a + 1], t3.bg = this._data[a + 2], 2097152 & t3.content && (t3.combinedData = this._combined[e3]), 268435456 & t3.bg && (t3.extended = this._extendedAttrs[e3]), t3;
        }
        setCell(e3, t3) {
          2097152 & t3.content && (this._combined[e3] = t3.combinedData), 268435456 & t3.bg && (this._extendedAttrs[e3] = t3.extended), this._data[3 * e3 + 0] = t3.content, this._data[3 * e3 + 1] = t3.fg, this._data[3 * e3 + 2] = t3.bg;
        }
        setCellFromCodePoint(e3, t3, i3, s3, r2, n2) {
          268435456 & r2 && (this._extendedAttrs[e3] = n2), this._data[3 * e3 + 0] = t3 | i3 << 22, this._data[3 * e3 + 1] = s3, this._data[3 * e3 + 2] = r2;
        }
        addCodepointToCell(e3, t3, i3) {
          let s3 = this._data[3 * e3 + 0];
          2097152 & s3 ? this._combined[e3] += (0, o.stringFromCodePoint)(t3) : 2097151 & s3 ? (this._combined[e3] = (0, o.stringFromCodePoint)(2097151 & s3) + (0, o.stringFromCodePoint)(t3), s3 &= -2097152, s3 |= 2097152) : s3 = t3 | 1 << 22, i3 && (s3 &= -12582913, s3 |= i3 << 22), this._data[3 * e3 + 0] = s3;
        }
        insertCells(e3, t3, i3, n2) {
          if ((e3 %= this.length) && this.getWidth(e3 - 1) === 2 && this.setCellFromCodePoint(e3 - 1, 0, 1, n2?.fg || 0, n2?.bg || 0, n2?.extended || new s2.ExtendedAttrs), t3 < this.length - e3) {
            const s3 = new r.CellData;
            for (let i4 = this.length - e3 - t3 - 1;i4 >= 0; --i4)
              this.setCell(e3 + t3 + i4, this.loadCell(e3 + i4, s3));
            for (let s4 = 0;s4 < t3; ++s4)
              this.setCell(e3 + s4, i3);
          } else
            for (let t4 = e3;t4 < this.length; ++t4)
              this.setCell(t4, i3);
          this.getWidth(this.length - 1) === 2 && this.setCellFromCodePoint(this.length - 1, 0, 1, n2?.fg || 0, n2?.bg || 0, n2?.extended || new s2.ExtendedAttrs);
        }
        deleteCells(e3, t3, i3, n2) {
          if (e3 %= this.length, t3 < this.length - e3) {
            const s3 = new r.CellData;
            for (let i4 = 0;i4 < this.length - e3 - t3; ++i4)
              this.setCell(e3 + i4, this.loadCell(e3 + t3 + i4, s3));
            for (let e4 = this.length - t3;e4 < this.length; ++e4)
              this.setCell(e4, i3);
          } else
            for (let t4 = e3;t4 < this.length; ++t4)
              this.setCell(t4, i3);
          e3 && this.getWidth(e3 - 1) === 2 && this.setCellFromCodePoint(e3 - 1, 0, 1, n2?.fg || 0, n2?.bg || 0, n2?.extended || new s2.ExtendedAttrs), this.getWidth(e3) !== 0 || this.hasContent(e3) || this.setCellFromCodePoint(e3, 0, 1, n2?.fg || 0, n2?.bg || 0, n2?.extended || new s2.ExtendedAttrs);
        }
        replaceCells(e3, t3, i3, r2, n2 = false) {
          if (n2)
            for (e3 && this.getWidth(e3 - 1) === 2 && !this.isProtected(e3 - 1) && this.setCellFromCodePoint(e3 - 1, 0, 1, r2?.fg || 0, r2?.bg || 0, r2?.extended || new s2.ExtendedAttrs), t3 < this.length && this.getWidth(t3 - 1) === 2 && !this.isProtected(t3) && this.setCellFromCodePoint(t3, 0, 1, r2?.fg || 0, r2?.bg || 0, r2?.extended || new s2.ExtendedAttrs);e3 < t3 && e3 < this.length; )
              this.isProtected(e3) || this.setCell(e3, i3), e3++;
          else
            for (e3 && this.getWidth(e3 - 1) === 2 && this.setCellFromCodePoint(e3 - 1, 0, 1, r2?.fg || 0, r2?.bg || 0, r2?.extended || new s2.ExtendedAttrs), t3 < this.length && this.getWidth(t3 - 1) === 2 && this.setCellFromCodePoint(t3, 0, 1, r2?.fg || 0, r2?.bg || 0, r2?.extended || new s2.ExtendedAttrs);e3 < t3 && e3 < this.length; )
              this.setCell(e3++, i3);
        }
        resize(e3, t3) {
          if (e3 === this.length)
            return 4 * this._data.length * 2 < this._data.buffer.byteLength;
          const i3 = 3 * e3;
          if (e3 > this.length) {
            if (this._data.buffer.byteLength >= 4 * i3)
              this._data = new Uint32Array(this._data.buffer, 0, i3);
            else {
              const e4 = new Uint32Array(i3);
              e4.set(this._data), this._data = e4;
            }
            for (let i4 = this.length;i4 < e3; ++i4)
              this.setCell(i4, t3);
          } else {
            this._data = this._data.subarray(0, i3);
            const t4 = Object.keys(this._combined);
            for (let i4 = 0;i4 < t4.length; i4++) {
              const s4 = parseInt(t4[i4], 10);
              s4 >= e3 && delete this._combined[s4];
            }
            const s3 = Object.keys(this._extendedAttrs);
            for (let t5 = 0;t5 < s3.length; t5++) {
              const i4 = parseInt(s3[t5], 10);
              i4 >= e3 && delete this._extendedAttrs[i4];
            }
          }
          return this.length = e3, 4 * i3 * 2 < this._data.buffer.byteLength;
        }
        cleanupMemory() {
          if (4 * this._data.length * 2 < this._data.buffer.byteLength) {
            const e3 = new Uint32Array(this._data.length);
            return e3.set(this._data), this._data = e3, 1;
          }
          return 0;
        }
        fill(e3, t3 = false) {
          if (t3)
            for (let t4 = 0;t4 < this.length; ++t4)
              this.isProtected(t4) || this.setCell(t4, e3);
          else {
            this._combined = {}, this._extendedAttrs = {};
            for (let t4 = 0;t4 < this.length; ++t4)
              this.setCell(t4, e3);
          }
        }
        copyFrom(e3) {
          this.length !== e3.length ? this._data = new Uint32Array(e3._data) : this._data.set(e3._data), this.length = e3.length, this._combined = {};
          for (const t3 in e3._combined)
            this._combined[t3] = e3._combined[t3];
          this._extendedAttrs = {};
          for (const t3 in e3._extendedAttrs)
            this._extendedAttrs[t3] = e3._extendedAttrs[t3];
          this.isWrapped = e3.isWrapped;
        }
        clone() {
          const e3 = new h(0);
          e3._data = new Uint32Array(this._data), e3.length = this.length;
          for (const t3 in this._combined)
            e3._combined[t3] = this._combined[t3];
          for (const t3 in this._extendedAttrs)
            e3._extendedAttrs[t3] = this._extendedAttrs[t3];
          return e3.isWrapped = this.isWrapped, e3;
        }
        getTrimmedLength() {
          for (let e3 = this.length - 1;e3 >= 0; --e3)
            if (4194303 & this._data[3 * e3 + 0])
              return e3 + (this._data[3 * e3 + 0] >> 22);
          return 0;
        }
        getNoBgTrimmedLength() {
          for (let e3 = this.length - 1;e3 >= 0; --e3)
            if (4194303 & this._data[3 * e3 + 0] || 50331648 & this._data[3 * e3 + 2])
              return e3 + (this._data[3 * e3 + 0] >> 22);
          return 0;
        }
        copyCellsFrom(e3, t3, i3, s3, r2) {
          const n2 = e3._data;
          if (r2)
            for (let r3 = s3 - 1;r3 >= 0; r3--) {
              for (let e4 = 0;e4 < 3; e4++)
                this._data[3 * (i3 + r3) + e4] = n2[3 * (t3 + r3) + e4];
              268435456 & n2[3 * (t3 + r3) + 2] && (this._extendedAttrs[i3 + r3] = e3._extendedAttrs[t3 + r3]);
            }
          else
            for (let r3 = 0;r3 < s3; r3++) {
              for (let e4 = 0;e4 < 3; e4++)
                this._data[3 * (i3 + r3) + e4] = n2[3 * (t3 + r3) + e4];
              268435456 & n2[3 * (t3 + r3) + 2] && (this._extendedAttrs[i3 + r3] = e3._extendedAttrs[t3 + r3]);
            }
          const o2 = Object.keys(e3._combined);
          for (let s4 = 0;s4 < o2.length; s4++) {
            const r3 = parseInt(o2[s4], 10);
            r3 >= t3 && (this._combined[r3 - t3 + i3] = e3._combined[r3]);
          }
        }
        translateToString(e3 = false, t3 = 0, i3 = this.length) {
          e3 && (i3 = Math.min(i3, this.getTrimmedLength()));
          let s3 = "";
          for (;t3 < i3; ) {
            const e4 = this._data[3 * t3 + 0], i4 = 2097151 & e4;
            s3 += 2097152 & e4 ? this._combined[t3] : i4 ? (0, o.stringFromCodePoint)(i4) : n.WHITESPACE_CELL_CHAR, t3 += e4 >> 22 || 1;
          }
          return s3;
        }
      }
      t2.BufferLine = h;
    }, 4841: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.getRangeLength = undefined, t2.getRangeLength = function(e3, t3) {
        if (e3.start.y > e3.end.y)
          throw new Error(`Buffer range end (${e3.end.x}, ${e3.end.y}) cannot be before start (${e3.start.x}, ${e3.start.y})`);
        return t3 * (e3.end.y - e3.start.y) + (e3.end.x - e3.start.x + 1);
      };
    }, 4634: (e2, t2) => {
      function i2(e3, t3, i3) {
        if (t3 === e3.length - 1)
          return e3[t3].getTrimmedLength();
        const s2 = !e3[t3].hasContent(i3 - 1) && e3[t3].getWidth(i3 - 1) === 1, r = e3[t3 + 1].getWidth(0) === 2;
        return s2 && r ? i3 - 1 : i3;
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.getWrappedLineTrimmedLength = t2.reflowSmallerGetNewLineLengths = t2.reflowLargerApplyNewLayout = t2.reflowLargerCreateNewLayout = t2.reflowLargerGetLinesToRemove = undefined, t2.reflowLargerGetLinesToRemove = function(e3, t3, s2, r, n) {
        const o = [];
        for (let a = 0;a < e3.length - 1; a++) {
          let h = a, c = e3.get(++h);
          if (!c.isWrapped)
            continue;
          const l = [e3.get(a)];
          for (;h < e3.length && c.isWrapped; )
            l.push(c), c = e3.get(++h);
          if (r >= a && r < h) {
            a += l.length - 1;
            continue;
          }
          let d = 0, _ = i2(l, d, t3), u = 1, f = 0;
          for (;u < l.length; ) {
            const e4 = i2(l, u, t3), r2 = e4 - f, o2 = s2 - _, a2 = Math.min(r2, o2);
            l[d].copyCellsFrom(l[u], f, _, a2, false), _ += a2, _ === s2 && (d++, _ = 0), f += a2, f === e4 && (u++, f = 0), _ === 0 && d !== 0 && l[d - 1].getWidth(s2 - 1) === 2 && (l[d].copyCellsFrom(l[d - 1], s2 - 1, _++, 1, false), l[d - 1].setCell(s2 - 1, n));
          }
          l[d].replaceCells(_, s2, n);
          let v = 0;
          for (let e4 = l.length - 1;e4 > 0 && (e4 > d || l[e4].getTrimmedLength() === 0); e4--)
            v++;
          v > 0 && (o.push(a + l.length - v), o.push(v)), a += l.length - 1;
        }
        return o;
      }, t2.reflowLargerCreateNewLayout = function(e3, t3) {
        const i3 = [];
        let s2 = 0, r = t3[s2], n = 0;
        for (let o = 0;o < e3.length; o++)
          if (r === o) {
            const i4 = t3[++s2];
            e3.onDeleteEmitter.fire({ index: o - n, amount: i4 }), o += i4 - 1, n += i4, r = t3[++s2];
          } else
            i3.push(o);
        return { layout: i3, countRemoved: n };
      }, t2.reflowLargerApplyNewLayout = function(e3, t3) {
        const i3 = [];
        for (let s2 = 0;s2 < t3.length; s2++)
          i3.push(e3.get(t3[s2]));
        for (let t4 = 0;t4 < i3.length; t4++)
          e3.set(t4, i3[t4]);
        e3.length = t3.length;
      }, t2.reflowSmallerGetNewLineLengths = function(e3, t3, s2) {
        const r = [], n = e3.map((s3, r2) => i2(e3, r2, t3)).reduce((e4, t4) => e4 + t4);
        let o = 0, a = 0, h = 0;
        for (;h < n; ) {
          if (n - h < s2) {
            r.push(n - h);
            break;
          }
          o += s2;
          const c = i2(e3, a, t3);
          o > c && (o -= c, a++);
          const l = e3[a].getWidth(o - 1) === 2;
          l && o--;
          const d = l ? s2 - 1 : s2;
          r.push(d), h += d;
        }
        return r;
      }, t2.getWrappedLineTrimmedLength = i2;
    }, 5295: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferSet = undefined;
      const s2 = i2(8460), r = i2(844), n = i2(9092);

      class o extends r.Disposable {
        constructor(e3, t3) {
          super(), this._optionsService = e3, this._bufferService = t3, this._onBufferActivate = this.register(new s2.EventEmitter), this.onBufferActivate = this._onBufferActivate.event, this.reset(), this.register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows))), this.register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
        }
        reset() {
          this._normal = new n.Buffer(true, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new n.Buffer(false, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
        }
        get alt() {
          return this._alt;
        }
        get active() {
          return this._activeBuffer;
        }
        get normal() {
          return this._normal;
        }
        activateNormalBuffer() {
          this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
        }
        activateAltBuffer(e3) {
          this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e3), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
        }
        resize(e3, t3) {
          this._normal.resize(e3, t3), this._alt.resize(e3, t3), this.setupTabStops(e3);
        }
        setupTabStops(e3) {
          this._normal.setupTabStops(e3), this._alt.setupTabStops(e3);
        }
      }
      t2.BufferSet = o;
    }, 511: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.CellData = undefined;
      const s2 = i2(482), r = i2(643), n = i2(3734);

      class o extends n.AttributeData {
        constructor() {
          super(...arguments), this.content = 0, this.fg = 0, this.bg = 0, this.extended = new n.ExtendedAttrs, this.combinedData = "";
        }
        static fromCharData(e3) {
          const t3 = new o;
          return t3.setFromCharData(e3), t3;
        }
        isCombined() {
          return 2097152 & this.content;
        }
        getWidth() {
          return this.content >> 22;
        }
        getChars() {
          return 2097152 & this.content ? this.combinedData : 2097151 & this.content ? (0, s2.stringFromCodePoint)(2097151 & this.content) : "";
        }
        getCode() {
          return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : 2097151 & this.content;
        }
        setFromCharData(e3) {
          this.fg = e3[r.CHAR_DATA_ATTR_INDEX], this.bg = 0;
          let t3 = false;
          if (e3[r.CHAR_DATA_CHAR_INDEX].length > 2)
            t3 = true;
          else if (e3[r.CHAR_DATA_CHAR_INDEX].length === 2) {
            const i3 = e3[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
            if (55296 <= i3 && i3 <= 56319) {
              const s3 = e3[r.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
              56320 <= s3 && s3 <= 57343 ? this.content = 1024 * (i3 - 55296) + s3 - 56320 + 65536 | e3[r.CHAR_DATA_WIDTH_INDEX] << 22 : t3 = true;
            } else
              t3 = true;
          } else
            this.content = e3[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | e3[r.CHAR_DATA_WIDTH_INDEX] << 22;
          t3 && (this.combinedData = e3[r.CHAR_DATA_CHAR_INDEX], this.content = 2097152 | e3[r.CHAR_DATA_WIDTH_INDEX] << 22);
        }
        getAsCharData() {
          return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
        }
      }
      t2.CellData = o;
    }, 643: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.WHITESPACE_CELL_CODE = t2.WHITESPACE_CELL_WIDTH = t2.WHITESPACE_CELL_CHAR = t2.NULL_CELL_CODE = t2.NULL_CELL_WIDTH = t2.NULL_CELL_CHAR = t2.CHAR_DATA_CODE_INDEX = t2.CHAR_DATA_WIDTH_INDEX = t2.CHAR_DATA_CHAR_INDEX = t2.CHAR_DATA_ATTR_INDEX = t2.DEFAULT_EXT = t2.DEFAULT_ATTR = t2.DEFAULT_COLOR = undefined, t2.DEFAULT_COLOR = 0, t2.DEFAULT_ATTR = 256 | t2.DEFAULT_COLOR << 9, t2.DEFAULT_EXT = 0, t2.CHAR_DATA_ATTR_INDEX = 0, t2.CHAR_DATA_CHAR_INDEX = 1, t2.CHAR_DATA_WIDTH_INDEX = 2, t2.CHAR_DATA_CODE_INDEX = 3, t2.NULL_CELL_CHAR = "", t2.NULL_CELL_WIDTH = 1, t2.NULL_CELL_CODE = 0, t2.WHITESPACE_CELL_CHAR = " ", t2.WHITESPACE_CELL_WIDTH = 1, t2.WHITESPACE_CELL_CODE = 32;
    }, 4863: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.Marker = undefined;
      const s2 = i2(8460), r = i2(844);

      class n {
        get id() {
          return this._id;
        }
        constructor(e3) {
          this.line = e3, this.isDisposed = false, this._disposables = [], this._id = n._nextId++, this._onDispose = this.register(new s2.EventEmitter), this.onDispose = this._onDispose.event;
        }
        dispose() {
          this.isDisposed || (this.isDisposed = true, this.line = -1, this._onDispose.fire(), (0, r.disposeArray)(this._disposables), this._disposables.length = 0);
        }
        register(e3) {
          return this._disposables.push(e3), e3;
        }
      }
      t2.Marker = n, n._nextId = 1;
    }, 7116: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.DEFAULT_CHARSET = t2.CHARSETS = undefined, t2.CHARSETS = {}, t2.DEFAULT_CHARSET = t2.CHARSETS.B, t2.CHARSETS[0] = { "`": "\u25C6", a: "\u2592", b: "\u2409", c: "\u240C", d: "\u240D", e: "\u240A", f: "\xB0", g: "\xB1", h: "\u2424", i: "\u240B", j: "\u2518", k: "\u2510", l: "\u250C", m: "\u2514", n: "\u253C", o: "\u23BA", p: "\u23BB", q: "\u2500", r: "\u23BC", s: "\u23BD", t: "\u251C", u: "\u2524", v: "\u2534", w: "\u252C", x: "\u2502", y: "\u2264", z: "\u2265", "{": "\u03C0", "|": "\u2260", "}": "\xA3", "~": "\xB7" }, t2.CHARSETS.A = { "#": "\xA3" }, t2.CHARSETS.B = undefined, t2.CHARSETS[4] = { "#": "\xA3", "@": "\xBE", "[": "ij", "\\": "\xBD", "]": "|", "{": "\xA8", "|": "f", "}": "\xBC", "~": "\xB4" }, t2.CHARSETS.C = t2.CHARSETS[5] = { "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" }, t2.CHARSETS.R = { "#": "\xA3", "@": "\xE0", "[": "\xB0", "\\": "\xE7", "]": "\xA7", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xA8" }, t2.CHARSETS.Q = { "@": "\xE0", "[": "\xE2", "\\": "\xE7", "]": "\xEA", "^": "\xEE", "`": "\xF4", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xFB" }, t2.CHARSETS.K = { "@": "\xA7", "[": "\xC4", "\\": "\xD6", "]": "\xDC", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xDF" }, t2.CHARSETS.Y = { "#": "\xA3", "@": "\xA7", "[": "\xB0", "\\": "\xE7", "]": "\xE9", "`": "\xF9", "{": "\xE0", "|": "\xF2", "}": "\xE8", "~": "\xEC" }, t2.CHARSETS.E = t2.CHARSETS[6] = { "@": "\xC4", "[": "\xC6", "\\": "\xD8", "]": "\xC5", "^": "\xDC", "`": "\xE4", "{": "\xE6", "|": "\xF8", "}": "\xE5", "~": "\xFC" }, t2.CHARSETS.Z = { "#": "\xA3", "@": "\xA7", "[": "\xA1", "\\": "\xD1", "]": "\xBF", "{": "\xB0", "|": "\xF1", "}": "\xE7" }, t2.CHARSETS.H = t2.CHARSETS[7] = { "@": "\xC9", "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" }, t2.CHARSETS["="] = { "#": "\xF9", "@": "\xE0", "[": "\xE9", "\\": "\xE7", "]": "\xEA", "^": "\xEE", _: "\xE8", "`": "\xF4", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xFB" };
    }, 2584: (e2, t2) => {
      var i2, s2, r;
      Object.defineProperty(t2, "__esModule", { value: true }), t2.C1_ESCAPED = t2.C1 = t2.C0 = undefined, function(e3) {
        e3.NUL = "\0", e3.SOH = "", e3.STX = "", e3.ETX = "", e3.EOT = "", e3.ENQ = "", e3.ACK = "", e3.BEL = "", e3.BS = "\b", e3.HT = "\t", e3.LF = "\n", e3.VT = "\v", e3.FF = "\f", e3.CR = "\r", e3.SO = "", e3.SI = "", e3.DLE = "", e3.DC1 = "", e3.DC2 = "", e3.DC3 = "", e3.DC4 = "", e3.NAK = "", e3.SYN = "", e3.ETB = "", e3.CAN = "", e3.EM = "", e3.SUB = "", e3.ESC = "", e3.FS = "", e3.GS = "", e3.RS = "", e3.US = "", e3.SP = " ", e3.DEL = "";
      }(i2 || (t2.C0 = i2 = {})), function(e3) {
        e3.PAD = "\x80", e3.HOP = "\x81", e3.BPH = "\x82", e3.NBH = "\x83", e3.IND = "\x84", e3.NEL = "\x85", e3.SSA = "\x86", e3.ESA = "\x87", e3.HTS = "\x88", e3.HTJ = "\x89", e3.VTS = "\x8A", e3.PLD = "\x8B", e3.PLU = "\x8C", e3.RI = "\x8D", e3.SS2 = "\x8E", e3.SS3 = "\x8F", e3.DCS = "\x90", e3.PU1 = "\x91", e3.PU2 = "\x92", e3.STS = "\x93", e3.CCH = "\x94", e3.MW = "\x95", e3.SPA = "\x96", e3.EPA = "\x97", e3.SOS = "\x98", e3.SGCI = "\x99", e3.SCI = "\x9A", e3.CSI = "\x9B", e3.ST = "\x9C", e3.OSC = "\x9D", e3.PM = "\x9E", e3.APC = "\x9F";
      }(s2 || (t2.C1 = s2 = {})), function(e3) {
        e3.ST = `${i2.ESC}\\`;
      }(r || (t2.C1_ESCAPED = r = {}));
    }, 7399: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.evaluateKeyboardEvent = undefined;
      const s2 = i2(2584), r = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
      t2.evaluateKeyboardEvent = function(e3, t3, i3, n) {
        const o = { type: 0, cancel: false, key: undefined }, a = (e3.shiftKey ? 1 : 0) | (e3.altKey ? 2 : 0) | (e3.ctrlKey ? 4 : 0) | (e3.metaKey ? 8 : 0);
        switch (e3.keyCode) {
          case 0:
            e3.key === "UIKeyInputUpArrow" ? o.key = t3 ? s2.C0.ESC + "OA" : s2.C0.ESC + "[A" : e3.key === "UIKeyInputLeftArrow" ? o.key = t3 ? s2.C0.ESC + "OD" : s2.C0.ESC + "[D" : e3.key === "UIKeyInputRightArrow" ? o.key = t3 ? s2.C0.ESC + "OC" : s2.C0.ESC + "[C" : e3.key === "UIKeyInputDownArrow" && (o.key = t3 ? s2.C0.ESC + "OB" : s2.C0.ESC + "[B");
            break;
          case 8:
            if (e3.altKey) {
              o.key = s2.C0.ESC + s2.C0.DEL;
              break;
            }
            o.key = s2.C0.DEL;
            break;
          case 9:
            if (e3.shiftKey) {
              o.key = s2.C0.ESC + "[Z";
              break;
            }
            o.key = s2.C0.HT, o.cancel = true;
            break;
          case 13:
            o.key = e3.altKey ? s2.C0.ESC + s2.C0.CR : s2.C0.CR, o.cancel = true;
            break;
          case 27:
            o.key = s2.C0.ESC, e3.altKey && (o.key = s2.C0.ESC + s2.C0.ESC), o.cancel = true;
            break;
          case 37:
            if (e3.metaKey)
              break;
            a ? (o.key = s2.C0.ESC + "[1;" + (a + 1) + "D", o.key === s2.C0.ESC + "[1;3D" && (o.key = s2.C0.ESC + (i3 ? "b" : "[1;5D"))) : o.key = t3 ? s2.C0.ESC + "OD" : s2.C0.ESC + "[D";
            break;
          case 39:
            if (e3.metaKey)
              break;
            a ? (o.key = s2.C0.ESC + "[1;" + (a + 1) + "C", o.key === s2.C0.ESC + "[1;3C" && (o.key = s2.C0.ESC + (i3 ? "f" : "[1;5C"))) : o.key = t3 ? s2.C0.ESC + "OC" : s2.C0.ESC + "[C";
            break;
          case 38:
            if (e3.metaKey)
              break;
            a ? (o.key = s2.C0.ESC + "[1;" + (a + 1) + "A", i3 || o.key !== s2.C0.ESC + "[1;3A" || (o.key = s2.C0.ESC + "[1;5A")) : o.key = t3 ? s2.C0.ESC + "OA" : s2.C0.ESC + "[A";
            break;
          case 40:
            if (e3.metaKey)
              break;
            a ? (o.key = s2.C0.ESC + "[1;" + (a + 1) + "B", i3 || o.key !== s2.C0.ESC + "[1;3B" || (o.key = s2.C0.ESC + "[1;5B")) : o.key = t3 ? s2.C0.ESC + "OB" : s2.C0.ESC + "[B";
            break;
          case 45:
            e3.shiftKey || e3.ctrlKey || (o.key = s2.C0.ESC + "[2~");
            break;
          case 46:
            o.key = a ? s2.C0.ESC + "[3;" + (a + 1) + "~" : s2.C0.ESC + "[3~";
            break;
          case 36:
            o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "H" : t3 ? s2.C0.ESC + "OH" : s2.C0.ESC + "[H";
            break;
          case 35:
            o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "F" : t3 ? s2.C0.ESC + "OF" : s2.C0.ESC + "[F";
            break;
          case 33:
            e3.shiftKey ? o.type = 2 : e3.ctrlKey ? o.key = s2.C0.ESC + "[5;" + (a + 1) + "~" : o.key = s2.C0.ESC + "[5~";
            break;
          case 34:
            e3.shiftKey ? o.type = 3 : e3.ctrlKey ? o.key = s2.C0.ESC + "[6;" + (a + 1) + "~" : o.key = s2.C0.ESC + "[6~";
            break;
          case 112:
            o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "P" : s2.C0.ESC + "OP";
            break;
          case 113:
            o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "Q" : s2.C0.ESC + "OQ";
            break;
          case 114:
            o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "R" : s2.C0.ESC + "OR";
            break;
          case 115:
            o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "S" : s2.C0.ESC + "OS";
            break;
          case 116:
            o.key = a ? s2.C0.ESC + "[15;" + (a + 1) + "~" : s2.C0.ESC + "[15~";
            break;
          case 117:
            o.key = a ? s2.C0.ESC + "[17;" + (a + 1) + "~" : s2.C0.ESC + "[17~";
            break;
          case 118:
            o.key = a ? s2.C0.ESC + "[18;" + (a + 1) + "~" : s2.C0.ESC + "[18~";
            break;
          case 119:
            o.key = a ? s2.C0.ESC + "[19;" + (a + 1) + "~" : s2.C0.ESC + "[19~";
            break;
          case 120:
            o.key = a ? s2.C0.ESC + "[20;" + (a + 1) + "~" : s2.C0.ESC + "[20~";
            break;
          case 121:
            o.key = a ? s2.C0.ESC + "[21;" + (a + 1) + "~" : s2.C0.ESC + "[21~";
            break;
          case 122:
            o.key = a ? s2.C0.ESC + "[23;" + (a + 1) + "~" : s2.C0.ESC + "[23~";
            break;
          case 123:
            o.key = a ? s2.C0.ESC + "[24;" + (a + 1) + "~" : s2.C0.ESC + "[24~";
            break;
          default:
            if (!e3.ctrlKey || e3.shiftKey || e3.altKey || e3.metaKey)
              if (i3 && !n || !e3.altKey || e3.metaKey)
                !i3 || e3.altKey || e3.ctrlKey || e3.shiftKey || !e3.metaKey ? e3.key && !e3.ctrlKey && !e3.altKey && !e3.metaKey && e3.keyCode >= 48 && e3.key.length === 1 ? o.key = e3.key : e3.key && e3.ctrlKey && (e3.key === "_" && (o.key = s2.C0.US), e3.key === "@" && (o.key = s2.C0.NUL)) : e3.keyCode === 65 && (o.type = 1);
              else {
                const t4 = r[e3.keyCode], i4 = t4?.[e3.shiftKey ? 1 : 0];
                if (i4)
                  o.key = s2.C0.ESC + i4;
                else if (e3.keyCode >= 65 && e3.keyCode <= 90) {
                  const t5 = e3.ctrlKey ? e3.keyCode - 64 : e3.keyCode + 32;
                  let i5 = String.fromCharCode(t5);
                  e3.shiftKey && (i5 = i5.toUpperCase()), o.key = s2.C0.ESC + i5;
                } else if (e3.keyCode === 32)
                  o.key = s2.C0.ESC + (e3.ctrlKey ? s2.C0.NUL : " ");
                else if (e3.key === "Dead" && e3.code.startsWith("Key")) {
                  let t5 = e3.code.slice(3, 4);
                  e3.shiftKey || (t5 = t5.toLowerCase()), o.key = s2.C0.ESC + t5, o.cancel = true;
                }
              }
            else
              e3.keyCode >= 65 && e3.keyCode <= 90 ? o.key = String.fromCharCode(e3.keyCode - 64) : e3.keyCode === 32 ? o.key = s2.C0.NUL : e3.keyCode >= 51 && e3.keyCode <= 55 ? o.key = String.fromCharCode(e3.keyCode - 51 + 27) : e3.keyCode === 56 ? o.key = s2.C0.DEL : e3.keyCode === 219 ? o.key = s2.C0.ESC : e3.keyCode === 220 ? o.key = s2.C0.FS : e3.keyCode === 221 && (o.key = s2.C0.GS);
        }
        return o;
      };
    }, 482: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.Utf8ToUtf32 = t2.StringToUtf32 = t2.utf32ToString = t2.stringFromCodePoint = undefined, t2.stringFromCodePoint = function(e3) {
        return e3 > 65535 ? (e3 -= 65536, String.fromCharCode(55296 + (e3 >> 10)) + String.fromCharCode(e3 % 1024 + 56320)) : String.fromCharCode(e3);
      }, t2.utf32ToString = function(e3, t3 = 0, i2 = e3.length) {
        let s2 = "";
        for (let r = t3;r < i2; ++r) {
          let t4 = e3[r];
          t4 > 65535 ? (t4 -= 65536, s2 += String.fromCharCode(55296 + (t4 >> 10)) + String.fromCharCode(t4 % 1024 + 56320)) : s2 += String.fromCharCode(t4);
        }
        return s2;
      }, t2.StringToUtf32 = class {
        constructor() {
          this._interim = 0;
        }
        clear() {
          this._interim = 0;
        }
        decode(e3, t3) {
          const i2 = e3.length;
          if (!i2)
            return 0;
          let s2 = 0, r = 0;
          if (this._interim) {
            const i3 = e3.charCodeAt(r++);
            56320 <= i3 && i3 <= 57343 ? t3[s2++] = 1024 * (this._interim - 55296) + i3 - 56320 + 65536 : (t3[s2++] = this._interim, t3[s2++] = i3), this._interim = 0;
          }
          for (let n = r;n < i2; ++n) {
            const r2 = e3.charCodeAt(n);
            if (55296 <= r2 && r2 <= 56319) {
              if (++n >= i2)
                return this._interim = r2, s2;
              const o = e3.charCodeAt(n);
              56320 <= o && o <= 57343 ? t3[s2++] = 1024 * (r2 - 55296) + o - 56320 + 65536 : (t3[s2++] = r2, t3[s2++] = o);
            } else
              r2 !== 65279 && (t3[s2++] = r2);
          }
          return s2;
        }
      }, t2.Utf8ToUtf32 = class {
        constructor() {
          this.interim = new Uint8Array(3);
        }
        clear() {
          this.interim.fill(0);
        }
        decode(e3, t3) {
          const i2 = e3.length;
          if (!i2)
            return 0;
          let s2, r, n, o, a = 0, h = 0, c = 0;
          if (this.interim[0]) {
            let s3 = false, r2 = this.interim[0];
            r2 &= (224 & r2) == 192 ? 31 : (240 & r2) == 224 ? 15 : 7;
            let n2, o2 = 0;
            for (;(n2 = 63 & this.interim[++o2]) && o2 < 4; )
              r2 <<= 6, r2 |= n2;
            const h2 = (224 & this.interim[0]) == 192 ? 2 : (240 & this.interim[0]) == 224 ? 3 : 4, l2 = h2 - o2;
            for (;c < l2; ) {
              if (c >= i2)
                return 0;
              if (n2 = e3[c++], (192 & n2) != 128) {
                c--, s3 = true;
                break;
              }
              this.interim[o2++] = n2, r2 <<= 6, r2 |= 63 & n2;
            }
            s3 || (h2 === 2 ? r2 < 128 ? c-- : t3[a++] = r2 : h2 === 3 ? r2 < 2048 || r2 >= 55296 && r2 <= 57343 || r2 === 65279 || (t3[a++] = r2) : r2 < 65536 || r2 > 1114111 || (t3[a++] = r2)), this.interim.fill(0);
          }
          const l = i2 - 4;
          let d = c;
          for (;d < i2; ) {
            for (;!(!(d < l) || 128 & (s2 = e3[d]) || 128 & (r = e3[d + 1]) || 128 & (n = e3[d + 2]) || 128 & (o = e3[d + 3])); )
              t3[a++] = s2, t3[a++] = r, t3[a++] = n, t3[a++] = o, d += 4;
            if (s2 = e3[d++], s2 < 128)
              t3[a++] = s2;
            else if ((224 & s2) == 192) {
              if (d >= i2)
                return this.interim[0] = s2, a;
              if (r = e3[d++], (192 & r) != 128) {
                d--;
                continue;
              }
              if (h = (31 & s2) << 6 | 63 & r, h < 128) {
                d--;
                continue;
              }
              t3[a++] = h;
            } else if ((240 & s2) == 224) {
              if (d >= i2)
                return this.interim[0] = s2, a;
              if (r = e3[d++], (192 & r) != 128) {
                d--;
                continue;
              }
              if (d >= i2)
                return this.interim[0] = s2, this.interim[1] = r, a;
              if (n = e3[d++], (192 & n) != 128) {
                d--;
                continue;
              }
              if (h = (15 & s2) << 12 | (63 & r) << 6 | 63 & n, h < 2048 || h >= 55296 && h <= 57343 || h === 65279)
                continue;
              t3[a++] = h;
            } else if ((248 & s2) == 240) {
              if (d >= i2)
                return this.interim[0] = s2, a;
              if (r = e3[d++], (192 & r) != 128) {
                d--;
                continue;
              }
              if (d >= i2)
                return this.interim[0] = s2, this.interim[1] = r, a;
              if (n = e3[d++], (192 & n) != 128) {
                d--;
                continue;
              }
              if (d >= i2)
                return this.interim[0] = s2, this.interim[1] = r, this.interim[2] = n, a;
              if (o = e3[d++], (192 & o) != 128) {
                d--;
                continue;
              }
              if (h = (7 & s2) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & o, h < 65536 || h > 1114111)
                continue;
              t3[a++] = h;
            }
          }
          return a;
        }
      };
    }, 225: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.UnicodeV6 = undefined;
      const s2 = i2(1480), r = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]], n = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
      let o;
      t2.UnicodeV6 = class {
        constructor() {
          if (this.version = "6", !o) {
            o = new Uint8Array(65536), o.fill(1), o[0] = 0, o.fill(0, 1, 32), o.fill(0, 127, 160), o.fill(2, 4352, 4448), o[9001] = 2, o[9002] = 2, o.fill(2, 11904, 42192), o[12351] = 1, o.fill(2, 44032, 55204), o.fill(2, 63744, 64256), o.fill(2, 65040, 65050), o.fill(2, 65072, 65136), o.fill(2, 65280, 65377), o.fill(2, 65504, 65511);
            for (let e3 = 0;e3 < r.length; ++e3)
              o.fill(0, r[e3][0], r[e3][1] + 1);
          }
        }
        wcwidth(e3) {
          return e3 < 32 ? 0 : e3 < 127 ? 1 : e3 < 65536 ? o[e3] : function(e4, t3) {
            let i3, s3 = 0, r2 = t3.length - 1;
            if (e4 < t3[0][0] || e4 > t3[r2][1])
              return false;
            for (;r2 >= s3; )
              if (i3 = s3 + r2 >> 1, e4 > t3[i3][1])
                s3 = i3 + 1;
              else {
                if (!(e4 < t3[i3][0]))
                  return true;
                r2 = i3 - 1;
              }
            return false;
          }(e3, n) ? 0 : e3 >= 131072 && e3 <= 196605 || e3 >= 196608 && e3 <= 262141 ? 2 : 1;
        }
        charProperties(e3, t3) {
          let i3 = this.wcwidth(e3), r2 = i3 === 0 && t3 !== 0;
          if (r2) {
            const e4 = s2.UnicodeService.extractWidth(t3);
            e4 === 0 ? r2 = false : e4 > i3 && (i3 = e4);
          }
          return s2.UnicodeService.createPropertyValue(0, i3, r2);
        }
      };
    }, 5981: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.WriteBuffer = undefined;
      const s2 = i2(8460), r = i2(844);

      class n extends r.Disposable {
        constructor(e3) {
          super(), this._action = e3, this._writeBuffer = [], this._callbacks = [], this._pendingData = 0, this._bufferOffset = 0, this._isSyncWriting = false, this._syncCalls = 0, this._didUserInput = false, this._onWriteParsed = this.register(new s2.EventEmitter), this.onWriteParsed = this._onWriteParsed.event;
        }
        handleUserInput() {
          this._didUserInput = true;
        }
        writeSync(e3, t3) {
          if (t3 !== undefined && this._syncCalls > t3)
            return void (this._syncCalls = 0);
          if (this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(undefined), this._syncCalls++, this._isSyncWriting)
            return;
          let i3;
          for (this._isSyncWriting = true;i3 = this._writeBuffer.shift(); ) {
            this._action(i3);
            const e4 = this._callbacks.shift();
            e4 && e4();
          }
          this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = false, this._syncCalls = 0;
        }
        write(e3, t3) {
          if (this._pendingData > 50000000)
            throw new Error("write data discarded, use flow control to avoid losing data");
          if (!this._writeBuffer.length) {
            if (this._bufferOffset = 0, this._didUserInput)
              return this._didUserInput = false, this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(t3), void this._innerWrite();
            setTimeout(() => this._innerWrite());
          }
          this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(t3);
        }
        _innerWrite(e3 = 0, t3 = true) {
          const i3 = e3 || Date.now();
          for (;this._writeBuffer.length > this._bufferOffset; ) {
            const e4 = this._writeBuffer[this._bufferOffset], s3 = this._action(e4, t3);
            if (s3) {
              const e5 = (e6) => Date.now() - i3 >= 12 ? setTimeout(() => this._innerWrite(0, e6)) : this._innerWrite(i3, e6);
              return void s3.catch((e6) => (queueMicrotask(() => {
                throw e6;
              }), Promise.resolve(false))).then(e5);
            }
            const r2 = this._callbacks[this._bufferOffset];
            if (r2 && r2(), this._bufferOffset++, this._pendingData -= e4.length, Date.now() - i3 >= 12)
              break;
          }
          this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > 50 && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
        }
      }
      t2.WriteBuffer = n;
    }, 5941: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.toRgbString = t2.parseColor = undefined;
      const i2 = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, s2 = /^[\da-f]+$/;
      function r(e3, t3) {
        const i3 = e3.toString(16), s3 = i3.length < 2 ? "0" + i3 : i3;
        switch (t3) {
          case 4:
            return i3[0];
          case 8:
            return s3;
          case 12:
            return (s3 + s3).slice(0, 3);
          default:
            return s3 + s3;
        }
      }
      t2.parseColor = function(e3) {
        if (!e3)
          return;
        let t3 = e3.toLowerCase();
        if (t3.indexOf("rgb:") === 0) {
          t3 = t3.slice(4);
          const e4 = i2.exec(t3);
          if (e4) {
            const t4 = e4[1] ? 15 : e4[4] ? 255 : e4[7] ? 4095 : 65535;
            return [Math.round(parseInt(e4[1] || e4[4] || e4[7] || e4[10], 16) / t4 * 255), Math.round(parseInt(e4[2] || e4[5] || e4[8] || e4[11], 16) / t4 * 255), Math.round(parseInt(e4[3] || e4[6] || e4[9] || e4[12], 16) / t4 * 255)];
          }
        } else if (t3.indexOf("#") === 0 && (t3 = t3.slice(1), s2.exec(t3) && [3, 6, 9, 12].includes(t3.length))) {
          const e4 = t3.length / 3, i3 = [0, 0, 0];
          for (let s3 = 0;s3 < 3; ++s3) {
            const r2 = parseInt(t3.slice(e4 * s3, e4 * s3 + e4), 16);
            i3[s3] = e4 === 1 ? r2 << 4 : e4 === 2 ? r2 : e4 === 3 ? r2 >> 4 : r2 >> 8;
          }
          return i3;
        }
      }, t2.toRgbString = function(e3, t3 = 16) {
        const [i3, s3, n] = e3;
        return `rgb:${r(i3, t3)}/${r(s3, t3)}/${r(n, t3)}`;
      };
    }, 5770: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.PAYLOAD_LIMIT = undefined, t2.PAYLOAD_LIMIT = 1e7;
    }, 6351: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.DcsHandler = t2.DcsParser = undefined;
      const s2 = i2(482), r = i2(8742), n = i2(5770), o = [];
      t2.DcsParser = class {
        constructor() {
          this._handlers = Object.create(null), this._active = o, this._ident = 0, this._handlerFb = () => {
          }, this._stack = { paused: false, loopPosition: 0, fallThrough: false };
        }
        dispose() {
          this._handlers = Object.create(null), this._handlerFb = () => {
          }, this._active = o;
        }
        registerHandler(e3, t3) {
          this._handlers[e3] === undefined && (this._handlers[e3] = []);
          const i3 = this._handlers[e3];
          return i3.push(t3), { dispose: () => {
            const e4 = i3.indexOf(t3);
            e4 !== -1 && i3.splice(e4, 1);
          } };
        }
        clearHandler(e3) {
          this._handlers[e3] && delete this._handlers[e3];
        }
        setHandlerFallback(e3) {
          this._handlerFb = e3;
        }
        reset() {
          if (this._active.length)
            for (let e3 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1;e3 >= 0; --e3)
              this._active[e3].unhook(false);
          this._stack.paused = false, this._active = o, this._ident = 0;
        }
        hook(e3, t3) {
          if (this.reset(), this._ident = e3, this._active = this._handlers[e3] || o, this._active.length)
            for (let e4 = this._active.length - 1;e4 >= 0; e4--)
              this._active[e4].hook(t3);
          else
            this._handlerFb(this._ident, "HOOK", t3);
        }
        put(e3, t3, i3) {
          if (this._active.length)
            for (let s3 = this._active.length - 1;s3 >= 0; s3--)
              this._active[s3].put(e3, t3, i3);
          else
            this._handlerFb(this._ident, "PUT", (0, s2.utf32ToString)(e3, t3, i3));
        }
        unhook(e3, t3 = true) {
          if (this._active.length) {
            let i3 = false, s3 = this._active.length - 1, r2 = false;
            if (this._stack.paused && (s3 = this._stack.loopPosition - 1, i3 = t3, r2 = this._stack.fallThrough, this._stack.paused = false), !r2 && i3 === false) {
              for (;s3 >= 0 && (i3 = this._active[s3].unhook(e3), i3 !== true); s3--)
                if (i3 instanceof Promise)
                  return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = false, i3;
              s3--;
            }
            for (;s3 >= 0; s3--)
              if (i3 = this._active[s3].unhook(false), i3 instanceof Promise)
                return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = true, i3;
          } else
            this._handlerFb(this._ident, "UNHOOK", e3);
          this._active = o, this._ident = 0;
        }
      };
      const a = new r.Params;
      a.addParam(0), t2.DcsHandler = class {
        constructor(e3) {
          this._handler = e3, this._data = "", this._params = a, this._hitLimit = false;
        }
        hook(e3) {
          this._params = e3.length > 1 || e3.params[0] ? e3.clone() : a, this._data = "", this._hitLimit = false;
        }
        put(e3, t3, i3) {
          this._hitLimit || (this._data += (0, s2.utf32ToString)(e3, t3, i3), this._data.length > n.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = true));
        }
        unhook(e3) {
          let t3 = false;
          if (this._hitLimit)
            t3 = false;
          else if (e3 && (t3 = this._handler(this._data, this._params), t3 instanceof Promise))
            return t3.then((e4) => (this._params = a, this._data = "", this._hitLimit = false, e4));
          return this._params = a, this._data = "", this._hitLimit = false, t3;
        }
      };
    }, 2015: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.EscapeSequenceParser = t2.VT500_TRANSITION_TABLE = t2.TransitionTable = undefined;
      const s2 = i2(844), r = i2(8742), n = i2(6242), o = i2(6351);

      class a {
        constructor(e3) {
          this.table = new Uint8Array(e3);
        }
        setDefault(e3, t3) {
          this.table.fill(e3 << 4 | t3);
        }
        add(e3, t3, i3, s3) {
          this.table[t3 << 8 | e3] = i3 << 4 | s3;
        }
        addMany(e3, t3, i3, s3) {
          for (let r2 = 0;r2 < e3.length; r2++)
            this.table[t3 << 8 | e3[r2]] = i3 << 4 | s3;
        }
      }
      t2.TransitionTable = a;
      const h = 160;
      t2.VT500_TRANSITION_TABLE = function() {
        const e3 = new a(4095), t3 = Array.apply(null, Array(256)).map((e4, t4) => t4), i3 = (e4, i4) => t3.slice(e4, i4), s3 = i3(32, 127), r2 = i3(0, 24);
        r2.push(25), r2.push.apply(r2, i3(28, 32));
        const n2 = i3(0, 14);
        let o2;
        for (o2 in e3.setDefault(1, 0), e3.addMany(s3, 0, 2, 0), n2)
          e3.addMany([24, 26, 153, 154], o2, 3, 0), e3.addMany(i3(128, 144), o2, 3, 0), e3.addMany(i3(144, 152), o2, 3, 0), e3.add(156, o2, 0, 0), e3.add(27, o2, 11, 1), e3.add(157, o2, 4, 8), e3.addMany([152, 158, 159], o2, 0, 7), e3.add(155, o2, 11, 3), e3.add(144, o2, 11, 9);
        return e3.addMany(r2, 0, 3, 0), e3.addMany(r2, 1, 3, 1), e3.add(127, 1, 0, 1), e3.addMany(r2, 8, 0, 8), e3.addMany(r2, 3, 3, 3), e3.add(127, 3, 0, 3), e3.addMany(r2, 4, 3, 4), e3.add(127, 4, 0, 4), e3.addMany(r2, 6, 3, 6), e3.addMany(r2, 5, 3, 5), e3.add(127, 5, 0, 5), e3.addMany(r2, 2, 3, 2), e3.add(127, 2, 0, 2), e3.add(93, 1, 4, 8), e3.addMany(s3, 8, 5, 8), e3.add(127, 8, 5, 8), e3.addMany([156, 27, 24, 26, 7], 8, 6, 0), e3.addMany(i3(28, 32), 8, 0, 8), e3.addMany([88, 94, 95], 1, 0, 7), e3.addMany(s3, 7, 0, 7), e3.addMany(r2, 7, 0, 7), e3.add(156, 7, 0, 0), e3.add(127, 7, 0, 7), e3.add(91, 1, 11, 3), e3.addMany(i3(64, 127), 3, 7, 0), e3.addMany(i3(48, 60), 3, 8, 4), e3.addMany([60, 61, 62, 63], 3, 9, 4), e3.addMany(i3(48, 60), 4, 8, 4), e3.addMany(i3(64, 127), 4, 7, 0), e3.addMany([60, 61, 62, 63], 4, 0, 6), e3.addMany(i3(32, 64), 6, 0, 6), e3.add(127, 6, 0, 6), e3.addMany(i3(64, 127), 6, 0, 0), e3.addMany(i3(32, 48), 3, 9, 5), e3.addMany(i3(32, 48), 5, 9, 5), e3.addMany(i3(48, 64), 5, 0, 6), e3.addMany(i3(64, 127), 5, 7, 0), e3.addMany(i3(32, 48), 4, 9, 5), e3.addMany(i3(32, 48), 1, 9, 2), e3.addMany(i3(32, 48), 2, 9, 2), e3.addMany(i3(48, 127), 2, 10, 0), e3.addMany(i3(48, 80), 1, 10, 0), e3.addMany(i3(81, 88), 1, 10, 0), e3.addMany([89, 90, 92], 1, 10, 0), e3.addMany(i3(96, 127), 1, 10, 0), e3.add(80, 1, 11, 9), e3.addMany(r2, 9, 0, 9), e3.add(127, 9, 0, 9), e3.addMany(i3(28, 32), 9, 0, 9), e3.addMany(i3(32, 48), 9, 9, 12), e3.addMany(i3(48, 60), 9, 8, 10), e3.addMany([60, 61, 62, 63], 9, 9, 10), e3.addMany(r2, 11, 0, 11), e3.addMany(i3(32, 128), 11, 0, 11), e3.addMany(i3(28, 32), 11, 0, 11), e3.addMany(r2, 10, 0, 10), e3.add(127, 10, 0, 10), e3.addMany(i3(28, 32), 10, 0, 10), e3.addMany(i3(48, 60), 10, 8, 10), e3.addMany([60, 61, 62, 63], 10, 0, 11), e3.addMany(i3(32, 48), 10, 9, 12), e3.addMany(r2, 12, 0, 12), e3.add(127, 12, 0, 12), e3.addMany(i3(28, 32), 12, 0, 12), e3.addMany(i3(32, 48), 12, 9, 12), e3.addMany(i3(48, 64), 12, 0, 11), e3.addMany(i3(64, 127), 12, 12, 13), e3.addMany(i3(64, 127), 10, 12, 13), e3.addMany(i3(64, 127), 9, 12, 13), e3.addMany(r2, 13, 13, 13), e3.addMany(s3, 13, 13, 13), e3.add(127, 13, 0, 13), e3.addMany([27, 156, 24, 26], 13, 14, 0), e3.add(h, 0, 2, 0), e3.add(h, 8, 5, 8), e3.add(h, 6, 0, 6), e3.add(h, 11, 0, 11), e3.add(h, 13, 13, 13), e3;
      }();

      class c extends s2.Disposable {
        constructor(e3 = t2.VT500_TRANSITION_TABLE) {
          super(), this._transitions = e3, this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 }, this.initialState = 0, this.currentState = this.initialState, this._params = new r.Params, this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (e4, t3, i3) => {
          }, this._executeHandlerFb = (e4) => {
          }, this._csiHandlerFb = (e4, t3) => {
          }, this._escHandlerFb = (e4) => {
          }, this._errorHandlerFb = (e4) => e4, this._printHandler = this._printHandlerFb, this._executeHandlers = Object.create(null), this._csiHandlers = Object.create(null), this._escHandlers = Object.create(null), this.register((0, s2.toDisposable)(() => {
            this._csiHandlers = Object.create(null), this._executeHandlers = Object.create(null), this._escHandlers = Object.create(null);
          })), this._oscParser = this.register(new n.OscParser), this._dcsParser = this.register(new o.DcsParser), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => true);
        }
        _identifier(e3, t3 = [64, 126]) {
          let i3 = 0;
          if (e3.prefix) {
            if (e3.prefix.length > 1)
              throw new Error("only one byte as prefix supported");
            if (i3 = e3.prefix.charCodeAt(0), i3 && 60 > i3 || i3 > 63)
              throw new Error("prefix must be in range 0x3c .. 0x3f");
          }
          if (e3.intermediates) {
            if (e3.intermediates.length > 2)
              throw new Error("only two bytes as intermediates are supported");
            for (let t4 = 0;t4 < e3.intermediates.length; ++t4) {
              const s4 = e3.intermediates.charCodeAt(t4);
              if (32 > s4 || s4 > 47)
                throw new Error("intermediate must be in range 0x20 .. 0x2f");
              i3 <<= 8, i3 |= s4;
            }
          }
          if (e3.final.length !== 1)
            throw new Error("final must be a single byte");
          const s3 = e3.final.charCodeAt(0);
          if (t3[0] > s3 || s3 > t3[1])
            throw new Error(`final must be in range ${t3[0]} .. ${t3[1]}`);
          return i3 <<= 8, i3 |= s3, i3;
        }
        identToString(e3) {
          const t3 = [];
          for (;e3; )
            t3.push(String.fromCharCode(255 & e3)), e3 >>= 8;
          return t3.reverse().join("");
        }
        setPrintHandler(e3) {
          this._printHandler = e3;
        }
        clearPrintHandler() {
          this._printHandler = this._printHandlerFb;
        }
        registerEscHandler(e3, t3) {
          const i3 = this._identifier(e3, [48, 126]);
          this._escHandlers[i3] === undefined && (this._escHandlers[i3] = []);
          const s3 = this._escHandlers[i3];
          return s3.push(t3), { dispose: () => {
            const e4 = s3.indexOf(t3);
            e4 !== -1 && s3.splice(e4, 1);
          } };
        }
        clearEscHandler(e3) {
          this._escHandlers[this._identifier(e3, [48, 126])] && delete this._escHandlers[this._identifier(e3, [48, 126])];
        }
        setEscHandlerFallback(e3) {
          this._escHandlerFb = e3;
        }
        setExecuteHandler(e3, t3) {
          this._executeHandlers[e3.charCodeAt(0)] = t3;
        }
        clearExecuteHandler(e3) {
          this._executeHandlers[e3.charCodeAt(0)] && delete this._executeHandlers[e3.charCodeAt(0)];
        }
        setExecuteHandlerFallback(e3) {
          this._executeHandlerFb = e3;
        }
        registerCsiHandler(e3, t3) {
          const i3 = this._identifier(e3);
          this._csiHandlers[i3] === undefined && (this._csiHandlers[i3] = []);
          const s3 = this._csiHandlers[i3];
          return s3.push(t3), { dispose: () => {
            const e4 = s3.indexOf(t3);
            e4 !== -1 && s3.splice(e4, 1);
          } };
        }
        clearCsiHandler(e3) {
          this._csiHandlers[this._identifier(e3)] && delete this._csiHandlers[this._identifier(e3)];
        }
        setCsiHandlerFallback(e3) {
          this._csiHandlerFb = e3;
        }
        registerDcsHandler(e3, t3) {
          return this._dcsParser.registerHandler(this._identifier(e3), t3);
        }
        clearDcsHandler(e3) {
          this._dcsParser.clearHandler(this._identifier(e3));
        }
        setDcsHandlerFallback(e3) {
          this._dcsParser.setHandlerFallback(e3);
        }
        registerOscHandler(e3, t3) {
          return this._oscParser.registerHandler(e3, t3);
        }
        clearOscHandler(e3) {
          this._oscParser.clearHandler(e3);
        }
        setOscHandlerFallback(e3) {
          this._oscParser.setHandlerFallback(e3);
        }
        setErrorHandler(e3) {
          this._errorHandler = e3;
        }
        clearErrorHandler() {
          this._errorHandler = this._errorHandlerFb;
        }
        reset() {
          this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._parseStack.state !== 0 && (this._parseStack.state = 2, this._parseStack.handlers = []);
        }
        _preserveStack(e3, t3, i3, s3, r2) {
          this._parseStack.state = e3, this._parseStack.handlers = t3, this._parseStack.handlerPos = i3, this._parseStack.transition = s3, this._parseStack.chunkPos = r2;
        }
        parse(e3, t3, i3) {
          let s3, r2 = 0, n2 = 0, o2 = 0;
          if (this._parseStack.state)
            if (this._parseStack.state === 2)
              this._parseStack.state = 0, o2 = this._parseStack.chunkPos + 1;
            else {
              if (i3 === undefined || this._parseStack.state === 1)
                throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
              const t4 = this._parseStack.handlers;
              let n3 = this._parseStack.handlerPos - 1;
              switch (this._parseStack.state) {
                case 3:
                  if (i3 === false && n3 > -1) {
                    for (;n3 >= 0 && (s3 = t4[n3](this._params), s3 !== true); n3--)
                      if (s3 instanceof Promise)
                        return this._parseStack.handlerPos = n3, s3;
                  }
                  this._parseStack.handlers = [];
                  break;
                case 4:
                  if (i3 === false && n3 > -1) {
                    for (;n3 >= 0 && (s3 = t4[n3](), s3 !== true); n3--)
                      if (s3 instanceof Promise)
                        return this._parseStack.handlerPos = n3, s3;
                  }
                  this._parseStack.handlers = [];
                  break;
                case 6:
                  if (r2 = e3[this._parseStack.chunkPos], s3 = this._dcsParser.unhook(r2 !== 24 && r2 !== 26, i3), s3)
                    return s3;
                  r2 === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
                  break;
                case 5:
                  if (r2 = e3[this._parseStack.chunkPos], s3 = this._oscParser.end(r2 !== 24 && r2 !== 26, i3), s3)
                    return s3;
                  r2 === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
              }
              this._parseStack.state = 0, o2 = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = 15 & this._parseStack.transition;
            }
          for (let i4 = o2;i4 < t3; ++i4) {
            switch (r2 = e3[i4], n2 = this._transitions.table[this.currentState << 8 | (r2 < 160 ? r2 : h)], n2 >> 4) {
              case 2:
                for (let s4 = i4 + 1;; ++s4) {
                  if (s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < h) {
                    this._printHandler(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                  if (++s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < h) {
                    this._printHandler(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                  if (++s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < h) {
                    this._printHandler(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                  if (++s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < h) {
                    this._printHandler(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                }
                break;
              case 3:
                this._executeHandlers[r2] ? this._executeHandlers[r2]() : this._executeHandlerFb(r2), this.precedingJoinState = 0;
                break;
              case 0:
                break;
              case 1:
                if (this._errorHandler({ position: i4, code: r2, currentState: this.currentState, collect: this._collect, params: this._params, abort: false }).abort)
                  return;
                break;
              case 7:
                const o3 = this._csiHandlers[this._collect << 8 | r2];
                let a2 = o3 ? o3.length - 1 : -1;
                for (;a2 >= 0 && (s3 = o3[a2](this._params), s3 !== true); a2--)
                  if (s3 instanceof Promise)
                    return this._preserveStack(3, o3, a2, n2, i4), s3;
                a2 < 0 && this._csiHandlerFb(this._collect << 8 | r2, this._params), this.precedingJoinState = 0;
                break;
              case 8:
                do {
                  switch (r2) {
                    case 59:
                      this._params.addParam(0);
                      break;
                    case 58:
                      this._params.addSubParam(-1);
                      break;
                    default:
                      this._params.addDigit(r2 - 48);
                  }
                } while (++i4 < t3 && (r2 = e3[i4]) > 47 && r2 < 60);
                i4--;
                break;
              case 9:
                this._collect <<= 8, this._collect |= r2;
                break;
              case 10:
                const c2 = this._escHandlers[this._collect << 8 | r2];
                let l = c2 ? c2.length - 1 : -1;
                for (;l >= 0 && (s3 = c2[l](), s3 !== true); l--)
                  if (s3 instanceof Promise)
                    return this._preserveStack(4, c2, l, n2, i4), s3;
                l < 0 && this._escHandlerFb(this._collect << 8 | r2), this.precedingJoinState = 0;
                break;
              case 11:
                this._params.reset(), this._params.addParam(0), this._collect = 0;
                break;
              case 12:
                this._dcsParser.hook(this._collect << 8 | r2, this._params);
                break;
              case 13:
                for (let s4 = i4 + 1;; ++s4)
                  if (s4 >= t3 || (r2 = e3[s4]) === 24 || r2 === 26 || r2 === 27 || r2 > 127 && r2 < h) {
                    this._dcsParser.put(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                break;
              case 14:
                if (s3 = this._dcsParser.unhook(r2 !== 24 && r2 !== 26), s3)
                  return this._preserveStack(6, [], 0, n2, i4), s3;
                r2 === 27 && (n2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
                break;
              case 4:
                this._oscParser.start();
                break;
              case 5:
                for (let s4 = i4 + 1;; s4++)
                  if (s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 127 && r2 < h) {
                    this._oscParser.put(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                break;
              case 6:
                if (s3 = this._oscParser.end(r2 !== 24 && r2 !== 26), s3)
                  return this._preserveStack(5, [], 0, n2, i4), s3;
                r2 === 27 && (n2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
            }
            this.currentState = 15 & n2;
          }
        }
      }
      t2.EscapeSequenceParser = c;
    }, 6242: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.OscHandler = t2.OscParser = undefined;
      const s2 = i2(5770), r = i2(482), n = [];
      t2.OscParser = class {
        constructor() {
          this._state = 0, this._active = n, this._id = -1, this._handlers = Object.create(null), this._handlerFb = () => {
          }, this._stack = { paused: false, loopPosition: 0, fallThrough: false };
        }
        registerHandler(e3, t3) {
          this._handlers[e3] === undefined && (this._handlers[e3] = []);
          const i3 = this._handlers[e3];
          return i3.push(t3), { dispose: () => {
            const e4 = i3.indexOf(t3);
            e4 !== -1 && i3.splice(e4, 1);
          } };
        }
        clearHandler(e3) {
          this._handlers[e3] && delete this._handlers[e3];
        }
        setHandlerFallback(e3) {
          this._handlerFb = e3;
        }
        dispose() {
          this._handlers = Object.create(null), this._handlerFb = () => {
          }, this._active = n;
        }
        reset() {
          if (this._state === 2)
            for (let e3 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1;e3 >= 0; --e3)
              this._active[e3].end(false);
          this._stack.paused = false, this._active = n, this._id = -1, this._state = 0;
        }
        _start() {
          if (this._active = this._handlers[this._id] || n, this._active.length)
            for (let e3 = this._active.length - 1;e3 >= 0; e3--)
              this._active[e3].start();
          else
            this._handlerFb(this._id, "START");
        }
        _put(e3, t3, i3) {
          if (this._active.length)
            for (let s3 = this._active.length - 1;s3 >= 0; s3--)
              this._active[s3].put(e3, t3, i3);
          else
            this._handlerFb(this._id, "PUT", (0, r.utf32ToString)(e3, t3, i3));
        }
        start() {
          this.reset(), this._state = 1;
        }
        put(e3, t3, i3) {
          if (this._state !== 3) {
            if (this._state === 1)
              for (;t3 < i3; ) {
                const i4 = e3[t3++];
                if (i4 === 59) {
                  this._state = 2, this._start();
                  break;
                }
                if (i4 < 48 || 57 < i4)
                  return void (this._state = 3);
                this._id === -1 && (this._id = 0), this._id = 10 * this._id + i4 - 48;
              }
            this._state === 2 && i3 - t3 > 0 && this._put(e3, t3, i3);
          }
        }
        end(e3, t3 = true) {
          if (this._state !== 0) {
            if (this._state !== 3)
              if (this._state === 1 && this._start(), this._active.length) {
                let i3 = false, s3 = this._active.length - 1, r2 = false;
                if (this._stack.paused && (s3 = this._stack.loopPosition - 1, i3 = t3, r2 = this._stack.fallThrough, this._stack.paused = false), !r2 && i3 === false) {
                  for (;s3 >= 0 && (i3 = this._active[s3].end(e3), i3 !== true); s3--)
                    if (i3 instanceof Promise)
                      return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = false, i3;
                  s3--;
                }
                for (;s3 >= 0; s3--)
                  if (i3 = this._active[s3].end(false), i3 instanceof Promise)
                    return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = true, i3;
              } else
                this._handlerFb(this._id, "END", e3);
            this._active = n, this._id = -1, this._state = 0;
          }
        }
      }, t2.OscHandler = class {
        constructor(e3) {
          this._handler = e3, this._data = "", this._hitLimit = false;
        }
        start() {
          this._data = "", this._hitLimit = false;
        }
        put(e3, t3, i3) {
          this._hitLimit || (this._data += (0, r.utf32ToString)(e3, t3, i3), this._data.length > s2.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = true));
        }
        end(e3) {
          let t3 = false;
          if (this._hitLimit)
            t3 = false;
          else if (e3 && (t3 = this._handler(this._data), t3 instanceof Promise))
            return t3.then((e4) => (this._data = "", this._hitLimit = false, e4));
          return this._data = "", this._hitLimit = false, t3;
        }
      };
    }, 8742: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.Params = undefined;
      const i2 = 2147483647;

      class s2 {
        static fromArray(e3) {
          const t3 = new s2;
          if (!e3.length)
            return t3;
          for (let i3 = Array.isArray(e3[0]) ? 1 : 0;i3 < e3.length; ++i3) {
            const s3 = e3[i3];
            if (Array.isArray(s3))
              for (let e4 = 0;e4 < s3.length; ++e4)
                t3.addSubParam(s3[e4]);
            else
              t3.addParam(s3);
          }
          return t3;
        }
        constructor(e3 = 32, t3 = 32) {
          if (this.maxLength = e3, this.maxSubParamsLength = t3, t3 > 256)
            throw new Error("maxSubParamsLength must not be greater than 256");
          this.params = new Int32Array(e3), this.length = 0, this._subParams = new Int32Array(t3), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(e3), this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
        }
        clone() {
          const e3 = new s2(this.maxLength, this.maxSubParamsLength);
          return e3.params.set(this.params), e3.length = this.length, e3._subParams.set(this._subParams), e3._subParamsLength = this._subParamsLength, e3._subParamsIdx.set(this._subParamsIdx), e3._rejectDigits = this._rejectDigits, e3._rejectSubDigits = this._rejectSubDigits, e3._digitIsSub = this._digitIsSub, e3;
        }
        toArray() {
          const e3 = [];
          for (let t3 = 0;t3 < this.length; ++t3) {
            e3.push(this.params[t3]);
            const i3 = this._subParamsIdx[t3] >> 8, s3 = 255 & this._subParamsIdx[t3];
            s3 - i3 > 0 && e3.push(Array.prototype.slice.call(this._subParams, i3, s3));
          }
          return e3;
        }
        reset() {
          this.length = 0, this._subParamsLength = 0, this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
        }
        addParam(e3) {
          if (this._digitIsSub = false, this.length >= this.maxLength)
            this._rejectDigits = true;
          else {
            if (e3 < -1)
              throw new Error("values lesser than -1 are not allowed");
            this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = e3 > i2 ? i2 : e3;
          }
        }
        addSubParam(e3) {
          if (this._digitIsSub = true, this.length)
            if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength)
              this._rejectSubDigits = true;
            else {
              if (e3 < -1)
                throw new Error("values lesser than -1 are not allowed");
              this._subParams[this._subParamsLength++] = e3 > i2 ? i2 : e3, this._subParamsIdx[this.length - 1]++;
            }
        }
        hasSubParams(e3) {
          return (255 & this._subParamsIdx[e3]) - (this._subParamsIdx[e3] >> 8) > 0;
        }
        getSubParams(e3) {
          const t3 = this._subParamsIdx[e3] >> 8, i3 = 255 & this._subParamsIdx[e3];
          return i3 - t3 > 0 ? this._subParams.subarray(t3, i3) : null;
        }
        getSubParamsAll() {
          const e3 = {};
          for (let t3 = 0;t3 < this.length; ++t3) {
            const i3 = this._subParamsIdx[t3] >> 8, s3 = 255 & this._subParamsIdx[t3];
            s3 - i3 > 0 && (e3[t3] = this._subParams.slice(i3, s3));
          }
          return e3;
        }
        addDigit(e3) {
          let t3;
          if (this._rejectDigits || !(t3 = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits)
            return;
          const s3 = this._digitIsSub ? this._subParams : this.params, r = s3[t3 - 1];
          s3[t3 - 1] = ~r ? Math.min(10 * r + e3, i2) : e3;
        }
      }
      t2.Params = s2;
    }, 5741: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.AddonManager = undefined, t2.AddonManager = class {
        constructor() {
          this._addons = [];
        }
        dispose() {
          for (let e3 = this._addons.length - 1;e3 >= 0; e3--)
            this._addons[e3].instance.dispose();
        }
        loadAddon(e3, t3) {
          const i2 = { instance: t3, dispose: t3.dispose, isDisposed: false };
          this._addons.push(i2), t3.dispose = () => this._wrappedAddonDispose(i2), t3.activate(e3);
        }
        _wrappedAddonDispose(e3) {
          if (e3.isDisposed)
            return;
          let t3 = -1;
          for (let i2 = 0;i2 < this._addons.length; i2++)
            if (this._addons[i2] === e3) {
              t3 = i2;
              break;
            }
          if (t3 === -1)
            throw new Error("Could not dispose an addon that has not been loaded");
          e3.isDisposed = true, e3.dispose.apply(e3.instance), this._addons.splice(t3, 1);
        }
      };
    }, 8771: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferApiView = undefined;
      const s2 = i2(3785), r = i2(511);
      t2.BufferApiView = class {
        constructor(e3, t3) {
          this._buffer = e3, this.type = t3;
        }
        init(e3) {
          return this._buffer = e3, this;
        }
        get cursorY() {
          return this._buffer.y;
        }
        get cursorX() {
          return this._buffer.x;
        }
        get viewportY() {
          return this._buffer.ydisp;
        }
        get baseY() {
          return this._buffer.ybase;
        }
        get length() {
          return this._buffer.lines.length;
        }
        getLine(e3) {
          const t3 = this._buffer.lines.get(e3);
          if (t3)
            return new s2.BufferLineApiView(t3);
        }
        getNullCell() {
          return new r.CellData;
        }
      };
    }, 3785: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferLineApiView = undefined;
      const s2 = i2(511);
      t2.BufferLineApiView = class {
        constructor(e3) {
          this._line = e3;
        }
        get isWrapped() {
          return this._line.isWrapped;
        }
        get length() {
          return this._line.length;
        }
        getCell(e3, t3) {
          if (!(e3 < 0 || e3 >= this._line.length))
            return t3 ? (this._line.loadCell(e3, t3), t3) : this._line.loadCell(e3, new s2.CellData);
        }
        translateToString(e3, t3, i3) {
          return this._line.translateToString(e3, t3, i3);
        }
      };
    }, 8285: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferNamespaceApi = undefined;
      const s2 = i2(8771), r = i2(8460), n = i2(844);

      class o extends n.Disposable {
        constructor(e3) {
          super(), this._core = e3, this._onBufferChange = this.register(new r.EventEmitter), this.onBufferChange = this._onBufferChange.event, this._normal = new s2.BufferApiView(this._core.buffers.normal, "normal"), this._alternate = new s2.BufferApiView(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
        }
        get active() {
          if (this._core.buffers.active === this._core.buffers.normal)
            return this.normal;
          if (this._core.buffers.active === this._core.buffers.alt)
            return this.alternate;
          throw new Error("Active buffer is neither normal nor alternate");
        }
        get normal() {
          return this._normal.init(this._core.buffers.normal);
        }
        get alternate() {
          return this._alternate.init(this._core.buffers.alt);
        }
      }
      t2.BufferNamespaceApi = o;
    }, 7975: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.ParserApi = undefined, t2.ParserApi = class {
        constructor(e3) {
          this._core = e3;
        }
        registerCsiHandler(e3, t3) {
          return this._core.registerCsiHandler(e3, (e4) => t3(e4.toArray()));
        }
        addCsiHandler(e3, t3) {
          return this.registerCsiHandler(e3, t3);
        }
        registerDcsHandler(e3, t3) {
          return this._core.registerDcsHandler(e3, (e4, i2) => t3(e4, i2.toArray()));
        }
        addDcsHandler(e3, t3) {
          return this.registerDcsHandler(e3, t3);
        }
        registerEscHandler(e3, t3) {
          return this._core.registerEscHandler(e3, t3);
        }
        addEscHandler(e3, t3) {
          return this.registerEscHandler(e3, t3);
        }
        registerOscHandler(e3, t3) {
          return this._core.registerOscHandler(e3, t3);
        }
        addOscHandler(e3, t3) {
          return this.registerOscHandler(e3, t3);
        }
      };
    }, 7090: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.UnicodeApi = undefined, t2.UnicodeApi = class {
        constructor(e3) {
          this._core = e3;
        }
        register(e3) {
          this._core.unicodeService.register(e3);
        }
        get versions() {
          return this._core.unicodeService.versions;
        }
        get activeVersion() {
          return this._core.unicodeService.activeVersion;
        }
        set activeVersion(e3) {
          this._core.unicodeService.activeVersion = e3;
        }
      };
    }, 744: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferService = t2.MINIMUM_ROWS = t2.MINIMUM_COLS = undefined;
      const n = i2(8460), o = i2(844), a = i2(5295), h = i2(2585);
      t2.MINIMUM_COLS = 2, t2.MINIMUM_ROWS = 1;
      let c = t2.BufferService = class extends o.Disposable {
        get buffer() {
          return this.buffers.active;
        }
        constructor(e3) {
          super(), this.isUserScrolling = false, this._onResize = this.register(new n.EventEmitter), this.onResize = this._onResize.event, this._onScroll = this.register(new n.EventEmitter), this.onScroll = this._onScroll.event, this.cols = Math.max(e3.rawOptions.cols || 0, t2.MINIMUM_COLS), this.rows = Math.max(e3.rawOptions.rows || 0, t2.MINIMUM_ROWS), this.buffers = this.register(new a.BufferSet(e3, this));
        }
        resize(e3, t3) {
          this.cols = e3, this.rows = t3, this.buffers.resize(e3, t3), this._onResize.fire({ cols: e3, rows: t3 });
        }
        reset() {
          this.buffers.reset(), this.isUserScrolling = false;
        }
        scroll(e3, t3 = false) {
          const i3 = this.buffer;
          let s3;
          s3 = this._cachedBlankLine, s3 && s3.length === this.cols && s3.getFg(0) === e3.fg && s3.getBg(0) === e3.bg || (s3 = i3.getBlankLine(e3, t3), this._cachedBlankLine = s3), s3.isWrapped = t3;
          const r2 = i3.ybase + i3.scrollTop, n2 = i3.ybase + i3.scrollBottom;
          if (i3.scrollTop === 0) {
            const e4 = i3.lines.isFull;
            n2 === i3.lines.length - 1 ? e4 ? i3.lines.recycle().copyFrom(s3) : i3.lines.push(s3.clone()) : i3.lines.splice(n2 + 1, 0, s3.clone()), e4 ? this.isUserScrolling && (i3.ydisp = Math.max(i3.ydisp - 1, 0)) : (i3.ybase++, this.isUserScrolling || i3.ydisp++);
          } else {
            const e4 = n2 - r2 + 1;
            i3.lines.shiftElements(r2 + 1, e4 - 1, -1), i3.lines.set(n2, s3.clone());
          }
          this.isUserScrolling || (i3.ydisp = i3.ybase), this._onScroll.fire(i3.ydisp);
        }
        scrollLines(e3, t3, i3) {
          const s3 = this.buffer;
          if (e3 < 0) {
            if (s3.ydisp === 0)
              return;
            this.isUserScrolling = true;
          } else
            e3 + s3.ydisp >= s3.ybase && (this.isUserScrolling = false);
          const r2 = s3.ydisp;
          s3.ydisp = Math.max(Math.min(s3.ydisp + e3, s3.ybase), 0), r2 !== s3.ydisp && (t3 || this._onScroll.fire(s3.ydisp));
        }
      };
      t2.BufferService = c = s2([r(0, h.IOptionsService)], c);
    }, 7994: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.CharsetService = undefined, t2.CharsetService = class {
        constructor() {
          this.glevel = 0, this._charsets = [];
        }
        reset() {
          this.charset = undefined, this._charsets = [], this.glevel = 0;
        }
        setgLevel(e3) {
          this.glevel = e3, this.charset = this._charsets[e3];
        }
        setgCharset(e3, t3) {
          this._charsets[e3] = t3, this.glevel === e3 && (this.charset = t3);
        }
      };
    }, 1753: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreMouseService = undefined;
      const n = i2(2585), o = i2(8460), a = i2(844), h = { NONE: { events: 0, restrict: () => false }, X10: { events: 1, restrict: (e3) => e3.button !== 4 && e3.action === 1 && (e3.ctrl = false, e3.alt = false, e3.shift = false, true) }, VT200: { events: 19, restrict: (e3) => e3.action !== 32 }, DRAG: { events: 23, restrict: (e3) => e3.action !== 32 || e3.button !== 3 }, ANY: { events: 31, restrict: (e3) => true } };
      function c(e3, t3) {
        let i3 = (e3.ctrl ? 16 : 0) | (e3.shift ? 4 : 0) | (e3.alt ? 8 : 0);
        return e3.button === 4 ? (i3 |= 64, i3 |= e3.action) : (i3 |= 3 & e3.button, 4 & e3.button && (i3 |= 64), 8 & e3.button && (i3 |= 128), e3.action === 32 ? i3 |= 32 : e3.action !== 0 || t3 || (i3 |= 3)), i3;
      }
      const l = String.fromCharCode, d = { DEFAULT: (e3) => {
        const t3 = [c(e3, false) + 32, e3.col + 32, e3.row + 32];
        return t3[0] > 255 || t3[1] > 255 || t3[2] > 255 ? "" : `[M${l(t3[0])}${l(t3[1])}${l(t3[2])}`;
      }, SGR: (e3) => {
        const t3 = e3.action === 0 && e3.button !== 4 ? "m" : "M";
        return `[<${c(e3, true)};${e3.col};${e3.row}${t3}`;
      }, SGR_PIXELS: (e3) => {
        const t3 = e3.action === 0 && e3.button !== 4 ? "m" : "M";
        return `[<${c(e3, true)};${e3.x};${e3.y}${t3}`;
      } };
      let _ = t2.CoreMouseService = class extends a.Disposable {
        constructor(e3, t3) {
          super(), this._bufferService = e3, this._coreService = t3, this._protocols = {}, this._encodings = {}, this._activeProtocol = "", this._activeEncoding = "", this._lastEvent = null, this._onProtocolChange = this.register(new o.EventEmitter), this.onProtocolChange = this._onProtocolChange.event;
          for (const e4 of Object.keys(h))
            this.addProtocol(e4, h[e4]);
          for (const e4 of Object.keys(d))
            this.addEncoding(e4, d[e4]);
          this.reset();
        }
        addProtocol(e3, t3) {
          this._protocols[e3] = t3;
        }
        addEncoding(e3, t3) {
          this._encodings[e3] = t3;
        }
        get activeProtocol() {
          return this._activeProtocol;
        }
        get areMouseEventsActive() {
          return this._protocols[this._activeProtocol].events !== 0;
        }
        set activeProtocol(e3) {
          if (!this._protocols[e3])
            throw new Error(`unknown protocol "${e3}"`);
          this._activeProtocol = e3, this._onProtocolChange.fire(this._protocols[e3].events);
        }
        get activeEncoding() {
          return this._activeEncoding;
        }
        set activeEncoding(e3) {
          if (!this._encodings[e3])
            throw new Error(`unknown encoding "${e3}"`);
          this._activeEncoding = e3;
        }
        reset() {
          this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null;
        }
        triggerMouseEvent(e3) {
          if (e3.col < 0 || e3.col >= this._bufferService.cols || e3.row < 0 || e3.row >= this._bufferService.rows)
            return false;
          if (e3.button === 4 && e3.action === 32)
            return false;
          if (e3.button === 3 && e3.action !== 32)
            return false;
          if (e3.button !== 4 && (e3.action === 2 || e3.action === 3))
            return false;
          if (e3.col++, e3.row++, e3.action === 32 && this._lastEvent && this._equalEvents(this._lastEvent, e3, this._activeEncoding === "SGR_PIXELS"))
            return false;
          if (!this._protocols[this._activeProtocol].restrict(e3))
            return false;
          const t3 = this._encodings[this._activeEncoding](e3);
          return t3 && (this._activeEncoding === "DEFAULT" ? this._coreService.triggerBinaryEvent(t3) : this._coreService.triggerDataEvent(t3, true)), this._lastEvent = e3, true;
        }
        explainEvents(e3) {
          return { down: !!(1 & e3), up: !!(2 & e3), drag: !!(4 & e3), move: !!(8 & e3), wheel: !!(16 & e3) };
        }
        _equalEvents(e3, t3, i3) {
          if (i3) {
            if (e3.x !== t3.x)
              return false;
            if (e3.y !== t3.y)
              return false;
          } else {
            if (e3.col !== t3.col)
              return false;
            if (e3.row !== t3.row)
              return false;
          }
          return e3.button === t3.button && e3.action === t3.action && e3.ctrl === t3.ctrl && e3.alt === t3.alt && e3.shift === t3.shift;
        }
      };
      t2.CoreMouseService = _ = s2([r(0, n.IBufferService), r(1, n.ICoreService)], _);
    }, 6975: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreService = undefined;
      const n = i2(1439), o = i2(8460), a = i2(844), h = i2(2585), c = Object.freeze({ insertMode: false }), l = Object.freeze({ applicationCursorKeys: false, applicationKeypad: false, bracketedPasteMode: false, origin: false, reverseWraparound: false, sendFocus: false, wraparound: true });
      let d = t2.CoreService = class extends a.Disposable {
        constructor(e3, t3, i3) {
          super(), this._bufferService = e3, this._logService = t3, this._optionsService = i3, this.isCursorInitialized = false, this.isCursorHidden = false, this._onData = this.register(new o.EventEmitter), this.onData = this._onData.event, this._onUserInput = this.register(new o.EventEmitter), this.onUserInput = this._onUserInput.event, this._onBinary = this.register(new o.EventEmitter), this.onBinary = this._onBinary.event, this._onRequestScrollToBottom = this.register(new o.EventEmitter), this.onRequestScrollToBottom = this._onRequestScrollToBottom.event, this.modes = (0, n.clone)(c), this.decPrivateModes = (0, n.clone)(l);
        }
        reset() {
          this.modes = (0, n.clone)(c), this.decPrivateModes = (0, n.clone)(l);
        }
        triggerDataEvent(e3, t3 = false) {
          if (this._optionsService.rawOptions.disableStdin)
            return;
          const i3 = this._bufferService.buffer;
          t3 && this._optionsService.rawOptions.scrollOnUserInput && i3.ybase !== i3.ydisp && this._onRequestScrollToBottom.fire(), t3 && this._onUserInput.fire(), this._logService.debug(`sending data "${e3}"`, () => e3.split("").map((e4) => e4.charCodeAt(0))), this._onData.fire(e3);
        }
        triggerBinaryEvent(e3) {
          this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e3}"`, () => e3.split("").map((e4) => e4.charCodeAt(0))), this._onBinary.fire(e3));
        }
      };
      t2.CoreService = d = s2([r(0, h.IBufferService), r(1, h.ILogService), r(2, h.IOptionsService)], d);
    }, 9074: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.DecorationService = undefined;
      const s2 = i2(8055), r = i2(8460), n = i2(844), o = i2(6106);
      let a = 0, h = 0;

      class c extends n.Disposable {
        get decorations() {
          return this._decorations.values();
        }
        constructor() {
          super(), this._decorations = new o.SortedList((e3) => e3?.marker.line), this._onDecorationRegistered = this.register(new r.EventEmitter), this.onDecorationRegistered = this._onDecorationRegistered.event, this._onDecorationRemoved = this.register(new r.EventEmitter), this.onDecorationRemoved = this._onDecorationRemoved.event, this.register((0, n.toDisposable)(() => this.reset()));
        }
        registerDecoration(e3) {
          if (e3.marker.isDisposed)
            return;
          const t3 = new l(e3);
          if (t3) {
            const e4 = t3.marker.onDispose(() => t3.dispose());
            t3.onDispose(() => {
              t3 && (this._decorations.delete(t3) && this._onDecorationRemoved.fire(t3), e4.dispose());
            }), this._decorations.insert(t3), this._onDecorationRegistered.fire(t3);
          }
          return t3;
        }
        reset() {
          for (const e3 of this._decorations.values())
            e3.dispose();
          this._decorations.clear();
        }
        *getDecorationsAtCell(e3, t3, i3) {
          let s3 = 0, r2 = 0;
          for (const n2 of this._decorations.getKeyIterator(t3))
            s3 = n2.options.x ?? 0, r2 = s3 + (n2.options.width ?? 1), e3 >= s3 && e3 < r2 && (!i3 || (n2.options.layer ?? "bottom") === i3) && (yield n2);
        }
        forEachDecorationAtCell(e3, t3, i3, s3) {
          this._decorations.forEachByKey(t3, (t4) => {
            a = t4.options.x ?? 0, h = a + (t4.options.width ?? 1), e3 >= a && e3 < h && (!i3 || (t4.options.layer ?? "bottom") === i3) && s3(t4);
          });
        }
      }
      t2.DecorationService = c;

      class l extends n.Disposable {
        get isDisposed() {
          return this._isDisposed;
        }
        get backgroundColorRGB() {
          return this._cachedBg === null && (this.options.backgroundColor ? this._cachedBg = s2.css.toColor(this.options.backgroundColor) : this._cachedBg = undefined), this._cachedBg;
        }
        get foregroundColorRGB() {
          return this._cachedFg === null && (this.options.foregroundColor ? this._cachedFg = s2.css.toColor(this.options.foregroundColor) : this._cachedFg = undefined), this._cachedFg;
        }
        constructor(e3) {
          super(), this.options = e3, this.onRenderEmitter = this.register(new r.EventEmitter), this.onRender = this.onRenderEmitter.event, this._onDispose = this.register(new r.EventEmitter), this.onDispose = this._onDispose.event, this._cachedBg = null, this._cachedFg = null, this.marker = e3.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
        }
        dispose() {
          this._onDispose.fire(), super.dispose();
        }
      }
    }, 4348: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.InstantiationService = t2.ServiceCollection = undefined;
      const s2 = i2(2585), r = i2(8343);

      class n {
        constructor(...e3) {
          this._entries = new Map;
          for (const [t3, i3] of e3)
            this.set(t3, i3);
        }
        set(e3, t3) {
          const i3 = this._entries.get(e3);
          return this._entries.set(e3, t3), i3;
        }
        forEach(e3) {
          for (const [t3, i3] of this._entries.entries())
            e3(t3, i3);
        }
        has(e3) {
          return this._entries.has(e3);
        }
        get(e3) {
          return this._entries.get(e3);
        }
      }
      t2.ServiceCollection = n, t2.InstantiationService = class {
        constructor() {
          this._services = new n, this._services.set(s2.IInstantiationService, this);
        }
        setService(e3, t3) {
          this._services.set(e3, t3);
        }
        getService(e3) {
          return this._services.get(e3);
        }
        createInstance(e3, ...t3) {
          const i3 = (0, r.getServiceDependencies)(e3).sort((e4, t4) => e4.index - t4.index), s3 = [];
          for (const t4 of i3) {
            const i4 = this._services.get(t4.id);
            if (!i4)
              throw new Error(`[createInstance] ${e3.name} depends on UNKNOWN service ${t4.id}.`);
            s3.push(i4);
          }
          const n2 = i3.length > 0 ? i3[0].index : t3.length;
          if (t3.length !== n2)
            throw new Error(`[createInstance] First service dependency of ${e3.name} at position ${n2 + 1} conflicts with ${t3.length} static arguments`);
          return new e3(...[...t3, ...s3]);
        }
      };
    }, 7866: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a2 = e3.length - 1;a2 >= 0; a2--)
            (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.traceCall = t2.setTraceLogger = t2.LogService = undefined;
      const n = i2(844), o = i2(2585), a = { trace: o.LogLevelEnum.TRACE, debug: o.LogLevelEnum.DEBUG, info: o.LogLevelEnum.INFO, warn: o.LogLevelEnum.WARN, error: o.LogLevelEnum.ERROR, off: o.LogLevelEnum.OFF };
      let h, c = t2.LogService = class extends n.Disposable {
        get logLevel() {
          return this._logLevel;
        }
        constructor(e3) {
          super(), this._optionsService = e3, this._logLevel = o.LogLevelEnum.OFF, this._updateLogLevel(), this.register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel())), h = this;
        }
        _updateLogLevel() {
          this._logLevel = a[this._optionsService.rawOptions.logLevel];
        }
        _evalLazyOptionalParams(e3) {
          for (let t3 = 0;t3 < e3.length; t3++)
            typeof e3[t3] == "function" && (e3[t3] = e3[t3]());
        }
        _log(e3, t3, i3) {
          this._evalLazyOptionalParams(i3), e3.call(console, (this._optionsService.options.logger ? "" : "xterm.js: ") + t3, ...i3);
        }
        trace(e3, ...t3) {
          this._logLevel <= o.LogLevelEnum.TRACE && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e3, t3);
        }
        debug(e3, ...t3) {
          this._logLevel <= o.LogLevelEnum.DEBUG && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e3, t3);
        }
        info(e3, ...t3) {
          this._logLevel <= o.LogLevelEnum.INFO && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e3, t3);
        }
        warn(e3, ...t3) {
          this._logLevel <= o.LogLevelEnum.WARN && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e3, t3);
        }
        error(e3, ...t3) {
          this._logLevel <= o.LogLevelEnum.ERROR && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e3, t3);
        }
      };
      t2.LogService = c = s2([r(0, o.IOptionsService)], c), t2.setTraceLogger = function(e3) {
        h = e3;
      }, t2.traceCall = function(e3, t3, i3) {
        if (typeof i3.value != "function")
          throw new Error("not supported");
        const s3 = i3.value;
        i3.value = function(...e4) {
          if (h.logLevel !== o.LogLevelEnum.TRACE)
            return s3.apply(this, e4);
          h.trace(`GlyphRenderer#${s3.name}(${e4.map((e5) => JSON.stringify(e5)).join(", ")})`);
          const t4 = s3.apply(this, e4);
          return h.trace(`GlyphRenderer#${s3.name} return`, t4), t4;
        };
      };
    }, 7302: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.OptionsService = t2.DEFAULT_OPTIONS = undefined;
      const s2 = i2(8460), r = i2(844), n = i2(6114);
      t2.DEFAULT_OPTIONS = { cols: 80, rows: 24, cursorBlink: false, cursorStyle: "block", cursorWidth: 1, cursorInactiveStyle: "outline", customGlyphs: true, drawBoldTextInBrightColors: true, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "courier-new, courier, monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", ignoreBracketedPasteMode: false, lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", logger: null, scrollback: 1000, scrollOnUserInput: true, scrollSensitivity: 1, screenReaderMode: false, smoothScrollDuration: 0, macOptionIsMeta: false, macOptionClickForcesSelection: false, minimumContrastRatio: 1, disableStdin: false, allowProposedApi: false, allowTransparency: false, tabStopWidth: 8, theme: {}, rightClickSelectsWord: n.isMac, windowOptions: {}, windowsMode: false, windowsPty: {}, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: true, convertEol: false, termName: "xterm", cancelEvents: false, overviewRulerWidth: 0 };
      const o = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

      class a extends r.Disposable {
        constructor(e3) {
          super(), this._onOptionChange = this.register(new s2.EventEmitter), this.onOptionChange = this._onOptionChange.event;
          const i3 = { ...t2.DEFAULT_OPTIONS };
          for (const t3 in e3)
            if (t3 in i3)
              try {
                const s3 = e3[t3];
                i3[t3] = this._sanitizeAndValidateOption(t3, s3);
              } catch (e4) {
                console.error(e4);
              }
          this.rawOptions = i3, this.options = { ...i3 }, this._setupOptions();
        }
        onSpecificOptionChange(e3, t3) {
          return this.onOptionChange((i3) => {
            i3 === e3 && t3(this.rawOptions[e3]);
          });
        }
        onMultipleOptionChange(e3, t3) {
          return this.onOptionChange((i3) => {
            e3.indexOf(i3) !== -1 && t3();
          });
        }
        _setupOptions() {
          const e3 = (e4) => {
            if (!(e4 in t2.DEFAULT_OPTIONS))
              throw new Error(`No option with key "${e4}"`);
            return this.rawOptions[e4];
          }, i3 = (e4, i4) => {
            if (!(e4 in t2.DEFAULT_OPTIONS))
              throw new Error(`No option with key "${e4}"`);
            i4 = this._sanitizeAndValidateOption(e4, i4), this.rawOptions[e4] !== i4 && (this.rawOptions[e4] = i4, this._onOptionChange.fire(e4));
          };
          for (const t3 in this.rawOptions) {
            const s3 = { get: e3.bind(this, t3), set: i3.bind(this, t3) };
            Object.defineProperty(this.options, t3, s3);
          }
        }
        _sanitizeAndValidateOption(e3, i3) {
          switch (e3) {
            case "cursorStyle":
              if (i3 || (i3 = t2.DEFAULT_OPTIONS[e3]), !function(e4) {
                return e4 === "block" || e4 === "underline" || e4 === "bar";
              }(i3))
                throw new Error(`"${i3}" is not a valid value for ${e3}`);
              break;
            case "wordSeparator":
              i3 || (i3 = t2.DEFAULT_OPTIONS[e3]);
              break;
            case "fontWeight":
            case "fontWeightBold":
              if (typeof i3 == "number" && 1 <= i3 && i3 <= 1000)
                break;
              i3 = o.includes(i3) ? i3 : t2.DEFAULT_OPTIONS[e3];
              break;
            case "cursorWidth":
              i3 = Math.floor(i3);
            case "lineHeight":
            case "tabStopWidth":
              if (i3 < 1)
                throw new Error(`${e3} cannot be less than 1, value: ${i3}`);
              break;
            case "minimumContrastRatio":
              i3 = Math.max(1, Math.min(21, Math.round(10 * i3) / 10));
              break;
            case "scrollback":
              if ((i3 = Math.min(i3, 4294967295)) < 0)
                throw new Error(`${e3} cannot be less than 0, value: ${i3}`);
              break;
            case "fastScrollSensitivity":
            case "scrollSensitivity":
              if (i3 <= 0)
                throw new Error(`${e3} cannot be less than or equal to 0, value: ${i3}`);
              break;
            case "rows":
            case "cols":
              if (!i3 && i3 !== 0)
                throw new Error(`${e3} must be numeric, value: ${i3}`);
              break;
            case "windowsPty":
              i3 = i3 ?? {};
          }
          return i3;
        }
      }
      t2.OptionsService = a;
    }, 2660: function(e2, t2, i2) {
      var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
        var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : s3 === null ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          o2 = Reflect.decorate(e3, t3, i3, s3);
        else
          for (var a = e3.length - 1;a >= 0; a--)
            (r2 = e3[a]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
        return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
      }, r = this && this.__param || function(e3, t3) {
        return function(i3, s3) {
          t3(i3, s3, e3);
        };
      };
      Object.defineProperty(t2, "__esModule", { value: true }), t2.OscLinkService = undefined;
      const n = i2(2585);
      let o = t2.OscLinkService = class {
        constructor(e3) {
          this._bufferService = e3, this._nextId = 1, this._entriesWithId = new Map, this._dataByLinkId = new Map;
        }
        registerLink(e3) {
          const t3 = this._bufferService.buffer;
          if (e3.id === undefined) {
            const i4 = t3.addMarker(t3.ybase + t3.y), s4 = { data: e3, id: this._nextId++, lines: [i4] };
            return i4.onDispose(() => this._removeMarkerFromLink(s4, i4)), this._dataByLinkId.set(s4.id, s4), s4.id;
          }
          const i3 = e3, s3 = this._getEntryIdKey(i3), r2 = this._entriesWithId.get(s3);
          if (r2)
            return this.addLineToLink(r2.id, t3.ybase + t3.y), r2.id;
          const n2 = t3.addMarker(t3.ybase + t3.y), o2 = { id: this._nextId++, key: this._getEntryIdKey(i3), data: i3, lines: [n2] };
          return n2.onDispose(() => this._removeMarkerFromLink(o2, n2)), this._entriesWithId.set(o2.key, o2), this._dataByLinkId.set(o2.id, o2), o2.id;
        }
        addLineToLink(e3, t3) {
          const i3 = this._dataByLinkId.get(e3);
          if (i3 && i3.lines.every((e4) => e4.line !== t3)) {
            const e4 = this._bufferService.buffer.addMarker(t3);
            i3.lines.push(e4), e4.onDispose(() => this._removeMarkerFromLink(i3, e4));
          }
        }
        getLinkData(e3) {
          return this._dataByLinkId.get(e3)?.data;
        }
        _getEntryIdKey(e3) {
          return `${e3.id};;${e3.uri}`;
        }
        _removeMarkerFromLink(e3, t3) {
          const i3 = e3.lines.indexOf(t3);
          i3 !== -1 && (e3.lines.splice(i3, 1), e3.lines.length === 0 && (e3.data.id !== undefined && this._entriesWithId.delete(e3.key), this._dataByLinkId.delete(e3.id)));
        }
      };
      t2.OscLinkService = o = s2([r(0, n.IBufferService)], o);
    }, 8343: (e2, t2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.createDecorator = t2.getServiceDependencies = t2.serviceRegistry = undefined;
      const i2 = "di$target", s2 = "di$dependencies";
      t2.serviceRegistry = new Map, t2.getServiceDependencies = function(e3) {
        return e3[s2] || [];
      }, t2.createDecorator = function(e3) {
        if (t2.serviceRegistry.has(e3))
          return t2.serviceRegistry.get(e3);
        const r = function(e4, t3, n) {
          if (arguments.length !== 3)
            throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
          (function(e5, t4, r2) {
            t4[i2] === t4 ? t4[s2].push({ id: e5, index: r2 }) : (t4[s2] = [{ id: e5, index: r2 }], t4[i2] = t4);
          })(r, e4, n);
        };
        return r.toString = () => e3, t2.serviceRegistry.set(e3, r), r;
      };
    }, 2585: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.IDecorationService = t2.IUnicodeService = t2.IOscLinkService = t2.IOptionsService = t2.ILogService = t2.LogLevelEnum = t2.IInstantiationService = t2.ICharsetService = t2.ICoreService = t2.ICoreMouseService = t2.IBufferService = undefined;
      const s2 = i2(8343);
      var r;
      t2.IBufferService = (0, s2.createDecorator)("BufferService"), t2.ICoreMouseService = (0, s2.createDecorator)("CoreMouseService"), t2.ICoreService = (0, s2.createDecorator)("CoreService"), t2.ICharsetService = (0, s2.createDecorator)("CharsetService"), t2.IInstantiationService = (0, s2.createDecorator)("InstantiationService"), function(e3) {
        e3[e3.TRACE = 0] = "TRACE", e3[e3.DEBUG = 1] = "DEBUG", e3[e3.INFO = 2] = "INFO", e3[e3.WARN = 3] = "WARN", e3[e3.ERROR = 4] = "ERROR", e3[e3.OFF = 5] = "OFF";
      }(r || (t2.LogLevelEnum = r = {})), t2.ILogService = (0, s2.createDecorator)("LogService"), t2.IOptionsService = (0, s2.createDecorator)("OptionsService"), t2.IOscLinkService = (0, s2.createDecorator)("OscLinkService"), t2.IUnicodeService = (0, s2.createDecorator)("UnicodeService"), t2.IDecorationService = (0, s2.createDecorator)("DecorationService");
    }, 1480: (e2, t2, i2) => {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.UnicodeService = undefined;
      const s2 = i2(8460), r = i2(225);

      class n {
        static extractShouldJoin(e3) {
          return (1 & e3) != 0;
        }
        static extractWidth(e3) {
          return e3 >> 1 & 3;
        }
        static extractCharKind(e3) {
          return e3 >> 3;
        }
        static createPropertyValue(e3, t3, i3 = false) {
          return (16777215 & e3) << 3 | (3 & t3) << 1 | (i3 ? 1 : 0);
        }
        constructor() {
          this._providers = Object.create(null), this._active = "", this._onChange = new s2.EventEmitter, this.onChange = this._onChange.event;
          const e3 = new r.UnicodeV6;
          this.register(e3), this._active = e3.version, this._activeProvider = e3;
        }
        dispose() {
          this._onChange.dispose();
        }
        get versions() {
          return Object.keys(this._providers);
        }
        get activeVersion() {
          return this._active;
        }
        set activeVersion(e3) {
          if (!this._providers[e3])
            throw new Error(`unknown Unicode version "${e3}"`);
          this._active = e3, this._activeProvider = this._providers[e3], this._onChange.fire(e3);
        }
        register(e3) {
          this._providers[e3.version] = e3;
        }
        wcwidth(e3) {
          return this._activeProvider.wcwidth(e3);
        }
        getStringCellWidth(e3) {
          let t3 = 0, i3 = 0;
          const s3 = e3.length;
          for (let r2 = 0;r2 < s3; ++r2) {
            let o = e3.charCodeAt(r2);
            if (55296 <= o && o <= 56319) {
              if (++r2 >= s3)
                return t3 + this.wcwidth(o);
              const i4 = e3.charCodeAt(r2);
              56320 <= i4 && i4 <= 57343 ? o = 1024 * (o - 55296) + i4 - 56320 + 65536 : t3 += this.wcwidth(i4);
            }
            const a = this.charProperties(o, i3);
            let h = n.extractWidth(a);
            n.extractShouldJoin(a) && (h -= n.extractWidth(i3)), t3 += h, i3 = a;
          }
          return t3;
        }
        charProperties(e3, t3) {
          return this._activeProvider.charProperties(e3, t3);
        }
      }
      t2.UnicodeService = n;
    } }, t = {};
    function i(s2) {
      var r = t[s2];
      if (r !== undefined)
        return r.exports;
      var n = t[s2] = { exports: {} };
      return e[s2].call(n.exports, n, n.exports, i), n.exports;
    }
    var s = {};
    return (() => {
      var e2 = s;
      Object.defineProperty(e2, "__esModule", { value: true }), e2.Terminal = undefined;
      const t2 = i(9042), r = i(3236), n = i(844), o = i(5741), a = i(8285), h = i(7975), c = i(7090), l = ["cols", "rows"];

      class d extends n.Disposable {
        constructor(e3) {
          super(), this._core = this.register(new r.Terminal(e3)), this._addonManager = this.register(new o.AddonManager), this._publicOptions = { ...this._core.options };
          const t3 = (e4) => this._core.options[e4], i2 = (e4, t4) => {
            this._checkReadonlyOptions(e4), this._core.options[e4] = t4;
          };
          for (const e4 in this._core.options) {
            const s2 = { get: t3.bind(this, e4), set: i2.bind(this, e4) };
            Object.defineProperty(this._publicOptions, e4, s2);
          }
        }
        _checkReadonlyOptions(e3) {
          if (l.includes(e3))
            throw new Error(`Option "${e3}" can only be set in the constructor`);
        }
        _checkProposedApi() {
          if (!this._core.optionsService.rawOptions.allowProposedApi)
            throw new Error("You must set the allowProposedApi option to true to use proposed API");
        }
        get onBell() {
          return this._core.onBell;
        }
        get onBinary() {
          return this._core.onBinary;
        }
        get onCursorMove() {
          return this._core.onCursorMove;
        }
        get onData() {
          return this._core.onData;
        }
        get onKey() {
          return this._core.onKey;
        }
        get onLineFeed() {
          return this._core.onLineFeed;
        }
        get onRender() {
          return this._core.onRender;
        }
        get onResize() {
          return this._core.onResize;
        }
        get onScroll() {
          return this._core.onScroll;
        }
        get onSelectionChange() {
          return this._core.onSelectionChange;
        }
        get onTitleChange() {
          return this._core.onTitleChange;
        }
        get onWriteParsed() {
          return this._core.onWriteParsed;
        }
        get element() {
          return this._core.element;
        }
        get parser() {
          return this._parser || (this._parser = new h.ParserApi(this._core)), this._parser;
        }
        get unicode() {
          return this._checkProposedApi(), new c.UnicodeApi(this._core);
        }
        get textarea() {
          return this._core.textarea;
        }
        get rows() {
          return this._core.rows;
        }
        get cols() {
          return this._core.cols;
        }
        get buffer() {
          return this._buffer || (this._buffer = this.register(new a.BufferNamespaceApi(this._core))), this._buffer;
        }
        get markers() {
          return this._checkProposedApi(), this._core.markers;
        }
        get modes() {
          const e3 = this._core.coreService.decPrivateModes;
          let t3 = "none";
          switch (this._core.coreMouseService.activeProtocol) {
            case "X10":
              t3 = "x10";
              break;
            case "VT200":
              t3 = "vt200";
              break;
            case "DRAG":
              t3 = "drag";
              break;
            case "ANY":
              t3 = "any";
          }
          return { applicationCursorKeysMode: e3.applicationCursorKeys, applicationKeypadMode: e3.applicationKeypad, bracketedPasteMode: e3.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: t3, originMode: e3.origin, reverseWraparoundMode: e3.reverseWraparound, sendFocusMode: e3.sendFocus, wraparoundMode: e3.wraparound };
        }
        get options() {
          return this._publicOptions;
        }
        set options(e3) {
          for (const t3 in e3)
            this._publicOptions[t3] = e3[t3];
        }
        blur() {
          this._core.blur();
        }
        focus() {
          this._core.focus();
        }
        resize(e3, t3) {
          this._verifyIntegers(e3, t3), this._core.resize(e3, t3);
        }
        open(e3) {
          this._core.open(e3);
        }
        attachCustomKeyEventHandler(e3) {
          this._core.attachCustomKeyEventHandler(e3);
        }
        registerLinkProvider(e3) {
          return this._core.registerLinkProvider(e3);
        }
        registerCharacterJoiner(e3) {
          return this._checkProposedApi(), this._core.registerCharacterJoiner(e3);
        }
        deregisterCharacterJoiner(e3) {
          this._checkProposedApi(), this._core.deregisterCharacterJoiner(e3);
        }
        registerMarker(e3 = 0) {
          return this._verifyIntegers(e3), this._core.registerMarker(e3);
        }
        registerDecoration(e3) {
          return this._checkProposedApi(), this._verifyPositiveIntegers(e3.x ?? 0, e3.width ?? 0, e3.height ?? 0), this._core.registerDecoration(e3);
        }
        hasSelection() {
          return this._core.hasSelection();
        }
        select(e3, t3, i2) {
          this._verifyIntegers(e3, t3, i2), this._core.select(e3, t3, i2);
        }
        getSelection() {
          return this._core.getSelection();
        }
        getSelectionPosition() {
          return this._core.getSelectionPosition();
        }
        clearSelection() {
          this._core.clearSelection();
        }
        selectAll() {
          this._core.selectAll();
        }
        selectLines(e3, t3) {
          this._verifyIntegers(e3, t3), this._core.selectLines(e3, t3);
        }
        dispose() {
          super.dispose();
        }
        scrollLines(e3) {
          this._verifyIntegers(e3), this._core.scrollLines(e3);
        }
        scrollPages(e3) {
          this._verifyIntegers(e3), this._core.scrollPages(e3);
        }
        scrollToTop() {
          this._core.scrollToTop();
        }
        scrollToBottom() {
          this._core.scrollToBottom();
        }
        scrollToLine(e3) {
          this._verifyIntegers(e3), this._core.scrollToLine(e3);
        }
        clear() {
          this._core.clear();
        }
        write(e3, t3) {
          this._core.write(e3, t3);
        }
        writeln(e3, t3) {
          this._core.write(e3), this._core.write("\r\n", t3);
        }
        paste(e3) {
          this._core.paste(e3);
        }
        refresh(e3, t3) {
          this._verifyIntegers(e3, t3), this._core.refresh(e3, t3);
        }
        reset() {
          this._core.reset();
        }
        clearTextureAtlas() {
          this._core.clearTextureAtlas();
        }
        loadAddon(e3) {
          this._addonManager.loadAddon(this, e3);
        }
        static get strings() {
          return t2;
        }
        _verifyIntegers(...e3) {
          for (const t3 of e3)
            if (t3 === 1 / 0 || isNaN(t3) || t3 % 1 != 0)
              throw new Error("This API only accepts integers");
        }
        _verifyPositiveIntegers(...e3) {
          for (const t3 of e3)
            if (t3 && (t3 === 1 / 0 || isNaN(t3) || t3 % 1 != 0 || t3 < 0))
              throw new Error("This API only accepts positive integers");
        }
      }
      e2.Terminal = d;
    })(), s;
  })());
});

// node_modules/xterm-addon-fit/lib/xterm-addon-fit.js
var require_xterm_addon_fit = __commonJS((exports, module) => {
  (function(e, t) {
    typeof exports == "object" && typeof module == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define([], t) : typeof exports == "object" ? exports.FitAddon = t() : e.FitAddon = t();
  })(self, () => (() => {
    var e = {};
    return (() => {
      var t = e;
      Object.defineProperty(t, "__esModule", { value: true }), t.FitAddon = undefined, t.FitAddon = class {
        activate(e2) {
          this._terminal = e2;
        }
        dispose() {
        }
        fit() {
          const e2 = this.proposeDimensions();
          if (!e2 || !this._terminal || isNaN(e2.cols) || isNaN(e2.rows))
            return;
          const t2 = this._terminal._core;
          this._terminal.rows === e2.rows && this._terminal.cols === e2.cols || (t2._renderService.clear(), this._terminal.resize(e2.cols, e2.rows));
        }
        proposeDimensions() {
          if (!this._terminal)
            return;
          if (!this._terminal.element || !this._terminal.element.parentElement)
            return;
          const e2 = this._terminal._core, t2 = e2._renderService.dimensions;
          if (t2.css.cell.width === 0 || t2.css.cell.height === 0)
            return;
          const r = this._terminal.options.scrollback === 0 ? 0 : e2.viewport.scrollBarWidth, i = window.getComputedStyle(this._terminal.element.parentElement), o = parseInt(i.getPropertyValue("height")), s = Math.max(0, parseInt(i.getPropertyValue("width"))), n = window.getComputedStyle(this._terminal.element), l = o - (parseInt(n.getPropertyValue("padding-top")) + parseInt(n.getPropertyValue("padding-bottom"))), a = s - (parseInt(n.getPropertyValue("padding-right")) + parseInt(n.getPropertyValue("padding-left"))) - r;
          return { cols: Math.max(2, Math.floor(a / t2.css.cell.width)), rows: Math.max(1, Math.floor(l / t2.css.cell.height)) };
        }
      };
    })(), e;
  })());
});

// node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js
var findSubmitterFromClickTarget = function(target) {
  const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
  const candidate = element ? element.closest("input, button") : null;
  return (candidate === null || candidate === undefined ? undefined : candidate.type) == "submit" ? candidate : null;
};
var clickCaptured = function(event2) {
  const submitter = findSubmitterFromClickTarget(event2.target);
  if (submitter && submitter.form) {
    submittersByForm.set(submitter.form, submitter);
  }
};
var frameLoadingStyleFromString = function(style) {
  switch (style.toLowerCase()) {
    case "lazy":
      return FrameLoadingStyle.lazy;
    default:
      return FrameLoadingStyle.eager;
  }
};
var expandURL = function(locatable) {
  return new URL(locatable.toString(), document.baseURI);
};
var getAnchor = function(url) {
  let anchorMatch;
  if (url.hash) {
    return url.hash.slice(1);
  } else if (anchorMatch = url.href.match(/#(.*)$/)) {
    return anchorMatch[1];
  }
};
var getAction = function(form, submitter) {
  const action = (submitter === null || submitter === undefined ? undefined : submitter.getAttribute("formaction")) || form.getAttribute("action") || form.action;
  return expandURL(action);
};
var getExtension = function(url) {
  return (getLastPathComponent(url).match(/\.[^.]*$/) || [])[0] || "";
};
var isHTML = function(url) {
  return !!getExtension(url).match(/^(?:|\.(?:htm|html|xhtml|php))$/);
};
var isPrefixedBy = function(baseURL, url) {
  const prefix = getPrefix(url);
  return baseURL.href === expandURL(prefix).href || baseURL.href.startsWith(prefix);
};
var locationIsVisitable = function(location2, rootLocation) {
  return isPrefixedBy(location2, rootLocation) && isHTML(location2);
};
var getRequestURL = function(url) {
  const anchor = getAnchor(url);
  return anchor != null ? url.href.slice(0, -(anchor.length + 1)) : url.href;
};
var toCacheKey = function(url) {
  return getRequestURL(url);
};
var urlsAreEqual = function(left, right) {
  return expandURL(left).href == expandURL(right).href;
};
var getPathComponents = function(url) {
  return url.pathname.split("/").slice(1);
};
var getLastPathComponent = function(url) {
  return getPathComponents(url).slice(-1)[0];
};
var getPrefix = function(url) {
  return addTrailingSlash(url.origin + url.pathname);
};
var addTrailingSlash = function(value) {
  return value.endsWith("/") ? value : value + "/";
};
var activateScriptElement = function(element) {
  if (element.getAttribute("data-turbo-eval") == "false") {
    return element;
  } else {
    const createdScriptElement = document.createElement("script");
    const cspNonce = getMetaContent("csp-nonce");
    if (cspNonce) {
      createdScriptElement.nonce = cspNonce;
    }
    createdScriptElement.textContent = element.textContent;
    createdScriptElement.async = false;
    copyElementAttributes(createdScriptElement, element);
    return createdScriptElement;
  }
};
var copyElementAttributes = function(destinationElement, sourceElement) {
  for (const { name, value } of sourceElement.attributes) {
    destinationElement.setAttribute(name, value);
  }
};
var createDocumentFragment = function(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
};
var dispatch = function(eventName, { target, cancelable, detail } = {}) {
  const event2 = new CustomEvent(eventName, {
    cancelable,
    bubbles: true,
    composed: true,
    detail
  });
  if (target && target.isConnected) {
    target.dispatchEvent(event2);
  } else {
    document.documentElement.dispatchEvent(event2);
  }
  return event2;
};
var nextAnimationFrame = function() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
};
var nextEventLoopTick = function() {
  return new Promise((resolve) => setTimeout(() => resolve(), 0));
};
var nextMicrotask = function() {
  return Promise.resolve();
};
var parseHTMLDocument = function(html = "") {
  return new DOMParser().parseFromString(html, "text/html");
};
var unindent = function(strings, ...values) {
  const lines = interpolate(strings, values).replace(/^\n/, "").split("\n");
  const match = lines[0].match(/^\s+/);
  const indent = match ? match[0].length : 0;
  return lines.map((line) => line.slice(indent)).join("\n");
};
var interpolate = function(strings, values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] == undefined ? "" : values[i];
    return result + string + value;
  }, "");
};
var uuid = function() {
  return Array.from({ length: 36 }).map((_, i) => {
    if (i == 8 || i == 13 || i == 18 || i == 23) {
      return "-";
    } else if (i == 14) {
      return "4";
    } else if (i == 19) {
      return (Math.floor(Math.random() * 4) + 8).toString(16);
    } else {
      return Math.floor(Math.random() * 15).toString(16);
    }
  }).join("");
};
var getAttribute = function(attributeName, ...elements) {
  for (const value of elements.map((element) => element === null || element === undefined ? undefined : element.getAttribute(attributeName))) {
    if (typeof value == "string")
      return value;
  }
  return null;
};
var hasAttribute = function(attributeName, ...elements) {
  return elements.some((element) => element && element.hasAttribute(attributeName));
};
var markAsBusy = function(...elements) {
  for (const element of elements) {
    if (element.localName == "turbo-frame") {
      element.setAttribute("busy", "");
    }
    element.setAttribute("aria-busy", "true");
  }
};
var clearBusyState = function(...elements) {
  for (const element of elements) {
    if (element.localName == "turbo-frame") {
      element.removeAttribute("busy");
    }
    element.removeAttribute("aria-busy");
  }
};
var waitForLoad = function(element, timeoutInMilliseconds = 2000) {
  return new Promise((resolve) => {
    const onComplete = () => {
      element.removeEventListener("error", onComplete);
      element.removeEventListener("load", onComplete);
      resolve();
    };
    element.addEventListener("load", onComplete, { once: true });
    element.addEventListener("error", onComplete, { once: true });
    setTimeout(resolve, timeoutInMilliseconds);
  });
};
var getHistoryMethodForAction = function(action) {
  switch (action) {
    case "replace":
      return history.replaceState;
    case "advance":
    case "restore":
      return history.pushState;
  }
};
var isAction = function(action) {
  return action == "advance" || action == "replace" || action == "restore";
};
var getVisitAction = function(...elements) {
  const action = getAttribute("data-turbo-action", ...elements);
  return isAction(action) ? action : null;
};
var getMetaElement = function(name) {
  return document.querySelector(`meta[name="${name}"]`);
};
var getMetaContent = function(name) {
  const element = getMetaElement(name);
  return element && element.content;
};
var setMetaContent = function(name, content) {
  let element = getMetaElement(name);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
  return element;
};
var findClosestRecursively = function(element, selector) {
  var _a;
  if (element instanceof Element) {
    return element.closest(selector) || findClosestRecursively(element.assignedSlot || ((_a = element.getRootNode()) === null || _a === undefined ? undefined : _a.host), selector);
  }
};
var fetchMethodFromString = function(method) {
  switch (method.toLowerCase()) {
    case "get":
      return FetchMethod.get;
    case "post":
      return FetchMethod.post;
    case "put":
      return FetchMethod.put;
    case "patch":
      return FetchMethod.patch;
    case "delete":
      return FetchMethod.delete;
  }
};
var importStreamElements = function(fragment) {
  for (const element of fragment.querySelectorAll("turbo-stream")) {
    const streamElement = document.importNode(element, true);
    for (const inertScriptElement of streamElement.templateElement.content.querySelectorAll("script")) {
      inertScriptElement.replaceWith(activateScriptElement(inertScriptElement));
    }
    element.replaceWith(streamElement);
  }
  return fragment;
};
var formEnctypeFromString = function(encoding) {
  switch (encoding.toLowerCase()) {
    case FormEnctype.multipart:
      return FormEnctype.multipart;
    case FormEnctype.plain:
      return FormEnctype.plain;
    default:
      return FormEnctype.urlEncoded;
  }
};
var buildFormData = function(formElement, submitter) {
  const formData = new FormData(formElement);
  const name = submitter === null || submitter === undefined ? undefined : submitter.getAttribute("name");
  const value = submitter === null || submitter === undefined ? undefined : submitter.getAttribute("value");
  if (name) {
    formData.append(name, value || "");
  }
  return formData;
};
var getCookieValue = function(cookieName) {
  if (cookieName != null) {
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    const cookie = cookies.find((cookie2) => cookie2.startsWith(cookieName));
    if (cookie) {
      const value = cookie.split("=").slice(1).join("=");
      return value ? decodeURIComponent(value) : undefined;
    }
  }
};
var responseSucceededWithoutRedirect = function(response) {
  return response.statusCode == 200 && !response.redirected;
};
var mergeFormDataEntries = function(url, entries) {
  const searchParams = new URLSearchParams;
  for (const [name, value] of entries) {
    if (value instanceof File)
      continue;
    searchParams.append(name, value);
  }
  url.search = searchParams.toString();
  return url;
};
var getPermanentElementById = function(node, id) {
  return node.querySelector(`#${id}[data-turbo-permanent]`);
};
var queryPermanentElementsAll = function(node) {
  return node.querySelectorAll("[id][data-turbo-permanent]");
};
var submissionDoesNotDismissDialog = function(form, submitter) {
  const method = (submitter === null || submitter === undefined ? undefined : submitter.getAttribute("formmethod")) || form.getAttribute("method");
  return method != "dialog";
};
var submissionDoesNotTargetIFrame = function(form, submitter) {
  if ((submitter === null || submitter === undefined ? undefined : submitter.hasAttribute("formtarget")) || form.hasAttribute("target")) {
    const target = (submitter === null || submitter === undefined ? undefined : submitter.getAttribute("formtarget")) || form.target;
    for (const element of document.getElementsByName(target)) {
      if (element instanceof HTMLIFrameElement)
        return false;
    }
    return true;
  } else {
    return true;
  }
};
var doesNotTargetIFrame = function(anchor) {
  if (anchor.hasAttribute("target")) {
    for (const element of document.getElementsByName(anchor.target)) {
      if (element instanceof HTMLIFrameElement)
        return false;
    }
    return true;
  } else {
    return true;
  }
};
var createPlaceholderForPermanentElement = function(permanentElement) {
  const element = document.createElement("meta");
  element.setAttribute("name", "turbo-permanent-placeholder");
  element.setAttribute("content", permanentElement.id);
  return element;
};
var elementIsFocusable = function(element) {
  return element && typeof element.focus == "function";
};
var readScrollLogicalPosition = function(value, defaultValue) {
  if (value == "end" || value == "start" || value == "center" || value == "nearest") {
    return value;
  } else {
    return defaultValue;
  }
};
var readScrollBehavior = function(value, defaultValue) {
  if (value == "auto" || value == "smooth") {
    return value;
  } else {
    return defaultValue;
  }
};
var elementType = function(element) {
  if (elementIsScript(element)) {
    return "script";
  } else if (elementIsStylesheet(element)) {
    return "stylesheet";
  }
};
var elementIsTracked = function(element) {
  return element.getAttribute("data-turbo-track") == "reload";
};
var elementIsScript = function(element) {
  const tagName = element.localName;
  return tagName == "script";
};
var elementIsNoscript = function(element) {
  const tagName = element.localName;
  return tagName == "noscript";
};
var elementIsStylesheet = function(element) {
  const tagName = element.localName;
  return tagName == "style" || tagName == "link" && element.getAttribute("rel") == "stylesheet";
};
var elementIsMetaElementWithName = function(element, name) {
  const tagName = element.localName;
  return tagName == "meta" && element.getAttribute("name") == name;
};
var elementWithoutNonce = function(element) {
  if (element.hasAttribute("nonce")) {
    element.setAttribute("nonce", "");
  }
  return element;
};
var isSuccessful = function(statusCode) {
  return statusCode >= 200 && statusCode < 300;
};
var getPermanentElementMapForFragment = function(fragment) {
  const permanentElementsInDocument = queryPermanentElementsAll(document.documentElement);
  const permanentElementMap = {};
  for (const permanentElementInDocument of permanentElementsInDocument) {
    const { id } = permanentElementInDocument;
    for (const streamElement of fragment.querySelectorAll("turbo-stream")) {
      const elementInStream = getPermanentElementById(streamElement.templateElement.content, id);
      if (elementInStream) {
        permanentElementMap[id] = [permanentElementInDocument, elementInStream];
      }
    }
  }
  return permanentElementMap;
};
var fetchResponseFromEvent = function(event2) {
  var _a;
  const fetchResponse = (_a = event2.detail) === null || _a === undefined ? undefined : _a.fetchResponse;
  if (fetchResponse instanceof FetchResponse) {
    return fetchResponse;
  }
};
var fetchResponseIsStream = function(response) {
  var _a;
  const contentType = (_a = response.contentType) !== null && _a !== undefined ? _a : "";
  return contentType.startsWith(StreamMessage.contentType);
};
var extendURLWithDeprecatedProperties = function(url) {
  Object.defineProperties(url, deprecatedLocationPropertyDescriptors);
};
var start = function() {
  session.start();
};
var registerAdapter = function(adapter) {
  session.registerAdapter(adapter);
};
var visit = function(location2, options) {
  session.visit(location2, options);
};
var connectStreamSource = function(source) {
  session.connectStreamSource(source);
};
var disconnectStreamSource = function(source) {
  session.disconnectStreamSource(source);
};
var renderStreamMessage = function(message) {
  session.renderStreamMessage(message);
};
var clearCache = function() {
  console.warn("Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`");
  session.clearCache();
};
var setProgressBarDelay = function(delay) {
  session.setProgressBarDelay(delay);
};
var setConfirmMethod = function(confirmMethod) {
  FormSubmission.confirmMethod = confirmMethod;
};
var setFormMode = function(mode) {
  session.setFormMode(mode);
};
var getFrameElementById = function(id) {
  if (id != null) {
    const element = document.getElementById(id);
    if (element instanceof FrameElement) {
      return element;
    }
  }
};
var activateElement = function(element, currentURL) {
  if (element) {
    const src = element.getAttribute("src");
    if (src != null && currentURL != null && urlsAreEqual(src, currentURL)) {
      throw new Error(`Matching <turbo-frame id="${element.id}"> element has a source URL which references itself`);
    }
    if (element.ownerDocument !== document) {
      element = document.importNode(element, true);
    }
    if (element instanceof FrameElement) {
      element.connectedCallback();
      element.disconnectedCallback();
      return element;
    }
  }
};
(function() {
  if (window.Reflect === undefined || window.customElements === undefined || window.customElements.polyfillWrapFlushCallback) {
    return;
  }
  const BuiltInHTMLElement = HTMLElement;
  const wrapperForTheName = {
    HTMLElement: function HTMLElement() {
      return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
    }
  };
  window.HTMLElement = wrapperForTheName["HTMLElement"];
  HTMLElement.prototype = BuiltInHTMLElement.prototype;
  HTMLElement.prototype.constructor = HTMLElement;
  Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
})();
(function(prototype) {
  if (typeof prototype.requestSubmit == "function")
    return;
  prototype.requestSubmit = function(submitter) {
    if (submitter) {
      validateSubmitter(submitter, this);
      submitter.click();
    } else {
      submitter = document.createElement("input");
      submitter.type = "submit";
      submitter.hidden = true;
      this.appendChild(submitter);
      submitter.click();
      this.removeChild(submitter);
    }
  };
  function validateSubmitter(submitter, form) {
    submitter instanceof HTMLElement || raise(TypeError, "parameter 1 is not of type 'HTMLElement'");
    submitter.type == "submit" || raise(TypeError, "The specified element is not a submit button");
    submitter.form == form || raise(DOMException, "The specified element is not owned by this form element", "NotFoundError");
  }
  function raise(errorConstructor, message, name) {
    throw new errorConstructor("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + message + ".", name);
  }
})(HTMLFormElement.prototype);
var submittersByForm = new WeakMap;
(function() {
  if ("submitter" in Event.prototype)
    return;
  let prototype = window.Event.prototype;
  if (("SubmitEvent" in window) && /Apple Computer/.test(navigator.vendor)) {
    prototype = window.SubmitEvent.prototype;
  } else if ("SubmitEvent" in window) {
    return;
  }
  addEventListener("click", clickCaptured, true);
  Object.defineProperty(prototype, "submitter", {
    get() {
      if (this.type == "submit" && this.target instanceof HTMLFormElement) {
        return submittersByForm.get(this.target);
      }
    }
  });
})();
var FrameLoadingStyle;
(function(FrameLoadingStyle2) {
  FrameLoadingStyle2["eager"] = "eager";
  FrameLoadingStyle2["lazy"] = "lazy";
})(FrameLoadingStyle || (FrameLoadingStyle = {}));

class FrameElement extends HTMLElement {
  static get observedAttributes() {
    return ["disabled", "complete", "loading", "src"];
  }
  constructor() {
    super();
    this.loaded = Promise.resolve();
    this.delegate = new FrameElement.delegateConstructor(this);
  }
  connectedCallback() {
    this.delegate.connect();
  }
  disconnectedCallback() {
    this.delegate.disconnect();
  }
  reload() {
    return this.delegate.sourceURLReloaded();
  }
  attributeChangedCallback(name) {
    if (name == "loading") {
      this.delegate.loadingStyleChanged();
    } else if (name == "complete") {
      this.delegate.completeChanged();
    } else if (name == "src") {
      this.delegate.sourceURLChanged();
    } else {
      this.delegate.disabledChanged();
    }
  }
  get src() {
    return this.getAttribute("src");
  }
  set src(value) {
    if (value) {
      this.setAttribute("src", value);
    } else {
      this.removeAttribute("src");
    }
  }
  get loading() {
    return frameLoadingStyleFromString(this.getAttribute("loading") || "");
  }
  set loading(value) {
    if (value) {
      this.setAttribute("loading", value);
    } else {
      this.removeAttribute("loading");
    }
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(value) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  get autoscroll() {
    return this.hasAttribute("autoscroll");
  }
  set autoscroll(value) {
    if (value) {
      this.setAttribute("autoscroll", "");
    } else {
      this.removeAttribute("autoscroll");
    }
  }
  get complete() {
    return !this.delegate.isLoading;
  }
  get isActive() {
    return this.ownerDocument === document && !this.isPreview;
  }
  get isPreview() {
    var _a, _b;
    return (_b = (_a = this.ownerDocument) === null || _a === undefined ? undefined : _a.documentElement) === null || _b === undefined ? undefined : _b.hasAttribute("data-turbo-preview");
  }
}

class FetchResponse {
  constructor(response) {
    this.response = response;
  }
  get succeeded() {
    return this.response.ok;
  }
  get failed() {
    return !this.succeeded;
  }
  get clientError() {
    return this.statusCode >= 400 && this.statusCode <= 499;
  }
  get serverError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
  get redirected() {
    return this.response.redirected;
  }
  get location() {
    return expandURL(this.response.url);
  }
  get isHTML() {
    return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/);
  }
  get statusCode() {
    return this.response.status;
  }
  get contentType() {
    return this.header("Content-Type");
  }
  get responseText() {
    return this.response.clone().text();
  }
  get responseHTML() {
    if (this.isHTML) {
      return this.response.clone().text();
    } else {
      return Promise.resolve(undefined);
    }
  }
  header(name) {
    return this.response.headers.get(name);
  }
}
var FetchMethod;
(function(FetchMethod2) {
  FetchMethod2[FetchMethod2["get"] = 0] = "get";
  FetchMethod2[FetchMethod2["post"] = 1] = "post";
  FetchMethod2[FetchMethod2["put"] = 2] = "put";
  FetchMethod2[FetchMethod2["patch"] = 3] = "patch";
  FetchMethod2[FetchMethod2["delete"] = 4] = "delete";
})(FetchMethod || (FetchMethod = {}));

class FetchRequest {
  constructor(delegate, method, location2, body = new URLSearchParams, target = null) {
    this.abortController = new AbortController;
    this.resolveRequestPromise = (_value) => {
    };
    this.delegate = delegate;
    this.method = method;
    this.headers = this.defaultHeaders;
    this.body = body;
    this.url = location2;
    this.target = target;
  }
  get location() {
    return this.url;
  }
  get params() {
    return this.url.searchParams;
  }
  get entries() {
    return this.body ? Array.from(this.body.entries()) : [];
  }
  cancel() {
    this.abortController.abort();
  }
  async perform() {
    const { fetchOptions } = this;
    this.delegate.prepareRequest(this);
    await this.allowRequestToBeIntercepted(fetchOptions);
    try {
      this.delegate.requestStarted(this);
      const response = await fetch(this.url.href, fetchOptions);
      return await this.receive(response);
    } catch (error) {
      if (error.name !== "AbortError") {
        if (this.willDelegateErrorHandling(error)) {
          this.delegate.requestErrored(this, error);
        }
        throw error;
      }
    } finally {
      this.delegate.requestFinished(this);
    }
  }
  async receive(response) {
    const fetchResponse = new FetchResponse(response);
    const event2 = dispatch("turbo:before-fetch-response", {
      cancelable: true,
      detail: { fetchResponse },
      target: this.target
    });
    if (event2.defaultPrevented) {
      this.delegate.requestPreventedHandlingResponse(this, fetchResponse);
    } else if (fetchResponse.succeeded) {
      this.delegate.requestSucceededWithResponse(this, fetchResponse);
    } else {
      this.delegate.requestFailedWithResponse(this, fetchResponse);
    }
    return fetchResponse;
  }
  get fetchOptions() {
    var _a;
    return {
      method: FetchMethod[this.method].toUpperCase(),
      credentials: "same-origin",
      headers: this.headers,
      redirect: "follow",
      body: this.isSafe ? null : this.body,
      signal: this.abortSignal,
      referrer: (_a = this.delegate.referrer) === null || _a === undefined ? undefined : _a.href
    };
  }
  get defaultHeaders() {
    return {
      Accept: "text/html, application/xhtml+xml"
    };
  }
  get isSafe() {
    return this.method === FetchMethod.get;
  }
  get abortSignal() {
    return this.abortController.signal;
  }
  acceptResponseType(mimeType) {
    this.headers["Accept"] = [mimeType, this.headers["Accept"]].join(", ");
  }
  async allowRequestToBeIntercepted(fetchOptions) {
    const requestInterception = new Promise((resolve) => this.resolveRequestPromise = resolve);
    const event2 = dispatch("turbo:before-fetch-request", {
      cancelable: true,
      detail: {
        fetchOptions,
        url: this.url,
        resume: this.resolveRequestPromise
      },
      target: this.target
    });
    if (event2.defaultPrevented)
      await requestInterception;
  }
  willDelegateErrorHandling(error) {
    const event2 = dispatch("turbo:fetch-request-error", {
      target: this.target,
      cancelable: true,
      detail: { request: this, error }
    });
    return !event2.defaultPrevented;
  }
}

class AppearanceObserver {
  constructor(delegate, element) {
    this.started = false;
    this.intersect = (entries) => {
      const lastEntry = entries.slice(-1)[0];
      if (lastEntry === null || lastEntry === undefined ? undefined : lastEntry.isIntersecting) {
        this.delegate.elementAppearedInViewport(this.element);
      }
    };
    this.delegate = delegate;
    this.element = element;
    this.intersectionObserver = new IntersectionObserver(this.intersect);
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.intersectionObserver.observe(this.element);
    }
  }
  stop() {
    if (this.started) {
      this.started = false;
      this.intersectionObserver.unobserve(this.element);
    }
  }
}

class StreamMessage {
  static wrap(message) {
    if (typeof message == "string") {
      return new this(createDocumentFragment(message));
    } else {
      return message;
    }
  }
  constructor(fragment) {
    this.fragment = importStreamElements(fragment);
  }
}
StreamMessage.contentType = "text/vnd.turbo-stream.html";
var FormSubmissionState;
(function(FormSubmissionState2) {
  FormSubmissionState2[FormSubmissionState2["initialized"] = 0] = "initialized";
  FormSubmissionState2[FormSubmissionState2["requesting"] = 1] = "requesting";
  FormSubmissionState2[FormSubmissionState2["waiting"] = 2] = "waiting";
  FormSubmissionState2[FormSubmissionState2["receiving"] = 3] = "receiving";
  FormSubmissionState2[FormSubmissionState2["stopping"] = 4] = "stopping";
  FormSubmissionState2[FormSubmissionState2["stopped"] = 5] = "stopped";
})(FormSubmissionState || (FormSubmissionState = {}));
var FormEnctype;
(function(FormEnctype2) {
  FormEnctype2["urlEncoded"] = "application/x-www-form-urlencoded";
  FormEnctype2["multipart"] = "multipart/form-data";
  FormEnctype2["plain"] = "text/plain";
})(FormEnctype || (FormEnctype = {}));

class FormSubmission {
  static confirmMethod(message, _element, _submitter) {
    return Promise.resolve(confirm(message));
  }
  constructor(delegate, formElement, submitter, mustRedirect = false) {
    this.state = FormSubmissionState.initialized;
    this.delegate = delegate;
    this.formElement = formElement;
    this.submitter = submitter;
    this.formData = buildFormData(formElement, submitter);
    this.location = expandURL(this.action);
    if (this.method == FetchMethod.get) {
      mergeFormDataEntries(this.location, [...this.body.entries()]);
    }
    this.fetchRequest = new FetchRequest(this, this.method, this.location, this.body, this.formElement);
    this.mustRedirect = mustRedirect;
  }
  get method() {
    var _a;
    const method = ((_a = this.submitter) === null || _a === undefined ? undefined : _a.getAttribute("formmethod")) || this.formElement.getAttribute("method") || "";
    return fetchMethodFromString(method.toLowerCase()) || FetchMethod.get;
  }
  get action() {
    var _a;
    const formElementAction = typeof this.formElement.action === "string" ? this.formElement.action : null;
    if ((_a = this.submitter) === null || _a === undefined ? undefined : _a.hasAttribute("formaction")) {
      return this.submitter.getAttribute("formaction") || "";
    } else {
      return this.formElement.getAttribute("action") || formElementAction || "";
    }
  }
  get body() {
    if (this.enctype == FormEnctype.urlEncoded || this.method == FetchMethod.get) {
      return new URLSearchParams(this.stringFormData);
    } else {
      return this.formData;
    }
  }
  get enctype() {
    var _a;
    return formEnctypeFromString(((_a = this.submitter) === null || _a === undefined ? undefined : _a.getAttribute("formenctype")) || this.formElement.enctype);
  }
  get isSafe() {
    return this.fetchRequest.isSafe;
  }
  get stringFormData() {
    return [...this.formData].reduce((entries, [name, value]) => {
      return entries.concat(typeof value == "string" ? [[name, value]] : []);
    }, []);
  }
  async start() {
    const { initialized, requesting } = FormSubmissionState;
    const confirmationMessage = getAttribute("data-turbo-confirm", this.submitter, this.formElement);
    if (typeof confirmationMessage === "string") {
      const answer = await FormSubmission.confirmMethod(confirmationMessage, this.formElement, this.submitter);
      if (!answer) {
        return;
      }
    }
    if (this.state == initialized) {
      this.state = requesting;
      return this.fetchRequest.perform();
    }
  }
  stop() {
    const { stopping, stopped } = FormSubmissionState;
    if (this.state != stopping && this.state != stopped) {
      this.state = stopping;
      this.fetchRequest.cancel();
      return true;
    }
  }
  prepareRequest(request) {
    if (!request.isSafe) {
      const token = getCookieValue(getMetaContent("csrf-param")) || getMetaContent("csrf-token");
      if (token) {
        request.headers["X-CSRF-Token"] = token;
      }
    }
    if (this.requestAcceptsTurboStreamResponse(request)) {
      request.acceptResponseType(StreamMessage.contentType);
    }
  }
  requestStarted(_request) {
    var _a;
    this.state = FormSubmissionState.waiting;
    (_a = this.submitter) === null || _a === undefined || _a.setAttribute("disabled", "");
    this.setSubmitsWith();
    dispatch("turbo:submit-start", {
      target: this.formElement,
      detail: { formSubmission: this }
    });
    this.delegate.formSubmissionStarted(this);
  }
  requestPreventedHandlingResponse(request, response) {
    this.result = { success: response.succeeded, fetchResponse: response };
  }
  requestSucceededWithResponse(request, response) {
    if (response.clientError || response.serverError) {
      this.delegate.formSubmissionFailedWithResponse(this, response);
    } else if (this.requestMustRedirect(request) && responseSucceededWithoutRedirect(response)) {
      const error = new Error("Form responses must redirect to another location");
      this.delegate.formSubmissionErrored(this, error);
    } else {
      this.state = FormSubmissionState.receiving;
      this.result = { success: true, fetchResponse: response };
      this.delegate.formSubmissionSucceededWithResponse(this, response);
    }
  }
  requestFailedWithResponse(request, response) {
    this.result = { success: false, fetchResponse: response };
    this.delegate.formSubmissionFailedWithResponse(this, response);
  }
  requestErrored(request, error) {
    this.result = { success: false, error };
    this.delegate.formSubmissionErrored(this, error);
  }
  requestFinished(_request) {
    var _a;
    this.state = FormSubmissionState.stopped;
    (_a = this.submitter) === null || _a === undefined || _a.removeAttribute("disabled");
    this.resetSubmitterText();
    dispatch("turbo:submit-end", {
      target: this.formElement,
      detail: Object.assign({ formSubmission: this }, this.result)
    });
    this.delegate.formSubmissionFinished(this);
  }
  setSubmitsWith() {
    if (!this.submitter || !this.submitsWith)
      return;
    if (this.submitter.matches("button")) {
      this.originalSubmitText = this.submitter.innerHTML;
      this.submitter.innerHTML = this.submitsWith;
    } else if (this.submitter.matches("input")) {
      const input = this.submitter;
      this.originalSubmitText = input.value;
      input.value = this.submitsWith;
    }
  }
  resetSubmitterText() {
    if (!this.submitter || !this.originalSubmitText)
      return;
    if (this.submitter.matches("button")) {
      this.submitter.innerHTML = this.originalSubmitText;
    } else if (this.submitter.matches("input")) {
      const input = this.submitter;
      input.value = this.originalSubmitText;
    }
  }
  requestMustRedirect(request) {
    return !request.isSafe && this.mustRedirect;
  }
  requestAcceptsTurboStreamResponse(request) {
    return !request.isSafe || hasAttribute("data-turbo-stream", this.submitter, this.formElement);
  }
  get submitsWith() {
    var _a;
    return (_a = this.submitter) === null || _a === undefined ? undefined : _a.getAttribute("data-turbo-submits-with");
  }
}

class Snapshot {
  constructor(element) {
    this.element = element;
  }
  get activeElement() {
    return this.element.ownerDocument.activeElement;
  }
  get children() {
    return [...this.element.children];
  }
  hasAnchor(anchor) {
    return this.getElementForAnchor(anchor) != null;
  }
  getElementForAnchor(anchor) {
    return anchor ? this.element.querySelector(`[id='${anchor}'], a[name='${anchor}']`) : null;
  }
  get isConnected() {
    return this.element.isConnected;
  }
  get firstAutofocusableElement() {
    const inertDisabledOrHidden = "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])";
    for (const element of this.element.querySelectorAll("[autofocus]")) {
      if (element.closest(inertDisabledOrHidden) == null)
        return element;
      else
        continue;
    }
    return null;
  }
  get permanentElements() {
    return queryPermanentElementsAll(this.element);
  }
  getPermanentElementById(id) {
    return getPermanentElementById(this.element, id);
  }
  getPermanentElementMapForSnapshot(snapshot) {
    const permanentElementMap = {};
    for (const currentPermanentElement of this.permanentElements) {
      const { id } = currentPermanentElement;
      const newPermanentElement = snapshot.getPermanentElementById(id);
      if (newPermanentElement) {
        permanentElementMap[id] = [currentPermanentElement, newPermanentElement];
      }
    }
    return permanentElementMap;
  }
}

class FormSubmitObserver {
  constructor(delegate, eventTarget) {
    this.started = false;
    this.submitCaptured = () => {
      this.eventTarget.removeEventListener("submit", this.submitBubbled, false);
      this.eventTarget.addEventListener("submit", this.submitBubbled, false);
    };
    this.submitBubbled = (event2) => {
      if (!event2.defaultPrevented) {
        const form = event2.target instanceof HTMLFormElement ? event2.target : undefined;
        const submitter = event2.submitter || undefined;
        if (form && submissionDoesNotDismissDialog(form, submitter) && submissionDoesNotTargetIFrame(form, submitter) && this.delegate.willSubmitForm(form, submitter)) {
          event2.preventDefault();
          event2.stopImmediatePropagation();
          this.delegate.formSubmitted(form, submitter);
        }
      }
    };
    this.delegate = delegate;
    this.eventTarget = eventTarget;
  }
  start() {
    if (!this.started) {
      this.eventTarget.addEventListener("submit", this.submitCaptured, true);
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      this.eventTarget.removeEventListener("submit", this.submitCaptured, true);
      this.started = false;
    }
  }
}

class View {
  constructor(delegate, element) {
    this.resolveRenderPromise = (_value) => {
    };
    this.resolveInterceptionPromise = (_value) => {
    };
    this.delegate = delegate;
    this.element = element;
  }
  scrollToAnchor(anchor) {
    const element = this.snapshot.getElementForAnchor(anchor);
    if (element) {
      this.scrollToElement(element);
      this.focusElement(element);
    } else {
      this.scrollToPosition({ x: 0, y: 0 });
    }
  }
  scrollToAnchorFromLocation(location2) {
    this.scrollToAnchor(getAnchor(location2));
  }
  scrollToElement(element) {
    element.scrollIntoView();
  }
  focusElement(element) {
    if (element instanceof HTMLElement) {
      if (element.hasAttribute("tabindex")) {
        element.focus();
      } else {
        element.setAttribute("tabindex", "-1");
        element.focus();
        element.removeAttribute("tabindex");
      }
    }
  }
  scrollToPosition({ x, y }) {
    this.scrollRoot.scrollTo(x, y);
  }
  scrollToTop() {
    this.scrollToPosition({ x: 0, y: 0 });
  }
  get scrollRoot() {
    return window;
  }
  async render(renderer) {
    const { isPreview, shouldRender, newSnapshot: snapshot } = renderer;
    if (shouldRender) {
      try {
        this.renderPromise = new Promise((resolve) => this.resolveRenderPromise = resolve);
        this.renderer = renderer;
        await this.prepareToRenderSnapshot(renderer);
        const renderInterception = new Promise((resolve) => this.resolveInterceptionPromise = resolve);
        const options = { resume: this.resolveInterceptionPromise, render: this.renderer.renderElement };
        const immediateRender = this.delegate.allowsImmediateRender(snapshot, options);
        if (!immediateRender)
          await renderInterception;
        await this.renderSnapshot(renderer);
        this.delegate.viewRenderedSnapshot(snapshot, isPreview);
        this.delegate.preloadOnLoadLinksForView(this.element);
        this.finishRenderingSnapshot(renderer);
      } finally {
        delete this.renderer;
        this.resolveRenderPromise(undefined);
        delete this.renderPromise;
      }
    } else {
      this.invalidate(renderer.reloadReason);
    }
  }
  invalidate(reason) {
    this.delegate.viewInvalidated(reason);
  }
  async prepareToRenderSnapshot(renderer) {
    this.markAsPreview(renderer.isPreview);
    await renderer.prepareToRender();
  }
  markAsPreview(isPreview) {
    if (isPreview) {
      this.element.setAttribute("data-turbo-preview", "");
    } else {
      this.element.removeAttribute("data-turbo-preview");
    }
  }
  async renderSnapshot(renderer) {
    await renderer.render();
  }
  finishRenderingSnapshot(renderer) {
    renderer.finishRendering();
  }
}

class FrameView extends View {
  missing() {
    this.element.innerHTML = `<strong class="turbo-frame-error">Content missing</strong>`;
  }
  get snapshot() {
    return new Snapshot(this.element);
  }
}

class LinkInterceptor {
  constructor(delegate, element) {
    this.clickBubbled = (event2) => {
      if (this.respondsToEventTarget(event2.target)) {
        this.clickEvent = event2;
      } else {
        delete this.clickEvent;
      }
    };
    this.linkClicked = (event2) => {
      if (this.clickEvent && this.respondsToEventTarget(event2.target) && event2.target instanceof Element) {
        if (this.delegate.shouldInterceptLinkClick(event2.target, event2.detail.url, event2.detail.originalEvent)) {
          this.clickEvent.preventDefault();
          event2.preventDefault();
          this.delegate.linkClickIntercepted(event2.target, event2.detail.url, event2.detail.originalEvent);
        }
      }
      delete this.clickEvent;
    };
    this.willVisit = (_event) => {
      delete this.clickEvent;
    };
    this.delegate = delegate;
    this.element = element;
  }
  start() {
    this.element.addEventListener("click", this.clickBubbled);
    document.addEventListener("turbo:click", this.linkClicked);
    document.addEventListener("turbo:before-visit", this.willVisit);
  }
  stop() {
    this.element.removeEventListener("click", this.clickBubbled);
    document.removeEventListener("turbo:click", this.linkClicked);
    document.removeEventListener("turbo:before-visit", this.willVisit);
  }
  respondsToEventTarget(target) {
    const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
    return element && element.closest("turbo-frame, html") == this.element;
  }
}

class LinkClickObserver {
  constructor(delegate, eventTarget) {
    this.started = false;
    this.clickCaptured = () => {
      this.eventTarget.removeEventListener("click", this.clickBubbled, false);
      this.eventTarget.addEventListener("click", this.clickBubbled, false);
    };
    this.clickBubbled = (event2) => {
      if (event2 instanceof MouseEvent && this.clickEventIsSignificant(event2)) {
        const target = event2.composedPath && event2.composedPath()[0] || event2.target;
        const link = this.findLinkFromClickTarget(target);
        if (link && doesNotTargetIFrame(link)) {
          const location2 = this.getLocationForLink(link);
          if (this.delegate.willFollowLinkToLocation(link, location2, event2)) {
            event2.preventDefault();
            this.delegate.followedLinkToLocation(link, location2);
          }
        }
      }
    };
    this.delegate = delegate;
    this.eventTarget = eventTarget;
  }
  start() {
    if (!this.started) {
      this.eventTarget.addEventListener("click", this.clickCaptured, true);
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      this.eventTarget.removeEventListener("click", this.clickCaptured, true);
      this.started = false;
    }
  }
  clickEventIsSignificant(event2) {
    return !(event2.target && event2.target.isContentEditable || event2.defaultPrevented || event2.which > 1 || event2.altKey || event2.ctrlKey || event2.metaKey || event2.shiftKey);
  }
  findLinkFromClickTarget(target) {
    return findClosestRecursively(target, "a[href]:not([target^=_]):not([download])");
  }
  getLocationForLink(link) {
    return expandURL(link.getAttribute("href") || "");
  }
}

class FormLinkClickObserver {
  constructor(delegate, element) {
    this.delegate = delegate;
    this.linkInterceptor = new LinkClickObserver(this, element);
  }
  start() {
    this.linkInterceptor.start();
  }
  stop() {
    this.linkInterceptor.stop();
  }
  willFollowLinkToLocation(link, location2, originalEvent) {
    return this.delegate.willSubmitFormLinkToLocation(link, location2, originalEvent) && link.hasAttribute("data-turbo-method");
  }
  followedLinkToLocation(link, location2) {
    const form = document.createElement("form");
    const type = "hidden";
    for (const [name, value] of location2.searchParams) {
      form.append(Object.assign(document.createElement("input"), { type, name, value }));
    }
    const action = Object.assign(location2, { search: "" });
    form.setAttribute("data-turbo", "true");
    form.setAttribute("action", action.href);
    form.setAttribute("hidden", "");
    const method = link.getAttribute("data-turbo-method");
    if (method)
      form.setAttribute("method", method);
    const turboFrame = link.getAttribute("data-turbo-frame");
    if (turboFrame)
      form.setAttribute("data-turbo-frame", turboFrame);
    const turboAction = getVisitAction(link);
    if (turboAction)
      form.setAttribute("data-turbo-action", turboAction);
    const turboConfirm = link.getAttribute("data-turbo-confirm");
    if (turboConfirm)
      form.setAttribute("data-turbo-confirm", turboConfirm);
    const turboStream = link.hasAttribute("data-turbo-stream");
    if (turboStream)
      form.setAttribute("data-turbo-stream", "");
    this.delegate.submittedFormLinkToLocation(link, location2, form);
    document.body.appendChild(form);
    form.addEventListener("turbo:submit-end", () => form.remove(), { once: true });
    requestAnimationFrame(() => form.requestSubmit());
  }
}

class Bardo {
  static async preservingPermanentElements(delegate, permanentElementMap, callback) {
    const bardo = new this(delegate, permanentElementMap);
    bardo.enter();
    await callback();
    bardo.leave();
  }
  constructor(delegate, permanentElementMap) {
    this.delegate = delegate;
    this.permanentElementMap = permanentElementMap;
  }
  enter() {
    for (const id in this.permanentElementMap) {
      const [currentPermanentElement, newPermanentElement] = this.permanentElementMap[id];
      this.delegate.enteringBardo(currentPermanentElement, newPermanentElement);
      this.replaceNewPermanentElementWithPlaceholder(newPermanentElement);
    }
  }
  leave() {
    for (const id in this.permanentElementMap) {
      const [currentPermanentElement] = this.permanentElementMap[id];
      this.replaceCurrentPermanentElementWithClone(currentPermanentElement);
      this.replacePlaceholderWithPermanentElement(currentPermanentElement);
      this.delegate.leavingBardo(currentPermanentElement);
    }
  }
  replaceNewPermanentElementWithPlaceholder(permanentElement) {
    const placeholder = createPlaceholderForPermanentElement(permanentElement);
    permanentElement.replaceWith(placeholder);
  }
  replaceCurrentPermanentElementWithClone(permanentElement) {
    const clone = permanentElement.cloneNode(true);
    permanentElement.replaceWith(clone);
  }
  replacePlaceholderWithPermanentElement(permanentElement) {
    const placeholder = this.getPlaceholderById(permanentElement.id);
    placeholder === null || placeholder === undefined || placeholder.replaceWith(permanentElement);
  }
  getPlaceholderById(id) {
    return this.placeholders.find((element) => element.content == id);
  }
  get placeholders() {
    return [...document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]")];
  }
}

class Renderer {
  constructor(currentSnapshot, newSnapshot, renderElement, isPreview, willRender = true) {
    this.activeElement = null;
    this.currentSnapshot = currentSnapshot;
    this.newSnapshot = newSnapshot;
    this.isPreview = isPreview;
    this.willRender = willRender;
    this.renderElement = renderElement;
    this.promise = new Promise((resolve, reject) => this.resolvingFunctions = { resolve, reject });
  }
  get shouldRender() {
    return true;
  }
  get reloadReason() {
    return;
  }
  prepareToRender() {
    return;
  }
  finishRendering() {
    if (this.resolvingFunctions) {
      this.resolvingFunctions.resolve();
      delete this.resolvingFunctions;
    }
  }
  async preservingPermanentElements(callback) {
    await Bardo.preservingPermanentElements(this, this.permanentElementMap, callback);
  }
  focusFirstAutofocusableElement() {
    const element = this.connectedSnapshot.firstAutofocusableElement;
    if (elementIsFocusable(element)) {
      element.focus();
    }
  }
  enteringBardo(currentPermanentElement) {
    if (this.activeElement)
      return;
    if (currentPermanentElement.contains(this.currentSnapshot.activeElement)) {
      this.activeElement = this.currentSnapshot.activeElement;
    }
  }
  leavingBardo(currentPermanentElement) {
    if (currentPermanentElement.contains(this.activeElement) && this.activeElement instanceof HTMLElement) {
      this.activeElement.focus();
      this.activeElement = null;
    }
  }
  get connectedSnapshot() {
    return this.newSnapshot.isConnected ? this.newSnapshot : this.currentSnapshot;
  }
  get currentElement() {
    return this.currentSnapshot.element;
  }
  get newElement() {
    return this.newSnapshot.element;
  }
  get permanentElementMap() {
    return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot);
  }
}

class FrameRenderer extends Renderer {
  static renderElement(currentElement, newElement) {
    var _a;
    const destinationRange = document.createRange();
    destinationRange.selectNodeContents(currentElement);
    destinationRange.deleteContents();
    const frameElement = newElement;
    const sourceRange = (_a = frameElement.ownerDocument) === null || _a === undefined ? undefined : _a.createRange();
    if (sourceRange) {
      sourceRange.selectNodeContents(frameElement);
      currentElement.appendChild(sourceRange.extractContents());
    }
  }
  constructor(delegate, currentSnapshot, newSnapshot, renderElement, isPreview, willRender = true) {
    super(currentSnapshot, newSnapshot, renderElement, isPreview, willRender);
    this.delegate = delegate;
  }
  get shouldRender() {
    return true;
  }
  async render() {
    await nextAnimationFrame();
    this.preservingPermanentElements(() => {
      this.loadFrameElement();
    });
    this.scrollFrameIntoView();
    await nextAnimationFrame();
    this.focusFirstAutofocusableElement();
    await nextAnimationFrame();
    this.activateScriptElements();
  }
  loadFrameElement() {
    this.delegate.willRenderFrame(this.currentElement, this.newElement);
    this.renderElement(this.currentElement, this.newElement);
  }
  scrollFrameIntoView() {
    if (this.currentElement.autoscroll || this.newElement.autoscroll) {
      const element = this.currentElement.firstElementChild;
      const block = readScrollLogicalPosition(this.currentElement.getAttribute("data-autoscroll-block"), "end");
      const behavior = readScrollBehavior(this.currentElement.getAttribute("data-autoscroll-behavior"), "auto");
      if (element) {
        element.scrollIntoView({ block, behavior });
        return true;
      }
    }
    return false;
  }
  activateScriptElements() {
    for (const inertScriptElement of this.newScriptElements) {
      const activatedScriptElement = activateScriptElement(inertScriptElement);
      inertScriptElement.replaceWith(activatedScriptElement);
    }
  }
  get newScriptElements() {
    return this.currentElement.querySelectorAll("script");
  }
}

class ProgressBar {
  static get defaultCSS() {
    return unindent`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 2147483647;
        transition:
          width ${ProgressBar.animationDuration}ms ease-out,
          opacity ${ProgressBar.animationDuration / 2}ms ${ProgressBar.animationDuration / 2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `;
  }
  constructor() {
    this.hiding = false;
    this.value = 0;
    this.visible = false;
    this.trickle = () => {
      this.setValue(this.value + Math.random() / 100);
    };
    this.stylesheetElement = this.createStylesheetElement();
    this.progressElement = this.createProgressElement();
    this.installStylesheetElement();
    this.setValue(0);
  }
  show() {
    if (!this.visible) {
      this.visible = true;
      this.installProgressElement();
      this.startTrickling();
    }
  }
  hide() {
    if (this.visible && !this.hiding) {
      this.hiding = true;
      this.fadeProgressElement(() => {
        this.uninstallProgressElement();
        this.stopTrickling();
        this.visible = false;
        this.hiding = false;
      });
    }
  }
  setValue(value) {
    this.value = value;
    this.refresh();
  }
  installStylesheetElement() {
    document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
  }
  installProgressElement() {
    this.progressElement.style.width = "0";
    this.progressElement.style.opacity = "1";
    document.documentElement.insertBefore(this.progressElement, document.body);
    this.refresh();
  }
  fadeProgressElement(callback) {
    this.progressElement.style.opacity = "0";
    setTimeout(callback, ProgressBar.animationDuration * 1.5);
  }
  uninstallProgressElement() {
    if (this.progressElement.parentNode) {
      document.documentElement.removeChild(this.progressElement);
    }
  }
  startTrickling() {
    if (!this.trickleInterval) {
      this.trickleInterval = window.setInterval(this.trickle, ProgressBar.animationDuration);
    }
  }
  stopTrickling() {
    window.clearInterval(this.trickleInterval);
    delete this.trickleInterval;
  }
  refresh() {
    requestAnimationFrame(() => {
      this.progressElement.style.width = `${10 + this.value * 90}%`;
    });
  }
  createStylesheetElement() {
    const element = document.createElement("style");
    element.type = "text/css";
    element.textContent = ProgressBar.defaultCSS;
    if (this.cspNonce) {
      element.nonce = this.cspNonce;
    }
    return element;
  }
  createProgressElement() {
    const element = document.createElement("div");
    element.className = "turbo-progress-bar";
    return element;
  }
  get cspNonce() {
    return getMetaContent("csp-nonce");
  }
}
ProgressBar.animationDuration = 300;

class HeadSnapshot extends Snapshot {
  constructor() {
    super(...arguments);
    this.detailsByOuterHTML = this.children.filter((element) => !elementIsNoscript(element)).map((element) => elementWithoutNonce(element)).reduce((result, element) => {
      const { outerHTML } = element;
      const details = outerHTML in result ? result[outerHTML] : {
        type: elementType(element),
        tracked: elementIsTracked(element),
        elements: []
      };
      return Object.assign(Object.assign({}, result), { [outerHTML]: Object.assign(Object.assign({}, details), { elements: [...details.elements, element] }) });
    }, {});
  }
  get trackedElementSignature() {
    return Object.keys(this.detailsByOuterHTML).filter((outerHTML) => this.detailsByOuterHTML[outerHTML].tracked).join("");
  }
  getScriptElementsNotInSnapshot(snapshot) {
    return this.getElementsMatchingTypeNotInSnapshot("script", snapshot);
  }
  getStylesheetElementsNotInSnapshot(snapshot) {
    return this.getElementsMatchingTypeNotInSnapshot("stylesheet", snapshot);
  }
  getElementsMatchingTypeNotInSnapshot(matchedType, snapshot) {
    return Object.keys(this.detailsByOuterHTML).filter((outerHTML) => !(outerHTML in snapshot.detailsByOuterHTML)).map((outerHTML) => this.detailsByOuterHTML[outerHTML]).filter(({ type }) => type == matchedType).map(({ elements: [element] }) => element);
  }
  get provisionalElements() {
    return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
      const { type, tracked, elements } = this.detailsByOuterHTML[outerHTML];
      if (type == null && !tracked) {
        return [...result, ...elements];
      } else if (elements.length > 1) {
        return [...result, ...elements.slice(1)];
      } else {
        return result;
      }
    }, []);
  }
  getMetaValue(name) {
    const element = this.findMetaElementByName(name);
    return element ? element.getAttribute("content") : null;
  }
  findMetaElementByName(name) {
    return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
      const { elements: [element] } = this.detailsByOuterHTML[outerHTML];
      return elementIsMetaElementWithName(element, name) ? element : result;
    }, undefined);
  }
}

class PageSnapshot extends Snapshot {
  static fromHTMLString(html = "") {
    return this.fromDocument(parseHTMLDocument(html));
  }
  static fromElement(element) {
    return this.fromDocument(element.ownerDocument);
  }
  static fromDocument({ head, body }) {
    return new this(body, new HeadSnapshot(head));
  }
  constructor(element, headSnapshot) {
    super(element);
    this.headSnapshot = headSnapshot;
  }
  clone() {
    const clonedElement = this.element.cloneNode(true);
    const selectElements = this.element.querySelectorAll("select");
    const clonedSelectElements = clonedElement.querySelectorAll("select");
    for (const [index, source] of selectElements.entries()) {
      const clone = clonedSelectElements[index];
      for (const option of clone.selectedOptions)
        option.selected = false;
      for (const option of source.selectedOptions)
        clone.options[option.index].selected = true;
    }
    for (const clonedPasswordInput of clonedElement.querySelectorAll('input[type="password"]')) {
      clonedPasswordInput.value = "";
    }
    return new PageSnapshot(clonedElement, this.headSnapshot);
  }
  get headElement() {
    return this.headSnapshot.element;
  }
  get rootLocation() {
    var _a;
    const root = (_a = this.getSetting("root")) !== null && _a !== undefined ? _a : "/";
    return expandURL(root);
  }
  get cacheControlValue() {
    return this.getSetting("cache-control");
  }
  get isPreviewable() {
    return this.cacheControlValue != "no-preview";
  }
  get isCacheable() {
    return this.cacheControlValue != "no-cache";
  }
  get isVisitable() {
    return this.getSetting("visit-control") != "reload";
  }
  getSetting(name) {
    return this.headSnapshot.getMetaValue(`turbo-${name}`);
  }
}
var TimingMetric;
(function(TimingMetric2) {
  TimingMetric2["visitStart"] = "visitStart";
  TimingMetric2["requestStart"] = "requestStart";
  TimingMetric2["requestEnd"] = "requestEnd";
  TimingMetric2["visitEnd"] = "visitEnd";
})(TimingMetric || (TimingMetric = {}));
var VisitState;
(function(VisitState2) {
  VisitState2["initialized"] = "initialized";
  VisitState2["started"] = "started";
  VisitState2["canceled"] = "canceled";
  VisitState2["failed"] = "failed";
  VisitState2["completed"] = "completed";
})(VisitState || (VisitState = {}));
var defaultOptions = {
  action: "advance",
  historyChanged: false,
  visitCachedSnapshot: () => {
  },
  willRender: true,
  updateHistory: true,
  shouldCacheSnapshot: true,
  acceptsStreamResponse: false
};
var SystemStatusCode;
(function(SystemStatusCode2) {
  SystemStatusCode2[SystemStatusCode2["networkFailure"] = 0] = "networkFailure";
  SystemStatusCode2[SystemStatusCode2["timeoutFailure"] = -1] = "timeoutFailure";
  SystemStatusCode2[SystemStatusCode2["contentTypeMismatch"] = -2] = "contentTypeMismatch";
})(SystemStatusCode || (SystemStatusCode = {}));

class Visit {
  constructor(delegate, location2, restorationIdentifier, options = {}) {
    this.identifier = uuid();
    this.timingMetrics = {};
    this.followedRedirect = false;
    this.historyChanged = false;
    this.scrolled = false;
    this.shouldCacheSnapshot = true;
    this.acceptsStreamResponse = false;
    this.snapshotCached = false;
    this.state = VisitState.initialized;
    this.delegate = delegate;
    this.location = location2;
    this.restorationIdentifier = restorationIdentifier || uuid();
    const { action, historyChanged, referrer, snapshot, snapshotHTML, response, visitCachedSnapshot, willRender, updateHistory, shouldCacheSnapshot, acceptsStreamResponse } = Object.assign(Object.assign({}, defaultOptions), options);
    this.action = action;
    this.historyChanged = historyChanged;
    this.referrer = referrer;
    this.snapshot = snapshot;
    this.snapshotHTML = snapshotHTML;
    this.response = response;
    this.isSamePage = this.delegate.locationWithActionIsSamePage(this.location, this.action);
    this.visitCachedSnapshot = visitCachedSnapshot;
    this.willRender = willRender;
    this.updateHistory = updateHistory;
    this.scrolled = !willRender;
    this.shouldCacheSnapshot = shouldCacheSnapshot;
    this.acceptsStreamResponse = acceptsStreamResponse;
  }
  get adapter() {
    return this.delegate.adapter;
  }
  get view() {
    return this.delegate.view;
  }
  get history() {
    return this.delegate.history;
  }
  get restorationData() {
    return this.history.getRestorationDataForIdentifier(this.restorationIdentifier);
  }
  get silent() {
    return this.isSamePage;
  }
  start() {
    if (this.state == VisitState.initialized) {
      this.recordTimingMetric(TimingMetric.visitStart);
      this.state = VisitState.started;
      this.adapter.visitStarted(this);
      this.delegate.visitStarted(this);
    }
  }
  cancel() {
    if (this.state == VisitState.started) {
      if (this.request) {
        this.request.cancel();
      }
      this.cancelRender();
      this.state = VisitState.canceled;
    }
  }
  complete() {
    if (this.state == VisitState.started) {
      this.recordTimingMetric(TimingMetric.visitEnd);
      this.state = VisitState.completed;
      this.followRedirect();
      if (!this.followedRedirect) {
        this.adapter.visitCompleted(this);
        this.delegate.visitCompleted(this);
      }
    }
  }
  fail() {
    if (this.state == VisitState.started) {
      this.state = VisitState.failed;
      this.adapter.visitFailed(this);
    }
  }
  changeHistory() {
    var _a;
    if (!this.historyChanged && this.updateHistory) {
      const actionForHistory = this.location.href === ((_a = this.referrer) === null || _a === undefined ? undefined : _a.href) ? "replace" : this.action;
      const method = getHistoryMethodForAction(actionForHistory);
      this.history.update(method, this.location, this.restorationIdentifier);
      this.historyChanged = true;
    }
  }
  issueRequest() {
    if (this.hasPreloadedResponse()) {
      this.simulateRequest();
    } else if (this.shouldIssueRequest() && !this.request) {
      this.request = new FetchRequest(this, FetchMethod.get, this.location);
      this.request.perform();
    }
  }
  simulateRequest() {
    if (this.response) {
      this.startRequest();
      this.recordResponse();
      this.finishRequest();
    }
  }
  startRequest() {
    this.recordTimingMetric(TimingMetric.requestStart);
    this.adapter.visitRequestStarted(this);
  }
  recordResponse(response = this.response) {
    this.response = response;
    if (response) {
      const { statusCode } = response;
      if (isSuccessful(statusCode)) {
        this.adapter.visitRequestCompleted(this);
      } else {
        this.adapter.visitRequestFailedWithStatusCode(this, statusCode);
      }
    }
  }
  finishRequest() {
    this.recordTimingMetric(TimingMetric.requestEnd);
    this.adapter.visitRequestFinished(this);
  }
  loadResponse() {
    if (this.response) {
      const { statusCode, responseHTML } = this.response;
      this.render(async () => {
        if (this.shouldCacheSnapshot)
          this.cacheSnapshot();
        if (this.view.renderPromise)
          await this.view.renderPromise;
        if (isSuccessful(statusCode) && responseHTML != null) {
          await this.view.renderPage(PageSnapshot.fromHTMLString(responseHTML), false, this.willRender, this);
          this.performScroll();
          this.adapter.visitRendered(this);
          this.complete();
        } else {
          await this.view.renderError(PageSnapshot.fromHTMLString(responseHTML), this);
          this.adapter.visitRendered(this);
          this.fail();
        }
      });
    }
  }
  getCachedSnapshot() {
    const snapshot = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();
    if (snapshot && (!getAnchor(this.location) || snapshot.hasAnchor(getAnchor(this.location)))) {
      if (this.action == "restore" || snapshot.isPreviewable) {
        return snapshot;
      }
    }
  }
  getPreloadedSnapshot() {
    if (this.snapshotHTML) {
      return PageSnapshot.fromHTMLString(this.snapshotHTML);
    }
  }
  hasCachedSnapshot() {
    return this.getCachedSnapshot() != null;
  }
  loadCachedSnapshot() {
    const snapshot = this.getCachedSnapshot();
    if (snapshot) {
      const isPreview = this.shouldIssueRequest();
      this.render(async () => {
        this.cacheSnapshot();
        if (this.isSamePage) {
          this.adapter.visitRendered(this);
        } else {
          if (this.view.renderPromise)
            await this.view.renderPromise;
          await this.view.renderPage(snapshot, isPreview, this.willRender, this);
          this.performScroll();
          this.adapter.visitRendered(this);
          if (!isPreview) {
            this.complete();
          }
        }
      });
    }
  }
  followRedirect() {
    var _a;
    if (this.redirectedToLocation && !this.followedRedirect && ((_a = this.response) === null || _a === undefined ? undefined : _a.redirected)) {
      this.adapter.visitProposedToLocation(this.redirectedToLocation, {
        action: "replace",
        response: this.response,
        shouldCacheSnapshot: false,
        willRender: false
      });
      this.followedRedirect = true;
    }
  }
  goToSamePageAnchor() {
    if (this.isSamePage) {
      this.render(async () => {
        this.cacheSnapshot();
        this.performScroll();
        this.changeHistory();
        this.adapter.visitRendered(this);
      });
    }
  }
  prepareRequest(request) {
    if (this.acceptsStreamResponse) {
      request.acceptResponseType(StreamMessage.contentType);
    }
  }
  requestStarted() {
    this.startRequest();
  }
  requestPreventedHandlingResponse(_request, _response) {
  }
  async requestSucceededWithResponse(request, response) {
    const responseHTML = await response.responseHTML;
    const { redirected, statusCode } = response;
    if (responseHTML == undefined) {
      this.recordResponse({
        statusCode: SystemStatusCode.contentTypeMismatch,
        redirected
      });
    } else {
      this.redirectedToLocation = response.redirected ? response.location : undefined;
      this.recordResponse({ statusCode, responseHTML, redirected });
    }
  }
  async requestFailedWithResponse(request, response) {
    const responseHTML = await response.responseHTML;
    const { redirected, statusCode } = response;
    if (responseHTML == undefined) {
      this.recordResponse({
        statusCode: SystemStatusCode.contentTypeMismatch,
        redirected
      });
    } else {
      this.recordResponse({ statusCode, responseHTML, redirected });
    }
  }
  requestErrored(_request, _error) {
    this.recordResponse({
      statusCode: SystemStatusCode.networkFailure,
      redirected: false
    });
  }
  requestFinished() {
    this.finishRequest();
  }
  performScroll() {
    if (!this.scrolled && !this.view.forceReloaded) {
      if (this.action == "restore") {
        this.scrollToRestoredPosition() || this.scrollToAnchor() || this.view.scrollToTop();
      } else {
        this.scrollToAnchor() || this.view.scrollToTop();
      }
      if (this.isSamePage) {
        this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation, this.location);
      }
      this.scrolled = true;
    }
  }
  scrollToRestoredPosition() {
    const { scrollPosition } = this.restorationData;
    if (scrollPosition) {
      this.view.scrollToPosition(scrollPosition);
      return true;
    }
  }
  scrollToAnchor() {
    const anchor = getAnchor(this.location);
    if (anchor != null) {
      this.view.scrollToAnchor(anchor);
      return true;
    }
  }
  recordTimingMetric(metric) {
    this.timingMetrics[metric] = new Date().getTime();
  }
  getTimingMetrics() {
    return Object.assign({}, this.timingMetrics);
  }
  getHistoryMethodForAction(action) {
    switch (action) {
      case "replace":
        return history.replaceState;
      case "advance":
      case "restore":
        return history.pushState;
    }
  }
  hasPreloadedResponse() {
    return typeof this.response == "object";
  }
  shouldIssueRequest() {
    if (this.isSamePage) {
      return false;
    } else if (this.action == "restore") {
      return !this.hasCachedSnapshot();
    } else {
      return this.willRender;
    }
  }
  cacheSnapshot() {
    if (!this.snapshotCached) {
      this.view.cacheSnapshot(this.snapshot).then((snapshot) => snapshot && this.visitCachedSnapshot(snapshot));
      this.snapshotCached = true;
    }
  }
  async render(callback) {
    this.cancelRender();
    await new Promise((resolve) => {
      this.frame = requestAnimationFrame(() => resolve());
    });
    await callback();
    delete this.frame;
  }
  cancelRender() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      delete this.frame;
    }
  }
}

class BrowserAdapter {
  constructor(session) {
    this.progressBar = new ProgressBar;
    this.showProgressBar = () => {
      this.progressBar.show();
    };
    this.session = session;
  }
  visitProposedToLocation(location2, options) {
    this.navigator.startVisit(location2, (options === null || options === undefined ? undefined : options.restorationIdentifier) || uuid(), options);
  }
  visitStarted(visit2) {
    this.location = visit2.location;
    visit2.loadCachedSnapshot();
    visit2.issueRequest();
    visit2.goToSamePageAnchor();
  }
  visitRequestStarted(visit2) {
    this.progressBar.setValue(0);
    if (visit2.hasCachedSnapshot() || visit2.action != "restore") {
      this.showVisitProgressBarAfterDelay();
    } else {
      this.showProgressBar();
    }
  }
  visitRequestCompleted(visit2) {
    visit2.loadResponse();
  }
  visitRequestFailedWithStatusCode(visit2, statusCode) {
    switch (statusCode) {
      case SystemStatusCode.networkFailure:
      case SystemStatusCode.timeoutFailure:
      case SystemStatusCode.contentTypeMismatch:
        return this.reload({
          reason: "request_failed",
          context: {
            statusCode
          }
        });
      default:
        return visit2.loadResponse();
    }
  }
  visitRequestFinished(_visit) {
    this.progressBar.setValue(1);
    this.hideVisitProgressBar();
  }
  visitCompleted(_visit) {
  }
  pageInvalidated(reason) {
    this.reload(reason);
  }
  visitFailed(_visit) {
  }
  visitRendered(_visit) {
  }
  formSubmissionStarted(_formSubmission) {
    this.progressBar.setValue(0);
    this.showFormProgressBarAfterDelay();
  }
  formSubmissionFinished(_formSubmission) {
    this.progressBar.setValue(1);
    this.hideFormProgressBar();
  }
  showVisitProgressBarAfterDelay() {
    this.visitProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
  }
  hideVisitProgressBar() {
    this.progressBar.hide();
    if (this.visitProgressBarTimeout != null) {
      window.clearTimeout(this.visitProgressBarTimeout);
      delete this.visitProgressBarTimeout;
    }
  }
  showFormProgressBarAfterDelay() {
    if (this.formProgressBarTimeout == null) {
      this.formProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
    }
  }
  hideFormProgressBar() {
    this.progressBar.hide();
    if (this.formProgressBarTimeout != null) {
      window.clearTimeout(this.formProgressBarTimeout);
      delete this.formProgressBarTimeout;
    }
  }
  reload(reason) {
    var _a;
    dispatch("turbo:reload", { detail: reason });
    window.location.href = ((_a = this.location) === null || _a === undefined ? undefined : _a.toString()) || window.location.href;
  }
  get navigator() {
    return this.session.navigator;
  }
}

class CacheObserver {
  constructor() {
    this.selector = "[data-turbo-temporary]";
    this.deprecatedSelector = "[data-turbo-cache=false]";
    this.started = false;
    this.removeTemporaryElements = (_event) => {
      for (const element of this.temporaryElements) {
        element.remove();
      }
    };
  }
  start() {
    if (!this.started) {
      this.started = true;
      addEventListener("turbo:before-cache", this.removeTemporaryElements, false);
    }
  }
  stop() {
    if (this.started) {
      this.started = false;
      removeEventListener("turbo:before-cache", this.removeTemporaryElements, false);
    }
  }
  get temporaryElements() {
    return [...document.querySelectorAll(this.selector), ...this.temporaryElementsWithDeprecation];
  }
  get temporaryElementsWithDeprecation() {
    const elements = document.querySelectorAll(this.deprecatedSelector);
    if (elements.length) {
      console.warn(`The ${this.deprecatedSelector} selector is deprecated and will be removed in a future version. Use ${this.selector} instead.`);
    }
    return [...elements];
  }
}

class FrameRedirector {
  constructor(session, element) {
    this.session = session;
    this.element = element;
    this.linkInterceptor = new LinkInterceptor(this, element);
    this.formSubmitObserver = new FormSubmitObserver(this, element);
  }
  start() {
    this.linkInterceptor.start();
    this.formSubmitObserver.start();
  }
  stop() {
    this.linkInterceptor.stop();
    this.formSubmitObserver.stop();
  }
  shouldInterceptLinkClick(element, _location, _event) {
    return this.shouldRedirect(element);
  }
  linkClickIntercepted(element, url, event2) {
    const frame = this.findFrameElement(element);
    if (frame) {
      frame.delegate.linkClickIntercepted(element, url, event2);
    }
  }
  willSubmitForm(element, submitter) {
    return element.closest("turbo-frame") == null && this.shouldSubmit(element, submitter) && this.shouldRedirect(element, submitter);
  }
  formSubmitted(element, submitter) {
    const frame = this.findFrameElement(element, submitter);
    if (frame) {
      frame.delegate.formSubmitted(element, submitter);
    }
  }
  shouldSubmit(form, submitter) {
    var _a;
    const action = getAction(form, submitter);
    const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
    const rootLocation = expandURL((_a = meta === null || meta === undefined ? undefined : meta.content) !== null && _a !== undefined ? _a : "/");
    return this.shouldRedirect(form, submitter) && locationIsVisitable(action, rootLocation);
  }
  shouldRedirect(element, submitter) {
    const isNavigatable = element instanceof HTMLFormElement ? this.session.submissionIsNavigatable(element, submitter) : this.session.elementIsNavigatable(element);
    if (isNavigatable) {
      const frame = this.findFrameElement(element, submitter);
      return frame ? frame != element.closest("turbo-frame") : false;
    } else {
      return false;
    }
  }
  findFrameElement(element, submitter) {
    const id = (submitter === null || submitter === undefined ? undefined : submitter.getAttribute("data-turbo-frame")) || element.getAttribute("data-turbo-frame");
    if (id && id != "_top") {
      const frame = this.element.querySelector(`#${id}:not([disabled])`);
      if (frame instanceof FrameElement) {
        return frame;
      }
    }
  }
}

class History {
  constructor(delegate) {
    this.restorationIdentifier = uuid();
    this.restorationData = {};
    this.started = false;
    this.pageLoaded = false;
    this.onPopState = (event2) => {
      if (this.shouldHandlePopState()) {
        const { turbo } = event2.state || {};
        if (turbo) {
          this.location = new URL(window.location.href);
          const { restorationIdentifier } = turbo;
          this.restorationIdentifier = restorationIdentifier;
          this.delegate.historyPoppedToLocationWithRestorationIdentifier(this.location, restorationIdentifier);
        }
      }
    };
    this.onPageLoad = async (_event) => {
      await nextMicrotask();
      this.pageLoaded = true;
    };
    this.delegate = delegate;
  }
  start() {
    if (!this.started) {
      addEventListener("popstate", this.onPopState, false);
      addEventListener("load", this.onPageLoad, false);
      this.started = true;
      this.replace(new URL(window.location.href));
    }
  }
  stop() {
    if (this.started) {
      removeEventListener("popstate", this.onPopState, false);
      removeEventListener("load", this.onPageLoad, false);
      this.started = false;
    }
  }
  push(location2, restorationIdentifier) {
    this.update(history.pushState, location2, restorationIdentifier);
  }
  replace(location2, restorationIdentifier) {
    this.update(history.replaceState, location2, restorationIdentifier);
  }
  update(method, location2, restorationIdentifier = uuid()) {
    const state = { turbo: { restorationIdentifier } };
    method.call(history, state, "", location2.href);
    this.location = location2;
    this.restorationIdentifier = restorationIdentifier;
  }
  getRestorationDataForIdentifier(restorationIdentifier) {
    return this.restorationData[restorationIdentifier] || {};
  }
  updateRestorationData(additionalData) {
    const { restorationIdentifier } = this;
    const restorationData = this.restorationData[restorationIdentifier];
    this.restorationData[restorationIdentifier] = Object.assign(Object.assign({}, restorationData), additionalData);
  }
  assumeControlOfScrollRestoration() {
    var _a;
    if (!this.previousScrollRestoration) {
      this.previousScrollRestoration = (_a = history.scrollRestoration) !== null && _a !== undefined ? _a : "auto";
      history.scrollRestoration = "manual";
    }
  }
  relinquishControlOfScrollRestoration() {
    if (this.previousScrollRestoration) {
      history.scrollRestoration = this.previousScrollRestoration;
      delete this.previousScrollRestoration;
    }
  }
  shouldHandlePopState() {
    return this.pageIsLoaded();
  }
  pageIsLoaded() {
    return this.pageLoaded || document.readyState == "complete";
  }
}

class Navigator {
  constructor(delegate) {
    this.delegate = delegate;
  }
  proposeVisit(location2, options = {}) {
    if (this.delegate.allowsVisitingLocationWithAction(location2, options.action)) {
      if (locationIsVisitable(location2, this.view.snapshot.rootLocation)) {
        this.delegate.visitProposedToLocation(location2, options);
      } else {
        window.location.href = location2.toString();
      }
    }
  }
  startVisit(locatable, restorationIdentifier, options = {}) {
    this.stop();
    this.currentVisit = new Visit(this, expandURL(locatable), restorationIdentifier, Object.assign({ referrer: this.location }, options));
    this.currentVisit.start();
  }
  submitForm(form, submitter) {
    this.stop();
    this.formSubmission = new FormSubmission(this, form, submitter, true);
    this.formSubmission.start();
  }
  stop() {
    if (this.formSubmission) {
      this.formSubmission.stop();
      delete this.formSubmission;
    }
    if (this.currentVisit) {
      this.currentVisit.cancel();
      delete this.currentVisit;
    }
  }
  get adapter() {
    return this.delegate.adapter;
  }
  get view() {
    return this.delegate.view;
  }
  get history() {
    return this.delegate.history;
  }
  formSubmissionStarted(formSubmission) {
    if (typeof this.adapter.formSubmissionStarted === "function") {
      this.adapter.formSubmissionStarted(formSubmission);
    }
  }
  async formSubmissionSucceededWithResponse(formSubmission, fetchResponse) {
    if (formSubmission == this.formSubmission) {
      const responseHTML = await fetchResponse.responseHTML;
      if (responseHTML) {
        const shouldCacheSnapshot = formSubmission.isSafe;
        if (!shouldCacheSnapshot) {
          this.view.clearSnapshotCache();
        }
        const { statusCode, redirected } = fetchResponse;
        const action = this.getActionForFormSubmission(formSubmission);
        const visitOptions = {
          action,
          shouldCacheSnapshot,
          response: { statusCode, responseHTML, redirected }
        };
        this.proposeVisit(fetchResponse.location, visitOptions);
      }
    }
  }
  async formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
    const responseHTML = await fetchResponse.responseHTML;
    if (responseHTML) {
      const snapshot = PageSnapshot.fromHTMLString(responseHTML);
      if (fetchResponse.serverError) {
        await this.view.renderError(snapshot, this.currentVisit);
      } else {
        await this.view.renderPage(snapshot, false, true, this.currentVisit);
      }
      this.view.scrollToTop();
      this.view.clearSnapshotCache();
    }
  }
  formSubmissionErrored(formSubmission, error) {
    console.error(error);
  }
  formSubmissionFinished(formSubmission) {
    if (typeof this.adapter.formSubmissionFinished === "function") {
      this.adapter.formSubmissionFinished(formSubmission);
    }
  }
  visitStarted(visit2) {
    this.delegate.visitStarted(visit2);
  }
  visitCompleted(visit2) {
    this.delegate.visitCompleted(visit2);
  }
  locationWithActionIsSamePage(location2, action) {
    const anchor = getAnchor(location2);
    const currentAnchor = getAnchor(this.view.lastRenderedLocation);
    const isRestorationToTop = action === "restore" && typeof anchor === "undefined";
    return action !== "replace" && getRequestURL(location2) === getRequestURL(this.view.lastRenderedLocation) && (isRestorationToTop || anchor != null && anchor !== currentAnchor);
  }
  visitScrolledToSamePageLocation(oldURL, newURL) {
    this.delegate.visitScrolledToSamePageLocation(oldURL, newURL);
  }
  get location() {
    return this.history.location;
  }
  get restorationIdentifier() {
    return this.history.restorationIdentifier;
  }
  getActionForFormSubmission({ submitter, formElement }) {
    return getVisitAction(submitter, formElement) || "advance";
  }
}
var PageStage;
(function(PageStage2) {
  PageStage2[PageStage2["initial"] = 0] = "initial";
  PageStage2[PageStage2["loading"] = 1] = "loading";
  PageStage2[PageStage2["interactive"] = 2] = "interactive";
  PageStage2[PageStage2["complete"] = 3] = "complete";
})(PageStage || (PageStage = {}));

class PageObserver {
  constructor(delegate) {
    this.stage = PageStage.initial;
    this.started = false;
    this.interpretReadyState = () => {
      const { readyState } = this;
      if (readyState == "interactive") {
        this.pageIsInteractive();
      } else if (readyState == "complete") {
        this.pageIsComplete();
      }
    };
    this.pageWillUnload = () => {
      this.delegate.pageWillUnload();
    };
    this.delegate = delegate;
  }
  start() {
    if (!this.started) {
      if (this.stage == PageStage.initial) {
        this.stage = PageStage.loading;
      }
      document.addEventListener("readystatechange", this.interpretReadyState, false);
      addEventListener("pagehide", this.pageWillUnload, false);
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      document.removeEventListener("readystatechange", this.interpretReadyState, false);
      removeEventListener("pagehide", this.pageWillUnload, false);
      this.started = false;
    }
  }
  pageIsInteractive() {
    if (this.stage == PageStage.loading) {
      this.stage = PageStage.interactive;
      this.delegate.pageBecameInteractive();
    }
  }
  pageIsComplete() {
    this.pageIsInteractive();
    if (this.stage == PageStage.interactive) {
      this.stage = PageStage.complete;
      this.delegate.pageLoaded();
    }
  }
  get readyState() {
    return document.readyState;
  }
}

class ScrollObserver {
  constructor(delegate) {
    this.started = false;
    this.onScroll = () => {
      this.updatePosition({ x: window.pageXOffset, y: window.pageYOffset });
    };
    this.delegate = delegate;
  }
  start() {
    if (!this.started) {
      addEventListener("scroll", this.onScroll, false);
      this.onScroll();
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      removeEventListener("scroll", this.onScroll, false);
      this.started = false;
    }
  }
  updatePosition(position) {
    this.delegate.scrollPositionChanged(position);
  }
}

class StreamMessageRenderer {
  render({ fragment }) {
    Bardo.preservingPermanentElements(this, getPermanentElementMapForFragment(fragment), () => document.documentElement.appendChild(fragment));
  }
  enteringBardo(currentPermanentElement, newPermanentElement) {
    newPermanentElement.replaceWith(currentPermanentElement.cloneNode(true));
  }
  leavingBardo() {
  }
}

class StreamObserver {
  constructor(delegate) {
    this.sources = new Set;
    this.started = false;
    this.inspectFetchResponse = (event2) => {
      const response = fetchResponseFromEvent(event2);
      if (response && fetchResponseIsStream(response)) {
        event2.preventDefault();
        this.receiveMessageResponse(response);
      }
    };
    this.receiveMessageEvent = (event2) => {
      if (this.started && typeof event2.data == "string") {
        this.receiveMessageHTML(event2.data);
      }
    };
    this.delegate = delegate;
  }
  start() {
    if (!this.started) {
      this.started = true;
      addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
    }
  }
  stop() {
    if (this.started) {
      this.started = false;
      removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
    }
  }
  connectStreamSource(source) {
    if (!this.streamSourceIsConnected(source)) {
      this.sources.add(source);
      source.addEventListener("message", this.receiveMessageEvent, false);
    }
  }
  disconnectStreamSource(source) {
    if (this.streamSourceIsConnected(source)) {
      this.sources.delete(source);
      source.removeEventListener("message", this.receiveMessageEvent, false);
    }
  }
  streamSourceIsConnected(source) {
    return this.sources.has(source);
  }
  async receiveMessageResponse(response) {
    const html = await response.responseHTML;
    if (html) {
      this.receiveMessageHTML(html);
    }
  }
  receiveMessageHTML(html) {
    this.delegate.receivedMessageFromStream(StreamMessage.wrap(html));
  }
}

class ErrorRenderer extends Renderer {
  static renderElement(currentElement, newElement) {
    const { documentElement, body } = document;
    documentElement.replaceChild(newElement, body);
  }
  async render() {
    this.replaceHeadAndBody();
    this.activateScriptElements();
  }
  replaceHeadAndBody() {
    const { documentElement, head } = document;
    documentElement.replaceChild(this.newHead, head);
    this.renderElement(this.currentElement, this.newElement);
  }
  activateScriptElements() {
    for (const replaceableElement of this.scriptElements) {
      const parentNode = replaceableElement.parentNode;
      if (parentNode) {
        const element = activateScriptElement(replaceableElement);
        parentNode.replaceChild(element, replaceableElement);
      }
    }
  }
  get newHead() {
    return this.newSnapshot.headSnapshot.element;
  }
  get scriptElements() {
    return document.documentElement.querySelectorAll("script");
  }
}

class PageRenderer extends Renderer {
  static renderElement(currentElement, newElement) {
    if (document.body && newElement instanceof HTMLBodyElement) {
      document.body.replaceWith(newElement);
    } else {
      document.documentElement.appendChild(newElement);
    }
  }
  get shouldRender() {
    return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical;
  }
  get reloadReason() {
    if (!this.newSnapshot.isVisitable) {
      return {
        reason: "turbo_visit_control_is_reload"
      };
    }
    if (!this.trackedElementsAreIdentical) {
      return {
        reason: "tracked_element_mismatch"
      };
    }
  }
  async prepareToRender() {
    await this.mergeHead();
  }
  async render() {
    if (this.willRender) {
      await this.replaceBody();
    }
  }
  finishRendering() {
    super.finishRendering();
    if (!this.isPreview) {
      this.focusFirstAutofocusableElement();
    }
  }
  get currentHeadSnapshot() {
    return this.currentSnapshot.headSnapshot;
  }
  get newHeadSnapshot() {
    return this.newSnapshot.headSnapshot;
  }
  get newElement() {
    return this.newSnapshot.element;
  }
  async mergeHead() {
    const mergedHeadElements = this.mergeProvisionalElements();
    const newStylesheetElements = this.copyNewHeadStylesheetElements();
    this.copyNewHeadScriptElements();
    await mergedHeadElements;
    await newStylesheetElements;
  }
  async replaceBody() {
    await this.preservingPermanentElements(async () => {
      this.activateNewBody();
      await this.assignNewBody();
    });
  }
  get trackedElementsAreIdentical() {
    return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature;
  }
  async copyNewHeadStylesheetElements() {
    const loadingElements = [];
    for (const element of this.newHeadStylesheetElements) {
      loadingElements.push(waitForLoad(element));
      document.head.appendChild(element);
    }
    await Promise.all(loadingElements);
  }
  copyNewHeadScriptElements() {
    for (const element of this.newHeadScriptElements) {
      document.head.appendChild(activateScriptElement(element));
    }
  }
  async mergeProvisionalElements() {
    const newHeadElements = [...this.newHeadProvisionalElements];
    for (const element of this.currentHeadProvisionalElements) {
      if (!this.isCurrentElementInElementList(element, newHeadElements)) {
        document.head.removeChild(element);
      }
    }
    for (const element of newHeadElements) {
      document.head.appendChild(element);
    }
  }
  isCurrentElementInElementList(element, elementList) {
    for (const [index, newElement] of elementList.entries()) {
      if (element.tagName == "TITLE") {
        if (newElement.tagName != "TITLE") {
          continue;
        }
        if (element.innerHTML == newElement.innerHTML) {
          elementList.splice(index, 1);
          return true;
        }
      }
      if (newElement.isEqualNode(element)) {
        elementList.splice(index, 1);
        return true;
      }
    }
    return false;
  }
  removeCurrentHeadProvisionalElements() {
    for (const element of this.currentHeadProvisionalElements) {
      document.head.removeChild(element);
    }
  }
  copyNewHeadProvisionalElements() {
    for (const element of this.newHeadProvisionalElements) {
      document.head.appendChild(element);
    }
  }
  activateNewBody() {
    document.adoptNode(this.newElement);
    this.activateNewBodyScriptElements();
  }
  activateNewBodyScriptElements() {
    for (const inertScriptElement of this.newBodyScriptElements) {
      const activatedScriptElement = activateScriptElement(inertScriptElement);
      inertScriptElement.replaceWith(activatedScriptElement);
    }
  }
  async assignNewBody() {
    await this.renderElement(this.currentElement, this.newElement);
  }
  get newHeadStylesheetElements() {
    return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot);
  }
  get newHeadScriptElements() {
    return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot);
  }
  get currentHeadProvisionalElements() {
    return this.currentHeadSnapshot.provisionalElements;
  }
  get newHeadProvisionalElements() {
    return this.newHeadSnapshot.provisionalElements;
  }
  get newBodyScriptElements() {
    return this.newElement.querySelectorAll("script");
  }
}

class SnapshotCache {
  constructor(size) {
    this.keys = [];
    this.snapshots = {};
    this.size = size;
  }
  has(location2) {
    return toCacheKey(location2) in this.snapshots;
  }
  get(location2) {
    if (this.has(location2)) {
      const snapshot = this.read(location2);
      this.touch(location2);
      return snapshot;
    }
  }
  put(location2, snapshot) {
    this.write(location2, snapshot);
    this.touch(location2);
    return snapshot;
  }
  clear() {
    this.snapshots = {};
  }
  read(location2) {
    return this.snapshots[toCacheKey(location2)];
  }
  write(location2, snapshot) {
    this.snapshots[toCacheKey(location2)] = snapshot;
  }
  touch(location2) {
    const key = toCacheKey(location2);
    const index = this.keys.indexOf(key);
    if (index > -1)
      this.keys.splice(index, 1);
    this.keys.unshift(key);
    this.trim();
  }
  trim() {
    for (const key of this.keys.splice(this.size)) {
      delete this.snapshots[key];
    }
  }
}

class PageView extends View {
  constructor() {
    super(...arguments);
    this.snapshotCache = new SnapshotCache(10);
    this.lastRenderedLocation = new URL(location.href);
    this.forceReloaded = false;
  }
  renderPage(snapshot, isPreview = false, willRender = true, visit2) {
    const renderer = new PageRenderer(this.snapshot, snapshot, PageRenderer.renderElement, isPreview, willRender);
    if (!renderer.shouldRender) {
      this.forceReloaded = true;
    } else {
      visit2 === null || visit2 === undefined || visit2.changeHistory();
    }
    return this.render(renderer);
  }
  renderError(snapshot, visit2) {
    visit2 === null || visit2 === undefined || visit2.changeHistory();
    const renderer = new ErrorRenderer(this.snapshot, snapshot, ErrorRenderer.renderElement, false);
    return this.render(renderer);
  }
  clearSnapshotCache() {
    this.snapshotCache.clear();
  }
  async cacheSnapshot(snapshot = this.snapshot) {
    if (snapshot.isCacheable) {
      this.delegate.viewWillCacheSnapshot();
      const { lastRenderedLocation: location2 } = this;
      await nextEventLoopTick();
      const cachedSnapshot = snapshot.clone();
      this.snapshotCache.put(location2, cachedSnapshot);
      return cachedSnapshot;
    }
  }
  getCachedSnapshotForLocation(location2) {
    return this.snapshotCache.get(location2);
  }
  get snapshot() {
    return PageSnapshot.fromElement(this.element);
  }
}

class Preloader {
  constructor(delegate) {
    this.selector = "a[data-turbo-preload]";
    this.delegate = delegate;
  }
  get snapshotCache() {
    return this.delegate.navigator.view.snapshotCache;
  }
  start() {
    if (document.readyState === "loading") {
      return document.addEventListener("DOMContentLoaded", () => {
        this.preloadOnLoadLinksForView(document.body);
      });
    } else {
      this.preloadOnLoadLinksForView(document.body);
    }
  }
  preloadOnLoadLinksForView(element) {
    for (const link of element.querySelectorAll(this.selector)) {
      this.preloadURL(link);
    }
  }
  async preloadURL(link) {
    const location2 = new URL(link.href);
    if (this.snapshotCache.has(location2)) {
      return;
    }
    try {
      const response = await fetch(location2.toString(), { headers: { "VND.PREFETCH": "true", Accept: "text/html" } });
      const responseText = await response.text();
      const snapshot = PageSnapshot.fromHTMLString(responseText);
      this.snapshotCache.put(location2, snapshot);
    } catch (_) {
    }
  }
}

class Session {
  constructor() {
    this.navigator = new Navigator(this);
    this.history = new History(this);
    this.preloader = new Preloader(this);
    this.view = new PageView(this, document.documentElement);
    this.adapter = new BrowserAdapter(this);
    this.pageObserver = new PageObserver(this);
    this.cacheObserver = new CacheObserver;
    this.linkClickObserver = new LinkClickObserver(this, window);
    this.formSubmitObserver = new FormSubmitObserver(this, document);
    this.scrollObserver = new ScrollObserver(this);
    this.streamObserver = new StreamObserver(this);
    this.formLinkClickObserver = new FormLinkClickObserver(this, document.documentElement);
    this.frameRedirector = new FrameRedirector(this, document.documentElement);
    this.streamMessageRenderer = new StreamMessageRenderer;
    this.drive = true;
    this.enabled = true;
    this.progressBarDelay = 500;
    this.started = false;
    this.formMode = "on";
  }
  start() {
    if (!this.started) {
      this.pageObserver.start();
      this.cacheObserver.start();
      this.formLinkClickObserver.start();
      this.linkClickObserver.start();
      this.formSubmitObserver.start();
      this.scrollObserver.start();
      this.streamObserver.start();
      this.frameRedirector.start();
      this.history.start();
      this.preloader.start();
      this.started = true;
      this.enabled = true;
    }
  }
  disable() {
    this.enabled = false;
  }
  stop() {
    if (this.started) {
      this.pageObserver.stop();
      this.cacheObserver.stop();
      this.formLinkClickObserver.stop();
      this.linkClickObserver.stop();
      this.formSubmitObserver.stop();
      this.scrollObserver.stop();
      this.streamObserver.stop();
      this.frameRedirector.stop();
      this.history.stop();
      this.started = false;
    }
  }
  registerAdapter(adapter) {
    this.adapter = adapter;
  }
  visit(location2, options = {}) {
    const frameElement = options.frame ? document.getElementById(options.frame) : null;
    if (frameElement instanceof FrameElement) {
      frameElement.src = location2.toString();
      frameElement.loaded;
    } else {
      this.navigator.proposeVisit(expandURL(location2), options);
    }
  }
  connectStreamSource(source) {
    this.streamObserver.connectStreamSource(source);
  }
  disconnectStreamSource(source) {
    this.streamObserver.disconnectStreamSource(source);
  }
  renderStreamMessage(message) {
    this.streamMessageRenderer.render(StreamMessage.wrap(message));
  }
  clearCache() {
    this.view.clearSnapshotCache();
  }
  setProgressBarDelay(delay) {
    this.progressBarDelay = delay;
  }
  setFormMode(mode) {
    this.formMode = mode;
  }
  get location() {
    return this.history.location;
  }
  get restorationIdentifier() {
    return this.history.restorationIdentifier;
  }
  historyPoppedToLocationWithRestorationIdentifier(location2, restorationIdentifier) {
    if (this.enabled) {
      this.navigator.startVisit(location2, restorationIdentifier, {
        action: "restore",
        historyChanged: true
      });
    } else {
      this.adapter.pageInvalidated({
        reason: "turbo_disabled"
      });
    }
  }
  scrollPositionChanged(position) {
    this.history.updateRestorationData({ scrollPosition: position });
  }
  willSubmitFormLinkToLocation(link, location2) {
    return this.elementIsNavigatable(link) && locationIsVisitable(location2, this.snapshot.rootLocation);
  }
  submittedFormLinkToLocation() {
  }
  willFollowLinkToLocation(link, location2, event2) {
    return this.elementIsNavigatable(link) && locationIsVisitable(location2, this.snapshot.rootLocation) && this.applicationAllowsFollowingLinkToLocation(link, location2, event2);
  }
  followedLinkToLocation(link, location2) {
    const action = this.getActionForLink(link);
    const acceptsStreamResponse = link.hasAttribute("data-turbo-stream");
    this.visit(location2.href, { action, acceptsStreamResponse });
  }
  allowsVisitingLocationWithAction(location2, action) {
    return this.locationWithActionIsSamePage(location2, action) || this.applicationAllowsVisitingLocation(location2);
  }
  visitProposedToLocation(location2, options) {
    extendURLWithDeprecatedProperties(location2);
    this.adapter.visitProposedToLocation(location2, options);
  }
  visitStarted(visit2) {
    if (!visit2.acceptsStreamResponse) {
      markAsBusy(document.documentElement);
    }
    extendURLWithDeprecatedProperties(visit2.location);
    if (!visit2.silent) {
      this.notifyApplicationAfterVisitingLocation(visit2.location, visit2.action);
    }
  }
  visitCompleted(visit2) {
    clearBusyState(document.documentElement);
    this.notifyApplicationAfterPageLoad(visit2.getTimingMetrics());
  }
  locationWithActionIsSamePage(location2, action) {
    return this.navigator.locationWithActionIsSamePage(location2, action);
  }
  visitScrolledToSamePageLocation(oldURL, newURL) {
    this.notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL);
  }
  willSubmitForm(form, submitter) {
    const action = getAction(form, submitter);
    return this.submissionIsNavigatable(form, submitter) && locationIsVisitable(expandURL(action), this.snapshot.rootLocation);
  }
  formSubmitted(form, submitter) {
    this.navigator.submitForm(form, submitter);
  }
  pageBecameInteractive() {
    this.view.lastRenderedLocation = this.location;
    this.notifyApplicationAfterPageLoad();
  }
  pageLoaded() {
    this.history.assumeControlOfScrollRestoration();
  }
  pageWillUnload() {
    this.history.relinquishControlOfScrollRestoration();
  }
  receivedMessageFromStream(message) {
    this.renderStreamMessage(message);
  }
  viewWillCacheSnapshot() {
    var _a;
    if (!((_a = this.navigator.currentVisit) === null || _a === undefined ? undefined : _a.silent)) {
      this.notifyApplicationBeforeCachingSnapshot();
    }
  }
  allowsImmediateRender({ element }, options) {
    const event2 = this.notifyApplicationBeforeRender(element, options);
    const { defaultPrevented, detail: { render } } = event2;
    if (this.view.renderer && render) {
      this.view.renderer.renderElement = render;
    }
    return !defaultPrevented;
  }
  viewRenderedSnapshot(_snapshot, _isPreview) {
    this.view.lastRenderedLocation = this.history.location;
    this.notifyApplicationAfterRender();
  }
  preloadOnLoadLinksForView(element) {
    this.preloader.preloadOnLoadLinksForView(element);
  }
  viewInvalidated(reason) {
    this.adapter.pageInvalidated(reason);
  }
  frameLoaded(frame) {
    this.notifyApplicationAfterFrameLoad(frame);
  }
  frameRendered(fetchResponse, frame) {
    this.notifyApplicationAfterFrameRender(fetchResponse, frame);
  }
  applicationAllowsFollowingLinkToLocation(link, location2, ev) {
    const event2 = this.notifyApplicationAfterClickingLinkToLocation(link, location2, ev);
    return !event2.defaultPrevented;
  }
  applicationAllowsVisitingLocation(location2) {
    const event2 = this.notifyApplicationBeforeVisitingLocation(location2);
    return !event2.defaultPrevented;
  }
  notifyApplicationAfterClickingLinkToLocation(link, location2, event2) {
    return dispatch("turbo:click", {
      target: link,
      detail: { url: location2.href, originalEvent: event2 },
      cancelable: true
    });
  }
  notifyApplicationBeforeVisitingLocation(location2) {
    return dispatch("turbo:before-visit", {
      detail: { url: location2.href },
      cancelable: true
    });
  }
  notifyApplicationAfterVisitingLocation(location2, action) {
    return dispatch("turbo:visit", { detail: { url: location2.href, action } });
  }
  notifyApplicationBeforeCachingSnapshot() {
    return dispatch("turbo:before-cache");
  }
  notifyApplicationBeforeRender(newBody, options) {
    return dispatch("turbo:before-render", {
      detail: Object.assign({ newBody }, options),
      cancelable: true
    });
  }
  notifyApplicationAfterRender() {
    return dispatch("turbo:render");
  }
  notifyApplicationAfterPageLoad(timing = {}) {
    return dispatch("turbo:load", {
      detail: { url: this.location.href, timing }
    });
  }
  notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL) {
    dispatchEvent(new HashChangeEvent("hashchange", {
      oldURL: oldURL.toString(),
      newURL: newURL.toString()
    }));
  }
  notifyApplicationAfterFrameLoad(frame) {
    return dispatch("turbo:frame-load", { target: frame });
  }
  notifyApplicationAfterFrameRender(fetchResponse, frame) {
    return dispatch("turbo:frame-render", {
      detail: { fetchResponse },
      target: frame,
      cancelable: true
    });
  }
  submissionIsNavigatable(form, submitter) {
    if (this.formMode == "off") {
      return false;
    } else {
      const submitterIsNavigatable = submitter ? this.elementIsNavigatable(submitter) : true;
      if (this.formMode == "optin") {
        return submitterIsNavigatable && form.closest('[data-turbo="true"]') != null;
      } else {
        return submitterIsNavigatable && this.elementIsNavigatable(form);
      }
    }
  }
  elementIsNavigatable(element) {
    const container = findClosestRecursively(element, "[data-turbo]");
    const withinFrame = findClosestRecursively(element, "turbo-frame");
    if (this.drive || withinFrame) {
      if (container) {
        return container.getAttribute("data-turbo") != "false";
      } else {
        return true;
      }
    } else {
      if (container) {
        return container.getAttribute("data-turbo") == "true";
      } else {
        return false;
      }
    }
  }
  getActionForLink(link) {
    return getVisitAction(link) || "advance";
  }
  get snapshot() {
    return this.view.snapshot;
  }
}
var deprecatedLocationPropertyDescriptors = {
  absoluteURL: {
    get() {
      return this.toString();
    }
  }
};

class Cache {
  constructor(session) {
    this.session = session;
  }
  clear() {
    this.session.clearCache();
  }
  resetCacheControl() {
    this.setCacheControl("");
  }
  exemptPageFromCache() {
    this.setCacheControl("no-cache");
  }
  exemptPageFromPreview() {
    this.setCacheControl("no-preview");
  }
  setCacheControl(value) {
    setMetaContent("turbo-cache-control", value);
  }
}
var StreamActions = {
  after() {
    this.targetElements.forEach((e) => {
      var _a;
      return (_a = e.parentElement) === null || _a === undefined ? undefined : _a.insertBefore(this.templateContent, e.nextSibling);
    });
  },
  append() {
    this.removeDuplicateTargetChildren();
    this.targetElements.forEach((e) => e.append(this.templateContent));
  },
  before() {
    this.targetElements.forEach((e) => {
      var _a;
      return (_a = e.parentElement) === null || _a === undefined ? undefined : _a.insertBefore(this.templateContent, e);
    });
  },
  prepend() {
    this.removeDuplicateTargetChildren();
    this.targetElements.forEach((e) => e.prepend(this.templateContent));
  },
  remove() {
    this.targetElements.forEach((e) => e.remove());
  },
  replace() {
    this.targetElements.forEach((e) => e.replaceWith(this.templateContent));
  },
  update() {
    this.targetElements.forEach((targetElement) => {
      targetElement.innerHTML = "";
      targetElement.append(this.templateContent);
    });
  }
};
var session = new Session;
var cache = new Cache(session);
var { navigator: navigator$1 } = session;
var Turbo = Object.freeze({
  __proto__: null,
  navigator: navigator$1,
  session,
  cache,
  PageRenderer,
  PageSnapshot,
  FrameRenderer,
  start,
  registerAdapter,
  visit,
  connectStreamSource,
  disconnectStreamSource,
  renderStreamMessage,
  clearCache,
  setProgressBarDelay,
  setConfirmMethod,
  setFormMode,
  StreamActions
});

class TurboFrameMissingError extends Error {
}

class FrameController {
  constructor(element) {
    this.fetchResponseLoaded = (_fetchResponse) => {
    };
    this.currentFetchRequest = null;
    this.resolveVisitPromise = () => {
    };
    this.connected = false;
    this.hasBeenLoaded = false;
    this.ignoredAttributes = new Set;
    this.action = null;
    this.visitCachedSnapshot = ({ element: element2 }) => {
      const frame = element2.querySelector("#" + this.element.id);
      if (frame && this.previousFrameElement) {
        frame.replaceChildren(...this.previousFrameElement.children);
      }
      delete this.previousFrameElement;
    };
    this.element = element;
    this.view = new FrameView(this, this.element);
    this.appearanceObserver = new AppearanceObserver(this, this.element);
    this.formLinkClickObserver = new FormLinkClickObserver(this, this.element);
    this.linkInterceptor = new LinkInterceptor(this, this.element);
    this.restorationIdentifier = uuid();
    this.formSubmitObserver = new FormSubmitObserver(this, this.element);
  }
  connect() {
    if (!this.connected) {
      this.connected = true;
      if (this.loadingStyle == FrameLoadingStyle.lazy) {
        this.appearanceObserver.start();
      } else {
        this.loadSourceURL();
      }
      this.formLinkClickObserver.start();
      this.linkInterceptor.start();
      this.formSubmitObserver.start();
    }
  }
  disconnect() {
    if (this.connected) {
      this.connected = false;
      this.appearanceObserver.stop();
      this.formLinkClickObserver.stop();
      this.linkInterceptor.stop();
      this.formSubmitObserver.stop();
    }
  }
  disabledChanged() {
    if (this.loadingStyle == FrameLoadingStyle.eager) {
      this.loadSourceURL();
    }
  }
  sourceURLChanged() {
    if (this.isIgnoringChangesTo("src"))
      return;
    if (this.element.isConnected) {
      this.complete = false;
    }
    if (this.loadingStyle == FrameLoadingStyle.eager || this.hasBeenLoaded) {
      this.loadSourceURL();
    }
  }
  sourceURLReloaded() {
    const { src } = this.element;
    this.ignoringChangesToAttribute("complete", () => {
      this.element.removeAttribute("complete");
    });
    this.element.src = null;
    this.element.src = src;
    return this.element.loaded;
  }
  completeChanged() {
    if (this.isIgnoringChangesTo("complete"))
      return;
    this.loadSourceURL();
  }
  loadingStyleChanged() {
    if (this.loadingStyle == FrameLoadingStyle.lazy) {
      this.appearanceObserver.start();
    } else {
      this.appearanceObserver.stop();
      this.loadSourceURL();
    }
  }
  async loadSourceURL() {
    if (this.enabled && this.isActive && !this.complete && this.sourceURL) {
      this.element.loaded = this.visit(expandURL(this.sourceURL));
      this.appearanceObserver.stop();
      await this.element.loaded;
      this.hasBeenLoaded = true;
    }
  }
  async loadResponse(fetchResponse) {
    if (fetchResponse.redirected || fetchResponse.succeeded && fetchResponse.isHTML) {
      this.sourceURL = fetchResponse.response.url;
    }
    try {
      const html = await fetchResponse.responseHTML;
      if (html) {
        const document2 = parseHTMLDocument(html);
        const pageSnapshot = PageSnapshot.fromDocument(document2);
        if (pageSnapshot.isVisitable) {
          await this.loadFrameResponse(fetchResponse, document2);
        } else {
          await this.handleUnvisitableFrameResponse(fetchResponse);
        }
      }
    } finally {
      this.fetchResponseLoaded = () => {
      };
    }
  }
  elementAppearedInViewport(element) {
    this.proposeVisitIfNavigatedWithAction(element, element);
    this.loadSourceURL();
  }
  willSubmitFormLinkToLocation(link) {
    return this.shouldInterceptNavigation(link);
  }
  submittedFormLinkToLocation(link, _location, form) {
    const frame = this.findFrameElement(link);
    if (frame)
      form.setAttribute("data-turbo-frame", frame.id);
  }
  shouldInterceptLinkClick(element, _location, _event) {
    return this.shouldInterceptNavigation(element);
  }
  linkClickIntercepted(element, location2) {
    this.navigateFrame(element, location2);
  }
  willSubmitForm(element, submitter) {
    return element.closest("turbo-frame") == this.element && this.shouldInterceptNavigation(element, submitter);
  }
  formSubmitted(element, submitter) {
    if (this.formSubmission) {
      this.formSubmission.stop();
    }
    this.formSubmission = new FormSubmission(this, element, submitter);
    const { fetchRequest } = this.formSubmission;
    this.prepareRequest(fetchRequest);
    this.formSubmission.start();
  }
  prepareRequest(request) {
    var _a;
    request.headers["Turbo-Frame"] = this.id;
    if ((_a = this.currentNavigationElement) === null || _a === undefined ? undefined : _a.hasAttribute("data-turbo-stream")) {
      request.acceptResponseType(StreamMessage.contentType);
    }
  }
  requestStarted(_request) {
    markAsBusy(this.element);
  }
  requestPreventedHandlingResponse(_request, _response) {
    this.resolveVisitPromise();
  }
  async requestSucceededWithResponse(request, response) {
    await this.loadResponse(response);
    this.resolveVisitPromise();
  }
  async requestFailedWithResponse(request, response) {
    await this.loadResponse(response);
    this.resolveVisitPromise();
  }
  requestErrored(request, error) {
    console.error(error);
    this.resolveVisitPromise();
  }
  requestFinished(_request) {
    clearBusyState(this.element);
  }
  formSubmissionStarted({ formElement }) {
    markAsBusy(formElement, this.findFrameElement(formElement));
  }
  formSubmissionSucceededWithResponse(formSubmission, response) {
    const frame = this.findFrameElement(formSubmission.formElement, formSubmission.submitter);
    frame.delegate.proposeVisitIfNavigatedWithAction(frame, formSubmission.formElement, formSubmission.submitter);
    frame.delegate.loadResponse(response);
    if (!formSubmission.isSafe) {
      session.clearCache();
    }
  }
  formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
    this.element.delegate.loadResponse(fetchResponse);
    session.clearCache();
  }
  formSubmissionErrored(formSubmission, error) {
    console.error(error);
  }
  formSubmissionFinished({ formElement }) {
    clearBusyState(formElement, this.findFrameElement(formElement));
  }
  allowsImmediateRender({ element: newFrame }, options) {
    const event2 = dispatch("turbo:before-frame-render", {
      target: this.element,
      detail: Object.assign({ newFrame }, options),
      cancelable: true
    });
    const { defaultPrevented, detail: { render } } = event2;
    if (this.view.renderer && render) {
      this.view.renderer.renderElement = render;
    }
    return !defaultPrevented;
  }
  viewRenderedSnapshot(_snapshot, _isPreview) {
  }
  preloadOnLoadLinksForView(element) {
    session.preloadOnLoadLinksForView(element);
  }
  viewInvalidated() {
  }
  willRenderFrame(currentElement, _newElement) {
    this.previousFrameElement = currentElement.cloneNode(true);
  }
  async loadFrameResponse(fetchResponse, document2) {
    const newFrameElement = await this.extractForeignFrameElement(document2.body);
    if (newFrameElement) {
      const snapshot = new Snapshot(newFrameElement);
      const renderer = new FrameRenderer(this, this.view.snapshot, snapshot, FrameRenderer.renderElement, false, false);
      if (this.view.renderPromise)
        await this.view.renderPromise;
      this.changeHistory();
      await this.view.render(renderer);
      this.complete = true;
      session.frameRendered(fetchResponse, this.element);
      session.frameLoaded(this.element);
      this.fetchResponseLoaded(fetchResponse);
    } else if (this.willHandleFrameMissingFromResponse(fetchResponse)) {
      this.handleFrameMissingFromResponse(fetchResponse);
    }
  }
  async visit(url) {
    var _a;
    const request = new FetchRequest(this, FetchMethod.get, url, new URLSearchParams, this.element);
    (_a = this.currentFetchRequest) === null || _a === undefined || _a.cancel();
    this.currentFetchRequest = request;
    return new Promise((resolve) => {
      this.resolveVisitPromise = () => {
        this.resolveVisitPromise = () => {
        };
        this.currentFetchRequest = null;
        resolve();
      };
      request.perform();
    });
  }
  navigateFrame(element, url, submitter) {
    const frame = this.findFrameElement(element, submitter);
    frame.delegate.proposeVisitIfNavigatedWithAction(frame, element, submitter);
    this.withCurrentNavigationElement(element, () => {
      frame.src = url;
    });
  }
  proposeVisitIfNavigatedWithAction(frame, element, submitter) {
    this.action = getVisitAction(submitter, element, frame);
    if (this.action) {
      const pageSnapshot = PageSnapshot.fromElement(frame).clone();
      const { visitCachedSnapshot } = frame.delegate;
      frame.delegate.fetchResponseLoaded = (fetchResponse) => {
        if (frame.src) {
          const { statusCode, redirected } = fetchResponse;
          const responseHTML = frame.ownerDocument.documentElement.outerHTML;
          const response = { statusCode, redirected, responseHTML };
          const options = {
            response,
            visitCachedSnapshot,
            willRender: false,
            updateHistory: false,
            restorationIdentifier: this.restorationIdentifier,
            snapshot: pageSnapshot
          };
          if (this.action)
            options.action = this.action;
          session.visit(frame.src, options);
        }
      };
    }
  }
  changeHistory() {
    if (this.action) {
      const method = getHistoryMethodForAction(this.action);
      session.history.update(method, expandURL(this.element.src || ""), this.restorationIdentifier);
    }
  }
  async handleUnvisitableFrameResponse(fetchResponse) {
    console.warn(`The response (${fetchResponse.statusCode}) from <turbo-frame id="${this.element.id}"> is performing a full page visit due to turbo-visit-control.`);
    await this.visitResponse(fetchResponse.response);
  }
  willHandleFrameMissingFromResponse(fetchResponse) {
    this.element.setAttribute("complete", "");
    const response = fetchResponse.response;
    const visit2 = async (url, options = {}) => {
      if (url instanceof Response) {
        this.visitResponse(url);
      } else {
        session.visit(url, options);
      }
    };
    const event2 = dispatch("turbo:frame-missing", {
      target: this.element,
      detail: { response, visit: visit2 },
      cancelable: true
    });
    return !event2.defaultPrevented;
  }
  handleFrameMissingFromResponse(fetchResponse) {
    this.view.missing();
    this.throwFrameMissingError(fetchResponse);
  }
  throwFrameMissingError(fetchResponse) {
    const message = `The response (${fetchResponse.statusCode}) did not contain the expected <turbo-frame id="${this.element.id}"> and will be ignored. To perform a full page visit instead, set turbo-visit-control to reload.`;
    throw new TurboFrameMissingError(message);
  }
  async visitResponse(response) {
    const wrapped = new FetchResponse(response);
    const responseHTML = await wrapped.responseHTML;
    const { location: location2, redirected, statusCode } = wrapped;
    return session.visit(location2, { response: { redirected, statusCode, responseHTML } });
  }
  findFrameElement(element, submitter) {
    var _a;
    const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
    return (_a = getFrameElementById(id)) !== null && _a !== undefined ? _a : this.element;
  }
  async extractForeignFrameElement(container) {
    let element;
    const id = CSS.escape(this.id);
    try {
      element = activateElement(container.querySelector(`turbo-frame#${id}`), this.sourceURL);
      if (element) {
        return element;
      }
      element = activateElement(container.querySelector(`turbo-frame[src][recurse~=${id}]`), this.sourceURL);
      if (element) {
        await element.loaded;
        return await this.extractForeignFrameElement(element);
      }
    } catch (error) {
      console.error(error);
      return new FrameElement;
    }
    return null;
  }
  formActionIsVisitable(form, submitter) {
    const action = getAction(form, submitter);
    return locationIsVisitable(expandURL(action), this.rootLocation);
  }
  shouldInterceptNavigation(element, submitter) {
    const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
    if (element instanceof HTMLFormElement && !this.formActionIsVisitable(element, submitter)) {
      return false;
    }
    if (!this.enabled || id == "_top") {
      return false;
    }
    if (id) {
      const frameElement = getFrameElementById(id);
      if (frameElement) {
        return !frameElement.disabled;
      }
    }
    if (!session.elementIsNavigatable(element)) {
      return false;
    }
    if (submitter && !session.elementIsNavigatable(submitter)) {
      return false;
    }
    return true;
  }
  get id() {
    return this.element.id;
  }
  get enabled() {
    return !this.element.disabled;
  }
  get sourceURL() {
    if (this.element.src) {
      return this.element.src;
    }
  }
  set sourceURL(sourceURL) {
    this.ignoringChangesToAttribute("src", () => {
      this.element.src = sourceURL !== null && sourceURL !== undefined ? sourceURL : null;
    });
  }
  get loadingStyle() {
    return this.element.loading;
  }
  get isLoading() {
    return this.formSubmission !== undefined || this.resolveVisitPromise() !== undefined;
  }
  get complete() {
    return this.element.hasAttribute("complete");
  }
  set complete(value) {
    this.ignoringChangesToAttribute("complete", () => {
      if (value) {
        this.element.setAttribute("complete", "");
      } else {
        this.element.removeAttribute("complete");
      }
    });
  }
  get isActive() {
    return this.element.isActive && this.connected;
  }
  get rootLocation() {
    var _a;
    const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
    const root = (_a = meta === null || meta === undefined ? undefined : meta.content) !== null && _a !== undefined ? _a : "/";
    return expandURL(root);
  }
  isIgnoringChangesTo(attributeName) {
    return this.ignoredAttributes.has(attributeName);
  }
  ignoringChangesToAttribute(attributeName, callback) {
    this.ignoredAttributes.add(attributeName);
    callback();
    this.ignoredAttributes.delete(attributeName);
  }
  withCurrentNavigationElement(element, callback) {
    this.currentNavigationElement = element;
    callback();
    delete this.currentNavigationElement;
  }
}

class StreamElement extends HTMLElement {
  static async renderElement(newElement) {
    await newElement.performAction();
  }
  async connectedCallback() {
    try {
      await this.render();
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }
  async render() {
    var _a;
    return (_a = this.renderPromise) !== null && _a !== undefined ? _a : this.renderPromise = (async () => {
      const event2 = this.beforeRenderEvent;
      if (this.dispatchEvent(event2)) {
        await nextAnimationFrame();
        await event2.detail.render(this);
      }
    })();
  }
  disconnect() {
    try {
      this.remove();
    } catch (_a) {
    }
  }
  removeDuplicateTargetChildren() {
    this.duplicateChildren.forEach((c) => c.remove());
  }
  get duplicateChildren() {
    var _a;
    const existingChildren = this.targetElements.flatMap((e) => [...e.children]).filter((c) => !!c.id);
    const newChildrenIds = [...((_a = this.templateContent) === null || _a === undefined ? undefined : _a.children) || []].filter((c) => !!c.id).map((c) => c.id);
    return existingChildren.filter((c) => newChildrenIds.includes(c.id));
  }
  get performAction() {
    if (this.action) {
      const actionFunction = StreamActions[this.action];
      if (actionFunction) {
        return actionFunction;
      }
      this.raise("unknown action");
    }
    this.raise("action attribute is missing");
  }
  get targetElements() {
    if (this.target) {
      return this.targetElementsById;
    } else if (this.targets) {
      return this.targetElementsByQuery;
    } else {
      this.raise("target or targets attribute is missing");
    }
  }
  get templateContent() {
    return this.templateElement.content.cloneNode(true);
  }
  get templateElement() {
    if (this.firstElementChild === null) {
      const template = this.ownerDocument.createElement("template");
      this.appendChild(template);
      return template;
    } else if (this.firstElementChild instanceof HTMLTemplateElement) {
      return this.firstElementChild;
    }
    this.raise("first child element must be a <template> element");
  }
  get action() {
    return this.getAttribute("action");
  }
  get target() {
    return this.getAttribute("target");
  }
  get targets() {
    return this.getAttribute("targets");
  }
  raise(message) {
    throw new Error(`${this.description}: ${message}`);
  }
  get description() {
    var _a, _b;
    return (_b = ((_a = this.outerHTML.match(/<[^>]+>/)) !== null && _a !== undefined ? _a : [])[0]) !== null && _b !== undefined ? _b : "<turbo-stream>";
  }
  get beforeRenderEvent() {
    return new CustomEvent("turbo:before-stream-render", {
      bubbles: true,
      cancelable: true,
      detail: { newStream: this, render: StreamElement.renderElement }
    });
  }
  get targetElementsById() {
    var _a;
    const element = (_a = this.ownerDocument) === null || _a === undefined ? undefined : _a.getElementById(this.target);
    if (element !== null) {
      return [element];
    } else {
      return [];
    }
  }
  get targetElementsByQuery() {
    var _a;
    const elements = (_a = this.ownerDocument) === null || _a === undefined ? undefined : _a.querySelectorAll(this.targets);
    if (elements.length !== 0) {
      return Array.prototype.slice.call(elements);
    } else {
      return [];
    }
  }
}

class StreamSourceElement extends HTMLElement {
  constructor() {
    super(...arguments);
    this.streamSource = null;
  }
  connectedCallback() {
    this.streamSource = this.src.match(/^ws{1,2}:/) ? new WebSocket(this.src) : new EventSource(this.src);
    connectStreamSource(this.streamSource);
  }
  disconnectedCallback() {
    if (this.streamSource) {
      disconnectStreamSource(this.streamSource);
    }
  }
  get src() {
    return this.getAttribute("src") || "";
  }
}
FrameElement.delegateConstructor = FrameController;
if (customElements.get("turbo-frame") === undefined) {
  customElements.define("turbo-frame", FrameElement);
}
if (customElements.get("turbo-stream") === undefined) {
  customElements.define("turbo-stream", StreamElement);
}
if (customElements.get("turbo-stream-source") === undefined) {
  customElements.define("turbo-stream-source", StreamSourceElement);
}
(() => {
  let element = document.currentScript;
  if (!element)
    return;
  if (element.hasAttribute("data-turbo-suppress-warning"))
    return;
  element = element.parentElement;
  while (element) {
    if (element == document.body) {
      return console.warn(unindent`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `, element.outerHTML);
    }
    element = element.parentElement;
  }
})();
window.Turbo = Turbo;
start();

// node_modules/@hotwired/stimulus/dist/stimulus.js
var extendEvent = function(event2) {
  if ("immediatePropagationStopped" in event2) {
    return event2;
  } else {
    const { stopImmediatePropagation } = event2;
    return Object.assign(event2, {
      immediatePropagationStopped: false,
      stopImmediatePropagation() {
        this.immediatePropagationStopped = true;
        stopImmediatePropagation.call(this);
      }
    });
  }
};
var parseActionDescriptorString = function(descriptorString) {
  const source = descriptorString.trim();
  const matches = source.match(descriptorPattern) || [];
  let eventName = matches[2];
  let keyFilter = matches[3];
  if (keyFilter && !["keydown", "keyup", "keypress"].includes(eventName)) {
    eventName += `.${keyFilter}`;
    keyFilter = "";
  }
  return {
    eventTarget: parseEventTarget(matches[4]),
    eventName,
    eventOptions: matches[7] ? parseEventOptions(matches[7]) : {},
    identifier: matches[5],
    methodName: matches[6],
    keyFilter: matches[1] || keyFilter
  };
};
var parseEventTarget = function(eventTargetName) {
  if (eventTargetName == "window") {
    return window;
  } else if (eventTargetName == "document") {
    return document;
  }
};
var parseEventOptions = function(eventOptions) {
  return eventOptions.split(":").reduce((options, token) => Object.assign(options, { [token.replace(/^!/, "")]: !/^!/.test(token) }), {});
};
var stringifyEventTarget = function(eventTarget) {
  if (eventTarget == window) {
    return "window";
  } else if (eventTarget == document) {
    return "document";
  }
};
var camelize = function(value) {
  return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase());
};
var namespaceCamelize = function(value) {
  return camelize(value.replace(/--/g, "-").replace(/__/g, "_"));
};
var capitalize = function(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
var dasherize = function(value) {
  return value.replace(/([A-Z])/g, (_, char) => `-${char.toLowerCase()}`);
};
var tokenize = function(value) {
  return value.match(/[^\s]+/g) || [];
};
var isSomething = function(object) {
  return object !== null && object !== undefined;
};
var hasProperty = function(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
};
var getDefaultEventNameForElement = function(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName in defaultEventNames) {
    return defaultEventNames[tagName](element);
  }
};
var error = function(message) {
  throw new Error(message);
};
var typecast = function(value) {
  try {
    return JSON.parse(value);
  } catch (o_O) {
    return value;
  }
};
var add = function(map, key, value) {
  fetch2(map, key).add(value);
};
var del = function(map, key, value) {
  fetch2(map, key).delete(value);
  prune(map, key);
};
var fetch2 = function(map, key) {
  let values = map.get(key);
  if (!values) {
    values = new Set;
    map.set(key, values);
  }
  return values;
};
var prune = function(map, key) {
  const values = map.get(key);
  if (values != null && values.size == 0) {
    map.delete(key);
  }
};
var parseTokenString = function(tokenString, element, attributeName) {
  return tokenString.trim().split(/\s+/).filter((content) => content.length).map((content, index) => ({ element, attributeName, content, index }));
};
var zip = function(left, right) {
  const length = Math.max(left.length, right.length);
  return Array.from({ length }, (_, index) => [left[index], right[index]]);
};
var tokensAreEqual = function(left, right) {
  return left && right && left.index == right.index && left.content == right.content;
};
var readInheritableStaticArrayValues = function(constructor, propertyName) {
  const ancestors = getAncestorsForConstructor(constructor);
  return Array.from(ancestors.reduce((values, constructor2) => {
    getOwnStaticArrayValues(constructor2, propertyName).forEach((name) => values.add(name));
    return values;
  }, new Set));
};
var readInheritableStaticObjectPairs = function(constructor, propertyName) {
  const ancestors = getAncestorsForConstructor(constructor);
  return ancestors.reduce((pairs, constructor2) => {
    pairs.push(...getOwnStaticObjectPairs(constructor2, propertyName));
    return pairs;
  }, []);
};
var getAncestorsForConstructor = function(constructor) {
  const ancestors = [];
  while (constructor) {
    ancestors.push(constructor);
    constructor = Object.getPrototypeOf(constructor);
  }
  return ancestors.reverse();
};
var getOwnStaticArrayValues = function(constructor, propertyName) {
  const definition = constructor[propertyName];
  return Array.isArray(definition) ? definition : [];
};
var getOwnStaticObjectPairs = function(constructor, propertyName) {
  const definition = constructor[propertyName];
  return definition ? Object.keys(definition).map((key) => [key, definition[key]]) : [];
};
var bless = function(constructor) {
  return shadow(constructor, getBlessedProperties(constructor));
};
var shadow = function(constructor, properties) {
  const shadowConstructor = extend(constructor);
  const shadowProperties = getShadowProperties(constructor.prototype, properties);
  Object.defineProperties(shadowConstructor.prototype, shadowProperties);
  return shadowConstructor;
};
var getBlessedProperties = function(constructor) {
  const blessings = readInheritableStaticArrayValues(constructor, "blessings");
  return blessings.reduce((blessedProperties, blessing) => {
    const properties = blessing(constructor);
    for (const key in properties) {
      const descriptor = blessedProperties[key] || {};
      blessedProperties[key] = Object.assign(descriptor, properties[key]);
    }
    return blessedProperties;
  }, {});
};
var getShadowProperties = function(prototype, properties) {
  return getOwnKeys(properties).reduce((shadowProperties, key) => {
    const descriptor = getShadowedDescriptor(prototype, properties, key);
    if (descriptor) {
      Object.assign(shadowProperties, { [key]: descriptor });
    }
    return shadowProperties;
  }, {});
};
var getShadowedDescriptor = function(prototype, properties, key) {
  const shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
  const shadowedByValue = shadowingDescriptor && ("value" in shadowingDescriptor);
  if (!shadowedByValue) {
    const descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
    if (shadowingDescriptor) {
      descriptor.get = shadowingDescriptor.get || descriptor.get;
      descriptor.set = shadowingDescriptor.set || descriptor.set;
    }
    return descriptor;
  }
};
var blessDefinition = function(definition) {
  return {
    identifier: definition.identifier,
    controllerConstructor: bless(definition.controllerConstructor)
  };
};
var attributeValueContainsToken = function(attributeName, token) {
  return `[${attributeName}~="${token}"]`;
};
var objectFromEntries = function(array) {
  return array.reduce((memo, [k, v]) => Object.assign(Object.assign({}, memo), { [k]: v }), {});
};
var domReady = function() {
  return new Promise((resolve) => {
    if (document.readyState == "loading") {
      document.addEventListener("DOMContentLoaded", () => resolve());
    } else {
      resolve();
    }
  });
};
var ClassPropertiesBlessing = function(constructor) {
  const classes = readInheritableStaticArrayValues(constructor, "classes");
  return classes.reduce((properties, classDefinition) => {
    return Object.assign(properties, propertiesForClassDefinition(classDefinition));
  }, {});
};
var propertiesForClassDefinition = function(key) {
  return {
    [`${key}Class`]: {
      get() {
        const { classes } = this;
        if (classes.has(key)) {
          return classes.get(key);
        } else {
          const attribute = classes.getAttributeName(key);
          throw new Error(`Missing attribute "${attribute}"`);
        }
      }
    },
    [`${key}Classes`]: {
      get() {
        return this.classes.getAll(key);
      }
    },
    [`has${capitalize(key)}Class`]: {
      get() {
        return this.classes.has(key);
      }
    }
  };
};
var OutletPropertiesBlessing = function(constructor) {
  const outlets = readInheritableStaticArrayValues(constructor, "outlets");
  return outlets.reduce((properties, outletDefinition) => {
    return Object.assign(properties, propertiesForOutletDefinition(outletDefinition));
  }, {});
};
var getOutletController = function(controller, element, identifier) {
  return controller.application.getControllerForElementAndIdentifier(element, identifier);
};
var getControllerAndEnsureConnectedScope = function(controller, element, outletName) {
  let outletController = getOutletController(controller, element, outletName);
  if (outletController)
    return outletController;
  controller.application.router.proposeToConnectScopeForElementAndIdentifier(element, outletName);
  outletController = getOutletController(controller, element, outletName);
  if (outletController)
    return outletController;
};
var propertiesForOutletDefinition = function(name) {
  const camelizedName = namespaceCamelize(name);
  return {
    [`${camelizedName}Outlet`]: {
      get() {
        const outletElement = this.outlets.find(name);
        const selector = this.outlets.getSelectorForOutletName(name);
        if (outletElement) {
          const outletController = getControllerAndEnsureConnectedScope(this, outletElement, name);
          if (outletController)
            return outletController;
          throw new Error(`The provided outlet element is missing an outlet controller "${name}" instance for host controller "${this.identifier}"`);
        }
        throw new Error(`Missing outlet element "${name}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${selector}".`);
      }
    },
    [`${camelizedName}Outlets`]: {
      get() {
        const outlets = this.outlets.findAll(name);
        if (outlets.length > 0) {
          return outlets.map((outletElement) => {
            const outletController = getControllerAndEnsureConnectedScope(this, outletElement, name);
            if (outletController)
              return outletController;
            console.warn(`The provided outlet element is missing an outlet controller "${name}" instance for host controller "${this.identifier}"`, outletElement);
          }).filter((controller) => controller);
        }
        return [];
      }
    },
    [`${camelizedName}OutletElement`]: {
      get() {
        const outletElement = this.outlets.find(name);
        const selector = this.outlets.getSelectorForOutletName(name);
        if (outletElement) {
          return outletElement;
        } else {
          throw new Error(`Missing outlet element "${name}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${selector}".`);
        }
      }
    },
    [`${camelizedName}OutletElements`]: {
      get() {
        return this.outlets.findAll(name);
      }
    },
    [`has${capitalize(camelizedName)}Outlet`]: {
      get() {
        return this.outlets.has(name);
      }
    }
  };
};
var TargetPropertiesBlessing = function(constructor) {
  const targets = readInheritableStaticArrayValues(constructor, "targets");
  return targets.reduce((properties, targetDefinition) => {
    return Object.assign(properties, propertiesForTargetDefinition(targetDefinition));
  }, {});
};
var propertiesForTargetDefinition = function(name) {
  return {
    [`${name}Target`]: {
      get() {
        const target = this.targets.find(name);
        if (target) {
          return target;
        } else {
          throw new Error(`Missing target element "${name}" for "${this.identifier}" controller`);
        }
      }
    },
    [`${name}Targets`]: {
      get() {
        return this.targets.findAll(name);
      }
    },
    [`has${capitalize(name)}Target`]: {
      get() {
        return this.targets.has(name);
      }
    }
  };
};
var ValuePropertiesBlessing = function(constructor) {
  const valueDefinitionPairs = readInheritableStaticObjectPairs(constructor, "values");
  const propertyDescriptorMap = {
    valueDescriptorMap: {
      get() {
        return valueDefinitionPairs.reduce((result, valueDefinitionPair) => {
          const valueDescriptor = parseValueDefinitionPair(valueDefinitionPair, this.identifier);
          const attributeName = this.data.getAttributeNameForKey(valueDescriptor.key);
          return Object.assign(result, { [attributeName]: valueDescriptor });
        }, {});
      }
    }
  };
  return valueDefinitionPairs.reduce((properties, valueDefinitionPair) => {
    return Object.assign(properties, propertiesForValueDefinitionPair(valueDefinitionPair));
  }, propertyDescriptorMap);
};
var propertiesForValueDefinitionPair = function(valueDefinitionPair, controller) {
  const definition = parseValueDefinitionPair(valueDefinitionPair, controller);
  const { key, name, reader: read, writer: write } = definition;
  return {
    [name]: {
      get() {
        const value = this.data.get(key);
        if (value !== null) {
          return read(value);
        } else {
          return definition.defaultValue;
        }
      },
      set(value) {
        if (value === undefined) {
          this.data.delete(key);
        } else {
          this.data.set(key, write(value));
        }
      }
    },
    [`has${capitalize(name)}`]: {
      get() {
        return this.data.has(key) || definition.hasCustomDefaultValue;
      }
    }
  };
};
var parseValueDefinitionPair = function([token, typeDefinition], controller) {
  return valueDescriptorForTokenAndTypeDefinition({
    controller,
    token,
    typeDefinition
  });
};
var parseValueTypeConstant = function(constant) {
  switch (constant) {
    case Array:
      return "array";
    case Boolean:
      return "boolean";
    case Number:
      return "number";
    case Object:
      return "object";
    case String:
      return "string";
  }
};
var parseValueTypeDefault = function(defaultValue) {
  switch (typeof defaultValue) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
  }
  if (Array.isArray(defaultValue))
    return "array";
  if (Object.prototype.toString.call(defaultValue) === "[object Object]")
    return "object";
};
var parseValueTypeObject = function(payload) {
  const { controller, token, typeObject } = payload;
  const hasType = isSomething(typeObject.type);
  const hasDefault = isSomething(typeObject.default);
  const fullObject = hasType && hasDefault;
  const onlyType = hasType && !hasDefault;
  const onlyDefault = !hasType && hasDefault;
  const typeFromObject = parseValueTypeConstant(typeObject.type);
  const typeFromDefaultValue = parseValueTypeDefault(payload.typeObject.default);
  if (onlyType)
    return typeFromObject;
  if (onlyDefault)
    return typeFromDefaultValue;
  if (typeFromObject !== typeFromDefaultValue) {
    const propertyPath = controller ? `${controller}.${token}` : token;
    throw new Error(`The specified default value for the Stimulus Value "${propertyPath}" must match the defined type "${typeFromObject}". The provided default value of "${typeObject.default}" is of type "${typeFromDefaultValue}".`);
  }
  if (fullObject)
    return typeFromObject;
};
var parseValueTypeDefinition = function(payload) {
  const { controller, token, typeDefinition } = payload;
  const typeObject = { controller, token, typeObject: typeDefinition };
  const typeFromObject = parseValueTypeObject(typeObject);
  const typeFromDefaultValue = parseValueTypeDefault(typeDefinition);
  const typeFromConstant = parseValueTypeConstant(typeDefinition);
  const type = typeFromObject || typeFromDefaultValue || typeFromConstant;
  if (type)
    return type;
  const propertyPath = controller ? `${controller}.${typeDefinition}` : token;
  throw new Error(`Unknown value type "${propertyPath}" for "${token}" value`);
};
var defaultValueForDefinition = function(typeDefinition) {
  const constant = parseValueTypeConstant(typeDefinition);
  if (constant)
    return defaultValuesByType[constant];
  const hasDefault = hasProperty(typeDefinition, "default");
  const hasType = hasProperty(typeDefinition, "type");
  const typeObject = typeDefinition;
  if (hasDefault)
    return typeObject.default;
  if (hasType) {
    const { type } = typeObject;
    const constantFromType = parseValueTypeConstant(type);
    if (constantFromType)
      return defaultValuesByType[constantFromType];
  }
  return typeDefinition;
};
var valueDescriptorForTokenAndTypeDefinition = function(payload) {
  const { token, typeDefinition } = payload;
  const key = `${dasherize(token)}-value`;
  const type = parseValueTypeDefinition(payload);
  return {
    type,
    key,
    name: camelize(key),
    get defaultValue() {
      return defaultValueForDefinition(typeDefinition);
    },
    get hasCustomDefaultValue() {
      return parseValueTypeDefault(typeDefinition) !== undefined;
    },
    reader: readers[type],
    writer: writers[type] || writers.default
  };
};
var writeJSON = function(value) {
  return JSON.stringify(value);
};
var writeString = function(value) {
  return `${value}`;
};

class EventListener {
  constructor(eventTarget, eventName, eventOptions) {
    this.eventTarget = eventTarget;
    this.eventName = eventName;
    this.eventOptions = eventOptions;
    this.unorderedBindings = new Set;
  }
  connect() {
    this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
  }
  disconnect() {
    this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
  }
  bindingConnected(binding) {
    this.unorderedBindings.add(binding);
  }
  bindingDisconnected(binding) {
    this.unorderedBindings.delete(binding);
  }
  handleEvent(event2) {
    const extendedEvent = extendEvent(event2);
    for (const binding of this.bindings) {
      if (extendedEvent.immediatePropagationStopped) {
        break;
      } else {
        binding.handleEvent(extendedEvent);
      }
    }
  }
  hasBindings() {
    return this.unorderedBindings.size > 0;
  }
  get bindings() {
    return Array.from(this.unorderedBindings).sort((left, right) => {
      const leftIndex = left.index, rightIndex = right.index;
      return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
    });
  }
}

class Dispatcher {
  constructor(application) {
    this.application = application;
    this.eventListenerMaps = new Map;
    this.started = false;
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.eventListeners.forEach((eventListener) => eventListener.connect());
    }
  }
  stop() {
    if (this.started) {
      this.started = false;
      this.eventListeners.forEach((eventListener) => eventListener.disconnect());
    }
  }
  get eventListeners() {
    return Array.from(this.eventListenerMaps.values()).reduce((listeners, map) => listeners.concat(Array.from(map.values())), []);
  }
  bindingConnected(binding) {
    this.fetchEventListenerForBinding(binding).bindingConnected(binding);
  }
  bindingDisconnected(binding, clearEventListeners = false) {
    this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
    if (clearEventListeners)
      this.clearEventListenersForBinding(binding);
  }
  handleError(error2, message, detail = {}) {
    this.application.handleError(error2, `Error ${message}`, detail);
  }
  clearEventListenersForBinding(binding) {
    const eventListener = this.fetchEventListenerForBinding(binding);
    if (!eventListener.hasBindings()) {
      eventListener.disconnect();
      this.removeMappedEventListenerFor(binding);
    }
  }
  removeMappedEventListenerFor(binding) {
    const { eventTarget, eventName, eventOptions } = binding;
    const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
    const cacheKey = this.cacheKey(eventName, eventOptions);
    eventListenerMap.delete(cacheKey);
    if (eventListenerMap.size == 0)
      this.eventListenerMaps.delete(eventTarget);
  }
  fetchEventListenerForBinding(binding) {
    const { eventTarget, eventName, eventOptions } = binding;
    return this.fetchEventListener(eventTarget, eventName, eventOptions);
  }
  fetchEventListener(eventTarget, eventName, eventOptions) {
    const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
    const cacheKey = this.cacheKey(eventName, eventOptions);
    let eventListener = eventListenerMap.get(cacheKey);
    if (!eventListener) {
      eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
      eventListenerMap.set(cacheKey, eventListener);
    }
    return eventListener;
  }
  createEventListener(eventTarget, eventName, eventOptions) {
    const eventListener = new EventListener(eventTarget, eventName, eventOptions);
    if (this.started) {
      eventListener.connect();
    }
    return eventListener;
  }
  fetchEventListenerMapForEventTarget(eventTarget) {
    let eventListenerMap = this.eventListenerMaps.get(eventTarget);
    if (!eventListenerMap) {
      eventListenerMap = new Map;
      this.eventListenerMaps.set(eventTarget, eventListenerMap);
    }
    return eventListenerMap;
  }
  cacheKey(eventName, eventOptions) {
    const parts = [eventName];
    Object.keys(eventOptions).sort().forEach((key) => {
      parts.push(`${eventOptions[key] ? "" : "!"}${key}`);
    });
    return parts.join(":");
  }
}
var defaultActionDescriptorFilters = {
  stop({ event: event2, value }) {
    if (value)
      event2.stopPropagation();
    return true;
  },
  prevent({ event: event2, value }) {
    if (value)
      event2.preventDefault();
    return true;
  },
  self({ event: event2, value, element }) {
    if (value) {
      return element === event2.target;
    } else {
      return true;
    }
  }
};
var descriptorPattern = /^(?:(?:([^.]+?)\+)?(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/;
var allModifiers = ["meta", "ctrl", "alt", "shift"];

class Action {
  constructor(element, index, descriptor, schema) {
    this.element = element;
    this.index = index;
    this.eventTarget = descriptor.eventTarget || element;
    this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
    this.eventOptions = descriptor.eventOptions || {};
    this.identifier = descriptor.identifier || error("missing identifier");
    this.methodName = descriptor.methodName || error("missing method name");
    this.keyFilter = descriptor.keyFilter || "";
    this.schema = schema;
  }
  static forToken(token, schema) {
    return new this(token.element, token.index, parseActionDescriptorString(token.content), schema);
  }
  toString() {
    const eventFilter = this.keyFilter ? `.${this.keyFilter}` : "";
    const eventTarget = this.eventTargetName ? `@${this.eventTargetName}` : "";
    return `${this.eventName}${eventFilter}${eventTarget}->${this.identifier}#${this.methodName}`;
  }
  shouldIgnoreKeyboardEvent(event2) {
    if (!this.keyFilter) {
      return false;
    }
    const filters = this.keyFilter.split("+");
    if (this.keyFilterDissatisfied(event2, filters)) {
      return true;
    }
    const standardFilter = filters.filter((key) => !allModifiers.includes(key))[0];
    if (!standardFilter) {
      return false;
    }
    if (!hasProperty(this.keyMappings, standardFilter)) {
      error(`contains unknown key filter: ${this.keyFilter}`);
    }
    return this.keyMappings[standardFilter].toLowerCase() !== event2.key.toLowerCase();
  }
  shouldIgnoreMouseEvent(event2) {
    if (!this.keyFilter) {
      return false;
    }
    const filters = [this.keyFilter];
    if (this.keyFilterDissatisfied(event2, filters)) {
      return true;
    }
    return false;
  }
  get params() {
    const params = {};
    const pattern = new RegExp(`^data-${this.identifier}-(.+)-param\$`, "i");
    for (const { name, value } of Array.from(this.element.attributes)) {
      const match = name.match(pattern);
      const key = match && match[1];
      if (key) {
        params[camelize(key)] = typecast(value);
      }
    }
    return params;
  }
  get eventTargetName() {
    return stringifyEventTarget(this.eventTarget);
  }
  get keyMappings() {
    return this.schema.keyMappings;
  }
  keyFilterDissatisfied(event2, filters) {
    const [meta, ctrl, alt, shift] = allModifiers.map((modifier) => filters.includes(modifier));
    return event2.metaKey !== meta || event2.ctrlKey !== ctrl || event2.altKey !== alt || event2.shiftKey !== shift;
  }
}
var defaultEventNames = {
  a: () => "click",
  button: () => "click",
  form: () => "submit",
  details: () => "toggle",
  input: (e) => e.getAttribute("type") == "submit" ? "click" : "input",
  select: () => "change",
  textarea: () => "input"
};

class Binding {
  constructor(context, action) {
    this.context = context;
    this.action = action;
  }
  get index() {
    return this.action.index;
  }
  get eventTarget() {
    return this.action.eventTarget;
  }
  get eventOptions() {
    return this.action.eventOptions;
  }
  get identifier() {
    return this.context.identifier;
  }
  handleEvent(event2) {
    const actionEvent = this.prepareActionEvent(event2);
    if (this.willBeInvokedByEvent(event2) && this.applyEventModifiers(actionEvent)) {
      this.invokeWithEvent(actionEvent);
    }
  }
  get eventName() {
    return this.action.eventName;
  }
  get method() {
    const method = this.controller[this.methodName];
    if (typeof method == "function") {
      return method;
    }
    throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`);
  }
  applyEventModifiers(event2) {
    const { element } = this.action;
    const { actionDescriptorFilters } = this.context.application;
    const { controller } = this.context;
    let passes = true;
    for (const [name, value] of Object.entries(this.eventOptions)) {
      if (name in actionDescriptorFilters) {
        const filter = actionDescriptorFilters[name];
        passes = passes && filter({ name, value, event: event2, element, controller });
      } else {
        continue;
      }
    }
    return passes;
  }
  prepareActionEvent(event2) {
    return Object.assign(event2, { params: this.action.params });
  }
  invokeWithEvent(event2) {
    const { target, currentTarget } = event2;
    try {
      this.method.call(this.controller, event2);
      this.context.logDebugActivity(this.methodName, { event: event2, target, currentTarget, action: this.methodName });
    } catch (error2) {
      const { identifier, controller, element, index } = this;
      const detail = { identifier, controller, element, index, event: event2 };
      this.context.handleError(error2, `invoking action "${this.action}"`, detail);
    }
  }
  willBeInvokedByEvent(event2) {
    const eventTarget = event2.target;
    if (event2 instanceof KeyboardEvent && this.action.shouldIgnoreKeyboardEvent(event2)) {
      return false;
    }
    if (event2 instanceof MouseEvent && this.action.shouldIgnoreMouseEvent(event2)) {
      return false;
    }
    if (this.element === eventTarget) {
      return true;
    } else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
      return this.scope.containsElement(eventTarget);
    } else {
      return this.scope.containsElement(this.action.element);
    }
  }
  get controller() {
    return this.context.controller;
  }
  get methodName() {
    return this.action.methodName;
  }
  get element() {
    return this.scope.element;
  }
  get scope() {
    return this.context.scope;
  }
}

class ElementObserver {
  constructor(element, delegate) {
    this.mutationObserverInit = { attributes: true, childList: true, subtree: true };
    this.element = element;
    this.started = false;
    this.delegate = delegate;
    this.elements = new Set;
    this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.mutationObserver.observe(this.element, this.mutationObserverInit);
      this.refresh();
    }
  }
  pause(callback) {
    if (this.started) {
      this.mutationObserver.disconnect();
      this.started = false;
    }
    callback();
    if (!this.started) {
      this.mutationObserver.observe(this.element, this.mutationObserverInit);
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      this.mutationObserver.takeRecords();
      this.mutationObserver.disconnect();
      this.started = false;
    }
  }
  refresh() {
    if (this.started) {
      const matches = new Set(this.matchElementsInTree());
      for (const element of Array.from(this.elements)) {
        if (!matches.has(element)) {
          this.removeElement(element);
        }
      }
      for (const element of Array.from(matches)) {
        this.addElement(element);
      }
    }
  }
  processMutations(mutations) {
    if (this.started) {
      for (const mutation of mutations) {
        this.processMutation(mutation);
      }
    }
  }
  processMutation(mutation) {
    if (mutation.type == "attributes") {
      this.processAttributeChange(mutation.target, mutation.attributeName);
    } else if (mutation.type == "childList") {
      this.processRemovedNodes(mutation.removedNodes);
      this.processAddedNodes(mutation.addedNodes);
    }
  }
  processAttributeChange(element, attributeName) {
    if (this.elements.has(element)) {
      if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
        this.delegate.elementAttributeChanged(element, attributeName);
      } else {
        this.removeElement(element);
      }
    } else if (this.matchElement(element)) {
      this.addElement(element);
    }
  }
  processRemovedNodes(nodes) {
    for (const node of Array.from(nodes)) {
      const element = this.elementFromNode(node);
      if (element) {
        this.processTree(element, this.removeElement);
      }
    }
  }
  processAddedNodes(nodes) {
    for (const node of Array.from(nodes)) {
      const element = this.elementFromNode(node);
      if (element && this.elementIsActive(element)) {
        this.processTree(element, this.addElement);
      }
    }
  }
  matchElement(element) {
    return this.delegate.matchElement(element);
  }
  matchElementsInTree(tree = this.element) {
    return this.delegate.matchElementsInTree(tree);
  }
  processTree(tree, processor) {
    for (const element of this.matchElementsInTree(tree)) {
      processor.call(this, element);
    }
  }
  elementFromNode(node) {
    if (node.nodeType == Node.ELEMENT_NODE) {
      return node;
    }
  }
  elementIsActive(element) {
    if (element.isConnected != this.element.isConnected) {
      return false;
    } else {
      return this.element.contains(element);
    }
  }
  addElement(element) {
    if (!this.elements.has(element)) {
      if (this.elementIsActive(element)) {
        this.elements.add(element);
        if (this.delegate.elementMatched) {
          this.delegate.elementMatched(element);
        }
      }
    }
  }
  removeElement(element) {
    if (this.elements.has(element)) {
      this.elements.delete(element);
      if (this.delegate.elementUnmatched) {
        this.delegate.elementUnmatched(element);
      }
    }
  }
}

class AttributeObserver {
  constructor(element, attributeName, delegate) {
    this.attributeName = attributeName;
    this.delegate = delegate;
    this.elementObserver = new ElementObserver(element, this);
  }
  get element() {
    return this.elementObserver.element;
  }
  get selector() {
    return `[${this.attributeName}]`;
  }
  start() {
    this.elementObserver.start();
  }
  pause(callback) {
    this.elementObserver.pause(callback);
  }
  stop() {
    this.elementObserver.stop();
  }
  refresh() {
    this.elementObserver.refresh();
  }
  get started() {
    return this.elementObserver.started;
  }
  matchElement(element) {
    return element.hasAttribute(this.attributeName);
  }
  matchElementsInTree(tree) {
    const match = this.matchElement(tree) ? [tree] : [];
    const matches = Array.from(tree.querySelectorAll(this.selector));
    return match.concat(matches);
  }
  elementMatched(element) {
    if (this.delegate.elementMatchedAttribute) {
      this.delegate.elementMatchedAttribute(element, this.attributeName);
    }
  }
  elementUnmatched(element) {
    if (this.delegate.elementUnmatchedAttribute) {
      this.delegate.elementUnmatchedAttribute(element, this.attributeName);
    }
  }
  elementAttributeChanged(element, attributeName) {
    if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
      this.delegate.elementAttributeValueChanged(element, attributeName);
    }
  }
}

class Multimap {
  constructor() {
    this.valuesByKey = new Map;
  }
  get keys() {
    return Array.from(this.valuesByKey.keys());
  }
  get values() {
    const sets = Array.from(this.valuesByKey.values());
    return sets.reduce((values, set) => values.concat(Array.from(set)), []);
  }
  get size() {
    const sets = Array.from(this.valuesByKey.values());
    return sets.reduce((size, set) => size + set.size, 0);
  }
  add(key, value) {
    add(this.valuesByKey, key, value);
  }
  delete(key, value) {
    del(this.valuesByKey, key, value);
  }
  has(key, value) {
    const values = this.valuesByKey.get(key);
    return values != null && values.has(value);
  }
  hasKey(key) {
    return this.valuesByKey.has(key);
  }
  hasValue(value) {
    const sets = Array.from(this.valuesByKey.values());
    return sets.some((set) => set.has(value));
  }
  getValuesForKey(key) {
    const values = this.valuesByKey.get(key);
    return values ? Array.from(values) : [];
  }
  getKeysForValue(value) {
    return Array.from(this.valuesByKey).filter(([_key, values]) => values.has(value)).map(([key, _values]) => key);
  }
}
class SelectorObserver {
  constructor(element, selector, delegate, details) {
    this._selector = selector;
    this.details = details;
    this.elementObserver = new ElementObserver(element, this);
    this.delegate = delegate;
    this.matchesByElement = new Multimap;
  }
  get started() {
    return this.elementObserver.started;
  }
  get selector() {
    return this._selector;
  }
  set selector(selector) {
    this._selector = selector;
    this.refresh();
  }
  start() {
    this.elementObserver.start();
  }
  pause(callback) {
    this.elementObserver.pause(callback);
  }
  stop() {
    this.elementObserver.stop();
  }
  refresh() {
    this.elementObserver.refresh();
  }
  get element() {
    return this.elementObserver.element;
  }
  matchElement(element) {
    const { selector } = this;
    if (selector) {
      const matches = element.matches(selector);
      if (this.delegate.selectorMatchElement) {
        return matches && this.delegate.selectorMatchElement(element, this.details);
      }
      return matches;
    } else {
      return false;
    }
  }
  matchElementsInTree(tree) {
    const { selector } = this;
    if (selector) {
      const match = this.matchElement(tree) ? [tree] : [];
      const matches = Array.from(tree.querySelectorAll(selector)).filter((match2) => this.matchElement(match2));
      return match.concat(matches);
    } else {
      return [];
    }
  }
  elementMatched(element) {
    const { selector } = this;
    if (selector) {
      this.selectorMatched(element, selector);
    }
  }
  elementUnmatched(element) {
    const selectors = this.matchesByElement.getKeysForValue(element);
    for (const selector of selectors) {
      this.selectorUnmatched(element, selector);
    }
  }
  elementAttributeChanged(element, _attributeName) {
    const { selector } = this;
    if (selector) {
      const matches = this.matchElement(element);
      const matchedBefore = this.matchesByElement.has(selector, element);
      if (matches && !matchedBefore) {
        this.selectorMatched(element, selector);
      } else if (!matches && matchedBefore) {
        this.selectorUnmatched(element, selector);
      }
    }
  }
  selectorMatched(element, selector) {
    this.delegate.selectorMatched(element, selector, this.details);
    this.matchesByElement.add(selector, element);
  }
  selectorUnmatched(element, selector) {
    this.delegate.selectorUnmatched(element, selector, this.details);
    this.matchesByElement.delete(selector, element);
  }
}

class StringMapObserver {
  constructor(element, delegate) {
    this.element = element;
    this.delegate = delegate;
    this.started = false;
    this.stringMap = new Map;
    this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.mutationObserver.observe(this.element, { attributes: true, attributeOldValue: true });
      this.refresh();
    }
  }
  stop() {
    if (this.started) {
      this.mutationObserver.takeRecords();
      this.mutationObserver.disconnect();
      this.started = false;
    }
  }
  refresh() {
    if (this.started) {
      for (const attributeName of this.knownAttributeNames) {
        this.refreshAttribute(attributeName, null);
      }
    }
  }
  processMutations(mutations) {
    if (this.started) {
      for (const mutation of mutations) {
        this.processMutation(mutation);
      }
    }
  }
  processMutation(mutation) {
    const attributeName = mutation.attributeName;
    if (attributeName) {
      this.refreshAttribute(attributeName, mutation.oldValue);
    }
  }
  refreshAttribute(attributeName, oldValue) {
    const key = this.delegate.getStringMapKeyForAttribute(attributeName);
    if (key != null) {
      if (!this.stringMap.has(attributeName)) {
        this.stringMapKeyAdded(key, attributeName);
      }
      const value = this.element.getAttribute(attributeName);
      if (this.stringMap.get(attributeName) != value) {
        this.stringMapValueChanged(value, key, oldValue);
      }
      if (value == null) {
        const oldValue2 = this.stringMap.get(attributeName);
        this.stringMap.delete(attributeName);
        if (oldValue2)
          this.stringMapKeyRemoved(key, attributeName, oldValue2);
      } else {
        this.stringMap.set(attributeName, value);
      }
    }
  }
  stringMapKeyAdded(key, attributeName) {
    if (this.delegate.stringMapKeyAdded) {
      this.delegate.stringMapKeyAdded(key, attributeName);
    }
  }
  stringMapValueChanged(value, key, oldValue) {
    if (this.delegate.stringMapValueChanged) {
      this.delegate.stringMapValueChanged(value, key, oldValue);
    }
  }
  stringMapKeyRemoved(key, attributeName, oldValue) {
    if (this.delegate.stringMapKeyRemoved) {
      this.delegate.stringMapKeyRemoved(key, attributeName, oldValue);
    }
  }
  get knownAttributeNames() {
    return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
  }
  get currentAttributeNames() {
    return Array.from(this.element.attributes).map((attribute) => attribute.name);
  }
  get recordedAttributeNames() {
    return Array.from(this.stringMap.keys());
  }
}

class TokenListObserver {
  constructor(element, attributeName, delegate) {
    this.attributeObserver = new AttributeObserver(element, attributeName, this);
    this.delegate = delegate;
    this.tokensByElement = new Multimap;
  }
  get started() {
    return this.attributeObserver.started;
  }
  start() {
    this.attributeObserver.start();
  }
  pause(callback) {
    this.attributeObserver.pause(callback);
  }
  stop() {
    this.attributeObserver.stop();
  }
  refresh() {
    this.attributeObserver.refresh();
  }
  get element() {
    return this.attributeObserver.element;
  }
  get attributeName() {
    return this.attributeObserver.attributeName;
  }
  elementMatchedAttribute(element) {
    this.tokensMatched(this.readTokensForElement(element));
  }
  elementAttributeValueChanged(element) {
    const [unmatchedTokens, matchedTokens] = this.refreshTokensForElement(element);
    this.tokensUnmatched(unmatchedTokens);
    this.tokensMatched(matchedTokens);
  }
  elementUnmatchedAttribute(element) {
    this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
  }
  tokensMatched(tokens) {
    tokens.forEach((token) => this.tokenMatched(token));
  }
  tokensUnmatched(tokens) {
    tokens.forEach((token) => this.tokenUnmatched(token));
  }
  tokenMatched(token) {
    this.delegate.tokenMatched(token);
    this.tokensByElement.add(token.element, token);
  }
  tokenUnmatched(token) {
    this.delegate.tokenUnmatched(token);
    this.tokensByElement.delete(token.element, token);
  }
  refreshTokensForElement(element) {
    const previousTokens = this.tokensByElement.getValuesForKey(element);
    const currentTokens = this.readTokensForElement(element);
    const firstDifferingIndex = zip(previousTokens, currentTokens).findIndex(([previousToken, currentToken]) => !tokensAreEqual(previousToken, currentToken));
    if (firstDifferingIndex == -1) {
      return [[], []];
    } else {
      return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
    }
  }
  readTokensForElement(element) {
    const attributeName = this.attributeName;
    const tokenString = element.getAttribute(attributeName) || "";
    return parseTokenString(tokenString, element, attributeName);
  }
}

class ValueListObserver {
  constructor(element, attributeName, delegate) {
    this.tokenListObserver = new TokenListObserver(element, attributeName, this);
    this.delegate = delegate;
    this.parseResultsByToken = new WeakMap;
    this.valuesByTokenByElement = new WeakMap;
  }
  get started() {
    return this.tokenListObserver.started;
  }
  start() {
    this.tokenListObserver.start();
  }
  stop() {
    this.tokenListObserver.stop();
  }
  refresh() {
    this.tokenListObserver.refresh();
  }
  get element() {
    return this.tokenListObserver.element;
  }
  get attributeName() {
    return this.tokenListObserver.attributeName;
  }
  tokenMatched(token) {
    const { element } = token;
    const { value } = this.fetchParseResultForToken(token);
    if (value) {
      this.fetchValuesByTokenForElement(element).set(token, value);
      this.delegate.elementMatchedValue(element, value);
    }
  }
  tokenUnmatched(token) {
    const { element } = token;
    const { value } = this.fetchParseResultForToken(token);
    if (value) {
      this.fetchValuesByTokenForElement(element).delete(token);
      this.delegate.elementUnmatchedValue(element, value);
    }
  }
  fetchParseResultForToken(token) {
    let parseResult = this.parseResultsByToken.get(token);
    if (!parseResult) {
      parseResult = this.parseToken(token);
      this.parseResultsByToken.set(token, parseResult);
    }
    return parseResult;
  }
  fetchValuesByTokenForElement(element) {
    let valuesByToken = this.valuesByTokenByElement.get(element);
    if (!valuesByToken) {
      valuesByToken = new Map;
      this.valuesByTokenByElement.set(element, valuesByToken);
    }
    return valuesByToken;
  }
  parseToken(token) {
    try {
      const value = this.delegate.parseValueForToken(token);
      return { value };
    } catch (error2) {
      return { error: error2 };
    }
  }
}

class BindingObserver {
  constructor(context, delegate) {
    this.context = context;
    this.delegate = delegate;
    this.bindingsByAction = new Map;
  }
  start() {
    if (!this.valueListObserver) {
      this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
      this.valueListObserver.start();
    }
  }
  stop() {
    if (this.valueListObserver) {
      this.valueListObserver.stop();
      delete this.valueListObserver;
      this.disconnectAllActions();
    }
  }
  get element() {
    return this.context.element;
  }
  get identifier() {
    return this.context.identifier;
  }
  get actionAttribute() {
    return this.schema.actionAttribute;
  }
  get schema() {
    return this.context.schema;
  }
  get bindings() {
    return Array.from(this.bindingsByAction.values());
  }
  connectAction(action) {
    const binding = new Binding(this.context, action);
    this.bindingsByAction.set(action, binding);
    this.delegate.bindingConnected(binding);
  }
  disconnectAction(action) {
    const binding = this.bindingsByAction.get(action);
    if (binding) {
      this.bindingsByAction.delete(action);
      this.delegate.bindingDisconnected(binding);
    }
  }
  disconnectAllActions() {
    this.bindings.forEach((binding) => this.delegate.bindingDisconnected(binding, true));
    this.bindingsByAction.clear();
  }
  parseValueForToken(token) {
    const action = Action.forToken(token, this.schema);
    if (action.identifier == this.identifier) {
      return action;
    }
  }
  elementMatchedValue(element, action) {
    this.connectAction(action);
  }
  elementUnmatchedValue(element, action) {
    this.disconnectAction(action);
  }
}

class ValueObserver {
  constructor(context, receiver) {
    this.context = context;
    this.receiver = receiver;
    this.stringMapObserver = new StringMapObserver(this.element, this);
    this.valueDescriptorMap = this.controller.valueDescriptorMap;
  }
  start() {
    this.stringMapObserver.start();
    this.invokeChangedCallbacksForDefaultValues();
  }
  stop() {
    this.stringMapObserver.stop();
  }
  get element() {
    return this.context.element;
  }
  get controller() {
    return this.context.controller;
  }
  getStringMapKeyForAttribute(attributeName) {
    if (attributeName in this.valueDescriptorMap) {
      return this.valueDescriptorMap[attributeName].name;
    }
  }
  stringMapKeyAdded(key, attributeName) {
    const descriptor = this.valueDescriptorMap[attributeName];
    if (!this.hasValue(key)) {
      this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), descriptor.writer(descriptor.defaultValue));
    }
  }
  stringMapValueChanged(value, name, oldValue) {
    const descriptor = this.valueDescriptorNameMap[name];
    if (value === null)
      return;
    if (oldValue === null) {
      oldValue = descriptor.writer(descriptor.defaultValue);
    }
    this.invokeChangedCallback(name, value, oldValue);
  }
  stringMapKeyRemoved(key, attributeName, oldValue) {
    const descriptor = this.valueDescriptorNameMap[key];
    if (this.hasValue(key)) {
      this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), oldValue);
    } else {
      this.invokeChangedCallback(key, descriptor.writer(descriptor.defaultValue), oldValue);
    }
  }
  invokeChangedCallbacksForDefaultValues() {
    for (const { key, name, defaultValue, writer } of this.valueDescriptors) {
      if (defaultValue != null && !this.controller.data.has(key)) {
        this.invokeChangedCallback(name, writer(defaultValue), undefined);
      }
    }
  }
  invokeChangedCallback(name, rawValue, rawOldValue) {
    const changedMethodName = `${name}Changed`;
    const changedMethod = this.receiver[changedMethodName];
    if (typeof changedMethod == "function") {
      const descriptor = this.valueDescriptorNameMap[name];
      try {
        const value = descriptor.reader(rawValue);
        let oldValue = rawOldValue;
        if (rawOldValue) {
          oldValue = descriptor.reader(rawOldValue);
        }
        changedMethod.call(this.receiver, value, oldValue);
      } catch (error2) {
        if (error2 instanceof TypeError) {
          error2.message = `Stimulus Value "${this.context.identifier}.${descriptor.name}" - ${error2.message}`;
        }
        throw error2;
      }
    }
  }
  get valueDescriptors() {
    const { valueDescriptorMap } = this;
    return Object.keys(valueDescriptorMap).map((key) => valueDescriptorMap[key]);
  }
  get valueDescriptorNameMap() {
    const descriptors = {};
    Object.keys(this.valueDescriptorMap).forEach((key) => {
      const descriptor = this.valueDescriptorMap[key];
      descriptors[descriptor.name] = descriptor;
    });
    return descriptors;
  }
  hasValue(attributeName) {
    const descriptor = this.valueDescriptorNameMap[attributeName];
    const hasMethodName = `has${capitalize(descriptor.name)}`;
    return this.receiver[hasMethodName];
  }
}

class TargetObserver {
  constructor(context, delegate) {
    this.context = context;
    this.delegate = delegate;
    this.targetsByName = new Multimap;
  }
  start() {
    if (!this.tokenListObserver) {
      this.tokenListObserver = new TokenListObserver(this.element, this.attributeName, this);
      this.tokenListObserver.start();
    }
  }
  stop() {
    if (this.tokenListObserver) {
      this.disconnectAllTargets();
      this.tokenListObserver.stop();
      delete this.tokenListObserver;
    }
  }
  tokenMatched({ element, content: name }) {
    if (this.scope.containsElement(element)) {
      this.connectTarget(element, name);
    }
  }
  tokenUnmatched({ element, content: name }) {
    this.disconnectTarget(element, name);
  }
  connectTarget(element, name) {
    var _a;
    if (!this.targetsByName.has(name, element)) {
      this.targetsByName.add(name, element);
      (_a = this.tokenListObserver) === null || _a === undefined || _a.pause(() => this.delegate.targetConnected(element, name));
    }
  }
  disconnectTarget(element, name) {
    var _a;
    if (this.targetsByName.has(name, element)) {
      this.targetsByName.delete(name, element);
      (_a = this.tokenListObserver) === null || _a === undefined || _a.pause(() => this.delegate.targetDisconnected(element, name));
    }
  }
  disconnectAllTargets() {
    for (const name of this.targetsByName.keys) {
      for (const element of this.targetsByName.getValuesForKey(name)) {
        this.disconnectTarget(element, name);
      }
    }
  }
  get attributeName() {
    return `data-${this.context.identifier}-target`;
  }
  get element() {
    return this.context.element;
  }
  get scope() {
    return this.context.scope;
  }
}

class OutletObserver {
  constructor(context, delegate) {
    this.started = false;
    this.context = context;
    this.delegate = delegate;
    this.outletsByName = new Multimap;
    this.outletElementsByName = new Multimap;
    this.selectorObserverMap = new Map;
    this.attributeObserverMap = new Map;
  }
  start() {
    if (!this.started) {
      this.outletDefinitions.forEach((outletName) => {
        this.setupSelectorObserverForOutlet(outletName);
        this.setupAttributeObserverForOutlet(outletName);
      });
      this.started = true;
      this.dependentContexts.forEach((context) => context.refresh());
    }
  }
  refresh() {
    this.selectorObserverMap.forEach((observer) => observer.refresh());
    this.attributeObserverMap.forEach((observer) => observer.refresh());
  }
  stop() {
    if (this.started) {
      this.started = false;
      this.disconnectAllOutlets();
      this.stopSelectorObservers();
      this.stopAttributeObservers();
    }
  }
  stopSelectorObservers() {
    if (this.selectorObserverMap.size > 0) {
      this.selectorObserverMap.forEach((observer) => observer.stop());
      this.selectorObserverMap.clear();
    }
  }
  stopAttributeObservers() {
    if (this.attributeObserverMap.size > 0) {
      this.attributeObserverMap.forEach((observer) => observer.stop());
      this.attributeObserverMap.clear();
    }
  }
  selectorMatched(element, _selector, { outletName }) {
    const outlet = this.getOutlet(element, outletName);
    if (outlet) {
      this.connectOutlet(outlet, element, outletName);
    }
  }
  selectorUnmatched(element, _selector, { outletName }) {
    const outlet = this.getOutletFromMap(element, outletName);
    if (outlet) {
      this.disconnectOutlet(outlet, element, outletName);
    }
  }
  selectorMatchElement(element, { outletName }) {
    const selector = this.selector(outletName);
    const hasOutlet = this.hasOutlet(element, outletName);
    const hasOutletController = element.matches(`[${this.schema.controllerAttribute}~=${outletName}]`);
    if (selector) {
      return hasOutlet && hasOutletController && element.matches(selector);
    } else {
      return false;
    }
  }
  elementMatchedAttribute(_element, attributeName) {
    const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
    if (outletName) {
      this.updateSelectorObserverForOutlet(outletName);
    }
  }
  elementAttributeValueChanged(_element, attributeName) {
    const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
    if (outletName) {
      this.updateSelectorObserverForOutlet(outletName);
    }
  }
  elementUnmatchedAttribute(_element, attributeName) {
    const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
    if (outletName) {
      this.updateSelectorObserverForOutlet(outletName);
    }
  }
  connectOutlet(outlet, element, outletName) {
    var _a;
    if (!this.outletElementsByName.has(outletName, element)) {
      this.outletsByName.add(outletName, outlet);
      this.outletElementsByName.add(outletName, element);
      (_a = this.selectorObserverMap.get(outletName)) === null || _a === undefined || _a.pause(() => this.delegate.outletConnected(outlet, element, outletName));
    }
  }
  disconnectOutlet(outlet, element, outletName) {
    var _a;
    if (this.outletElementsByName.has(outletName, element)) {
      this.outletsByName.delete(outletName, outlet);
      this.outletElementsByName.delete(outletName, element);
      (_a = this.selectorObserverMap.get(outletName)) === null || _a === undefined || _a.pause(() => this.delegate.outletDisconnected(outlet, element, outletName));
    }
  }
  disconnectAllOutlets() {
    for (const outletName of this.outletElementsByName.keys) {
      for (const element of this.outletElementsByName.getValuesForKey(outletName)) {
        for (const outlet of this.outletsByName.getValuesForKey(outletName)) {
          this.disconnectOutlet(outlet, element, outletName);
        }
      }
    }
  }
  updateSelectorObserverForOutlet(outletName) {
    const observer = this.selectorObserverMap.get(outletName);
    if (observer) {
      observer.selector = this.selector(outletName);
    }
  }
  setupSelectorObserverForOutlet(outletName) {
    const selector = this.selector(outletName);
    const selectorObserver = new SelectorObserver(document.body, selector, this, { outletName });
    this.selectorObserverMap.set(outletName, selectorObserver);
    selectorObserver.start();
  }
  setupAttributeObserverForOutlet(outletName) {
    const attributeName = this.attributeNameForOutletName(outletName);
    const attributeObserver = new AttributeObserver(this.scope.element, attributeName, this);
    this.attributeObserverMap.set(outletName, attributeObserver);
    attributeObserver.start();
  }
  selector(outletName) {
    return this.scope.outlets.getSelectorForOutletName(outletName);
  }
  attributeNameForOutletName(outletName) {
    return this.scope.schema.outletAttributeForScope(this.identifier, outletName);
  }
  getOutletNameFromOutletAttributeName(attributeName) {
    return this.outletDefinitions.find((outletName) => this.attributeNameForOutletName(outletName) === attributeName);
  }
  get outletDependencies() {
    const dependencies = new Multimap;
    this.router.modules.forEach((module) => {
      const constructor = module.definition.controllerConstructor;
      const outlets = readInheritableStaticArrayValues(constructor, "outlets");
      outlets.forEach((outlet) => dependencies.add(outlet, module.identifier));
    });
    return dependencies;
  }
  get outletDefinitions() {
    return this.outletDependencies.getKeysForValue(this.identifier);
  }
  get dependentControllerIdentifiers() {
    return this.outletDependencies.getValuesForKey(this.identifier);
  }
  get dependentContexts() {
    const identifiers = this.dependentControllerIdentifiers;
    return this.router.contexts.filter((context) => identifiers.includes(context.identifier));
  }
  hasOutlet(element, outletName) {
    return !!this.getOutlet(element, outletName) || !!this.getOutletFromMap(element, outletName);
  }
  getOutlet(element, outletName) {
    return this.application.getControllerForElementAndIdentifier(element, outletName);
  }
  getOutletFromMap(element, outletName) {
    return this.outletsByName.getValuesForKey(outletName).find((outlet) => outlet.element === element);
  }
  get scope() {
    return this.context.scope;
  }
  get schema() {
    return this.context.schema;
  }
  get identifier() {
    return this.context.identifier;
  }
  get application() {
    return this.context.application;
  }
  get router() {
    return this.application.router;
  }
}

class Context {
  constructor(module, scope) {
    this.logDebugActivity = (functionName, detail = {}) => {
      const { identifier, controller, element } = this;
      detail = Object.assign({ identifier, controller, element }, detail);
      this.application.logDebugActivity(this.identifier, functionName, detail);
    };
    this.module = module;
    this.scope = scope;
    this.controller = new module.controllerConstructor(this);
    this.bindingObserver = new BindingObserver(this, this.dispatcher);
    this.valueObserver = new ValueObserver(this, this.controller);
    this.targetObserver = new TargetObserver(this, this);
    this.outletObserver = new OutletObserver(this, this);
    try {
      this.controller.initialize();
      this.logDebugActivity("initialize");
    } catch (error2) {
      this.handleError(error2, "initializing controller");
    }
  }
  connect() {
    this.bindingObserver.start();
    this.valueObserver.start();
    this.targetObserver.start();
    this.outletObserver.start();
    try {
      this.controller.connect();
      this.logDebugActivity("connect");
    } catch (error2) {
      this.handleError(error2, "connecting controller");
    }
  }
  refresh() {
    this.outletObserver.refresh();
  }
  disconnect() {
    try {
      this.controller.disconnect();
      this.logDebugActivity("disconnect");
    } catch (error2) {
      this.handleError(error2, "disconnecting controller");
    }
    this.outletObserver.stop();
    this.targetObserver.stop();
    this.valueObserver.stop();
    this.bindingObserver.stop();
  }
  get application() {
    return this.module.application;
  }
  get identifier() {
    return this.module.identifier;
  }
  get schema() {
    return this.application.schema;
  }
  get dispatcher() {
    return this.application.dispatcher;
  }
  get element() {
    return this.scope.element;
  }
  get parentElement() {
    return this.element.parentElement;
  }
  handleError(error2, message, detail = {}) {
    const { identifier, controller, element } = this;
    detail = Object.assign({ identifier, controller, element }, detail);
    this.application.handleError(error2, `Error ${message}`, detail);
  }
  targetConnected(element, name) {
    this.invokeControllerMethod(`${name}TargetConnected`, element);
  }
  targetDisconnected(element, name) {
    this.invokeControllerMethod(`${name}TargetDisconnected`, element);
  }
  outletConnected(outlet, element, name) {
    this.invokeControllerMethod(`${namespaceCamelize(name)}OutletConnected`, outlet, element);
  }
  outletDisconnected(outlet, element, name) {
    this.invokeControllerMethod(`${namespaceCamelize(name)}OutletDisconnected`, outlet, element);
  }
  invokeControllerMethod(methodName, ...args) {
    const controller = this.controller;
    if (typeof controller[methodName] == "function") {
      controller[methodName](...args);
    }
  }
}
var getOwnKeys = (() => {
  if (typeof Object.getOwnPropertySymbols == "function") {
    return (object) => [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
  } else {
    return Object.getOwnPropertyNames;
  }
})();
var extend = (() => {
  function extendWithReflect(constructor) {
    function extended() {
      return Reflect.construct(constructor, arguments, new.target);
    }
    extended.prototype = Object.create(constructor.prototype, {
      constructor: { value: extended }
    });
    Reflect.setPrototypeOf(extended, constructor);
    return extended;
  }
  function testReflectExtension() {
    const a = function() {
      this.a.call(this);
    };
    const b = extendWithReflect(a);
    b.prototype.a = function() {
    };
    return new b;
  }
  try {
    testReflectExtension();
    return extendWithReflect;
  } catch (error2) {
    return (constructor) => class extended extends constructor {
    };
  }
})();

class Module {
  constructor(application, definition) {
    this.application = application;
    this.definition = blessDefinition(definition);
    this.contextsByScope = new WeakMap;
    this.connectedContexts = new Set;
  }
  get identifier() {
    return this.definition.identifier;
  }
  get controllerConstructor() {
    return this.definition.controllerConstructor;
  }
  get contexts() {
    return Array.from(this.connectedContexts);
  }
  connectContextForScope(scope) {
    const context = this.fetchContextForScope(scope);
    this.connectedContexts.add(context);
    context.connect();
  }
  disconnectContextForScope(scope) {
    const context = this.contextsByScope.get(scope);
    if (context) {
      this.connectedContexts.delete(context);
      context.disconnect();
    }
  }
  fetchContextForScope(scope) {
    let context = this.contextsByScope.get(scope);
    if (!context) {
      context = new Context(this, scope);
      this.contextsByScope.set(scope, context);
    }
    return context;
  }
}

class ClassMap {
  constructor(scope) {
    this.scope = scope;
  }
  has(name) {
    return this.data.has(this.getDataKey(name));
  }
  get(name) {
    return this.getAll(name)[0];
  }
  getAll(name) {
    const tokenString = this.data.get(this.getDataKey(name)) || "";
    return tokenize(tokenString);
  }
  getAttributeName(name) {
    return this.data.getAttributeNameForKey(this.getDataKey(name));
  }
  getDataKey(name) {
    return `${name}-class`;
  }
  get data() {
    return this.scope.data;
  }
}

class DataMap {
  constructor(scope) {
    this.scope = scope;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get(key) {
    const name = this.getAttributeNameForKey(key);
    return this.element.getAttribute(name);
  }
  set(key, value) {
    const name = this.getAttributeNameForKey(key);
    this.element.setAttribute(name, value);
    return this.get(key);
  }
  has(key) {
    const name = this.getAttributeNameForKey(key);
    return this.element.hasAttribute(name);
  }
  delete(key) {
    if (this.has(key)) {
      const name = this.getAttributeNameForKey(key);
      this.element.removeAttribute(name);
      return true;
    } else {
      return false;
    }
  }
  getAttributeNameForKey(key) {
    return `data-${this.identifier}-${dasherize(key)}`;
  }
}

class Guide {
  constructor(logger) {
    this.warnedKeysByObject = new WeakMap;
    this.logger = logger;
  }
  warn(object, key, message) {
    let warnedKeys = this.warnedKeysByObject.get(object);
    if (!warnedKeys) {
      warnedKeys = new Set;
      this.warnedKeysByObject.set(object, warnedKeys);
    }
    if (!warnedKeys.has(key)) {
      warnedKeys.add(key);
      this.logger.warn(message, object);
    }
  }
}

class TargetSet {
  constructor(scope) {
    this.scope = scope;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get schema() {
    return this.scope.schema;
  }
  has(targetName) {
    return this.find(targetName) != null;
  }
  find(...targetNames) {
    return targetNames.reduce((target, targetName) => target || this.findTarget(targetName) || this.findLegacyTarget(targetName), undefined);
  }
  findAll(...targetNames) {
    return targetNames.reduce((targets, targetName) => [
      ...targets,
      ...this.findAllTargets(targetName),
      ...this.findAllLegacyTargets(targetName)
    ], []);
  }
  findTarget(targetName) {
    const selector = this.getSelectorForTargetName(targetName);
    return this.scope.findElement(selector);
  }
  findAllTargets(targetName) {
    const selector = this.getSelectorForTargetName(targetName);
    return this.scope.findAllElements(selector);
  }
  getSelectorForTargetName(targetName) {
    const attributeName = this.schema.targetAttributeForScope(this.identifier);
    return attributeValueContainsToken(attributeName, targetName);
  }
  findLegacyTarget(targetName) {
    const selector = this.getLegacySelectorForTargetName(targetName);
    return this.deprecate(this.scope.findElement(selector), targetName);
  }
  findAllLegacyTargets(targetName) {
    const selector = this.getLegacySelectorForTargetName(targetName);
    return this.scope.findAllElements(selector).map((element) => this.deprecate(element, targetName));
  }
  getLegacySelectorForTargetName(targetName) {
    const targetDescriptor = `${this.identifier}.${targetName}`;
    return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
  }
  deprecate(element, targetName) {
    if (element) {
      const { identifier } = this;
      const attributeName = this.schema.targetAttribute;
      const revisedAttributeName = this.schema.targetAttributeForScope(identifier);
      this.guide.warn(element, `target:${targetName}`, `Please replace ${attributeName}="${identifier}.${targetName}" with ${revisedAttributeName}="${targetName}". ` + `The ${attributeName} attribute is deprecated and will be removed in a future version of Stimulus.`);
    }
    return element;
  }
  get guide() {
    return this.scope.guide;
  }
}

class OutletSet {
  constructor(scope, controllerElement) {
    this.scope = scope;
    this.controllerElement = controllerElement;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get schema() {
    return this.scope.schema;
  }
  has(outletName) {
    return this.find(outletName) != null;
  }
  find(...outletNames) {
    return outletNames.reduce((outlet, outletName) => outlet || this.findOutlet(outletName), undefined);
  }
  findAll(...outletNames) {
    return outletNames.reduce((outlets, outletName) => [...outlets, ...this.findAllOutlets(outletName)], []);
  }
  getSelectorForOutletName(outletName) {
    const attributeName = this.schema.outletAttributeForScope(this.identifier, outletName);
    return this.controllerElement.getAttribute(attributeName);
  }
  findOutlet(outletName) {
    const selector = this.getSelectorForOutletName(outletName);
    if (selector)
      return this.findElement(selector, outletName);
  }
  findAllOutlets(outletName) {
    const selector = this.getSelectorForOutletName(outletName);
    return selector ? this.findAllElements(selector, outletName) : [];
  }
  findElement(selector, outletName) {
    const elements = this.scope.queryElements(selector);
    return elements.filter((element) => this.matchesElement(element, selector, outletName))[0];
  }
  findAllElements(selector, outletName) {
    const elements = this.scope.queryElements(selector);
    return elements.filter((element) => this.matchesElement(element, selector, outletName));
  }
  matchesElement(element, selector, outletName) {
    const controllerAttribute = element.getAttribute(this.scope.schema.controllerAttribute) || "";
    return element.matches(selector) && controllerAttribute.split(" ").includes(outletName);
  }
}

class Scope {
  constructor(schema, element, identifier, logger) {
    this.targets = new TargetSet(this);
    this.classes = new ClassMap(this);
    this.data = new DataMap(this);
    this.containsElement = (element2) => {
      return element2.closest(this.controllerSelector) === this.element;
    };
    this.schema = schema;
    this.element = element;
    this.identifier = identifier;
    this.guide = new Guide(logger);
    this.outlets = new OutletSet(this.documentScope, element);
  }
  findElement(selector) {
    return this.element.matches(selector) ? this.element : this.queryElements(selector).find(this.containsElement);
  }
  findAllElements(selector) {
    return [
      ...this.element.matches(selector) ? [this.element] : [],
      ...this.queryElements(selector).filter(this.containsElement)
    ];
  }
  queryElements(selector) {
    return Array.from(this.element.querySelectorAll(selector));
  }
  get controllerSelector() {
    return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
  }
  get isDocumentScope() {
    return this.element === document.documentElement;
  }
  get documentScope() {
    return this.isDocumentScope ? this : new Scope(this.schema, document.documentElement, this.identifier, this.guide.logger);
  }
}

class ScopeObserver {
  constructor(element, schema, delegate) {
    this.element = element;
    this.schema = schema;
    this.delegate = delegate;
    this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
    this.scopesByIdentifierByElement = new WeakMap;
    this.scopeReferenceCounts = new WeakMap;
  }
  start() {
    this.valueListObserver.start();
  }
  stop() {
    this.valueListObserver.stop();
  }
  get controllerAttribute() {
    return this.schema.controllerAttribute;
  }
  parseValueForToken(token) {
    const { element, content: identifier } = token;
    return this.parseValueForElementAndIdentifier(element, identifier);
  }
  parseValueForElementAndIdentifier(element, identifier) {
    const scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
    let scope = scopesByIdentifier.get(identifier);
    if (!scope) {
      scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
      scopesByIdentifier.set(identifier, scope);
    }
    return scope;
  }
  elementMatchedValue(element, value) {
    const referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
    this.scopeReferenceCounts.set(value, referenceCount);
    if (referenceCount == 1) {
      this.delegate.scopeConnected(value);
    }
  }
  elementUnmatchedValue(element, value) {
    const referenceCount = this.scopeReferenceCounts.get(value);
    if (referenceCount) {
      this.scopeReferenceCounts.set(value, referenceCount - 1);
      if (referenceCount == 1) {
        this.delegate.scopeDisconnected(value);
      }
    }
  }
  fetchScopesByIdentifierForElement(element) {
    let scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
    if (!scopesByIdentifier) {
      scopesByIdentifier = new Map;
      this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
    }
    return scopesByIdentifier;
  }
}

class Router {
  constructor(application) {
    this.application = application;
    this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
    this.scopesByIdentifier = new Multimap;
    this.modulesByIdentifier = new Map;
  }
  get element() {
    return this.application.element;
  }
  get schema() {
    return this.application.schema;
  }
  get logger() {
    return this.application.logger;
  }
  get controllerAttribute() {
    return this.schema.controllerAttribute;
  }
  get modules() {
    return Array.from(this.modulesByIdentifier.values());
  }
  get contexts() {
    return this.modules.reduce((contexts, module) => contexts.concat(module.contexts), []);
  }
  start() {
    this.scopeObserver.start();
  }
  stop() {
    this.scopeObserver.stop();
  }
  loadDefinition(definition) {
    this.unloadIdentifier(definition.identifier);
    const module = new Module(this.application, definition);
    this.connectModule(module);
    const afterLoad = definition.controllerConstructor.afterLoad;
    if (afterLoad) {
      afterLoad.call(definition.controllerConstructor, definition.identifier, this.application);
    }
  }
  unloadIdentifier(identifier) {
    const module = this.modulesByIdentifier.get(identifier);
    if (module) {
      this.disconnectModule(module);
    }
  }
  getContextForElementAndIdentifier(element, identifier) {
    const module = this.modulesByIdentifier.get(identifier);
    if (module) {
      return module.contexts.find((context) => context.element == element);
    }
  }
  proposeToConnectScopeForElementAndIdentifier(element, identifier) {
    const scope = this.scopeObserver.parseValueForElementAndIdentifier(element, identifier);
    if (scope) {
      this.scopeObserver.elementMatchedValue(scope.element, scope);
    } else {
      console.error(`Couldn't find or create scope for identifier: "${identifier}" and element:`, element);
    }
  }
  handleError(error2, message, detail) {
    this.application.handleError(error2, message, detail);
  }
  createScopeForElementAndIdentifier(element, identifier) {
    return new Scope(this.schema, element, identifier, this.logger);
  }
  scopeConnected(scope) {
    this.scopesByIdentifier.add(scope.identifier, scope);
    const module = this.modulesByIdentifier.get(scope.identifier);
    if (module) {
      module.connectContextForScope(scope);
    }
  }
  scopeDisconnected(scope) {
    this.scopesByIdentifier.delete(scope.identifier, scope);
    const module = this.modulesByIdentifier.get(scope.identifier);
    if (module) {
      module.disconnectContextForScope(scope);
    }
  }
  connectModule(module) {
    this.modulesByIdentifier.set(module.identifier, module);
    const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
    scopes.forEach((scope) => module.connectContextForScope(scope));
  }
  disconnectModule(module) {
    this.modulesByIdentifier.delete(module.identifier);
    const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
    scopes.forEach((scope) => module.disconnectContextForScope(scope));
  }
}
var defaultSchema = {
  controllerAttribute: "data-controller",
  actionAttribute: "data-action",
  targetAttribute: "data-target",
  targetAttributeForScope: (identifier) => `data-${identifier}-target`,
  outletAttributeForScope: (identifier, outlet) => `data-${identifier}-${outlet}-outlet`,
  keyMappings: Object.assign(Object.assign({ enter: "Enter", tab: "Tab", esc: "Escape", space: " ", up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", home: "Home", end: "End", page_up: "PageUp", page_down: "PageDown" }, objectFromEntries("abcdefghijklmnopqrstuvwxyz".split("").map((c) => [c, c]))), objectFromEntries("0123456789".split("").map((n) => [n, n])))
};

class Application {
  constructor(element = document.documentElement, schema = defaultSchema) {
    this.logger = console;
    this.debug = false;
    this.logDebugActivity = (identifier, functionName, detail = {}) => {
      if (this.debug) {
        this.logFormattedMessage(identifier, functionName, detail);
      }
    };
    this.element = element;
    this.schema = schema;
    this.dispatcher = new Dispatcher(this);
    this.router = new Router(this);
    this.actionDescriptorFilters = Object.assign({}, defaultActionDescriptorFilters);
  }
  static start(element, schema) {
    const application = new this(element, schema);
    application.start();
    return application;
  }
  async start() {
    await domReady();
    this.logDebugActivity("application", "starting");
    this.dispatcher.start();
    this.router.start();
    this.logDebugActivity("application", "start");
  }
  stop() {
    this.logDebugActivity("application", "stopping");
    this.dispatcher.stop();
    this.router.stop();
    this.logDebugActivity("application", "stop");
  }
  register(identifier, controllerConstructor) {
    this.load({ identifier, controllerConstructor });
  }
  registerActionOption(name, filter) {
    this.actionDescriptorFilters[name] = filter;
  }
  load(head, ...rest) {
    const definitions = Array.isArray(head) ? head : [head, ...rest];
    definitions.forEach((definition) => {
      if (definition.controllerConstructor.shouldLoad) {
        this.router.loadDefinition(definition);
      }
    });
  }
  unload(head, ...rest) {
    const identifiers = Array.isArray(head) ? head : [head, ...rest];
    identifiers.forEach((identifier) => this.router.unloadIdentifier(identifier));
  }
  get controllers() {
    return this.router.contexts.map((context) => context.controller);
  }
  getControllerForElementAndIdentifier(element, identifier) {
    const context = this.router.getContextForElementAndIdentifier(element, identifier);
    return context ? context.controller : null;
  }
  handleError(error2, message, detail) {
    var _a;
    this.logger.error(`%s\n\n%o\n\n%o`, message, error2, detail);
    (_a = window.onerror) === null || _a === undefined || _a.call(window, message, "", 0, 0, error2);
  }
  logFormattedMessage(identifier, functionName, detail = {}) {
    detail = Object.assign({ application: this }, detail);
    this.logger.groupCollapsed(`${identifier} #${functionName}`);
    this.logger.log("details:", Object.assign({}, detail));
    this.logger.groupEnd();
  }
}
var defaultValuesByType = {
  get array() {
    return [];
  },
  boolean: false,
  number: 0,
  get object() {
    return {};
  },
  string: ""
};
var readers = {
  array(value) {
    const array = JSON.parse(value);
    if (!Array.isArray(array)) {
      throw new TypeError(`expected value of type "array" but instead got value "${value}" of type "${parseValueTypeDefault(array)}"`);
    }
    return array;
  },
  boolean(value) {
    return !(value == "0" || String(value).toLowerCase() == "false");
  },
  number(value) {
    return Number(value.replace(/_/g, ""));
  },
  object(value) {
    const object = JSON.parse(value);
    if (object === null || typeof object != "object" || Array.isArray(object)) {
      throw new TypeError(`expected value of type "object" but instead got value "${value}" of type "${parseValueTypeDefault(object)}"`);
    }
    return object;
  },
  string(value) {
    return value;
  }
};
var writers = {
  default: writeString,
  array: writeJSON,
  object: writeJSON
};

class Controller {
  constructor(context) {
    this.context = context;
  }
  static get shouldLoad() {
    return true;
  }
  static afterLoad(_identifier, _application) {
    return;
  }
  get application() {
    return this.context.application;
  }
  get scope() {
    return this.context.scope;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get targets() {
    return this.scope.targets;
  }
  get outlets() {
    return this.scope.outlets;
  }
  get classes() {
    return this.scope.classes;
  }
  get data() {
    return this.scope.data;
  }
  initialize() {
  }
  connect() {
  }
  disconnect() {
  }
  dispatch(eventName, { target = this.element, detail = {}, prefix = this.identifier, bubbles = true, cancelable = true } = {}) {
    const type = prefix ? `${prefix}:${eventName}` : eventName;
    const event2 = new CustomEvent(type, { detail, bubbles, cancelable });
    target.dispatchEvent(event2);
    return event2;
  }
}
Controller.blessings = [
  ClassPropertiesBlessing,
  TargetPropertiesBlessing,
  ValuePropertiesBlessing,
  OutletPropertiesBlessing
];
Controller.targets = [];
Controller.outlets = [];
Controller.values = {};

// assets/js/controllers/logs_controller.js
var import_xterm = __toESM(require_xterm(), 1);
var import_xterm_addon_fit = __toESM(require_xterm_addon_fit(), 1);

class logs_controller_default extends Controller {
  static values = {
    url: String,
    focus: Boolean
  };
  initialize() {
    this.terminal = new import_xterm.Terminal;
    this.fitAddon = new import_xterm_addon_fit.FitAddon;
  }
  connect() {
    this.terminal.open(this.element, {
      focus: this.focusValue
    });
    this.terminal.loadAddon(this.fitAddon);
    this.fitAddon.fit();
    const observer = new ResizeObserver(() => this.fitAddon.fit());
    observer.observe(this.element);
    const source = new EventSource(this.urlValue);
    source.addEventListener("message", (message) => {
      const log = JSON.parse(message.data);
      this.terminal.writeln(log[1]);
    });
    source.addEventListener("error", (e) => {
      if (event.readyState === EventSource.CLOSED) {
      }
      source.close();
    });
  }
}

// assets/js/controllers/terminal_controller.js
var import_xterm2 = __toESM(require_xterm(), 1);
var import_xterm_addon_fit2 = __toESM(require_xterm_addon_fit(), 1);

class terminal_controller_default extends Controller {
  static values = {
    url: String
  };
  initialize() {
    this.terminal = new import_xterm2.Terminal;
    this.fitAddon = new import_xterm_addon_fit2.FitAddon;
  }
  connect() {
    this.terminal.open(this.element, {
      focus: true
    });
    this.terminal.loadAddon(this.fitAddon);
    this.fitAddon.fit();
    const observer = new ResizeObserver(() => this.fitAddon.fit());
    observer.observe(this.element);
    const ws = new WebSocket(this.webSocketURL());
    ws.addEventListener("message", (message) => {
      const log = JSON.parse(message);
      this.terminal.writeln(log[1]);
    });
  }
  webSocketURL() {
    let url = this.urlValue;
    if (!url.startsWith("ws://") && !url.startsWith("wss://")) {
      const scheme = location.protocol === "https:" ? "wss" : "ws";
      url = `${scheme}://${location.host}${url}`;
    }
    return url;
  }
}

// assets/js/application.js
window.Stimulus = Application.start();
Stimulus.register("logs", logs_controller_default);
Stimulus.register("terminal", terminal_controller_default);
