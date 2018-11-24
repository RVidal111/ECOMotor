<template>
    <div class="top-menu-container">
        <div class="top-menu-logo">
            <a @click.prevent="changeContent('index')"></a>
        </div>
        <div class="top-menu">
            <ul class="top-menu-list">
                <li class="dropdown">
                    <a class="a-top-menu" @click.prevent="logOut(user.id)"><span class="fa fa-power-off"></span></a>
                </li>
                <li class="dropdown">
                    <a class="a-top-menu" @click.prevent="changeContent('index')"><span class="fa fa-vcard"></span></a>
                </li>
                <li class="dropdown">
                    <a class="a-top-menu" @click.prevent="showDropdownMessages = !showDropdownMessages; showDropdownUser = false; showDropdownNotifications = false"><span class="fa fa-envelope"></span></a>
                    <div v-show="showDropdownMessages" class="up-arrow">
                        <div @mouseout="showDropdownMessages = false" @mouseover="showDropdownMessages = true" class="panel">
                            <ul class="panel-body">
                                <li class="body" @click.prevent="showDropdownMessages = false">
                                    <a class="normal">
                                        <span class="fa fa-envelope"></span>
                                        <span class="dropdown-text">{{$t('messages')}}</span>
                                    </a>
                                </li>
                                <li class="body" @click.prevent="showDropdownMessages = false">
                                    <a class="normal">
                                        <span class="fa fa-pencil"></span>
                                        <span class="dropdown-text">{{$t('sendMessage')}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li v-show="user.role === 'ADMIN' || user.role === 'MASTER_ADMIN'" class="dropdown">
                    <a class="a-top-menu" @click.prevent="showDropdownNotifications = !showDropdownNotifications; showDropdownMessages = false; showDropdownUser = false"><span class="fa fa-bell"></span></a>
                    <div v-show="showDropdownNotifications" class="up-arrow">
                        <div @mouseout="showDropdownNotifications = false" @mouseover="showDropdownNotifications = true" class="panel">
                            <ul class="panel-body">
                                <li @click.prevent="changeContent(noti.site); showDropdownNotifications = false" v-show="notifications.length > 0 && noti.type === 'create'" v-for="noti in notifications" :key="noti.id" class="body-create">
                                    <a class="normal">
                                        <span class="fa fa-plus"></span>
                                        <span class="dropdown-text">{{$t(noti.site + 'Add')}}&nbsp;{{noti.name}}.&nbsp;{{$t('user')}}:&nbsp;{{noti.user}}</span>
                                    </a>
                                </li>
                                <li @click.prevent="changeContent(noti.site); showDropdownNotifications = false" v-show="notifications.length > 0 && noti.type === 'edit'" v-for="noti in notifications" :key="noti.id" class="body-edit">
                                    <a class="normal">
                                        <span class="fa fa-pencil"></span>
                                        <span class="dropdown-text">{{$t(noti.site + 'Edit')}}&nbsp;{{noti.name}}.&nbsp;{{$t('user')}}:&nbsp;{{noti.user}}</span>
                                    </a>
                                </li>
                                <li @click.prevent="changeContent(noti.site); showDropdownNotifications = false" v-show="notifications.length > 0 && noti.type === 'delete'" v-for="noti in notifications" :key="noti.id" class="body-delete">
                                    <a class="normal">
                                        <span class="fa fa-times"></span>
                                        <span class="dropdown-text">{{$t(noti.site + 'Delete')}}&nbsp;{{noti.name}}.&nbsp;{{$t('user')}}:&nbsp;{{noti.user}}</span>
                                    </a>
                                </li>
                                <li v-show="notifications.length === 0" class="no-notifications">
                                    <a class="no-notifications">
                                        <span class="fa fa-info"></span>
                                        <span class="dropdown-text">{{$t('withoutNotifications')}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <span v-show="user.role === 'ADMIN' || user.role === 'MASTER_ADMIN'" class="badge notifications-badge" @click.prevent="showDropdownNotifications = !showDropdownNotifications; showDropdownMessages = false; showDropdownUser = false">{{notifications.length}}</span>
                <span class="badge messages-badge" @click.prevent="showDropdownMessages = !showDropdownMessages; showDropdownUser = false; showDropdownNotifications = false">{{messages.length}}</span>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                showDropdownUser:           false,
                showDropdownMessages:       false,
                showDropdownNotifications:  false,
            }
        },
        computed: {
            notifications: function () {
                return this.$store.getters.getNotifications
            },
            messages: function () {
                return this.$store.getters.getMessages
            },
            user: function () {
                return this.$store.getters.user
            },
            userConfig: function () {
                return this.$store.getters.userConfig
            }
        },
        watch: {
            notifications (value) {
                if (value) {
                    this.$store.dispatch('loadNotifications')
                }
            }
        },
        methods: {
            changeContent(newCurrentView) {
                this.$emit('change-content', newCurrentView);
            },
            logOut(id) {
                auth.signOut()
                // setTimeout(function () {
                //     firestore.collection('activeSessions').doc(id).update({ active : false })
                // }, 200)
                this.$store.commit('setLoading', false)
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
.top-menu-container {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    display: grid;
    grid-template-columns: 220px 1fr;
    grid-template-rows: 1fr;
}

.top-menu-logo {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: flex;
}

.top-menu-logo a {
    flex: 1;
    color: #999999;
    background: url("/src/assets/img/logo/logo-white.png") center center no-repeat #22242a;
    cursor: pointer;
}

.top-menu-logo a:hover {
    background-color: #1d1f24;
}

.top-menu {
    background-color: #22242a;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-items: center;
}

.top-menu-list {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
}

li.dropdown:first-child {
    margin-right: 10px;
}

a.a-top-menu {
    width: 50px;
    height: 50px;
    color: #FFFFFF;
    font-size: 20px;
    display: flex;
    justify-content: center;
    text-decoration: none;
    align-items: center;
    cursor: pointer;
}

a.a-top-menu:hover {
    color: #999999;
    text-decoration: none;
    cursor: pointer;
}

.up-arrow {
    position: absolute;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #282b32;
}

.panel {
    position: absolute;
    z-index: 5;
    right: -20px;
    margin-top: 5px;
    border-radius: 6px;
    background-color: #282b32;
    color: #FFFFFF;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
}

.panel-body {
    background-color: #2f323a;
    list-style: none;
    padding: 0px;
    margin-bottom: 0px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
}

li.header {
    height: 70px;
    display: grid;
    grid-template-columns: 7.5px 50px 7.5px 1fr 7.5px;
    grid-template-rows: 10px 50px 10px;
    font-weight: bold;
    font-size: 12px;
    color: #FFFFFF;
    background-color: #282b32;
    border-bottom: 1px solid #2a2d34;
    cursor: default;
    white-space: nowrap;
}

.dropdown .a-top-menu img {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background-color: #ffffff;
}

li.body, li.body-create, li.body-edit, li.body-delete, li.no-notifications {
    height: 50px;
    display: grid;
    grid-template-columns: 15px 1fr 15px;
    grid-template-rows: 15px 1fr 15px;
    border-bottom: 1px solid #2a2d34;
    white-space: nowrap;
}

li.body-create {
    background-color: #4CAF50;
}

li.body-edit {
    background-color: #FFC107;
}

li.body-delete {
    background-color: #F44336;
}

li.body, li.no-notifications {
    background-color: #2f323a;
}

li.body:hover {
    background-color: #3a3e48;
}

li.body a:hover, li.body-create a:hover, li.body-edit a:hover, li.body-delete a:hover {
    cursor: pointer;
}

li.body a:hover, li.body-create a:hover, li.body-edit a:hover, li.body-delete a:hover, li.no-notifications a:hover {
    text-decoration: none;
}

li.body a.normal, li.body-create a.normal, li.body-edit a.normal, li.body-delete a.normal, a.no-notifications {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    display: grid;
    grid-template-columns: 20px 10px 1fr;
    grid-template-rows: 1fr;
    color: #FFFFFF;
    font-weight: bold;
}

li.body a.normal span.fa:before, li.body-create a.normal span.fa:before, li.body-edit a.normal span.fa:before, li.body-delete a.normal span.fa:before, a.no-notifications span.fa:before {
    font-size: 17px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

li.body a.normal span.dropdown-text, li.body-create a.normal span.dropdown-text, li.body-edit a.normal span.dropdown-text, li.body-delete a.normal span.dropdown-text, a.no-notifications span.dropdown-text {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    text-decoration: none;
}

a.no-notifications:hover {
    cursor: default;
}

.panel-body {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom: 0px;
}

.notifications-badge {
    right: 167.5px;
}

.messages-badge {
    right: 117.5px;
}

.badge {
    position: absolute;
    top: 12.5px;
    font-size: 9px;
    background-color: #64B5F6;
}

.badge:hover {
    cursor: pointer;
}

</style>