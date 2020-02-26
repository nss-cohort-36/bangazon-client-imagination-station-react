import MyProductCard from "./MyProductCard";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function MyProductList(props) {
    const { classes } = props;

        return (
                <Card >
                    {/* {
                        this.state.points.map((point, index) => <MyProductCard key={point.id} point={point} rewards={this.state.rewards[index]} />
                        )
                    } */}
                    <MyProductCard/>
                </Card>
        )
    }

export default (MyProductList);