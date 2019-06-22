import React, { Component } from 'react'
import { Form, Input, Button, Divider, Grid, GridColumn, Dropdown, Checkbox } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';

export default class CreateRole extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            permissionList: [],
            selectedPermissions: [],
            active: true,
        }
    }

    componentDidMount() {
        db.ref('permissions').on('value', snapshot => {
            var permissionList = [];
            snapshot.forEach(data => {

                var record = data.val();

                permissionList.push({
                    key: record.name,
                    text: record.displayName,
                    value: record.name
                });
            });
            this.setState({ permissionList });
        })
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    handlePermissionChange = (e, { value }) => {
        this.setState({ selectedPermissions: value });
    }

    handleSubmit = () => {
        const { name, selectedPermissions, active } = this.state;
        
        const data = { name, permissions: selectedPermissions, active };
        console.log(data);
        db.ref('roles').push(data)
            .then(res => {
                alert('New Role Added');
            })
            .catch(err => {
                alert(err);
            });
    }

    render() {

        const { name, permissionList } = this.state;
        return (
            <div className='page'>
                <h2 className='page-title'>Role Management</h2>

                <div className='page-card'>
                    <h3>Create Role</h3>
                    <Divider />

                    <Form onSubmit={this.handleSubmit}>

                        <Form.Input label='Name' placeholder='Name' name='name' value={name} onChange={this.handleChange} required />

                        <label><b>Associated Permissions</b></label>
                        <Dropdown
                            placeholder='Permissions'
                            fluid
                            multiple
                            search
                            selection
                            options={permissionList}
                            onChange={this.handlePermissionChange} />

                        <br />

                        <Form.Group inline>
                            <Form.Button content={'Create'} primary />
                            <Link to='/role-management'><Button negative >Cancel</Button></Link>
                        </Form.Group>
                    </Form>

                </div>
            </div>
        )
    }
}
