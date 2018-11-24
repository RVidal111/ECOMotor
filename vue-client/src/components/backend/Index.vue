<template>
    <div class="backend-container">
        <top-menu @change-content="changeContent"></top-menu>
        <side-menu @change-content="changeContent"></side-menu>
        <div class="backend-content">
            <component :is="currentView" @change-content="changeContent"></component>
        </div>
    </div>
</template>

<script>
    import TopMenu  from './partials/TopMenu.vue'
    import SideMenu from './partials/SideMenu.vue'

    import Index                from './pages/Index.vue'
    import Users                from './pages/users/Users.vue'
    import Documents            from './pages/documents/Documents.vue'
    import Clients              from './pages/clients/Clients.vue'
    import Business             from './pages/business/Business.vue'
    import Professionals        from './pages/professionals/Professionals.vue'
    import Clubs                from './pages/clubs/Clubs.vue'
    import PostalCodes          from './pages/postalcodes/PostalCodes.vue'
    import Countries            from './pages/countries/Countries.vue'
    import Towns                from './pages/towns/Towns.vue'
    import Regions              from './pages/regions/Regions.vue'
    import Manufacturers        from './pages/manufacturers/Manufacturers.vue'
    import Families             from './pages/families/Families.vue'
    import Products             from './pages/products/Products.vue'
    import Subfamilies          from './pages/subfamilies/Subfamilies.vue'
    import BankEntities         from './pages/bankentities/BankEntities.vue'
    import Taxes                from './pages/taxes/Taxes.vue'
    import Currencies           from './pages/currencies/Currencies.vue'
    import Models               from './pages/models/Models.vue'
    import Brands               from './pages/brands/Brands.vue'
    import Variants             from './pages/variants/Variants.vue'
    import Vehicles             from './pages/vehicles/Vehicles.vue'
    import WorkDemands          from './pages/workdemands/WorkDemands.vue'
    import WorkOffers           from './pages/workoffers/WorkOffers.vue'
    import EcoParts             from './pages/ecoparts/EcoParts.vue'
    import UsedVehicles         from './pages/usedvehicles/UsedVehicles.vue'
    import NewVehicles          from './pages/newvehicles/NewVehicles.vue'
    import States               from './pages/states/States.vue'
    import Languages            from './pages/languages/Languages.vue'
    import ActionTypes          from './pages/actiontypes/ActionTypes.vue'
    import ClientTypes          from './pages/clienttypes/ClientTypes.vue'
    import FuelTypes            from './pages/fueltypes/FuelTypes.vue'
    import ComunicationTypes    from './pages/comunicationtypes/ComunicationTypes.vue'
    import ContactTypes         from './pages/contacttypes/ContactTypes.vue'
    import DocumentTypes        from './pages/documenttypes/DocumentTypes.vue'
    import IngressTypes         from './pages/ingresstypes/IngressTypes.vue'
    import PaymentTypes         from './pages/paymenttypes/PaymentTypes.vue'
    import ProfessionalTypes    from './pages/professionaltypes/ProfessionalTypes.vue'
    import UnitTypes            from './pages/unittypes/UnitTypes.vue'
    import UserTypes            from './pages/usertypes/UserTypes.vue'
    import VehicleTypes         from './pages/vehicletypes/VehicleTypes.vue'

    export default {
        components: {
            TopMenu, SideMenu, Index, Users, Documents, Clients, Business, Professionals, Clubs, PostalCodes, Countries, Towns, Regions, Manufacturers, Families,
            Products, Subfamilies, BankEntities, Taxes, Currencies, Models, Brands, Variants, Vehicles, WorkDemands, WorkOffers, EcoParts, UsedVehicles, NewVehicles,
            States, Languages, ActionTypes, ClientTypes, FuelTypes, ComunicationTypes, ContactTypes, DocumentTypes, IngressTypes, PaymentTypes, ProfessionalTypes,
            UnitTypes, UserTypes, VehicleTypes,
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
    .backend-container {
        width: 100%;
        display: grid;
        grid-template-rows: 50px 1fr;
        grid-template-columns: 220px 1fr;
    }
</style>
