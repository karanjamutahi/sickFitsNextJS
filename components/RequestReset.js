import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';


const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION(
        $email: String!,
    ) {
        requestReset(
            email: $email
        ) {
            message
        }
    }
`;

class RequestReset extends Component {
    state = {
        email: '',
        showInputs: true,
    };

    saveToState = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    };

    render() {
        return (
            <Mutation mutation={REQUEST_RESET_MUTATION} variables={{email:this.state.email}}>
                {(requestReset, { loading, error, called }) => {
                return(
                <Form data-test="form" method="POST" onSubmit={ async (e) => {
                    e.preventDefault();
                    const res = await requestReset();
                    this.setState({
                        email: '',
                        link: res.data.requestReset.message,
                    });
                }}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Reset Your Password</h2>
                        <Error error={error}></Error>
                        {(!error && !loading && called) ? 
                        <p>We've sent a reset <a href={this.state.link}>link</a> to your email </p> :
                        <>
                        <label htmlFor="email">
                            Email
                            <input type="email" name="email" id="email" placeholder='john.doe@gmail.com' required value={this.state.email} onChange={this.saveToState}/>
                        </label>
                        <button type="submit">Reset Password</button>
                        </>
                        }
                    </fieldset>
                </Form>
                )}}
            </Mutation>
        );
    }
}


export default RequestReset;
export { REQUEST_RESET_MUTATION };