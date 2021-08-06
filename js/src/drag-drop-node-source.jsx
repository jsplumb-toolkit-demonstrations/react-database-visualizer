import React from 'react';

import {SurfaceDropComponent} from '@jsplumbtoolkit/browser-ui-react-drop';

class DragDropNodeSource extends SurfaceDropComponent {
    render() {
        return [
            <div data-node-type="table" title="Drag to add new" className="sidebar-item" key={"table"}><i className="fa fa-table btn-icon-margin"></i>Table</div>,
            <div data-node-type="view" title="Drag to add new" className="sidebar-item" key={"view"}><i className="fa fa-eye btn-icon-margin"></i>View</div>
        ];
    }
}

export default DragDropNodeSource;
