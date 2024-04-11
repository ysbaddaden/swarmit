import * as Turbo from "@hotwired/turbo";
import { Application } from "@hotwired/stimulus";

import LogsController from "./controllers/logs_controller";
import TerminalController from "./controllers/terminal_controller";

window.Stimulus = Application.start();
Stimulus.register("logs", LogsController);
Stimulus.register("terminal", TerminalController);
