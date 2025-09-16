import React, { Component } from 'react';

class Counter extends Component {
  render() {
    const { src, alt, votes, onVote } = this.props;
    return (
      <div>
        <img
          src={src}
          alt={alt}
          style={{ width: '120px', cursor: 'pointer' }}
          onClick={onVote}
          className="emoji"
        />
        <p>{votes}</p>
      </div>
    );
  }
}

export default Counter;