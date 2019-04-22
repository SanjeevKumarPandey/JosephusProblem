import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Runner extends React.Component {
    render() {
        return (
            <div className="runner">
                <input type='number' id='peoplenumber' placeholder='0'/>
                <button onClick = {() => this.props.onClick()}>
                    RUN
                </button>
            </div>
        );
    }
    
}

class Console extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.update({feedbackText:e.target.value});
    }

    render(){
        const feedbackText = this.props.feedbackText;
        return (
            <div className="console">
                <div className="textBox">
                <fieldset>
                    <legend>Josephus Problem's Solution:</legend>
                    <input value={feedbackText}
                    onChange={this.handleChange} />
                </fieldset>
                </div>
                {/* <div>
                <textarea cols="130" rows="5" name="comment" className='tb' id='textbox' 
                value={feedbackText} onChange={this.handleChange}>
                </textarea>                    
                </div> */}
                <Runner
                onClick={() => {this.props.onClick()}}
                    value={feedbackText}
                    onChange={this.handleChange}
                />
                <div className="canvas">
                    {/* <canvas id="canvas" width="500" height="400">
		            Your browser does not support the HTML5 canvas tag.
	                </canvas> */}
                </div>
            </div>
        );
    }

}

  
  class Solution extends React.Component {
    constructor(props){
        super(props);
        this.update = this.update.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            feedbackText: "",
        }
    }
    
    update(feedback) {
        this.setState({
          feedbackText: feedback,
        });
        console.log(feedback);
      }

    handleClick(){
        //
        var people = [];
        var k = 1;
        var m;
        var N = document.getElementById("peoplenumber").value;
        if(N !== "" && N > 1){
        for(let i=1; i<=N; i++){
            people.push(i);
        }

        do {
            for(let j=0;j<people.length;j++){
                m = (j+k);
                if(m>=people.length){
                    m=0;
                }
                this.update(people[j]+" killed "+people[m]);
                people.splice(m, 1);
            }
        } while (people.length > 1);
        this.update("Remaining One: "+people);
    } else if(N !== "" && N == 1){
        this.update("Too few people. You entered "+N);
    } else if(N !== "" && N < 0){
        this.update("We didn't think you'd go there!\
        But what the heck, it's just a negative number.\
        We'd handle it for you ;) ");
    } else {
        this.update("No value entered!");
    }
    }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Console 
            onClick = {() => this.handleClick()}
            feedbackText={this.state.feedbackText} 
            update={this.update}
            />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Solution />,
    document.getElementById('root')
  );