<template>
    <div class="login-container">
        <div class="login-logo"></div>
        <div class="login-form">
            <form>
                <div class="form-group">
                    <input class="form-control" v-bind:class="{'error' : errorLoginEmail }"
                    type="email" 
                    v-model="email">
                    <i class="fa fa-user"></i>
                </div>
                <div class="form-group">
                    <input class="form-control" v-bind:class="{'error' : errorLoginPassword }"
                    type="password" 
                    v-model="password" 
                    v-on:keyup.enter="signIn()">
                    <i class="fa fa-lock"></i>
                </div>
                <div class="login-form-buttons">
                    <div class="form-buttons-right">
                        <span class="fa fa-sign-in" aria-hidden="true" @click.prevent="signIn()"></span>
                    </div>
                </div>
            </form>
        </div>
        <component :is="getModal" @close="exitModal()"></component>
        <div v-show="loading" class="loader"></div>
    </div>
</template>

<script>
    import VerifiedEmailModal   from './modals/VerifiedEmailModal.vue'
    import ActiveSessionModal   from './modals/ActiveSessionModal.vue'
    import CheckedAccountModal  from './modals/CheckedAccountModal.vue'

    export default {
        components: {
            VerifiedEmailModal,
            ActiveSessionModal,
            CheckedAccountModal
        },
        data () {
            return {
                email       : '',
                password    : ''
            }
        },
        computed: {
            loading: function () {
                return this.$store.getters.loading
            },
            errorLoginEmail: function () {
                return this.$store.getters.errorLoginEmail
            },
            errorLoginPassword: function () {
                return this.$store.getters.errorLoginPassword
            },
            user: function () {
                return this.$store.getters.user
            },
            getModal: function () {
                return this.$store.getters.getModal
            }
        },
        watch: {
            user (value) {
                if (value) {
                   if (value.role === 'MASTER_ADMIN' || value.role === 'ADMIN' || value.role === 'UPDATER' || value.role === 'COMMERCIAL') {
                       this.$router.push('/backend')
                   } else if (value.role === 'CLIENT' || value.role === 'BUSINESS' || value.role === 'PROFESSIONAL') {
                       this.$router.push('/frontend')
                   }
                }
            }
        },
        methods: {
            signIn: function () {
                const login = {
                    email       : this.email,
                    password    : this.password
                }
                this.$store.dispatch('singIn', login)
            },
            exitModal: function () {
                this.$store.commit('setModal', '')
            }
        }
    }
</script>

<style scoped>
.login-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 125px 400px 125px 1fr;
    grid-template-rows: 1fr 100px 40px 400px 1fr;
    background: #FAFAFA url('/src/assets/img/background/bg.png') left top repeat;
}

.login-logo {
    grid-column: 2 / 5;
    grid-row: 2 / 3;
    background: url("/src/assets/img/logo/logo@2x.png") center center no-repeat;
    background-size: 650px 100px;
}

.login-form {
    grid-column: 3 / 4;
    grid-row: 4 / 5;
}

.form-group {
    position: relative;
}

input {
    border-radius: 10px;
    height: 60px;
    padding-left: 50px;
    top: 16px;
    font-size: 18px;
    transition: .3s;
    color: #757575;
}

span, i {
    font-size: 30px;
    color: #757575;
    transition: .3s;
}

i {
    left: 0;
    top: 0;
    position: absolute;
    padding: 15px 15px;
}

input:focus + i {
    color: #64B5F6;
}

input:focus {
    box-shadow: 0 1px 1px #64B5F601 inset, 0 0 8px #64B5F6;
    border-color: #64B5F6;
}

input.error{
    box-shadow: 0 1px 1px #64B5F601 inset, 0 0 8px #E57373;
    border-color: #E57373;
}

input.error + i {
    color: #E57373;
}

.login-form-buttons {
    display: grid;
    grid-template-columns: 15px 1fr 1fr 15px;
    grid-template-rows: 1fr;
}

.form-buttons-right {
    grid-column: 3 / 4;
    grid-row: 1 / 2;  
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}

span:hover {
    color:#424242;
    cursor: pointer;
}

.loader {
    height: 4px;
    grid-column: 1 / 6;
    position: relative;
    overflow: hidden;
    background-color: #E0E0E0;
}

.loader:before {
    display: block;
    position: absolute;
    content: "";
    left: -200px;
    width: 100px;
    height: 4px;
    background-color: #757575;
    animation: loading 2s linear infinite;
}

@keyframes loading {
    from {
        left: -200px;
        width: 30%;
    }
    50% {
        width: 30%;
    }
    70% {
        width: 70%;
    }
    80% {
        left: 50%;
    }
    95% {
        left: 120%;
    }
    to {
        left: 100%;
    }
}
</style>