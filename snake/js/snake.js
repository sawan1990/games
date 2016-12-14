function snake(){
    var x=0
    var y=0
    var moveX = 1;
    var moveY = 0;
    var total = 0;
    var path = [];
    this.proceed = function(){
        if(path.length === total){
            for(i=0;i<path.length-1;i++){
                path[i]= path[i+1];
            }
        }
        path[total-1] = createVector(x,y)
        
        x += moveX*scl;
        y += moveY*scl;
        
        if(moveX==1&&x>=width)x=0;
        if(moveX==-1&&x<0)x=width - scl;
        if(moveY==1&&y>=height)y=0;
        if(moveY==-1&&y<0)y=height - scl;
    }
    this.add = function(){
        total++;
    }
    this.draw = function(){
        var multiple = 120/path.length;
        for(i=0;i<path.length;i++){
            var f = 51+(path.length*multiple) - i*multiple
//            f = f>170 ?170:f;
            fill(f)
            rect(path[i].x,path[i].y,scl,scl);
        }
        fill(51)
        rect(x,y,scl,scl);
    }
    this.drawScore=function(){
         if(death){
            textSize(100);
            text(total, width/2-100, height/2-50);   
        } else {
            textSize(32);
            text(total, 10, 32);   
        }
    }
    this.dir = function(mvX,mvY){
        if(mvX*moveX == 0 && mvY*moveY == 0){
            moveX = mvX;
            moveY = mvY;
        }
    }
    this.eat = function(){
        var d = dist(x, y, food.x, food.y);
        if (d < scl/2) {
            total++;
            sound.play();
            frameRate(framerate+total*frameincrement);
            return true;
        } else {
            return false;
        }
    }
    this.death= function(){
        for(i=0;i<path.length;i++){
            var d = dist(x, y, path[i].x, path[i].y);
            if (d < 1) {
                
                death = true;
                return;
            }
        }
    }
    this.reset = function(){
        x=0;y=0;moveX=1;moveY=0;total=0;path=[];frameRate(framerate);
    }
}