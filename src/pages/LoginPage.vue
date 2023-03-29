<template>
    <div class="login" @keyup.enter="submit">
        <div v-show="isloading" class="loading">
            <img src="img/loading.gif" />
        </div>
        <div class="account-container">
            <div class="left-text-container">
                <h2>chatting</h2>
                <p>网页聊天系统</p>
            </div>

            <div class="right-container">
                <div class="sign-list" id="sign-in" style="display: block">
                    <h1>{{ pageTitle }}</h1>
                    <div class="title-tab" id="sign-tab" v-show="isLogin">
                        <div class="active">密码登录</div>
                        <div>验证码登录</div>
                    </div>
                    <div class="input-list">
                        <!--                密码登录-->
                        <div
                            class="input-list-con first-init"
                            style="display: block"
                        >
                            <div class="list">
                                <input
                                    type="text"
                                    class="input-text the-signin-account"
                                    placeholder="账号"
                                    data-errortext="请输入格式正确的账号"
                                    data-type="account"
                                    oninput="javascript:void(0)"
                                    onpropertychange="javascript:void(0)"
                                    data-index="0"
                                    autocomplete="on"
                                    ref="accountInput"
                                />
                            </div>
                            <div class="list" v-show="!isLogin">
                                <input
                                    type="password"
                                    class="input-text the-signin-password"
                                    placeholder="密码"
                                    data-errortext="密码长度为6-20"
                                    data-type="password"
                                    oninput="javascript:void(0)"
                                    onpropertychange="javascript:void(0)"
                                    data-index="1"
                                    autocomplete="on"
                                    ref="passwordInput"
                                />
                            </div>
                            <div class="list">
                                <input
                                    type="password"
                                    class="input-text the-signin-password"
                                    placeholder="密码"
                                    data-errortext="密码长度为6-20"
                                    data-type="password"
                                    oninput="javascript:void(0)"
                                    onpropertychange="javascript:void(0)"
                                    data-index="1"
                                    autocomplete="on"
                                    ref="passwordInput"
                                />
                                <a
                                    href="#"
                                    class="right-text clickable"
                                    id="forget-password"
                                    v-show="isLogin"
                                    >忘记密码</a
                                >
                            </div>
                            <div class="submit">
                                <div class="error-text">{{ errorText }}</div>
                                <div
                                    class="button"
                                    id="normal-login"
                                    @click="submit"
                                    :class="classObj"
                                >
                                    {{ loginText }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- over ----------------->

                    <div class="other-text">
                        {{ otherText
                        }}<a class="red" @click.prevent="toggle"
                            >立即{{ pageTitleOpposite }}</a
                        >
                    </div>
                    <div class="other-sign-type">
                        <div class="left"><span>第三方登录</span></div>
                        <div class="right">
                            <a
                                href="#"
                                class="icon"
                                style="
                                    background-image: url('img/sign-weixin.png');
                                "
                                title="微信"
                            ></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { post } from "@/service/request";
export default {
    name: "LoginPage",
    data() {
        return {
            isloading: false,
            classObj: {
                disabled: false,
            },
            loginText: "登录",
            errorText: "",
            isLogin: true,
        };
    },
    computed: {
        pageTitle() {
            return this.isLogin ? "登录" : "注册";
        },
        pageTitleOpposite() {
            return !this.isLogin ? "登录" : "注册";
        },
        otherText() {
            return this.isLogin ? "没有账号？" : "已有账号？";
        },
    },
    methods: {
        showLoading() {
            setTimeout(() => {
                this.isloading = true;
            }, 200);
        },
        hideLoading() {
            setTimeout(() => {
                this.isloading = false;
            }, 500);
        },
        submit() {
            if (this.classObj.disabled) {
                return;
            }
            this.showLoading();
            this.classObj.disabled = true;

            if (this.isLogin) {
                this.login();
            } else {
                this.register();
            }
        },
        restore(text) {
            this.loginText = text;
            this.hideLoading();
            this.classObj.disabled = false;
        },
        login() {
            this.loginText = "登录中...";

            // 发送后端请求
            post("/user/login", {
                username: this.$refs.accountInput.value.trim(),
                password: this.$refs.passwordInput.value.trim(),
            }).then((response) => {
                this.restore("登录");
                if (response.data.status == 200) {
                    window.sessionStorage.setItem(
                        "user",
                        JSON.stringify(response.data.data)
                    );
                    this.$router.replace("chatting");
                } else {
                    this.errorText = response.data.msg;
                }
            });
        },
        register() {
            this.loginText = "注册中...";

            post("/user/register", {
                username: this.$refs.accountInput.value.trim(),
                password: this.$refs.passwordInput.value.trim(),
            }).then((response) => {
                this.restore("注册");
                if (response.data.status == 200) {
                    this.$notify({
                        title: "成功",
                        message: "注册成功",
                        type: "success",
                    });
                    this.errorText = "";
                    this.toggle();
                } else {
                    this.errorText = response.data.msg;
                }
            });
        },
        toggle() {
            this.isLogin = !this.isLogin;
            this.loginText = this.pageTitle;
        },
    },
    mounted() {
        this.$refs.accountInput.focus();
    },
};
</script>

<style scoped>
input {
    color: #353030;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    outline: 0 !important;
    border: 0;
}
input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #ccc;
}
input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
}
input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #ccc;
}
input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #ccc;
}
input::-ms-clear,
input::-ms-reveal {
    display: none;
}

