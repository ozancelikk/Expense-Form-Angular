import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as echarts from 'echarts';
@Injectable({
  providedIn: 'root'
})
export class EcharServiceService {

  constructor(private datePipe:DatePipe) { }

  createGaugeChart(value:number,title:string,subtitle:string){
    return  {
      title:this.getTitleStyles(title,subtitle) ,
      tooltip: {
        formatter: '{a} <br/>{b} : {c}'
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
         
          restore: {},
          saveAsImage: {}
        }
      },
      detail: {
        backgroundColor: '#fff',
        borderColor: '#999',
        borderWidth: 2,
        width: '100%',
        lineHeight: 40,
        height: 40,
        borderRadius: 8,
        offsetCenter: [0, '35%'],
        valueAnimation: true,
        formatter: function (value) {
          return '{value|' + value.toFixed(0) + '}{unit|km/h}';
        },
        rich: {
          value: {
            fontSize: 50,
            fontWeight: 'bolder',
            color: '#777'
          },
          unit: {
            fontSize: 20,
            color: '#999',
            padding: [0, 0, -20, 10]
          }
        }
      }, 
      series: [
        {
          name: 'EPS',
          type: 'gauge',
          min: 0,
          max: 10000,
          detail: {
            formatter: '{value}'
          },
          data: [
            {
              value: value,
              name: 'EPS'
            }
          ]
        }
      ]
    };
  }
  createPieChart(seriesData:any[],legendDatas:string[],title:string,subtitle:string,symbol:string = ""){
   return {
    title: this.getTitleStyles(title,subtitle) ,
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
     
        restore: {},
        saveAsImage: {}
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}'+symbol+' ({d}%)'
    },
    legend: {
      data: legendDatas,
      orient: 'horizontal',
        y: 'bottom',
      padding:[
        30,0,0,0
      ]
    
    },
    option:{
      animationDuration: 10000,
    },
    
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '45%'],
        center:["50%","50%"], 
        labelLine: {
          length: 30
        },
        label: {
          formatter: ' {b|{b}：}{c}'+symbol+'  {per|{d}%}  ',
          backgroundColor: '#F6F8FC',
          borderColor: '#8C8D8E',
          borderWidth: 0,
          borderRadius: 10,
          rich: {
            a: {
              color: '',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#8C8D8E',
              width: '100%',
              borderWidth: 1,
              height: 0
            },
            b: {
              color: '#4C5058',
              fontSize: 12,
              fontWeight: 'bold',
              lineHeight: 33
            },
            per: {
              color: '#fff',
              backgroundColor: '#4C5058',
              padding: [3, 4],
              borderRadius: 4
            }
          }
        },
        data: seriesData
      }
    ]
    };
  }
  createBarChartWithShadow(){

    let dataAxis = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];

    let data = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

    return {
      title: {
        text: 'CPU Usage',
        subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom',
        padding:[
          19,
          0,
          0,
          0
        ],
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          color: '#999'
        }
      },
      grid: {
        width: '90%',
        height:'55',
        left: '3%',
        right: '4%',
        bottom:"15%",
        containLabel: true
      },
      series: [
        {
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: data
        }
      ]
    };
  }
  createLinearLineChart(data:any,xaxisData:string[],title:string,subtitle:string){
    
    return  {
      title: this.getTitleStyles(title,subtitle),
      tooltip: {
        trigger: 'axis',
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          start: 0,
          end: 10
        }
      ],
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },  
      xAxis: {
        type: 'category',
        show:true,
        boundaryGap: false,
        data:xaxisData
      },
      yAxis: {
        type: 'value',
        show:false
      },
      series: this.createSeries(data)
    };
  }
  createLineChart(data:number[],title:string,subtitle:string){
  return {
    title: this.getTitleStyles(title,subtitle) ,
    xAxis: {
      data: data,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: data
      }
    ]
  };
  }
  createBarChart(data:number[],axisData:number[],title:string,subtitle:string){
    return {
      title: this.getTitleStyles(title,subtitle) ,
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        axisPointer: {
          type: 'none',
        },
  
        borderWidth: 1,
        transitionDuration: 0,
       
        formatter: "{a} <br/>{b} : {c}EPS",
      },
      xAxis: {
        type: 'category',

        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        boundaryGap: [0.2, 0.2],
        data: axisData,
      },
      yAxis: {
        type: 'value',
        scale: true,
        boundaryGap: false,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        min: 500,
        max: 1100,
      },
      series: [
        {
          type: 'bar',
          barCategoryGap: '12%',
          data:data,
          itemStyle: {
            color: this.rgbaColor("#fff",0.5),
          },
        },
      ],
      grid: { right: '0px', left: '0px', bottom: 0, top: 0 },
    }
  }
  createShadowChart(category:string[], lineData:any[],barData:any[],title:string,subtitle:string){
    return {
      title: this.getTitleStyles(title,subtitle) ,
      backgroundColor: '#0f375f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['line', 'bar'],
        textStyle: {
          color: '#ccc'
        }
      },
      xAxis: {
        data: category,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      series: [
        {
          name: 'line',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData
        },
        {
          name: 'bar',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#14c8d4' },
              { offset: 1, color: '#43eec6' }
            ])
          },
          data: barData
        },
        {
          name: 'line',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(20,200,212,0.5)' },
              { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
              { offset: 1, color: 'rgba(20,200,212,0)' }
            ])
          },
          z: -12,
          data: lineData
        },
        {
          name: 'dotted',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            color: '#0f375f'
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: lineData
        }
      ]
    };
  }
  createContinuousChart(){
    const data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];
    
    const dateList = data.map(function (item) {
    return item[0];
    });
    const valueList = data.map(function (item) {
    return item[1];
    });
    return {
      // Make gradient line here
      visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
        },
        {
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          dimension: 0,
          min: 0,
          max: dateList.length - 1
        }
      ],
    
      title: [
        {
          left: 'center',
          text: 'Gradient along the y axis'
        },
        {
          top: '55%',
          left: 'center',
          text: 'Gradient along the x axis'
        }
      ],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [
        {
          data: dateList
        },
        {
          data: dateList,
          gridIndex: 1
        }
      ],
      yAxis: [
        {},
        {
          gridIndex: 1
        }
      ],
      grid: [
        {
          bottom: '60%'
        },
        {
          top: '60%'
        }
      ],
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: valueList
        },
        {
          type: 'line',
          showSymbol: false,
          data: valueList,
          xAxisIndex: 1,
          yAxisIndex: 1
        }
      ]
    };
  }
  createCategoryChart(){
    console.log(this.getColor("primary"))
 
    return {
      color: [
        this.getColor('primary'),
        this.getColor('success'),
        this.getColor('info'),
      ],
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: this.getColor("gray-100"),
        borderColor: this.getColor("gray-300"),
        textStyle: { color: this.getColor("dark") },
        borderWidth: 1,
        transitionDuration: 0,
      
        formatter: this.tooltipFormatter,
      },
      xAxis: {
        type: 'category',
        data: this
          .getPastDates(30),
        boundaryGap: false,
        silent: true,
        axisPointer: {
          lineStyle: {
            color: this.getColor("gray-300"),
          },
        },
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: this.getColor("gray-300"),
          },
        },
        axisTick: {
          show: true,
          length: 20,
          lineStyle: {
            color: this.getColor("gray-200"),
          },

          interval: 5,
        },
        axisLabel: {
          color:this.getColor("gray-600"),
          formatter: (value: any) => this.datePipe.transform(value,"MMM DD"),
          align: 'left',
          fontSize: 11,
          padding: [0, 0, 0, 5],
          interval: 5,
        },
      },
      yAxis: {
        type: 'value',
        position: 'right',
        axisPointer: { show: false },
        splitLine: {
          lineStyle: {
            color: this.getColor("gray-200"),
          },
        },
        axisLabel: {
          show: true,
          color: this.getColor("gray-600"),
          formatter: (value: number) => `${Math.round((value / 1000) * 10) / 10}k`,
        },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          type: 'line',
          data: [
            4164, 4652, 4817, 4841, 4920, 5439, 5486, 5498, 5512, 5538, 5841,
            5877, 6086, 6146, 6199, 6431, 6704, 7939, 8127, 8296, 8322, 8389,
            8411, 8502, 8868, 8977, 9273, 9325, 9345, 9430,
          ],
          showSymbol: false,
          symbol: 'circle',
          itemStyle: {
            borderColor:  this.getColor("primary"),
            borderWidth: 2,
          },
          lineStyle: {
            color: this.getColor("primary"),
          },
          symbolSize: 2,
        },
        {
          type: 'line',
          data: [
            2164, 2292, 2386, 2430, 2528, 3045, 3255, 3295, 3481, 3604, 3688,
            3840, 3932, 3949, 4003, 4298, 4424, 4869, 4922, 4973, 5155, 5267,
            5566, 5689, 5692, 5758, 5773, 5799, 5960, 6000,
          ],
          showSymbol: false,
          symbol: 'circle',
          itemStyle: {
            borderColor: this.getColor("success"),
            borderWidth: 2,
          },
          lineStyle: {
            color:  this.getColor("success"),
          },
          symbolSize: 2,
        },
        {
          type: 'line',
          data: [
            1069, 1089, 1125, 1141, 1162, 1179, 1185, 1216, 1274, 1322, 1346,
            1395, 1439, 1564, 1581, 1590, 1656, 1815, 1868, 2010, 2133, 2179,
            2264, 2265, 2278, 2343, 2354, 2456, 2472, 2480,
          ],
          showSymbol: false,
          symbol: 'circle',
          itemStyle: {
            borderColor: this.getColor("info"),
            borderWidth: 2,
          },
          lineStyle: {
            color: this.getColor("info"),
          },
          symbolSize: 2,
        },
      ],
      grid: { right: '30px', left: '5px', bottom: '20px', top: '20px' },
    }
  }
  createAudienceCategoryChart(data:number[],dates:string[],title:string,subtitle:string){


    return {
      title: this.getTitleStyles(title,subtitle) ,
      color: this.getColor("white"),
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: this.getColor("gray-100"),
        borderColor: this.getColor("gray-300"),
        textStyle: { color: this.getColor("dark"), },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none',
        },
        formatter: this.tooltipFormatter,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar','stack'] },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data :dates,
        axisLabel: {
          color: this.getColor("gray-600"),
          formatter: (value: string | number | Date) => this.datePipe.transform(value,"MMM dd") ,
          align: 'left',
          fontSize: 11,
          padding: [0, 0, 0, 5],
          showMaxLabel: false,
        },
        axisLine: {
          lineStyle: {
            color: this.getColor("gray-200"),
          },
        },
        axisTick: {
          show: true,
          length: 20,
          lineStyle: {
            color: this.getColor("gray-200"),
          },
        },
        boundaryGap: false,
      },
      option:{
        animationDuration: 10000,
      },
      yAxis: {
        position: 'right',
        axisPointer: { type: 'none' },
        axisTick: 'none',
        splitLine: {
          lineStyle: {
            color:this.getColor("gray-200"),
          },
        },
        axisLine: { show: false },
        axisLabel: { color: this.getColor("gray-600"), },
      },
     
      
      series: [
        {
          type: 'line',
          data: data,
          showSymbol: false,
          symbol: 'circle',
          itemStyle: {
            borderColor: this.getColor("primary"),
            borderWidth: 2,
          },
          lineStyle: {
            color: this.getColor("primary"),
          },
        
        },
     
       
      ],
      grid: { right: '40px', left: '5px', bottom: '10%', top: '3%' },
    }
  }
  getColor(name: any, dom = document.documentElement)
    {

      return  getComputedStyle(dom).getPropertyValue(`--oriana-${name}`).trim();

  }
  rgbaColor(color:string, alpha:any) {
  
    return `rgba(${this.hexToRgb(color)}, ${alpha})`
   
   
  };
  tooltipFormatter(params:any,datepipe:DatePipe) {

    return `
    <div>
      <p class='mb-2 text-600'></p>
      <div class='ms-1'>
   
        <h6 class="fs--1 text-700"><span class="fas fa-circle text-primary me-2">${params[0].axisValue}</span> : ${
          params[0].value
        }</h6>
  
     
   
      </div>
    </div>
    `;
  };
  getPastDates(duration:any):any{
    let days;
  
    switch (duration) {
      case 'week':
        days = 7;
        break;
      case 'month':
        days = 30;
        break;
      case 'year':
        days = 365;
        break;
  
      default:
        days = duration;
    }
    console.log(days)
    return days
  }
  hexToRgb(hexValue:string) {
     let hex;
     hexValue.indexOf('#') === 0 ? (hex = hexValue.substring(1)) : (hex = hexValue);
     // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
     const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
       hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
     );
     return result
       ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
       : null;
  };
  createSeries(seriesdatas:any){
    let series:{type:string,stack:string,data:number[]}[] = []
   
    let datas:any[] = []
    for (let index = 0; index < seriesdatas[0].length; index++) {
      datas.push(seriesdatas.map(x => x[index]))

    }

    
    datas.forEach(element => {
      series.push({type:'line',stack:'Total',data:element})
    });


   return series
  }
  createLineChartWithVisualMap(data:number[],xaxisData:string[],title:string,subtitle:string){
    return {
      title: this.getTitleStyles(title,subtitle) ,
      xAxis: {
        type: 'category',
        data: xaxisData
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        formatter: title +" <br/>{b} : {c}"
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          start: 0,
          end: 10
        }
      ],
    
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
        visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
        }],
      series: [
        {
          data: data,
          type: 'line'
        }
      ]
    };
  }
  getTitleStyles(title:string,subtitle:string){

  return {
    text: title,
    subtext: subtitle,
    textStyle:{
          color:"#042e52",
          fontWeight  :'600'
        }
  }
}
}
