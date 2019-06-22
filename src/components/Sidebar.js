import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>

                <NavLink to='/dashboard' className='nav-link' activeClassName='nav-link-active'>Dashboard</NavLink>
                <div className='nav-link'>Access Management</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <NavLink to='/user-management' className='nav-sub-link' activeClassName='nav-link-active'>User Management</NavLink>
                    <NavLink to='/role-management' className='nav-sub-link' activeClassName='nav-link-active'>Role Management</NavLink>
                    <NavLink to='/permission-management' className='nav-sub-link' activeClassName='nav-link-active'>Permission Management</NavLink>
                </div>

                <NavLink to='/modules' className='nav-link' activeClassName='nav-link-active'>Modules</NavLink>

                <NavLink to='/menus' className='nav-link' activeClassName='nav-link-active'>Menus</NavLink>
            </div>
        )
    }
}
