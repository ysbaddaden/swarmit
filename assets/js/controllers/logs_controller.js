import { Controller } from "@hotwired/stimulus";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

export default class extends Controller {
  static values = {
    url: String,
    focus: Boolean,
  };

  initialize() {
    this.terminal = new Terminal();
    this.fitAddon = new FitAddon();
  }

  connect() {
    // create the terminal
    this.terminal.open(this.element, {
      focus: this.focusValue,
    });

    // fit the terminal's window to the element's available space
    this.terminal.loadAddon(this.fitAddon);
    this.fitAddon.fit();

    // resize terminal when available space changes
    const observer = new ResizeObserver(() => this.fitAddon.fit());
    observer.observe(this.element);

    // stream logs from server
    const source = new EventSource(this.urlValue)

    source.addEventListener("message", message => {
      const log = JSON.parse(message.data);
      this.terminal.writeln(log[1]);
    });

    source.addEventListener("error", e => {
      if (event.readyState === EventSource.CLOSED) {
        // TODO: report connection closed
      }
      source.close(); // don't auto reconnect
    });
  }
}
