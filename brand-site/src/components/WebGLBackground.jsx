import React, { useEffect, useRef } from 'react';

const vertexShaderSource = `
  attribute vec2 position;
  void main(){gl_Position=vec4(position,0.0,1.0);}
`;

const fragmentShaderSource = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  
  uniform vec2 uResolution;
  uniform float uTime;
  
  void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      uv.x *= uResolution.x / uResolution.y;
      
      // Base light background #F8F9FA
      vec3 bg = vec3(0.973, 0.976, 0.980);
      
      // Royal Blue #0047AB
      vec3 blue = vec3(0.0, 0.278, 0.671);
      
      // Vivid Red #D71920
      vec3 red = vec3(0.843, 0.098, 0.125);
      
      // Create slow, smooth fluid waves
      float time = uTime * 0.3;
      
      // Wave 1 for Blue
      float wave1 = sin(uv.x * 2.5 + time) * cos(uv.y * 2.0 - time * 0.8);
      // Wave 2 for Red
      float wave2 = sin(uv.x * 3.0 - time * 1.2) * cos(uv.y * 2.5 + time * 1.1);
      
      vec3 finalColor = bg;
      
      // Very subtle blend (accent colors should be minimal)
      if(wave1 > 0.6) {
          float intensity = (wave1 - 0.6) * 0.15;
          finalColor = mix(finalColor, blue, intensity);
      }
      if(wave2 > 0.6) {
          float intensity = (wave2 - 0.6) * 0.15;
          finalColor = mix(finalColor, red, intensity);
      }
      
      // Add a subtle vignette or radial fade to keep it clean
      float dist = distance(gl_FragCoord.xy / uResolution.xy, vec2(0.5));
      finalColor -= dist * 0.03;
      
      gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function WebGLBackground({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Create full screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uResolution: gl.getUniformLocation(program, 'uResolution')
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let animationFrameId;
    const startTime = performance.now();

    const render = () => {
      const time = ((performance.now() - startTime) / 1000) * 2.5;
      gl.uniform1f(uniforms.uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}