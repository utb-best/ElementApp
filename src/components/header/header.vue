<template>
  <div id="sell-header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="粥店">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="board-wrapper" @click="showDetail">
      <span class="board-title"></span><span class="board-text">
        {{seller.bulletin}}
      </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="datail" v-show="datailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(supportItem, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[supportItem.type]"></span>
                <span class="text">{{supportItem.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="boardin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <!-- css stickfooter -->
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import star from '@/components/star/star';
export default {
  name: 'sell-header',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      datailShow: false
    };
  },
  components: {
    star
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; // 活动图标className
  },
  methods: {
    showDetail() { // 显示商家详情
      this.datailShow = true;
    },
    hideDetail() { // 隐藏商家详情
      this.datailShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../common/less/mixin.less';
#sell-header{
  position: relative;
  overflow: hidden;
  background: rgba(7, 17, 27, 0.5);
  color: #fff;
  .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    // 消除间隙
    font-size: 0;
    .avatar{
      vertical-align: top;
      display: inline-block;
      img{
        border-radius: 2px;
      }
    }
    .content{
      display: inline-block;
      margin-left: 14px;
      font-size: 14px;
      .title{
        margin: 2px 0px 8px 0px;
        .brand{
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          .bg-image('brand');
          background-repeat: no-repeat;
          background-size: 30px 18px;
        }
        .name{
          margin-left: 6px;
          line-height: 18px;
          font-weight: bold;
          font-size: 16px;
        }
      }
      .description{
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support{
        font-size: 0;
        .icon{
          vertical-align: top;
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-repeat: no-repeat;
          background-size: 12px 12px;
          &.decrease{
            .bg-image('decrease_1');
          }
          &.discount{
            .bg-image('discount_1');
          }
          &.guarantee{
            .bg-image('guarantee_1');
          }
          &.invoice{
            .bg-image('invoice_1');
          }
          &.special{
            .bg-image('special_1');
          }
        }
        .text{
          display: inline-block;
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count{
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count{
        font-size: 10px;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right{
        margin-left: 2px;
        font-size: 10px;
        line-height: 24px;
      }
    }
  }
  .board-wrapper{
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0px 22px 0px 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);
    .board-title{
      vertical-align: top;
      margin-top: 8px;
      display: inline-block;
      width: 22px;
      height: 12px;
      background-repeat: no-repeat;
      background-size: 22px 12px;
      .bg-image('bulletin');
    }
    .board-text{
      vertical-align: top;
      margin: 0px 4px;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right{
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 10px;
    }
  }
  .background{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .datail{
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7,17,27,0.8);
    backdrop-filter:blur(10px);   /* iphone独有 */
    &.fade-enter-active,&.fade-leave-active{
      transition: all 500ms;
    }
    &.fade-enter,&.fade-leave-to{
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
    .detail-wrapper{
      min-height: 100%;
      width: 100%;
      overflow: hidden;
      .detail-main{
        margin-top: 64px;
        padding-bottom: 64px;
        .name{
          line-height: 16px;
          font-size: 16px;
          text-align: center;
          font-weight: 700;
        }
        .star-wrapper{
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title{
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line{
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text{
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .supports{
          width: 80%;
          margin: 0 auto;
          .support-item{
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            line-height: 16px;
            &:last-child{margin-bottom: 0};
            .icon{
              display: inline-block;
              width: 16px;
              height: 16px;
              margin: 6px;
              line-height: 16px;
              vertical-align: top;
              background-repeat: no-repeat;
              background-size: 16px 16px;
              &.decrease{
                .bg-image('decrease_2');
              }
              &.discount{
                .bg-image('discount_2');
              }
              &.guarantee{
                .bg-image('guarantee_2');
              }
              &.invoice{
                .bg-image('invoice_2');
              }
              &.special{
                .bg-image('special_2');
              }
            }
            .text{
              display: inline-block;
              height: 16px;
              line-height: 28px;
              font-size: 12px;
            }
          }
        }
        .boardin{
          width: 80%;
          margin: 0 auto;
          .content{
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }
    .detail-close{
      margin: -64px auto 0 auto;
      width: 32px;
      height: 32px;
      font-size: 32px;
    }
  }
}
</style>
