// Libs
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// Style
// import style from './style.scss';

const FormFilter = React.createClass({
  displayName: 'FormFilter',

  propTypes: {
    setItemsFiltered: PropTypes.func.isRequired,
  },

  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      items: {},
      inputDisable: false
    };
  },

  handleInputChange(event) {
    let items = this.state.items;
    let inputStatusID = event.target.name === 'id' && event.target.value !== '';
    let item = parseInt(event.target.value, 10) || '';

    if (item !== '') {
      items[event.target.name] = item;
    } else {
      delete items[event.target.name];
    }

    this.setState({
      items: items,
      inputDisable: inputStatusID
    });

    this.props.setItemsFiltered(this.state.items);
  },

  render() {
    return (
      <form className="form-filter-range">
        <fieldset className="filter-range">
          <div className="filter-range-item">
            <label className="filter-range-label">
              {'ID'}
              <input
                name={ 'id' }
                onChange={ this.handleInputChange }
                type="number"
                className="form-control" />
            </label>
          </div>
          <div className="filter-range-item">
            <label className="filter-range-label">
              {'Área'}
              <input
                name={ 'squareMeters' }
                value={ this.state.squareMeters }
                onChange={ this.handleInputChange }
                type="number"
                className="form-control"
                disabled={this.state.inputDisable} />
            </label>
          </div>
        </fieldset>

        <fieldset className="filter-range">
          <div className="filter-range-item">
            <label className="filter-range-label">
              {'Quartos'}
              <input
                name={ 'beds' }
                value={ this.state.beds }
                onChange={ this.handleInputChange }
                type="number"
                className="form-control"
                disabled={this.state.inputDisable} />
            </label>
          </div>
          <div className="filter-range-item">
            <label className="filter-range-label">
              {'Banheiros'}
              <input
                name={ 'baths' }
                value={ this.state.baths }
                onChange={ this.handleInputChange }
                type="number"
                className="form-control"
                disabled={this.state.inputDisable} />
            </label>
          </div>
        </fieldset>

        <fieldset className="filter-range">
          <div className="filter-range-item">
            <label className="filter-range-label">
              {'Valor'}
              <input
                name={ 'priceMin' }
                value={ this.state.priceMin }
                onChange={ this.handleInputChange }
                type="number"
                className="form-control"
                placeholder={'Minimo'}
                disabled={this.state.inputDisable} />
            </label>
          </div>
          <div className="filter-range-item">
            <label className="filter-range-label">
              <input
                name={ 'priceMax' }
                value={ this.state.priceMax }
                onChange={ this.handleInputChange }
                type="number"
                className="form-control"
                placeholder={'Maximo'}
                disabled={this.state.inputDisable} />
            </label>
          </div>
        </fieldset>

      </form>
    );
  }
});

export default FormFilter;
