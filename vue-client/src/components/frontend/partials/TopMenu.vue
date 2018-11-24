<template>
    <div class="top-menu-container">
        <div class="top-menu-logo">
            <a @click.prevent="changeContent('index')"></a>
        </div>
        <div class="top-menu">
            <ul class="top-menu-list">
                <li class="dropdown">
                    <a class="a-top-menu" @click.prevent="showDropdownUser = !showDropdownUser; showDropdownMessages = false; showDropdownNotifications = false"><span class="fa fa-user"></span></a>
                    <div v-show="showDropdownUser" class="up-arrow">
                        <div @mouseout="showDropdownUser = false" @mouseover="showDropdownUser = true" class="panel">
                            <ul class="panel-body">
                                <li class="header">
                                    <div class="profile-data-image"><img :src="user.photo"></div>
                                    <div class="profile-data-text">
                                        <div class="profile-data-name">{{user.fullName}}</div>
                                        <div class="profile-data-role">{{user.role}}</div>
                                    </div>
                                </li>
                                <li class="body" @click.prevent="showDropdownUser = false">
                                    <a class="normal">
                                        <span class="fa fa-vcard"></span>
                                        <span class="dropdown-text">Perfil</span>
                                    </a>
                                </li>
                                <li class="body" @click.prevent="logOut(); showDropdownUser = false">
                                    <a class="normal">
                                        <span class="fa fa-sign-out"></span>
                                        <span class="dropdown-text">Salir</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="dropdown">
                    <a class="a-top-menu" @click.prevent="showDropdownMessages = !showDropdownMessages; showDropdownUser = false; showDropdownNotifications = false"><span class="fa fa-envelope"></span></a>
                    <div v-show="showDropdownMessages" class="up-arrow">
                        <div @mouseout="showDropdownMessages = false" @mouseover="showDropdownMessages = true" class="panel">
                            <ul class="panel-body">
                                <li class="body" @click.prevent="showDropdownMessages = false">
                                    <a class="normal">
                                        <span class="fa fa-envelope"></span>
                                        <span class="dropdown-text">Mensajes</span>
                                    </a>
                                </li>
                                <li class="body" @click.prevent="showDropdownMessages = false">
                                    <a class="normal">
                                        <span class="fa fa-pencil"></span>
                                        <span class="dropdown-text">Escribir mensaje</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="dropdown">
                    <a class="a-top-menu" @click.prevent="showDropdownNotifications = !showDropdownNotifications; showDropdownMessages = false; showDropdownUser = false"><span class="fa fa-bell"></span></a>
                    <div v-show="showDropdownNotifications" class="up-arrow">
                        <div @mouseout="showDropdownNotifications = false" @mouseover="showDropdownNotifications = true" class="panel">
                            <ul class="panel-body">
                                <li @click.prevent="changeContent('brands'); showDropdownNotifications = false" v-show="notifications.length > 0" v-for="noti in notifications" :key="noti.id" class="body">
                                    <a class="normal">
                                        <span class="fa fa-info"></span>
                                        <span class="dropdown-text">{{noti.content}}</span>
                                    </a>
                                </li>
                                <li v-show="notifications.length === 0" class="no-notifications">
                                    <a class="no-notifications">
                                        <span class="fa fa-info"></span>
                                        <span class="dropdown-text">No hay notificaciones</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <span class="badge notifications-badge" @click.prevent="showDropdownNotifications = !showDropdownNotifications; showDropdownMessages = false; showDropdownUser = false">{{notifications.length}}</span>
                <span class="badge messages-badge" @click.prevent="showDropdownMessages = !showDropdownMessages; showDropdownUser = false; showDropdownNotifications = false">0</span>
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
            user: function () {
                return this.$store.getters.user
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
            logOut() {
                auth.signOut()
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
    margin-right: 16px;
}

a.a-top-menu {
    width: 50px;
    height: 50px;
    color: #FFFFFF;
    font-size: 16px;
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

.profile-data-image {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-data-image img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
}

.profile-data-text {
    grid-column: 4 / 5;
    grid-row: 2 / 3;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}

.profile-data-role {
    font-size: 9px;
    color: #999999;
}

li.body, li.no-notifications {
    height: 50px;
    display: grid;
    grid-template-columns: 15px 1fr 15px;
    grid-template-rows: 15px 1fr 15px;
    background-color: #2f323a;
    border-bottom: 1px solid #2a2d34;
    white-space: nowrap;
}

li.body:hover {
    background-color: #3a3e48;
}

li.body a:hover {
    cursor: pointer;
}

li.body a:hover, li.no-notifications a:hover {
    text-decoration: none;
}

li.body a.normal, a.no-notifications {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    display: grid;
    grid-template-columns: 20px 10px 1fr;
    grid-template-rows: 1fr;
    color: #FFFFFF;
    font-weight: bold;
}

li.body a.normal span.fa:before, a.no-notifications span.fa:before {
    font-size: 17px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

li.body a.normal span.dropdown-text, a.no-notifications span.dropdown-text {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    text-decoration: none;
}

a.no-notifications:hover {
    cursor: default;
}

.panel-body li:last-child {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom: 0px;
}

.notifications-badge {
    position: absolute;
    top: 12.5px;
    right: 120px;
    font-size: 9px;
    background-color: #64B5F6;
}

.badge:hover {
    cursor: pointer;
}
</style>