import { Col, Divider, Row } from 'antd';
import React from 'react';
import MonthStatistic from './MonthStatistic';
import QuantityStatistic from './QuantityStatistic';
function HomePage(props) {
    return (
        <>
        <Row gutter={[16,16]} >
            <Col lg={{span: 24}}>
               <QuantityStatistic />
            </Col>
            <Col xl={{span: 16}} lg={{span: 16}}>

            </Col>
        </Row>
        <Divider>Tổng quan hoạt động tháng</Divider>
        <MonthStatistic />
       


        </>
    );
}

export default HomePage;