import { Injectable } from "@angular/core";
import { ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent, ApexMarkers, ApexAxisChartSeries, ApexTooltip } from "ng-apexcharts";
import { Series } from "src/app/models/apexCharts/series";
export type ChartOptions = {
  series: any;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  fill: ApexFill;
  colors: any[];
  theme: ApexTheme;
  grid: ApexGrid;
  markers: ApexMarkers;

  tooltip: ApexTooltip;


};
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  CreateAreaChart(series: Series[], dates: any[], title: string, colors: string[], subtitle: string, height: number = 350, dataLabels: boolean = false): Partial<ChartOptions> {
    var chartOptions: Partial<ChartOptions> = {
      colors: colors,
      series: series,
      chart: {
        type: "area",
        height: height,
        width: '100%',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: dataLabels
      },
      stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'butt',
        colors: undefined,
        width: 1,
        dashArray: 0,
      },

      title: {
        text: title,
        align: "left"
      },
      subtitle: {
        text: subtitle,
        align: "left"
      },
      labels: dates,
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true,
        show: true,
        labels: {
          formatter: function (value: number): string {
            let val: string | number = Math.abs(value);

            if (val >= 10 ** 3 && val < 10 ** 6) {
              val = (val / 1000).toFixed(0) + ' K'
            } else if (val >= 10 ** 6) {
              val = (val / 1000000).toFixed(0) + ' M'
            } else {
              val = val;
            }

            return val.toString()
          }
        }
      },
      legend: {
        horizontalAlign: "left"
      }
    }
    return chartOptions;
  }

  createLogLinearChart(data: number[], name: string, dates: any[], title: string, color: string[], subtitle: string) {
    var chartOptions: Partial<ChartOptions> = {
      chart: {
        height: 270,
        type: "area",
        stacked: false,
        
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000
          }
        },
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      tooltip:{
        shared:true,
        theme:"dark",
        enabled:true,
        
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight",
        width: 1
      },
      grid: {
        padding: {
          left: 0,
          right: 0
        }
      },
      markers: {
        size: 0,
        hover: {
          size: 0
        }
      },
      series: [{
        name: name,
        data: data
      }],
      labels: dates,
      xaxis: {
        type: "datetime"
      },
      
      fill:{
        type: "gradient",
        colors:["#a2b9dd"],
        gradient: {
          shadeIntensity: 1,
          inverseColors: true,
          opacityFrom:1,
          opacityTo: 0,
          gradientToColors:["#5286d9"]
        }
      },
      yaxis: {
        opposite: false,
        title:{
          text:title,
          offsetX:5
        },
        show: true,
        labels: {
          formatter: function (value: number): string {
            let val: string | number = Math.abs(value);

            if (val >= 10 ** 3 && val < 10 ** 6) {
              val = (val / 1000).toFixed(0) + ' K'
            } else if (val >= 10 ** 6) {
              val = (val / 1000000).toFixed(0) + ' M'
            } else {
              val = val;
            }

            return val.toString()
          }
        }
      },
      legend: {
        show: true,
        floating: true,
        horizontalAlign: "left",
        onItemClick: {
          toggleDataSeries: false
        },
        position: "top",
        offsetY: -33,
        offsetX: 60
      }
    }
    return chartOptions
  }
  createLogLinearChartWithDataLabels(weekly: number[],monthly: number[],dates: any[], title: string) {
    var chartOptions: Partial<ChartOptions> = {
      series: [
      {
        name: "Monthly Log Counts",
        data: weekly
      },
      {
        name:  "Weekly Log Counts",
        data:monthly
      }
    ],
      chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: title,
      align: 'left'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: dates,
      title: {
        text: 'Month'
      } 
    },
    yaxis: {
      title: {
        text: 'Temperature'
      },
      min: 5,
      max: 40
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
    };
    return chartOptions
  }
  createEpsChartService(data: number[],title:string) {
    var chartOptions: Partial<ChartOptions> = {
      series: [
        {
          data: data
        },
      ],
      chart: {
        type: "bar",
        height: 188,

        animations: {
          enabled: true,
          easing: "linear",
          speed: 1000,
          dynamicAnimation: {
            enabled:true,
            speed: 1000
          }
        },
        dropShadow: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        sparkline:{
          enabled:true
        },
        offsetY: 0,
        zoom: {
          enabled: false
        },
          
      },
      grid: {
        show: false
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "97",
          borderRadius: 12,

          colors: {
            backgroundBarOpacity: 0.7,
            backgroundBarRadius: 0.3,
            

          },


        }
      },
      colors:["white"],
      dataLabels: {
        enabled: false
      },
      
      stroke: {
        width: 0,
        show: true
      },
      title: {
        align: "left",
        style: {
          fontSize: "12px"
        }
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false
        },
        categories:[]
      },

      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.5,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.8,
          stops: [0, 100]
        },
        
      },
    
      yaxis: {

        labels: {
          show: false
        }
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: function (val: any) {
            return val;
          },
          title: {
            formatter: function (val: any) {
              return title;
            },
          }
        },
        enabled: true,
        marker: {
          fillColors: ["#001c1e"],
          show: false
        }
      },
      legend: {
        show: false
      },

    }
    return chartOptions;
  }


  CreateRadialChart(data: number[], title: string, color: string): Partial<ChartOptions> {
    var chartOptions: Partial<ChartOptions> = {
      colors: [color],
      series: data,
      chart: {
        height: 350,
        width: '100%',
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function (val: number) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Percent"]
    };
    return chartOptions;
  }
  CreateBarChart(data: number[], color: string, categories: string[]): Partial<ChartOptions> {
    var chartOptions: Partial<ChartOptions> = {
      colors: [color],
      series: [
        {
          name: "IP Address",
          data: data
        }
      ],
      chart: {
        type: "bar",
        height: 300,
        width: '100%',
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22
        }
      },
      
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: categories
      }
    };
    return chartOptions;
  }
  createPieChart(data: number[], colors2: string[], categories: string[]): Partial<ChartOptions> {
    var chartOptions: Partial<ChartOptions> = {
      series: data,
      colors: colors2,

      chart: {
        width: "370",
        height: "auto",
        dropShadow: {
          enabled: true,

        },

        sparkline: { enabled: false },

        redrawOnParentResize: true,
        redrawOnWindowResize: true,

        animations: {
          enabled: false,
          easing: "easeinout"
        },
        type: "pie",

      },

      plotOptions: {
        pie: {
          offsetX: -20,
          offsetY: 10,
          startAngle: 0,
          endAngle: 360,
        },
      },

      labels: categories,
      responsive: [
        {
          breakpoint: 480,

          options: {

            chart: {
              width: 320,

            },

          },
        },

      ],

    };
    return chartOptions
  }
  CreateRadarChart(series: Series[], title: string, color: string[], categories: string[]): Partial<ChartOptions> {
    var chartOptions: Partial<ChartOptions> = {
      colors: color,
      series: series,
      chart: {
        height: 350,
        width: '100%',
        type: "radar",
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22
        }
      },
      title: {
        text: title
      },
      xaxis: {
        categories: categories
      }
    };
    return chartOptions;
  }
  CreateRadarWithPolygonChart(series: Series[], title: string, colors: string[], categories: string[]): Partial<ChartOptions> {
    var chartOptions: Partial<ChartOptions> = {
      series: series,
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22
        }
      },
      dataLabels: {
        enabled: true
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            fill: {
              colors: colors
            }
          }
        }
      },
      title: {
        text: title
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: ["#FF4560"],
        strokeWidth: 2
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val;
          }
        }
      },
      xaxis: {
        categories: categories
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function (val: any, i) {
            if (i % 2 === 0) {
              return val;
            } else {
              return "";
            }
          }
        }
      }
    };
    return chartOptions;
  }
  CreatePolarAreaChart(data: any[], labels: string[], colors: string[], title: string): Partial<ChartOptions> {
    var chartOptions: Partial<ChartOptions> = {
      series: data,
      chart: {
        height: 350,
        width: '100%',
        type: 'polarArea',
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22
        }
      },
      labels: labels,
      fill: {
        opacity: 0.1
      },
      colors:colors,
      stroke: {
        width: 1,
        colors: undefined
      },
      title: {
        text: title,
        align: "left"
      },
      yaxis: {
        show: true
      },
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0
          }
        }
      },
      theme: {
        monochrome: {
          shadeTo: 'light',
          shadeIntensity: 0.6
        }
      }
    };
    return chartOptions;
  }
  CreateScatterChart(series: Series[]): Partial<ChartOptions> {
    var chartOptions: Partial<ChartOptions> = {
      series: series,
      chart: {
        height: 350,
        type: 'scatter',
        width: '100%',

      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function (val) {
            return parseFloat(val).toFixed(1)
          }
        }
      },
      yaxis: {
        tickAmount: 7
      }
    };
    return chartOptions;
  }
  CreateRadialBarChart(data: number[]): Partial<ChartOptions> {
    var chartOptions: Partial<ChartOptions> = {
      series: data,
      chart: {
        height: 350,
        type: "radialBar",
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function (val) {
                return val + "%";
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ["Median Ratio"]
    };
    return chartOptions;
  }
  CreateLineChart(data: number[], dataName: string, titleText: string, categories: string[], colors: string[]) {
    var chartOptions: Partial<ChartOptions> = {
      colors: colors,
      series: [
        {
          name: dataName,
          data: data
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: titleText,
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: categories
      }
    };
    return chartOptions;
  }


  CreateSimpleDonutChart(data: any[], labels: string[]) {
    var chartOptions: Partial<ChartOptions> = {
      series:data,
      chart: {
      type: 'donut',
      offsetY:45
    },
    labels: labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      },
    }],
    plotOptions:{
      
    }
    };
    return chartOptions;
  }
  CreateGradientCircleChart() {
    var chartOptions: Partial<ChartOptions> = {
      series: [75],
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function (val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Percent"]
    };

    return chartOptions;
  }

}
