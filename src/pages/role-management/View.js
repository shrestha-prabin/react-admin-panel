import React, { Component } from 'react'
import { Icon, Label, Menu, Table, Button, Confirm } from 'semantic-ui-react';
import { db } from '../../config/firebase';

export default class ViewPermission extends Component {


    constructor(props) {
        super(props)

        this.state = {
            dataList: null,

            recordToDelete: '',
            confirmOpen: false,

            permissionList: []
        }
    }

    componentDidMount() {

        db.ref('permissions').on('value', snapshot => {
            var permissionList = [];
            snapshot.forEach(data => {
                permissionList.push(data.val());
            });
            this.setState({ permissionList });
        })

        db.ref('roles').on('value', snapshot => {
            var dataList = [];
            snapshot.forEach(data => {
                dataList.push(data.val());

            });
            this.setState({ dataList });
        })
    }

    openConfirm = (name) => {
        this.setState({ confirmOpen: true, recordToDelete: name });
    }

    closeConfirm = () => {
        this.setState({ confirmOpen: false, recordToDelete: '' })
    }

    removeRecord = () => {
        var ref = db.ref('roles');
        ref.orderByChild('name').equalTo(this.state.recordToDelete)
            .on('value', (snapshot) => {
                if (snapshot) {
                    snapshot.forEach(data => {
                        ref.child(data.key).remove();
                        this.closeConfirm();
                    });

                }
            })
    }

    renderDataList() {
        const { dataList, permissionList } = this.state;

        return dataList ? dataList.map(item => {
            const assignedPermissions = item.permissions;
            const renderPermissonNames = assignedPermissions ?
                assignedPermissions.map(permission => {
                    return <div key={permission}>
                        {permissionList.find(x => x.name == permission).displayName}
                    </div>
                }) : (
                    <div></div>
                )
            return (<Table.Row key={item.name}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{renderPermissonNames}</Table.Cell>
                {item.active
                    ? <Table.Cell>
                        <Icon name='checkmark' /> Active
                    </Table.Cell>
                    : <Table.Cell negative>
                        <Icon name='close' /> Disabled
                    </Table.Cell>
                }
                <Table.Cell>
                    <Button.Group basic>
                        <Button icon='edit' />
                        <Button icon='trash' onClick={() => this.openConfirm(item.name)} />
                    </Button.Group>
                </Table.Cell>
            </Table.Row>)
        }) : <Table.Row></Table.Row>

    }

    render() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Permissions</Table.HeaderCell>
                            <Table.HeaderCell>Active</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderDataList()}
                    </Table.Body>
                </Table>

                <Confirm
                    open={this.state.confirmOpen}
                    header='Delete Role'
                    content={`Role: ${this.state.recordToDelete}`}
                    confirmButton='Delete'
                    onCancel={this.closeConfirm}
                    onConfirm={this.removeRecord}
                    size='mini' />
            </div>
        )
    }
}
