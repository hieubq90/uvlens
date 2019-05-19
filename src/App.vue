<template>
  <div class="fullpage-container">
    <div class="button-group">
      <button type="button" :class="{active:index ==0}" @click="moveTo(0)">
        {{ curentTime | moment("ngày DD-MM-YYYY") }}
      </button>
      <button type="button" :class="{active:index ==1}" @click="moveTo(1)">
        {{ curentTime | moment("add", "1 day", "ngày DD-MM-YYYY") }}
      </button>
    </div>
    <div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
      <div class="page-1 page">
        <h2 class="part-1" v-animate="{value: 'bounceInLeft'}">
          {{ curentTime | moment("BIỂU ĐỒ UV | DD-MM-YYYY") }}
        </h2>
        <div v-if="loadedCurrentUV && loadedUVForcast">
          <img alt="weather_icon" :src="getWeatherIcon(currentWeatherIcon)">
          <p class="part-1" v-animate="{value: 'bounceInRight'}">
            <span>{{ curentTime | moment("HH giờ mm") }} phút </span>
            <span> - UV: {{ currentUV }} </span>
            <span> - Nhiệt độ: {{ currentTemperature }}°C</span>
          </p>
          <p class="part-1 warn">
            Lưu ý trong khoảng thời gian
            <span> {{ [uvForcast[0].SafeBefore, "YYYY-MM-DDThh:mm:ss"] | moment("add", "7 hours", "HH giờ mm") }} phút </span>
            đến
            <span> {{ [uvForcast[0].SafeAfter, "YYYY-MM-DDThh:mm:ss"] | moment("add", "7 hours", "HH giờ mm") }} phút </span>
          </p>
          <div class="chart-wrapper">
            <la-cartesian
              :data="getUVForcast(0)"
              :bound="[0, 15]"
              autoresize
            >
              <defs>
                <linearGradient id="color-id" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stop-color="#7DB637"></stop>
                  <stop offset="0.4" stop-color="#F9B308"></stop>
                  <stop offset="0.6" stop-color="#EF8617"></stop>
                  <stop offset="0.8" stop-color="#E04127"></stop>
                  <stop offset="1" stop-color="#A75E99"></stop>
                </linearGradient>
              </defs>
              <!-- <la-area fill-color="url(#color-id)" dot curve prop="uv"></la-area> -->
              <la-line curve :width="15" label="uv" prop="uv" color="url(#color-id)"></la-line>
              <la-x-axis prop="name" color="white"></la-x-axis>
              <la-y-axis color="white"></la-y-axis>
              <la-tooltip>
                <div class="tooltip" slot-scope="props">
                  <div class="title">{{ props.label }}</div>
                  <ul class="list">
                    <li
                      :key="item.label"
                      v-for="item in props.actived"
                      :style="{ borderTop: '3px solid white' }">
                      <div class="value">UV: {{ item.value }}</div>
                    </li>
                  </ul>
                </div>
              </la-tooltip>
            </la-cartesian>
          </div>
        </div>
        <div v-else>
          <p class="part-1" v-animate="{value: 'bounceInRight'}">Đang tải dữ liệu ...</p>
        </div>
      </div>
      <div class="page-2 page">
        <p class="part-2" v-animate="{value: 'bounceInRight'}">
          {{ curentTime | moment("add", "1 day", "BIỂU ĐỒ UV | DD-MM-YYYY") }}
        </p>
        <div v-if="loadedCurrentUV && loadedUVForcast">
          <p class="part-1 warn">
            Lưu ý trong khoảng thời gian
            <span> {{ [uvForcast[1].SafeBefore, "YYYY-MM-DDThh:mm:ss"] | moment("add", "7 hours", "HH giờ mm") }} phút </span>
            đến
            <span> {{ [uvForcast[1].SafeAfter, "YYYY-MM-DDThh:mm:ss"] | moment("add", "7 hours", "HH giờ mm") }} phút </span>
          </p>
          <div class="chart-wrapper">
            <la-cartesian
              :data="getUVForcast(1)"
              :bound="[0, 15]"
              autoresize
            >
              <defs>
                <linearGradient id="color-id" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stop-color="#7DB637"></stop>
                  <stop offset="0.2" stop-color="#F9B308"></stop>
                  <stop offset="0.6" stop-color="#EF8617"></stop>
                  <stop offset="0.8" stop-color="#E04127"></stop>
                  <stop offset="1" stop-color="#A75E99"></stop>
                </linearGradient>
              </defs>
              <!-- <la-area fill-color="url(#color-id)" dot curve prop="uv"></la-area> -->
              <la-line curve :width="15" label="uv" prop="uv" color="url(#color-id)"></la-line>
              <la-x-axis prop="name" color="white"></la-x-axis>
              <la-y-axis color="white"></la-y-axis>
              <la-tooltip>
                <div class="tooltip" slot-scope="props">
                  <div class="title">{{ props.label }}</div>
                  <ul class="list">
                    <li
                      :key="item.label"
                      v-for="item in props.actived"
                      :style="{ borderTop: '3px solid white' }">
                      <div class="value">UV: {{ item.value }}</div>
                    </li>
                  </ul>
                </div>
              </la-tooltip>
            </la-cartesian>
          </div>
        </div>
        <div v-else>
          <p class="part-1" v-animate="{value: 'bounceInLeft'}">Đang tải dữ liệu ...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from './api';

