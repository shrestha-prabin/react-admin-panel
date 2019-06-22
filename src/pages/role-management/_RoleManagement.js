import React, { Component } from 'react'
import ViewRole from './View';
import { Link } from 'react-router-dom';

import { Button, Divider } from 'semantic-ui-react';

export default class RoleManagement extends Component {
    render() {
        return (
            <div className='page'>
                <h2 className='page-title'>Role Management</h2>

                <div className='page-card'>
                    <div className='space-between'>
                        <h3>Role Management</h3>
                        <Link to='/role-management/create'>
                            <Button content='Create' primary icon='add' labelPosition='left' />
                        </Link>
                    </div>
                    <Divider />
                    <ViewRole />
                </div>
            </div>
        )
    }
}
