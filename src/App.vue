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
        <div v-if="loadedCurrentUV && loadedUVForcat">
          <p class="part-1" v-animate="{value: 'bounceInLeft'}">
            <span>{{ curentTime | moment("hh giờ mm") }} phút </span>
            <img alt="Vue logo" :src="getWeatherIcon(currentWeatherIcon)">
            <span> - UV: {{ currentUV }} - </span>
            <span>{{ currentTemperature }}°C</span>
          </p>
        </div>
        <div v-else>
          <p class="part-1" v-animate="{value: 'bounceInLeft'}">Đang tải dữ liệu ...</p>
        </div>
      </div>
      <div class="page-2 page">
        <p class="part-2" v-animate="{value: 'bounceInRight'}">
          {{ curentTime | moment("add", "1 day", "BIỂU ĐỒ UV | DD-MM-YYYY") }}
        </p>
        <div v-if="loadedCurrentUV && loadedUVForcat">
          <p class="part-1" v-animate="{value: 'bounceInLeft'}">Đã tải xong dữ liệu</p>
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
      loadedUVForcat: false,
      curentTime: new Date(),
      currentUV: 0,
      currentTemperature: 0,
      currentWeatherIcon: 0,
      uvForcat: [],
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
      return `./assets/weather_${value}.png`;
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
        this.uvForcat = data.DailyForecasts;
        this.loadedUVForcat = true;
      });
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
