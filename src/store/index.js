import Vuex from 'vuex';
import Vue from 'vue';
import {urlParse} from '@/common/js/utils';
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    sellerId: 0, // 本店id
    seller: {}, // seller数据
    goods: [], // 本店商品数据
    ratings: [], // 对本店的评论数据
    cartGoods: [], // 购物车数据
    balls: [ // 购物车小球
      {show: false},
      {show: false},
      {show: false},
      {show: false},
      {show: false}
    ],
    dropBalls: [] // 正在移动的购物车小球
  },
  mutations: {
    initSellerId(state, search) { // 初始化店铺id
      state.sellerId = urlParse(search).id;
    },
    initSeller(state, data) { // 提交修改seller
      state.seller = data;
    },
    initGoods(state, data) { // 提交修改goods
      state.goods = data;
    },
    initRatings(state, data) { // 提交修改商家评论数据
      state.ratings = data;
    },
    addCartGoods(state, data) { // 添加到购物车
      let cartGoods = state.cartGoods;
      let exist = false;
      cartGoods.forEach((item) => { // 存在数量+1
        if (item.name === data.name) {
          Vue.set(item, 'count', item.count + 1);
          exist = true;
          return;
        };
      });
      if (!exist) { // 不存在添加一条
        Vue.set(data, 'count', 1);
        cartGoods.push(data);
      }
    },
    decreaseCartGoods(state, data) { // 减少购物车商品
      let cartGoods = state.cartGoods;
      cartGoods.forEach((item, index) => {
        if (item.name === data.name) {
          item.count--;
          if (item.count === 0) {
            Vue.delete(cartGoods, index);
          };
          return;
        };
      });
    },
    drop(state, el) { // 触发小球飞入
      let balls = state.balls;
      let dropBalls = state.dropBalls;
      for (var i = 0; i < balls.length; i++) {
        if (!balls[i].show) {
          balls[i].el = el;
          balls[i].show = true;
          dropBalls.push(balls[i]);
          return;
        }
      }
    },
    afterDrop(state, el) { // 释放小球
      let ball = state.dropBalls.shift();
      if (ball.show) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    removeAllCart(state) { // 清空购物车
      state.cartGoods.forEach((item) => {
        item.count = 0;
      });
      state.cartGoods = [];
    }
  },
  actions: {
    getSellerData({commit, state}) { // 获取seller数据
      let http = this._vm.$http;
      http.get('https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/api/seller', {params: {id: state.sellerId}})
        .then((response) => {
          commit('initSeller', response.data.seller);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGoodsData({commit}) { // 获取本店商品数据
      let http = this._vm.$http;
      return http.get('https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/api/goods', {params: {id: 'zhoufang1411'}})
        .then((response) => {
          commit('initGoods', response.data.goods);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRatings({commit}) { // 获取本店评论数据
      let http = this._vm.$http;
      return http.get('https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/api/ratings', {params: {id: 'zhoufang1411'}})
        .then((response) => {
          commit('initRatings', response.data.ratings);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  getters: {
    totalCount(state) { // 购物车商品总数
      let count = 0;
      state.cartGoods.forEach((good) => {
        count += good.count;
      });
      return count;
    },
    totalPrice(state) { // 购物车总价
      let price = 0;
      state.cartGoods.forEach((good) => {
        price += good.price * good.count;
      });
      return price;
    }
  }
});
export default store;
