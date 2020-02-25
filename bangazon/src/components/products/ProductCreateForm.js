class ProductCreateForm extends Component {
    state = {
        Description: "",
        Name: "",
        Price: "",
        Quantity: null,
        Location: "",
        ImagePath: "./none_pic.jpg",
        ProductTypeId: null
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    saveProduct = evt => {
        evt.preventDefault()


        const product = {

        }


        fetch('http://localhost:8000/products', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
                name: this.state.Name,
                description: this.state.Description,
                price: Number(this.state.Price),
                quantity: this.state.Quantity,
                location: this.state.Location,
                imagePath: this.state.ImagePath,
                product_type_id: Number(this.state.ProductTypeId)
            })
        })
            .then(response => response.json())
            .then(() => {
                this.props.history.push("/product/")
            })

    }

    render() {
        return (
            <>
                <div>
                    <h3>Sell a Product</h3>

                    <form>
                        <input type="text" placeholder="Enter Product Name" id="Name" onChange={this.handleFieldChange} />

                        <input placeholder="Enter Description" type="text" id="Description" onChange={this.handleFieldChange} />

                        <input placeholder="Enter Quantity" type="text" id="Quantity" onChange={this.handleFieldChange} />

                        <input placeholder="Enter Location" type="text" id="Location" onChange={this.handleFieldChange} />

                        <input placeholder="Enter Price" type="text" id="Price" onChange={this.handleFieldChange} />


                        {/* <select id="projectId" onChange={this.handleFieldChange}>
                                <option value="">Select a Project</option>

                                {this.state.projects.map((project) => {
                                    return <option key={project.id} value={project.id} >{project.name}</option>
                                })}
                            </select> */}
                        <button
                            variant="light"
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.saveProduct}
                        >Sell</button>
                    </form>
                </div>
            </>
        );
    }
}

export default ProductCreateForm