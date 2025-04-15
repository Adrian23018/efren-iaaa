import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartOptionsService {
  
  constructor() { }
  
  /**
   * Obtiene opciones base para gráficos Line/Bar
   * @param {number} maxValue - Valor máximo para el eje Y
   * @param {string} label - Etiqueta para el eje Y
   * @param {number} stepSize - Tamaño del paso para las marcas del eje Y
   * @param {string} color - Color de las etiquetas y marcas
   * @returns Opciones configuradas para el gráfico
   */
  getBaseOptions(maxValue: number, label: string = 'Valores', stepSize: number = 0, color: string = '#495057'): Object {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: maxValue,
          ticks: {
            stepSize: stepSize > 0 ? stepSize : 1,
            color,
          },
          title: {
            display: true,
            text: label,
            color,
            font: {
              size: 14,
              weight: 'bold',
            },
          },
        },
      },
    };
  }
  
  /**
   * Opciones para gráficos de línea
   */
  getLineChartOptions(maxValue: number, label: string = 'Valores', stepSize: number = 0, color: string = '#495057'): Object {
    const baseOptions = this.getBaseOptions(maxValue, label, stepSize, color);
    
    // Personaliza opciones específicas para gráficos de línea
    return {
      ...baseOptions,
      elements: {
        line: {
          tension: 0.4 // Hace que las líneas sean más suaves
        },
        point: {
          radius: 3
        }
      }
    };
  }
  
  /**
   * Opciones para gráficos de barras
   */
  getBarChartOptions(maxValue: number, label: string = 'Valores', stepSize: number = 0, color: string = '#495057'): Object {
    const baseOptions = this.getBaseOptions(maxValue, label, stepSize, color);
    
    // Personaliza opciones específicas para gráficos de barras
    return {
      ...baseOptions,
      barPercentage: 0.6,
      categoryPercentage: 0.8
    };
  }
  
  /**
   * Opciones para gráficos de dona o pie
   */
  getPieChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#495057'
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label ?? '';
              const value = context.raw ?? 0;
              const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };
  }
}