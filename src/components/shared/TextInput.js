import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const { type, name, className, placeholder, cref, error } = this.props;
    let style = error ? { background: 'red' } : {};
    return (
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        value={this.state.value}
        onChange={this.handleChange}
        ref={cref}
        style={style}
      />
    );
  }
}
