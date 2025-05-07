import React, { useEffect, useRef } from 'react';
import Card from '../ui/Card';

interface ChartData {
  labels: string[];
  values: number[];
}

interface CourseCompletionChartProps {
  data: ChartData;
}

const CourseCompletionChart: React.FC<CourseCompletionChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Simple bar chart rendering
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const padding = 40;
    const chartHeight = canvasRef.current.height - 2 * padding;
    const chartWidth = canvasRef.current.width - 2 * padding;
    const barWidth = chartWidth / data.values.length - 10;
    
    // Find max value for scaling
    const maxValue = Math.max(...data.values);
    
    // Draw bars
    data.values.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + index * (barWidth + 10);
      const y = canvasRef.current!.height - padding - barHeight;
      
      // Draw bar
      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Draw value on top of bar
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
      
      // Draw label below bar
      ctx.fillStyle = '#9CA3AF';
      ctx.textAlign = 'center';
      ctx.fillText(data.labels[index], x + barWidth / 2, canvasRef.current!.height - padding + 15);
    });
    
    // Draw axes
    ctx.strokeStyle = '#4B5563';
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvasRef.current.height - padding);
    ctx.lineTo(canvasRef.current.width - padding, canvasRef.current.height - padding);
    ctx.stroke();
  }, [data]);
  
  return (
    <Card title="Course Completions" subtitle="Last 6 months">
      <div className="p-4">
        <canvas 
          ref={canvasRef}
          width={500}
          height={300}
          className="w-full h-auto"
        ></canvas>
      </div>
    </Card>
  );
};

export default CourseCompletionChart;