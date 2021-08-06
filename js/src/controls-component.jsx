import React from 'react';

import { EVENT_UNDOREDO_UPDATE } from "@jsplumbtoolkit/core"

export class ControlsComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div className="controls" ref={(c) => this._container = c}>
            <i className="fa fa-arrows selected-mode" data-mode="pan" title="Pan Mode" onClick={this.panMode.bind(this)}/>
            <i className="fa fa-pencil" data-mode="select" title="Select Mode" onClick={this.selectMode.bind(this)}/>
            <i className="fa fa-home" data-reset title="Zoom To Fit" onClick={this.reset.bind(this)}/>
            <i className="fa fa-undo" undo="true" title="Undo last action" onClick={this.undo.bind(this)}/>
            <i className="fa fa-repeat" redo="true" title="Redo last action" onClick={this.redo.bind(this)}/>
        </div>
    }

    initialize(surface) {
        this.surface = surface;
        this.toolkit = surface.toolkitInstance
        this.toolkit.bind(EVENT_UNDOREDO_UPDATE, (state) => {
            this._container.setAttribute("can-undo", state.undoCount > 0 ? "true" : "false")
            this._container.setAttribute("can-redo", state.redoCount > 0 ? "true" : "false")
        })

        this.surface.bind("modeChanged", (mode) => {
            // jsPlumb.removeClass(this._container.querySelectorAll("[data-mode]"), "selected-mode");
            // jsPlumb.addClass(this._container.querySelectorAll("[data-mode='" + mode + "']"), "selected-mode");
        });

        this.surface.bind("canvasClick", (e) => {
            this.toolkit.clearSelection();
        });
    }

    reset() {
        this.toolkit.clearSelection();
        this.surface.zoomToFit();
    }

    panMode() {
        this.surface.setMode("pan");
    }

    selectMode() {
        this.surface.setMode("select");
    }

    undo() {
        this.toolkit.undo()
    }

    redo() {
        this.toolkit.redo()
    }
}
