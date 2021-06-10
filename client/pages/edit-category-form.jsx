import React from 'react';

class EditCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryId: '',
      categoryName: '',
      categoryAmount: ''
    };
    this.handleEditCategoryNameInputChange = this.handleEditCategoryNameInputChange.bind(this);
    this.handleEditCategoryAmountInputChange = this.handleEditCategoryAmountInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => this.setState({ categories: data }));
  }

  handleEditCategoryNameInputChange(event) {
    this.setState({ categoryName: event.target.value });
    console.log(event.target.value.id);
    this.setState({ categroyId: event.target.id });
  }

  handleEditCategoryAmountInputChange(event) {
    this.setState({ categoryAmount: event.target.value });
  }

  handleSubmit(event) {

    event.preventDefault();

    const editedCategory = {
      categoryId: this.state.categoryId,
      categoryName: this.state.categoryName,
      categoryAmount: this.state.categoryAmount
    };
    this.props.onSubmit(editedCategory);
    this.setState({ categoryName: '' });
    this.setState({ categoryAmount: '' });

    window.location.hash = '#categories';

    console.log(editedCategory);
  }

  render() {
    const editedCategoryName = this.state.categoryName;
    const editedCategoryAmount = this.state.categoryAmount;

    return (
      <div className="row">
        <div className="col">
          <div className="edit-category-form-container pt-5">
            <form className="edit-category-form-group" onSubmit={this.handleSubmit}>
              <h2 className="edit-category-header">Edit a Category.</h2>

              <label>Enter Name</label>
              <input
                required
                autoFocus
                type="text"
                value={editedCategoryName}
                htmlFor="editCategoryNameInput"
                className="form-control"
                id="editCategoryNameInput"
                placeholder="Category Name"
                onChange={this.handleEditCategoryNameInputChange} />

              <label>Enter Amount</label>
              <input
                required
                autoFocus
                type="text"
                value={editedCategoryAmount}
                htmlFor="editCategoryAmountInput"
                className="form-control"
                id="editCategoryAmountInput"
                placeholder="$0.00"
                onChange={this.handleEditCategoryAmountInputChange} />

              <div className="edit-category-form-button-container d-flex justify-content-end w-100">
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCategoryForm;