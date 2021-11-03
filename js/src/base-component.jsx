import React from 'react';
import { BaseNodeComponent }  from '@jsplumbtoolkit/browser-ui-react';


export class BaseComponent extends BaseNodeComponent {

    dialogManager;

    constructor(props) {
        super(props);
        this.dialogManager = props.dlg;
    }

    deleteObject() {
        this.dialogManager.showDeleteDialog(this.node, () => this.removeNode())
    }

    editName() {

        this.dialogManager.showEditDialog(this.node, (data) => {
            if (data.name && data.name.length > 2) {
                // if name is at least 2 chars long, update the underlying data and
                // update the UI.
                this.updateNode(data);
            }
        })
    }
}
