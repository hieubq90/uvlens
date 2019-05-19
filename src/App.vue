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
        <p class="part-1" v-animate="{value: 'bounceInLeft'}">
          {{ curentTime | moment("Biểu đồ giá trị UV ngày DD-MM-YYYY") }}
        </p>
      </div>
      <div class="page-2 page">
        <p class="part-2" v-animate="{value: 'bounceInRight'}">
          {{ curentTime | moment("add", "1 day", "Biểu đồ giá trị UV ngày DD-MM-YYYY") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    const that = this;
    return {
      index: 0,
      curentTime: new Date(),
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
    font-size: 26px;
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