const apiService = new ApiService(0, 0);

export default {
  name: 'app',
  data() {
    const that = this;
    return {
      index: 0,
      loadedCurrentUV: false,
      loadedUVForcast: false,
      curentTime: new Date(),
      currentUV: 0,
      currentTemperature: 0,
      currentWeatherIcon: 0,
      uvForcast: [],
      opts: {
        start: 0,
        dir: 'v',
        duration: 500,
        beforeChange: (currentSlideEl, currenIndex, nextIndex) => {
          console.log('beforeChange', currentSlideEl, currenIndex, nextIndex);
          that.index = nextIndex;
        },
        afterChange: (currentSlideEl, currenIndex) => {
          that.index = currenIndex;
          console.log('afterChange', currentSlideEl, currenIndex);
        },
      },
    };
  },
  methods: {
    moveTo(index) {
      this.$refs.fullpage.$fullpage.moveTo(index, true);
    },
    getWeatherIcon(value) {
      return `https://uvlens.hieubq.name.vn/assets/weather_${value}.png`;
    },
    getUVDatas() {
      // get current uv
      apiService.getCurrentUV().then((data) => {
        console.log('currentUV', data);
        this.currentUV = data.CurrentUV;
        this.currentTemperature = data.CurrentTemperature;
        this.currentWeatherIcon = data.WeatherIcon;
        this.loadedCurrentUV = true;
      });
      apiService.getDailyUV().then((data) => {
        console.log('dailyUV', data);
        this.uvForcast = data.DailyForecasts;
        this.loadedUVForcast = true;
      });
    },
    getUVForcast(index) {
      if (this.uvForcast.length > 0 && (index <= 1 || index >= 0)) {
        const data = this.uvForcast[index].UVForecast.filter((value, i) => i < 13)
          .map((value, i) => ({
            name: `${i + 6} giờ`,
            uv: value,
          }));
        console.log('data', data);
        return data;
      }
      return [];
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    },
    geoSuccess(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      apiService.changeLocation(lat, lng);
      this.getUVDatas();
    },
    geoError(error) {
      console.log('get geo location error', error);
    },
  },
  beforeMount() {
    this.geolocation();
  },
};
</script>


<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.tooltip {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
}

.title {
  padding: 10px;
  color: #fff;
}

.list {
  list-style: none;
  display: flex;
  padding: 0;
}

.list li {
  flex: 1;
  color: #fff;
  padding: 5px;
  min-width: 100px;
}

.list li::before {
  content: none;
}

.label {
  color: #fff;
  font-weight: 600;
}

.value {
  color: #fff;
}
.fullpage-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  .page {
    display: block;
    text-align: center;
    font-size: 16px;
    color: #eee;
    img {
      width: 100px;
    }
  }
  .warn {
    span {
      color: #A95D95;
      font-weight: 600;
    }
  }
  .page-1 {
    padding-top: 100px;
    background: #40B883;
  }
  .page-2 {
    padding-top: 100px;
    background: #0798EC;
  }
  .page-3 {
    padding-top: 50px;
    background: #aabbcc;
  }
  .button-group {
        position: absolute;
        top: 30px;
        left: 30px;
        z-index: 9;
    }
  .button-group button {
      display: inline-block;
      margin: 10px;
      color: #000;
      background: #fff;
      background: rgba(255, 255, 255, .5);
      -webkit-border-radius: 10px;
      border-radius: 10px;
      padding: 9px 18px;
      border: none;
      outline: none;
  }
  .button-group button.active {
      background: rgba(0, 0, 0, .5);
      color: #fff;
  }
}
</style>
