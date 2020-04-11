import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';


const RESET_MUTATION = gql`
    mutation RESET_MUTATION(
        $resetToken: String!,
        $password: String!
        $confirmPassword: String!
    ) {
        resetPassword(
            resetToken: $resetToken,
            password:$password,
            confirmPassword:$confirmPassword,
        ) {
            id,
            email,
            firstname,
        }
    }
`;

class Reset extends Component {
    static propTypes = {
        resetToken: PropTypes.string.isRequired
    }
    
    state = {
        password: '',
        confirmPassword: '',
        showInputs: true,
    };

    saveToState = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    };


    render() {
        return (
            <Mutation mutation={ RESET_MUTATION } variables={{
                resetToken : this.props.resetToken,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            }}>
                {(reset, { loading, error, called }) => {
                return(
                <Form method="POST" onSubmit={ async (e) => {
                    e.preventDefault();
                    const res = await reset();
                    console.log(res);
                    this.setState({
                        password: '',
                        confirmPassword: '',
                        showInputs: false,
                    });
                }}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Reset Your Password</h2>
                        <Error error={error}></Error>
                        {!error && !loading && called && <p>Password reset successful!</p>}
                        <label htmlFor="password">
                            Password
                            <input type="password" name="password" id="password" placeholder='john.doe@gmail.com' required value={this.state.password} onChange={this.saveToState}/>
                        </label>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder='john.doe@gmail.com' required value={this.state.confirmPassword} onChange={this.saveToState}/>
                        </label>
                        <button type="submit">Reset Password</button>
                    </fieldset>
                </Form>
                )}}
            </Mutation>
        );
    }
}


export default Reset;