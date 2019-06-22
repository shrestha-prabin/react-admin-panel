import React, { Component } from 'react'
import { Form, Input, Button, Divider, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';

export default class CreatePermission extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            displayName: ''
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        const { name, displayName } = this.state;
        console.log(this.state);

        const data = { name, displayName };
        db.ref('permissions').push(data)
            .then(res => {
                alert('New Permission Added');
            })
            .catch(err => {
                alert(err);
            });
    }

    render() {

        const { name, displayName } = this.state;
        return (
            <div className='page'>
                <h2 className='page-title'>Permission Management</h2>

                <div className='page-card'>
                    <h3>Create Permission</h3>
                    <Divider />

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input label='Name' placeholder='Name' name='name' value={name} onChange={this.handleChange} required />
                        <Form.Input label='Display Name' placeholder='Display Name' name='displayName' value={displayName} onChange={this.handleChange} required />
                        <Form.Group inline>
                            <Form.Button content={'Create'} primary />
                            <Link to='/permission-management'><Button negative >Cancel</Button></Link>
                        </Form.Group>
                    </Form>

                </div>
            </div>
        )
    }
}
