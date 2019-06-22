import React, { Component } from 'react'
import ViewPermission from './View';
import { Link } from 'react-router-dom';

import { Button, Divider } from 'semantic-ui-react';

export default class PermissionManagement extends Component {
    render() {
        return (
            <div className='page'>
                <h2 className='page-title'>Permission Management</h2>

                <div className='page-card'>
                    <div className='space-between'>
                        <h3>Permission Management</h3>
                        <Link to='/permission-management/create'>
                            <Button content='Create' primary icon='add' labelPosition='left' />
                        </Link>
                    </div>
                    <Divider />
                    <ViewPermission />
                </div>
            </div>
        )
    }
}
