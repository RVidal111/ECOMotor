<template>
    <div class="side-menu-container">
        <div class="profile-data">
            <div class="profile-data-image"><img :src="user.photo"></div>
            <div class="profile-data-name">{{user.fullName}}</div>
            <div class="profile-data-role">{{$t('roles.' + user.role)}}</div>
        </div>
        <div class="vbar-side-menu" v-bar>
            <ul class="side-menu">
                <li @click.prevent="changeContent('index')">
                    <a class="normal"><span class="fa fa-home"></span><span class="side-menu-text">{{$t('mainMenu')}}</span></a>
                </li>
                <li @click.prevent="changeContent('users')">
                    <a class="normal"><span class="fa fa-users"></span><span class="side-menu-text">{{$t('users')}}</span></a>
                </li>
                <li>
                    <a @click.prevent="stateDropdown('commercials'); stateCommercials = !stateCommercials" class="menu-dropdown"><span class="fa fa-archive"></span><span class="side-menu-text">{{$t('commercials')}}</span><i id="commercials" class="fa fa-angle-down"></i></a>
                    <ul v-show="stateCommercials">
                        <li @click.prevent="changeContent('work-demands')"><a>{{$t('workDemands')}}</a></li>
                        <li @click.prevent="changeContent('work-offers')"><a>{{$t('workOffers')}}</a></li>
                        <li @click.prevent="changeContent('eco-parts')"><a>{{$t('ecoParts')}}</a></li>
                        <li @click.prevent="changeContent('used-vehicles')"><a>{{$t('usedVehicles')}}</a></li>
                        <li @click.prevent="changeContent('new-vehicles')"><a>{{$t('newVehicles')}}</a></li>
                    </ul>
                </li>
                <li>
                    <a @click.prevent="stateDropdown('social'); stateSocial = !stateSocial" class="menu-dropdown"><span class="fa fa-user"></span><span class="side-menu-text">{{$t('social')}}</span><i id="social"  class="fa fa-angle-down"></i></a>
                    <ul v-show="stateSocial">
                        <li @click.prevent="changeContent('clients')"><a>{{$t('clients')}}</a></li>
                        <li @click.prevent="changeContent('clubs')"><a>{{$t('clubs')}}</a></li>
                        <li @click.prevent="changeContent('business')"><a>{{$t('business')}}</a></li>
                        <li @click.prevent="changeContent('professionals')"><a>{{$t('professionals')}}</a></li>
                    </ul>
                </li>
                <li>
                    <a @click.prevent="stateDropdown('location'); stateLocation = !stateLocation" class="menu-dropdown"><span class="fa fa-globe"></span><span class="side-menu-text">{{$t('location')}}</span><i id="location" class="fa fa-angle-down"></i></a>
                    <ul v-show="stateLocation">
                        <li @click.prevent="changeContent('postal-codes')"><a>{{$t('postalCodes')}}</a></li>
                        <li @click.prevent="changeContent('countries')"><a>{{$t('countries')}}</a></li>
                        <li @click.prevent="changeContent('towns')"><a>{{$t('towns')}}</a></li>
                        <li @click.prevent="changeContent('regions')"><a>{{$t('regions')}}</a></li>
                    </ul>
                </li>
                <li>
                    <a @click.prevent="stateDropdown('catalog'); stateCatalog = !stateCatalog" class="menu-dropdown"><span class="fa fa-barcode"></span><span class="side-menu-text">{{$t('catalog')}}</span><i id="catalog" class="fa fa-angle-down"></i></a>
                    <ul v-show="stateCatalog">
                        <li @click.prevent="changeContent('manufacturers')"><a>{{$t('manufacturers')}}</a></li>
                        <li @click.prevent="changeContent('families')"><a>{{$t('families')}}</a></li>
                        <li @click.prevent="changeContent('products')"><a>{{$t('products')}}</a></li>
                        <li @click.prevent="changeContent('subfamilies')"><a>{{$t('subfamilies')}}</a></li>
                    </ul>
                </li>
                <li>
                    <a @click.prevent="stateDropdown('garage'); stateGarage = !stateGarage" class="menu-dropdown"><span class="fa fa-car"></span><span class="side-menu-text">{{$t('garage')}}</span><i id="garage" class="fa fa-angle-down"></i></a>
                    <ul v-show="stateGarage">
                        <li @click.prevent="changeContent('brands')"><a>{{$t('brands')}}</a></li>
                        <li @click.prevent="changeContent('models')"><a>{{$t('models')}}</a></li>
                        <li @click.prevent="changeContent('variants')"><a>{{$t('variants')}}</a></li>
                        <li @click.prevent="changeContent('vehicles')"><a>{{$t('vehicles')}}</a></li>
                    </ul>
                </li>
                <li>
                    <a @click.prevent="stateDropdown('finances'); stateFinances = !stateFinances" class="menu-dropdown"><span class="fa fa-money"></span><span class="side-menu-text">{{$t('finances')}}</span><i id="finances" class="fa fa-angle-down"></i></a>
                    <ul v-show="stateFinances">
                        <li @click.prevent="changeContent('bank-entities')"><a>{{$t('bankEntities')}}</a></li>
                        <li @click.prevent="changeContent('taxes')"><a>{{$t('taxes')}}</a></li>
                        <li @click.prevent="changeContent('currencies')"><a>{{$t('currencies')}}</a></li>
                    </ul>
                </li>
                <li>
                    <a class="normal" @click.prevent="changeContent('documents')"><span class="fa fa-file-text"></span><span class="side-menu-text">{{$t('documents')}}</span></a>
                </li>
                <li>
                    <a @click.prevent="stateDropdown('maintenance'); stateMaintenance = !stateMaintenance" class="menu-dropdown"><span class="fa fa-cogs"></span><span class="side-menu-text">{{$t('maintenance')}}</span><i id="maintenance" class="fa fa-angle-down"></i></a>
                    <ul v-show="stateMaintenance">
                        <li @click.prevent="changeContent('states')"><a>{{$t('states')}}</a></li>
                        <li @click.prevent="changeContent('languages')"><a>{{$t('languages')}}</a></li>
                        <li @click.prevent="changeContent('action-types')"><a>{{$t('actionTypes')}}</a></li>
                        <li @click.prevent="changeContent('client-types')"><a>{{$t('clientTypes')}}</a></li>
                        <li @click.prevent="changeContent('fuel-types')"><a>{{$t('fuelTypes')}}</a></li>
                        <li @click.prevent="changeContent('comunication-types')"><a>{{$t('comunicationTypes')}}</a></li>
                        <li @click.prevent="changeContent('contact-types')"><a>{{$t('contactTypes')}}</a></li>
                        <li @click.prevent="changeContent('document-types')"><a>{{$t('documentTypes')}}</a></li>
                        <li @click.prevent="changeContent('ingress-types')"><a>{{$t('ingressTypes')}}</a></li>
                        <li @click.prevent="changeContent('payment-types')"><a>{{$t('paymentTypes')}}</a></li>
                        <li @click.prevent="changeContent('professional-types')"><a>{{$t('professionalTypes')}}</a></li>
                        <li @click.prevent="changeContent('unit-types')"><a>{{$t('unitTypes')}}</a></li>
                        <li @click.prevent="changeContent('user-types')"><a>{{$t('userTypes')}}</a></li>
                        <li @click.prevent="changeContent('vehicle-types')"><a>{{$t('vehicleTypes')}}</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="footer-side-menu">
            <div class="copyright">ECO Motor &copy; 2018</div>
            <div class="rights">{{$t('allRightsReserved')}}</div>
            <div class="links">
                <a @click.prevent="showLegalModal = true">{{$t('legalWarning')}}</a>
            </div>
        </div>
        <legal-modal v-show="showLegalModal" @close="showLegalModal = false">
        </legal-modal>
    </div>
