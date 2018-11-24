<template>
    <div class="frontend-container">
        <top-menu @change-content="changeContent"></top-menu>
        <div class="frontend-content">
            <!--<component :is="currentView" @change-content="changeContent"></component>-->
        </div>
    </div>
</template>

<script>
    import TopMenu  from './partials/TopMenu.vue'

    export default {
        components: {
            TopMenu,
        },
        data() {
            return {
                currentView: 'index'
            }
        },
        methods: {
            changeContent: function(newCurrentView) {
                this.currentView = newCurrentView;
            }
        }
    }
</script>

<style scoped>
    .frontend-container {
        width: 100%;
        display: grid;
        grid-template-rows: 50px 1fr;
        grid-template-columns: 1fr;
    }
    .frontend-content {
        grid-row: 2 / 3;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
        background: #FFFFFF url('/src/assets/img/background/bg.png') left top repeat;
    }
</style>
