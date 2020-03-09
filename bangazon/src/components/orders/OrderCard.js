import React, {Component} from "react"
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Author: Lauren Riddle
// Purpose: To create a card for each order in order history
// const styles = {
//     card: {
//         minWidth: 275,
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
// };
class Order extends Component {
    // Creates card for order
   formatDate = (date) => {
        //  splits the YYYY-MM-DD off of timestamp and returns
        let month = date.split("T");
        return month[0]
   }
    render() {
        return (
            <>
                <section className="order-card">
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h5">

                                    Order #{this.props.order.id} {this.formatDate(this.props.order.created_at)}
                              

                            </Typography>

                            <Typography variant="h6" component="h6">
                                
                            </Typography>
                            <Typography variant="h6" component="h6">

                                <Link
                                    to={{
                                        pathname: `/orderhistory/${this.props.order.id}`,

                                    }} className="view-order-button">
                                    View Details
                                </Link>

                            </Typography>

                        </CardContent>
                    </Card>
                </section>
            </>
        )
    }
}

export default Order