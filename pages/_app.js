import React from 'react';
import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
import { isMonday } from 'date-fns';


class myApp extends App {

    static async getInitialProps({ Component,  ctx}){
        let pageProps = {};
        if(Component.getInitialProps){ {/**If a Component has props */}
            pageProps = await Component.getInitialProps(ctx);
        }

        {/**This exposes the query to the user */}
        pageProps.query = ctx.query;
        return { pageProps }; 
    }

    render() {
        console.log("Inside _app");
        const { Component, apollo, pageProps } = this.props;
        
        return (
            <Container>
                <ApolloProvider client={this.props.apollo}>
                    <Page>
                        <Component { ...pageProps }/>
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withData(myApp);