.login {
    background: url("../../public/img/login_bg.jpg") no-repeat center;
    background-size: cover;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    text-align: center;
    z-index: 3;
}
.loading img {
    display: inline-block;
    width: 80px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.account-container {
    position: relative;
    padding: 50px 0;
    min-height: 730px;
    height: 100vh;
}
.account-container::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(53, 48, 48, 0.7);
}
.account-container,
.account-container * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.account-container .left-text-container {
    position: absolute;
    left: 20.6%;
    top: 42%;
    z-index: 2;
}
.account-container .left-text-container h2 {
    font-size: 32px;
    color: #fff;
    font-weight: bold;
    line-height: 40px;
    margin: 0;
}
.account-container .left-text-container p {
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    margin: 14px 0 0;
}
.account-container .right-container {
    z-index: 2;
    right: 16.667%;
    position: absolute;
    background: #fff;
    border-radius: 32px;
    -webkit-box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.08);
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    padding: 64px;
    width: 92%;
    max-width: 488px;
    margin: 0 auto;
}
.account-container .right-container .sign-list {
    display: none;
}
.account-container .right-container .sign-list h1 {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 32px;
}
.account-container .right-container .sign-list .title-tab {
    overflow: hidden;
    padding-bottom: 16px;
}
.account-container .right-container .sign-list .title-tab div {
    float: left;
    line-height: 32px;
    font-size: 20px;
    color: #8c8889;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    position: relative;
    padding-top: 16px;
    margin-left: 32px;
    -webkit-user-select: none;
    /* Safari */
    -ms-user-select: none;
    /* IE 10+ and Edge */
    -moz-user-select: none;
    user-select: none;
    /* Standard syntax */
}
.account-container .right-container .sign-list .title-tab div:first-child {
    margin-left: 0;
}
.account-container .right-container .sign-list .title-tab div::before {
    content: "";
    width: 0;
    height: 2px;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 0;
    background: #fe4066;
    border-radius: 3px;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
}
.account-container .right-container .sign-list .title-tab div:not(.active) {
    cursor: pointer;
}
.account-container
    .right-container
    .sign-list
    .title-tab
    div:not(.active):hover {
    color: #fe4066;
}
.account-container .right-container .sign-list .title-tab div.active {
    color: #353030;
    font-weight: bold;
}
.account-container .right-container .sign-list .title-tab div.active::before {
    width: 100%;
}

