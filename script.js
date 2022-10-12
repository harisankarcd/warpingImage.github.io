window.addEventListener('load',()=>
{
    const canvas=document.getElementById('canvas')
    const ctx=canvas.getContext('2d')
    console.log(ctx)//jst4info
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
 

    

    class particle//create particles,blue print every single particles or pixelated values
    {
        constructor(effect_obj,x,y,color)
        {
            this.originY=Math.floor(y)
            this.originX=Math.floor(x)
            this.color=color
            this.effect=effect_obj
            this.x=Math.random()*this.effect.width//here y from top to dwn x and y increasing
            this.y=Math.random()*this.effect.height//postion @ x,y //canvas is faster drawing rectangles are  than circles
            this.size=3.5 //gap =size+1 optimal not 1
            this.vx=Math.random()*2-1
            this.vy=Math.random()*2-1
            this.ease=0.015

        }

        draw(context)
        {
            
            ctx.fillStyle=this.color
            context.fillRect(this.x,this.y,this.size,this.size)
            
        }
        update()
        {
             this.x+=(this.originX-this.x)*(this.ease)//remove this you get a pixel
            this.y+=(this.originY-this.y)*this.ease

        }
        warp()
        {
            this.x=Math.random()*this.effect.width//here y from top to dwn x and y increasing
            this.y=Math.random()*this.effect.height
            this.ease=0.015
        }

    }
    class effect//handle all particles create Effects all effects movement
    {//entire effect
        constructor(width,height)
        {
            this.image=document.getElementById("image")
            this.width=width
            this.height=height
            this.particleArray=[]
            this.gap=5
            this.centerx=this.width*0.5
            this.centery=this.height*0.5
            this.x=this.centerx-this.image.width*.5
            this.y=this.centery-this.image.height*.5
        }
        init(ctx)
        {
            // for(let i =0;i<100;i++)
            // this.particleArray.push(new particle(this))//effect
            
            ctx.drawImage(this.image,this.x,this.y)
            const pixels=ctx.getImageData(0,0,this.width,this.height).data
            console.log(pixels)
            for(let y=0;y<this.height;y+=this.gap )
            {
                for(let x=0;x<this.width;x+=this.gap)
                {
                    const index=(y*this.width+ x )*4
                    const red=pixels[index]
                    const green=pixels[index+1]
                    const blue=pixels[index+2]
                    const alpha=pixels[index+3]
                    const color='rgb('+red+','+green+','+blue+')'
                    if(alpha>0)
                    {
                        this.particleArray.push(new particle(this,x,y,color));
                    }

                }
            }
        }
       draw(ctx)
       {
        this.particleArray.forEach(particle=>particle.draw(ctx))

       }
       update()
       {
        this.particleArray.forEach(particle=>particle.update())
       }
       warp()
       {
        this.particleArray.forEach(particle=>particle.warp())
       }
    

    }
    const effecte=new effect(canvas.width,canvas.height)
    effecte.init(ctx)
console.log(effecte)
    function animate()//animate
    {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        effecte.draw(ctx)
        effecte.update()
        requestAnimationFrame(animate);

    }
    
   animate(effecte)
   const button=document.getElementById("warpButton")

   button.addEventListener('click',()=>
   {
       effecte.warp()
   })

})
