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
    return (
      <select>
        
      </select>
    )
  }
}

export default FilterMenu;