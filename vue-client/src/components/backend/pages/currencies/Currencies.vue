<template>
    <div class="content">
        <div class="breadcrumb">
            <ul class="breadcrumb-list">
                <li class="link">
                    <a @click.prevent="changeContent('index')">{{$t('index')}}</a>
                </li>
                <li class="spacer">
                    <i class="fa fa-angle-right"></i>
                </li>
                <li class="active">{{$t('currencies')}}</li>
            </ul>
        </div>
        <div class="content-body">
            <div class="content-body-content">
                <div class="content-body-content-header">
                    <div class="left-btn-group">
                        <span class="fa fa-plus" aria-hidden="true" @click.prevent="showAddModal = true"></span>
                    </div>
                    <div class="right-btn-group">
                        <span class="fa fa-file-pdf-o" @click.prevent="exportDataPDF"></span>
                        <div class="form-group">
                            <input class="form-control" v-model="searchCurrency" type="search">
                            <i class="fa fa-search"></i>
                        </div>
                    </div>
                </div>
                <div class="content-body-content-body" v-bar>
                    <ul class="content-body-ul">
                        <li v-show="loading" class="datalist-loader">
                            <div class="loader-icon"></div>
                            <div class="loader-text">{{$t('loadingData')}}</div>
                        </li>
                        <li v-show="!loading" class="datalist" v-for="file in files" :key="file.id">
                            <div class="datalist-data">
                                <div class="datalist-content-info">
                                    <div class="datalist-brands-content">
                                        <div class="datalist-content-name">
                                            <input v-if="isEdit.state && isEdit.id === file.id" class="form-control" type="text" v-model="file.currency">
                                            <span v-else>{{file.currency}}</span>                                    
                                        </div>
                                        <!-- <div class="datalist-content-name">
                                            <input v-if="isEdit.state && isEdit.id === file.id" class="form-control" type="text" v-model="file.isoCode">
                                            <span v-else>{{ file.isoCode }}</span>                                          
                                        </div>
                                        <div class="datalist-content-name">
                                            <input v-if="isEdit.state && isEdit.id === file.id" class="form-control" type="text" v-model="file.symbol">
                                            <span v-else>{{ file.symbol }}</span>                                          
                                        </div> -->
                                        <!--<div class="datalist-content-name">
                                            <small v-show="file.updatedFor && !file.checked"><strong>Nuevo nombre: </strong>{{file.editBrand}}</small>
                                        </div>-->
                                    </div>
                                    <div class="datalist-content-dates">
                                        <div class="dates-group-1">
                                            <div class="datalist-content-flex">
                                                <div class="datalist-content-bold">{{$t('createdFor')}}&nbsp;</div>
                                                    {{ file.createdFor }}
                                            </div>
                                            <div class="datalist-content-flex">
                                                <div class="datalist-content-bold">{{$t('createdAt')}}&nbsp;</div>
                                                {{ new Date(file.createdAt) | moment("DD/MM/Y, H:mm") }}
                                            </div>
                                        </div>
                                        <div v-show="file.updatedFor" class="dates-group-2">
                                            <div class="datalist-content-flex">
                                                <div class="datalist-content-bold">{{$t('updatedFor')}}&nbsp;</div>
                                                {{ file.updatedFor }}
                                            </div>
                                            <div class="datalist-content-flex">
                                                <div class="datalist-content-bold">{{$t('createdAt')}}&nbsp;</div>
                                                <span v-show="file.updatedFor">{{ new Date(file.updatedAt) | moment("DD/MM/Y, H:mm") }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="datalist-actions">
                                <div class="checked-status" v-show="user.role === 'ADMIN' || user.role === 'MASTER_ADMIN'">
                                    <span v-show="file.checked" class="fa fa-check" aria-hidden="true"></span>
                                    <span v-show="!file.checked" @click.prevent="checkCurrency(file.id, file.checked)" class="fa fa-check" aria-hidden="true"></span>
                                </div>
                                <span v-if="isEdit.state && isEdit.id === file.id" @click.prevent="updatedBrand(file.brand, file.web)" class="fa fa-floppy-o" aria-hidden="true"></span>
                                <span v-else v-show="file.checked" @click.prevent="isEditBrand(file.id)" class="fa fa-pencil" aria-hidden="true"></span>
                                <!-- <span class="fa fa-eye" aria-hidden="true"></span> -->
                                <span v-if="user.role === 'ADMIN' || user.role === 'MASTER_ADMIN' && isEdit.state" class="fa fa-undo" aria-hidden="true" @click.prevent="isEdit.state = false"></span>
                                <span v-else v-show="user.role === 'ADMIN' || user.role === 'MASTER_ADMIN' && file.checked" class="fa fa-trash" aria-hidden="true" @click.prevent="softDeleteCurrency(file.id, file.deleted)" v-bind:class="{ disabled: file.deleted }"></span>
                                <span v-show="user.role === 'ADMIN' || user.role === 'MASTER_ADMIN' && !file.checked" class="fa fa-times" @click.prevent="deleteCurrency(file.id, file.checked)" aria-hidden="true"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <add-modal v-show="showAddModal" @close="showAddModal = false; reset();">
            <div slot="body" class="modal-body">
                <div class="row">
                    <div :class="[{'has-error' : currencyExists}]">
                        <div v-show="loading" class="loader"></div>
                        <input class="form-control error-control" type="text" placeholder="Moneda" v-model="currency"> 
                        <i v-show="currencyExists"  class="fa fa-exclamation"></i>
                    </div>
                </div>
                <div class="row">
                    <input class="form-control" type="text" placeholder="Código ISO" v-model="isoCode">
                </div>
                <div class="row">
                    <input class="form-control" type="text" placeholder="Símbolo" v-model="symbol">
                </div>
            </div>
            <div slot="footer" class="modal-footer">
                <div class="form-buttons-right">
                    <span class="fa fa-floppy-o" aria-hidden="true" @click.prevent="addCurrency()"></span>
                </div>
                <div class="form-buttons-left">
                    <span class="fa fa-undo" aria-hidden="true" @click.prevent="reset()"></span>
                </div>
            </div>
        </add-modal>
    </div>
</template>

<script>
    import AddModal from '../../modals/AddModal.vue'

    import          'jspdf-autotable/dist/jspdf.plugin.autotable.min.js'
    import PDF from 'jspdf/dist/jspdf.min.js'

    export default {
        components: {
            AddModal
        },
        created () {
            this.$store.dispatch('loadCurrencies')
            this.$store.dispatch('loadCurrenciesPDF')
        },
        data () {
            return {
                showAddModal    : false,
                currency        : '',
                isoCode         : '',
                symbol          : '',
                searchCurrency  : '',
                isEdit          : {
                    state: false,
                    id: ''
                }
            }   
        },
        computed: {
            loading: function () {
                return this.$store.getters.loading
            },
            user: function() {
                return this.$store.getters.user
            },
            files: function () {
                const files = this.$store.getters.getOrderCurrencies
                if (this.user.role === 'COMMERCIAL' || this.user.role === 'UPDATER') {
                    const validatedUser = files.filter(file => !file.checked || file.deleted)
                    validatedUser.forEach(data => {
                        let index = files.findIndex(i => i.id === data.id)
                        files.splice(index, 1)
                    })
                } else if (this.user.role === 'ADMIN' || this.user.role === 'MASTER_ADMIN') {
                    const validatedUser = files.filter(file => file.visible)
                    validatedUser.forEach(data => {
                        let index = files.findIndex(i => i.id === data.id)
                        files.splice(index, 1)
                    })
                }
                return files.filter(file => file.currency.toLowerCase().includes(this.searchCurrency.toLowerCase()))
            },
            currencyExists: function () {
                return this.$store.getters.currencyExists
            }
        },
        methods: {
            changeContent: function (newCurrentView) {
                this.$emit('change-content', newCurrentView)
            },
            addCurrency: function () {
                const currency = {
                    currency    : this.currency,
                    isoCode     : this.isoCode,
                    symbol      : this.symbol,
                    createdFor  : this.user.id,
                    deleted     : false,
                    checked     : false
                }
                if  (this.user.role === 'ADMIN' || this.user.role === 'MASTER_ADMIN') {
                    currency.checked = true
                }
                this.$store.dispatch('addCurrency', currency)
                this.showAddModal = false
                reset()
            },
            reset: function () {
                this.currency   = '',
                this.isoCode    = '',
                this.symbol     = '',
                this.$store.dispatch('clearCurrencyExists')
            },
            checkCurrency(id, checked) {
                const currency = {
                    id      : id,
                    checked : checked
                }
                if (!checked) {
                    this.$store.dispatch('checkCurrency', currency)
                }
            },
            deleteCurrency(id, checked) {
                const currency = {
                    id      : id,
                    checked : checked
                }
                if (!checked) {
                    this.$store.dispatch('deleteCurrency', currency)
                }
            },
            softDeleteCurrency(id, deleted) {
                const currency = {
                    id      : id,
                    deleted : deleted
                }
                if (!deleted) {
                    this.$store.dispatch('softDeleteCurrency', currency)
                }
            }
        }
    }
</script>

<style scoped>
:root {
    --heightContent: 836.85px;
}

.breadcrumb {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    margin: 0px;
    padding: 0px;
    background-color: #E8E8E8;
    display: grid;
    grid-template-columns: 15px 1fr 16px;
    grid-template-rows: 6px 1fr 7px;
}

.breadcrumb-list {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    margin: 0px;
    padding: 0px;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 11px;
    font-weight: bold;
}

.breadcrumb-list li:nth-child(2n+2) {
    margin: 0px 10px;
}

.breadcrumb-list li.link a {
    color: #99a0aa;
}

.breadcrumb-list li.link a:hover {
    color: #22262E;
    text-decoration: none;
    cursor: pointer;
}

.breadcrumb-list li.spacer {
    color: #22262E;
    cursor: default;
}

.breadcrumb-list li.active {
    color: #22262E;
    cursor: default;
}

.content-body-content-header span {
    color: #BDBDBD;
    transition: .3s;
    font-size: 22.5px;
}

.datalist-loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.loader-text {
    font-size: 35px;
    color: #808080;
    font-weight: bold;
}

.loader-icon {
    color: #808080;
    font-size: 20px;
    margin: 100px auto;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    -webkit-animation: load4 1s infinite linear;
    animation: load4 1s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
}

.datalist-content-info input {
    height: 40px;
    width: 300px;
}

.datalist-content-web {
    font-size: 15px;
    font-weight: bold;
    color: #434a54;
}

.datalist-content-web span {
    padding-left: 2px;
}

.datalist-content-web a:hover, .datalist-content-web a:focus {
    text-decoration: none;
}

.datalist-actions {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.dates-group-1 {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.dates-group-2 {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.datalist-content-flex span {
    font-size: 14px;
    color: #333333;
}

.datalist-content-name span {
   color: #434a54;
}

.datalist-actions span {
    color: #757575;
    padding: 5px 5px 5px 5px;
    transition: .3s;
    font-size: 20px;
}

.checked-status span.fa-check:hover:first-child, .datalist-actions span.fa-trash.disabled {
    cursor: default;
}

.datalist-actions span:hover, .content-body-content-header span:hover, .datalist-photo:hover {
    cursor: pointer;
}

.fa-plus:hover {
    color:#64B5F6;
}

.checked-status span.fa-check, .datalist-actions span.fa-floppy-o:hover {
    color: #4CAF50;
}

.fa-file-pdf-o:hover, .datalist-actions span.fa-times, .datalist-actions span.fa-trash:hover, .datalist-actions span.fa-trash.disabled {
    color: #F44336;
}

.datalist-actions span.fa-eye:hover {
    color: #4FC3F7;
}

.datalist-actions span.fa-pencil:hover {
    color: #FFc107;
}

.datalist-actions span.fa-undo:hover {
    color: #424242;
}

@-webkit-keyframes load4 {
    0%,
    100% { box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0; }
    12.5% { box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }
    25% { box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }
    37.5% { box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em; }
    50% { box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em; }
    62.5% { box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em; }
    75% { box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0; }
    87.5% { box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em; }
}

@keyframes load4 {
    0%,
    100% { box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0; }
    12.5% { box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }
    25% { box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em; }
    37.5% { box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em; }
    50% { box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em; }
    62.5% { box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em; }
    75% { box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0; }
    87.5% { box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em; }
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
    background: #2f323a80;
}

.vb > .vb-dragger:hover > .vb-dragger-styler,
.vb-dragging > .vb-dragger > .vb-dragger-styler {
    margin: 0px;
}
</style>