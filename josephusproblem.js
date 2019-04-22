/*
* Sanjeev Pandey 04/09/2019 - Feel free to use the code and don't forget to acknowledge the author 
*/

    var N; //prompt("Enter Desired # Of People","");
	var feedbackConsole = $("#textbox");
	var feedbackText = "";
	//updateText("You Entered: "+N);
	var people = [];
	var k = 1;
	var c = document.getElementById("canvas");
	var w = 26;
    var x = 20;
    var y = 40;
    var m;

    function isArray(x) {
		return x.constructor.toString().indexOf("Array") > -1;
    }
    
    window.addEventListener('keypress', function (e) {
        //if (event.which != null) {
            e.which == 13 ? main() : console.log('keylogger: '+e.which);
        //}
    }, false);
    
    function main() {
        //console.log(isArray(people));
        cleanUI();
        people = [];
        N = $("#peoplenumber").val();
        if(N != "" && N > 1){
            for(let i=1; i<=N; i++){
                people.push(i);
            }
            
            // console.log(people.length);

            paintUI();
            // updateText("Original:"+people);
            // actual magic is happening here:
            
            // people.forEach(element => {
            //     console.log(element);
            // });

            do {
                for(let j=0;j<people.length;j++){
                    m = (j+k);
                    if(m>=people.length){
                        m=0;
                    }
                    updateText(people[j]+" killed "+people[m]);
					deletedPeople(m);
					//test();
                    people.splice(m, 1);
                }
            } while (people.length > 1);
            updateText("Remaining One: "+people);
            lastOneStanding(people[0]);
        } else if(N != "" && N == 1){
            updateText("Too few people. You entered "+N);
        } else if(N != "" && N < 0){
			updateText(
			"We didn't think you'd go there!\
			But what the heck, it's just a negative number.\
			We'd handle it for you ;) ");
		} else {
            updateText("No value entered!")
        }
    }
    
	function paintUI(){
		if (c.getContext) {
        	var ctx = c.getContext("2d");
      		for(let i=0;i<people.length;i++){
       			x=x+30;
       			if(x > c.width-40){
       				x=50;
       				y=y+40;
       			}
        		ctx.beginPath();
        		if(people.length%i == 0){
        			ctx.fillStyle = "rgb(200,0,0)";
        		} else if(people.length%i == 1){
        			ctx.fillStyle = "rgb(200,10,20)";
        		} else if(people.length%i == 2){
        			ctx.fillStyle = "rgb(100,30,100)";
        		} else if(people.length%i == 3){
        			ctx.fillStyle = "rgb(50,205,50)";
        		} else {
        			ctx.fillStyle = "rgb(30,20,200)";
        		}
        		ctx.arc(x, y, w/2, 0, 2 * Math.PI, false);
        		ctx.fill();
        		ctx = c.getContext("2d");
        		ctx.font = '10pt Calibri';
        		ctx.fillStyle = 'white';
        		ctx.textAlign = 'center';
        		ctx.fillText(people[i], x, y+3);
    		}
        } 
        //   else {
  		// 	console.log("UI Issue");
  		// }
    }
    
    function cleanUI(){
        if(c.getContext){
			//
        }
        feedbackConsole.val("");
	}
	
	function test() {
		let body = document.getElementsByTagName('body')[0];
			var p = document.createElement('img');
			p.src = "person.png";
			body.appendChild(p);
	}

	function deletedPeople(killed){
		if (c.getContext) {
			x=x+30;
       		if(x > c.width-40){
       			x=50;
       			y=y+40;
       		}
			var ctx = c.getContext("2d");
      		ctx.beginPath();
      		ctx.fillStyle = "rgb(250,245,245)";
        	ctx.arc(x, y, w/2, 0, 2 * Math.PI, false);
        	ctx.fill();
			ctx = c.getContext("2d");
        	ctx.font = '10pt Calibri';
        	ctx.fillStyle = 'black';
        	ctx.textAlign = 'center';
        	ctx.fillText(people[killed], x, y+3);
    	}
	}

	function lastOneStanding(winner) {
		if (c.getContext) {
			x=x+30;
       		if(x > c.width-40){
       			x=50;
       			y=y+40;
       		}
        	var ctx = c.getContext("2d");
      		ctx.beginPath();
      		ctx.fillStyle = "rgb(0,0,0)";
        	ctx.arc(x, y, w/1.5, 0, 2 * Math.PI, false);
        	ctx.fill();
        	ctx = c.getContext("2d");
        	ctx.font = '10pt Calibri';
        	ctx.fillStyle = 'white';
        	ctx.textAlign = 'center';
        	ctx.fillText(winner, x, y+3);
    	}
		
	}

	function updateText(feedback){
		//console.log(feedback);
		feedbackText = "\n"+feedback;
		feedbackConsole.val(feedbackConsole.val() + feedbackText);
	}