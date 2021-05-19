import React from 'react';

//import { Dialogs } from 'jsplumbtoolkit';
import { BaseComponent } from './base-component.jsx';
import { ColumnComponent } from './column-component.jsx';

export class TableComponent extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {

        return <div className="table node">
            <div className="name">
                <div className="delete" title="Click to delete" onClick={this.deleteObject.bind(this)}/>
                <span>{this.node.data.name}</span>
                <div className="buttons">
                    <div className="edit-name" title="Click to edit table name" onClick={this.editName.bind(this)}/>
                    <div className="new-column add" title="Click to add a new column" onClick={this.addColumn.bind(this)}/>
                </div>
            </div>
            <div className="table-columns">
                { this.node.data.columns.map(c => <ColumnComponent data={c} key={c.id} parent={this}/>) }
            </div>

        </div>
    }

    addColumn() {
        // Dialogs.show({
        //     id: "dlgColumnEdit",
        //     title: "Column Details",
        //     onOK:  (data) => {
        //         // if the user supplied a column name, tell the toolkit to add a new port, providing it the
        //         // id and name of the new column.  This will result in a callback to the portFactory defined above.
        //         if (data.name) {
        //             if (data.name.length < 2)
        //                 alert("Column ids must be at least 2 characters!");
        //             else {
        //                 this.toolkit.addNewPort(this.node, "column", {
        //                     id: jsPlumbUtil.uuid(),
        //                     name: data.name.replace(" ", "_").toLowerCase(),
        //                     primaryKey: data.primaryKey,
        //                     datatype: data.datatype
        //                 });
        //             }
        //         }
        //     }
        // });
    }
}
