<template>
  <div class="member-page">
    <nav-bar title="个人中心" :backurl="'/'" />
    <div class="member-content">
      <section class="memberinfo">
        <div class="info">
          <div class="username">
            {{userinfo.memberAccount}}
            <strong v-if="userinfo.memberLevel">VIP{{userinfo.memberLevel}}</strong>
          </div>
          <div class="wallet">
            <span class="balance"><i class="symbol">￥</i>{{userinfo.balance | moneyFormat}}</span>
            <div class="description">中心钱包</div>
          </div>
        </div>
        <div class="head">
          <img src="../assets/images/touxiang.png" />
        </div>
      </section>
      <ul class="main-operation">
        <li>
          <img class="cunkuan-icon" src="../assets/images/cunkuan.png" />
          <div>存款</div>
        </li>
        <li>
          <img class="qukuan-icon" src="../assets/images/qukuan.png" />
          <div>取款</div>
        </li>
        <li>
          <img class="xima-icon" src="../assets/images/xima.png" />
          <div>洗码</div>
        </li>
      </ul>
      <ul class="secondary-operation">
        <li>
          申请优惠
          <span class="arrow">
            <icon-arrow
              width=".07rem"
              height=".12rem"
              direction="right"
            />
          </span>
        </li>
        <li>
          银行卡管理
          <span class="arrow">
            <icon-arrow
              width=".07rem"
              height=".12rem"
              direction="right"
            />
          </span>
        </li>
        <li>
          修改资料
          <span class="arrow">
            <icon-arrow
              width=".07rem"
              height=".12rem"
              direction="right"
            />
          </span>
        </li>
        <li>
          报表查询
          <span class="arrow">
            <icon-arrow
              width=".07rem"
              height=".12rem"
              direction="right"
            />
          </span>
        </li>
      </ul>
    </div>
    <div class="quit">
      <v-touch tag="button" @tap="doLogout">退出账号</v-touch>
    </div>
  </div>
</template>
<script>
import { getBalance } from '@/api/member'
import IconArrow from '@/components/common/icons/IconArrow'
import NavBar from '@/components/common/NavBar'

export default {
  data () {
    return {
      userinfo: {}
    }
  },
  async created () {
    const userinfo = JSON.parse(localStorage.getItem('nb-casino-userinfo') || '{}')
    if (userinfo && userinfo.token) {
      try {
        const { balance } = await getBalance({ token: userinfo.token })
        userinfo.balance = balance || 0
      } catch (e) {
        if (e.code === 406) {
          this.$toast.bottom('您的登录信息已过期,请重新登录')
          localStorage.clear()
          this.$router.replace('/login')
          return
        }
        console.log(e)
      }
    }

    this.userinfo = userinfo
  },
  components: {
    IconArrow,
    NavBar
  },
  methods: {
    doLogout () {
      // localStorage.removeItem('nb-casino-userinfo')
      localStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>
<style lang="less">
.member-content {
  padding-left: .3rem;
  color: #C2CACB;
  .memberinfo {
    display: flex;
    padding: .22rem 0 .15rem 0;
    border-bottom: 1px solid #333339;
  }
  .info {
    flex-grow: 1;
    padding-top: .08rem;
  }
  .username {
    text-align: center;
    color: #53FFFD;
    font-size: .15rem;
    line-height: .2rem;
    strong {
      background-image: linear-gradient(118deg, #FE597D 0%, #FFB775 86%);
      box-shadow: 0 2px 4px 2px rgba(255,74,74,0.38);
      font-size: .12rem;
      color: #FFFFFF;
      letter-spacing: -0.25px;
      text-align: right;
      display: inline-block;
      padding: 0 .1rem 0 .08rem;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      border-top-right-radius: .1rem;
      border-bottom-right-radius: .1rem;
    }
  }
  .head {
    width: 1.2rem;
    padding: 0 .15rem;
    img {
      width: .9rem;
      height: .9rem;
    }
  }
  .wallet {
    margin-top: .16rem;
    text-align: center;
  }
  .balance {
    position: relative;
    font-size: .19rem;
    color: #53FFFD;
    letter-spacing: 2.34px;
    .symbol {
      position: absolute;
      font-style: normal;
      font-size: .12rem;
      color: rgba(194, 202, 203, .7);
      left: -.17rem;
      bottom: .02rem;
    }
    .description {
      font-size: .12rem;
      color: rgba(194, 202, 203, .7);
      margin-top: .04rem;
    }
  }
  .main-operation {
    display: flex;
    justify-content: space-between;
    padding: .15rem .15rem .15rem 0;
    color: rgba(194, 202, 203, .7);
    border-bottom: 1px solid #333339;
    li {
      position: relative;
      height: .9rem;
      width: .9rem;
      border-radius: 8px;
      overflow: hidden;
      text-align: center;
      padding-top: .12rem;
      &::before {
        content: "";
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background-image: linear-gradient(180deg, #3A393F 2%, #333238 97%);
        z-index: 1;
      }
      img {
        position: relative;
        z-index: 2;
      }
      div {
        position: absolute;
        z-index: 2;
        width: 100%;
        bottom: .08rem;
      }
    }
  }
  .cunkuan-icon {
    width: .65rem;
    height: .47rem;
    transform: translate(.05rem, .05rem);
  }
  .qukuan-icon {
    width: .56rem;
    height: .50rem;
    transform: translate(.03rem, 0);
  }
  .xima-icon {
    width: .47rem;
    height: .47rem;
    transform: translate(.02rem, .02rem);
  }
  .secondary-operation {
    line-height: .5rem;
    font-size: .14rem;
    li {
      position: relative;
      padding-left: .15rem;
      border-bottom: 1px solid #333339;
      span {
        position: absolute;
        right: 0;
        height: .5rem;
        padding: 0 .15rem;
      }
    }
  }
}
.quit {
  margin-top: .5rem;
  padding: 0 .15rem;
  button {
    display: block;
    background: #323136;
    border-radius: 10rem;
    width: 100%;
    font-size: 14px;
    color: #C2CACB;
    letter-spacing: -0.34px;
    line-height: .4rem;
  }
}
</style>
