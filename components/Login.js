import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION(
        $email: String!,
        $password: String!,
    ) {
        login(
            email: $email
            password: $password
        ) {
            id,
            email,
            firstname
        }
    }
`;

class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    saveToState = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    };


    render() {
        return (
            <Mutation mutation={LOGIN_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY}]}>
                {(login, { loading, error }) => {
                return(
                <Form method="POST" onSubmit={ async (e) => {
                    e.preventDefault();
                    const res = await login();
                    this.setState({
                        email: '',
                        password: '',
                        Fname: '',
                    });
                    //TODO: If user came in throu Login Page or invalid page, route them to items.
                }}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Log Into your Account</h2>
                        <Error error={error}></Error>
                        <label htmlFor="email">
                            Email
                            <input type="email" name="email" id="email" placeholder='jack.doe@gmail.com' required value={this.state.email} onChange={this.saveToState}/>
                        </label>

                        <label htmlFor="password">
                            Password
                            <input type="password" name="password" id="password" placeholder='Enter secure password' required value={this.state.password} onChange={this.saveToState}/>
                        </label>

                        <button type="submit">Log In</button>
                    </fieldset>
                </Form>
                )}}
            </Mutation>
        );
    }
}


export default Login;