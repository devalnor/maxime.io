import {settings} from './portrait-settings.mjs';
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
export class PortraitFlock {
  constructor(targets, random=Math.random, source=targets){
    this.targets=targets;this.count=targets.length/3;
    this.position=new Float32Array(targets.length);this.velocity=new Float32Array(targets.length);this.next=new Float32Array(targets.length);
    this.launched=new Uint8Array(this.count).fill(1);this.entryRange=new Float32Array(this.count);this.entryProgress=new Float32Array(this.count).fill(1);this.entrySpeed=new Float32Array(this.count);
    this.opacity=new Float32Array(this.count).fill(1);this.entryAge=Infinity;
    this.mobility=new Float32Array(this.count);this.phase=new Float32Array(this.count);this.distance=new Float32Array(this.count);
    this.entryDelay=new Float32Array(this.count);this.entryDirection=new Float32Array(targets.length);this.entryBend=new Float32Array(targets.length);this.entryInertia=new Float32Array(this.count);
    this.wake=new Float32Array(this.count);
    this.links=new Int32Array(this.count);this.heads=new Map();
    for(let i=0;i<this.count;i++){
      this.mobility[i]=1-smooth(.38,.69,source[i*3]);
      this.phase[i]=random()*Math.PI*2;this.distance[i]=3+random()*12;
      // Timing, spawn direction and bending are independent random samples.
      this.entryDelay[i]=random();this.entryInertia[i]=.8+random()*.4;
      for(const direction of [this.entryDirection,this.entryBend]){
        const z=random()*2-1,angle=random()*Math.PI*2,r=Math.sqrt(1-z*z),k=i*3;
        direction[k]=Math.cos(angle)*r;direction[k+1]=Math.sin(angle)*r;direction[k+2]=z;
      }
    }
  }
  settle(){this.launched.fill(1);this.entryProgress.fill(1);this.entrySpeed.fill(0);this.entryAge=Infinity;this.opacity.fill(1);this.position.set(this.targets);this.velocity.fill(0);this.wake.fill(0);}
  release(){
    this.settle();
    for(let i=0;i<this.count;i++){
      const k=i*3,m=this.mobility[i],phase=this.phase[i];
      // Show the face immediately, with agents already at different points
      // on short, individual orbits around its dissolving left edge.
      this.position[k]-=this.distance[i]*m*(.32+.25*(1-Math.cos(phase)));
      this.position[k+1]+=Math.sin(phase)*3.5*m;
      this.position[k+2]+=Math.cos(phase)*2.3*m;
    }
  }
  beginBuild(){
    this.release();this.entryAge=0;this.opacity.fill(0);this.launched.fill(0);this.entryProgress.fill(0);
    for(let i=0;i<this.count;i++){
      const k=i*3,drift=(.6+this.distance[i]*.16)*settings.spread;
      // Appear locally in a loose volume, already moving in the same simulation.
      this.position[k]+=this.entryDirection[k]*drift;
      this.position[k+1]+=this.entryDirection[k+1]*drift;
      this.position[k+2]+=this.entryDirection[k+2]*drift;
      this.velocity[k]=this.velocity[k+1]=this.velocity[k+2]=0;
    }
  }
  step(dt,assembly,elapsed,bounds,pointer){
    this.entryAge+=dt;
    const p=this.position,v=this.velocity,t=this.targets,cell=1.6,key=(x,y,z)=>x+y*1024+z*1048576;
    this.heads.clear();
    for(let i=0;i<this.count;i++){const k=i*3,h=key(Math.floor(p[k]/cell),Math.floor(p[k+1]/cell),Math.floor(p[k+2]/cell));this.links[i]=this.heads.get(h)??-1;this.heads.set(h,i);}
    for(let i=0;i<this.count;i++){
      const k=i*3,m=this.mobility[i];
      const depthFactor=pointer?.cameraZ?(pointer.cameraZ-p[k+2])/pointer.cameraZ:1;
      const mouseX=pointer?.cameraZ?pointer.cameraX+(pointer.x-pointer.cameraX)*depthFactor:(pointer?.x??0);
      const mouseY=pointer?.cameraZ?pointer.cameraY+(pointer.y-pointer.cameraY)*depthFactor:(pointer?.y??0);
      const rx=p[k]-mouseX,ry=p[k+1]-mouseY,d2=rx*rx+ry*ry;
      const phase=this.phase[i];
      // Individual, slowly varying influence volumes avoid a circular boundary.
      const radius=8+settings.pointerNoise*(2*Math.sin(phase)+1.3*Math.sin(elapsed*.7+phase*2));
      const ellipseX=1+settings.pointerNoise*.22*Math.cos(phase);
      const ellipseY=1+settings.pointerNoise*.2*Math.sin(phase*2);
      const proximity=pointer?.active?1-smooth(0,radius,Math.hypot(rx/ellipseX,ry/ellipseY)):0;
      this.wake[i]=Math.max(proximity,this.wake[i]*Math.exp(-dt*1.8));

      const wave=.5+.5*Math.sin(elapsed*.38+phase);
      const release=(1-assembly)*(.4+.6*wave)*settings.dispersion;
      // Each agent has its own nearby destination: no shared flock attractor.
      const orbit=elapsed*.48+phase;
      let gx=t[k]-this.distance[i]*m*release*(.55+.45*Math.cos(orbit));
      let gy=t[k+1]+Math.sin(orbit)*5*m*release;
      let gz=t[k+2]+Math.cos(orbit)*3.5*m*release;
      const remaining=Math.hypot(gx-p[k],gy-p[k+1],gz-p[k+2]);
      // Launch and fade share each particle's delay. Velocity is then retained
      // by the same steering simulation, with braking as the goal approaches.
      const delay=this.entryDelay[i]*settings.stagger;
      if(!this.launched[i]){
        if(this.entryAge<delay){this.next[k]=this.next[k+1]=this.next[k+2]=0;continue;}
        this.launched[i]=1;this.entryRange[i]=remaining;
        this.entrySpeed[i]=Math.min(32,remaining*(2+settings.introSpeed*4));
        const dx=(gx-p[k])/(remaining||1),dy=(gy-p[k+1])/(remaining||1),dz=(gz-p[k+2])/(remaining||1);
        const dot=dx*this.entryBend[k]+dy*this.entryBend[k+1]+dz*this.entryBend[k+2];
        const curve=settings.entryCurve;
        const sx=dx+curve*(this.entryBend[k]-dx*dot),sy=dy+curve*(this.entryBend[k+1]-dy*dot),sz=dz+curve*(this.entryBend[k+2]-dz*dot);
        const launch=this.entrySpeed[i]/(Math.hypot(sx,sy,sz)||1);
        v[k]=sx*launch;v[k+1]=sy*launch;v[k+2]=sz*launch;
      }
      this.entryProgress[i]=Math.max(this.entryProgress[i],this.entryRange[i]>.01?1-remaining/this.entryRange[i]:1);
      const arrival=1-this.entryProgress[i];
      const spring=4,drag=3.5*(1+(this.entryInertia[i]-1)*arrival);
      let fx=(gx-p[k])*spring-v[k]*drag,fy=(gy-p[k+1])*spring-v[k+1]*drag,fz=(gz-p[k+2])*spring-v[k+2]*drag;
      const bend=settings.entryCurve*Math.min(this.entryRange[i],5)*arrival*arrival;
      fx+=this.entryBend[k]*bend;fy+=this.entryBend[k+1]*bend;fz+=this.entryBend[k+2]*bend;
      const cx=Math.floor(p[k]/cell),cy=Math.floor(p[k+1]/cell),cz=Math.floor(p[k+2]/cell);
      let n=0;
      scan:for(let dx=(remaining<6&&m>.001?-1:2);dx<=1;dx++)for(let dy=-1;dy<=1;dy++)for(let dz=-1;dz<=1;dz++){
        let j=this.heads.get(key(cx+dx,cy+dy,cz+dz))??-1,seen=0;
        while(j!==-1&&seen++<10){if(j!==i){const q=j*3,rx=p[k]-p[q],ry=p[k+1]-p[q+1],rz=p[k+2]-p[q+2],d2=rx*rx+ry*ry+rz*rz;
          if(d2<2.5){const w=m*release;
            // Weak alignment, separation, deliberately no cohesion.
            fx+=(v[q]-v[k])*.012*w;fy+=(v[q+1]-v[k+1])*.012*w;fz+=(v[q+2]-v[k+2])*.012*w;
            if(d2<.65&&d2>.0001){const repel=.3*w/(d2+.08);fx+=rx*repel;fy+=ry*repel;fz+=rz*repel;}
            if(++n>=8)break scan;
          }
        }j=this.links[j];}
      }
      if(proximity>0){
        const dist=Math.sqrt(d2),nx=dist>.01?rx/dist:Math.cos(phase),ny=dist>.01?ry/dist:Math.sin(phase);
        const strength=proximity*settings.pointerForce;
        const noise=settings.pointerNoise;
        const radial=12+28*(1-smooth(0,radius*.45,dist));
        const handedness=Math.sin(phase*3)>.82?-.65:1;
        const tangent=(38+noise*12*Math.sin(elapsed*.9+phase))*settings.pointerSwirl*handedness;
        // Deflect sideways around the cursor, with smooth 3D drift rather
        // than frame-random jitter or a common spherical exclusion surface.
        fx+=strength*(nx*radial-ny*tangent+noise*8*Math.sin(elapsed*1.1+phase*2));
        fy+=strength*(ny*radial+nx*tangent+noise*7*Math.cos(elapsed*.83+phase*3));
        fz+=strength*noise*10*Math.sin(elapsed*.72+phase*2.7);
      }
      // The same steering/inertia handles arrival, holding the face and roaming.
      const acceleration=Math.min(1,28/(Math.hypot(fx,fy,fz)||1));
      const maxSpeed=Math.max(7+25*smooth(6,45,remaining),this.entrySpeed[i]*(1-this.entryProgress[i]));
      const vx=v[k]+fx*acceleration*dt,vy=v[k+1]+fy*acceleration*dt,vz=v[k+2]+fz*acceleration*dt;
      const s=Math.min(1,maxSpeed/(Math.hypot(vx,vy,vz)||1));
      this.next[k]=vx*s;this.next[k+1]=vy*s;this.next[k+2]=vz*s;
    }
    v.set(this.next);
    for(let i=0;i<this.count;i++){
      const k=i*3;
      // No positional clamps or handover: integrate velocity throughout.
      for(let d=0;d<3;d++)p[k+d]+=v[k+d]*dt;
      // Each particle has its own soft fade; no common reveal front or switch.
      const delay=this.entryDelay[i]*settings.stagger;
      const duration=settings.fadeDuration*(.8+this.distance[i]*.032);
      const fadeTarget=Math.min(smooth(delay,delay+duration,this.entryAge),smooth(0,.9,this.entryProgress[i]));
      this.opacity[i]=Math.max(this.opacity[i],fadeTarget);
    }
  }
}
