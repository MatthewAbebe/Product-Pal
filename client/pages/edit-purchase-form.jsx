import React from 'react';
import { useParams } from 'react-router';

class EditPurchaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
      purchaseId: '',
      category: '',
      description: '',
      amount: '',
      selectCategory: []
    };
    this.handleEditCategoryInputChange = this.handleEditCategoryInputChange.bind(this);
    this.handleEditDescriptionInputChange = this.handleEditDescriptionInputChange.bind(this);
    this.handleEditPurchaseAmountInputChange = this.handleEditPurchaseAmountInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => this.setState({ selectCategory: data }));
  }

  handleEditCategoryInputChange(event) {
    this.setState({ category: event.target.value });
  }

  handleEditDescriptionInputChange(event) {
    this.setState({ description: event.target.value });
  }

  handleEditPurchaseAmountInputChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleSubmit(event) {

    event.preventDefault();

    const editedPurchase = {
      purchaseId: parseInt(this.props.purchaseId),
      category: this.state.category,
      description: this.state.description,
      amount: parseInt(this.state.amount)
    };
    this.props.onSubmit(editedPurchase);
    this.setState({ category: '' });
    this.setState({ description: '' });
    this.setState({ amount: '' });

    window.location.hash = 'purchases';

    console.log(editedPurchase);
  }

  render() {
    const editedCategory = this.state.category;
    const editedAmount = this.state.amount;
    const editedDescription = this.state.description;
    const optionTemplate = this.state.selectCategory.map((v, key) => (
      <option key={key} value={v.id}>{v.categoryName}</option>
    ));

    return (
      <div className="row">
        <div className="col">
          <div className="edit-purchase-form-container pt-5">
            <form className="edit-purchase-form-group" onSubmit={this.handleSubmit}>
              <h2 className="edit-purchase-header">Edit a Purchase.</h2>

              <label>Enter Category</label>
              <select className="form-select" aria-label="Default select example" required value={editedCategory} onChange={this.handleEditCategoryInputChange}>
                <option value="" disabled hidden>Select an option</option>
                {optionTemplate}
              </select>

              <label>Enter Description</label>
              <input
                required
                autoFocus
                type="text"
                value={editedDescription}
                htmlFor="editDescriptionInput"
                className="form-control"
                id="editDescriptionInput"
                placeholder="Description"
                onChange={this.handleEditDescriptionInputChange} />

              <label>Enter Amount</label>
              <input
                required
                autoFocus
                type="text"
                value={editedAmount}
                htmlFor="editAmountInput"
                className="form-control"
                id="editAmountInput"
                placeholder="$0.00"
                onChange={this.handleEditPurchaseAmountInputChange} />

              <div className="edit-purchase-form-button-container d-flex justify-content-end w-100">
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPurchaseForm;
