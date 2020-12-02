import React from 'react';

import { Dialogs } from 'jsplumbtoolkit';

import { BaseComponent } from './base-component.jsx';

export class ViewComponent extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {

        const obj = this.node.data;

        return <div className="view node">
            <div className="name">
                <div className="view-delete" title="Click to delete" onClick={this.deleteObject.bind(this)}>
                    <i className="fa fa-times"/>
                </div>
                <span>{obj.name}</span>
                <div className="buttons">
                    <div className="edit-name" title="Click to edit view name" onClick={this.editName.bind(this)}>
                        <i className="fa fa-pencil"/>
                    </div>
                </div>
            </div>
            <div className="view-edit" title="Click to edit view query" onClick={this.editQuery.bind(this)}>
                <i className="fa fa-pencil"/>
            </div>
            <div className="view-details">{obj.query}</div>
        </div>
    }

    editQuery() {
        Dialogs.show({
            id: "dlgViewQuery",
            data: this.node.data,
            onOK: (data) => {
                this.updateNode(data);
            }
        });
    }
}
