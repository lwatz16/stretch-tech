import React, { Component } from 'react';

interface FilterMenuProps {
  healthLabels: string[],
  applyFilter: (filter: string) => void
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

  updateFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ filter: e.target.value })
    this.props.applyFilter(e.target.value)
  }

  render() {
    let options = this.props.healthLabels.map(label => {
      return <option key={label} value={label}> {label} </option>
    })
    
    return (
      <select name="filter" value={this.state.filter} onChange={(e) => this.updateFilter(e)}>
        <option value="" disabled> Choose a Health Label </option>
        {options}
      </select>
    )
  }
}

export default FilterMenu;