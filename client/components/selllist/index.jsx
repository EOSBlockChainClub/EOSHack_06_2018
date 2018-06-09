import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components';

import actions from './../../actions/sellList';

class SellList extends React.Component {

    handleClick = item => {
        this.props.choice(item);
    }

    get items() {
        const { list } = this.props;

        if (list) {
            return list.map((item, idx) => {
                const total = parseInt(item.price, 10) * parseInt(item.amount, 10) || 0

                return <Row key={idx} onClick={this.handleClick.bind(this, item)}>
                    <Cell>{item.amount}</Cell>
                    <Cell>{item.price}</Cell>
                    <Cell>{total}</Cell>
                </Row>;
            })
        }
    }

    render() {
        return (
            <Wrap>
                <Title>
                    Sell Orders
                </Title>
                <Table>
                    <thead>
                        <tr>
                            <HeadCell>Price</HeadCell>
                            <HeadCell>Amount</HeadCell>
                            <HeadCell>Total</HeadCell>
                        </tr>
                    </thead>
                    <tbody>
                        {this.items}
                    </tbody>
                </Table>
            </Wrap>
        )
    }
}

export default connect(
    ({ sellList }) => ({
        list: sellList
    }),
    dispatch => bindActionCreators(actions, dispatch)
)(SellList);

const Wrap = styled.div`
    width: 100%;
`;

const Title = styled.h4`
    text-align: center;
    font-size: 120%;
`;

const Table = styled.table`
    border: 1px solid #eee;
    width: 100%;
`;

const Row = styled.tr`
    cursor: pointer;

    &:hover {
        background: #f7f7f7;
    }
`;

const HeadCell = styled.th`
    text-align: right;
`;

const Cell = styled.td`
    text-align: right;
`;
