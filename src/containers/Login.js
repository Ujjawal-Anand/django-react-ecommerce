import React from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from "semantic-ui-react";

import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../store/actions/auth";

class LoginForm extends React.Component {
    state = {
        username: "",
        password: ""
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.login(username, password);
    };
    render() {
        const { error, loading, token } = this.props;
        const { username, password } = this.state;
        if(token) {
            return <Redirect to="/" />;
        }
        return (
            <Grid
                textAlign="center"
                style={{ height: "100vh"}}
                verticleAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        Log-in to your account
                    </Header>
                    {error && <p>{this.props.error.message}</p>}

                    <React.Fragment>
                        <form size="large" onSubmit={this.handleSubmit}>
                            <segment stacked>
                                <Form.Input
                                    onChange={this.handleChange}
                                    value={username}
                                    name="username"
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username"
                                />
                                <Form.Input
                                    onchange={this.handleChange}
                                    fluid
                                    value={password}
                                    name="password"
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                />

                                <Button
                                    color="teal"
                                    fluid
                                    size="large"
                                    loading={loading}
                                    disabled={loading}
                                >
                                    Login                                    
                                </Button>
                            </segment>
                        </form>
                        <Message>
                            New to us? <NavLink to="/signup">Sign Up</NavLink>
                        </Message>
                    </React.Fragment>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.laoding,
        error: state.auth.error,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(authLogin(username, password))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);