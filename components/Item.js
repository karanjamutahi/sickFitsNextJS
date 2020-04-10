import React, { Component } from "react";
import PropTypes from 'prop-types';
import Link from 'next/link';

import Title from './styles/Title'; 
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from '../components/DeleteItem'; 

class Item extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired, 
    };

    render() {
        const { item } = this.props;
        return (
            <ItemStyles>
                {item.image && <img src={ this.props.format === 'large' ? item.largeImage :item.image} alt={item.title}/> }
                <Title>
                    <Link href="item/[pid]" as={`item/${item.id}`}>
                        <a>{item.title}</a>
                    </Link>
                </Title>
                <PriceTag>{formatMoney(item.price)}</PriceTag>
                <p>{item.description}</p>
                <div className="buttonList">
                    <Link href={{
                        //'update/[pid]' as={`update/${item.id}`}
                        pathname: 'update', 
                        query: { id: item.id },
                    }}><a>Edit</a></Link>
                    <Link href=''><a>Add To Cart</a></Link>
                    <DeleteItem id={item.id}>Delete Item</DeleteItem>
                </div>
            </ItemStyles>
        )
    }
}

export default Item;