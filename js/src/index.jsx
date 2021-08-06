import React from 'react';
import ReactDOM from 'react-dom';

import {
    JsPlumbToolkitMiniviewComponent,
    JsPlumbToolkitSurfaceComponent,
    newInstance,
    LabelOverlay,
    AnchorLocations,
    EVENT_DBL_TAP,
    EVENT_TAP
}  from '@jsplumbtoolkit/browser-ui-react';

import { uuid, EVENT_EDGE_ADDED } from "@jsplumbtoolkit/core"
import { newInstance as newDialogs, Dialogs } from "@jsplumbtoolkit/dialogs"

import { SpringLayout } from "@jsplumbtoolkit/layout-spring";
import { StateMachineConnector } from "@jsplumb/connector-bezier"

import DragDropNodeSource from './drag-drop-node-source.jsx';

import { ControlsComponent } from './controls-component.jsx';

import { TableComponent } from './table-component.jsx';
import { ViewComponent } from './view-component.jsx';
import { ColumnComponent } from './column-component.jsx';


    const mainElement = document.querySelector("#jtk-demo-dbase"),
        nodePaletteElement = mainElement.querySelector(".node-palette"),
        miniviewElement = mainElement.querySelector(".miniview");

// ------------------------- dialogs ------------------------------------------------------------

    const dialogs = newDialogs({
        selector: ".dlg"
    });

    const dialogManager = {
        showDeleteDialog:(vertex, onOK) => {
            dialogs.show({
                id: "dlgConfirm",
                data: {
                    msg: `Delete ${vertex.id} ?`
                },
                onOK
            })
        },
        showEditDialog:(vertex, onOK) => {
            dialogs.show({
                id: "dlgName",
                data: vertex.data,
                title: `Edit ${vertex.data.type} name`,
                onOK
            });
        },
        showEdgeDialog:(existingEdge, onOK, onCancel) => {
            dialogs.show({
                id: "dlgColumnEdit",
                title: "Column Details",
                data: existingEdge == null ? null : existingEdge.data,
                onOK
            });
        }
    }

    class DemoComponent extends React.Component {

        constructor(props) {
            super(props);
            this.toolkit = newInstance({
                nodeFactory: function (type, data, callback) {
                    data.columns = [];
                    dialogs.show({
                        id: "dlgName",
                        title: "Enter " + type + " name:",
                        onOK: function (d) {
                            data.name = d.name;
                            // if the user entered a name...
                            if (data.name) {
                                if (data.name.length >= 2) {
                                    data.id = uuid();
                                    callback(data);
                                }
                                else
                                    alert(type + " names must be at least 2 characters!");
                            }
                            // else...do not proceed.
                        }
                    });
                },
                // the name of the property in each node's data that is the key for the data for the ports for that node.
                // we used to use portExtractor and portUpdater in this demo, prior to the existence of portDataProperty.
                // for more complex setups, those functions may still be needed.
                portDataProperty:"columns",
                //
                // Prevent connections from a column to itself or to another column on the same table.
                //
                beforeConnect:function(source, target) {
                    return source !== target && source.getParent() !== target.getParent();
                }
            });

            this.view = {
                // NOTE two ways of providing a component (which also works for Port definitions).  TableComponent and
                // ViewComponent both extend the Toolkit's BaseNodeComponent. When you provide the `jsx` you should ensure
                // that you pass in `ctx` as a prop to any component that extends BaseNodeComponent/BaseGroupComponent.
                // When you use `component`, the Toolkit handles that for you.
                nodes: {
                    "table": {
                        jsx: (ctx) => <TableComponent ctx={ctx} dlg={dialogManager} />
                    },
                    "view": {
                        jsx: (ctx) => <ViewComponent ctx={ctx} dlg={dialogManager} />
                    }
                },
                // Three edge types  - '1:1', '1:N' and 'N:M',
                // sharing  a common parent, in which the connector type, anchors
                // and appearance is defined.
                edges: {
                    "common": {
                        anchor: [ AnchorLocations.Left, AnchorLocations.Right ], // anchors for the endpoints
                        connector: StateMachineConnector.type,  //  StateMachine connector type
                        cssClass:"common-edge",
                        events: {
                            [EVENT_DBL_TAP]: (params) => {
                                this._editEdge(params.edge);
                            }
                        },
                        overlays: [
                            {
                                type: LabelOverlay.type,
                                options: {
                                    cssClass: "delete-relationship",
                                    label: "x",
                                    events: {
                                        [EVENT_TAP]: (params) => {
                                            this.toolkit.removeEdge(params.edge);
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    // each edge type has its own overlays.
                    "1:1": {
                        parent: "common",
                        overlays: [
                            { type:"Label", options:{ label: "1", location: 0.1 }},
                            { type:"Label", options:{ label: "1", location: 0.9 }}
                        ]
                    },
                    "1:N": {
                        parent: "common",
                        overlays: [
                            { type:"Label", options:{ label: "1", location: 0.1 }},
                            { type:"Label", options:{ label: "N", location: 0.9 }}
                        ]
                    },
                    "N:M": {
                        parent: "common",
                        overlays: [
                            { type:"Label", options:{ label: "N", location: 0.1 }},
                            { type:"Label", options:{ label: "M", location: 0.9 }}
                        ]
                    }
                },
                // There is only one type of Port - a column - so we use the key 'default' for the port type
                // Here we define the appearance of this port,
                // and we instruct the Toolkit what sort of Edge to create when the user drags a new connection
                // from an instance of this port. Note that we here we tell the Toolkit to create an Edge of type
                // 'common' because we don't know the cardinality of a relationship when the user is dragging. Once
                // a new relationship has been established we can ask the user for the cardinality and update the
                // model accordingly.
                ports: {
                    "default": {
                        component:ColumnComponent,
                        // NOTE: you can also use the `jsx` approach for ports.
                        //jsx:(ctx) => { return <ColumnComponent ctx={ctx}/> },
                        paintStyle: { fill: "#f76258" },		// the endpoint's appearance
                        hoverPaintStyle: { fill: "#434343" }, // appearance when mouse hovering on endpoint or connection
                        edgeType: "common", // the type of edge for connections from this port type
                        maxConnections: -1, // no limit on connections
                        dropOptions: {  //drop options for the port. here we attach a css class.
                            hoverClass: "drop-hover"
                        }
                    }
                }
            };

            this.renderParams = {
                // Layout the nodes using an absolute layout
                layout: {
                    type: SpringLayout.type
                },
                // Register for certain events from the renderer. Here we have subscribed to the 'nodeRendered' event,
                // which is fired each time a new node is rendered.  We attach listeners to the 'new column' button
                // in each table node.  'data' has 'node' and 'el' as properties: node is the underlying node data,
                // and el is the DOM element. We also attach listeners to all of the columns.
                // At this point we can use our underlying library to attach event listeners etc.
                events: {
                    [EVENT_EDGE_ADDED]:  (params) => {
                        // Check here that the edge was not added programmatically, ie. on load.
                        if (params.addedByMouse) {
                            this._editEdge(params.edge, true);
                        }
                    }/*,
                    canvasClick:  (e) => {
                        this.toolkit.clearSelection();
                    }*/
                },
                dragOptions: {
                    filter: "i, .view .buttons, .table .buttons, .table-column *, .view-edit, .edit-name, .delete, .add"
                },
                consumeRightClick: false,
                zoomToFit:true
            }
        }

        render() {
            return <div style={{width:"100%",height:"100%",display:"flex"}}>
                        <JsPlumbToolkitSurfaceComponent renderParams={this.renderParams} toolkit={this.toolkit} view={this.view} ref={ (c) => { if (c != null) this.surface = c.surface }}/>
                        <ControlsComponent ref={(c) => this.controls = c }/>
                        <div className="miniview"/>                        
                    </div>
        }

        dataGenerator (el) {
            return {
                name:el.getAttribute("data-node-type"),
                type:el.getAttribute("data-node-type")
            };
        }

        componentDidMount() {
            this.toolkit.load({url:"../data/schema-1.json"});
            this.controls.initialize(this.surface);

            ReactDOM.render(
                <DragDropNodeSource
                    surface={this.surface}
                    selector={"div"}
                    container={nodePaletteElement}
                    dataGenerator={this.dataGenerator}
                />
                , nodePaletteElement);

            ReactDOM.render(
                <JsPlumbToolkitMiniviewComponent surface={this.surface}/>, document.querySelector(".miniview")
            );
        }

        _editLabel (edge, deleteOnCancel) {
            dialogs.show({
                id: "dlgText",
                data: {
                    text: edge.data.label || ""
                },
                onOK: (data) => {
                    this.toolkit.updateEdge(edge, { label:data.text || "" });
                },
                onCancel:() => {
                    if (deleteOnCancel) {
                        this.toolkit.removeEdge(edge);
                    }
                }
            });
        }

        _editEdge (edge, isNew) {
            dialogs.show({
                id: "dlgRelationshipType",
                data: edge.data,
                onOK: (data) => {
                    // update the type in the edge's data model...it will be re-rendered.
                    // `type` is set in the radio buttons in the dialog template.
                    this.toolkit.updateEdge(edge, data);
                },
                onCancel: () => {
                    // if the user pressed cancel on a new edge, delete the edge.
                    if (isNew) {
                        this.toolkit.removeEdge(edge);
                    }
                }
            });
        }
    }        

    ReactDOM.render(<DemoComponent/>, document.querySelector(".jtk-demo-canvas"));
