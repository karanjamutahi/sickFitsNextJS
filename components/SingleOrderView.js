import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import formatMoney from '../lib/formatMoney';
import OrderStyles from './styles/OrderItemStyles';


class SingleOrderView extends Component {

    render() {
        return (
            <OrderStyles>
                <p>
                    <span>Order ID:</span>  
                    <span>{this.props.order.id}</span>
                </p>
                <p>
                    <span>Charge Number</span>
                    <span>{this.props.order.charge}</span>
                </p>
                <p>
                    <span>Date</span>
                    <span>{format(this.props.order.createdAt, 'MMMM d, Y h:mm a')}</span>
                </p>
                <p>
                    <span>Total</span>
                    <span>{formatMoney(this.props.order.total)}</span>
                </p>
                <div className="items">
                    {
                        this.props.order.items.map(item => (
                            <div className="order-item" key={item.id}>
                                <img src={item.image} alt={item.title}/>
                                <div className="item-details">
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>Each: {formatMoney(item.price)}</p>
                                    <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        )) 
                    }
                </div>
            </OrderStyles>
        );
    }
}

SingleOrderView.propTypes = {
    order: PropTypes.object.isRequired,
};

export default SingleOrderView;