</template>

<script>
    import LegalModal       from '../modals/LegalModal.vue'

    export default {
        components: {
            LegalModal
        },
        data() {
            return {
                stateCommercials:   false,
                stateSocial:        false,
                stateLocation:      false,
                stateCatalog:       false,
                stateGarage:        false,
                stateFinances:      false,
                stateMaintenance:   false,
                showLegalModal:     false
            }
        },
        computed: {
            user: function () {
                return this.$store.getters.user
            },
            userConfig: function () {
                return this.$store.getters.userConfig
            }
        },
        methods: {
            changeContent(newCurrentView) {
                this.$emit('change-content', newCurrentView)
            },
            stateDropdown(id) {
                document.getElementById(id).classList.toggle('fa-angle-down')
                document.getElementById(id).classList.toggle('fa-angle-up')
            }
        }
    }
</script>

<style scoped>
:root {
    --heightMenu: 686px;
}

.side-menu-container {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 171.8px var(--heightMenu) 60px;
}

/* SIDE MENU PROFILE DATA */

div.side-menu-container div.profile-data {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: grid;
    grid-template-columns: 1fr 100px 1fr;
    grid-template-rows: 15px 100px 7.5px 17.15px 17.15px 15px;
    font-weight: bold;
    font-size: 12px;
    color: white;
    background-color: #282b32;
    border-bottom: 1px solid #2a2d34;
    cursor: default;
}

