import React from 'react';

class Cell extends React.Component {
  state = { clicked: false };

  handleClick = () => {
    if (this.state.clicked) return;

    const { pos, updateCell, updateMark, updateWin } = this.props;
    updateCell(pos);
    updateMark();
    updateWin();
    this.setState({ clicked: true });
  }

  componentWillReceiveProps(nextProps) {
    const { restart } = this.props;

    if (nextProps.restart !== restart) {
      this.setState({ clicked: false });
    }
  }

  render() {
    return (
      <div className="cell-style" onClick={this.handleClick}>
        {this.props.mark}
      </div>
    )
  }
}

export default Cell;
