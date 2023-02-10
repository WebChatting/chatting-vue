<template>
    <div>
        <link rel="stylesheet" href="css/account.css?v=65">
        <div v-show="isloading" class="loading" id="loading">
            <img src="img/loading.gif">
        </div>
        <div class="account-container">
            <div class="left-text-container">
                <h2>chatting</h2>
                <p>网页聊天系统</p>
            </div>

            <div class="right-container">
                <div class="sign-list" id="sign-in" style="display: block">
                    <h1>登录</h1>
                    <div class="title-tab" id="sign-tab">
                    <div class="active">密码登录</div>
                    <div>验证码登录</div>
                    </div>
                    <div class="input-list">
                    <!--                密码登录-->
                    <div class="input-list-con first-init" style="display: block">
                        <div class="list">
                        <input type="text" class="input-text the-signin-account" placeholder="账号" data-errortext="请输入格式正确的账号"
                            data-type="account" oninput="javascript:void(0)" onpropertychange="javascript:void(0)" data-index="0"
                            autocomplete="on"
                            ref="accountInput">
                        </div>
                        <div class="list">
                        <input type="password" class="input-text the-signin-password" placeholder="密码" data-errortext="密码长度为6-20"
                            data-type="password" oninput="javascript:void(0)" onpropertychange="javascript:void(0)" data-index="1"
                            id="signin-password" autocomplete="on"
                            ref="passwordInput">
                        <a href="#" class="right-text clickable" id="forget-password">忘记密码</a>
                        </div>
                        <div class="submit">
                        <div class="error-text">{{errorText}}</div>
                        <div class="button" id="normal-login"
                          @click="login" :class="classObj">{{loginText}}</div>
                        </div>
                    </div>
                    <!----------------- over ----------------->

                    </div>
                    <div class="other-text">没有账号？<a href="#" class="red">立即注册</a></div>
                    <div class="other-sign-type">
                        <div class="left"><span>第三方登录</span></div>
                        <div class="right">
                            <a href="#" class="icon" style="background-image: url('img/sign-weixin.png')" title="微信"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Login',
        data() {
            return {
                isloading: false,
                classObj:{
                  disabled:false
                },
                loginText: '登录',
                errorText: ''
            }
        },
        methods: {
            showLoading() {
                setTimeout(() => {
                    this.isloading = true
                }, 200);
            },
            hideLoading() {
                setTimeout(() => {
                    this.isloading = false;
                }, 500);
            },
            login() {
              if (this.classObj.disabled) {
                return
              }
              this.showLoading()
              this.classObj.disabled = true
              this.loginText = "登录中..."

              // 发送后端请求
              axios({
                method: 'post',
                url: '/chatting/login',
                params: {
                  username: this.$refs.accountInput.value.trim(),
                  password: this.$refs.passwordInput.value.trim()
                },
                responseType: 'json',
              }).then((response) => {
                this.loginText = "登录"
                this.hideLoading()
                this.classObj.disabled = false
                if (response.data.status == 200) {
                  window.location.href = "chatting";
                } else {
                  this.errorText = response.data.msg;
                }
              })

            }
        },
        mounted() {
          this.$refs.accountInput.focus()
        }
    }
</script>

<style scoped>

</style>