import React from 'react';
//import { Dialogs } from 'jsplumbtoolkit';
import { BasePortComponent } from '@jsplumbtoolkit/react';

export class ColumnComponent extends BasePortComponent {

    constructor(props) {
        super(props);
    }

    render() {

        let c = this.state;

        return <div className="table-column" data-column-type={c.datatype} primary-key={(c.primaryKey || false).toString()} data-jtk-port-id={c.id}>

            <div className="table-column-delete" onClick={this.deleteColumn.bind(this)}>
                <i className="fa fa-times table-column-delete-icon"/>
            </div>

            <div><span>{c.name}</span></div>

            <div className="table-column-edit" onClick={this.editColumn.bind(this)}>
                <i className="fa fa-pencil table-column-edit-icon"/>
            </div>

            <jtk-source port-id={c.id} scope={c.datatype} filter=".table-column-delete, .table-column-delete-icon, span, .table-column-edit, .table-column-edit-icon" filter-exclude="true"/>
            <jtk-target port-id={c.id} scope={c.datatype}/>
        </div>
    }

    deleteColumn() {
        // Dialogs.show({
        //     id: "dlgConfirm",
        //     data: {
        //         msg: "Delete column '" + this.state.name + "'"
        //     },
        //     onOK: (data) => {
        //         this.removePort();
        //     }
        // });
    }

    editColumn() {
        let port = this.getPort();
        Dialogs.show({
            id: "dlgColumnEdit",
            title: "Column Details",
            data: port.data,
            onOK: (data) => {
                // save changes if name is 2 or more characters.
                if (data.name) {
                    if (data.name.length < 2) {
                        Dialogs.show({id: "dlgMessage", msg: "Column names must be at least 2 characters!"});
                    }
                    else {
                        this.updatePort({
                            name: data.name.replace(" ", "_").toLowerCase(),
                            primaryKey: data.primaryKey,
                            datatype: data.datatype
                        });
                    }
                }
            }
        });
    }
}