div.side-menu-container div.profile-data div.profile-data-image {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.side-menu-container div.profile-data div.profile-data-image img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: #ffffff;
}

div.side-menu-container div.profile-data div.profile-data-name {
    grid-column: 1 / 5;
    grid-row: 4 / 5;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.side-menu-container div.profile-data div.profile-data-role {
    grid-column: 2 / 3;
    grid-row: 5 / 6;
    font-size: 11px;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* SIDE MENU LIST */

div.side-menu-container ul.side-menu {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    list-style: none;
    padding: 0px;
    background-color: #2f323a;
    margin-bottom: 0px;
    margin-top: 0px;
}

div.side-menu-container ul.side-menu li {
    background-color: #2f323a;
    border-bottom: 1px solid #2a2d34;
    cursor: pointer;
}

div.side-menu-container ul.side-menu li:hover {
    background-color: #3a3e48;
}

div.side-menu-container ul.side-menu li a:hover {
    text-decoration: none;
}

div.side-menu-container ul.side-menu li ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

div.side-menu-container ul.side-menu li ul li:last-child {
    border: none;
}

div.side-menu-container ul.side-menu li ul li:first-child {
    border-top: 1px solid #2a2d34;
}

div.side-menu-container ul.side-menu li ul li a {
    color: #fff;
}

div.side-menu-container ul.side-menu li ul li {
    height: 51px;
    padding: 14.5px 8px 14.5px 35px;
    font-weight: bold;
    font-size: 13px;
}

div.side-menu-container ul.side-menu li a.menu-dropdown,
div.side-menu-container ul.side-menu li a.normal {
    padding: 15px 10px;
    display: block;
    color: white;
    font-weight: bold;
}

div.side-menu-container ul.side-menu li a.menu-dropdown span.fa,
div.side-menu-container ul.side-menu li a.normal span.fa {
    margin-right: 10px;
}

div.side-menu-container ul.side-menu li a span.fa:before {
    font-size: 17px;
    height: 100%;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

div.side-menu-container ul.side-menu li span.side-menu-text {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    text-decoration: none;
}

div.side-menu-container ul.side-menu li a i {
    float: right;
    text-decoration: none;
}

div.side-menu-container ul.side-menu li a i.fa:before {
    font-size: 17px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

/* SIDE MENU FOOTER */

div.side-menu-container div.footer-side-menu {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
    height: 60px;
    color: #FFF;
    background-color: #2f323a;
    font-weight: bold;
    font-size: 11px;
    color: #999;
    display: grid;
    grid-template-columns: 5px 1fr 5px;
    grid-template-rows: 5px 1fr 1fr 1fr 5px;
    cursor: default;
}

div.side-menu-container div.footer-side-menu div.copyright {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.side-menu-container div.footer-side-menu div.rights {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.side-menu-container div.footer-side-menu div.links {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.side-menu-container div.footer-side-menu div.links a {
    color: #999;
    cursor: pointer;
}

div.side-menu-container div.footer-side-menu div.links a:hover {
    text-decoration: none;
}

.vb > .vb-dragger {
    z-index: 5;
    width: 4px;
    margin-top: 10px;
    right: 3px;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 200ms ease-out,
        margin 200ms ease-out,
        height 200ms ease-out;
    transition:
        background-color 200ms ease-out,
        margin 200ms ease-out,
        height 200ms ease-out;
    background: #2f323a00;
    margin: 0px;
    border-radius: 8px;
    height: 100%;
    display: block;
    width: 4px;
    cursor: pointer;
}

.vb-scrolling > .vb-dragger-styler,
.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler,
.vb > .vb-dragger:hover > .vb-dragger-styler,
.vb-dragging > .vb-dragger > .vb-dragger-styler,
.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background: #FFFFFF80;
}

.vb > .vb-dragger:hover > .vb-dragger-styler,
.vb-dragging > .vb-dragger > .vb-dragger-styler {
    margin: 0px;
}
</style>