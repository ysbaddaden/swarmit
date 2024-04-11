import { Controller } from "@hotwired/stimulus";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

export default class extends Controller {
  static values = {
    url: String,
  };

  initialize() {
    this.terminal = new Terminal();
    this.fitAddon = new FitAddon();
  }

  connect() {
    // create the terminal
    this.terminal.open(this.element, {
      focus: true,
    });

    // fit the terminal's window to the element's available space
    this.terminal.loadAddon(this.fitAddon);
    this.fitAddon.fit();

    // resize terminal when available space changes
    const observer = new ResizeObserver(() => this.fitAddon.fit());
    observer.observe(this.element);

    //xterm.onResize(function (evt) {
    //  const newSize = {
    //    width: evt.cols,
    //    height: evt.rows,
    //  };
    //  ws.send("\x04" + JSON.stringify(newSize));
    //});

    // connect to server
    // TODO: pass cols/rows to the backend
    const ws = new WebSocket(this.webSocketURL());

    ws.addEventListener("message", message => {
      const log = JSON.parse(message);
      this.terminal.writeln(log[1]);
    });

    // ws.addEventListener("closed", e => {
    //   // report connection closed
    // });

    // TODO: send to websocket new cols/rows on terminal resize
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
