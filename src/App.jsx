import React, { Component } from 'react';
import loving from './assets/loving_emoji.png';
import crying from './assets/crying_emoji.png';
import smiling from './assets/smiling_emoji.png';
import sleeping from './assets/sleeping_emoji.png';
import withSunGlasses from './assets/sunglasses_emoji.png';
import Counter from './components/Counter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.images = [loving, crying, smiling, sleeping, withSunGlasses];

    let savedVotes;
    try {
      const stored = localStorage.getItem('votes');
      savedVotes = stored ? JSON.parse(stored) : Array(this.images.length).fill(0);
      if (!Array.isArray(savedVotes)) savedVotes = Array(this.images.length).fill(0);
    } catch (error) {
      savedVotes = Array(this.images.length).fill(0);
    }

    this.state = {
      votes: savedVotes,
      winnersEmoji: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.votes !== this.state.votes) {
      localStorage.setItem('votes', JSON.stringify(this.state.votes));
    }
  }

  handleVote = (index) => {
    const newVotes = [...this.state.votes];
    newVotes[index] += 1;
    this.setState({ votes: newVotes });
  };

  showResults = () => {
    const { votes } = this.state;
    const maxVotes = Math.max(...votes);
    if (maxVotes === 0) {
      this.setState({ winnersEmoji: [] });
      return;
    }

    const winners = votes
      .map((v, i) => (v === maxVotes ? i : -1))
      .filter(i => i !== -1);

    this.setState({ winnersEmoji: winners });
  };

  resetResults = () => {
    const resetVotes = Array(this.images.length).fill(0);
    this.setState({ votes: resetVotes, winnersEmoji: [] });
    localStorage.removeItem('votes');
  };

  render() {
    const { votes, winnersEmoji } = this.state;

    return (
      <div className="container py-4">
        <h1 className="fw-bold text-center mb-4">
          Голосування за найкращий смайлик
        </h1>

        {/* эмодзи в сетке */}
        <div className="row g-4 justify-content-center">
          {this.images.map((src, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 text-center">
              <Counter
                src={src}
                alt={`emoji-${index}`}
                votes={votes[index]}
                onVote={() => this.handleVote(index)}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button onClick={this.showResults}>
            Show Results
          </button>
        </div>

        {winnersEmoji.length > 0 && (
          <div className="mt-5 text-center">
            <p className="fw-bold fs-2">Результати голосування:</p>
            {winnersEmoji.length > 1 ? (
              <p className="fw-bold fs-4">Нічия:</p>
            ) : (
              <p className="fw-bold fs-4">Переможець:</p>
            )}

            <div className="row g-3 justify-content-center">
              {winnersEmoji.map(i => (
                <div key={i} className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <img
                    src={this.images[i]}
                    alt={`winner-${i}`}
                    style={{ width: '120px' }}
                    className="emoji-winner img-fluid"
                  />
                </div>
              ))}
            </div>

            <p className="fw-bold fs-5 mt-3">
              Кількість голосів: {Math.max(...votes)}
            </p>

            <button onClick={this.resetResults}>
              Очистити результати
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
