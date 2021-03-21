export const defaultChartOptions = {
  crosshair: {
    vertLine: {
      color: 'rgba(255, 255, 255, .5)',
      width: 0.5,
      style: 2,
      visible: true,
      labelVisible: true
    },
    horzLine: {
      color: 'rgba(255, 255, 255, .5)',
      width: 0.5,
      style: 2,
      visible: true,
      labelBackgroundColor: 'white',
      labelVisible: true
    },
    mode: 0
  },
  layout: {
    backgroundColor: 'transparent',
    textColor: 'white',
    fontFamily: 'Barlow Semi Condensed'
  },
  grid: {
    horzLines: {
      visible: false
    },
    vertLines: {
      visible: false
    }
  },
  timeScale: {
    barSpacing: 4,
    rightOffset: 12,
    lockVisibleTimeRangeOnResize: true,
    rightBarStaysOnScroll: true,
    borderVisible: true,
    borderColor: 'rgba(255, 255, 255, .2)',
    visible: true,
    timeVisible: true,
    secondsVisible: true
  },
  priceScale: {
    position: 'right',
    mode: 0,
    borderColor: 'rgba(255, 255, 255, .2)',
    scaleMargins: {
      top: 0.1,
      bottom: 0.2
    }
  }
}

export const defaultSerieOptions = {
  crosshairMarkerVisible: false,
  lastValueVisible: false,
  priceLineVisible: false,
  priceFormat: {
    type: 'price',
    minMove: '0.01',
    precision: 2
  },
  scaleMargins: {
    top: 0.1,
    bottom: 0.2
  }
}

export const defaultLineOptions = {
  priceLineStyle: 1,
  color: 'white',
  lineWidth: 1,
  lineStyle: 0,
  lineType: 0
}

export const defaultCandlestickOptions = {
  priceLineColor: 'rgba(255, 255, 255, .5)',
  borderVisible: false,
  upColor: '#c3a87a',
  downColor: '#e53935',
  borderUpColor: '#c3a87a',
  borderDownColor: '#e53935',
  wickUpColor: 'rgba(223, 195, 148, .8)',
  wickDownColor: 'rgba(224, 91, 95, .8)'
}

export const defaultHistogramOptions = {
  color: '#c3a87a',
  scaleMargins: {
    top: 0.8,
    bottom: 0
  }
}

export const defaultAreaOptions = {
  topColor: 'rgba(21, 146, 230, 0.4)',
  bottomColor: 'rgba(21, 146, 230, 0)',
  lineColor: 'rgba(21, 146, 230, 1)',
  lineStyle: 0,
  lineWidth: 2
}

export const defaultBarOptions = {
  thinBars: false,
  upColor: '#a5d6a7',
  downColor: '#e57373',
  openVisible: true
}

export const defaultPlotsOptions = {
  line: defaultLineOptions,
  area: defaultAreaOptions,
  candlestick: defaultCandlestickOptions,
  bar: defaultBarOptions,
  histogram: defaultHistogramOptions
}