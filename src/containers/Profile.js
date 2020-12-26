import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
    Button,
    Card,
    Dimmer,
    Divider,
    Form,
    Grid,
    Header,
    Image,
    Label,
    Loader,
    Menu,
    Message,
    Segment,
    Select,
    Table
  } from "semantic-ui-react";
import {
      countryListURL,
      addressListURL,
      addressCreateURL,
      addressUpdateURL,
      userIDURL,
      paymentListURL
  } from "../constants";
import { authAxios } from "../utils";

const UPDATE_FROM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";

class PaymentHistory extends React.Component {
    state = {
        payments: []
    };

    componentDidMount() {
        this.handleFetchPayments();
    }

    handleFetchPayments = () => {
        this.setState({loading: true });
        authAxios.get(paymentListURL)
                 .then(res => {
                     this.setState({
                         loading: false,
                         payments: res.data
                     });
                 }).catch(err => {
                     this.setState({ error: err, loading: false })
                 });
    };

    render() {
        const { payments } = this.state;
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {payments.map(payment => {
                        return (
                            <Table.Row key={payment.id}>
                                <Table.Cell>${payment.id}</Table.Cell>
                                <Table.Cell>${payment.amount}</Table.Cell>
                                <Table.Cell>${new Date(payment.timestamp).toUTCString()}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        )
    }
}

class AddressForm extends React.Component {
    state = {
        error: null,
        loading: false,
        forData: {
            address_type: "",
            apartment_address: "",
            country: "",
            default: false,
            id: "",
            street_address: "",
            user: 1,
            zip: ""
        },
        saving: false,
        success: false
    };

    componentDidMount() {
        const { address, formType } = this.props;
        if (formType === UPDATE_FROM) {
            this.setState({ formData: address });
        }
    }

    handleToggleDefault = () => {
        const { formData } = this.state;
        const updatedFormData = {
            ...formData,
            default: !formData.default
        };
        this.setState({
            formData: updatedFormData
        });
    };

    handleChange = e => {
        const { formData } = this.state;
        const updatedFormData = {
            ...formData,
            [e.target.name]: e.target.value
        };
        this.setState({
            formData: updatedFormData
        });
    };

    handleSelectChange = (e, { name, value }) => {
        const { formData } = this.state;
        const updatedFormdata = {
            ...formData,
            [name]: value
        };
        this.setState({
            formData: updatedFormdata
        });
    };

    handleSubmit = e => {
        this.setState({ saving: true });
        e.preventDefault();

        const { formType } = this.props;
        if (formType === UPDATE_FROM) {
            this.handleUpdateAddress();
        } else {
            this.handleCreateAddress();
        }
    };

    handleCreateAddress = () => {
        const { userID, activeItem } = this.props;
        const { formData } = this.state;
        authAxios.post(addressCreateURL, {
            ...formData,
            user: userID,
            address_type: activeItem === "billingAddress" ? "B" : "S"
        })
        .then(res => {
            this.setState({
                saving: false,
                success: true,
                formData: { default: false }
            });
            this.props.callback();
        })
        .catch(err => {
            this.setState({ error: err });
        });
    };

    handleUpdateAddress = () => {
        const { userID, activeItem } = this.props;
        const { formData } = this.state;
        authAxios.put(addressUpdateURL(formData.id), {
            ...formData,
            user: userID,
            address_type: activeItem === "billingAddress" ? "B" : "S"
        }).then(res => {
            this.setState({
                saving: false,
                success: true,
                formDate: { default: false }
            });
            this.props.callback();
        }).catch(err => {
            this.setState({ error: err });
        });
    };

    render() {
        const { countries } = this.props;
        const { error, formData, success, saving } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} success={success} error={error}>
                <Form.Input
                    required
                    name="street_address"
                    placeholder="Street address"
                    onChange={this.handleChange}
                    value={formDate.street_address}
                />
                <Form.Input
                    required
                    name="apartment_address"
                    placeholder="Apartment address"
                    onChange={this.handleChange}
                    value={formData.apartment_address}
                />
                <Form.Field required>
                <Select
                    loading={countries.length < 1}
                    fluid
                    clearable
                    search
                    options={countries}
                    name="country"
                    placeholder="Country"
                    onChange={this.handleSelectChange}
                    value={formData.country}
                />
                </Form.Field>
                <Form.Input
                required
                name="zip"
                placeholder="Zip code"
                onChange={this.handleChange}
                value={formData.zip}
                />
                <Form.Checkbox
                name="default"
                label="Make this the default address?"
                onChange={this.handleToggleDefault}
                checked={formData.default}
                />
                { success && (
                    <Message success header="Success!" content="Your address was saved" />
                )}
                { error && (
                    <Message
                        error
                        header="There was an error"
                        content={JSON.stringify(error)}
                    />
                )}
                <Form.Button disabled={saving} loading={saving} primary>
                    save
                </Form.Button>
            </Form>

        )
    }
}
