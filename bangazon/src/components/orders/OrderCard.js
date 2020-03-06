import React from "react"
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Author: Lauren Riddle
// Purpose: To create a card for each order in order history
const styles = {
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};
class Order extends React.Component {
    // Creates card for order
    render() {

        return (
            <>
                <section className="order-card">
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h6">

                                <Link
                                    to={{
                                        pathname: `/orderhistory/${this.props.order.id}`,

                                    }} className="view-order-button">
                                    Order #{this.props.order.id}
                                </Link>

                            </Typography>

                            <Typography variant="h6" component="h6">
                                {this.props.order.created_at}
                            </Typography>

                        </CardContent>
                    </Card>
                </section>
            </>
        )
    }
}

export default withStyles(styles)(Order)