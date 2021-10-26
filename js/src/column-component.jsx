import React from 'react';
import { BasePortComponent } from '@jsplumbtoolkit/browser-ui-react';

export class ColumnComponent extends BasePortComponent {

    dialogManager;

    constructor(props) {
        super(props);
        this.dialogManager = props.dlg;
    }

    render() {

        let c = this.state;

        return <div className="table-column" data-column-type={c.datatype} primary-key={(c.primaryKey || false).toString()} data-jtk-port={c.id} data-jtk-scope={c.datatype} data-jtk-source={true} data-jtk-target={true}>

            <div className="table-column-delete" onClick={this.deleteColumn.bind(this)}>
                <i className="fa fa-times table-column-delete-icon"/>
            </div>

            <div><span>{c.name}</span></div>

            <div className="table-column-edit" onClick={this.editColumn.bind(this)}>
                <i className="fa fa-pencil table-column-edit-icon"/>
            </div>

        </div>
    }

    deleteColumn() {
        this.dialogManager.showDeleteDialog(this.getPort(), (data) => {
            this.removePort();
        });
    }

    editColumn() {
        let port = this.getPort();

        this.dialogManager.showEdgeDialog(port, (data) => {
            // if the user supplied a column name, tell the toolkit to add a new port, providing it the
            // id and name of the new column.  This will result in a callback to the portFactory defined above.
            if (data.name) {
                if (data.name.length < 2)
                    alert("Column ids must be at least 2 characters!");
                else {
                    this.updatePort({
                        name: data.name.replace(" ", "_").toLowerCase(),
                        primaryKey: data.primaryKey,
                        datatype: data.datatype
                    });
                }
            }
        })
    }
}
