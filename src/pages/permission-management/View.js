import React, { Component } from 'react'
import { Icon, Label, Menu, Table, Button, Confirm } from 'semantic-ui-react';
import { db } from '../../config/firebase';

export default class ViewPermission extends Component {


    constructor(props) {
        super(props)

        this.state = {
            dataList: null,

            recordToDelete: '',
            confirmOpen: false
        }
    }

    componentDidMount() {
        db.ref('permissions').on('value', snapshot => {
            var dataList = [];
            snapshot.forEach(child => {
                dataList.push(child.val());
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
        var ref = db.ref('permissions');
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
        const { dataList } = this.state;
        return dataList ? dataList.map(item => {
            return (<Table.Row key={item.name}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.displayName}</Table.Cell>
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
                            <Table.HeaderCell>Permission</Table.HeaderCell>
                            <Table.HeaderCell>Display Name</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderDataList()}
                    </Table.Body>
                </Table>

                <Confirm
                    open={this.state.confirmOpen}
                    header='Delete Permission'
                    content={`Permission Name: ${this.state.recordToDelete}`}
                    confirmButton='Delete'
                    onCancel={this.closeConfirm}
                    onConfirm={this.removeRecord}
                    size='mini' />
            </div>
        )
    }
}
