import React, { Component } from "react";
import filterFields from "../filterFields.json";

const FilterContext = React.createContext();

export default class FilterContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstVariable: { filterFields, filterValues: {} },
      secondVariable: { filterFields, filterValues: {} }
    };
  }

  handleInputChange = async ({ name, value, yearOptions, groupOptions, fieldOptions }) => {
    const canAddFilter = () => {
      if (
        this.state[this.props.variableName].filterValues.hasOwnProperty(
          "Time Period"
        ) &&
        this.state[this.props.variableName].filterValues.hasOwnProperty(
          "Geographic Unit"
        ) &&
        Object.keys(this.state[this.props.variableName].filterValues).length < 3
      )
        return true;
      else if (
        this.state[this.props.variableName].filterValues.hasOwnProperty(
          "Time Period"
        ) &&
        Object.keys(this.state[this.props.variableName].filterValues).length < 2
      )
        return true;
      else if (
        this.state[this.props.variableName].filterValues.hasOwnProperty(
          "Geographic Unit"
        ) &&
        Object.keys(this.state[this.props.variableName].filterValues).length < 2
      )
        return true;
      else if (
        Object.keys(this.state[this.props.variableName].filterValues).length <
        1 ||
        name === "Time Period" ||
        name === "Geographic Unit"
      )
        return true;
      else if (
        this.state[this.props.variableName].filterValues.hasOwnProperty(name)
      )
        return true;
      else return false;
     
    }; 
    const canAdd = canAddFilter();
    const { variableName } = this.props;
    if (canAdd === true) {
      await this.setState({
        [variableName]: {
          ...this.state[variableName],
          filterValues: {
            ...this.state[variableName].filterValues,
            [name]: {
              ...this.state[variableName].filterValues[name],
              name,
              value,
              yearOptions,
              colors: "",
            }
          }
        }
      });
      this.props.handleMapChange({ name, value, yearOptions, groupOptions, fieldOptions });
    } else {
      Object.values(this.state[variableName].filterValues).forEach(val => {        
        if (val.name) {
          if (val.name !== "Time Period" && val.name !== "Geographic Unit"  ) 
          {
            delete this.state[variableName].filterValues[val.name]
          }
        }

      })
      await this.setState({
        [variableName]: {
          ...this.state[variableName],
          filterValues: {
            ...this.state[variableName].filterValues,
            [name]: {
              ...this.state[variableName].filterValues[name],
              name,
              value,
              yearOptions,
              colors: ""
            }
          }
        }
      })
      this.props.handleMapChange({ name, value, yearOptions, groupOptions, fieldOptions });
    }
  };

  clearFilter = name => {
    const { variableName } = this.props;
    const { [name]: _, ...filterValues } = this.state[
      this.props.variableName
    ].filterValues;

    this.setState({
      [variableName]: {
        ...this.state[variableName],
        filterValues
      }
    });
  };

  handleColorChange = (name, colorsArr) => {
    const { variableName } = this.props;
    this.setState({
      [variableName]: {
        ...this.state[variableName],
        filterValues: {
          ...this.state[this.props.variableName].filterValues,
          [name]: {
            ...this.state[variableName].filterValues[name],
            colors: colorsArr
          }
        }
      }
    });
  };

  render() {
    // add layers to the children
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        layers: this.props.layers,
        legend: this.props.legend
      })
    );

    return (
      <FilterContext.Provider
        value={{
          filterFields: this.state[this.props.variableName].filterFields,
          filterValues: this.state[this.props.variableName].filterValues,
          handleInputChange: this.handleInputChange,
          handleColorChange: this.handleColorChange,
          clearFilter: this.clearFilter
        }}
      >
        {children}
      </FilterContext.Provider>
    );
  }
}

export const FilterConsumer = FilterContext.Consumer;
