import React from 'react';
import { BaseNodeComponent }  from 'jsplumbtoolkit-react';

import { Dialogs } from 'jsplumbtoolkit';

export class BaseComponent extends BaseNodeComponent {

    constructor(props) {
        super(props);
    }

    deleteObject() {
        Dialogs.show({
            id: "dlgConfirm",
            data: {
                msg: "Delete '" + this.node.id
            },
            onOK: (data) => {
                this.removeNode();
            }
        })
    }

    editName() {
        Dialogs.show({
            id: "dlgName",
            data: this.node.data,
            title: "Edit " + this.node.data.type + " name",
            onOK: (data) => {
                if (data.name && data.name.length > 2) {
                    // if name is at least 2 chars long, update the underlying data and
                    // update the UI.
                    this.updateNode(data);
                }
            }
        });
    }
}
