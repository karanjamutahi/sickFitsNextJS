import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';
import CURRENT_USER_QUERY from './User';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!,
        $password: String!,
        $Fname: String!,
        $lastname: String
    ) {
        signUp(
            email: $email
            password: $password
            firstname: $Fname
            lastname: $lastname
        ) {
            id,
            email,
            firstname
        }
    }
`;

class Signup extends Component {
    state = {
        email: '',
        password: '',
        Fname: '',
    };

    saveToState = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    };


    render() {
        return (
            <Mutation mutation={SIGNUP_MUTATION} variables={this.state} refetchQueries={[{query: CURRENT_USER_QUERY}]}>
                {(signup, { loading, error }) => {

                return(
                <Form data-test="signup" method="POST" onSubmit={ async (e) => {
                    e.preventDefault();
                    const res = await signup();
                    this.setState({
                        email: '',
                        password: '',
                        Fname: '',
                    });
                    Router.push('/item');
                }}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Sign Up for an Account</h2>
                        <Error error={error}></Error>
                        <label htmlFor="email">
                            Email
                            <input type="email" name="email" id="email" placeholder='jack.doe@gmail.com' required value={this.state.email} onChange={this.saveToState}/>
                        </label>

                        <label htmlFor="Fname">
                            First Name
                            <input type="text" name="Fname" id="Fname" placeholder='Jack' required value={this.state.Fname} onChange={this.saveToState}/>
                        </label>

                        <label htmlFor="password">
                            Password
                            <input type="password" name="password" id="password" placeholder='Enter secure password' required value={this.state.password} onChange={this.saveToState}/>
                        </label>

                        <button type="submit">Sign Up</button>
                    </fieldset>
                </Form>
                )}}
            </Mutation>
        );
    }
}


export default Signup;
export { SIGNUP_MUTATION };