.account-container .right-container .sign-list .input-list .input-list-con {
    display: none;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .input-list-con.active {
    display: block;
}
.account-container .right-container .sign-list .input-list .list {
    position: relative;
    margin-top: 14px;
    border-radius: 8px;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    border: 1px solid #e9e9e9;
}
.account-container .right-container .sign-list .input-list .list .input-text {
    background: #fff;
    color: #353030;
    height: 48px;
    padding: 0 16px;
    display: block;
    width: 100%;
    border-radius: 8px;
    border: 1px solid transparent;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    font-size: 16px;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list
    .input-text::-webkit-input-placeholder {
    color: #8c8889;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list
    .input-text::-moz-placeholder {
    color: #8c8889;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list
    .input-text:-ms-input-placeholder {
    color: #8c8889;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list
    .input-text::-ms-input-placeholder {
    color: #8c8889;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list
    .input-text::placeholder {
    color: #8c8889;
}
.account-container .right-container .sign-list .input-list .list .right-text {
    position: absolute;
    padding: 0 15px;
    font-size: 14px;
    color: #353030;
    line-height: 48px;
    right: 0;
    top: 0;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list
    .right-text.clickable {
    cursor: pointer;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list
    .right-text.clickable:hover {
    color: #fe4066;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list
    .right-text.unClickable {
    cursor: not-allowed;
    color: #353030;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list
    .right-text.unClickable:hover {
    color: #353030;
}

.account-container .right-container .sign-list .input-list .list.focus {
    border-color: #353030;
    background: #353030;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list.focus
    .input-text {
    border-color: #353030;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .list:not(.error, .focus):hover {
    border-color: #8c8889;
}

.account-container .right-container .sign-list .input-list .submit {
    position: relative;
}
.account-container .right-container .sign-list .input-list .submit .error-text {
    color: #fe4066;
    position: absolute;
    left: 0;
    top: -38px;
    line-height: 28px;
    font-size: 12px;
}
.account-container .right-container .sign-list .input-list .submit .button {
    margin-top: 48px;
    border-radius: 6px;
    color: #fff;
    background: #fe4066;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    line-height: 48px;
    text-align: center;
    display: block;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .submit
    .button.disabled {
    opacity: 0.3;
    filter: alpha(opacity=30);
}
.account-container
    .right-container
    .sign-list
    .input-list
    .submit
    .button:not(.disabled) {
    cursor: pointer;
}
.account-container
    .right-container
    .sign-list
    .input-list
    .submit
    .button:not(.disabled):hover {
    opacity: 0.8;
    filter: alpha(opacity=80);
}
.account-container .right-container .sign-list .other-text {
    color: #8c8889;
    font-size: 14px;
    line-height: 22px;
    margin: 16px 0 -16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.account-container .right-container .sign-list .other-text .red {
    color: #fe4066;
    display: inline-block;
    position: relative;
}
.account-container .right-container .sign-list .other-text .red::before {
    width: 0;
    height: 1px;
    content: "";
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    position: absolute;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background: #fe4066;
}
.account-container .right-container .sign-list .other-text .red:hover::before {
    width: 100%;
}

.account-container .right-container .sign-list .other-sign-type {
    zoom: 1;
    margin-top: 48px;
    border-top: 1px solid #f0f0f0;
    padding-top: 24px;
}
.account-container .right-container .sign-list .other-sign-type::after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.account-container .right-container .sign-list .other-sign-type .left {
    float: left;
    color: #8c8889;
    font-size: 14px;
    line-height: 22px;
    padding-top: 9px;
    overflow: hidden;
    display: block;
}
.account-container .right-container .sign-list .other-sign-type .left span {
    float: left;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
}

.account-container
    .right-container
    .sign-list
    .other-sign-type
    .left.clickable {
    cursor: pointer;
}
.account-container
    .right-container
    .sign-list
    .other-sign-type
    .left.clickable:hover {
    color: #fe4066;
}
.account-container .right-container .sign-list .other-sign-type .right {
    float: right;
    font-size: 0;
}
.account-container .right-container .sign-list .other-sign-type .right .icon {
    display: inline-block;
    border: 1px solid #f0f0f0;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-left: 8px;
    background-size: 40px 40px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
}

@media (max-width: 1599px) {
    .account-container .left-text-container {
        left: 12%;
    }
    .account-container .right-container {
        right: 8%;
    }
}
@media (max-width: 1399px) {
    .account-container .right-container {
        right: 5%;
    }
}
@media (max-width: 1299px) {
    .account-container .left-text-container {
        display: none;
    }
    .account-container .right-container {
        right: 50%;
        margin-right: -244px;
    }
}
@media (max-width: 599px) {
    .account-container {
        height: auto;
        min-height: 100vh;
        padding-bottom: 20px;
    }
    .account-container .right-container {
        right: auto;
        top: auto;
        position: relative;
        -webkit-transform: translateY(0);
        transform: translateY(0);
        margin: 68px auto 0;
        padding: 50px 32px 40px;
        border-radius: 16px;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .account-container .right-container .sign-list h1 {
        font-size: 30px;
        line-height: 38px;
    }
}
@media (max-width: 399px) {
    .account-container .right-container .sign-list .other-text {
        font-size: 12px;
    }
}
</style>
