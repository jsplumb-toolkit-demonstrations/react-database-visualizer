import React from 'react';

import { jsPlumbToolkitUndoRedo } from 'jsplumbtoolkit-undo-redo';

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
        this.toolkit = surface.getToolkit();
        this.undoManager = new jsPlumbToolkitUndoRedo({
            surface:this.surface,
            compound:true,
            onChange:(mgr, undoCount, redoCount) => {
                this._container.setAttribute("can-undo", undoCount > 0);
                this._container.setAttribute("can-redo", redoCount > 0);
            }
        });

        this.surface.bind("modeChanged", (mode) => {
            jsPlumb.removeClass(this._container.querySelectorAll("[data-mode]"), "selected-mode");
            jsPlumb.addClass(this._container.querySelectorAll("[data-mode='" + mode + "']"), "selected-mode");
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
        this.undoManager.undo();
    }

    redo() {
        this.undoManager.redo();
    }
}
