import React, { Component } from 'react';

interface FilterMenuProps {
  healthLabels: string[]
}

interface FilterMenuState {
  filter: string
}

class FilterMenu extends Component<FilterMenuProps, FilterMenuState> {
  constructor(props: FilterMenuProps) {
    super(props)
    this.state = {
      filter: ''
    }
  }

  render() {
    let options = this.props.healthLabels.map(label => {
      return <option key={label} value={label}> {label} </option>
    })
    
    return (
      <select name="filter" value={this.state.filter}>
        <option value={this.state.filter} disabled> Choose a Health Label </option>
        {options}
      </select>
    )
  }
}

export default FilterMenu;