import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import { check } from 'graphql-anywhere';

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE',
  ];


const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation updatePermissions(
        $UserPermissions:[Permission]!,
        $userID: ID!
        ) {
            updatePermissions(permissions: $UserPermissions, where:{
                id: $userID
                }) {
                id
                permissions
                firstname
            }
        }
`;

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            firstname
            lastname
            email
            permissions 
        }
    }
`;

class Permissions extends Component { 
    render() {
        return (
            <Query query={ALL_USERS_QUERY}>
                {
                    ({data, loading, error}) => {
                        return(
                                <>
                                <Error error={error}></Error>
                                <h1>Manage Permissions</h1>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            { possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
                                            <th>👇🏿</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.users.map(user => (
                                            <UserPermissions user={user} key={user.id}></UserPermissions>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                </>
                                )}
                }
            </Query>
        );
    }
}

class UserPermissions extends Component {
    static proptypes = {
        user: PropTypes.shape({
            firstname: PropTypes.string,
            email: PropTypes.string,
            id: PropTypes.string,
            permissions: PropTypes.array,
        }).isRequired,
    };

    state = {
        permissions: this.props.user.permissions,
    };

    handlePermissionChange = (e) => {
        const checkbox = e.target;
        let updatedPermissions = [...this.state.permissions];
        if(checkbox.checked) {
            updatedPermissions.push(checkbox.value);
        } else {
            updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
        }

        this.setState({
            permissions:updatedPermissions,
        });
    };

    handlePermissionUpdate = () => {

    };

    render() {
        const user = this.props.user;
        return(
        <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{
            UserPermissions: this.state.permissions,
            userID: this.props.user.id
        }}>
        {(updatePermissions, { loading, error}) => {
         return (
            <>
            {error && <tr><td colSpan="9"><Error error={error}></Error></td></tr>}
            <tr>
                <td>{user.firstname}</td>
                <td>{user.email}</td>
                { possiblePermissions.map(permission => (
                    <td key={permission}>
                        <label htmlFor={`${user.id}-permission-${permission}`}>
                            <input id={`${user.id}-permission-${permission}`} type="checkbox" checked={this.state.permissions.includes(permission)} value={permission} onChange={this.handlePermissionChange}></input>
                        </label>
                    </td>
                ))}
            <td><SickButton type="button" disabled={loading} onClick={(e) => {
                updatePermissions();
            }}>Updat{loading ? 'ing' : 'e'}</SickButton></td>
            </tr>
            </>
        )   
        }}    
        </Mutation>
        )
    }
}

export default Permissions;